import * as THREE from "three";
import { 
    attemptAttack, 
    attemptAbility, 
    attemptQuickChat, 
    toggleChatChannel, 
    currentChatChannel, 
    ActionContext, 
    attemptFishing 
} from "./PlayerController";

import { TownScene } from "./TownScene";
import { ITEM_DB } from "../ItemDatabase";
import { getSkillDef } from "../data/AbilityDatabase";

// --- UI IMPORTS ---
// (Adjust paths as needed based on your structure)
import { 
    isSkillTreeUIOpen, setIsSkillTreeUIOpen, openSkillTreeUI, 
    temporarySkill, setTemporarySkill, abilityCooldowns, playerHotbar 
} from "../ui/AbilityUI";

import { 
    openQuestUI, openTeleportUI, openCasinoUI, openInventoryUI, 
    openChestUI, openShopUI, openBlueprintSelector, openMirrorUI,
    isQuestUIOpen, isTeleportUIOpen, isCasinoUIOpen, isInventoryUIOpen,
    isChestUIOpen, isShopUIOpen, isMirrorUIOpen
} from "../ui/ModalManager";

import { isWorldMapOpen, setIsWorldMapOpen, addGameEvent, openCraftingMenu, openStoreMenu } from "../ui/HUDManager";

// ==========================================
// EXPORTED INPUT STATE (Read by Main Game Loop)
// ==========================================

export const keys = { 
    KeyW: false, KeyA: false, KeyS: false, KeyD: false, 
    ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, 
    ShiftLeft: false, ShiftRight: false
};

export let isHoldingTab = false;
export let isShadowMapActive = false;
export const localTargetPos = { x: 0, z: 0 };

// Used for raycasting and range checks
function distanceSq(x1: number, y1: number, x2: number, y2: number): number {
    return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

// ==========================================
// MANAGER INITIALIZATION
// ==========================================

export type InputDependencies = {
    getRoom: () => any;
    getScene: () => any;
    getContext: () => ActionContext;
    getMe: () => any;
    getCurrentZone: () => string | null;
    getHoverPos: () => { x: number, y: number };
    getIsLocallyWolf: () => boolean;
    getPlayerConfig: () => { name: string, class: string, pathway: string, auraStyle: string, auraStyles: string[], essences: string[] };
    setPlayerConfig: (key: string, val: string) => void;
    adminResetCommitments: () => void;
    initDefaultHotbar: (path: string) => void;
    renderHotbar: () => void;
    MARKET_STALLS: any[];
    CASINO_TABLES: any[];
};

export function initInputManager(deps: InputDependencies): void {

    window.addEventListener("keydown", (event) => {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
            event.preventDefault();
        }

        if (event.code === "ShiftLeft" || event.key === "Shift") keys.ShiftLeft = true;
        if (Object.prototype.hasOwnProperty.call(keys, event.code)) {
            keys[event.code as keyof typeof keys] = true;
        }

        const room = deps.getRoom();
        const scene = deps.getScene();
        const ctx = deps.getContext();
        const me = deps.getMe();
        const config = deps.getPlayerConfig();

        // --- QUICK CHAT SYSTEM ---
        if (event.key === "Tab" && event.shiftKey) {
            event.preventDefault(); 
            toggleChatChannel();
            addGameEvent(`Switched chat to: <b>${currentChatChannel.toUpperCase()}</b>`, "event-info");
            if (typeof (window as any).renderChatHotbar === "function") (window as any).renderChatHotbar(true); 
            if (room) room.send("quest_action", { actionId: "toggle_utility" });
            return;
        }

        if (event.key === "Tab" && !event.shiftKey) {
            event.preventDefault(); 
            if (!isHoldingTab) {
                isHoldingTab = true;
                if (typeof (window as any).renderChatHotbar === "function") (window as any).renderChatHotbar(true); 
                if (room) room.send("quest_action", { actionId: "toggle_utility" });
            }
            return;
        }

        if (isHoldingTab && event.key >= "1" && event.key <= "8") {
            event.preventDefault();
            attemptQuickChat(ctx, event.key);
            isHoldingTab = false;
            if (typeof (window as any).renderChatHotbar === "function") (window as any).renderChatHotbar(false); 
            return;
        }

        // --- ADMIN & DEBUG ---
        if (event.code === "F2" || event.key === "\\") { 
            const panel = document.getElementById("admin-panel");
            if (panel) panel.style.display = panel.style.display === "none" ? "block" : "none";
            return; 
        }

        if (event.key === "y" || event.key === "Y") {
            if (scene && typeof scene.sceneryVisuals !== "undefined") {
                console.log("=== SCENERY DUMP ===");
                console.log(`Total Scenery Loaded: ${scene.sceneryVisuals.size}`);
            }
            return;
        }

        // --- UI ESCAPE HANDLERS ---
        if (document.getElementById("meditation-ui")?.style.display === "block") {
            if (event.key === "Escape") {
                document.getElementById("meditation-ui")!.style.display = "none";
                if (room) room.send("toggle_meditate"); 
            }
            return; 
        }

        const modalsToClose = [
            { id: "blueprint-modal", btn: "close-bp-btn" },
            { id: "crafting-modal", btn: null },
            { id: "store-management-modal", btn: null }
        ];

        for (const modal of modalsToClose) {
            const el = document.getElementById(modal.id);
            if (el?.style.display === "block" && event.key === "Escape") {
                if (modal.btn) document.getElementById(modal.btn)?.click();
                else el.style.display = "none";
                return;
            }
        }

        if (isWorldMapOpen && event.key === "Escape") {
            setIsWorldMapOpen(false);
            const m = document.getElementById("world-map-modal");
            if (m) m.style.display = "none";
            return;
        }

        if (isSkillTreeUIOpen && (event.key === "Escape" || event.key.toLowerCase() === "k")) {
            setIsSkillTreeUIOpen(false);
            const m = document.getElementById("skill-tree-modal");
            if (m) document.body.removeChild(m);
            return; 
        }

        if (isTeleportUIOpen && (event.key === "Escape" || event.key.toLowerCase() === "t")) return document.getElementById("close-teleport-btn")?.click();
        if (isQuestUIOpen && event.key === "Escape") return document.getElementById("close-quest-btn")?.click();
        if (isInventoryUIOpen && (event.key === "Escape" || event.key.toLowerCase() === "i")) return document.getElementById("close-inv-btn")?.click();
        if (isShopUIOpen && event.key === "Escape") return document.getElementById("close-shop-btn")?.click();
        if (isChestUIOpen && (event.key === "Escape" || event.key.toLowerCase() === "i")) return document.getElementById("close-chest-btn")?.click();
        if (isCasinoUIOpen && event.key === "Escape") return document.getElementById("close-casino-btn")?.click();
        if (isMirrorUIOpen && event.key === "Escape") return document.getElementById("close-mirror-btn")?.click();

        // --- SLEEP / MEDITATE WAKE UP ---
        if (me?.isSleeping || me?.isMeditating) {
            if (["w", "a", "s", "d", " ", "e"].includes(event.key.toLowerCase()) || event.code === "Space") {
                if (me.isSleeping) room?.send("wakeUp");
                if (me.isMeditating) room?.send("toggle_meditate");
            }
            return;
        }

        // --- ABILITIES & COMBAT ---
        if (!isHoldingTab) {
            
            if (event.key === "2") {
                const isWolf = (me && me.isSpiritAnimal) || deps.getIsLocallyWolf();
                if (isWolf && room) return room.send("cancelSpiritAnimal");

                if (playerHotbar.slot2 === "shadow_step") {
                    let wayRank = 0;
                    if (me?.skillTree?.activeAbilities) {
                        const shadowStep = me.skillTree.activeAbilities.get("shadow_step");
                        wayRank = shadowStep?.upgrades?.get("way_of_the_night")?.currentRank || 0;
                    }

                    if (wayRank >= 2) {
                        isShadowMapActive = !isShadowMapActive;
                    } else {
                        const dashDist = wayRank === 1 ? 10.0 : 6.0; 
                        const targetX = ctx.localPos.x + (ctx.facing.dx * dashDist);
                        const targetZ = ctx.localPos.y + (ctx.facing.dy * dashDist);
                        room!.send("useAbility", { abilityId: "shadow_step", targetX, targetZ, subType: "dash" });
                        abilityCooldowns.slot2 = getSkillDef("shadow_step")?.cooldownTime || 5.0;
                    }
                } else {
                    attemptAbility(2, ctx);
                }
                return;
            }
            
            for (let i = 3; i <= 9; i++) {
                if (event.key === i.toString()) return attemptAbility(i, ctx);
            }
        }

        if (event.code === "ShiftRight") {
            const isWolf = (me && me.isSpiritAnimal) || deps.getIsLocallyWolf();
            if (isWolf && room) return room.send("cancelSpiritAnimal");

            if (temporarySkill && room) {
                const portalX = ctx.localPos.x + (ctx.facing.dx * 8.0);
                const portalZ = ctx.localPos.y + (ctx.facing.dy * 8.0);
                room.send("useAbility", { abilityId: temporarySkill.id, targetX: portalX, targetZ: portalZ });
            }
            return;
        }

        // --- UTILITY HOTKEYS ---
        if (event.key.toLowerCase() === "v") return room?.send("toggle_mount");
        if (event.key.toLowerCase() === "x") return room?.send("toggle_aura");
        if (event.key.toLowerCase() === "h") return room?.send("requestCommunion");
        if (event.key.toLowerCase() === "z") return room?.send("toggle_meditate");
        if (event.key.toLowerCase() === "c") return scene?.resetCamera?.();
        if (event.key.toLowerCase() === "k") return openSkillTreeUI(room, config.pathway, keys);
        if (event.key.toLowerCase() === "i") return openInventoryUI(room, keys, config.class);
        if (event.key.toLowerCase() === "t") return openTeleportUI(room, keys);
        if (event.key.toLowerCase() === "q" && scene instanceof TownScene && scene.isDecoMode) {
            scene.decoRotation += Math.PI / 2; 
            return;
        }

        // --- SHIFT MODIFIERS (Auras & Pathways) ---
        if (event.shiftKey && event.key.toLowerCase() === "u") {
            const nextIdx = (config.auraStyles.indexOf(config.auraStyle) + 1) % config.auraStyles.length;
            deps.setPlayerConfig("auraStyle", config.auraStyles[nextIdx]);
            room?.send("set_aura_style", { style: config.auraStyles[nextIdx] });
            return;
        }

        if (event.shiftKey && event.key.toLowerCase() === "l") return room?.send("adminLevelUp");
        
        if (event.shiftKey && event.key.toLowerCase() === "r") {
            room?.send("adminResetSkills");
            deps.adminResetCommitments();
            return;
        }

        if (event.shiftKey && event.key.toLowerCase() === "p") {
            const nextIdx = (config.essences.indexOf(config.pathway) + 1) % config.essences.length;
            const newPathway = config.essences[nextIdx];
            deps.setPlayerConfig("pathway", newPathway);
            deps.adminResetCommitments();
            deps.initDefaultHotbar(newPathway);
            deps.renderHotbar();
            
            if (room) {
                room.send("changePathway", { pathwayId: newPathway });
                room.send("adminResetSkills"); 
            }
            return;
        }

        // --- MAP TOGGLE ---
        if (event.key.toLowerCase() === "m") {
            const wayNode = me?.skillTree?.activeAbilities?.get("wayfinder_base");
            if ((wayNode?.upgrades.get("core_progression")?.currentRank || 0) >= 3) {
                setIsWorldMapOpen(!isWorldMapOpen);
                const mapModal = document.getElementById("world-map-modal");
                if (mapModal) mapModal.style.display = isWorldMapOpen ? "block" : "none";
            }
            return;
        }

        // --- INTERACTION LOGIC (F KEY) ---
        if (event.key.toLowerCase() === "f") {
            if (!room || !scene || ctx.isUIOpen) return;

            const isOutsideTown = scene instanceof TownScene && scene.isOutsideTown(ctx.localPos.x, ctx.localPos.y);

            if (deps.getCurrentZone() !== "town" || isOutsideTown) {
                const startedFishing = attemptFishing(ctx); 
                room.send("interact");
                if (!startedFishing) {
                    attemptAttack(ctx, false);
                }
                return;
            }

            // In-Town Interactions
            if (distanceSq(ctx.localPos.x, ctx.localPos.y, 35, -35) < 324.0) return openQuestUI(room, keys, config.name);
            if (distanceSq(ctx.localPos.x, ctx.localPos.y, 40, 40) < 16.0) return openMirrorUI(room, keys);

            // Stalls & Stores
            const activeStall = deps.MARKET_STALLS.find(s => distanceSq(ctx.localPos.x, ctx.localPos.y, s.x, s.y) < 36.0);
            if (activeStall) {
                if (activeStall.type === "⚒️ Blacksmith") return openCraftingMenu(room, me);
                
                const targetStoreState = room.state.stores?.find((s: any) => s.type === activeStall.type);
                if (targetStoreState) return openStoreMenu(room, me, targetStoreState);
            }

            // Casino
            const activeTable = deps.CASINO_TABLES.find(t => distanceSq(ctx.localPos.x, ctx.localPos.y, t.x, t.y) < 16.0);
            if (activeTable) return openCasinoUI(room, keys, activeTable.type);

            // Loot Chests
            let nearLoot = false;
            room.state.lootItems?.forEach((loot: any) => {
                if (loot.kind === "chest" && !loot.isOpen && distanceSq(ctx.localPos.x, ctx.localPos.y, loot.x, loot.y) <= 2.25) {
                    nearLoot = true;
                }
            });
            if (nearLoot) return room.send("interact");

            // Decorations
            let nearestDeco = null;
            let minDist = 9.0;
            room.state.decorations?.forEach((deco: any) => {
                const dSq = distanceSq(ctx.localPos.x, ctx.localPos.y, deco.x, deco.z);
                if (dSq < minDist) { nearestDeco = deco; minDist = dSq; }
            });

            if (nearestDeco) {
                if ((nearestDeco as any).type === "Storage Chest") return openChestUI(room, keys, (nearestDeco as any).id);
                if ((nearestDeco as any).type === "Oak Bed") return room.send("interactDecoration", { id: (nearestDeco as any).id });
                return;
            }

            // Fallthrough: No interaction targets found, swing weapon!
            attemptAttack(ctx, false);
        }

        // --- BUILD / BUY MODE (Outside Town) ---
        const isOutsideTownCheck = scene instanceof TownScene && scene.isOutsideTown(ctx.localPos.x, ctx.localPos.y);
        if (isOutsideTownCheck) {
            if (event.key.toLowerCase() === "b" && scene instanceof TownScene) {
                scene.isBuyMode = !scene.isBuyMode;
                if (scene.isBuyMode) scene.isBuildMode = false;
                return;
            }

            if (event.key.toLowerCase() === "v" && scene instanceof TownScene) {
                if (scene.isBuildMode) scene.isBuildMode = false;
                else openBlueprintSelector(scene, keys);
                return;
            }

            if (event.key.toLowerCase() === "r") {
                let activeBuildingId = null;
                room?.state.buildings?.forEach((bldg: any) => {
                    if (distanceSq(ctx.localPos.x, ctx.localPos.y, bldg.x, bldg.z) < 25.0 && !bldg.isConstructed) {
                        activeBuildingId = bldg.id;
                    }
                });
                if (activeBuildingId) room?.send("contributeResource", { buildingId: activeBuildingId });
                return;
            }

            if (event.key === "Enter" && scene instanceof TownScene) {
                const { x: hoverX, y: hoverY } = deps.getHoverPos();

                if (scene.isBuyMode) {
                    room?.send("buyLand");
                    scene.isBuyMode = false; 
                } else if (scene.isBuildMode) {
                    room?.send("placeBuilding", { x: Math.round(hoverX / 2) * 2, z: Math.round(hoverY / 2) * 2, type: (scene as any).currentBlueprintType });
                    scene.isBuildMode = false;
                } else if (scene.isDecoMode) {
                    room?.send("placeDecoration", { 
                        type: me.equippedItem, 
                        x: Math.round(hoverX * 2) / 2, 
                        z: Math.round(hoverY * 2) / 2, 
                        rotation: scene.decoRotation 
                    });
                }
                return;
            }
        }
    });

    window.addEventListener("keyup", (event) => {
        if (event.code === "ShiftLeft" || event.key === "Shift") keys.ShiftLeft = false;
        if (Object.prototype.hasOwnProperty.call(keys, event.code)) {
            keys[event.code as keyof typeof keys] = false;
        }

        if (event.key === "Tab") {
            event.preventDefault();
            isHoldingTab = false;
            if (typeof (window as any).renderChatHotbar === "function") (window as any).renderChatHotbar(false); 
        }
    });

    window.addEventListener("pointerdown", (event: PointerEvent) => {
        const ctx = deps.getContext();
        const room = deps.getRoom();
        const scene = deps.getScene();

        if (ctx.isUIOpen || !room || !scene) return;

        if (event.target === document.querySelector('canvas')) {
            if (isShadowMapActive) {
                const camera = scene.camera as THREE.Camera;
                const scene3D = scene.scene as THREE.Scene;
                
                if (camera && scene3D) {
                    const mouse = new THREE.Vector2(
                        (event.clientX / window.innerWidth) * 2 - 1,
                        -(event.clientY / window.innerHeight) * 2 + 1
                    );
                    const raycaster = new THREE.Raycaster();
                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObjects(scene3D.children, true);
                    
                    if (intersects.length > 0) {
                        const hitPoint = intersects[0].point;
                        localTargetPos.x = hitPoint.x;
                        localTargetPos.z = hitPoint.z;
                        
                        if (event.button === 2) { 
                            room.send("useAbility", { abilityId: "shadow_step", targetX: hitPoint.x, targetZ: hitPoint.z, subType: "place_anchor" });
                        } else if (event.button === 0) { 
                            room.send("useAbility", { abilityId: "shadow_step", targetX: hitPoint.x, targetZ: hitPoint.z, subType: "blink" });
                            isShadowMapActive = false; 
                            abilityCooldowns.slot2 = getSkillDef("shadow_step")?.cooldownTime || 5.0;
                        }
                    }
                }
                return; 
            }

            if (scene instanceof TownScene && (scene.isBuyMode || scene.isBuildMode)) {
                const camera = scene.camera as THREE.Camera;
                const scene3D = scene.scene as THREE.Scene;
                if (camera && scene3D) {
                    const mouse = new THREE.Vector2(
                        (event.clientX / window.innerWidth) * 2 - 1,
                        -(event.clientY / window.innerHeight) * 2 + 1
                    );
                    const raycaster = new THREE.Raycaster();
                    raycaster.setFromCamera(mouse, camera);
                    const intersects = raycaster.intersectObjects(scene3D.children, true);
                    
                    if (intersects.length > 0) {
                        const p = intersects[0].point;
                        if (scene.isBuyMode) {
                            room.send("buyLand");
                            scene.isBuyMode = false;
                        } else if (scene.isBuildMode) {
                            room.send("placeBuilding", { x: Math.round(p.x / 2) * 2, z: Math.round(p.z / 2) * 2, type: (scene as any).currentBlueprintType });
                            scene.isBuildMode = false;
                        }
                    }
                }
                return;
            }

            if (event.button === 0) attemptAttack(ctx, true);
        }
    });

    window.addEventListener("contextmenu", (event) => {
        if (isShadowMapActive) event.preventDefault();
    });
}