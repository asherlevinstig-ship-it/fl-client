import { playerHotbar, abilityCooldowns } from "../ui/AbilityUI";
import { getSkillDef } from "../data/AbilityDatabase";

export type ActionContext = {
    room: any;
    scene: any;
    localPos: { x: number, y: number };
    facing: { dx: number, dy: number };
    isUIOpen: boolean;
};

// ==========================================
// CONSTANTS & PERFORMANCE POOLS
// ==========================================

// Pre-mapped slot keys to avoid string concatenation (`slot${num}`) on every press
const SLOT_KEYS = [
    "invalid", "slot1", "slot2", "slot3", "slot4", 
    "slot5", "slot6", "slot7", "slot8", "slot9"
] as const;

// Sets provide O(1) lookup and moving them out of the function prevents GC allocation churn
const REQUIRES_TARGETING = new Set([
    "void_eruption",        // Shadow AoE Eruption
    "meteor_strike",        // Berserker AoE
    "earth_spike",          // Nature Tactical Root
    "wrath_of_the_forest",  // Nature Ultimate Zone
    "heroic_leap",          // Berserker Jump
    "feast_of_blood",       // Familiar (Colin): Targeted Swarm Devour
    "hunters_mark"          // Familiar (Beast): Targeted Kill Command Leap
]);

const SELF_CAST_SKILLS = new Set([
    "aura_activate", "aura_shatter", "veil_of_shadows", "wrath_of_the_berserker", 
    "aura_of_purity", "holy_nova", "consecrated_ground", "spirit_animal", 
    "healing_blossom", "ultimate_sacrifice", "spatial_swap", "decoy_master", 
    "dragon_wrath"
]);

// Map Skill Tree Branch IDs to their literal VFX string triggers
const FAMILIAR_VFX_MAP: Record<string, string> = {
    "devour_branch": "swarm_devour_cast",
    "annihilation_branch": "gordon_annihilation",
    "legion_branch": "shade_legion",
    "arise_branch": "monarch_arise",
    "true_form_branch": "stash_true_form",
    "lifeline_branch": "pixie_lifeline",
    "transposition_branch": "gemini_swap",
    "kill_command_branch": "beast_kill_command",
    "aegis_branch": "seraph_aegis",
    "sky_lord_branch": "gryphon_liftoff",
    "siege_engine_branch": "behemoth_battering_ram"
};

// ==========================================
// QUICK CHAT SYSTEM
// ==========================================

export const QUICK_CHATS: Record<string, string> = {
    "1": "Hello!",
    "2": "Follow me!",
    "3": "I need help!",
    "4": "Enemies spotted!",
    "5": "Thank you!",
    "6": "Good job!",
    "7": "Wait here.",
    "8": "Run away!"
};

export let currentChatChannel: "local" | "team" = "local";
let lastChatTime = 0;

export function toggleChatChannel() {
    currentChatChannel = currentChatChannel === "local" ? "team" : "local";
}

export function attemptQuickChat(ctx: ActionContext, hotkeyStr: string) {
    if (!ctx.room) return;
    
    const now = Date.now();
    if (now - lastChatTime < 2000) return; 

    const text = QUICK_CHATS[hotkeyStr];
    if (!text) return; 

    ctx.room.send("quick_chat", { channel: currentChatChannel, msgId: hotkeyStr });
    lastChatTime = now;
}

// ==========================================
// COMBAT & ABILITIES
// ==========================================

let lastLocalAttack = 0;

/**
 * Handles basic melee and resource gathering attacks (Hotbar Slot 1 or Left Click)
 */
export function attemptAttack(ctx: ActionContext, isLeftClick: boolean = false) {
    if (!ctx.room || ctx.isUIOpen) return;

    const state = ctx.room.state;
    if (!state || !state.players) return;

    const me = state.players.get(ctx.room.sessionId);
    const now = Date.now(); // Cache once

    if (!me || me.isSleeping || me.isMeditating || now < me.rootedUntil) return;

    // 1. Local Cooldown Check (Prevents animation spamming)
    let speed = me.attackSpeed || 1.0;
    const attackSpeedBuff = (me as any).attackSpeedBuff; // Cache deep prop
    if (attackSpeedBuff && now < attackSpeedBuff) speed *= 1.5;
    
    const cooldownMs = 1000 / speed;

    if (now - lastLocalAttack < cooldownMs) return;
    lastLocalAttack = now;

    // 2. Calculate Target Position
    const attackDistance = 2.5; 
    const targetX = ctx.localPos.x + (ctx.facing.dx * attackDistance);
    const targetZ = ctx.localPos.y + (ctx.facing.dy * attackDistance);

    // 3. INSTANT CLIENT-SIDE PREDICTION
    if (ctx.scene && typeof ctx.scene.playAttackVisual === "function") {
        ctx.scene.playAttackVisual(ctx.room.sessionId, targetX, targetZ);
    }

    // 4. Send to Server for Damage Math
    ctx.room.send("attack", { targetX, targetZ });
}

/**
 * Handles parsing, cooling down, and targeting for Skills (Hotbar Slots 2-9)
 */
export function attemptAbility(slotNum: number, ctx: ActionContext) {
    if (!ctx.room || ctx.isUIOpen || slotNum < 2 || slotNum > 9) return;

    const state = ctx.room.state;
    if (!state || !state.players) return;

    const me = state.players.get(ctx.room.sessionId);
    const now = Date.now(); // Cache once

    if (!me || me.isSleeping || me.isMeditating || now < me.rootedUntil) return;

    // 1. Grab the ability ID using our O(1) pre-mapped key
    const slotKey = SLOT_KEYS[slotNum] as keyof typeof playerHotbar;
    const abilityId = playerHotbar[slotKey];
    if (!abilityId) return; // Slot is empty

    // 2. Core Slots (6 and 8) are System Passives. They cannot be "cast".
    if (slotNum === 6 || slotNum === 8) return; 

    // 3. Check local cooldown to prevent spamming the server
    const currentCd = abilityCooldowns[slotKey as keyof typeof abilityCooldowns];
    if (currentCd && currentCd > 0) return; // Still on cooldown

    // 4. Retrieve the skill definition from the master database
    const def = getSkillDef(abilityId);
    if (!def) return;

    // Optional Local Mana Check
    if (def.mpCost && me.mp < def.mpCost) return; 

    // 5. Targeting Logic
    if (REQUIRES_TARGETING.has(abilityId)) {
        // Hand off to the THREE.js scene to render a reticle and wait for a mouse click
        if (typeof ctx.scene.enterTargetingMode === "function") {
            ctx.scene.enterTargetingMode(abilityId, slotNum);
        }
    } else {
        // 6. Instant Cast
        let targetX = ctx.localPos.x;
        let targetZ = ctx.localPos.y;

        if (!SELF_CAST_SKILLS.has(abilityId)) {
            const targetDistance = 5.0; // Shoot forward
            targetX += (ctx.facing.dx * targetDistance);
            targetZ += (ctx.facing.dy * targetDistance);
        }

        // Map Slot 9 Branch IDs to actual VFX IDs for instant client prediction
        let vfxId = abilityId;
        if (slotNum === 9) {
            vfxId = FAMILIAR_VFX_MAP[abilityId] || abilityId;
        }

        // INSTANT CLIENT-SIDE PREDICTION FOR ABILITIES
        if (ctx.scene && typeof ctx.scene.playAbilityVisual === "function" && abilityId !== "shadow_step") {
            ctx.scene.playAbilityVisual(ctx.room.sessionId, vfxId, targetX, targetZ);
        }

        // Send the ability request to the Colyseus room
        ctx.room.send("useAbility", { abilityId, targetX, targetZ });

        // Apply the local cooldown immediately
        (abilityCooldowns as any)[slotKey] = def.cooldownTime || 5.0;
    }
}

// ==========================================
// FISHING & GATHERING
// ==========================================

/**
 * Checks if the player is near a water source and initiates fishing.
 * Call this from your interaction hotkey (e.g., "F" or "E").
 */
export function attemptFishing(ctx: ActionContext) {
    if (!ctx.room || ctx.isUIOpen) return;

    const state = ctx.room.state;
    if (!state || !state.players) return;

    const me = state.players.get(ctx.room.sessionId);
    
    // Validate we are alive, awake, and not already currently fishing
    if (!me || me.isSleeping || me.isMeditating || me.fishingState !== "none") return;

    // Local mana check before casting
    if (me.mp < 5) {
        console.log("Not enough mana to cast the line!"); 
        return;
    }

    // The center coordinates of the massive lake defined in TownScene
    const lakeX = -180;
    const lakeZ = 180;

    // Calculate squared distance to avoid Math.sqrt overhead
    const distSq = (ctx.localPos.x - lakeX) ** 2 + (ctx.localPos.y - lakeZ) ** 2;

    // The dock's outer radius is 45. 55^2 = 3025.0, allowing the player to cast while standing on the dock
    if (distSq <= 3025.0) {
        // Send request to server, passing the facing vector to calculate the bobber throw arc!
        ctx.room.send("startFishing", { dx: ctx.facing.dx, dy: ctx.facing.dy });
    }
}