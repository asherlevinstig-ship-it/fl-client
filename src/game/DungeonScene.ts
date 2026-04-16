import * as THREE from "three";
import { BaseScene } from "./BaseScene";

export class DungeonScene extends BaseScene {
    private ambientLight!: THREE.AmbientLight;
    private pointLight!: THREE.PointLight;

    // --- HAZARD TRACKING ---
    // Moved target tracking out of userData for better performance and strict typing
    public hazardVisuals = new Map<string, { 
        mesh: THREE.Group, 
        type: string, 
        customData: any, 
        targetX?: number, 
        targetZ?: number 
    }>();

    // --- NEW: Hazard Geometry/Material Cache & Object Pools ---
    private hazardGeoCache = new Map<string, THREE.BufferGeometry>();
    private hazardMatCache = new Map<string, THREE.Material>();
    private hazardPools = new Map<string, THREE.Group[]>();

    constructor(container: HTMLElement) {
        super(container);

        this.scene.background = new THREE.Color(0x0a0a08);
        this.scene.fog = new THREE.FogExp2(0x0a0a08, 0.015);

        this.cameraAngle = 0;
        this.cameraPitch = 0.7;
        this.cameraZoom = 20; 

        this.setupEnvironment();
        this.start();
    }

    private setupEnvironment() {
        this.ambientLight = new THREE.AmbientLight(0x2a331f, 1.5);
        this.scene.add(this.ambientLight);

        this.pointLight = new THREE.PointLight(0xffaa00, 150, 60);
        this.pointLight.position.set(0, 10, 0);
        this.scene.add(this.pointLight);

        const geo = new THREE.PlaneGeometry(150, 150);
        const mat = new THREE.MeshStandardMaterial({ 
            color: 0x221a11, 
            roughness: 0.9,
            metalness: 0.0
        });
        const floor = new THREE.Mesh(geo, mat);
        floor.rotation.x = -Math.PI / 2;
        floor.receiveShadow = true;
        this.scene.add(floor);

        const rockGeo = new THREE.ConeGeometry(3, 15, 7);
        const rockMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.8 });
        
        const instancedRocks = new THREE.InstancedMesh(rockGeo, rockMat, 200);
        const dummy = new THREE.Object3D();
        
        for (let i = 0; i < 200; i++) {
            const angle = (i / 200) * Math.PI * 2;
            const radius = 45 + Math.random() * 10;
            dummy.position.set(Math.cos(angle) * radius, Math.random() * 2, Math.sin(angle) * radius);
            dummy.rotation.set((Math.random() - 0.5) * 0.5, Math.random() * Math.PI, (Math.random() - 0.5) * 0.5);
            dummy.scale.set(1 + Math.random(), 1 + Math.random() * 2, 1 + Math.random());
            dummy.updateMatrix();
            instancedRocks.setMatrixAt(i, dummy.matrix);
        }
        this.scene.add(instancedRocks);
    }

    // ==========================================
    // HAZARD RENDERING SYSTEM (Optimized)
    // ==========================================
    
    private getHazardGroup(type: string): THREE.Group {
        // 1. Try to recycle from pool
        const pool = this.hazardPools.get(type);
        if (pool && pool.length > 0) {
            return pool.pop()!;
        }

        // 2. Build new if pool is empty
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
        group.position.set(x, 0.05, z); // Just above ground to avoid Z-fighting

        // Add dynamic labels if needed (Textures are safely cached upstream in BaseScene)
        if (type === "mana_pillar" && customData && customData.optionText) {
            const optionLabel = this.createNameLabel(customData.optionText);
            optionLabel.position.set(0, 4.5, 0);
            optionLabel.scale.set(3.0, 0.8, 1.0);
            optionLabel.name = "hazard_label"; // Tag for easy removal later
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
            
            // Remove dynamic sprites before pooling to prevent text stacking
            const toRemove: THREE.Object3D[] = [];
            h.mesh.children.forEach(c => {
                if (c.name === "hazard_label" && c instanceof THREE.Sprite) {
                    toRemove.push(c);
                }
            });
            
            toRemove.forEach(c => {
                h.mesh.remove(c);
                if (c instanceof THREE.Sprite && c.material) {
                    c.material.dispose(); // Only dispose the material, BaseScene holds the canvas texture
                }
            });

            // Return to pool instead of destroying geometry/materials
            if (!this.hazardPools.has(h.type)) {
                this.hazardPools.set(h.type, []);
            }
            this.hazardPools.get(h.type)!.push(h.mesh);
            
            this.hazardVisuals.delete(id);
        }
    }

    protected onUpdate(dt: number) {
        // Smooth Interpolation for moving hazards - skip if already close
        this.hazardVisuals.forEach((h, id) => {
            if (h.targetX !== undefined && h.targetZ !== undefined) {
                const dx = h.targetX - h.mesh.position.x;
                const dz = h.targetZ - h.mesh.position.z;
                
                if (dx * dx + dz * dz > 0.0001) {
                    h.mesh.position.x = THREE.MathUtils.lerp(h.mesh.position.x, h.targetX, 5 * dt);
                    h.mesh.position.z = THREE.MathUtils.lerp(h.mesh.position.z, h.targetZ, 5 * dt);
                }
            }
        });
    }

    public override updateCameraFollow(playerId: string, dt: number = 0.016) {
        super.updateCameraFollow(playerId, dt);
        const playerVisual = this.playerVisuals.get(playerId);
        if (playerVisual) {
            this.pointLight.position.set(
                playerVisual.mesh.position.x,
                10,
                playerVisual.mesh.position.z
            );
            
            // Optimized flicker: Smooth sine wave based on time instead of random per frame
            this.pointLight.intensity = 155 + Math.sin(performance.now() * 0.01) * 8;
        }
    }

    public override dispose() {
        super.dispose();
        
        // Clean up Hazard Visuals
        for (const h of this.hazardVisuals.values()) {
            this.scene.remove(h.mesh);
            // Since we pool, geometry and material are shared. 
            // We just let the final cache cleanup handle them below.
        }
        this.hazardVisuals.clear();

        // Dispose shared geometries and materials
        for (const geo of this.hazardGeoCache.values()) {
            geo.dispose();
        }
        this.hazardGeoCache.clear();

        for (const mat of this.hazardMatCache.values()) {
            mat.dispose();
        }
        this.hazardMatCache.clear();
        
        this.hazardPools.clear();
    }
}