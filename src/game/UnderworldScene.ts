import * as THREE from "three";
import { BaseScene } from "./BaseScene";

// --- PERFORMANCE: Global Caches & Pools ---
const geoCache = new Map<string, THREE.BufferGeometry>();
const matCache = new Map<string, THREE.Material>();
const sharedTimeUniform = { value: 0 };

function getGeo(key: string, createFn: () => THREE.BufferGeometry): THREE.BufferGeometry {
    if (!geoCache.has(key)) geoCache.set(key, createFn());
    return geoCache.get(key)!;
}

function getMat(key: string, createFn: () => THREE.Material): THREE.Material {
    if (!matCache.has(key)) matCache.set(key, createFn());
    return matCache.get(key)!;
}

export class UnderworldScene extends BaseScene {
    private platform!: THREE.Mesh;
    private ambientLight!: THREE.AmbientLight;
    private centralLight!: THREE.PointLight;
    private moonLight!: THREE.DirectionalLight;
    
    // PERFORMANCE: Merged all flames into a single GPU system
    private masterFlameSystem!: THREE.Points;
    private edgeParticles!: THREE.InstancedMesh;

    // --- HAZARD TRACKING ---
    public hazardVisuals = new Map<string, { 
        mesh: THREE.Group, 
        type: string, 
        customData: any,
        targetX?: number,
        targetZ?: number 
    }>();

    private hazardPools = new Map<string, THREE.Group[]>();
    private frameCount = 0;

    // --- CINEMATIC FALL TRACKING ---
    private fallingDummies = new Set<{ mesh: THREE.Object3D, original: THREE.Object3D }>();

    constructor(container: HTMLElement) {
        super(container);

        this.scene.background = new THREE.Color(0x050009);
        this.scene.fog = new THREE.FogExp2(0x050009, 0.002);

        this.cameraAngle = 0;
        this.cameraPitch = 0.6;
        this.cameraZoom = 25;

        this.setupEnvironment();
        this.start();
    }

    private setupEnvironment() {
        // --- 1. GLOBAL LIGHTING ---
        this.ambientLight = new THREE.AmbientLight(0x331166, 3.0);
        this.scene.add(this.ambientLight);

        this.moonLight = new THREE.DirectionalLight(0x6644aa, 1.5);
        this.moonLight.position.set(0, 200, 0);
        this.moonLight.target.position.set(0, 0, 0);
        this.scene.add(this.moonLight);
        this.scene.add(this.moonLight.target);

        // PERFORMANCE: Reduced intensity and distance
        this.centralLight = new THREE.PointLight(0xdd55ff, 500, 400);
        this.centralLight.position.set(0, 60, 0);
        this.scene.add(this.centralLight);

        // --- 2. PLATFORM ---
        const geo = new THREE.CylinderGeometry(300, 300, 20, 64);
        const mat = new THREE.MeshStandardMaterial({ 
            color: 0x1a1a24, 
            roughness: 0.2, 
            metalness: 0.8 
        });
        this.platform = new THREE.Mesh(geo, mat);
        this.platform.position.y = -10; 
        this.platform.receiveShadow = true;
        this.scene.add(this.platform);

        const gridHelper = new THREE.GridHelper(600, 60, 0xaa22ff, 0x441166);
        gridHelper.position.y = 0.1; 
        (gridHelper.material as THREE.Material).transparent = true;
        (gridHelper.material as THREE.Material).opacity = 0.5;
        this.scene.add(gridHelper);

        // --- 3. THE CENTER: SACRIFICIAL ALTAR ---
        const outerRing = new THREE.Mesh(
            new THREE.RingGeometry(29, 30, 64),
            new THREE.MeshBasicMaterial({ color: 0xaa22ff, transparent: true, opacity: 0.8, side: THREE.DoubleSide })
        );
        outerRing.rotation.x = -Math.PI / 2;
        outerRing.position.y = 0.2;
        this.scene.add(outerRing);

        const innerRune = new THREE.Mesh(
            new THREE.CircleGeometry(28, 8), 
            new THREE.MeshBasicMaterial({ color: 0xaa22ff, wireframe: true, transparent: true, opacity: 0.5 })
        );
        innerRune.rotation.x = -Math.PI / 2;
        innerRune.position.y = 0.2;
        this.scene.add(innerRune);

        // --- 4. BATTLEFIELD COVER & SKULLS ---
        this.placeVoxelPillars();

        const pitch = Math.PI / 6; 
        this.addVoxelSkull(0, 150, -380, 0, pitch);                 // NORTH
        this.addVoxelSkull(0, 150, 380, Math.PI, pitch);            // SOUTH
        this.addVoxelSkull(-380, 150, 0, Math.PI / 2, pitch);       // WEST
        this.addVoxelSkull(380, 150, 0, -Math.PI / 2, pitch);       // EAST

        this.placeTorches();

        // --- 5. EDGE WARNING PARTICLES ---
        const particleGeo = new THREE.BoxGeometry(2, 2, 2);
        const particleMat = new THREE.MeshBasicMaterial({ color: 0xff2255, transparent: true, opacity: 0.8 });
        this.edgeParticles = new THREE.InstancedMesh(particleGeo, particleMat, 250);
        this.edgeParticles.castShadow = false; // Never shadow edge warnings
        this.edgeParticles.receiveShadow = false;

        const dummy = new THREE.Object3D();
        for(let i = 0; i < 250; i++) {
            const angle = (i / 250) * Math.PI * 2;
            const r = 298; 
            const variance = (Math.random() - 0.5) * 8;
            dummy.position.set(Math.cos(angle) * r + variance, (Math.random() - 0.5) * 20 + 5, Math.sin(angle) * r + variance);
            dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
            dummy.updateMatrix();
            this.edgeParticles.setMatrixAt(i, dummy.matrix);
        }
        this.scene.add(this.edgeParticles);
    }

    private placeVoxelPillars() {
        const pillarGeo = new THREE.BoxGeometry(8, 8, 8);
        
        const pillarMat = new THREE.MeshStandardMaterial({
            color: 0x222222, roughness: 0.7, metalness: 0.3
        });

        const glowingMat = new THREE.MeshStandardMaterial({
            color: 0xaa22ff, emissive: 0xaa22ff, emissiveIntensity: 2.0
        });
        
        const rings = [
            { radius: 80, count: 6 },
            { radius: 150, count: 12 },
            { radius: 220, count: 18 }
        ];
        
        const blockData: {x:number, y:number, z:number, r:number, isGlowing:boolean}[] = [];

        rings.forEach(ring => {
            for (let i = 0; i < ring.count; i++) {
                const angle = (i / ring.count) * Math.PI * 2;
                const px = Math.cos(angle) * ring.radius;
                const pz = Math.sin(angle) * ring.radius;
                
                const height = Math.floor(Math.random() * 5) + 3; 
                
                for (let h = 0; h < height; h++) {
                    if (h > 2 && Math.random() > 0.6) continue; 
                    
                    const py = (h * 8) + 4; 
                    const rotY = (Math.random() - 0.5) * 0.2; 
                    const offX = (Math.random() - 0.5) * 0.5; 
                    const offZ = (Math.random() - 0.5) * 0.5;

                    const isGlowing = (h === 1);

                    blockData.push({ x: px + offX, y: py, z: pz + offZ, r: rotY, isGlowing });
                    
                    if (h === 0) {
                        for(let r=0; r<2; r++) {
                            blockData.push({
                                x: px + (Math.random() - 0.5) * 15,
                                y: 4, z: pz + (Math.random() - 0.5) * 15,
                                r: Math.random() * Math.PI, isGlowing: false
                            });
                        }
                    }
                }
            }
        });

        const normalBlocks = blockData.filter(b => !b.isGlowing);
        const instancedNormal = new THREE.InstancedMesh(pillarGeo, pillarMat, normalBlocks.length);
        instancedNormal.castShadow = true;
        instancedNormal.receiveShadow = true;
        
        const glowingBlocks = blockData.filter(b => b.isGlowing);
        const instancedGlowing = new THREE.InstancedMesh(pillarGeo, glowingMat, glowingBlocks.length);
        instancedGlowing.castShadow = true;
        
        const dummy = new THREE.Object3D();
        
        normalBlocks.forEach((b, i) => {
            dummy.position.set(b.x, b.y, b.z);
            dummy.rotation.set(0, b.r, 0);
            dummy.updateMatrix();
            instancedNormal.setMatrixAt(i, dummy.matrix);
        });

        glowingBlocks.forEach((b, i) => {
            dummy.position.set(b.x, b.y, b.z);
            dummy.rotation.set(0, b.r, 0);
            dummy.updateMatrix();
            instancedGlowing.setMatrixAt(i, dummy.matrix);
        });

        this.scene.add(instancedNormal);
        this.scene.add(instancedGlowing);
    }

    private addVoxelSkull(x: number, y: number, z: number, rotationY: number, rotationX: number) {
        const skullGroup = new THREE.Group();

        const boneMat = new THREE.MeshStandardMaterial({ 
            color: 0xddddcc, emissive: 0x333322, roughness: 1.0
        });
        const voidMat = new THREE.MeshBasicMaterial({ color: 0x000000 });

        const head = new THREE.Mesh(new THREE.BoxGeometry(8, 8, 8), boneMat);
        skullGroup.add(head);

        const eyeGeo = new THREE.BoxGeometry(2, 2, 0.5);
        
        const eyeL = new THREE.Mesh(eyeGeo, voidMat);
        eyeL.position.set(-2, 0, 4.01); 
        skullGroup.add(eyeL);
        
        const eyeR = new THREE.Mesh(eyeGeo, voidMat);
        eyeR.position.set(2, 0, 4.01);
        skullGroup.add(eyeR);

        // PERFORMANCE: Replaced expensive SpotLights with highly emissive Cylinder beams
        const beamGeo = new THREE.CylinderGeometry(0.5, 4, 60, 16);
        beamGeo.translate(0, -30, 0);
        beamGeo.rotateX(Math.PI / 2);
        const beamMat = new THREE.MeshBasicMaterial({ color: 0xaa00ff, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false });

        const createEyeBeam = (posX: number) => {
            const beam = new THREE.Mesh(beamGeo, beamMat);
            beam.position.set(posX, 0, 4.5);
            beam.rotation.x = Math.PI / 6; // Angle down slightly
            skullGroup.add(beam);
        };

        createEyeBeam(-2); 
        createEyeBeam(2);  

        const nose = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 0.5), voidMat);
        nose.position.set(0, -2, 4.01);
        skullGroup.add(nose);

        const mouth = new THREE.Mesh(new THREE.BoxGeometry(6, 1, 0.5), voidMat);
        mouth.position.set(0, -3.5, 4.01);
        skullGroup.add(mouth);
        
        const toothGeo = new THREE.BoxGeometry(0.5, 1.2, 0.6);
        for(let i = -2; i <= 2; i += 1.5) {
            const tooth = new THREE.Mesh(toothGeo, boneMat);
            tooth.position.set(i, -3.5, 4.02);
            skullGroup.add(tooth);
        }

        skullGroup.position.set(x, y, z);
        skullGroup.rotation.order = "YXZ";
        skullGroup.rotation.y = rotationY;
        skullGroup.rotation.x = rotationX; 
        skullGroup.scale.set(16, 16, 16); 
        
        this.scene.add(skullGroup);
    }

    private placeTorches() {
        const torchPositions: {x: number, z: number}[] = [];
        
        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            torchPositions.push({ x: Math.cos(angle) * 25, z: Math.sin(angle) * 25 });
        }
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2 + (Math.PI / 8); 
            torchPositions.push({ x: Math.cos(angle) * 115, z: Math.sin(angle) * 115 });
        }
        for (let i = 0; i < 12; i++) {
            const angle = (i / 12) * Math.PI * 2 + (Math.PI / 12);
            torchPositions.push({ x: Math.cos(angle) * 230, z: Math.sin(angle) * 230 });
        }

        const holderGeo = new THREE.CylinderGeometry(0.3, 0.5, 6, 8);
        const holderMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9 });
        const topGeo = new THREE.ConeGeometry(1.0, 1.5, 8);
        const topMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9 });

        // PERFORMANCE: Master particle system for ALL torches
        const particlesPerTorch = 20;
        const totalParticles = torchPositions.length * particlesPerTorch;
        
        const masterGeo = new THREE.BufferGeometry();
        const pPos = new Float32Array(totalParticles * 3);
        const pVel = new Float32Array(totalParticles * 3);
        const pBase = new Float32Array(totalParticles * 3); // To anchor them to their torch

        let pIdx = 0;

        torchPositions.forEach(pos => {
            const stick = new THREE.Mesh(holderGeo, holderMat);
            stick.position.set(pos.x, 3.0, pos.z); 
            this.scene.add(stick);

            const bracket = new THREE.Mesh(topGeo, topMat);
            bracket.position.set(pos.x, 5.8, pos.z);
            bracket.rotation.x = Math.PI; 
            this.scene.add(bracket);

            // Populate the master particle array
            for (let i = 0; i < particlesPerTorch; i++) {
                pBase[pIdx*3] = pos.x;
                pBase[pIdx*3+1] = 6.2;
                pBase[pIdx*3+2] = pos.z;

                pPos[pIdx*3] = pos.x + (Math.random() - 0.5) * 0.4;
                pPos[pIdx*3+1] = 6.2 + Math.random() * 1.5;
                pPos[pIdx*3+2] = pos.z + (Math.random() - 0.5) * 0.4;

                pVel[pIdx*3] = (Math.random() - 0.5) * 2.0;
                pVel[pIdx*3+1] = 1.0 + Math.random() * 2.0; 
                pVel[pIdx*3+2] = (Math.random() - 0.5) * 2.0;

                pIdx++;
            }
        });

        masterGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
        masterGeo.setAttribute("velocity", new THREE.BufferAttribute(pVel, 3));
        masterGeo.setAttribute("basePos", new THREE.BufferAttribute(pBase, 3));

        // GPU Shader Material for Flames
        const masterMat = new THREE.ShaderMaterial({
            uniforms: {
                time: sharedTimeUniform,
                color: { value: new THREE.Color(0xaa00ff) }
            },
            vertexShader: `
                uniform float time;
                attribute vec3 velocity;
                attribute vec3 basePos;
                varying float vLife;
                void main() {
                    float life = fract(time * velocity.y + velocity.x * 5.0);
                    vLife = life;
                    vec3 pos = basePos;
                    
                    pos.x += sin(time * 3.0 + velocity.z * 10.0) * 0.5 * life;
                    pos.y += life * 2.5; 
                    pos.z += cos(time * 4.0 + velocity.x * 10.0) * 0.5 * life;
                    
                    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
                    gl_PointSize = 40.0 * (1.0 - life) * (10.0 / -mvPos.z);
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
        });

        this.masterFlameSystem = new THREE.Points(masterGeo, masterMat);
        this.scene.add(this.masterFlameSystem);
    }

    // ==========================================
    // HAZARD RENDERING SYSTEM (Optimized)
    // ==========================================
    private getHazardGroup(type: string): THREE.Group {
        const pool = this.hazardPools.get(type);
        if (pool && pool.length > 0) return pool.pop()!;

        const group = new THREE.Group();
        if (type === "mana_pillar") {
            const geo = getGeo('upillar_geo', () => new THREE.CylinderGeometry(0.8, 0.8, 4.0, 8));
            const mat = getMat('upillar_mat', () => new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending }));
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.y = 2.0; 
            group.add(mesh);
        }
        return group;
    }

    public addHazard(id: string, type: string, x: number, z: number, rank: number, customData: any = {}) {
        if (this.hazardVisuals.has(id)) return;

        const group = this.getHazardGroup(type);
        group.position.set(x, 0.05, z); 

        if (type === "mana_pillar" && customData && customData.optionText) {
            const label = this.createNameLabel(customData.optionText);
            label.position.set(0, 4.5, 0);
            label.scale.set(3.0, 0.8, 1.0);
            label.name = "hazard_label";
            group.add(label);
        }

        this.scene.add(group);
        this.hazardVisuals.set(id, { mesh: group, type, customData, targetX: x, targetZ: z });
    }

    public updateHazard(id: string, x: number, z: number) {
        const h = this.hazardVisuals.get(id);
        if (h) {
            h.targetX = x;
            h.targetZ = z;
        }
    }

    public removeHazard(id: string) {
        const h = this.hazardVisuals.get(id);
        if (h) {
            this.scene.remove(h.mesh);
            
            const toRemove: THREE.Object3D[] = [];
            h.mesh.children.forEach(c => {
                if (c.name === "hazard_label" && c instanceof THREE.Sprite) toRemove.push(c);
            });
            toRemove.forEach(c => {
                h.mesh.remove(c);
                if (c instanceof THREE.Sprite && c.material) c.material.dispose();
            });

            if (!this.hazardPools.has(h.type)) this.hazardPools.set(h.type, []);
            this.hazardPools.get(h.type)!.push(h.mesh);
            this.hazardVisuals.delete(id);
        }
    }

    // --- NEW: CINEMATIC DUMMY FALL ---
    // Call this from your network listener when you receive "trigger_void_fall"
    public triggerPlayerVoidFall(playerMesh: THREE.Object3D) {
        console.log("[SCENE-DROP] triggerPlayerVoidFall called. Hiding real player, spawning dummy.");

        // 1. Hide the real player so the network lerp can't ruin the animation
        playerMesh.visible = false;

        // 2. Spawn an exact visual clone (the dummy)
        const dummy = playerMesh.clone();
        
        // Ensure it spawns at the exact world position of the real player
        const worldPos = new THREE.Vector3();
        playerMesh.getWorldPosition(worldPos);
        dummy.position.copy(worldPos);
        
        const worldQuat = new THREE.Quaternion();
        playerMesh.getWorldQuaternion(worldQuat);
        dummy.quaternion.copy(worldQuat);

        this.scene.add(dummy);
        
        // Track the dummy for physics update, and save the original so we can un-hide it later if needed
        this.fallingDummies.add({ mesh: dummy, original: playerMesh });
    }

    // --- NEW: OVERRIDE CAMERA FOLLOW ---
    // This hijacks the BaseScene camera follow to explicitly track the falling dummy!
    public override updateCameraFollow(sessionId: string, offset?: any) {
        // If we have an active falling dummy, force the camera to follow it down into the void
        if (this.fallingDummies.size > 0) {
            const dummyData = Array.from(this.fallingDummies)[0];
            const dummy = dummyData.mesh;
            
            // Plunge the camera after the player (slightly above and pulled back)
            const targetPos = new THREE.Vector3(
                dummy.position.x,
                dummy.position.y + 12, 
                dummy.position.z + 20
            );
            
            this.camera.position.lerp(targetPos, 0.15);
            this.camera.lookAt(dummy.position);
            return;
        }

        // If no one is falling, use the normal network-tracked camera follow
        super.updateCameraFollow(sessionId, offset);
    }

    protected onUpdate(dt: number) {
        this.frameCount++;
        const timeSec = performance.now() * 0.001;
        sharedTimeUniform.value = timeSec; // Master clock for shaders
        
        // Throttled light animation (Every 3rd frame)
        if (this.frameCount % 3 === 0) {
            this.centralLight.intensity = 500 + Math.sin(timeSec * 2) * 100;
        }

        // --- CULLING & ANIMATE HAZARDS ---
        const camX = this.camera.position.x;
        const camZ = this.camera.position.z;
        const CULL_DIST_SQ = 40000; // 200m

        // Toggle edge particles if we are close to the edge
        if (this.edgeParticles) {
            const distToCenterSq = camX * camX + camZ * camZ;
            this.edgeParticles.visible = distToCenterSq > 40000; // Only visible if > 200m from center
        }

        this.hazardVisuals.forEach((h, id) => {
            const distSq = (h.mesh.position.x - camX)**2 + (h.mesh.position.z - camZ)**2;
            if (distSq > CULL_DIST_SQ) return;

            if (h.targetX !== undefined && h.targetZ !== undefined) {
                const dx = h.targetX - h.mesh.position.x;
                const dz = h.targetZ - h.mesh.position.z;
                if (dx * dx + dz * dz > 0.0001) {
                    h.mesh.position.x = THREE.MathUtils.lerp(h.mesh.position.x, h.targetX, 5 * dt);
                    h.mesh.position.z = THREE.MathUtils.lerp(h.mesh.position.z, h.targetZ, 5 * dt);
                }
            }
        });

        // --- PROCESS CINEMATIC DUMMY FALLS ---
        this.fallingDummies.forEach(dummyData => {
            const dummy = dummyData.mesh;
            
            // Plunge them into the void!
            dummy.position.y -= 90 * dt; 
            
            // Tumbling rotation
            dummy.rotation.x -= 3 * dt; 
            dummy.rotation.z += 1.5 * dt;

            // Log output to help pinpoint client/server timing issues
            if (this.frameCount % 10 === 0) {
                console.log(`[SCENE-DROP] Dummy falling... Current Y Position: ${dummy.position.y.toFixed(2)}`);
            }

            // Optional cleanup if they fall impossibly deep before the server teleports them
            if (dummy.position.y < -1500) {
                console.log("[SCENE-DROP] Dummy hit kill floor (-1500). Cleaning up mesh.");
                this.scene.remove(dummy);
                this.fallingDummies.delete(dummyData);
            }
        });
        
        // NOTE: The previous floor-clamp (camera.position.y < 1.0) has been intentionally removed 
        // so the camera can travel into negative Y-space with the player!
    }

    public override dispose() {
        super.dispose();

        // 1. Clean up Hazard Memory
        for (const h of this.hazardVisuals.values()) {
            this.scene.remove(h.mesh);
        }
        this.hazardVisuals.clear();
        
        // Clean up Dummies
        this.fallingDummies.forEach(data => {
            this.scene.remove(data.mesh);
            data.original.visible = true; // Restore original visibility on cleanup
        });
        this.fallingDummies.clear();

        for (const geo of geoCache.values()) geo.dispose();
        geoCache.clear();

        for (const mat of matCache.values()) mat.dispose();
        matCache.clear();
        
        this.hazardPools.clear();

        // 2. Clean up Master Flame
        if (this.masterFlameSystem) {
            this.masterFlameSystem.geometry.dispose();
            (this.masterFlameSystem.material as THREE.Material).dispose();
            this.scene.remove(this.masterFlameSystem);
        }

        // 3. Clean up Edge Warning Particles
        if (this.edgeParticles) {
            this.edgeParticles.geometry.dispose();
            (this.edgeParticles.material as THREE.Material).dispose();
            this.scene.remove(this.edgeParticles);
        }
        
        // 4. Clean up base meshes
        if (this.platform) {
            this.platform.geometry.dispose();
            (this.platform.material as THREE.Material).dispose();
        }
    }
}