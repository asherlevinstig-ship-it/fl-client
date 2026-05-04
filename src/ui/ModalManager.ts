import { ITEM_DB } from "../ItemDatabase";

// --- EXPORTED UI STATE ---
export let isTeleportUIOpen = false;
export let isInventoryUIOpen = false;
export let isChestUIOpen = false;
export let isShopUIOpen = false;
export let isEventInviteOpen = false;
export let isMirrorUIOpen = false;
export let isCasinoUIOpen = false;

export let activeChestId: string | null = null;
export let activeStallType: string | null = null;

// --- GLOBAL MODAL MANAGER UTILITY ---
// Solves Z-Index Overlap by ensuring mutually exclusive modal states
export function closeAllModals() {
    isTeleportUIOpen = false;
    isInventoryUIOpen = false;
    isChestUIOpen = false;
    isShopUIOpen = false;
    isEventInviteOpen = false;
    isMirrorUIOpen = false;
    isCasinoUIOpen = false;
    activeChestId = null;
    activeStallType = null;

    const modalIds = [
        "teleport-modal", 
        "casino-modal", 
        "inventory-modal", 
        "chest-modal", 
        "shop-modal", 
        "blueprint-modal", 
        "event-invite-modal", 
        "mirror-modal"
    ];

    modalIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && document.body.contains(el)) {
            document.body.removeChild(el);
        }
    });

    if ((window as any).casinoAnimInterval) {
        clearInterval((window as any).casinoAnimInterval);
    }
}

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

// --- EXPORTED HUD RENDERING ---
export function renderChunkyHUD(player: any) {
    if (!player) return;
    injectGlobalChunkyStyles();

    let hud = document.getElementById("chunky-hud-container");
    
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
                <div class="hud-bar-bg">
                    <div id="hud-hunger-fill" class="fill-hunger-cap" style="width: 0%;"></div>
                    <div id="hud-stamina-fill" class="hud-bar-fill fill-stamina" style="width: 100%;"></div>
                    <div id="hud-stamina-text" class="hud-text">100 / 100</div>
                </div>
            </div>
        `;
        document.body.appendChild(hud);
    }

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

// --- TELEPORT UI ---
export function openTeleportUI(activeRoom: any, keys: any) {
    if (!activeRoom) return;
    if (isTeleportUIOpen) {
        closeAllModals();
        return;
    }
    
    closeAllModals();
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
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--fui-gold-dim); padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="margin:0; color:var(--fui-gold); font-size: 20px; font-weight: 900; letter-spacing: 2px;">Fast Travel Network</h2>
        <button id="close-teleport-btn" class="btn-close-chunky">&times;</button>
      </div>
      <div style="display:flex; flex-direction:column; gap:15px; margin-bottom: 10px;">
          <button id="tp-town" class="btn-chunky btn-gold" style="padding: 15px; display: flex; flex-direction: column; gap: 5px;">
              <span style="font-size: 24px;">🏰</span> Town of Beginnings
          </button>
          <button id="tp-elven" class="btn-chunky btn-cyan" style="padding: 15px; display: flex; flex-direction: column; gap: 5px; border-color: var(--fui-cyan); color: var(--fui-cyan);">
              <span style="font-size: 24px;">✨</span> The Elven Kingdom
          </button>
      </div>
    `;

    document.getElementById("close-teleport-btn")!.onclick = () => {
      closeAllModals();
    };

    document.getElementById("tp-town")!.onclick = () => {
      activeRoom.send("teleport", { destination: "town" });
      closeAllModals();
    };

    document.getElementById("tp-elven")!.onclick = () => {
      activeRoom.send("teleport", { destination: "elven", x: 1155, z: 0 });
      closeAllModals();
    };
}

// --- CASINO UI ---
export function openCasinoUI(activeRoom: any, keys: any, gameType: string) {
    if (!activeRoom) return;
    if (isCasinoUIOpen) {
        closeAllModals();
        return;
    }
    
    closeAllModals();
    isCasinoUIOpen = true;
    
    if (typeof (window as any).injectGlobalChunkyStyles === "function") {
        (window as any).injectGlobalChunkyStyles();
    } else {
        injectGlobalChunkyStyles();
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
                background: transparent; border: 1px solid var(--fui-gold-dim); color: var(--fui-text);
                border-radius: 4px; padding: 5px 10px; font-weight: 900; font-size: 10px;
                cursor: pointer; transition: all 0.2s; flex: 1; font-family: 'Nunito', sans-serif;
                letter-spacing: 1px; text-transform: uppercase;
            }
            .quick-bet-btn:hover { background: var(--fui-gold); color: var(--fui-bg); }
            .quick-bet-btn:active { transform: scale(0.95); }
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
                <div id="2d-coin" style="width: 80px; height: 80px; border-radius: 50%; background: radial-gradient(circle, var(--fui-gold) 0%, #8b6508 100%); border: 2px solid #fff; box-shadow: 0 0 20px rgba(212,175,55,0.5); display: flex; align-items: center; justify-content: center; font-size: 40px;">💰</div>
            </div>`;
        customInputs = `
            <div style="margin: 15px 0; display:flex; justify-content:center; gap:15px;">
                <button id="btn-heads" class="btn-chunky btn-cyan" style="flex:1; padding: 15px; border-color: var(--fui-cyan); color: var(--fui-cyan);">HEADS</button>
                <button id="btn-tails" class="btn-chunky btn-red" style="flex:1; padding: 15px;">TAILS</button>
            </div>
        `;
    } else if (gameType === "Roulette") {
        visualArea = `
            <div style="height: 140px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <div id="2d-roulette" style="width: 120px; height: 120px; border-radius: 50%; border: 4px solid var(--fui-gold); background: repeating-conic-gradient(#8b0000 0 18deg, #1a1514 18deg 36deg); box-shadow: 0 0 20px rgba(212,175,55,0.2); display: flex; align-items: center; justify-content: center; position: relative;">
                    <div style="width: 60px; height: 60px; background: var(--fui-bg); border-radius: 50%; border: 2px solid var(--fui-gold-dim);"></div>
                    <div style="position: absolute; top: 10px; width: 10px; height: 10px; background: white; border-radius: 50%; box-shadow: 0 0 10px white;"></div>
                </div>
            </div>`;
        customInputs = `
            <select id="roulette-guess" style="width: 100%; padding: 15px; font-size: 14px; font-weight: 900; margin: 15px 0; background: var(--fui-bg); color: var(--fui-text); border: 1px solid var(--fui-gold); border-radius: 4px; outline: none; font-family: 'Nunito', sans-serif; cursor: pointer; text-transform: uppercase;">
                <option value="red">🔴 Red (2x Multiplier)</option>
                <option value="black">⚫ Black (2x Multiplier)</option>
                <option value="0">🟢 Zero (35x Multiplier)</option>
                <option value="7">⭐ Lucky 7 (35x Multiplier)</option>
            </select>
            <button id="btn-play" class="btn-chunky btn-gold" style="width: 100%; padding: 15px;">SPIN THE WHEEL!</button>
        `;
    } else if (gameType === "Slot Machine") {
        visualArea = `
            <div style="height: 120px; display: flex; align-items: center; justify-content: center;">
                <div style="background: var(--fui-bg); border: 2px solid var(--fui-gold); border-radius: 4px; padding: 15px; display: flex; gap: 15px; box-shadow: inset 0 10px 20px rgba(0,0,0,0.8);">
                    <div id="2d-slot-1" style="width: 60px; height: 70px; background: #2a2422; border-radius: 4px; font-size: 40px; display: flex; align-items: center; justify-content: center; border-bottom: 2px solid var(--fui-gold-dim);">🍒</div>
                    <div id="2d-slot-2" style="width: 60px; height: 70px; background: #2a2422; border-radius: 4px; font-size: 40px; display: flex; align-items: center; justify-content: center; border-bottom: 2px solid var(--fui-gold-dim);">🍋</div>
                    <div id="2d-slot-3" style="width: 60px; height: 70px; background: #2a2422; border-radius: 4px; font-size: 40px; display: flex; align-items: center; justify-content: center; border-bottom: 2px solid var(--fui-gold-dim);">💎</div>
                </div>
            </div>`;
        customInputs = `
            <button id="btn-play" class="btn-chunky btn-gold" style="width: 100%; padding: 15px; font-size: 16px; margin-top: 15px;">🎰 PULL LEVER!</button>
        `;
    } else if (gameType === "Blackjack") {
        visualArea = `
            <div style="height: 140px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 15px;">
                <div id="2d-bj-dealer" style="display: flex; gap: 8px; height: 50px; justify-content: center; width: 100%;"></div>
                <div id="2d-bj-player" style="display: flex; gap: 8px; height: 50px; justify-content: center; width: 100%;"></div>
            </div>`;
        customInputs = `
            <div id="bj-start-controls">
                <button id="btn-play" class="btn-chunky btn-cyan" style="width: 100%; padding: 15px; margin-top: 15px; border-color: var(--fui-cyan); color: var(--fui-cyan);">🃏 DEAL CARDS!</button>
            </div>
            <div id="bj-action-controls" style="display: none; gap: 10px; margin-top: 15px;">
                <button id="btn-hit" class="btn-chunky btn-green" style="flex: 1; padding: 15px;">👇 HIT</button>
                <button id="btn-stand" class="btn-chunky btn-red" style="flex: 1; padding: 15px;">✋ STAND</button>
            </div>
        `;
    }

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--fui-gold-dim); padding-bottom: 10px; margin-bottom: 15px;">
        <h2 style="margin:0; color:var(--fui-gold); font-size: 20px; font-weight: 900; letter-spacing: 2px;">${gameType}</h2>
        <button id="close-casino-btn" class="btn-close-chunky">&times;</button>
      </div>
      
      <div class="chunky-panel" style="margin-bottom: 15px; text-align: center;">
        <span style="font-size: 12px; color: var(--fui-text-dim);">AVAILABLE FUNDS:</span> 
        <span id="casino-balance" style="font-size: 16px; color: var(--fui-gold); font-weight: 900;">${me.coins} CR</span>
      </div>

      ${visualArea}
  
      <div class="chunky-panel" style="text-align: left; margin-top: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <label style="color: var(--fui-text); font-weight: 900; font-size: 12px; letter-spacing: 1px;">WAGER AMOUNT:</label>
            <div style="display: flex; gap: 5px; width: 50%;">
                <button class="quick-bet-btn" data-amt="min">MIN</button>
                <button class="quick-bet-btn" data-amt="half">1/2</button>
                <button class="quick-bet-btn" data-amt="max">MAX</button>
            </div>
        </div>
        <input type="number" id="bet-amount" value="50" min="1" max="${me.coins}" style="width: 100%; padding: 10px; font-size: 16px; font-weight: 900; margin-top: 10px; background: var(--fui-bg); color: var(--fui-gold); border: 1px solid var(--fui-gold); border-radius: 4px; box-sizing: border-box; font-family: 'Nunito', sans-serif; text-align: center; outline: none;" />
      </div>
  
      ${customInputs}
  
      <div id="casino-result" style="margin-top: 15px; font-size: 14px; font-weight: 900; min-height: 20px; color: var(--fui-text); letter-spacing: 1px;"></div>
    `;

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
        closeAllModals();
    };

    const getBet = () => parseInt(betInput.value) || 0;

    const start2DAnimation = (game: string) => {
        const r = document.getElementById("casino-result");
        if (r) r.innerHTML = "PROCESSING LOGIC...";

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
                const cardHtml = `<div class="dealing" style="width:30px; height:45px; background:var(--fui-bg); border:1px solid var(--fui-gold); border-radius:4px; display:flex; align-items:center; justify-content:center; color:var(--fui-gold); font-weight:900; font-size: 16px;">?</div>`;
                dealer.innerHTML = cardHtml;
                player.innerHTML = cardHtml;
            }
        }
    };

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
            document.getElementById("bj-start-controls")!.style.display = "none";
            document.getElementById("bj-action-controls")!.style.display = "flex";
            betInput.disabled = true; 
        };
        document.getElementById("btn-hit")!.onclick = () => {
            activeRoom.send("blackjack_action", { action: "hit" });
        };
        document.getElementById("btn-stand")!.onclick = () => {
            activeRoom.send("blackjack_action", { action: "stand" });
            document.getElementById("bj-action-controls")!.style.display = "none";
            document.getElementById("bj-start-controls")!.style.display = "block";
            betInput.disabled = false;
        };
    }
}

// --- INVENTORY UI ---
export function openInventoryUI(activeRoom: any, keys: any, playerClass: string) {
    if (!activeRoom) return;
    if (isInventoryUIOpen) {
        closeAllModals();
        return;
    }
    
    closeAllModals();
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
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--fui-gold-dim); padding-bottom: 15px; margin-bottom: 20px;">
                <div>
                    <h2 style="margin:0; color:var(--fui-gold); font-size: 22px; font-weight: 900; letter-spacing: 2px;"><span id="inv-player-name"></span>'S INVENTORY</h2>
                    <div style="margin-top: 6px; font-size: 12px; color: var(--fui-text-dim); font-weight: 700; letter-spacing: 1px;">
                        RANK: <span id="inv-player-rank"></span> <span style="margin: 0 5px; color: var(--fui-gold-dim);">|</span> LVL: <span id="inv-player-level"></span> <span style="margin: 0 5px; color: var(--fui-gold-dim);">|</span> CLS: <span id="inv-player-class"></span>
                    </div>
                </div>
                <button id="close-inv-btn" class="btn-close-chunky">&times;</button>
            </div>
            <div class="responsive-split-container">
                <div id="inv-equip-container" class="chunky-panel" style="flex: 0 0 220px; display:grid; grid-template-columns: 1fr 1fr; gap:15px; justify-items:center;">
                </div>
                <div style="flex:1;">
                    <div class="chunky-panel" style="margin-bottom: 15px; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: 900; color: var(--fui-text-dim); font-size: 12px;">CREDITS:</span>
                        <span style="font-size: 16px; color: var(--fui-gold); font-weight: 900;">CR <span id="inv-player-coins"></span></span>
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
        closeAllModals();
    };

    refreshInventoryUI(activeRoom, playerClass);
}

export function refreshInventoryUI(activeRoom: any, playerClass: string) {
    if (!isInventoryUIOpen || !activeRoom) return;
    const me = activeRoom.state.players.get(activeRoom.sessionId);
    if (!me) return;

    let rankColor = "var(--fui-text-dim)"; 
    if (me.rank === "Bronze") rankColor = "#cd7f32";
    if (me.rank === "Silver") rankColor = "#c0c0c0";
    if (me.rank === "Gold") rankColor = "#d4af37";
    if (me.rank === "Diamond") rankColor = "#b9f2ff";

    document.getElementById("inv-player-name")!.textContent = me.name;
    const rankEl = document.getElementById("inv-player-rank")!;
    rankEl.textContent = `${me.rank}`;
    rankEl.style.color = rankColor;
    document.getElementById("inv-player-level")!.textContent = me.level;
    document.getElementById("inv-player-class")!.textContent = playerClass.charAt(0).toUpperCase() + playerClass.slice(1);
    document.getElementById("inv-player-coins")!.textContent = me.coins;

    const getEquipSlotHTML = (itemName: string, placeholder: string, label: string) => {
        const item = ITEM_DB[itemName];
        const borderCol = item ? 'var(--fui-cyan)' : 'var(--fui-gold-dim)';
        const bgCol = item ? 'rgba(0, 229, 255, 0.1)' : 'var(--fui-bg)';
        return `
            <div style="display:flex; flex-direction:column; align-items:center; gap:5px; width: 100%;">
                <div class="equip-slot" style="width:64px; height:64px; background:${bgCol}; border:1px solid ${borderCol}; border-radius:4px; display:flex; justify-content:center; align-items:center; font-size:32px; position:relative; box-shadow: inset 0 0 15px rgba(0,0,0,0.8);">
                    ${item ? item.icon : `<span style="opacity:0.2; filter: grayscale(1);">${placeholder}</span>`}
                </div>
                <span style="font-size:10px; font-weight: 900; color:var(--fui-text-dim); text-transform:uppercase; letter-spacing: 1px;">${label}</span>
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
        <div style="grid-column: span 2; display:flex; justify-content:center; width: 100%;">
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
                    <div style="font-weight:900; font-size:14px; color:var(--fui-text); letter-spacing: 1px;">
                        <span style="font-size: 16px; margin-right: 5px;">${icon}</span> 
                        ${item.name} 
                        <span style="color:var(--fui-bg); background: var(--fui-gold); padding: 2px 6px; border-radius: 2px; margin-left: 5px; font-size: 10px;">x${item.quantity}</span>
                    </div>
                    <div style="font-size:10px; font-weight: 700; color:var(--fui-text-dim); margin-top: 4px; text-transform: uppercase;">${dbItem?.type || 'item'}</div>
                </div>
                <div style="display:flex; gap: 8px;">
                    <button class="btn-chunky btn-green equip-btn" data-itemname="${name}" style="padding: 6px 12px; font-size: 10px;">Equip</button>
                    <button class="btn-chunky btn-blue use-btn" data-itemname="${name}" style="padding: 6px 12px; font-size: 10px;">Use</button>
                </div>
            </div>
        `;
    });

    if (!hasItems) listHtml = `<div style="text-align:center; color:var(--fui-text-dim); padding: 30px; font-weight: 900; font-size: 14px; letter-spacing: 1px;">INVENTORY EMPTY</div>`;
    listContainer.innerHTML = listHtml;
    listContainer.scrollTop = currentScroll; 
}


// --- CHEST UI ---
export function openChestUI(activeRoom: any, keys: any, chestId: string) {
    if (!activeRoom) return;
    if (isChestUIOpen) {
        closeAllModals();
        return;
    }
    
    closeAllModals();
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
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--fui-gold-dim); padding-bottom: 15px; margin-bottom: 20px;">
                <h2 style="margin:0; color:var(--fui-gold); font-size: 20px; font-weight: 900; letter-spacing: 2px;">SECURE STORAGE</h2>
                <button id="close-chest-btn" class="btn-close-chunky">&times;</button>
            </div>
            <div class="responsive-split-container">
                <div class="chunky-panel chest-panel-half" style="flex: 1;">
                    <h3 style="color: var(--fui-cyan); margin-top: 0; font-weight: 900; font-size: 14px; letter-spacing: 1px;">🎒 LOCAL INVENTORY</h3>
                    <div id="chest-backpack-container" style="display:flex; flex-direction:column; gap:10px; max-height:300px; overflow-y:auto; padding-right: 5px;"></div>
                </div>
                <div class="chunky-panel chest-panel-half" style="flex: 1;">
                    <h3 style="color: var(--fui-gold); margin-top: 0; font-weight: 900; font-size: 14px; letter-spacing: 1px;">🧰 CONTAINER CONTENTS</h3>
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
        closeAllModals();
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
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--fui-bg); padding:10px; border-radius:4px; border:1px solid var(--fui-gold-dim);">
                <div style="font-weight:900; font-size:12px; color:var(--fui-text);">${icon} ${item.name} <span style="color:var(--fui-cyan);">x${item.quantity}</span></div>
                <button class="btn-chunky btn-blue deposit-btn" data-itemname="${name}" style="padding:6px 10px; font-size: 10px;">Deposit</button>
            </div>
        `;
    });
    if (me.inventory.size === 0) bpHTML = `<div style="text-align:center; color:var(--fui-text-dim); font-weight:900; font-size:12px; padding: 20px;">EMPTY</div>`;
    
    let chHTML = "";
    if (chest.inventory) {
        chest.inventory.forEach((item: any, name: string) => {
            const dbItem = ITEM_DB[name];
            const icon = dbItem ? dbItem.icon : "📦";
            chHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; background:var(--fui-bg); padding:10px; border-radius:4px; border:1px solid var(--fui-gold-dim);">
                    <div style="font-weight:900; font-size:12px; color:var(--fui-text);">${icon} ${item.name} <span style="color:var(--fui-gold);">x${item.quantity}</span></div>
                    <button class="btn-chunky btn-gold withdraw-btn" data-itemname="${name}" style="padding:6px 10px; font-size: 10px;">Withdraw</button>
                </div>
            `;
        });
        if (chest.inventory.size === 0) chHTML = `<div style="text-align:center; color:var(--fui-text-dim); font-weight:900; font-size:12px; padding: 20px;">EMPTY</div>`;
    } else {
        chHTML = `<div style="text-align:center; color:var(--fui-text-dim); font-weight:900; font-size:12px; padding: 20px;">EMPTY</div>`;
    }

    bpContainer.innerHTML = bpHTML;
    bpContainer.scrollTop = bpScroll;
    chestContainer.innerHTML = chHTML;
    chestContainer.scrollTop = chestScroll;
}


// --- SHOP UI ---
export function openShopUI(activeRoom: any, keys: any, stallType: string) {
    if (!activeRoom) return;
    if (isShopUIOpen) {
        closeAllModals();
        return;
    }
    
    closeAllModals();
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
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--fui-gold-dim); padding-bottom: 15px; margin-bottom: 20px;">
                <div>
                    <h2 id="shop-title" style="margin:0; color:var(--fui-gold); font-size: 20px; font-weight: 900; letter-spacing: 2px;"></h2>
                    <div id="shop-subtitle" style="margin-top: 5px; font-size: 10px; font-weight: 900; letter-spacing: 1px;"></div>
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
        closeAllModals();
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
        leaseText = ` (Lease: ${daysLeft}d)`;
    }

    document.getElementById("shop-title")!.textContent = activeStallType;
    const subEl = document.getElementById("shop-subtitle")!;
    subEl.textContent = isOwned ? `OWNER: ${isMine ? 'YOU' : storeObj.ownerName}${leaseText}` : 'UNOWNED PUBLIC KIOSK';
    subEl.style.color = isOwned ? 'var(--fui-cyan)' : 'var(--fui-text-dim)';

    const vaultContainer = document.getElementById("shop-vault-container")!;
    if (isMine) {
        vaultContainer.innerHTML = `
            <div class="chunky-panel" style="margin-bottom: 20px; border-color: var(--fui-cyan); background: rgba(0, 229, 255, 0.05);">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size: 14px; font-weight: 900; color: var(--fui-cyan); letter-spacing: 1px;">VAULT: CR ${storeObj.vault}</span>
                    <button id="collect-vault-btn" class="btn-chunky btn-cyan" data-storeid="${storeObj.id}" style="padding:8px 12px; font-size:10px;">Collect</button>
                </div>
            </div>
        `;
    } else if (!isOwned) {
        vaultContainer.innerHTML = `
            <button id="buy-store-btn" class="btn-chunky btn-gold" data-storeid="${storeObj.id}" style="width: 100%; padding: 15px; margin-bottom: 20px;">
                Acquire Kiosk Rights - 1000 CR (14 Days)
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
        const stockText = isOwned ? `STOCK: ${item.stock}` : `UNLIMITED STOCK`;
        const dbItem = ITEM_DB[item.name];
        const icon = dbItem ? dbItem.icon : "📦";

        itemsHTML += `
            <div class="chunky-panel" style="display:flex; justify-content:space-between; align-items:center; padding:15px; margin: 0;">
                <div style="padding-right: 15px; flex-grow: 1;">
                    <div style="font-weight:900; font-size:14px; color:var(--fui-text); letter-spacing: 1px;">${icon} ${item.name}</div>
                    <div style="font-size:10px; color:var(--fui-text-dim); margin-top:6px; line-height:1.4; font-weight: 700;">${item.desc}</div>
                    <div style="font-size:10px; color:var(--fui-cyan); margin-top:8px; font-weight:900;">${stockText}</div>
                </div>
        `;

        if (isMine) {
            itemsHTML += `
                <div style="display:flex; flex-direction:column; gap: 10px;">
                    <button class="btn-chunky btn-blue restock-btn" data-storeid="${storeObj.id}" data-itemname="${name}" style="padding:8px 12px; font-size: 10px;">
                        Restock (+1) - ${item.wholesalePrice} CR
                    </button>
                    <div style="text-align: right; color: var(--fui-gold); font-size: 10px; font-weight:900; letter-spacing: 1px;">SELLS FOR: ${item.price} CR</div>
                </div>
            `;
        } else {
            const btnClass = inStock ? "btn-gold" : "btn-slate";
            itemsHTML += `
                <button class="btn-chunky ${btnClass} buy-btn" data-storeid="${storeObj.id}" data-itemname="${name}" ${inStock ? '' : 'disabled'} style="padding:10px 16px; white-space: nowrap; font-size: 12px;">
                    ${inStock ? `BUY - ${item.price} CR` : 'SOLD OUT'}
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
    
    if (document.getElementById("blueprint-modal")) {
        closeAllModals();
        return;
    }
    
    closeAllModals();
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
      <h2 style="margin:0 0 10px 0; color:var(--fui-gold); font-weight: 900; font-size: 20px; letter-spacing: 2px;">SELECT SCHEMATIC</h2>
      <p style="color:var(--fui-text-dim); font-size:12px; margin-bottom: 25px; font-weight: 700; letter-spacing: 1px;">INITIALIZE CONSTRUCTION SEQUENCE</p>
      
      <div style="display:flex; flex-direction:column; gap:15px;">
        <button id="bp-house" class="btn-chunky btn-blue" style="padding: 15px; font-size: 14px;">
            🏡 House (10 Mats)
        </button>
        <button id="bp-farm" class="btn-chunky btn-green" style="padding: 15px; font-size: 14px;">
            🌾 Farm (5 Mats)
        </button>
        <button id="bp-shop" class="btn-chunky btn-gold" style="padding: 15px; font-size: 14px;">
            🏪 Kiosk (20 Mats)
        </button>
      </div>
      <button id="close-bp-btn" class="btn-chunky btn-red" style="margin-top: 25px; padding:15px; width:100%;">ABORT</button>
    `;

    document.body.appendChild(modal);

    const setupBtn = (id: string, type: string) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onclick = () => {
                activeScene.currentBlueprintType = type;
                activeScene.isBuildMode = true;
                activeScene.isBuyMode = false;
                closeAllModals();
            };
        }
    };

    setupBtn("bp-house", "house");
    setupBtn("bp-farm", "farm");
    setupBtn("bp-shop", "shop");

    document.getElementById("close-bp-btn")!.onclick = () => {
        closeAllModals();
    };
}

export async function showCharacterCreation(): Promise<{ classId: string, pathwayId: string, auraStyle: string }> {
  closeAllModals();
  injectGlobalChunkyStyles();
  return new Promise((resolve) => {
    const container = document.createElement("div");
    container.style.position = "fixed"; container.style.top = "0"; container.style.left = "0";
    container.style.width = "100vw"; container.style.height = "100vh";
    container.style.background = "radial-gradient(circle at center, #2a2422 0%, #1a1514 100%)"; 
    container.style.zIndex = "9999"; container.style.display = "flex";
    container.style.flexDirection = "column"; container.style.alignItems = "center";
    container.style.justifyContent = "center"; 
    container.style.fontFamily = "'Nunito', sans-serif";
    container.style.padding = "20px";
    container.style.boxSizing = "border-box";
    container.style.overflowY = "auto";

    const title = document.createElement("h1");
    title.innerText = "INITIALIZE PROFILE";
    title.style.color = "#d4af37"; title.style.fontSize = "clamp(24px, 4vw, 40px)"; title.style.marginBottom = "40px";
    title.style.fontWeight = "900";
    title.style.letterSpacing = "4px";
    title.style.textAlign = "center";
    title.style.textShadow = "0 0 20px rgba(212,175,55,0.4)";
    container.appendChild(title);

    const cardRow = document.createElement("div");
    cardRow.style.display = "flex"; 
    cardRow.style.gap = "30px";
    cardRow.style.flexWrap = "wrap";
    cardRow.style.justifyContent = "center";
    container.appendChild(cardRow);

    const classes = [
      { id: "duelist", name: "Duelist", desc: "High mobility and rapid strike capabilities.", color: "#d4af37", icon: "⚔️", shadow: "rgba(212,175,55,0.2)" },
      { id: "vanguard", name: "Vanguard", desc: "Heavy shielding and defensive algorithms.", color: "#00E5FF", icon: "🛡️", shadow: "rgba(0,229,255,0.2)" },
      { id: "arcanist", name: "Arcanist", desc: "Long-range tactical energy projection.", color: "#8b5cf6", icon: "🪄", shadow: "rgba(139,92,246,0.2)" }
    ];

    const pathways = [
      { id: "shadow", name: "Shadow", desc: "Stealth protocols and critical burst optimization.", color: "#8b5cf6", icon: "🌑", shadow: "rgba(139,92,246,0.2)" },
      { id: "light", name: "Light", desc: "Restoration logic and structural shielding.", color: "#d4af37", icon: "☀️", shadow: "rgba(212,175,55,0.2)" },
      { id: "berserker", name: "Berserker", desc: "Unregulated output and thermal attacks.", color: "#ff4444", icon: "🔥", shadow: "rgba(255,68,68,0.2)" },
      { id: "nature", name: "Nature", desc: "Biometric healing and area denial systems.", color: "#22c55e", icon: "🌿", shadow: "rgba(34,197,94,0.2)" }
    ];

    const auras = [
        { id: "tyrant", name: "Tyrant", desc: "Suppresses local hostile operational capacity.", color: "#ff4444", icon: "💥", shadow: "rgba(255,68,68,0.2)" },
        { id: "sanctuary", name: "Sanctuary", desc: "Broadcasts continuous regeneration pulses.", color: "#00E5FF", icon: "🛡️", shadow: "rgba(0,229,255,0.2)" },
        { id: "void", name: "Void", desc: "Obscures signature and amplifies next strike.", color: "#8b5cf6", icon: "🥷", shadow: "rgba(139,92,246,0.2)" },
        { id: "storm", name: "Storm", desc: "Generates intermittent high-voltage discharges.", color: "#22c55e", icon: "🌪️", shadow: "rgba(34,197,94,0.2)" }
    ];

    let selectedClass = "";
    let selectedPathway = "";

    const renderOptions = (items: any[], step: number) => {
      cardRow.innerHTML = "";
      items.forEach(item => {
        const card = document.createElement("button");
        card.style.width = "clamp(240px, 80vw, 260px)";
        card.style.height = "auto";
        card.style.minHeight = "340px";
        card.style.background = "rgba(212, 175, 55, 0.05)";
        card.style.border = `1px solid ${item.color}`; 
        card.style.borderRadius = "4px";
        card.style.color = "var(--fui-text)"; 
        card.style.cursor = "pointer";
        card.style.padding = "25px"; 
        card.style.display = "flex"; 
        card.style.flexDirection = "column";
        card.style.transition = "all 0.2s ease";
        card.style.fontFamily = "'Nunito', sans-serif";
        card.style.boxShadow = `inset 0 0 20px ${item.shadow}`;

        card.onmouseover = () => { card.style.background = item.shadow; card.style.boxShadow = `0 0 20px ${item.shadow}`; };
        card.onmouseleave = () => { card.style.background = "rgba(212, 175, 55, 0.05)"; card.style.boxShadow = `inset 0 0 20px ${item.shadow}`; };
        card.onmousedown = () => { card.style.transform = "scale(0.98)"; };
        card.onmouseup = () => { card.style.transform = "scale(1)"; };

        card.innerHTML = `
            <div style="font-size: 50px; text-align: center; margin-bottom: 15px; filter: drop-shadow(0 0 10px ${item.color});">${item.icon}</div>
            <h2 style="color: ${item.color}; margin-top: 0; text-align: center; font-weight: 900; font-size: 22px; text-transform: uppercase; letter-spacing: 2px;">${item.name}</h2>
            <p style="font-size: 14px; font-weight: 700; line-height: 1.6; color: var(--fui-text-dim); flex-grow: 1; text-align: center; letter-spacing: 1px;">${item.desc}</p>
            <div style="font-weight: 900; font-size: 14px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.1); text-align: center; color: var(--fui-text); letter-spacing: 2px;">AUTHORIZE</div>
        `;
        
        card.onclick = () => {
          if (step === 1) {
            selectedClass = item.id;
            title.innerText = `DEFINE PRIMARY PATHWAY`;
            renderOptions(pathways, 2);
          } else if (step === 2) {
            selectedPathway = item.id;
            title.innerText = `SELECT AURA SIGNATURE`;
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
    if (!activeRoom) return;
    if (isEventInviteOpen) {
        closeAllModals();
        return;
    }
    
    closeAllModals();
    isEventInviteOpen = true;
    injectGlobalChunkyStyles();

    let modal = document.getElementById("event-invite-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "event-invite-modal";
        modal.className = "modal-chunky";
        modal.style.position = "fixed";
        modal.style.top = "50%"; 
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.padding = "30px";
        modal.style.zIndex = "4000";
        modal.style.width = "420px";
        modal.style.textAlign = "center";
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--fui-gold-dim); padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="margin:0; color:var(--fui-gold); font-size: 20px; font-weight: 900; letter-spacing: 2px;">🔥 ALERT: BREACH DETECTED</h2>
        <button id="close-event-invite-btn" class="btn-close-chunky">&times;</button>
      </div>
      <p style="color:var(--fui-text); font-size:14px; margin-bottom: 25px; font-weight: 700; letter-spacing: 1px; line-height: 1.5;">
        The <b style="color: var(--fui-cyan);">${eventName}</b> protocol is active. Authorize immediate tactical insertion?
      </p>
      <div style="display:flex; gap: 15px;">
          <button id="join-event-btn" class="btn-chunky btn-green" style="flex: 1; padding: 15px;">ENGAGE</button>
          <button id="decline-event-btn" class="btn-chunky btn-slate" style="flex: 1; padding: 15px;">IGNORE</button>
      </div>
    `;

    document.getElementById("close-event-invite-btn")!.onclick = () => {
        closeAllModals();
    };

    document.getElementById("decline-event-btn")!.onclick = () => {
        closeAllModals();
    };

    document.getElementById("join-event-btn")!.onclick = () => {
        activeRoom.send("teleport", { destination: targetZone }); 
        closeAllModals();
    };
}

export function openMirrorUI(activeRoom: any, keys: any) {
    if (!activeRoom) return;
    if (isMirrorUIOpen) {
        closeAllModals();
        return;
    }
    
    closeAllModals();
    isMirrorUIOpen = true;
    injectGlobalChunkyStyles();

    for (const key in keys) {
        keys[key as keyof typeof keys] = false;
    }

    let modal = document.getElementById("mirror-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "mirror-modal";
        modal.className = "modal-chunky";
        modal.style.position = "fixed"; 
        modal.style.top = "50%"; 
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)"; 
        modal.style.padding = "30px"; 
        modal.style.zIndex = "1000"; 
        modal.style.width = "400px";
        document.body.appendChild(modal);
    }

    const me = activeRoom.state.players.get(activeRoom.sessionId);
    if (!me) return;

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid var(--fui-gold-dim); padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="margin:0; color:var(--fui-cyan); font-size: 20px; font-weight: 900; letter-spacing: 2px;">✨ AESTHETIC OVERRIDE</h2>
        <button id="close-mirror-btn" class="btn-close-chunky">&times;</button>
      </div>
      <div style="display:flex; flex-direction:column; gap:15px; text-align: left;">
        
        <div class="chunky-panel">
            <label style="color:var(--fui-text); font-weight:900; display:block; margin-bottom:8px; font-size: 12px; letter-spacing: 1px;">CHASSIS TYPE</label>
            <select id="mirror-gender" style="width:100%; padding:10px; border-radius:4px; border:1px solid var(--fui-cyan); background:var(--fui-bg); color:white; font-family:'Nunito', sans-serif; font-weight:bold; outline:none;">
                <option value="body1" ${me.gender === 'body1' ? 'selected' : ''}>Standard Frame</option>
                <option value="body2" ${me.gender === 'body2' ? 'selected' : ''}>Slim Frame</option>
            </select>
        </div>

        <div class="chunky-panel">
            <label style="color:var(--fui-text); font-weight:900; display:block; margin-bottom:8px; font-size: 12px; letter-spacing: 1px;">PIGMENTATION</label>
            <input type="color" id="mirror-skin" value="${me.skinColor || '#ffccaa'}" style="width:100%; height:40px; border-radius:4px; border:1px solid var(--fui-cyan); background:var(--fui-bg); cursor:pointer;">
        </div>

        <div class="chunky-panel">
            <label style="color:var(--fui-text); font-weight:900; display:block; margin-bottom:8px; font-size: 12px; letter-spacing: 1px;">HAIR CONFIG</label>
            <select id="mirror-hairstyle" style="width:100%; padding:10px; border-radius:4px; border:1px solid var(--fui-cyan); background:var(--fui-bg); color:white; font-family:'Nunito', sans-serif; font-weight:bold; outline:none;">
                <option value="short" ${me.hairStyle === 'short' ? 'selected' : ''}>Short</option>
                <option value="long" ${me.hairStyle === 'long' ? 'selected' : ''}>Long</option>
                <option value="spiky" ${me.hairStyle === 'spiky' ? 'selected' : ''}>Spiky</option>
                <option value="ponytail" ${me.hairStyle === 'ponytail' ? 'selected' : ''}>Ponytail</option>
                <option value="bald" ${me.hairStyle === 'bald' ? 'selected' : ''}>Bald</option>
            </select>
        </div>

        <div class="chunky-panel">
            <label style="color:var(--fui-text); font-weight:900; display:block; margin-bottom:8px; font-size: 12px; letter-spacing: 1px;">HAIR TINT</label>
            <input type="color" id="mirror-haircolor" value="${me.hairColor || '#333333'}" style="width:100%; height:40px; border-radius:4px; border:1px solid var(--fui-cyan); background:var(--fui-bg); cursor:pointer;">
        </div>

        <div class="chunky-panel">
            <label style="color:var(--fui-text); font-weight:900; display:block; margin-bottom:8px; font-size: 12px; letter-spacing: 1px;">OPTIC TINT</label>
            <input type="color" id="mirror-eyecolor" value="${me.eyeColor || '#00aaff'}" style="width:100%; height:40px; border-radius:4px; border:1px solid var(--fui-cyan); background:var(--fui-bg); cursor:pointer;">
        </div>

        <button id="save-mirror-btn" class="btn-chunky btn-cyan" style="padding:15px; margin-top:10px;">APPLY OVERRIDES</button>
      </div>
    `;

    modal.style.display = "block";

    document.getElementById("close-mirror-btn")!.onclick = () => {
        closeAllModals();
    };

    document.getElementById("save-mirror-btn")!.onclick = () => {
        const gender = (document.getElementById("mirror-gender") as HTMLSelectElement).value;
        const skinColor = (document.getElementById("mirror-skin") as HTMLInputElement).value;
        const hairStyle = (document.getElementById("mirror-hairstyle") as HTMLSelectElement).value;
        const hairColor = (document.getElementById("mirror-haircolor") as HTMLInputElement).value;
        const eyeColor = (document.getElementById("mirror-eyecolor") as HTMLInputElement).value;

        activeRoom.send("updateAppearance", { gender, skinColor, hairStyle, hairColor, eyeColor });

        closeAllModals();
    };
}