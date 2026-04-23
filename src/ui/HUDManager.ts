import { ITEM_DB } from "../ItemDatabase";
import { distance } from "../game/CollisionSystem";
import { CRAFTING_RECIPES, STORE_RECIPES } from "../RecipeDatabase";

// --- EXPORTED HUD STATE ---
export let isWorldMapOpen = false;
export let myMapMarker: { x: number, z: number } | null = null;
export let isRoutingToMarker = false;
export let activeAttackIndicators: { x: number, z: number, timer: number }[] = [];
export let mazeTimerInterval: number | null = null;
export let dungeonTimerInterval: number | null = null; 

// --- EXPORTED UI STATE ---
export let isQuestUIOpen = false;
export let isTeleportUIOpen = false;
export let isCasinoUIOpen = false;
export let isInventoryUIOpen = false;
export let isChestUIOpen = false;
export let isShopUIOpen = false;
export let activeChestId: string | null = null;
export let activeStallType: string | null = null;

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
            <div class="neon-text-red hud-header" style="font-size: 24px; letter-spacing: 4px;">THE LABYRINTH COLLAPSES IN</div>
            <div id="maze-countdown" class="neon-text-red hud-header" style="font-size: 64px; font-weight: bold; color: white;">10:00</div>
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
            timerText.style.color = "#ff0000";
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
    const timeColor = timeLeftSeconds <= 60 ? "var(--neon-red)" : "#ffffff";

    ui.innerHTML = `
        <div class="hud-header" style="color: var(--neon-amber); font-size: 24px; letter-spacing: 2px; text-shadow: 0 0 10px var(--neon-amber);">WAVE ${wave} / ${maxWaves}</div>
        <div class="hud-header" style="color: ${timeColor}; font-size: 48px; font-weight: bold; text-shadow: 0 0 20px ${timeColor};">${m}:${s}</div>
        <div style="color: var(--neon-red); font-family: var(--font-body); font-size: 16px; font-weight: bold;"><i class="fa-solid fa-skull"></i> Enemies Remaining: ${enemiesLeft}</div>
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

// --- EXPORTED MODAL FUNCTIONS ---

export function openQuestUI(activeRoom: any, keys: any, playerName: string) {
    if (isQuestUIOpen || !activeRoom) return;
    isQuestUIOpen = true;

    for (const key in keys) keys[key as keyof typeof keys] = false;

    let modal = document.getElementById("quest-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "quest-modal";
        modal.style.position = "fixed"; 
        modal.style.top = "50%"; 
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)"; 
        modal.style.background = "rgba(20, 20, 25, 0.98)";
        modal.style.padding = "30px"; 
        modal.style.borderRadius = "12px"; 
        modal.style.border = "2px solid #00ffaa";
        modal.style.zIndex = "1000"; 
        modal.style.color = "white"; 
        modal.style.width = "500px";
        modal.style.boxShadow = "0 10px 40px rgba(0,0,0,0.8)";
        modal.style.fontFamily = "Arial, sans-serif";
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid #444; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="margin:0; color:#00ffaa; font-size: 24px;">Lord Protector's Request</h2>
        <button id="close-quest-btn" style="background:none; border:none; color:#ff5555; font-size:28px; cursor:pointer; font-weight:bold; line-height: 1;">&times;</button>
      </div>
      <div style="font-size: 16px; line-height: 1.6; color: #ddd; margin-bottom: 20px;">
        "Greetings, <span id="quest-player-name"></span>. The wilderness beyond these walls grows restless, and the Town of Beginnings requires your strength. Slay the beasts that encroach upon our borders and return to me."
      </div>
      <div style="background: #1a1a20; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #444;">
        <div style="font-weight: bold; color: #ffaa00; margin-bottom: 5px;">Objective:</div>
        <div style="color: #fff;">Defeat 5 Enemies in The Wilderness</div>
        <div style="font-weight: bold; color: #00aaff; margin-top: 10px; margin-bottom: 5px;">Rewards:</div>
        <div style="color: #fff;">250 Coins, 500 Experience Points</div>
      </div>
      <div style="display:flex; gap: 15px;">
          <button id="accept-quest-btn" style="flex: 1; padding: 15px; font-size: 16px; font-weight: bold; background: #00aa44; border: none; color: white; cursor:pointer; border-radius: 8px; transition: 0.2s;">Accept Quest</button>
          <button id="decline-quest-btn" style="flex: 1; padding: 15px; font-size: 16px; font-weight: bold; background: #aa2222; border: none; color: white; cursor:pointer; border-radius: 8px; transition: 0.2s;">Decline</button>
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
        // We leave this here so the button does something, but the state-tracker 
        // handles the actual onboarding tutorial flow.
        activeRoom.send("acceptQuest", { questId: "slime_hunt_1" });
        isQuestUIOpen = false;
        document.body.removeChild(modal!);
    };
}

export function openTeleportUI(activeRoom: any, keys: any) {
    if (isTeleportUIOpen || !activeRoom) return;
    isTeleportUIOpen = true;

    for (const key in keys) {
      keys[key as keyof typeof keys] = false;
    }

    let modal = document.getElementById("teleport-modal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "teleport-modal";
      modal.style.position = "fixed"; 
      modal.style.top = "50%"; 
      modal.style.left = "50%";
      modal.style.transform = "translate(-50%, -50%)"; 
      modal.style.background = "rgba(20, 20, 25, 0.98)";
      modal.style.padding = "30px"; 
      modal.style.borderRadius = "12px"; 
      modal.style.border = "2px solid #00aaff";
      modal.style.zIndex = "1000"; 
      modal.style.color = "white"; 
      modal.style.width = "400px"; 
      modal.style.boxShadow = "0 10px 40px rgba(0,0,0,0.8)";
      modal.style.fontFamily = "Arial, sans-serif";
      modal.style.textAlign = "center";
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid #444; padding-bottom: 15px; margin-bottom: 20px;">
        <h2 style="margin:0; color:#00aaff; font-size: 24px;">Fast Travel</h2>
        <button id="close-teleport-btn" style="background:none; border:none; color:#ff5555; font-size:28px; cursor:pointer; font-weight:bold; line-height: 1;">&times;</button>
      </div>
      <div style="display:flex; flex-direction:column; gap:15px;">
          <button id="tp-town" style="background: linear-gradient(135deg, #444, #222); border: 2px solid #ffaa00; padding: 15px; border-radius: 8px; color: white; font-size: 18px; font-weight: bold; cursor: pointer; transition: 0.2s;">🏰 Town of Beginnings</button>
          <button id="tp-elven" style="background: linear-gradient(135deg, #444, #222); border: 2px solid #00ffaa; padding: 15px; border-radius: 8px; color: white; font-size: 18px; font-weight: bold; cursor: pointer; transition: 0.2s;">✨ The Elven Kingdom</button>
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
                0% { transform: translateY(3px); }
                50% { transform: translateY(-3px); }
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
        modal.style.position = "fixed"; 
        modal.style.top = "50%"; 
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)"; 
        modal.style.background = "linear-gradient(135deg, #1a1a20, #0a0a0f)";
        modal.style.padding = "30px"; 
        modal.style.borderRadius = "16px"; 
        modal.style.border = "3px solid #ff0055";
        modal.style.zIndex = "1000"; 
        modal.style.color = "white"; 
        modal.style.width = "400px";
        modal.style.boxShadow = "0 0 50px rgba(255, 0, 85, 0.6)";
        modal.style.fontFamily = "Arial, sans-serif";
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
                <div id="2d-coin" style="width: 80px; height: 80px; border-radius: 50%; background: radial-gradient(circle, #ffd700, #b8860b); border: 4px solid #fff; box-shadow: 0 10px 20px rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; font-size: 36px; font-weight: bold; color: white; text-shadow: 2px 2px 0 #886000;">$</div>
            </div>`;
        customInputs = `
            <div style="margin: 15px 0; display:flex; justify-content:center; gap:10px;">
                <button id="btn-heads" style="flex:1; padding: 15px; font-size: 18px; font-weight: bold; background: #222; border: 2px solid #aaa; color: white; cursor:pointer; border-radius: 8px;">HEADS</button>
                <button id="btn-tails" style="flex:1; padding: 15px; font-size: 18px; font-weight: bold; background: #222; border: 2px solid #aaa; color: white; cursor:pointer; border-radius: 8px;">TAILS</button>
            </div>
        `;
    } else if (gameType === "Roulette") {
        visualArea = `
            <div style="height: 140px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
                <div id="2d-roulette" style="width: 120px; height: 120px; border-radius: 50%; border: 6px solid #e6dfcc; background: repeating-conic-gradient(#cc3333 0 18deg, #222 18deg 36deg); box-shadow: 0 5px 15px rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; position: relative;">
                    <div style="width: 80px; height: 80px; background: #111; border-radius: 50%; border: 2px solid #e6dfcc;"></div>
                    <div style="position: absolute; top: 5px; width: 10px; height: 10px; background: white; border-radius: 50%; box-shadow: 0 0 5px white;"></div>
                </div>
            </div>`;
        customInputs = `
            <select id="roulette-guess" style="width: 100%; padding: 10px; font-size: 18px; margin: 15px 0; background: #222; color: white; border: 2px solid #ff0055; border-radius: 8px;">
                <option value="red">Red (2x Payout)</option>
                <option value="black">Black (2x Payout)</option>
                <option value="0">Number 0 (35x Payout)</option>
                <option value="7">Number 7 (35x Payout)</option>
                <option value="13">Number 13 (35x Payout)</option>
                <option value="21">Number 21 (35x Payout)</option>
                <option value="36">Number 36 (35x Payout)</option>
            </select>
            <button id="btn-play" style="width: 100%; padding: 15px; font-size: 18px; font-weight: bold; background: #ff0055; border: none; color: white; cursor:pointer; border-radius: 8px; text-transform: uppercase;">Spin Wheel</button>
        `;
    } else if (gameType === "Slot Machine") {
        visualArea = `
            <div style="height: 100px; display: flex; align-items: center; justify-content: center;">
                <div style="background: #111; border: 4px solid #555; border-radius: 8px; padding: 10px; display: flex; gap: 15px; box-shadow: inset 0 0 20px black;">
                    <div id="2d-slot-1" style="width: 50px; height: 60px; background: #fff; border-radius: 4px; font-size: 36px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 5px 10px rgba(0,0,0,0.5);">🍒</div>
                    <div id="2d-slot-2" style="width: 50px; height: 60px; background: #fff; border-radius: 4px; font-size: 36px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 5px 10px rgba(0,0,0,0.5);">🍋</div>
                    <div id="2d-slot-3" style="width: 50px; height: 60px; background: #fff; border-radius: 4px; font-size: 36px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 5px 10px rgba(0,0,0,0.5);">💎</div>
                </div>
            </div>`;
        customInputs = `
            <button id="btn-play" style="width: 100%; padding: 20px; font-size: 24px; font-weight: bold; background: linear-gradient(to bottom, #ffaa00, #ff5500); border: none; color: black; cursor:pointer; border-radius: 12px; margin-top: 15px; text-transform: uppercase; box-shadow: 0 5px 0 #cc4400;">PULL LEVER</button>
        `;
    } else if (gameType === "Blackjack") {
        visualArea = `
            <div style="height: 120px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;">
                <div id="2d-bj-dealer" style="display: flex; gap: 5px; height: 45px;"></div>
                <div id="2d-bj-player" style="display: flex; gap: 5px; height: 45px;"></div>
            </div>`;
        customInputs = `
            <button id="btn-play" style="width: 100%; padding: 15px; font-size: 18px; font-weight: bold; background: #00aa44; border: none; color: white; cursor:pointer; border-radius: 8px; margin-top: 15px; text-transform: uppercase;">Deal Hand</button>
        `;
    }

    modal.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid #444; padding-bottom: 10px; margin-bottom: 15px;">
        <h2 style="margin:0; color:#ff0055; font-size: 24px; text-transform: uppercase; letter-spacing: 2px;">${gameType}</h2>
        <button id="close-casino-btn" style="background:none; border:none; color:#ff5555; font-size:28px; cursor:pointer; font-weight:bold; line-height: 1;">&times;</button>
      </div>
      
      <div style="font-size: 18px; color: #ffd700; font-weight: bold; margin-bottom: 15px;">
        Your Balance: <span id="casino-balance">${me.coins}</span> Coins
      </div>

      ${visualArea}
  
      <div style="background: #111; padding: 15px; border-radius: 8px; text-align: left; margin-top: 15px;">
        <label style="color: #aaa; font-weight: bold;">Bet Amount:</label>
        <input type="number" id="bet-amount" value="50" min="1" max="${me.coins}" style="width: 100%; padding: 10px; font-size: 18px; margin-top: 5px; background: #222; color: #00ffaa; border: 1px solid #444; border-radius: 4px; box-sizing: border-box;" />
      </div>
  
      ${customInputs}
  
      <div id="casino-result" style="margin-top: 20px; font-size: 18px; font-weight: bold; min-height: 24px; color: #fff;"></div>
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
                coin.innerText = "?";
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
                dealer.innerHTML = `<div class="dealing" style="width:30px; height:45px; background:white; border:1px solid black; border-radius:3px; display:flex; align-items:center; justify-content:center; color:black; font-weight:bold;">?</div>`;
                player.innerHTML = `<div class="dealing" style="width:30px; height:45px; background:white; border:1px solid black; border-radius:3px; display:flex; align-items:center; justify-content:center; color:black; font-weight:bold;">?</div>`;
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


// --- 1. OVERLAY CREATION ---
export function ensureOverlay(getActiveRoom: () => any, getActionContext: () => any): HTMLDivElement {
    
    if (!document.getElementById("hud-external-assets")) {
        const assetsContainer = document.createElement("div");
        assetsContainer.id = "hud-external-assets";
        assetsContainer.innerHTML = `
            <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
            <style>
                :root {
                    --bg-panel: rgba(10, 15, 20, 0.85);
                    --bg-panel-hover: rgba(20, 30, 40, 0.95);
                    --border-color: rgba(0, 170, 255, 0.3);
                    --neon-cyan: #00ffff;
                    --neon-blue: #00aaff;
                    --neon-magenta: #ff00aa;
                    --neon-green: #00ffaa;
                    --neon-amber: #ffaa00;
                    --neon-red: #ff4444;
                    --text-muted: #aaaaaa;
                    --font-header: 'Orbitron', sans-serif;
                    --font-body: 'Inter', sans-serif;
                }
                
                .hud-panel {
                    background: var(--bg-panel);
                    border: 1px solid var(--border-color);
                    border-radius: 8px;
                    backdrop-filter: blur(8px);
                    color: white;
                    font-family: var(--font-body);
                    padding: 15px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.5), inset 0 0 20px rgba(0, 170, 255, 0.05);
                    pointer-events: auto;
                }
                .hud-header { font-family: var(--font-header); text-transform: uppercase; }
                .hud-absolute-center { position: fixed; left: 50%; transform: translateX(-50%); text-align: center; pointer-events: none; z-index: 2000; }
                
                @keyframes hudPulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
                .animate-pulse { animation: hudPulse 1.5s infinite; }

                .text-cyan { color: var(--neon-cyan); }
                .text-blue { color: var(--neon-blue); }
                .text-green { color: var(--neon-green); }
                .text-amber { color: var(--neon-amber); }
                .text-red { color: var(--neon-red); }
                .text-magenta { color: var(--neon-magenta); }
                .text-muted { color: var(--text-muted); }
                .text-sm { font-size: 12px; }
                .text-md { font-size: 14px; }
                .text-lg { font-size: 16px; font-weight: 600; }
                .text-xl { font-size: 18px; font-weight: 700; }

                .hud-btn {
                    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2);
                    color: white; padding: 6px 12px; border-radius: 4px; cursor: pointer;
                    font-family: var(--font-header); font-size: 12px; transition: all 0.2s;
                    display: inline-flex; align-items: center; justify-content: center; gap: 6px;
                }
                .hud-btn:hover { background: rgba(0, 170, 255, 0.2); border-color: var(--neon-blue); box-shadow: 0 0 10px rgba(0, 170, 255, 0.3); }
                .hud-btn.btn-danger:hover { background: rgba(255, 68, 68, 0.2); border-color: var(--neon-red); box-shadow: 0 0 10px rgba(255, 68, 68, 0.3); }
                .hud-btn.btn-success:hover { background: rgba(0, 255, 170, 0.2); border-color: var(--neon-green); box-shadow: 0 0 10px rgba(0, 255, 170, 0.3); }
                
                .hud-input {
                    background: rgba(0,0,0,0.5); border: 1px solid #444; color: white;
                    padding: 6px; border-radius: 4px; font-family: var(--font-header);
                    width: 80px; outline: none; transition: border-color 0.2s;
                }
                .hud-input:focus { border-color: var(--neon-blue); }

                .btn-hack {
                    padding: 12px; background: linear-gradient(90deg, #002244, #0044aa);
                    border: 1px solid var(--neon-blue); color: var(--neon-cyan);
                    text-transform: uppercase; font-weight: bold; font-family: var(--font-header);
                    border-radius: 4px; cursor: pointer; letter-spacing: 2px;
                    box-shadow: 0 0 10px rgba(0, 170, 255, 0.2); transition: all 0.2s;
                }
                .btn-hack:hover:not(:disabled) { background: linear-gradient(90deg, #003366, #0066cc); box-shadow: 0 0 20px rgba(0, 170, 255, 0.5); color: white; }

                .resource-container { display: flex; align-items: center; gap: 8px; margin-bottom: 6px; }
                .resource-icon { width: 24px; text-align: center; font-size: 16px; text-shadow: 0 0 8px currentColor; }
                .resource-bar-wrapper { flex-grow: 1; height: 16px; background: rgba(0,0,0,0.7); border-radius: 3px; border: 1px solid #333; position: relative; overflow: hidden; }
                .resource-fill { height: 100%; transition: width 0.2s ease-out; }
                .fill-hp { background: linear-gradient(90deg, #880000, var(--neon-red)); box-shadow: 0 0 10px var(--neon-red); }
                .fill-mp { background: linear-gradient(90deg, #004488, var(--neon-blue)); box-shadow: 0 0 10px var(--neon-blue); }
                .fill-hunger { background: linear-gradient(90deg, #885500, var(--neon-amber)); box-shadow: 0 0 10px var(--neon-amber); }
                .resource-text { position: absolute; top: 0; left: 0; width: 100%; height: 100%; text-align: center; font-size: 10px; font-weight: bold; line-height: 16px; text-shadow: 1px 1px 0 #000; font-family: var(--font-header); letter-spacing: 1px; }

                .roster-hp-bg { width: 100%; height: 6px; background: rgba(0,0,0,0.8); border: 1px solid #333; border-radius: 3px; overflow: hidden; margin-top: 4px; }
                .roster-hp-fill { height: 100%; transition: width 0.2s; }

                .hud-key {
                    background: linear-gradient(180deg, #444, #222);
                    border: 1px solid #111;
                    border-bottom: 3px solid #000;
                    border-radius: 4px;
                    padding: 2px 8px;
                    font-family: var(--font-header);
                    font-size: 11px;
                    color: #fff;
                    display: inline-block;
                    margin: 0 2px;
                    text-shadow: 1px 1px 0 #000;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.5);
                }
                .controls-group { display: flex; flex-direction: column; gap: 8px; align-items: flex-end; }
                .controls-row { display: flex; align-items: center; gap: 6px; }

                .zone-popup {
                    position: fixed; top: 35%; left: 50%; transform: translate(-50%, -50%);
                    text-align: center; z-index: 2000; pointer-events: none;
                    opacity: 0; transition: opacity 0.5s ease-in-out, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
                    background: radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 70%);
                    padding: 40px 80px; border-radius: 50%;
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
                    gap: 4px;
                    pointer-events: none;
                    z-index: 1000;
                }
                .event-message {
                    background: rgba(0, 0, 0, 0.6);
                    color: white;
                    padding: 4px 8px;
                    border-radius: 2px;
                    font-family: var(--font-body);
                    font-size: 13px;
                    font-weight: 600;
                    text-shadow: 1px 1px 0px #000;
                    animation: fadeOutEvent 6s forwards;
                    border-left: 3px solid rgba(255,255,255,0.5);
                }
                .event-join { border-left-color: var(--neon-cyan); color: var(--neon-cyan); }
                .event-kill { border-left-color: var(--neon-red); color: var(--neon-red); }
                .event-win { border-left-color: var(--neon-amber); color: var(--neon-amber); font-weight: bold; }
                .event-info { border-left-color: var(--neon-green); color: var(--neon-green); }

                @keyframes fadeOutEvent {
                    0%, 80% { opacity: 1; transform: translateX(0); }
                    100% { opacity: 0; transform: translateX(-10px); }
                }

                #event-pointers-container {
                    position: absolute; top: 0; left: 0; width: 100vw; height: 100vh;
                    pointer-events: none; overflow: hidden; z-index: 100;
                }
                .realm-event-pointer {
                    position: absolute; display: none; transform-origin: center center;
                    will-change: transform, left, top; z-index: 100;
                }
                .pointer-arrow {
                    width: 0; height: 0;
                    border-top: 10px solid transparent; border-bottom: 10px solid transparent;
                    border-left: 20px solid var(--neon-amber);
                    filter: drop-shadow(0 0 8px var(--neon-amber));
                }
                .pointer-dist {
                    position: absolute; top: 25px; left: -15px; color: var(--neon-amber);
                    font-family: var(--font-header); font-weight: bold; font-size: 14px;
                    text-shadow: 1px 1px 2px black; white-space: nowrap;
                }

                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
                ::-webkit-scrollbar-thumb { background: rgba(0, 170, 255, 0.5); border-radius: 3px; }
                ::-webkit-scrollbar-thumb:hover { background: var(--neon-blue); }
            </style>
        `;
        document.head.appendChild(assetsContainer);
    }

    let overlay = document.getElementById("overlay") as HTMLDivElement | null;
    if (!overlay) {
        overlay = document.createElement("div"); 
        overlay.id = "overlay";
        overlay.style.position = "fixed"; 
        overlay.style.top = "15px"; 
        overlay.style.left = "15px";
        overlay.style.display = "flex";
        overlay.style.flexDirection = "column";
        overlay.style.gap = "10px";
        overlay.style.zIndex = "20";
        overlay.style.pointerEvents = "none";

        const infoPanel = document.createElement("div");
        infoPanel.id = "hud-info-panel";
        infoPanel.className = "hud-panel";
        
        const textDiv = document.createElement("div");
        textDiv.id = "hud-text";
        infoPanel.appendChild(textDiv);
        overlay.appendChild(infoPanel);

        const rosterDiv = document.createElement("div");
        rosterDiv.id = "team-roster";
        rosterDiv.className = "hud-panel";
        rosterDiv.style.display = "none"; 
        overlay.appendChild(rosterDiv);

        document.body.appendChild(overlay);

        let playerVitals = document.getElementById("player-vitals");
        if (!playerVitals) {
            playerVitals = document.createElement("div");
            playerVitals.id = "player-vitals";
            playerVitals.style.position = "fixed";
            playerVitals.style.top = "20px";
            playerVitals.style.left = "20px";
            playerVitals.style.display = "none"; 
            document.body.appendChild(playerVitals);
        }

        let familiarFrame = document.getElementById("familiar-frame");
        if (!familiarFrame) {
            familiarFrame = document.createElement("div");
            familiarFrame.id = "familiar-frame";
            familiarFrame.style.position = "fixed";
            familiarFrame.style.top = "160px";
            familiarFrame.style.left = "30px";
            familiarFrame.style.display = "none";
            familiarFrame.style.flexDirection = "column";
            familiarFrame.style.gap = "4px";
            familiarFrame.style.transition = "opacity 0.3s";
            familiarFrame.style.zIndex = "25";
            familiarFrame.innerHTML = `
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div id="fam-icon" style="width: 30px; height: 30px; background: rgba(10,10,20,0.8); border: 1px solid #a0f; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 0 8px #a0f;">🐉</div>
                    <div id="fam-name" style="color: #ddddff; font-family: Arial; font-weight: bold; font-size: 14px; text-shadow: 1px 1px 2px #000; text-transform: capitalize;">Familiar</div>
                </div>
                <div style="width: 150px; background: rgba(0,0,0,0.6); border: 1px solid #444; border-radius: 4px; padding: 2px; position: relative;">
                    <div id="fam-hp-bar" style="width: 100%; height: 8px; background: #a0f; border-radius: 2px; transition: width 0.2s;"></div>
                    <div id="fam-status-text" style="position: absolute; top: -2px; left: 0; width: 100%; text-align: center; color: white; font-size: 10px; font-weight: bold; text-shadow: 1px 1px 1px #000;"></div>
                </div>
            `;
            document.body.appendChild(familiarFrame);
        }

        let buffContainer = document.getElementById("buff-container");
        if (!buffContainer) {
            buffContainer = document.createElement("div");
            buffContainer.id = "buff-container";
            buffContainer.style.position = "fixed";
            buffContainer.style.top = "240px";
            buffContainer.style.left = "20px";
            buffContainer.style.display = "flex";
            buffContainer.style.flexWrap = "wrap";
            buffContainer.style.gap = "5px";
            buffContainer.style.maxWidth = "300px";
            buffContainer.style.zIndex = "25";
            document.body.appendChild(buffContainer);
        }

        let globalEventBanner = document.getElementById("global-event-banner");
        if (!globalEventBanner) {
            globalEventBanner = document.createElement("div");
            globalEventBanner.id = "global-event-banner";
            globalEventBanner.style.position = "fixed";
            globalEventBanner.style.top = "20px";
            globalEventBanner.style.left = "50%";
            globalEventBanner.style.transform = "translateX(-50%)";
            globalEventBanner.style.display = "none";
            globalEventBanner.style.background = "rgba(20, 5, 5, 0.8)";
            globalEventBanner.style.border = "1px solid #ff4444";
            globalEventBanner.style.padding = "10px 20px";
            globalEventBanner.style.borderRadius = "8px";
            globalEventBanner.style.color = "#ffaaaa";
            globalEventBanner.style.fontFamily = "Arial";
            globalEventBanner.style.textAlign = "center";
            globalEventBanner.style.boxShadow = "0 0 15px rgba(255, 0, 0, 0.4)";
            globalEventBanner.style.zIndex = "50";
            
            globalEventBanner.innerHTML = `
                <div style="font-size: 12px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase;">Next World Event</div>
                <div id="global-event-name" style="font-size: 18px; font-weight: bold; color: #ff4444; margin: 5px 0;">The Labyrinth</div>
                <div id="global-event-timer" style="font-size: 16px; font-family: monospace;">00:00</div>
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
            interactionPrompt.style.background = "rgba(0, 0, 0, 0.7)";
            interactionPrompt.style.border = "2px solid #fff";
            interactionPrompt.style.padding = "8px 16px";
            interactionPrompt.style.borderRadius = "8px";
            interactionPrompt.style.color = "white";
            interactionPrompt.style.fontFamily = "Arial";
            interactionPrompt.style.fontWeight = "bold";
            interactionPrompt.style.fontSize = "18px";
            interactionPrompt.style.boxShadow = "0 0 10px rgba(255,255,255,0.5)";
            interactionPrompt.style.zIndex = "50";
            interactionPrompt.innerText = "Press [F] to Interact";
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
        topRightDiv.style.top = "15px";
        topRightDiv.style.right = "15px";
        topRightDiv.style.zIndex = "20";
        topRightDiv.style.pointerEvents = "none";
        document.body.appendChild(topRightDiv);

        const minimapContainer = document.createElement("div");
        minimapContainer.id = "minimap-container";
        minimapContainer.style.position = "fixed";
        minimapContainer.style.top = "70px"; 
        minimapContainer.style.right = "15px";
        minimapContainer.style.width = "180px";
        minimapContainer.style.height = "180px";
        minimapContainer.style.borderRadius = "50%"; 
        minimapContainer.style.border = "2px solid var(--neon-blue)";
        minimapContainer.style.overflow = "hidden";
        minimapContainer.style.boxShadow = "0 5px 15px rgba(0,0,0,0.8), inset 0 0 20px rgba(0, 170, 255, 0.2)";
        minimapContainer.style.backgroundColor = "var(--bg-panel)";
        minimapContainer.style.display = "none"; 
        minimapContainer.style.zIndex = "15";

        const minimapCanvas = document.createElement("canvas");
        minimapCanvas.id = "minimap-canvas";
        minimapCanvas.width = 180;
        minimapCanvas.height = 180;
        minimapContainer.appendChild(minimapCanvas);
        
        const compassN = document.createElement("div");
        compassN.className = "hud-header text-amber";
        compassN.innerText = "N";
        compassN.style.position = "absolute";
        compassN.style.top = "4px";
        compassN.style.left = "50%";
        compassN.style.transform = "translateX(-50%)";
        compassN.style.fontSize = "14px";
        minimapContainer.appendChild(compassN);

        document.body.appendChild(minimapContainer);

        let coordDiv = document.getElementById("hud-coords");
        if (!coordDiv) {
            coordDiv = document.createElement("div");
            coordDiv.id = "hud-coords";
            coordDiv.className = "hud-header text-muted";
            coordDiv.style.position = "fixed";
            coordDiv.style.top = "270px"; 
            coordDiv.style.right = "15px";
            coordDiv.style.fontSize = "12px";
            coordDiv.style.textAlign = "right";
            coordDiv.style.zIndex = "20";
            coordDiv.style.pointerEvents = "none";
            document.body.appendChild(coordDiv);
        }

        let questTracker = document.getElementById("quest-tracker");
        if (!questTracker) {
            questTracker = document.createElement("div");
            questTracker.id = "quest-tracker";
            questTracker.className = "hud-panel";
            questTracker.style.position = "fixed";
            questTracker.style.top = "310px"; 
            questTracker.style.right = "15px";
            questTracker.style.width = "220px";
            questTracker.style.display = "none";
            questTracker.style.zIndex = "20";
            questTracker.style.pointerEvents = "none";
            
            questTracker.innerHTML = `
                <div class="hud-header text-amber" style="font-size: 14px; border-bottom: 1px solid #444; padding-bottom: 5px; margin-bottom: 8px;">
                    <i class="fa-solid fa-scroll"></i> Active Quest
                </div>
                <div id="quest-text" class="text-sm" style="color: #fff; line-height: 1.4;"></div>
            `;
            document.body.appendChild(questTracker);
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
            teamModal.className = "hud-panel hud-absolute-center";
            teamModal.style.top = "50%";
            teamModal.style.transform = "translate(-50%, -50%)";
            teamModal.style.width = "400px";
            teamModal.style.display = "none";
            teamModal.style.zIndex = "3000";
            teamModal.style.pointerEvents = "auto";
            teamModal.innerHTML = `
                <div class="hud-header text-blue text-xl" style="margin-bottom: 15px; border-bottom: 1px solid #333; padding-bottom: 10px;">
                    <i class="fa-solid fa-users"></i> Team Management
                </div>
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    <button id="btn-modal-create-team" class="btn-hack" style="background: linear-gradient(90deg, #002244, #0044aa); border-color: var(--neon-blue); color: white;">
                        <i class="fa-solid fa-plus"></i> Form New Team
                    </button>
                    <div style="display: flex; gap: 8px;">
                        <input type="number" id="modal-join-team-id" class="hud-input" placeholder="Team ID..." style="flex-grow: 1;">
                        <button id="btn-modal-join-team" class="hud-btn btn-success"><i class="fa-solid fa-right-to-bracket"></i> Join Team</button>
                    </div>
                    <button id="btn-modal-leave-team" class="hud-btn btn-danger" style="width: 100%; justify-content: center; padding: 10px;">
                        <i class="fa-solid fa-right-from-bracket"></i> Leave Current Team
                    </button>
                </div>
                <div class="text-muted text-sm" style="text-align: center; margin-top: 15px;">Press [ESC] to close</div>
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
            craftModal.className = "hud-panel hud-absolute-center";
            craftModal.style.top = "50%";
            craftModal.style.transform = "translate(-50%, -50%)";
            craftModal.style.width = "450px";
            craftModal.style.maxHeight = "80vh";
            craftModal.style.overflowY = "auto";
            craftModal.style.display = "none";
            craftModal.style.zIndex = "3000";
            craftModal.style.pointerEvents = "auto";
            craftModal.style.boxShadow = "0 10px 50px rgba(0,0,0,0.9), 0 0 30px rgba(255, 170, 0, 0.2)";
            craftModal.style.border = "2px solid var(--neon-amber)";

            craftModal.innerHTML = `
                <div style="padding-bottom: 15px; border-bottom: 1px solid #444; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: var(--bg-panel); z-index: 10;">
                    <h2 class="hud-header text-amber" style="margin: 0; letter-spacing: 2px;"><i class="fa-solid fa-hammer"></i> The Anvil & Forge</h2>
                    <button id="close-craft-modal" style="background: none; border: none; color: var(--neon-red); font-size: 24px; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div id="crafting-recipe-list" style="display: flex; flex-direction: column; gap: 15px; margin-top: 15px;">
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
        worldMapContainer.className = "hud-panel";
        worldMapContainer.style.position = "fixed";
        worldMapContainer.style.top = "50%";
        worldMapContainer.style.left = "50%";
        worldMapContainer.style.transform = "translate(-50%, -50%)";
        worldMapContainer.style.width = "800px";
        worldMapContainer.style.height = "800px";
        worldMapContainer.style.border = "2px solid var(--neon-blue)";
        worldMapContainer.style.boxShadow = "0 10px 50px rgba(0,0,0,0.9), 0 0 30px rgba(0, 170, 255, 0.2)";
        worldMapContainer.style.zIndex = "1000";
        worldMapContainer.style.display = "none";

        worldMapContainer.innerHTML = `
            <div style="padding-bottom: 15px; border-bottom: 1px solid #444; display: flex; justify-content: space-between; align-items: center;">
                <h2 class="hud-header text-blue" style="margin: 0; letter-spacing: 2px;"><i class="fa-solid fa-globe"></i> WORLD MAP</h2>
                <div class="text-muted text-sm">
                    <i class="fa-solid fa-mouse-pointer"></i> Left Click: Teleport | <i class="fa-solid fa-location-crosshairs"></i> Right Click: Set Route
                </div>
                <button id="close-world-map" style="background: none; border: none; color: var(--neon-red); font-size: 28px; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
            </div>
        `;

        const worldCanvas = document.createElement("canvas");
        worldCanvas.id = "world-map-canvas";
        worldCanvas.width = 760;
        worldCanvas.height = 700;
        worldCanvas.style.marginTop = "15px";
        worldCanvas.style.border = "1px solid #333";
        worldCanvas.style.cursor = "crosshair";
        worldCanvas.style.background = "rgba(0,0,0,0.5)";
        worldCanvas.style.borderRadius = "4px";
        
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
            storePopup.style.border = "2px solid var(--neon-amber)";
            storePopup.style.padding = "15px 30px";
            storePopup.style.boxShadow = "0 0 20px rgba(255, 170, 0, 0.2)";
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
        auraDiv.style.padding = "8px 20px";
        auraDiv.style.borderRadius = "20px";
        auraDiv.style.border = "1px solid var(--neon-blue)";
        auraDiv.style.background = "linear-gradient(90deg, rgba(0, 30, 60, 0.9), rgba(0, 60, 90, 0.9))";
        bottomCenterContainer.appendChild(auraDiv);

        const resourceDiv = document.createElement("div");
        resourceDiv.id = "hud-resources";
        resourceDiv.style.width = "100%";
        bottomCenterContainer.appendChild(resourceDiv);

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
            medUI.className = "hud-panel hud-absolute-center";
            medUI.style.top = "20%";
            medUI.style.width = "600px";
            medUI.style.padding = "30px";
            medUI.style.border = "2px solid var(--neon-blue)";
            medUI.style.boxShadow = "0 0 40px rgba(0, 170, 255, 0.2)";
            medUI.style.display = "none"; 
            
            medUI.innerHTML = `
                <h2 class="hud-header text-blue" style="margin-top: 0; letter-spacing: 2px;"><i class="fa-solid fa-om"></i> MENTAL FOCUS</h2>
                <p id="med-status" class="text-muted text-sm" style="margin-bottom: 20px;">Clear your mind and fill in the missing data. Press [ESC] to stop.</p>
                <div id="med-question-container" style="font-size: 20px; color: #ffffff; line-height: 1.8;"></div>
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
                <button id="btn-harness-mana" class="btn-hack" style="display: none; width: auto; font-size: 14px; padding: 10px 20px; border-radius: 6px;">
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
                    <div class="controls-row" id="ctrl-buy-land" style="display: none;"><span class="text-muted text-sm" style="color: var(--neon-green);">Buy Land</span> <span class="hud-key">B</span></div>
                    <div class="controls-row" id="ctrl-build-mode" style="display: none;"><span class="text-muted text-sm" style="color: var(--neon-green);">Build / Deco Mode</span> <span class="hud-key">V</span></div>
                    <div class="controls-row"><span class="text-muted text-sm">Inventory</span> <span class="hud-key">I</span></div>
                    <div class="controls-row"><span class="text-muted text-sm">Map</span> <span class="hud-key">M</span></div>
                    <div class="controls-row"><span class="text-muted text-sm">Fast Travel</span> <span class="hud-key">T</span></div>
                    <div class="controls-row" id="ctrl-meditate" style="display: none;"><span class="text-muted text-sm">Meditate</span> <span class="hud-key">Z</span></div>
                    <div class="controls-row"><span class="text-muted text-sm">Team Manager</span> <span class="hud-key">ESC</span></div>
                </div>
                <button id="btn-toggle-controls" class="hud-btn" style="margin-top: 5px; font-size: 10px; padding: 4px 8px; width: 100%;">
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
    isLocallyWolf: boolean  // <--- Add this line back in!
) {
    if (!me || !activeRoom) return;
    const state = activeRoom.state;

    const eventDiv = document.getElementById("hud-global-event");
    if (eventDiv && nextEventTargetTime > 0) {
        const timeLeftSeconds = Math.max(0, Math.floor((nextEventTargetTime - Date.now()) / 1000));
        const m = Math.floor(timeLeftSeconds / 60).toString().padStart(2, "0");
        const s = (timeLeftSeconds % 60).toString().padStart(2, "0");
        
        if (activeScene && (
            activeScene.constructor.name === "MazeScene" || 
            activeScene.constructor.name === "DungeonScene" || 
            activeScene.constructor.name === "UnderworldScene"
        )) {
            eventDiv.style.display = "none";
        } else {
            eventDiv.style.display = "block";
            const timeClass = timeLeftSeconds <= 60 ? 'text-red animate-pulse' : 'text-green';
            eventDiv.innerHTML = `<span class="hud-header text-amber"><i class="fa-solid fa-star"></i> Next Event:</span> <b>${nextEventName}</b> <span style="margin: 0 8px; color: #555;">|</span> <span class="hud-header ${timeClass}" style="font-size: 18px;">${m}:${s}</span>`;
        }
    } else if (eventDiv) {
        eventDiv.style.display = "none";
    }

    const rosterDiv = document.getElementById("team-roster");
    if (rosterDiv) {
        if (me.teamId && me.teamId > 0) {
            rosterDiv.style.display = "block";
            let rosterHTML = `<div class="hud-header text-blue text-sm" style="margin-bottom: 10px;"><i class="fa-solid fa-shield-halved"></i> Team ${me.teamId} Roster</div>`;
            
            const teamMembers: any[] = [];
            state.players.forEach((p: any) => {
                if (p.teamId === me.teamId) {
                    teamMembers.push(p);
                }
            });

            teamMembers.sort((a, b) => (b.isTeamLeader ? 1 : 0) - (a.isTeamLeader ? 1 : 0));

            teamMembers.forEach(member => {
                const hpPercent = Math.max(0, Math.min(100, (member.hp / member.maxHp) * 100));
                const hpColor = hpPercent > 50 ? "var(--neon-green)" : (hpPercent > 20 ? "var(--neon-amber)" : "var(--neon-red)");
                const leaderIcon = member.isTeamLeader ? `<i class="fa-solid fa-crown text-amber"></i> ` : "";
                const isMe = member.sessionId === me.sessionId;
                
                rosterHTML += `
                    <div style="margin-bottom: 10px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px; font-size: 13px;">
                            <span style="font-weight: 600; color: ${isMe ? 'var(--neon-amber)' : 'white'};">${leaderIcon}${member.name}</span>
                            <span class="text-muted text-sm hud-header">Lv.${member.level}</span>
                        </div>
                        <div class="roster-hp-bg">
                            <div class="roster-hp-fill" style="width: ${hpPercent}%; background: ${hpColor}; box-shadow: 0 0 5px ${hpColor};"></div>
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
                tacAlert.style.boxShadow = isAmbushed ? "inset 0 0 100px rgba(255, 68, 68, 0.4)" : "inset 0 0 100px rgba(255, 0, 0, 0)";
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

            context.fillStyle = "rgba(100, 100, 100, 0.4)";
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
                context.fillStyle = "var(--neon-green)";
                context.shadowBlur = 5; context.shadowColor = "var(--neon-green)";
                state.lootItems.forEach((loot: any) => {
                    const dx = loot.x - camX;
                    const dy = loot.y - camY;
                    if (isWorld || Math.sqrt(dx*dx + dy*dy) <= radius) {
                        context.beginPath();
                        context.arc(cx + (dx * scale), cy + (dy * scale), isWorld ? 4 : 2.5, 0, Math.PI * 2);
                        context.fill();
                    }
                });
                context.shadowBlur = 0;
            }

            if (tacRank >= 1 && state.enemies) {
                state.enemies.forEach((enemy: any) => {
                    const dx = enemy.x - camX;
                    const dy = enemy.y - camY;
                    
                    if (isWorld || Math.sqrt(dx*dx + dy*dy) <= radius) {
                        const dotSize = (tacRank >= 2 && enemy.maxHp > 150) ? (isWorld ? 8 : 4) : (isWorld ? 4 : 2);
                        context.fillStyle = (tacRank >= 2 && enemy.maxHp > 150) ? "var(--neon-amber)" : "var(--neon-red)";
                        context.shadowBlur = 5; context.shadowColor = context.fillStyle;
                        
                        context.beginPath();
                        context.arc(cx + (dx * scale), cy + (dy * scale), dotSize, 0, Math.PI * 2);
                        context.fill();
                        context.shadowBlur = 0;
                    }
                });
            }

            if (myMapMarker) {
                const mdx = myMapMarker.x - camX;
                const mdy = myMapMarker.z - camY;
                
                if (isRoutingToMarker && wayRank >= 5) {
                    const pdx = localPlayerPos.x - camX;
                    const pdy = localPlayerPos.y - camY;
                    
                    context.strokeStyle = "rgba(0, 170, 255, 0.5)";
                    context.lineWidth = isWorld ? 3 : 2;
                    context.setLineDash([5, 5]);
                    context.beginPath();
                    context.moveTo(cx + (pdx * scale), cy + (pdy * scale));
                    context.lineTo(cx + (mdx * scale), cy + (mdy * scale));
                    context.stroke();
                    context.setLineDash([]);
                }

                if (isWorld || Math.sqrt(mdx*mdx + mdy*mdy) <= radius) {
                    context.fillStyle = "var(--neon-blue)";
                    context.shadowBlur = 10; context.shadowColor = "var(--neon-blue)";
                    context.beginPath();
                    context.arc(cx + (mdx * scale), cy + (mdy * scale) - 5, isWorld ? 8 : 4, 0, Math.PI * 2);
                    context.fill();
                    context.beginPath();
                    context.moveTo(cx + (mdx * scale), cy + (mdy * scale));
                    context.lineTo(cx + (mdx * scale) - (isWorld ? 8 : 4), cy + (mdy * scale) - 5);
                    context.lineTo(cx + (mdx * scale) + (isWorld ? 8 : 4), cy + (mdy * scale) - 5);
                    context.fill();
                    context.shadowBlur = 0;
                }
            }

            const pdx = localPlayerPos.x - camX;
            const pdy = localPlayerPos.y - camY;
            
            context.save();
            context.translate(cx + (pdx * scale), cy + (pdy * scale));
            const angle = Math.atan2(lastFacingDy, lastFacingDx);
            context.rotate(angle); 
            
            context.fillStyle = "#ffffff";
            context.shadowBlur = 5; context.shadowColor = "#ffffff";
            const as = isWorld ? 2.0 : 1.0;
            context.beginPath();
            context.moveTo(5 * as, 0); 
            context.lineTo(-4 * as, 4 * as); 
            context.lineTo(-2 * as, 0); 
            context.lineTo(-4 * as, -4 * as); 
            context.closePath();
            context.fill();
            context.shadowBlur = 0;

            if (tacRank >= 5 && activeAttackIndicators.length > 0) {
                context.strokeStyle = "rgba(255, 68, 68, 0.8)";
                context.lineWidth = 2;
                activeAttackIndicators.forEach(ind => {
                    const targetAng = Math.atan2(ind.z - localPlayerPos.y, ind.x - localPlayerPos.x) - angle;
                    context.beginPath();
                    context.arc(0, 0, 15 * as, targetAng - 0.2, targetAng + 0.2);
                    context.stroke();
                });
            }
            context.restore();

            if (!isWorld) {
                const gradient = context.createRadialGradient(cx, cy, cw/4, cx, cy, cw/2);
                gradient.addColorStop(0, "rgba(0,0,0,0)");
                gradient.addColorStop(1, "rgba(10,15,20,0.9)");
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
                mapContainer.style.borderColor = wayRank >= 3 ? "var(--neon-blue)" : "#444";
                const mapRadius = wayRank >= 2 ? 70.0 : 30.0; 
                renderMap(mapCanvas, mapRadius, false);
            } else {
                mapContainer.style.display = "none";
            }
        }
    }

    const slot = document.getElementById("equipped-slot");
    if (slot) {
        if (me.equippedItem) {
            const dbItem = ITEM_DB[me.equippedItem];
            const icon = dbItem ? dbItem.icon : "📦"; 
            slot.innerHTML = `
                <div class="hotbar-slot" style="border: 2px solid var(--neon-amber);">
                    <div class="hotbar-key">1</div>
                    <span id="slot-icon-1" class="hotbar-icon">${icon}</span>
                    <div class="hotbar-label" style="color: var(--neon-amber);">${me.equippedItem}</div>
                </div>
            `;
        } else {
            slot.innerHTML = `
                <div class="hotbar-slot" style="border: 2px solid #555;">
                    <div class="hotbar-key">1</div>
                    <span id="slot-icon-1" class="hotbar-icon" style="color: #aaa;"><i class="fa-solid fa-hand-fist"></i></span>
                    <div class="hotbar-label">FIST</div>
                </div>
            `;
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

    const resourceDiv = document.getElementById("hud-resources");
    if (resourceDiv) {
        const generateBar = (current: number, max: number, type: string, iconClass: string) => {
            const safeMax = max || 100; 
            const safeCurrent = current !== undefined ? current : 100;
            const pct = Math.max(0, Math.min(100, (safeCurrent / safeMax) * 100));
            return `
                <div class="resource-container">
                    <div class="resource-icon ${type === 'hp' ? 'text-red' : type === 'mp' ? 'text-blue' : 'text-amber'}"><i class="${iconClass}"></i></div>
                    <div class="resource-bar-wrapper">
                        <div class="resource-fill fill-${type}" style="width: ${pct}%"></div>
                        <div class="resource-text">${Math.floor(safeCurrent)} / ${safeMax}</div>
                    </div>
                </div>
            `;
        };

        const manaHtml = generateBar(me.mp, me.maxMp, "mp", "fa-solid fa-bolt"); 
        const healthHtml = generateBar(me.hp, me.maxHp, "hp", "fa-solid fa-heart");
        const hungerHtml = generateBar(me.hunger, me.maxHunger, "hunger", "fa-solid fa-drumstick-bite"); 

        resourceDiv.innerHTML = `
            <div style="display: flex; flex-direction: column; width: 100%;">
                <div style="display: flex; gap: 10px;">
                    <div style="flex: 1;">${healthHtml}</div>
                    <div style="flex: 1;">${manaHtml}</div>
                </div>
                <div style="width: 50%; margin: 0 auto;">${hungerHtml}</div>
            </div>
        `;
    }

    const topRightDiv = document.getElementById("hud-top-right");
    if (topRightDiv) {
        const rankColorMap: Record<string, string> = {
            "Iron": "#a19d94", "Bronze": "#cd7f32", "Silver": "#c0c0c0", "Gold": "#ffd700", "Diamond": "var(--neon-cyan)"
        };
        const rCol = rankColorMap[me.rank] || "#a19d94";
        
        topRightDiv.innerHTML = `
            <div class="hud-panel" style="padding: 10px 15px; display: flex; gap: 15px; align-items: center; border-color: ${rCol};">
                <span class="hud-header" style="color: ${rCol}; font-size: 16px;"><i class="fa-solid fa-medal"></i> ${me.rank} <span style="color: white; font-size: 12px;">(Lv.${me.level})</span></span>
                <span class="hud-header text-amber" style="font-size: 16px;"><i class="fa-solid fa-coins"></i> ${me.coins}</span>
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
                famHpBar.style.background = "#a0f";
                
                if (familiar.isDetached) {
                    famStatus.innerText = "Deployed";
                    famStatus.style.color = "#ffaa00";
                } else if (familiar.action === "attacking") {
                    famStatus.innerText = "Attacking";
                    famStatus.style.color = "#ff4444";
                } else {
                    famStatus.innerText = ""; 
                }
            } else {
                famHpBar.style.width = `100%`;
                famHpBar.style.background = "#444"; 
                famStatus.style.color = "#ff4444";
                
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

    const isTownScene = activeScene && activeScene.constructor.name === "TownScene";
    const isOutsideTown = isTownScene && activeScene.isOutsideTown(localPlayerPos.x, localPlayerPos.y);
    const isSafeZone = isTownScene && !isOutsideTown;
    
    let biomeName = "The Wilderness";
    let biomeIcon = "fa-tree";
    let biomeColor = "var(--neon-green)";
    
    if (activeScene && activeScene.constructor.name === "MazeScene") {
        biomeName = "The Labyrinth"; biomeIcon = "fa-dungeon"; biomeColor = "var(--neon-magenta)";
    } else if (activeScene && activeScene.constructor.name === "DungeonScene") {
        biomeName = "The Goblin Cave"; biomeIcon = "fa-skull"; biomeColor = "var(--neon-amber)";
    } else if (activeScene && activeScene.constructor.name === "UnderworldScene") {
        biomeName = "The Underworld (PvP Arena)"; biomeIcon = "fa-skull-crossbones"; biomeColor = "var(--neon-red)";
    } else if (isSafeZone) {
        biomeName = "Town of Beginnings"; biomeIcon = "fa-chess-rook"; biomeColor = "var(--neon-amber)";
    } else {
        if (localPlayerPos.y < -800) { biomeName = "The Frozen Wastes"; biomeIcon = "fa-snowflake"; biomeColor = "var(--neon-cyan)"; }
        else if (localPlayerPos.y > 800) { biomeName = "The Scorched Desert"; biomeIcon = "fa-sun"; biomeColor = "var(--neon-amber)"; }
        else if (localPlayerPos.x < -800) { biomeName = "The Toxic Swamp"; biomeIcon = "fa-biohazard"; biomeColor = "#55aa55"; }
        else if (localPlayerPos.x > 800) { biomeName = "The Elven Kingdom"; biomeIcon = "fa-leaf"; biomeColor = "var(--neon-green)"; }
    }

    if (biomeName !== currentBiomeName) {
        currentBiomeName = biomeName;
        zonePopupExpiresAt = Date.now() + 4000; 
        
        const pvpText = isSafeZone ? "SAFE ZONE (PvP/PvE Disabled)" : "PvP & PvE ENABLED";
        const pvpColor = isSafeZone ? "var(--neon-green)" : "var(--neon-amber)";
        const pvpIcon = isSafeZone ? "fa-shield-halved" : "fa-khanda";

        const zp = document.getElementById("zone-popup");
        if (zp) {
            zp.innerHTML = `
                <div class="hud-header" style="color: ${biomeColor}; font-size: 42px; text-shadow: 0 0 20px ${biomeColor}; letter-spacing: 2px;">
                    <i class="fa-solid ${biomeIcon}"></i> ${biomeName}
                </div>
                <div class="hud-header" style="color: ${pvpColor}; font-size: 16px; margin-top: 10px; letter-spacing: 2px;">
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
        const isBuyMode = isTownScene && activeScene.isBuyMode;
        const isBuildMode = isTownScene && activeScene.isBuildMode;
        const isDecoModeActive = isTownScene && activeScene.isDecoMode;

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
            <div class="hud-panel animate-pulse" style="border-color: var(--neon-green); text-align: center; margin-top: 15px; background: rgba(0,20,10,0.8);">
                <div class="hud-header text-green text-xl" style="margin-bottom: 5px;"><i class="fa-solid fa-bed"></i> Sleeping... Zzz...</div>
                <div class="text-sm">Press <span class="hud-key">W</span><span class="hud-key">A</span><span class="hud-key">S</span><span class="hud-key">D</span> to Wake Up</div>
            </div>`;
        } else if (me.isMeditating) {
            overlayText = `
            <div class="hud-panel animate-pulse" style="border-color: var(--neon-blue); text-align: center; margin-top: 15px; background: rgba(0,10,20,0.8);">
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

        const topHeader = `<div class="hud-header text-muted text-sm" style="margin-bottom: 2px;"><i class="fa-solid fa-server"></i> SAO Tower</div>`;

        if (!me.hasUnlockedBuilding) {
            landText = "";
            buildText = "";
        }

        textDiv.innerHTML = `
            ${topHeader}
            ${stealthText}
            ${overlayText}
            ${landText}
            ${buildText}
            ${interactText}
        `.trim();
    }

    const ctrlSkillTree = document.getElementById("ctrl-skilltree");
    const ctrlMeditate = document.getElementById("ctrl-meditate");
    const ctrlBuyLand = document.getElementById("ctrl-buy-land");
    const ctrlBuildMode = document.getElementById("ctrl-build-mode");
    const btnHarnessMana = document.getElementById("btn-harness-mana");
    const auraHUDDiv = document.getElementById("hud-aura");
    const ctrlFamiliar = document.getElementById("ctrl-familiar");

    const questTracker = document.getElementById("quest-tracker");
    const questText = document.getElementById("quest-text");

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

        if (questTracker && questText) {
            let currentQuest = "";

            if (me.activeQuests && me.activeQuests.has("tutorial_1_fish")) {
                currentQuest = `<b>Survival 101:</b> The town needs food. Head to the lake to the North-West (X: -180, Z: 180) and press <span class="hud-key">F</span> to cast your line.`;
            } else if (me.activeQuests && me.activeQuests.has("tutorial_2_tree")) {
                const prog = me.activeQuests.get("tutorial_2_tree").currentAmount;
                currentQuest = `<b>Survival 102:</b> Excellent catch. Now we need materials. Find a tree and attack it to gather Wood. (${prog}/3)`;
            } else if (!me.hasUnlockedSkillTree) {
                currentQuest = `<b>Growing Stronger:</b> Defeat monsters or gather resources to reach Level 2.`;
            } else if (!me.hasUnlockedBuilding) {
                currentQuest = `<b>Settling Down:</b> Earn 100 Coins by defeating enemies, selling items, or finding chests to buy your first plot of land.`;
            }

            if (currentQuest !== "") {
                questTracker.style.display = "block";
                questText.innerHTML = currentQuest;
            } else {
                questTracker.style.display = "none";
            }
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
        
        let reqText = `<div style="display: flex; gap: 10px; margin-top: 5px; font-size: 12px;">`;
        reqText += `<span style="color: ${hasCoins ? 'var(--neon-amber)' : 'var(--neon-red)'};"><i class="fa-solid fa-coins"></i> ${r.cost}</span>`;
        
        r.reqs.forEach(req => {
            const pItem = playerState.inventory.get(req.n);
            const pQty = pItem ? pItem.quantity : 0;
            const hasEnough = pQty >= req.q;
            if (!hasEnough) canCraft = false;
            
            reqText += `<span style="color: ${hasEnough ? 'var(--neon-green)' : 'var(--neon-red)'};">${req.n}: ${pQty}/${req.q}</span>`;
        });
        reqText += `</div>`;

        html += `
            <div style="background: rgba(0,0,0,0.4); border: 1px solid #444; border-radius: 6px; padding: 10px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div class="hud-header text-blue text-md">${r.icon} ${r.name}</div>
                    ${reqText}
                </div>
                <button class="btn-hack craft-btn" data-recipe="${r.id}" ${canCraft ? '' : 'disabled style="filter: grayscale(1); opacity: 0.5; cursor: not-allowed;"'}>
                    CRAFT
                </button>
            </div>
        `;
    });

    list.innerHTML = html;
    modal.style.display = "block";

    document.querySelectorAll(".craft-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const recipeId = (e.currentTarget as HTMLElement).getAttribute("data-recipe");
            if (recipeId) {
                activeRoom.send("craftItem", { recipeId });
                setTimeout(() => openCraftingMenu(activeRoom, playerState), 100); 
            }
        });
    });
}

export function openStoreMenu(activeRoom: any, playerState: any, storeState: any) {
    let modal = document.getElementById("store-management-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "store-management-modal";
        modal.className = "hud-panel hud-absolute-center";
        modal.style.top = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.width = "500px";
        modal.style.maxHeight = "80vh";
        modal.style.overflowY = "auto";
        modal.style.zIndex = "3100";
        modal.style.pointerEvents = "auto";
        modal.style.boxShadow = "0 10px 50px rgba(0,0,0,0.9), 0 0 30px rgba(0, 170, 255, 0.2)";
        modal.style.border = "2px solid var(--neon-amber)";
        document.body.appendChild(modal);

        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && modal!.style.display === "block") modal!.style.display = "none";
        });
    }

    const isOwner = storeState.ownerId === playerState.name;
    const isUnowned = storeState.ownerId === "";

    let html = `
        <div style="padding-bottom: 15px; border-bottom: 1px solid #444; display: flex; justify-content: space-between; align-items: center; position: sticky; top: 0; background: var(--bg-panel); z-index: 10;">
            <h2 class="hud-header text-amber" style="margin: 0;"><i class="fa-solid fa-store"></i> ${storeState.type}</h2>
            <button onclick="document.getElementById('store-management-modal').style.display='none'" style="background: none; border: none; color: var(--neon-red); font-size: 24px; cursor: pointer;"><i class="fa-solid fa-xmark"></i></button>
        </div>
    `;

    if (isUnowned) {
        html += `
            <div style="text-align: center; margin-top: 20px;">
                <p class="text-muted">This property is currently vacant.</p>
                <div class="hud-header text-amber" style="font-size: 24px; margin: 15px 0;"><i class="fa-solid fa-coins"></i> 1,000</div>
                <button id="btn-buy-property" class="btn-hack" ${playerState.coins < 1000 ? 'disabled style="filter: grayscale(1); opacity: 0.5;"' : ''}>Purchase Property</button>
            </div>
        `;
    } else if (isOwner) {
        html += `
            <div style="display: flex; justify-content: space-between; margin-top: 15px; background: rgba(0,0,0,0.4); padding: 10px; border-radius: 6px;">
                <div>
                    <div class="text-muted text-sm">Store Vault (Profits)</div>
                    <div class="text-amber hud-header" style="font-size: 20px;"><i class="fa-solid fa-coins"></i> ${storeState.vault}</div>
                </div>
                <button id="btn-collect-vault" class="hud-btn btn-success" ${storeState.vault <= 0 ? 'disabled style="filter: grayscale(1); opacity: 0.5;"' : ''}>Collect Profits</button>
            </div>
            <h3 class="hud-header text-sm text-muted" style="margin-top: 20px; margin-bottom: 10px;">Produce Stock</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
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
                reqHtml += `<span style="color: ${pQty >= req.q ? 'var(--neon-green)' : 'var(--neon-red)'}; margin-right: 8px;">${req.n} ${pQty}/${req.q}</span>`;
            });

            html += `
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div class="text-md" style="font-weight: bold;">${itemName} (In Stock: <span class="text-blue">${item.stock}</span>)</div>
                        <div class="text-sm text-muted" style="margin-top: 4px;">Req: ${reqHtml}</div>
                    </div>
                    <button class="btn-hack produce-btn" data-item="${itemName}" ${!canCook ? 'disabled style="filter: grayscale(1); opacity: 0.5;"' : ''}>
                        Produce (+${recipe.yield})
                    </button>
                </div>
            `;
        });
        html += `</div>`;
    } else {
        html += `
            <div class="text-muted text-sm" style="margin-top: 10px; text-align: center;">Owned by <span class="text-amber">${storeState.ownerName}</span></div>
            <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 15px;">
        `;
        storeState.inventory.forEach((item: any, itemName: string) => {
            const outOfStock = item.stock <= 0;
            const cantAfford = playerState.coins < item.price;
            html += `
                <div style="background: rgba(255,255,255,0.05); padding: 10px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div class="text-md" style="font-weight: bold;">${itemName}</div>
                        <div class="text-sm ${outOfStock ? 'text-red' : 'text-muted'}">Stock: ${item.stock}</div>
                    </div>
                    <button class="btn-hack buy-btn" data-item="${itemName}" ${(outOfStock || cantAfford) ? 'disabled style="filter: grayscale(1); opacity: 0.5;"' : ''}>
                        <i class="fa-solid fa-coins"></i> ${item.price}
                    </button>
                </div>
            `;
        });
        html += `</div>`;
    }

    modal.innerHTML = html;
    modal.style.display = "block";

    const btnBuyProp = document.getElementById("btn-buy-property");
    if (btnBuyProp) {
        btnBuyProp.onclick = () => { activeRoom.send("buyStore", { storeId: storeState.id }); setTimeout(() => openStoreMenu(activeRoom, playerState, storeState), 100); };
    }

    const btnCollect = document.getElementById("btn-collect-vault");
    if (btnCollect) {
        btnCollect.onclick = () => { activeRoom.send("collectVault", { storeId: storeState.id }); setTimeout(() => openStoreMenu(activeRoom, playerState, storeState), 100); };
    }

    document.querySelectorAll(".produce-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const itemName = (e.currentTarget as HTMLElement).getAttribute("data-item");
            if (itemName) {
                activeRoom.send("craftStoreStock", { storeId: storeState.id, itemName });
                setTimeout(() => openStoreMenu(activeRoom, playerState, storeState), 100);
            }
        });
    });

    document.querySelectorAll(".buy-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const itemName = (e.currentTarget as HTMLElement).getAttribute("data-item");
            if (itemName) {
                activeRoom.send("buyItem", { storeId: storeState.id, itemName });
                setTimeout(() => openStoreMenu(activeRoom, playerState, storeState), 100);
            }
        });
    });
}