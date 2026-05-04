import * as THREE from "three";

export class EnemyModel {
    public mesh: THREE.Group;
    public targetPosition: THREE.Vector3;
    public type: string;
    public animTime: number = 0;
    
    private bodyParts: { [key: string]: THREE.Object3D } = {};
    private isInitialized = false;
    private baseHoverY: number = 0;
    private bodyGroup: THREE.Group;

    constructor(type: string) {
        this.mesh = new THREE.Group();
        this.targetPosition = new THREE.Vector3(0, 5, 0); // Spawn high to drop in safely
        this.type = type || "Unknown";
        
        this.bodyGroup = new THREE.Group();
        this.mesh.position.copy(this.targetPosition);
        
        this.buildModel();
        this.mesh.add(this.bodyGroup);
        this.addShadowBlob();
    }

    private buildModel() {
        const safeType = this.type.toLowerCase();

        // 1. Build Base Geometry
        if (safeType.includes("slime")) {
            this.buildSlime(safeType);
        } else if (safeType.includes("wolf")) {
            this.buildWolf(safeType);
        } else if (safeType.includes("frost")) {
            this.buildFrostElemental(safeType);
        } else if (safeType.includes("crawler")) {
            this.buildCrawler(safeType);
        } else if (safeType.includes("toad")) {
            this.buildToad(safeType);
        } else if (safeType.includes("ent")) {
            this.buildEnt(safeType);
        } else if (safeType.includes("wraith")) {
            this.buildWraith(safeType);
        } else if (safeType.includes("goblin")) {
            this.buildGoblin(safeType);
        } else {
            this.buildFallback();
        }

        // 2. Global Variant Overlays
        const isElite = safeType.includes("elite") || safeType.includes("alpha");
        const isBoss = safeType.includes("king") || safeType.includes("boss");
        const isCorrupted = safeType.includes("corrupt") || safeType.includes("necrotic");
        const isFire = safeType.includes("fire") || safeType.includes("ember");

        if (isElite) this.mesh.scale.setScalar(1.2);
        if (isBoss) this.mesh.scale.setScalar(1.5);
        if (isCorrupted) this.addAura(this.bodyGroup, 0x8800ff, 1.8);
        if (isFire && !safeType.includes("fire")) this.addAura(this.bodyGroup, 0xff4400, 1.5);
    }

    // ==========================================
    // AFFLICTION STATUS
    // ==========================================

    public setAfflictions(afflictions: string[]) {
        const hasBleed = afflictions.includes("Bleed");
        const hasNecrosis = afflictions.includes("Necrosis");
        const hasIlluminated = afflictions.includes("Illuminated");

        let emissive = 0x000000;

        if (hasBleed && hasNecrosis) emissive = 0x550055;
        else if (hasBleed) emissive = 0x550000;
        else if (hasNecrosis) emissive = 0x330066;
        else if (hasIlluminated) emissive = 0x555500;

        this.mesh.traverse((child: any) => {
            if (child instanceof THREE.Mesh && child.material && child.material.emissive !== undefined) {
                child.material.emissive.setHex(emissive);
            }
        });
    }

    // ==========================================
    // ENEMY BUILDERS
    // ==========================================

    private buildSlime(type: string) {
        const innerColor = type.includes("elite") ? 0xff3333 : 0x33ff33;
        
        // Inner Core
        const coreMat = new THREE.MeshStandardMaterial({ color: innerColor, emissive: innerColor, emissiveIntensity: 0.5 });
        const core = new THREE.Mesh(new THREE.SphereGeometry(0.4, 16, 16), coreMat);
        core.position.y = 0.6;
        
        // Transparent Shell
        const shellMat = new THREE.MeshStandardMaterial({ color: innerColor, transparent: true, opacity: 0.5, roughness: 0.1 });
        const shell = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), shellMat);
        shell.scale.set(1.0, 0.8, 1.0);
        shell.position.y = 0.6;
        shell.castShadow = true;

        this.bodyGroup.add(core, shell);
        this.bodyParts["mainBody"] = shell;
        this.bodyParts["core"] = core;

        this.addEyes(shell, 0x111111, [new THREE.Vector3(-0.3, 0.2, 0.7), new THREE.Vector3(0.3, 0.2, 0.7)], 0.1);
        this.addParticles(shell, 8, 0xffffff, 0.6); // Bubbles inside
        
        if (type.includes("aura")) this.addAura(this.bodyGroup, innerColor, 1.2);
        this.baseHoverY = 0;
    }

    private buildWolf(type: string) {
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.9 }); // Dark predator
        const eyeColor = 0xff0000;

        const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 1.5), bodyMat);
        body.position.y = 0.9;
        body.castShadow = true;
        this.bodyParts["mainBody"] = body;

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.6), bodyMat);
        head.position.set(0, 0.4, 0.9);
        this.bodyParts["head"] = head;
        body.add(head);

        // Details
        this.addSnout(head, bodyMat);
        this.addEars(head, bodyMat);
        this.addTail(body, bodyMat);
        this.addEyes(head, eyeColor, [new THREE.Vector3(-0.2, 0.1, 0.31), new THREE.Vector3(0.2, 0.1, 0.31)], 0.08);
        this.addSpikes(body, 4, 0x111111, (i) => new THREE.Vector3(0, 0.35, -0.4 + i * 0.25)); // Raised hackles
        this.addLimbs(body, bodyMat, 4, new THREE.Vector3(0.25, -0.5, 0.5)); // Legs

        this.bodyGroup.add(body);
        this.baseHoverY = 0;
    }

    private buildFrostElemental(type: string) {
        const coreMat = new THREE.MeshStandardMaterial({ color: 0x88ccff, transparent: true, opacity: 0.9, emissive: 0x0044aa });
        const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.8, 0), coreMat);
        core.position.y = 2.0;
        this.bodyParts["mainBody"] = core;
        this.bodyGroup.add(core);

        // Orbiting crystals
        for(let i=0; i<4; i++) {
            const shard = new THREE.Mesh(new THREE.TetrahedronGeometry(0.3, 0), coreMat);
            this.bodyParts[`shard_${i}`] = shard;
            this.bodyGroup.add(shard);
        }

        this.addAura(this.bodyGroup, 0x0088ff, 1.5, true); // Icy ring beneath
        this.baseHoverY = 2.0;
    }

    private buildCrawler(type: string) {
        const mat = new THREE.MeshStandardMaterial({ color: 0x332211, roughness: 0.9 });
        
        const body = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.3, 1.4), mat);
        body.position.y = 0.3;
        this.bodyParts["mainBody"] = body;

        // Tail
        const tail = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.8, 0.2), mat);
        tail.position.set(0, 0.5, -0.8);
        tail.rotation.x = -Math.PI / 4;
        this.addSpikes(tail, 1, 0x44ff44, () => new THREE.Vector3(0, 0.4, 0)); // Poison stinger
        body.add(tail);

        // Mandibles & Legs
        this.addMandibles(body, mat);
        this.addLimbs(body, mat, 6, new THREE.Vector3(0.6, -0.1, 0.4), 0.1, 0.4); 

        this.bodyGroup.add(body);
        this.baseHoverY = 0;
    }

    private buildToad(type: string) {
        const mat = new THREE.MeshStandardMaterial({ color: 0x224422, roughness: 1.0 });
        
        const body = new THREE.Mesh(new THREE.SphereGeometry(1.0, 16, 16), mat);
        body.scale.set(1.2, 0.6, 1.0);
        body.position.y = 0.6;
        this.bodyParts["mainBody"] = body;

        // Big Eyes
        const eyeBase = new THREE.MeshStandardMaterial({ color: 0x113311 });
        const leftEyeBase = new THREE.Mesh(new THREE.SphereGeometry(0.3), eyeBase);
        leftEyeBase.position.set(-0.5, 0.8, 0.5);
        const rightEyeBase = new THREE.Mesh(new THREE.SphereGeometry(0.3), eyeBase);
        rightEyeBase.position.set(0.5, 0.8, 0.5);
        body.add(leftEyeBase, rightEyeBase);
        
        this.addEyes(body, 0xffaa00, [new THREE.Vector3(-0.5, 0.9, 0.7), new THREE.Vector3(0.5, 0.9, 0.7)], 0.1);
        this.addWarts(body, 8, 0x112211);

        if (type.includes("poison")) this.addAura(this.bodyGroup, 0x55ff55, 1.5);
        this.bodyGroup.add(body);
        this.baseHoverY = 0;
    }

    private buildEnt(type: string) {
        const barkMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 1.0 });
        const leafMat = new THREE.MeshStandardMaterial({ color: 0x114411 });
        
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.8, 3.0, 7), barkMat);
        trunk.position.y = 2.0;
        this.bodyParts["mainBody"] = trunk;

        const canopy = new THREE.Mesh(new THREE.DodecahedronGeometry(1.8, 0), leafMat);
        canopy.position.y = 1.8;
        trunk.add(canopy);

        // Glowing carved eyes
        this.addEyes(trunk, 0xffaa00, [new THREE.Vector3(-0.25, 0.5, 0.55), new THREE.Vector3(0.25, 0.5, 0.55)], 0.08);
        
        // Branch Horns & Limbs
        this.addHorns(trunk, barkMat);
        this.addLimbs(trunk, barkMat, 2, new THREE.Vector3(0.9, 0.5, 0), 0.2, 1.8); // Arms
        
        this.bodyGroup.add(trunk);
        this.baseHoverY = 0;
    }

    private buildWraith(type: string) {
        const cloakMat = new THREE.MeshStandardMaterial({ color: 0x111111, transparent: true, opacity: 0.8 });
        const cloak = new THREE.Mesh(new THREE.ConeGeometry(0.8, 2.5, 8), cloakMat);
        cloak.position.y = 1.8;
        this.bodyParts["mainBody"] = cloak;

        const hood = new THREE.Mesh(new THREE.SphereGeometry(0.5, 12, 12), cloakMat);
        hood.position.set(0, 1.2, 0.1);
        cloak.add(hood);

        this.addEyes(hood, 0xaa00ff, [new THREE.Vector3(-0.15, 0.1, 0.45), new THREE.Vector3(0.15, 0.1, 0.45)], 0.06);
        this.addParticles(cloak, 12, 0xaa00ff, 1.2); // Orbiting dark/purple magic

        this.bodyGroup.add(cloak);
        this.baseHoverY = 1.5;
    }

    private buildGoblin(type: string) {
        const isKing = type.includes("king");
        const skinMat = new THREE.MeshStandardMaterial({ color: 0x44aa44, roughness: 0.8 });
        
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.0, 0.6), skinMat);
        body.position.y = 0.5;
        this.bodyParts["mainBody"] = body;

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.5, 0.6), skinMat);
        head.position.set(0, 0.75, 0.1);
        body.add(head);

        this.addEars(head, skinMat, true); // Pointy horizontal ears
        this.addSnout(head, skinMat, 0.15); // Nose
        this.addWeapon(body, isKing);

        if (isKing) {
            body.scale.set(1.4, 1.4, 1.4);
            body.position.y = 0.7;
            this.addCrown(head);
            this.addCape(body);
        }

        this.bodyGroup.add(body);
        this.baseHoverY = 0;
    }

    private buildFallback() {
        const mat = new THREE.MeshStandardMaterial({ color: 0xff00ff });
        const body = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1), mat);
        body.position.y = 1;
        this.bodyParts["mainBody"] = body;
        this.bodyGroup.add(body);
    }

    // ==========================================
    // PROCEDURAL HELPERS
    // ==========================================

    private addEyes(parent: THREE.Object3D, color: number, positions: THREE.Vector3[], size: number) {
        const eyeMat = new THREE.MeshStandardMaterial({ 
            color, 
            emissive: color, 
            emissiveIntensity: 1.8, 
            roughness: 0.25 
        });
        positions.forEach((pos, i) => {
            const eye = new THREE.Mesh(new THREE.SphereGeometry(size, 8, 8), eyeMat);
            eye.position.copy(pos);
            parent.add(eye);
            this.bodyParts[`eye_${i}`] = eye;
        });
    }

    private addLimbs(parent: THREE.Object3D, mat: THREE.Material, count: number, offset: THREE.Vector3, thickness=0.15, length=0.8) {
        const geo = new THREE.BoxGeometry(thickness, length, thickness);
        for(let i=0; i<count; i++) {
            const limb = new THREE.Mesh(geo, mat);
            const xSign = i % 2 === 0 ? 1 : -1;
            const zFactor = count > 2 ? (i < 2 ? 1 : (i < 4 ? -1 : 0)) : 0; // Distribute pairs
            
            limb.position.set(offset.x * xSign, offset.y, offset.z * zFactor);
            this.bodyParts[`limb_${i}`] = limb;
            parent.add(limb);
        }
    }

    private addSnout(parent: THREE.Object3D, mat: THREE.Material, size = 0.3) {
        const snout = new THREE.Mesh(new THREE.BoxGeometry(size*1.2, size, size*1.5), mat);
        snout.position.set(0, -0.1, 0.4);
        parent.add(snout);
    }

    private addEars(parent: THREE.Object3D, mat: THREE.Material, horizontal = false) {
        const geo = new THREE.ConeGeometry(0.15, 0.4, 4);
        const earL = new THREE.Mesh(geo, mat);
        const earR = new THREE.Mesh(geo, mat);
        
        if (horizontal) {
            earL.rotation.z = Math.PI / 2;
            earR.rotation.z = -Math.PI / 2;
            earL.position.set(-0.4, 0, 0);
            earR.position.set(0.4, 0, 0);
        } else {
            earL.position.set(-0.2, 0.4, 0);
            earR.position.set(0.2, 0.4, 0);
        }
        parent.add(earL, earR);
    }

    private addTail(parent: THREE.Object3D, mat: THREE.Material) {
        const tail = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.6), mat);
        tail.position.set(0, 0.2, -0.9);
        tail.rotation.x = -Math.PI / 6;
        parent.add(tail);
    }

    private addSpikes(parent: THREE.Object3D, count: number, color: number, posFunc: (i: number) => THREE.Vector3) {
        const mat = new THREE.MeshStandardMaterial({ color });
        const geo = new THREE.ConeGeometry(0.1, 0.3, 4);
        for(let i=0; i<count; i++) {
            const spike = new THREE.Mesh(geo, mat);
            spike.position.copy(posFunc(i));
            spike.rotation.x = -Math.PI / 4;
            parent.add(spike);
        }
    }

    private addAura(parent: THREE.Object3D, color: number, radius: number, isFlat = false) {
        const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.4, side: THREE.DoubleSide });
        const geo = isFlat ? new THREE.RingGeometry(radius-0.2, radius, 16) : new THREE.TorusGeometry(radius, 0.05, 8, 16);
        const aura = new THREE.Mesh(geo, mat);
        aura.rotation.x = Math.PI / 2;
        aura.position.y = 0.1;
        this.bodyParts["aura"] = aura;
        parent.add(aura);
    }

    private addParticles(parent: THREE.Object3D, count: number, color: number, radius: number) {
        const mat = new THREE.MeshBasicMaterial({ color });
        for(let i=0; i<count; i++) {
            const p = new THREE.Mesh(new THREE.SphereGeometry(0.05), mat);
            p.userData = { angle: (i/count)*Math.PI*2, radius, speed: 1 + Math.random() };
            this.bodyParts[`particle_${i}`] = p;
            parent.add(p);
        }
    }

    private addWarts(parent: THREE.Object3D, count: number, color: number) {
        const mat = new THREE.MeshStandardMaterial({ color });
        for(let i=0; i<count; i++) {
            const wart = new THREE.Mesh(new THREE.SphereGeometry(0.1), mat);
            // Randomish placement on top half
            wart.position.set((Math.random()-0.5)*1.5, Math.random()*0.5 + 0.3, (Math.random()-0.5)*1.5);
            parent.add(wart);
        }
    }

    private addHorns(parent: THREE.Object3D, mat: THREE.Material) {
        const geo = new THREE.CylinderGeometry(0.05, 0.1, 0.8);
        const hornL = new THREE.Mesh(geo, mat);
        hornL.position.set(-0.4, 1.2, 0);
        hornL.rotation.z = Math.PI / 4;
        const hornR = new THREE.Mesh(geo, mat);
        hornR.position.set(0.4, 1.2, 0);
        hornR.rotation.z = -Math.PI / 4;
        parent.add(hornL, hornR);
    }

    private addWeapon(parent: THREE.Object3D, isKing: boolean) {
        const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8), new THREE.MeshStandardMaterial({color: 0x332211}));
        handle.position.set(0.6, 0, 0.3);
        handle.rotation.x = Math.PI / 2;
        
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.6, 0.3), new THREE.MeshStandardMaterial({color: isKing ? 0xffbb00 : 0xaaaaaa}));
        blade.position.set(0, 0.4, 0);
        handle.add(blade);
        
        this.bodyParts["weapon"] = handle;
        parent.add(handle);
    }

    private addCrown(parent: THREE.Object3D) {
        const crown = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.4, 5), new THREE.MeshStandardMaterial({ color: 0xffaa00, metalness: 0.8 }));
        crown.position.y = 0.4;
        crown.rotation.x = Math.PI; // upside down cone
        parent.add(crown);
    }

    private addCape(parent: THREE.Object3D) {
        const cape = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.1), new THREE.MeshStandardMaterial({ color: 0xaa0000 }));
        cape.position.set(0, -0.2, -0.4);
        cape.rotation.x = -0.2;
        parent.add(cape);
    }

    private addShadowBlob() {
        const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.3 });
        const shadow = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shadowMat);
        shadow.rotation.x = -Math.PI / 2;
        shadow.position.y = 0.02;
        this.mesh.add(shadow);
    }

    private addMandibles(parent: THREE.Object3D, mat: THREE.Material) {
        const geo = new THREE.BoxGeometry(0.1, 0.1, 0.4);
        
        const leftMandible = new THREE.Mesh(geo, mat);
        leftMandible.position.set(-0.2, -0.1, 0.7);
        leftMandible.rotation.y = -Math.PI / 6; // Angle inward

        const rightMandible = new THREE.Mesh(geo, mat);
        rightMandible.position.set(0.2, -0.1, 0.7);
        rightMandible.rotation.y = Math.PI / 6; // Angle inward

        parent.add(leftMandible, rightMandible);
    }

    // ==========================================
    // UPDATE LOOP
    // ==========================================

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
        
        // --- BASE TYPE ANIMATIONS ---
        if (body) {
            if (safeType.includes("slime") || safeType.includes("toad")) {
                if (isMoving) {
                    const hopSpeed = safeType.includes("slime") ? 15 : 10;
                    const hopHeight = safeType.includes("slime") ? 1.0 : 0.6;
                    body.position.y = Math.abs(Math.sin(this.animTime * hopSpeed)) * hopHeight + 0.6;
                    body.scale.y = 0.8 + Math.abs(Math.cos(this.animTime * hopSpeed)) * 0.4; // Squash/stretch
                } else {
                    body.position.y = 0.6;
                    body.scale.y = 0.8 + Math.sin(this.animTime * 3) * 0.1; 
                }
            } 
            else if (safeType.includes("wolf") || safeType.includes("crawler")) {
                if (isMoving) {
                    const runSpeed = 20;
                    const swing = Math.sin(this.animTime * runSpeed);
                    for(let i=0; i<6; i++) {
                        if (this.bodyParts[`limb_${i}`]) {
                            this.bodyParts[`limb_${i}`].rotation.x = (i % 2 === 0 ? swing : -swing) * 0.8;
                        }
                    }
                    body.position.y = (safeType.includes("wolf") ? 0.9 : 0.3) + Math.abs(swing) * 0.1;
                    if (this.bodyParts["head"]) this.bodyParts["head"].rotation.x = Math.sin(this.animTime * runSpeed) * 0.2;
                } else {
                    for(let i=0; i<6; i++) { if (this.bodyParts[`limb_${i}`]) this.bodyParts[`limb_${i}`].rotation.x = 0; }
                    body.position.y = safeType.includes("wolf") ? 0.9 : 0.3;
                }
            } 
            else if (safeType.includes("ent")) {
                if (isMoving) {
                    const walkSpeed = 6;
                    const swing = Math.sin(this.animTime * walkSpeed);
                    if (this.bodyParts["limb_0"]) this.bodyParts["limb_0"].rotation.x = -swing * 0.5;
                    if (this.bodyParts["limb_1"]) this.bodyParts["limb_1"].rotation.x = swing * 0.5;
                    body.rotation.z = swing * 0.05; 
                } else {
                    if (this.bodyParts["limb_0"]) this.bodyParts["limb_0"].rotation.x = 0;
                    if (this.bodyParts["limb_1"]) this.bodyParts["limb_1"].rotation.x = 0;
                    body.rotation.z = 0;
                }
            } 
            else if (safeType.includes("frost")) {
                body.position.y = this.baseHoverY + Math.sin(this.animTime * 2) * 0.3;
                body.rotation.y += dt * 0.5;
                for(let i=0; i<4; i++) {
                    const shard = this.bodyParts[`shard_${i}`];
                    if (shard) {
                        const angle = (i / 4) * Math.PI * 2 + (this.animTime * 2);
                        shard.position.set(Math.cos(angle)*1.2, 2.0 + Math.cos(this.animTime*4 + i)*0.3, Math.sin(angle)*1.2);
                        shard.rotation.x += dt;
                    }
                }
            }
            else if (safeType.includes("wraith")) {
                body.position.y = this.baseHoverY + Math.sin(this.animTime * 2) * 0.3;
            }
            else if (safeType.includes("goblin")) {
                const isKing = safeType.includes("king");
                const baseY = isKing ? 0.7 : 0.5;
                if (isMoving) {
                    const walkSpeed = isKing ? 12 : 18;
                    body.position.y = baseY + Math.abs(Math.sin(this.animTime * walkSpeed)) * 0.2;
                    body.rotation.z = Math.sin(this.animTime * walkSpeed * 0.5) * 0.15;
                } else {
                    body.position.y = baseY;
                    body.rotation.z = 0;
                }
            }

            // Animate generic particles/aura
            if (this.bodyParts["aura"]) this.bodyParts["aura"].rotation.z += dt;
            Object.keys(this.bodyParts).forEach(key => {
                if (key.startsWith("particle_")) {
                    const p = this.bodyParts[key];
                    p.userData.angle += dt * p.userData.speed;
                    p.position.set(
                        Math.cos(p.userData.angle) * p.userData.radius,
                        (Math.sin(this.animTime * 5 + p.userData.angle) * 0.5),
                        Math.sin(p.userData.angle) * p.userData.radius
                    );
                }
            });
        }

        // --- GLOBAL ACTION STATES ---
        const isAttacking = action === "attacking";
        const isRecovering = action === "recovering";
        const isStunned = action === "stunned";

        if (isAttacking) {
            this.bodyGroup.scale.setScalar(1.0 + Math.sin(this.animTime * 30) * 0.08);
            this.bodyGroup.rotation.x = -0.25;
            if (this.bodyParts["weapon"]) {
                this.bodyParts["weapon"].rotation.x = Math.sin(this.animTime * 20) * 1.5;
            }
        } else if (isRecovering) {
            this.bodyGroup.scale.y = 0.85;
            this.bodyGroup.rotation.x = 0.15;
        } else if (isStunned) {
            this.bodyGroup.rotation.z = Math.sin(this.animTime * 20) * 0.15;
        } else {
            this.bodyGroup.scale.lerp(new THREE.Vector3(1, 1, 1), 0.15);
            this.bodyGroup.rotation.x = THREE.MathUtils.lerp(this.bodyGroup.rotation.x, 0, 0.15);
            this.bodyGroup.rotation.z = THREE.MathUtils.lerp(this.bodyGroup.rotation.z, 0, 0.15);
        }

        // --- MOVEMENT & ROTATION LERP ---
        const moveLerp = 1.0 - Math.exp(-10.0 * dt);
        this.mesh.position.lerp(this.targetPosition, moveLerp);

        if (isMoving || isAttacking) {
            const dx = this.targetPosition.x - this.mesh.position.x;
            const dz = this.targetPosition.z - this.mesh.position.z;
            
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