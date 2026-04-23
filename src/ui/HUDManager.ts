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

    const isTownScene = activeScene && activeScene.constructor.name === "TownScene";
    const isOutsideTown = isTownScene && activeScene.isOutsideTown(localPlayerPos.x, localPlayerPos.y);
    const isSafeZone = isTownScene && !isOutsideTown;
    
    let biomeName = "The Wilderness";
    let biomeIcon = "fa-tree";
    let biomeColor = "#22c55e";
    
    if (activeScene && activeScene.constructor.name === "MazeScene") {
        biomeName = "The Labyrinth"; biomeIcon = "fa-dungeon"; biomeColor = "#d946ef";
    } else if (activeScene && activeScene.constructor.name === "DungeonScene") {
        biomeName = "The Goblin Cave"; biomeIcon = "fa-skull"; biomeColor = "#f59e0b";
    } else if (activeScene && activeScene.constructor.name === "UnderworldScene") {
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
            <button onclick="document.getElementById('store-management-modal').style.display='none'" class="btn-close-chunky">&times;</button>
        </div>
    `;

    if (isUnowned) {
        html += `
            <div style="text-align: center; margin-top: 30px;">
                <p class="text-muted" style="font-size: 18px; font-weight: 900;">This property is currently vacant.</p>
                <div class="hud-header text-amber" style="font-size: 32px; margin: 20px 0;"><i class="fa-solid fa-coins"></i> 1,000</div>
                <button id="btn-buy-property" class="btn-chunky btn-blue" ${playerState.coins < 1000 ? 'disabled style="filter: grayscale(1); opacity: 0.5;"' : ''} style="width: 100%; padding: 20px;">Purchase Property</button>
            </div>
        `;
    } else if (isOwner) {
        html += `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px; background: #0f172a; padding: 15px; border-radius: 12px; border: 3px solid #334155;">
                <div>
                    <div class="text-muted text-sm">Store Vault (Profits)</div>
                    <div class="text-amber hud-header" style="font-size: 24px;"><i class="fa-solid fa-coins"></i> ${storeState.vault}</div>
                </div>
                <button id="btn-collect-vault" class="btn-chunky btn-green" ${storeState.vault <= 0 ? 'disabled style="filter: grayscale(1); opacity: 0.5;"' : ''} style="padding: 12px 20px;">Collect Profits</button>
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