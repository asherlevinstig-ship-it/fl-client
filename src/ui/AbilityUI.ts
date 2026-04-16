import { SKILL_TREE_DATA, CATEGORY_MAP, UTILITY_TREE_DATA, UTILITY_CATEGORY_MAP, FAMILIAR_TREE_DATA, FAMILIAR_CATEGORY_MAP, getSkillDef, getAbilityCategory } from "../data/AbilityDatabase";
import { QUICK_CHATS, currentChatChannel } from "../game/PlayerController"; // <-- ADDED FOR QUICK CHAT

// --- EXPORTED STATE ---
export let isSkillTreeUIOpen = false;

// Load hotbar from local storage so commitments persist across reloads
export const playerHotbar = JSON.parse(localStorage.getItem("rpg_hotbar") || "{}");
if (typeof playerHotbar.slot2 !== "string") playerHotbar.slot2 = "";
if (typeof playerHotbar.slot3 !== "string") playerHotbar.slot3 = "";
if (typeof playerHotbar.slot4 !== "string") playerHotbar.slot4 = "";
if (typeof playerHotbar.slot5 !== "string") playerHotbar.slot5 = "";
if (typeof playerHotbar.slot6 !== "string") playerHotbar.slot6 = ""; // Utility Core
if (typeof playerHotbar.slot7 !== "string") playerHotbar.slot7 = ""; // Utility Branch
if (typeof playerHotbar.slot8 !== "string") playerHotbar.slot8 = ""; // Familiar Core
if (typeof playerHotbar.slot9 !== "string") playerHotbar.slot9 = ""; // Familiar Branch

export const abilityCooldowns = { slot2: 0, slot3: 0, slot4: 0, slot5: 0, slot6: 0, slot7: 0, slot8: 0, slot9: 0 };

// --- LOCAL UI STATE ---
type TreeMode = "combat" | "utility" | "familiar";
let currentTreeMode: TreeMode = "combat";

let activeCombatCategoryTab = "mobility";
let activeUtilityCategoryTab = "core";
let activeFamiliarCategoryTab = "core";

let activeCombatSkillId = "";
let activeUtilitySkillId = "";
let activeFamiliarSkillId = "";

let currentUtilityPathway = localStorage.getItem("rpg_utility_pathway") || "wayfinder";
let currentFamiliarPathway = localStorage.getItem("rpg_familiar_pathway") || "apocalyptic_swarm";

const localCommittedSlots: Record<string, string> = {}; 

// --- TEMPORARY SKILL STATE (Town Recall) ---
export let temporarySkill: { id: string, label: string, icon: string } | null = null;
let uiRoom: any = null;

export function setAbilityUIRoom(room: any) {
    uiRoom = room;
}

export function setTemporarySkill(skill: { id: string, label: string, icon: string } | null) {
    temporarySkill = skill;
    renderHotbar();
}

function saveHotbar() {
    localStorage.setItem("rpg_hotbar", JSON.stringify(playerHotbar));
    localStorage.setItem("rpg_utility_pathway", currentUtilityPathway);
    localStorage.setItem("rpg_familiar_pathway", currentFamiliarPathway);
}

// --- ADMIN FUNCTION ---
export function adminResetCommitments() {
    // 1. Wipe the Hotbar
    playerHotbar.slot2 = "";
    playerHotbar.slot3 = "";
    playerHotbar.slot4 = "";
    playerHotbar.slot5 = "";
    playerHotbar.slot6 = "";
    playerHotbar.slot7 = "";
    playerHotbar.slot8 = "";
    playerHotbar.slot9 = "";
    saveHotbar();
    
    // 2. Wipe the local memory lock
    for (const key in localCommittedSlots) {
        delete localCommittedSlots[key];
    }

    // 3. Clear temporary skills
    temporarySkill = null;
    
    // 4. Re-render the empty UI
    renderHotbar();
    
    if (isSkillTreeUIOpen) {
        const modal = document.getElementById("skill-tree-modal");
        if (modal) document.body.removeChild(modal);
        isSkillTreeUIOpen = false;
    }
}

export function setIsSkillTreeUIOpen(val: boolean) {
    isSkillTreeUIOpen = val;
}

export function initDefaultHotbar(pathway: string) {
    let needsClear = false;
    
    // Only check combat slots (2-5) for pathway mismatch. 
    // Utility (6,7) and Familiar (8,9) are independent and persist through combat class changes!
    [2, 3, 4, 5].forEach(slotNum => {
        const id = playerHotbar[`slot${slotNum}` as keyof typeof playerHotbar];
        if (id) {
            let foundInCurrentPathway = false;
            const essenceData = SKILL_TREE_DATA[pathway];
            if (essenceData) {
                for (const category in essenceData) {
                    if (essenceData[category][id]) {
                        foundInCurrentPathway = true;
                    }
                }
            }
            if (!foundInCurrentPathway) needsClear = true;
        }
    });

    if (needsClear) {
        playerHotbar.slot2 = "";
        playerHotbar.slot3 = "";
        playerHotbar.slot4 = "";
        playerHotbar.slot5 = "";
        saveHotbar();
    }
}

// --- CSS INJECTION (Hotbar & Skill Tree) ---
function injectSkillTreeStyles() {
    if (!document.getElementById("skill-tree-css")) {
        const style = document.createElement("style");
        style.id = "skill-tree-css";
        style.innerHTML = `
            :root {
                --st-bg: rgba(10, 12, 16, 0.95);
                --st-panel: rgba(20, 24, 32, 0.8);
                --st-border: rgba(0, 170, 255, 0.3);
                --st-text: #e0e0e0;
                --st-muted: #888888;
                --st-font-header: 'Orbitron', sans-serif;
                --st-font-body: 'Inter', sans-serif;
            }

            /* --- HOTBAR STYLES --- */
            #action-bar {
                position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
                display: flex; gap: 8px; padding: 10px; border-radius: 12px;
                background: rgba(10, 15, 20, 0.85); border: 1px solid var(--st-border);
                box-shadow: 0 10px 30px rgba(0,0,0,0.8), inset 0 0 20px rgba(0, 170, 255, 0.1);
                z-index: 20; font-family: var(--st-font-body); backdrop-filter: blur(8px);
            }
            .hotbar-slot {
                width: 60px; height: 60px; background-color: rgba(0, 0, 0, 0.7);
                border-radius: 8px; display: flex; justify-content: center; align-items: center;
                position: relative; cursor: pointer; overflow: hidden;
                transition: transform 0.1s, border-color 0.2s, box-shadow 0.2s;
            }
            .hotbar-slot:hover { transform: scale(1.05); }
            .hotbar-key {
                position: absolute; top: -8px; left: -8px; background: #222; color: white;
                font-weight: bold; font-size: 10px; padding: 2px 6px; border-radius: 4px;
                border: 1px solid #555; z-index: 2; font-family: var(--st-font-header);
            }
            .hotbar-icon { font-size: 28px; filter: drop-shadow(2px 2px 2px rgba(0,0,0,0.8)); z-index: 1; }
            .hotbar-cd-overlay {
                position: absolute; bottom: 0; left: 0; width: 100%; height: 0%;
                background: rgba(0, 0, 0, 0.85); z-index: 3; transition: height 0.1s linear;
            }
            .hotbar-cd-text {
                position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                color: white; font-weight: bold; font-size: 24px; z-index: 4;
                text-shadow: 2px 2px 0 #000; display: none; font-family: var(--st-font-header);
            }
            .hotbar-label {
                position: absolute; bottom: -20px; width: 100%; text-align: center;
                font-size: 10px; font-weight: bold; color: var(--st-muted);
                white-space: nowrap; z-index: 5; text-transform: uppercase;
            }

            /* --- SKILL TREE MODAL STYLES --- */
            .st-modal {
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                background: var(--st-bg); padding: 30px; border-radius: 12px;
                border: 1px solid var(--st-border); z-index: 1000; color: var(--st-text);
                width: 1050px; height: 820px; font-family: var(--st-font-body);
                box-shadow: 0 15px 50px rgba(0,0,0,0.9), inset 0 0 30px rgba(0,170,255,0.05);
                backdrop-filter: blur(10px); display: flex; flex-direction: column;
            }
            .st-header-title { font-family: var(--st-font-header); text-transform: uppercase; margin: 0; color: white; letter-spacing: 1px; font-size: 24px; }
            .st-stat-pill {
                background: rgba(0,0,0,0.5); border-radius: 20px; padding: 6px 12px;
                font-size: 13px; font-weight: bold; font-family: var(--st-font-header); letter-spacing: 1px;
            }
            
            .st-btn-hover { cursor: pointer; transition: all 0.2s ease; border: none; font-family: var(--st-font-header); }
            .st-btn-hover:hover:not(:disabled) { filter: brightness(1.2); transform: translateY(-1px); box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
            .st-btn-hover:active:not(:disabled) { transform: translateY(1px); }
            .st-btn-hover.active { box-shadow: inset 0 0 15px currentColor; }
            
            .st-tab {
                flex: 1; padding: 12px; border-radius: 8px 8px 0 0; font-weight: bold;
                text-transform: uppercase; font-size: 13px; background: rgba(0,0,0,0.4);
                border: 1px solid #333; border-bottom: 1px solid #333; color: #777;
            }
            .st-tab.active {
                background: var(--st-panel); border: 1px solid currentColor;
                border-bottom: 3px solid currentColor; color: currentColor;
            }

            .st-util-nav-btn {
                flex: 1 1 calc(20% - 8px); padding: 10px; border-radius: 6px; font-weight: bold;
                font-size: 13px; background: #111; border: 1px solid #444; color: #ccc;
                white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
            }
            .st-util-nav-btn.active { background: #222; border-color: currentColor; color: currentColor; }
            .st-util-nav-btn.locked { color: #555; }

            .st-pane-bg { background: var(--st-panel); border: 1px solid #222; border-radius: 8px; }
            
            .st-alert { padding: 15px; border-radius: 8px; margin-bottom: 20px; text-align: center; }
            .st-alert-danger { background: rgba(255,68,68,0.1); border: 1px solid var(--neon-red); color: var(--neon-red); }
            .st-alert-warning { background: rgba(255,170,0,0.1); border: 1px dashed var(--neon-amber); color: var(--neon-amber); }
            .st-alert-success { background: rgba(0,255,170,0.05); border: 1px solid var(--neon-green); color: var(--neon-green); }

            .st-scrollbar::-webkit-scrollbar { width: 6px; }
            .st-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); border-radius: 4px; }
            .st-scrollbar::-webkit-scrollbar-thumb { background: #555; border-radius: 4px; }
            .st-scrollbar::-webkit-scrollbar-thumb:hover { background: var(--neon-blue); }

            @keyframes nodePulse { 0% { box-shadow: 0 0 5px currentColor; } 50% { box-shadow: 0 0 15px currentColor; } 100% { box-shadow: 0 0 5px currentColor; } }
            .st-node-active { animation: nodePulse 2s infinite ease-in-out; }
            .progress-fill { transition: width 0.3s ease-out; }
        `;
        document.head.appendChild(style);
    }
}

export function renderHotbar() {
    injectSkillTreeStyles(); // Ensure styles exist

    let hotbar = document.getElementById("action-bar");
    if (!hotbar) {
        hotbar = document.createElement("div");
        hotbar.id = "action-bar";
        document.body.appendChild(hotbar);
    }

    const createSlotHTML = (key: string, icon: string, name: string, color: string, isGroupStart: boolean = false) => `
        <div class="hotbar-slot" style="border: 2px solid ${color}; ${isGroupStart ? 'margin-left: 12px;' : ''}">
            <div class="hotbar-key">${key}</div>
            <span id="slot-icon-${key}" class="hotbar-icon">${icon}</span>
            <div id="cd-overlay-${key}" class="hotbar-cd-overlay"></div>
            <div id="cd-text-${key}" class="hotbar-cd-text"></div>
            <div class="hotbar-label">${name}</div>
        </div>
    `;

    let html = `<div id="equipped-slot" style="margin-right: 8px;"></div>`; 

    // Render Combat Slots (2-5)
    [2, 3, 4, 5].forEach(slotNum => {
        const abilityId = playerHotbar[`slot${slotNum}` as keyof typeof playerHotbar];
        const def = getSkillDef(abilityId);
        
        if (def) {
            html += createSlotHTML(slotNum.toString(), def.icon, def.name, def.color);
        } else {
            html += createSlotHTML(slotNum.toString(), '<i class="fa-solid fa-question text-muted"></i>', "Empty", "#444");
        }
    });

    // Render Utility Slots (6-7)
    [6, 7].forEach(slotNum => {
        const abilityId = playerHotbar[`slot${slotNum}` as keyof typeof playerHotbar];
        const def = getSkillDef(abilityId);
        
        if (def) {
            html += createSlotHTML(slotNum.toString(), def.icon, def.name, def.color, slotNum === 6);
        } else {
            html += createSlotHTML(slotNum.toString(), '<i class="fa-solid fa-gear text-muted"></i>', "Utility", "#444", slotNum === 6);
        }
    });

    // Render Familiar Slots (8-9)
    [8, 9].forEach(slotNum => {
        const abilityId = playerHotbar[`slot${slotNum}` as keyof typeof playerHotbar];
        const def = getSkillDef(abilityId);
        
        if (def) {
            html += createSlotHTML(slotNum.toString(), def.icon, def.name, def.color, slotNum === 8);
        } else {
            html += createSlotHTML(slotNum.toString(), '<i class="fa-solid fa-dragon text-muted"></i>', "Familiar", "#444", slotNum === 8);
        }
    });

    // --- TEMPORARY SKILL SLOT (Town Recall) ---
    if (temporarySkill) {
        html += `
            <div id="btn-temp-recall" class="hotbar-slot" style="border: 2px solid var(--neon-blue); background: rgba(0, 170, 255, 0.1); margin-left: 15px; box-shadow: 0 0 15px rgba(0, 170, 255, 0.4);">
                <div class="hotbar-key" style="background: var(--neon-blue); border-color: white;">R-SHIFT</div>
                <span class="hotbar-icon">${temporarySkill.icon}</span>
                <div class="hotbar-label" style="color: var(--neon-blue);">${temporarySkill.label}</div>
            </div>
        `;
    }

    hotbar.innerHTML = html;

    // Attach click listener for temporary skill
    if (temporarySkill) {
        const tempBtn = document.getElementById("btn-temp-recall");
        if (tempBtn) {
            tempBtn.onclick = () => {
                if (uiRoom && temporarySkill) {
                    uiRoom.send("useAbility", { abilityId: temporarySkill.id, targetX: 0, targetZ: 0 });
                }
            };
        }
    }
}

// --- ADDED: QUICK CHAT HOTBAR RENDERER ---
// Exposed globally so main.ts can trigger the Commo-Rose Quick Chat
(window as any).renderChatHotbar = function(showChat: boolean) {
    const container = document.getElementById("action-bar");
    if (!container) return;

    if (!showChat) {
        renderHotbar(); // Restore normal skills
        return;
    }

    const isTeam = currentChatChannel === "team";
    const barColor = isTeam ? "var(--neon-cyan)" : "var(--neon-green)";
    const titleText = isTeam ? "TEAM CHAT" : "LOCAL CHAT";
    const subText = isTeam ? "(Shift+Tab to swap to Local)" : "(Shift+Tab to swap to Team)";

    let html = `
        <div style="position: absolute; top: -45px; left: 50%; transform: translateX(-50%); text-align: center; width: 300px; pointer-events: none;">
            <div class="hud-header" style="color: ${barColor}; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px ${barColor}; letter-spacing: 1px;">
                <i class="fa-solid fa-comment-dots"></i> ${titleText}
            </div>
            <div style="color: #aaa; font-size: 12px; margin-top: 2px; font-family: monospace;">${subText}</div>
        </div>
    `;

    for (let i = 1; i <= 8; i++) {
        const text = QUICK_CHATS[i.toString()] || "";
        
        let icon = "💬";
        if (text.includes("Hello")) icon = "👋";
        else if (text.includes("Follow")) icon = "🏃";
        else if (text.includes("help")) icon = "🚑";
        else if (text.includes("Enemies")) icon = "⚔️";
        else if (text.includes("Thank")) icon = "🙏";
        else if (text.includes("Good")) icon = "👍";
        else if (text.includes("Wait")) icon = "🛑";
        else if (text.includes("Run")) icon = "💨";

        html += `
            <div class="hotbar-slot chat-slot" style="position: relative; border: 2px solid ${barColor}; background: rgba(0, 0, 0, 0.85); width: 60px; height: 60px; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; box-shadow: 0 0 10px ${barColor}40; margin-left: ${i === 1 ? '12px' : '0'};">
                <div class="hotbar-key" style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #222; border: 1px solid ${barColor}; border-radius: 4px; padding: 2px 6px; font-size: 12px; font-weight: bold; color: white; z-index: 2;">
                    ${i}
                </div>
                <div style="font-size: 24px; margin-bottom: 2px; text-shadow: 0 0 5px ${barColor};">${icon}</div>
                <div style="font-size: 10px; color: white; text-align: center; line-height: 1.1; padding: 0 2px; font-family: Arial, sans-serif;">${text}</div>
            </div>
        `;
    }

    container.innerHTML = html;
};

export function tickCooldownsUI(dt: number) {
    // ADDED: If the chat menu is open, don't try to update the ability cooldown overlays 
    // because the standard hotbar HTML doesn't exist right now.
    const isChatOpen = document.querySelector(".chat-slot") !== null;
    if (isChatOpen) return;

    if (abilityCooldowns.slot2 > 0) abilityCooldowns.slot2 -= dt;
    if (abilityCooldowns.slot3 > 0) abilityCooldowns.slot3 -= dt;
    if (abilityCooldowns.slot4 > 0) abilityCooldowns.slot4 -= dt;
    if (abilityCooldowns.slot5 > 0) abilityCooldowns.slot5 -= dt;
    if (abilityCooldowns.slot6 > 0) abilityCooldowns.slot6 -= dt;
    if (abilityCooldowns.slot7 > 0) abilityCooldowns.slot7 -= dt;
    if (abilityCooldowns.slot8 > 0) abilityCooldowns.slot8 -= dt;
    if (abilityCooldowns.slot9 > 0) abilityCooldowns.slot9 -= dt;

    const updateOverlay = (slot: string, current: number, max: number) => {
        const overlay = document.getElementById(`cd-overlay-${slot}`);
        const textLabel = document.getElementById(`cd-text-${slot}`);
        
        if (overlay && textLabel) {
            if (current > 0) {
                overlay.style.height = `${(current / max) * 100}%`;
                textLabel.style.display = "block";
                
                if (current < 3.0) {
                    textLabel.innerText = current.toFixed(1);
                } else {
                    textLabel.innerText = Math.ceil(current).toString();
                }
            } else {
                overlay.style.height = "0%";
                textLabel.style.display = "none";
            }
        }
    };
    
    [2, 3, 4, 5, 6, 7, 8, 9].forEach(slotNum => {
        const abilityId = playerHotbar[`slot${slotNum}` as keyof typeof playerHotbar];
        if (abilityId) {
            const def = getSkillDef(abilityId);
            const currentCooldown = abilityCooldowns[`slot${slotNum}` as keyof typeof abilityCooldowns];
            if (def) updateOverlay(slotNum.toString(), currentCooldown, def.cooldownTime || 5.0);
        }
    });
}

export function openSkillTreeUI(activeRoom: any, pathway: string, keys: any) {
    if (isSkillTreeUIOpen || !activeRoom) return;
    
    setAbilityUIRoom(activeRoom);
    isSkillTreeUIOpen = true;
    injectSkillTreeStyles();

    for (const key in keys) keys[key] = false;

    let modal = document.getElementById("skill-tree-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "skill-tree-modal";
        modal.className = "st-modal";
        document.body.appendChild(modal);
    }

    const renderTree = () => {
        if (!activeRoom || !isSkillTreeUIOpen) return;
        const state = activeRoom.state as any;
        const me = state.players.get(activeRoom.sessionId);
        if (!me) return;

        const activeCategoryTab = currentTreeMode === "familiar" ? activeFamiliarCategoryTab : (currentTreeMode === "utility" ? activeUtilityCategoryTab : activeCombatCategoryTab);
        const activeSkillId = currentTreeMode === "familiar" ? activeFamiliarSkillId : (currentTreeMode === "utility" ? activeUtilitySkillId : activeCombatSkillId);
        const activeMap = currentTreeMode === "familiar" ? FAMILIAR_CATEGORY_MAP : (currentTreeMode === "utility" ? UTILITY_CATEGORY_MAP : CATEGORY_MAP);
        
        let treeData;
        if (currentTreeMode === "familiar") treeData = FAMILIAR_TREE_DATA[currentFamiliarPathway] || FAMILIAR_TREE_DATA["apocalyptic_swarm"];
        else if (currentTreeMode === "utility") treeData = UTILITY_TREE_DATA[currentUtilityPathway] || UTILITY_TREE_DATA["wayfinder"];
        else treeData = SKILL_TREE_DATA[pathway] || SKILL_TREE_DATA["shadow"];

        const pathwayData = treeData[activeCategoryTab] || {};
        const abilityKeys = Object.keys(pathwayData);

        let unspentEssence = me.skillTree?.unspentEssencePoints || 0;
        let unspentAwakening = me.skillTree?.unspentAwakeningPoints || 0;
        let activeAbilities = me.skillTree?.activeAbilities || new Map();

        // --- GLOBAL PATHWAY COMMITMENT CHECKS ---
        let committedUtilityPathway: string | null = null;
        let committedFamiliarPathway: string | null = null;
        
        // Scan for Utility Commitments
        for (const pKey in UTILITY_TREE_DATA) {
            for (const cKey in UTILITY_TREE_DATA[pKey]) {
                for (const sKey in UTILITY_TREE_DATA[pKey][cKey]) {
                    const skillState = activeAbilities.get(sKey);
                    if (skillState && skillState.upgrades) {
                        let hasPoints = false;
                        skillState.upgrades.forEach((u: any) => { if (u.currentRank > 0) hasPoints = true; });
                        if (hasPoints) {
                            committedUtilityPathway = pKey;
                        }
                    }
                }
            }
        }

        // Scan for Familiar Commitments
        for (const pKey in FAMILIAR_TREE_DATA) {
            for (const cKey in FAMILIAR_TREE_DATA[pKey]) {
                for (const sKey in FAMILIAR_TREE_DATA[pKey][cKey]) {
                    const skillState = activeAbilities.get(sKey);
                    if (skillState && skillState.upgrades) {
                        let hasPoints = false;
                        skillState.upgrades.forEach((u: any) => { if (u.currentRank > 0) hasPoints = true; });
                        if (hasPoints) {
                            committedFamiliarPathway = pKey;
                        }
                    }
                }
            }
        }

        // --- CURRENT TAB COMMITMENT CHECK ---
        const targetSlot = activeMap[activeCategoryTab].slot;
        let committedAbilityId: string | null = null;
        
        abilityKeys.forEach(key => {
            const state = activeAbilities.get(key);
            if (state && state.upgrades) {
                let hasPoints = false;
                state.upgrades.forEach((u: any) => {
                    if (u.currentRank > 0) hasPoints = true;
                });
                if (hasPoints) {
                    committedAbilityId = key;
                }
            }
        });

        // Fallback: If no points spent, check hotbar to treat as "soft committed"
        if (!committedAbilityId) {
            const currentSlotSkill = playerHotbar[`slot${targetSlot}` as keyof typeof playerHotbar];
            if (currentSlotSkill && abilityKeys.includes(currentSlotSkill)) {
                committedAbilityId = currentSlotSkill;
            }
        }

        let newActiveSkillId = activeSkillId;
        if (committedAbilityId && (!activeSkillId || !abilityKeys.includes(activeSkillId))) {
            newActiveSkillId = committedAbilityId;
        } else if (!activeSkillId || !pathwayData[activeSkillId]) {
            newActiveSkillId = abilityKeys[0] || ""; 
        }

        if (currentTreeMode === "familiar") activeFamiliarSkillId = newActiveSkillId;
        else if (currentTreeMode === "utility") activeUtilitySkillId = newActiveSkillId;
        else activeCombatSkillId = newActiveSkillId;

        const activeSkillData = pathwayData[newActiveSkillId] || null;
        const abilityState = activeAbilities.get(newActiveSkillId);
        const serverUpgrades = abilityState ? abilityState.upgrades : new Map();

        // Check locks
        const isCurrentlyViewedSkillLocked = committedAbilityId !== null && committedAbilityId !== newActiveSkillId;
        const isUtilityPathwayLockedOut = currentTreeMode === "utility" && committedUtilityPathway !== null && committedUtilityPathway !== currentUtilityPathway;
        const isFamiliarPathwayLockedOut = currentTreeMode === "familiar" && committedFamiliarPathway !== null && committedFamiliarPathway !== currentFamiliarPathway;
        const isSystemPathwayLockedOut = isUtilityPathwayLockedOut || isFamiliarPathwayLockedOut;

        // Theme colors per mode
        const tabColor = currentTreeMode === "familiar" ? "var(--neon-magenta)" : (currentTreeMode === "utility" ? "var(--neon-blue)" : "var(--neon-green)");

        // --- 1. Top Tabs ---
        let tabsHtml = `<div style="display:flex; gap: 10px; margin-bottom: 20px;">`;
        Object.keys(activeMap).forEach(category => {
            const isTabActive = category === activeCategoryTab;
            const displayName = `${activeMap[category].name} (Slot ${activeMap[category].slot})`;
            tabsHtml += `<button id="tab-${category}" class="st-btn-hover st-tab ${isTabActive ? 'active' : ''}" style="color: ${isTabActive ? tabColor : '#777'}; border-color: ${isTabActive ? tabColor : '#333'};">${displayName}</button>`;
        });
        tabsHtml += `</div>`;

        // --- Secondary System Selector (Utility/Familiar) ---
        let navHtml = "";
        if (currentTreeMode === "utility") {
            navHtml = `<div style="display:flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #333;">`;
            const utilPaths = [
                { id: "wayfinder", name: "Wayfinder", icon: '<i class="fa-solid fa-compass"></i>' },
                { id: "perception", name: "Perception", icon: '<i class="fa-solid fa-eye"></i>' },
                { id: "tinkerer", name: "Tinkerer", icon: '<i class="fa-solid fa-wrench"></i>' },
                { id: "mobility", name: "Mobility", icon: '<i class="fa-solid fa-wind"></i>' },
                { id: "agrarian", name: "Agrarian", icon: '<i class="fa-solid fa-wheat-awn"></i>' },
                { id: "forgemaster", name: "Forgemaster", icon: '<i class="fa-solid fa-hammer"></i>' },
                { id: "artisan", name: "Artisan", icon: '<i class="fa-solid fa-palette"></i>' },
                { id: "publican", name: "Publican", icon: '<i class="fa-solid fa-beer-mug-empty"></i>' },
                { id: "architect", name: "Architect", icon: '<i class="fa-solid fa-monument"></i>' },
                { id: "alchemist", name: "Alchemist", icon: '<i class="fa-solid fa-flask"></i>' }
            ];
            
            utilPaths.forEach(up => {
                const isActive = currentUtilityPathway === up.id;
                const isLocked = committedUtilityPathway && committedUtilityPathway !== up.id;
                navHtml += `<button id="nav-system-${up.id}" class="st-btn-hover st-util-nav-btn ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}" style="${isActive ? `color: ${tabColor}; border-color: ${tabColor};` : ''}">${up.icon} ${up.name}</button>`;
            });
            navHtml += `</div>`;
        } else if (currentTreeMode === "familiar") {
            navHtml = `<div style="display:flex; flex-wrap: wrap; gap: 8px; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #333;">`;
            const famPaths = [
                { id: "apocalyptic_swarm", name: "Apocalyptic Swarm", icon: '🩸' },
                { id: "orbital_arbiter", name: "Orbital Arbiter", icon: '👁️' },
                { id: "void_servant", name: "Void Servant", icon: '🌌' },
                { id: "shadow_monarch", name: "Sovereign's Legion", icon: '👑' },
                { id: "dragon_hoarder", name: "Dragon Hoarder", icon: '🐉' },
                { id: "symbiotic_spirit", name: "Symbiotic Spirit", icon: '🧚' },
                { id: "astral_reflection", name: "Astral Reflection", icon: '🪞' },
                { id: "primal_beast", name: "Primal Beast", icon: '🐻' },
                { id: "radiant_seraph", name: "Radiant Seraph", icon: '👼' }
            ];
            
            famPaths.forEach(up => {
                const isActive = currentFamiliarPathway === up.id;
                const isLocked = committedFamiliarPathway && committedFamiliarPathway !== up.id;
                navHtml += `<button id="nav-system-${up.id}" class="st-btn-hover st-util-nav-btn ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}" style="${isActive ? `color: ${tabColor}; border-color: ${tabColor};` : ''}">${up.icon} ${up.name}</button>`;
            });
            navHtml += `</div>`;
        }

        // --- 2. Left Pane: Ability Selection ---
        let leftPaneHtml = `<div class="st-scrollbar" style="display:flex; flex-direction:column; align-items:center; gap: 25px; margin-top: 10px;">`;
        
        if (abilityKeys.length === 0) {
            leftPaneHtml += `<div style="color: #555; text-align: center; margin-top: 40px; font-style: italic;">No abilities discovered.</div>`;
        } else {
            abilityKeys.forEach((key, index) => {
                const skill = pathwayData[key];
                const isSelected = key === newActiveSkillId;
                const isLockedOut = isSystemPathwayLockedOut || (committedAbilityId !== null && committedAbilityId !== key);
                
                const color = isLockedOut ? '#444' : (skill.color || tabColor);
                const borderStyle = isSelected ? `2px solid ${color}` : `2px solid #333`;
                const shadowStyle = isSelected ? `box-shadow: 0 0 20px ${color}66, inset 0 0 10px ${color}33;` : "";
                const bg = isSelected ? "var(--st-panel)" : (isLockedOut ? "rgba(255,0,0,0.05)" : "#111");
                const textCol = isSelected ? "#fff" : (isLockedOut ? "#555" : "#777");
                const lockIcon = isLockedOut ? `<div style="position:absolute; top:-8px; right:-8px; font-size:12px; background:#111; color: var(--neon-red); border-radius:50%; border:1px solid var(--neon-red); width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; z-index:10;"><i class="fa-solid fa-lock"></i></div>` : ``;
                
                leftPaneHtml += `
                    <div id="btn-skill-${key}" class="st-btn-hover" style="width: 100%; display: flex; flex-direction: column; align-items: center; position: relative; ${isLockedOut ? 'opacity: 0.6;' : ''}">
                        ${lockIcon}
                        <div style="width: 70px; height: 70px; background: ${bg}; border: ${borderStyle}; border-radius: 12px; display:flex; justify-content:center; align-items:center; font-size: 32px; ${shadowStyle} color: ${color}; margin-bottom: 8px; position:relative;">
                            <span style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.5)); ${isLockedOut ? 'filter: grayscale(100%);' : ''}">${skill.icon}</span>
                        </div>
                        <div style="font-size: 13px; font-family: var(--st-font-header); color: ${textCol}; text-align: center;">${skill.name}</div>
                    </div>
                `;
                
                if (index < abilityKeys.length - 1) {
                    leftPaneHtml += `<div style="color: #444; font-size: 12px; font-weight: bold; letter-spacing: 2px;">OR</div>`;
                }
            });
        }
        leftPaneHtml += `</div>`;

        // --- 3. Right Pane: Ability Details & Upgrade Tree ---
        let rightPaneHtml = "";

        if (activeSkillData) {
            const isEquipped = playerHotbar[`slot${targetSlot}` as keyof typeof playerHotbar] === newActiveSkillId;
            
            let equipBtnStyle = `background: ${tabColor}33; color: ${tabColor}; border: 1px solid ${tabColor};`;
            let equipBtnText = `<i class="fa-solid fa-link"></i> COMMIT TO SLOT ${targetSlot}`;
            let equipDisabled = "";

            if (isSystemPathwayLockedOut) {
                equipBtnStyle = "background: rgba(255, 0, 0, 0.2); color: var(--neon-red); border: 1px solid var(--neon-red); cursor: not-allowed;";
                equipBtnText = '<i class="fa-solid fa-lock"></i> SYSTEM LOCKED';
                equipDisabled = "disabled";
            } else if (isCurrentlyViewedSkillLocked) {
                equipBtnStyle = "background: rgba(255, 0, 0, 0.2); color: var(--neon-red); border: 1px solid var(--neon-red); cursor: not-allowed;";
                equipBtnText = '<i class="fa-solid fa-lock"></i> BRANCH LOCKED';
                equipDisabled = "disabled";
            } else if (isEquipped) {
                equipBtnStyle = `background: ${tabColor}11; color: ${tabColor}; border: 1px solid ${tabColor}; cursor: default; opacity: 0.7;`;
                equipBtnText = '<i class="fa-solid fa-check"></i> COMMITTED & EQUIPPED';
                equipDisabled = "disabled";
            }

            // HWFWM Proficiency Progress Bar
            let proficiencyHtml = "";
            if (abilityState && !isCurrentlyViewedSkillLocked && !isSystemPathwayLockedOut) {
                const rankColorMap: Record<string, string> = {
                    "Iron": "#a19d94", "Bronze": "#cd7f32", "Silver": "#c0c0c0", "Gold": "#ffd700", "Diamond": "var(--neon-cyan)"
                };
                
                const currentRankStr = abilityState.rank || "Iron";
                const rCol = rankColorMap[currentRankStr] || "#a19d94";
                const profValue = abilityState.proficiency || 0;
                const isReadyToConsolidate = profValue >= 100;
                
                proficiencyHtml = `
                    <div style="margin-top: 12px; background: rgba(0,0,0,0.4); padding: 10px; border-radius: 8px; border: 1px solid #333;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px; font-size: 12px; font-family: var(--st-font-header);">
                            <span style="color: ${rCol}; text-transform: uppercase;">${currentRankStr} Rank <span style="color: #aaa;">(Lv. ${abilityState.level || 0})</span></span>
                            <span style="color: ${isReadyToConsolidate ? 'var(--neon-green)' : '#aaa'};">${isReadyToConsolidate ? 'Ready to Consolidate (Meditate)' : profValue.toFixed(1) + '%'}</span>
                        </div>
                        <div style="width: 100%; height: 6px; background: #111; border-radius: 3px; overflow: hidden; border: 1px solid #222;">
                            <div class="progress-fill" style="width: ${profValue}%; height: 100%; background: ${isReadyToConsolidate ? 'var(--neon-green)' : rCol}; box-shadow: 0 0 5px ${isReadyToConsolidate ? 'var(--neon-green)' : rCol};"></div>
                        </div>
                    </div>
                `;
            }

            // Ability Header
            rightPaneHtml += `
                <div style="display:flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 20px;">
                    <div style="display:flex; align-items: flex-start; gap: 15px; flex: 1;">
                        <div style="width: 60px; height: 60px; font-size: 36px; background: rgba(0,0,0,0.4); border: 1px solid #444; border-radius: 8px; display:flex; justify-content:center; align-items:center;">
                            ${activeSkillData.icon}
                        </div>
                        <div style="flex: 1;">
                            <h2 style="margin: 0 0 5px 0; font-family: var(--st-font-header); color: ${(isCurrentlyViewedSkillLocked || isSystemPathwayLockedOut) ? '#555' : activeSkillData.color}; text-transform: uppercase; font-size: 24px; letter-spacing: 1px; text-shadow: 0 0 10px ${(isCurrentlyViewedSkillLocked || isSystemPathwayLockedOut) ? '#000' : activeSkillData.color + '66'};">
                                ${activeSkillData.name}
                            </h2>
                            <div style="color: #aaa; font-size: 14px; line-height: 1.4;">${activeSkillData.desc}</div>
                            <div style="color: #555; font-size: 12px; margin-top: 6px; font-family: var(--st-font-header);"><i class="fa-regular fa-clock"></i> BASE COOLDOWN: ${activeSkillData.cooldownTime}s</div>
                            ${proficiencyHtml}
                        </div>
                    </div>
                    <button id="btn-equip-pathway" class="${equipDisabled ? '' : 'st-btn-hover'}" ${equipDisabled} style="${equipBtnStyle} padding: 12px 20px; border-radius: 6px; text-transform: uppercase; font-size: 12px; margin-left: 20px; min-width: 160px;">
                        ${equipBtnText}
                    </button>
                </div>
            `;

            // Status Banner
            if (isSystemPathwayLockedOut) {
                const blockingName = currentTreeMode === "utility" 
                    ? (UTILITY_TREE_DATA[committedUtilityPathway!]?.core?.[Object.keys(UTILITY_TREE_DATA[committedUtilityPathway!].core)[0]]?.name || committedUtilityPathway)
                    : (FAMILIAR_TREE_DATA[committedFamiliarPathway!]?.core?.[Object.keys(FAMILIAR_TREE_DATA[committedFamiliarPathway!].core)[0]]?.name || committedFamiliarPathway);
                
                rightPaneHtml += `
                    <div class="st-alert st-alert-danger">
                        <div style="font-family: var(--st-font-header); margin-bottom: 4px;"><i class="fa-solid fa-lock"></i> SYSTEM LOCKED (RESET SKILLS TO CHANGE)</div>
                        <span style="font-size: 13px;">You have committed your points to the <strong>${(blockingName as string).toUpperCase()}</strong> system.</span>
                    </div>
                `;
            } else if (isCurrentlyViewedSkillLocked) {
                const blockingSkillName = pathwayData[committedAbilityId!] ? pathwayData[committedAbilityId!].name : "another branch";
                rightPaneHtml += `
                    <div class="st-alert st-alert-danger">
                        <div style="font-family: var(--st-font-header); margin-bottom: 4px;"><i class="fa-solid fa-lock"></i> BRANCH LOCKED (RESET SKILLS TO CHANGE)</div>
                        <span style="font-size: 13px;">You have already committed points to <strong>${blockingSkillName}</strong> in this category.</span>
                    </div>
                `;
            } else if (committedAbilityId === newActiveSkillId) {
                rightPaneHtml += `
                    <div class="st-alert st-alert-success">
                        <div style="font-family: var(--st-font-header); margin-bottom: 4px;"><i class="fa-solid fa-check-circle"></i> PATHWAY COMMITTED</div>
                        <span style="color: #aaa; font-size: 13px;">You have bound your progression to this path. Alternative choices are now locked.</span>
                    </div>
                `;
            } else {
                rightPaneHtml += `
                    <div class="st-alert st-alert-warning">
                        <div style="font-family: var(--st-font-header); margin-bottom: 4px;"><i class="fa-solid fa-triangle-exclamation"></i> COMMITMENT REQUIRED</div>
                        <span style="color: #aaa; font-size: 13px;">Spending points here will permanently lock out the other choices in this category.</span>
                    </div>
                `;
            }

            rightPaneHtml += `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                    <h3 style="color: #fff; margin: 0; font-size: 18px; font-family: var(--st-font-header);">Upgrades & Evolutions</h3>
                </div>
                <div class="st-scrollbar" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; overflow-y: auto; flex-grow: 1; padding-right: 5px;">
            `;

            const upgradeKeys = Object.keys(activeSkillData.upgrades || {});

            if (upgradeKeys.length === 0) {
                rightPaneHtml += `<div style="grid-column: 1 / -1; display:flex; justify-content:center; align-items:center; height: 200px; color: #555; font-style: italic; background: rgba(0,0,0,0.2); border-radius: 8px; border: 1px dashed #333;">The mysteries of this ability have not yet been uncovered.</div>`;
            } else {
                
                const rankHierarchy: Record<string, number> = {
                    "Iron": 1, "Bronze": 2, "Silver": 3, "Gold": 4, "Diamond": 5
                };
                const playerRankNum = rankHierarchy[me.rank] || 1;

                upgradeKeys.forEach((uKey) => {
                    const uData = activeSkillData.upgrades[uKey];
                    const sUpg = serverUpgrades.get(uKey);
                    
                    const cRank = sUpg ? sUpg.currentRank : 0;
                    const mRank = uData.maxRank;
                    
                    const isMaxed = cRank >= mRank;
                    const canAfford = unspentAwakening > 0;
                    
                    const nextSkillRankNum = cRank + 1;
                    const meetsRankRequirement = playerRankNum >= nextSkillRankNum;
                    
                    const btnState = (isMaxed || !canAfford || !isEquipped || !meetsRankRequirement || isCurrentlyViewedSkillLocked || isSystemPathwayLockedOut) ? "disabled" : "";
                    
                    let btnText = '<i class="fa-solid fa-gem"></i> AWAKEN (1)';
                    let btnBg = "rgba(0, 255, 170, 0.1)";
                    let btnCol = "var(--neon-green)";
                    let btnBorder = "1px solid var(--neon-green)";
                    let cursor = "pointer";
                    
                    if (isSystemPathwayLockedOut || isCurrentlyViewedSkillLocked) {
                        btnText = '<i class="fa-solid fa-lock"></i> LOCKED';
                        btnBg = "rgba(0,0,0,0.3)"; btnCol = "#555"; btnBorder = "1px solid #333"; cursor = "not-allowed";
                    } else if (!isEquipped) {
                        btnText = '<i class="fa-solid fa-link"></i> COMMIT FIRST';
                        btnBg = "rgba(0,0,0,0.3)"; btnCol = "var(--neon-amber)"; btnBorder = "1px solid #555"; cursor = "not-allowed";
                    } else if (isMaxed) {
                        btnText = '<i class="fa-solid fa-star"></i> MAX RANK';
                        btnBg = "rgba(0,0,0,0.3)"; btnCol = "var(--neon-amber)"; btnBorder = "1px solid #555"; cursor = "not-allowed";
                    } else if (!meetsRankRequirement) {
                        let reqRankName = "Iron";
                        if (nextSkillRankNum === 2) reqRankName = "Bronze";
                        if (nextSkillRankNum === 3) reqRankName = "Silver";
                        if (nextSkillRankNum === 4) reqRankName = "Gold";
                        if (nextSkillRankNum === 5) reqRankName = "Diamond";

                        btnText = `REQUIRES ${reqRankName.toUpperCase()}`;
                        btnBg = "rgba(0,0,0,0.3)"; btnCol = "#888888"; btnBorder = "1px solid #444"; cursor = "not-allowed";
                    } else if (!canAfford) {
                        btnText = "NO STONES";
                        btnBg = "rgba(0,0,0,0.3)"; btnCol = "var(--neon-red)"; btnBorder = "1px solid #555"; cursor = "not-allowed";
                    }

                    let timelineHtml = `
                        <div style="background: rgba(255,255,255,0.02); border: 1px solid #222; border-radius: 10px; display: flex; flex-direction: column; overflow: hidden;">
                            <div style="background: rgba(0,0,0,0.4); padding: 15px; border-bottom: 1px solid #222; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <h4 style="margin: 0 0 5px 0; color: #fff; font-size: 16px; font-family: var(--st-font-header);">${uData.name}</h4>
                                    <span style="font-size: 12px; font-weight: bold; color: ${cRank === mRank ? 'var(--neon-amber)' : '#888'}; background: #111; padding: 2px 8px; border-radius: 12px; border: 1px solid #333;">Rank ${cRank} / ${mRank}</span>
                                </div>
                                <button id="btn-awaken-${uKey}" class="${btnState === '' ? 'st-btn-hover' : ''}" ${btnState} style="padding: 8px 12px; background: ${btnBg}; color: ${btnCol}; border: ${btnBorder}; border-radius: 6px; font-size: 12px; cursor: ${cursor};">
                                    ${btnText}
                                </button>
                            </div>
                            
                            <div style="padding: 20px 15px; flex-grow: 1; position: relative;">
                                <div style="position: absolute; left: 22px; top: 30px; bottom: 30px; width: 2px; background: #333; z-index: 0;"></div>
                    `;

                    if (uData.rankDescs) {
                        uData.rankDescs.forEach((desc: string, i: number) => {
                            const rankNum = i + 1;
                            const isUnlocked = cRank >= rankNum;
                            const isNext = cRank === rankNum - 1 && !isCurrentlyViewedSkillLocked && !isSystemPathwayLockedOut;
                            
                            let rankColor = '#cccccc'; 
                            let rankTitle = 'Iron Rank';
                            
                            if (currentTreeMode === "combat") {
                                if (rankNum === 2) { rankColor = '#cd7f32'; rankTitle = 'Bronze Rank'; }
                                if (rankNum === 3) { rankColor = 'var(--neon-green)'; rankTitle = 'Silver Rank'; }
                            } else {
                                if (activeCategoryTab === "core") rankTitle = `Tier ${rankNum}`;
                                else rankTitle = `Tier ${rankNum + 5}`; // Branches start at Tier 6
                                
                                if (rankNum === 2) rankColor = '#cd7f32';
                                if (rankNum === 3) rankColor = 'var(--neon-green)';
                                if (rankNum === 4) rankColor = 'var(--neon-magenta)';
                                if (rankNum === 5) rankColor = 'var(--neon-amber)';
                            }
                            
                            if (desc.includes("[EVOLUTION]")) { rankColor = 'var(--neon-amber)'; rankTitle = 'Evolution'; }

                            const dotColor = isUnlocked ? rankColor : '#111';
                            const dotBorder = isUnlocked ? '#fff' : '#444';
                            const glowClass = isUnlocked ? `color: ${rankColor};` : '';
                            const textColor = isUnlocked ? '#fff' : (isNext ? '#aaa' : '#555');

                            timelineHtml += `
                                <div style="position: relative; z-index: 1; margin-bottom: ${rankNum === mRank ? '0' : '25px'}; display: flex; align-items: flex-start; gap: 15px;">
                                    <div class="${isUnlocked ? 'st-node-active' : ''}" style="width: 16px; height: 16px; border-radius: 50%; background: ${dotColor}; border: 2px solid ${dotBorder}; margin-top: 2px; flex-shrink: 0; ${isUnlocked ? `box-shadow: 0 0 8px ${rankColor};` : ''}"></div>
                                    <div>
                                        <div style="font-family: var(--st-font-header); font-size: 11px; margin-bottom: 4px; ${glowClass} ${!isUnlocked && !isNext ? 'color: #444;' : ''}">${rankTitle}</div>
                                        <div style="font-size: 13px; line-height: 1.4; color: ${textColor};">${desc}</div>
                                    </div>
                                </div>
                            `;
                        });
                    }

                    timelineHtml += `</div></div>`; 
                    rightPaneHtml += timelineHtml;
                });
            }

            rightPaneHtml += `</div>`;
        }

        const headerTitleText = currentTreeMode === "familiar" ? "FAMILIAR COVENANTS" : (currentTreeMode === "utility" ? "UTILITY SYSTEMS" : "COMBAT ESSENCES");

        let modeButtonsHtml = `
            <div style="display: flex; gap: 10px;">
                <button id="mode-btn-combat" class="st-btn-hover" style="background: ${currentTreeMode === 'combat' ? 'rgba(255,68,68,0.2)' : 'rgba(0,0,0,0.5)'}; border: 1px solid ${currentTreeMode === 'combat' ? 'var(--neon-red)' : '#444'}; color: ${currentTreeMode === 'combat' ? 'var(--neon-red)' : '#888'}; padding: 8px 15px; border-radius: 6px; box-shadow: ${currentTreeMode === 'combat' ? 'inset 0 0 10px rgba(255,68,68,0.5)' : 'none'};">
                    <i class="fa-solid fa-khanda"></i> COMBAT
                </button>
                <button id="mode-btn-utility" class="st-btn-hover" style="background: ${currentTreeMode === 'utility' ? 'rgba(0,170,255,0.2)' : 'rgba(0,0,0,0.5)'}; border: 1px solid ${currentTreeMode === 'utility' ? 'var(--neon-blue)' : '#444'}; color: ${currentTreeMode === 'utility' ? 'var(--neon-blue)' : '#888'}; padding: 8px 15px; border-radius: 6px; box-shadow: ${currentTreeMode === 'utility' ? 'inset 0 0 10px rgba(0,170,255,0.5)' : 'none'};">
                    <i class="fa-solid fa-gears"></i> UTILITY
                </button>
                <button id="mode-btn-familiar" class="st-btn-hover" style="background: ${currentTreeMode === 'familiar' ? 'rgba(255,0,170,0.2)' : 'rgba(0,0,0,0.5)'}; border: 1px solid ${currentTreeMode === 'familiar' ? 'var(--neon-magenta)' : '#444'}; color: ${currentTreeMode === 'familiar' ? 'var(--neon-magenta)' : '#888'}; padding: 8px 15px; border-radius: 6px; box-shadow: ${currentTreeMode === 'familiar' ? 'inset 0 0 10px rgba(255,0,170,0.5)' : 'none'};">
                    <i class="fa-solid fa-dragon"></i> FAMILIAR
                </button>
            </div>
        `;

        modal!.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 20px;">
              <h2 class="st-header-title" style="min-width: 250px;">${headerTitleText}</h2>
              ${modeButtonsHtml}
            </div>
            
            <div style="display: flex; gap: 15px; align-items: center;">
                <div class="st-stat-pill" style="border: 1px solid var(--neon-green); color: var(--neon-green);">
                    <i class="fa-solid fa-droplet"></i> Essence: ${unspentEssence}
                </div>
                <div class="st-stat-pill" style="border: 1px solid var(--neon-amber); color: var(--neon-amber);">
                    <i class="fa-solid fa-gem"></i> Awakening: ${unspentAwakening}
                </div>
                <button id="close-skills-btn" class="st-btn-hover" style="background:none; border:none; color:var(--neon-red); font-size:32px; padding-left: 15px;"><i class="fa-solid fa-xmark"></i></button>
            </div>
          </div>
          
          ${navHtml}
          ${tabsHtml}

          <div style="display:flex; gap: 20px; height: calc(100% - ${(currentTreeMode === 'utility' || currentTreeMode === 'familiar') ? '220px' : '130px'});">
            <div class="st-pane-bg" style="flex: 0 0 120px; padding: 15px 10px; overflow-y: auto;">
                ${leftPaneHtml}
            </div>
            <div class="st-pane-bg" style="flex: 1; padding: 25px; display: flex; flex-direction: column;">
                ${rightPaneHtml}
            </div>
          </div>
        `;

        // --- Attach Event Listeners ---
        document.getElementById("close-skills-btn")!.onclick = () => {
            isSkillTreeUIOpen = false;
            if (document.body.contains(modal!)) document.body.removeChild(modal!);
        };

        const bindModeBtn = (id: string, mode: TreeMode) => {
            const btn = document.getElementById(id);
            if (btn) btn.onclick = () => { currentTreeMode = mode; renderTree(); };
        };
        bindModeBtn("mode-btn-combat", "combat");
        bindModeBtn("mode-btn-utility", "utility");
        bindModeBtn("mode-btn-familiar", "familiar");

        if (currentTreeMode === "utility") {
            const allUtilIds = ["wayfinder", "perception", "tinkerer", "mobility", "agrarian", "forgemaster", "artisan", "publican", "architect", "alchemist"];
            allUtilIds.forEach(pathId => {
                const btn = document.getElementById(`nav-system-${pathId}`);
                if (btn) {
                    btn.onclick = () => {
                        currentUtilityPathway = pathId;
                        activeUtilitySkillId = "";
                        renderTree();
                    };
                }
            });
        } else if (currentTreeMode === "familiar") {
            const allFamIds = ["apocalyptic_swarm", "orbital_arbiter", "void_servant", "shadow_monarch", "dragon_hoarder", "symbiotic_spirit", "astral_reflection", "primal_beast", "radiant_seraph"];
            allFamIds.forEach(pathId => {
                const btn = document.getElementById(`nav-system-${pathId}`);
                if (btn) {
                    btn.onclick = () => {
                        currentFamiliarPathway = pathId;
                        activeFamiliarSkillId = "";
                        renderTree();
                    };
                }
            });
        }

        Object.keys(activeMap).forEach(category => {
            const tabBtn = document.getElementById(`tab-${category}`);
            if (tabBtn) {
                tabBtn.onclick = () => {
                    if (currentTreeMode === "familiar") {
                        activeFamiliarCategoryTab = category;
                        activeFamiliarSkillId = "";
                    } else if (currentTreeMode === "utility") {
                        activeUtilityCategoryTab = category;
                        activeUtilitySkillId = "";
                    } else {
                        activeCombatCategoryTab = category;
                        activeCombatSkillId = ""; 
                    }
                    renderTree();
                }
            }
        });

        abilityKeys.forEach(key => {
            const btn = document.getElementById(`btn-skill-${key}`);
            if (btn) {
                btn.onclick = () => {
                    if (currentTreeMode === "familiar") activeFamiliarSkillId = key;
                    else if (currentTreeMode === "utility") activeUtilitySkillId = key;
                    else activeCombatSkillId = key;
                    renderTree();
                };
            }
        });

        if (activeSkillData) {
            const equipBtnNode = document.getElementById("btn-equip-pathway");
            const isEquipped = playerHotbar[`slot${targetSlot}` as keyof typeof playerHotbar] === newActiveSkillId;
            
            if (equipBtnNode && !isEquipped && !isCurrentlyViewedSkillLocked && !isSystemPathwayLockedOut) {
                equipBtnNode.onclick = () => {
                    playerHotbar[`slot${targetSlot}` as keyof typeof playerHotbar] = newActiveSkillId;
                    saveHotbar();
                    renderHotbar();
                    renderTree();
                };
            }

            const upgradeKeys = Object.keys(activeSkillData.upgrades || {});
            upgradeKeys.forEach(uKey => {
                const btn = document.getElementById(`btn-awaken-${uKey}`);
                if (btn && !btn.hasAttribute('disabled')) {
                    btn.onclick = () => {
                        if (activeRoom) {
                            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> AWAKENING...';
                            btn.style.opacity = "0.5";
                            btn.style.cursor = "wait";
                            btn.setAttribute("disabled", "true");

                            localCommittedSlots[activeCategoryTab] = newActiveSkillId;
                            activeRoom.send("upgradeSkill", { abilityId: newActiveSkillId, upgradeId: uKey });
                            
                            playerHotbar[`slot${targetSlot}` as keyof typeof playerHotbar] = newActiveSkillId;
                            saveHotbar();
                            renderHotbar();
                            
                            setTimeout(renderTree, 150); 
                            setTimeout(renderTree, 350); 
                        }
                    };
                }
            });
        }
    };

    renderTree();
}