import { ITEM_DB } from "../ItemDatabase";
import { distance } from "../game/CollisionSystem";
import { CRAFTING_RECIPES, STORE_RECIPES } from "../RecipeDatabase";
import { setAbilityUIRoom } from "./AbilityUI";

// --- EXPORTED UI STATE ---
export let isQuestUIOpen = false;
export let isTeleportUIOpen = false;
export let isInventoryUIOpen = false;
export let isChestUIOpen = false;
export let isShopUIOpen = false;
export let isCasinoUIOpen = false;
export let isEventInviteOpen = false;
export let activeChestId: string | null = null;
export let activeStallType: string | null = null;

// --- EXPORTED HUD STATE ---
export let isWorldMapOpen = false;
export let myMapMarker: { x: number, z: number } | null = null;
export let isRoutingToMarker = false;
export let activeAttackIndicators: { x: number, z: number, timer: number }[] = [];
export let mazeTimerInterval: number | null = null;
export let dungeonTimerInterval: number | null = null; 

// --- GLOBAL EVENT STATE ---
export let nextEventName = "";
export let nextEventTargetTime = 0;

export function setGlobalEvent(name: string, targetTime: number) {
    nextEventName = name;
    nextEventTargetTime = targetTime;
}

export function setIsWorldMapOpen(val: boolean) { isWorldMapOpen = val; }
export function setIsRoutingToMarker(val: boolean) { isRoutingToMarker = val; }

export function setMyMapMarker(marker: { x: number, z: number } | null) {
    myMapMarker = marker;
}

// --- ZONE POPUP STATE ---
let currentBiomeName = "";
let zonePopupExpiresAt = 0;

// --- GLOBAL CHUNKY STYLES INJECTION ---
export function injectGlobalChunkyStyles() {
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
            
            /* FIXED: Layering and Animation physics updated */
            .fill-stamina { background: #eab308; border-right: 2px solid #b45309; z-index: 0;}
            .fill-hunger-cap { 
                position: absolute; 
                right: 0; top: 0; height: 100%; 
                background: repeating-linear-gradient(45deg, #7f1d1d, #7f1d1d 10px, #991b1b 10px, #991b1b 20px); 
                z-index: 1;
                transition: width 0.2s ease-out;
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
        // FIXED: Display Stamina / Max Stamina instead of Hunger!
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

export function openCasinoUI(activeRoom: any, keys: any, gameType: string) {
    if (isCasinoUIOpen || !activeRoom) return;
    isCasinoUIOpen = true;
    
    // Assumes injectGlobalChunkyStyles() is called elsewhere or here
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

// --- GAME EVENT LOG (Minecraft Style) ---
export function addGameEvent(htmlContent: string, typeClass: string = "event-info") {
    const logContainer = document.getElementById("event-log-container");
    if (!logContainer) return;

    const messageEl = document.createElement("div");
    messageEl.className = `event-message ${typeClass}`;
    messageEl.innerHTML = htmlContent;

    logContainer.appendChild(messageEl);

    const MAX_MESSAGES = 8;
    if (logContainer.children.length > MAX_MESSAGES) {
        logContainer.removeChild(logContainer.firstChild!);
    }

    // Remove from DOM after CSS animation finishes (6s)
    setTimeout(() => {
        if (logContainer.contains(messageEl)) {
            logContainer.removeChild(messageEl);
        }
    }, 6000);
}

// --- MAZE UI FUNCTIONS ---
export function mountMazeUI(durationSeconds: number) {
    let ui = document.getElementById("maze-doom-ui");
    if (!ui) {
        ui = document.createElement("div");
        ui.id = "maze-doom-ui";
        ui.className = "hud-absolute-center";
        ui.style.top = "50px";
        ui.innerHTML = `
            <div class="hud-header" style="color: #ef4444; font-size: 24px; letter-spacing: 4px; text-shadow: 0 4px 0 #b91c1c; font-weight: 900;">THE LABYRINTH COLLAPSES IN</div>
            <div id="maze-countdown" class="hud-header" style="font-size: 64px; font-weight: 900; color: white; text-shadow: 0 6px 0 #b91c1c;">10:00</div>
        `;
        document.body.appendChild(ui);
    }
    
    let timeLeft = durationSeconds;
    const timerText = document.getElementById("maze-countdown")!;
    
    if (mazeTimerInterval) clearInterval(mazeTimerInterval);
    
    mazeTimerInterval = window.setInterval(() => {
        timeLeft--;
        const m = Math.floor(timeLeft / 60).toString().padStart(2, "0");
        const s = (timeLeft % 60).toString().padStart(2, "0");
        timerText.innerText = `${m}:${s}`;
        
        if (timeLeft <= 60) {
            timerText.style.color = "#fca5a5";
            timerText.style.animation = "hudPulse 1s infinite";
        }
        
        if (timeLeft <= 0) {
            clearInterval(mazeTimerInterval!);
            unmountMazeUI();
        }
    }, 1000);
}

export function unmountMazeUI() {
    if (mazeTimerInterval) clearInterval(mazeTimerInterval);
    const ui = document.getElementById("maze-doom-ui");
    if (ui) ui.remove();
}

// --- DUNGEON UI FUNCTIONS ---
export function mountDungeonUI(wave: number, maxWaves: number, enemiesLeft: number, timeLeftSeconds: number) {
    let ui = document.getElementById("dungeon-ui");
    if (!ui) {
        ui = document.createElement("div");
        ui.id = "dungeon-ui";
        ui.className = "hud-absolute-center";
        ui.style.top = "50px";
        document.body.appendChild(ui);
    }

    const m = Math.floor(timeLeftSeconds / 60).toString().padStart(2, "0");
    const s = (timeLeftSeconds % 60).toString().padStart(2, "0");
    const timeColor = timeLeftSeconds <= 60 ? "#ef4444" : "#ffffff";
    const timeShadow = timeLeftSeconds <= 60 ? "#b91c1c" : "#94a3b8";

    ui.innerHTML = `
        <div class="hud-header" style="color: #f59e0b; font-size: 24px; letter-spacing: 2px; text-shadow: 0 4px 0 #b45309; font-weight: 900;">WAVE ${wave} / ${maxWaves}</div>
        <div class="hud-header" style="color: ${timeColor}; font-size: 48px; font-weight: 900; text-shadow: 0 6px 0 ${timeShadow};">${m}:${s}</div>
        <div style="color: #ef4444; font-family: 'Nunito', sans-serif; font-size: 18px; font-weight: 900; background: #1e293b; padding: 5px 15px; border-radius: 12px; border: 3px solid #b91c1c; display: inline-block; margin-top: 10px;"><i class="fa-solid fa-skull"></i> Enemies Remaining: ${enemiesLeft}</div>
    `;
}

export function unmountDungeonUI() {
    const ui = document.getElementById("dungeon-ui");
    if (ui) ui.remove();
}

const FAMILIAR_ICONS: Record<string, string> = {
    "apocalyptic_swarm": "🦇",
    "orbital_arbiter": "👁️",
    "void_servant": "🥷",
    "shadow_monarch": "👑",
    "dragon_hoarder": "🐉",
    "symbiotic_spirit": "🧚",
    "astral_reflection": "🪞",
    "primal_beast": "🐺",
    "radiant_seraph": "⚔️"
};

// --- 1. OVERLAY CREATION ---
export function ensureOverlay(getActiveRoom: () => any, getActionContext: () => any): HTMLDivElement {
    
    if (!document.getElementById("hud-external-assets")) {
        const assetsContainer = document.createElement("div");
        assetsContainer.id = "hud-external-assets";
        assetsContainer.innerHTML = `
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@700;900&display=swap" rel="stylesheet">
            <style>
                :root {
                    --bg-panel: #1e293b;
                    --border-color: #38bdf8;
                    --font-header: 'Nunito', 'Segoe UI Rounded', sans-serif;
                    --font-body: 'Nunito', 'Segoe UI Rounded', sans-serif;
                }
                
                .hud-panel {
                    background: var(--bg-panel);
                    border: 4px solid var(--border-color);
                    border-radius: 16px;
                    color: white;
                    font-family: var(--font-body);
                    padding: 15px;
                    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
                    pointer-events: auto;
                }
                .hud-header { font-family: var(--font-header); text-transform: uppercase; font-weight: 900; }
                .hud-absolute-center { position: fixed; left: 50%; transform: translateX(-50%); text-align: center; pointer-events: none; z-index: 2000; }
                
                @keyframes hudPulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.05); } 100% { opacity: 1; transform: scale(1); } }
                .animate-pulse { animation: hudPulse 1.5s infinite; }

                .text-cyan { color: #22d3ee; }
                .text-blue { color: #38bdf8; }
                .text-green { color: #22c55e; }
                .text-amber { color: #f59e0b; }
                .text-red { color: #ef4444; }
                .text-magenta { color: #d946ef; }
                .text-muted { color: #94a3b8; }
                .text-sm { font-size: 14px; font-weight: 700; }
                .text-md { font-size: 16px; font-weight: 900; }
                .text-lg { font-size: 18px; font-weight: 900; }
                .text-xl { font-size: 22px; font-weight: 900; }

                .hud-input {
                    background: #f8fafc; border: 3px solid #94a3b8; color: #0f172a;
                    padding: 10px; border-radius: 12px; font-family: var(--font-header); font-weight: bold;
                    width: 80px; outline: none; transition: border-color 0.2s;
                }
                .hud-input:focus { border-color: #3b82f6; }

                .roster-hp-bg { width: 100%; height: 10px; background: #0f172a; border: 2px solid #334155; border-radius: 5px; overflow: hidden; margin-top: 4px; }
                .roster-hp-fill { height: 100%; transition: width 0.2s; }

                .hud-key {
                    background: #f8fafc;
                    border: 2px solid #cbd5e1;
                    border-bottom: 4px solid #94a3b8;
                    border-radius: 8px;
                    padding: 4px 10px;
                    font-family: var(--font-header);
                    font-size: 12px;
                    font-weight: 900;
                    color: #0f172a;
                    display: inline-block;
                    margin: 0 4px;
                }
                .controls-group { display: flex; flex-direction: column; gap: 10px; align-items: flex-end; }
                .controls-row { display: flex; align-items: center; gap: 8px; }

                .zone-popup {
                    position: fixed; top: 35%; left: 50%; transform: translate(-50%, -50%);
                    text-align: center; z-index: 2000; pointer-events: none;
                    opacity: 0; transition: opacity 0.5s ease-in-out, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                    background: rgba(15, 23, 42, 0.8);
                    border: 4px solid #334155;
                    padding: 30px 60px; border-radius: 30px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.5);
                }
                .zone-popup.active {
                    opacity: 1;
                    transform: translate(-50%, -45%);
                }

                #event-log-container {
                    position: fixed;
                    bottom: 20px;
                    left: 20px;
                    width: 350px;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    gap: 8px;
                    pointer-events: none;
                    z-index: 1000;
                }
                .event-message {
                    background: #1e293b;
                    color: white;
                    padding: 10px 15px;
                    border-radius: 12px;
                    font-family: var(--font-body);
                    font-size: 14px;
                    font-weight: 700;
                    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                    animation: fadeOutEvent 6s forwards;
                    border-left: 6px solid #94a3b8;
                }
                .event-join { border-left-color: #22d3ee; }
                .event-kill { border-left-color: #ef4444; }
                .event-win { border-left-color: #f59e0b; font-weight: 900; }
                .event-info { border-left-color: #22c55e; }

                @keyframes fadeOutEvent {
                    0%, 80% { opacity: 1; transform: translateX(0) scale(1); }
                    100% { opacity: 0; transform: translateX(-20px) scale(0.9); }
                }

                ::-webkit-scrollbar { width: 8px; height: 8px; }
                ::-webkit-scrollbar-track { background: #0f172a; border-radius: 4px; }
                ::-webkit-scrollbar-thumb { background: #475569; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #64748b; }
            </style>
        `;
        document.head.appendChild(assetsContainer);
    }

    let overlay = document.getElementById("overlay") as HTMLDivElement | null;
    if (!overlay) {
        overlay = document.createElement("div"); 
        overlay.id = "overlay";
        overlay.style.position = "fixed"; 
        overlay.style.top = "150px"; 
        overlay.style.left = "15px";
        overlay.style.display = "flex";
        overlay.style.flexDirection = "column";
        overlay.style.gap = "15px";
        overlay.style.zIndex = "20";
        overlay.style.pointerEvents = "none";

        const infoPanel = document.createElement("div");
        infoPanel.id = "hud-info-panel";
        infoPanel.className = "hud-panel";
        infoPanel.style.borderWidth = "3px";
        infoPanel.style.padding = "10px 15px";
        
        const textDiv = document.createElement("div");
        textDiv.id = "hud-text";
        infoPanel.appendChild(textDiv);
        overlay.appendChild(infoPanel);

        const rosterDiv = document.createElement("div");
        rosterDiv.id = "team-roster";
        rosterDiv.className = "hud-panel";
        rosterDiv.style.borderWidth = "3px";
        rosterDiv.style.display = "none"; 
        overlay.appendChild(rosterDiv);

        document.body.appendChild(overlay);

        let familiarFrame = document.getElementById("familiar-frame");
        if (!familiarFrame) {
            familiarFrame = document.createElement("div");
            familiarFrame.id = "familiar-frame";
            familiarFrame.className = "hud-panel";
            familiarFrame.style.position = "fixed";
            familiarFrame.style.top = "20px";
            familiarFrame.style.left = "290px";
            familiarFrame.style.display = "none";
            familiarFrame.style.flexDirection = "column";
            familiarFrame.style.gap = "8px";
            familiarFrame.style.padding = "10px 15px";
            familiarFrame.style.borderWidth = "3px";
            familiarFrame.style.borderColor = "#d946ef";
            familiarFrame.style.zIndex = "25";
            familiarFrame.innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div id="fam-icon" style="width: 36px; height: 36px; background: #0f172a; border: 2px solid #d946ef; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 20px;">🐉</div>
                    <div id="fam-name" style="color: #fdf4ff; font-family: 'Nunito', sans-serif; font-weight: 900; font-size: 16px; text-transform: capitalize;">Familiar</div>
                </div>
                <div style="width: 160px; background: #0f172a; border: 3px solid #334155; border-radius: 8px; padding: 2px; position: relative; height: 14px;">
                    <div id="fam-hp-bar" style="width: 100%; height: 100%; background: #d946ef; border-radius: 4px; transition: width 0.2s;"></div>
                    <div id="fam-status-text" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; text-align: center; color: white; font-size: 11px; font-weight: 900; line-height: 14px;"></div>
                </div>
            `;
            document.body.appendChild(familiarFrame);
        }

        let buffContainer = document.getElementById("buff-container");
        if (!buffContainer) {
            buffContainer = document.createElement("div");
            buffContainer.id = "buff-container";
            buffContainer.style.position = "fixed";
            buffContainer.style.top = "250px";
            buffContainer.style.left = "15px";
            buffContainer.style.display = "flex";
            buffContainer.style.flexWrap = "wrap";
            buffContainer.style.gap = "8px";
            buffContainer.style.maxWidth = "300px";
            buffContainer.style.zIndex = "25";
            document.body.appendChild(buffContainer);
        }

        let globalEventBanner = document.getElementById("global-event-banner");
        if (!globalEventBanner) {
            globalEventBanner = document.createElement("div");
            globalEventBanner.id = "global-event-banner";
            globalEventBanner.className = "hud-panel";
            globalEventBanner.style.position = "fixed";
            globalEventBanner.style.top = "20px";
            globalEventBanner.style.left = "50%";
            globalEventBanner.style.transform = "translateX(-50%)";
            globalEventBanner.style.display = "none";
            globalEventBanner.style.borderColor = "#ef4444";
            globalEventBanner.style.textAlign = "center";
            globalEventBanner.style.zIndex = "50";
            
            globalEventBanner.innerHTML = `
                <div style="font-size: 14px; font-weight: 900; letter-spacing: 2px; text-transform: uppercase; color: #fca5a5;">Next World Event</div>
                <div id="global-event-name" style="font-size: 22px; font-weight: 900; color: #ef4444; margin: 5px 0;">The Labyrinth</div>
                <div id="global-event-timer" style="font-size: 20px; font-weight: 900;">00:00</div>
            `;
            document.body.appendChild(globalEventBanner);
        }

        let interactionPrompt = document.getElementById("interaction-prompt");
        if (!interactionPrompt) {
            interactionPrompt = document.createElement("div");
            interactionPrompt.id = "interaction-prompt";
            interactionPrompt.style.position = "fixed";
            interactionPrompt.style.top = "60%";
            interactionPrompt.style.left = "50%";
            interactionPrompt.style.transform = "translate(-50%, -50%)";
            interactionPrompt.style.display = "none";
            interactionPrompt.style.background = "#1e293b";
            interactionPrompt.style.border = "4px solid #f8fafc";
            interactionPrompt.style.padding = "12px 24px";
            interactionPrompt.style.borderRadius = "16px";
            interactionPrompt.style.color = "white";
            interactionPrompt.style.fontFamily = "'Nunito', sans-serif";
            interactionPrompt.style.fontWeight = "900";
            interactionPrompt.style.fontSize = "20px";
            interactionPrompt.style.boxShadow = "0 10px 20px rgba(0,0,0,0.5)";
            interactionPrompt.style.zIndex = "50";
            interactionPrompt.innerHTML = "Press <span class='hud-key'>F</span> to Interact";
            document.body.appendChild(interactionPrompt);
        }

        let pointersContainer = document.getElementById("event-pointers-container");
        if (!pointersContainer) {
            pointersContainer = document.createElement("div");
            pointersContainer.id = "event-pointers-container";
            document.body.appendChild(pointersContainer);
        }

        let topRightDiv = document.createElement("div");
        topRightDiv.id = "hud-top-right";
        topRightDiv.style.position = "fixed";
        topRightDiv.style.top = "20px";
        topRightDiv.style.right = "20px";
        topRightDiv.style.zIndex = "20";
        topRightDiv.style.pointerEvents = "none";
        document.body.appendChild(topRightDiv);

        const minimapContainer = document.createElement("div");
        minimapContainer.id = "minimap-container";
        minimapContainer.style.position = "fixed";
        minimapContainer.style.top = "90px"; 
        minimapContainer.style.right = "20px";
        minimapContainer.style.width = "200px";
        minimapContainer.style.height = "200px";
        minimapContainer.style.borderRadius = "50%"; 
        minimapContainer.style.border = "6px solid #38bdf8";
        minimapContainer.style.overflow = "hidden";
        minimapContainer.style.boxShadow = "0 10px 25px rgba(0,0,0,0.6)";
        minimapContainer.style.backgroundColor = "#0f172a";
        minimapContainer.style.display = "none"; 
        minimapContainer.style.zIndex = "15";

        const minimapCanvas = document.createElement("canvas");
        minimapCanvas.id = "minimap-canvas";
        minimapCanvas.width = 200;
        minimapCanvas.height = 200;
        minimapContainer.appendChild(minimapCanvas);
        
        const compassN = document.createElement("div");
        compassN.className = "hud-header text-amber";
        compassN.innerText = "N";
        compassN.style.position = "absolute";
        compassN.style.top = "6px";
        compassN.style.left = "50%";
        compassN.style.transform = "translateX(-50%)";
        compassN.style.fontSize = "16px";
        compassN.style.fontWeight = "900";
        minimapContainer.appendChild(compassN);

        document.body.appendChild(minimapContainer);

        let coordDiv = document.getElementById("hud-coords");
        if (!coordDiv) {
            coordDiv = document.createElement("div");
            coordDiv.id = "hud-coords";
            coordDiv.className = "hud-header text-muted";
            coordDiv.style.position = "fixed";
            coordDiv.style.top = "300px"; 
            coordDiv.style.right = "20px";
            coordDiv.style.fontSize = "14px";
            coordDiv.style.fontWeight = "900";
            coordDiv.style.textAlign = "right";
            coordDiv.style.zIndex = "20";
            coordDiv.style.pointerEvents = "none";
            document.body.appendChild(coordDiv);
        }

        let zonePopup = document.createElement("div");
        zonePopup.id = "zone-popup";
        zonePopup.className = "zone-popup";
        document.body.appendChild(zonePopup);

        let eventLog = document.getElementById("event-log-container");
        if (!eventLog) {
            eventLog = document.createElement("div");
            eventLog.id = "event-log-container";
            document.body.appendChild(eventLog);
        }

        let teamModal = document.getElementById("team-manager-modal");
        if (!teamModal) {
            teamModal = document.createElement("div");
            teamModal.id = "team-manager-modal";
            teamModal.className = "modal-chunky";
            teamModal.style.position = "fixed";
            teamModal.style.top = "50%";
            teamModal.style.left = "50%";
            teamModal.style.transform = "translate(-50%, -50%)";
            teamModal.style.width = "450px";
            teamModal.style.padding = "30px";
            teamModal.style.display = "none";
            teamModal.style.zIndex = "3000";
            teamModal.style.pointerEvents = "auto";
            teamModal.innerHTML = `
                <div class="hud-header text-blue text-xl" style="margin-bottom: 20px; border-bottom: 4px solid #334155; padding-bottom: 15px;">
                    <i class="fa-solid fa-users"></i> Team Management
                </div>
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <button id="btn-modal-create-team" class="btn-chunky btn-blue" style="padding: 15px;">
                        <i class="fa-solid fa-plus"></i> Form New Team
                    </button>
                    <div style="display: flex; gap: 10px;">
                        <input type="number" id="modal-join-team-id" class="hud-input" placeholder="Team ID..." style="flex-grow: 1;">
                        <button id="btn-modal-join-team" class="btn-chunky btn-green" style="padding: 10px 20px;"><i class="fa-solid fa-right-to-bracket"></i> Join</button>
                    </div>
                    <button id="btn-modal-leave-team" class="btn-chunky btn-red" style="padding: 15px; margin-top: 10px;">
                        <i class="fa-solid fa-right-from-bracket"></i> Leave Current Team
                    </button>
                </div>
                <div class="text-muted text-sm" style="text-align: center; margin-top: 20px;">Press [ESC] to close</div>
            `;
            document.body.appendChild(teamModal);

            document.getElementById("btn-modal-create-team")!.onclick = () => getActiveRoom()?.send("createTeam");
            document.getElementById("btn-modal-leave-team")!.onclick = () => getActiveRoom()?.send("leaveTeam");
            document.getElementById("btn-modal-join-team")!.onclick = () => {
                const input = document.getElementById("modal-join-team-id") as HTMLInputElement;
                const id = parseInt(input.value);
                if (!isNaN(id)) getActiveRoom()?.send("joinTeam", { teamId: id });
            };

            window.addEventListener("keydown", (e) => {
                if (e.key === "Escape") {
                    const currentDisplay = teamModal!.style.display;
                    teamModal!.style.display = currentDisplay === "none" ? "block" : "none";
                }
            });
        }

        let craftModal = document.getElementById("crafting-modal");
        if (!craftModal) {
            craftModal = document.createElement("div");
            craftModal.id = "crafting-modal";
            craftModal.className = "modal-chunky";
            craftModal.style.position = "fixed";
            craftModal.style.top = "50%";
            craftModal.style.left = "50%";
            craftModal.style.transform = "translate(-50%, -50%)";
            craftModal.style.width = "500px";
            craftModal.style.maxHeight = "80vh";
            craftModal.style.overflowY = "auto";
            craftModal.style.padding = "30px";
            craftModal.style.display = "none";
            craftModal.style.zIndex = "3000";
            craftModal.style.pointerEvents = "auto";

            craftModal.innerHTML = `
                <div style="padding-bottom: 15px; border-bottom: 4px solid #334155; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: #1e293b; z-index: 10; margin-bottom: 20px;">
                    <h2 class="hud-header text-amber" style="margin: 0; letter-spacing: 2px;"><i class="fa-solid fa-hammer"></i> The Anvil & Forge</h2>
                    <button id="close-craft-modal" class="btn-close-chunky">&times;</button>
                </div>
                <div id="crafting-recipe-list" style="display: flex; flex-direction: column; gap: 15px;">
                </div>
            `;
            document.body.appendChild(craftModal);

            document.getElementById("close-craft-modal")!.onclick = () => {
                craftModal!.style.display = "none";
            };

            window.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && craftModal!.style.display === "block") {
                    craftModal!.style.display = "none";
                }
            });
        }

        const worldMapContainer = document.createElement("div");
        worldMapContainer.id = "world-map-modal";
        worldMapContainer.className = "modal-chunky";
        worldMapContainer.style.position = "fixed";
        worldMapContainer.style.top = "50%";
        worldMapContainer.style.left = "50%";
        worldMapContainer.style.transform = "translate(-50%, -50%)";
        worldMapContainer.style.width = "800px";
        worldMapContainer.style.height = "800px";
        worldMapContainer.style.padding = "20px";
        worldMapContainer.style.zIndex = "1000";
        worldMapContainer.style.display = "none";

        worldMapContainer.innerHTML = `
            <div style="padding-bottom: 15px; border-bottom: 4px solid #334155; display: flex; justify-content: space-between; align-items: center;">
                <h2 class="hud-header text-blue" style="margin: 0; letter-spacing: 2px;"><i class="fa-solid fa-globe"></i> WORLD MAP</h2>
                <div class="text-muted text-sm">
                    <i class="fa-solid fa-mouse-pointer"></i> Left Click: Teleport | <i class="fa-solid fa-location-crosshairs"></i> Right Click: Set Route
                </div>
                <button id="close-world-map" class="btn-close-chunky">&times;</button>
            </div>
        `;

        const worldCanvas = document.createElement("canvas");
        worldCanvas.id = "world-map-canvas";
        worldCanvas.width = 760;
        worldCanvas.height = 700;
        worldCanvas.style.marginTop = "15px";
        worldCanvas.style.border = "4px solid #475569";
        worldCanvas.style.cursor = "crosshair";
        worldCanvas.style.background = "#0f172a";
        worldCanvas.style.borderRadius = "12px";
        
        worldCanvas.addEventListener("mousedown", (e) => {
            const activeRoom = getActiveRoom();
            if (!activeRoom) return;
            
            const rect = worldCanvas.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;

            const scale = 760 / 5000;
            const worldClickX = (clickX / scale) - 2500;
            const worldClickZ = (clickY / scale) - 2500;

            const state = activeRoom.state as any;
            const me = state.players.get(activeRoom.sessionId);
            
            if (me && me.skillTree && me.skillTree.activeAbilities) {
                const wayNode = me.skillTree.activeAbilities.get("wayfinder_base");
                const coreRank = wayNode?.upgrades.get("core_progression")?.currentRank || 0;
                
                const travNode = me.skillTree.activeAbilities.get("traveler_branch");
                const travRank = travNode?.upgrades.get("branch_progression")?.currentRank || 0;

                if (myMapMarker && distance(worldClickX, worldClickZ, myMapMarker.x, myMapMarker.z) < 200) {
                    if (e.button === 0) { 
                        if (travRank >= 3) {
                            activeRoom.send("teleportToMarker");
                            isWorldMapOpen = false;
                            worldMapContainer.style.display = "none";
                        }
                    } else if (e.button === 2) { 
                        if (coreRank >= 5) {
                            isRoutingToMarker = !isRoutingToMarker; 
                        }
                    }
                }
            }
        });

        worldCanvas.addEventListener("contextmenu", e => e.preventDefault());

        worldMapContainer.appendChild(worldCanvas);
        document.body.appendChild(worldMapContainer);

        document.getElementById("close-world-map")!.onclick = () => {
            isWorldMapOpen = false;
            worldMapContainer.style.display = "none";
        };

        let storePopup = document.getElementById("store-popup");
        if (!storePopup) {
            storePopup = document.createElement("div");
            storePopup.id = "store-popup";
            storePopup.className = "hud-panel hud-absolute-center";
            storePopup.style.bottom = "25%";
            storePopup.style.border = "4px solid var(--neon-amber)";
            storePopup.style.padding = "20px 40px";
            storePopup.style.display = "none";
            document.body.appendChild(storePopup);
        }

        const bottomCenterContainer = document.createElement("div");
        bottomCenterContainer.id = "hud-bottom-center";
        bottomCenterContainer.style.position = "fixed";
        bottomCenterContainer.style.bottom = "110px"; 
        bottomCenterContainer.style.left = "50%";
        bottomCenterContainer.style.transform = "translateX(-50%)";
        bottomCenterContainer.style.display = "flex";
        bottomCenterContainer.style.flexDirection = "column";
        bottomCenterContainer.style.alignItems = "center";
        bottomCenterContainer.style.gap = "15px";
        bottomCenterContainer.style.zIndex = "20";
        bottomCenterContainer.style.pointerEvents = "none";
        bottomCenterContainer.style.width = "400px";

        const auraDiv = document.createElement("div");
        auraDiv.id = "hud-aura";
        auraDiv.className = "hud-panel";
        auraDiv.style.display = "flex";
        auraDiv.style.gap = "30px";
        auraDiv.style.padding = "10px 25px";
        auraDiv.style.borderRadius = "24px";
        auraDiv.style.borderWidth = "4px";
        auraDiv.style.borderColor = "#38bdf8";
        bottomCenterContainer.appendChild(auraDiv);

        document.body.appendChild(bottomCenterContainer);

        let tacOverlay = document.getElementById("tac-alert");
        if (!tacOverlay) {
            tacOverlay = document.createElement("div");
            tacOverlay.id = "tac-alert";
            tacOverlay.style.position = "fixed";
            tacOverlay.style.top = "0"; tacOverlay.style.left = "0";
            tacOverlay.style.width = "100vw"; tacOverlay.style.height = "100vh";
            tacOverlay.style.boxShadow = "inset 0 0 100px rgba(255, 0, 0, 0)";
            tacOverlay.style.pointerEvents = "none";
            tacOverlay.style.zIndex = "5";
            tacOverlay.style.transition = "box-shadow 0.2s";
            document.body.appendChild(tacOverlay);
        }

        let medUI = document.getElementById("meditation-ui");
        if (!medUI) {
            medUI = document.createElement("div");
            medUI.id = "meditation-ui";
            medUI.className = "modal-chunky";
            medUI.style.position = "fixed";
            medUI.style.top = "20%";
            medUI.style.left = "50%";
            medUI.style.transform = "translateX(-50%)";
            medUI.style.width = "600px";
            medUI.style.padding = "40px";
            medUI.style.display = "none"; 
            medUI.style.zIndex = "3000";
            
            medUI.innerHTML = `
                <h2 class="hud-header text-blue text-xl" style="margin-top: 0; letter-spacing: 2px; text-align: center;"><i class="fa-solid fa-om"></i> MENTAL FOCUS</h2>
                <p id="med-status" class="text-muted text-sm" style="margin-bottom: 30px; text-align: center;">Clear your mind and fill in the missing data. Press [ESC] to stop.</p>
                <div id="med-question-container" style="font-size: 24px; font-weight: 900; color: #ffffff; line-height: 1.8; text-align: center;"></div>
            `;
            document.body.appendChild(medUI);
        }
        
        let bottomRightContainer = document.getElementById("hud-bottom-right");
        if(!bottomRightContainer) {
            bottomRightContainer = document.createElement("div");
            bottomRightContainer.id = "hud-bottom-right";
            bottomRightContainer.style.position = "fixed";
            bottomRightContainer.style.bottom = "20px";
            bottomRightContainer.style.right = "20px";
            bottomRightContainer.style.display = "flex";
            bottomRightContainer.style.flexDirection = "column";
            bottomRightContainer.style.alignItems = "flex-end";
            bottomRightContainer.style.gap = "10px";
            bottomRightContainer.style.zIndex = "10";
            bottomRightContainer.style.pointerEvents = "auto"; 
            
            bottomRightContainer.innerHTML = `
                <button id="btn-harness-mana" class="btn-chunky btn-blue" style="display: none; padding: 12px 24px;">
                    <i class="fa-solid fa-om"></i> Harness Mana <span class="hud-key">H</span>
                </button>
                <div id="controls-combat" class="controls-group" style="text-align: right;">
                    <div class="controls-row"><span class="text-muted text-sm">Attack / Mine</span> <span class="hud-key">1</span></div>
                    <div class="controls-row"><span class="text-muted text-sm">Combat Skills</span> <span class="hud-key">2-5</span></div>
                    <div class="controls-row"><span class="text-muted text-sm">Utility Skills</span> <span class="hud-key">6-7</span></div>
                    <div class="controls-row" id="ctrl-familiar" style="display: none;"><span class="text-muted text-sm">Familiar Spells</span> <span class="hud-key">9</span></div>
                    <div class="controls-row"><span class="text-muted text-sm">Dodge</span> <span class="hud-key">SPACE</span></div>
                    <div class="controls-row"><span class="text-muted text-sm">Class Menu</span> <span class="hud-key">P</span></div>
                    <div class="controls-row" id="ctrl-skilltree" style="display: none;"><span class="text-muted text-sm">Skill Tree</span> <span class="hud-key">K</span></div>
                </div>
                <div id="controls-other" class="controls-group" style="display: none; text-align: right;">
                    <div class="controls-row"><span class="text-muted text-sm">Interact</span> <span class="hud-key">F</span></div>
                    <div class="controls-row" id="ctrl-buy-land" style="display: none;"><span class="text-green text-sm">Buy Land</span> <span class="hud-key">B</span></div>
                    <div class="controls-row" id="ctrl-build-mode" style="display: none;"><span class="text-green text-sm">Build / Deco Mode</span> <span class="hud-key">V</span></div>
                    <div class="controls-row"><span class="text-muted text-sm">Inventory</span> <span class="hud-key">I</span></div>
                    <div class="controls-row"><span class="text-muted text-sm">Map</span> <span class="hud-key">M</span></div>
                    <div class="controls-row"><span class="text-muted text-sm">Fast Travel</span> <span class="hud-key">T</span></div>
                    <div class="controls-row" id="ctrl-meditate" style="display: none;"><span class="text-muted text-sm">Meditate</span> <span class="hud-key">Z</span></div>
                    <div class="controls-row"><span class="text-muted text-sm">Team Manager</span> <span class="hud-key">ESC</span></div>
                </div>
                <button id="btn-toggle-controls" class="btn-chunky btn-slate" style="margin-top: 10px; font-size: 12px; padding: 10px 16px;">
                    <i class="fa-solid fa-gears"></i> Show Utility Keys
                </button>
            `;
            document.body.appendChild(bottomRightContainer);

            document.getElementById("btn-harness-mana")!.onclick = () => {
                const ctx = getActionContext();
                const activeRoom = getActiveRoom();
                if (activeRoom && !ctx.isUIOpen) {
                    const state = activeRoom.state as any;
                    const me = state.players.get(activeRoom.sessionId);
                    if (me && !me.isSleeping && !me.isMeditating) {
                        activeRoom.send("requestCommunion");
                    }
                }
            };

            document.getElementById("btn-toggle-controls")!.onclick = () => {
                const combat = document.getElementById("controls-combat")!;
                const other = document.getElementById("controls-other")!;
                const btn = document.getElementById("btn-toggle-controls")!;
                
                if (combat.style.display !== "none") {
                    combat.style.display = "none";
                    other.style.display = "flex";
                    btn.innerHTML = '<i class="fa-solid fa-khanda"></i> Show Combat Keys';
                } else {
                    combat.style.display = "flex";
                    other.style.display = "none";
                    btn.innerHTML = '<i class="fa-solid fa-gears"></i> Show Utility Keys';
                }
            };
        }
    }
    return overlay;
}

// --- 2. PER-FRAME HUD UPDATE LOGIC ---
export function updateHUD(
    dt: number,
    activeRoom: any,
    activeScene: any,
    me: any,
    localPlayerPos: { x: number, y: number },
    lastFacingDx: number,
    lastFacingDy: number,
    clientSceneryGrid: any,
    ctx: any,
    TOWN_COLLIDERS: any[],
    MARKET_STALLS: any[],
    CASINO_TABLES: any[],
    isLocallyWolf: boolean 
) {
    if (!me || !activeRoom) return;
    setAbilityUIRoom(activeRoom);
    const state = activeRoom.state;
    const roomName = activeRoom.name || "";

   const eventDiv = document.getElementById("global-event-banner");
    if (eventDiv && nextEventTargetTime > 0) {
        const timeLeftSeconds = Math.max(0, Math.floor((nextEventTargetTime - Date.now()) / 1000));
        const m = Math.floor(timeLeftSeconds / 60).toString().padStart(2, "0");
        const s = (timeLeftSeconds % 60).toString().padStart(2, "0");
        
        if (roomName === "maze" || roomName === "dungeon" || roomName === "underworld") {
            eventDiv.style.display = "none";
        } else {
            eventDiv.style.display = "block";
            const timeClass = timeLeftSeconds <= 60 ? 'text-red animate-pulse' : 'text-green';
            eventDiv.innerHTML = `<span class="hud-header text-amber"><i class="fa-solid fa-star"></i> Next Event:</span> <b style="font-size: 20px;">${nextEventName}</b> <span style="margin: 0 10px; color: #475569;">|</span> <span class="hud-header ${timeClass}" style="font-size: 24px;">${m}:${s}</span>`;
        }
    } else if (eventDiv) {
        eventDiv.style.display = "none";
    }

    const rosterDiv = document.getElementById("team-roster");
    if (rosterDiv) {
        if (me.teamId && me.teamId > 0) {
            rosterDiv.style.display = "block";
            let rosterHTML = `<div class="hud-header text-blue text-md" style="margin-bottom: 12px; border-bottom: 3px solid #334155; padding-bottom: 8px;"><i class="fa-solid fa-shield-halved"></i> Team ${me.teamId} Roster</div>`;
            
            const teamMembers: any[] = [];
            state.players.forEach((p: any) => {
                if (p.teamId === me.teamId) {
                    teamMembers.push(p);
                }
            });

            teamMembers.sort((a, b) => (b.isTeamLeader ? 1 : 0) - (a.isTeamLeader ? 1 : 0));

            teamMembers.forEach(member => {
                const hpPercent = Math.max(0, Math.min(100, (member.hp / member.maxHp) * 100));
                const hpColor = hpPercent > 50 ? "#22c55e" : (hpPercent > 20 ? "#f59e0b" : "#ef4444");
                const leaderIcon = member.isTeamLeader ? `<i class="fa-solid fa-crown text-amber"></i> ` : "";
                const isMe = member.sessionId === me.sessionId;
                
                rosterHTML += `
                    <div style="margin-bottom: 12px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <span style="font-weight: 900; font-size: 14px; color: ${isMe ? '#f59e0b' : 'white'};">${leaderIcon}${member.name}</span>
                            <span class="text-muted text-sm hud-header">Lv.${member.level}</span>
                        </div>
                        <div class="roster-hp-bg">
                            <div class="roster-hp-fill" style="width: ${hpPercent}%; background: ${hpColor};"></div>
                        </div>
                    </div>
                `;
            });

            rosterDiv.innerHTML = rosterHTML;
        } else {
            rosterDiv.style.display = "none";
        }
    }

    if (me.skillTree && me.skillTree.activeAbilities) {
        const wayNode = me.skillTree.activeAbilities.get("wayfinder_base");
        const wayRank = wayNode?.upgrades.get("core_progression")?.currentRank || 0;
        
        const tacNode = me.skillTree.activeAbilities.get("tactical_branch");
        const tacRank = tacNode?.upgrades.get("branch_progression")?.currentRank || 0;

        const expNode = me.skillTree.activeAbilities.get("explorer_branch");
        const expRank = expNode?.upgrades.get("branch_progression")?.currentRank || 0;

        const mapContainer = document.getElementById("minimap-container");
        const mapCanvas = document.getElementById("minimap-canvas") as HTMLCanvasElement;
        
        const wMapContainer = document.getElementById("world-map-modal");
        const wMapCanvas = document.getElementById("world-map-canvas") as HTMLCanvasElement;

        if (tacRank >= 4) {
            let isAmbushed = false;
            
            for (let i = activeAttackIndicators.length - 1; i >= 0; i--) {
                activeAttackIndicators[i].timer -= dt;
                if (activeAttackIndicators[i].timer > 0) {
                    const dist = distance(localPlayerPos.x, localPlayerPos.y, activeAttackIndicators[i].x, activeAttackIndicators[i].z);
                    if (dist > 15.0) isAmbushed = true; 
                } else {
                    activeAttackIndicators.splice(i, 1);
                }
            }

            const tacAlert = document.getElementById("tac-alert");
            if (tacAlert) {
                tacAlert.style.boxShadow = isAmbushed ? "inset 0 0 100px rgba(239, 68, 68, 0.4)" : "inset 0 0 100px rgba(255, 0, 0, 0)";
            }
        } else {
            activeAttackIndicators.length = 0; 
        }

        const renderMap = (canvas: HTMLCanvasElement, radius: number, isWorld: boolean) => {
            const context = canvas.getContext("2d");
            if (!context) return;

            const cw = canvas.width;
            const ch = canvas.height;
            context.clearRect(0, 0, cw, ch);
            
            const scale = (cw / 2) / radius; 
            const cx = cw / 2; const cy = ch / 2;

            const camX = isWorld ? 0 : localPlayerPos.x;
            const camY = isWorld ? 0 : localPlayerPos.y;

            context.fillStyle = "rgba(71, 85, 105, 0.4)";
            for (const box of TOWN_COLLIDERS) {
                const relX = box.minX - camX;
                const relY = box.minY - camY;
                const w = box.maxX - box.minX;
                const h = box.maxY - box.minY;
                
                if (isWorld || (Math.abs(relX) < radius + 20 && Math.abs(relY) < radius + 20)) {
                    context.fillRect(cx + (relX * scale), cy + (relY * scale), w * scale, h * scale);
                }
            }

            if (expRank >= 3 && state.lootItems) {
                context.fillStyle = "#22c55e";
                state.lootItems.forEach((loot: any) => {
                    const dx = loot.x - camX;
                    const dy = loot.y - camY;
                    if (isWorld || Math.sqrt(dx*dx + dy*dy) <= radius) {
                        context.beginPath();
                        context.arc(cx + (dx * scale), cy + (dy * scale), isWorld ? 4 : 3, 0, Math.PI * 2);
                        context.fill();
                    }
                });
            }

            if (tacRank >= 1 && state.enemies) {
                state.enemies.forEach((enemy: any) => {
                    const dx = enemy.x - camX;
                    const dy = enemy.y - camY;
                    
                    if (isWorld || Math.sqrt(dx*dx + dy*dy) <= radius) {
                        const dotSize = (tacRank >= 2 && enemy.maxHp > 150) ? (isWorld ? 8 : 4) : (isWorld ? 4 : 2);
                        context.fillStyle = (tacRank >= 2 && enemy.maxHp > 150) ? "#f59e0b" : "#ef4444";
                        
                        context.beginPath();
                        context.arc(cx + (dx * scale), cy + (dy * scale), dotSize, 0, Math.PI * 2);
                        context.fill();
                    }
                });
            }

            if (myMapMarker) {
                const mdx = myMapMarker.x - camX;
                const mdy = myMapMarker.z - camY;
                
                if (isRoutingToMarker && wayRank >= 5) {
                    const pdx = localPlayerPos.x - camX;
                    const pdy = localPlayerPos.y - camY;
                    
                    context.strokeStyle = "rgba(56, 189, 248, 0.6)";
                    context.lineWidth = isWorld ? 4 : 3;
                    context.setLineDash([8, 8]);
                    context.beginPath();
                    context.moveTo(cx + (pdx * scale), cy + (pdy * scale));
                    context.lineTo(cx + (mdx * scale), cy + (mdy * scale));
                    context.stroke();
                    context.setLineDash([]);
                }

                if (isWorld || Math.sqrt(mdx*mdx + mdy*mdy) <= radius) {
                    context.fillStyle = "#38bdf8";
                    context.beginPath();
                    context.arc(cx + (mdx * scale), cy + (mdy * scale) - 5, isWorld ? 8 : 5, 0, Math.PI * 2);
                    context.fill();
                    context.beginPath();
                    context.moveTo(cx + (mdx * scale), cy + (mdy * scale));
                    context.lineTo(cx + (mdx * scale) - (isWorld ? 8 : 5), cy + (mdy * scale) - 6);
                    context.lineTo(cx + (mdx * scale) + (isWorld ? 8 : 5), cy + (mdy * scale) - 6);
                    context.fill();
                }
            }

            const pdx = localPlayerPos.x - camX;
            const pdy = localPlayerPos.y - camY;
            
            context.save();
            context.translate(cx + (pdx * scale), cy + (pdy * scale));
            const angle = Math.atan2(lastFacingDy, lastFacingDx);
            context.rotate(angle); 
            
            context.fillStyle = "#ffffff";
            const as = isWorld ? 2.5 : 1.5;
            context.beginPath();
            context.moveTo(6 * as, 0); 
            context.lineTo(-5 * as, 5 * as); 
            context.lineTo(-3 * as, 0); 
            context.lineTo(-5 * as, -5 * as); 
            context.closePath();
            context.fill();

            if (tacRank >= 5 && activeAttackIndicators.length > 0) {
                context.strokeStyle = "rgba(239, 68, 68, 0.8)";
                context.lineWidth = 3;
                activeAttackIndicators.forEach(ind => {
                    const targetAng = Math.atan2(ind.z - localPlayerPos.y, ind.x - localPlayerPos.x) - angle;
                    context.beginPath();
                    context.arc(0, 0, 18 * as, targetAng - 0.2, targetAng + 0.2);
                    context.stroke();
                });
            }
            context.restore();

            if (!isWorld) {
                const gradient = context.createRadialGradient(cx, cy, cw/3, cx, cy, cw/1.8);
                gradient.addColorStop(0, "rgba(0,0,0,0)");
                gradient.addColorStop(1, "rgba(15,23,42,0.95)");
                context.fillStyle = gradient;
                context.fillRect(0, 0, cw, ch);
            }
        };

        if (isWorldMapOpen && wMapCanvas && wMapContainer) {
            renderMap(wMapCanvas, 2500, true);
        } 
        else if (mapContainer && mapCanvas) {
            if (wayRank >= 1) {
                mapContainer.style.display = "block";
                mapContainer.style.borderColor = wayRank >= 3 ? "#38bdf8" : "#475569";
                const mapRadius = wayRank >= 2 ? 70.0 : 30.0; 
                renderMap(mapCanvas, mapRadius, false);
            } else {
                mapContainer.style.display = "none";
            }
        }
    }

    const textDiv = document.getElementById("hud-text");
    const storePopup = document.getElementById("store-popup");

    const coordDiv = document.getElementById("hud-coords");
    if (coordDiv) {
        coordDiv.innerHTML = `X: ${localPlayerPos.x.toFixed(1)}<br>Z: ${localPlayerPos.y.toFixed(1)}`;
    }

    const auraDiv = document.getElementById("hud-aura");
    if (auraDiv) {
        const str = me.auraStrength?.toFixed(2) || '1.00';
        const ctl = me.auraControl?.toFixed(2) || '1.00';
        auraDiv.innerHTML = `
            <span class="hud-header text-cyan"><i class="fa-solid fa-water"></i> Strength: ${str}</span>
            <span class="hud-header text-blue"><i class="fa-solid fa-hurricane"></i> Control: ${ctl}</span>
        `;
    }

    const topRightDiv = document.getElementById("hud-top-right");
    if (topRightDiv) {
        const rankColorMap: Record<string, string> = {
            "Iron": "#94a3b8", "Bronze": "#b45309", "Silver": "#cbd5e1", "Gold": "#f59e0b", "Diamond": "#38bdf8"
        };
        const rCol = rankColorMap[me.rank] || "#94a3b8";
        
        topRightDiv.innerHTML = `
            <div class="hud-panel" style="padding: 12px 20px; display: flex; gap: 20px; align-items: center; border-width: 4px; border-color: ${rCol};">
                <span class="hud-header" style="color: ${rCol}; font-size: 18px;"><i class="fa-solid fa-medal"></i> ${me.rank} <span style="color: white; font-size: 14px;">(Lv.${me.level})</span></span>
                <span class="hud-header text-amber" style="font-size: 18px;"><i class="fa-solid fa-coins"></i> ${me.coins}</span>
            </div>
        `;
    }

    const famFrame = document.getElementById("familiar-frame");
    const famHpBar = document.getElementById("fam-hp-bar");
    const famStatus = document.getElementById("fam-status-text");
    const famIcon = document.getElementById("fam-icon");
    const famName = document.getElementById("fam-name");

    const familiar = activeRoom.state.familiars?.get(`fam_${me.sessionId}`);
    
    if (famFrame && famHpBar && famStatus && famIcon && famName) {
        if (familiar) {
            famFrame.style.display = "flex";
            famIcon.innerText = FAMILIAR_ICONS[familiar.type] || "🔮";
            famName.innerText = familiar.name;

            if (familiar.hp > 0) {
                const hpPct = Math.max(0, Math.min(100, (familiar.hp / familiar.maxHp) * 100));
                famHpBar.style.width = `${hpPct}%`;
                famHpBar.style.background = "#d946ef";
                
                if (familiar.isDetached) {
                    famStatus.innerText = "Deployed";
                    famStatus.style.color = "#f59e0b";
                } else if (familiar.action === "attacking") {
                    famStatus.innerText = "Attacking";
                    famStatus.style.color = "#ef4444";
                } else {
                    famStatus.innerText = ""; 
                }
            } else {
                famHpBar.style.width = `100%`;
                famHpBar.style.background = "#334155"; 
                famStatus.style.color = "#ef4444";
                
                if (familiar.actionTimer > 0) {
                    famStatus.innerText = `Respawning: ${Math.ceil(familiar.actionTimer)}s`;
                } else {
                    famStatus.innerText = "Fallen";
                }
            }
        } else {
            famFrame.style.display = "none";
        }
    }

    const isTownScene = roomName === "town";
    const isOutsideTown = isTownScene && activeScene && typeof activeScene.isOutsideTown === "function" ? activeScene.isOutsideTown(localPlayerPos.x, localPlayerPos.y) : false;
    const isSafeZone = isTownScene && !isOutsideTown;
    
    let biomeName = "The Wilderness";
    let biomeIcon = "fa-tree";
    let biomeColor = "#22c55e";
    
    if (roomName === "maze") {
        biomeName = "The Labyrinth"; biomeIcon = "fa-dungeon"; biomeColor = "#d946ef";
    } else if (roomName === "dungeon") {
        biomeName = "The Goblin Cave"; biomeIcon = "fa-skull"; biomeColor = "#f59e0b";
    } else if (roomName === "underworld") {
        biomeName = "The Underworld (PvP Arena)"; biomeIcon = "fa-skull-crossbones"; biomeColor = "#ef4444";
    } else if (isSafeZone) {
        biomeName = "Town of Beginnings"; biomeIcon = "fa-chess-rook"; biomeColor = "#f59e0b";
    } else {
        if (localPlayerPos.y < -800) { biomeName = "The Frozen Wastes"; biomeIcon = "fa-snowflake"; biomeColor = "#22d3ee"; }
        else if (localPlayerPos.y > 800) { biomeName = "The Scorched Desert"; biomeIcon = "fa-sun"; biomeColor = "#f59e0b"; }
        else if (localPlayerPos.x < -800) { biomeName = "The Toxic Swamp"; biomeIcon = "fa-biohazard"; biomeColor = "#22c55e"; }
        else if (localPlayerPos.x > 800) { biomeName = "The Elven Kingdom"; biomeIcon = "fa-leaf"; biomeColor = "#22c55e"; }
    }

    if (biomeName !== currentBiomeName) {
        currentBiomeName = biomeName;
        zonePopupExpiresAt = Date.now() + 4000; 
        
        const pvpText = isSafeZone ? "SAFE ZONE (PvP/PvE Disabled)" : "PvP & PvE ENABLED";
        const pvpColor = isSafeZone ? "#22c55e" : "#f59e0b";
        const pvpIcon = isSafeZone ? "fa-shield-halved" : "fa-khanda";

        const zp = document.getElementById("zone-popup");
        if (zp) {
            zp.innerHTML = `
                <div class="hud-header" style="color: ${biomeColor}; font-size: 52px; font-weight: 900; text-shadow: 0 6px 0 rgba(0,0,0,0.5); letter-spacing: 2px;">
                    <i class="fa-solid ${biomeIcon}"></i> ${biomeName}
                </div>
                <div class="hud-header" style="color: ${pvpColor}; font-size: 20px; font-weight: 900; margin-top: 15px; letter-spacing: 2px;">
                    <i class="fa-solid ${pvpIcon}"></i> ${pvpText}
                </div>
            `;
        }
    }

    const zp = document.getElementById("zone-popup");
    if (zp) {
        if (Date.now() < zonePopupExpiresAt) {
            zp.classList.add("active");
        } else {
            zp.classList.remove("active");
        }
    }

    if (textDiv) {
        const isBuyMode = roomName === "town" && activeScene.isBuyMode;
        const isBuildMode = roomName === "town" && activeScene.isBuildMode;
        const isDecoModeActive = roomName === "town" && activeScene.isDecoMode;

        let nearestScenery: any = null;
        let nearestSceneryDist = 999;
        const nearbyInteractionScenery = clientSceneryGrid?.getNearby(localPlayerPos.x, localPlayerPos.y, 4.5) || [];
        for (const scenery of nearbyInteractionScenery) {
            const d = distance(localPlayerPos.x, localPlayerPos.y, scenery.x, scenery.y);
            if (d < 4.5 && d < nearestSceneryDist) {
                nearestScenery = scenery;
                nearestSceneryDist = d;
            }
        }

        if (storePopup) {
            let activeStall = null;
            let activeCasino = null;
            let isNearGiantGod = false;
            
            if (isSafeZone && !ctx.isUIOpen && !me.isSleeping && !me.isMeditating) {
                if (distance(localPlayerPos.x, localPlayerPos.y, 35, -35) < 18.0) {
                    isNearGiantGod = true;
                }

                if (!isNearGiantGod && MARKET_STALLS) {
                    for (const stall of MARKET_STALLS) {
                        if (distance(localPlayerPos.x, localPlayerPos.y, stall.x, stall.y) < 6.0) {
                            activeStall = stall;
                            break;
                        }
                    }

                    if (!activeStall && CASINO_TABLES) {
                        for (const table of CASINO_TABLES) {
                            if (distance(localPlayerPos.x, localPlayerPos.y, table.x, table.y) < 4.0) {
                                activeCasino = table;
                                break;
                            }
                        }
                    }
                }
            }

            if (isNearGiantGod) {
                storePopup.style.display = "block";
                storePopup.innerHTML = `<div class="hud-header text-green text-xl mb-1"><i class="fa-solid fa-monument"></i> Lord Protector</div><div class="text-muted text-sm"><span class="hud-key">F</span> Talk</div>`;
            } else if (activeStall) {
                storePopup.style.display = "block";
                storePopup.innerHTML = `<div class="hud-header text-amber text-xl mb-1"><i class="fa-solid fa-store"></i> ${activeStall.type}</div><div class="text-muted text-sm"><span class="hud-key">F</span> Shop</div>`;
            } else if (activeCasino) {
                storePopup.style.display = "block";
                storePopup.innerHTML = `<div class="hud-header text-magenta text-xl mb-1"><i class="fa-solid fa-dice"></i> ${activeCasino.type}</div><div class="text-muted text-sm"><span class="hud-key">F</span> Gamble</div>`;
            } else {
                storePopup.style.display = "none";
            }
        }

        let stealthText = "";
        if ((me.stealthedUntil && Date.now() < me.stealthedUntil) || (me.nightfallStealth && Date.now() < me.nightfallStealth)) {
            stealthText = `<div class="text-magenta animate-pulse text-md" style="margin-top: 8px;"><i class="fa-solid fa-user-ninja"></i> INVISIBLE (STEALTH ACTIVE)</div>`;
        } else if (me.isSpiritAnimal || isLocallyWolf) {
            stealthText = `<div class="text-green animate-pulse text-md" style="margin-top: 8px;"><i class="fa-brands fa-wolf-pack-battalion"></i> WOLF FORM ACTIVE <span class="text-muted text-sm">(<span class="hud-key">R-Shift</span> or <span class="hud-key">2</span> to Cancel)</span></div>`;
        }

        let overlayText = "";
        let interactText = "";
        let buildText = "";
        let landText = "";

        if (me.isSleeping) {
            overlayText = `
            <div class="hud-panel animate-pulse" style="border-color: #22c55e; text-align: center; margin-top: 15px;">
                <div class="hud-header text-green text-xl" style="margin-bottom: 5px;"><i class="fa-solid fa-bed"></i> Sleeping... Zzz...</div>
                <div class="text-sm">Press <span class="hud-key">W</span><span class="hud-key">A</span><span class="hud-key">S</span><span class="hud-key">D</span> to Wake Up</div>
            </div>`;
        } else if (me.isMeditating) {
            overlayText = `
            <div class="hud-panel animate-pulse" style="border-color: #38bdf8; text-align: center; margin-top: 15px;">
                <div class="hud-header text-blue text-xl" style="margin-bottom: 5px;"><i class="fa-solid fa-om"></i> Meditating...</div>
                <div class="text-sm">Focusing Aura. Press <span class="hud-key">W</span><span class="hud-key">A</span><span class="hud-key">S</span><span class="hud-key">D</span> to stand.</div>
            </div>`;
        } else {
            if (isSafeZone && (isBuyMode || isBuildMode)) {
                overlayText = `<div class="text-red text-md" style="margin-top: 8px;"><i class="fa-solid fa-ban"></i> Cannot modify land inside Town walls!</div>`;
            } else if (!isSafeZone) {
                if (isTownScene) {
                    const lakeX = -180;
                    const lakeZ = 180;
                    const distSqValue = (localPlayerPos.x - lakeX) ** 2 + (localPlayerPos.y - lakeZ) ** 2;
                    if (distSqValue <= 2025.0) { // 45^2
                        interactText += `<div class="text-blue animate-pulse text-md mt-2"><i class="fa-solid fa-fish"></i> <span class="hud-key">F</span> Cast Fishing Line</div>`;
                    }
                }

                if (state.lootItems) {
                    for (const item of state.lootItems.values()) {
                        if (item.kind === "chest" && !item.isOpen && distance(me.x, me.y, item.x, item.y) <= 1.5) {
                            interactText += `<div class="text-amber animate-pulse text-md mt-2"><i class="fa-solid fa-gem"></i> <span class="hud-key">F</span> Open Chest</div>`;
                            break;
                        }
                    }
                }

                let nearestDeco: any = null;
                let nearestDecoDist = 3.0;
                if (state.decorations) {
                    state.decorations.forEach((deco: any) => {
                        const d = distance(localPlayerPos.x, localPlayerPos.y, deco.x, deco.z);
                        if (d < nearestDecoDist) {
                            nearestDeco = deco;
                            nearestDecoDist = d;
                        }
                    });
                }

                // Add Giant God to context text
                if (isSafeZone && !ctx.isUIOpen && !me.isSleeping && !me.isMeditating && distance(localPlayerPos.x, localPlayerPos.y, 35, -35) < 18.0) {
                    interactText += `<div class="text-green animate-pulse text-md mt-2"><i class="fa-solid fa-monument"></i> <span class="hud-key">F</span> Talk to Lord Protector</div>`;
                }

                // Add Stalls to context text
                if (isSafeZone && !ctx.isUIOpen && !me.isSleeping && !me.isMeditating && MARKET_STALLS) {
                    for (const stall of MARKET_STALLS) {
                        if (distance(localPlayerPos.x, localPlayerPos.y, stall.x, stall.y) < 6.0) {
                            interactText += `<div class="text-amber animate-pulse text-md mt-2"><i class="fa-solid fa-store"></i> <span class="hud-key">F</span> Browse ${stall.type}</div>`;
                            break;
                        }
                    }
                }

                // Add Casino to context text
                if (isSafeZone && !ctx.isUIOpen && !me.isSleeping && !me.isMeditating && CASINO_TABLES) {
                    for (const table of CASINO_TABLES) {
                        if (distance(localPlayerPos.x, localPlayerPos.y, table.x, table.y) < 4.0) {
                            interactText += `<div class="text-magenta animate-pulse text-md mt-2"><i class="fa-solid fa-dice"></i> <span class="hud-key">F</span> Play ${table.type}</div>`;
                            break;
                        }
                    }
                }

                if (nearestDeco && !isBuildMode && !isBuyMode && !isDecoModeActive) {
                    if (nearestDeco.type === "Storage Chest") {
                        interactText += `<div class="text-cyan text-md mt-2"><i class="fa-solid fa-box-archive"></i> <span class="hud-key">F</span> Open Chest</div>`;
                    } else if (nearestDeco.type === "Oak Bed") {
                        interactText += `<div class="text-amber text-md mt-2"><i class="fa-solid fa-bed"></i> <span class="hud-key">F</span> Sleep</div>`;
                    }
                }

                if (nearestScenery && !isBuildMode && !isBuyMode && !isDecoModeActive && !nearestDeco) {
                    if (nearestScenery.kind.includes("tree") || nearestScenery.kind === "cactus" || nearestScenery.kind === "magic_tree") {
                        const toolStr = me.equippedItem.includes("Axe") ? "(Axe)" : "(Hands)";
                        interactText += `<div class="text-green text-md mt-2"><i class="fa-solid fa-tree"></i> <span class="hud-key">1</span> Chop ${nearestScenery.kind.replace('_', ' ')} ${toolStr}</div>`;
                    } else if (nearestScenery.kind.includes("rock")) {
                        const toolStr = me.equippedItem.includes("Pickaxe") ? "(Pickaxe)" : "(Hands)";
                        interactText += `<div class="text-muted text-md mt-2"><i class="fa-solid fa-hammer"></i> <span class="hud-key">1</span> Mine Rock ${toolStr}</div>`;
                    }
                }

                if (isTownScene && isOutsideTown) {
                    let activeBuilding = null;
                    state.buildings.forEach((bldg: any) => {
                        if (distance(localPlayerPos.x, localPlayerPos.y, bldg.x, bldg.z) < 5.0 && !bldg.isConstructed && bldg.ownerId === me.name) {
                            activeBuilding = bldg;
                        }
                    });

                    if (activeBuilding) {
                        const b = activeBuilding as any;
                        buildText = `<div class="text-green text-md mt-2"><i class="fa-solid fa-person-digging"></i> <span class="hud-key">R</span> Add Material [${b.progress}/${b.targetProgress}]</div>`;
                    }

                    const plotX = Math.floor(localPlayerPos.x / 20);
                    const plotY = Math.floor(localPlayerPos.y / 20);
                    const plotId = `${plotX}_${plotY}`;
                    const plot = state.landPlots?.get(plotId);

                    if (plot && plot.ownerId) {
                        if (isBuildMode) {
                            if (plot.ownerName === me.name) {
                                landText = `<div class="text-green text-sm mt-2"><i class="fa-solid fa-hammer"></i> Build Mode - <span class="hud-key">ENTER</span> Place Blueprint</div>`;
                            } else {
                                landText = `<div class="text-red text-sm mt-2"><i class="fa-solid fa-ban"></i> Cannot build on ${plot.ownerName}'s land</div>`;
                            }
                        } else if (isDecoModeActive) {
                            if (plot.ownerName === me.name) {
                                landText = `<div class="text-green text-sm mt-2"><i class="fa-solid fa-couch"></i> Deco Mode - <span class="hud-key">ENTER</span> Place | <span class="hud-key">Q</span> Rotate</div>`;
                            } else {
                                landText = `<div class="text-red text-sm mt-2"><i class="fa-solid fa-ban"></i> Cannot decorate ${plot.ownerName}'s land</div>`;
                            }
                        } else {
                            landText = `<div class="text-magenta text-sm mt-2"><i class="fa-solid fa-flag"></i> Property of ${plot.ownerName} ${plot.ownerName === me.name ? "(Press <span class=\"hud-key\">V</span> to Build)" : ""}</div>`;
                        }
                    } else {
                        if (isBuyMode) {
                            landText = `<div class="text-green text-sm mt-2"><i class="fa-solid fa-cart-shopping"></i> Buy Mode - <span class="hud-key">ENTER</span> Buy (100 Coins)</div>`;
                        } else if (isBuildMode || isDecoModeActive) {
                            landText = `<div class="text-red text-sm mt-2"><i class="fa-solid fa-ban"></i> Must buy land first</div>`;
                        } else {
                            landText = `<div class="text-green text-sm mt-2"><i class="fa-solid fa-earth-americas"></i> Unclaimed Land - <span class="hud-key">B</span> Buy</div>`;
                        }
                    }
                }
            }
        }

        if (!me.hasUnlockedBuilding) {
            landText = "";
            buildText = "";
        }

        const finalHTML = `
            ${stealthText}
            ${overlayText}
            ${landText}
            ${buildText}
            ${interactText}
        `.trim();

        textDiv.innerHTML = finalHTML;
        
        // HIDE THE BOX IF IT IS EMPTY SO IT DOESN'T CLUTTER THE SCREEN
        const infoPanel = document.getElementById("hud-info-panel");
        if (infoPanel) {
            infoPanel.style.display = finalHTML === "" ? "none" : "block";
        }
    }

    const ctrlSkillTree = document.getElementById("ctrl-skilltree");
    const ctrlMeditate = document.getElementById("ctrl-meditate");
    const ctrlBuyLand = document.getElementById("ctrl-buy-land");
    const ctrlBuildMode = document.getElementById("ctrl-build-mode");
    const btnHarnessMana = document.getElementById("btn-harness-mana");
    const auraHUDDiv = document.getElementById("hud-aura");
    const ctrlFamiliar = document.getElementById("ctrl-familiar");

    if (me) {
        if (me.hasUnlockedSkillTree) {
            if (ctrlSkillTree) ctrlSkillTree.style.display = "flex";
            if (ctrlMeditate) ctrlMeditate.style.display = "flex";
            if (auraHUDDiv) auraHUDDiv.style.display = "flex"; 
            if (btnHarnessMana) btnHarnessMana.style.display = "block";
        } else {
            if (ctrlSkillTree) ctrlSkillTree.style.display = "none";
            if (ctrlMeditate) ctrlMeditate.style.display = "none";
            if (auraHUDDiv) auraHUDDiv.style.display = "none"; 
            if (btnHarnessMana) btnHarnessMana.style.display = "none";
        }

        if (me.hasUnlockedBuilding) {
            if (ctrlBuyLand) ctrlBuyLand.style.display = "flex";
            if (ctrlBuildMode) ctrlBuildMode.style.display = "flex";
        } else {
            if (ctrlBuyLand) ctrlBuyLand.style.display = "none";
            if (ctrlBuildMode) ctrlBuildMode.style.display = "none";
        }

        if (ctrlFamiliar) {
            ctrlFamiliar.style.display = me.mountedFamiliarId ? "flex" : "none";
        }
    }
}

export function openCraftingMenu(activeRoom: any, playerState: any) {
    const modal = document.getElementById("crafting-modal");
    const list = document.getElementById("crafting-recipe-list");
    if (!modal || !list || !activeRoom || !playerState) return;

    let html = "";
    
    CRAFTING_RECIPES.forEach(r => {
        const hasCoins = playerState.coins >= r.cost;
        let canCraft = hasCoins;
        
        let reqText = `<div style="display: flex; gap: 10px; margin-top: 8px; font-size: 14px; font-weight: 700;">`;
        reqText += `<span style="color: ${hasCoins ? '#f59e0b' : '#ef4444'};"><i class="fa-solid fa-coins"></i> ${r.cost}</span>`;
        
        r.reqs.forEach(req => {
            const pItem = playerState.inventory.get(req.n);
            const pQty = pItem ? pItem.quantity : 0;
            const hasEnough = pQty >= req.q;
            if (!hasEnough) canCraft = false;
            
            reqText += `<span style="color: ${hasEnough ? '#22c55e' : '#ef4444'};">${req.n}: ${pQty}/${req.q}</span>`;
        });
        reqText += `</div>`;

        html += `
            <div style="background: #0f172a; border: 3px solid #334155; border-radius: 12px; padding: 15px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div class="hud-header text-blue text-lg">${r.icon} ${r.name}</div>
                    ${reqText}
                </div>
                <button class="btn-chunky btn-green craft-btn" data-recipe="${r.id}" ${canCraft ? '' : 'disabled style="filter: grayscale(1); opacity: 0.5; cursor: not-allowed;"'} style="padding: 10px 20px;">
                    CRAFT
                </button>
            </div>
        `;
    });

    list.innerHTML = html;
    modal.style.display = "block";

    list.onclick = (e) => {
        const target = (e.target as HTMLElement).closest('.craft-btn');
        if (!target) return;
        const recipeId = target.getAttribute("data-recipe");
        if (recipeId) {
            activeRoom.send("craftItem", { recipeId });
            setTimeout(() => openCraftingMenu(activeRoom, playerState), 100); 
        }
    };
}

export function openStoreMenu(activeRoom: any, playerState: any, storeState: any) {
    let modal = document.getElementById("store-management-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "store-management-modal";
        modal.className = "modal-chunky";
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.width = "550px";
        modal.style.maxHeight = "80vh";
        modal.style.overflowY = "auto";
        modal.style.zIndex = "3100";
        modal.style.pointerEvents = "auto";
        modal.style.padding = "30px";
        document.body.appendChild(modal);

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal!.style.display === "block") modal!.style.display = "none";
        });
    }

    const isOwner = storeState.ownerId === playerState.name;
    const isUnowned = storeState.ownerId === "";

    let html = `
        <div style="padding-bottom: 15px; border-bottom: 4px solid #334155; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: #1e293b; z-index: 10;">
            <h2 class="hud-header text-amber" style="margin: 0;"><i class="fa-solid fa-store"></i> ${storeState.type}</h2>
            <button class="btn-close-chunky store-close-btn">&times;</button>
        </div>
    `;

    if (isUnowned) {
        html += `
            <div style="text-align: center; margin-top: 30px;">
                <p class="text-muted" style="font-size: 18px; font-weight: 900;">This property is currently vacant.</p>
                <div class="hud-header text-amber" style="font-size: 32px; margin: 20px 0;"><i class="fa-solid fa-coins"></i> 1,000</div>
                <button class="btn-chunky btn-blue buy-prop-btn" ${playerState.coins < 1000 ? 'disabled style="filter: grayscale(1); opacity: 0.5;"' : ''} style="width: 100%; padding: 20px;">Purchase Property</button>
            </div>
        `;
    } else if (isOwner) {
        html += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; background: #0f172a; padding: 15px; border-radius: 12px; border: 3px solid #334155;">
                <div>
                    <div class="text-muted text-sm">Store Vault (Profits)</div>
                    <div class="text-amber hud-header" style="font-size: 24px;"><i class="fa-solid fa-coins"></i> ${storeState.vault}</div>
                </div>
                <button class="btn-chunky btn-green collect-vault-btn" ${storeState.vault <= 0 ? 'disabled style="filter: grayscale(1); opacity: 0.5;"' : ''} style="padding: 12px 20px;">Collect Profits</button>
            </div>
            <h3 class="hud-header text-sm text-muted" style="margin-top: 25px; margin-bottom: 10px;">Produce Stock</h3>
            <div style="display: flex; flex-direction: column; gap: 15px;">
        `;
        
        storeState.inventory.forEach((item: any, itemName: string) => {
            const recipe = STORE_RECIPES[itemName];
            if (!recipe) return; 

            let canCook = true;
            let reqHtml = "";
            recipe.reqs.forEach((req: any) => {
                const pItem = playerState.inventory.get(req.n);
                const pQty = pItem ? pItem.quantity : 0;
                if (pQty < req.q) canCook = false;
                reqHtml += `<span style="color: ${pQty >= req.q ? '#22c55e' : '#ef4444'}; margin-right: 8px;">${req.n} ${pQty}/${req.q}</span>`;
            });

            html += `
                <div style="background: #334155; padding: 15px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div class="text-lg">${itemName} (In Stock: <span class="text-blue">${item.stock}</span>)</div>
                        <div class="text-sm text-muted" style="margin-top: 6px;">Req: ${reqHtml}</div>
                    </div>
                    <button class="btn-chunky btn-blue produce-btn" data-item="${itemName}" ${!canCook ? 'disabled style="filter: grayscale(1); opacity: 0.5;"' : ''} style="padding: 10px 15px;">
                        Produce (+${recipe.yield})
                    </button>
                </div>
            `;
        });
        html += `</div>`;
    } else {
        html += `
            <div class="text-muted text-md" style="margin-top: 15px; text-align: center;">Owned by <span class="text-amber">${storeState.ownerName}</span></div>
            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 20px;">
        `;
        storeState.inventory.forEach((item: any, itemName: string) => {
            const outOfStock = item.stock <= 0;
            const cantAfford = playerState.coins < item.price;
            html += `
                <div style="background: #0f172a; border: 3px solid #334155; padding: 15px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div class="text-lg">${itemName}</div>
                        <div class="text-sm ${outOfStock ? 'text-red' : 'text-muted'}" style="margin-top: 4px;">Stock: ${item.stock}</div>
                    </div>
                    <button class="btn-chunky ${outOfStock ? 'btn-slate' : 'btn-gold'} buy-btn" data-item="${itemName}" ${(outOfStock || cantAfford) ? 'disabled style="filter: grayscale(1); opacity: 0.5;"' : ''} style="padding: 12px 20px; color: #0f172a;">
                        <i class="fa-solid fa-coins"></i> ${item.price}
                    </button>
                </div>
            `;
        });
        html += `</div>`;
    }

    modal.innerHTML = html;
    modal.style.display = "block";

    modal.onclick = (e) => {
        const target = e.target as HTMLElement;

        if (target.closest('.store-close-btn')) {
            modal!.style.display = 'none';
        } else if (target.closest('.buy-prop-btn') && !target.closest('.buy-prop-btn')!.hasAttribute('disabled')) {
            activeRoom.send("buyStore", { storeId: storeState.id }); 
            setTimeout(() => openStoreMenu(activeRoom, playerState, storeState), 100);
        } else if (target.closest('.collect-vault-btn') && !target.closest('.collect-vault-btn')!.hasAttribute('disabled')) {
            activeRoom.send("collectVault", { storeId: storeState.id }); 
            setTimeout(() => openStoreMenu(activeRoom, playerState, storeState), 100);
        } else if (target.closest('.produce-btn') && !target.closest('.produce-btn')!.hasAttribute('disabled')) {
            const itemName = target.closest('.produce-btn')!.getAttribute("data-item");
            if (itemName) {
                activeRoom.send("craftStoreStock", { storeId: storeState.id, itemName });
                setTimeout(() => openStoreMenu(activeRoom, playerState, storeState), 100);
            }
        } else if (target.closest('.buy-btn') && !target.closest('.buy-btn')!.hasAttribute('disabled')) {
            const itemName = target.closest('.buy-btn')!.getAttribute("data-item");
            if (itemName) {
                activeRoom.send("buyItem", { storeId: storeState.id, itemName });
                setTimeout(() => openStoreMenu(activeRoom, playerState, storeState), 100);
            }
        }
    };
}