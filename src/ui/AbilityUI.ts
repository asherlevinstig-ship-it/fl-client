import { SKILL_TREE_DATA, CATEGORY_MAP, UTILITY_TREE_DATA, UTILITY_CATEGORY_MAP, FAMILIAR_TREE_DATA, FAMILIAR_CATEGORY_MAP, getSkillDef, getAbilityCategory } from "../data/AbilityDatabase";
import { QUICK_CHATS, currentChatChannel } from "../game/PlayerController"; 

// --- EXPORTED STATE ---
export let isSkillTreeUIOpen = false;

// Local hotbar mirror (Synced dynamically with Colyseus Server State)
export const playerHotbar: Record<string, string> = {
    slot2: "", slot3: "", slot4: "", slot5: "",
    slot6: "", slot7: "", slot8: "", slot9: ""
};

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

let currentUtilityPathway = "wayfinder";
let currentFamiliarPathway = "apocalyptic_swarm";

const localCommittedSlots: Record<string, string> = {}; 

// --- TEMPORARY SKILL STATE (Town Recall) ---
export let temporarySkill: { id: string, label: string, icon: string } | null = null;
let uiRoom: any = null;

// --- AUTHORITATIVE COLYSEUS STATE BINDING ---
// The vital fix: Synchronizes initial state and tracks future network updates safely for Colyseus <= 0.14
export function setAbilityUIRoom(room: any) {
    if (uiRoom === room) return; 
    uiRoom = room;

    const attachListeners = (player: any) => {
        // Safe sync function for initial load
        if (player.hotbar) {
            if (typeof player.hotbar.forEach === "function") {
                player.hotbar.forEach((value: string, key: string) => {
                    playerHotbar[key] = value || "";
                });
            } else {
                for (const key in player.hotbar) {
                    playerHotbar[key] = player.hotbar[key] || "";
                }
            }
            renderHotbar();

            const handleHotbarUpdate = (value: string, key: string) => {
                playerHotbar[key] = value || "";
                renderHotbar();
            };

            // Version-agnostic binding (Falls back safely to your Colyseus 0.14 architecture)
            if (typeof player.hotbar.onAdd === "function") {
                player.hotbar.onAdd(handleHotbarUpdate);
                if (typeof player.hotbar.onChange === "function") player.hotbar.onChange(handleHotbarUpdate);
            } else {
                player.hotbar.onAdd = handleHotbarUpdate;
                player.hotbar.onChange = handleHotbarUpdate;
            }
        }

        if (player.utilityPathway) currentUtilityPathway = player.utilityPathway;
        if (player.familiarPathway) currentFamiliarPathway = player.familiarPathway;

        const handlePlayerChange = (changes: any[]) => {
            if (!changes) return;
            changes.forEach((change: any) => {
                if (change.field === "utilityPathway") currentUtilityPathway = change.value;
                if (change.field === "familiarPathway") currentFamiliarPathway = change.value;
            });
        };

        if (typeof player.onChange === "function") {
            player.onChange(handlePlayerChange);
        } else {
            player.onChange = handlePlayerChange;
        }
    };

    // If the player state is already populated when this binds
    const me = uiRoom.state.players.get(uiRoom.sessionId);
    if (me) attachListeners(me);

    // Catch the player state arriving slightly later
    const handlePlayerAdd = (player: any, sessionId: string) => {
        if (sessionId === uiRoom.sessionId) attachListeners(player);
    };

    if (uiRoom.state.players) {
        if (typeof uiRoom.state.players.onAdd === "function") {
            uiRoom.state.players.onAdd(handlePlayerAdd);
        } else {
            uiRoom.state.players.onAdd = handlePlayerAdd;
        }
    }
}

export function setTemporarySkill(skill: { id: string, label: string, icon: string } | null) {
    temporarySkill = skill;
    renderHotbar();
}

function syncLocalStateToServer(activeRoom: any) {
    if (!activeRoom) return;
    activeRoom.send("changeUtilityPathway", { pathwayId: currentUtilityPathway });
    activeRoom.send("changeFamiliarPathway", { pathwayId: currentFamiliarPathway });
}

export function adminResetCommitments() {
    playerHotbar.slot2 = "";
    playerHotbar.slot3 = "";
    playerHotbar.slot4 = "";
    playerHotbar.slot5 = "";
    playerHotbar.slot6 = "";
    playerHotbar.slot7 = "";
    playerHotbar.slot8 = "";
    playerHotbar.slot9 = "";
    
    if (uiRoom) {
        for (let i = 2; i <= 9; i++) {
            uiRoom.send("updateHotbar", { slot: `slot${i}`, abilityId: "" });
        }
    }
    
    for (const key in localCommittedSlots) {
        delete localCommittedSlots[key];
    }

    temporarySkill = null;
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
    [2, 3, 4, 5].forEach(slotNum => {
        const id = playerHotbar[`slot${slotNum}`];
        if (id) {
            let foundInCurrentPathway = false;
            const essenceData = SKILL_TREE_DATA[pathway];
            if (essenceData) {
                for (const category in essenceData) {
                    if (essenceData[category as keyof typeof essenceData][id]) {
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
        if (uiRoom) {
            uiRoom.send("updateHotbar", { slot: "slot2", abilityId: "" });
            uiRoom.send("updateHotbar", { slot: "slot3", abilityId: "" });
            uiRoom.send("updateHotbar", { slot: "slot4", abilityId: "" });
            uiRoom.send("updateHotbar", { slot: "slot5", abilityId: "" });
        }
    }
}

function injectSkillTreeStyles() {
    if (!document.getElementById("skill-tree-css")) {
        const style = document.createElement("style");
        style.id = "skill-tree-css";
        style.innerHTML = `
            :root {
                --st-bg: #1e293b;
                --st-panel: #334155;
                --st-border: #38bdf8;
                --st-text: #f8fafc;
                --st-muted: #94a3b8;
                --st-font-header: 'Nunito', 'Segoe UI Rounded', sans-serif;
                --st-font-body: 'Nunito', 'Segoe UI Rounded', sans-serif;
            }

            /* --- HOTBAR STYLES --- */
            #action-bar {
                position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%);
                display: flex; gap: 12px; padding: 15px; border-radius: 24px;
                background: #0f172a; border: 4px solid var(--st-border);
                box-shadow: 0 15px 30px rgba(0,0,0,0.6);
                z-index: 20; font-family: var(--st-font-body);
            }
            .hotbar-slot {
                width: 70px; height: 70px; background-color: #1e293b;
                border-radius: 16px; display: flex; justify-content: center; align-items: center;
                position: relative; cursor: pointer; overflow: hidden;
                transition: transform 0.1s, box-shadow 0.1s;
                box-shadow: inset 0 -6px 0 rgba(0,0,0,0.3);
            }
            .hotbar-slot:hover { transform: scale(1.05); }
            .hotbar-key {
                position: absolute; top: -6px; left: -6px; background: #f8fafc; color: #0f172a;
                font-weight: 900; font-size: 12px; padding: 4px 8px; border-radius: 8px;
                border: 3px solid #cbd5e1; z-index: 2; font-family: var(--st-font-header);
            }
            .hotbar-icon { font-size: 32px; filter: drop-shadow(0 4px 0 rgba(0,0,0,0.2)); z-index: 1; }
            .hotbar-cd-overlay {
                position: absolute; bottom: 0; left: 0; width: 100%; height: 0%;
                background: rgba(0, 0, 0, 0.85); z-index: 3; transition: height 0.1s linear;
            }
            .hotbar-cd-text {
                position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                color: white; font-weight: 900; font-size: 28px; z-index: 4;
                text-shadow: 0 4px 0 #000; display: none; font-family: var(--st-font-header);
            }
            .hotbar-label {
                position: absolute; bottom: -24px; width: 100%; text-align: center;
                font-size: 12px; font-weight: 900; color: var(--st-muted);
                white-space: nowrap; z-index: 5; text-transform: uppercase;
            }

            /* --- SKILL TREE MODAL STYLES --- */
            .st-modal {
                position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                background: var(--st-bg); padding: 30px; border-radius: 24px;
                border: 4px solid var(--st-border); z-index: 1000; color: var(--st-text);
                width: 900px; height: 750px; font-family: var(--st-font-body);
                box-shadow: 0 20px 50px rgba(0,0,0,0.6); display: flex; flex-direction: column;
            }
            .st-header-title { font-family: var(--st-font-header); text-transform: uppercase; margin: 0; color: white; font-size: 28px; font-weight: 900; }
            .st-stat-pill {
                background: #334155; border-radius: 16px; padding: 10px 15px;
                font-size: 14px; font-weight: 900; font-family: var(--st-font-header); 
                border: 3px solid;
            }
            
            .st-tab {
                flex: 1; padding: 15px; border-radius: 16px 16px 0 0; font-weight: 900;
                text-transform: uppercase; font-size: 16px; background: #334155;
                border: 3px solid #475569; border-bottom: none; color: #94a3b8;
                cursor: pointer; transition: background 0.1s; font-family: var(--st-font-header);
            }
            .st-tab.active {
                background: var(--st-bg); border-color: currentColor; color: currentColor;
                position: relative; top: 3px; z-index: 2; padding-bottom: 18px;
            }

            .st-util-nav-container {
                display: flex; gap: 10px; overflow-x: auto; padding-bottom: 15px; margin-bottom: 15px;
                scrollbar-width: thin; scrollbar-color: #475569 transparent;
            }
            .st-util-nav-btn {
                flex: 0 0 auto; padding: 12px 20px; border-radius: 16px; font-weight: 900;
                font-size: 14px; background: #334155; border: 3px solid #475569; color: #cbd5e1;
                cursor: pointer; transition: transform 0.1s, box-shadow 0.1s; font-family: var(--st-font-header);
            }
            .st-util-nav-btn:active { transform: translateY(4px); box-shadow: none !important; }
            .st-util-nav-btn.active { background: #1e293b; border-color: currentColor; color: currentColor; box-shadow: 0 4px 0 currentColor; }
            .st-util-nav-btn.locked { opacity: 0.5; cursor: not-allowed; }

            .st-pane-bg { background: var(--st-panel); border: 4px solid #475569; border-radius: 16px; }
            
            .st-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
            .st-scrollbar::-webkit-scrollbar-track { background: #1e293b; border-radius: 4px; }
            .st-scrollbar::-webkit-scrollbar-thumb { background: #64748b; border-radius: 4px; }
            
            .progress-fill { transition: width 0.3s ease-out; }

            /* --- RESPONSIVE MEDIA QUERIES FOR SMALLER SCREENS --- */
            @media (max-width: 1200px) {
                #action-bar { padding: 10px; gap: 8px; bottom: 15px; }
                .hotbar-slot { width: 55px; height: 55px; }
                .hotbar-icon { font-size: 26px; }
                .hotbar-key { font-size: 10px; padding: 2px 6px; }
                .hotbar-label { font-size: 10px; bottom: -20px; }
                #btn-temp-recall { margin-left: 10px !important; }
                .chat-slot { width: 55px; height: 55px; }
            }

            @media (max-width: 900px) {
                #action-bar { gap: 6px; padding: 8px; border-width: 3px; }
                .hotbar-slot { width: 45px; height: 45px; border-width: 3px !important; }
                .hotbar-icon { font-size: 20px; }
                .hotbar-label { display: none; /* Hide labels to save vertical space */ }
                .hotbar-cd-text { font-size: 20px; }
                .st-modal { width: 95%; height: 90%; }
            }
        `;
        document.head.appendChild(style);
    }
}

export function renderHotbar() {
    injectSkillTreeStyles(); 

    if (uiRoom) {
        const me = uiRoom.state.players.get(uiRoom.sessionId);
        if (me && me.hotbar) {
            [2, 3, 4, 5, 6, 7, 8, 9].forEach(slotNum => {
                const key = `slot${slotNum}`;
                playerHotbar[key] = me.hotbar.get(key) || "";
            });
        }
    }

    let hotbar = document.getElementById("action-bar");
    if (!hotbar) {
        hotbar = document.createElement("div");
        hotbar.id = "action-bar";
        document.body.appendChild(hotbar);
    }

    const createSlotHTML = (key: string, icon: string, name: string, color: string, isGroupStart: boolean = false) => `
        <div class="hotbar-slot" style="border: 4px solid ${color}; ${isGroupStart ? 'margin-left: 20px;' : ''}">
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
        const abilityId = playerHotbar[`slot${slotNum}`];
        const def = getSkillDef(abilityId);
        if (def) {
            html += createSlotHTML(slotNum.toString(), def.icon, def.name, def.color);
        } else {
            html += createSlotHTML(slotNum.toString(), '<span style="opacity:0.3; font-size:24px;">➕</span>', "Empty", "#334155");
        }
    });

    // Render Utility Slots (6-7)
    [6, 7].forEach(slotNum => {
        const abilityId = playerHotbar[`slot${slotNum}`];
        const def = getSkillDef(abilityId);
        if (def) {
            html += createSlotHTML(slotNum.toString(), def.icon, def.name, def.color, slotNum === 6);
        } else {
            html += createSlotHTML(slotNum.toString(), '<span style="opacity:0.3; font-size:24px;">➕</span>', "Utility", "#334155", slotNum === 6);
        }
    });

    // Render Familiar Slots (8-9)
    [8, 9].forEach(slotNum => {
        const abilityId = playerHotbar[`slot${slotNum}`];
        const def = getSkillDef(abilityId);
        if (def) {
            html += createSlotHTML(slotNum.toString(), def.icon, def.name, def.color, slotNum === 8);
        } else {
            html += createSlotHTML(slotNum.toString(), '<span style="opacity:0.3; font-size:24px;">➕</span>', "Familiar", "#334155", slotNum === 8);
        }
    });

    // --- TEMPORARY SKILL SLOT (Town Recall) ---
    if (temporarySkill) {
        html += `
            <div id="btn-temp-recall" class="hotbar-slot" style="border: 4px solid #38bdf8; background: #0c4a6e; margin-left: 20px;">
                <div class="hotbar-key" style="background: #38bdf8; color: white; border-color: white;">SHIFT</div>
                <span class="hotbar-icon">${temporarySkill.icon}</span>
                <div class="hotbar-label" style="color: #38bdf8;">${temporarySkill.label}</div>
            </div>
        `;
    }

    hotbar.innerHTML = html;

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

// --- QUICK CHAT HOTBAR RENDERER ---
(window as any).renderChatHotbar = function(showChat: boolean) {
    const container = document.getElementById("action-bar");
    if (!container) return;

    if (!showChat) {
        renderHotbar(); 
        return;
    }

    const isTeam = currentChatChannel === "team";
    const barColor = isTeam ? "#22d3ee" : "#22c55e";
    const titleText = isTeam ? "TEAM CHAT" : "LOCAL CHAT";
    const subText = isTeam ? "(Shift+Tab for Local)" : "(Shift+Tab for Team)";

    let html = `
        <div style="position: absolute; top: -55px; left: 50%; transform: translateX(-50%); text-align: center; width: 300px; pointer-events: none; font-family: 'Nunito', sans-serif;">
            <div style="color: ${barColor}; font-size: 22px; font-weight: 900; background: #0f172a; padding: 5px 15px; border-radius: 12px; border: 3px solid ${barColor}; display: inline-block;">
                💬 ${titleText}
            </div>
            <div style="color: #cbd5e1; font-size: 14px; margin-top: 5px; font-weight: 700;">${subText}</div>
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
            <div class="hotbar-slot chat-slot" style="border: 4px solid ${barColor}; background: #1e293b; width: 70px; height: 70px; margin-left: ${i === 1 ? '12px' : '0'}; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <div class="hotbar-key" style="background: white; color: ${barColor}; border-color: ${barColor};">${i}</div>
                <div style="font-size: 28px; margin-bottom: 2px; filter: drop-shadow(0 2px 0 rgba(0,0,0,0.5));">${icon}</div>
                <div style="font-size: 11px; font-weight: 900; color: white; text-align: center; line-height: 1; padding: 0 4px; font-family: 'Nunito', sans-serif;">${text}</div>
            </div>
        `;
    }

    container.innerHTML = html;
};

export function tickCooldownsUI(dt: number) {
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
        const abilityId = playerHotbar[`slot${slotNum}`];
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

    const me = activeRoom.state.players.get(activeRoom.sessionId);
    if (me) {
        if (me.utilityPathway) currentUtilityPathway = me.utilityPathway;
        if (me.familiarPathway) currentFamiliarPathway = me.familiarPathway;
    }

    const renderTree = () => {
        if (!activeRoom || !isSkillTreeUIOpen) return;
        const state = activeRoom.state as any;
        const me = state.players.get(activeRoom.sessionId);
        if (!me) return;

        if (currentUtilityPathway === "wayfinder" && me.utilityPathway) currentUtilityPathway = me.utilityPathway;
        if (currentFamiliarPathway === "apocalyptic_swarm" && me.familiarPathway) currentFamiliarPathway = me.familiarPathway;

        const activeCategoryTab = currentTreeMode === "familiar" ? activeFamiliarCategoryTab : (currentTreeMode === "utility" ? activeUtilityCategoryTab : activeCombatCategoryTab);
        const activeSkillId = currentTreeMode === "familiar" ? activeFamiliarSkillId : (currentTreeMode === "utility" ? activeUtilitySkillId : activeCombatSkillId);
        const activeMap = currentTreeMode === "familiar" ? FAMILIAR_CATEGORY_MAP : (currentTreeMode === "utility" ? UTILITY_CATEGORY_MAP : CATEGORY_MAP);
        
        let treeData;
        if (currentTreeMode === "familiar") treeData = FAMILIAR_TREE_DATA[currentFamiliarPathway] || FAMILIAR_TREE_DATA["apocalyptic_swarm"];
        else if (currentTreeMode === "utility") treeData = UTILITY_TREE_DATA[currentUtilityPathway] || UTILITY_TREE_DATA["wayfinder"];
        else treeData = SKILL_TREE_DATA[pathway] || SKILL_TREE_DATA["shadow"];

        const pathwayData = treeData[activeCategoryTab as keyof typeof treeData] || {};
        const abilityKeys = Object.keys(pathwayData);

        let unspentEssence = me.skillTree?.unspentEssencePoints || 0;
        let unspentAwakening = me.skillTree?.unspentAwakeningPoints || 0;
        let activeAbilities = me.skillTree?.activeAbilities || new Map();

        let committedUtilityPathway: string | null = null;
        let committedFamiliarPathway: string | null = null;
        
        for (const pKey in UTILITY_TREE_DATA) {
            for (const cKey in UTILITY_TREE_DATA[pKey as keyof typeof UTILITY_TREE_DATA]) {
                for (const sKey in UTILITY_TREE_DATA[pKey as keyof typeof UTILITY_TREE_DATA][cKey as any]) {
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

        for (const pKey in FAMILIAR_TREE_DATA) {
            for (const cKey in FAMILIAR_TREE_DATA[pKey as keyof typeof FAMILIAR_TREE_DATA]) {
                for (const sKey in FAMILIAR_TREE_DATA[pKey as keyof typeof FAMILIAR_TREE_DATA][cKey as any]) {
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

        const targetSlot = activeMap[activeCategoryTab as keyof typeof activeMap].slot;
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

        if (!committedAbilityId) {
            const currentSlotSkill = playerHotbar[`slot${targetSlot}`];
            if (currentSlotSkill && abilityKeys.includes(currentSlotSkill)) {
                committedAbilityId = currentSlotSkill;
            }
        }

        let newActiveSkillId = activeSkillId;
        if (committedAbilityId && (!activeSkillId || !abilityKeys.includes(activeSkillId))) {
            newActiveSkillId = committedAbilityId;
        } else if (!activeSkillId || !pathwayData[newActiveSkillId]) {
            newActiveSkillId = abilityKeys[0] || ""; 
        }

        if (currentTreeMode === "familiar") activeFamiliarSkillId = newActiveSkillId;
        else if (currentTreeMode === "utility") activeUtilitySkillId = newActiveSkillId;
        else activeCombatSkillId = newActiveSkillId;

        const activeSkillData = pathwayData[newActiveSkillId] || null;
        const abilityState = activeAbilities.get(newActiveSkillId);
        const serverUpgrades = abilityState ? abilityState.upgrades : new Map();

        const isCurrentlyViewedSkillLocked = committedAbilityId !== null && committedAbilityId !== newActiveSkillId;
        const isUtilityPathwayLockedOut = currentTreeMode === "utility" && committedUtilityPathway !== null && committedUtilityPathway !== currentUtilityPathway;
        const isFamiliarPathwayLockedOut = currentTreeMode === "familiar" && committedFamiliarPathway !== null && committedFamiliarPathway !== currentFamiliarPathway;
        const isSystemPathwayLockedOut = isUtilityPathwayLockedOut || isFamiliarPathwayLockedOut;

        const tabColor = currentTreeMode === "familiar" ? "#d946ef" : (currentTreeMode === "utility" ? "#38bdf8" : "#22c55e");

        let tabsHtml = `<div style="display:flex; margin-bottom: 0;">`;
        Object.keys(activeMap).forEach(category => {
            const isTabActive = category === activeCategoryTab;
            const displayName = `${activeMap[category as keyof typeof activeMap].name} (Slot ${activeMap[category as keyof typeof activeMap].slot})`;
            tabsHtml += `<div id="tab-${category}" class="st-tab ${isTabActive ? 'active' : ''}" style="color: ${isTabActive ? tabColor : '#94a3b8'}; border-color: ${isTabActive ? tabColor : '#475569'};">${displayName}</div>`;
        });
        tabsHtml += `</div>`;

        let navHtml = "";
        if (currentTreeMode === "utility") {
            navHtml = `<div class="st-util-nav-container st-scrollbar">`;
            const utilPaths = [
                { id: "wayfinder", name: "Wayfinder", icon: '🧭' },
                { id: "perception", name: "Perception", icon: '👁️' },
                { id: "tinkerer", name: "Tinkerer", icon: '🔧' },
                { id: "mobility", name: "Mobility", icon: '💨' },
                { id: "agrarian", name: "Agrarian", icon: '🌾' },
                { id: "forgemaster", name: "Forgemaster", icon: '🔨' },
                { id: "artisan", name: "Artisan", icon: '🎨' },
                { id: "publican", name: "Publican", icon: '🍺' },
                { id: "architect", name: "Architect", icon: '🏛️' },
                { id: "alchemist", name: "Alchemist", icon: '🧪' }
            ];
            
            utilPaths.forEach(up => {
                const isActive = currentUtilityPathway === up.id;
                const isLocked = committedUtilityPathway && committedUtilityPathway !== up.id;
                navHtml += `<button id="nav-system-${up.id}" class="st-util-nav-btn ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}" style="${isActive ? `color: ${tabColor}; border-color: ${tabColor};` : ''}">${up.icon} ${up.name}</button>`;
            });
            navHtml += `</div>`;
        } else if (currentTreeMode === "familiar") {
            navHtml = `<div class="st-util-nav-container st-scrollbar">`;
            const famPaths = [
                { id: "apocalyptic_swarm", name: "Swarm", icon: '🩸' },
                { id: "orbital_arbiter", name: "Arbiter", icon: '👁️' },
                { id: "void_servant", name: "Void", icon: '🌌' },
                { id: "shadow_monarch", name: "Legion", icon: '👑' },
                { id: "dragon_hoarder", name: "Dragon", icon: '🐉' },
                { id: "symbiotic_spirit", name: "Spirit", icon: '🧚' },
                { id: "astral_reflection", name: "Astral", icon: '🪞' },
                { id: "primal_beast", name: "Beast", icon: '🐻' },
                { id: "radiant_seraph", name: "Seraph", icon: '👼' }
            ];
            
            famPaths.forEach(up => {
                const isActive = currentFamiliarPathway === up.id;
                const isLocked = committedFamiliarPathway && committedFamiliarPathway !== up.id;
                navHtml += `<button id="nav-system-${up.id}" class="st-util-nav-btn ${isActive ? 'active' : ''} ${isLocked ? 'locked' : ''}" style="${isActive ? `color: ${tabColor}; border-color: ${tabColor};` : ''}">${up.icon} ${up.name}</button>`;
            });
            navHtml += `</div>`;
        }

        let leftPaneHtml = `<div class="st-scrollbar" style="display:flex; flex-wrap:wrap; justify-content:center; gap: 15px; padding: 10px;">`;
        
        if (abilityKeys.length === 0) {
            leftPaneHtml += `<div style="color: #64748b; font-weight: 900; margin-top: 20px;">No abilities discovered.</div>`;
        } else {
            abilityKeys.forEach((key) => {
                const skill = pathwayData[key];
                const isSelected = key === newActiveSkillId;
                const isLockedOut = isSystemPathwayLockedOut || (committedAbilityId !== null && committedAbilityId !== key);
                
                const color = isLockedOut ? '#64748b' : (skill.color || tabColor);
                const borderStyle = isSelected ? `4px solid ${color}` : `4px solid #475569`;
                const bg = isSelected ? "#1e293b" : "#334155";
                const filter = isLockedOut ? "opacity: 0.4; filter: grayscale(1);" : "";
                
                leftPaneHtml += `
                    <div id="btn-skill-${key}" style="cursor:pointer; display: flex; flex-direction: column; align-items: center; ${filter} transition: transform 0.1s;">
                        <div style="width: 80px; height: 80px; background: ${bg}; border: ${borderStyle}; border-radius: 20px; display:flex; justify-content:center; align-items:center; font-size: 40px; color: ${color}; margin-bottom: 8px; box-shadow: inset 0 -6px 0 rgba(0,0,0,0.2);">
                            <span style="filter: drop-shadow(0 4px 0 rgba(0,0,0,0.2));">${skill.icon}</span>
                        </div>
                        <div style="font-size: 14px; font-weight: 900; color: ${isSelected ? '#fff' : '#cbd5e1'}; text-align: center; max-width: 90px; line-height: 1.1;">${skill.name}</div>
                    </div>
                `;
            });
        }
        leftPaneHtml += `</div>`;

        let rightPaneHtml = "";

        if (activeSkillData) {
            const isEquipped = playerHotbar[`slot${targetSlot}`] === newActiveSkillId;
            
            let equipBtnClass = "btn-blue";
            let equipBtnText = `SELECT SLOT ${targetSlot}`;
            let equipDisabled = "";

            if (isSystemPathwayLockedOut || isCurrentlyViewedSkillLocked) {
                equipBtnClass = "btn-slate";
                equipBtnText = 'LOCKED';
                equipDisabled = "disabled";
            } else if (isEquipped) {
                equipBtnClass = "btn-green";
                equipBtnText = 'EQUIPPED ✔️';
                equipDisabled = "disabled";
            }

            let proficiencyHtml = "";
            if (abilityState && !isCurrentlyViewedSkillLocked && !isSystemPathwayLockedOut) {
                const currentRankStr = abilityState.rank || "Iron";
                const profValue = abilityState.proficiency || 0;
                const isReadyToConsolidate = profValue >= 100;
                const rCol = isReadyToConsolidate ? "#22c55e" : "#38bdf8";
                
                proficiencyHtml = `
                    <div style="margin-top: 15px; background: #1e293b; padding: 12px; border-radius: 16px; border: 3px solid #475569;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; font-weight: 900;">
                            <span style="color: #cbd5e1;">${currentRankStr.toUpperCase()} <span style="color: #64748b;">(Lv. ${abilityState.level || 0})</span></span>
                            <span style="color: ${rCol};">${isReadyToConsolidate ? 'Ready to Meditate!' : profValue.toFixed(1) + '%'}</span>
                        </div>
                        <div style="width: 100%; height: 12px; background: #0f172a; border-radius: 6px; overflow: hidden; border: 2px solid #334155;">
                            <div class="progress-fill" style="width: ${profValue}%; height: 100%; background: ${rCol};"></div>
                        </div>
                    </div>
                `;
            }

            rightPaneHtml += `
                <div style="display:flex; justify-content: space-between; align-items: flex-start; border-bottom: 4px solid #475569; padding-bottom: 20px; margin-bottom: 20px;">
                    <div style="display:flex; align-items: flex-start; gap: 20px; flex: 1;">
                        <div style="width: 80px; height: 80px; font-size: 40px; background: #1e293b; border: 4px solid ${(isCurrentlyViewedSkillLocked || isSystemPathwayLockedOut) ? '#64748b' : activeSkillData.color}; border-radius: 20px; display:flex; justify-content:center; align-items:center;">
                            <span style="${(isCurrentlyViewedSkillLocked || isSystemPathwayLockedOut) ? 'filter: grayscale(1); opacity: 0.5;' : ''}">${activeSkillData.icon}</span>
                        </div>
                        <div style="flex: 1;">
                            <h2 style="margin: 0 0 5px 0; font-family: var(--st-font-header); color: ${(isCurrentlyViewedSkillLocked || isSystemPathwayLockedOut) ? '#94a3b8' : activeSkillData.color}; font-size: 30px; font-weight: 900; text-transform: uppercase;">
                                ${activeSkillData.name}
                            </h2>
                            <div style="color: #cbd5e1; font-size: 16px; font-weight: 700; line-height: 1.4;">${activeSkillData.desc}</div>
                            <div style="color: #94a3b8; font-size: 14px; margin-top: 8px; font-weight: 900;">⏱️ Base Cooldown: ${activeSkillData.cooldownTime}s</div>
                            ${proficiencyHtml}
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
                        <button id="btn-equip-pathway" class="btn-chunky ${equipBtnClass}" ${equipDisabled} style="padding: 15px 25px; min-width: 180px;">
                            ${equipBtnText}
                        </button>
                        ${!isEquipped && !isCurrentlyViewedSkillLocked && !isSystemPathwayLockedOut ? `<div style="font-size: 11px; font-weight: 900; color: #f59e0b;">Locks other choices!</div>` : ''}
                    </div>
                </div>
            `;

            rightPaneHtml += `
                <div class="st-scrollbar" style="display: flex; flex-direction: column; gap: 20px; overflow-y: auto; flex-grow: 1; padding-right: 5px;">
            `;

            const upgradeKeys = Object.keys(activeSkillData.upgrades || {});

            if (upgradeKeys.length === 0) {
                rightPaneHtml += `<div style="text-align:center; padding: 40px; color: #64748b; font-weight: 900; font-size: 18px; background: #1e293b; border-radius: 16px; border: 4px dashed #475569;">No upgrades discovered yet!</div>`;
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
                    
                    const isLocked = isCurrentlyViewedSkillLocked || isSystemPathwayLockedOut;
                    const btnState = (isMaxed || !canAfford || !isEquipped || !meetsRankRequirement || isLocked) ? "disabled" : "";
                    
                    let btnClass = "btn-green";
                    let btnText = '✨ AWAKEN (1)';
                    
                    if (isLocked) {
                        btnText = 'LOCKED'; btnClass = "btn-slate";
                    } else if (!isEquipped) {
                        btnText = 'EQUIP FIRST'; btnClass = "btn-slate";
                    } else if (isMaxed) {
                        btnText = 'MAX RANK ⭐'; btnClass = "btn-gold";
                    } else if (!meetsRankRequirement) {
                        btnText = `NEED RANK ${nextSkillRankNum}`; btnClass = "btn-slate";
                    } else if (!canAfford) {
                        btnText = "NO STONES"; btnClass = "btn-red";
                    }

                    let nextDesc = "Maximum power achieved!";
                    if (uData.rankDescs) {
                        if (cRank < mRank) nextDesc = uData.rankDescs[cRank];
                        else nextDesc = uData.rankDescs[mRank - 1];
                    }

                    rightPaneHtml += `
                        <div style="background: #1e293b; border: 4px solid #475569; border-radius: 16px; display: flex; flex-direction: column; overflow: hidden;">
                            <div style="background: #0f172a; padding: 15px 20px; border-bottom: 4px solid #475569; display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <h4 style="margin: 0 0 5px 0; color: #fff; font-size: 20px; font-weight: 900;">${uData.name}</h4>
                                    <span style="font-size: 14px; font-weight: 900; color: ${cRank === mRank ? '#f59e0b' : '#38bdf8'};">Level ${cRank} / ${mRank}</span>
                                </div>
                                <button id="btn-awaken-${uKey}" class="btn-chunky ${btnClass}" ${btnState} style="padding: 12px 20px;">
                                    ${btnText}
                                </button>
                            </div>
                            
                            <div style="padding: 20px;">
                                <div style="font-weight: 900; color: #cbd5e1; margin-bottom: 8px; text-transform: uppercase;">${cRank === mRank ? 'CURRENT EFFECT' : 'NEXT UPGRADE'}</div>
                                <div style="font-size: 16px; color: #f8fafc; font-weight: 700; line-height: 1.5;">${nextDesc}</div>
                            </div>
                        </div>
                    `;
                });
            }

            rightPaneHtml += `</div>`;
        }

        const headerTitleText = currentTreeMode === "familiar" ? "FAMILIARS" : (currentTreeMode === "utility" ? "SKILLS" : "COMBAT");

        let modeButtonsHtml = `
            <div style="display: flex; gap: 10px;">
                <button id="mode-btn-combat" class="btn-chunky ${currentTreeMode === 'combat' ? 'btn-red' : 'btn-slate'}" style="padding: 12px 20px;">
                    ⚔️ COMBAT
                </button>
                <button id="mode-btn-utility" class="btn-chunky ${currentTreeMode === 'utility' ? 'btn-blue' : 'btn-slate'}" style="padding: 12px 20px;">
                    ⚙️ UTILITY
                </button>
                <button id="mode-btn-familiar" class="btn-chunky ${currentTreeMode === 'familiar' ? 'btn-gold' : 'btn-slate'}" style="padding: 12px 20px;">
                    🐉 FAMILIAR
                </button>
            </div>
        `;

        modal!.innerHTML = `
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 20px;">
            <div style="display: flex; align-items: center; gap: 20px;">
              <h2 class="st-header-title" style="min-width: 200px;">${headerTitleText}</h2>
              ${modeButtonsHtml}
            </div>
            
            <div style="display: flex; gap: 15px; align-items: center;">
                <div class="st-stat-pill" style="border-color: #22c55e; color: #22c55e;">
                    💧 Essence: ${unspentEssence}
                </div>
                <div class="st-stat-pill" style="border-color: #f59e0b; color: #f59e0b;">
                    ✨ Stones: ${unspentAwakening}
                </div>
                <button id="close-skills-btn" class="btn-close-chunky" style="margin-left: 10px;">&times;</button>
            </div>
          </div>
          
          ${navHtml}

          <div class="st-pane-bg" style="display:flex; flex-direction: column; height: calc(100% - ${(currentTreeMode === 'utility' || currentTreeMode === 'familiar') ? '190px' : '110px'}); padding: 0; overflow: hidden;">
            ${tabsHtml}
            <div style="display: flex; flex: 1; overflow: hidden;">
                <div style="flex: 0 0 280px; border-right: 4px solid #475569; background: #1e293b; overflow-y: auto;">
                    ${leftPaneHtml}
                </div>
                <div style="flex: 1; padding: 25px; display: flex; flex-direction: column; background: #334155;">
                    ${rightPaneHtml}
                </div>
            </div>
          </div>
        `;

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
                        syncLocalStateToServer(activeRoom); 
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
                        syncLocalStateToServer(activeRoom); 
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
            const isEquipped = playerHotbar[`slot${targetSlot}`] === newActiveSkillId;
            
            if (equipBtnNode && !isEquipped && !isCurrentlyViewedSkillLocked && !isSystemPathwayLockedOut) {
                equipBtnNode.onclick = () => {
                    activeRoom.send("updateHotbar", { slot: `slot${targetSlot}`, abilityId: newActiveSkillId });
                    
                    playerHotbar[`slot${targetSlot}`] = newActiveSkillId;
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
                            btn.innerHTML = 'AWAKENING...';
                            btn.style.opacity = "0.5";
                            btn.style.cursor = "wait";
                            btn.setAttribute("disabled", "true");

                            localCommittedSlots[activeCategoryTab] = newActiveSkillId;
                            
                            activeRoom.send("upgradeSkill", { abilityId: newActiveSkillId, upgradeId: uKey });
                            
                            activeRoom.send("updateHotbar", { slot: `slot${targetSlot}`, abilityId: newActiveSkillId });
                            
                            playerHotbar[`slot${targetSlot}`] = newActiveSkillId;
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