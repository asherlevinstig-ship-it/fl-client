import * as THREE from "three";
import { spawnAbilityVFX } from "../vfx/AbilityVFX";
import { ITEM_DB, RANK_COLORS, ItemRank } from "../ItemDatabase";
import { EnemyModel } from "../EnemyModel"; 
import { FamiliarRenderer } from "./FamiliarRenderer";
import { EquipmentBuilder } from "./EquipmentBuilder";

// --- NEW: Generic Object Pool to prevent GC churn ---
export class ObjectPool<T> {
  private pool: T[] = [];
  constructor(private createFn: () => T, private resetFn: (item: T) => void) {}

  public get(): T {
    const item = this.pool.length > 0 ? this.pool.pop()! : this.createFn();
    this.resetFn(item);
    return item;
  }

  public release(item: T): void {
    this.pool.push(item);
  }
}

export type BoneData = {
  bone: THREE.Object3D;
  baseRot: THREE.Euler;
};

export type PlayerVisual = {
  mesh: THREE.Group;
  modelMesh?: THREE.Group; 
  labelSprite: THREE.Sprite;
  targetPosition: THREE.Vector3;
  isMoving?: boolean;
  limbs?: {
    leftArm?: BoneData;
    rightArm?: BoneData;
    leftLeg?: BoneData;
    rightLeg?: BoneData;
  };
  
  current_mainhand?: string;
  current_offhand?: string;
  current_head?: string;
  current_chest?: string;
  current_back?: string; 
  current_legs?: string;
  current_feet?: string;

  equipped_mainhand_Mesh?: THREE.Group;
  equipped_offhand_Mesh?: THREE.Group;
  equipped_head_Meshes?: THREE.Mesh[];
  equipped_chest_Meshes?: THREE.Mesh[];
  equipped_back_Meshes?: THREE.Mesh[]; 
  capeGroup?: THREE.Group;             
  equipped_legs_Meshes?: THREE.Mesh[];
  equipped_feet_Meshes?: THREE.Mesh[];

  attackTimer?: number;
  isSleeping?: boolean;
  sleepRot?: number;
  isSwimming?: boolean; 
  facingIndicator?: THREE.Group; 
  isSprinting?: boolean; 
  isMeditating?: boolean;
  mountedFamiliarId?: string; // --- MOUNT SYSTEM ---
};

export type EnemyEntry = {
  model: EnemyModel; 
  labelSprite: THREE.Sprite;
};

export type AttackSlash = {
  mesh: THREE.Mesh;
  life: number;
  maxLife: number; 
};

// Modified to hold canvas references for pooling
export type DamageNumber = {
  sprite: THREE.Sprite;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  life: number;
  maxLife: number;
  velocityY: number;
  active: boolean;
};

export type ActiveEffect = {
  mesh: THREE.Object3D;
  life: number;
  maxLife: number;
  update: (dt: number, mesh: THREE.Object3D, progress: number) => void;
};

export abstract class BaseScene {
  public scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;

  public playerMeshes = new Map<string, THREE.Group | THREE.Mesh>();
  protected playerVisuals = new Map<string, PlayerVisual>();
  
  protected enemyVisuals = new Map<string, EnemyEntry>();

  public familiarRenderer: FamiliarRenderer;
  protected equipmentBuilder = new EquipmentBuilder();

  public localPlayerId?: string;
  public localPlayerName?: string;

  protected activeSlashes: AttackSlash[] = [];
  protected activeEffects: ActiveEffect[] = [];

  protected container: HTMLElement;
  private animationId = 0;
  
  protected cameraAngle = 0; 
  protected cameraPitch = 0.8; 
  protected cameraZoom = 30; 

  private lastTime = Date.now();
  protected currentDt = 0.016; // Tracks global DT for decoupled lerp functions

  // --- PERFORMANCE Caches & Pools ---
  private labelTextureCache = new Map<string, THREE.CanvasTexture>();
  private chatTextureCache = new Map<string, THREE.CanvasTexture>();
  
  private slashPool: ObjectPool<THREE.Mesh>;
  private damageNumbers: DamageNumber[] = [];

  // Combat VFX Pools to stop GC stutter on enemy attacks
  private telegraphPool: ObjectPool<THREE.Group>;
  private aoeBlastPool: ObjectPool<THREE.Mesh>;
  private enemyMeleePool: ObjectPool<THREE.Mesh>;

  // --- FISHING SYSTEM (Shared Physics/Rendering) ---
  protected fishingLines = new Map<string, { 
      curveLine: THREE.Line, 
      bobber: THREE.Mesh,
      castProgress: number,
      state: "none" | "casting" | "waiting" | "reeling",
      targetX: number,
      targetZ: number
  }>();

  constructor(container: HTMLElement) {
    this.container = container;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x6ca6c1);
    this.scene.fog = new THREE.FogExp2(0x6ca6c1, 0.006); 

    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 28, 22);
    this.camera.lookAt(0, 0, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap; 

    this.container.appendChild(this.renderer.domElement);

    this.familiarRenderer = new FamiliarRenderer(this.scene);

    // Initialize Slash Pool (Player attacks)
    this.slashPool = new ObjectPool<THREE.Mesh>(
      () => {
        const slashGeo = new THREE.TorusGeometry(1.8, 0.15, 4, 20, Math.PI * 0.8);
        slashGeo.rotateZ(-Math.PI * 0.4); 
        slashGeo.rotateX(-Math.PI / 2); 
        slashGeo.rotateY(-Math.PI / 2); 
        const slashMat = new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(slashGeo, slashMat);
        mesh.visible = false;
        this.scene.add(mesh);
        return mesh;
      },
      (mesh) => {
        mesh.visible = true;
        mesh.scale.setScalar(1.0);
        if (mesh.material instanceof THREE.Material) mesh.material.opacity = 0.9;
      }
    );

    // Initialize Telegraph Pool (Enemy AoE warnings)
    this.telegraphPool = new ObjectPool<THREE.Group>(
      () => {
        const group = new THREE.Group();
        const geo = new THREE.RingGeometry(0.1, 1.0, 32);
        geo.rotateX(-Math.PI / 2);
        const mat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.1, depthWrite: false });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.name = "ring";
        
        const fillGeo = new THREE.CircleGeometry(1.0, 32);
        fillGeo.rotateX(-Math.PI / 2);
        const fillMat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.3, depthWrite: false });
        const fill = new THREE.Mesh(fillGeo, fillMat);
        fill.name = "fill";
        
        group.add(mesh, fill);
        group.visible = false;
        this.scene.add(group);
        return group;
      },
      (group) => {
        group.visible = true;
        const ring = group.getObjectByName("ring") as THREE.Mesh;
        const fill = group.getObjectByName("fill") as THREE.Mesh;
        if (ring && ring.material instanceof THREE.Material) ring.material.opacity = 0.1;
        if (fill && fill.material instanceof THREE.Material) fill.material.opacity = 0.3;
        if (fill) fill.scale.setScalar(0.01);
      }
    );

    // Initialize Enemy AoE Blast Pool
    this.aoeBlastPool = new ObjectPool<THREE.Mesh>(
      () => {
        const blastGeo = new THREE.SphereGeometry(1.0, 16, 16);
        const blastMat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
        const blast = new THREE.Mesh(blastGeo, blastMat);
        blast.visible = false;
        this.scene.add(blast);
        return blast;
      },
      (mesh) => {
        mesh.visible = true;
        mesh.scale.setScalar(0.5);
        if (mesh.material instanceof THREE.Material) mesh.material.opacity = 0.5;
      }
    );

    // Initialize Enemy Melee Slash Pool
    this.enemyMeleePool = new ObjectPool<THREE.Mesh>(
      () => {
        const slashGeo = new THREE.TorusGeometry(1.0, 0.2, 4, 20, Math.PI);
        slashGeo.rotateX(-Math.PI / 2);
        const slashMat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 1.0, side: THREE.DoubleSide });
        const slash = new THREE.Mesh(slashGeo, slashMat);
        slash.visible = false;
        this.scene.add(slash);
        return slash;
      },
      (mesh) => {
        mesh.visible = true;
        mesh.scale.setScalar(1.0);
        if (mesh.material instanceof THREE.Material) mesh.material.opacity = 1.0;
      }
    );

    window.addEventListener("resize", this.onResize);
  }

  protected abstract onUpdate(dt: number): void;

  public start() {
    this.lastTime = Date.now();
    this.animate();
  }

  private onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    
    const now = Date.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.05);
    this.lastTime = now;
    this.currentDt = dt; // Cache global delta time

    this.updateInterpolatedEntities(dt); 
    this.updateAttacks(dt);
    this.updateDamageNumbers(dt);
    this.updateActiveEffects(dt); 
    this.updateFishingLines(dt, now);
    
    this.familiarRenderer.animate(dt, now / 1000);
    
    this.onUpdate(dt);
    this.renderer.render(this.scene, this.camera);
  };

  public panCamera(dx: number, dy: number) {
    this.cameraAngle -= dx * 0.05;
    this.cameraPitch += dy * 0.02;
    this.cameraPitch = Math.max(-0.2, Math.min(1.5, this.cameraPitch));
  }

  public resetCamera() {
    this.cameraAngle = 0;
    this.cameraPitch = 0.8;
    this.cameraZoom = 30;
  }

  public getCameraAngle() { 
      return this.cameraAngle; 
  }

  public updateCameraFollow(myId: string, dt?: number) {
    const visual = this.playerVisuals.get(myId);
    if (!visual) return;

    // Use explicit DT if passed, otherwise fallback to the render loop's actual global DT
    // This stops the camera from snapping when moving out-of-sync with the monitor framerate
    const actualDt = dt !== undefined ? dt : this.currentDt;

    const px = visual.mesh.position.x; 
    const py = visual.mesh.position.y; 
    const pz = visual.mesh.position.z;

    const lookAtY = py + 2.0;

    const targetX = px + Math.sin(this.cameraAngle) * Math.cos(this.cameraPitch) * this.cameraZoom;
    const targetZ = pz + Math.cos(this.cameraAngle) * Math.cos(this.cameraPitch) * this.cameraZoom;
    const targetY = lookAtY + Math.sin(this.cameraPitch) * this.cameraZoom;

    const camLerp = 1.0 - Math.exp(-8.0 * actualDt);

    this.camera.position.x += (targetX - this.camera.position.x) * camLerp;
    this.camera.position.y += (targetY - this.camera.position.y) * camLerp;
    this.camera.position.z += (targetZ - this.camera.position.z) * camLerp;
    
    this.camera.lookAt(px, lookAtY, pz);
  }

  public addEnemy(id: string, label: string) {
      if (this.enemyVisuals.has(id)) return;

      const type = label.split(" (")[0]; 
      const model = new EnemyModel(type); 
      
      model.mesh.castShadow = true;

      const sprite = this.createNameLabel(label);
      sprite.position.set(0, 2.5, 0);
      model.mesh.add(sprite);

      this.scene.add(model.mesh);

      this.enemyVisuals.set(id, {
          model: model,
          labelSprite: sprite
      });
  }

  public updateEnemy(id: string, x: number, z: number, label: string, action: string, attackRadius: number, targetX: number, targetZ: number, height: number = 0) {
      const entry = this.enemyVisuals.get(id);
      if (!entry) return;

      const safeX = isNaN(x) ? 0 : x;
      const safeZ = isNaN(z) ? 0 : z;
      const safeH = isNaN(height) ? 0 : height;

      entry.model.targetPosition.set(safeX, safeH, safeZ);

      if (entry.labelSprite.material instanceof THREE.SpriteMaterial) {
          const currentMap = entry.labelSprite.material.map;
          const currentText = currentMap?.name; 
          if (currentText !== label) {
              const newLabel = this.createNameLabel(label);
              entry.model.mesh.remove(entry.labelSprite);
              entry.labelSprite.material.dispose(); 
              entry.labelSprite = newLabel;
              entry.labelSprite.position.set(0, 2.5, 0);
              entry.model.mesh.add(entry.labelSprite);
          }
      }
  }

  public removeEnemy(id: string) {
      const entry = this.enemyVisuals.get(id);
      if (!entry) return;
      this.scene.remove(entry.model.mesh);
      
      entry.model.mesh.children.forEach((c: any) => {
          if (c instanceof THREE.Mesh && c.material instanceof THREE.Material) c.material.dispose();
      });
      
      if (entry.labelSprite.material instanceof THREE.SpriteMaterial) {
          entry.labelSprite.material.dispose();
      }

      this.enemyVisuals.delete(id);
  }

  public addPlayer(id: string, isMe: boolean, name = isMe ? "You" : "Player") {
    if (this.playerVisuals.has(id)) return;
    if (isMe) {
        this.localPlayerId = id;
        this.localPlayerName = name;
    }

    const playerGroup = new THREE.Group();
    playerGroup.position.set(0, 0, 0);

    const labelSprite = this.createNameLabel(name);
    labelSprite.position.set(0, 3.2, 0); 
    playerGroup.add(labelSprite);

    this.scene.add(playerGroup);

    const visual: PlayerVisual = {
      mesh: playerGroup,
      labelSprite,
      targetPosition: new THREE.Vector3(0, 0, 0),
      isMoving: false,
      attackTimer: 0,
      isSleeping: false,
      sleepRot: 0,
      isSwimming: false,
      isSprinting: false,
      isMeditating: false,
      mountedFamiliarId: "", // Default to not mounted
      limbs: {} 
    };

    if (isMe) {
        const indicatorGroup = new THREE.Group();
        indicatorGroup.position.set(0, 0.05, 0); 

        const ringGeo = new THREE.RingGeometry(1.8, 2.0, 32);
        ringGeo.rotateX(-Math.PI / 2);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.15, depthWrite: false });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        indicatorGroup.add(ring);

        const arrowGeo = new THREE.ConeGeometry(0.6, 1.2, 3);
        arrowGeo.rotateX(-Math.PI / 2);
        const arrowMat = new THREE.MeshBasicMaterial({ 
            color: 0x00ffaa, 
            transparent: true, 
            opacity: 0.6, 
            depthWrite: false, 
            blending: THREE.AdditiveBlending 
        });
        const arrow = new THREE.Mesh(arrowGeo, arrowMat);
        
        arrow.position.set(0, 0, 2.2); 
        indicatorGroup.add(arrow);

        playerGroup.add(indicatorGroup);
        visual.facingIndicator = indicatorGroup;
    }

    const model = new THREE.Group();
    model.userData.baseY = 0; 
    
    const skinMat = new THREE.MeshStandardMaterial({ color: isMe ? 0xfcccb4 : 0xccb4fc, roughness: 0.7 });
    const shirtMat = new THREE.MeshStandardMaterial({ color: 0x222222, roughness: 0.7 });
    const pantsMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.7 });

    const torsoGeo = new THREE.BoxGeometry(0.8, 0.8, 0.4);
    const torso = new THREE.Mesh(torsoGeo, shirtMat);
    torso.name = "torso"; 
    torso.position.y = 1.2; 
    torso.castShadow = isMe; 
    torso.receiveShadow = isMe;
    model.add(torso);

    const headGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const head = new THREE.Mesh(headGeo, skinMat);
    head.name = "head"; 
    head.position.y = 0.65; 
    head.castShadow = isMe;
    torso.add(head);

    const hairColor = isMe ? 0x111111 : 0x8b4513; 
    const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.8 });
    
    const hairMain = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.2, 0.54), hairMat);
    hairMain.position.set(0, 0.25, 0); 
    hairMain.castShadow = isMe;
    head.add(hairMain);
    
    const hairBangs = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.15, 0.15), hairMat);
    hairBangs.position.set(0, 0.15, 0.22); 
    hairBangs.castShadow = isMe;
    head.add(hairBangs);

    const faceFeatureMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 });
    
    const eyeGeo = new THREE.BoxGeometry(0.08, 0.14, 0.05);
    
    const leftEye = new THREE.Mesh(eyeGeo, faceFeatureMat);
    leftEye.position.set(-0.12, 0.02, 0.26); 
    head.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeo, faceFeatureMat);
    rightEye.position.set(0.12, 0.02, 0.26);
    head.add(rightEye);

    const mouthMat = new THREE.MeshStandardMaterial({ color: 0x331111 }); 
    const mouthGeo = new THREE.BoxGeometry(0.12, 0.04, 0.05);
    const mouth = new THREE.Mesh(mouthGeo, mouthMat);
    mouth.position.set(0, -0.08, 0.26);
    head.add(mouth);

    const armGeo = new THREE.BoxGeometry(0.35, 0.8, 0.4);
    
    const leftArmPivot = new THREE.Group();
    leftArmPivot.position.set(-0.6, 0.4, 0); 
    const leftArm = new THREE.Mesh(armGeo, skinMat);
    leftArm.position.set(0, -0.3, 0); 
    leftArm.castShadow = isMe;
    leftArmPivot.add(leftArm);
    torso.add(leftArmPivot);

    const rightArmPivot = new THREE.Group();
    rightArmPivot.position.set(0.6, 0.4, 0); 
    const rightArm = new THREE.Mesh(armGeo, skinMat);
    rightArm.position.set(0, -0.3, 0); 
    rightArm.castShadow = isMe;
    rightArmPivot.add(rightArm);
    torso.add(rightArmPivot);

    const legGeo = new THREE.BoxGeometry(0.38, 0.8, 0.4);

    const leftLegPivot = new THREE.Group();
    leftLegPivot.position.set(-0.2, 0.8, 0); 
    const leftLeg = new THREE.Mesh(legGeo, pantsMat);
    leftLeg.position.set(0, -0.4, 0); 
    leftLeg.castShadow = isMe;
    leftLegPivot.add(leftLeg);
    model.add(leftLegPivot);

    const rightLegPivot = new THREE.Group();
    rightLegPivot.position.set(0.2, 0.8, 0); 
    const rightLeg = new THREE.Mesh(legGeo, pantsMat);
    rightLeg.position.set(0, -0.4, 0); 
    rightLeg.castShadow = isMe;
    rightLegPivot.add(rightLeg);
    model.add(rightLegPivot);

    playerGroup.add(model);
    visual.modelMesh = model;

    visual.limbs = {
      leftArm: { bone: leftArmPivot, baseRot: new THREE.Euler(0, 0, 0) },
      rightArm: { bone: rightArmPivot, baseRot: new THREE.Euler(0, 0, 0) },
      leftLeg: { bone: leftLegPivot, baseRot: new THREE.Euler(0, 0, 0) },
      rightLeg: { bone: rightLegPivot, baseRot: new THREE.Euler(0, 0, 0) }
    };
    
    this.playerVisuals.set(id, visual);
    this.playerMeshes.set(id, playerGroup as any);
  }

  public updatePlayer(
      id: string, x: number, z: number, name?: string, 
      equippedItem?: string, equipBack?: string, 
      isSleeping: boolean = false, sleepRot: number = 0, 
      isSwimming: boolean = false, height: number = 0, 
      equipHead?: string, equipChest?: string, equipLegs?: string, equipFeet?: string, equipOffHand?: string,
      isWolfVisual: boolean = false,
      isSprinting: boolean = false,
      isMeditating: boolean = false,
      teamId: number = 0,
      mountedFamiliarId: string = "" // Added Mount Tracking
  ) {
    const visual = this.playerVisuals.get(id);
    if (!visual) return;

    visual.targetPosition.set(x, height, z); 
    visual.isSleeping = isSleeping;
    visual.sleepRot = sleepRot;
    visual.isSwimming = isSwimming;
    visual.isSprinting = isSprinting;
    visual.isMeditating = isMeditating;
    visual.mountedFamiliarId = mountedFamiliarId;

    if (name && visual.labelSprite.material instanceof THREE.SpriteMaterial) {
      const subText = teamId > 0 ? `Team ${teamId}` : undefined;
      const expectedLabelText = name + (subText ? `\n${subText}` : "");

      const currentMap = visual.labelSprite.material.map;
      const currentText = currentMap?.name;
      
      if (currentText !== expectedLabelText) {
        const newLabel = this.createNameLabel(name, subText);
        visual.mesh.remove(visual.labelSprite);
        visual.labelSprite.material.dispose();
        visual.labelSprite = newLabel;
        visual.labelSprite.position.set(0, 3.5, 0);
        visual.mesh.add(visual.labelSprite);
      }
    }

    // --- DELEGATED BACK EQUIPMENT ---
    this.equipmentBuilder.updateBackEquipment(visual, equipBack);

    const slots = [
        { slot: "mainhand", item: equippedItem },
        { slot: "offhand", item: equipOffHand },
        { slot: "head", item: equipHead },
        { slot: "chest", item: equipChest },
        { slot: "legs", item: equipLegs },
        { slot: "feet", item: equipFeet }
    ] as const;

    slots.forEach(({slot, item}) => {
        const equipKey = `current_${slot}` as keyof PlayerVisual;
        if (item !== undefined && (visual as any)[equipKey] !== item) {
            (visual as any)[equipKey] = item;
            this.updatePlayerEquipment(id, item, slot);
        }
    });
  }

  protected updatePlayerEquipment(id: string, itemName: string, slot: "mainhand" | "offhand" | "head" | "chest" | "legs" | "feet" = "mainhand") {
    const visual = this.playerVisuals.get(id);
    if (!visual || !visual.limbs) return;

    if (["head", "chest", "legs", "feet"].includes(slot)) {
        this.equipmentBuilder.applyWearableEquipment(visual, itemName, slot, id === this.localPlayerId);
        return;
    }

    const meshKey = `equipped_${slot}_Mesh` as keyof PlayerVisual;
    if (visual[meshKey] && visual[meshKey] instanceof THREE.Group) {
        const oldMesh = visual[meshKey] as THREE.Group;
        oldMesh.parent?.remove(oldMesh);
        (visual as any)[meshKey] = undefined;
    }

    if (!itemName || itemName === "") return;

    // --- DELEGATED ITEM MODEL CREATION ---
    const itemModel = this.equipmentBuilder.buildItemModel(itemName);
    itemModel.scale.set(2.8, 2.8, 2.8);
    
    if (slot === "offhand" || itemName.includes("Shield")) {
        if (visual.limbs.leftArm) {
            visual.limbs.leftArm.bone.add(itemModel);
            itemModel.position.set(-0.2, -0.4, 0.1); 
            itemModel.rotation.set(0, -Math.PI / 4, 0); 
        }
    } else {
        if (visual.limbs.rightArm) {
            visual.limbs.rightArm.bone.add(itemModel);
            
            // Correctly offset the long fishing rod so it extends from the hand
            if (itemName === "Fishing Rod") {
                itemModel.position.set(0, -1.0, 0.5); 
                itemModel.rotation.set(Math.PI / 2, 0, 0);
            } else {
                itemModel.position.set(0, -0.7, 0.1); 
                itemModel.rotation.set(Math.PI / 2.5, 0, 0); 
            }
        }
    }
    
    (visual as any)[meshKey] = itemModel;
  }

  // --- NEW: ABILITY ROUTER ---
  public playAbilityVisual(playerId: string, abilityId: string, targetX?: number, targetZ?: number) {
      const FAMILIAR_VFX = [
          "swarm_devour_cast", "swarm_return", "gordon_laser", "gordon_annihilation", 
          "stash_true_form", "stash_revert", "pixie_lifeline", "pixie_cleanse", 
          "familiar_respawn", "seraph_aegis", "shade_legion", "monarch_arise", 
          "beast_kill_command", "gryphon_liftoff", "behemoth_battering_ram", "gemini_swap"
      ];

      // 1. Check if this is a familiar ability and route it to the FamiliarRenderer
      if (FAMILIAR_VFX.includes(abilityId)) {
          if (this.familiarRenderer) {
              this.familiarRenderer.playAbilityVisual(playerId, abilityId, targetX, targetZ);
          }
          return;
      }

      // 2. Route player abilities to the main VFX spawner
      const visual = this.playerVisuals.get(playerId);
      const th = visual ? visual.targetPosition.y : 0; 
      
      spawnAbilityVFX(this.scene, abilityId, targetX || 0, targetZ || 0, th, visual);
  }

  // --- FISHING ANIMATION LOGIC (ZERO GC OVERHAUL) ---
  public updatePlayerFishing(id: string, state: string, bobberX: number, bobberZ: number) {
      const visual = this.playerVisuals.get(id);
      if (!visual || !visual.modelMesh || !visual.limbs) return;

      let lineData = this.fishingLines.get(id);
      
      // Stop Fishing
      if (state === "none") {
          if (lineData) {
              this.scene.remove(lineData.curveLine);
              this.scene.remove(lineData.bobber);
              lineData.curveLine.geometry.dispose();
              (lineData.curveLine.material as THREE.Material).dispose();
              lineData.bobber.geometry.dispose();
              (lineData.bobber.material as THREE.Material).dispose();
              this.fishingLines.delete(id);
          }
          return;
      }

      // Equip a fishing rod if they don't have one visually
      if (visual.current_mainhand !== "Fishing Rod") {
          this.updatePlayerEquipment(id, "Fishing Rod", "mainhand");
          visual.current_mainhand = "Fishing Rod"; // Force the local override
      }

      // Start or update fishing state
      if (!lineData) {
          // Pre-allocate buffer geometry to completely stop GC memory leaks
          const numSegments = 10;
          const posArray = new Float32Array((numSegments + 1) * 3);
          const geo = new THREE.BufferGeometry();
          geo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
          
          const mat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 });
          const curveLine = new THREE.Line(geo, mat);

          const bobberGeo = new THREE.SphereGeometry(0.15, 8, 8);
          const bobberMat = new THREE.MeshBasicMaterial({ color: 0xff3333 });
          const bobber = new THREE.Mesh(bobberGeo, bobberMat);
          
          this.scene.add(curveLine, bobber);
          
          lineData = { curveLine, bobber, castProgress: 0, state: state as any, targetX: bobberX, targetZ: bobberZ };
          this.fishingLines.set(id, lineData);
      }

      lineData.state = state as any;
      lineData.targetX = bobberX;
      lineData.targetZ = bobberZ;
      
      // Reset cast progress when state transitions
      if (state === "casting" && lineData.castProgress > 0) lineData.castProgress = 0;
      if (state === "reeling" && lineData.castProgress < 1.0) lineData.castProgress = 1.0; 
  }

  private updateFishingLines(dt: number, now: number) {
      for (const [id, lineData] of this.fishingLines.entries()) {
          const visual = this.playerVisuals.get(id);
          if (!visual || !visual.modelMesh || !visual.limbs || !visual.equipped_mainhand_Mesh) {
              this.updatePlayerFishing(id, "none", 0, 0);
              continue;
          }

          // 1. Find the tip of the fishing rod
          const rodMesh = visual.equipped_mainhand_Mesh;
          const tipPos = new THREE.Vector3(0, 1.5, 0); // Assuming the rod is ~1.5 units long on Y
          rodMesh.localToWorld(tipPos);

          const pY = visual.mesh.position.y;
          const waterLevel = pY - 1.0; // Estimate water surface relative to player
          
          // 2. Animate the bobber position based on state
          if (lineData.state === "casting") {
              lineData.castProgress += dt * 1.5; // 0.66 seconds to cast
              if (lineData.castProgress > 1.0) lineData.castProgress = 1.0;
              
              // Parabolic arc for the cast
              const startX = tipPos.x;
              const startZ = tipPos.z;
              const curX = THREE.MathUtils.lerp(startX, lineData.targetX, lineData.castProgress);
              const curZ = THREE.MathUtils.lerp(startZ, lineData.targetZ, lineData.castProgress);
              
              const arcHeight = Math.sin(lineData.castProgress * Math.PI) * 4.0;
              const curY = THREE.MathUtils.lerp(tipPos.y, waterLevel, lineData.castProgress) + arcHeight;

              lineData.bobber.position.set(curX, curY, curZ);

          } else if (lineData.state === "waiting") {
              // Bob gently on the water
              lineData.bobber.position.set(
                  lineData.targetX, 
                  waterLevel + Math.sin(now * 0.003) * 0.05, 
                  lineData.targetZ
              );
          } else if (lineData.state === "reeling") {
              lineData.castProgress -= dt * 2.0; // 0.5s to reel in
              if (lineData.castProgress < 0) lineData.castProgress = 0;
              
              const curX = THREE.MathUtils.lerp(tipPos.x, lineData.targetX, lineData.castProgress);
              const curZ = THREE.MathUtils.lerp(tipPos.z, lineData.targetZ, lineData.castProgress);
              const curY = THREE.MathUtils.lerp(tipPos.y, waterLevel, lineData.castProgress);
              
              lineData.bobber.position.set(curX, curY, curZ);
          }

          // 3. Draw Quadratic Bezier Curve (Zero GC Allocation approach)
          const posAttribute = lineData.curveLine.geometry.attributes.position as THREE.BufferAttribute;
          const array = posAttribute.array as Float32Array;

          const p0x = tipPos.x; const p0y = tipPos.y; const p0z = tipPos.z;
          const p2x = lineData.bobber.position.x; const p2y = lineData.bobber.position.y; const p2z = lineData.bobber.position.z;

          // Midpoint with physics sag
          const p1x = (p0x + p2x) / 2;
          const p1z = (p0z + p2z) / 2;
          let p1y = (p0y + p2y) / 2;

          if (lineData.state === "waiting") {
              p1y -= 1.5; // Deep sag when idle
          } else if (lineData.state === "casting") {
              p1y -= 0.5 * (1.0 - lineData.castProgress); // Trailing sag in air
          }

          const segments = 10;
          for (let i = 0; i <= segments; i++) {
              const t = i / segments;
              const u = 1 - t;
              const tt = t * t;
              const uu = u * u;
              const ut2 = 2 * u * t;

              array[i * 3] = uu * p0x + ut2 * p1x + tt * p2x;
              array[i * 3 + 1] = uu * p0y + ut2 * p1y + tt * p2y;
              array[i * 3 + 2] = uu * p0z + ut2 * p1z + tt * p2z;
          }
          posAttribute.needsUpdate = true;
          
          // 4. Animate the Player's Arm
          if (visual.limbs.rightArm) {
              if (lineData.state === "casting") {
                  // Swing arm forward
                  const armAng = THREE.MathUtils.lerp(Math.PI * 0.6, -Math.PI * 0.2, lineData.castProgress);
                  visual.limbs.rightArm.bone.rotation.x = armAng;
              } else if (lineData.state === "waiting") {
                  // Hold rod steady
                  visual.limbs.rightArm.bone.rotation.x = -Math.PI * 0.2;
              } else if (lineData.state === "reeling") {
                  // Crank motion
                  visual.limbs.rightArm.bone.rotation.x = -Math.PI * 0.2 + Math.sin(now * 0.02) * 0.2;
              }
          }
      }
  }

  public playAttackVisual(playerId: string, targetX: number, targetZ: number) {
    const visual = this.playerVisuals.get(playerId);
    if (!visual) return;

    visual.attackTimer = 0.2; 

    const px = visual.mesh.position.x;
    const pz = visual.mesh.position.z;
    const angle = Math.atan2(targetX - px, targetZ - pz);
    
    const slashMesh = this.slashPool.get();
    slashMesh.position.set(px, 1.0, pz); 
    slashMesh.rotation.y = angle; 
    
    this.activeSlashes.push({ mesh: slashMesh, life: 0.15, maxLife: 0.15 });
  }

  public playEnemyTelegraph(enemyId: string, type: string, x: number, z: number, radius: number, time: number, height: number = 0) {
      // Use Pool to prevent GC Stutter
      const group = this.telegraphPool.get();
      group.position.set(x, height + 0.1, z);
      
      const ring = group.getObjectByName("ring") as THREE.Mesh;
      const fill = group.getObjectByName("fill") as THREE.Mesh;
      
      if (ring) ring.scale.setScalar(radius);
      if (fill) fill.scale.setScalar(0.01);

      this.activeEffects.push({
          mesh: group, life: time, maxLife: time,
          update: (dt, m, progress) => {
              if (fill) fill.scale.setScalar(radius * progress);
              if (ring && progress >= 0.9 && ring.material instanceof THREE.Material) {
                  ring.material.opacity = 0.4; 
              }
              if (progress >= 1.0) {
                  this.telegraphPool.release(group);
                  group.visible = false;
              }
          }
      });
  }

  public playEnemyAttackVisual(enemyId: string, type: string, x: number, z: number, radius: number, height: number = 0) {
      // Use Pool to prevent GC Stutter
      if (type === "melee" || type === "dash") {
          const slash = this.enemyMeleePool.get();
          slash.position.set(x, height + 1.0, z);
          slash.scale.setScalar(radius);
          
          this.activeEffects.push({
              mesh: slash, life: 0.2, maxLife: 0.2,
              update: (dt, mesh, progress) => {
                  mesh.scale.setScalar(radius * (1.0 + progress * 0.5));
                  if (mesh instanceof THREE.Mesh && mesh.material instanceof THREE.Material) {
                      mesh.material.opacity = 1.0 - progress;
                  }
                  if (progress >= 1.0) {
                      this.enemyMeleePool.release(slash);
                      slash.visible = false;
                  }
              }
          });
      } else if (type === "aoe") {
          const blast = this.aoeBlastPool.get();
          blast.position.set(x, height + 0.5, z);
          blast.scale.setScalar(radius * 0.5);
          
          this.activeEffects.push({
              mesh: blast, life: 0.4, maxLife: 0.4,
              update: (dt, mesh, progress) => {
                  mesh.scale.setScalar(radius * (0.5 + progress * 0.5));
                  if (mesh instanceof THREE.Mesh && mesh.material instanceof THREE.Material) {
                      mesh.material.opacity = (1.0 - progress) * 0.5;
                  }
                  if (progress >= 1.0) {
                      this.aoeBlastPool.release(blast);
                      blast.visible = false;
                  }
              }
          });
      }
  }

  public showDamageNumber(x: number, y: number, z: number, amount: string | number, colorHex: string = "#ffffff") {
    let dn = this.damageNumbers.find(d => !d.active);
    
    if (!dn) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        canvas.width = 128; 
        canvas.height = 64;
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(1.5, 0.75, 1);
        
        dn = { sprite, canvas, ctx, life: 0, maxLife: 1.2, velocityY: 1.5, active: false };
        this.damageNumbers.push(dn);
        this.scene.add(sprite);
    }

    dn.ctx.clearRect(0, 0, dn.canvas.width, dn.canvas.height);
    dn.ctx.font = "bold 32px Arial";
    dn.ctx.textAlign = "center";
    dn.ctx.textBaseline = "middle";
    
    dn.ctx.fillStyle = "#000000";
    dn.ctx.fillText(amount.toString(), 64 + 2, 32 + 2);
    
    dn.ctx.fillStyle = colorHex;
    dn.ctx.fillText(amount.toString(), 64, 32);

    if (dn.sprite.material.map) {
        dn.sprite.material.map.needsUpdate = true;
    }

    dn.sprite.position.set(
        x + (Math.random() - 0.5) * 1.5, 
        y + 2.0 + (Math.random() * 0.5), 
        z + (Math.random() - 0.5) * 1.5
    );
    dn.sprite.material.opacity = 1;
    dn.sprite.visible = true;
    dn.life = 1.2;
    dn.maxLife = 1.2;
    dn.active = true;
  }

  public showChatBubble(playerId: string, text: string, isTeammate: boolean = false) {
      const visual = this.playerVisuals.get(playerId);
      if (!visual) return;

      const cacheKey = `${text}|${isTeammate}`;
      let texture = this.chatTextureCache.get(cacheKey);

      if (!texture) {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if (!ctx) return;
          
          ctx.font = "bold 24px Arial";
          const textWidth = ctx.measureText(text).width;
          canvas.width = Math.max(128, textWidth + 40); 
          canvas.height = 64;
          
          ctx.fillStyle = isTeammate ? "rgba(0, 170, 255, 0.9)" : "rgba(255, 255, 255, 0.9)";
          ctx.beginPath();
          ctx.roundRect(0, 0, canvas.width, canvas.height - 15, 8);
          ctx.fill();
          
          ctx.beginPath();
          ctx.moveTo(canvas.width / 2 - 10, canvas.height - 15);
          ctx.lineTo(canvas.width / 2, canvas.height);
          ctx.lineTo(canvas.width / 2 + 10, canvas.height - 15);
          ctx.fill();

          ctx.fillStyle = isTeammate ? "#ffffff" : "#000000";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.font = "bold 20px Arial";
          ctx.fillText(text, canvas.width / 2, (canvas.height - 15) / 2);

          texture = new THREE.CanvasTexture(canvas);
          texture.minFilter = THREE.LinearFilter;
          this.chatTextureCache.set(cacheKey, texture);
      }
      
      const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
      const sprite = new THREE.Sprite(material);
      
      const scaleX = (texture.image.width as number) / 64;
      sprite.scale.set(scaleX * 1.5, 1.5, 1);
      sprite.position.set(0, 4.8, 0); 
      visual.mesh.add(sprite);
      
      this.activeEffects.push({
          mesh: sprite, 
          life: 4.0, 
          maxLife: 4.0,
          update: (dt, mesh, progress) => {
              mesh.position.y += 0.2 * dt;
              if (progress > 0.75) {
                  const alpha = Math.max(0, 1.0 - ((progress - 0.75) * 4));
                  (mesh as THREE.Sprite).material.opacity = alpha;
              }
          }
      });
  }

  private updateInterpolatedEntities(dt: number) {
    const time = Date.now();
    const moveLerp = 1.0 - Math.exp(-15.0 * dt);
    const rotLerp = 1.0 - Math.exp(-10.0 * dt);

    for (const [id, visual] of this.playerVisuals.entries()) {
      const dx = visual.targetPosition.x - visual.mesh.position.x;
      const dz = visual.targetPosition.z - visual.mesh.position.z;
      const distance = Math.sqrt(dx * dx + dz * dz);
      
      const camDistSq = visual.mesh.position.distanceToSquared(this.camera.position);
      const isVisible = camDistSq < 4000;
      const isClose = camDistSq < 1500;

      // Skip movement rendering entirely if fishing (fishing lines handled it)
      const lineData = this.fishingLines.get(id);
      if (lineData && lineData.state !== "none") {
          visual.isMoving = false;
          // Force look at bobber
          const bdx = lineData.targetX - visual.mesh.position.x;
          const bdz = lineData.targetZ - visual.mesh.position.z;
          const targetAngle = Math.atan2(bdx, bdz);
          
          let angleDiff = targetAngle - visual.mesh.rotation.y;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          visual.mesh.rotation.y += angleDiff * rotLerp;
          continue; // Skip the rest of the animation block
      }

      // --- NEW MOUNT LOGIC ---
      if (visual.mountedFamiliarId && visual.mountedFamiliarId !== "") {
          visual.isMoving = false;
          if (visual.facingIndicator) visual.facingIndicator.visible = false;
          
          const mountVisual = this.familiarRenderer.visuals.get(visual.mountedFamiliarId);
          if (mountVisual) {
              // Smoothly transition into the saddle
              visual.mesh.position.x = mountVisual.mesh.position.x;
              visual.mesh.position.z = mountVisual.mesh.position.z;
              
              // Lift them up onto the back
              const saddleHeight = mountVisual.type === "ironclad_behemoth" ? 2.5 : 
                                   mountVisual.type === "storm_gryphon" ? 2.0 : 1.8;
                                   
              visual.mesh.position.y = mountVisual.mesh.position.y + saddleHeight;
              
              // Match rotation
              let angleDiff = mountVisual.mesh.rotation.y - visual.mesh.rotation.y;
              while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
              while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
              visual.mesh.rotation.y += angleDiff * rotLerp;

              // Force riding pose
              if (isClose && visual.modelMesh) {
                  const baseY = visual.modelMesh.userData.baseY || 0;
                  visual.modelMesh.position.y = THREE.MathUtils.lerp(visual.modelMesh.position.y, baseY, rotLerp);
                  visual.modelMesh.rotation.x = THREE.MathUtils.lerp(visual.modelMesh.rotation.x, 0, rotLerp);
                  visual.modelMesh.rotation.z = THREE.MathUtils.lerp(visual.modelMesh.rotation.z, 0, rotLerp);

                  if (visual.limbs) {
                      if (visual.limbs.leftLeg) {
                          visual.limbs.leftLeg.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.leftLeg.bone.rotation.x, -Math.PI / 4, rotLerp);
                          visual.limbs.leftLeg.bone.rotation.z = THREE.MathUtils.lerp(visual.limbs.leftLeg.bone.rotation.z, 0.5, rotLerp);
                      }
                      if (visual.limbs.rightLeg) {
                          visual.limbs.rightLeg.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.rightLeg.bone.rotation.x, -Math.PI / 4, rotLerp);
                          visual.limbs.rightLeg.bone.rotation.z = THREE.MathUtils.lerp(visual.limbs.rightLeg.bone.rotation.z, -0.5, rotLerp);
                      }
                      if (visual.limbs.leftArm) {
                          visual.limbs.leftArm.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.leftArm.bone.rotation.x, -0.2, rotLerp);
                          visual.limbs.leftArm.bone.rotation.z = THREE.MathUtils.lerp(visual.limbs.leftArm.bone.rotation.z, 0.1, rotLerp);
                      }
                      if (visual.limbs.rightArm) {
                          visual.limbs.rightArm.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.rightArm.bone.rotation.x, -0.2, rotLerp);
                          visual.limbs.rightArm.bone.rotation.z = THREE.MathUtils.lerp(visual.limbs.rightArm.bone.rotation.z, -0.1, rotLerp);
                      }
                  }
              }
              continue; // Bypass standard walking logic while mounted
          }
      } else {
          if (visual.facingIndicator) visual.facingIndicator.visible = true;
      }

      if (visual.attackTimer && visual.attackTimer > 0) {
          visual.attackTimer -= dt;
          if (visual.attackTimer < 0) visual.attackTimer = 0;
      }

      if (isClose && visual.capeGroup && visual.capeGroup.children.length > 0) {
          const runSpeed = visual.isMoving ? (visual.isSprinting ? 26.0 : 18.0) : 3.0; 
          const baseLift = visual.isMoving ? (visual.isSprinting ? 0.6 : 0.35) : 0.05; 

          let currentSeg: THREE.Object3D | undefined = visual.capeGroup.children[0];
          let index = 0;
          
          while (currentSeg) {
              const flap = Math.sin((time * 0.001 * runSpeed) - (index * 0.6)) * 0.1;
              currentSeg.rotation.x = baseLift + flap;
              currentSeg = currentSeg.children.length > 0 ? currentSeg.children[0] : undefined;
              index++;
          }
      }
      
      if (visual.isSleeping) {
          visual.isMoving = false;
          visual.mesh.position.lerp(visual.targetPosition, moveLerp);

          const targetAngle = visual.sleepRot || 0;
          let angleDiff = targetAngle - visual.mesh.rotation.y;
          while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
          while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
          visual.mesh.rotation.y += angleDiff * rotLerp;

          if (isClose && visual.modelMesh) {
              const baseY = visual.modelMesh.userData.baseY || 0;
              visual.modelMesh.position.y = THREE.MathUtils.lerp(visual.modelMesh.position.y, baseY + 0.8, rotLerp); 
              visual.modelMesh.rotation.x = THREE.MathUtils.lerp(visual.modelMesh.rotation.x, -Math.PI / 2, rotLerp); 
              visual.modelMesh.rotation.z = THREE.MathUtils.lerp(visual.modelMesh.rotation.z, 0, rotLerp);

              if (visual.limbs) {
                  if (visual.limbs.leftArm) visual.limbs.leftArm.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.leftArm.bone.rotation.x, visual.limbs.leftArm.baseRot.x, rotLerp);
                  if (visual.limbs.rightArm) visual.limbs.rightArm.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.rightArm.bone.rotation.x, visual.limbs.rightArm.baseRot.x, rotLerp);
                  if (visual.limbs.leftLeg) visual.limbs.leftLeg.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.leftLeg.bone.rotation.x, visual.limbs.leftLeg.baseRot.x, rotLerp);
                  if (visual.limbs.rightLeg) visual.limbs.rightLeg.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.rightLeg.bone.rotation.x, visual.limbs.rightLeg.baseRot.x, rotLerp);
              }
          }
      } 
      else if (visual.isSwimming) {
          if (distance > 0.05) {
            visual.isMoving = true;
            const targetAngle = Math.atan2(dx, dz);
            let angleDiff = targetAngle - visual.mesh.rotation.y;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            visual.mesh.rotation.y += angleDiff * rotLerp;
          } else {
            visual.isMoving = false;
          }

          visual.mesh.position.lerp(visual.targetPosition, moveLerp);

          if (isClose && visual.modelMesh) {
              const baseY = visual.modelMesh.userData.baseY || 0;
              visual.modelMesh.position.y = THREE.MathUtils.lerp(visual.modelMesh.position.y, baseY + 1.0 + Math.sin(time * 0.003) * 0.05, rotLerp);

              let leftArmX = 0, rightArmX = 0, leftLegX = 0, rightLegX = 0;

              if (visual.isMoving) {
                  visual.modelMesh.rotation.x = THREE.MathUtils.lerp(visual.modelMesh.rotation.x, -Math.PI / 2 + 0.2, rotLerp);
                  visual.modelMesh.rotation.z = Math.sin(time * 0.01) * 0.1; 

                  const swimSpeed = 0.015;
                  const armSwing = Math.sin(time * swimSpeed) * Math.PI * 0.6;
                  const legSwing = Math.sin(time * swimSpeed * 2) * Math.PI * 0.2;

                  leftArmX = -Math.PI / 2 + armSwing;
                  rightArmX = -Math.PI / 2 - armSwing;
                  leftLegX = legSwing;
                  rightLegX = -legSwing;
              } else {
                  visual.modelMesh.rotation.x = THREE.MathUtils.lerp(visual.modelMesh.rotation.x, -0.2, rotLerp);
                  visual.modelMesh.rotation.z = THREE.MathUtils.lerp(visual.modelMesh.rotation.z, 0, rotLerp);

                  const treadSpeed = 0.005;
                  const armTread = Math.sin(time * treadSpeed) * 0.3;
                  const legTread = Math.sin(time * treadSpeed * 1.5) * 0.3;

                  leftArmX = -0.2 + armTread;
                  rightArmX = -0.2 - armTread;
                  leftLegX = 0.2 + legTread;
                  rightLegX = 0.2 - legTread;
              }

              if (visual.limbs) {
                  if (visual.limbs.leftArm) visual.limbs.leftArm.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.leftArm.bone.rotation.x, leftArmX, rotLerp);
                  if (visual.limbs.rightArm) visual.limbs.rightArm.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.rightArm.bone.rotation.x, rightArmX, rotLerp);
                  if (visual.limbs.leftLeg) visual.limbs.leftLeg.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.leftLeg.bone.rotation.x, leftLegX, rotLerp);
                  if (visual.limbs.rightLeg) visual.limbs.rightLeg.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.rightLeg.bone.rotation.x, rightLegX, rotLerp);
              }
          }
      } 
      else if (visual.isMeditating) {
          visual.isMoving = false;
          visual.mesh.position.lerp(visual.targetPosition, moveLerp);

          if (isClose && visual.modelMesh) {
              const baseY = visual.modelMesh.userData.baseY || 0;
              
              visual.modelMesh.position.y = THREE.MathUtils.lerp(visual.modelMesh.position.y, baseY - 0.4, rotLerp); 
              visual.modelMesh.rotation.x = THREE.MathUtils.lerp(visual.modelMesh.rotation.x, 0, rotLerp); 
              visual.modelMesh.rotation.z = THREE.MathUtils.lerp(visual.modelMesh.rotation.z, 0, rotLerp);

              if (visual.limbs) {
                  if (visual.limbs.leftArm) {
                      visual.limbs.leftArm.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.leftArm.bone.rotation.x, -0.5, rotLerp);
                      visual.limbs.leftArm.bone.rotation.z = THREE.MathUtils.lerp(visual.limbs.leftArm.bone.rotation.z, 0.3, rotLerp);
                  }
                  if (visual.limbs.rightArm) {
                      visual.limbs.rightArm.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.rightArm.bone.rotation.x, -0.5, rotLerp);
                      visual.limbs.rightArm.bone.rotation.z = THREE.MathUtils.lerp(visual.limbs.rightArm.bone.rotation.z, -0.3, rotLerp);
                  }
                  if (visual.limbs.leftLeg) {
                      visual.limbs.leftLeg.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.leftLeg.bone.rotation.x, -1.4, rotLerp);
                      visual.limbs.leftLeg.bone.rotation.z = THREE.MathUtils.lerp(visual.limbs.leftLeg.bone.rotation.z, 0.6, rotLerp);
                  }
                  if (visual.limbs.rightLeg) {
                      visual.limbs.rightLeg.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.rightLeg.bone.rotation.x, -1.4, rotLerp);
                      visual.limbs.rightLeg.bone.rotation.z = THREE.MathUtils.lerp(visual.limbs.rightLeg.bone.rotation.z, -0.6, rotLerp);
                  }
              }
          }
      }
      else {
          if (distance > 0.05) {
            visual.isMoving = true;
            const targetAngle = Math.atan2(dx, dz);
            let angleDiff = targetAngle - visual.mesh.rotation.y;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            visual.mesh.rotation.y += angleDiff * rotLerp;
          } else {
            visual.isMoving = false;
          }

          visual.mesh.position.lerp(visual.targetPosition, moveLerp);
          
          if (isVisible && visual.modelMesh) {
            const baseY = visual.modelMesh.userData.baseY || 0;
            let leftArmX = 0, rightArmX = 0, leftLegX = 0, rightLegX = 0;

            if (visual.isMoving) {
              const isSprinting = visual.isSprinting;
              const hopHeight = isSprinting ? 0.25 : 0.1; 
              const hopSpeed = isSprinting ? 0.025 : 0.015;
              
              visual.modelMesh.position.y = baseY + Math.abs(Math.sin(time * hopSpeed)) * hopHeight;
              visual.modelMesh.rotation.z = Math.cos(time * hopSpeed) * 0.1;
              visual.modelMesh.rotation.x = THREE.MathUtils.lerp(visual.modelMesh.rotation.x, isSprinting ? 0.3 : 0.1, rotLerp);

              if (isClose) {
                const swingSpeed = isSprinting ? 0.025 : 0.015;
                const swingAmount = isSprinting ? 1.3 : 0.8; 
                const swing = Math.sin(time * swingSpeed) * swingAmount;

                if (visual.limbs) {
                  if (visual.limbs.leftArm) leftArmX = visual.limbs.leftArm.baseRot.x + swing;
                  if (visual.limbs.rightArm) rightArmX = visual.limbs.rightArm.baseRot.x - swing;
                  if (visual.limbs.leftLeg) leftLegX = visual.limbs.leftLeg.baseRot.x - swing;
                  if (visual.limbs.rightLeg) rightLegX = visual.limbs.rightLeg.baseRot.x + swing;
                }
              }
            } else {
              visual.modelMesh.position.y = THREE.MathUtils.lerp(visual.modelMesh.position.y, baseY, rotLerp);
              visual.modelMesh.rotation.z = THREE.MathUtils.lerp(visual.modelMesh.rotation.z, 0, rotLerp);
              visual.modelMesh.rotation.x = THREE.MathUtils.lerp(visual.modelMesh.rotation.x, 0, rotLerp);

              if (isClose) {
                const breatheSpeed = 0.002;
                const breatheAmount = 0.02;
                visual.modelMesh.scale.y = 1.0 + Math.sin(time * breatheSpeed) * breatheAmount;

                if (visual.limbs) {
                  if (visual.limbs.leftArm) leftArmX = visual.limbs.leftArm.baseRot.x;
                  if (visual.limbs.rightArm) rightArmX = visual.limbs.rightArm.baseRot.x;
                  if (visual.limbs.leftLeg) leftLegX = visual.limbs.leftLeg.baseRot.x;
                  if (visual.limbs.rightLeg) rightLegX = visual.limbs.rightLeg.baseRot.x;
                }
              }
            }

            if (isClose && visual.limbs) {
                if (visual.limbs.leftArm) visual.limbs.leftArm.bone.rotation.z = THREE.MathUtils.lerp(visual.limbs.leftArm.bone.rotation.z, 0, rotLerp);
                if (visual.limbs.rightArm) visual.limbs.rightArm.bone.rotation.z = THREE.MathUtils.lerp(visual.limbs.rightArm.bone.rotation.z, 0, rotLerp);
                if (visual.limbs.leftLeg) visual.limbs.leftLeg.bone.rotation.z = THREE.MathUtils.lerp(visual.limbs.leftLeg.bone.rotation.z, 0, rotLerp);
                if (visual.limbs.rightLeg) visual.limbs.rightLeg.bone.rotation.z = THREE.MathUtils.lerp(visual.limbs.rightLeg.bone.rotation.z, 0, rotLerp);

                if (visual.limbs.leftArm) visual.limbs.leftArm.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.leftArm.bone.rotation.x, leftArmX, rotLerp);
                if (visual.limbs.leftLeg) visual.limbs.leftLeg.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.leftLeg.bone.rotation.x, leftLegX, rotLerp);
                if (visual.limbs.rightLeg) visual.limbs.rightLeg.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.rightLeg.bone.rotation.x, rightLegX, rotLerp);

                if (visual.limbs.rightArm) {
                    if (visual.attackTimer && visual.attackTimer > 0) {
                        const t = visual.attackTimer / 0.3; 
                        if (t > 0.5) { 
                            const windUp = (t - 0.5) * 2; 
                            visual.limbs.rightArm.bone.rotation.x = THREE.MathUtils.lerp(-Math.PI * 0.8, rightArmX, 1 - windUp);
                        } else { 
                            const strike = t * 2; 
                            visual.limbs.rightArm.bone.rotation.x = THREE.MathUtils.lerp(Math.PI * 0.3, -Math.PI * 0.8, strike);
                        }
                    } else {
                        visual.limbs.rightArm.bone.rotation.x = THREE.MathUtils.lerp(visual.limbs.rightArm.bone.rotation.x, rightArmX, rotLerp);
                    }
                }
            }
          }
      }
    }

    for (const entry of this.enemyVisuals.values()) {
        const dx = entry.model.targetPosition.x - entry.model.mesh.position.x;
        const dz = entry.model.targetPosition.z - entry.model.mesh.position.z;
        const isMoving = Math.sqrt(dx * dx + dz * dz) > 0.05;

        entry.model.update(dt, isMoving);
    }
  }

  private updateAttacks(dt: number) {
    for (let i = this.activeSlashes.length - 1; i >= 0; i--) {
        const slash = this.activeSlashes[i];
        slash.life -= dt;
        
        if (slash.life <= 0) {
            this.slashPool.release(slash.mesh);
            this.activeSlashes.splice(i, 1);
        } else {
            const progress = 1.0 - (slash.life / slash.maxLife);
            if (slash.maxLife === 0.15) {
                slash.mesh.scale.setScalar(1.0 + progress * 0.5);
            }
            if (slash.mesh.material instanceof THREE.MeshBasicMaterial) {
                slash.mesh.material.opacity = 0.9 * (1.0 - progress);
            }
        }
    }
  }

  private updateDamageNumbers(dt: number) {
    for (let i = 0; i < this.damageNumbers.length; i++) {
        const dn = this.damageNumbers[i];
        if (!dn.active) continue;

        dn.life -= dt;
        
        if (dn.life <= 0) {
            dn.active = false;
            dn.sprite.visible = false;
        } else {
            dn.sprite.position.y += dn.velocityY * dt;
            const progress = dn.life / dn.maxLife;
            if (progress < 0.5) {
                dn.sprite.material.opacity = progress * 2;
            }
        }
    }
  }

  private updateActiveEffects(dt: number) {
    for (let i = this.activeEffects.length - 1; i >= 0; i--) {
        const effect = this.activeEffects[i];
        effect.life -= dt;
        
        if (effect.life <= 0) {
            const progress = 1.0;
            effect.update(dt, effect.mesh, progress); 
            this.activeEffects.splice(i, 1);
        } else {
            const progress = 1.0 - (effect.life / effect.maxLife);
            effect.update(dt, effect.mesh, progress);
        }
    }
  }

  protected createNameLabel(text: string, subText?: string) {
    const cacheKey = text + "|" + (subText || "");
    let texture = this.labelTextureCache.get(cacheKey);

    if (!texture) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Could not create label canvas context");

        const fontSize = 28;
        const subFontSize = 20;
        const paddingX = 16;
        const paddingY = 10;

        ctx.font = `bold ${fontSize}px Arial`;
        const textWidth = Math.ceil(ctx.measureText(text).width);

        let subTextWidth = 0;
        if (subText) {
            ctx.font = `bold ${subFontSize}px Arial`;
            subTextWidth = Math.ceil(ctx.measureText(subText).width);
        }

        const maxWidth = Math.max(textWidth, subTextWidth);
        canvas.width = maxWidth + paddingX * 2;
        canvas.height = fontSize + paddingY * 2 + (subText ? subFontSize + paddingY : 0);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = "rgba(0, 0, 0, 0.75)";
        this.roundRect(ctx, 0, 0, canvas.width, canvas.height, 12);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        if (subText) {
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillText(text, canvas.width / 2, paddingY + fontSize / 2);
            
            ctx.font = `bold ${subFontSize}px Arial`;
            ctx.fillStyle = "#00aaff"; 
            ctx.fillText(subText, canvas.width / 2, paddingY + fontSize + paddingY / 2 + subFontSize / 2);
        } else {
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);
        }

        texture = new THREE.CanvasTexture(canvas);
        texture.minFilter = THREE.LinearFilter;
        texture.generateMipmaps = false;
        texture.name = text + (subText ? `\n${subText}` : ""); // Store raw text here for fast checking
        
        this.labelTextureCache.set(cacheKey, texture);
    }

    const material = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
    const sprite = new THREE.Sprite(material);
    
    sprite.scale.set(texture.image.width * 0.02, texture.image.height * 0.02, 1);
    return sprite;
  }

  private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  public dispose() {
    cancelAnimationFrame(this.animationId); 
    window.removeEventListener("resize", this.onResize);
    
    this.familiarRenderer.dispose();
    this.equipmentBuilder.dispose(); 

    for (const visual of this.playerVisuals.values()) {
      if (visual.labelSprite.material instanceof THREE.SpriteMaterial) { 
          visual.labelSprite.material.dispose(); 
      }

      const keys: (keyof PlayerVisual)[] = [
          "equipped_mainhand_Mesh", "equipped_offhand_Mesh", 
          "equipped_head_Meshes", "equipped_chest_Meshes", 
          "equipped_back_Meshes",
          "equipped_legs_Meshes", "equipped_feet_Meshes"
      ];

      keys.forEach(k => {
          if (visual[k] instanceof THREE.Group) {
             const m = visual[k] as THREE.Group;
             m.parent?.remove(m);
          } else if (Array.isArray(visual[k])) {
             (visual[k] as THREE.Mesh[]).forEach(m => m.parent?.remove(m));
          }
      });

      if (visual.capeGroup) {
          visual.capeGroup.parent?.remove(visual.capeGroup);
      }

      if (visual.mesh.children) {
         visual.mesh.children.forEach((c: any) => {
             if (c instanceof THREE.Mesh && c.material instanceof THREE.Material) c.material.dispose();
         });
      }
    }
    
    for (const slash of this.activeSlashes) {
        if (slash.mesh.material instanceof THREE.Material) slash.mesh.material.dispose();
        slash.mesh.geometry.dispose();
    }
    this.activeSlashes = [];

    for (const dn of this.damageNumbers) {
        dn.ctx.canvas.remove();
        if (dn.sprite.material.map) dn.sprite.material.map.dispose();
        dn.sprite.material.dispose();
    }
    this.damageNumbers = [];

    for (const effect of this.activeEffects) {
        this.scene.remove(effect.mesh);
        effect.mesh.traverse((c: THREE.Object3D) => {
            if (c instanceof THREE.Mesh) {
                if (c.material) c.material.dispose();
                if (c.geometry) c.geometry.dispose();
            }
        });
    }
    this.activeEffects = [];

    // Cleanup Fishing Lines
    for (const data of this.fishingLines.values()) {
        this.scene.remove(data.curveLine);
        this.scene.remove(data.bobber);
        data.curveLine.geometry.dispose();
        if (data.curveLine.material instanceof THREE.Material) data.curveLine.material.dispose();
        data.bobber.geometry.dispose();
        if (data.bobber.material instanceof THREE.Material) data.bobber.material.dispose();
    }
    this.fishingLines.clear();

    for (const entry of this.enemyVisuals.values()) {
        this.scene.remove(entry.model.mesh);
        entry.model.mesh.children.forEach((c: any) => {
            if (c instanceof THREE.Mesh && c.material instanceof THREE.Material) c.material.dispose();
        });
        if (entry.labelSprite.material instanceof THREE.SpriteMaterial) {
            entry.labelSprite.material.dispose();
        }
    }
    this.enemyVisuals.clear();

    // Cleanup Caches
    for (const tex of this.labelTextureCache.values()) tex.dispose();
    this.labelTextureCache.clear();

    for (const tex of this.chatTextureCache.values()) tex.dispose();
    this.chatTextureCache.clear();

    this.playerMeshes.clear(); 
    this.playerVisuals.clear(); 
    
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement === this.container) {
        this.container.removeChild(this.renderer.domElement);
    }
  }
}