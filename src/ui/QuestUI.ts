import { ITEM_DB } from "../ItemDatabase";
import { QUEST_DB as TUTORIAL_QUEST_DB } from "../QuestDatabase";
import { NPC_QUEST_DB } from "../NPCQuestDatabase";

// --- GLOBAL LUXURY FUI STYLES INJECTION ---
function injectGlobalChunkyStyles() {
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
        `;
        document.head.appendChild(style);
    }
}

// --- EXPORTED STATE ---
export let isQuestUIOpen = false;

// --- UNIFIED QUEST LOOKUP ---
// This safely checks the NPC database first, then falls back to the Tutorial database.
function getQuestDef(questId: string) {
    return NPC_QUEST_DB[questId] || TUTORIAL_QUEST_DB[questId] || null;
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

    // Look up the quest details using the unified helper
    const questDef = getQuestDef(questId) || {
        title: "Unknown Quest",
        dialogue: "I have a task for you...",
        objectives: [{ requiredAmount: 1 }],
        rewards: { coins: 0, exp: 0 }
    };

    // Safely parse the dialogue to replace the hud-key spans with FUI cyan styling
    const parsedDialogue = questDef.dialogue
        .replace(/<span class='hud-key'>/g, "<span style='color: var(--fui-cyan); font-weight: 900; letter-spacing: 1px;'>")
        .replace(/<\/span>/g, "</span>");

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--fui-gold-dim); padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="margin:0; color:var(--fui-gold); font-size: 20px; font-weight: 900; letter-spacing: 2px;">NEW CONTRACT</h2>
        <button id="close-quest-btn" class="btn-close-chunky">&times;</button>
      </div>
      <div class="chunky-panel" style="margin-bottom: 20px; text-align: center; font-size: 14px; color: var(--fui-text); letter-spacing: 1px; line-height: 1.6;">
        <div style="font-size: 40px; margin-bottom: 10px; filter: drop-shadow(0 0 10px var(--fui-gold-dim));">📜</div>
        <div id="quest-dialogue-container">
            ${parsedDialogue}
        </div>
      </div>
      <div class="chunky-panel" style="margin-bottom: 20px; background: rgba(0,0,0,0.4); border-color: var(--fui-cyan);">
        <div style="font-weight: 900; color: var(--fui-cyan); margin-bottom: 5px; font-size: 10px; text-transform: uppercase; letter-spacing: 2px;">OBJECTIVE:</div>
        <div style="color: white; font-size: 16px; font-weight: 900; letter-spacing: 1px;">${questDef.title}</div>
        
        <div style="font-weight: 900; color: var(--fui-gold); margin-top: 15px; margin-bottom: 5px; font-size: 10px; text-transform: uppercase; letter-spacing: 2px;">REWARDS:</div>
        <div style="color: var(--fui-text); font-weight: 700; font-size: 12px; letter-spacing: 1px;">
            💰 ${questDef.rewards?.coins || 0} CR <span style="color:var(--fui-gold-dim); margin: 0 5px;">|</span> ⭐ ${questDef.rewards?.exp || 0} EXP
        </div>
      </div>
      <div style="display:flex; gap: 15px;">
          <button id="accept-quest-btn" class="btn-chunky btn-green" style="flex: 1; padding: 15px;">ACCEPT</button>
          <button id="decline-quest-btn" class="btn-chunky btn-red" style="flex: 1; padding: 15px;">DECLINE</button>
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
        tracker.style.top = "250px"; // FIXED: Shifted down to clear the minimap and top-right HUD container
        tracker.style.right = "20px";
        tracker.style.display = "flex";
        tracker.style.flexDirection = "column";
        tracker.style.gap = "15px";
        tracker.style.zIndex = "40";
        tracker.style.fontFamily = "'Nunito', sans-serif";
        tracker.style.pointerEvents = "none";
        document.body.appendChild(tracker);
    }

    let html = "";
    if (me && me.activeQuests && me.activeQuests.size > 0) {
        me.activeQuests.forEach((qState: any, qId: string) => {
            
            // Use the unified helper here to pull the correct DB info
            const def = getQuestDef(qId);
            
            if (def) {
                const reqAmt = def.objectives[0]?.requiredAmount || 1;
                const curAmt = qState.currentAmount || 0;
                const pct = Math.min(100, (curAmt / reqAmt) * 100);

                html += `
                    <div style="background: var(--fui-bg); border: 2px solid var(--fui-gold); border-radius: 4px; padding: 15px; width: 280px; box-shadow: 0 10px 25px rgba(0,0,0,0.8), inset 0 0 15px rgba(212,175,55,0.05); pointer-events: auto;">
                        <div style="color: var(--fui-gold); font-size: 14px; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid var(--fui-gold-dim); padding-bottom: 8px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; letter-spacing: 1px;">
                            <span style="font-size: 18px; filter: drop-shadow(0 0 5px var(--fui-gold-dim));">📜</span> ${def.title}
                        </div>
                        <div style="background: rgba(0,0,0,0.4); padding: 10px; border-radius: 4px; border: 1px solid var(--fui-gold-dim);">
                            <div style="color: var(--fui-cyan); font-size: 10px; font-weight: 900; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 1px;">PROGRESS:</div>
                            <div style="width: 100%; height: 8px; background: var(--fui-bg); border-radius: 2px; overflow: hidden; border: 1px solid var(--fui-gold-dim);">
                                <div style="width: ${pct}%; height: 100%; background: var(--fui-cyan); transition: width 0.3s ease; box-shadow: 0 0 10px var(--fui-cyan);"></div>
                            </div>
                            <div style="text-align: right; color: var(--fui-text); font-size: 12px; font-weight: 900; margin-top: 6px; letter-spacing: 1px;">
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