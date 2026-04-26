import { ITEM_DB } from "../ItemDatabase";

// --- EXPORTED UI STATE ---
export let isQuestUIOpen = false;
export let isTeleportUIOpen = false;

export let isInventoryUIOpen = false;
export let isChestUIOpen = false;
export let isShopUIOpen = false;
export let isEventInviteOpen = false;
export let activeChestId: string | null = null;
export let activeStallType: string | null = null;

// --- GLOBAL CHUNKY STYLES INJECTION ---
function injectGlobalChunkyStyles() {
    if (!document.getElementById("chunky-ui-styles")) {
        const style = document.createElement("style");
        style.id = "chunky-ui-styles";
        style.innerHTML = `
            @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&display=swap');
            
            .modal-chunky {
                font-family: 'Nunito', 'Segoe UI Rounded', sans-serif;
                background: #1e293b;
                border: 4px solid #38bdf8;
                border-radius: 24px;
                box-shadow: 0 15px 40px rgba(0,0,0,0.4);
                color: white;
                box-sizing: border-box;
                max-width: 95vw;
                max-height: 90vh;
                overflow-y: auto;
            }
            .btn-chunky {
                border: none;
                border-radius: 16px;
                font-weight: 900;
                font-size: 16px;
                cursor: pointer;
                transition: transform 0.1s, box-shadow 0.1s;
                text-transform: uppercase;
                font-family: 'Nunito', sans-serif;
                letter-spacing: 1px;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;
            }
            .btn-chunky:active:not(:disabled) {
                transform: translateY(6px);
            }
            .btn-green { background: #22c55e; color: white; box-shadow: 0 6px 0 #16a34a; }
            .btn-green:active:not(:disabled) { box-shadow: 0 0px 0 #16a34a; }
            
            .btn-red { background: #ef4444; color: white; box-shadow: 0 6px 0 #b91c1c; }
            .btn-red:active:not(:disabled) { box-shadow: 0 0px 0 #b91c1c; }
            
            .btn-blue { background: #3b82f6; color: white; box-shadow: 0 6px 0 #2563eb; }
            .btn-blue:active:not(:disabled) { box-shadow: 0 0px 0 #2563eb; }

            .btn-gold { background: #f59e0b; color: white; box-shadow: 0 6px 0 #d97706; }
            .btn-gold:active:not(:disabled) { box-shadow: 0 0px 0 #d97706; }

            .btn-slate { background: #475569; color: white; box-shadow: 0 6px 0 #334155; }
            .btn-slate:active:not(:disabled) { box-shadow: 0 0px 0 #334155; }

            .btn-close-chunky {
                background: #ef4444; box-shadow: 0 4px 0 #b91c1c; border-radius: 50%;
                width: 36px; height: 36px; color: white; border: none; font-weight: 900;
                cursor: pointer; display: flex; align-items: center; justify-content: center;
                font-size: 20px; transition: transform 0.1s, box-shadow 0.1s;
                flex-shrink: 0;
            }
            .btn-close-chunky:active {
                transform: translateY(4px); box-shadow: 0 0px 0 #b91c1c;
            }
            
            .chunky-panel {
                background: #334155; border-radius: 16px; padding: 15px; border: 3px solid #475569;
            }

            /* --- HUD STYLES --- */
            #chunky-hud-container {
                position: fixed;
                top: 20px;
                left: 20px;
                display: flex;
                flex-direction: column;
                gap: 12px;
                z-index: 50;
                font-family: 'Nunito', 'Segoe UI Rounded', sans-serif;
                pointer-events: none; 
            }
            .hud-bar-bg {
                width: 250px;
                height: 32px;
                background: #1e293b;
                border: 4px solid #475569;
                border-radius: 16px;
                position: relative;
                overflow: hidden;
                box-shadow: 0 8px 15px rgba(0,0,0,0.3);
            }
            .hud-bar-fill {
                height: 100%;
                border-radius: 10px;
                transition: width 0.2s ease-out;
                position: relative;
            }
            .hud-bar-fill::after {
                content: '';
                position: absolute;
                top: 2px;
                left: 2px;
                right: 2px;
                height: 8px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 6px;
            }
            .hud-icon {
                position: absolute;
                left: -15px;
                top: -10px;
                font-size: 36px;
                filter: drop-shadow(0 4px 0 rgba(0,0,0,0.4));
                z-index: 2;
            }
            .hud-text {
                position: absolute;
                right: 12px;
                top: 50%;
                transform: translateY(-50%);
                color: white;
                font-weight: 900;
                font-size: 14px;
                text-shadow: 0 2px 0 rgba(0,0,0,0.5);
                z-index: 2;
            }
            .fill-hp { background: #ef4444; border-right: 2px solid #b91c1c; }
            .fill-mp { background: #3b82f6; border-right: 2px solid #2563eb; }
            .fill-stamina { background: #eab308; border-right: 2px solid #b45309; z-index: 1;}
            .fill-hunger-cap { 
                position: absolute; 
                right: 0; top: 0; height: 100%; 
                background: repeating-linear-gradient(45deg, #7f1d1d, #7f1d1d 10px, #991b1b 10px, #991b1b 20px); 
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

// --- EXPORTED HUD RENDERING ---
export function renderChunkyHUD(player: any) {
    if (!player) return;
    injectGlobalChunkyStyles();

    let hud = document.getElementById("chunky-hud-container");
    
    // Create the HUD structure if it doesn't exist yet
    if (!hud) {
        hud = document.createElement("div");
        hud.id = "chunky-hud-container";
        hud.innerHTML = `
            <div style="position: relative; margin-left: 15px;">
                <div class="hud-icon">❤️</div>
                <div class="hud-bar-bg">
                    <div id="hud-hp-fill" class="hud-bar-fill fill-hp" style="width: 100%;"></div>
                    <div id="hud-hp-text" class="hud-text">100 / 100</div>
                </div>
            </div>
            <div style="position: relative; margin-left: 15px;">
                <div class="hud-icon">⚡</div>
                <div class="hud-bar-bg">
                    <div id="hud-mp-fill" class="hud-bar-fill fill-mp" style="width: 100%;"></div>
                    <div id="hud-mp-text" class="hud-text">100 / 100</div>
                </div>
            </div>
            <div style="position: relative; margin-left: 15px;" title="Eat food to restore your maximum stamina!">
                <div class="hud-icon">🍗</div>
                <div class="hud-bar-bg" style="border-color: #b45309;">
                    <div id="hud-hunger-fill" class="fill-hunger-cap" style="width: 0%;"></div>
                    <div id="hud-stamina-fill" class="hud-bar-fill fill-stamina" style="width: 100%;"></div>
                    <div id="hud-stamina-text" class="hud-text">100 / 100</div>
                </div>
            </div>
        `;
        document.body.appendChild(hud);
    }

    // Update existing HUD elements without recreating the DOM
    const hpPct = Math.max(0, Math.min(100, (player.hp / player.maxHp) * 100));
    const mpPct = Math.max(0, Math.min(100, (player.mp / player.maxMp) * 100));
    const staminaPct = Math.max(0, Math.min(100, (player.stamina / player.maxStamina) * 100));
    const hungerDeficitPct = 100 - Math.max(0, Math.min(100, (player.hunger / player.maxHunger) * 100));

    const hpFill = document.getElementById("hud-hp-fill");
    const hpText = document.getElementById("hud-hp-text");
    if (hpFill && hpText) {
        hpFill.style.width = `${hpPct}%`;
        hpText.innerText = `${Math.ceil(player.hp)} / ${player.maxHp}`;
    }

    const mpFill = document.getElementById("hud-mp-fill");
    const mpText = document.getElementById("hud-mp-text");
    if (mpFill && mpText) {
        mpFill.style.width = `${mpPct}%`;
        mpText.innerText = `${Math.ceil(player.mp)} / ${player.maxMp}`;
    }

    const stamFill = document.getElementById("hud-stamina-fill");
    const hungerFill = document.getElementById("hud-hunger-fill");
    const stamText = document.getElementById("hud-stamina-text");
    if (stamFill && hungerFill && stamText) {
        stamFill.style.width = `${staminaPct}%`;
        hungerFill.style.width = `${hungerDeficitPct}%`;
        stamText.innerText = `${Math.ceil(player.stamina)} / ${player.maxStamina}`;
    }
}

// --- EXPORTED MODAL FUNCTIONS ---
export function openQuestUI(activeRoom: any, keys: any, playerName: string) {
    if (isQuestUIOpen || !activeRoom) return;
    isQuestUIOpen = true;
    injectGlobalChunkyStyles();

    for (const key in keys) keys[key as keyof typeof keys] = false;

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

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 4px solid #334155; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="margin:0; color:#38bdf8; font-size: 26px; font-weight: 900;">New Quest!</h2>
        <button id="close-quest-btn" class="btn-close-chunky">&times;</button>
      </div>
      <div class="chunky-panel" style="margin-bottom: 20px; text-align: center; font-size: 18px; color: #f8fafc;">
        <div style="font-size: 40px; margin-bottom: 10px;">📜</div>
        "Hey, <span id="quest-player-name" style="color: #f59e0b; font-weight: 900;"></span>! The wilderness is crawling with monsters. We need your help to clear them out. Can we count on you?"
      </div>
      <div class="chunky-panel" style="margin-bottom: 20px; background: #0f172a; border-color: #1e293b;">
        <div style="font-weight: 900; color: #f59e0b; margin-bottom: 5px; font-size: 14px; text-transform: uppercase;">Your Mission:</div>
        <div style="color: #fff; font-size: 18px; font-weight: 700;">Defeat 5 Enemies</div>
        
        <div style="font-weight: 900; color: #38bdf8; margin-top: 15px; margin-bottom: 5px; font-size: 14px; text-transform: uppercase;">Rewards:</div>
        <div style="color: #fff; font-weight: 700;">💰 250 Coins <span style="color:#64748b; margin: 0 5px;">|</span> ⭐ 500 XP</div>
      </div>
      <div style="display:flex; gap: 15px;">
          <button id="accept-quest-btn" class="btn-chunky btn-green" style="flex: 1; padding: 15px;">Accept</button>
          <button id="decline-quest-btn" class="btn-chunky btn-red" style="flex: 1; padding: 15px;">Decline</button>
      </div>
    `;

    document.getElementById("quest-player-name")!.textContent = playerName;

    document.getElementById("close-quest-btn")!.onclick = () => {
        isQuestUIOpen = false;
        document.body.removeChild(modal!);
    };

    document.getElementById("decline-quest-btn")!.onclick = () => {
        isQuestUIOpen = false;
        document.body.removeChild(modal!);
    };

    document.getElementById("accept-quest-btn")!.onclick = () => {
        activeRoom.send("acceptQuest", { questId: "slime_hunt_1" });
        isQuestUIOpen = false;
        document.body.removeChild(modal!);
    };
}

export function openTeleportUI(activeRoom: any, keys: any) {
    if (isTeleportUIOpen || !activeRoom) return;
    isTeleportUIOpen = true;
    injectGlobalChunkyStyles();

    for (const key in keys) {
      keys[key as keyof typeof keys] = false;
    }

    let modal = document.getElementById("teleport-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "teleport-modal";
      modal.className = "modal-chunky";
      modal.style.position = "fixed"; 
      modal.style.top = "50%"; 
      modal.style.left = "50%";
      modal.style.transform = "translate(-50%, -50%)"; 
      modal.style.padding = "30px"; 
      modal.style.zIndex = "1000"; 
      modal.style.width = "400px"; 
      modal.style.textAlign = "center";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 4px solid #334155; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="margin:0; color:#38bdf8; font-size: 26px; font-weight: 900;">Fast Travel</h2>
        <button id="close-teleport-btn" class="btn-close-chunky">&times;</button>
      </div>
      <div style="display:flex; flex-direction:column; gap:20px; margin-bottom: 10px;">
          <button id="tp-town" class="btn-chunky btn-gold" style="padding: 20px; font-size: 18px; display: flex; flex-direction: column; gap: 5px;">
              <span style="font-size: 24px;">🏰</span> Town of Beginnings
          </button>
          <button id="tp-elven" class="btn-chunky btn-green" style="padding: 20px; font-size: 18px; display: flex; flex-direction: column; gap: 5px;">
              <span style="font-size: 24px;">✨</span> The Elven Kingdom
          </button>
      </div>
    `;

    document.getElementById("close-teleport-btn")!.onclick = () => {
      isTeleportUIOpen = false;
      if (document.body.contains(modal!)) document.body.removeChild(modal!);
    };

    document.getElementById("tp-town")!.onclick = () => {
      activeRoom.send("teleport", { destination: "town" });
      isTeleportUIOpen = false;
      if (document.body.contains(modal!)) document.body.removeChild(modal!);
    };

    document.getElementById("tp-elven")!.onclick = () => {
      activeRoom.send("teleport", { destination: "elven", x: 1155, z: 0 });
      isTeleportUIOpen = false;
      if (document.body.contains(modal!)) document.body.removeChild(modal!);
    };
}

// --- EXPORTED UI STATE ---
export let isCasinoUIOpen = false;

export function openCasinoUI(activeRoom: any, keys: any, gameType: string) {
    if (isCasinoUIOpen || !activeRoom) return;
    isCasinoUIOpen = true;
    
    if (typeof (window as any).injectGlobalChunkyStyles === "function") {
        (window as any).injectGlobalChunkyStyles();
    }

    for (const key in keys) keys[key as keyof typeof keys] = false;

    if (!document.getElementById("casino-styles")) {
        const style = document.createElement("style");
        style.id = "casino-styles";
        style.innerHTML = `
            @keyframes anim-flip-coin {
                0% { transform: rotateY(0deg) scale(1); }
                50% { transform: rotateY(900deg) scale(1.5); }
                100% { transform: rotateY(1800deg) scale(1); }
            }
            @keyframes anim-spin-roulette {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(1800deg); }
            }
            @keyframes anim-slot-shake {
                0% { transform: translateY(5px); }
                50% { transform: translateY(-5px); }
                100% { transform: translateY(0); }
            }
            @keyframes anim-deal-card {
                from { transform: translateX(100px) translateY(-50px) rotate(45deg); opacity: 0; }
                to { transform: translateX(0) translateY(0) rotate(0deg); opacity: 1; }
            }
            .flipping { animation: anim-flip-coin 1s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
            .spinning { animation: anim-spin-roulette 2s cubic-bezier(0.1, 0.7, 0.1, 1) forwards; }
            .slot-blur { filter: blur(3px); animation: anim-slot-shake 0.1s infinite; }
            .dealing { animation: anim-deal-card 0.4s ease-out forwards; }
            
            /* Quick Bet Buttons */
            .quick-bet-btn {
                background: #334155; border: 2px solid #475569; color: #cbd5e1;
                border-radius: 8px; padding: 5px 10px; font-weight: 900; font-size: 12px;
                cursor: pointer; transition: all 0.1s; flex: 1; font-family: 'Nunito', sans-serif;
            }
            .quick-bet-btn:hover { background: #475569; color: #fff; }
            .quick-bet-btn:active { transform: translateY(2px); }
        `;
        document.head.appendChild(style);
    }

    let modal = document.getElementById("casino-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "casino-modal";
        modal.className = "modal-chunky";
        modal.style.position = "fixed"; 
        modal.style.top = "50%"; 
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)"; 
        modal.style.background = "#4c1d95"; 
        modal.style.borderColor = "#f472b6";
        modal.style.padding = "30px"; 
        modal.style.zIndex = "1000"; 
        modal.style.width = "400px";
        modal.style.textAlign = "center";
        document.body.appendChild(modal);
    }

    const me = activeRoom.state.players.get(activeRoom.sessionId);
    if (!me) return;

    let customInputs = "";
    let visualArea = "";
    
    if (gameType === "Coin Toss") {
        visualArea = `
            <div style="height: 120px; display: flex; align-items: center; justify-content: center; perspective: 800px;">
                <div id="2d-coin" style="width: 80px; height: 80px; border-radius: 50%; background: #f59e0b; border: 6px solid #fde68a; box-shadow: 0 10px 0 #b45309; display: flex; align-items: center; justify-content: center; font-size: 40px; font-weight: 900; color: white;">💰</div>
            </div>`;
        customInputs = `
            <div style="margin: 15px 0; display:flex; justify-content:center; gap:15px;">
                <button id="btn-heads" class="btn-chunky btn-blue" style="flex:1; padding: 15px;">HEADS</button>
                <button id="btn-tails" class="btn-chunky btn-red" style="flex:1; padding: 15px;">TAILS</button>
            </div>
        `;
    } else if (gameType === "Roulette") {
        visualArea = `
            <div style="height: 140px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <div id="2d-roulette" style="width: 120px; height: 120px; border-radius: 50%; border: 8px solid #334155; background: repeating-conic-gradient(#ef4444 0 18deg, #1e293b 18deg 36deg); box-shadow: 0 10px 0 #0f172a; display: flex; align-items: center; justify-content: center; position: relative;">
                    <div style="width: 60px; height: 60px; background: #e2e8f0; border-radius: 50%; border: 4px solid #94a3b8;"></div>
                    <div style="position: absolute; top: 10px; width: 14px; height: 14px; background: white; border-radius: 50%; box-shadow: 0 0 10px white;"></div>
                </div>
            </div>`;
        customInputs = `
            <select id="roulette-guess" style="width: 100%; padding: 15px; font-size: 16px; font-weight: bold; margin: 15px 0; background: #334155; color: white; border: 4px solid #f472b6; border-radius: 16px; outline: none; font-family: 'Nunito', sans-serif; cursor: pointer;">
                <option value="red">🔴 Red (2x Multiplier)</option>
                <option value="black">⚫ Black (2x Multiplier)</option>
                <option value="0">🟢 Zero (35x Multiplier)</option>
                <option value="7">⭐ Lucky 7 (35x Multiplier)</option>
            </select>
            <button id="btn-play" class="btn-chunky btn-green" style="width: 100%; padding: 15px;">SPIN THE WHEEL!</button>
        `;
    } else if (gameType === "Slot Machine") {
        visualArea = `
            <div style="height: 120px; display: flex; align-items: center; justify-content: center;">
                <div style="background: #1e293b; border: 6px solid #475569; border-radius: 16px; padding: 15px; display: flex; gap: 15px; box-shadow: inset 0 10px 20px rgba(0,0,0,0.5);">
                    <div id="2d-slot-1" style="width: 60px; height: 70px; background: #f8fafc; border-radius: 12px; font-size: 40px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 5px 10px rgba(0,0,0,0.2); border-bottom: 4px solid #cbd5e1;">🍒</div>
                    <div id="2d-slot-2" style="width: 60px; height: 70px; background: #f8fafc; border-radius: 12px; font-size: 40px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 5px 10px rgba(0,0,0,0.2); border-bottom: 4px solid #cbd5e1;">🍋</div>
                    <div id="2d-slot-3" style="width: 60px; height: 70px; background: #f8fafc; border-radius: 12px; font-size: 40px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 5px 10px rgba(0,0,0,0.2); border-bottom: 4px solid #cbd5e1;">💎</div>
                </div>
            </div>`;
        customInputs = `
            <button id="btn-play" class="btn-chunky btn-gold" style="width: 100%; padding: 20px; font-size: 20px; margin-top: 15px;">🎰 PULL LEVER!</button>
        `;
    } else if (gameType === "Blackjack") {
        visualArea = `
            <div style="height: 140px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px;">
                <div id="2d-bj-dealer" style="display: flex; gap: 8px; height: 50px; justify-content: center; width: 100%;"></div>
                <div id="2d-bj-player" style="display: flex; gap: 8px; height: 50px; justify-content: center; width: 100%;"></div>
            </div>`;
        customInputs = `
            <div id="bj-start-controls">
                <button id="btn-play" class="btn-chunky btn-blue" style="width: 100%; padding: 15px; margin-top: 15px;">🃏 DEAL CARDS!</button>
            </div>
            <div id="bj-action-controls" style="display: none; gap: 10px; margin-top: 15px;">
                <button id="btn-hit" class="btn-chunky btn-green" style="flex: 1; padding: 15px;">👇 HIT</button>
                <button id="btn-stand" class="btn-chunky btn-red" style="flex: 1; padding: 15px;">✋ STAND</button>
            </div>
        `;
    }

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 4px solid rgba(255,255,255,0.2); padding-bottom: 10px; margin-bottom: 15px;">
        <h2 style="margin:0; color:#fbcfe8; font-size: 26px; font-weight: 900;">${gameType}</h2>
        <button id="close-casino-btn" class="btn-close-chunky" style="background:#db2777; box-shadow: 0 4px 0 #9d174d;">&times;</button>
      </div>
      
      <div class="chunky-panel" style="background: rgba(0,0,0,0.2); border: none; margin-bottom: 15px;">
        <span style="font-size: 16px; color: #fdf2f8;">Your Coins:</span> 
        <span id="casino-balance" style="font-size: 20px; color: #fde047; font-weight: 900;">${me.coins}</span>
      </div>

      ${visualArea}
  
      <div class="chunky-panel" style="background: #3b0764; border-color: #581c87; text-align: left; margin-top: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <label style="color: #fbcfe8; font-weight: 900; font-size: 14px;">SET BET:</label>
            <div style="display: flex; gap: 5px; width: 60%;">
                <button class="quick-bet-btn" data-amt="min">MIN</button>
                <button class="quick-bet-btn" data-amt="half">1/2</button>
                <button class="quick-bet-btn" data-amt="max">MAX</button>
            </div>
        </div>
        <input type="number" id="bet-amount" value="50" min="1" max="${me.coins}" style="width: 100%; padding: 12px; font-size: 18px; font-weight: bold; margin-top: 8px; background: #fff; color: #1e293b; border: 4px solid #a855f7; border-radius: 12px; box-sizing: border-box; font-family: 'Nunito', sans-serif; text-align: center;" />
      </div>
  
      ${customInputs}
  
      <div id="casino-result" style="margin-top: 20px; font-size: 18px; font-weight: 900; min-height: 24px; color: #fff;"></div>
    `;

    // Hook up Quick Bet logic
    const betInput = document.getElementById("bet-amount") as HTMLInputElement;
    document.querySelectorAll(".quick-bet-btn").forEach(btn => {
        (btn as HTMLElement).onclick = (e) => {
            const amt = (e.target as HTMLElement).dataset.amt;
            const currentCoins = parseInt(document.getElementById("casino-balance")?.innerText || "0");
            if (amt === "min") betInput.value = "10";
            if (amt === "half") betInput.value = Math.max(1, Math.floor(currentCoins / 2)).toString();
            if (amt === "max") betInput.value = currentCoins.toString();
        };
    });

    document.getElementById("close-casino-btn")!.onclick = () => {
        isCasinoUIOpen = false;
        if ((window as any).casinoAnimInterval) clearInterval((window as any).casinoAnimInterval);
        if (document.body.contains(modal!)) document.body.removeChild(modal!);
    };

    const getBet = () => parseInt(betInput.value) || 0;

    const start2DAnimation = (game: string) => {
        const r = document.getElementById("casino-result");
        if (r) r.innerHTML = "Processing...";

        if ((window as any).casinoAnimInterval) clearInterval((window as any).casinoAnimInterval);

        if (game === "Coin Toss") {
            const coin = document.getElementById("2d-coin");
            if (coin) {
                coin.classList.remove("flipping");
                void coin.offsetWidth; 
                coin.classList.add("flipping");
                coin.innerText = "❔";
            }
        } 
        else if (game === "Roulette") {
            const wheel = document.getElementById("2d-roulette");
            if (wheel) {
                wheel.classList.remove("spinning");
                void wheel.offsetWidth;
                wheel.classList.add("spinning");
            }
        } 
        else if (game === "Slot Machine") {
            const s1 = document.getElementById("2d-slot-1");
            const s2 = document.getElementById("2d-slot-2");
            const s3 = document.getElementById("2d-slot-3");
            const symbols = ["🍒", "🍋", "🔔", "💎", "7️⃣"];
            
            if (s1 && s2 && s3) {
                s1.classList.add("slot-blur");
                s2.classList.add("slot-blur");
                s3.classList.add("slot-blur");
                
                (window as any).casinoAnimInterval = setInterval(() => {
                    s1.innerText = symbols[Math.floor(Math.random() * symbols.length)];
                    s2.innerText = symbols[Math.floor(Math.random() * symbols.length)];
                    s3.innerText = symbols[Math.floor(Math.random() * symbols.length)];
                }, 50);
            }
        }
        else if (game === "Blackjack") {
            const dealer = document.getElementById("2d-bj-dealer");
            const player = document.getElementById("2d-bj-player");
            if (dealer && player) {
                dealer.innerHTML = `<div class="dealing" style="width:40px; height:55px; background:white; border:3px solid #cbd5e1; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#1e293b; font-weight:900; font-size: 20px; box-shadow: 0 4px 0 rgba(0,0,0,0.2);">?</div>`;
                player.innerHTML = `<div class="dealing" style="width:40px; height:55px; background:white; border:3px solid #cbd5e1; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#1e293b; font-weight:900; font-size: 20px; box-shadow: 0 4px 0 rgba(0,0,0,0.2);">?</div>`;
            }
        }
    };

    // Fix Network Payloads to map directly to the specific Colyseus handlers
    if (gameType === "Coin Toss") {
        document.getElementById("btn-heads")!.onclick = () => { 
            start2DAnimation(gameType); 
            activeRoom.send("playCoinToss", { bet: getBet(), guess: "heads" }); 
        };
        document.getElementById("btn-tails")!.onclick = () => { 
            start2DAnimation(gameType); 
            activeRoom.send("playCoinToss", { bet: getBet(), guess: "tails" }); 
        };
    } 
    else if (gameType === "Roulette") {
        document.getElementById("btn-play")!.onclick = () => {
            start2DAnimation(gameType);
            const guess = (document.getElementById("roulette-guess") as HTMLSelectElement).value;
            activeRoom.send("playRoulette", { bet: getBet(), guess });
        };
    } 
    else if (gameType === "Slot Machine") {
        document.getElementById("btn-play")!.onclick = () => { 
            start2DAnimation(gameType); 
            activeRoom.send("playSlotMachine", { bet: getBet() }); 
        };
    } 
    else if (gameType === "Blackjack") {
        document.getElementById("btn-play")!.onclick = () => { 
            start2DAnimation(gameType); 
            activeRoom.send("blackjack_start", { bet: getBet() });
            
            // Immediately toggle UI to action phase to feel responsive while server spins up
            document.getElementById("bj-start-controls")!.style.display = "none";
            document.getElementById("bj-action-controls")!.style.display = "flex";
            betInput.disabled = true; 
        };
        
        document.getElementById("btn-hit")!.onclick = () => {
            activeRoom.send("blackjack_action", { action: "hit" });
        };
        
        document.getElementById("btn-stand")!.onclick = () => {
            activeRoom.send("blackjack_action", { action: "stand" });
            // Re-enable starting state for next round
            document.getElementById("bj-action-controls")!.style.display = "none";
            document.getElementById("bj-start-controls")!.style.display = "block";
            betInput.disabled = false;
        };
    }
}


// --- INVENTORY UI ---
export function openInventoryUI(activeRoom: any, keys: any, playerClass: string) {
    if (isInventoryUIOpen || !activeRoom) return;
    isInventoryUIOpen = true;
    injectGlobalChunkyStyles();

    for (const key in keys) {
        keys[key as keyof typeof keys] = false;
    }

    let modal = document.getElementById("inventory-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "inventory-modal";
        modal.className = "modal-chunky";
        modal.style.position = "fixed"; 
        modal.style.top = "50%"; 
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)"; 
        modal.style.padding = "30px"; 
        modal.style.zIndex = "1000"; 
        modal.style.width = "750px"; 
        
        modal.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 4px solid #334155; padding-bottom: 15px; margin-bottom: 20px;">
                <div>
                    <h2 style="margin:0; color:#38bdf8; font-size: 26px; font-weight: 900;"><span id="inv-player-name"></span>'s Backpack</h2>
                    <div style="margin-top: 6px; font-size: 14px; color: #94a3b8; font-weight: 700;">
                        🏅 <span id="inv-player-rank"></span> <span style="margin: 0 5px;">|</span> Level <span id="inv-player-level"></span> <span style="margin: 0 5px;">|</span> Class: <span id="inv-player-class"></span>
                    </div>
                </div>
                <button id="close-inv-btn" class="btn-close-chunky">&times;</button>
            </div>
            <div class="responsive-split-container">
                <div id="inv-equip-container" class="chunky-panel" style="flex: 0 0 220px; display:grid; grid-template-columns: 1fr 1fr; gap:15px; justify-items:center;">
                </div>
                <div style="flex:1;">
                    <div class="chunky-panel" style="margin-bottom: 15px; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 900; color: #94a3b8;">Wallet:</span>
                        <span style="font-size: 20px; color: #f59e0b; font-weight: 900;">💰 <span id="inv-player-coins"></span></span>
                    </div>
                    <div id="inventory-list-container" style="display:flex; flex-direction:column; gap:10px; max-height:350px; overflow-y:auto; padding-right:10px;">
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById("inventory-list-container")!.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (target.tagName !== "BUTTON") return;
            const itemName = target.dataset.itemname;
            if (!itemName) return;

            if (target.classList.contains("equip-btn")) {
                activeRoom.send("equipItem", { itemName });
            } else if (target.classList.contains("use-btn")) {
                activeRoom.send("useItem", { itemName });
            }
        });
    }

    modal.style.display = "block";

    document.getElementById("close-inv-btn")!.onclick = () => {
        isInventoryUIOpen = false;
        modal!.style.display = "none";
    };

    refreshInventoryUI(activeRoom, playerClass);
}

export function refreshInventoryUI(activeRoom: any, playerClass: string) {
    if (!isInventoryUIOpen || !activeRoom) return;
    const me = activeRoom.state.players.get(activeRoom.sessionId);
    if (!me) return;

    let rankColor = "#94a3b8"; 
    if (me.rank === "Bronze") rankColor = "#b45309";
    if (me.rank === "Silver") rankColor = "#cbd5e1";
    if (me.rank === "Gold") rankColor = "#f59e0b";
    if (me.rank === "Diamond") rankColor = "#38bdf8";

    document.getElementById("inv-player-name")!.textContent = me.name;
    const rankEl = document.getElementById("inv-player-rank")!;
    rankEl.textContent = `${me.rank}`;
    rankEl.style.color = rankColor;
    document.getElementById("inv-player-level")!.textContent = me.level;
    document.getElementById("inv-player-class")!.textContent = playerClass.charAt(0).toUpperCase() + playerClass.slice(1);
    document.getElementById("inv-player-coins")!.textContent = me.coins;

    const getEquipSlotHTML = (itemName: string, placeholder: string, label: string) => {
        const item = ITEM_DB[itemName];
        const borderCol = item ? '#22c55e' : '#475569';
        const bgCol = item ? '#166534' : '#1e293b';
        return `
            <div style="display:flex; flex-direction:column; align-items:center; gap:5px; width: 100%;">
                <div class="equip-slot" style="width:64px; height:64px; background:${bgCol}; border:4px solid ${borderCol}; border-radius:16px; display:flex; justify-content:center; align-items:center; font-size:32px; position:relative; box-shadow: inset 0 4px 8px rgba(0,0,0,0.3);">
                    ${item ? item.icon : `<span style="opacity:0.3; filter: grayscale(1);">${placeholder}</span>`}
                </div>
                <span style="font-size:12px; font-weight: 900; color:#94a3b8; text-transform:uppercase;">${label}</span>
            </div>
        `;
    };

    document.getElementById("inv-equip-container")!.innerHTML = `
        ${getEquipSlotHTML(me.equipHead, "🪖", "Head")}
        ${getEquipSlotHTML(me.equipBack, "🧥", "Back")}
        ${getEquipSlotHTML(me.equipChest, "👕", "Chest")}
        ${getEquipSlotHTML(me.equippedItem, "🗡️", "Weapon")}
        ${getEquipSlotHTML(me.equipLegs, "👖", "Legs")}
        ${getEquipSlotHTML(me.equipOffHand, "🛡️", "Off Hand")}
        <div style="grid-column: span 2; display:flex; justify-content:center; width: 100%;" class="feet-equip-slot-wrapper">
            ${getEquipSlotHTML(me.equipFeet, "👞", "Feet")}
        </div>
    `;

    const listContainer = document.getElementById("inventory-list-container")!;
    const currentScroll = listContainer.scrollTop; 

    let listHtml = "";
    let hasItems = false;
    
    me.inventory.forEach((item: any, name: string) => {
        hasItems = true;
        const dbItem = ITEM_DB[name];
        const icon = dbItem ? dbItem.icon : "📦";
        listHtml += `
            <div class="chunky-panel" style="display:flex; justify-content:space-between; align-items:center; padding:12px 15px; margin: 0;">
                <div style="flex-grow:1;">
                    <div style="font-weight:900; font-size:16px; color:#fff;">
                        <span style="font-size: 20px; margin-right: 5px;">${icon}</span> 
                        ${item.name} 
                        <span style="color:#38bdf8; background: #0f172a; padding: 2px 8px; border-radius: 8px; margin-left: 5px; font-size: 14px;">x${item.quantity}</span>
                    </div>
                    <div style="font-size:12px; font-weight: 700; color:#94a3b8; margin-top: 4px; text-transform: capitalize;">${dbItem?.type || 'item'}</div>
                </div>
                <div style="display:flex; gap: 8px;">
                    <button class="btn-chunky btn-green equip-btn" data-itemname="${name}" style="padding: 10px 15px; font-size: 12px;">Equip</button>
                    <button class="btn-chunky btn-blue use-btn" data-itemname="${name}" style="padding: 10px 15px; font-size: 12px;">Use</button>
                </div>
            </div>
        `;
    });

    if (!hasItems) listHtml = `<div style="text-align:center; color:#64748b; padding: 30px; font-weight: 900; font-size: 18px;">Backpack is Empty!</div>`;
    listContainer.innerHTML = listHtml;
    listContainer.scrollTop = currentScroll; 
}


// --- CHEST UI ---
export function openChestUI(activeRoom: any, keys: any, chestId: string) {
    if (isChestUIOpen || !activeRoom) return;
    isChestUIOpen = true;
    activeChestId = chestId;
    injectGlobalChunkyStyles();

    for (const key in keys) keys[key as keyof typeof keys] = false;

    let modal = document.getElementById("chest-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "chest-modal";
        modal.className = "modal-chunky";
        modal.style.position = "fixed"; 
        modal.style.top = "50%"; 
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)"; 
        modal.style.padding = "30px"; 
        modal.style.zIndex = "1000"; 
        modal.style.width = "750px";
        
        modal.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 4px solid #334155; padding-bottom: 15px; margin-bottom: 20px;">
                <h2 style="margin:0; color:#38bdf8; font-size: 26px; font-weight: 900;">Storage Chest</h2>
                <button id="close-chest-btn" class="btn-close-chunky">&times;</button>
            </div>
            <div class="responsive-split-container">
                <div class="chunky-panel chest-panel-half" style="flex: 1;">
                    <h3 style="color: #38bdf8; margin-top: 0; font-weight: 900;">🎒 Your Backpack</h3>
                    <div id="chest-backpack-container" style="display:flex; flex-direction:column; gap:10px; max-height:300px; overflow-y:auto; padding-right: 5px;"></div>
                </div>
                <div class="chunky-panel chest-panel-half" style="flex: 1;">
                    <h3 style="color: #f59e0b; margin-top: 0; font-weight: 900;">🧰 Chest Contents</h3>
                    <div id="chest-contents-container" style="display:flex; flex-direction:column; gap:10px; max-height:300px; overflow-y:auto; padding-right: 5px;"></div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        document.getElementById("chest-backpack-container")!.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("deposit-btn")) {
                const itemName = target.dataset.itemname;
                if (itemName) activeRoom.send("depositChest", { chestId: activeChestId, itemName });
            }
        });

        document.getElementById("chest-contents-container")!.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (target.classList.contains("withdraw-btn")) {
                const itemName = target.dataset.itemname;
                if (itemName) activeRoom.send("withdrawChest", { chestId: activeChestId, itemName });
            }
        });
    }

    modal.style.display = "block";

    document.getElementById("close-chest-btn")!.onclick = () => {
        isChestUIOpen = false;
        activeChestId = null;
        modal!.style.display = "none";
    };

    refreshChestUI(activeRoom);
}

export function refreshChestUI(activeRoom: any) {
    if (!isChestUIOpen || !activeRoom || !activeChestId) return;
    const state = activeRoom.state as any;
    const me = state.players.get(activeRoom.sessionId);
    const chest = state.decorations.get(activeChestId);
    
    if (!me || !chest) {
        document.getElementById("chest-modal")!.style.display = "none";
        isChestUIOpen = false;
        return;
    }

    const bpContainer = document.getElementById("chest-backpack-container")!;
    const chestContainer = document.getElementById("chest-contents-container")!;
    const bpScroll = bpContainer.scrollTop;
    const chestScroll = chestContainer.scrollTop;

    let bpHTML = "";
    me.inventory.forEach((item: any, name: string) => {
        const dbItem = ITEM_DB[name];
        const icon = dbItem ? dbItem.icon : "📦";
        bpHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:12px; border-radius:12px; border:2px solid #475569;">
                <div style="font-weight:900; font-size:14px;">${icon} ${item.name} <span style="color:#38bdf8;">x${item.quantity}</span></div>
                <button class="btn-chunky btn-blue deposit-btn" data-itemname="${name}" style="padding:8px 12px; font-size: 12px;">Deposit</button>
            </div>
        `;
    });
    if (me.inventory.size === 0) bpHTML = `<div style="text-align:center; color:#64748b; font-weight:900; padding: 20px;">Empty</div>`;
    
    let chHTML = "";
    if (chest.inventory) {
        chest.inventory.forEach((item: any, name: string) => {
            const dbItem = ITEM_DB[name];
            const icon = dbItem ? dbItem.icon : "📦";
            chHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:12px; border-radius:12px; border:2px solid #475569;">
                    <div style="font-weight:900; font-size:14px;">${icon} ${item.name} <span style="color:#f59e0b;">x${item.quantity}</span></div>
                    <button class="btn-chunky btn-gold withdraw-btn" data-itemname="${name}" style="padding:8px 12px; font-size: 12px; color: #1e293b;">Withdraw</button>
                </div>
            `;
        });
        if (chest.inventory.size === 0) chHTML = `<div style="text-align:center; color:#64748b; font-weight:900; padding: 20px;">Empty</div>`;
    } else {
        chHTML = `<div style="text-align:center; color:#64748b; font-weight:900; padding: 20px;">Empty</div>`;
    }

    bpContainer.innerHTML = bpHTML;
    bpContainer.scrollTop = bpScroll;
    chestContainer.innerHTML = chHTML;
    chestContainer.scrollTop = chestScroll;
}


// --- SHOP UI ---
export function openShopUI(activeRoom: any, keys: any, stallType: string) {
    if (isShopUIOpen || !activeRoom) return;
    isShopUIOpen = true;
    activeStallType = stallType;
    injectGlobalChunkyStyles();

    for (const key in keys) {
        keys[key as keyof typeof keys] = false;
    }

    let modal = document.getElementById("shop-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "shop-modal";
        modal.className = "modal-chunky";
        modal.style.position = "fixed"; 
        modal.style.top = "50%"; 
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)"; 
        modal.style.padding = "30px"; 
        modal.style.zIndex = "1000"; 
        modal.style.width = "500px";
        
        modal.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 4px solid #334155; padding-bottom: 15px; margin-bottom: 20px;">
                <div>
                    <h2 id="shop-title" style="margin:0; color:#f59e0b; font-size: 26px; font-weight: 900;"></h2>
                    <div id="shop-subtitle" style="margin-top: 5px; font-size: 14px; font-weight: 900;"></div>
                </div>
                <button id="close-shop-btn" class="btn-close-chunky">&times;</button>
            </div>
            <div id="shop-vault-container"></div>
            <div id="shop-items-container" style="display:flex; flex-direction:column; gap:12px; max-height:350px; overflow-y:auto; padding-right: 5px;"></div>
        `;
        document.body.appendChild(modal);

        document.getElementById("shop-vault-container")!.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (target.id === "collect-vault-btn") {
                const storeId = target.dataset.storeid;
                if (storeId) activeRoom.send("collectVault", { storeId });
            } else if (target.id === "buy-store-btn") {
                const storeId = target.dataset.storeid;
                if (storeId) activeRoom.send("buyStore", { storeId });
            }
        });

        document.getElementById("shop-items-container")!.addEventListener("click", (e) => {
            const target = e.target as HTMLElement;
            if (target.tagName !== "BUTTON") return;
            
            const storeId = target.dataset.storeid;
            const itemName = target.dataset.itemname;
            if (!storeId || !itemName) return;

            if (target.classList.contains("restock-btn")) {
                activeRoom.send("restockItem", { storeId, itemName, amount: 1 });
            } else if (target.classList.contains("buy-btn") && !target.hasAttribute("disabled")) {
                activeRoom.send("buyItem", { storeId, itemName });
            }
        });
    }

    modal.style.display = "block";

    document.getElementById("close-shop-btn")!.onclick = () => {
        isShopUIOpen = false;
        activeStallType = null;
        modal!.style.display = "none";
    };

    refreshShopUI(activeRoom);
}

export function refreshShopUI(activeRoom: any) {
    if (!isShopUIOpen || !activeRoom || !activeStallType) return;
    
    let storeObj: any = null;
    (activeRoom.state as any).stores.forEach((s: any) => {
        if (s.type === activeStallType) storeObj = s;
    });

    if (!storeObj) return;

    const isOwned = !!storeObj.ownerId;
    const isMine = storeObj.ownerName === (activeRoom.state as any).players.get(activeRoom.sessionId)?.name;

    let leaseText = "";
    if (isOwned) {
        const timeDiff = storeObj.ownershipUntil - Date.now();
        const daysLeft = Math.max(1, Math.ceil(timeDiff / (1000 * 60 * 60 * 24)));
        leaseText = ` (Lease: ${daysLeft} days left)`;
    }

    document.getElementById("shop-title")!.textContent = activeStallType;
    const subEl = document.getElementById("shop-subtitle")!;
    subEl.textContent = isOwned ? `Owner: ${isMine ? 'You' : storeObj.ownerName}${leaseText}` : 'Unowned Public Store';
    subEl.style.color = isOwned ? '#22c55e' : '#94a3b8';

    const vaultContainer = document.getElementById("shop-vault-container")!;
    if (isMine) {
        vaultContainer.innerHTML = `
            <div class="chunky-panel" style="margin-bottom: 20px; border-color: #22c55e; background: #14532d;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size: 18px; font-weight: 900; color: #fde047;">Vault: 💰 ${storeObj.vault}</span>
                    <button id="collect-vault-btn" class="btn-chunky btn-green" data-storeid="${storeObj.id}" style="padding:10px 15px;">Collect</button>
                </div>
            </div>
        `;
    } else if (!isOwned) {
        vaultContainer.innerHTML = `
            <button id="buy-store-btn" class="btn-chunky btn-blue" data-storeid="${storeObj.id}" style="width: 100%; padding: 15px; margin-bottom: 20px;">
                Buy Store for 1000 Coins (14 Days)
            </button>
        `;
    } else {
        vaultContainer.innerHTML = "";
    }

    const itemsContainer = document.getElementById("shop-items-container")!;
    const itemsScroll = itemsContainer.scrollTop;
    let itemsHTML = "";

    storeObj.inventory.forEach((item: any, name: string) => {
        const inStock = !isOwned || item.stock > 0;
        const stockText = isOwned ? `Stock: ${item.stock}` : `Unlimited Stock`;
        const dbItem = ITEM_DB[item.name];
        const icon = dbItem ? dbItem.icon : "📦";

        itemsHTML += `
            <div class="chunky-panel" style="display:flex; justify-content:space-between; align-items:center; padding:15px; margin: 0;">
                <div style="padding-right: 15px; flex-grow: 1;">
                    <div style="font-weight:900; font-size:18px; color:#fff;">${icon} ${item.name}</div>
                    <div style="font-size:14px; color:#cbd5e1; margin-top:6px; line-height:1.4; font-weight: 700;">${item.desc}</div>
                    <div style="font-size:12px; color:#38bdf8; margin-top:8px; font-weight:900;">${stockText}</div>
                </div>
        `;

        if (isMine) {
            itemsHTML += `
                <div style="display:flex; flex-direction:column; gap: 10px;">
                    <button class="btn-chunky btn-blue restock-btn" data-storeid="${storeObj.id}" data-itemname="${name}" style="padding:10px 15px; font-size: 12px;">
                        Restock (+1) - ${item.wholesalePrice}c
                    </button>
                    <div style="text-align: right; color: #f59e0b; font-size: 14px; font-weight:900;">Sells for: ${item.price}</div>
                </div>
            `;
        } else {
            const btnClass = inStock ? "btn-gold" : "btn-slate";
            itemsHTML += `
                <button class="btn-chunky ${btnClass} buy-btn" data-storeid="${storeObj.id}" data-itemname="${name}" ${inStock ? '' : 'disabled'} style="padding:12px 20px; color: #1e293b; white-space: nowrap;">
                    ${inStock ? `Buy - ${item.price}c` : 'Sold Out'}
                </button>
            `;
        }

        itemsHTML += `</div>`;
    });

    itemsContainer.innerHTML = itemsHTML;
    itemsContainer.scrollTop = itemsScroll;
}


export function openBlueprintSelector(activeScene: any, keys: any) {
    if (!activeScene || !(activeScene.constructor.name === "TownScene")) return;
    injectGlobalChunkyStyles();
    
    for (const key in keys) {
      keys[key as keyof typeof keys] = false;
    }

    const modal = document.createElement("div");
    modal.id = "blueprint-modal";
    modal.className = "modal-chunky";
    modal.style.position = "fixed"; 
    modal.style.top = "50%"; 
    modal.style.left = "50%";
    modal.style.transform = "translate(-50%, -50%)"; 
    modal.style.padding = "30px"; 
    modal.style.zIndex = "1000"; 
    modal.style.width = "400px";
    modal.style.textAlign = "center";

    modal.innerHTML = `
      <h2 style="margin:0 0 10px 0; color:#38bdf8; font-weight: 900; font-size: 26px;">Select Blueprint</h2>
      <p style="color:#cbd5e1; font-size:16px; margin-bottom: 25px; font-weight: 700;">What do you want to build?</p>
      
      <div style="display:flex; flex-direction:column; gap:15px;">
        <button id="bp-house" class="btn-chunky btn-blue" style="padding: 20px; font-size: 18px;">
            🏡 House (10 Mats)
        </button>
        <button id="bp-farm" class="btn-chunky btn-green" style="padding: 20px; font-size: 18px;">
            🌾 Farm (5 Mats)
        </button>
        <button id="bp-shop" class="btn-chunky btn-gold" style="padding: 20px; font-size: 18px; color: #1e293b;">
            🏪 Shop (20 Mats)
        </button>
      </div>
      <button id="close-bp-btn" class="btn-chunky btn-red" style="margin-top: 25px; padding:15px; width:100%;">Cancel</button>
    `;

    document.body.appendChild(modal);

    const setupBtn = (id: string, type: string) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = () => {
                activeScene.currentBlueprintType = type;
                activeScene.isBuildMode = true;
                activeScene.isBuyMode = false;
                document.body.removeChild(modal);
            };
        }
    };

    setupBtn("bp-house", "house");
    setupBtn("bp-farm", "farm");
    setupBtn("bp-shop", "shop");

    document.getElementById("close-bp-btn")!.onclick = () => {
        document.body.removeChild(modal);
    };
}

export async function showCharacterCreation(): Promise<{ classId: string, pathwayId: string, auraStyle: string }> {
  injectGlobalChunkyStyles();
  return new Promise((resolve) => {
    const container = document.createElement("div");
    container.style.position = "fixed"; container.style.top = "0"; container.style.left = "0";
    container.style.width = "100vw"; container.style.height = "100vh";
    container.style.background = "#0f172a"; 
    container.style.zIndex = "9999"; container.style.display = "flex";
    container.style.flexDirection = "column"; container.style.alignItems = "center";
    container.style.justifyContent = "center"; 
    container.style.fontFamily = "'Nunito', 'Segoe UI Rounded', sans-serif";
    container.style.padding = "20px";
    container.style.boxSizing = "border-box";
    container.style.overflowY = "auto";

    const title = document.createElement("h1");
    title.innerText = "CHOOSE YOUR CLASS!";
    title.style.color = "white"; title.style.fontSize = "clamp(30px, 5vw, 50px)"; title.style.marginBottom = "40px";
    title.style.fontWeight = "900";
    title.style.textAlign = "center";
    title.style.textShadow = "0 6px 0 rgba(0,0,0,0.5)";
    container.appendChild(title);

    const cardRow = document.createElement("div");
    cardRow.style.display = "flex"; 
    cardRow.style.gap = "30px";
    cardRow.style.flexWrap = "wrap"; // Added wrap for mobile
    cardRow.style.justifyContent = "center";
    container.appendChild(cardRow);

    const classes = [
      { id: "duelist", name: "Duelist", desc: "Fast hits, high mobility. Dash around the battlefield!", color: "#f59e0b", icon: "⚔️", shadow: "#d97706" },
      { id: "vanguard", name: "Vanguard", desc: "Heavy armor tank. Take hits and protect your friends!", color: "#3b82f6", icon: "🛡️", shadow: "#2563eb" },
      { id: "arcanist", name: "Arcanist", desc: "Ranged magic attacks. Stay back and blow things up!", color: "#d946ef", icon: "🪄", shadow: "#c026d3" }
    ];

    const pathways = [
      { id: "shadow", name: "Shadow", desc: "Sneaky strikes and burst damage.", color: "#8b5cf6", icon: "🌑", shadow: "#7c3aed" },
      { id: "light", name: "Light", desc: "Healing spells and protection.", color: "#fde047", icon: "☀️", shadow: "#eab308" },
      { id: "berserker", name: "Berserker", desc: "Raw power and fire attacks.", color: "#ef4444", icon: "🔥", shadow: "#dc2626" },
      { id: "nature", name: "Nature", desc: "Healing and area control.", color: "#22c55e", icon: "🌿", shadow: "#16a34a" }
    ];

    const auras = [
        { id: "tyrant", name: "Tyrant", desc: "Slows and weakens nearby enemies.", color: "#ef4444", icon: "💥", shadow: "#dc2626" },
        { id: "sanctuary", name: "Sanctuary", desc: "Heals and shields nearby allies.", color: "#3b82f6", icon: "🛡️", shadow: "#2563eb" },
        { id: "void", name: "Void", desc: "Sneak up and buff your next strike.", color: "#8b5cf6", icon: "🥷", shadow: "#7c3aed" },
        { id: "storm", name: "Storm", desc: "Periodically zaps enemies with lightning.", color: "#22c55e", icon: "🌪️", shadow: "#16a34a" }
    ];

    let selectedClass = "";
    let selectedPathway = "";

    const renderOptions = (items: any[], step: number) => {
      cardRow.innerHTML = "";
      items.forEach(item => {
        const card = document.createElement("button");
        card.style.width = "clamp(240px, 80vw, 260px)";
        card.style.height = "auto";
        card.style.minHeight = "360px";
        card.style.background = "#1e293b";
        card.style.border = `6px solid ${item.color}`; 
        card.style.borderRadius = "24px";
        card.style.color = "white"; 
        card.style.cursor = "pointer";
        card.style.padding = "25px"; 
        card.style.display = "flex"; 
        card.style.flexDirection = "column";
        card.style.transition = "transform 0.1s, box-shadow 0.1s";
        card.style.fontFamily = "'Nunito', sans-serif";
        card.style.boxShadow = `0 10px 0 ${item.shadow}`;

        card.onmousedown = () => { card.style.transform = "translateY(10px)"; card.style.boxShadow = "0 0px 0 transparent"; };
        card.onmouseup = () => { card.style.transform = "translateY(0)"; card.style.boxShadow = `0 10px 0 ${item.shadow}`; };
        card.onmouseleave = () => { card.style.transform = "translateY(0)"; card.style.boxShadow = `0 10px 0 ${item.shadow}`; };

        card.innerHTML = `
            <div style="font-size: 60px; text-align: center; margin-bottom: 15px;">${item.icon}</div>
            <h2 style="color: ${item.color}; margin-top: 0; text-align: center; font-weight: 900; font-size: 28px; text-transform: uppercase;">${item.name}</h2>
            <p style="font-size: 18px; font-weight: 700; line-height: 1.4; color: #cbd5e1; flex-grow: 1; text-align: center;">${item.desc}</p>
            <div style="font-weight: 900; font-size: 20px; padding-top: 15px; border-top: 4px solid rgba(255,255,255,0.1); text-align: center; color: white;">SELECT</div>
        `;
        
        card.onclick = () => {
          if (step === 1) {
            selectedClass = item.id;
            title.innerText = `PICK A PATHWAY!`;
            renderOptions(pathways, 2);
          } else if (step === 2) {
            selectedPathway = item.id;
            title.innerText = `SELECT YOUR AURA!`;
            renderOptions(auras, 3);
          } else if (step === 3) {
            document.body.removeChild(container);
            resolve({ classId: selectedClass, pathwayId: selectedPathway, auraStyle: item.id });
          }
        };
        cardRow.appendChild(card);
      });
    };

    renderOptions(classes, 1);
    document.body.appendChild(container);
  });
}

export function openEventInviteUI(activeRoom: any, eventName: string, targetZone: string) {
    if (isEventInviteOpen || !activeRoom) return;
    isEventInviteOpen = true;
    injectGlobalChunkyStyles();

    let modal = document.getElementById("event-invite-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "event-invite-modal";
        modal.className = "modal-chunky";
        modal.style.position = "fixed";
        // Spawns near the top so it doesn't block the center of the screen during combat
        modal.style.top = "15%"; 
        modal.style.left = "50%";
        modal.style.transform = "translateX(-50%)";
        modal.style.padding = "30px";
        modal.style.zIndex = "4000";
        modal.style.width = "420px";
        modal.style.textAlign = "center";
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 4px solid #334155; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="margin:0; color:#f59e0b; font-size: 24px; font-weight: 900;">🔥 Event Starting!</h2>
        <button id="close-event-invite-btn" class="btn-close-chunky">&times;</button>
      </div>
      <p style="color:white; font-size:18px; margin-bottom: 25px; font-weight: 700;">
        The <b style="color: #38bdf8;">${eventName}</b> is now open! Do you want to teleport there immediately?
      </p>
      <div style="display:flex; gap: 15px;">
          <button id="join-event-btn" class="btn-chunky btn-green" style="flex: 1; padding: 15px;">Yes, Join!</button>
          <button id="decline-event-btn" class="btn-chunky btn-slate" style="flex: 1; padding: 15px;">Ignore</button>
      </div>
    `;

    document.getElementById("close-event-invite-btn")!.onclick = () => {
        isEventInviteOpen = false;
        if (document.body.contains(modal!)) document.body.removeChild(modal!);
    };

    document.getElementById("decline-event-btn")!.onclick = () => {
        isEventInviteOpen = false;
        if (document.body.contains(modal!)) document.body.removeChild(modal!);
    };

    document.getElementById("join-event-btn")!.onclick = () => {
        // Triggers the existing teleport handler on your server
        activeRoom.send("teleport", { destination: targetZone }); 
        isEventInviteOpen = false;
        if (document.body.contains(modal!)) document.body.removeChild(modal!);
    };
}