import * as THREE from "three";

export class EnemyModel {
    public mesh: THREE.Group;
    public targetPosition: THREE.Vector3;
    public type: string;
    public animTime: number = 0;
    
    private bodyParts: { [key: string]: THREE.Object3D } = {};
    private isInitialized = false;
    private baseHoverY: number = 0;

    constructor(type: string) {
        this.mesh = new THREE.Group();
        this.targetPosition = new THREE.Vector3(0, 5, 0); // Spawn high to drop in safely
        this.type = type || "Unknown";
        
        this.mesh.position.copy(this.targetPosition);
        this.buildModel();
    }

    private buildModel() {
        const safeType = this.type.toLowerCase();
        const bodyGroup = new THREE.Group();

        // 1. WILD SLIME (Forest)
        if (safeType.includes("slime")) {
            const mat = new THREE.MeshStandardMaterial({ color: 0x33ff33, transparent: true, opacity: 0.8, roughness: 0.2 });
            const body = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), mat);
            body.scale.set(1.0, 0.8, 1.0); // Squished slightly
            body.position.y = 0.6;
            body.castShadow = true;
            this.bodyParts["mainBody"] = body;
            bodyGroup.add(body);
            this.baseHoverY = 0;
        } 
        
        // 2. DIRE WOLF (Forest)
        else if (safeType.includes("wolf")) {
            const mat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.9 });
            const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 1.6), mat);
            body.position.y = 1.0;
            body.castShadow = true;
            
            const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.8), mat);
            head.position.set(0, 1.4, 0.9);
            
            const legGeo = new THREE.BoxGeometry(0.2, 0.8, 0.2);
            for(let i=0; i<4; i++) {
                const leg = new THREE.Mesh(legGeo, mat);
                const xOffset = i % 2 === 0 ? 0.3 : -0.3;
                const zOffset = i < 2 ? 0.5 : -0.5;
                leg.position.set(xOffset, 0.4, zOffset);
                this.bodyParts[`leg_${i}`] = leg;
                bodyGroup.add(leg);
            }
            
            this.bodyParts["mainBody"] = body;
            bodyGroup.add(body, head);
            this.baseHoverY = 0;
        } 
        
        // 3. FROST ELEMENTAL (Winter)
        else if (safeType.includes("frost")) {
            const mat = new THREE.MeshStandardMaterial({ color: 0x88ccff, transparent: true, opacity: 0.8, emissive: 0x0044aa });
            const core = new THREE.Mesh(new THREE.OctahedronGeometry(1.0, 0), mat);
            core.position.y = 2.0;
            this.bodyParts["mainBody"] = core;
            bodyGroup.add(core);

            // Orbiting crystals
            for(let i=0; i<3; i++) {
                const shard = new THREE.Mesh(new THREE.TetrahedronGeometry(0.4, 0), mat);
                const angle = (i / 3) * Math.PI * 2;
                shard.position.set(Math.cos(angle)*1.5, 2.0, Math.sin(angle)*1.5);
                this.bodyParts[`shard_${i}`] = shard;
                bodyGroup.add(shard);
            }
            this.baseHoverY = 2.0;
        } 
        
        // 4. SAND CRAWLER (Desert)
        else if (safeType.includes("crawler")) {
            const mat = new THREE.MeshStandardMaterial({ color: 0xcc9955, roughness: 0.8 });
            const shell = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 1.2), mat);
            shell.position.y = 0.4;
            
            const tail = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.8, 0.3), mat);
            tail.position.set(0, 0.8, -0.7);
            tail.rotation.x = -Math.PI / 4;

            this.bodyParts["mainBody"] = shell;
            bodyGroup.add(shell, tail);
            this.baseHoverY = 0;
        } 
        
        // 5. PLAGUE TOAD (Swamp)
        else if (safeType.includes("toad")) {
            const mat = new THREE.MeshStandardMaterial({ color: 0x334422, roughness: 0.9, bumpScale: 0.5 });
            const body = new THREE.Mesh(new THREE.SphereGeometry(1.2, 12, 12), mat);
            body.scale.set(1.0, 0.6, 1.0);
            body.position.y = 0.7;
            this.bodyParts["mainBody"] = body;
            bodyGroup.add(body);
            this.baseHoverY = 0;
        } 
        
        // 6. CORRUPTED ENT (Elven)
        else if (safeType.includes("ent")) {
            const barkMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 1.0 });
            const leafMat = new THREE.MeshStandardMaterial({ color: 0x221133, emissive: 0x110022 }); // Dark corrupted leaves
            
            const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 3.5, 8), barkMat);
            trunk.position.y = 1.75;
            this.bodyParts["mainBody"] = trunk;
            
            const canopy = new THREE.Mesh(new THREE.DodecahedronGeometry(2.0, 0), leafMat);
            canopy.position.y = 4.0;
            
            const armGeo = new THREE.CylinderGeometry(0.2, 0.2, 2.0, 8);
            const armL = new THREE.Mesh(armGeo, barkMat);
            armL.position.set(-1.0, 2.0, 0);
            armL.rotation.z = Math.PI / 4;
            this.bodyParts["arm_0"] = armL;

            const armR = new THREE.Mesh(armGeo, barkMat);
            armR.position.set(1.0, 2.0, 0);
            armR.rotation.z = -Math.PI / 4;
            this.bodyParts["arm_1"] = armR;

            bodyGroup.add(trunk, canopy, armL, armR);
            this.baseHoverY = 0;
        } 
        
        // 7. ELVEN WRAITH (Elven)
        else if (safeType.includes("wraith")) {
            const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x6600aa, transparent: true, opacity: 0.6 });
            const cloak = new THREE.Mesh(new THREE.ConeGeometry(0.8, 2.5, 16), mat);
            cloak.position.y = 2.0;
            this.bodyParts["mainBody"] = cloak;

            const hood = new THREE.Mesh(new THREE.SphereGeometry(0.6, 16, 16), mat);
            hood.position.y = 3.2;

            bodyGroup.add(cloak, hood);
            this.baseHoverY = 2.0;
        } 
        
        // FALLBACK
        else {
            const mat = new THREE.MeshStandardMaterial({ color: 0x442255 });
            const body = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), mat);
            body.scale.set(1.5, 3.0, 1.5);
            body.position.y = 1.5;
            this.bodyParts["mainBody"] = body;
            bodyGroup.add(body);
            this.baseHoverY = 0;
        }

        this.mesh.add(bodyGroup);

        // Shadow Blob
        const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3 });
        const shadow = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shadowMat);
        shadow.rotation.x = -Math.PI / 2;
        shadow.position.y = 0.02;
        this.mesh.add(shadow);
    }

    // Updated to accept the action parameter from TownScene
    public update(dt: number, isMoving: boolean, action?: string) {
        if (isNaN(this.targetPosition.x)) this.targetPosition.x = 0;
        if (isNaN(this.targetPosition.y)) this.targetPosition.y = 0;
        if (isNaN(this.targetPosition.z)) this.targetPosition.z = 0;

        if (!this.isInitialized) {
            this.mesh.position.copy(this.targetPosition);
            this.isInitialized = true;
        }

        this.animTime += dt;
        const safeType = this.type.toLowerCase();
        const body = this.bodyParts["mainBody"];
        
        // --- CUSTOM ANIMATIONS PER MONSTER TYPE ---
        if (body) {
            if (safeType.includes("slime") || safeType.includes("toad")) {
                // Bouncing logic
                if (isMoving) {
                    const hopSpeed = safeType.includes("slime") ? 15 : 10;
                    const hopHeight = safeType.includes("slime") ? 1.0 : 0.6;
                    body.position.y = Math.abs(Math.sin(this.animTime * hopSpeed)) * hopHeight + 0.6;
                    body.scale.y = 0.8 + Math.abs(Math.cos(this.animTime * hopSpeed)) * 0.4;
                } else {
                    body.position.y = 0.6;
                    body.scale.y = 0.8 + Math.sin(this.animTime * 3) * 0.1; // Gentle idle breathing
                }
            } 
            else if (safeType.includes("wolf")) {
                // Quadruped running
                if (isMoving) {
                    const runSpeed = 20;
                    const swing = Math.sin(this.animTime * runSpeed);
                    if (this.bodyParts["leg_0"]) this.bodyParts["leg_0"].rotation.x = swing * 0.8;
                    if (this.bodyParts["leg_1"]) this.bodyParts["leg_1"].rotation.x = -swing * 0.8;
                    if (this.bodyParts["leg_2"]) this.bodyParts["leg_2"].rotation.x = -swing * 0.8;
                    if (this.bodyParts["leg_3"]) this.bodyParts["leg_3"].rotation.x = swing * 0.8;
                    body.position.y = 1.0 + Math.abs(swing) * 0.2;
                } else {
                    for(let i=0; i<4; i++) { if (this.bodyParts[`leg_${i}`]) this.bodyParts[`leg_${i}`].rotation.x = 0; }
                    body.position.y = 1.0;
                }
            } 
            else if (safeType.includes("ent")) {
                // Heavy bipedal lumbering
                if (isMoving) {
                    const walkSpeed = 8;
                    const swing = Math.sin(this.animTime * walkSpeed);
                    if (this.bodyParts["arm_0"]) this.bodyParts["arm_0"].rotation.x = -swing * 0.5;
                    if (this.bodyParts["arm_1"]) this.bodyParts["arm_1"].rotation.x = swing * 0.5;
                    body.rotation.z = Math.sin(this.animTime * walkSpeed * 0.5) * 0.1; // lumber side to side
                } else {
                    if (this.bodyParts["arm_0"]) this.bodyParts["arm_0"].rotation.x = 0;
                    if (this.bodyParts["arm_1"]) this.bodyParts["arm_1"].rotation.x = 0;
                    body.rotation.z = 0;
                }
            } 
            else if (safeType.includes("frost")) {
                // Floating and spinning
                body.position.y = this.baseHoverY + Math.sin(this.animTime * 2) * 0.3;
                body.rotation.y += dt;
                
                // Orbit shards
                for(let i=0; i<3; i++) {
                    const shard = this.bodyParts[`shard_${i}`];
                    if (shard) {
                        const angle = (i / 3) * Math.PI * 2 + (this.animTime * 3);
                        shard.position.set(Math.cos(angle)*1.5, 2.0 + Math.cos(this.animTime*5 + i)*0.5, Math.sin(angle)*1.5);
                        shard.rotation.x += dt * 2;
                        shard.rotation.z += dt * 2;
                    }
                }
            }
            else if (safeType.includes("wraith")) {
                // Hovering ghost
                body.position.y = this.baseHoverY + Math.sin(this.animTime * 3) * 0.4;
            }
        }

        // --- MOVEMENT LERP ---
        const moveLerp = 1.0 - Math.exp(-10.0 * dt);
        this.mesh.position.lerp(this.targetPosition, moveLerp);

        // --- ROTATION INTERPOLATION ---
        if (isMoving || action === "attacking") {
            const dx = this.targetPosition.x - this.mesh.position.x;
            const dz = this.targetPosition.z - this.mesh.position.z;
            
            // If they are attacking, they might not be moving coords, but they should face the player
            // You can rely on targetPosition being set to the player's position during an attack 
            // (which you handle in TownRoom via `enemy.targetX = nearestPlayer.x`)
            if (Math.abs(dx) > 0.01 || Math.abs(dz) > 0.01) {
                const targetRotation = Math.atan2(dx, dz);
                if (!isNaN(targetRotation)) {
                    let diff = targetRotation - this.mesh.rotation.y;
                    while (diff < -Math.PI) diff += Math.PI * 2;
                    while (diff > Math.PI) diff -= Math.PI * 2;
                    this.mesh.rotation.y += diff * (1.0 - Math.exp(-12.0 * dt));
                }
            }
        }
    }
}