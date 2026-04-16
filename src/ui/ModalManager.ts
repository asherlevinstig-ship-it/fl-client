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


// --- INVENTORY UI ---
export function openInventoryUI(activeRoom: any, keys: any, playerClass: string) {
    if (isInventoryUIOpen || !activeRoom) return;
    isInventoryUIOpen = true;

    for (const key in keys) {
        keys[key as keyof typeof keys] = false;
    }

    let modal = document.getElementById("inventory-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "inventory-modal";
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
        modal.style.width = "750px"; 
        modal.style.boxShadow = "0 10px 40px rgba(0,0,0,0.8)";
        modal.style.fontFamily = "Arial, sans-serif";
        
        modal.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid #444; padding-bottom: 15px; margin-bottom: 20px;">
                <div>
                    <h2 style="margin:0; color:#00aaff; font-size: 24px;"><span id="inv-player-name"></span>'s Inventory</h2>
                    <div style="margin-top: 6px; font-size: 13px; color: #ddd; font-weight: bold;">
                        🏅 <span id="inv-player-rank"></span> | Level <span id="inv-player-level"></span> | Class: <span id="inv-player-class"></span>
                    </div>
                </div>
                <button id="close-inv-btn" style="background:none; border:none; color:#ff5555; font-size:28px; cursor:pointer; font-weight:bold; line-height: 1;">&times;</button>
            </div>
            <div style="display:flex; gap:30px;">
                <div id="inv-equip-container" style="flex: 0 0 220px; background:rgba(255,255,255,0.03); padding:20px; border-radius:10px; display:grid; grid-template-columns: 1fr 1fr; gap:15px; justify-items:center;">
                </div>
                <div style="flex:1;">
                    <div style="margin-bottom: 10px; font-size: 14px; color: #ffd700; font-weight: bold;">Coins: <span id="inv-player-coins"></span></div>
                    <div id="inventory-list-container" style="display:flex; flex-direction:column; gap:10px; max-height:380px; overflow-y:auto; padding-right:10px;">
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

    let rankColor = "#cccccc"; 
    if (me.rank === "Bronze") rankColor = "#cd7f32";
    if (me.rank === "Silver") rankColor = "#e6e8fa";
    if (me.rank === "Gold") rankColor = "#ffd700";
    if (me.rank === "Diamond") rankColor = "#00ffff";

    document.getElementById("inv-player-name")!.textContent = me.name;
    const rankEl = document.getElementById("inv-player-rank")!;
    rankEl.textContent = `Rank: ${me.rank}`;
    rankEl.style.color = rankColor;
    document.getElementById("inv-player-level")!.textContent = me.level;
    document.getElementById("inv-player-class")!.textContent = playerClass.charAt(0).toUpperCase() + playerClass.slice(1);
    document.getElementById("inv-player-coins")!.textContent = me.coins;

    const getEquipSlotHTML = (itemName: string, placeholder: string, label: string) => {
        const item = ITEM_DB[itemName];
        return `
            <div style="display:flex; flex-direction:column; align-items:center; gap:5px;">
                <div class="equip-slot" style="width:64px; height:64px; background:#1a1a20; border:2px solid ${item ? '#00ffaa' : '#444'}; border-radius:8px; display:flex; justify-content:center; align-items:center; font-size:32px; position:relative;">
                    ${item ? item.icon : `<span style="opacity:0.2;">${placeholder}</span>`}
                </div>
                <span style="font-size:10px; color:#888; text-transform:uppercase;">${label}</span>
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
            <div style="display:flex; justify-content:space-between; align-items:center; background:#2a2a35; padding:12px; border-radius:8px; border:1px solid #555;">
                <div style="flex-grow:1;">
                    <div style="font-weight:bold; font-size:15px; color:#fff;">${icon} ${item.name} <span style="color:#00aaff;">x${item.quantity}</span></div>
                    <div style="font-size:11px; color:#aaa;">${dbItem?.type || 'item'}</div>
                </div>
                <div style="display:flex; gap: 5px;">
                    <button class="equip-btn" data-itemname="${name}" style="background:#44aa44; color:#fff; border:none; border-radius:4px; padding:6px 10px; font-size:12px; cursor:pointer;">Equip</button>
                    <button class="use-btn" data-itemname="${name}" style="background:#00aaff; color:#fff; border:none; border-radius:4px; padding:6px 10px; font-size:12px; cursor:pointer;">Use</button>
                </div>
            </div>
        `;
    });

    if (!hasItems) listHtml = `<div style="text-align:center; color:#888; padding: 20px;">Empty</div>`;
    listContainer.innerHTML = listHtml;
    listContainer.scrollTop = currentScroll; 
}


// --- CHEST UI ---
export function openChestUI(activeRoom: any, keys: any, chestId: string) {
    if (isChestUIOpen || !activeRoom) return;
    isChestUIOpen = true;
    activeChestId = chestId;

    for (const key in keys) keys[key as keyof typeof keys] = false;

    let modal = document.getElementById("chest-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "chest-modal";
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
        modal.style.width = "700px";
        modal.style.boxShadow = "0 10px 40px rgba(0,0,0,0.8)";
        modal.style.fontFamily = "Arial, sans-serif";
        
        modal.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid #444; padding-bottom: 15px; margin-bottom: 20px;">
                <h2 style="margin:0; color:#00ffaa; font-size: 24px;">Storage Chest</h2>
                <button id="close-chest-btn" style="background:none; border:none; color:#ff5555; font-size:28px; cursor:pointer; font-weight:bold; line-height: 1;">&times;</button>
            </div>
            <div style="display: flex; gap: 20px;">
                <div style="flex: 1; background: #1a1a20; padding: 15px; border-radius: 8px;">
                    <h3 style="color: #00aaff; margin-top: 0;">Your Backpack</h3>
                    <div id="chest-backpack-container" style="display:flex; flex-direction:column; gap:8px; max-height:300px; overflow-y:auto; padding-right: 5px;"></div>
                </div>
                <div style="flex: 1; background: #1a1a20; padding: 15px; border-radius: 8px;">
                    <h3 style="color: #ffaa00; margin-top: 0;">Chest Contents</h3>
                    <div id="chest-contents-container" style="display:flex; flex-direction:column; gap:8px; max-height:300px; overflow-y:auto; padding-right: 5px;"></div>
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
            <div style="display:flex; justify-content:space-between; align-items:center; background:#2a2a35; padding:10px; border-radius:6px; border:1px solid #444;">
                <div style="font-weight:bold; font-size:14px;">${icon} ${item.name} <span style="color:#00aaff;">x${item.quantity}</span></div>
                <button class="deposit-btn" data-itemname="${name}" style="background:#00aaff; color:#fff; border:none; border-radius:4px; padding:6px 12px; cursor:pointer; font-weight:bold;">Deposit</button>
            </div>
        `;
    });
    if (me.inventory.size === 0) bpHTML = `<div style="text-align:center; color:#888;">Empty</div>`;
    
    let chHTML = "";
    if (chest.inventory) {
        chest.inventory.forEach((item: any, name: string) => {
            const dbItem = ITEM_DB[name];
            const icon = dbItem ? dbItem.icon : "📦";
            chHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; background:#2a2a35; padding:10px; border-radius:6px; border:1px solid #444;">
                    <div style="font-weight:bold; font-size:14px;">${icon} ${item.name} <span style="color:#ffaa00;">x${item.quantity}</span></div>
                    <button class="withdraw-btn" data-itemname="${name}" style="background:#ffaa00; color:#000; border:none; border-radius:4px; padding:6px 12px; cursor:pointer; font-weight:bold;">Withdraw</button>
                </div>
            `;
        });
        if (chest.inventory.size === 0) chHTML = `<div style="text-align:center; color:#888;">Empty</div>`;
    } else {
        chHTML = `<div style="text-align:center; color:#888;">Empty</div>`;
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

    for (const key in keys) {
        keys[key as keyof typeof keys] = false;
    }

    let modal = document.getElementById("shop-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "shop-modal";
        modal.style.position = "fixed"; 
        modal.style.top = "50%"; 
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)"; 
        modal.style.background = "rgba(20, 20, 25, 0.98)";
        modal.style.padding = "30px"; 
        modal.style.borderRadius = "12px"; 
        modal.style.border = "2px solid #ffaa00";
        modal.style.zIndex = "1000"; 
        modal.style.color = "white"; 
        modal.style.width = "480px";
        modal.style.boxShadow = "0 10px 40px rgba(0,0,0,0.8)";
        modal.style.fontFamily = "Arial, sans-serif";
        
        modal.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid #444; padding-bottom: 15px; margin-bottom: 20px;">
                <div>
                    <h2 id="shop-title" style="margin:0; color:#ffaa00; font-size: 24px;"></h2>
                    <div id="shop-subtitle" style="margin-top: 5px; font-size: 14px; font-weight: bold;"></div>
                </div>
                <button id="close-shop-btn" style="background:none; border:none; color:#ff5555; font-size:28px; cursor:pointer; font-weight:bold; line-height: 1;">&times;</button>
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
    subEl.textContent = isOwned ? `Owned by: ${isMine ? 'You' : storeObj.ownerName}${leaseText}` : 'Unowned Non-Player Character Store';
    subEl.style.color = isOwned ? '#44ff44' : '#aaaaaa';

    const vaultContainer = document.getElementById("shop-vault-container")!;
    if (isMine) {
        vaultContainer.innerHTML = `
            <div style="background:#1a1a20; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #00ffaa;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size: 16px; font-weight: bold; color: #ffd700;">Store Vault: ${storeObj.vault} Coins</span>
                    <button id="collect-vault-btn" data-storeid="${storeObj.id}" style="background:#00ffaa; color:#000; border:none; border-radius:4px; padding:8px 12px; font-weight:bold; cursor:pointer;">Collect</button>
                </div>
            </div>
        `;
    } else if (!isOwned) {
        vaultContainer.innerHTML = `
            <button id="buy-store-btn" data-storeid="${storeObj.id}" style="width: 100%; background: linear-gradient(to right, #44aaff, #0044ff); color: white; border: none; border-radius: 6px; padding: 12px; margin-bottom: 20px; font-size: 16px; font-weight: bold; cursor: pointer;">
                Buy Store for 1000 Coins (14-Day Lease)
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
        const stockText = isOwned ? `Stock: ${item.stock}` : `Infinite Stock`;
        const dbItem = ITEM_DB[item.name];
        const icon = dbItem ? dbItem.icon : "📦";

        itemsHTML += `
            <div style="display:flex; justify-content:space-between; align-items:center; background:#2a2a35; padding:15px; border-radius:8px; border:1px solid #555;">
                <div style="padding-right: 15px; flex-grow: 1;">
                    <div style="font-weight:bold; font-size:16px; color:#fff;">${icon} ${item.name}</div>
                    <div style="font-size:13px; color:#aaa; margin-top:4px; line-height:1.4;">${item.desc}</div>
                    <div style="font-size:12px; color:#44aaff; margin-top:6px; font-weight:bold;">${stockText}</div>
                </div>
        `;

        if (isMine) {
            itemsHTML += `
                <div style="display:flex; flex-direction:column; gap: 8px;">
                    <button class="restock-btn" data-storeid="${storeObj.id}" data-itemname="${name}" style="background:#44aaff; color:#fff; border:none; border-radius:4px; padding:8px 12px; font-weight:bold; cursor:pointer;">
                        Restock (+1) - ${item.wholesalePrice} Coins
                    </button>
                    <div style="text-align: right; color: #ffd700; font-size: 14px; font-weight:bold;">Sells for: ${item.price}</div>
                </div>
            `;
        } else {
            const btnStyle = inStock ? "background:#ffaa00; cursor:pointer;" : "background:#555; cursor:not-allowed; color:#888;";
            itemsHTML += `
                <button class="buy-btn" data-storeid="${storeObj.id}" data-itemname="${name}" ${inStock ? '' : 'disabled'} style="${btnStyle} color:#000; border:none; border-radius:4px; padding:10px 16px; font-weight:bold; transition: background 0.2s; white-space: nowrap;">
                    ${inStock ? `${item.price} Coins` : 'Out of Stock'}
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
    
    for (const key in keys) {
      keys[key as keyof typeof keys] = false;
    }

    const modal = document.createElement("div");
    modal.id = "blueprint-modal";
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
    modal.style.width = "400px";
    modal.style.boxShadow = "0 10px 40px rgba(0,0,0,0.8)";
    modal.style.fontFamily = "Arial, sans-serif";
    modal.style.textAlign = "center";

    modal.innerHTML = `
      <h2 style="margin:0; color:#00ffaa;">Select Blueprint</h2>
      <p style="color:#ccc; font-size:14px; margin-bottom: 20px;">Choose what type of structure you want to build.</p>
      
      <div style="display:flex; flex-direction:column; gap:10px;">
        <button id="bp-house" style="background:#222; color:white; border:1px solid #555; padding:15px; border-radius:8px; cursor:pointer; font-weight:bold; font-size:16px; transition:0.2s;">
            🏡 House (10 Materials)
        </button>
        <button id="bp-farm" style="background:#222; color:white; border:1px solid #555; padding:15px; border-radius:8px; cursor:pointer; font-weight:bold; font-size:16px; transition:0.2s;">
            🌾 Farm (5 Materials)
        </button>
        <button id="bp-shop" style="background:#222; color:white; border:1px solid #555; padding:15px; border-radius:8px; cursor:pointer; font-weight:bold; font-size:16px; transition:0.2s;">
            🏪 Shop (20 Materials)
        </button>
      </div>
      <button id="close-bp-btn" style="margin-top: 20px; background:#ff5555; color:white; border:none; padding:10px 20px; border-radius:6px; cursor:pointer; font-weight:bold; width:100%;">Cancel</button>
    `;

    document.body.appendChild(modal);

    const setupBtn = (id: string, type: string) => {
        const btn = document.getElementById(id);
        if (btn) {
            btn.onmouseover = () => btn.style.background = "#333";
            btn.onmouseout = () => btn.style.background = "#222";
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
  return new Promise((resolve) => {
    const container = document.createElement("div");
    container.style.position = "fixed"; container.style.top = "0"; container.style.left = "0";
    container.style.width = "100vw"; container.style.height = "100vh";
    container.style.background = "radial-gradient(circle, #2a2a35 0%, #050505 100%)";
    container.style.zIndex = "9999"; container.style.display = "flex";
    container.style.flexDirection = "column"; container.style.alignItems = "center";
    container.style.justifyContent = "center"; container.style.fontFamily = "Arial, sans-serif";

    const title = document.createElement("h1");
    title.innerText = "STEP 1: SELECT YOUR CLASS";
    title.style.color = "white"; title.style.fontSize = "48px"; title.style.marginBottom = "40px";
    container.appendChild(title);

    const cardRow = document.createElement("div");
    cardRow.style.display = "flex"; cardRow.style.gap = "30px";
    container.appendChild(cardRow);

    const classes = [
      { id: "duelist", name: "Duelist", desc: "High mobility melee fighter.", color: "#ffaa00", icon: "⚔️" },
      { id: "vanguard", name: "Vanguard", desc: "Heavy armor frontline tank.", color: "#00aaff", icon: "🛡️" },
      { id: "arcanist", name: "Arcanist", desc: "Ranged spellcaster.", color: "#aa00ff", icon: "🪄" }
    ];

    const pathways = [
      { id: "shadow", name: "Shadow Essence", desc: "Execute bursts and stealth.", color: "#8800ff", icon: "🌑" },
      { id: "light", name: "Light Essence", desc: "Healing and holy protection.", color: "#ffffaa", icon: "☀️" },
      { id: "berserker", name: "Berserker Essence", desc: "Raw physical power and fire.", color: "#ff4444", icon: "🔥" },
      { id: "nature", name: "Nature Essence", desc: "Healing and area control.", color: "#22cc44", icon: "🌿" }
    ];

    const auras = [
        { id: "tyrant", name: "Tyrant Aura", desc: "Oppressive force. Slows and weakens nearby enemies.", color: "#ff2222", icon: "💥" },
        { id: "sanctuary", name: "Sanctuary Aura", desc: "Protective domain. Heals and shields nearby allies.", color: "#44aaff", icon: "🛡️" },
        { id: "void", name: "Void Aura", desc: "Absolute concealment. Drops aggro and buffs next strike.", color: "#8800ff", icon: "🥷" },
        { id: "storm", name: "Storm Aura", desc: "Chaotic energy. Periodically zaps enemies with lightning.", color: "#00ffaa", icon: "🌪️" }
    ];

    let selectedClass = "";
    let selectedPathway = "";

    const renderOptions = (items: any[], step: number) => {
      cardRow.innerHTML = "";
      items.forEach(item => {
        const card = document.createElement("button");
        card.style.width = "250px";
        card.style.height = "350px";
        card.style.background = "linear-gradient(180deg, #1e1e24 0%, #101015 100%)";
        card.style.border = `3px solid ${item.color}`; card.style.borderRadius = "12px";
        card.style.color = "white"; card.style.cursor = "pointer";
        card.style.padding = "20px"; card.style.display = "flex"; card.style.flexDirection = "column";
        card.style.transition = "transform 0.2s, box-shadow 0.2s";

        card.onmouseover = () => { card.style.transform = "translateY(-10px)"; card.style.boxShadow = `0 10px 30px ${item.color}66`; };
        card.onmouseout = () => { card.style.transform = "translateY(0)"; card.style.boxShadow = "none"; };

        card.innerHTML = `
            <div style="font-size: 40px; text-align: center; margin-bottom: 10px;">${item.icon}</div>
            <h2 style="color: ${item.color}; margin-top: 0; text-align: center;">${item.name}</h2>
            <p style="font-size: 16px; line-height: 1.5; opacity: 0.9; flex-grow: 1; text-align: center;">${item.desc}</p>
            <div style="font-weight: bold; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.2); text-align: center;">SELECT</div>
        `;
        
        card.onclick = () => {
          if (step === 1) {
            selectedClass = item.id;
            title.innerText = `STEP 2: SELECT AWAKENING PATHWAY`;
            renderOptions(pathways, 2);
          } else if (step === 2) {
            selectedPathway = item.id;
            title.innerText = `STEP 3: MANIFEST YOUR SOUL AURA`;
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