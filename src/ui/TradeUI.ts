import { Room } from "colyseus.js";
import { ITEM_DB, RANK_COLORS, ItemRank } from "../ItemDatabase";

export let isTradeUIOpen = false;
let currentTradeId: string | null = null;
let myOfferedItems: Record<string, number> = {};
let myOfferedCoins: number = 0;

// Inject Custom CSS for the Trade UI
const style = document.createElement('style');
style.innerHTML = `
    .trade-scroll::-webkit-scrollbar { width: 6px; }
    .trade-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.3); border-radius: 4px; }
    .trade-scroll::-webkit-scrollbar-thumb { background: #00aaff; border-radius: 4px; }
    
    .trade-item-row { 
        display: flex; justify-content: space-between; align-items: center; 
        padding: 8px 12px; background: rgba(255,255,255,0.03); 
        border: 1px solid #222; margin-bottom: 6px; border-radius: 6px; 
        transition: background 0.2s, transform 0.1s; 
    }
    .trade-item-row:hover { background: rgba(255,255,255,0.08); transform: translateX(2px); }
    
    .trade-input { 
        background: #0d1117; color: white; border: 1px solid #444; 
        padding: 8px; border-radius: 4px; outline: none; transition: border-color 0.2s; 
    }
    .trade-input:focus { border-color: #00aaff; box-shadow: 0 0 8px rgba(0,170,255,0.4); }
    .trade-input:disabled { opacity: 0.5; cursor: not-allowed; }
    
    .trade-btn { 
        padding: 10px 15px; border: none; border-radius: 6px; font-weight: bold; 
        cursor: pointer; transition: all 0.2s; text-transform: uppercase; letter-spacing: 1px; 
    }
    .trade-btn:disabled { filter: grayscale(100%); opacity: 0.5; cursor: not-allowed; }
    
    .trade-btn-blue { background: linear-gradient(180deg, #0077ff, #0044aa); color: white; border: 1px solid #00aaff; box-shadow: 0 0 10px rgba(0, 170, 255, 0.3); }
    .trade-btn-blue:hover:not(:disabled) { background: linear-gradient(180deg, #0099ff, #0055cc); box-shadow: 0 0 15px rgba(0, 170, 255, 0.6); }
    
    .trade-btn-green { background: linear-gradient(180deg, #00aa55, #005522); color: white; border: 1px solid #00ffaa; box-shadow: 0 0 10px rgba(0, 255, 170, 0.3); }
    .trade-btn-green:hover:not(:disabled) { background: linear-gradient(180deg, #00cc66, #007733); box-shadow: 0 0 15px rgba(0, 255, 170, 0.6); }
    
    .trade-btn-red { background: linear-gradient(180deg, #aa0000, #550000); color: white; border: 1px solid #ff4444; }
    .trade-btn-red:hover:not(:disabled) { background: linear-gradient(180deg, #cc0000, #770000); box-shadow: 0 0 15px rgba(255, 68, 68, 0.6); }
    
    .trade-btn-yellow { background: linear-gradient(180deg, #bb8800, #775500); color: white; border: 1px solid #ffaa00; box-shadow: 0 0 10px rgba(255, 170, 0, 0.3); }
    .trade-btn-yellow:hover:not(:disabled) { background: linear-gradient(180deg, #ddaa00, #996600); box-shadow: 0 0 15px rgba(255, 170, 0, 0.6); }

    .trade-panel { border: 2px solid #333; border-radius: 8px; padding: 15px; display: flex; flex-direction: column; background: #0a0e14; transition: all 0.3s; }
    .trade-panel-ready { border-color: #00ffaa; background: rgba(0, 255, 170, 0.05); box-shadow: inset 0 0 30px rgba(0, 255, 170, 0.1); }
    
    @keyframes pulse-ready { 
        0% { box-shadow: 0 0 15px rgba(0, 255, 170, 0.4); } 
        50% { box-shadow: 0 0 25px rgba(0, 255, 170, 0.8); } 
        100% { box-shadow: 0 0 15px rgba(0, 255, 170, 0.4); } 
    }
    .btn-pulse { animation: pulse-ready 1.5s infinite; }
`;
document.head.appendChild(style);


export function setupTradeClient(room: Room<any>) {
    
    // 1. Receive Trade Invite
    room.onMessage("trade_invite_received", (data: { requesterId: string, requesterName: string }) => {
        let ui = document.getElementById("trade-invite-ui");
        if (!ui) {
            ui = document.createElement("div");
            ui.id = "trade-invite-ui";
            ui.style.position = "fixed";
            ui.style.top = "15%";
            ui.style.left = "50%";
            ui.style.transform = "translateX(-50%)";
            ui.style.background = "linear-gradient(135deg, rgba(15, 20, 30, 0.95), rgba(0, 17, 34, 0.95))";
            ui.style.border = "2px solid #00aaff";
            ui.style.borderRadius = "12px";
            ui.style.padding = "20px 30px";
            ui.style.color = "white";
            ui.style.zIndex = "4000";
            ui.style.boxShadow = "0 10px 30px rgba(0, 170, 255, 0.4)";
            ui.style.textAlign = "center";
            ui.style.fontFamily = "Arial, sans-serif";
            document.body.appendChild(ui);
        }

        ui.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 10px;">🤝</div>
            <h3 style="margin:0 0 10px 0; color:#00ffaa; letter-spacing: 1px;">Trade Request</h3>
            <p style="color: #ccc; font-size: 16px;"><b><span style="color:white;">${data.requesterName}</span></b> has offered to trade.</p>
            <div style="display:flex; justify-content:center; gap:15px; margin-top:20px;">
                <button id="btn-accept-trade" class="trade-btn trade-btn-green">Accept</button>
                <button id="btn-decline-trade" class="trade-btn trade-btn-red">Decline</button>
            </div>
        `;
        ui.style.display = "block";

        document.getElementById("btn-accept-trade")!.onclick = () => {
            room.send("trade_accept", { requesterId: data.requesterId });
            ui!.style.display = "none";
        };
        document.getElementById("btn-decline-trade")!.onclick = () => {
            room.send("trade_decline", { requesterId: data.requesterId });
            ui!.style.display = "none";
        };
    });

    // 2. Trade Started (Open Window)
    room.onMessage("trade_started", (data: { tradeId: string, partnerName: string }) => {
        isTradeUIOpen = true;
        currentTradeId = data.tradeId;
        myOfferedItems = {};
        myOfferedCoins = 0;
        
        buildTradeModal(room, data.partnerName);
    });

    // 3. Trade State Sync
    room.onMessage("trade_sync", (data: any) => {
        updateTradeModal(room, data);
    });

    // 4. Trade Ended
    room.onMessage("trade_completed", () => closeTradeUI());
    room.onMessage("trade_cancelled", () => closeTradeUI());
}

function buildTradeModal(room: Room<any>, partnerName: string) {
    let modal = document.getElementById("trade-modal");
    if (!modal) {
        modal = document.createElement("div");
        modal.id = "trade-modal";
        modal.style.position = "fixed";
        modal.style.top = "50%";
        modal.style.left = "50%";
        modal.style.transform = "translate(-50%, -50%)";
        modal.style.width = "900px";
        modal.style.height = "600px";
        modal.style.background = "rgba(12, 16, 24, 0.98)";
        modal.style.border = "2px solid #00aaff";
        modal.style.borderRadius = "12px";
        modal.style.boxShadow = "0 15px 50px rgba(0, 0, 0, 0.8), 0 0 20px rgba(0, 170, 255, 0.3)";
        modal.style.color = "white";
        modal.style.zIndex = "3500";
        modal.style.display = "flex";
        modal.style.flexDirection = "column";
        modal.style.fontFamily = "Arial, sans-serif";
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items: center; background: linear-gradient(90deg, #001122, #002244); padding:15px 20px; border-bottom:2px solid #00aaff; border-radius: 10px 10px 0 0;">
            <h2 style="margin:0; color:#00ffaa; text-shadow: 0 0 10px rgba(0,255,170,0.5); letter-spacing: 2px;">🤝 SECURE TRADE</h2>
            <button id="close-trade-btn" class="trade-btn trade-btn-red">Cancel Trade</button>
        </div>
        
        <div style="display:flex; flex:1; padding:20px; gap:25px; background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGElEQVQYlWNgYGCQwoZxBqLgwKgCqhhqAQCwTQI2989k2gAAAABJRU5ErkJggg==') repeat;">
            
            <div id="panel-mine" class="trade-panel" style="flex:1;">
                <h3 style="margin-top:0; text-align:center; color:#00aaff; letter-spacing: 1px; border-bottom: 1px solid #222; padding-bottom: 10px;">My Offer</h3>
                
                <div style="margin-bottom:15px; display:flex; align-items:center; gap:10px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <span style="font-weight:bold; color:#ffd700;">🪙 Coins:</span>
                    <input type="number" id="trade-my-coins" class="trade-input" value="0" min="0" style="width:100px; font-weight:bold;">
                    <button id="trade-update-offer" class="trade-btn trade-btn-blue" style="padding: 8px 12px; font-size: 12px;">Update Offer</button>
                </div>
                
                <div id="trade-my-items" class="trade-scroll" style="flex:1; overflow-y:auto; border:1px solid #111; background:rgba(0,0,0,0.5); padding:10px; border-radius: 6px;"></div>
                
                <div style="margin-top:15px; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 6px;">
                    <select id="trade-inventory-select" class="trade-input" style="width:100%; margin-bottom: 8px;"></select>
                    <div style="display:flex; gap:10px;">
                        <input type="number" id="trade-add-qty" class="trade-input" value="1" min="1" style="width:60px; text-align:center;">
                        <button id="trade-add-item-btn" class="trade-btn trade-btn-blue" style="flex:1;">➕ Add Item</button>
                    </div>
                </div>
            </div>

            <div id="panel-theirs" class="trade-panel" style="flex:1;">
                <h3 style="margin-top:0; text-align:center; color:#ffaa00; letter-spacing: 1px; border-bottom: 1px solid #222; padding-bottom: 10px;">${partnerName}'s Offer</h3>
                
                <div style="margin-bottom:15px; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 6px; display:flex; align-items:center; gap:10px;">
                    <span style="font-weight:bold; color:#ccc;">Coins Offered:</span>
                    <span id="trade-their-coins" style="color:#ffd700; font-weight:bold; font-size: 18px;">0</span> 🪙
                </div>
                
                <div id="trade-their-items" class="trade-scroll" style="flex:1; overflow-y:auto; border:1px solid #111; background:rgba(0,0,0,0.5); padding:10px; border-radius: 6px;"></div>
                <div id="trade-their-status" style="margin-top:15px; text-align:center; padding:10px; font-weight:bold; border-radius:6px; background: rgba(255,255,255,0.05); color:#888;">
                    Deciding...
                </div>
            </div>
        </div>

        <div style="padding:15px 25px; background: linear-gradient(90deg, #001122, #002244); border-top:2px solid #00aaff; display:flex; justify-content:space-between; align-items:center; border-radius: 0 0 10px 10px;">
            <div id="trade-status-text" style="color:#aaa; font-style: italic;">Reviewing offers...</div>
            <div style="display:flex; gap:15px;">
                <button id="trade-ready-btn" class="trade-btn trade-btn-blue">Lock In Offer</button>
                <button id="trade-confirm-btn" class="trade-btn" disabled style="background:#222; color:#555;">Confirm Trade</button>
            </div>
        </div>
    `;
    modal.style.display = "flex";

    // Populate Inventory Dropdown
    const selectEl = document.getElementById("trade-inventory-select") as HTMLSelectElement;
    const p = room.state.players.get(room.sessionId);
    if (p) {
        let hasItems = false;
        p.inventory.forEach((item: any, name: string) => {
            const def = ITEM_DB[name];
            const icon = def ? def.icon : "📦";
            const opt = document.createElement("option");
            opt.value = name;
            opt.text = `${icon} ${name} (x${item.quantity})`;
            selectEl.appendChild(opt);
            hasItems = true;
        });
        if (!hasItems) {
            const opt = document.createElement("option");
            opt.value = "";
            opt.text = "Inventory Empty";
            selectEl.appendChild(opt);
            selectEl.disabled = true;
            (document.getElementById("trade-add-item-btn") as HTMLButtonElement).disabled = true;
        }
    }

    // Button Bindings
    document.getElementById("close-trade-btn")!.onclick = () => {
        room.send("trade_cancel", { tradeId: currentTradeId });
    };

    document.getElementById("trade-add-item-btn")!.onclick = () => {
        const name = selectEl.value;
        const qty = parseInt((document.getElementById("trade-add-qty") as HTMLInputElement).value);
        if (name && qty > 0) {
            myOfferedItems[name] = (myOfferedItems[name] || 0) + qty;
            room.send("trade_update_offer", { tradeId: currentTradeId, coins: myOfferedCoins, items: myOfferedItems });
        }
    };

    document.getElementById("trade-update-offer")!.onclick = () => {
        myOfferedCoins = parseInt((document.getElementById("trade-my-coins") as HTMLInputElement).value) || 0;
        room.send("trade_update_offer", { tradeId: currentTradeId, coins: myOfferedCoins, items: myOfferedItems });
    };

    document.getElementById("trade-ready-btn")!.onclick = () => {
        room.send("trade_toggle_ready", { tradeId: currentTradeId });
    };

    document.getElementById("trade-confirm-btn")!.onclick = () => {
        room.send("trade_confirm", { tradeId: currentTradeId });
    };
}

function updateTradeModal(room: Room<any>, payload: any) {
    const modal = document.getElementById("trade-modal");
    if (!modal) return;

    const isP1 = payload.p1.id === room.sessionId;
    const myOffer = isP1 ? payload.p1.offer : payload.p2.offer;
    const theirOffer = isP1 ? payload.p2.offer : payload.p1.offer;

    // Helper to generate styled rows
    const generateRows = (offerItems: Record<string, number>) => {
        let html = "";
        for (const [name, qty] of Object.entries(offerItems)) {
            const def = ITEM_DB[name];
            const icon = def ? def.icon : "📦";
            const color = def ? RANK_COLORS[def.rank as ItemRank] : "#fff";
            
            html += `<div class="trade-item-row">
                <span style="color:${color}; font-weight:bold; text-shadow: 0 0 5px ${color}66;">${icon} ${name}</span> 
                <span style="color:#00aaff; font-weight:bold; background: rgba(0,170,255,0.15); padding: 2px 8px; border-radius: 4px;">x${qty}</span>
            </div>`;
        }
        return html;
    };

    // Render Items
    document.getElementById("trade-my-items")!.innerHTML = generateRows(myOffer.items);
    document.getElementById("trade-their-items")!.innerHTML = generateRows(theirOffer.items);

    // Coins
    (document.getElementById("trade-my-coins") as HTMLInputElement).value = myOffer.coins;
    document.getElementById("trade-their-coins")!.innerText = theirOffer.coins;

    // Panel Visual States
    const myPanel = document.getElementById("panel-mine")!;
    const theirPanel = document.getElementById("panel-theirs")!;
    const theirStatus = document.getElementById("trade-their-status")!;
    
    // Disable inputs if locked
    const inputs = ["trade-my-coins", "trade-update-offer", "trade-inventory-select", "trade-add-qty", "trade-add-item-btn"];
    inputs.forEach(id => {
        const el = document.getElementById(id) as HTMLInputElement | HTMLButtonElement | HTMLSelectElement;
        if (el && id !== "trade-inventory-select") el.disabled = myOffer.isReady;
        // Don't fully disable select, just style it, as we want to keep it readable
        if (id === "trade-inventory-select") el.style.opacity = myOffer.isReady ? "0.5" : "1";
    });

    if (myOffer.isReady) myPanel.classList.add("trade-panel-ready");
    else myPanel.classList.remove("trade-panel-ready");

    if (theirOffer.isReady) {
        theirPanel.classList.add("trade-panel-ready");
        theirStatus.innerHTML = "✅ Partner is Ready";
        theirStatus.style.color = "#00ffaa";
        theirStatus.style.background = "rgba(0, 255, 170, 0.1)";
    } else {
        theirPanel.classList.remove("trade-panel-ready");
        theirStatus.innerHTML = "⌛ Deciding...";
        theirStatus.style.color = "#ffaa00";
        theirStatus.style.background = "rgba(255, 170, 0, 0.1)";
    }

    // State Logic
    const readyBtn = document.getElementById("trade-ready-btn") as HTMLButtonElement;
    const confirmBtn = document.getElementById("trade-confirm-btn") as HTMLButtonElement;
    const statusText = document.getElementById("trade-status-text")!;

    if (myOffer.isReady) {
        readyBtn.innerText = "🔓 Unlock Offer";
        readyBtn.className = "trade-btn trade-btn-yellow";
    } else {
        readyBtn.innerText = "🔒 Lock In Offer";
        readyBtn.className = "trade-btn trade-btn-blue";
    }

    if (myOffer.isReady && theirOffer.isReady) {
        statusText.innerHTML = "<span style='color:#00ffaa; font-weight:bold;'>Both players are ready. You may confirm.</span>";
        confirmBtn.disabled = false;
        confirmBtn.className = "trade-btn trade-btn-green btn-pulse";
    } else if (theirOffer.isReady) {
        statusText.innerHTML = "<span style='color:#ffaa00;'>Partner is locked in. Waiting for you.</span>";
        confirmBtn.disabled = true;
        confirmBtn.className = "trade-btn";
        confirmBtn.style.background = "#222"; confirmBtn.style.color = "#555";
    } else {
        statusText.innerHTML = "<span style='color:#aaa; font-style:italic;'>Reviewing offers...</span>";
        confirmBtn.disabled = true;
        confirmBtn.className = "trade-btn";
        confirmBtn.style.background = "#222"; confirmBtn.style.color = "#555";
    }

    if (myOffer.hasConfirmed) {
        statusText.innerHTML = "<span style='color:#00aaff; font-weight:bold;'>Waiting for partner to confirm...</span>";
        confirmBtn.disabled = true;
        confirmBtn.innerText = "Confirmed";
        confirmBtn.classList.remove("btn-pulse");
        confirmBtn.style.background = "#005522"; confirmBtn.style.color = "#00ffaa";
    } else {
        confirmBtn.innerText = "Confirm Trade";
    }
}

export function closeTradeUI() {
    isTradeUIOpen = false;
    currentTradeId = null;
    const modal = document.getElementById("trade-modal");
    if (modal) document.body.removeChild(modal);
}