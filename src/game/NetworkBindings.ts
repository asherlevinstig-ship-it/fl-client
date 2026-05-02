import { TownScene } from "./TownScene";
import { FieldScene } from "./FieldScene";
import { DungeonScene } from "./DungeonScene";
import { setupTradeClient } from "../ui/TradeUI";

// Define the context your network needs to interact with the rest of the game
export type NetworkContext = {
    // Player/Environment Data
    playerClass: string;
    currentZone: string;
    localPlayerPos: { x: number, y: number, initialized: boolean };
    networkState: { lastSentX: number, lastSentY: number, lastNetworkSend: number };
    pendingInputs: { seq: number, x: number, y: number }[];
    activeAttackIndicators: { x: number, z: number, timer: number }[];
    clientSceneryGrid: any; // SpatialGrid
    
    // Getters / Setters
    getIsLocallyWolf: () => boolean;
    setIsLocallyWolf: (val: boolean) => void;
    getHeightCached: (x: number, z: number) => number;
    
    // Core Actions
    queueEvent: (task: () => void) => void;
    switchZone: (zone: string) => Promise<void>;
    
    // UI Callbacks
    showTransientUI: (id: string, text: string, color: string, duration?: number, cb?: () => void) => void;
    rehydrateAbilityUI: (room: any, me?: any) => void;
    refreshInventoryUI: (room: any, playerClass: string) => void;
    refreshShopUI: (room: any) => void;
    refreshChestUI: (room: any) => void;
    setGlobalEvent: (name: string, expiresAt: number) => void;
    addGameEvent: (html: string, type: string) => void;
    setTemporarySkill: (skill: any) => void;
    setMyMapMarker: (pos: { x: number, z: number }) => void;
    
    // Specific UI Modals
    openEventInviteUI: (room: any, eventName: string, targetZone: string) => void;
    showQuestCompleteUI: (title: string, coins: number, exp: number) => void;
    mountMazeUI: (time: number) => void;
    unmountMazeUI: () => void;
    mountDungeonUI: (wave: number, max: number, enemies: number, time: number) => void;
    unmountDungeonUI: () => void;
    closeTradeUI: () => void;
    setIsSkillTreeUIOpen: (isOpen: boolean) => void;
    setIsWorldMapOpen: (isOpen: boolean) => void;
};

// ==========================================
// UTILITY HELPERS
// ==========================================

const boundCollections = new WeakSet<object>();

export function safeBind(
    getCollection: () => any,
    onAdd: (item: any, id: string) => void,
    onRemove?: (item: any, id: string) => void
) {
    const collection = getCollection();

    // Wait until the collection exists on the client
    if (!collection) {
        setTimeout(() => safeBind(getCollection, onAdd, onRemove), 100);
        return;
    }

    if (typeof collection !== "object") return;

    // Do not mutate Colyseus schema objects with custom _isBound flags
    if (boundCollections.has(collection)) return;
    boundCollections.add(collection);

    // Process existing items immediately
    if (typeof collection.forEach === "function") {
        collection.forEach((item: any, id: string) => {
            onAdd(item, id);
        });
    } else {
        for (const key in collection) {
            if (Object.prototype.hasOwnProperty.call(collection, key)) {
                onAdd(collection[key], key);
            }
        }
    }

    // Bind old/direct callback API if this collection supports it
    try {
        if (typeof collection.onAdd === "function") {
            collection.onAdd((item: any, id: string) => {
                onAdd(item, id);
            });
        }

        if (onRemove && typeof collection.onRemove === "function") {
            collection.onRemove((item: any, id: string) => {
                onRemove(item, id);
            });
        }

        if (typeof collection.onAdd !== "function") {
            console.debug(
                "[Colyseus] Collection synced, but direct onAdd/onRemove callbacks are unavailable. Existing items were processed.",
                collection
            );
        }
    } catch (e) {
        console.warn("[Colyseus] Could not attach collection listener:", e);
    }
}

// ==========================================
// PLAYER VISUAL INITIALIZATION
// ==========================================

export function initPlayerVisual(player: any, id: string, room: any, sceneObj: any, ctx: NetworkContext) {
    const safeX = isNaN(player.x) ? 0 : player.x;
    const safeY = isNaN(player.y) ? 0 : player.y;

    const isSwim = (safeX - 1200) ** 2 + (safeY - 0) ** 2 <= 1600;
    let th = sceneObj instanceof TownScene ? ctx.getHeightCached(safeX, safeY) : 0;
    
    if (typeof sceneObj.addPlayer === "function") sceneObj.addPlayer(id, id === room.sessionId, player.name);

    if (typeof sceneObj.updatePlayer === "function") {
        sceneObj.updatePlayer(
            id, safeX, safeY, player.name, player.equippedItem, player.equipBack, 
            player.isSleeping, player.sleepRot, isSwim, th, player.equipHead, 
            player.equipChest, player.equipLegs, player.equipFeet, player.equipOffHand, 
            player.isSpiritAnimal, player.isSprinting, player.isMeditating, player.teamId, 
            player.mountedFamiliarId, player.gender, player.skinColor, player.hairStyle, 
            player.hairColor, player.eyeColor
        );
    }
    
    if (id === room.sessionId) {
        ctx.rehydrateAbilityUI(room, player);

        safeBind(
            () => player.hotbar,
            () => ctx.rehydrateAbilityUI(room, player),
            () => ctx.rehydrateAbilityUI(room, player)
        );

        if (typeof sceneObj.playerVisuals !== "undefined") {
            const v = sceneObj.playerVisuals.get(id);
            if (v) {
                v.mesh.position.set(safeX, th, safeY);
                v.targetPosition.set(safeX, th, safeY);
            } 
        }

        safeBind(
            () => player.inventory, 
            () => ctx.refreshInventoryUI(room, ctx.playerClass), 
            () => ctx.refreshInventoryUI(room, ctx.playerClass)
        );
        
        if (typeof player.listen === "function") {
            player.listen("coins", () => {
                ctx.refreshInventoryUI(room, ctx.playerClass);
                ctx.refreshShopUI(room);
            });
            player.listen("level", () => {
                ctx.refreshInventoryUI(room, ctx.playerClass);
                ctx.rehydrateAbilityUI(room, player);
            });
            player.listen("rank", () => {
                ctx.refreshInventoryUI(room, ctx.playerClass);
                ctx.rehydrateAbilityUI(room, player);
            });
        }
    }
}

// ==========================================
// CORE ROOM BINDINGS
// ==========================================

export function setupRoomBindings(room: any, sceneObj: any, ctx: NetworkContext): () => void {
    
    // 1. Setup Base Connections & Disconnections
    room.onLeave((code: number) => {
        console.warn(`Connection closed (Code: ${code}).`);
        ctx.setIsSkillTreeUIOpen(false);
        ctx.setIsWorldMapOpen(false);
        ctx.closeTradeUI(); 
        ctx.unmountMazeUI(); 
        ctx.unmountDungeonUI();

        const closeButtons = [
            "close-shop-btn", "close-inv-btn", "close-chest-btn", 
            "close-casino-btn", "close-teleport-btn", "close-quest-btn", 
            "close-bp-btn", "close-mirror-btn"
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

    // 2. Map Server Messages to Client Actions
    bindMessageListeners(room, sceneObj, ctx);

    // 3. Map Server State Entities to 3D Scene
    bindWorldEntities(room, sceneObj, ctx);

    // 4. Initialize Trade Client
    setupTradeClient(room);

    return () => { 
        try { 
            if (typeof room.removeAllListeners === "function") room.removeAllListeners(); 
        } catch (error) { 
            console.warn(error); 
        } 
    };
}

// ==========================================
// MESSAGE LISTENER GROUPS
// ==========================================

function bindMessageListeners(room: any, sceneObj: any, ctx: NetworkContext) {
    // UI & System
    room.onMessage("global_event_sync", (data: any) => ctx.setGlobalEvent(data.name, Date.now() + data.remainingMs));
    room.onMessage("server_event_teleport", (data: any) => ctx.switchZone(data.zone).catch(console.error));
    room.onMessage("quest_completed", (data: any) => ctx.showQuestCompleteUI(data.title, data.coins, data.exp));
    room.onMessage("hud_message", (message: string) => ctx.queueEvent(() => ctx.showTransientUI("general-hud-msg", message, "#ffffff", 3000)));
    room.onMessage("server_event_log", (data: any) => ctx.addGameEvent(data.html, data.type));
    room.onMessage("event_invite", (data: any) => ctx.openEventInviteUI(room, data.eventName, data.targetZone));
    
    // Chat
    room.onMessage("chat_received", (data: any) => {
        let isTeammate = false;
        if (room.state && room.state.players) {
            const myState = room.state.players.get(room.sessionId);
            isTeammate = myState && myState.teamId > 0 && myState.teamId === data.teamId;
        }
        ctx.queueEvent(() => {
            if (sceneObj && typeof sceneObj.showChatBubble === "function") sceneObj.showChatBubble(data.senderId, data.text, isTeammate);
        });
        const prefix = data.channel === "team" ? "[Team]" : "[Local]";
        const colorClass = data.channel === "team" ? "text-cyan" : "text-green";
        ctx.addGameEvent(`<span class="${colorClass}">${prefix}</span> <b>${data.senderName}:</b> ${data.text}`, "event-info");
    });

    // Zones (Maze, Dungeon, Underworld)
    room.onMessage("maze_escaped", (data: any) => ctx.showTransientUI("maze-result-ui", data.text, "#00ffaa", 3000, () => ctx.switchZone("town").catch(console.error)));
    room.onMessage("maze_failed", (data: any) => ctx.showTransientUI("maze-result-ui", data.message, "#ff0000", 3000, () => ctx.switchZone("underworld").catch(console.error)));
    room.onMessage("maze_timer_sync", (data: any) => ctx.mountMazeUI(data.remainingSeconds));
    
    room.onMessage("dungeon_sync", (data: any) => ctx.mountDungeonUI(data.wave, data.maxWaves, data.enemiesLeft, data.timeRemaining));
    room.onMessage("dungeon_announcement", (data: any) => ctx.showTransientUI("dungeon-announce-ui", data.text, "#ffaa00", 2500));
    room.onMessage("dungeon_cleared", (data: any) => {
        ctx.unmountDungeonUI();
        ctx.showTransientUI("dungeon-result-ui", data.text, "#00ffaa", 4000, () => ctx.switchZone("town").catch(console.error));
    });
    room.onMessage("dungeon_failed", (data: any) => {
        ctx.unmountDungeonUI();
        ctx.showTransientUI("dungeon-result-ui", data.message, "#ff0000", 3500, () => ctx.switchZone("underworld").catch(console.error));
    });

    room.onMessage("underworld_death", (data: any) => ctx.showTransientUI("underworld-result-ui", data.message, "#ff0000", 3500, () => ctx.switchZone("town").catch(console.error)));
    room.onMessage("underworld_escape", (data: any) => ctx.showTransientUI("underworld-result-ui", data.message, "#00aaff", 3500, () => ctx.switchZone("town").catch(console.error)));
    room.onMessage("trigger_void_fall", () => {
        ctx.queueEvent(() => {
            if (typeof sceneObj.triggerPlayerVoidFall === "function") {
                const visual = sceneObj.playerVisuals?.get(room.sessionId);
                if (visual && visual.mesh) sceneObj.triggerPlayerVoidFall(visual.mesh);
            }
        });
    });

    // Positioning & Hazards
    room.onMessage("forcePosition", (data: any) => {
        ctx.localPlayerPos.x = data.x;
        ctx.localPlayerPos.y = data.z !== undefined ? data.z : data.y; 
        ctx.localPlayerPos.initialized = true; 
        ctx.networkState.lastSentX = ctx.localPlayerPos.x;
        ctx.networkState.lastSentY = ctx.localPlayerPos.y;
        ctx.pendingInputs.length = 0;

        if (sceneObj?.playerVisuals) {
            const visual = sceneObj.playerVisuals.get(room.sessionId);
            if (visual) {
                visual.targetPosition.x = ctx.localPlayerPos.x;
                visual.targetPosition.z = ctx.localPlayerPos.y;
            }
        }
    });

    room.onMessage("spawnHazard", (hazard: any) => ctx.queueEvent(() => sceneObj?.addHazard?.(hazard.id, hazard.type, hazard.x, hazard.y || hazard.z, hazard.rank, hazard.customData)));
    room.onMessage("removeHazard", (data: any) => ctx.queueEvent(() => sceneObj?.removeHazard?.(data.id)));
    room.onMessage("unlockTemporaryAbility", (data: any) => ctx.setTemporarySkill(data));

    // Combat Visuals
    room.onMessage("enemyTelegraph", (data: any) => {
        ctx.queueEvent(() => {
            const th = sceneObj instanceof TownScene ? ctx.getHeightCached(data.x, data.z) : 0;
            sceneObj?.playEnemyTelegraph?.(data.id, data.type, data.x, data.z, data.radius, data.time, th);
            ctx.activeAttackIndicators.push({ x: data.x, z: data.z, timer: data.time || 2.0 });
        });
    });

    room.onMessage("enemyAttackExecuted", (data: any) => {
        ctx.queueEvent(() => {
            const th = sceneObj instanceof TownScene ? ctx.getHeightCached(data.x, data.z) : 0;
            sceneObj?.playEnemyAttackVisual?.(data.id, data.type, data.x, data.z, data.radius, th);
            ctx.activeAttackIndicators.push({ x: data.x, z: data.z, timer: 1.0 });
        });
    });

    room.onMessage("combatEvent", (data: any) => ctx.queueEvent(() => (sceneObj as any)?.playCombatEvent?.(data)));
    
    room.onMessage("playerAttacked", (data: any) => {
        ctx.queueEvent(() => {
            if (typeof sceneObj.playAttackVisual !== "function") return;
            
            if (data.damage === undefined) {
                if (data.id !== room.sessionId) sceneObj.playAttackVisual(data.id, data.targetX, data.targetZ);
                return; 
            }

            let color = data.isCrit ? "#ffcc00" : (data.isDoT ? "#aa00ff" : "#ffffff"); 
            let displayDmg = data.isCrit ? `${data.damage}!` : data.damage.toString();
            let yPos = sceneObj instanceof TownScene ? ctx.getHeightCached(data.targetX, data.targetZ) : 0;
            sceneObj.showDamageNumber?.(data.targetX, yPos + 1.5, data.targetZ, displayDmg, color);
        });
    });

    room.onMessage("abilityUsed", (data: any) => {
        if (data.id === room.sessionId) {
            if (data.abilityId === "spirit_animal") ctx.setIsLocallyWolf(true);
            else if (data.abilityId === "spirit_animal_end") ctx.setIsLocallyWolf(false);
            if (data.abilityId === "map_marker_placed") ctx.setMyMapMarker({ x: data.targetX, z: data.targetZ });
        }

        ctx.queueEvent(() => {
            if (data.abilityId === "heavenly_judgment_move" || data.abilityId === "orbital_strike_mini_move") {
                sceneObj?.updateHazard?.(data.id, data.targetX, data.targetZ);
                return; 
            }
            if (data.id !== room.sessionId || !["umbral_dash", "basic_dash", "shadow_step", "reaper_step"].includes(data.abilityId)) {
                sceneObj?.playAbilityVisual?.(data.id, data.abilityId, data.targetX, data.targetZ);
            }
        });
    });

    room.onMessage("fishingResult", (data: any) => {
        ctx.queueEvent(() => {
            if (data.success) ctx.showTransientUI("fishing-result-ui", `🎣 Caught: ${data.item}!`, "#00ffaa", 3000);
            else ctx.showTransientUI("fishing-result-ui", `❌ ${data.message || "The fish got away!"}`, "#ff4444", 3000);
        });
    });
}

// ==========================================
// WORLD ENTITY BINDINGS
// ==========================================

function bindWorldEntities(room: any, sceneObj: any, ctx: NetworkContext) {
    // PLAYERS
    safeBind(() => room.state?.players, 
        (p: any, id: string) => initPlayerVisual(p, id, room, sceneObj, ctx), 
        (p: any, id: string) => {
            if (typeof (sceneObj as any).removePlayer === "function") (sceneObj as any).removePlayer(id);
        }
    );

    // DECORATIONS
    safeBind(() => room.state?.decorations, (deco: any) => {
        if (sceneObj instanceof TownScene) {
            const terrainY = ctx.getHeightCached(deco.x, deco.z);
            if (typeof (sceneObj as any).addDecoration === "function") {
                (sceneObj as any).addDecoration(deco.id, deco.type, deco.x, terrainY + 0.05, deco.z, deco.rotation);
            }
        }
        safeBind(
            () => deco.inventory, 
            () => ctx.refreshChestUI(room), 
            () => ctx.refreshChestUI(room)
        );
    }, (deco: any) => {
        if (sceneObj instanceof TownScene && typeof (sceneObj as any).removeDecoration === "function") {
            (sceneObj as any).removeDecoration(deco.id);
        }
    });

    // STORES
    safeBind(() => room.state?.stores, (store: any) => {
        if (typeof store.listen === "function") {
            store.listen("vault", () => ctx.refreshShopUI(room));
            store.listen("ownerId", () => ctx.refreshShopUI(room));
        }
        safeBind(
            () => store.inventory, 
            () => ctx.refreshShopUI(room), 
            () => ctx.refreshShopUI(room)
        );
    });

    // FAMILIARS
    safeBind(() => room.state?.familiars, (fam: any, id: string) => {
        if ((sceneObj as any).familiarRenderer) {
            const safeX = isNaN(fam.x) ? 0 : fam.x;
            const safeY = isNaN(fam.y) ? 0 : fam.y;
            const th = sceneObj instanceof TownScene ? ctx.getHeightCached(safeX, safeY) : 0;
            if (typeof (sceneObj as any).familiarRenderer.addFamiliar === "function") {
                (sceneObj as any).familiarRenderer.addFamiliar(id, fam.type, safeX, th, safeY);
            }
        }
    }, (fam: any, id: string) => {
        if (typeof (sceneObj as any).familiarRenderer?.removeFamiliar === "function") {
            (sceneObj as any).familiarRenderer.removeFamiliar(id);
        }
    });

    // ENEMIES
    safeBind(() => room.state?.enemies, 
        (enemy: any, id: string) => {
            if (typeof (sceneObj as any).addEnemy === "function") (sceneObj as any).addEnemy(id, enemy.name, enemy.type);
        }, 
        (enemy: any, id: string) => {
            if (typeof (sceneObj as any).removeEnemy === "function") (sceneObj as any).removeEnemy(id);
        }
    );

    // LOOT ITEMS
    safeBind(() => room.state?.lootItems, (item: any, id: string) => {
        if (item.kind.startsWith("Coin_")) {
            if (typeof (sceneObj as any).spawnCoinMesh === "function") {
                (sceneObj as any).spawnCoinMesh(id, item.x, item.y);
            }
            return; 
        }
        
        if (sceneObj instanceof FieldScene || sceneObj instanceof DungeonScene) {
            if (typeof (sceneObj as any).addLootItem === "function") {
                (sceneObj as any).addLootItem(id, item.kind, item.x, item.y, item.scale, item.rotation);
            }
        } else if (sceneObj instanceof TownScene) {
            if (typeof (sceneObj as any).addLootItem === "function") {
                (sceneObj as any).addLootItem(id, item.kind, item.x, item.y, item.isOpen);
            }
        }
    }, (item: any, id: string) => {
        if (item.kind?.startsWith("Coin_")) {
            if (typeof (sceneObj as any).removeCoinMesh === "function") (sceneObj as any).removeCoinMesh(id);
            return;
        }
        if (typeof (sceneObj as any).removeLootItem === "function") (sceneObj as any).removeLootItem(id);
    });

    // SCENERY
    safeBind(() => room.state?.scenery, (item: any, id: string) => {
        try { ctx.clientSceneryGrid.add(item, item.x, item.y); } catch (e) { /* silent */ }
        if (sceneObj instanceof TownScene && typeof (sceneObj as any).addScenery === "function") {
            (sceneObj as any).addScenery(item.id, item.kind, item.x, item.y, item.scale, item.rotation);
        }
    }, (item: any, id: string) => {
        ctx.clientSceneryGrid.remove(item, item.x, item.y);
        if (sceneObj instanceof TownScene && typeof (sceneObj as any).removeScenery === "function") {
            (sceneObj as any).removeScenery(item.id);
        }
    });

    // LAND PLOTS & BUILDINGS
    safeBind(() => room.state?.landPlots, (plot: any) => {
        if (sceneObj instanceof TownScene) {
            const worldX = plot.gridX * 20 + 10;
            const worldZ = plot.gridY * 20 + 10;
            const terrainY = ctx.getHeightCached(worldX, worldZ);
            if (typeof (sceneObj as any).addLandPlot === "function") {
                (sceneObj as any).addLandPlot(plot.id, plot.gridX, plot.gridY, plot.ownerId, plot.ownerName, terrainY);
            }
        }
    }, (plot: any) => {
        if (sceneObj instanceof TownScene && typeof (sceneObj as any).removeLandPlot === "function") {
            (sceneObj as any).removeLandPlot(plot.id);
        }
    });

    safeBind(() => room.state?.buildings, (bldg: any) => {
        if (sceneObj instanceof TownScene) {
            const terrainY = ctx.getHeightCached(bldg.x, bldg.z);
            if (typeof (sceneObj as any).addBuilding === "function") {
                (sceneObj as any).addBuilding(bldg.id, bldg.type, bldg.x, bldg.z, bldg.isConstructed, bldg.progress, bldg.targetProgress, terrainY);
            }
        }
    });
}

// ==========================================
// STATE SYNCHRONIZATION LOOP
// ==========================================

export function syncStateToScene(room: any, sceneObj: any, ctx: NetworkContext) {
    if (!room || !room.state || !sceneObj) return;
    const state = room.state;

    try {
        if (state.players?.forEach) {
            state.players.forEach((player: any, id: string) => {
                // Saftey check: force create missing meshes
                if (!sceneObj.playerVisuals?.has(id)) initPlayerVisual(player, id, room, sceneObj, ctx);

                if (id !== room.sessionId) {
                    const safeX = isNaN(player.x) ? 0 : player.x;
                    const safeY = isNaN(player.y) ? 0 : player.y;
                    const isSwim = (safeX - 1200) ** 2 + (safeY - 0) ** 2 <= 1600;
                    const th = sceneObj instanceof TownScene ? ctx.getHeightCached(safeX, safeY) : 0;

                    sceneObj.updatePlayer?.(id, safeX, safeY, player.name, player.equippedItem, player.equipBack, player.isSleeping, player.sleepRot, isSwim, th, player.equipHead, player.equipChest, player.equipLegs, player.equipFeet, player.equipOffHand, player.isSpiritAnimal, player.isSprinting, player.isMeditating, player.teamId, player.mountedFamiliarId, player.gender, player.skinColor, player.hairStyle, player.hairColor, player.eyeColor);
                    sceneObj.updatePlayerFishing?.(id, player.fishingState || "none", player.bobberX || 0, player.bobberZ || 0);
                }
            });
        }

        if (state.enemies?.forEach && typeof sceneObj.updateEnemy === "function") {
            state.enemies.forEach((enemy: any, id: string) => {
                if (sceneObj.enemyVisuals && !sceneObj.enemyVisuals.has(id)) sceneObj.addEnemy?.(id, enemy.name, enemy.type);

                const safeX = isNaN(enemy.x) ? 0 : enemy.x;
                const safeY = isNaN(enemy.y) ? 0 : enemy.y;

                let statusText = "";
                if (enemy.stunnedTimer > 0) statusText += " 💫";
                else if (enemy.rootedTimer > 0) statusText += " 🧊";
                else if (enemy.action === "recovering") statusText += " 😴";

                if (enemy.afflictions?.size > 0) {
                    enemy.afflictions.forEach((aff: any, key: string) => {
                        if (key === "Bleed") statusText += " 🩸";
                        if (key === "Necrosis") statusText += " 💀";
                        // ... add other afflictions here
                    });
                }

                const label = `${enemy.name} (${Math.ceil(enemy.hp)}/${enemy.maxHp})${statusText}`;
                const th = sceneObj instanceof TownScene ? ctx.getHeightCached(safeX, safeY) : 0;
                let keysArray = enemy.afflictions?.keys ? Array.from(enemy.afflictions.keys()) : [];

                sceneObj.updateEnemy(id, safeX, safeY, label, enemy.action, enemy.attackRadius || 2.5, enemy.targetX, enemy.targetY, th, keysArray);
            });
        }

        if (state.buildings?.forEach && sceneObj instanceof TownScene) {
            state.buildings.forEach((bldg: any) => sceneObj.updateBuilding?.(bldg.id, bldg.type, bldg.isConstructed, bldg.progress, bldg.targetProgress));
        }

        if (state.scenery?.forEach && sceneObj instanceof TownScene) {
            state.scenery.forEach((item: any) => sceneObj.updateSceneryProgress?.(item.id, item.hp, item.maxHp));
        }

        if (state.familiars?.forEach && sceneObj.familiarRenderer) {
            state.familiars.forEach((fam: any, id: string) => {
                const r = sceneObj.familiarRenderer;
                const safeX = isNaN(fam.x) ? 0 : fam.x;
                const safeY = isNaN(fam.y) ? 0 : fam.y;
                const th = sceneObj instanceof TownScene ? ctx.getHeightCached(safeX, safeY) : 0;
                
                if (!r.visuals.has(id)) r.addFamiliar?.(id, fam.type, safeX, th, safeY);
                r.updateFamiliar?.(id, safeX, th, safeY, fam.isDetached, fam.action);
            });
        }
    } catch (e) {
        console.error("[Client Sync Error] Crash prevented during state sync:", e);
    }
}