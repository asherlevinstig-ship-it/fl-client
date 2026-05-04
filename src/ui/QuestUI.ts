import { ITEM_DB } from "../ItemDatabase";
import { QUEST_DB } from "../QuestDatabase";


// --- EXPORTED STATE ---
export let isQuestUIOpen = false;

// ==========================================
// GLOBAL UI UTILITIES & STYLES
// ==========================================

export function injectGlobalChunkyStyles() {
    if (!document.getElementById("chunky-ui-styles")) {
        const style = document.createElement("style");
        style.id = "chunky-ui-styles";
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700;900&display=swap');
            
            /* High-Contrast Warm Luxury FUI Palette */
            :root {
                --fui-bg: #1a1514;
                --fui-panel: rgba(212, 175, 55, 0.05);
                --fui-gold: #d4af37;
                --fui-gold-dim: rgba(212, 175, 55, 0.3);
                --fui-text: #f3e5ab;
                --fui-text-dim: #a89f88;
                --fui-danger: #8b0000;
                --fui-cyan: #00E5FF;
            }

            .modal-chunky {
                font-family: 'Nunito', 'Segoe UI', sans-serif;
                background: var(--fui-bg);
                border: 2px solid var(--fui-gold);
                border-radius: 8px;
                box-shadow: 0 20px 50px rgba(0,0,0,0.9), inset 0 0 30px rgba(212, 175, 55, 0.05);
                color: var(--fui-text);
                box-sizing: border-box;
                max-width: 95vw;
                max-height: 90vh;
                overflow-y: auto;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .btn-chunky {
                border: 1px solid var(--fui-gold);
                border-radius: 4px;
                font-weight: 900;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.2s ease;
                text-transform: uppercase;
                font-family: 'Nunito', sans-serif;
                letter-spacing: 2px;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
                background: var(--fui-panel);
                color: var(--fui-gold);
                box-shadow: inset 0 0 0 rgba(212, 175, 55, 0);
            }
            .btn-chunky:hover:not(:disabled) {
                background: var(--fui-gold);
                color: var(--fui-bg);
                box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
            }
            .btn-chunky:active:not(:disabled) {
                transform: scale(0.98);
            }
            
            .btn-green { border-color: #22c55e; color: #22c55e; }
            .btn-green:hover:not(:disabled) { background: #22c55e; color: var(--fui-bg); box-shadow: 0 0 15px rgba(34, 197, 94, 0.4); }
            
            .btn-red { border-color: var(--fui-danger); color: #ff4444; }
            .btn-red:hover:not(:disabled) { background: var(--fui-danger); color: white; box-shadow: 0 0 15px rgba(139, 0, 0, 0.6); }
            
            .btn-blue { border-color: var(--fui-cyan); color: var(--fui-cyan); }
            .btn-blue:hover:not(:disabled) { background: var(--fui-cyan); color: var(--fui-bg); box-shadow: 0 0 15px rgba(0, 229, 255, 0.4); }

            .btn-gold { border-color: var(--fui-gold); color: var(--fui-gold); background: rgba(212,175,55,0.1); }
            .btn-gold:hover:not(:disabled) { background: var(--fui-gold); color: var(--fui-bg); }

            .btn-slate { border-color: var(--fui-text-dim); color: var(--fui-text-dim); }
            .btn-slate:hover:not(:disabled) { background: var(--fui-text-dim); color: var(--fui-bg); }

            .btn-close-chunky {
                background: transparent; border: 1px solid var(--fui-danger); border-radius: 4px;
                width: 36px; height: 36px; color: #ff4444; font-weight: 900;
                cursor: pointer; display: flex; align-items: center; justify-content: center;
                font-size: 20px; transition: all 0.2s ease;
                flex-shrink: 0;
            }
            .btn-close-chunky:hover {
                background: var(--fui-danger); color: white; box-shadow: 0 0 10px rgba(139, 0, 0, 0.6);
            }
            
            .chunky-panel {
                background: var(--fui-panel); border-radius: 4px; padding: 15px; border: 1px solid var(--fui-gold-dim);
            }

            /* Custom Scrollbar for FUI */
            ::-webkit-scrollbar { width: 6px; }
            ::-webkit-scrollbar-track { background: var(--fui-bg); }
            ::-webkit-scrollbar-thumb { background: var(--fui-gold-dim); border-radius: 3px; }
            ::-webkit-scrollbar-thumb:hover { background: var(--fui-gold); }

            /* --- HUD STYLES --- */
            #chunky-hud-container {
                position: fixed;
                top: 20px;
                left: 20px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                z-index: 50;
                font-family: 'Nunito', sans-serif;
                pointer-events: none; 
            }
            .hud-bar-bg {
                width: 250px;
                height: 28px;
                background: rgba(0,0,0,0.6);
                border: 1px solid var(--fui-gold-dim);
                border-radius: 2px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            }
            .hud-bar-fill {
                height: 100%;
                transition: width 0.2s ease-out;
                position: relative;
            }
            .hud-bar-fill::after {
                content: '';
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 100%);
            }
            .hud-icon {
                position: absolute;
                left: -15px;
                top: -8px;
                font-size: 30px;
                filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));
                z-index: 2;
            }
            .hud-text {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                color: var(--fui-text);
                font-weight: 900;
                font-size: 12px;
                letter-spacing: 1px;
                text-shadow: 1px 1px 2px black;
                z-index: 2;
            }
            .fill-hp { background: var(--fui-danger); border-right: 1px solid #ff4444; }
            .fill-mp { background: var(--fui-cyan); border-right: 1px solid #fff; }
            .fill-stamina { background: var(--fui-gold); border-right: 1px solid #fff; z-index: 1;}
            .fill-hunger-cap { 
                position: absolute; 
                right: 0; top: 0; height: 100%; 
                background: repeating-linear-gradient(45deg, #3a2e2b, #3a2e2b 5px, #2a2422 5px, #2a2422 10px); 
                z-index: 0;
            }

            /* --- RESPONSIVE MODAL LAYOUTS --- */
            .responsive-split-container {
                display: flex;
                gap: 30px;
            }

            @media (max-width: 800px) {
                .responsive-split-container {
                    flex-direction: column;
                    gap: 15px;
                }
                #inv-equip-container {
                    flex: auto !important;
                    width: 100%;
                    grid-template-columns: repeat(3, 1fr) !important;
                }
                .chest-panel-half {
                    flex: auto !important;
                    width: 100%;
                }
                .modal-chunky {
                    padding: 15px !important;
                }
                .hud-bar-bg { width: 200px; }
            }

            @media (max-width: 500px) {
                #inv-equip-container {
                    grid-template-columns: repeat(2, 1fr) !important;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// --- QUEST ACCEPT MODAL ---
export function openQuestUI(activeRoom: any, keys: any, playerName: string, questId: string = "protector_1_wolves") {
    if (isQuestUIOpen || !activeRoom) return;
    isQuestUIOpen = true;
    injectGlobalChunkyStyles();

    // Reset input keys so the player stops moving when the modal opens
    for (const key in keys) {
        keys[key as keyof typeof keys] = false;
    }

    let modal = document.getElementById("quest-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "quest-modal";
        modal.className = "modal-chunky";
        modal.style.position = "fixed"; 
        modal.style.top = "50%"; 
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)"; 
        modal.style.padding = "30px"; 
        modal.style.zIndex = "1000"; 
        modal.style.width = "450px";
        document.body.appendChild(modal);
    }

    // Look up the quest details
    const questDef = QUEST_DB[questId] || {
        title: "Unknown Quest",
        dialogue: "I have a task for you...",
        objectives: [{ requiredAmount: 1 }]
    };

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 4px solid #334155; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="margin:0; color:#38bdf8; font-size: 26px; font-weight: 900;">New Quest!</h2>
        <button id="close-quest-btn" class="btn-close-chunky">&times;</button>
      </div>
      <div class="chunky-panel" style="margin-bottom: 20px; text-align: center; font-size: 18px; color: #f8fafc;">
        <div style="font-size: 40px; margin-bottom: 10px;">📜</div>
        <div id="quest-dialogue-container">
            ${questDef.dialogue.replace("<span class='hud-key'>", "").replace("</span>", "")}
        </div>
      </div>
      <div class="chunky-panel" style="margin-bottom: 20px; background: #0f172a; border-color: #1e293b;">
        <div style="font-weight: 900; color: #f59e0b; margin-bottom: 5px; font-size: 14px; text-transform: uppercase;">Your Mission:</div>
        <div style="color: #fff; font-size: 18px; font-weight: 700;">${questDef.title}</div>
      </div>
      <div style="display:flex; gap: 15px;">
          <button id="accept-quest-btn" class="btn-chunky btn-green" style="flex: 1; padding: 15px;">Accept</button>
          <button id="decline-quest-btn" class="btn-chunky btn-red" style="flex: 1; padding: 15px;">Decline</button>
      </div>
    `;

    document.getElementById("close-quest-btn")!.onclick = () => closeQuestModal(modal);
    document.getElementById("decline-quest-btn")!.onclick = () => closeQuestModal(modal);

    document.getElementById("accept-quest-btn")!.onclick = () => {
        activeRoom.send("acceptQuest", { questId: questId });
        closeQuestModal(modal);
    };
}

function closeQuestModal(modal: HTMLElement | null) {
    isQuestUIOpen = false;
    if (modal && document.body.contains(modal)) {
        document.body.removeChild(modal);
    }
}

// --- QUEST TRACKER HUD ---
export function renderQuestTracker(me: any) {
    let tracker = document.getElementById("quest-tracker");
    if (!tracker) {
        tracker = document.createElement("div");
        tracker.id = "quest-tracker";
        tracker.style.position = "fixed";
        tracker.style.top = "20px";
        tracker.style.right = "20px";
        tracker.style.display = "flex";
        tracker.style.flexDirection = "column";
        tracker.style.gap = "15px";
        tracker.style.zIndex = "40";
        tracker.style.fontFamily = "'Nunito', 'Segoe UI Rounded', sans-serif";
        tracker.style.pointerEvents = "none";
        document.body.appendChild(tracker);
    }

    let html = "";
    if (me && me.activeQuests && me.activeQuests.size > 0) {
        me.activeQuests.forEach((qState: any, qId: string) => {
            const def = QUEST_DB[qId];
            if (def) {
                const reqAmt = def.objectives[0]?.requiredAmount || 1;
                const curAmt = qState.currentAmount || 0;
                const pct = Math.min(100, (curAmt / reqAmt) * 100);

                html += `
                    <div style="background: #1e293b; border: 4px solid #38bdf8; border-radius: 20px; padding: 15px; width: 280px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); pointer-events: auto;">
                        <div style="color: #fde047; font-size: 18px; font-weight: 900; text-transform: uppercase; border-bottom: 4px solid #334155; padding-bottom: 8px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 24px;">📜</span> ${def.title}
                        </div>
                        <div style="background: #0f172a; padding: 10px; border-radius: 12px; border: 3px solid #334155;">
                            <div style="color: #38bdf8; font-size: 12px; font-weight: 900; margin-bottom: 6px; text-transform: uppercase;">Progress:</div>
                            <div style="width: 100%; height: 14px; background: #1e293b; border-radius: 7px; overflow: hidden; border: 2px solid #475569;">
                                <div style="width: ${pct}%; height: 100%; background: #22c55e; transition: width 0.3s ease;"></div>
                            </div>
                            <div style="text-align: right; color: #fff; font-size: 14px; font-weight: 900; margin-top: 6px;">
                                ${curAmt} / ${reqAmt}
                            </div>
                        </div>
                    </div>
                `;
            }
        });
    }
    tracker.innerHTML = html;
}