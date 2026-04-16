import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type PlayerVisual = { 
  mesh: THREE.Mesh; 
  labelSprite: THREE.Sprite; 
  targetPosition: THREE.Vector3; 
  basePosition: THREE.Vector3;
  lungeOffset: THREE.Vector3;
  flashTimer: number; 
};

type EnemyVisual = { 
  mesh: THREE.Mesh; 
  labelSprite: THREE.Sprite; 
  targetPosition: THREE.Vector3; 
  basePosition: THREE.Vector3;
  lungeOffset: THREE.Vector3;
  telegraphMesh: THREE.Mesh; 
  flashTimer: number; 
};

type CombatAnimation = { 
  type: "text" | "projectile" | "bladeStorm" | "voidExecute" | "meleeHit" | "enemyMelee" | "trail" | "sparks" | "meteor" | "earthquake" | "healAura" | "root" | "stun" | "lunge"; 
  mesh: THREE.Object3D; 
  age: number; 
  maxAge: number; 
  start?: THREE.Vector3; 
  end?: THREE.Vector3; 
  playerId?: string;
  enemyId?: string;
};

export class FieldScene {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls; 

  playerMeshes = new Map<string, THREE.Mesh>();
  private playerVisuals = new Map<string, PlayerVisual>();

  enemyMeshes = new Map<string, THREE.Mesh>();
  private enemyVisuals = new Map<string, EnemyVisual>();

  townGateMesh: THREE.Mesh;
  dungeonPortalMesh: THREE.Group;
  
  lootVisuals = new Map<string, THREE.Group>();
  private lootGroup: THREE.Group;

  private trunkGeo = new THREE.CylinderGeometry(0.15, 0.3, 1.5, 5);
  private trunkMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 1.0 });
  private leavesGeo = new THREE.ConeGeometry(1.2, 3.5, 5);
  private leavesMat = new THREE.MeshStandardMaterial({ color: 0x0f3814, roughness: 0.8 });

  private chestBaseGeo = new THREE.BoxGeometry(0.8, 0.5, 0.6);
  private chestLidGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 16, 1, false, 0, Math.PI);
  private chestWoodMat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.9 });
  private chestGoldMat = new THREE.MeshStandardMaterial({ color: 0xffd700, metalness: 0.8, roughness: 0.2 });

  private highlightGroup: THREE.Group;
  private tilePool: THREE.Mesh[] = [];
  private poolIndex = 0;
  private matMove = new THREE.MeshBasicMaterial({ color: 0x0088ff, transparent: true, opacity: 0.3, depthWrite: false });

  private reticleMesh: THREE.Mesh;
  private combatAnimations: CombatAnimation[] = [];

  private container: HTMLElement;
  private animationId = 0;
  private cameraInitialized = false; 
  private shakeTrauma = 0; 

  private localPlayerId: string | null = null;
  private fogCanvas!: HTMLCanvasElement;
  private fogCtx!: CanvasRenderingContext2D;
  private fogTexture!: THREE.CanvasTexture;
  private fogMesh!: THREE.Mesh;
  private VISION_RADIUS = 15; 

  constructor(container: HTMLElement) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050805);

    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(0, 30, 30);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; 
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2.1; 
    this.controls.minDistance = 8;  
    this.controls.maxDistance = 80; 
    this.controls.enablePan = false; 

    this.highlightGroup = new THREE.Group();
    this.scene.add(this.highlightGroup);
    
    this.lootGroup = new THREE.Group();
    this.scene.add(this.lootGroup);

    const reticleGeo = new THREE.PlaneGeometry(1.1, 1.1);
    const reticleMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.8, wireframe: true, depthWrite: false });
    this.reticleMesh = new THREE.Mesh(reticleGeo, reticleMat);
    this.reticleMesh.rotation.x = -Math.PI / 2;
    this.reticleMesh.position.y = 0.05;
    this.reticleMesh.visible = false;
    this.scene.add(this.reticleMesh);

    this.createLights();
    this.createTabletopBoard();
    this.createFogOfWar(); 
    this.createAxes();
    
    this.townGateMesh = this.createTownGate();
    this.dungeonPortalMesh = this.createDungeonPortal(); 

    window.addEventListener("resize", this.onResize);
    this.animate();
  }

  private createLights() {
    this.scene.add(new THREE.AmbientLight(0xddeeff, 0.25));
    const directional = new THREE.DirectionalLight(0xfff5e6, 2.5);
    directional.position.set(20, 50, -20);
    directional.castShadow = true;
    directional.shadow.mapSize.width = 2048; directional.shadow.mapSize.height = 2048;
    directional.shadow.camera.left = -60; directional.shadow.camera.right = 60;
    directional.shadow.camera.top = 60; directional.shadow.camera.bottom = -60;
    directional.shadow.bias = -0.0005;
    this.scene.add(directional);
  }

  private createTabletopBoard() {
    const boardGroup = new THREE.Group();
    const boardGeo = new THREE.BoxGeometry(104, 4, 104);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x211710, roughness: 0.9 });
    const board = new THREE.Mesh(boardGeo, boardMat);
    board.position.y = -2; board.receiveShadow = true; board.castShadow = true;
    boardGroup.add(board);

    const surfaceGeo = new THREE.PlaneGeometry(100, 100);
    const surfaceMat = new THREE.MeshStandardMaterial({ color: 0x2e5c2e, roughness: 0.9 }); 
    const surface = new THREE.Mesh(surfaceGeo, surfaceMat);
    surface.rotation.x = -Math.PI / 2; surface.position.y = 0.01; surface.receiveShadow = true;
    boardGroup.add(surface);

    const grid = new THREE.GridHelper(100, 100, 0x000000, 0x000000);
    grid.position.y = 0.02; (grid.material as THREE.Material).transparent = true; (grid.material as THREE.Material).opacity = 0.2;
    boardGroup.add(grid);

    this.scene.add(boardGroup);
  }

  private createFogOfWar() {
    this.fogCanvas = document.createElement("canvas");
    this.fogCanvas.width = 1024; this.fogCanvas.height = 1024;
    this.fogCtx = this.fogCanvas.getContext("2d")!;
    this.fogCtx.fillStyle = "#030503"; this.fogCtx.fillRect(0, 0, 1024, 1024);
    this.fogTexture = new THREE.CanvasTexture(this.fogCanvas);

    const fogGeo = new THREE.PlaneGeometry(100, 100);
    const fogMat = new THREE.MeshBasicMaterial({ map: this.fogTexture, transparent: true, opacity: 0.98, depthWrite: false });
    this.fogMesh = new THREE.Mesh(fogGeo, fogMat);
    this.fogMesh.rotation.x = -Math.PI / 2; this.fogMesh.position.y = 4.5; 
    this.scene.add(this.fogMesh);
  }

  private createAxes() { this.scene.add(new THREE.AxesHelper(5)); }

  private createTownGate() {
    const gate = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.2, 16), new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.6 }));
    gate.position.set(-8, 0.1, 0);
    const light = new THREE.PointLight(0x00aaff, 1.5, 5); light.position.set(0, 1, 0); gate.add(light);
    this.scene.add(gate); return gate;
  }

  private createDungeonPortal() {
    const group = new THREE.Group();
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x444455, roughness: 0.9 });
    const pillarGeo = new THREE.BoxGeometry(0.8, 3, 0.8);
    
    const leftPillar = new THREE.Mesh(pillarGeo, stoneMat); leftPillar.position.set(-1.5, 1.5, 0); leftPillar.castShadow = true; group.add(leftPillar);
    const rightPillar = new THREE.Mesh(pillarGeo, stoneMat); rightPillar.position.set(1.5, 1.5, 0); rightPillar.castShadow = true; group.add(rightPillar);
    const topPillar = new THREE.Mesh(new THREE.BoxGeometry(4, 0.8, 0.8), stoneMat); topPillar.position.set(0, 3.4, 0); topPillar.castShadow = true; group.add(topPillar);
    const vortex = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 3), new THREE.MeshBasicMaterial({ color: 0x8800ff, transparent: true, opacity: 0.7, side: THREE.DoubleSide }));
    vortex.position.set(0, 1.5, 0); group.add(vortex);
    group.position.set(35, 0, -35);
    const glowLight = new THREE.PointLight(0xaa00ff, 2, 8); glowLight.position.set(0, 1.5, 0); group.add(glowLight);

    this.scene.add(group); return group;
  }

  isNearTownGate(x: number, y: number) { return Math.abs(x - this.townGateMesh.position.x) < 3.0 && Math.abs(y - this.townGateMesh.position.z) < 3.0; }
  isNearDungeonPortal(x: number, y: number) { return Math.abs(x - this.dungeonPortalMesh.position.x) < 3.0 && Math.abs(y - this.dungeonPortalMesh.position.z) < 3.0; }

  addLootItem(id: string, kind: string, x: number, z: number, scale: number, rotation: number) {
    if (this.lootVisuals.has(id)) return;
    
    if (kind === "tree") {
      const tree = new THREE.Group();
      const trunk = new THREE.Mesh(this.trunkGeo, this.trunkMat); trunk.position.y = 0.75; trunk.castShadow = true; trunk.receiveShadow = true; tree.add(trunk);
      const leaves = new THREE.Mesh(this.leavesGeo, this.leavesMat); leaves.position.y = 2.5; leaves.castShadow = true; leaves.receiveShadow = true; tree.add(leaves);
      tree.scale.set(scale, scale, scale); tree.rotation.y = rotation; tree.position.set(x, 0, z); 
      this.lootGroup.add(tree); this.lootVisuals.set(id, tree);
    } 
    else if (kind === "chest") {
      const chest = new THREE.Group();
      
      const base = new THREE.Mesh(this.chestBaseGeo, this.chestWoodMat);
      base.position.y = 0.25; base.castShadow = true; base.receiveShadow = true; chest.add(base);

      const lid = new THREE.Mesh(this.chestLidGeo, this.chestWoodMat);
      lid.rotation.z = Math.PI / 2; lid.position.y = 0.5; lid.castShadow = true; chest.add(lid);

      const lock = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.1), this.chestGoldMat);
      lock.position.set(0, 0.45, 0.35); lock.castShadow = true; chest.add(lock);

      const light = new THREE.PointLight(0xffaa00, 0.8, 3);
      light.position.set(0, 1, 0); chest.add(light);

      chest.scale.set(scale, scale, scale); chest.rotation.y = rotation; chest.position.set(x, 0, z);
      this.lootGroup.add(chest); this.lootVisuals.set(id, chest);
    }
  }

  removeLootItem(id: string) {
    const visual = this.lootVisuals.get(id);
    if (visual) { this.lootGroup.remove(visual); this.lootVisuals.delete(id); }
  }

  clearHighlights() {
    for (let i = 0; i < this.poolIndex; i++) this.tilePool[i].visible = false;
    this.poolIndex = 0;
  }

  addHighlightTile(x: number, z: number, type: string) {
    let tile: THREE.Mesh;
    if (this.poolIndex < this.tilePool.length) {
      tile = this.tilePool[this.poolIndex];
    } else {
      tile = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.9), this.matMove); tile.rotation.x = -Math.PI / 2;
      this.highlightGroup.add(tile); this.tilePool.push(tile);
    }
    tile.position.set(x, 0.03, z); tile.visible = true;
    this.poolIndex++;
  }

  setReticlePosition(x: number, z: number, visible: boolean) {
      this.reticleMesh.position.set(x, 0.05, z);
      this.reticleMesh.visible = visible;
  }

  private triggerFlash(id: string) {
    const p = this.playerVisuals.get(id);
    if (p) p.flashTimer = 0.2;
    const e = this.enemyVisuals.get(id);
    if (e) e.flashTimer = 0.2;
  }

  playCombatEvent(data: any) {
    if (data.action === "damage") {
        this.spawnFloatingText(`-${data.amount}`, "#ffffff", data.x, data.y);
        if (data.targetId) this.triggerFlash(data.targetId);
        this.spawnSparks(data.x, 1, data.y, 0xffaa00, 10); 
    }
    else if (data.action === "heal") this.spawnFloatingText(`+${data.amount}`, "#44ff44", data.x, data.y);
    else if (data.action === "projectile") this.spawnProjectile(data.startX, data.startY, data.endX, data.endY, data.color || 0xffaa00);
    else if (data.action === "bladeStorm") this.spawnBladeStorm(data.x, data.y); 
    else if (data.action === "voidExecute") this.spawnVoidExecute(data.x, data.y, data.marks); 
    else if (data.action === "meleeHit") this.spawnMeleeHit(data.x, data.y); 
    else if (data.action === "enemyMelee") {
        this.spawnEnemyMelee(data.x, data.y); 
        if (data.sourceId) this.spawnEnemyLunge(data.sourceId, data.x, data.y);
    }
    else if (data.action === "meteor") this.spawnMeteor(data.x, data.y); 
    else if (data.action === "earthquake") this.spawnEarthquake(data.x, data.y); 
    else if (data.action === "healAura") this.spawnHealAura(data.x, data.y); 
    else if (data.action === "root") this.spawnRoot(data.x, data.y); 
    else if (data.action === "stun") this.spawnStun(data.x, data.y);
    else if (data.action === "playerLunge") this.spawnPlayerLunge(data.sourceId, data.targetX, data.targetY);
  }

  private spawnPlayerLunge(id: string, tx: number, ty: number) {
    const visual = this.playerVisuals.get(id);
    if (!visual) return;
    const dx = tx - visual.basePosition.x;
    const dz = ty - visual.basePosition.z;
    const len = Math.sqrt(dx*dx + dz*dz);
    const targetOffset = new THREE.Vector3(0,0,0);
    if (len > 0) {
        targetOffset.x = (dx/len) * 0.8;
        targetOffset.z = (dz/len) * 0.8;
        visual.mesh.rotation.y = Math.atan2(dx, dz);
    }
    this.combatAnimations.push({ 
        type: "lunge", mesh: new THREE.Object3D(), age: 0, maxAge: 0.25,
        playerId: id, start: new THREE.Vector3(0,0,0), end: targetOffset 
    });
  }

  private spawnEnemyLunge(id: string, tx: number, ty: number) {
    const visual = this.enemyVisuals.get(id);
    if (!visual) return;
    const dx = tx - visual.basePosition.x;
    const dz = ty - visual.basePosition.z;
    const len = Math.sqrt(dx*dx + dz*dz);
    const targetOffset = new THREE.Vector3(0,0,0);
    if (len > 0) {
        targetOffset.x = (dx/len) * 0.8;
        targetOffset.z = (dz/len) * 0.8;
        visual.mesh.rotation.y = Math.atan2(dx, dz);
    }
    this.combatAnimations.push({ 
        type: "lunge", mesh: new THREE.Object3D(), age: 0, maxAge: 0.3, 
        enemyId: id, start: new THREE.Vector3(0,0,0), end: targetOffset 
    });
  }

  private spawnFloatingText(text: string, color: string, x: number, z: number) {
    const canvas = document.createElement("canvas"); const ctx = canvas.getContext("2d")!;
    canvas.width = 256; canvas.height = 128;
    ctx.font = "bold 64px Arial"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "black"; ctx.fillText(text, 128 + 4, 64 + 4); 
    ctx.fillStyle = color; ctx.fillText(text, 128, 64);
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthWrite: false }));
    sprite.position.set(x, 3.5, z); sprite.scale.set(3, 1.5, 1);
    this.scene.add(sprite); 
    this.combatAnimations.push({ type: "text", mesh: sprite, age: 0, maxAge: 1.2 });
  }

  private spawnSparks(x: number, y: number, z: number, color: number, count: number) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    const geo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
    const mat = new THREE.MeshBasicMaterial({ color: color, transparent: true });
    for(let i=0; i<count; i++) {
        const mesh = new THREE.Mesh(geo, mat);
        mesh.userData.velocity = new THREE.Vector3((Math.random() - 0.5) * 12, Math.random() * 8 + 4, (Math.random() - 0.5) * 12);
        group.add(mesh);
    }
    this.scene.add(group);
    this.combatAnimations.push({ type: "sparks", mesh: group, age: 0, maxAge: 0.6 });
  }

  private spawnProjectile(startX: number, startZ: number, endX: number, endZ: number, color: number) {
    const group = new THREE.Group();
    const geo = new THREE.IcosahedronGeometry(0.3, 0); 
    const mat = new THREE.MeshBasicMaterial({ color: color, wireframe: false });
    const mesh = new THREE.Mesh(geo, mat);
    group.add(mesh);
    const light = new THREE.PointLight(color, 2, 8);
    group.add(light);
    group.position.set(startX, 1.5, startZ); 
    this.scene.add(group);
    this.combatAnimations.push({ type: "projectile", mesh: group, age: 0, maxAge: 0.35, start: new THREE.Vector3(startX, 1.5, startZ), end: new THREE.Vector3(endX, 1.5, endZ) });
  }

  private spawnMeleeHit(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 1, z);
    const geo = new THREE.TorusGeometry(1.2, 0.08, 4, 16, Math.PI * 1.2); 
    const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, side: THREE.DoubleSide });
    
    const slash1 = new THREE.Mesh(geo, mat); slash1.rotation.x = -Math.PI / 2; slash1.rotation.z = Math.random() * Math.PI;
    const slash2 = new THREE.Mesh(geo, mat.clone()); slash2.rotation.x = -Math.PI / 2 + (Math.random() - 0.5); slash2.rotation.y = (Math.random() - 0.5);
    
    const light = new THREE.PointLight(0xffffff, 2, 5);
    group.add(slash1, slash2, light);
    this.scene.add(group);
    this.combatAnimations.push({ type: "meleeHit", mesh: group, age: 0, maxAge: 0.25 }); 
  }

  private spawnEnemyMelee(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 1, z);
    const geo = new THREE.TorusGeometry(0.8, 0.2, 4, 8, Math.PI); 
    const mat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, side: THREE.DoubleSide });
    
    const bite1 = new THREE.Mesh(geo, mat); bite1.rotation.x = -Math.PI / 2; bite1.rotation.z = Math.random() * Math.PI;
    const bite2 = new THREE.Mesh(geo, mat.clone()); bite2.rotation.x = -Math.PI / 2; bite2.rotation.z = bite1.rotation.z + Math.PI;
    
    const light = new THREE.PointLight(0xff0000, 3, 5);
    group.add(bite1, bite2, light);
    this.scene.add(group);
    this.combatAnimations.push({ type: "enemyMelee", mesh: group, age: 0, maxAge: 0.3 }); 
  }

  private spawnBladeStorm(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 1, z);
    const mat = new THREE.MeshBasicMaterial({ color: 0xff4400, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
    for(let i=0; i<4; i++) {
        const geo = new THREE.TorusGeometry(1.5, 0.1 + Math.random()*0.1, 8, 24);
        const mesh = new THREE.Mesh(geo, mat);
        mesh.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.5; mesh.rotation.y = (Math.random() - 0.5) * 0.5;
        group.add(mesh);
    }
    const light = new THREE.PointLight(0xff4400, 4, 10);
    group.add(light);
    this.scene.add(group);
    this.combatAnimations.push({ type: "bladeStorm", mesh: group, age: 0, maxAge: 0.7 });
    this.shakeTrauma = 1.0;
  }

  private spawnVoidExecute(x: number, z: number, marks: number) {
    const group = new THREE.Group();
    group.position.set(x, 1, z);
    const outerGeo = new THREE.IcosahedronGeometry(2.5 + marks * 0.5, 1);
    const outerMat = new THREE.MeshBasicMaterial({ color: 0x8800ff, wireframe: true, transparent: true, opacity: 0.8 });
    const outer = new THREE.Mesh(outerGeo, outerMat); outer.userData.isOuter = true; group.add(outer);

    const innerGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({ color: 0x1a0033, transparent: true, opacity: 1 });
    const inner = new THREE.Mesh(innerGeo, innerMat); inner.userData.isInner = true; group.add(inner);
    
    const light = new THREE.PointLight(0x8800ff, 4, 12); group.add(light);
    this.scene.add(group);
    this.combatAnimations.push({ type: "voidExecute", mesh: group, age: 0, maxAge: 0.6 });
    this.shakeTrauma = Math.min(0.5 + (marks * 0.4), 2.5); 
  }

  private spawnMeteor(x: number, z: number) {
    const group = new THREE.Group();
    const geo = new THREE.IcosahedronGeometry(1.2, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0xff3300, wireframe: false });
    const mesh = new THREE.Mesh(geo, mat); group.add(mesh);
    const light = new THREE.PointLight(0xffaa00, 5, 20); group.add(light);
    const startX = x + 15; const startY = 25; const startZ = z + 10;
    group.position.set(startX, startY, startZ);
    this.scene.add(group);
    this.combatAnimations.push({ type: "meteor", mesh: group, age: 0, maxAge: 0.8, start: new THREE.Vector3(startX, startY, startZ), end: new THREE.Vector3(x, 0, z) });
  }

  private spawnEarthquake(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0.1, z);
    const mat = new THREE.MeshBasicMaterial({ color: 0x885533, transparent: true, wireframe: true });
    for(let i=0; i<3; i++) {
        const geo = new THREE.TorusGeometry(1 + i*1.5, 0.2, 8, 24);
        const mesh = new THREE.Mesh(geo, mat); mesh.rotation.x = Math.PI / 2; mesh.userData.ringIndex = i; group.add(mesh);
    }
    this.scene.add(group);
    this.combatAnimations.push({ type: "earthquake", mesh: group, age: 0, maxAge: 1.0 });
    this.shakeTrauma = 1.2;
  }

  private spawnHealAura(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0, z);
    const geo = new THREE.CylinderGeometry(1.5, 1.5, 4, 16, 1, true);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.6, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(geo, mat); mesh.position.y = 2; group.add(mesh);
    const light = new THREE.PointLight(0x00ffaa, 3, 10); light.position.y = 2; group.add(light);
    this.scene.add(group);
    this.combatAnimations.push({ type: "healAura", mesh: group, age: 0, maxAge: 0.8 });
  }

  private spawnRoot(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 0.5, z);
    const geo = new THREE.BoxGeometry(0.8, 1, 0.8);
    const mat = new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.7 });
    for(let i=0; i<4; i++) {
        const mesh = new THREE.Mesh(geo, mat);
        mesh.position.set((Math.random()-0.5)*1.5, (Math.random()-0.5)*0.5, (Math.random()-0.5)*1.5);
        mesh.rotation.set(Math.random(), Math.random(), Math.random());
        group.add(mesh);
    }
    this.scene.add(group);
    this.combatAnimations.push({ type: "root", mesh: group, age: 0, maxAge: 2.8 }); 
  }

  private spawnStun(x: number, z: number) {
    const group = new THREE.Group();
    group.position.set(x, 2.5, z);
    const geo = new THREE.OctahedronGeometry(0.3);
    const mat = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    for(let i=0; i<3; i++) {
        const mesh = new THREE.Mesh(geo, mat);
        mesh.userData.angle = (i / 3) * Math.PI * 2;
        group.add(mesh);
    }
    this.scene.add(group);
    this.combatAnimations.push({ type: "stun", mesh: group, age: 0, maxAge: 1.8 });
  }

  private disposeHierarchy(node: THREE.Object3D) {
    node.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
                if (Array.isArray(child.material)) child.material.forEach(m => m.dispose());
                else child.material.dispose();
            }
        }
        if (child instanceof THREE.PointLight) child.dispose();
    });
  }

  private processCombatAnimations(dt: number) {
    for (let i = this.combatAnimations.length - 1; i >= 0; i--) {
      const anim = this.combatAnimations[i];
      anim.age += dt;
      const progress = anim.age / anim.maxAge;

      if (anim.type === "lunge" && anim.end) {
          let offset: THREE.Vector3;
          if (progress < 0.3) {
              const ease = progress / 0.3;
              offset = new THREE.Vector3().copy(anim.end).multiplyScalar(ease);
          } else {
              const ease = 1 - ((progress - 0.3) / 0.7);
              offset = new THREE.Vector3().copy(anim.end).multiplyScalar(ease);
          }

          if (anim.playerId) {
              const vis = this.playerVisuals.get(anim.playerId);
              if (vis) vis.lungeOffset.copy(offset);
          } else if (anim.enemyId) {
              const vis = this.enemyVisuals.get(anim.enemyId);
              if (vis) vis.lungeOffset.copy(offset);
          }
      } else if (anim.type === "text") {
        anim.mesh.position.y += dt * 2.5; 
        const scale = 3 + Math.sin(progress * Math.PI) * 1.5; 
        anim.mesh.scale.set(scale, scale * 0.5, 1);
        (anim.mesh as THREE.Sprite).material.opacity = 1 - progress; 

      } else if (anim.type === "projectile" && anim.start && anim.end) {
        anim.mesh.position.lerpVectors(anim.start, anim.end, progress);
        anim.mesh.rotation.x += dt * 15; anim.mesh.rotation.y += dt * 20;

        if (Math.random() > 0.4) {
            const tGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            const tMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true });
            const tMesh = new THREE.Mesh(tGeo, tMat);
            tMesh.position.copy(anim.mesh.position);
            tMesh.position.x += (Math.random()-0.5) * 0.4; tMesh.position.y += (Math.random()-0.5) * 0.4; tMesh.position.z += (Math.random()-0.5) * 0.4;
            tMesh.rotation.set(Math.random()*Math.PI, Math.random()*Math.PI, 0);
            this.scene.add(tMesh);
            this.combatAnimations.push({ type: "trail", mesh: tMesh, age: 0, maxAge: 0.3 });
        }

      } else if (anim.type === "trail") {
        const mesh = anim.mesh as THREE.Mesh; const s = 1 - progress; mesh.scale.set(s, s, s);
        (mesh.material as THREE.Material).opacity = 1 - progress;

      } else if (anim.type === "sparks") {
        const group = anim.mesh as THREE.Group;
        group.children.forEach(child => {
            const mesh = child as THREE.Mesh;
            const v = mesh.userData.velocity as THREE.Vector3;
            v.y -= dt * 25; 
            mesh.position.addScaledVector(v, dt);
            mesh.rotation.x += dt * 10; mesh.rotation.y += dt * 10;
            (mesh.material as THREE.Material).opacity = 1 - progress;
        });

      } else if (anim.type === "meteor" && anim.start && anim.end) {
        anim.mesh.position.lerpVectors(anim.start, anim.end, Math.pow(progress, 2)); 
        anim.mesh.rotation.x += dt * 10;
        if (progress >= 0.95 && !(anim.mesh as any).userData.impacted) {
             (anim.mesh as any).userData.impacted = true;
             this.shakeTrauma = 1.5;
             this.spawnSparks(anim.end.x, 1, anim.end.z, 0xff3300, 30);
        }

      } else if (anim.type === "earthquake") {
        const group = anim.mesh as THREE.Group;
        group.children.forEach(child => {
            const mesh = child as THREE.Mesh; const rIdx = mesh.userData.ringIndex;
            const wave = Math.max(0, Math.sin((progress * Math.PI * 3) - (rIdx * 1.5)));
            mesh.position.y = wave * 0.8;
            (mesh.material as THREE.Material).opacity = 1 - progress;
        });

      } else if (anim.type === "healAura") {
        const group = anim.mesh as THREE.Group;
        const scale = 1 + progress * 0.5; group.scale.set(scale, 1, scale);
        group.children.forEach(c => {
            if (c instanceof THREE.Mesh) (c.material as THREE.Material).opacity = (1 - progress) * 0.6;
            if (c instanceof THREE.PointLight) c.intensity = (1 - progress) * 3;
        });

      } else if (anim.type === "meleeHit") {
        const group = anim.mesh as THREE.Group;
        const scale = 1 + progress * 2.5; group.scale.set(scale, scale, scale);
        group.children.forEach(child => {
            if (child instanceof THREE.Mesh) (child.material as THREE.Material).opacity = 1 - Math.pow(progress, 2);
            if (child instanceof THREE.PointLight) child.intensity = (1 - progress) * 2;
        });
        
      } else if (anim.type === "enemyMelee") {
        const group = anim.mesh as THREE.Group;
        const scale = 1 + progress * 2.0; group.scale.set(scale, scale, scale);
        group.children.forEach(child => {
            if (child instanceof THREE.Mesh) (child.material as THREE.Material).opacity = 1 - Math.pow(progress, 2);
            if (child instanceof THREE.PointLight) child.intensity = (1 - progress) * 2;
        });
        
      } else if (anim.type === "bladeStorm") {
        const group = anim.mesh as THREE.Group;
        const scale = 1 + progress * 2.0; group.scale.set(scale, 1 + progress * 0.5, scale); 
        group.children.forEach((child, idx) => {
            if (child instanceof THREE.Mesh) {
                child.rotation.z += dt * (20 + idx * 5); 
                (child.material as THREE.Material).opacity = 1 - Math.pow(progress, 3);
            }
            if (child instanceof THREE.PointLight) child.intensity = (1 - progress) * 4;
        });

      } else if (anim.type === "voidExecute") {
        const group = anim.mesh as THREE.Group;
        group.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
                if (child.userData.isOuter) {
                    const s = Math.max(0.01, 1 - progress * 2);
                    child.scale.set(s, s, s); child.rotation.y -= dt * 8;
                    (child.material as THREE.Material).opacity = 1 - progress;
                } else if (child.userData.isInner) {
                    const s = 1 + Math.pow(progress, 3) * 15; child.scale.set(s, s, s);
                    (child.material as THREE.Material).opacity = 1 - progress;
                }
            }
            if (child instanceof THREE.PointLight) child.intensity = (1 - progress) * 4;
        });
        
      } else if (anim.type === "root") {
        const scale = 1 - (progress * 0.3); 
        anim.mesh.scale.set(scale, scale, scale);
        
      } else if (anim.type === "stun") {
        const group = anim.mesh as THREE.Group;
        group.children.forEach(child => {
            child.userData.angle += dt * 4;
            child.position.x = Math.cos(child.userData.angle) * 0.8;
            child.position.z = Math.sin(child.userData.angle) * 0.8;
            child.rotation.x += dt * 2;
            child.rotation.y += dt * 2;
        });
      }

      if (anim.age >= anim.maxAge) {
        this.scene.remove(anim.mesh);
        this.disposeHierarchy(anim.mesh);
        this.combatAnimations.splice(i, 1);
      }
    }
  }

  // ==========================================

  private createNameLabel(text: string) {
    const canvas = document.createElement("canvas"); canvas.dataset.labelText = text; const ctx = canvas.getContext("2d")!;
    ctx.font = "bold 28px Arial"; canvas.width = Math.ceil(ctx.measureText(text).width) + 32; canvas.height = 48;
    ctx.font = "bold 28px Arial"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.fillStyle = "rgba(0, 0, 0, 0.75)"; ctx.beginPath(); ctx.roundRect(0, 0, canvas.width, canvas.height, 12); ctx.fill();
    
    if (text.includes("🔮")) {
        const parts = text.split("🔮");
        ctx.fillStyle = "#ffffff"; ctx.fillText(parts[0], canvas.width / 2 - 20, canvas.height / 2);
        ctx.fillStyle = "#aa00ff"; ctx.fillText("🔮" + parts[1], canvas.width / 2 + ctx.measureText(parts[0]).width / 2 - 10, canvas.height / 2);
    } else {
        ctx.fillStyle = "#ffffff"; ctx.fillText(text, canvas.width / 2, canvas.height / 2);
    }

    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(canvas), transparent: true, depthWrite: false }));
    sprite.scale.set(3.2, 1, 1); return sprite;
  }

  addPlayer(id: string, isMe: boolean, name = isMe ? "You" : "Player") {
    if (this.playerVisuals.has(id)) return;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2, 1.4), new THREE.MeshStandardMaterial({ color: isMe ? 0xff4444 : 0x22cc66, roughness: 0.4 }));
    mesh.position.set(0, 1, 0); mesh.castShadow = true; mesh.receiveShadow = true;
    const labelSprite = this.createNameLabel(name); labelSprite.position.set(0, 3.2, 0); mesh.add(labelSprite);
    
    this.scene.add(mesh); 
    this.playerMeshes.set(id, mesh); 
    
    this.playerVisuals.set(id, { 
        mesh, labelSprite, 
        targetPosition: new THREE.Vector3(0, 1, 0), 
        basePosition: new THREE.Vector3(0, 1, 0),
        lungeOffset: new THREE.Vector3(0, 0, 0),
        flashTimer: 0 
    });
  }

  removePlayer(id: string) {
    const visual = this.playerVisuals.get(id); if (!visual) return;
    this.scene.remove(visual.mesh); this.playerVisuals.delete(id); this.playerMeshes.delete(id);
  }

  updatePlayer(id: string, x: number, y: number, name?: string) {
    const visual = this.playerVisuals.get(id); if (visual) visual.targetPosition.set(x, 1, y);
  }

  addEnemy(id: string, name = "Enemy") {
    if (this.enemyVisuals.has(id)) return;
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.6, 1.4), new THREE.MeshStandardMaterial({ color: 0xffdd33, roughness: 0.3 }));
    mesh.position.set(0, 0.8, 0); mesh.castShadow = true; mesh.receiveShadow = true;
    
    const labelSprite = this.createNameLabel(name); labelSprite.position.set(0, 2.6, 0); mesh.add(labelSprite);
    
    const telegraphMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.6, depthWrite: false }));
    telegraphMesh.rotation.x = -Math.PI / 2;
    telegraphMesh.position.y = 0.04;
    telegraphMesh.visible = false; 
    this.scene.add(telegraphMesh); 
    
    this.scene.add(mesh); 
    this.enemyMeshes.set(id, mesh); 
    
    this.enemyVisuals.set(id, { 
        mesh, labelSprite, 
        targetPosition: new THREE.Vector3(0, 0.8, 0), 
        basePosition: new THREE.Vector3(0, 0.8, 0),
        lungeOffset: new THREE.Vector3(0, 0, 0),
        telegraphMesh, flashTimer: 0 
    });
  }

  removeEnemy(id: string) {
    const visual = this.enemyVisuals.get(id); if (!visual) return;
    this.scene.remove(visual.mesh);
    this.scene.remove(visual.telegraphMesh);
    (visual.telegraphMesh.material as THREE.Material).dispose();
    visual.telegraphMesh.geometry.dispose();
    this.enemyVisuals.delete(id); this.enemyMeshes.delete(id);
  }

  updateEnemy(id: string, x: number, y: number, name: string, action: string, attackRadius: number, targetX: number, targetY: number) {
    const visual = this.enemyVisuals.get(id); if (!visual) return;
    visual.targetPosition.set(x, 0.8, y);
    
    if (action === "windup") { 
      visual.telegraphMesh.visible = true; 
      visual.telegraphMesh.position.set(targetX, 0.04, targetY);
      visual.telegraphMesh.scale.set(attackRadius*2 + 1, attackRadius*2 + 1, 1);
    } 
    else { 
      visual.telegraphMesh.visible = false; 
    }

    if (name && visual.labelSprite.material instanceof THREE.SpriteMaterial) {
      const currentCanvas = visual.labelSprite.material.map?.image as HTMLCanvasElement;
      if (currentCanvas?.dataset?.labelText !== name) {
        visual.mesh.remove(visual.labelSprite);
        visual.labelSprite.material.map?.dispose(); visual.labelSprite.material.dispose();
        visual.labelSprite = this.createNameLabel(name); visual.labelSprite.position.set(0, 2.6, 0); visual.mesh.add(visual.labelSprite);
      }
    }
  }

  private updateInterpolatedEntities(dt: number) {
    for (const visual of this.playerVisuals.values()) {
      const dx = visual.targetPosition.x - visual.basePosition.x; 
      const dz = visual.targetPosition.z - visual.basePosition.z;
      
      if (Math.abs(dx) > 0.01 || Math.abs(dz) > 0.01) visual.mesh.rotation.y = Math.atan2(dx, dz);
      
      visual.basePosition.x += dx * 0.3; 
      visual.basePosition.z += dz * 0.3;
      visual.basePosition.y = 1.0 + Math.sin(Math.min(Math.sqrt(dx * dx + dz * dz), 1) * Math.PI) * 1.2;
      
      let jitterX = 0, jitterZ = 0;
      if (visual.flashTimer > 0) {
          visual.flashTimer -= dt;
          (visual.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0xffffff);
          jitterX = (Math.random() - 0.5) * 0.3; jitterZ = (Math.random() - 0.5) * 0.3;
      } else {
          (visual.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
      }
      
      visual.mesh.position.x = visual.basePosition.x + visual.lungeOffset.x + jitterX;
      visual.mesh.position.y = visual.basePosition.y;
      visual.mesh.position.z = visual.basePosition.z + visual.lungeOffset.z + jitterZ;
    }

    for (const visual of this.enemyVisuals.values()) {
      const dx = visual.targetPosition.x - visual.basePosition.x; 
      const dz = visual.targetPosition.z - visual.basePosition.z;
      
      if (visual.telegraphMesh.visible) {
          const tdx = visual.telegraphMesh.position.x - visual.basePosition.x;
          const tdz = visual.telegraphMesh.position.z - visual.basePosition.z;
          if (Math.abs(tdx) > 0.01 || Math.abs(tdz) > 0.01) visual.mesh.rotation.y = Math.atan2(tdx, tdz);
      } else {
          if (Math.abs(dx) > 0.01 || Math.abs(dz) > 0.01) visual.mesh.rotation.y = Math.atan2(dx, dz);
      }
      
      visual.basePosition.x += dx * 0.3; 
      visual.basePosition.z += dz * 0.3;
      visual.basePosition.y = 0.8 + Math.sin(Math.min(Math.sqrt(dx * dx + dz * dz), 1) * Math.PI) * 1.2;
      
      let jitterX = 0, jitterZ = 0;
      if (visual.flashTimer > 0) {
        visual.flashTimer -= dt;
        (visual.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0xffffff);
        jitterX = (Math.random() - 0.5) * 0.3; jitterZ = (Math.random() - 0.5) * 0.3;
      } else {
        (visual.mesh.material as THREE.MeshStandardMaterial).emissive.setHex(0x000000);
      }

      visual.mesh.position.x = visual.basePosition.x + visual.lungeOffset.x + jitterX;
      visual.mesh.position.y = visual.basePosition.y;
      visual.mesh.position.z = visual.basePosition.z + visual.lungeOffset.z + jitterZ;

      if (visual.telegraphMesh.visible && visual.telegraphMesh.material instanceof THREE.Material) {
          visual.telegraphMesh.material.opacity = 0.4 + Math.sin(Date.now() * 0.01) * 0.3;
      }
    }
    
    const pulse = 0.2 + Math.sin(Date.now() * 0.005) * 0.1;
    this.matMove.opacity = pulse;
  }

  private renderFogOfWar() {
    if (!this.localPlayerId) return;
    const myVisual = this.playerVisuals.get(this.localPlayerId); if (!myVisual) return;
    const px = myVisual.mesh.position.x; const pz = myVisual.mesh.position.z;
    const cx = ((px + 50) / 100) * 1024; const cy = ((pz + 50) / 100) * 1024;
    const canvasRadius = (this.VISION_RADIUS / 100) * 1024;

    this.fogCtx.globalCompositeOperation = "destination-out";
    const gradient = this.fogCtx.createRadialGradient(cx, cy, 0, cx, cy, canvasRadius);
    gradient.addColorStop(0, "rgba(0, 0, 0, 1)"); gradient.addColorStop(0.7, "rgba(0, 0, 0, 1)"); gradient.addColorStop(1, "rgba(0, 0, 0, 0)");   
    this.fogCtx.fillStyle = gradient; this.fogCtx.beginPath(); this.fogCtx.arc(cx, cy, canvasRadius, 0, Math.PI * 2); this.fogCtx.fill();
    this.fogTexture.needsUpdate = true;

    for (const enemyVisual of this.enemyVisuals.values()) enemyVisual.mesh.visible = myVisual.mesh.position.distanceTo(enemyVisual.mesh.position) <= this.VISION_RADIUS;
    
    for (const itemGroup of this.lootVisuals.values()) itemGroup.visible = myVisual.mesh.position.distanceTo(itemGroup.position) <= this.VISION_RADIUS + 2;
    
    this.dungeonPortalMesh.visible = myVisual.mesh.position.distanceTo(this.dungeonPortalMesh.position) <= this.VISION_RADIUS + 5; 
  }

  updateCameraFollow(myId: string, activeEnemyId?: string) {
    this.localPlayerId = myId; let targetX = 0, targetZ = 0;
    if (activeEnemyId && this.enemyVisuals.has(activeEnemyId)) {
      const visual = this.enemyVisuals.get(activeEnemyId)!; targetX = visual.mesh.position.x; targetZ = visual.mesh.position.z;
    } else {
      const visual = this.playerVisuals.get(myId); if (!visual) return; targetX = visual.mesh.position.x; targetZ = visual.mesh.position.z;
    }

    if (!this.cameraInitialized) {
      this.controls.target.set(targetX, 0, targetZ); this.camera.position.set(targetX, 25, targetZ + 20); this.cameraInitialized = true;
    } else {
      const followSpeed = 0.08;
      this.controls.target.x += (targetX - this.controls.target.x) * followSpeed; this.controls.target.z += (targetZ - this.controls.target.z) * followSpeed;
      this.camera.position.x += (targetX - this.controls.target.x) * followSpeed; this.camera.position.z += (targetZ - this.controls.target.z) * followSpeed;
    }
    this.controls.update(); 
  }

  private onResize = () => { this.camera.aspect = window.innerWidth / window.innerHeight; this.camera.updateProjectionMatrix(); this.renderer.setSize(window.innerWidth, window.innerHeight); };
  private lastTime = Date.now();

  private animate = () => {
    this.animationId = requestAnimationFrame(this.animate);
    const now = Date.now(); const dt = (now - this.lastTime) / 1000; this.lastTime = now;

    this.updateInterpolatedEntities(dt);
    this.renderFogOfWar();
    this.processCombatAnimations(dt);

    this.dungeonPortalMesh.children[3].rotation.z -= dt;

    if (this.shakeTrauma > 0) {
      const shake = this.shakeTrauma * this.shakeTrauma; 
      this.camera.position.x += (Math.random() - 0.5) * shake * 2;
      this.camera.position.y += (Math.random() - 0.5) * shake * 2;
      this.camera.position.z += (Math.random() - 0.5) * shake * 2;
      this.shakeTrauma -= dt * 2.5; 
      if (this.shakeTrauma < 0) this.shakeTrauma = 0;
    }

    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    cancelAnimationFrame(this.animationId); window.removeEventListener("resize", this.onResize);
    this.trunkGeo.dispose(); this.trunkMat.dispose(); this.leavesGeo.dispose(); this.leavesMat.dispose();
    this.chestBaseGeo.dispose(); this.chestLidGeo.dispose(); this.chestWoodMat.dispose(); this.chestGoldMat.dispose();
    this.renderer.dispose(); if (this.renderer.domElement.parentElement === this.container) this.container.removeChild(this.renderer.domElement);
  }
}