import * as THREE from "three";
import { BaseScene } from "./BaseScene";
import { generateMaze } from "./CollisionSystem";

export class MazeScene extends BaseScene {
    private wallInstanced?: THREE.InstancedMesh;
    private exitBeacon?: THREE.Mesh;
    
    private ambientLight!: THREE.AmbientLight;
    private sunLight!: THREE.DirectionalLight;

    // --- HAZARD TRACKING ---
    public hazardVisuals = new Map<string, { 
        mesh: THREE.Group, 
        type: string, 
        customData: any,
        targetX?: number,
        targetZ?: number
    }>();

    // --- PERFORMANCE: Hazard Geometry/Material Cache & Object Pools ---
    private hazardGeoCache = new Map<string, THREE.BufferGeometry>();
    private hazardMatCache = new Map<string, THREE.Material>();
    private hazardPools = new Map<string, THREE.Group[]>();

    constructor(container: HTMLElement) {
        super(container);

        // --- BRIGHT DAYTIME ATMOSPHERE ---
        this.scene.background = new THREE.Color(0x87CEEB);
        this.scene.fog = new THREE.FogExp2(0x87CEEB, 0.004); 

        // --- 3RD PERSON CAMERA TWEAKS ---
        this.cameraAngle = 0;
        this.cameraPitch = 0.6; 
        this.cameraZoom = 18; 

        this.setupLighting();
        this.buildMazeEnvironment();

        this.start();
    }

    private setupLighting() {
        this.ambientLight = new THREE.AmbientLight(0xffffff, 0.6); 
        this.scene.add(this.ambientLight);

        this.sunLight = new THREE.DirectionalLight(0xfff5b6, 2.5);
        this.sunLight.castShadow = true;
        
        // PERFORMANCE: Halved shadow map size and drastically reduced camera bounds.
        // We will make the shadow camera follow the player to keep shadows crisp locally.
        this.sunLight.shadow.mapSize.width = 1024;
        this.sunLight.shadow.mapSize.height = 1024;
        this.sunLight.shadow.camera.left = -50;
        this.sunLight.shadow.camera.right = 50;
        this.sunLight.shadow.camera.top = 50;
        this.sunLight.shadow.camera.bottom = -50;
        this.sunLight.shadow.camera.near = 0.5;
        this.sunLight.shadow.camera.far = 300;
        this.sunLight.shadow.bias = -0.0005;

        // Initial placement
        this.sunLight.position.set(50, 150, 50);
        this.scene.add(this.sunLight);
        this.scene.add(this.sunLight.target);
    }

    private buildMazeEnvironment() {
        // 1. The Ground
        const groundGeo = new THREE.PlaneGeometry(2000, 2000);
        const groundMat = new THREE.MeshStandardMaterial({ color: 0x5a5a55, roughness: 0.9 });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // 2. Procedural Maze Walls (InstancedMesh is highly optimized)
        const wallGeo = new THREE.BoxGeometry(10, 15, 10);
        const wallMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 0.8 });
        
        const mazeData = generateMaze(42); 
        
        this.wallInstanced = new THREE.InstancedMesh(wallGeo, wallMat, mazeData.length);
        const dummy = new THREE.Object3D();
        
        mazeData.forEach((wall, i) => {
            dummy.position.set(wall.x, 7.5, wall.z); 
            dummy.scale.set(wall.scaleX, 1, wall.scaleZ);
            dummy.updateMatrix();
            this.wallInstanced!.setMatrixAt(i, dummy.matrix);
        });
        
        this.wallInstanced.castShadow = true;
        this.wallInstanced.receiveShadow = true;
        this.scene.add(this.wallInstanced);

        // 3. The Exit Beacon at (500, 500)
        // PERFORMANCE: Removed PointLight. Additive blending handles the visual "glow" cheaply.
        const exitGeo = new THREE.CylinderGeometry(5, 5, 100, 16);
        const exitMat = new THREE.MeshBasicMaterial({ 
            color: 0x00ffaa, 
            transparent: true, 
            opacity: 0.6,
            blending: THREE.AdditiveBlending 
        });
        this.exitBeacon = new THREE.Mesh(exitGeo, exitMat);
        this.exitBeacon.position.set(350, 50, 350);
        this.scene.add(this.exitBeacon);
    }

    // ==========================================
    // HAZARD RENDERING SYSTEM (Optimized & Pooled)
    // ==========================================
    private getHazardGroup(type: string): THREE.Group {
        const pool = this.hazardPools.get(type);
        if (pool && pool.length > 0) {
            return pool.pop()!;
        }

        const group = new THREE.Group();
        
        if (type === "mana_pillar") {
            if (!this.hazardGeoCache.has(type)) {
                this.hazardGeoCache.set(type, new THREE.CylinderGeometry(0.8, 0.8, 4.0, 8));
                this.hazardMatCache.set(type, new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending }));
            }
            const pillarMesh = new THREE.Mesh(this.hazardGeoCache.get(type)!, this.hazardMatCache.get(type)!);
            pillarMesh.position.y = 2.0; 
            group.add(pillarMesh);
        }

        return group;
    }

    public addHazard(id: string, type: string, x: number, z: number, rank: number, customData: any = {}) {
        if (this.hazardVisuals.has(id)) return;

        const group = this.getHazardGroup(type);
        group.position.set(x, 0.05, z);

        if (type === "mana_pillar" && customData && customData.optionText) {
            const optionLabel = this.createNameLabel(customData.optionText);
            optionLabel.position.set(0, 4.5, 0);
            optionLabel.scale.set(3.0, 0.8, 1.0);
            optionLabel.name = "hazard_label"; 
            group.add(optionLabel);
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
            
            // Remove dynamically added text sprites before pooling
            const toRemove: THREE.Object3D[] = [];
            h.mesh.children.forEach(c => {
                if (c.name === "hazard_label" && c instanceof THREE.Sprite) {
                    toRemove.push(c);
                }
            });
            
            toRemove.forEach(c => {
                h.mesh.remove(c);
                if (c instanceof THREE.Sprite && c.material) {
                    c.material.dispose(); 
                }
            });

            // Return to pool
            if (!this.hazardPools.has(h.type)) {
                this.hazardPools.set(h.type, []);
            }
            this.hazardPools.get(h.type)!.push(h.mesh);
            
            this.hazardVisuals.delete(id);
        }
    }

    protected onUpdate(dt: number): void {
        const timeSec = Date.now() * 0.001;

        // --- 1. LOCAL DAYTIME CYCLE (Optimized) ---
        // Sun rotation removed. We instead lock a static sun angle strictly around the local player.
        // This ensures crisp shadows exactly where the player is, without rendering a massive 2048 shadow map.
        if (this.localPlayerId) {
            const visual = this.playerVisuals.get(this.localPlayerId);
            if (visual) {
                const targetX = visual.mesh.position.x;
                const targetZ = visual.mesh.position.z;

                // Maintain a constant directional angle to avoid shadow warping
                this.sunLight.position.set(targetX + 40, 150, targetZ + 40);
                this.sunLight.target.position.set(targetX, 0, targetZ);
                this.sunLight.target.updateMatrixWorld();
            }
        }

        // --- 2. PULSE THE EXIT BEACON ---
        if (this.exitBeacon) {
            const pulse = 0.6 + Math.sin(timeSec * 3) * 0.2;
            (this.exitBeacon.material as THREE.MeshBasicMaterial).opacity = pulse;
        }

        // --- 3. ANIMATE HAZARDS ---
        this.hazardVisuals.forEach((h, id) => {
            if (h.targetX !== undefined && h.targetZ !== undefined) {
                const dx = h.targetX - h.mesh.position.x;
                const dz = h.targetZ - h.mesh.position.z;
                
                // Squared distance check avoids expensive Math.sqrt calls
                if (dx * dx + dz * dz > 0.0001) {
                    h.mesh.position.x = THREE.MathUtils.lerp(h.mesh.position.x, h.targetX, 5 * dt);
                    h.mesh.position.z = THREE.MathUtils.lerp(h.mesh.position.z, h.targetZ, 5 * dt);
                }
            }
        });

        // --- 4. CAMERA FLOOR COLLISION ---
        if (this.camera.position.y < 1.0) {
            this.camera.position.y = 1.0;
        }

        // --- 5. PLAYER TORCH ---
        if (this.localPlayerId) {
            const visual = this.playerVisuals.get(this.localPlayerId);
            if (visual && !(visual as any).mazeTorch) {
                // Reduced intensity and distance slightly to ease fragment shader load
                const torch = new THREE.PointLight(0xffddaa, 100, 40); 
                torch.position.set(0, 5, 0);
                visual.mesh.add(torch);
                (visual as any).mazeTorch = torch;
            }
        }
    }

    public override dispose() {
        super.dispose();
        
        // 1. Clean up Hazard Memory
        for (const h of this.hazardVisuals.values()) {
            this.scene.remove(h.mesh);
        }
        this.hazardVisuals.clear();

        for (const geo of this.hazardGeoCache.values()) geo.dispose();
        this.hazardGeoCache.clear();

        for (const mat of this.hazardMatCache.values()) mat.dispose();
        this.hazardMatCache.clear();
        
        this.hazardPools.clear();

        // 2. Clean up our specific maze meshes
        if (this.wallInstanced) {
            this.wallInstanced.geometry.dispose();
            (this.wallInstanced.material as THREE.Material).dispose();
            this.scene.remove(this.wallInstanced);
        }

        if (this.exitBeacon) {
            this.exitBeacon.geometry.dispose();
            (this.exitBeacon.material as THREE.Material).dispose();
            this.scene.remove(this.exitBeacon);
        }

        if (this.sunLight) {
            this.scene.remove(this.sunLight);
            this.scene.remove(this.sunLight.target);
        }
    }
}