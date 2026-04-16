import * as THREE from "three";
import { BaseScene, PlayerVisual } from "./BaseScene";
import { EnemyModel } from "../EnemyModel";
import { TownEnvironment, ParticleSystem, CasinoAnims, NPCBuilding } from "./TownEnvironment";
import { spawnAbilityVFX } from "../vfx/AbilityVFX";
import { ITEM_DB, RANK_COLORS, ItemRank } from "../ItemDatabase";

import { GiantGodNPC } from "./entities/GiantGodNPC";
import { buildStructureModel, buildDecoModel } from "./PropBuilder";

// --- CONSTANTS FOR NATURAL LAKE PHYSICS ---
export const LAKE_X = -180;
export const LAKE_Z = 180;
export const DOCK_INNER = 35; // The edge where the water starts
export const DOCK_OUTER = 45; // The edge where the grass meets the wood
export const LAKE_BLEND_RADIUS = 85; // How far out the terrain slopes down

// --- PURE MATHEMATICAL TERRAIN HEIGHT ---
export function getTerrainHeight(x: number, z: number): number {
    if (isNaN(x) || isNaN(z)) return 0;

    const distFromCenter = Math.sqrt(x * x + z * z);
    const TOWN_RADIUS = 65;
    const BLEND_ZONE = 25; 

    // --- ELVEN KINGDOM PLATEAU LOGIC ---
    const distToElven = Math.sqrt((x - 1200) ** 2 + (z - 0) ** 2);
    const ELVEN_RADIUS = 80;
    const ELVEN_BLEND = 60;
    const ELVEN_HEIGHT = 40; 

    const villages = [
        { cx: 250, cz: 250, targetH: 7.2 },
        { cx: -300, cz: 400, targetH: 18.7 },
        { cx: 500, cz: -150, targetH: -10.2 }
    ];

    let height = 0;
    height += Math.sin(x * 0.015) * Math.cos(z * 0.015) * 18;
    height += Math.sin(x * 0.04 + 2) * Math.cos(z * 0.03) * 6;
    height += Math.sin(x * 0.1) * Math.cos(z * 0.1) * 1.5;

    let finalHeight = 0.05 + height;

    // Apply Biomes
    if (distFromCenter < TOWN_RADIUS + BLEND_ZONE) {
        if (distFromCenter < TOWN_RADIUS) {
            finalHeight = 0.05;
        } else {
            const t = (distFromCenter - TOWN_RADIUS) / BLEND_ZONE;
            const blend = t * t * (3 - 2 * t); 
            finalHeight = 0.05 + height * blend;
        }
    } else if (distToElven < ELVEN_RADIUS + ELVEN_BLEND) {
        if (distToElven < ELVEN_RADIUS) {
            finalHeight = ELVEN_HEIGHT;
        } else {
            const t = (distToElven - ELVEN_RADIUS) / ELVEN_BLEND;
            const blend = t * t * (3 - 2 * t);
            finalHeight = ELVEN_HEIGHT * (1 - blend) + height * blend;
        }
    } else {
        const VILLAGE_RADIUS = 20;
        const VILLAGE_BLEND = 15;
        for (const v of villages) {
            if (Math.abs(x - v.cx) < 40 && Math.abs(z - v.cz) < 40) {
                const distToVillage = Math.sqrt((x - v.cx) ** 2 + (z - v.cz) ** 2);
                if (distToVillage < VILLAGE_RADIUS + VILLAGE_BLEND) {
                    if (distToVillage < VILLAGE_RADIUS) {
                        finalHeight = v.targetH;
                        break;
                    }
                    const t = (distToVillage - VILLAGE_RADIUS) / VILLAGE_BLEND;
                    const blend = t * t * (3 - 2 * t);
                    finalHeight = v.targetH * (1 - blend) + (0.05 + height) * blend;
                    break;
                }
            }
        }
    }

    // --- NATURAL LAKE CRATER & BOARDWALK PHYSICS ---
    const distToLake = Math.sqrt((x - LAKE_X) ** 2 + (z - LAKE_Z) ** 2);

    if (distToLake < LAKE_BLEND_RADIUS) {
        // Find the absolute natural surface at the center of the lake to anchor the depth
        let lakeCenterH = 0.05;
        lakeCenterH += Math.sin(LAKE_X * 0.015) * Math.cos(LAKE_Z * 0.015) * 18;
        lakeCenterH += Math.sin(LAKE_X * 0.04 + 2) * Math.cos(LAKE_Z * 0.03) * 6;
        lakeCenterH += Math.sin(LAKE_X * 0.1) * Math.cos(LAKE_Z * 0.1) * 1.5;
        
        const shoreHeight = lakeCenterH - 2.0; 
        const lakeBottom = shoreHeight - 6.0;

        let groundHeight = finalHeight;

        if (distToLake < DOCK_INNER - 5) {
            // Flat lake bed
            groundHeight = lakeBottom;
        } else if (distToLake < DOCK_OUTER) {
            // Smoothly slope from the deep bottom up to the flat shoreline
            const t = (distToLake - (DOCK_INNER - 5)) / (DOCK_OUTER - (DOCK_INNER - 5));
            const blend = t * t * (3 - 2 * t);
            groundHeight = lakeBottom * (1 - blend) + shoreHeight * blend;
        } else {
            // Smoothly slope from the flat shoreline up to the surrounding natural hills
            const t = (distToLake - DOCK_OUTER) / (LAKE_BLEND_RADIUS - DOCK_OUTER);
            const blend = t * t * (3 - 2 * t);
            groundHeight = shoreHeight * (1 - blend) + finalHeight * blend;
        }

        // Apply Boardwalk Solid Physics - smoothly blended at the edge
        if (distToLake >= DOCK_INNER && distToLake <= DOCK_OUTER) {
            const dockHeight = shoreHeight + 0.2;
            if (distToLake > DOCK_OUTER - 1.0) {
                const blend = distToLake - (DOCK_OUTER - 1.0); // 0.0 to 1.0
                finalHeight = Math.max(groundHeight, dockHeight * (1 - blend) + groundHeight * blend);
            } else {
                finalHeight = Math.max(groundHeight, dockHeight);
            }
        } else {
            finalHeight = groundHeight;
        }
    }

    return finalHeight;
}

type SceneryVisual = {
  mesh: THREE.Group | THREE.Mesh;
  baseRotX: number;
  baseRotY: number;
  baseRotZ: number;
  hitShakeTimer: number;
  labelSprite?: THREE.Sprite;
  lastHp: number; // Added to prevent continuous network-sync shaking
};

type EnemyData = {
    visual: EnemyModel; 
    labelSprite: THREE.Sprite;
    currentLabel: string;
    action: string;
};

type HazardVisual = {
    mesh: THREE.Group;
    type: string;
    customData: any;
};

type RealmEventVisual = {
    group: THREE.Group;
    ring: THREE.Mesh;
    dome: THREE.Mesh;
    label: THREE.Sprite;
    beacon: THREE.Mesh;
    currentState: string;
};

class InstancedMeshGroup {
    public mesh: THREE.InstancedMesh;
    public activeCount: number = 0; 
    public idToIndex = new Map<string, number>();
    public indexToId = new Map<number, string>();
    public isDirty: boolean = false; 

    constructor(geo: THREE.BufferGeometry, mat: THREE.Material, maxCount: number) {
        this.mesh = new THREE.InstancedMesh(geo, mat, maxCount);
        this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
        
        this.mesh.frustumCulled = false;
        this.mesh.count = 0; 
    }

    addInstance(id: string, matrix: THREE.Matrix4) {
        if (this.idToIndex.has(id)) {
            this.updateMatrix(id, matrix);
            return;
        }
        
        const maxInstances = this.mesh.instanceMatrix ? this.mesh.instanceMatrix.count : 15000;
        if (this.activeCount >= maxInstances) return; 

        const index = this.activeCount++;
        this.idToIndex.set(id, index);
        this.indexToId.set(index, id);
        this.mesh.setMatrixAt(index, matrix);
        
        this.mesh.count = this.activeCount; 
        this.isDirty = true; 
    }

    removeInstance(id: string) {
        if (!this.idToIndex.has(id)) return;
        const indexToRemove = this.idToIndex.get(id)!;
        const lastIndex = this.activeCount - 1;

        if (indexToRemove !== lastIndex) {
            const lastId = this.indexToId.get(lastIndex)!;
            const lastMatrix = new THREE.Matrix4();
            this.mesh.getMatrixAt(lastIndex, lastMatrix);

            this.mesh.setMatrixAt(indexToRemove, lastMatrix);
            this.idToIndex.set(lastId, indexToRemove);
            this.indexToId.set(indexToRemove, lastId);
        }

        this.idToIndex.delete(id);
        this.indexToId.delete(lastIndex);
        this.activeCount--;
        
        this.mesh.count = this.activeCount; 
        this.isDirty = true;
    }
    
    updateMatrix(id: string, matrix: THREE.Matrix4) {
        const index = this.idToIndex.get(id);
        if (index !== undefined) {
            this.mesh.setMatrixAt(index, matrix);
            this.isDirty = true;
        }
    }

    flush() {
        if (this.isDirty) {
            this.mesh.instanceMatrix.needsUpdate = true;
            this.isDirty = false;
        }
    }
}

export class TownScene extends BaseScene {

  public groundMesh?: THREE.Mesh; 

  sceneryVisuals = new Map<string, SceneryVisual>();
  ownedPlots = new Map<string, string>();
  plotFences = new Map<string, THREE.Group>();
  buildingMeshes = new Map<string, { type: string, mesh: THREE.Group, label?: THREE.Sprite }>();
  decorationMeshes = new Map<string, THREE.Group>();
  public lootVisuals = new Map<string, THREE.Group>();
  private enemies = new Map<string, EnemyData>();
  private npcVillageBuildings: NPCBuilding[] = [];
  
  public hazardVisuals = new Map<string, HazardVisual>();
  public realmEventVisuals = new Map<string, RealmEventVisual>();

  private godNpc?: GiantGodNPC;

  private hoverPlotMesh?: THREE.Mesh;
  private lastHoverPlotId: string = "";
  public isBuyMode: boolean = false;
  public isBuildMode: boolean = false;
  public isDecoMode: boolean = false;
  public decoRotation: number = 0;
  
  public currentBlueprintType: string = "house";
  private blueprintMeshes: Map<string, THREE.Group> = new Map();
  private decoGhostMeshes: Map<string, THREE.Group> = new Map();

  private mansionRoof?: THREE.Mesh;

  private fountainParticles?: ParticleSystem;
  private fireParticlesList: ParticleSystem[] = [];
  private emberParticlesList: ParticleSystem[] = [];
  private fireLights: THREE.PointLight[] = [];
  private grassMesh?: THREE.InstancedMesh;
  
  private tavernWalls?: THREE.Group;

  // --- FISHING MECHANICS ---
  private lakeMesh?: THREE.Mesh;

  // --- LIGHTING & ELVEN PARTICLES ---
  private ambientLight!: THREE.AmbientLight;
  private dirLight!: THREE.DirectionalLight;
  private auroraMeshes: THREE.Mesh[] = [];
  private fairyParticlesList: ParticleSystem[] = [];
  private waterfallParticlesList: ParticleSystem[] = [];
  
  private frameCount = 0; 

  private casinoAnims: CasinoAnims = {
    rouletteWheel: null,
    rouletteTimer: 0,
    bjCards: [],
    bjTimer: 0,
    coinMesh: null,
    coinTimer: 0,
    slotArm: null,
    slotTimer: 0
  };

  private dayBgColor = new THREE.Color(0x87CEEB);
  private nightBgColor = new THREE.Color(0x020208);

  constructor(container: HTMLElement) {
    super(container);

    this.scene.background = this.dayBgColor.clone();

    this.createLights();
    this.buildTownOfBeginnings();
    this.createHoverPlot();
    this.createBlueprints();
    this.createDecoGhosts();

    this.start();
  }

  public override updatePlayer(
      id: string,
      x: number,
      z: number,
      name?: string,
      equippedItem?: string,
      equipBack?: string,
      isSleeping: boolean = false,
      sleepRot: number = 0,
      isSwimming: boolean = false,
      height: number = 0,
      equipHead?: string,
      equipChest?: string,
      equipLegs?: string,
      equipFeet?: string,
      equipOffHand?: string,
      isWolfVisual: boolean = false,
      isSprinting: boolean = false,
      isMeditating: boolean = false,
      teamId: number = 0,
      mountedFamiliarId: string = "",
      isAuraActive: boolean = false,
      auraStyle: string = "tyrant"
  ) {
      super.updatePlayer(
    id,
    x,
    z,
    name,
    equippedItem,
    equipBack,
    isSleeping,
    sleepRot,
    isSwimming,
    height,
    equipHead,
    equipChest,
    equipLegs,
    equipFeet,
    equipOffHand,
    isWolfVisual,
    isSprinting,
    isMeditating,
    teamId,
    mountedFamiliarId,
    isAuraActive,
    auraStyle
);

      const visual = this.playerVisuals.get(id);
      if (!visual) return;

      const anyVis = visual as any;

      if (isAuraActive) {
          if (!anyVis.auraMesh || anyVis.auraStyle !== auraStyle) {
              if (anyVis.auraMesh) {
                  visual.mesh.remove(anyVis.auraMesh);
                  anyVis.auraMesh.traverse((c: any) => {
                      if (c.geometry) c.geometry.dispose();
                      if (c.material) {
                          if (Array.isArray(c.material)) c.material.forEach((m: any) => m.dispose());
                          else c.material.dispose();
                      }
                  });
              }

              const auraGroup = new THREE.Group();
              auraGroup.position.y = 1.0; 

              if (auraStyle === "tyrant") {
                  const geo = new THREE.SphereGeometry(3.5, 16, 16);
                  const mat = new THREE.MeshBasicMaterial({ color: 0xff2222, transparent: true, opacity: 0.15, wireframe: true });
                  const mesh = new THREE.Mesh(geo, mat);
                  
                  const innerGeo = new THREE.SphereGeometry(3.2, 16, 16);
                  const innerMat = new THREE.MeshBasicMaterial({ color: 0x550000, transparent: true, opacity: 0.3, blending: THREE.AdditiveBlending });
                  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
                  
                  auraGroup.add(mesh, innerMesh);
              } else if (auraStyle === "sanctuary") {
                  const geo = new THREE.TorusGeometry(3.5, 0.15, 8, 32);
                  const mat = new THREE.MeshBasicMaterial({ color: 0x44aaff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
                  const mesh = new THREE.Mesh(geo, mat);
                  mesh.rotation.x = Math.PI / 2;

                  const geo2 = new THREE.TorusGeometry(3.0, 0.05, 8, 32);
                  const mat2 = new THREE.MeshBasicMaterial({ color: 0xffddaa, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
                  const mesh2 = new THREE.Mesh(geo2, mat2);
                  mesh2.rotation.x = Math.PI / 2;

                  auraGroup.add(mesh, mesh2);
              } else if (auraStyle === "void") {
                  const geo = new THREE.SphereGeometry(3.0, 16, 16);
                  const mat = new THREE.MeshBasicMaterial({ color: 0x110033, transparent: true, opacity: 0.4 });
                  const mesh = new THREE.Mesh(geo, mat);
                  auraGroup.add(mesh);
              } else if (auraStyle === "storm") {
                  const geo = new THREE.TorusGeometry(3.0, 0.6, 8, 24);
                  const mat = new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.2, wireframe: true });
                  const mesh = new THREE.Mesh(geo, mat);
                  mesh.rotation.x = Math.PI / 2;

                  const innerGeo = new THREE.TorusGeometry(2.5, 0.2, 8, 24);
                  const innerMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6, wireframe: true, blending: THREE.AdditiveBlending });
                  const innerMesh = new THREE.Mesh(innerGeo, innerMat);
                  innerMesh.rotation.x = Math.PI / 2;

                  auraGroup.add(mesh, innerMesh);
              }

              visual.mesh.add(auraGroup);
              anyVis.auraMesh = auraGroup;
              anyVis.auraStyle = auraStyle;
          }
      } else {
          if (anyVis.auraMesh) {
              visual.mesh.remove(anyVis.auraMesh);
              anyVis.auraMesh.traverse((c: any) => {
                  if (c.geometry) c.geometry.dispose();
                  if (c.material) {
                      if (Array.isArray(c.material)) c.material.forEach((m: any) => m.dispose());
                      else c.material.dispose();
                  }
              });
              anyVis.auraMesh = null;
          }
      }
  }

  public playAbilityVisual(id: string, abilityId: string, targetX: number, targetZ: number) {
        const playerVisual = this.playerVisuals.get(id);
        const terrainHeight = getTerrainHeight(targetX, targetZ);

        spawnAbilityVFX(
            this.scene, 
            abilityId, 
            targetX, 
            targetZ, 
            terrainHeight, 
            playerVisual
        );
  }

  public updateRealmEvent(id: string, x: number, z: number, radius: number, state: string, eventName: string, progress: number, targetProgress: number) {
      let visual = this.realmEventVisuals.get(id);

      if (!visual) {
          const group = new THREE.Group();
          const terrainY = getTerrainHeight(x, z);
          group.position.set(x, terrainY + 0.1, z);

          const ringGeo = new THREE.TorusGeometry(radius, 0.4, 16, 64);
          const ringMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
          const ring = new THREE.Mesh(ringGeo, ringMat);
          ring.rotation.x = -Math.PI / 2;

          const domeGeo = new THREE.SphereGeometry(radius, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
          const domeMat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.05, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });
          const dome = new THREE.Mesh(domeGeo, domeMat);

          const beaconGeo = new THREE.CylinderGeometry(1.5, 1.5, 1000, 16);
          beaconGeo.translate(0, 500, 0); 
          const beaconMat = new THREE.MeshBasicMaterial({ 
              color: 0xffaa00, 
              transparent: true, 
              opacity: 0.6, 
              blending: THREE.AdditiveBlending,
              depthWrite: false
          });
          const beacon = new THREE.Mesh(beaconGeo, beaconMat);
          beacon.frustumCulled = false; 

          const label = this.createNameLabel(`[EVENT] ${eventName}`);
          label.position.set(0, 10, 0);
          label.scale.set(12.0, 3.0, 1.0);

          group.add(ring, dome, beacon, label);
          this.scene.add(group);

          visual = { group, ring, dome, label, beacon, currentState: state };
          this.realmEventVisuals.set(id, visual);
      }

      visual.currentState = state;
      let text = `[EVENT] ${eventName}`;
      
      if (state === "waiting") {
          text += ` - Step inside to begin!`;
          (visual.ring.material as THREE.MeshBasicMaterial).color.setHex(0xffaa00);
          (visual.beacon.material as THREE.MeshBasicMaterial).color.setHex(0xffaa00);
      } else if (state === "active") {
          text += ` - Wave ${progress} / ${targetProgress}`;
          (visual.ring.material as THREE.MeshBasicMaterial).color.setHex(0xff0000);
          (visual.beacon.material as THREE.MeshBasicMaterial).color.setHex(0xff0000);
      }

      const oldMat = visual.label.material;
      visual.group.remove(visual.label);
      if (oldMat instanceof THREE.SpriteMaterial) {
          oldMat.dispose();
      }
      
      visual.label = this.createNameLabel(text);
      visual.label.position.set(0, 10, 0);
      visual.label.scale.set(12.0, 3.0, 1.0);
      visual.group.add(visual.label);
  }

  public removeRealmEvent(id: string) {
      const visual = this.realmEventVisuals.get(id);
      if (visual) {
          this.scene.remove(visual.group);
          visual.group.traverse((c) => {
              if (c instanceof THREE.Mesh) {
                  c.geometry?.dispose();
                  if (c.material) {
                      if (Array.isArray(c.material)) c.material.forEach(m => m.dispose());
                      else c.material.dispose();
                  }
              } else if (c instanceof THREE.Sprite) {
                  if (c.material instanceof THREE.SpriteMaterial) {
                      c.material.dispose(); 
                  }
              }
          });
          this.realmEventVisuals.delete(id);
      }
  }

  public addHazard(id: string, type: string, x: number, z: number, rank: number, customData: any = {}) {
      if (this.hazardVisuals.has(id)) return;

      const group = new THREE.Group();
      const terrainY = getTerrainHeight(x, z);
      group.position.set(x, terrainY + 0.05, z);

      const steelMat = new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.4 });
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
      const glowingCyan = new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
      const glowingRed = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending });
      const glowingYellow = new THREE.MeshBasicMaterial({ color: 0xffcc00, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });

      switch (type) {
          case "map_marker":
              const marker = new THREE.Mesh(new THREE.OctahedronGeometry(0.5, 0), glowingCyan);
              marker.position.y = 2.0;
              group.add(marker);
              break;
          case "recall_beacon":
              const rBase = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 0.2, 8), steelMat);
              const rCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.4, 0), new THREE.MeshBasicMaterial({ color: 0xaa00ff, transparent: true, opacity: 0.8 }));
              rCrystal.position.y = 0.8;
              group.add(rBase, rCrystal);
              break;
          case "tinkerer_trap":
              const trapBase = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 0.1, 16), steelMat);
              const trapLight = new THREE.Mesh(new THREE.SphereGeometry(0.15), glowingRed);
              trapLight.position.y = 0.1;
              group.add(trapBase, trapLight);
              break;
          case "engineer_turret":
              const turBase = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.0, 0.8), steelMat);
              turBase.position.y = 0.5;
              const turBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.0), steelMat);
              turBarrel.rotation.x = Math.PI / 2;
              turBarrel.position.set(0, 0.8, 0.5);
              group.add(turBase, turBarrel);
              break;
          case "engineer_shield_dome":
              const dome = new THREE.Mesh(new THREE.SphereGeometry(5.0, 16, 16), new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.2, side: THREE.DoubleSide }));
              group.add(dome);
              break;
          case "defense_tower":
              const towerGeo = new THREE.CylinderGeometry(1.5, 1.8, 8.0, 8);
              const towerMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 1.0 });
              const tower = new THREE.Mesh(towerGeo, towerMat);
              tower.position.y = 4.0;
              group.add(tower);
              break;
          case "town_portal_node":
              const pRing = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.2, 8, 24), glowingCyan);
              pRing.rotation.x = -Math.PI / 2;
              group.add(pRing);
              break;
          case "party_keg":
              const keg = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 1.2, 12), woodMat);
              keg.position.y = 0.6;
              group.add(keg);
              break;
          case "regen_mist":
              const mist = new THREE.Mesh(new THREE.SphereGeometry(customData.radius || 5.0, 16, 16), new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.3 }));
              mist.position.y = 2.0;
              group.add(mist);
              break;
          case "blood_decoy":
              const bDecoy = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.8, 0.4), glowingRed);
              bDecoy.position.y = 0.9;
              group.add(bDecoy);
              break;
          case "dark_singularity":
              const bHole = new THREE.Mesh(new THREE.SphereGeometry(1.5, 16, 16), new THREE.MeshBasicMaterial({ color: 0x000000 }));
              const bAura = new THREE.Mesh(new THREE.SphereGeometry(1.8, 16, 16), new THREE.MeshBasicMaterial({ color: 0x440088, transparent: true, opacity: 0.5 }));
              bHole.position.y = 2.0; bAura.position.y = 2.0;
              group.add(bHole, bAura);
              break;
          case "doom_familiar":
              const eye = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), new THREE.MeshBasicMaterial({ color: 0x8800ff }));
              eye.position.y = 3.0;
              group.add(eye);
              break;
          case "radiant_trail":
              const trail = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 2.0), glowingYellow);
              trail.rotation.x = -Math.PI / 2;
              group.add(trail);
              break;
          case "aura_of_purity":
              const aura = new THREE.Mesh(new THREE.RingGeometry(5.8, 6.0, 32), glowingYellow);
              aura.rotation.x = -Math.PI / 2;
              group.add(aura);
              break;
          case "holy_fire_ring":
              const hRing = new THREE.Mesh(new THREE.TorusGeometry(6.0, 0.3, 8, 32), new THREE.MeshBasicMaterial({ color: 0xff8800, transparent: true, opacity: 0.7 }));
              hRing.rotation.x = -Math.PI / 2;
              group.add(hRing);
              break;
          case "consecrated_ground":
              const cg = new THREE.Mesh(new THREE.CircleGeometry(5.0, 32), glowingYellow);
              cg.rotation.x = -Math.PI / 2;
              group.add(cg);
              break;
          case "grand_cross_turret":
              const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.4, 4.0, 0.4), glowingYellow);
              const crossH = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.4, 0.4), glowingYellow);
              crossV.position.y = 3.0; crossH.position.y = 3.5;
              group.add(crossV, crossH);
              break;
          case "heavenly_judgment":
          case "orbital_strike_mini":
              const r = customData.radius || 2.5;
              const pillar = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 20.0, 16), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 }));
              pillar.position.y = 10.0;
              group.add(pillar);
              break;
          case "bull_rush_fire":
              const fTrail = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.5), new THREE.MeshBasicMaterial({ color: 0xff4400, transparent: true, opacity: 0.8 }));
              fTrail.rotation.x = -Math.PI / 2;
              group.add(fTrail);
              break;
          case "shattered_crater":
              const crater = new THREE.Mesh(new THREE.CircleGeometry(5.0, 16), new THREE.MeshStandardMaterial({ color: 0x221100, roughness: 1.0 }));
              crater.rotation.x = -Math.PI / 2;
              group.add(crater);
              break;
          case "whirlwind_aura":
              const wind = new THREE.Mesh(new THREE.CylinderGeometry(3.0, 3.0, 3.0, 16), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2, side: THREE.DoubleSide }));
              wind.position.y = 1.5;
              group.add(wind);
              break;
          case "spirit_animal":
              const wolfGeo = new THREE.BoxGeometry(0.8, 1.2, 1.8);
              const wolfMat = new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.5 });
              const wolf = new THREE.Mesh(wolfGeo, wolfMat);
              wolf.position.y = 0.6;
              group.add(wolf);
              break;
          case "jagged_stone":
              const spike = new THREE.Mesh(new THREE.ConeGeometry(1.0, 2.5, 4), new THREE.MeshStandardMaterial({ color: 0x4a3221, roughness: 1.0 }));
              spike.position.y = 1.25;
              group.add(spike);
              break;
          case "healing_blossom":
              const flowerBase = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 1.0), new THREE.MeshStandardMaterial({ color: 0x22aa22 }));
              flowerBase.position.y = 0.5;
              const petal = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 8), new THREE.MeshBasicMaterial({ color: 0xff66cc, transparent: true, opacity: 0.8 }));
              petal.position.y = 1.0;
              group.add(flowerBase, petal);
              break;
          case "wrath_of_the_forest":
              const roots = new THREE.Mesh(new THREE.TorusGeometry(customData.radius || 10.0, 0.6, 8, 24), new THREE.MeshStandardMaterial({ color: 0x114411, roughness: 0.9 }));
              roots.rotation.x = -Math.PI / 2;
              group.add(roots);
              break;
          case "world_tree_sapling":
              const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.6, 2.0), woodMat);
              trunk.position.y = 1.0;
              const leaves = new THREE.Mesh(new THREE.ConeGeometry(2.0, 3.0, 8), new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.7 }));
              leaves.position.y = 3.0;
              group.add(trunk, leaves);
              break;
          case "mana_pillar":
              const pillarGeo = new THREE.CylinderGeometry(0.8, 0.8, 4.0, 8);
              const pillarMat = new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending });
              const pillarMesh = new THREE.Mesh(pillarGeo, pillarMat);
              pillarMesh.position.y = 2.0; 
              
              if (customData && customData.optionText) {
                  const optionLabel = this.createNameLabel(customData.optionText);
                  optionLabel.position.set(0, 4.5, 0);
                  optionLabel.scale.set(3.0, 0.8, 1.0);
                  group.add(optionLabel);
              }
              
              group.add(pillarMesh);
              break;
      }

      this.scene.add(group);
      this.hazardVisuals.set(id, { mesh: group, type, customData });
  }

  public updateHazard(id: string, x: number, z: number) {
      const h = this.hazardVisuals.get(id);
      if (h) {
          h.mesh.userData.targetX = x;
          h.mesh.userData.targetZ = z;
      }
  }

  public removeHazard(id: string) {
      const h = this.hazardVisuals.get(id);
      if (h) {
          this.scene.remove(h.mesh);
          h.mesh.traverse((c) => {
              if (c instanceof THREE.Mesh) {
                  if (c.geometry) c.geometry.dispose();
                  if (c.material) {
                      if (Array.isArray(c.material)) c.material.forEach(m => m.dispose());
                      else c.material.dispose();
                  }
              }
          });
          this.hazardVisuals.delete(id);
      }
  }

  protected onUpdate(dt: number): void {
    this.frameCount++;
    const time = Date.now();
    const timeSec = time * 0.001;

    const camX = this.camera.position.x;
    const camZ = this.camera.position.z;
    
    const CULL_DIST_SQ = 200 * 200; 

    this.updateParticles(camX, camZ); 
    this.updateHoverPlot();
    this.updateSceneryAnimations(dt); 
    this.updateCasinoAnimations(dt);
    
    if (this.lakeMesh) {
        let lakeCenterH = 0.05;
        lakeCenterH += Math.sin(LAKE_X * 0.015) * Math.cos(LAKE_Z * 0.015) * 18;
        lakeCenterH += Math.sin(LAKE_X * 0.04 + 2) * Math.cos(LAKE_Z * 0.03) * 6;
        lakeCenterH += Math.sin(LAKE_X * 0.1) * Math.cos(LAKE_Z * 0.1) * 1.5;
        
        const shoreHeight = lakeCenterH - 2.0; 
        const waterSurfaceY = shoreHeight - 0.8;
        
        this.lakeMesh.position.y = waterSurfaceY + Math.sin(timeSec * 2) * 0.05;
    }

    if (this.frameCount % 5 === 0) {
        this.updateCulling(camX, camZ);
    }
    
    if (this.godNpc) {
        const distSq = (this.godNpc.mesh.position.x - camX) ** 2 + (this.godNpc.mesh.position.z - camZ) ** 2;
        if (distSq < CULL_DIST_SQ * 2) {
            this.godNpc.update(time);
        }
    }

    // --- ANIMATE REALM EVENTS ---
    this.realmEventVisuals.forEach((visual) => {
        const distSq = (visual.group.position.x - camX) ** 2 + (visual.group.position.z - camZ) ** 2;
        if (distSq > CULL_DIST_SQ) return;

        visual.ring.rotation.z += dt * 0.5;
        
        const mat = visual.dome.material as THREE.MeshBasicMaterial;
        
        if (visual.currentState === "active") {
            mat.opacity = 0.1 + Math.sin(timeSec * 6) * 0.05; 
        } else {
            mat.opacity = 0.05 + Math.sin(timeSec * 2) * 0.02; 
        }
        
        visual.label.quaternion.copy(this.camera.quaternion);
    });

    // --- ANIMATE HAZARDS ---
    this.hazardVisuals.forEach((h, id) => {
        const distSq = (h.mesh.position.x - camX) ** 2 + (h.mesh.position.z - camZ) ** 2;
        if (distSq > CULL_DIST_SQ) return;

        if (h.mesh.userData.targetX !== undefined && h.mesh.userData.targetZ !== undefined) {
            h.mesh.position.x = THREE.MathUtils.lerp(h.mesh.position.x, h.mesh.userData.targetX, 5 * dt);
            h.mesh.position.z = THREE.MathUtils.lerp(h.mesh.position.z, h.mesh.userData.targetZ, 5 * dt);
            h.mesh.position.y = getTerrainHeight(h.mesh.position.x, h.mesh.position.z) + 0.05;
        }

        if (h.type === "map_marker" || h.type === "recall_beacon" || h.type === "town_portal_node" || h.type === "healing_blossom") {
            h.mesh.rotation.y += dt;
        }
        if (h.type === "map_marker" || h.type === "doom_familiar") {
            const baseH = getTerrainHeight(h.mesh.position.x, h.mesh.position.z);
            h.mesh.position.y = baseH + Math.sin(timeSec * 3) * 0.3;
        }
        if (h.type === "whirlwind_aura") {
            h.mesh.rotation.y -= dt * 5;
        }
        if (h.type === "dark_singularity") {
            h.mesh.children[1].rotation.x += dt; 
            h.mesh.children[1].rotation.y += dt;
        }
    });

    this.enemies.forEach((enemyData, id) => {
        const visual = enemyData.visual;
        const distSq = (visual.mesh.position.x - camX) ** 2 + (visual.mesh.position.z - camZ) ** 2;
        if (distSq > CULL_DIST_SQ) return;

        const distMove = Math.pow(visual.targetPosition.x - visual.mesh.position.x, 2) + Math.pow(visual.targetPosition.z - visual.mesh.position.z, 2);
        const isMoving = distMove > 0.01;

        (visual as any).update(dt, isMoving, enemyData.action);

        if (enemyData.labelSprite) {
             enemyData.labelSprite.quaternion.copy(this.camera.quaternion);
        }
    });

  if ((this as any).playerVisuals) {
        (this as any).playerVisuals.forEach((visual: PlayerVisual, id: string) => {
            const px = visual.mesh.position.x;
            const pz = visual.mesh.position.z;
            
            const distSq = (px - camX) ** 2 + (pz - camZ) ** 2;
            if (distSq > CULL_DIST_SQ && id !== this.localPlayerId) return;

            let targetY = getTerrainHeight(px, pz);

            // Dynamically trigger the local swim animation when the player enters the lake
            const distToLake = Math.sqrt((px - LAKE_X) ** 2 + (pz - LAKE_Z) ** 2);
            if (this.lakeMesh && distToLake <= DOCK_INNER - 2) {
                const waterSurface = this.lakeMesh.userData.surfaceY;
                if (targetY < waterSurface) {
                    targetY = Math.max(targetY, waterSurface - 0.7); 
                    visual.isSwimming = true;
                } else {
                    visual.isSwimming = false;
                }
            } else if (visual.isSwimming && distToLake > DOCK_INNER) {
                 visual.isSwimming = false; // Turn off swimming if they step onto the shore
            }

            for (const bldg of this.buildingMeshes.values()) {
                if (bldg.type === "farm") continue; 

                const bx = bldg.mesh.position.x;
                const bz = bldg.mesh.position.z;
                
                let hw = 0; let hd = 0;
                if (bldg.type === "house") { hw = 6; hd = 6; } 
                else if (bldg.type === "shop") { hw = 5; hd = 4; }
                
                if (px > bx - hw && px < bx + hw && pz > bz - hd && pz < bz + hd) {
                    targetY = bldg.mesh.position.y + 0.05;
                    break;
                }
            }

            let leap = visual.mesh.userData.leapOffset || 0;
            targetY += leap;

            // Removing the conflict with BaseScene's lerp - just update target
            if ((visual as any).targetPosition) {
                 (visual as any).targetPosition.y = targetY;
            }

            if ((visual as any).auraMesh) {
                const auraMesh = (visual as any).auraMesh;
                const style = (visual as any).auraStyle;

                if (style === "tyrant") {
                    const s = 1.0 + Math.sin(timeSec * 5) * 0.05;
                    auraMesh.scale.set(s, s, s);
                    auraMesh.rotation.y += dt;
                    auraMesh.rotation.z = Math.sin(timeSec * 2) * 0.1;
                } else if (style === "sanctuary") {
                    auraMesh.position.y = 1.0 + Math.sin(timeSec * 2) * 0.2;
                    auraMesh.children[0].rotation.z += dt * 0.5;
                    auraMesh.children[1].rotation.z -= dt * 1.0;
                } else if (style === "void") {
                    auraMesh.rotation.y += dt * 0.5;
                    const s = 1.0 + Math.sin(timeSec * 4) * 0.05;
                    auraMesh.scale.set(s, s, s);
                } else if (style === "storm") {
                    auraMesh.children[0].rotation.z += dt * 5;
                    auraMesh.children[1].rotation.z -= dt * 8;
                    auraMesh.rotation.x = Math.sin(timeSec * 10) * 0.1;
                    auraMesh.rotation.z = Math.cos(timeSec * 8) * 0.1;
                }
            }

            if (id === this.localPlayerId) {
                const dayPhase = 1.0 - Math.max(0, Math.min(1, (px - 600) / 300));
                
                const targetAmbient = 0.2 + 0.65 * dayPhase;
                this.ambientLight.intensity = THREE.MathUtils.lerp(this.ambientLight.intensity, targetAmbient, 0.05);
                
                const targetDir = 0.1 + 1.5 * dayPhase;
                this.dirLight.intensity = THREE.MathUtils.lerp(this.dirLight.intensity, targetDir, 0.05);

                const targetBg = new THREE.Color().copy(this.nightBgColor).lerp(this.dayBgColor, dayPhase);
                if (this.scene.background instanceof THREE.Color) {
                    this.scene.background.lerp(targetBg, 0.05);
                }
                
                if (this.scene.fog instanceof THREE.FogExp2) {
                    this.scene.fog.color.lerp(targetBg, 0.05);
                }

                if (this.frameCount % 3 === 0) {
                    this.auroraMeshes.forEach((mesh, index) => {
                        const mat = mesh.material as THREE.MeshBasicMaterial;
                        mat.opacity = THREE.MathUtils.lerp(mat.opacity, 1.0 - dayPhase, 0.05);
                        mesh.position.y = 150 + Math.sin(timeSec + index) * 10;
                        
                        const positions = (mesh.geometry as THREE.BufferGeometry).attributes.position;
                        for (let i = 0; i < positions.count; i++) {
                            const x = positions.getX(i);
                            const origY = (i % 2 === 0) ? 50 : -50; 
                            const wave = Math.sin(x * 0.02 + timeSec * 2.0 + index) * 20;
                            positions.setY(i, origY + wave);
                        }
                        positions.needsUpdate = true;
                    });
                }
            }
        });
    }
  }

  public addEnemy(id: string, name: string) {
      // Creation handled gracefully in updateEnemy
  }

  public updateEnemy(id: string, x: number, z: number, label: string, action: string, attackRadius: number, targetX: number, targetY: number, terrainY: number, afflictions: string[] = []) {
      let enemyData = this.enemies.get(id);

      if (!enemyData) {
          const typeName = label.split(" (")[0]; 
          const visual = new EnemyModel(typeName);
          visual.mesh.position.set(x, terrainY, z);
          visual.targetPosition.set(x, terrainY, z);
          
          this.scene.add(visual.mesh);

          const labelSprite = this.createNameLabel(label);
          labelSprite.position.set(0, 3.5, 0); 
          labelSprite.scale.set(4.0, 1.0, 1.0);
          visual.mesh.add(labelSprite);

          enemyData = { visual, labelSprite, currentLabel: label, action };
          this.enemies.set(id, enemyData);
      }

      if (enemyData.currentLabel !== label) {
          const oldMat = enemyData.labelSprite.material;
          enemyData.visual.mesh.remove(enemyData.labelSprite);
          if (oldMat instanceof THREE.SpriteMaterial) {
              oldMat.dispose();
          }

          enemyData.labelSprite = this.createNameLabel(label);
          enemyData.labelSprite.position.set(0, 3.5, 0);
          enemyData.labelSprite.scale.set(4.0, 1.0, 1.0);
          enemyData.visual.mesh.add(enemyData.labelSprite);
          enemyData.currentLabel = label;
      }

      enemyData.action = action;
      enemyData.visual.targetPosition.set(x, terrainY, z);

      const isBleeding = afflictions.includes("Bleed");
      const isNecrosis = afflictions.includes("Necrosis");
      const isIlluminated = afflictions.includes("Illuminated");

      enemyData.visual.mesh.traverse((child: any) => {
          if (child instanceof THREE.Mesh && child.material) {
              if (child.material.emissive !== undefined) {
                  if (isBleeding && isNecrosis) {
                      child.material.emissive.setHex(0x550055); 
                  } else if (isBleeding) {
                      child.material.emissive.setHex(0x550000); 
                  } else if (isNecrosis) {
                      child.material.emissive.setHex(0x330066); 
                  } else if (isIlluminated) {
                      child.material.emissive.setHex(0x555500); 
                  } else {
                      child.material.emissive.setHex(0x000000); 
                  }
              }
          }
      });
  }

  public removeEnemy(id: string) {
      const enemyData = this.enemies.get(id);
      if (enemyData) {
          this.scene.remove(enemyData.visual.mesh);
          if (enemyData.labelSprite.material instanceof THREE.SpriteMaterial) {
              enemyData.labelSprite.material.dispose();
          }
          this.enemies.delete(id);
      }
  }

  public updateCameraFollow(myId: string) {
    super.updateCameraFollow(myId);

    const camX = this.camera.position.x;
    const camZ = this.camera.position.z;
    const terrainUnderCamera = getTerrainHeight(camX, camZ);

    if (this.camera.position.y < terrainUnderCamera + 1.0) {
        const targetY = terrainUnderCamera + 1.0;
        this.camera.position.y = THREE.MathUtils.lerp(this.camera.position.y, targetY, 10.0 * this.currentDt);
        
        const visual = this.playerVisuals.get(myId);
        if (visual) {
            this.camera.lookAt(visual.mesh.position.x, visual.mesh.position.y + 2.0, visual.mesh.position.z);
        }
    }

    const visual = this.playerVisuals.get(myId);
    if (!visual) return;

    const px = visual.mesh.position.x; 
    const pz = visual.mesh.position.z;

    if (this.tavernWalls) {
        const inTavern = px > -61.0 && px < -14.0 && pz > -18.5 && pz < 18.5;
        this.tavernWalls.visible = !inTavern;
    }

   for (const [id, bldg] of this.buildingMeshes.entries()) {
        if (bldg.type === "farm") continue;
        
        const bx = bldg.mesh.position.x;
        const bz = bldg.mesh.position.z;
        
        let hw = 0; let hd = 0;
        if (bldg.type === "house") { hw = 6; hd = 6; }
        else if (bldg.type === "shop") { hw = 5; hd = 4; }
        
        const isInside = px > bx - hw && px < bx + hw && pz > bz - hd && pz < bz + hd;
        
        const roof = bldg.mesh.children.find((c: THREE.Object3D) => c.name === "roofGroup");
        if (roof) {
            roof.visible = !isInside;
        }
    }

    for (const bldg of this.npcVillageBuildings) {
        const isInside = px > bldg.x - (bldg.width / 2) && px < bldg.x + (bldg.width / 2) && pz > bldg.z - (bldg.depth / 2) && pz < bldg.z + (bldg.depth / 2);
        bldg.roof.visible = !isInside;
    }

    if (this.mansionRoof) {
        const minX = -400 - (15 * 4) / 2;
        const maxX = -400 + (15 * 4) / 2;
        const minZ = -400 - (13 * 4) / 2;
        const maxZ = -400 + (13 * 4) / 2;
        const isInsideMansion = px > minX && px < maxX && pz > minZ && pz < maxZ;
        this.mansionRoof.visible = !isInsideMansion;
    }
  }

  private createFishingLake() {
      let lakeCenterH = 0.05;
      lakeCenterH += Math.sin(LAKE_X * 0.015) * Math.cos(LAKE_Z * 0.015) * 18;
      lakeCenterH += Math.sin(LAKE_X * 0.04 + 2) * Math.cos(LAKE_Z * 0.03) * 6;
      lakeCenterH += Math.sin(LAKE_X * 0.1) * Math.cos(LAKE_Z * 0.1) * 1.5;
      
      const shoreHeight = lakeCenterH - 2.0; 
      const waterSurfaceY = shoreHeight - 0.8;

      // 1. Dark Flat Basin (Covers the jagged grass polygon holes)
      const basinGeo = new THREE.CylinderGeometry(DOCK_INNER, DOCK_INNER, 0.5, 32);
      const basinMat = new THREE.MeshStandardMaterial({ color: 0x05101a, roughness: 1.0 });
      const basin = new THREE.Mesh(basinGeo, basinMat);
      basin.position.set(LAKE_X, shoreHeight - 6.0, LAKE_Z); 
      this.scene.add(basin);

      // 2. The Deep Water Volume
      const waterGeo = new THREE.CylinderGeometry(DOCK_INNER + 0.5, DOCK_INNER + 0.5, 4.0, 64);
      const waterMat = new THREE.MeshStandardMaterial({ 
          color: 0x1ca3ec, 
          transparent: true, 
          opacity: 0.85, 
          roughness: 0.1, 
          metalness: 0.5
      });
      this.lakeMesh = new THREE.Mesh(waterGeo, waterMat);
      this.lakeMesh.position.set(LAKE_X, waterSurfaceY - 2.0, LAKE_Z);
      this.lakeMesh.userData.surfaceY = waterSurfaceY;
      this.scene.add(this.lakeMesh);

      // 3. Massive 360-Degree Wooden Boardwalk Ring
      const dockGeo = new THREE.RingGeometry(DOCK_INNER, DOCK_OUTER, 64);
      dockGeo.rotateX(-Math.PI / 2);
      const dockMat = new THREE.MeshStandardMaterial({ 
          color: 0x4a3221, 
          roughness: 0.9, 
          side: THREE.DoubleSide 
      });
      const dock = new THREE.Mesh(dockGeo, dockMat);
      dock.position.set(LAKE_X, shoreHeight + 0.15, LAKE_Z); 
      dock.receiveShadow = true;
      this.scene.add(dock);

      // 4. Outer Dock Trim
      const outerTrimGeo = new THREE.TorusGeometry(DOCK_OUTER, 0.2, 8, 64);
      const trimMat = new THREE.MeshStandardMaterial({ color: 0x3b2415, roughness: 1.0 });
      const outerTrim = new THREE.Mesh(outerTrimGeo, trimMat);
      outerTrim.rotation.x = -Math.PI / 2;
      outerTrim.position.set(LAKE_X, shoreHeight + 0.15, LAKE_Z);
      outerTrim.castShadow = true;
      this.scene.add(outerTrim);

      // 5. Inner Dock Trim
      const innerTrimGeo = new THREE.TorusGeometry(DOCK_INNER, 0.2, 8, 64);
      const innerTrim = new THREE.Mesh(innerTrimGeo, trimMat);
      innerTrim.rotation.x = -Math.PI / 2;
      innerTrim.position.set(LAKE_X, shoreHeight + 0.15, LAKE_Z);
      innerTrim.castShadow = true;
      this.scene.add(innerTrim);

      // 6. Dock Support Pillars
      const postGeo = new THREE.CylinderGeometry(0.3, 0.3, 4.0, 8);
      for (let i = 0; i < 32; i++) {
          const angle = (i / 32) * Math.PI * 2;
          
          const innerPost = new THREE.Mesh(postGeo, trimMat);
          innerPost.position.set(
              LAKE_X + Math.cos(angle) * (DOCK_INNER + 0.5),
              shoreHeight - 1.5,
              LAKE_Z + Math.sin(angle) * (DOCK_INNER + 0.5)
          );
          innerPost.castShadow = true;
          this.scene.add(innerPost);

          const outerPost = new THREE.Mesh(postGeo, trimMat);
          outerPost.position.set(
              LAKE_X + Math.cos(angle) * (DOCK_OUTER - 0.5),
              shoreHeight - 1.5,
              LAKE_Z + Math.sin(angle) * (DOCK_OUTER - 0.5)
          );
          outerPost.castShadow = true;
          this.scene.add(outerPost);
      }
  }

  private createMegaMansion(cx: number, cz: number) {
      const CELL_SIZE = 4.0;
      const HEIGHT = 6.0;
      
      const MANSION_GRID = [
          [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
          [1,0,0,0,0,0,1,0,0,0,0,0,0,0,1],
          [1,0,1,1,1,0,1,0,1,1,1,1,1,0,1],
          [1,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
          [1,0,1,0,1,1,0,1,1,1,1,0,1,0,1],
          [1,0,0,0,1,0,0,0,0,0,1,0,0,0,1],
          [1,1,1,0,1,0,1,1,1,0,1,0,1,1,1],
          [1,0,0,0,1,0,1,0,1,0,1,0,0,0,1],
          [1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
          [1,0,1,0,0,0,0,0,0,0,0,0,1,0,1],
          [1,0,1,1,1,1,1,0,1,1,1,0,1,0,1],
          [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
          [1,1,1,1,1,1,1,0,1,1,1,1,1,1,1],
      ];

      const cols = MANSION_GRID[0].length;
      const rows = MANSION_GRID.length;
      const startX = cx - (cols * CELL_SIZE) / 2;
      const startZ = cz - (rows * CELL_SIZE) / 2;
      
      const terrainY = getTerrainHeight(cx, cz);

      const floorGeo = new THREE.PlaneGeometry(cols * CELL_SIZE, rows * CELL_SIZE);
      const floorMat = new THREE.MeshStandardMaterial({ color: 0x1f1a1a, roughness: 0.9 });
      const floor = new THREE.Mesh(floorGeo, floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(cx, terrainY + 0.1, cz);
      floor.receiveShadow = true;
      this.scene.add(floor);

      let wallCount = 0;
      for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
              if (MANSION_GRID[r][c] === 1) wallCount++;
          }
      }

      const wallGeo = new THREE.BoxGeometry(CELL_SIZE, HEIGHT, CELL_SIZE);
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x2c3e35, roughness: 1.0 }); 
      const wallInstances = new THREE.InstancedMesh(wallGeo, wallMat, wallCount);
      wallInstances.castShadow = true;
      wallInstances.receiveShadow = true;

      let index = 0;
      const dummy = new THREE.Object3D();
      
      for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
              if (MANSION_GRID[r][c] === 1) {
                  const wx = startX + (c * CELL_SIZE) + (CELL_SIZE / 2);
                  const wz = startZ + (r * CELL_SIZE) + (CELL_SIZE / 2);
                  
                  dummy.position.set(wx, terrainY + HEIGHT / 2, wz);
                  dummy.updateMatrix();
                  wallInstances.setMatrixAt(index++, dummy.matrix);
              }
          }
      }
      this.scene.add(wallInstances);

      const roofGeo = new THREE.PlaneGeometry(cols * CELL_SIZE + 4, rows * CELL_SIZE + 4);
      const roofMat = new THREE.MeshStandardMaterial({ color: 0x111111, side: THREE.DoubleSide });
      this.mansionRoof = new THREE.Mesh(roofGeo, roofMat);
      this.mansionRoof.rotation.x = -Math.PI / 2;
      this.mansionRoof.position.set(cx, terrainY + HEIGHT + 0.1, cz);
      this.scene.add(this.mansionRoof);
  }

  private createLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(this.ambientLight);

    this.dirLight = new THREE.DirectionalLight(0xfffabb, 1.6);
    this.dirLight.position.set(40, 100, 40); 
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048; 
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.left = -80;
    this.dirLight.shadow.camera.right = 80;
    this.dirLight.shadow.camera.top = 80;
    this.dirLight.shadow.camera.bottom = -80;
    this.dirLight.shadow.bias = -0.0005; 
    this.scene.add(this.dirLight);
  }

  private generateGroundTexture(): THREE.CanvasTexture {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      ctx.fillStyle = "#ffffff"; 
      ctx.fillRect(0, 0, 512, 512);

      for (let i = 0; i < 20000; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.15)";
        const w = Math.random() * 4;
        const h = Math.random() * 8 + 2;
        ctx.fillRect(Math.random() * 512, Math.random() * 512, w, h);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(120, 120); 
    return texture;
  }

  private generatePlazaTexture(): THREE.CanvasTexture {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      const tileSize = 64; 
      for (let x = 0; x < 512; x += tileSize) {
        for (let y = 0; y < 512; y += tileSize) {
          const variance = Math.floor(Math.random() * 15) - 7;
          ctx.fillStyle = `rgb(${138 + variance}, ${149 + variance}, ${151 + variance})`;
          ctx.fillRect(x, y, tileSize, tileSize);
          ctx.strokeStyle = "rgba(40, 45, 50, 0.8)";
          ctx.lineWidth = 4;
          ctx.strokeRect(x, y, tileSize, tileSize);
        }
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(35 / 3, 65 / 3); 
    return texture;
  }

  private createGrass() {
    const count = 10000; // Reduced density to heavily speed up initialization 
    const geometry = new THREE.ConeGeometry(0.12, 0.8, 3);
    geometry.translate(0, 0.4, 0); 
    const material = new THREE.MeshStandardMaterial({ color: 0x4a854a, roughness: 0.8 });

    this.grassMesh = new THREE.InstancedMesh(geometry, material, count);
    this.grassMesh.receiveShadow = false;

    const dummy = new THREE.Object3D();
    let added = 0;

    while (added < count) {
      const x = (Math.random() - 0.5) * 600; // Expanded generation area
      const z = (Math.random() - 0.5) * 600;

      const inPlaza = x > -25 && x < 25 && z > -48 && z < 38; 
      const inTavern = x > -65 && x < -10 && z > -22 && z < 22;
      const onWallX = (x > 56 && x < 64) || (x < -56 && x > -64);
      const onWallZ = (z > 56 && z < 64) || (z < -56 && z > -64);
      
      const distToLake = Math.sqrt((x - LAKE_X)**2 + (z - LAKE_Z)**2);
      const inLake = distToLake < DOCK_OUTER + 2;
      
      if (!inPlaza && !inTavern && !onWallX && !onWallZ && !inLake) {
        const yPos = getTerrainHeight(x, z);
        dummy.position.set(x, yPos, z);
        
        dummy.rotation.y = Math.random() * Math.PI * 2;
        dummy.rotation.x = (Math.random() - 0.5) * 0.3;
        dummy.rotation.z = (Math.random() - 0.5) * 0.3;
        
        const scale = 0.5 + Math.random() * 0.7;
        dummy.scale.set(scale, scale, scale);
        
        dummy.updateMatrix();
        this.grassMesh.setMatrixAt(added, dummy.matrix);
        added++;
      }
    }
    this.scene.add(this.grassMesh);
  }

  private buildTownOfBeginnings() {
    const environment = new TownEnvironment(
        this.scene,
        this.waterfallParticlesList,
        this.fairyParticlesList,
        this.auroraMeshes,
        this.npcVillageBuildings,
        this.fireLights,
        this.fireParticlesList,
        this.emberParticlesList,
        this.casinoAnims,
        this.createNameLabel.bind(this),
        (walls: THREE.Group) => { this.tavernWalls = walls; }
    );

    environment.createTowerPerimeter();

    const mapSize = 5000;
    const segments = 400; 
    const groundGeo = new THREE.PlaneGeometry(mapSize, mapSize, segments, segments);
    
    const colors: number[] = [];
    const colorObject = new THREE.Color();
    
    const posAttribute = groundGeo.attributes.position;
    for (let i = 0; i < posAttribute.count; i++) {
        const vx = posAttribute.getX(i);
        const vy = posAttribute.getY(i); 
        
        const worldX = vx;
        const worldZ = -vy;
        
        const height = getTerrainHeight(worldX, worldZ);
        posAttribute.setZ(i, height); 
        
        if (worldZ < -800) colorObject.setHex(0xffffff); // Winter
        else if (worldZ > 800) colorObject.setHex(0xeedd82); // Desert
        else if (worldX < -800) colorObject.setHex(0x2f4f2f); // Swamp
        else if (worldX > 800) colorObject.setHex(0x1a2a22); // Elven
        else colorObject.setHex(0x559c55); // Forest
        
        colorObject.offsetHSL(0, 0, (Math.random() - 0.5) * 0.05);
        colors.push(colorObject.r, colorObject.g, colorObject.b);
    }
    groundGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    groundGeo.computeVertexNormals();

    const groundTexture = this.generateGroundTexture();
    const groundMat = new THREE.MeshStandardMaterial({ vertexColors: true, map: groundTexture, roughness: 0.95, metalness: 0.02 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    this.groundMesh = ground; 
    this.scene.add(ground);

    const plazaGeo = new THREE.PlaneGeometry(45, 75); 
    const plazaTexture = this.generatePlazaTexture(); 
    const plazaMat = new THREE.MeshStandardMaterial({ map: plazaTexture, roughness: 0.9, metalness: 0.1 });
    const plaza = new THREE.Mesh(plazaGeo, plazaMat);
    plaza.rotation.x = -Math.PI / 2;
    
    plaza.position.set(0, 0.08, -5); 
    
    plaza.receiveShadow = true;
    this.scene.add(plaza);

    this.createGrass(); 
    environment.createTownWall(); 
    this.createFountain();
    this.createFishingLake(); // Init Fishing lake
    environment.createGrandTavern(-12, 0, 0); 
    
    environment.createElvenKingdom(1200, 0);

    environment.createNPCVillage(250, 250);
    environment.createNPCVillage(-300, 400);
    environment.createNPCVillage(500, -150);

    this.createMegaMansion(-400, -400);

    this.godNpc = new GiantGodNPC();
    this.scene.add(this.godNpc.mesh);

    const titleSprite = this.createNameLabel("Lord Protector of Town");
    titleSprite.position.set(0, 24, 0); 
    titleSprite.scale.set(6.0, 1.2, 1.0); 
    this.godNpc.mesh.add(titleSprite);

    environment.createMarketStall("food", 14, 2, -Math.PI / 2);
    environment.createMarketStall("clothing", 14, 14, -Math.PI / 2);
    environment.createMarketStall("potion", 14, -10, -Math.PI / 2);
    environment.createMarketStall("blacksmith", 14, -22, -Math.PI / 2);
    environment.createMarketStall("furniture", 14, -34, -Math.PI / 2);
  }

  public addLootItem(id: string, kind: string, x: number, z: number, isOpen: boolean) {
      if (this.lootVisuals.has(id)) return;

      const chestGroup = new THREE.Group();
      
      const woodMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
      const metalMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.5, metalness: 0.8 });

      const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 0.8), woodMat);
      base.position.y = 0.4;
      base.castShadow = true;
      base.receiveShadow = true;
      chestGroup.add(base);

      const lock = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.1), metalMat);
      lock.position.set(0, 0.5, 0.45);
      chestGroup.add(lock);

      const lidGeo = new THREE.BoxGeometry(1.2, 0.2, 0.8);
      const lid = new THREE.Mesh(lidGeo, woodMat);
      lid.castShadow = true;
      
      if (isOpen) {
          lid.position.set(0, 1.0, -0.3);
          lid.rotation.x = -Math.PI / 3; 
      } else {
          lid.position.set(0, 0.9, 0);
      }
      chestGroup.add(lid);

      const label = this.createNameLabel(isOpen ? "Empty" : "Loot Chest [Press E]");
      label.position.set(0, 2.0, 0);
      label.scale.set(3.0, 0.8, 1.0);
      chestGroup.add(label);

      chestGroup.position.set(x, getTerrainHeight(x, z), z);
      this.scene.add(chestGroup);
      this.lootVisuals.set(id, chestGroup);
  }

  public updateLootItem(id: string, isOpen: boolean) {
      const chestGroup = this.lootVisuals.get(id);
      if (chestGroup) {
          const pos = chestGroup.position;
          
          this.scene.remove(chestGroup);
          this.lootVisuals.delete(id);
          
          this.addLootItem(id, "chest", pos.x, pos.z, isOpen);
      }
  }

  public addScenery(id: string, kind: string, x: number, z: number, scale: number, rotation: number) {
    if (this.sceneryVisuals.has(id)) return;

    let mesh: THREE.Group | THREE.Mesh;

    if (kind.includes("rock")) {
      const rockGeo = new THREE.IcosahedronGeometry(1.0, 0);
      let color = 0x777777; 
      let emissive = 0x000000;
      let transparent = false;
      let opacity = 1.0;
      
      if (kind === "snow_rock") color = 0xddeeff; 
      else if (kind === "sand_rock") color = 0xccaa77; 
      else if (kind === "crystal_rock") {
          color = 0x88ffff;
          emissive = 0x0088aa;
          transparent = true;
          opacity = 0.85;
      }
      
      const rockMat = new THREE.MeshStandardMaterial({ color: color, emissive: emissive, transparent: transparent, opacity: opacity, roughness: 0.9 });
      mesh = new THREE.Mesh(rockGeo, rockMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      
    } else if (kind === "cactus") {
      mesh = new THREE.Group();
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x228b22 });
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 3, 8), trunkMat);
      trunk.position.y = 1.5;
      mesh.add(trunk);
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.5, 8), trunkMat);
      arm.position.set(0.6, 1.5, 0);
      arm.rotation.z = Math.PI / 4;
      mesh.add(arm);
      
    } else if (kind === "pine_tree") {
      mesh = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 2), new THREE.MeshStandardMaterial({ color: 0x3d2817 }));
      trunk.position.y = 1;
      mesh.add(trunk);
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x1a4314 });
      for (let i = 0; i < 3; i++) {
         const leaves = new THREE.Mesh(new THREE.ConeGeometry(2 - (i*0.4), 3, 5), leafMat);
         leaves.position.y = 2 + (i * 1.5);
         mesh.add(leaves);
      }
      
    } else if (kind === "dead_tree") {
      mesh = new THREE.Group();
      const mat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.6, 4, 5), mat);
      trunk.position.y = 2;
      mesh.add(trunk);
      const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.2, 2, 5), mat);
      branch.position.set(0.8, 3, 0);
      branch.rotation.z = -Math.PI / 4;
      mesh.add(branch);
      
    } else if (kind === "magic_tree") {
      mesh = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.6, 2.5, 5), new THREE.MeshStandardMaterial({ color: 0xdddddd }));
      trunk.position.y = 1.25;
      mesh.add(trunk);
      const leafMat = new THREE.MeshStandardMaterial({ color: 0xff99bb, emissive: 0x440022 });
      const leaf1 = new THREE.Mesh(new THREE.IcosahedronGeometry(2.5, 1), leafMat);
      leaf1.position.y = 3.0;
      mesh.add(leaf1);
      const leaf2 = new THREE.Mesh(new THREE.IcosahedronGeometry(1.8, 1), leafMat);
      leaf2.position.set(1.2, 4.0, -1.0);
      mesh.add(leaf2);
      
    } else { 
      mesh = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.6, 2, 5), new THREE.MeshStandardMaterial({ color: 0x5c4033 }));
      trunk.position.y = 1;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      mesh.add(trunk);
      const leafMat = new THREE.MeshStandardMaterial({ color: 0x2e6b38 });
      const leaf1 = new THREE.Mesh(new THREE.ConeGeometry(2.5, 3, 5), leafMat);
      leaf1.position.y = 2.5;
      leaf1.castShadow = true;
      mesh.add(leaf1);
      const leafGeo2 = new THREE.ConeGeometry(1.8, 2.5, 5);
      const leaf2 = new THREE.Mesh(leafGeo2, leafMat);
      leaf2.position.y = 4;
      leaf2.castShadow = true;
      mesh.add(leaf2);
    }

    mesh.scale.set(scale, scale, scale);
    mesh.rotation.y = rotation;
    if (kind.includes("rock")) {
       mesh.rotation.set(rotation, rotation, rotation);
       mesh.scale.y = scale * 0.7; 
    }
    
    const terrainHeight = getTerrainHeight(x, z);
    mesh.position.set(x, terrainHeight + (kind.includes("rock") ? 0.2 : 0), z);
    
    this.scene.add(mesh);
    
    this.sceneryVisuals.set(id, { 
        mesh, 
        baseRotX: mesh.rotation.x, 
        baseRotY: mesh.rotation.y, 
        baseRotZ: mesh.rotation.z, 
        hitShakeTimer: 0,
        lastHp: 99999 
    });
  }

  public updateSceneryProgress(id: string, hp: number, maxHp: number) {
      const visual = this.sceneryVisuals.get(id);
      if (!visual) return;

      // Only trigger the shake animation if health actually dropped!
      if (hp < visual.lastHp && hp !== maxHp) {
          visual.hitShakeTimer = 0.2; 
      }
      visual.lastHp = hp;

      if (hp < maxHp && hp > 0) {
          const text = `${hp}/${maxHp} Health`;
          
          if (visual.labelSprite) {
             visual.mesh.remove(visual.labelSprite);
             visual.labelSprite.material.dispose(); 
          }
          
          visual.labelSprite = this.createNameLabel(text);
          
          const invScaleX = 1 / visual.mesh.scale.x;
          const invScaleY = 1 / visual.mesh.scale.y;
          visual.labelSprite.scale.set(3.2 * invScaleX, 1 * invScaleY, 1);
          
          let height = visual.mesh.scale.y < 1.0 ? 3.0 : 4.5;
          visual.labelSprite.position.set(0, height * invScaleY, 0);
          
          visual.mesh.add(visual.labelSprite);
      }
  }

  public removeScenery(id: string) {
    const visual = this.sceneryVisuals.get(id);
    if (!visual) return;
    this.scene.remove(visual.mesh);
    
    if (visual.labelSprite) {
        visual.labelSprite.material.dispose();
    }
    
    this.sceneryVisuals.delete(id);
  }

  private createFountain() {
    const fountainGroup = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x9ba4a5 });
    
    const base = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 0.6, 8), stoneMat);
    base.position.y = 0.4; base.castShadow = true; base.receiveShadow = true;
    fountainGroup.add(base);

    const water = new THREE.Mesh(new THREE.CylinderGeometry(3.1, 3.1, 0.65, 8), new THREE.MeshStandardMaterial({ color: 0x22aaff, transparent: true, opacity: 0.85, roughness: 0.1, metalness: 0.3 }));
    water.position.y = 0.4;
    fountainGroup.add(water);

    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 3.5, 6), stoneMat);
    pillar.position.y = 1.8; pillar.castShadow = true;
    fountainGroup.add(pillar);

    const fountainLight = new THREE.PointLight(0x44bbff, 2.5, 12);
    fountainLight.position.set(0, 2, 0);
    fountainGroup.add(fountainLight);

    this.createFountainParticles(fountainGroup);

    fountainGroup.position.set(0, 0, 8);
    this.scene.add(fountainGroup);
  }

  private createFountainParticles(parent: THREE.Group) {
    const particleCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.4; 
      positions[i * 3 + 1] = 3.3 + Math.random() * 0.5; 
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4; 
      velocities[i * 3] = (Math.random() - 0.5) * 0.05; 
      velocities[i * 3 + 1] = 0.05 + Math.random() * 0.08; 
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05; 
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({ color: 0xccffff, size: 0.2, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false });
    const mesh = new THREE.Points(geometry, material);
    parent.add(mesh);
    this.fountainParticles = { mesh, positions, velocities };
  }

  public playCasinoVisual(game: string) {
      if (game === "Roulette") {
          this.casinoAnims.rouletteTimer = 2.0;
      }
      if (game === "Blackjack") {
          this.casinoAnims.bjTimer = 1.0;
      }
      if (game === "Coin Toss") {
          this.casinoAnims.coinTimer = 1.0;
      }
      if (game === "Slot Machine") {
          this.casinoAnims.slotTimer = 1.0;
      }
  }

  private updateCasinoAnimations(dt: number) {
      if (this.casinoAnims.rouletteTimer > 0) {
          this.casinoAnims.rouletteTimer -= dt;
          if (this.casinoAnims.rouletteWheel) {
              const speed = Math.max(0, this.casinoAnims.rouletteTimer) * 15;
              this.casinoAnims.rouletteWheel.rotation.y += speed * dt;
          }
      }
      
      if (this.casinoAnims.bjTimer > 0) {
          this.casinoAnims.bjTimer -= dt;
          this.casinoAnims.bjCards.forEach((c, i) => {
              c.position.y = 1.42 + Math.abs(Math.sin((Date.now() / 80) + i)) * 0.3;
              c.rotation.y += dt * 5;
          });
      } else {
          this.casinoAnims.bjCards.forEach(c => { 
              c.position.y = 1.42; 
          });
      }

      if (this.casinoAnims.coinTimer > 0) {
          this.casinoAnims.coinTimer -= dt;
          if (this.casinoAnims.coinMesh) {
              this.casinoAnims.coinMesh.rotation.x += dt * 20;
              const t = 1.0 - Math.max(0, this.casinoAnims.coinTimer);
              this.casinoAnims.coinMesh.position.y = 1.5 + Math.sin(t * Math.PI) * 2.5;
          }
      } else if (this.casinoAnims.coinMesh) {
          this.casinoAnims.coinMesh.position.y = 1.5;
      }

      if (this.casinoAnims.slotTimer > 0) {
          this.casinoAnims.slotTimer -= dt;
          if (this.casinoAnims.slotArm) {
              const t = 1.0 - Math.max(0, this.casinoAnims.slotTimer);
              this.casinoAnims.slotArm.rotation.x = Math.sin(t * Math.PI) * (Math.PI / 1.5);
          }
      } else if (this.casinoAnims.slotArm) {
          this.casinoAnims.slotArm.rotation.x = 0;
      }
  }

  private createHoverPlot() {
    const geo = new THREE.PlaneGeometry(20, 20, 10, 10);
    geo.rotateX(-Math.PI / 2); 
    
    const mat = new THREE.MeshBasicMaterial({ 
        color: 0x00ff00, 
        transparent: true, 
        opacity: 0.3, 
        depthWrite: false, 
        depthTest: false,
        side: THREE.DoubleSide 
    });
    
    this.hoverPlotMesh = new THREE.Mesh(geo, mat);
    this.hoverPlotMesh.visible = false;
    this.hoverPlotMesh.frustumCulled = false;
    this.hoverPlotMesh.renderOrder = 999;
    this.scene.add(this.hoverPlotMesh);
  }

  private createBlueprints() {
    this.blueprintMeshes.set("house", buildStructureModel("house", true));
    this.blueprintMeshes.set("farm", buildStructureModel("farm", true));
    this.blueprintMeshes.set("shop", buildStructureModel("shop", true));

    this.blueprintMeshes.forEach(group => {
      group.visible = false;
      this.scene.add(group);
    });
  }

  private createDecoGhosts() {
    this.decoGhostMeshes.set("Oak Bed", buildDecoModel("Oak Bed", true));
    this.decoGhostMeshes.set("Cozy Rug", buildDecoModel("Cozy Rug", true));
    this.decoGhostMeshes.set("Wooden Chair", buildDecoModel("Wooden Chair", true));
    this.decoGhostMeshes.set("Dining Table", buildDecoModel("Dining Table", true));
    this.decoGhostMeshes.set("Storage Chest", buildDecoModel("Storage Chest", true));
    this.decoGhostMeshes.set("Wardrobe", buildDecoModel("Wardrobe", true));
    this.decoGhostMeshes.set("Nightstand", buildDecoModel("Nightstand", true));

    this.decoGhostMeshes.forEach(group => {
      group.visible = false;
      this.scene.add(group);
    });
  }

  public addBuilding(id: string, type: string, x: number, z: number, isConstructed: boolean, progress: number, targetProgress: number) {
    if (this.buildingMeshes.has(id)) {
        const existing = this.buildingMeshes.get(id)!;
        this.scene.remove(existing.mesh);
        if (existing.label) {
            existing.label.material.dispose();
            this.scene.remove(existing.label);
        }
    }

    const group = buildStructureModel(type, !isConstructed, 0xffd700);
    group.position.set(x, getTerrainHeight(x, z), z);
    this.scene.add(group);

    let label: THREE.Sprite | undefined = undefined;
    if (!isConstructed) {
        label = this.createNameLabel(`Building: ${progress}/${targetProgress}`);
        label.position.set(x, getTerrainHeight(x, z) + 10, z);
        this.scene.add(label);
    }

    this.buildingMeshes.set(id, { type, mesh: group, label });
  }

  public updateBuilding(id: string, type: string, isConstructed: boolean, progress: number, targetProgress: number) {
      if (this.buildingMeshes.has(id)) {
          const b = this.buildingMeshes.get(id)!;
          const oldMesh = b.mesh;
          
          this.addBuilding(id, type, oldMesh.position.x, oldMesh.position.z, isConstructed, progress, targetProgress);
      }
  }

 public addDecoration(id: string, type: string, x: number, y: number, z: number, rotation: number) {
      if (this.decorationMeshes.has(id)) return;

      const group = buildDecoModel(type, false);
      
      group.position.set(x, y, z);
      
      group.rotation.y = rotation;
      this.scene.add(group);
      this.decorationMeshes.set(id, group);
  }

  public removeDecoration(id: string) {
      const mesh = this.decorationMeshes.get(id);
      if (mesh) {
          this.scene.remove(mesh);
          this.decorationMeshes.delete(id);
      }
  }

  public setReticlePosition(x: number, z: number, visible: boolean, activeEquippedItem: string = "") {
    this.blueprintMeshes.forEach(m => m.visible = false);
    this.decoGhostMeshes.forEach(m => m.visible = false);

    if (this.isBuildMode) {
      const snapX = Math.round(x / 2) * 2;
      const snapZ = Math.round(z / 2) * 2;
      
      const activeBlueprint = this.blueprintMeshes.get(this.currentBlueprintType);
      if (!activeBlueprint) return;

      activeBlueprint.position.set(snapX, getTerrainHeight(snapX, snapZ), snapZ);
      activeBlueprint.visible = visible;

      const plotX = Math.floor(snapX / 20);
      const plotY = Math.floor(snapZ / 20);
      const plotId = `${plotX}_${plotY}`;

      const isInsideTown = Math.abs(snapX) < 62 && Math.abs(snapZ) < 62;
      const plotOwnerName = this.ownedPlots.get(plotId);
      
      const valid = plotOwnerName === this.localPlayerName && !isInsideTown;
      const colorHex = valid ? 0x00ffaa : 0xff0000;

      activeBlueprint.traverse(child => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
          child.material.color.setHex(colorHex);
        }
        if (child instanceof THREE.LineSegments && child.material instanceof THREE.LineBasicMaterial) {
          child.material.color.setHex(colorHex);
        }
      });
    } 
    else if (this.isDecoMode && activeEquippedItem !== "") {
        const activeGhost = this.decoGhostMeshes.get(activeEquippedItem);
        if (!activeGhost) return; 

        const snapX = Math.round(x * 2) / 2;
        const snapZ = Math.round(z * 2) / 2;

       activeGhost.position.set(snapX, getTerrainHeight(snapX, snapZ) + 0.05, snapZ);
        activeGhost.rotation.y = this.decoRotation;
        activeGhost.visible = visible;

        const plotX = Math.floor(snapX / 20);
        const plotY = Math.floor(snapZ / 20);
        const plotId = `${plotX}_${plotY}`;
        const plotOwnerName = this.ownedPlots.get(plotId);
        
        const valid = plotOwnerName === this.localPlayerName;
        const colorHex = valid ? 0x00ffaa : 0xff0000;

        activeGhost.traverse(child => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshBasicMaterial) {
              child.material.color.setHex(colorHex);
            }
            if (child instanceof THREE.LineSegments && child.material instanceof THREE.LineBasicMaterial) {
              child.material.color.setHex(colorHex);
            }
        });
    }
  }

  public clearHighlights() {}

  public updateHoverPlot() {
    if (!this.localPlayerId || !this.hoverPlotMesh) return;
    
    if (!this.isBuyMode) {
      this.hoverPlotMesh.visible = false;
      this.lastHoverPlotId = "";
      return;
    }

    const visual = this.playerVisuals.get(this.localPlayerId);
    if (!visual) return;

    const px = visual.mesh.position.x;
    const pz = visual.mesh.position.z;

    const plotX = Math.floor(px / 20);
    const plotY = Math.floor(pz / 20);
    const plotId = `${plotX}_${plotY}`;

    if (plotId === this.lastHoverPlotId) {
        return;
    }
    
    this.lastHoverPlotId = plotId;

    const isInsideTown = Math.abs(px) < 62 && Math.abs(pz) < 62;
    const plotOwnerName = this.ownedPlots.get(plotId);
    const isOwned = !!plotOwnerName;

    const centerX = plotX * 20 + 10;
    const centerZ = plotY * 20 + 10;

    this.hoverPlotMesh.position.set(centerX, 0, centerZ);
    this.hoverPlotMesh.visible = true;

    const posAttr = this.hoverPlotMesh.geometry.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
        const localX = posAttr.getX(i);
        const localZ = posAttr.getZ(i);

        const worldX = centerX + localX;
        const worldZ = centerZ + localZ;

        posAttr.setY(i, getTerrainHeight(worldX, worldZ) + 0.15);
    }
    posAttr.needsUpdate = true;

    const mat = this.hoverPlotMesh.material as THREE.MeshBasicMaterial;
    
    if (isInsideTown || isOwned) {
        mat.color.setHex(0xff0000); 
        mat.opacity = 0.15;
    } else {
        mat.color.setHex(0x00ff00); 
        mat.opacity = 0.3;
    }
  }

  public addLandPlot(id: string, gridX: number, gridY: number, ownerId: string, ownerName: string) {
    if (this.plotFences.has(id)) return;
    this.ownedPlots.set(id, ownerName);

    const group = new THREE.Group();
    const plotCenterX = gridX * 20 + 10;
    const plotCenterZ = gridY * 20 + 10;

    const postGeo = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 8);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x4a3221, roughness: 0.9 });
    const ropeGeo = new THREE.CylinderGeometry(0.04, 0.04, 1, 8);
    const ropeMat = new THREE.MeshStandardMaterial({ color: 0xd2b48c, roughness: 1.0 });

    const addPost = (x: number, z: number) => {
        const post = new THREE.Mesh(postGeo, postMat);
        post.position.set(x, 0.75, z);
        post.castShadow = true; group.add(post);
    };

    const addRope = (x1: number, y: number, z1: number, x2: number, z2: number) => {
        const dx = x2 - x1; const dz = z2 - z1;
        const length = Math.sqrt(dx*dx + dz*dz);
        const rope = new THREE.Mesh(ropeGeo, ropeMat);
        rope.scale.set(1, length, 1);
        rope.position.set(x1 + dx/2, y, z1 + dz/2);
        rope.lookAt(x1 + dx, y, z1 + dz);
        rope.rotateX(Math.PI / 2);
        rope.castShadow = true; group.add(rope);
    };

    const addRopes = (x1: number, z1: number, x2: number, z2: number) => { 
        addRope(x1, 1.0, z1, x2, z2); 
        addRope(x1, 0.5, z1, x2, z2); 
    };

    const hs = 10; 
    addPost(-hs, -hs); addPost(hs, -hs); addPost(hs, hs); addPost(-hs, hs);
    addPost(-2, hs); addPost(2, hs);

    addRopes(-hs, -hs, hs, -hs); addRopes(hs, -hs, hs, hs); addRopes(-hs, -hs, -hs, hs); addRopes(-hs, hs, -2, hs); addRopes(2, hs, hs, hs); 

    const signPost = new THREE.Mesh(new THREE.BoxGeometry(0.1, 1.5, 0.1), postMat);
    signPost.position.set(-2.5, 0.75, hs); group.add(signPost);

    const signBoard = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.6, 0.05), postMat);
    signBoard.position.set(-2.5, 1.2, hs + 0.05); group.add(signBoard);

    const label = this.createNameLabel(ownerName + "'s Land");
    label.scale.set(1.5, 0.5, 1); label.position.set(-2.5, 1.2, hs + 0.1); group.add(label);

    group.position.set(plotCenterX, getTerrainHeight(plotCenterX, plotCenterZ), plotCenterZ);
    this.scene.add(group); this.plotFences.set(id, group);
  }

  public removeLandPlot(id: string) {
    if (!this.plotFences.has(id)) return;
    const group = this.plotFences.get(id);
    if (group) this.scene.remove(group);
    this.plotFences.delete(id); this.ownedPlots.delete(id);
  }

  private updateParticles(camX: number, camZ: number) {
    const CULL_DIST_SQ = 40000; 

    if (this.fountainParticles) {
      const distSq = (this.fountainParticles.mesh.position.x - camX)**2 + (this.fountainParticles.mesh.position.z - camZ)**2;
      if (distSq < CULL_DIST_SQ) {
          const { positions, velocities, mesh } = this.fountainParticles;
          for (let i = 0; i < positions.length / 3; i++) {
            velocities[i * 3 + 1] -= 0.005; 
            positions[i * 3] += velocities[i * 3]; positions[i * 3 + 1] += velocities[i * 3 + 1]; positions[i * 3 + 2] += velocities[i * 3 + 2];
            if (positions[i * 3 + 1] < 0.7) {
              positions[i * 3] = (Math.random() - 0.5) * 0.4; positions[i * 3 + 1] = 3.3; positions[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
              velocities[i * 3] = (Math.random() - 0.5) * 0.05; velocities[i * 3 + 1] = 0.05 + Math.random() * 0.08; velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.05;
            }
          }
          mesh.geometry.attributes.position.needsUpdate = true;
      }
    }
    
    for (const waterfall of this.waterfallParticlesList) {
        const distSq = (waterfall.mesh.position.x - camX)**2 + (waterfall.mesh.position.z - camZ)**2;
        if (distSq > CULL_DIST_SQ) continue;

        const { positions, velocities, mesh } = waterfall;
        for (let i = 0; i < positions.length / 3; i++) {
            positions[i*3+1] += velocities[i*3+1];
            positions[i*3+2] += velocities[i*3+2];
            
            if (positions[i*3+1] < -40) {
                positions[i*3] = (Math.random() - 0.5) * 14;
                positions[i*3+1] = 0;
                positions[i*3+2] = 50 + Math.random() * 2;
                velocities[i*3+1] = -0.2 - Math.random() * 0.3;
            }
        }
        mesh.geometry.attributes.position.needsUpdate = true;
    }

    for (const fairy of this.fairyParticlesList) {
        const distSq = (fairy.mesh.position.x - camX)**2 + (fairy.mesh.position.z - camZ)**2;
        if (distSq > CULL_DIST_SQ) continue;

        const { positions, velocities, mesh } = fairy;
        for (let i = 0; i < positions.length / 3; i++) {
            velocities[i*3+1] += 0.01; 
            const phase = velocities[i*3+1];
            
            positions[i*3] += Math.sin(phase) * 0.05 + velocities[i*3];
            positions[i*3+2] += Math.cos(phase) * 0.05 + velocities[i*3+2];
            positions[i*3+1] += Math.sin(phase * 0.5) * 0.02;
            
            if (positions[i*3+1] > 30 || positions[i*3+1] < 2) {
                positions[i*3+1] = 2 + Math.random() * 20;
            }
        }
        mesh.geometry.attributes.position.needsUpdate = true;
    }

    for (const fire of this.fireParticlesList) {
        const distSq = (fire.mesh.position.x - camX)**2 + (fire.mesh.position.z - camZ)**2;
        if (distSq > CULL_DIST_SQ) continue;

        const { positions, velocities, mesh, maxHeight } = fire; const targetHeight = maxHeight || 3.5;
        for (let i = 0; i < positions.length / 3; i++) {
            positions[i*3] += velocities[i*3]; positions[i*3+1] += velocities[i*3+1]; positions[i*3+2] += velocities[i*3+2];
            positions[i*3] -= positions[i*3] * 0.02; positions[i*3+2] -= (positions[i*3+2] - 0.5) * 0.01; 
            if (positions[i*3+1] > targetHeight) {
                const scale = targetHeight / 3.5; 
                positions[i*3] = (Math.random() - 0.5) * 3.5 * scale; positions[i*3+1] = 0.5 * scale; positions[i*3+2] = (0.5 + (Math.random() - 0.5) * 1.5) * scale;
            }
        }
        mesh.geometry.attributes.position.needsUpdate = true;
    }
    for (const ember of this.emberParticlesList) {
        const distSq = (ember.mesh.position.x - camX)**2 + (ember.mesh.position.z - camZ)**2;
        if (distSq > CULL_DIST_SQ) continue;

        const { positions, velocities, mesh, maxHeight } = ember; const targetHeight = maxHeight || 5.0;
        for (let i = 0; i < positions.length / 3; i++) {
            velocities[i*3] += (Math.random() - 0.5) * 0.005; velocities[i*3+2] += (Math.random() - 0.5) * 0.005;
            positions[i*3] += velocities[i*3]; positions[i*3+1] += velocities[i*3+1]; positions[i*3+2] += velocities[i*3+2];
            if (positions[i*3+1] > targetHeight || Math.abs(positions[i*3]) > (3.0 * (targetHeight/5.0))) {
                const scale = targetHeight / 5.0;
                positions[i*3] = (Math.random() - 0.5) * 3.0 * scale; positions[i*3+1] = 0.5 * scale; positions[i*3+2] = (0.5 + (Math.random() - 0.5) * 1.5) * scale;
                velocities[i*3] = (Math.random() - 0.5) * 0.03; velocities[i*3+2] = (Math.random() - 0.5) * 0.03;
            }
        }
        mesh.geometry.attributes.position.needsUpdate = true;
    }
  }

  private updateSceneryAnimations(dt: number) {
      for (const visual of this.sceneryVisuals.values()) {
          if (visual.hitShakeTimer > 0) {
              visual.hitShakeTimer -= dt;
              
              visual.mesh.rotation.z = visual.baseRotZ + Math.sin(visual.hitShakeTimer * 50) * 0.1;
              visual.mesh.rotation.x = visual.baseRotX + Math.cos(visual.hitShakeTimer * 50) * 0.1;
              
              if (visual.hitShakeTimer <= 0) {
                  visual.mesh.rotation.z = visual.baseRotZ;
                  visual.mesh.rotation.x = visual.baseRotX;
              }
          }
      }
  }

  public isOutsideTown(x: number, y: number) {
    return x < -62 || x > 62 || y < -62 || y > 62; 
  }

  private updateCulling(camX: number, camZ: number) {
    const renderDistanceSq = 180 * 180; 

    for (const visual of this.sceneryVisuals.values()) {
      const distanceSq = (visual.mesh.position.x - camX) ** 2 + (visual.mesh.position.z - camZ) ** 2;
      visual.mesh.visible = distanceSq < renderDistanceSq;
    }
  }

  public override dispose() {
    super.dispose();

    if (this.lakeMesh) {
        this.lakeMesh.geometry.dispose();
        if (this.lakeMesh.material instanceof THREE.Material) this.lakeMesh.material.dispose();
    }

    for (const visual of this.sceneryVisuals.values()) {
      if (visual.labelSprite) {
          visual.labelSprite.material.dispose();
      }
      if (visual.mesh instanceof THREE.Mesh) {
          if (visual.mesh.material instanceof THREE.Material) visual.mesh.material.dispose();
          if (visual.mesh.geometry) visual.mesh.geometry.dispose();
      } else if (visual.mesh instanceof THREE.Group) {
          visual.mesh.children.forEach(child => {
             if (child instanceof THREE.Mesh) {
                 if (child.material instanceof THREE.Material) child.material.dispose();
                 if (child.geometry) child.geometry.dispose();
             } 
          });
      }
    }
    
    this.blueprintMeshes.forEach(group => {
      group.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose(); (child.material as THREE.Material).dispose();
          if (child.children.length > 0 && child.children[0] instanceof THREE.LineSegments) {
            child.children[0].geometry.dispose(); (child.children[0].material as THREE.Material).dispose();
          }
        }
      });
    });
    
    this.decoGhostMeshes.forEach(group => {
      group.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose(); (child.material as THREE.Material).dispose();
          if (child.children.length > 0 && child.children[0] instanceof THREE.LineSegments) {
            child.children[0].geometry.dispose(); (child.children[0].material as THREE.Material).dispose();
          }
        }
      });
    });
    
    for (const group of this.decorationMeshes.values()) {
        group.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose(); (child.material as THREE.Material).dispose();
            }
        });
        this.scene.remove(group);
    }
    this.decorationMeshes.clear();
    
    for (const b of this.buildingMeshes.values()) {
        b.mesh.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose(); (child.material as THREE.Material).dispose();
                if (child.children.length > 0 && child.children[0] instanceof THREE.LineSegments) {
                    child.children[0].geometry.dispose(); (child.children[0].material as THREE.Material).dispose();
                }
            }
        });
        this.scene.remove(b.mesh);
        if (b.label) {
             b.label.material.dispose();
             this.scene.remove(b.label);
        }
    }
    this.buildingMeshes.clear();

    for (const chestGroup of this.lootVisuals.values()) {
        chestGroup.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();
                if (child.material instanceof THREE.Material) child.material.dispose();
            } else if (child instanceof THREE.Sprite) {
                if (child.material instanceof THREE.SpriteMaterial) {
                    child.material.dispose();
                }
            }
        });
        this.scene.remove(chestGroup);
    }
    this.lootVisuals.clear();
    
    if (this.godNpc) {
        this.godNpc.mesh.traverse(c => {
           if (c instanceof THREE.Mesh) {
               c.geometry.dispose();
               if (c.material instanceof THREE.Material) c.material.dispose();
           }
        });
    }

    if (this.mansionRoof) {
        this.mansionRoof.geometry.dispose();
        if (this.mansionRoof.material instanceof THREE.Material) this.mansionRoof.material.dispose();
    }

    // --- DISPOSE OF HAZARDS ---
    for (const h of this.hazardVisuals.values()) {
        this.scene.remove(h.mesh);
        h.mesh.traverse((c) => {
            if (c instanceof THREE.Mesh) {
                if (c.geometry) c.geometry.dispose();
                if (c.material) {
                    if (Array.isArray(c.material)) c.material.forEach(m => m.dispose());
                    else c.material.dispose();
                }
            }
        });
    }
    this.hazardVisuals.clear();

    // --- DISPOSE OF REALM EVENTS ---
    for (const visual of this.realmEventVisuals.values()) {
        this.scene.remove(visual.group);
        visual.group.traverse((c) => {
            if (c instanceof THREE.Mesh) {
                c.geometry?.dispose();
                if (c.material) {
                    if (Array.isArray(c.material)) c.material.forEach(m => m.dispose());
                    else c.material.dispose();
                }
            } else if (c instanceof THREE.Sprite && c.material instanceof THREE.SpriteMaterial) {
                c.material.dispose();
            }
        });
    }
    this.realmEventVisuals.clear();

    if (this.fountainParticles) { this.fountainParticles.mesh.geometry.dispose(); (this.fountainParticles.mesh.material as THREE.Material).dispose(); }
    for (const fire of this.fireParticlesList) { fire.mesh.geometry.dispose(); (fire.mesh.material as THREE.Material).dispose(); }
    for (const ember of this.emberParticlesList) { ember.mesh.geometry.dispose(); (ember.mesh.material as THREE.Material).dispose(); }
    for (const fairy of this.fairyParticlesList) { fairy.mesh.geometry.dispose(); (fairy.mesh.material as THREE.Material).dispose(); }
    for (const fall of this.waterfallParticlesList) { fall.mesh.geometry.dispose(); (fall.mesh.material as THREE.Material).dispose(); }

    this.fireParticlesList = []; this.emberParticlesList = []; this.fireLights = [];
    this.fairyParticlesList = []; this.waterfallParticlesList = [];

    if (this.grassMesh) { this.grassMesh.geometry.dispose(); if (this.grassMesh.material instanceof THREE.Material) this.grassMesh.material.dispose(); }
    
    this.sceneryVisuals.clear();
  }
}