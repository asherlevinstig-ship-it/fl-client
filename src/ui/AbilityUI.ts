import { ITEM_DB } from "../ItemDatabase";

// --- EXPORTED UI STATE ---
export let isQuestUIOpen = false;
export let isTeleportUIOpen = false;
export let isCasinoUIOpen = false;
export let isInventoryUIOpen = false;
export let isChestUIOpen = false;
export let isShopUIOpen = false;
export let activeChestId: string | null = null;
export let activeStallType: string | null = null;

// --- GLOBAL CHUNKY STYLES INJECTION ---
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
            
            /* FIXED: Flipped z-index so the red starvation cap renders OVER the yellow stamina */
            .fill-stamina { background: #eab308; border-right: 2px solid #b45309; z-index: 0;}
           .fill-hunger-cap { 
    position: absolute; 
    right: 0; top: 0; height: 100%; 
    background: repeating-linear-gradient(45deg, #7f1d1d, #7f1d1d 10px, #991b1b 10px, #991b1b 20px); 
    z-index: 1;
    transition: width 0.2s ease-out; /* <-- ADD THIS FOR PERFECT SYNERGY */
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
        
        // FIXED: Clear starvation text logic
        if (player.hunger <= 0) {
            stamText.innerText = "STARVING!";
            stamText.style.color = "#fca5a5"; // Light red warning text
        } else {
            // Clearly label Stamina vs. Hunger so the numbers make sense
            stamText.innerText = `${Math.ceil(player.stamina)} ⚡ / ${Math.ceil(player.hunger)} 🍗`;
            stamText.style.color = "white";
        }
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

export function openCasinoUI(activeRoom: any, keys: any, gameType: string) {
    if (isCasinoUIOpen || !activeRoom) return;
    isCasinoUIOpen = true;
    injectGlobalChunkyStyles();

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
            <select id="roulette-guess" style="width: 100%; padding: 15px; font-size: 16px; font-weight: bold; margin: 15px 0; background: #334155; color: white; border: 4px solid #f472b6; border-radius: 16px; outline: none; font-family: 'Nunito', sans-serif;">
                <option value="red">🔴 Red (2x)</option>
                <option value="black">⚫ Black (2x)</option>
                <option value="0">🟢 Zero (35x)</option>
                <option value="7">Lucky 7 (35x)</option>
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
                <div id="2d-bj-dealer" style="display: flex; gap: 8px; height: 50px;"></div>
                <div id="2d-bj-player" style="display: flex; gap: 8px; height: 50px;"></div>
            </div>`;
        customInputs = `
            <button id="btn-play" class="btn-chunky btn-blue" style="width: 100%; padding: 15px; margin-top: 15px;">🃏 DEAL CARDS!</button>
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
        <label style="color: #fbcfe8; font-weight: 900; font-size: 14px;">SET BET:</label>
        <input type="number" id="bet-amount" value="50" min="1" max="${me.coins}" style="width: 100%; padding: 12px; font-size: 18px; font-weight: bold; margin-top: 8px; background: #fff; color: #1e293b; border: 4px solid #a855f7; border-radius: 12px; box-sizing: border-box; font-family: 'Nunito', sans-serif;" />
      </div>
  
      ${customInputs}
  
      <div id="casino-result" style="margin-top: 20px; font-size: 18px; font-weight: 900; min-height: 24px; color: #fff;"></div>
    `;

    document.getElementById("close-casino-btn")!.onclick = () => {
        isCasinoUIOpen = false;
        if ((window as any).casinoAnimInterval) clearInterval((window as any).casinoAnimInterval);
        if (document.body.contains(modal!)) document.body.removeChild(modal!);
    };

    const getBet = () => parseInt((document.getElementById("bet-amount") as HTMLInputElement).value) || 0;

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

    if (gameType === "Coin Toss") {
        document.getElementById("btn-heads")!.onclick = () => { start2DAnimation(gameType); activeRoom.send("playCasino", { game: gameType, bet: getBet(), guess: "heads" }); };
        document.getElementById("btn-tails")!.onclick = () => { start2DAnimation(gameType); activeRoom.send("playCasino", { game: gameType, bet: getBet(), guess: "tails" }); };
    } else if (gameType === "Roulette") {
        document.getElementById("btn-play")!.onclick = () => {
            start2DAnimation(gameType);
            const guess = (document.getElementById("roulette-guess") as HTMLSelectElement).value;
            activeRoom.send("playCasino", { game: gameType, bet: getBet(), guess });
        };
    } else {
        document.getElementById("btn-play")!.onclick = () => { start2DAnimation(gameType); activeRoom.send("playCasino", { game: gameType, bet: getBet() }); };
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
            <div style="display:flex; gap:30px;">
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
            <div style="display:flex; flex-direction:column; align-items:center; gap:5px;">
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
        <div style="grid-column: span 2; display:flex; justify-content:center;">
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
            <div style="display: flex; gap: 20px;">
                <div class="chunky-panel" style="flex: 1;">
                    <h3 style="color: #38bdf8; margin-top: 0; font-weight: 900;">🎒 Your Backpack</h3>
                    <div id="chest-backpack-container" style="display:flex; flex-direction:column; gap:10px; max-height:300px; overflow-y:auto; padding-right: 5px;"></div>
                </div>
                <div class="chunky-panel" style="flex: 1;">
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

    const title = document.createElement("h1");
    title.innerText = "CHOOSE YOUR CLASS!";
    title.style.color = "white"; title.style.fontSize = "50px"; title.style.marginBottom = "40px";
    title.style.fontWeight = "900";
    title.style.textShadow = "0 6px 0 rgba(0,0,0,0.5)";
    container.appendChild(title);

    const cardRow = document.createElement("div");
    cardRow.style.display = "flex"; cardRow.style.gap = "30px";
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
        card.style.width = "260px";
        card.style.height = "360px";
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

import { SKILL_TREE_DATA, CATEGORY_MAP, UTILITY_TREE_DATA, UTILITY_CATEGORY_MAP, FAMILIAR_TREE_DATA, FAMILIAR_CATEGORY_MAP, getSkillDef, getAbilityCategory } from "../data/AbilityDatabase";
import { QUICK_CHATS, currentChatChannel } from "../game/PlayerController"; 

// --- EXPORTED STATE ---
export let isSkillTreeUIOpen = false;

// Load hotbar from local storage so commitments persist across reloads
export const playerHotbar = JSON.parse(localStorage.getItem("rpg_hotbar") || "{}");
if (typeof playerHotbar.slot2 !== "string") playerHotbar.slot2 = "";
if (typeof playerHotbar.slot3 !== "string") playerHotbar.slot3 = "";
if (typeof playerHotbar.slot4 !== "string") playerHotbar.slot4 = "";
if (typeof playerHotbar.slot5 !== "string") playerHotbar.slot5 = "";
if (typeof playerHotbar.slot6 !== "string") playerHotbar.slot6 = ""; 
if (typeof playerHotbar.slot7 !== "string") playerHotbar.slot7 = ""; 
if (typeof playerHotbar.slot8 !== "string") playerHotbar.slot8 = ""; 
if (typeof playerHotbar.slot9 !== "string") playerHotbar.slot9 = ""; 

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
    playerHotbar.slot2 = "";
    playerHotbar.slot3 = "";
    playerHotbar.slot4 = "";
    playerHotbar.slot5 = "";
    playerHotbar.slot6 = "";
    playerHotbar.slot7 = "";
    playerHotbar.slot8 = "";
    playerHotbar.slot9 = "";
    saveHotbar();
    
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
    injectGlobalChunkyStyles();
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
        `;
        document.head.appendChild(style);
    }
}

export function renderHotbar() {
    injectSkillTreeStyles(); 

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
        const abilityId = playerHotbar[`slot${slotNum}` as keyof typeof playerHotbar];
        const def = getSkillDef(abilityId);
        if (def) {
            html += createSlotHTML(slotNum.toString(), def.icon, def.name, def.color);
        } else {
            html += createSlotHTML(slotNum.toString(), '<span style="opacity:0.3; font-size:24px;">➕</span>', "Empty", "#334155");
        }
    });

    // Render Utility Slots (6-7)
    [6, 7].forEach(slotNum => {
        const abilityId = playerHotbar[`slot${slotNum}` as keyof typeof playerHotbar];
        const def = getSkillDef(abilityId);
        if (def) {
            html += createSlotHTML(slotNum.toString(), def.icon, def.name, def.color, slotNum === 6);
        } else {
            html += createSlotHTML(slotNum.toString(), '<span style="opacity:0.3; font-size:24px;">➕</span>', "Utility", "#334155", slotNum === 6);
        }
    });

    // Render Familiar Slots (8-9)
    [8, 9].forEach(slotNum => {
        const abilityId = playerHotbar[`slot${slotNum}` as keyof typeof playerHotbar];
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

// --- ADDED: QUICK CHAT HOTBAR RENDERER ---
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

        const isCurrentlyViewedSkillLocked = committedAbilityId !== null && committedAbilityId !== newActiveSkillId;
        const isUtilityPathwayLockedOut = currentTreeMode === "utility" && committedUtilityPathway !== null && committedUtilityPathway !== currentUtilityPathway;
        const isFamiliarPathwayLockedOut = currentTreeMode === "familiar" && committedFamiliarPathway !== null && committedFamiliarPathway !== currentFamiliarPathway;
        const isSystemPathwayLockedOut = isUtilityPathwayLockedOut || isFamiliarPathwayLockedOut;

        const tabColor = currentTreeMode === "familiar" ? "#d946ef" : (currentTreeMode === "utility" ? "#38bdf8" : "#22c55e");

        // --- 1. Top Tabs ---
        let tabsHtml = `<div style="display:flex; margin-bottom: 0;">`;
        Object.keys(activeMap).forEach(category => {
            const isTabActive = category === activeCategoryTab;
            const displayName = `${activeMap[category].name} (Slot ${activeMap[category].slot})`;
            tabsHtml += `<div id="tab-${category}" class="st-tab ${isTabActive ? 'active' : ''}" style="color: ${isTabActive ? tabColor : '#94a3b8'}; border-color: ${isTabActive ? tabColor : '#475569'};">${displayName}</div>`;
        });
        tabsHtml += `</div>`;

        // --- Secondary System Selector ---
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

        // --- 2. Left Pane: Ability Selection (Now Horizontal Chunky Row) ---
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

        // --- 3. Right Pane: Ability Details & Upgrade ---
        let rightPaneHtml = "";

        if (activeSkillData) {
            const isEquipped = playerHotbar[`slot${targetSlot}` as keyof typeof playerHotbar] === newActiveSkillId;
            
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
                            btn.innerHTML = 'AWAKENING...';
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