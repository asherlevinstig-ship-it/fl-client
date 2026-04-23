import * as THREE from "three";
import { connectToField, connectToTown, connectToDungeon, connectToMaze, connectToUnderworld, reconnectToRoom } from "./net/colyseus";
import { TownScene, getTerrainHeight } from "./game/TownScene";
import { FieldScene } from "./game/FieldScene";
import { DungeonScene } from "./game/DungeonScene";
import { MazeScene } from "./game/MazeScene";
import { UnderworldScene } from "./game/UnderworldScene";
import { FloorFieldState } from "./schema/FloorFieldState";
import { ITEM_DB } from "./ItemDatabase";
import { QUEST_DB } from "./QuestDatabase"; 

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
  abilityCooldowns
} from "./ui/AbilityUI";

// --- MODAL MANAGER IMPORTS ---
import { 
  openQuestUI, 
  openTeleportUI, 
  openCasinoUI, 
  openInventoryUI, 
  openChestUI, 
  openShopUI, 
  openBlueprintSelector,
  isQuestUIOpen,
  isTeleportUIOpen,
  isCasinoUIOpen,
  isInventoryUIOpen,
  isChestUIOpen,
  isShopUIOpen,
  refreshInventoryUI,
  refreshChestUI,
  refreshShopUI,
  renderChunkyHUD
} from "./ui/ModalManager";

// --- HUD MANAGER IMPORTS ---
import {
  ensureOverlay,
  updateHUD,
  isWorldMapOpen,
  setIsWorldMapOpen,
  activeAttackIndicators,
  setMyMapMarker,
  mountMazeUI,
  unmountMazeUI,
  mountDungeonUI,
  unmountDungeonUI,
  setGlobalEvent,
  addGameEvent,
  openCraftingMenu, 
  openStoreMenu     
} from "./ui/HUDManager";

// --- AUTH & TRADE UI IMPORTS ---
import { setupTradeClient, isTradeUIOpen, closeTradeUI } from "./ui/TradeUI";
import { runAuthenticationFlow } from "./ui/AuthUI";

import { attemptAttack, attemptAbility, attemptQuickChat, toggleChatChannel, currentChatChannel, ActionContext, attemptFishing } from "./game/PlayerController";
import { getSkillDef } from "./data/AbilityDatabase";

// --- COLLISION SYSTEM IMPORTS ---
import { 
  SpatialGrid, 
  TOWN_COLLIDERS, 
  checkTownCollision, 
  checkMazeCollision,
  checkUnderworldCollision,
  checkDynamicCollision, 
  distance 
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

let hoverX = 0; 
let hoverY = 0;

let lastFacingDx = 0;
let lastFacingDy = 1;

let gameTime = 8.0; 
const TIME_SPEED = 0.05; 

export let isShadowMapActive = false;
let isLocallyWolf = false;

const clientSceneryGrid = new SpatialGrid<any>(20);

const keys = { 
  KeyW: false, KeyA: false, KeyS: false, KeyD: false, 
  ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false, 
  ShiftLeft: false, ShiftRight: false
};

const localPlayerPos = { x: 0, y: 0, initialized: false };
const localTargetPos = { x: 0, z: 0 };

// --- CLIENT PREDICTION STATE ---
let inputSequenceNumber = 0;
const pendingInputs: { seq: number, x: number, y: number }[] = [];
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

function getActionContext(): ActionContext {
    const isAnyUIOpen = isShopUIOpen || isInventoryUIOpen || 
                        isChestUIOpen || isCasinoUIOpen || isTeleportUIOpen || 
                        isQuestUIOpen || isSkillTreeUIOpen || isWorldMapOpen ||
                        isTradeUIOpen || 
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

function clearContainer(container: HTMLElement): void { 
  while (container.firstChild) container.removeChild(container.firstChild); 
}

function sendMove(room: ActiveRoom, x: number, y: number): void { 
  const ctx = getActionContext();
  if (room && (room.connection as any).isOpen) {
      if (!isTransitioning && !ctx.isUIOpen) {
        inputSequenceNumber++;
        pendingInputs.push({ seq: inputSequenceNumber, x, y });
        (room as any).send("move", { x, y, seq: inputSequenceNumber }); 
      }
  }
}

(window as any).triggerCommunion = () => {
  const ctx = getActionContext();
  if (activeRoom && !ctx.isUIOpen) {
    const state = activeRoom.state as any;
    const me = state.players.get(activeRoom.sessionId);
    if (me && !me.isSleeping && !me.isMeditating) {
        activeRoom.send("requestCommunion");
    }
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
        localStorage.removeItem("rpg_reconnection_token");
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

// --- CHUNKY QUEST TRACKER UI ---
export function renderQuestTracker(me: any) {
    let tracker = document.getElementById("quest-tracker");
    if (!tracker) {
        tracker = document.createElement("div");
        tracker.id = "quest-tracker";
        tracker.style.position = "fixed";
        tracker.style.top = "20px";
        tracker.style.right = "20px";
        tracker.style.display = "flex";
        tracker.style.flexDirection = "column";
        tracker.style.gap = "15px";
        tracker.style.zIndex = "40";
        tracker.style.fontFamily = "'Nunito', 'Segoe UI Rounded', sans-serif";
        tracker.style.pointerEvents = "none";
        document.body.appendChild(tracker);
    }

    let html = "";
    if (me && me.activeQuests && me.activeQuests.size > 0) {
        me.activeQuests.forEach((qState: any, qId: string) => {
            const def = QUEST_DB[qId];
            if (def) {
                const reqAmt = def.objectives[0]?.requiredAmount || 1;
                const curAmt = qState.currentAmount || 0;
                const pct = Math.min(100, (curAmt / reqAmt) * 100);

                html += `
                    <div style="background: #1e293b; border: 4px solid #38bdf8; border-radius: 20px; padding: 15px; width: 280px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); pointer-events: auto;">
                        <div style="color: #fde047; font-size: 18px; font-weight: 900; text-transform: uppercase; border-bottom: 4px solid #334155; padding-bottom: 8px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px;">
                            <span style="font-size: 24px; filter: drop-shadow(0 2px 0 rgba(0,0,0,0.5));">📜</span> ${def.title}
                        </div>
                        <div style="color: #f8fafc; font-size: 14px; font-weight: 700; line-height: 1.4; margin-bottom: 15px;">
                            ${def.dialogue.replace(/<span class='hud-key'>/g, "<span style='background: white; color: #1e293b; padding: 2px 6px; border-radius: 6px; border: 2px solid #cbd5e1; font-weight: 900; font-size: 12px;'>")}
                        </div>
                        <div style="background: #0f172a; padding: 10px; border-radius: 12px; border: 3px solid #334155;">
                            <div style="color: #38bdf8; font-size: 12px; font-weight: 900; margin-bottom: 6px; text-transform: uppercase;">Objective Progress:</div>
                            <div style="width: 100%; height: 14px; background: #1e293b; border-radius: 7px; overflow: hidden; border: 2px solid #475569;">
                                <div style="width: ${pct}%; height: 100%; background: #22c55e; border-right: 2px solid #16a34a; transition: width 0.3s ease;"></div>
                            </div>
                            <div style="text-align: right; color: #fff; font-size: 14px; font-weight: 900; margin-top: 6px;">
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

// --- COLYSEUS HYDRATION HELPER ---
function safeBind(getCollection: () => any, onAdd: (item: any, id: string) => void, onRemove?: (item: any, id: string) => void) {
    const collection = getCollection();
    
    if (!collection) {
        setTimeout(() => safeBind(getCollection, onAdd, onRemove), 50);
        return;
    }
    
    if (typeof collection.onAdd === "function" && !(collection as any)._isBound) {
        collection.onAdd(onAdd);
        if (onRemove) collection.onRemove(onRemove);
        (collection as any)._isBound = true; 
        
        if (typeof collection.forEach === "function") {
            collection.forEach((item: any, id: string) => {
                onAdd(item, id);
            });
        }
    } else if (!(collection as any)._isBound) {
        setTimeout(() => safeBind(getCollection, onAdd, onRemove), 50);
    }
}

function initPlayerVisual(player: any, id: string, room: ActiveRoom, sceneObj: ActiveScene) {
    const safeX = isNaN(player.x) ? 0 : player.x;
    const safeY = isNaN(player.y) ? 0 : player.y;

    const isSwim = distanceSq(safeX, safeY, 1200, 0) <= 1600;
    let th = 0;
    if (sceneObj instanceof TownScene) {
        th = getHeightCached(safeX, safeY);
    }
    
    if (typeof (sceneObj as any).addPlayer === "function") {
        (sceneObj as any).addPlayer(id, id === room.sessionId, player.name);
    }

    if (typeof (sceneObj as any).updatePlayer === "function") {
        (sceneObj as any).updatePlayer(id, safeX, safeY, player.name, player.equippedItem, player.equipBack, player.isSleeping, player.sleepRot, isSwim, th, player.equipHead, player.equipChest, player.equipLegs, player.equipFeet, player.equipOffHand, player.isSpiritAnimal, player.isSprinting, player.isMeditating, player.teamId, player.mountedFamiliarId);
    }
    
    if (id === room.sessionId) {
        if (typeof (sceneObj as any).playerVisuals !== "undefined") {
            const v = (sceneObj as any).playerVisuals.get(id);
            if (v) {
                v.mesh.position.set(safeX, th, safeY);
                v.targetPosition.set(safeX, th, safeY);
            } 
        }

        safeBind(() => player.inventory, () => refreshInventoryUI(room, PLAYER_CLASS), () => refreshInventoryUI(room, PLAYER_CLASS));
        
        if (typeof player.listen === "function") {
            player.listen("coins", () => {
                refreshInventoryUI(room, PLAYER_CLASS);
                refreshShopUI(room);
            });
            player.listen("level", () => refreshInventoryUI(room, PLAYER_CLASS));
            player.listen("rank", () => refreshInventoryUI(room, PLAYER_CLASS));
        }
    }
}

function setupRoomBindings(room: ActiveRoom, sceneObj: ActiveScene): () => void {
  room.onLeave((code: number) => {
      console.warn(`Connection closed (Code: ${code}).`);
      if (activeRoom === room) activeRoom = null;
      setIsSkillTreeUIOpen(false);
      setIsWorldMapOpen(false);
      closeTradeUI(); 
      
      unmountMazeUI(); 
      unmountDungeonUI();

      const closeButtons = [
        "close-shop-btn", "close-inv-btn", "close-chest-btn", 
        "close-casino-btn", "close-teleport-btn", "close-quest-btn", 
        "close-bp-btn"
      ];
      closeButtons.forEach(id => document.getElementById(id)?.click());

      const localModals = ["world-map-modal", "skill-tree-modal", "meditation-ui", "communion-ui"];
      localModals.forEach(id => {
          const m = document.getElementById(id);
          if (m && document.body.contains(m)) {
              if (id === "world-map-modal" || id === "meditation-ui") m.style.display = "none";
              else document.body.removeChild(m);
          }
      });
  });

  room.onError((code: number, message?: string) => {
      console.error(`Colyseus Error [${code}]: ${message}`);
  });

  room.onMessage("global_event_sync", (data: { name: string, remainingMs: number }) => {
      setGlobalEvent(data.name, Date.now() + data.remainingMs);
  });

  room.onMessage("server_event_teleport", (data: { zone: string }) => {
      switchZone(data.zone as ZoneName).catch(console.error);
  });

  room.onMessage("close_all_ui", () => {
      const closeButtons = [
        "close-shop-btn", "close-inv-btn", "close-chest-btn", 
        "close-casino-btn", "close-teleport-btn", "close-quest-btn", 
        "close-bp-btn"
      ];
      closeButtons.forEach(id => document.getElementById(id)?.click());

      const localModals = ["world-map-modal", "skill-tree-modal", "meditation-ui", "communion-ui", "crafting-modal", "store-management-modal"];
      localModals.forEach(id => {
          const m = document.getElementById(id);
          if (m && document.body.contains(m)) {
              if (id === "world-map-modal" || id === "meditation-ui" || id === "crafting-modal" || id === "store-management-modal") {
                  m.style.display = "none";
              } else {
                  document.body.removeChild(m);
              }
          }
      });
      
      setIsSkillTreeUIOpen(false);
      setIsWorldMapOpen(false);
  });

  room.onMessage("hud_message", (message: string) => {
      eventQueue.push(() => {
          showTransientUI("general-hud-msg", message, "#ffffff", 3000);
      });
  });

  room.onMessage("server_event_log", (data: { html: string, type: string }) => {
      addGameEvent(data.html, data.type);
  });

  room.onMessage("chat_received", (data: { senderId: string, senderName: string, text: string, channel: string, teamId: number }) => {
      let isTeammate = false;
      if (room.state && (room.state as any).players) {
          const myState = (room.state as any).players.get(room.sessionId);
          isTeammate = myState && myState.teamId > 0 && myState.teamId === data.teamId;
      }

      eventQueue.push(() => {
          if (sceneObj && typeof (sceneObj as any).showChatBubble === "function") {
              (sceneObj as any).showChatBubble(data.senderId, data.text, isTeammate);
          }
      });

      const prefix = data.channel === "team" ? "[Team]" : "[Local]";
      const colorClass = data.channel === "team" ? "text-cyan" : "text-green";
      addGameEvent(`<span class="${colorClass}">${prefix}</span> <b>${data.senderName}:</b> ${data.text}`, "event-info");
  });

  room.onMessage("maze_escaped", (data: { text: string }) => {
      showTransientUI("maze-result-ui", data.text, "#00ffaa", 3000, () => {
          switchZone("town").catch(console.error);
      });
  });

  room.onMessage("maze_failed", (data: { message: string }) => {
      showTransientUI("maze-result-ui", data.message, "#ff0000", 3000, () => {
          switchZone("underworld" as ZoneName).catch(console.error);
      });
  });

  room.onMessage("maze_timer_sync", (data: { remainingSeconds: number }) => {
      mountMazeUI(data.remainingSeconds);
  });

  room.onMessage("dungeon_sync", (data: any) => {
      mountDungeonUI(data.wave, data.maxWaves, data.enemiesLeft, data.timeRemaining);
  });

  room.onMessage("dungeon_announcement", (data: { text: string }) => {
      showTransientUI("dungeon-announce-ui", data.text, "#ffaa00", 2500);
  });

  room.onMessage("dungeon_cleared", (data: { text: string }) => {
      unmountDungeonUI();
      showTransientUI("dungeon-result-ui", data.text, "#00ffaa", 4000, () => {
          switchZone("town").catch(console.error);
      });
  });

  room.onMessage("dungeon_failed", (data: { message: string }) => {
      unmountDungeonUI();
      showTransientUI("dungeon-result-ui", data.message, "#ff0000", 3500, () => {
          switchZone("underworld").catch(console.error);
      });
  });

  room.onMessage("underworld_death", (data: { message: string }) => {
      showTransientUI("underworld-result-ui", data.message, "#ff0000", 3500, () => {
          switchZone("town").catch(console.error);
      });
  });

  room.onMessage("underworld_escape", (data: { message: string }) => {
      showTransientUI("underworld-result-ui", data.message, "#00aaff", 3500, () => {
          switchZone("town").catch(console.error);
      });
  });

  room.onMessage("trigger_void_fall", () => {
      eventQueue.push(() => {
          if (sceneObj && typeof (sceneObj as any).triggerPlayerVoidFall === "function") {
              const visual = (sceneObj as any).playerVisuals?.get(room.sessionId);
              if (visual && visual.mesh) {
                  (sceneObj as any).triggerPlayerVoidFall(visual.mesh);
              }
          }
      });
  });

  room.onMessage("forcePosition", (data: any) => {
      localPlayerPos.x = data.x;
      localPlayerPos.y = data.z !== undefined ? data.z : data.y; 
      localPlayerPos.initialized = true; 
      
      networkState.lastSentX = localPlayerPos.x;
      networkState.lastSentY = localPlayerPos.y;
      pendingInputs.length = 0;

      if (sceneObj && typeof (sceneObj as any).playerVisuals !== "undefined") {
          const visual = (sceneObj as any).playerVisuals.get(room.sessionId);
          if (visual) {
              visual.targetPosition.x = localPlayerPos.x;
              visual.targetPosition.z = localPlayerPos.y;
          }
      }
  });

  room.onMessage("spawnHazard", (hazard: any) => {
      eventQueue.push(() => {
          if (sceneObj && typeof (sceneObj as any).addHazard === "function") {
              (sceneObj as any).addHazard(hazard.id, hazard.type, hazard.x, hazard.y || hazard.z, hazard.rank, hazard.customData);
          }
      });
  });

  room.onMessage("removeHazard", (data: { id: string }) => {
      eventQueue.push(() => {
          if (sceneObj && typeof (sceneObj as any).removeHazard === "function") {
              (sceneObj as any).removeHazard(data.id);
          }
      });
  });

  room.onMessage("unlockTemporaryAbility", (data: any) => {
      setTemporarySkill(data);
  });

  room.onMessage("showCommunionQuestion", (data: { question: string }) => {
      let ui = document.getElementById("communion-ui");
      if (!ui) {
          ui = document.createElement("div");
          ui.id = "communion-ui";
          ui.style.position = "fixed";
          ui.style.top = "10%";
          ui.style.left = "50%";
          ui.style.transform = "translateX(-50%)";
          ui.style.background = "rgba(10, 15, 25, 0.95)";
          ui.style.border = "2px solid #00aaff";
          ui.style.borderRadius = "12px";
          ui.style.padding = "20px 40px";
          ui.style.color = "white";
          ui.style.textAlign = "center";
          ui.style.zIndex = "1000";
          ui.style.boxShadow = "0 0 30px rgba(0, 170, 255, 0.4)";
          ui.style.fontFamily = "Arial, sans-serif";
          ui.style.pointerEvents = "none"; 
          document.body.appendChild(ui);
      }
      ui.innerHTML = `
          <h3 style="color: #00aaff; margin: 0 0 10px 0; letter-spacing: 2px;">ASTRAL COMMUNION</h3>
          <div style="font-size: 20px; font-weight: bold; text-shadow: 1px 1px 4px #000;">${data.question}</div>
          <div style="color: #aaa; font-size: 14px; margin-top: 10px;">(Step into the correct Mana Pillar)</div>
      `;
      ui.style.display = "block";
  });

  room.onMessage("clearCommunionQuestion", () => {
      const ui = document.getElementById("communion-ui");
      if (ui) ui.style.display = "none";
  });

  room.onMessage("meditation_question", (data: { index: number, text: string }) => {
      const medUI = document.getElementById("meditation-ui");
      const qContainer = document.getElementById("med-question-container");
      const statusText = document.getElementById("med-status");
      
      if (medUI && qContainer && statusText) {
          medUI.style.display = "block";
          statusText.innerText = "Clear your mind and fill in the missing data. Press [ESC] to stop.";
          statusText.style.color = "#aaaaaa";

          const parts = data.text.split('_');
          qContainer.innerHTML = `
              ${parts[0]} 
              <input type="text" id="med-input" autocomplete="off" style="
                  background: transparent; 
                  border: none; 
                  border-bottom: 2px solid #00aaff; 
                  color: #00ffaa; 
                  font-size: 22px; 
                  fontWeight: bold; 
                  width: 150px; 
                  text-align: center; 
                  outline: none;
              "> 
              ${parts[1]}
          `;

          const input = document.getElementById("med-input") as HTMLInputElement;
          if (input) {
              input.focus();
              input.addEventListener("keydown", (e) => {
                  if (e.key === "Enter") {
                      activeRoom?.send("submit_meditation", { answer: input.value, index: data.index });
                      input.disabled = true;
                  }
              });
          }
      }
  });

  room.onMessage("meditation_result", (data: { correct: boolean, text: string }) => {
      const statusText = document.getElementById("med-status");
      const input = document.getElementById("med-input") as HTMLInputElement;
      
      if (statusText) {
          statusText.innerText = data.text;
          statusText.style.color = data.correct ? "#00ffaa" : "#ff4444";
      }
      
      if (input && !data.correct) {
          input.disabled = false;
          input.value = "";
          input.focus();
          input.style.animation = "shake 0.3s";
          setTimeout(() => input.style.animation = "", 300);
      } else if (input && data.correct) {
           input.style.borderBottomColor = "#00ffaa";
      }
  });

  room.onMessage("meditation_upgrade_choice", () => {
      const qContainer = document.getElementById("med-question-container");
      const statusText = document.getElementById("med-status");
      
      if (qContainer && statusText) {
          statusText.innerText = "Milestone Reached! Choose an Aura Evolution.";
          statusText.style.color = "#ffaa00";

          qContainer.innerHTML = `
              <div style="display:flex; gap:20px; justify-content:center; margin-top: 10px;">
                  <button id="btn-upg-str" class="st-btn-hover" style="padding:15px 20px; background:linear-gradient(to bottom, #aa0000, #550000); border: 2px solid #ff4444; color:white; font-weight:bold; cursor:pointer; border-radius:8px; font-size: 16px; transition: all 0.2s;">
                      💥 +1.0 Aura Strength<br><span style="font-size:12px; color:#ffaaaa;">(Increases Aura Power & Mana Drain)</span>
                  </button>
                  <button id="btn-upg-ctl" class="st-btn-hover" style="padding:15px 20px; background:linear-gradient(to bottom, #0055aa, #002255); border: 2px solid #00aaff; color:white; font-weight:bold; cursor:pointer; border-radius:8px; font-size: 16px; transition: all 0.2s;">
                      🌀 +1.0 Aura Control<br><span style="font-size:12px; color:#aaffff;">(Stabilizes Aura & Reduces Mana Drain)</span>
                  </button>
              </div>
          `;

          document.getElementById("btn-upg-str")!.onclick = () => {
              activeRoom?.send("choose_aura_upgrade", { choice: "strength" });
          };
          document.getElementById("btn-upg-ctl")!.onclick = () => {
              activeRoom?.send("choose_aura_upgrade", { choice: "control" });
          };
      }
  });

  room.onMessage("enemyTelegraph", (data: any) => {
      eventQueue.push(() => {
          if (sceneObj && typeof (sceneObj as any).playEnemyTelegraph === "function") {
              const th = sceneObj instanceof TownScene ? getHeightCached(data.x, data.z) : 0;
              (sceneObj as any).playEnemyTelegraph(data.id, data.type, data.x, data.z, data.radius, data.time, th);
          }
          activeAttackIndicators.push({ x: data.x, z: data.z, timer: data.time || 2.0 });
      });
  });

  room.onMessage("enemyAttackExecuted", (data: any) => {
      eventQueue.push(() => {
          if (sceneObj && typeof (sceneObj as any).playEnemyAttackVisual === "function") {
              const th = sceneObj instanceof TownScene ? getHeightCached(data.x, data.z) : 0;
              (sceneObj as any).playEnemyAttackVisual(data.id, data.type, data.x, data.z, data.radius, th);
          }
          activeAttackIndicators.push({ x: data.x, z: data.z, timer: 1.0 });
      });
  });

  room.onMessage("combatEvent", (data: any) => { 
      eventQueue.push(() => {
          if (sceneObj instanceof FieldScene || sceneObj instanceof DungeonScene) (sceneObj as any).playCombatEvent(data); 
      });
  });

  room.onMessage("playerAttacked", (data: any) => {
      eventQueue.push(() => {
          if (sceneObj && typeof (sceneObj as any).playAttackVisual === "function") {
              if (data.damage === undefined) {
                  if (data.id === room.sessionId) return;
                  (sceneObj as any).playAttackVisual(data.id, data.targetX, data.targetZ);
                  return; 
              }

              const dmg = data.damage;
              const isCrit = data.isCrit || false;
              const isDoT = data.isDoT || false;

              let color = "#ffffff"; 
              let displayDmg = dmg.toString();

              if (isCrit) { color = "#ffcc00"; displayDmg = `${dmg}!`; } 
              else if (isDoT) { color = "#aa00ff"; }

              let yPos = 0;
              if (sceneObj instanceof TownScene) yPos = getHeightCached(data.targetX, data.targetZ);
              
              if (typeof (sceneObj as any).showDamageNumber === "function") {
                  (sceneObj as any).showDamageNumber(data.targetX, yPos + 1.5, data.targetZ, displayDmg, color);
              }
          }
      });
  });

  room.onMessage("abilityUsed", (data: any) => {
      if (data.id === room.sessionId) {
          if (data.abilityId === "spirit_animal") isLocallyWolf = true;
          else if (data.abilityId === "spirit_animal_end") isLocallyWolf = false;
          if (data.abilityId === "map_marker_placed") setMyMapMarker({ x: data.targetX, z: data.targetZ });
      }

      eventQueue.push(() => {
          if (data.abilityId === "heavenly_judgment_move" || data.abilityId === "orbital_strike_mini_move") {
              if (sceneObj && typeof (sceneObj as any).updateHazard === "function") {
                  (sceneObj as any).updateHazard(data.id, data.targetX, data.targetZ);
              }
              return; 
          }

          if (sceneObj && typeof (sceneObj as any).playAbilityVisual === "function") {
              if (data.id !== room.sessionId || !["umbral_dash", "basic_dash", "shadow_step", "reaper_step"].includes(data.abilityId)) {
                  (sceneObj as any).playAbilityVisual(data.id, data.abilityId, data.targetX, data.targetZ);
              }
          }
      });
  });

  room.onMessage("casinoResult", (data: any) => {
      eventQueue.push(() => {
          if (isCasinoUIOpen) {
              if ((window as any).casinoAnimInterval) {
                  clearInterval((window as any).casinoAnimInterval);
                  (window as any).casinoAnimInterval = null;
              }

              if (data.game === "Slot Machine") {
                  const s1 = document.getElementById("2d-slot-1");
                  const s2 = document.getElementById("2d-slot-2");
                  const s3 = document.getElementById("2d-slot-3");
                  if (s1) s1.classList.remove("slot-blur");
                  if (s2) s2.classList.remove("slot-blur");
                  if (s3) s3.classList.remove("slot-blur");
                  
                  const match = data.text.match(/\[ (.*?) \| (.*?) \| (.*?) \]/);
                  if (match && s1 && s2 && s3) {
                      s1.innerText = match[1];
                      s2.innerText = match[2];
                      s3.innerText = match[3];
                  }
              } else if (data.game === "Coin Toss") {
                  const coin = document.getElementById("2d-coin");
                  if (coin) {
                      coin.classList.remove("flipping");
                      coin.innerText = data.text.includes("HEADS") || data.text.includes("heads") ? "H" : (data.text.includes("TAILS") || data.text.includes("tails") ? "T" : "?");
                  }
              } else if (data.game === "Roulette") {
                  const wheel = document.getElementById("2d-roulette");
                  if (wheel) wheel.classList.remove("spinning");
              }

              const balanceEl = document.getElementById("casino-balance");
              if (balanceEl) balanceEl.innerText = data.newBalance;

              const resultEl = document.getElementById("casino-result");
              if (resultEl) {
                  resultEl.innerHTML = data.text;
                  if (data.winnings > 0) {
                      resultEl.style.color = "#00ffaa";
                      resultEl.style.animation = "pulse 0.5s 3";
                  } else {
                      resultEl.style.color = "#ff5555";
                      resultEl.style.animation = "none";
                  }
              }
          }
      });
  });

  room.onMessage("playCasinoVisual", (data: any) => {
      eventQueue.push(() => {
          if (sceneObj instanceof TownScene) {
              (sceneObj as any).playCasinoVisual(data.game);
          }
      });
  });

  room.onMessage("fishingResult", (data: { success: boolean, item?: string, message?: string }) => {
      eventQueue.push(() => {
          if (data.success) {
              showTransientUI("fishing-result-ui", `🎣 Caught: ${data.item}!`, "#00ffaa", 3000);
          } else {
              showTransientUI("fishing-result-ui", `❌ ${data.message || "The fish got away!"}`, "#ff4444", 3000);
          }
      });
  });

  // ==========================================
  // 2. STATE LISTENERS (With Bulletproof Getters)
  // ==========================================

  // PLAYERS
  safeBind(() => room.state?.players, (p: any, id: string) => {
      initPlayerVisual(p, id, room, sceneObj);
  }, (p: any, id: string) => {
      if (typeof (sceneObj as any).removePlayer === "function") {
          (sceneObj as any).removePlayer(id);
      }
  });

  // DECORATIONS
  safeBind(() => room.state?.decorations, (deco: any, id: string) => {
      if (sceneObj instanceof TownScene) {
          const terrainY = getHeightCached(deco.x, deco.z);
          (sceneObj as any).addDecoration(deco.id, deco.type, deco.x, terrainY + 0.05, deco.z, deco.rotation);
      }
      safeBind(() => deco.inventory, () => refreshChestUI(room), () => refreshChestUI(room));
      if (deco.inventory && typeof deco.inventory.onChange === "function") {
          deco.inventory.onChange(() => refreshChestUI(room));
      }
  }, (deco: any, id: string) => {
      if (sceneObj instanceof TownScene) (sceneObj as any).removeDecoration(deco.id);
  });

  // STORES
  safeBind(() => room.state?.stores, (store: any, id: string) => {
      if (typeof store.listen === "function") {
          store.listen("vault", () => refreshShopUI(room));
          store.listen("ownerId", () => refreshShopUI(room));
      }
      safeBind(() => store.inventory, () => refreshShopUI(room), () => refreshShopUI(room));
      if (store.inventory && typeof store.inventory.onChange === "function") {
          store.inventory.onChange(() => refreshShopUI(room));
      }
  });

  // FAMILIARS
  safeBind(() => room.state?.familiars, (fam: any, id: string) => {
      if (sceneObj && (sceneObj as any).familiarRenderer) {
          const safeX = isNaN(fam.x) ? 0 : fam.x;
          const safeY = isNaN(fam.y) ? 0 : fam.y;
          let th = 0;
          if (sceneObj instanceof TownScene) th = getHeightCached(safeX, safeY);
          
          if (typeof (sceneObj as any).familiarRenderer.addFamiliar === "function") {
              (sceneObj as any).familiarRenderer.addFamiliar(id, fam.type, safeX, th, safeY);
          }
      }
  }, (fam: any, id: string) => {
      if (sceneObj && (sceneObj as any).familiarRenderer) {
          if (typeof (sceneObj as any).familiarRenderer.removeFamiliar === "function") {
              (sceneObj as any).familiarRenderer.removeFamiliar(id);
          }
      }
  });

  // ENEMIES
  safeBind(() => room.state?.enemies, (enemy: any, id: string) => {
      if (typeof (sceneObj as any).addEnemy === "function") {
          (sceneObj as any).addEnemy(id, enemy.name);
      }
  }, (enemy: any, id: string) => {
      if (typeof (sceneObj as any).removeEnemy === "function") {
          (sceneObj as any).removeEnemy(id);
      }
  });

  // LOOT ITEMS
  safeBind(() => room.state?.lootItems, (item: any, id: string) => {
      // Intercept Coins and send them to our custom 3D renderer
      if (item.kind.startsWith("Coin_")) {
          if (sceneObj && typeof (sceneObj as any).spawnCoinMesh === "function") {
              (sceneObj as any).spawnCoinMesh(id, item.x, item.y);
          }
          return; 
      }

      if (sceneObj instanceof FieldScene || sceneObj instanceof DungeonScene) {
          if (typeof (sceneObj as any).addLootItem === "function") {
              (sceneObj as any).addLootItem(id, item.kind, item.x, item.y, item.scale, item.rotation);
          }
      }
      if (sceneObj instanceof TownScene) {
          if (typeof (sceneObj as any).addLootItem === "function") {
              (sceneObj as any).addLootItem(id, item.kind, item.x, item.y, item.isOpen);
          }
      }
  }, (item: any, id: string) => {
      if (item.kind && item.kind.startsWith("Coin_")) {
          if (sceneObj && typeof (sceneObj as any).removeCoinMesh === "function") {
              (sceneObj as any).removeCoinMesh(id);
          }
          return;
      }

      if (sceneObj instanceof FieldScene || sceneObj instanceof DungeonScene) {
          if (typeof (sceneObj as any).removeLootItem === "function") {
              (sceneObj as any).removeLootItem(id);
          }
      }
  });

  // SCENERY
  safeBind(() => room.state?.scenery, (item: any, id: string) => {
      clientSceneryGrid.add(item, item.x, item.y);
      if (sceneObj instanceof TownScene) {
          if (typeof (sceneObj as any).addScenery === "function") {
              (sceneObj as any).addScenery(item.id, item.kind, item.x, item.y, item.scale, item.rotation);
          }
      }
  }, (item: any, id: string) => {
      clientSceneryGrid.remove(item, item.x, item.y);
      if (sceneObj instanceof TownScene) {
          if (typeof (sceneObj as any).removeScenery === "function") {
              (sceneObj as any).removeScenery(item.id);
          }
      }
  });

  // LAND PLOTS
  safeBind(() => room.state?.landPlots, (plot: any, id: string) => {
      if (sceneObj instanceof TownScene) {
          const worldX = plot.gridX * 20 + 10;
          const worldZ = plot.gridY * 20 + 10;
          const terrainY = getHeightCached(worldX, worldZ);
          if (typeof (sceneObj as any).addLandPlot === "function") {
              (sceneObj as any).addLandPlot(plot.id, plot.gridX, plot.gridY, plot.ownerId, plot.ownerName, terrainY);
          }
      }
  }, (plot: any, id: string) => {
      if (sceneObj instanceof TownScene) {
          if (typeof (sceneObj as any).removeLandPlot === "function") {
              (sceneObj as any).removeLandPlot(plot.id);
          }
      }
  });

  // BUILDINGS
  safeBind(() => room.state?.buildings, (bldg: any, id: string) => {
      if (sceneObj instanceof TownScene) {
          const terrainY = getHeightCached(bldg.x, bldg.z);
          if (typeof (sceneObj as any).addBuilding === "function") {
              (sceneObj as any).addBuilding(bldg.id, bldg.type, bldg.x, bldg.z, bldg.isConstructed, bldg.progress, bldg.targetProgress, terrainY);
          }
      }
  });

  // Initialize Trade Receivers
  setupTradeClient(room);

  return () => { 
      try { 
          if (typeof (room as any).removeAllListeners === "function") {
              (room as any).removeAllListeners(); 
          }
      } catch (error) { 
          console.warn(error); 
      } 
  };
}

async function switchZone(nextZone: ZoneName): Promise<void> {
  if (isTransitioning || currentZone === nextZone) return;
  isTransitioning = true; localPlayerPos.initialized = false; hoverX = 0; hoverY = 0;
  for (const key in keys) keys[key as keyof typeof keys] = false; 

  try {
    if (cleanupRoomBindings) { cleanupRoomBindings(); cleanupRoomBindings = null; }
    if (activeRoom) { await activeRoom.leave(); activeRoom = null; }
    if (activeScene) { activeScene.dispose(); activeScene = null; }
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
    
    localStorage.setItem("rpg_last_zone", nextZone);

    if (activeRoom && activeScene) {
      localStorage.setItem("rpg_reconnection_token", activeRoom.reconnectionToken);
      activeRoom.send("set_aura_style", { style: PLAYER_AURA_STYLE });

      if (typeof (activeScene as any).start === "function") {
          (activeScene as any).start();
      }
    }
    
    cleanupRoomBindings = setupRoomBindings(activeRoom!, activeScene!);

    // ----------------------------------------------------
    // 🔥 ZONE-SPECIFIC INTRO INSTRUCTIONS 🔥
    // ----------------------------------------------------
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

// --- HOTKEY SETUP ---
let isHoldingTab = false;

function setupInput(): void {
  window.addEventListener("keydown", (event) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.code)) {
        event.preventDefault();
    }

    if (event.code === "ShiftLeft" || event.key === "Shift") keys.ShiftLeft = true;
    if (Object.prototype.hasOwnProperty.call(keys, event.code)) {
      keys[event.code as keyof typeof keys] = true;
    }

    // --- QUICK CHAT SYSTEM LOGIC ---
    if (event.key === "Tab" && event.shiftKey) {
        event.preventDefault(); 
        toggleChatChannel();
        addGameEvent(`Switched chat to: <b>${currentChatChannel.toUpperCase()}</b>`, "event-info");
        
        if (typeof (window as any).renderChatHotbar === "function") {
            (window as any).renderChatHotbar(true); 
        }
        return;
    }

    if (event.key === "Tab" && !event.shiftKey) {
        event.preventDefault(); 
        if (!isHoldingTab) {
            isHoldingTab = true;
            if (typeof (window as any).renderChatHotbar === "function") {
                (window as any).renderChatHotbar(true); 
            }
        }
        return;
    }

    if (isHoldingTab && event.key >= "1" && event.key <= "8") {
        event.preventDefault();
        attemptQuickChat(getActionContext(), event.key);
        
        isHoldingTab = false;
        if (typeof (window as any).renderChatHotbar === "function") {
            (window as any).renderChatHotbar(false); 
        }
        return;
    }

    if (event.code === "F2" || event.key === "\\") { 
        const panel = document.getElementById("admin-panel");
        if (panel) {
            panel.style.display = panel.style.display === "none" ? "block" : "none";
        }
        return; 
    }

    const medUI = document.getElementById("meditation-ui");
    if (medUI && medUI.style.display === "block") {
        if (event.key === "Escape") {
            medUI.style.display = "none";
            if (activeRoom) {
                activeRoom.send("toggle_meditate"); 
            }
        }
        return; 
    }

    if (document.getElementById("blueprint-modal")?.style.display === "block") {
        if (event.key === "Escape") {
            document.getElementById("close-bp-btn")?.click();
        }
        return;
    }

    if (document.getElementById("crafting-modal")?.style.display === "block") {
        if (event.key === "Escape") {
            document.getElementById("crafting-modal")!.style.display = "none";
        }
        return;
    }
    if (document.getElementById("store-management-modal")?.style.display === "block") {
        if (event.key === "Escape") {
            document.getElementById("store-management-modal")!.style.display = "none";
        }
        return;
    }

    // --- MOUNT HOTKEY (V) ---
    if (event.key.toLowerCase() === "v") {
        if (activeRoom) {
            activeRoom.send("toggle_mount");
        }
        return;
    }

    if (event.key.toLowerCase() === "x") {
        if (activeRoom) {
            activeRoom.send("toggle_aura");
        }
        return;
    }

    if (event.key === "h" || event.key === "H") {
        if (activeRoom) activeRoom.send("requestCommunion");
        return;
    }

    if (event.shiftKey && event.key.toLowerCase() === "u") {
        const currentIndex = AURA_STYLES.indexOf(PLAYER_AURA_STYLE);
        PLAYER_AURA_STYLE = AURA_STYLES[(currentIndex + 1) % AURA_STYLES.length];
        
        if (activeRoom) {
            activeRoom.send("set_aura_style", { style: PLAYER_AURA_STYLE });
        }
        return;
    }

    if (event.shiftKey && event.key.toLowerCase() === "l") {
        if (activeRoom) activeRoom.send("adminLevelUp");
        return;
    }
    if (event.shiftKey && event.key.toLowerCase() === "r") {
        if (activeRoom) activeRoom.send("adminResetSkills");
        adminResetCommitments();
        return;
    }

    if (event.shiftKey && event.key.toLowerCase() === "p") {
        const currentIndex = PLAYER_ESSENCES.indexOf(PLAYER_PATHWAY);
        PLAYER_PATHWAY = PLAYER_ESSENCES[(currentIndex + 1) % PLAYER_ESSENCES.length];
        
        adminResetCommitments();
        initDefaultHotbar(PLAYER_PATHWAY);
        renderHotbar();
        
        if (activeRoom) {
            activeRoom.send("changePathway", { pathwayId: PLAYER_PATHWAY });
            activeRoom.send("adminResetSkills"); 
        }
        return;
    }

    if (event.key.toLowerCase() === "m") {
        const state = activeRoom?.state as any;
        const me = state?.players?.get(activeRoom!.sessionId);
        if (me && me.skillTree && me.skillTree.activeAbilities) {
            const wayNode = me.skillTree.activeAbilities.get("wayfinder_base");
            const coreRank = wayNode?.upgrades.get("core_progression")?.currentRank || 0;
            
            if (coreRank >= 3) {
                setIsWorldMapOpen(!isWorldMapOpen);
                const mapModal = document.getElementById("world-map-modal");
                if (mapModal) mapModal.style.display = isWorldMapOpen ? "block" : "none";
            }
        }
        return;
    }

    if (event.key.toLowerCase() === "z") {
        if (activeRoom) {
            activeRoom.send("toggle_meditate");
        }
        return;
    }

    // TRADE HOTKEY (G)
    if (event.key.toLowerCase() === "g" && activeRoom) {
        if (isTradeUIOpen) return;

        let nearestPlayerId: string | null = null;
        let minDistSq = 64.0; // Max trade distance (8^2)

        const state = activeRoom.state as any;
        if (state.players) {
            state.players.forEach((p: any, id: string) => {
                if (id !== activeRoom!.sessionId) {
                    const dSq = distanceSq(localPlayerPos.x, localPlayerPos.y, p.x, p.y);
                    if (dSq < minDistSq) {
                        minDistSq = dSq;
                        nearestPlayerId = id;
                    }
                }
            });
        }

        if (nearestPlayerId) {
            activeRoom.send("trade_request", { targetId: nearestPlayerId });
        } else {
            addGameEvent("No one is close enough to trade with.", "event-info");
        }
        return;
    }

    if (isWorldMapOpen) {
        if (event.key === "Escape") {
            setIsWorldMapOpen(false);
            const m = document.getElementById("world-map-modal");
            if (m) m.style.display = "none";
        }
        return;
    }

    if (isSkillTreeUIOpen) {
      if (event.key === "Escape" || event.key.toLowerCase() === "k") {
          setIsSkillTreeUIOpen(false);
          const m = document.getElementById("skill-tree-modal");
          if (m) document.body.removeChild(m);
      }
      return; 
    }

    if (isTeleportUIOpen) {
      if (event.key === "Escape" || event.key.toLowerCase() === "t") {
          document.getElementById("close-teleport-btn")?.click();
      }
      return; 
    }

    if (isQuestUIOpen) {
      if (event.key === "Escape") {
          document.getElementById("close-quest-btn")?.click();
      }
      return; 
    }

    if (isInventoryUIOpen) {
      if (event.key === "Escape" || event.key.toLowerCase() === "i") {
          document.getElementById("close-inv-btn")?.click();
      }
      return; 
    }

    if (isShopUIOpen) {
      if (event.key === "Escape") {
          document.getElementById("close-shop-btn")?.click();
      }
      return; 
    }

    if (isChestUIOpen) {
      if (event.key === "Escape" || event.key.toLowerCase() === "i") {
          document.getElementById("close-chest-btn")?.click();
      }
      return; 
    }

    if (isCasinoUIOpen) {
      if (event.key === "Escape") {
          document.getElementById("close-casino-btn")?.click();
      }
      return; 
    }

    const state = activeRoom?.state as any;
    const me = state?.players?.get(activeRoom!.sessionId);
    
    if (me?.isSleeping || me?.isMeditating) {
        if (["w", "a", "s", "d", "W", "A", "S", "D", " ", "Spacebar", "e", "E"].includes(event.key) || event.code === "Space") {
            if (me.isSleeping) activeRoom!.send("wakeUp");
            if (me.isMeditating) activeRoom!.send("toggle_meditate");
        }
        return;
    }

    if (event.key === "q" || event.key === "Q") {
        if (activeScene instanceof TownScene && activeScene.isDecoMode) {
            activeScene.decoRotation += Math.PI / 2; 
        }
        return;
    }

    if (!isHoldingTab) {
        if (event.key === "1") {
            attemptAttack(getActionContext(), false);
            return;
        }

        if (event.key === "2") {
            const isWolf = (me && me.isSpiritAnimal) || isLocallyWolf;

            if (isWolf && activeRoom) {
                activeRoom.send("cancelSpiritAnimal");
                return;
            }

            if (playerHotbar.slot2 === "shadow_step") {
                let wayRank = 0;
                if (me && me.skillTree && me.skillTree.activeAbilities) {
                    const shadowStep = me.skillTree.activeAbilities.get("shadow_step");
                    if (shadowStep && shadowStep.upgrades) {
                        const wayUpg = shadowStep.upgrades.get("way_of_the_night");
                        wayRank = wayUpg ? wayUpg.currentRank : 0;
                    }
                }

                if (wayRank >= 2) {
                    isShadowMapActive = !isShadowMapActive;
                } else {
                    const dashDist = wayRank === 1 ? 10.0 : 6.0; 
                    const targetX = localPlayerPos.x + (lastFacingDx * dashDist);
                    const targetZ = localPlayerPos.y + (lastFacingDy * dashDist);
                    
                    activeRoom!.send("useAbility", { abilityId: "shadow_step", targetX, targetZ, subType: "dash" });
                    abilityCooldowns.slot2 = getSkillDef("shadow_step")?.cooldownTime || 5.0;
                }
            } else {
                attemptAbility(2, getActionContext());
            }
            return;
        }
        
        if (event.key === "3") attemptAbility(3, getActionContext());
        if (event.key === "4") attemptAbility(4, getActionContext());
        if (event.key === "5") attemptAbility(5, getActionContext());
        
        if (event.key === "6") attemptAbility(6, getActionContext());
        if (event.key === "7") attemptAbility(7, getActionContext());
        if (event.key === "8") attemptAbility(8, getActionContext());
        if (event.key === "9") attemptAbility(9, getActionContext());
    }

    if (event.code === "ShiftRight") {
        const isWolf = (me && me.isSpiritAnimal) || isLocallyWolf;

        if (isWolf && activeRoom) {
            activeRoom.send("cancelSpiritAnimal");
            return;
        }

        if (temporarySkill && activeRoom) {
            const portalX = localPlayerPos.x + (lastFacingDx * 8.0);
            const portalZ = localPlayerPos.y + (lastFacingDy * 8.0);
            activeRoom.send("useAbility", { abilityId: temporarySkill.id, targetX: portalX, targetZ: portalZ });
        }
        return;
    }

    if (event.key.toLowerCase() === "k") {
        openSkillTreeUI(activeRoom, PLAYER_PATHWAY, keys);
        return;
    }

    if (event.key.toLowerCase() === "i") {
      openInventoryUI(activeRoom, keys, PLAYER_CLASS);
      return;
    }

    if (event.key.toLowerCase() === "t") {
      openTeleportUI(activeRoom, keys);
      return;
    }

    if (event.key === "c" || event.key === "C") {
        if (activeScene && typeof (activeScene as any).resetCamera === "function") {
            (activeScene as any).resetCamera();
        }
        return;
    }

    if (!activeRoom || !activeScene || isTransitioning) return;

    let nearestScenery: any = null;
    let nearestSceneryDistSq = 999;
    
    if ((activeRoom.state as any)?.scenery) {
        const nearbyInteractionScenery = clientSceneryGrid.getNearby(localPlayerPos.x, localPlayerPos.y, 4.5);
        for (const scenery of nearbyInteractionScenery) {
            const dSq = distanceSq(localPlayerPos.x, localPlayerPos.y, scenery.x, scenery.y);
            if (dSq < 20.25 && dSq < nearestSceneryDistSq) { // 4.5^2
                nearestScenery = scenery;
                nearestSceneryDistSq = dSq;
            }
        } 
    }

    const isOutsideTown = activeScene instanceof TownScene && activeScene.isOutsideTown(localPlayerPos.x, localPlayerPos.y);

    if (event.key === "e" || event.key === "E") {
      let interactionTriggered = false;
      
      if (activeScene instanceof TownScene && !isOutsideTown) {
        
        if (distanceSq(localPlayerPos.x, localPlayerPos.y, 35, -35) < 324.0) { // 18^2
            openQuestUI(activeRoom, keys, PLAYER_NAME);
            interactionTriggered = true;
        }

        if (!interactionTriggered) {
            let nearBlacksmith = false;
            for (const stall of MARKET_STALLS) {
                if (stall.type === "⚒️ Blacksmith" && distanceSq(localPlayerPos.x, localPlayerPos.y, stall.x, stall.y) < 36.0) {
                    nearBlacksmith = true;
                    break;
                }
            }
            if (nearBlacksmith) {
                openCraftingMenu(activeRoom, me);
                interactionTriggered = true;
            }
        }

        if (!interactionTriggered) {
            let activeStall = null;
            for (const stall of MARKET_STALLS) {
                if (stall.type !== "⚒️ Blacksmith" && distanceSq(localPlayerPos.x, localPlayerPos.y, stall.x, stall.y) < 36.0) {
                    activeStall = stall;
                    break;
                }
            }
            
            if (activeStall) {
                let targetStoreState = null;
                state.stores.forEach((s: any) => {
                    if (s.type === activeStall.type) targetStoreState = s; 
                });

                if (targetStoreState) {
                    openStoreMenu(activeRoom, me, targetStoreState);
                    interactionTriggered = true;
                }
            }
        }

        if (!interactionTriggered) {
            for (const table of CASINO_TABLES) {
                if (distanceSq(localPlayerPos.x, localPlayerPos.y, table.x, table.y) < 16.0) {
                    openCasinoUI(activeRoom, keys, table.type);
                    interactionTriggered = true;
                    break;
                }
            } 
        }
      }

      if (!interactionTriggered) {
        let nearestDeco: any = null;
        let nearestDecoDistSq = 9.0; // 3^2
        
        if ((activeRoom.state as any)?.decorations) {
            (activeRoom.state as any).decorations.forEach((deco: any) => {
                const dSq = distanceSq(localPlayerPos.x, localPlayerPos.y, deco.x, deco.z);
                if (dSq < nearestDecoDistSq) {
                    nearestDeco = deco;
                    nearestDecoDistSq = dSq;
                }
            });
        }

        if (nearestDeco) {
            if (nearestDeco.type === "Storage Chest") {
                openChestUI(activeRoom, keys, nearestDeco.id);
            } else if (nearestDeco.type === "Oak Bed") {
                activeRoom.send("interactDecoration", { id: nearestDeco.id });
            }
        }
      }
      return;
    }

    if (isOutsideTown) {
      if (event.key === "b" || event.key === "B") {
        if (activeScene instanceof TownScene) {
          activeScene.isBuyMode = !activeScene.isBuyMode;
          if (activeScene.isBuyMode) activeScene.isBuildMode = false;
        }
        return;
      }

      if (event.key === "v" || event.key === "V") {
        if (activeScene instanceof TownScene) {
          if (activeScene.isBuildMode) {
              activeScene.isBuildMode = false;
          } else {
              openBlueprintSelector(activeScene, keys);
          }
        }
        return;
      }

      if (event.key === "r" || event.key === "R") {
          let activeBuildingId = null;
          if ((activeRoom.state as any)?.buildings) {
              (activeRoom.state as any).buildings.forEach((bldg: any) => {
                  if (distanceSq(localPlayerPos.x, localPlayerPos.y, bldg.x, bldg.z) < 25.0 && !bldg.isConstructed) {
                      activeBuildingId = bldg.id;
                  }
              });
          }

          if (activeBuildingId) {
              activeRoom.send("contributeResource", { buildingId: activeBuildingId });
          }
          return;
      }

      if (event.key === "Enter") {
        if (activeScene instanceof TownScene) {
          if (activeScene.isBuyMode) {
            activeRoom.send("buyLand");
            activeScene.isBuyMode = false; 
          } else if (activeScene.isBuildMode) {
            const snapX = Math.round(hoverX / 2) * 2;
            const snapZ = Math.round(hoverY / 2) * 2;
            activeRoom.send("placeBuilding", { x: snapX, z: snapZ, type: activeScene.currentBlueprintType });
            activeScene.isBuildMode = false;
          } 
          else if (activeScene.isDecoMode) {
            const state = activeRoom.state as any;
            const me = state.players.get(activeRoom.sessionId);
            
            const snapX = Math.round(hoverX * 2) / 2;
            const snapZ = Math.round(hoverY * 2) / 2;
            
            activeRoom.send("placeDecoration", { 
                type: me.equippedItem, 
                x: snapX, 
                z: snapZ, 
                rotation: activeScene.decoRotation 
            });
          }
        }
        return;
      }
    }

    if (currentZone === "field" || currentZone === "dungeon" || currentZone === "maze" || currentZone === "underworld" || isOutsideTown) {
      if (event.key === "f" || event.key === "F") {
        attemptFishing(getActionContext()); 
        activeRoom.send("interact");
        return;
      }

      if (event.code === "Space") {
        event.preventDefault(); 
        if (event.repeat) return; 

        const state = activeRoom?.state as any;
        const me = state?.players?.get(activeRoom!.sessionId);

        // --- NEW: INTERCEPT FOR FLIGHT ---
        if (me && me.mountedFamiliarId && me.mountedFamiliarId !== "") {
            activeRoom!.send("toggle_flight");
            return; // Block dodge logic while mounted
        }

        let dInX = 0; let dInY = 0;
        if (keys.KeyW) dInY -= 1;
        if (keys.KeyS) dInY += 1;
        if (keys.KeyA) dInX -= 1;
        if (keys.KeyD) dInX += 1;

        let finalDx = 0; let finalDy = 0;

        if (dInX === 0 && dInY === 0) {
          const mDx = hoverX - localPlayerPos.x;
          const mDy = hoverY - localPlayerPos.y;
          if (Math.abs(mDx) > 0.1 || Math.abs(mDy) > 0.1) {
              if (Math.abs(mDx) > Math.abs(mDy)) finalDx = Math.sign(mDx);
              else finalDy = Math.sign(mDy);
          } else { finalDy = 1; }
        } else {
          let angle = 0;
          if (typeof (activeScene as any).getCameraAngle === "function") {
              angle = (activeScene as any).getCameraAngle();
          }
          
          const rx = dInX * Math.cos(angle) + dInY * Math.sin(angle);
          const ry = -dInX * Math.sin(angle) + dInY * Math.cos(angle);
          
          finalDx = Math.sign(Math.round(rx * 10));
          finalDy = Math.sign(Math.round(ry * 10));
        }

        const isWolf = (me && me.isSpiritAnimal) || isLocallyWolf;

        if (me) {
            if (isWolf && (me.stamina < 10 || me.hunger < 2)) return;
            if (!isWolf && (me.stamina < 20 || me.hunger < 5)) return;
        }

        if (isWolf) {
            const lungeDist = 2.0;
            localPlayerPos.x += (finalDx * lungeDist);
            localPlayerPos.y += (finalDy * lungeDist);
            
            activeRoom!.send("wolfAttack", { dx: finalDx, dy: finalDy });
            return; 
        }
        
        const dodgeDist = 4.0;
        let nextX = localPlayerPos.x + (finalDx * dodgeDist);
        let nextY = localPlayerPos.y + (finalDy * dodgeDist);
        
        const isTown = currentZone === "town";
        const isMaze = currentZone === "maze";
        const isUnderworld = currentZone === "underworld";

        // CRITICAL BUG FIX: Using a mocked collision state to prevent full-array scenery scanning
        let collisionState = state;
        if (isTown) {
             collisionState = {
                 buildings: state.buildings,
                 decorations: state.decorations,
                 scenery: clientSceneryGrid.getNearby(localPlayerPos.x, localPlayerPos.y, 15.0)
             };
        }
        
        if (isWolf || (!((isTown && checkTownCollision(nextX, localPlayerPos.y)) || (isMaze && checkMazeCollision(nextX, localPlayerPos.y)) || (isUnderworld && checkUnderworldCollision(nextX, localPlayerPos.y))) && !checkDynamicCollision(collisionState, nextX, localPlayerPos.y))) {
            localPlayerPos.x = nextX;
        }
        if (isWolf || (!((isTown && checkTownCollision(localPlayerPos.x, nextY)) || (isMaze && checkMazeCollision(localPlayerPos.x, nextY)) || (isUnderworld && checkUnderworldCollision(localPlayerPos.x, nextY))) && !checkDynamicCollision(collisionState, localPlayerPos.x, nextY))) {
            localPlayerPos.y = nextY;
        }

        activeRoom!.send("dodge", { dx: finalDx, dy: finalDy });
        return;
      }
    }
  });

  window.addEventListener("keyup", (event) => {
    if (event.code === "ShiftLeft" || event.key === "Shift") keys.ShiftLeft = false;
    if (Object.prototype.hasOwnProperty.call(keys, event.code)) {
      keys[event.code as keyof typeof keys] = false;
    }

    if (event.key === "Tab") {
        event.preventDefault();
        isHoldingTab = false;
        if (typeof (window as any).renderChatHotbar === "function") {
            (window as any).renderChatHotbar(false); 
        }
    }
  });

  window.addEventListener("pointerdown", (event: PointerEvent) => {
      const ctx = getActionContext();
      if (ctx.isUIOpen || !activeRoom) return;

      if (event.target === document.querySelector('canvas')) {
          
          if (isShadowMapActive && activeScene) {
              const camera = (activeScene as any).camera as THREE.Camera;
              const scene3D = (activeScene as any).scene as THREE.Scene;
              
              if (camera && scene3D) {
                  const mouse = new THREE.Vector2();
                  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                  const raycaster = new THREE.Raycaster();
                  
                  raycaster.setFromCamera(mouse, camera);
                  const intersects = raycaster.intersectObjects(scene3D.children, true);
                  
                  if (intersects.length > 0) {
                      const hitPoint = intersects[0].point;
                      localTargetPos.x = hitPoint.x;
                      localTargetPos.z = hitPoint.z;
                      
                      if (event.button === 2) { 
                          activeRoom.send("useAbility", { abilityId: "shadow_step", targetX: hitPoint.x, targetZ: hitPoint.z, subType: "place_anchor" });
                      } else if (event.button === 0) { 
                          activeRoom.send("useAbility", { abilityId: "shadow_step", targetX: hitPoint.x, targetZ: hitPoint.z, subType: "blink" });
                          isShadowMapActive = false; 
                          abilityCooldowns.slot2 = getSkillDef("shadow_step")?.cooldownTime || 5.0;
                      }
                  }
              }
              return; 
          }

          if (activeScene instanceof TownScene) {
              if (activeScene.isBuyMode || activeScene.isBuildMode) {
                  const camera = (activeScene as any).camera as THREE.Camera;
                  const scene3D = (activeScene as any).scene as THREE.Scene;
                  if (camera && scene3D) {
                      const mouse = new THREE.Vector2();
                      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
                      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
                      const raycaster = new THREE.Raycaster();
                      raycaster.setFromCamera(mouse, camera);
                      const intersects = raycaster.intersectObjects(scene3D.children, true);
                      
                      if (intersects.length > 0) {
                          const p = intersects[0].point;
                          if (activeScene.isBuyMode) {
                              activeRoom.send("buyLand");
                              activeScene.isBuyMode = false;
                          } else if (activeScene.isBuildMode) {
                              const snapX = Math.round(p.x / 2) * 2;
                              const snapZ = Math.round(p.z / 2) * 2;
                              activeRoom.send("placeBuilding", { x: snapX, z: snapZ, type: activeScene.currentBlueprintType });
                              activeScene.isBuildMode = false;
                          }
                      }
                  }
                  return;
              }
          }

          if (event.button === 0) {
              attemptAttack(ctx, true);
          }
      }
  });

  window.addEventListener("contextmenu", (event) => {
      if (isShadowMapActive) event.preventDefault();
  });
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

// ==========================================
// PERFORMANCE: STATE POLLING / BATCHING LOOP
// ==========================================
function syncStateToScene(room: ActiveRoom, sceneObj: ActiveScene) {
    if (!room || !room.state || !sceneObj) return;
    
    const state = room.state as any;

    try {
        if (state.players && typeof state.players.forEach === "function") {
            state.players.forEach((player: any, id: string) => {
                // SAFEGUARD: If the server knows this player exists, but they aren't in the 3D scene, FORCE CREATE THEM
                if (!(sceneObj as any).playerVisuals?.has(id)) {
                    initPlayerVisual(player, id, room, sceneObj);
                }

                if (id !== room.sessionId) {
                    const safeX = isNaN(player.x) ? 0 : player.x;
                    const safeY = isNaN(player.y) ? 0 : player.y;

                    const isSwim = distanceSq(safeX, safeY, 1200, 0) <= 1600;
                    
                    let th = 0;
                    if (sceneObj instanceof TownScene) {
                        th = getHeightCached(safeX, safeY);
                    }

                    if (typeof (sceneObj as any).updatePlayer === "function") {
                        (sceneObj as any).updatePlayer(id, safeX, safeY, player.name, player.equippedItem, player.equipBack, player.isSleeping, player.sleepRot, isSwim, th, player.equipHead, player.equipChest, player.equipLegs, player.equipFeet, player.equipOffHand, player.isSpiritAnimal, player.isSprinting, player.isMeditating, player.teamId, player.mountedFamiliarId);
                    }

                    if (typeof (sceneObj as any).updatePlayerFishing === "function") {
                        (sceneObj as any).updatePlayerFishing(id, player.fishingState || "none", player.bobberX || 0, player.bobberZ || 0);
                    }
                }
            });
        }

        if (state.enemies && typeof state.enemies.forEach === "function" && typeof (sceneObj as any).updateEnemy === "function") {
            state.enemies.forEach((enemy: any, id: string) => {
                const safeX = isNaN(enemy.x) ? 0 : enemy.x;
                const safeY = isNaN(enemy.y) ? 0 : enemy.y;

                let statusText = "";
                if (enemy.stunnedTimer > 0) statusText += " 💫";
                else if (enemy.rootedTimer > 0) statusText += " 🧊";
                else if (enemy.action === "recovering") statusText += " 😴";

                if (enemy.afflictions && enemy.afflictions.size > 0 && typeof enemy.afflictions.forEach === "function") {
                    enemy.afflictions.forEach((aff: any, key: string) => {
                        if (key === "Bleed") statusText += " 🩸";
                        if (key === "Necrosis") statusText += " 💀";
                        if (key === "Slow") statusText += " 🐌";
                        if (key === "Silence") statusText += " 🤐";
                        if (key === "Illuminated") statusText += " ✨";
                        if (key === "Crushing Grip") statusText += " ✊";
                        if (key === "Weakened") statusText += " 📉";
                    });
                }

                const label = `${enemy.name} (${Math.ceil(enemy.hp)}/${enemy.maxHp})${statusText}`;
                
                let th = 0;
                if (sceneObj instanceof TownScene) {
                    th = getHeightCached(safeX, safeY);
                }

                let keysArray: string[] = [];
                if (enemy.afflictions && typeof enemy.afflictions.keys === "function") {
                    keysArray = Array.from(enemy.afflictions.keys());
                }

                (sceneObj as any).updateEnemy(id, safeX, safeY, label, enemy.action, enemy.attackRadius || 2.5, enemy.targetX, enemy.targetY, th, keysArray);
            });
        }

        if (state.buildings && typeof state.buildings.forEach === "function" && sceneObj instanceof TownScene) {
            state.buildings.forEach((bldg: any, id: string) => {
                if (typeof (sceneObj as any).updateBuilding === "function") {
                    (sceneObj as any).updateBuilding(bldg.id, bldg.type, bldg.isConstructed, bldg.progress, bldg.targetProgress);
                }
            });
        }

        if (state.scenery && typeof state.scenery.forEach === "function" && sceneObj instanceof TownScene) {
            state.scenery.forEach((item: any, id: string) => {
                if (typeof (sceneObj as any).updateSceneryProgress === "function") {
                    (sceneObj as any).updateSceneryProgress(item.id, item.hp, item.maxHp);
                }
            });
        }

        if (state.familiars && typeof state.familiars.forEach === "function" && (sceneObj as any).familiarRenderer) {
            state.familiars.forEach((fam: any, id: string) => {
                const safeX = isNaN(fam.x) ? 0 : fam.x;
                const safeY = isNaN(fam.y) ? 0 : fam.y;
                
                let th = 0;
                if (sceneObj instanceof TownScene) {
                    th = getHeightCached(safeX, safeY);
                }
                
                if (typeof (sceneObj as any).familiarRenderer.updateFamiliar === "function") {
                    (sceneObj as any).familiarRenderer.updateFamiliar(id, safeX, th, safeY, fam.isDetached, fam.action);
                }
            });
        }
    } catch (e) {
        console.error("[Client Sync Error] Crash prevented during state sync:", e);
    }
}

function startHudLoop(): void {
  ensureOverlay(() => activeRoom, getActionContext);
  renderHotbar();
  
  let lastTime = performance.now();
  let timeSinceLastInput = 0; 
  let wasInputting = false; 
  let frameCount = 0; 

  const tick = () => {
    const now = performance.now(); 
    const dt = Math.min((now - lastTime) / 1000, 0.1); 
    lastTime = now;
    frameCount++;

    tickCooldownsUI(dt);
    updateDayNightCycle(dt);

    if (activeRoom && activeScene) {
      
      // Flush the Visual Action Queue cleanly before rendering
      flushEventQueue();

      const state = activeRoom.state as any;
      const me = state.players?.get(activeRoom.sessionId) as any;

      // SAFEGUARD: If the server knows we exist, but our local 3D mesh wasn't created, force create it!
      if (me && !(activeScene as any).playerVisuals?.has(activeRoom.sessionId)) {
          initPlayerVisual(me, activeRoom.sessionId, activeRoom, activeScene);
      }

      if (!me) {
          requestAnimationFrame(tick);
          return;
      }

      // --- UI Polling System (Decoupled from Colyseus .onAdd/.onChange events) ---
      if (frameCount % 30 === 0) {
          refreshInventoryUI(activeRoom, PLAYER_CLASS);
          if (isShopUIOpen) refreshShopUI(activeRoom);
          if (isChestUIOpen) refreshChestUI(activeRoom);
      }

      // --- CHUNKY HUD & QUEST TRACKER UPDATE ---
      if (frameCount % 10 === 0) {
          renderChunkyHUD(me);
          renderQuestTracker(me);
      }

      const ctx = getActionContext();

      // Synchronize all Colyseus variables to Three.js models in batch
      syncStateToScene(activeRoom, activeScene);

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

      if (me && me.skillTree && me.skillTree.activeAbilities) {
          const shadowStep = me.skillTree.activeAbilities.get("shadow_step");
          if (shadowStep && shadowStep.upgrades) {
              const wayUpg = shadowStep.upgrades.get("way_of_the_night");
              const wayRank = wayUpg ? wayUpg.currentRank : 0;
              
              if (wayRank >= 3 && (!temporarySkill || temporarySkill.id !== "town_recall")) {
                  setTemporarySkill({ id: "town_recall", label: "Recall", icon: "🏛️" });
              }
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

        // --- CLIENT PREDICTION RECONCILIATION ---
        if (me.lastProcessedInput !== undefined) {
            // Remove acknowledged inputs
            while (pendingInputs.length > 0 && pendingInputs[0].seq <= me.lastProcessedInput) {
                pendingInputs.shift();
            }
        }

        const syncDistSq = distanceSq(localPlayerPos.x, localPlayerPos.y, me.x, me.y);
        
        const isInputting = keys.KeyW || keys.KeyA || keys.KeyS || keys.KeyD;
        
        const isLocallySprinting = (keys.ShiftLeft || keys.ShiftRight) && isInputting && (me.hunger > 0) && (me.stamina > 0);
        
        if ((window as any).lastSprintState !== isLocallySprinting) {
            activeRoom.send("setSprint", { isSprinting: isLocallySprinting });
            (window as any).lastSprintState = isLocallySprinting;
        }

        if (isInputting) {
            timeSinceLastInput = 0;
        } else {
            timeSinceLastInput += dt;
        }

        // Extremely large desync catch (fallback)
        if (syncDistSq > 225.0) { // 15^2
            localPlayerPos.x = me.x;
            localPlayerPos.y = me.y;
            
            // CRITICAL: Must reset network anchor to prevent ghost trails
            networkState.lastSentX = me.x;
            networkState.lastSentY = me.y;
            pendingInputs.length = 0;
        } 

        // Reset input processing for movement step
        let inputX = 0; let inputY = 0;
        let camDx = 0; let camDy = 0;

        const isMounted = me.mountedFamiliarId && me.mountedFamiliarId !== "";
        const isFlying = isMounted && me.isFlying;

        if (me.isSleeping || me.isMeditating || Date.now() < me.rootedUntil || isMounted) {
            localPlayerPos.x = me.x;
            localPlayerPos.y = me.y;
            inputX = 0;
            inputY = 0;
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
          
          if (!me.isSpiritAnimal && !isLocallyWolf) {
              const isTown = currentZone === "town";
              const isMaze = currentZone === "maze";
              const isUnderworld = currentZone === "underworld";
              
              // CRITICAL BUG FIX: Local Collision State
              let collisionState = state;
              if (isTown) {
                   collisionState = {
                       buildings: state.buildings,
                       decorations: state.decorations,
                       scenery: clientSceneryGrid.getNearby(localPlayerPos.x, localPlayerPos.y, 15.0)
                   };
              }

              // X-Axis Sliding
              const isXBlocked = !isFlying && (
                  (isTown && checkTownCollision(targetX, localPlayerPos.y)) || 
                  (isMaze && checkMazeCollision(targetX, localPlayerPos.y)) || 
                  (isUnderworld && checkUnderworldCollision(targetX, localPlayerPos.y)) ||
                  checkDynamicCollision(collisionState, targetX, localPlayerPos.y)
              );
              
              if (!isXBlocked) {
                  localPlayerPos.x = targetX;
              }

              // Y-Axis Sliding (Evaluates using updated X)
              const isYBlocked = !isFlying && (
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
          
          // Clamp to absolute world limits
          localPlayerPos.x = Math.max(-2490, Math.min(2490, localPlayerPos.x));
          localPlayerPos.y = Math.max(-2490, Math.min(2490, localPlayerPos.y));
        }

        // Even if mounted (inputX=0), we may still need to send WASD inputs to steer the mount on the server
        // so we check if the user is pressing keys, not just if inputX != 0
        if (isInputting || (!isInputting && wasInputting)) {
            if (now - networkState.lastNetworkSend > 40 || (!isInputting && wasInputting)) {
                
                // If we are mounted, localPlayerPos doesn't diverge because it's locked.
                // We just need to calculate the target relative to current based on inputs to send to server.
                if (isMounted) {
                    let mX = 0; let mY = 0;
                    if (keys.KeyW) mY -= 1; 
                    if (keys.KeyS) mY += 1;
                    if (keys.KeyA) mX -= 1; 
                    if (keys.KeyD) mX += 1;
                    
                    if (mX !== 0 || mY !== 0) {
                        const length = Math.sqrt(mX * mX + mY * mY);
                        const nx = mX / length; const ny = mY / length;
                        let angle = 0;
                        if (typeof (activeScene as any).getCameraAngle === "function") angle = (activeScene as any).getCameraAngle();
                        
                        const dx = nx * Math.cos(angle) + ny * Math.sin(angle);
                        const dy = -nx * Math.sin(angle) + ny * Math.cos(angle); 
                        const mountSpeed = isLocallySprinting ? 22.0 : 15.0; // Hardcoded client prediction speed for mounts
                        const moveDist = mountSpeed * 0.05;
                        
                        const targetX = me.x + dx * moveDist;
                        const targetY = me.y + dy * moveDist;
                        
                        sendMove(activeRoom, targetX, targetY);
                    } else if (!isInputting && wasInputting) {
                        sendMove(activeRoom, me.x, me.y);
                    }
                } else {
                    const distSinceLastSendSq = distanceSq(networkState.lastSentX, networkState.lastSentY, localPlayerPos.x, localPlayerPos.y);
                    
                    if (distSinceLastSendSq > 1.0) {
                        const steps = Math.ceil(Math.sqrt(distSinceLastSendSq) / 1.0);
                        for (let i = 1; i <= steps; i++) {
                            const lerpX = networkState.lastSentX + (localPlayerPos.x - networkState.lastSentX) * (i / steps);
                            const lerpY = networkState.lastSentY + (localPlayerPos.y - networkState.lastSentY) * (i / steps);
                            sendMove(activeRoom, lerpX, lerpY);
                        }
                    } else {
                        sendMove(activeRoom, localPlayerPos.x, localPlayerPos.y); 
                    }
                    
                    networkState.lastSentX = localPlayerPos.x;
                    networkState.lastSentY = localPlayerPos.y;
                }
                networkState.lastNetworkSend = now; 
            }
        }
        wasInputting = isInputting;

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
            me.teamId, me.mountedFamiliarId
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

async function boot(): Promise<void> {
  const container = document.getElementById("app");
  if (!container) throw new Error("Missing #app container");

  // --- WAIT FOR SECURE AUTHENTICATION ---
  const authData = await runAuthenticationFlow();
  
  PLAYER_NAME = authData.characterName; 
  PLAYER_CLASS = authData.classId;
  PLAYER_PATHWAY = authData.pathwayId;
  PLAYER_AURA_STYLE = authData.auraStyle;

  initDefaultHotbar(PLAYER_PATHWAY);
  setupInput(); 
  
  initAdminPanel();
  
  startHudLoop(); 

  const lastZone = (localStorage.getItem("rpg_last_zone") as ZoneName) || "town";
  const reconnectionToken = localStorage.getItem("rpg_reconnection_token");

  let reconnected = false;

  // --- ATTEMPT RAPID RECONNECTION ---
  if (reconnectionToken) {
      try {
          activeRoom = await reconnectToRoom(reconnectionToken);
          localStorage.setItem("rpg_reconnection_token", activeRoom.reconnectionToken);
          
          // Trust the Server's Room Name, not Local Storage
          const actualZone = activeRoom.name as ZoneName;
          currentZone = actualZone;
          localStorage.setItem("rpg_last_zone", actualZone);

          clearContainer(container);
          
          if (actualZone === "town") activeScene = new TownScene(container);
          else if (actualZone === "maze") activeScene = new MazeScene(container);
          else if (actualZone === "underworld") activeScene = new UnderworldScene(container);
          else if (actualZone === "dungeon") activeScene = new DungeonScene(container);
          else activeScene = new FieldScene(container);
          
          if (activeRoom && activeScene) {
              activeRoom.send("set_aura_style", { style: PLAYER_AURA_STYLE });

              if (typeof (activeScene as any).start === "function") {
                  (activeScene as any).start();
              }

              cleanupRoomBindings = setupRoomBindings(activeRoom, activeScene);
              reconnected = true;
          }
      } catch (e) {
          console.warn("Session expired or room closed. Falling back to fresh join.");
      }
  }

  // --- FALLBACK TO FRESH JOIN ---
  if (!reconnected) {
      await switchZone(lastZone); 
  }
}

boot().catch(console.error);