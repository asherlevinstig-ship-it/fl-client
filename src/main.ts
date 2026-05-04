// Removed old Colyseus 0.14 primitive teardown patch.
// If primitive onRemove crashes return, check package versions instead of patching global prototypes.

import * as THREE from "three";
import { connectToField, connectToTown, connectToDungeon, connectToMaze, connectToUnderworld, reconnectToRoom } from "./net/colyseus";
import { TownScene, getTerrainHeight } from "./game/TownScene";
import { FieldScene } from "./game/FieldScene";
import { DungeonScene } from "./game/DungeonScene";
import { MazeScene } from "./game/MazeScene";
import { UnderworldScene } from "./game/UnderworldScene";
import { ITEM_DB } from "./ItemDatabase";
import { QUEST_DB } from "./QuestDatabase"; 

// --- NEW MANAGERS ---
import { initInputManager, keys, isShadowMapActive } from "./game/InputManager";
import { setupRoomBindings, syncStateToScene, NetworkContext } from "./game/NetworkBindings";

// --- ABILITY UI IMPORTS ---
import { 
  isSkillTreeUIOpen, 
  setIsSkillTreeUIOpen, 
  initDefaultHotbar, 
  renderHotbar, 
  openSkillTreeUI, 
  tickCooldownsUI,
  adminResetCommitments,
  playerHotbar,
  temporarySkill,
  setTemporarySkill,
  abilityCooldowns,
  setAbilityUIRoom
} from "./ui/AbilityUI";

// --- MODAL MANAGER IMPORTS ---
import { 
  openTeleportUI, openCasinoUI, openInventoryUI, 
  openChestUI, openShopUI, openBlueprintSelector, openEventInviteUI,
  openMirrorUI, isTeleportUIOpen, isCasinoUIOpen,
  isInventoryUIOpen, isChestUIOpen, isShopUIOpen, isMirrorUIOpen,
  refreshInventoryUI, refreshChestUI, refreshShopUI, renderChunkyHUD
} from "./ui/ModalManager";

// --- QUEST UI IMPORTS ---
import { openQuestUI, isQuestUIOpen, renderQuestTracker } from "./ui/QuestUI";

// --- HUD MANAGER IMPORTS ---
import {
  ensureOverlay, updateHUD, isWorldMapOpen, setIsWorldMapOpen,
  activeAttackIndicators, setMyMapMarker, mountMazeUI, unmountMazeUI,
  mountDungeonUI, unmountDungeonUI, setGlobalEvent, addGameEvent,
  openCraftingMenu, showQuestCompleteUI, openStoreMenu     
} from "./ui/HUDManager";

// --- AUTH & TRADE UI IMPORTS ---
import { isTradeUIOpen, closeTradeUI } from "./ui/TradeUI";
import { runAuthenticationFlow } from "./ui/AuthUI";

// --- COLLISION SYSTEM IMPORTS ---
import { 
  SpatialGrid, TOWN_COLLIDERS, checkTownCollision, 
  checkMazeCollision, checkUnderworldCollision, 
  checkDynamicCollision, distance 
} from "./game/CollisionSystem";

type TownRoomType = Awaited<ReturnType<typeof connectToTown>>;
type FieldRoomType = Awaited<ReturnType<typeof connectToField>>;
type DungeonRoomType = Awaited<ReturnType<typeof connectToDungeon>>;
type MazeRoomType = Awaited<ReturnType<typeof connectToMaze>>;
type UnderworldRoomType = Awaited<ReturnType<typeof connectToUnderworld>>;
type ActiveRoom = TownRoomType | FieldRoomType | DungeonRoomType | MazeRoomType | UnderworldRoomType;

type ActiveScene = TownScene | FieldScene | DungeonScene | MazeScene | UnderworldScene;
type ZoneName = "town" | "field" | "dungeon" | "maze" | "underworld";

// --- DYNAMIC PLAYER IDENTITY VARIABLES ---
let PLAYER_NAME = "";
let PLAYER_CLASS = ""; 
let PLAYER_PATHWAY = ""; 
let PLAYER_AURA_STYLE = "";

const PLAYER_ESSENCES = ["shadow", "light", "berserker", "confluence", "nature"];
const AURA_STYLES = ["tyrant", "sanctuary", "void", "storm"];

let activeRoom: ActiveRoom | null = null;
let activeScene: ActiveScene | null = null;
let currentZone: ZoneName | null = null;
let isTransitioning = false;
let cleanupRoomBindings: (() => void) | null = null;

// --- GLOBAL NETWORK CONTEXT ---
let cachedNetworkContext: NetworkContext | null = null;

let hoverX = 0; 
let hoverY = 0;

let lastFacingDx = 0;
let lastFacingDy = 1;

let gameTime = 8.0; 
const TIME_SPEED = 0.05; 

let isLocallyWolf = false;

const clientSceneryGrid = new SpatialGrid<any>(20);

const localPlayerPos = { x: 0, y: 0, initialized: false };

// --- CLIENT PREDICTION STATE ---
let inputSequenceNumber = 0;
const pendingInputs: { seq: number, inputX: number, inputZ: number, dt: number }[] = [];
const networkState = { lastSentX: 0, lastSentY: 0, lastNetworkSend: 0 };

const MARKET_STALLS = [
  { type: "🍖 Food Provisions", x: 14, y: 2 },
  { type: "🧪 Potion Shop", x: 14, y: -10 },
  { type: "⚒️ Blacksmith", x: 14, y: -22 },
  { type: "🧵 Tailor & Clothing", x: 14, y: 14 },
  { type: "🛋️ Interior Design", x: 14, y: -34 }
];

const CASINO_TABLES = [
  { type: "Roulette", x: -27, y: -12 },
  { type: "Blackjack", x: -27, y: -2 },
  { type: "Coin Toss", x: -27, y: 8 },
  { type: "Slot Machine", x: -38, y: -10 }
];

function distanceSq(x1: number, y1: number, x2: number, y2: number): number {
    return (x1 - x2) ** 2 + (y1 - y2) ** 2;
}

const heightCache = new Map<string, number>();
function getHeightCached(x: number, z: number): number {
    const key = `${x | 0},${z | 0}`;
    if (!heightCache.has(key)) {
        try {
            const h = getTerrainHeight(x, z);
            if (h !== undefined && h !== null && !isNaN(h)) {
                heightCache.set(key, h);
            } else {
                return 0; 
            }
        } catch (e) {
            return 0; 
        }
    }
    return heightCache.get(key)!;
}

const eventQueue: Array<() => void> = [];
function flushEventQueue() {
    while(eventQueue.length > 0) {
        const task = eventQueue.shift();
        if (task) task();
    }
}

function showTransientUI(id: string, text: string, color: string, duration: number = 3000, callback?: () => void) {
    let ui = document.getElementById(id);
    if (!ui) {
        ui = document.createElement("div");
        ui.id = id;
        ui.style.position = "fixed";
        ui.style.top = "40%";
        ui.style.left = "50%";
        ui.style.transform = "translate(-50%, -50%)";
        ui.style.fontSize = "36px";
        ui.style.fontWeight = "bold";
        ui.style.zIndex = "3000";
        ui.style.textAlign = "center";
        ui.style.pointerEvents = "none";
        document.body.appendChild(ui);
    }
    ui.style.color = color;
    ui.style.textShadow = `0 0 20px ${color}`;
    ui.innerHTML = text;
    ui.style.display = "block";

    if ((ui as any)._timeoutId) clearTimeout((ui as any)._timeoutId);
    (ui as any)._timeoutId = setTimeout(() => {
        ui!.style.display = "none";
        if (callback) callback();
    }, duration);
}

function getActionContext() {
    const isAnyUIOpen = isShopUIOpen || isInventoryUIOpen || 
                        isChestUIOpen || isCasinoUIOpen || isTeleportUIOpen || 
                        isQuestUIOpen || isSkillTreeUIOpen || isWorldMapOpen ||
                        isTradeUIOpen || isMirrorUIOpen ||
                        (document.getElementById("blueprint-modal")?.style.display === "block") ||
                        (document.getElementById("meditation-ui")?.style.display === "block") ||
                        (document.getElementById("crafting-modal")?.style.display === "block") || 
                        (document.getElementById("store-management-modal")?.style.display === "block");

    return {
        room: activeRoom,
        scene: activeScene,
        localPos: localPlayerPos,
        facing: { dx: lastFacingDx, dy: lastFacingDy },
        isUIOpen: isAnyUIOpen
    };
}

function rehydrateAbilityUI(room: ActiveRoom | null, me?: any) {
    if (!room) return;

    setAbilityUIRoom(room);
    initDefaultHotbar(PLAYER_PATHWAY);

    if (me && me.hotbar) {
        for (let i = 1; i <= 9; i++) {
            const slotKey = `slot${i}`;
            let value = "";
            if (typeof me.hotbar.get === "function") {
                value = me.hotbar.get(slotKey) || "";
            } else if (me.hotbar[slotKey]) {
                value = me.hotbar[slotKey];
            }
            if (value) {
                (playerHotbar as any)[slotKey] = value;
            }
        }
    }
    renderHotbar();
}

(window as any).triggerCommunion = () => {
  const ctx = getActionContext();

  if (!activeRoom || ctx.isUIOpen) return;

  const state = activeRoom.state as any;
  const me = state?.players?.get?.(activeRoom.sessionId);

  if (me && !me.isSleeping && !me.isMeditating) {
    activeRoom.send("requestCommunion");
  }
};

function initAdminPanel() {
    let panel = document.getElementById("admin-panel");
    if (panel) return;

    panel = document.createElement("div");
    panel.id = "admin-panel";
    panel.style.position = "fixed";
    panel.style.top = "20px";
    panel.style.left = "20px";
    panel.style.background = "rgba(20, 5, 5, 0.95)";
    panel.style.border = "2px solid #ff0055";
    panel.style.borderRadius = "8px";
    panel.style.padding = "15px";
    panel.style.color = "white";
    panel.style.zIndex = "9999";
    panel.style.display = "none";
    panel.style.fontFamily = "monospace";
    panel.style.boxShadow = "0 0 20px rgba(255, 0, 85, 0.5)";

    panel.innerHTML = `<h3 style="margin: 0 0 15px 0; color: #ff0055; text-align: center; letter-spacing: 2px;">🛠️ ADMIN OMNI-TOOL</h3>`;

    const zones: ZoneName[] = ["town", "field", "dungeon", "maze", "underworld"];
    
    zones.forEach(zone => {
        const btn = document.createElement("button");
        btn.innerText = `Teleport: ${zone.toUpperCase()}`;
        btn.style.display = "block";
        btn.style.width = "100%";
        btn.style.margin = "8px 0";
        btn.style.padding = "10px";
        btn.style.background = "linear-gradient(to right, #440011, #880022)";
        btn.style.color = "white";
        btn.style.border = "1px solid #ff0055";
        btn.style.borderRadius = "4px";
        btn.style.cursor = "pointer";
        btn.style.fontWeight = "bold";

        btn.onmouseenter = () => btn.style.background = "linear-gradient(to right, #880022, #ff0055)";
        btn.onmouseleave = () => btn.style.background = "linear-gradient(to right, #440011, #880022)";
        
        btn.onclick = () => {
            switchZone(zone).catch(console.error);
            panel!.style.display = "none"; 
        };
        panel.appendChild(btn);
    });

    const resetBtn = document.createElement("button");
    resetBtn.innerText = `⚠️ CLEAR SESSION & RELOAD`;
    resetBtn.style.display = "block";
    resetBtn.style.width = "100%";
    resetBtn.style.margin = "15px 0 0 0";
    resetBtn.style.padding = "10px";
    resetBtn.style.background = "#222";
    resetBtn.style.color = "#ff4444";
    resetBtn.style.border = "1px solid #ff4444";
    resetBtn.style.borderRadius = "4px";
    resetBtn.style.cursor = "pointer";
    resetBtn.onclick = () => {
       localStorage.removeItem(`rpg_reconnection_token_${PLAYER_NAME}`);
       window.location.reload();
    };
    panel.appendChild(resetBtn);

    const closeText = document.createElement("div");
    closeText.innerText = "Press [F2] or [ \\ ] to toggle this menu";
    closeText.style.fontSize = "12px";
    closeText.style.color = "#aaa";
    closeText.style.marginTop = "15px";
    closeText.style.textAlign = "center";
    panel.appendChild(closeText);

    document.body.appendChild(panel);
}

// --- NETWORK CONTEXT BUILDER ---
function buildNetworkContext(): NetworkContext {
    return {
        playerClass: PLAYER_CLASS,
        currentZone: currentZone as string,
        localPlayerPos,
        networkState,
        pendingInputs,
        activeAttackIndicators,
        clientSceneryGrid,
        getIsLocallyWolf: () => isLocallyWolf,
        setIsLocallyWolf: (val: boolean) => { isLocallyWolf = val; },
        getHeightCached,
        queueEvent: (task: () => void) => eventQueue.push(task),
        switchZone: (zone: string) => switchZone(zone as ZoneName),
        showTransientUI,
        rehydrateAbilityUI,
        refreshInventoryUI,
        refreshShopUI,
        refreshChestUI,
        setGlobalEvent,
        addGameEvent,
        setTemporarySkill,
        setMyMapMarker,
        openEventInviteUI,
        showQuestCompleteUI,
        mountMazeUI,
        unmountMazeUI,
        mountDungeonUI,
        unmountDungeonUI,
        closeTradeUI,
        setIsSkillTreeUIOpen,
        setIsWorldMapOpen
    };
}

function refreshNetworkContext() {
    cachedNetworkContext = buildNetworkContext();
}

async function switchZone(nextZone: ZoneName): Promise<void> {
  if (isTransitioning || currentZone === nextZone) return;

  isTransitioning = true;

  localPlayerPos.initialized = false;
  hoverX = 0;
  hoverY = 0;

  // Clear stale movement/camera state before joining the next room.
  pendingInputs.length = 0;
  inputSequenceNumber = 0;
  networkState.lastSentX = 0;
  networkState.lastSentY = 0;
  networkState.lastNetworkSend = 0;

  for (const key in keys) {
      keys[key as keyof typeof keys] = false;
  }

  try {
    if (cleanupRoomBindings) {
      cleanupRoomBindings();
      cleanupRoomBindings = null;
    }

    if (activeRoom) {
      try {
        await activeRoom.leave();
      } catch (e) {
        console.warn("Old room leave failed during zone switch:", e);
      }
      activeRoom = null;
    }

    localStorage.removeItem(`rpg_reconnection_token_${PLAYER_NAME}`);

    if (activeScene) {
      activeScene.dispose();
      activeScene = null;
    }
    unmountMazeUI(); 
    unmountDungeonUI();

    const container = document.getElementById("app");
    if (!container) throw new Error("Missing #app container");
    clearContainer(container);

    if (nextZone === "town") {
      activeRoom = await connectToTown(PLAYER_NAME, PLAYER_CLASS, PLAYER_PATHWAY);
      activeScene = new TownScene(container);
    } else if (nextZone === "maze") {
      activeRoom = await connectToMaze(PLAYER_NAME, PLAYER_CLASS, PLAYER_PATHWAY); 
      activeScene = new MazeScene(container);
    } else if (nextZone === "underworld") {
      activeRoom = await connectToUnderworld(PLAYER_NAME, PLAYER_CLASS, PLAYER_PATHWAY); 
      activeScene = new UnderworldScene(container);
    } else if (nextZone === "dungeon") {
      activeRoom = await connectToDungeon(PLAYER_NAME, PLAYER_CLASS, PLAYER_PATHWAY); 
      activeScene = new DungeonScene(container);
    } else {
      activeRoom = await connectToField(PLAYER_NAME, PLAYER_CLASS, PLAYER_PATHWAY); 
      activeScene = new FieldScene(container);
    }
    currentZone = nextZone; 
    
    localStorage.setItem(`rpg_last_zone_${PLAYER_NAME}`, nextZone);
    refreshNetworkContext();

    if (activeRoom && activeScene) {
      localStorage.setItem(`rpg_reconnection_token_${PLAYER_NAME}`, activeRoom.reconnectionToken);

      if(cachedNetworkContext) cleanupRoomBindings = setupRoomBindings(activeRoom, activeScene, cachedNetworkContext);
      
      try {
        rehydrateAbilityUI(activeRoom);
      } catch (err) {
        console.error("[switchZone] post-setup FAILED: rehydrateAbilityUI", err);
      }

      activeRoom.send("set_aura_style", { style: PLAYER_AURA_STYLE });

      if (typeof (activeScene as any).start === "function") {
          (activeScene as any).start();
      }

      (window as any).debugRoom = activeRoom;
    }

    if (nextZone === "underworld") {
        setTimeout(() => {
            showTransientUI(
                "underworld-intro-ui", 
                `<div style="font-size: 42px; color: #ff0055; text-shadow: 0 0 20px #ff0055, 0 0 40px #aa0000; font-weight: 900; letter-spacing: 4px; text-transform: uppercase;">
                    THE UNDERWORLD
                 </div>
                 <div style="font-size: 20px; color: #ffffff; margin-top: 15px; text-shadow: 1px 1px 5px #000; font-family: monospace;">
                    PvP is <span style="color:#ff4444">ENABLED</span>. <br/>
                    Defeat a player to escape with 5,000 Coins.<br/>
                    <span style="color:#aaaaaa">Do not fall off the edge...</span>
                 </div>`, 
                "#ffffff", 
                6000        
            );
        }, 1000);
    }
    else if (nextZone === "maze") {
        setTimeout(() => {
            showTransientUI(
                "maze-intro-ui",
                `<div style="font-size: 36px; color: #00ffaa; text-shadow: 0 0 20px #00ffaa;">THE LABYRINTH</div>
                 <div style="font-size: 18px; color: #fff; margin-top: 10px;">Find the exit before time runs out!</div>`,
                "#ffffff",
                4000
            );
        }, 1000);
    }

  } catch (error) {
    console.error(`Failed to connect to ${nextZone}.`, error);
  } finally { 
    isTransitioning = false; 
  }
}

function updateDayNightCycle(dt: number) {
    gameTime += dt * TIME_SPEED;
    if (gameTime >= 24.0) gameTime -= 24.0;

    if (!activeScene) return;
    
    if (activeScene.constructor.name === "MazeScene" || activeScene.constructor.name === "UnderworldScene" || activeScene.constructor.name === "DungeonScene") return;

    const scene3D = (activeScene as any).scene as THREE.Scene;
    if (!scene3D) return;

    let dirLight: THREE.DirectionalLight | undefined;
    let ambientLight: THREE.AmbientLight | undefined;

    scene3D.children.forEach(child => {
        if (child instanceof THREE.DirectionalLight) dirLight = child;
        if (child instanceof THREE.AmbientLight) ambientLight = child;
    });

    if (!dirLight || !ambientLight) return;
    
    if (!dirLight.userData.shadowUpgraded) {
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 200;
        dirLight.shadow.camera.bottom = -200;
        dirLight.shadow.camera.left = -200;
        dirLight.shadow.camera.right = 200;
        dirLight.shadow.camera.near = 0.5;
        dirLight.shadow.camera.far = 1000;
        dirLight.shadow.mapSize.width = 2048;
        dirLight.shadow.mapSize.height = 2048;
        dirLight.shadow.camera.updateProjectionMatrix();
        
        if (dirLight.target.parent !== scene3D) {
            scene3D.add(dirLight.target);
        }
        dirLight.userData.shadowUpgraded = true;
    }

    const sunDist = 300;
    const angle = ((gameTime - 6) / 24) * Math.PI * 2; 
    
    const skyNight = new THREE.Color(0x0b0b1a);
    const skySunrise = new THREE.Color(0xff7744);
    const skyDay = new THREE.Color(0x66bbff);
    const skySunset = new THREE.Color(0xff4422);

    const sunSunrise = new THREE.Color(0xffaa55);
    const sunDay = new THREE.Color(0xffffff);
    const sunSunset = new THREE.Color(0xff5522);
    const sunNight = new THREE.Color(0x223355); 

    let currentSky = new THREE.Color();
    let currentSun = new THREE.Color();
    let sunIntensity = 0.8;
    let ambIntensity = 0.4;
    let isNight = false;

    if (gameTime >= 5 && gameTime < 7) { 
        const t = (gameTime - 5) / 2;
        currentSky.lerpColors(skyNight, skySunrise, t);
        currentSun.lerpColors(sunNight, sunSunrise, t);
        sunIntensity = 0.2 + (t * 0.6);
        ambIntensity = 0.2 + (t * 0.2);
    } else if (gameTime >= 7 && gameTime < 10) { 
        const t = (gameTime - 7) / 3;
        currentSky.lerpColors(skySunrise, skyDay, t);
        currentSun.lerpColors(sunSunrise, sunDay, t);
        sunIntensity = 0.8;
        ambIntensity = 0.4;
    } else if (gameTime >= 10 && gameTime < 16) { 
        currentSky.copy(skyDay);
        currentSun.copy(sunDay);
        sunIntensity = 0.8;
        ambIntensity = 0.4;
    } else if (gameTime >= 16 && gameTime < 19) { 
        const t = (gameTime - 16) / 3;
        currentSky.lerpColors(skyDay, skySunset, t);
        currentSun.lerpColors(sunDay, sunSunset, t);
        sunIntensity = 0.8 - (t * 0.4);
        ambIntensity = 0.4 - (t * 0.1);
    } else if (gameTime >= 19 && gameTime < 21) { 
        const t = (gameTime - 19) / 2;
        currentSky.lerpColors(skySunset, skyNight, t);
        currentSun.lerpColors(sunSunset, sunNight, t);
        sunIntensity = 0.4 - (t * 0.2);
        ambIntensity = 0.3 - (t * 0.1);
        isNight = true;
    } else { 
        currentSky.copy(skyNight);
        currentSun.copy(sunNight);
        sunIntensity = 0.3; 
        ambIntensity = 0.15;
        isNight = true;
    }

    scene3D.background = currentSky;
    if (scene3D.fog && (scene3D.fog as any).color) {
        (scene3D.fog as any).color.copy(currentSky);
    }
    dirLight.color.copy(currentSun);
    dirLight.intensity = sunIntensity;
    ambientLight.intensity = ambIntensity;
    
    if (isNight) {
        const moonAngle = ((gameTime + 12 - 6) / 24) * Math.PI * 2;
        dirLight.position.x = localPlayerPos.x + Math.cos(moonAngle) * sunDist;
        dirLight.position.y = Math.max(20, Math.sin(moonAngle) * sunDist);
        dirLight.position.z = localPlayerPos.y + 100;
        dirLight.castShadow = false; 
    } else {
        dirLight.position.x = localPlayerPos.x + Math.cos(angle) * sunDist;
        dirLight.position.y = Math.max(20, Math.sin(angle) * sunDist);
        dirLight.position.z = localPlayerPos.y + 100; 
        dirLight.castShadow = true;
    }

    dirLight.target.position.set(localPlayerPos.x, 0, localPlayerPos.y);
}

function startHudLoop(): void {
    ensureOverlay(() => activeRoom, getActionContext);
    renderHotbar();
    
    let lastTime = performance.now();
    let frameCount = 0; 

    const tick = () => {
        const now = performance.now(); 
        const dt = Math.min((now - lastTime) / 1000, 0.1); 
        lastTime = now;
        frameCount++;

        tickCooldownsUI(dt);
        updateDayNightCycle(dt);

        if (activeRoom && activeScene) {
            flushEventQueue();

            const state = activeRoom.state as any;
            const players = state?.players;

            const me =
                players && typeof players.get === "function"
                    ? players.get(activeRoom.sessionId)
                    : undefined;

            const playerVisuals = (activeScene as any).playerVisuals;

            if (
                me &&
                playerVisuals &&
                typeof playerVisuals.has === "function" &&
                !playerVisuals.has(activeRoom.sessionId)
            ) {
                import("./game/NetworkBindings").then(m => {
                    if (activeRoom && activeScene && cachedNetworkContext) {
                        m.initPlayerVisual(
                            me,
                            activeRoom.sessionId,
                            activeRoom,
                            activeScene,
                            cachedNetworkContext
                        );
                    }
                });
            }

            if (frameCount % 180 === 0) {
                rehydrateAbilityUI(activeRoom, me);
            }

            if (!me) {
                requestAnimationFrame(tick);
                return;
            }

            if (frameCount % 30 === 0) {
                refreshInventoryUI(activeRoom, PLAYER_CLASS);
                if (isShopUIOpen) refreshShopUI(activeRoom);
                if (isChestUIOpen) refreshChestUI(activeRoom);
            }

            if (frameCount % 10 === 0) {
                renderChunkyHUD(me);
                renderQuestTracker(me);
            }

            const ctx = getActionContext();

            if (frameCount % 6 === 0 && cachedNetworkContext) {
                 syncStateToScene(activeRoom, activeScene, cachedNetworkContext);
            }

            updateHUD(
                dt, 
                activeRoom, 
                activeScene, 
                me, 
                localPlayerPos, 
                lastFacingDx, 
                lastFacingDy, 
                clientSceneryGrid, 
                ctx, 
                TOWN_COLLIDERS, 
                MARKET_STALLS, 
                CASINO_TABLES, 
                isLocallyWolf
            );

            const activeAbilities = me?.skillTree?.activeAbilities;

            if (activeAbilities && typeof activeAbilities.get === "function") {
                const shadowStep = activeAbilities.get("shadow_step");
                const upgrades = shadowStep?.upgrades;

                const wayUpg =
                    upgrades && typeof upgrades.get === "function"
                        ? upgrades.get("way_of_the_night")
                        : undefined;

                const wayRank = wayUpg ? wayUpg.currentRank : 0;

                if (wayRank >= 3 && (!temporarySkill || temporarySkill.id !== "town_recall")) {
                    setTemporarySkill({
                        id: "town_recall",
                        label: "Recall",
                        icon: "🏛️"
                    });
                }
            }

            let isDecoModeActive = false;
            if (me && me.equippedItem) {
                const equippedDef = ITEM_DB[me.equippedItem];
                if (equippedDef && equippedDef.type === "decoration") {
                    isDecoModeActive = true;
                }
            }
            if (activeScene instanceof TownScene) {
                activeScene.isDecoMode = isDecoModeActive;
            }

            if (typeof (activeScene as any).setReticlePosition === "function") {
                hoverX = localPlayerPos.x + (lastFacingDx * 5);
                hoverY = localPlayerPos.y + (lastFacingDy * 5);
                (activeScene as any).setReticlePosition(hoverX, hoverY, true, me ? me.equippedItem : ""); 
                (activeScene as any).clearHighlights(); 
            }

            if (me) {
                if (!localPlayerPos.initialized) { 
                    localPlayerPos.x = me.x; 
                    localPlayerPos.y = me.y; 
                    networkState.lastSentX = me.x;
                    networkState.lastSentY = me.y;
                    localPlayerPos.initialized = true; 
                }

                const isInputting = keys.KeyW || keys.KeyA || keys.KeyS || keys.KeyD;
                const isLocallySprinting = (keys.ShiftLeft || keys.ShiftRight) && isInputting && (me.hunger > 0) && (me.stamina > 0);
                
                if ((window as any).lastSprintState !== isLocallySprinting) {
                    activeRoom.send("setSprint", { isSprinting: isLocallySprinting });
                    (window as any).lastSprintState = isLocallySprinting;
                }

                let inputX = 0; let inputY = 0;
                let camDx = 0; let camDy = 0;

                const isMounted = me.mountedFamiliarId && me.mountedFamiliarId !== "";
                const isFlying = isMounted && me.isFlying;

                if (me.isSleeping || me.isMeditating || Date.now() < me.rootedUntil || isMounted) {
                    // Do nothing local
                } 
                else if (!ctx.isUIOpen) {
                    if (keys.KeyW) inputY -= 1; 
                    if (keys.KeyS) inputY += 1;
                    if (keys.KeyA) inputX -= 1; 
                    if (keys.KeyD) inputX += 1;

                    if (keys.ArrowUp) camDy += 1;
                    if (keys.ArrowDown) camDy -= 1;
                    if (keys.ArrowLeft) camDx -= 1;
                    if (keys.ArrowRight) camDx += 1;
                }

                if (camDx !== 0 || camDy !== 0) {
                    if (typeof (activeScene as any).panCamera === "function") {
                        (activeScene as any).panCamera(camDx * 35 * dt, camDy * 35 * dt);
                    }
                }

                if (inputX !== 0 || inputY !== 0) {
                    const length = Math.sqrt(inputX * inputX + inputY * inputY);
                    const nx = inputX / length;
                    const ny = inputY / length;

                    let angle = 0;
                    if (typeof (activeScene as any).getCameraAngle === "function") {
                        angle = (activeScene as any).getCameraAngle();
                    }

                    const dx = nx * Math.cos(angle) + ny * Math.sin(angle);
                    const dy = -nx * Math.sin(angle) + ny * Math.cos(angle); 
                    
                    lastFacingDx = dx;
                    lastFacingDy = dy;

                    const baseSpeed = me.movementSpeed || 12.0;
                    const moveSpeed = isLocallySprinting ? (baseSpeed * 1.6) : baseSpeed; 
                    const moveDist = moveSpeed * dt; 

                    let targetX = localPlayerPos.x + dx * moveDist; 
                    let targetY = localPlayerPos.y + dy * moveDist;

                    // Instantly apply local prediction
                    if (!isFlying) {
                        const isTown = currentZone === "town";
                        const isMaze = currentZone === "maze";
                        const isUnderworld = currentZone === "underworld";
                        
                        let collisionState = state;
                        if (isTown) {
                             collisionState = {
                                 buildings: state.buildings,
                                 decorations: state.decorations,
                                 scenery: clientSceneryGrid.getNearby(localPlayerPos.x, localPlayerPos.y, 15.0)
                             };
                        }

                        const isXBlocked = (
                            (isTown && checkTownCollision(targetX, localPlayerPos.y)) || 
                            (isMaze && checkMazeCollision(targetX, localPlayerPos.y)) || 
                            (isUnderworld && checkUnderworldCollision(targetX, localPlayerPos.y)) ||
                            checkDynamicCollision(collisionState, targetX, localPlayerPos.y)
                        );
                        
                        if (!isXBlocked) {
                            localPlayerPos.x = targetX;
                        }

                        const isYBlocked = (
                            (isTown && checkTownCollision(localPlayerPos.x, targetY)) || 
                            (isMaze && checkMazeCollision(localPlayerPos.x, targetY)) || 
                            (isUnderworld && checkUnderworldCollision(localPlayerPos.x, targetY)) ||
                            checkDynamicCollision(collisionState, localPlayerPos.x, targetY)
                        );
                        
                        if (!isYBlocked) {
                            localPlayerPos.y = targetY;
                        }
                    } else {
                        localPlayerPos.x = targetX;
                        localPlayerPos.y = targetY;
                    }

                    localPlayerPos.x = Math.max(-2490, Math.min(2490, localPlayerPos.x));
                    localPlayerPos.y = Math.max(-2490, Math.min(2490, localPlayerPos.y));

                    inputSequenceNumber++;

                    // Save for reconciliation
                    pendingInputs.push({
                        seq: inputSequenceNumber,
                        inputX: dx, // Send world-space direction so the server doesn't need the camera angle
                        inputZ: dy,
                        dt
                    });

                    // Send the sequence number to the server
                    activeRoom.send("move", {
                        inputX: dx,
                        inputZ: dy,
                        sprint: isLocallySprinting,
                        seq: inputSequenceNumber 
                    });
                }

                const isSwimmingLocally = distanceSq(localPlayerPos.x, localPlayerPos.y, 1200, 0) <= 1600;
                let th = 0;
                if (activeScene instanceof TownScene) {
                    th = getHeightCached(localPlayerPos.x, localPlayerPos.y);
                }
                
                const isWolfVisual = me.isSpiritAnimal || isLocallyWolf;
                (activeScene as any).updatePlayer(
                    activeRoom.sessionId, localPlayerPos.x, localPlayerPos.y, me.name, 
                    me.equippedItem, me.equipBack, me.isSleeping, me.sleepRot, 
                    isSwimmingLocally, th, me.equipHead, me.equipChest, me.equipLegs, 
                    me.equipFeet, me.equipOffHand, isWolfVisual, isLocallySprinting, me.isMeditating,
                    me.teamId, me.mountedFamiliarId, me.gender, me.skinColor, me.hairStyle, me.hairColor, me.eyeColor
                );

                if (typeof (activeScene as any).updatePlayerFishing === "function") {
                    (activeScene as any).updatePlayerFishing(
                        activeRoom.sessionId, 
                        me.fishingState || "none", 
                        me.bobberX || 0, 
                        me.bobberZ || 0
                    );
                }

                if (typeof activeScene.updateCameraFollow === "function") {
                    activeScene.updateCameraFollow(activeRoom.sessionId, dt);
                } else {
                     (activeScene as any).updateCameraFollow(activeRoom.sessionId, dt);
                }

                if (isShadowMapActive && activeScene) {
                    const camera = (activeScene as any).camera as THREE.Camera;
                    if (camera) {
                        const targetCamPos = new THREE.Vector3(localPlayerPos.x, 60, localPlayerPos.y);
                        camera.position.lerp(targetCamPos, 0.1);
                        camera.lookAt(localPlayerPos.x, 0, localPlayerPos.y);
                    }
                }
            }
        }
        requestAnimationFrame(tick);
    };
    tick();
}

function clearContainer(container: HTMLElement): void { 
  while (container.firstChild) container.removeChild(container.firstChild); 
}

async function boot(): Promise<void> {
  const container = document.getElementById("app");
  if (!container) throw new Error("Missing #app container");

  const authData = await runAuthenticationFlow();
  
  PLAYER_NAME = authData.characterName; 
  PLAYER_CLASS = authData.classId;
  PLAYER_PATHWAY = authData.pathwayId;
  PLAYER_AURA_STYLE = authData.auraStyle;

  initDefaultHotbar(PLAYER_PATHWAY);
  
  // Initialize dedicated Input Manager
  initInputManager({
      getRoom: () => activeRoom,
      getScene: () => activeScene,
      getContext: () => getActionContext(),
      getMe: () => activeRoom?.state?.players?.get(activeRoom.sessionId),
      getCurrentZone: () => currentZone,
      getHoverPos: () => ({ x: hoverX, y: hoverY }),
      getIsLocallyWolf: () => isLocallyWolf,
      getPlayerConfig: () => ({ 
          name: PLAYER_NAME, class: PLAYER_CLASS, pathway: PLAYER_PATHWAY, 
          auraStyle: PLAYER_AURA_STYLE, auraStyles: AURA_STYLES, essences: PLAYER_ESSENCES 
      }),
      setPlayerConfig: (key, val) => {
          if (key === "auraStyle") PLAYER_AURA_STYLE = val;
          if (key === "pathway") PLAYER_PATHWAY = val;
      },
      adminResetCommitments,
      initDefaultHotbar,
      renderHotbar,
      MARKET_STALLS,
      CASINO_TABLES
  });
  
  initAdminPanel();
  startHudLoop(); 

  const lastZone = (localStorage.getItem(`rpg_last_zone_${PLAYER_NAME}`) as ZoneName) || "town";
  const reconnectionToken = localStorage.getItem(`rpg_reconnection_token_${PLAYER_NAME}`);

  let reconnected = false;

  if (reconnectionToken) {
      try {
          activeRoom = await reconnectToRoom(reconnectionToken);
          
          localStorage.setItem(`rpg_reconnection_token_${PLAYER_NAME}`, activeRoom.reconnectionToken);
          
          const actualZone = activeRoom.name as ZoneName;
          currentZone = actualZone;
          
          localStorage.setItem(`rpg_last_zone_${PLAYER_NAME}`, actualZone);

          refreshNetworkContext();

          clearContainer(container);
          
          if (actualZone === "town") activeScene = new TownScene(container);
          else if (actualZone === "maze") activeScene = new MazeScene(container);
          else if (actualZone === "underworld") activeScene = new UnderworldScene(container);
          else if (actualZone === "dungeon") activeScene = new DungeonScene(container);
          else activeScene = new FieldScene(container);
          
          if (activeRoom && activeScene && cachedNetworkContext) {
              cleanupRoomBindings = setupRoomBindings(activeRoom, activeScene, cachedNetworkContext);

              rehydrateAbilityUI(activeRoom);
              activeRoom.send("set_aura_style", { style: PLAYER_AURA_STYLE });

              if (typeof (activeScene as any).start === "function") {
                  (activeScene as any).start();
              }

              (window as any).debugRoom = activeRoom;
              
              reconnected = true;
              console.log(`Successfully reconnected to ${actualZone} as ${PLAYER_NAME}`);
          }
      } catch (e) {
          console.warn("Session expired or room closed. Falling back to fresh join.");
          localStorage.removeItem(`rpg_reconnection_token_${PLAYER_NAME}`);
      }
  }

  if (!reconnected) {
      await switchZone(lastZone); 
  }
}

boot().catch(console.error);