import * as THREE from "three";
import { getTerrainHeight } from "./TownScene";

export type ParticleSystem = {
  mesh: THREE.Points;
  positions: Float32Array;
  velocities: Float32Array;
  maxHeight?: number; 
};

export type CasinoAnims = {
  rouletteWheel: THREE.Mesh | null;
  rouletteTimer: number;
  bjCards: THREE.Mesh[];
  bjTimer: number;
  coinMesh: THREE.Mesh | null;
  coinTimer: number;
  slotArm: THREE.Group | null;
  slotTimer: number;
};

export type NPCBuilding = {
    x: number;
    z: number;
    width: number;
    depth: number;
    roof: THREE.Object3D;
};

// ==========================================
// PERFORMANCE: GLOBAL CACHES & UNIFORMS
// ==========================================
// A single shared time object so we don't need per-mesh onBeforeRender loops
const sharedTimeUniform = { value: 0 };

const geoCache = new Map<string, THREE.BufferGeometry>();
const matCache = new Map<string, THREE.Material>();

let cachedAuroraMat: THREE.MeshBasicMaterial | null = null;

function getGeo(key: string, createFn: () => THREE.BufferGeometry): THREE.BufferGeometry {
    if (!geoCache.has(key)) geoCache.set(key, createFn());
    return geoCache.get(key)!;
}

function getMat(key: string, createFn: () => THREE.Material): THREE.Material {
    if (!matCache.has(key)) matCache.set(key, createFn());
    return matCache.get(key)!;
}

export class TownEnvironment {
  private scene: THREE.Scene;
  private waterfallParticlesList: ParticleSystem[];
  private fairyParticlesList: ParticleSystem[];
  private auroraMeshes: THREE.Mesh[];
  private npcVillageBuildings: NPCBuilding[];
  private fireLights: THREE.PointLight[];
  private fireParticlesList: ParticleSystem[];
  private emberParticlesList: ParticleSystem[];
  private casinoAnims: CasinoAnims;
  
  private createNameLabel: (text: string) => THREE.Sprite;
  private onTavernWallsCreated: (walls: THREE.Group) => void;

  // Master group to handle the single time update
  private environmentRoot = new THREE.Group();

  constructor(
      scene: THREE.Scene,
      waterfallParticlesList: ParticleSystem[],
      fairyParticlesList: ParticleSystem[],
      auroraMeshes: THREE.Mesh[],
      npcVillageBuildings: NPCBuilding[],
      fireLights: THREE.PointLight[],
      fireParticlesList: ParticleSystem[],
      emberParticlesList: ParticleSystem[],
      casinoAnims: CasinoAnims,
      createNameLabel: (text: string) => THREE.Sprite,
      onTavernWallsCreated: (walls: THREE.Group) => void
  ) {
      this.scene = scene;
      this.waterfallParticlesList = waterfallParticlesList;
      this.fairyParticlesList = fairyParticlesList;
      this.auroraMeshes = auroraMeshes;
      this.npcVillageBuildings = npcVillageBuildings;
      this.fireLights = fireLights;
      this.fireParticlesList = fireParticlesList;
      this.emberParticlesList = emberParticlesList;
      this.casinoAnims = casinoAnims;
      this.createNameLabel = createNameLabel;
      this.onTavernWallsCreated = onTavernWallsCreated;

      // PERFORMANCE: One single callback to update all shaders in the town
      this.environmentRoot.onBeforeRender = () => {
          sharedTimeUniform.value = performance.now() / 1000;
      };
      this.scene.add(this.environmentRoot);
  }

  public createElvenKingdom(xPos: number, zPos: number) {
      const elvenGroup = new THREE.Group();
      
      const marbleMat = getMat('elven_marble', () => new THREE.MeshStandardMaterial({ color: 0xeef5ff, roughness: 0.2, metalness: 0.1 }));
      const glowingWaterMat = getMat('elven_water', () => new THREE.MeshStandardMaterial({ color: 0x00ffff, transparent: true, opacity: 0.8, emissive: 0x0088aa, roughness: 0.1 }));

      const platformGeo = getGeo('elven_plat', () => new THREE.CylinderGeometry(50, 52, 2, 32));
      const platform = new THREE.Mesh(platformGeo, marbleMat);
      platform.position.y = 1;
      platform.receiveShadow = true;
      platform.castShadow = true;
      elvenGroup.add(platform);

      const poolGeo = getGeo('elven_pool', () => new THREE.CylinderGeometry(40, 40, 2.2, 32));
      const pool = new THREE.Mesh(poolGeo, glowingWaterMat);
      pool.position.y = 1.1;
      elvenGroup.add(pool);

      // --- THE GREAT AETHELGARD ---
      const aethelgardGroup = new THREE.Group();
      
      const barkMat = getMat('aethel_bark', () => new THREE.MeshStandardMaterial({ color: 0xb87333, emissive: 0x331100, roughness: 0.9 }));
      const leafMat = getMat('aethel_leaf', () => new THREE.MeshStandardMaterial({ color: 0x22ffaa, emissive: 0x004422, roughness: 0.8 }));
      const platMat = getMat('aethel_wood', () => new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 1.0 }));

      const trunkGeo = getGeo('aethel_trunk', () => new THREE.CylinderGeometry(6, 12, 60, 12));
      const trunk = new THREE.Mesh(trunkGeo, barkMat);
      trunk.position.y = 30;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      aethelgardGroup.add(trunk);

      // PERFORMANCE: Removed `trunkUpLight`

      const rootGeo = getGeo('aethel_root', () => new THREE.ConeGeometry(3, 15, 6));
      for (let i = 0; i < 8; i++) {
          const root = new THREE.Mesh(rootGeo, barkMat);
          const angle = (Math.PI * 2 / 8) * i;
          root.position.set(Math.cos(angle) * 10, 5, Math.sin(angle) * 10);
          root.rotation.x = Math.PI / 4;
          root.rotation.y = -angle + Math.PI/2;
          root.castShadow = true;
          aethelgardGroup.add(root);
      }

      const canopyGroup = new THREE.Group();
      canopyGroup.position.y = 60;
      // PERFORMANCE: Replaced canopy point lights with high emissive leaf clusters
      const glowingLeafMat = getMat('aethel_leaf_glow', () => new THREE.MeshStandardMaterial({ color: 0x44ffaa, emissive: 0x00aa55, emissiveIntensity: 1.5, roughness: 0.8 }));
      
      for (let i = 0; i < 15; i++) {
          const leafSize = 8 + Math.random() * 6;
          const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(leafSize, 1), i % 3 === 0 ? glowingLeafMat : leafMat);
          const angle = Math.random() * Math.PI * 2;
          const radius = Math.random() * 20;
          const height = (Math.random() - 0.5) * 15;
          leaf.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
          canopyGroup.add(leaf);
      }
      const topLeaf = new THREE.Mesh(new THREE.IcosahedronGeometry(18, 1), leafMat);
      topLeaf.position.y = 10;
      canopyGroup.add(topLeaf);
      aethelgardGroup.add(canopyGroup);

      const numSteps = 60;
      const crystalMat = getMat('aethel_crystal', () => new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 3.0, roughness: 0.1 }));
      const stepGeo = getGeo('aethel_step', () => new THREE.BoxGeometry(4, 0.5, 2));
      const crystalGeo = getGeo('aethel_crys', () => new THREE.OctahedronGeometry(0.4));

      for(let i=0; i<numSteps; i++) {
          const step = new THREE.Mesh(stepGeo, platMat);
          const angle = i * 0.3;
          const height = i * 0.6 + 2; 
          const radius = 12 - (height / 60) * 6 + 1; 
          step.position.set(Math.cos(angle) * radius, height, Math.sin(angle) * radius);
          step.rotation.y = -angle;
          step.castShadow = true;
          
          if (i % 8 === 0) {
              const crystal = new THREE.Mesh(crystalGeo, crystalMat);
              crystal.position.set(1.5, 1.0, 0);
              // PERFORMANCE: Removed heavy point lights, relying entirely on emissive intensity
              step.add(crystal);
          }
          aethelgardGroup.add(step);
      }

      const pAngles = [0, Math.PI*(2/3), Math.PI*(4/3)];
      const platGeo = getGeo('aethel_plat_geo', () => new THREE.CylinderGeometry(6, 6, 1, 8));
      const houseMat = getMat('aethel_house', () => new THREE.MeshStandardMaterial({color: 0x221100, emissive: 0x331100, emissiveIntensity: 0.8})); // Emissive fakes the internal lighting
      const houseGeo = getGeo('aethel_house_geo', () => new THREE.BoxGeometry(4, 4, 4));
      const roofMat = getMat('aethel_roof', () => new THREE.MeshStandardMaterial({color: 0x448855}));
      const roofGeo = getGeo('aethel_roof_geo', () => new THREE.ConeGeometry(3.5, 3, 4));
      const branchGeo = getGeo('aethel_branch', () => new THREE.CylinderGeometry(1.5, 2.5, 12, 6));

      pAngles.forEach((a, idx) => {
          const pRadius = 14;
          const pHeight = 25 + idx * 5;
          
          const platform = new THREE.Mesh(platGeo, platMat);
          platform.position.set(Math.cos(a)*pRadius, pHeight, Math.sin(a)*pRadius);
          platform.castShadow = true;
          aethelgardGroup.add(platform);

          const house = new THREE.Mesh(houseGeo, houseMat);
          house.position.set(Math.cos(a)*pRadius, pHeight + 2.5, Math.sin(a)*pRadius);
          house.castShadow = true;
          
          const roof = new THREE.Mesh(roofGeo, roofMat);
          roof.position.set(Math.cos(a)*pRadius, pHeight + 6, Math.sin(a)*pRadius);
          roof.rotation.y = Math.PI / 4;
          
          // PERFORMANCE: Removed warmLight
          aethelgardGroup.add(house, roof);
          
          const branch = new THREE.Mesh(branchGeo, barkMat);
          branch.position.set(Math.cos(a)*(pRadius/2), pHeight - 2, Math.sin(a)*(pRadius/2));
          branch.lookAt(platform.position);
          branch.rotateX(Math.PI/2);
          aethelgardGroup.add(branch);
      });
      elvenGroup.add(aethelgardGroup);

      const archMat = getMat('elven_arch', () => new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 }));
      const archPillar = getGeo('elven_arch_p', () => new THREE.CylinderGeometry(0.8, 1, 12));
      const archTopGeo = getGeo('elven_arch_t', () => new THREE.TorusGeometry(15, 0.8, 16, 50, Math.PI));

      for(let i = 0; i < 4; i++) {
          const archGroup = new THREE.Group();
          const pillar1 = new THREE.Mesh(archPillar, archMat);
          pillar1.position.set(-15, 6, 0);
          const pillar2 = new THREE.Mesh(archPillar, archMat);
          pillar2.position.set(15, 6, 0);
          
          const archTop = new THREE.Mesh(archTopGeo, archMat);
          archTop.position.set(0, 12, 0);
          
          archGroup.add(pillar1, pillar2, archTop);
          archGroup.rotation.y = (Math.PI / 4) * i;
          elvenGroup.add(archGroup);
      }

      // --- WATERFALLS ---
      const dropHeight = 40;
      const waterfallGeo = getGeo('waterfall_base', () => new THREE.PlaneGeometry(15, dropHeight));
      
      // We create ONE shader material for all waterfalls
      const wMat = getMat('waterfall_shader', () => new THREE.ShaderMaterial({
          uniforms: {
              time: sharedTimeUniform,
              color: { value: new THREE.Color(0x88ffff) },
              dropHeight: { value: dropHeight }
          },
          vertexShader: `
              uniform float time;
              uniform float dropHeight;
              attribute vec3 velocity;
              varying float vAlpha;
              void main() {
                  float life = fract(time * velocity.y + position.x * 5.0);
                  vAlpha = 1.0 - life;
                  vec3 pos = position;
                  pos.y -= life * dropHeight;
                  pos.z += life * velocity.z * 5.0 + 50.0;
                  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
                  gl_PointSize = 40.0 * (1.0 - life) * (10.0 / -mvPos.z);
                  gl_Position = projectionMatrix * mvPos;
              }
          `,
          fragmentShader: `
              uniform vec3 color;
              varying float vAlpha;
              void main() {
                  float d = distance(gl_PointCoord, vec2(0.5));
                  if(d > 0.5) discard;
                  gl_FragColor = vec4(color, vAlpha * (1.0 - (d * 2.0)));
              }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
      }));

      const cardinalAngles = [0, Math.PI / 2, Math.PI, -Math.PI / 2];
      cardinalAngles.forEach((angle) => {
          const fallGroup = new THREE.Group();
          
          const fallMesh = new THREE.Mesh(waterfallGeo, glowingWaterMat);
          fallMesh.position.set(0, -dropHeight / 2 + 2, 49);
          fallMesh.rotation.y = Math.PI; 
          fallGroup.add(fallMesh);
          
          const wCount = 120; // PERFORMANCE: 300 -> 120
          const wGeo = new THREE.BufferGeometry();
          const wPos = new Float32Array(wCount * 3);
          const wVel = new Float32Array(wCount * 3);
          
          for (let j = 0; j < wCount; j++) {
              wPos[j*3] = (Math.random() - 0.5) * 14; 
              wPos[j*3+1] = 0; 
              wPos[j*3+2] = 0; 
              wVel[j*3] = 0;
              wVel[j*3+1] = 0.5 + Math.random() * 1.5; 
              wVel[j*3+2] = (Math.random() - 0.5) * 2.0; 
          }
          wGeo.setAttribute('position', new THREE.BufferAttribute(wPos, 3));
          wGeo.setAttribute('velocity', new THREE.BufferAttribute(wVel, 3));

          const wMesh = new THREE.Points(wGeo, wMat);
          // PERFORMANCE: No onBeforeRender attached to mesh. Time uniform is shared.
          fallGroup.add(wMesh);
          
          this.waterfallParticlesList.push({ mesh: wMesh, positions: new Float32Array(0), velocities: new Float32Array(0) });

          fallGroup.rotation.y = angle;
          elvenGroup.add(fallGroup);
      });

      // --- FAIRY DUST ---
      const fCount = 150; // PERFORMANCE: 400 -> 150
      const fGeo = new THREE.BufferGeometry();
      const fPos = new Float32Array(fCount * 3);
      const fVel = new Float32Array(fCount * 3);
      
      for(let j=0; j<fCount; j++) {
          fPos[j*3] = (Math.random() - 0.5) * 90;
          fPos[j*3+1] = 2 + Math.random() * 20;
          fPos[j*3+2] = (Math.random() - 0.5) * 90;
          fVel[j*3] = (Math.random() - 0.5) * 2.0;
          fVel[j*3+1] = (Math.random() - 0.5) * 2.0; 
          fVel[j*3+2] = (Math.random() - 0.5) * 2.0;
      }
      fGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
      fGeo.setAttribute('velocity', new THREE.BufferAttribute(fVel, 3));

      const fMat = getMat('fairy_shader', () => new THREE.ShaderMaterial({
          uniforms: {
              time: sharedTimeUniform,
              color: { value: new THREE.Color(0xaaffaa) }
          },
          vertexShader: `
              uniform float time;
              attribute vec3 velocity;
              varying float vAlpha;
              void main() {
                  vec3 pos = position;
                  pos.x += sin(time + velocity.x * 10.0) * 5.0;
                  pos.y += cos(time * 0.5 + velocity.y * 10.0) * 3.0;
                  pos.z += sin(time + velocity.z * 10.0) * 5.0;
                  vAlpha = 0.4 + 0.6 * sin(time * 3.0 + velocity.x * 10.0);
                  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
                  gl_PointSize = 20.0 * (10.0 / -mvPos.z);
                  gl_Position = projectionMatrix * mvPos;
              }
          `,
          fragmentShader: `
              uniform vec3 color;
              varying float vAlpha;
              void main() {
                  float d = distance(gl_PointCoord, vec2(0.5));
                  if(d > 0.5) discard;
                  gl_FragColor = vec4(color, vAlpha * (1.0 - (d * 2.0)));
              }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
      }));

      const fMesh = new THREE.Points(fGeo, fMat);
      elvenGroup.add(fMesh);
      this.fairyParticlesList.push({ mesh: fMesh, positions: new Float32Array(0), velocities: new Float32Array(0) });

      // Main Illumination (Reduced from multiple point lights)
      const kingdomLight = new THREE.PointLight(0x00ffff, 3.0, 150);
      kingdomLight.position.set(0, 20, 0);
      elvenGroup.add(kingdomLight);
      
      // PERFORMANCE: Create canvas once and cache the resulting material forever
      if (!cachedAuroraMat) {
          const canvas = document.createElement("canvas");
          canvas.width = 512; canvas.height = 128;
          const ctx = canvas.getContext("2d");
          if (ctx) {
              const grd = ctx.createLinearGradient(0, 0, 0, 128);
              grd.addColorStop(0, "rgba(255, 0, 0, 0)"); 
              grd.addColorStop(0.3, "rgba(255, 0, 0, 0.8)"); 
              grd.addColorStop(0.6, "rgba(255, 255, 0, 0.8)"); 
              grd.addColorStop(1, "rgba(0, 255, 0, 0)"); 
              ctx.fillStyle = grd;
              ctx.fillRect(0, 0, 512, 128);
          }
          cachedAuroraMat = new THREE.MeshBasicMaterial({ 
              map: new THREE.CanvasTexture(canvas), transparent: true, opacity: 0, 
              blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false 
          });
      }

      const auroraGeo = getGeo('aurora_geo', () => new THREE.PlaneGeometry(800, 100, 64, 1));
      for (let i = 0; i < 3; i++) {
          const auroraMesh = new THREE.Mesh(auroraGeo, cachedAuroraMat.clone()); // Need individual opacity manipulation
          auroraMesh.position.set(0, 150, (i - 1) * 200);
          this.auroraMeshes.push(auroraMesh);
          elvenGroup.add(auroraMesh);
      }

      const kingdomLabel = this.createNameLabel("The Elven Kingdom of Aethelgard");
      kingdomLabel.position.set(0, 85, 0);
      kingdomLabel.scale.set(12.0, 2.0, 1.0);
      elvenGroup.add(kingdomLabel);

      elvenGroup.position.set(xPos, getTerrainHeight(xPos, zPos), zPos);
      this.environmentRoot.add(elvenGroup);
  }

  public createNPCVillage(cx: number, cz: number) {
    const villageGroup = new THREE.Group();
    
    // --- MASSIVE DEBUG BEACON ---
    const beaconMat = getMat('beacon_mat', () => new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 }));
    const beacon = new THREE.Mesh(getGeo('beacon_geo', () => new THREE.CylinderGeometry(5, 5, 1000)), beaconMat);
    beacon.position.y = 500; 
    villageGroup.add(beacon);

    const dirtMat = getMat('village_dirt', () => new THREE.MeshStandardMaterial({ color: 0x3d2b1f, roughness: 1.0 }));
    const floor = new THREE.Mesh(getGeo('village_floor', () => new THREE.PlaneGeometry(35, 35)), dirtMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.05; 
    floor.receiveShadow = true;
    villageGroup.add(floor);

    const wallMat = getMat('npc_wall', () => new THREE.MeshStandardMaterial({ color: 0x735b44, roughness: 0.9, side: THREE.DoubleSide }));
    const roofMat = getMat('npc_roof', () => new THREE.MeshStandardMaterial({ color: 0x3a2a1a, roughness: 1.0, side: THREE.DoubleSide }));
    
    const geoBack = getGeo('npc_back', () => new THREE.BoxGeometry(10, 6, 0.5));
    const geoSide = getGeo('npc_side', () => new THREE.BoxGeometry(0.5, 6, 10));
    const geoFront = getGeo('npc_front', () => new THREE.BoxGeometry(3.5, 6, 0.5));
    const geoTop = getGeo('npc_top', () => new THREE.BoxGeometry(3, 2, 0.5));
    const geoRoof = getGeo('npc_roof_geo', () => new THREE.ConeGeometry(8, 5, 4));

    const buildEnterableHouse = (hx: number, hz: number, rot: number) => {
        const houseGroup = new THREE.Group();
        houseGroup.position.set(hx, 0, hz);
        houseGroup.rotation.y = rot;

        const back = new THREE.Mesh(geoBack, wallMat);
        back.position.set(0, 3, -4.75); back.castShadow = true; back.receiveShadow = true; houseGroup.add(back);
        
        const left = new THREE.Mesh(geoSide, wallMat);
        left.position.set(-4.75, 3, 0); left.castShadow = true; left.receiveShadow = true; houseGroup.add(left);
        
        const right = new THREE.Mesh(geoSide, wallMat);
        right.position.set(4.75, 3, 0); right.castShadow = true; right.receiveShadow = true; houseGroup.add(right);

        const frontL = new THREE.Mesh(geoFront, wallMat);
        frontL.position.set(-3.25, 3, 4.75); frontL.castShadow = true; frontL.receiveShadow = true; houseGroup.add(frontL);
        
        const frontR = new THREE.Mesh(geoFront, wallMat);
        frontR.position.set(3.25, 3, 4.75); frontR.castShadow = true; frontR.receiveShadow = true; houseGroup.add(frontR);

        const frontTop = new THREE.Mesh(geoTop, wallMat);
        frontTop.position.set(0, 5, 4.75); frontTop.castShadow = true; frontTop.receiveShadow = true; houseGroup.add(frontTop);

        const roof = new THREE.Mesh(geoRoof, roofMat);
        roof.rotation.y = Math.PI / 4; roof.position.y = 8.5; roof.castShadow = true; houseGroup.add(roof);

        this.npcVillageBuildings.push({ x: cx + hx, z: cz + hz, width: 10, depth: 10, roof: roof });

        return houseGroup;
    };

    villageGroup.add(buildEnterableHouse(0, -10, 0));
    villageGroup.add(buildEnterableHouse(-10, 2, Math.PI / 2));
    villageGroup.add(buildEnterableHouse(10, 2, -Math.PI / 2));

    villageGroup.position.set(cx, getTerrainHeight(cx, cz), cz);
    this.environmentRoot.add(villageGroup);
  }

  public createTowerPerimeter() {
    const mapSize = 5000;
    const wallHeight = 140; 
    const wallThickness = 20;

    const wallMat = getMat('perim_wall', () => new THREE.MeshStandardMaterial({ color: 0x3a404a, roughness: 0.9, metalness: 0.2 }));
    const eGeoX = getGeo('perim_geoX', () => new THREE.BoxGeometry(mapSize + wallThickness * 2, wallHeight, wallThickness));
    const eGeoZ = getGeo('perim_geoZ', () => new THREE.BoxGeometry(wallThickness, wallHeight, mapSize));

    const nWall = new THREE.Mesh(eGeoX, wallMat);
    nWall.position.set(0, wallHeight / 2, -mapSize / 2 - wallThickness / 2); nWall.receiveShadow = true;
    this.environmentRoot.add(nWall);

    const sWall = new THREE.Mesh(eGeoX, wallMat);
    sWall.position.set(0, wallHeight / 2, mapSize / 2 + wallThickness / 2); sWall.receiveShadow = true;
    this.environmentRoot.add(sWall);

    const eWall = new THREE.Mesh(eGeoZ, wallMat);
    eWall.position.set(mapSize / 2 + wallThickness / 2, wallHeight / 2, 0); eWall.receiveShadow = true;
    this.environmentRoot.add(eWall);

    const wWall = new THREE.Mesh(eGeoZ, wallMat);
    wWall.position.set(-mapSize / 2 - wallThickness / 2, wallHeight / 2, 0); wWall.receiveShadow = true;
    this.environmentRoot.add(wWall);

    const pillarGeo = getGeo('perim_pillar', () => new THREE.CylinderGeometry(12, 12, wallHeight, 16));
    const pillarMat = getMat('perim_pillar_mat', () => new THREE.MeshStandardMaterial({ color: 0x2b3038, roughness: 1.0 }));
    const cornerPositions = [ [mapSize/2, -mapSize/2], [-mapSize/2, -mapSize/2], [mapSize/2, mapSize/2], [-mapSize/2, mapSize/2] ];
    
    for (const [px, pz] of cornerPositions) {
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        pillar.position.set(px, wallHeight/2, pz);
        pillar.receiveShadow = true; pillar.castShadow = true;
        this.environmentRoot.add(pillar);
    }

    const ceiling = new THREE.Mesh(getGeo('perim_ceil', () => new THREE.PlaneGeometry(mapSize + wallThickness * 2, mapSize + wallThickness * 2)), getMat('perim_ceil_mat', () => new THREE.MeshStandardMaterial({ color: 0x1a1d24, roughness: 1.0 })));
    ceiling.rotation.x = Math.PI / 2; 
    ceiling.position.y = wallHeight;
    this.environmentRoot.add(ceiling);
  }

  public createTownWall() {
    const radius = 60; 
    const wallHeight = 12;
    const wallThickness = 4;
    const gateWidth = 16;

    const stoneMat = getMat('town_stone', () => new THREE.MeshStandardMaterial({ color: 0x5a6567, roughness: 0.9, metalness: 0.1 }));
    const darkStoneMat = getMat('town_dark_stone', () => new THREE.MeshStandardMaterial({ color: 0x4a5557, roughness: 0.9, metalness: 0.1 }));
    const woodMat = getMat('town_wood', () => new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 1.0 }));

    const sideWallGeo = getGeo('tw_side', () => new THREE.BoxGeometry(wallThickness, wallHeight, radius * 2));
    
    const eastWall = new THREE.Mesh(sideWallGeo, stoneMat);
    eastWall.position.set(radius, wallHeight / 2, 0); eastWall.castShadow = true; eastWall.receiveShadow = true;
    this.environmentRoot.add(eastWall);

    const westWall = new THREE.Mesh(sideWallGeo, stoneMat);
    westWall.position.set(-radius, wallHeight / 2, 0); westWall.castShadow = true; westWall.receiveShadow = true;
    this.environmentRoot.add(westWall);

    const frontWallLen = (radius * 2 - gateWidth) / 2;
    const frontWallGeo = getGeo('tw_front', () => new THREE.BoxGeometry(frontWallLen, wallHeight, wallThickness));

    const addFrontWall = (z: number) => {
      const w1 = new THREE.Mesh(frontWallGeo, stoneMat);
      w1.position.set(-(gateWidth / 2 + frontWallLen / 2), wallHeight / 2, z); w1.castShadow = true; w1.receiveShadow = true;
      this.environmentRoot.add(w1);

      const w2 = new THREE.Mesh(frontWallGeo, stoneMat);
      w2.position.set((gateWidth / 2 + frontWallLen / 2), wallHeight / 2, z); w2.castShadow = true; w2.receiveShadow = true;
      this.environmentRoot.add(w2);
    };

    addFrontWall(-radius); 
    addFrontWall(radius);  

    const towerGeo = getGeo('tw_tower', () => new THREE.CylinderGeometry(5, 6, wallHeight + 4, 8));
    const towerPositions = [ [[radius, radius]], [[-radius, radius]], [[radius, -radius]], [[-radius, -radius]] ];
    for (const pos of towerPositions) {
        const tower = new THREE.Mesh(towerGeo, darkStoneMat);
        tower.position.set(pos[0][0], (wallHeight + 4) / 2, pos[0][1]); tower.castShadow = true; tower.receiveShadow = true;
        this.environmentRoot.add(tower);
    }

    const addGate = (z: number, isNorth: boolean) => {
        const pillarGeo = getGeo('tw_gate_p', () => new THREE.BoxGeometry(6, wallHeight + 2, 6));
        const p1 = new THREE.Mesh(pillarGeo, darkStoneMat);
        p1.position.set(-(gateWidth / 2 + 1), (wallHeight + 2) / 2, z); p1.castShadow = true; p1.receiveShadow = true;
        this.environmentRoot.add(p1);

        const p2 = new THREE.Mesh(pillarGeo, darkStoneMat);
        p2.position.set((gateWidth / 2 + 1), (wallHeight + 2) / 2, z); p2.castShadow = true; p2.receiveShadow = true;
        this.environmentRoot.add(p2);

        const archGeo = getGeo('tw_gate_a', () => new THREE.BoxGeometry(gateWidth + 8, 4, 6));
        const arch = new THREE.Mesh(archGeo, darkStoneMat);
        arch.position.set(0, wallHeight + 2, z); arch.castShadow = true; arch.receiveShadow = true;
        this.environmentRoot.add(arch);

        const doorGeo = getGeo('tw_gate_d', () => new THREE.BoxGeometry(gateWidth / 2, wallHeight - 1, 1));
        
        const doorGroup1 = new THREE.Group();
        doorGroup1.position.set(-gateWidth / 2, 0, z);
        doorGroup1.rotation.y = isNorth ? Math.PI * 0.6 : -Math.PI * 0.6; 
        const d1 = new THREE.Mesh(doorGeo, woodMat);
        d1.position.set(gateWidth / 4, (wallHeight - 1) / 2, 0); d1.castShadow = true;
        doorGroup1.add(d1);
        this.environmentRoot.add(doorGroup1);

        const doorGroup2 = new THREE.Group();
        doorGroup2.position.set(gateWidth / 2, 0, z);
        doorGroup2.rotation.y = isNorth ? -Math.PI * 0.6 : Math.PI * 0.6;
        const d2 = new THREE.Mesh(doorGeo, woodMat);
        d2.position.set(-gateWidth / 4, (wallHeight - 1) / 2, 0); d2.castShadow = true;
        doorGroup2.add(d2);
        this.environmentRoot.add(doorGroup2);
    };

    addGate(-radius, true); 
    addGate(radius, false); 
  }

  public createMarketStall(type: "potion" | "blacksmith" | "food" | "clothing" | "furniture", x: number, z: number, rotation: number) {
    const stallGroup = new THREE.Group();
    
    const woodMat = getMat('stall_wood', () => new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 }));
    const tableMat = getMat('stall_table', () => new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.8 }));
    
    let roofColor = 0xffffff;
    if (type === "potion") roofColor = 0x6622aa; 
    else if (type === "blacksmith") roofColor = 0x222222; 
    else if (type === "food") roofColor = 0xcc3333; 
    else if (type === "clothing") roofColor = 0x22aaff; 
    else if (type === "furniture") roofColor = 0x55aa55; 

    // Don't cache dynamic colored roofs globally without a key
    const roofMat = getMat(`stall_roof_${roofColor}`, () => new THREE.MeshStandardMaterial({ color: roofColor, roughness: 1.0 }));

    const table = new THREE.Mesh(getGeo('stall_table_g', () => new THREE.BoxGeometry(4, 0.3, 2)), tableMat);
    table.position.set(0, 1.2, 0.5); table.castShadow = true; table.receiveShadow = true;
    stallGroup.add(table);

    const postGeo = getGeo('stall_post', () => new THREE.CylinderGeometry(0.15, 0.15, 3.5, 8));
    const postsPositions = [ [-1.8, 1.75, 1.3], [1.8, 1.75, 1.3], [-1.8, 1.75, -0.3], [1.8, 1.75, -0.3] ];
    postsPositions.forEach(pos => {
        const post = new THREE.Mesh(postGeo, woodMat);
        post.position.set(pos[0], pos[1], pos[2]); post.castShadow = true;
        stallGroup.add(post);
    });

    const roof = new THREE.Mesh(getGeo('stall_roof_g', () => new THREE.BoxGeometry(4.4, 0.2, 3.0)), roofMat);
    roof.position.set(0, 3.5, 0.5); roof.rotation.x = -0.2; roof.castShadow = true; roof.receiveShadow = true;
    stallGroup.add(roof);

    const propGroup = new THREE.Group();
    propGroup.position.set(0, 1.4, 0.5); 

    if (type === "potion") {
        const bottleGeo = getGeo('stall_bottle', () => new THREE.CylinderGeometry(0.1, 0.1, 0.4, 8));
        const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xff00ff];
        for (let i = 0; i < 6; i++) {
            const bottleMat = new THREE.MeshStandardMaterial({ color: colors[i % colors.length], emissive: colors[i % colors.length], emissiveIntensity: 0.5, transparent: true, opacity: 0.8 });
            const bottle = new THREE.Mesh(bottleGeo, bottleMat);
            bottle.position.set((Math.random() - 0.5) * 3, 0.2, (Math.random() - 0.5) * 1);
            propGroup.add(bottle);
        }
    } 
    else if (type === "food") {
        const appleGeo = getGeo('stall_apple', () => new THREE.SphereGeometry(0.12, 8, 8));
        const appleMat = getMat('stall_apple_m', () => new THREE.MeshStandardMaterial({ color: 0xff1111, roughness: 0.4 }));
        for (let i = 0; i < 8; i++) {
            const apple = new THREE.Mesh(appleGeo, appleMat);
            apple.position.set(-1 + (Math.random() - 0.5) * 1, 0.1, (Math.random() - 0.5) * 1);
            propGroup.add(apple);
        }
        const breadGeo = getGeo('stall_bread', () => new THREE.BoxGeometry(0.4, 0.2, 0.2));
        const breadMat = getMat('stall_bread_m', () => new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 0.9 }));
        for (let i = 0; i < 4; i++) {
            const bread = new THREE.Mesh(breadGeo, breadMat);
            bread.position.set(1 + (Math.random() - 0.5) * 1, 0.1, (Math.random() - 0.5) * 1);
            bread.rotation.y = Math.random() * Math.PI;
            propGroup.add(bread);
        }
    } 
    else if (type === "blacksmith") {
        const stoneMat = getMat('stall_b_stone', () => new THREE.MeshStandardMaterial({ color: 0x444444, roughness: 0.8 }));
        const anvilBase = new THREE.Mesh(getGeo('stall_anvil_b', () => new THREE.BoxGeometry(0.5, 0.4, 0.4)), stoneMat);
        anvilBase.position.set(-1, 0.2, 0);
        const anvilTop = new THREE.Mesh(getGeo('stall_anvil_t', () => new THREE.BoxGeometry(0.8, 0.3, 0.3)), stoneMat);
        anvilTop.position.set(-1, 0.55, 0);
        propGroup.add(anvilBase); propGroup.add(anvilTop);
        const forge = new THREE.Mesh(getGeo('stall_forge', () => new THREE.BoxGeometry(1.2, 1.2, 1.2)), stoneMat);
        forge.position.set(1, 0.6, -0.2); forge.castShadow = true;
        propGroup.add(forge);
        const forgeLight = new THREE.PointLight(0xff7722, 2.0, 10);
        forgeLight.position.set(1, 0.8, 0.5);
        this.fireLights.push(forgeLight);
        propGroup.add(forgeLight);
        const forgeFireGroup = new THREE.Group();
        forgeFireGroup.position.set(1, 0.2, 0.4); 
        this.createFireParticles(forgeFireGroup, 0.3); 
        propGroup.add(forgeFireGroup);
    }
    else if (type === "clothing") {
        const clothGeo = getGeo('stall_cloth', () => new THREE.BoxGeometry(0.6, 0.1, 0.6));
        const colors = [0xff4444, 0x44ff44, 0x4444ff, 0xffaa00, 0xffffff];
        for (let i = 0; i < 4; i++) {
            const clothMat = new THREE.MeshStandardMaterial({ color: colors[i % colors.length], roughness: 0.9 });
            const cloth = new THREE.Mesh(clothGeo, clothMat);
            cloth.position.set(-1, 0.05 + i * 0.1, 0); cloth.rotation.y = (Math.random() - 0.5) * 0.2; cloth.castShadow = true;
            propGroup.add(cloth);
        }
        for (let i = 0; i < 3; i++) {
            const clothMat = new THREE.MeshStandardMaterial({ color: colors[(i+2) % colors.length], roughness: 0.9 });
            const cloth = new THREE.Mesh(clothGeo, clothMat);
            cloth.position.set(0.5, 0.05 + i * 0.1, 0.3); cloth.rotation.y = (Math.random() - 0.5) * 0.2; cloth.castShadow = true;
            propGroup.add(cloth);
        }
        const roll = new THREE.Mesh(getGeo('stall_roll', () => new THREE.CylinderGeometry(0.2, 0.2, 1.2, 16)), getMat('stall_roll_m', () => new THREE.MeshStandardMaterial({ color: 0xaa22aa, roughness: 0.9 })));
        roll.rotation.z = Math.PI / 2; roll.position.set(1, 0.2, -0.2); roll.castShadow = true;
        propGroup.add(roll);
    }
    else if (type === "furniture") {
        const tableTop = new THREE.Mesh(getGeo('stall_f_tt', () => new THREE.BoxGeometry(1.0, 0.1, 1.0)), woodMat);
        tableTop.position.set(-1, 0.4, 0); propGroup.add(tableTop);
        const tableLeg = new THREE.Mesh(getGeo('stall_f_tl', () => new THREE.CylinderGeometry(0.1, 0.1, 0.4)), woodMat);
        tableLeg.position.set(-1, 0.2, 0); propGroup.add(tableLeg);

        const chairSeat = new THREE.Mesh(getGeo('stall_f_cs', () => new THREE.BoxGeometry(0.4, 0.1, 0.4)), woodMat);
        chairSeat.position.set(0.5, 0.2, 0.2); propGroup.add(chairSeat);
        const chairBack = new THREE.Mesh(getGeo('stall_f_cb', () => new THREE.BoxGeometry(0.4, 0.4, 0.1)), woodMat);
        chairBack.position.set(0.5, 0.4, 0.05); propGroup.add(chairBack);

        const rug = new THREE.Mesh(getGeo('stall_rug', () => new THREE.CylinderGeometry(0.15, 0.15, 1.2, 16)), getMat('stall_rug_m', () => new THREE.MeshStandardMaterial({ color: 0xcc4444, roughness: 0.9 })));
        rug.rotation.z = Math.PI / 2; rug.position.set(1, 0.15, -0.3); propGroup.add(rug);
    }

    stallGroup.add(propGroup);
    stallGroup.position.set(x, 0, z);
    stallGroup.rotation.y = rotation;
    this.environmentRoot.add(stallGroup);
  }

  public createFireParticles(parent: THREE.Group, scale: number = 1.0) {
      // PERFORMANCE: Reduced 200 -> 80
      const flameCount = Math.floor(80 * scale);
      const flameGeo = new THREE.BufferGeometry();
      const fPos = new Float32Array(flameCount * 3);
      const fVel = new Float32Array(flameCount * 3);

      for (let i = 0; i < flameCount; i++) {
          fPos[i*3] = (Math.random() - 0.5) * 3.5 * scale;
          fPos[i*3+1] = 0;
          fPos[i*3+2] = (Math.random() - 0.5) * 3.5 * scale;
          
          fVel[i*3] = (Math.random() - 0.5) * 2.0; 
          fVel[i*3+1] = 0.5 + Math.random() * 1.5; 
          fVel[i*3+2] = (Math.random() - 0.5) * 2.0; 
      }
      flameGeo.setAttribute('position', new THREE.BufferAttribute(fPos, 3));
      flameGeo.setAttribute('velocity', new THREE.BufferAttribute(fVel, 3));

      // We clone the material because `scale` is passed as a uniform specific to this instance
      const flameMat = getMat('fire_base_mat', () => new THREE.ShaderMaterial({
          uniforms: {
              time: sharedTimeUniform,
              color: { value: new THREE.Color(0xff5500) },
              scale: { value: 1.0 }
          },
          vertexShader: `
              uniform float time;
              uniform float scale;
              attribute vec3 velocity;
              varying float vLife;
              void main() {
                  float life = fract(time * velocity.y + velocity.x * 5.0);
                  vLife = life;
                  vec3 pos = position;
                  pos.x += sin(time * 3.0 + velocity.z * 10.0) * 0.5 * life * scale;
                  pos.x -= pos.x * 0.5 * life; 
                  pos.y += life * 4.0 * scale; 
                  pos.z -= pos.z * 0.5 * life;
                  
                  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
                  gl_PointSize = (40.0 * scale) * (1.0 - life) * (10.0 / -mvPos.z);
                  gl_Position = projectionMatrix * mvPos;
              }
          `,
          fragmentShader: `
              uniform vec3 color;
              varying float vLife;
              void main() {
                  float d = distance(gl_PointCoord, vec2(0.5));
                  if(d > 0.5) discard;
                  float alpha = (1.0 - (d * 2.0)) * (1.0 - vLife);
                  gl_FragColor = vec4(color, alpha);
              }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
      })).clone();
      
      (flameMat as THREE.ShaderMaterial).uniforms.scale.value = scale;

      const flameMesh = new THREE.Points(flameGeo, flameMat);
      // PERFORMANCE: No per-mesh onBeforeRender. Uses sharedTimeUniform.
      parent.add(flameMesh);

      this.fireParticlesList.push({ mesh: flameMesh, positions: new Float32Array(0), velocities: new Float32Array(0) });

      // 2. EMBER SPARKS
      // PERFORMANCE: Reduced 60 -> 30
      const sparkCount = Math.floor(30 * scale);
      const sparkGeo = new THREE.BufferGeometry();
      const sPos = new Float32Array(sparkCount * 3);
      const sVel = new Float32Array(sparkCount * 3);

      for (let i = 0; i < sparkCount; i++) {
          sPos[i*3] = (Math.random() - 0.5) * 3.0 * scale;
          sPos[i*3+1] = 0;
          sPos[i*3+2] = (Math.random() - 0.5) * 3.0 * scale;
          sVel[i*3] = (Math.random() - 0.5) * 2.0;
          sVel[i*3+1] = 0.3 + Math.random() * 0.8; 
          sVel[i*3+2] = (Math.random() - 0.5) * 2.0;
      }
      sparkGeo.setAttribute('position', new THREE.BufferAttribute(sPos, 3));
      sparkGeo.setAttribute('velocity', new THREE.BufferAttribute(sVel, 3));

      const sparkMat = getMat('spark_base_mat', () => new THREE.ShaderMaterial({
          uniforms: {
              time: sharedTimeUniform,
              color: { value: new THREE.Color(0xffaa33) },
              scale: { value: 1.0 }
          },
          vertexShader: `
              uniform float time;
              uniform float scale;
              attribute vec3 velocity;
              varying float vLife;
              void main() {
                  float life = fract(time * velocity.y + velocity.x * 5.0);
                  vLife = life;
                  vec3 pos = position;
                  
                  pos.x += sin(time * 5.0 + velocity.z * 10.0) * 1.5 * life * scale;
                  pos.y += life * 6.0 * scale; 
                  pos.z += cos(time * 4.0 + velocity.x * 10.0) * 1.5 * life * scale;
                  
                  vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
                  gl_PointSize = (12.0 * scale) * (1.0 - life) * (10.0 / -mvPos.z);
                  gl_Position = projectionMatrix * mvPos;
              }
          `,
          fragmentShader: `
              uniform vec3 color;
              varying float vLife;
              void main() {
                  float d = distance(gl_PointCoord, vec2(0.5));
                  if(d > 0.5) discard;
                  float alpha = (1.0 - (d * 2.0)) * (1.0 - vLife);
                  gl_FragColor = vec4(color, alpha);
              }
          `,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false
      })).clone();
      
      (sparkMat as THREE.ShaderMaterial).uniforms.scale.value = scale;

      const sparkMesh = new THREE.Points(sparkGeo, sparkMat);
      parent.add(sparkMesh);
      
      this.emberParticlesList.push({ mesh: sparkMesh, positions: new Float32Array(0), velocities: new Float32Array(0) });
  }

  public createGrandTavern(xOffset: number, zOffset: number, rotation: number) {
    const group = new THREE.Group();
    
    const wallMat = getMat('t_wall', () => new THREE.MeshStandardMaterial({ color: 0xe6dfcc, roughness: 1.0 })); 
    const floorMat = getMat('t_floor', () => new THREE.MeshStandardMaterial({ color: 0x5a4a36, roughness: 0.8 })); 
    const darkWoodMat = getMat('t_darkW', () => new THREE.MeshStandardMaterial({ color: 0x2d1b14, roughness: 0.9 }));
    const lightWoodMat = getMat('t_lightW', () => new THREE.MeshStandardMaterial({ color: 0x4a3221, roughness: 0.8 }));
    const stoneMat = getMat('t_stone', () => new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.9 }));
    
    const wallThickness = 1.2; 
    const wallHeight = 5.5; 
    const mainWidth = 30; 
    const mainDepth = 40; 
    const wingSize = 20;

    const floor1 = new THREE.Mesh(getGeo('t_f1', () => new THREE.PlaneGeometry(mainWidth, mainDepth)), floorMat);
    floor1.rotation.x = -Math.PI / 2; floor1.position.set(-mainWidth/2, 0.1, 0); floor1.receiveShadow = true;
    group.add(floor1);

    const floor2 = new THREE.Mesh(getGeo('t_f2', () => new THREE.PlaneGeometry(wingSize, wingSize)), floorMat);
    floor2.rotation.x = -Math.PI / 2; floor2.position.set(-mainWidth - wingSize/2, 0.1, -mainDepth/2 + wingSize/2); floor2.receiveShadow = true;
    group.add(floor2);

    const buildingGroup = new THREE.Group();
    const nWall = new THREE.Mesh(getGeo('t_w1', () => new THREE.BoxGeometry(mainWidth + wingSize + wallThickness, wallHeight, wallThickness)), wallMat);
    nWall.position.set(-mainWidth/2 - wingSize/2, wallHeight/2, -mainDepth/2 + wallThickness/2);
    nWall.castShadow = true; nWall.receiveShadow = true; buildingGroup.add(nWall);

    const eWallPieceLen = (mainDepth - 8) / 2;
    const eWallGeo = getGeo('t_eW', () => new THREE.BoxGeometry(wallThickness, wallHeight, eWallPieceLen));
    const eWallN = new THREE.Mesh(eWallGeo, wallMat); 
    eWallN.position.set(-wallThickness/2, wallHeight/2, -mainDepth/2 + eWallPieceLen/2);
    eWallN.castShadow = true; eWallN.receiveShadow = true; buildingGroup.add(eWallN);
    const eWallS = new THREE.Mesh(eWallGeo, wallMat); 
    eWallS.position.set(-wallThickness/2, wallHeight/2, mainDepth/2 - eWallPieceLen/2);
    eWallS.castShadow = true; eWallS.receiveShadow = true; buildingGroup.add(eWallS);

    const sWall = new THREE.Mesh(getGeo('t_sW', () => new THREE.BoxGeometry(mainWidth + wallThickness, wallHeight, wallThickness)), wallMat);
    sWall.position.set(-mainWidth/2, wallHeight/2, mainDepth/2 - wallThickness/2);
    sWall.castShadow = true; sWall.receiveShadow = true; buildingGroup.add(sWall);

    const wWallShort = new THREE.Mesh(getGeo('t_wW', () => new THREE.BoxGeometry(wallThickness, wallHeight, mainDepth - wingSize)), wallMat);
    wWallShort.position.set(-mainWidth + wallThickness/2, wallHeight/2, wingSize/2);
    wWallShort.castShadow = true; wWallShort.receiveShadow = true; buildingGroup.add(wWallShort);

    const wingSWall = new THREE.Mesh(getGeo('t_wingS', () => new THREE.BoxGeometry(wingSize + wallThickness, wallHeight, wallThickness)), wallMat);
    wingSWall.position.set(-mainWidth - wingSize/2, wallHeight/2, -mainDepth/2 + wingSize - wallThickness/2);
    wingSWall.castShadow = true; wingSWall.receiveShadow = true; buildingGroup.add(wingSWall);

    const wingWWall = new THREE.Mesh(getGeo('t_wingW', () => new THREE.BoxGeometry(wallThickness, wallHeight, wingSize)), wallMat);
    wingWWall.position.set(-mainWidth - wingSize + wallThickness/2, wallHeight/2, -mainDepth/2 + wingSize/2);
    wingWWall.castShadow = true; wingWWall.receiveShadow = true; buildingGroup.add(wingWWall);

    this.onTavernWallsCreated(buildingGroup);
    group.add(buildingGroup);

    const fpGroup = new THREE.Group();
    fpGroup.position.set(-mainWidth - wingSize/2 + 2, 0, -mainDepth/2 + wingSize/2 - 2);
    fpGroup.add(new THREE.Mesh(getGeo('t_fp1', () => new THREE.BoxGeometry(9, 0.4, 5)), stoneMat).translateY(0.2));
    fpGroup.add(new THREE.Mesh(getGeo('t_fp2', () => new THREE.BoxGeometry(9, 6, 1.5)), stoneMat).translateY(3).translateZ(-1.75));
    
    // Kept the main fire light, as the Tavern needs it for ambiance
    const fireLight = new THREE.PointLight(0xff7722, 4.0, 30);
    fireLight.position.set(0, 2.0, 1.5); fireLight.castShadow = true; fpGroup.add(fireLight);
    this.fireLights.push(fireLight);
    this.createFireParticles(fpGroup, 1.0); 
    group.add(fpGroup);

    const greenFelt = getMat('t_felt', () => new THREE.MeshStandardMaterial({ color: 0x117722, roughness: 0.9 }));
    const metalMat = getMat('t_metal', () => new THREE.MeshStandardMaterial({ color: 0x888888, metalness: 0.8, roughness: 0.2 }));
    
    // 1. Roulette
    const rouletteGroup = new THREE.Group();
    rouletteGroup.position.set(-15, 0, -12);
    const rBase = new THREE.Mesh(getGeo('r_base', () => new THREE.BoxGeometry(6, 1.2, 3)), lightWoodMat);
    rBase.position.y = 0.6;
    const rTop = new THREE.Mesh(getGeo('r_top', () => new THREE.BoxGeometry(5.8, 0.2, 2.8)), greenFelt);
    rTop.position.y = 1.3;
    const wheel = new THREE.Mesh(getGeo('r_wheel', () => new THREE.CylinderGeometry(1.2, 1.2, 0.3, 16)), darkWoodMat);
    wheel.position.set(-1.5, 1.45, 0);
    const wheelCenter = new THREE.Mesh(getGeo('r_center', () => new THREE.CylinderGeometry(0.8, 0.8, 0.32, 16)), getMat('r_cMat', () => new THREE.MeshStandardMaterial({ color: 0xaa1111 })));
    wheelCenter.position.set(-1.5, 1.45, 0);
    rouletteGroup.add(rBase, rTop, wheel, wheelCenter);
    const rLabel = this.createNameLabel("Roulette [Enter]");
    rLabel.position.set(0, 3.5, 0);
    rLabel.scale.set(4.0, 1, 1);
    rouletteGroup.add(rLabel);
    group.add(rouletteGroup); 
    
    this.casinoAnims.rouletteWheel = wheel;

    // 2. Blackjack
    const bjGroup = new THREE.Group();
    bjGroup.position.set(-15, 0, -2);
    const bjBase = new THREE.Mesh(getGeo('bj_base', () => new THREE.BoxGeometry(5, 1.2, 3)), lightWoodMat);
    bjBase.position.y = 0.6;
    const bjTop = new THREE.Mesh(getGeo('bj_top', () => new THREE.BoxGeometry(4.8, 0.2, 2.8)), greenFelt);
    bjTop.position.y = 1.3;
    const cardMat = getMat('bj_card_m', () => new THREE.MeshStandardMaterial({ color: 0xffffff }));
    const cardGeo = getGeo('bj_card_g', () => new THREE.BoxGeometry(0.3, 0.05, 0.4));
    for(let i=0; i<4; i++) {
       const card = new THREE.Mesh(cardGeo, cardMat);
       card.position.set(-1.5 + (i * 1.0), 1.42, 0.5);
       card.rotation.y = (Math.random() - 0.5) * 0.5;
       bjGroup.add(card);
       this.casinoAnims.bjCards.push(card);
    }
    bjGroup.add(bjBase, bjTop);
    const bjLabel = this.createNameLabel("Blackjack [Enter]");
    bjLabel.position.set(0, 3.5, 0);
    bjLabel.scale.set(4.0, 1, 1);
    bjGroup.add(bjLabel);
    group.add(bjGroup); 

    // 3. Coin Toss
    const ctGroup = new THREE.Group();
    ctGroup.position.set(-15, 0, 8);
    const ctBase = new THREE.Mesh(getGeo('ct_base', () => new THREE.CylinderGeometry(1.5, 1.5, 1.2, 16)), lightWoodMat);
    ctBase.position.y = 0.6;
    const ctTop = new THREE.Mesh(getGeo('ct_top', () => new THREE.CylinderGeometry(1.4, 1.4, 0.2, 16)), greenFelt);
    ctTop.position.y = 1.3;
    const coin = new THREE.Mesh(getGeo('ct_coin', () => new THREE.CylinderGeometry(0.3, 0.3, 0.05, 16)), getMat('ct_coin_m', () => new THREE.MeshStandardMaterial({ color: 0xffdd00, metalness: 0.8, roughness: 0.2 })));
    coin.position.set(0, 1.5, 0);
    coin.rotation.x = Math.PI / 2;
    coin.rotation.y = Math.PI / 4;
    ctGroup.add(ctBase, ctTop, coin);
    const ctLabel = this.createNameLabel("Coin Toss [Enter]");
    ctLabel.position.set(0, 3.5, 0);
    ctLabel.scale.set(4.0, 1, 1);
    ctGroup.add(ctLabel);
    group.add(ctGroup); 
    
    this.casinoAnims.coinMesh = coin;

    // 4. Slot Machine
    const slotGroup = new THREE.Group();
    slotGroup.position.set(-26, 0, -10);
    slotGroup.rotation.y = Math.PI / 2; 
    const sBody = new THREE.Mesh(getGeo('sm_body', () => new THREE.BoxGeometry(2, 3.5, 2)), getMat('sm_m', () => new THREE.MeshStandardMaterial({ color: 0xaa2222 })));
    sBody.position.y = 1.75;
    const sScreen = new THREE.Mesh(getGeo('sm_screen', () => new THREE.BoxGeometry(1.6, 1.0, 0.1)), getMat('sm_screen_m', () => new THREE.MeshStandardMaterial({ color: 0x111111, emissive: 0x2244ff, emissiveIntensity: 0.5 })));
    sScreen.position.set(0, 2.2, 1.0);
    
    const sArmPivot = new THREE.Group();
    sArmPivot.position.set(1.1, 1.5, 0); 
    const sArm = new THREE.Mesh(getGeo('sm_arm', () => new THREE.CylinderGeometry(0.05, 0.05, 1.0)), metalMat);
    sArm.position.set(0, 0.5, 0); 
    const sKnob = new THREE.Mesh(getGeo('sm_knob', () => new THREE.SphereGeometry(0.2)), getMat('sm_m', () => new THREE.MeshStandardMaterial({ color: 0xaa2222 }))); // Recycled material
    sKnob.position.set(0, 1.0, 0); 
    
    sArmPivot.add(sArm);
    sArmPivot.add(sKnob);
    
    slotGroup.add(sBody, sScreen, sArmPivot);
    const sLabel = this.createNameLabel("Slots [Enter]");
    sLabel.position.set(0, 4.5, 0);
    sLabel.scale.set(3.5, 1, 1);
    slotGroup.add(sLabel);
    group.add(slotGroup); 

    this.casinoAnims.slotArm = sArmPivot;

    group.position.set(xOffset, 0, zOffset);
    group.rotation.y = rotation;
    this.environmentRoot.add(group);
  }
}