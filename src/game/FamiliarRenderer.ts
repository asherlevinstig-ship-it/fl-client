import * as THREE from "three";

const DEBUG_FAMILIARS = false;

export interface FamiliarVisual {
    mesh: THREE.Group;
    type: string;
    targetPosition: THREE.Vector3;
    isDetached: boolean;
    action: string; 
    particles: THREE.Mesh[]; 
    customData: any; 
}

interface ActiveVFX {
    mesh: THREE.Mesh;
    life: number;
    maxLife: number;
    update: (dt: number, vfx: ActiveVFX) => boolean; 
    onDeath?: (vfx: ActiveVFX) => void;
}

export class FamiliarRenderer {
    private scene: THREE.Scene;
    public visuals = new Map<string, FamiliarVisual>();

    // --- PERFORMANCE: Shared Caches and Pools ---
    private geoCache = new Map<string, THREE.BufferGeometry>();
    private matCache = new Map<string, THREE.Material>();
    private vfxPools = new Map<string, THREE.Mesh[]>();
    private activeVFX: ActiveVFX[] = [];

    constructor(scene: THREE.Scene) {
        this.scene = scene;
        if (DEBUG_FAMILIARS) console.log("[FamiliarRenderer] 🟢 Initialized and attached to Scene.");
    }

    private getGeo(key: string, createFn: () => THREE.BufferGeometry): THREE.BufferGeometry {
        if (!this.geoCache.has(key)) this.geoCache.set(key, createFn());
        return this.geoCache.get(key)!;
    }

    private getMat(key: string, createFn: () => THREE.Material): THREE.Material {
        if (!this.matCache.has(key)) this.matCache.set(key, createFn());
        return this.matCache.get(key)!;
    }

    private getVFXMesh(type: string, createFn: () => THREE.Mesh): THREE.Mesh {
        if (!this.vfxPools.has(type)) this.vfxPools.set(type, []);
        const pool = this.vfxPools.get(type)!;
        if (pool.length > 0) return pool.pop()!;
        return createFn();
    }

    private releaseVFXMesh(type: string, mesh: THREE.Mesh) {
        mesh.removeFromParent();
        this.vfxPools.get(type)!.push(mesh);
    }

    /**
     * Spawns the initial 3D mesh and rigs up all limbs/lights.
     */
    public addFamiliar(id: string, type: string, x: number, y: number, z: number) {
        if (this.visuals.has(id)) return;

        const group = new THREE.Group();
        group.position.set(x, y + 1.0, z);
        const particles: THREE.Mesh[] = [];
        const customData: any = {};

        // --- 1. APOCALYPTIC SWARM ---
        if (type === "apocalyptic_swarm") {
            const particleCount = 15;
            const geo = this.getGeo('swarm_box', () => new THREE.BoxGeometry(0.15, 0.15, 0.15));
            const matRed = this.getMat('swarm_red', () => new THREE.MeshStandardMaterial({ color: 0xaa0000, roughness: 0.3 }));
            const matBlack = this.getMat('swarm_black', () => new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.8 }));

            for (let i = 0; i < particleCount; i++) {
                const mesh = new THREE.Mesh(geo, Math.random() > 0.5 ? matRed : matBlack);
                mesh.position.set((Math.random() - 0.5) * 2.0, (Math.random() - 0.5) * 2.0, (Math.random() - 0.5) * 2.0);
                mesh.userData = {
                    orbitSpeed: 2.0 + Math.random() * 3.0,
                    orbitAxis: new THREE.Vector3(Math.random(), Math.random(), Math.random()).normalize()
                };
                mesh.castShadow = false;
                group.add(mesh);
                particles.push(mesh);
            }
        }
        // --- 2. ORBITAL ARBITER ---
        else if (type === "orbital_arbiter") {
            const eyeGeo = this.getGeo('arbiter_eye', () => new THREE.SphereGeometry(0.35, 16, 16));
            const eyeMat = this.getMat('arbiter_mat', () => new THREE.MeshStandardMaterial({ color: 0x111111, emissive: 0x00aaff, emissiveIntensity: 2.0 }));
            const eye = new THREE.Mesh(eyeGeo, eyeMat);
            group.add(eye);
            particles.push(eye);
            
            const ringGeo = this.getGeo('arbiter_ring', () => new THREE.TorusGeometry(0.6, 0.03, 8, 32));
            const ringMat = this.getMat('arbiter_ring_mat', () => new THREE.MeshStandardMaterial({ color: 0x00aaff, emissive: 0x0055ff, emissiveIntensity: 1.0, transparent: true, opacity: 0.8 }));
            const ring1 = new THREE.Mesh(ringGeo, ringMat);
            const ring2 = new THREE.Mesh(ringGeo, ringMat);
            const ring3 = new THREE.Mesh(ringGeo, ringMat);
            
            ring1.rotation.x = Math.PI / 2;
            ring2.rotation.y = Math.PI / 2;
            ring3.rotation.z = Math.PI / 4;
            ring1.castShadow = false; ring2.castShadow = false; ring3.castShadow = false;
            
            customData.rings = [ring1, ring2, ring3];
            group.add(ring1, ring2, ring3);

            // Add dynamic glow
            const light = new THREE.PointLight(0x00aaff, 1.5, 5);
            group.add(light);
        }
        // --- 3. VOID SERVANT ---
        else if (type === "void_servant") {
            const mat = this.getMat('void_mat', () => new THREE.MeshStandardMaterial({ color: 0x050505, transparent: true, opacity: 0.6, roughness: 0.1, depthWrite: false }));
            const body = new THREE.Mesh(this.getGeo('void_body', () => new THREE.ConeGeometry(0.3, 1.2, 8)), mat);
            const head = new THREE.Mesh(this.getGeo('void_head', () => new THREE.SphereGeometry(0.25, 8, 8)), mat);
            
            body.position.y = 0.6;
            body.rotation.x = Math.PI; // Invert cone to look like a floating cloak
            head.position.y = 1.3;
            
            group.add(body, head);
            particles.push(body, head);
        }
        // --- 4. SHADOW MONARCH ---
        else if (type === "shadow_monarch") {
            const mat = this.getMat('monarch_mat', () => new THREE.MeshStandardMaterial({ color: 0x111111, emissive: 0x440088, emissiveIntensity: 0.8 }));
            const body = new THREE.Mesh(this.getGeo('monarch_body', () => new THREE.BoxGeometry(0.7, 0.9, 0.5)), mat);
            const head = new THREE.Mesh(this.getGeo('monarch_head', () => new THREE.BoxGeometry(0.35, 0.4, 0.4)), mat);
            
            // Add crown
            const crownGeo = this.getGeo('monarch_crown', () => new THREE.ConeGeometry(0.2, 0.3, 4));
            const crownMat = this.getMat('monarch_crown_mat', () => new THREE.MeshStandardMaterial({ color: 0xffcc00, emissive: 0xffcc00, emissiveIntensity: 0.5 }));
            const crown = new THREE.Mesh(crownGeo, crownMat);
            
            body.position.y = 0.8;
            head.position.y = 1.5;
            crown.position.y = 1.8;
            crown.rotation.y = Math.PI / 4;

            body.castShadow = true; head.castShadow = true;
            group.add(body, head, crown);
            particles.push(body, head, crown);
        }
        // --- 5. DRAGON HOARDER (Mountable) ---
        else if (type === "dragon_hoarder") {
            const mat = this.getMat('dragon_mat', () => new THREE.MeshStandardMaterial({ color: 0xdd4400, roughness: 0.4 }));
            const bellyMat = this.getMat('dragon_belly', () => new THREE.MeshStandardMaterial({ color: 0xffaa44, roughness: 0.6 }));
            
            const body = new THREE.Mesh(this.getGeo('dragon_body', () => new THREE.BoxGeometry(0.6, 0.5, 1.0)), mat);
            const head = new THREE.Mesh(this.getGeo('dragon_head', () => new THREE.BoxGeometry(0.4, 0.4, 0.5)), bellyMat);
            const tail = new THREE.Mesh(this.getGeo('dragon_tail', () => new THREE.ConeGeometry(0.2, 0.8, 4)), mat);
            const wingGeo = this.getGeo('dragon_wing', () => new THREE.PlaneGeometry(1.2, 0.6));
            
            const wingL = new THREE.Mesh(wingGeo, mat);
            const wingR = new THREE.Mesh(wingGeo, mat);
            
            body.position.y = 0.6;
            head.position.set(0, 0.9, 0.6);
            tail.position.set(0, 0.5, -0.7);
            tail.rotation.x = -Math.PI / 2.5;
            
            wingL.position.set(-0.4, 0.8, 0); wingL.rotation.y = -Math.PI / 4; wingL.rotation.x = -Math.PI / 2;
            wingR.position.set(0.4, 0.8, 0); wingR.rotation.y = Math.PI / 4; wingR.rotation.x = -Math.PI / 2;
            
            body.castShadow = true; head.castShadow = true;
            group.add(body, head, tail, wingL, wingR);
            customData.wings = [wingL, wingR];
            particles.push(body, head, tail);
        }
        // --- 6. STORM GRYPHON (New Mount) ---
        else if (type === "storm_gryphon") {
            const featherMat = this.getMat('gryphon_feather', () => new THREE.MeshStandardMaterial({ color: 0xeeffff, roughness: 0.8 }));
            const beakMat = this.getMat('gryphon_beak', () => new THREE.MeshStandardMaterial({ color: 0xffcc00, roughness: 0.4 }));
            
            const body = new THREE.Mesh(this.getGeo('gryphon_body', () => new THREE.CylinderGeometry(0.4, 0.3, 1.2, 8)), featherMat);
            const head = new THREE.Mesh(this.getGeo('gryphon_head', () => new THREE.SphereGeometry(0.3, 8, 8)), featherMat);
            const beak = new THREE.Mesh(this.getGeo('gryphon_beak_geo', () => new THREE.ConeGeometry(0.1, 0.3, 4)), beakMat);
            const tail = new THREE.Mesh(this.getGeo('gryphon_tail', () => new THREE.BoxGeometry(0.1, 0.1, 0.6)), featherMat);
            
            const wingGeo = this.getGeo('gryphon_wing', () => new THREE.PlaneGeometry(1.5, 0.5));
            const wingL = new THREE.Mesh(wingGeo, featherMat);
            const wingR = new THREE.Mesh(wingGeo, featherMat);

            body.rotation.x = Math.PI / 2; // Lay flat
            body.position.y = 0.8;
            head.position.set(0, 1.2, 0.5);
            beak.position.set(0, 1.2, 0.8);
            beak.rotation.x = Math.PI / 2;
            tail.position.set(0, 0.8, -0.8);

            // Wing pivots
            const pivotL = new THREE.Group(); pivotL.position.set(-0.3, 0.9, 0);
            const pivotR = new THREE.Group(); pivotR.position.set(0.3, 0.9, 0);
            
            wingL.position.set(-0.7, 0, 0); wingL.rotation.x = -Math.PI / 2;
            wingR.position.set(0.7, 0, 0); wingR.rotation.x = -Math.PI / 2;
            
            pivotL.add(wingL); pivotR.add(wingR);

            body.castShadow = true; wingL.castShadow = true; wingR.castShadow = true;
            group.add(body, head, beak, tail, pivotL, pivotR);
            
            customData.wings = [pivotL, pivotR];
            particles.push(body, head);
        }
        // --- 7. IRONCLAD BEHEMOTH (New Mount) ---
        else if (type === "ironclad_behemoth") {
            const armorMat = this.getMat('behemoth_armor', () => new THREE.MeshStandardMaterial({ color: 0x444455, metalness: 0.6, roughness: 0.5 }));
            const woodMat = this.getMat('behemoth_wood', () => new THREE.MeshStandardMaterial({ color: 0x5c3a21 }));
            const hornMat = this.getMat('behemoth_horn', () => new THREE.MeshStandardMaterial({ color: 0xdddddd, roughness: 0.2 }));

            const body = new THREE.Mesh(this.getGeo('behemoth_body', () => new THREE.BoxGeometry(1.2, 1.0, 2.0)), armorMat);
            const head = new THREE.Mesh(this.getGeo('behemoth_head', () => new THREE.BoxGeometry(0.8, 0.7, 0.8)), armorMat);
            const horn = new THREE.Mesh(this.getGeo('behemoth_horn_geo', () => new THREE.ConeGeometry(0.2, 0.6, 4)), hornMat);
            const howdah = new THREE.Mesh(this.getGeo('behemoth_howdah', () => new THREE.BoxGeometry(1.0, 0.4, 1.0)), woodMat);
            
            // Legs for walking animation
            const legGeo = this.getGeo('behemoth_leg', () => new THREE.BoxGeometry(0.3, 0.8, 0.3));
            const legFL = new THREE.Mesh(legGeo, armorMat);
            const legFR = new THREE.Mesh(legGeo, armorMat);
            const legBL = new THREE.Mesh(legGeo, armorMat);
            const legBR = new THREE.Mesh(legGeo, armorMat);

            body.position.y = 1.2;
            head.position.set(0, 1.0, 1.2);
            horn.position.set(0, 1.2, 1.6);
            horn.rotation.x = Math.PI / 3;
            howdah.position.set(0, 1.9, 0); // Saddle on top

            legFL.position.set(-0.45, 0.4, 0.8);
            legFR.position.set(0.45, 0.4, 0.8);
            legBL.position.set(-0.45, 0.4, -0.8);
            legBR.position.set(0.45, 0.4, -0.8);

            group.add(body, head, horn, howdah, legFL, legFR, legBL, legBR);
            
            customData.legs = [legFL, legFR, legBL, legBR];
            particles.push(body, head, howdah);
        }
        // --- 8. SYMBIOTIC SPIRIT ---
        else if (type === "symbiotic_spirit") {
            const coreGeo = this.getGeo('pixie_core', () => new THREE.SphereGeometry(0.2, 16, 16));
            const coreMat = this.getMat('pixie_core_mat', () => new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x00ffaa, emissiveIntensity: 2.0 }));
            const core = new THREE.Mesh(coreGeo, coreMat);
            group.add(core);
            particles.push(core);

            const light = new THREE.PointLight(0x00ffaa, 1.0, 6);
            group.add(light);

            const trailGeo = this.getGeo('pixie_trail', () => new THREE.SphereGeometry(0.05, 8, 8));
            const trailMat = this.getMat('pixie_trail_mat', () => new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.6 }));
            for(let i=0; i<5; i++) {
                const p = new THREE.Mesh(trailGeo, trailMat);
                p.castShadow = false;
                group.add(p);
                customData.trail = customData.trail || [];
                customData.trail.push(p);
            }
        }
        // --- 9. ASTRAL REFLECTION ---
        else if (type === "astral_reflection") {
            const mat = this.getMat('gemini_mat', () => new THREE.MeshPhysicalMaterial({ 
                color: 0xaaddff, metalness: 0.1, roughness: 0.1, 
                transmission: 0.9, opacity: 0.7, transparent: true,
                emissive: 0x0055aa, emissiveIntensity: 0.2
            }));
            const torso = new THREE.Mesh(this.getGeo('gemini_torso', () => new THREE.BoxGeometry(0.8, 0.8, 0.4)), mat);
            const head = new THREE.Mesh(this.getGeo('gemini_head', () => new THREE.SphereGeometry(0.3, 16, 16)), mat);
            
            torso.position.y = 1.2;
            head.position.y = 1.85;
            group.add(torso, head);
            particles.push(torso, head);
        }
        // --- 10. PRIMAL BEAST ---
        else if (type === "primal_beast") {
            const mat = this.getMat('beast_mat', () => new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.9 }));
            const body = new THREE.Mesh(this.getGeo('beast_body', () => new THREE.BoxGeometry(0.7, 0.6, 1.3)), mat);
            const head = new THREE.Mesh(this.getGeo('beast_head', () => new THREE.BoxGeometry(0.4, 0.4, 0.5)), mat);
            
            const legGeo = this.getGeo('beast_leg', () => new THREE.BoxGeometry(0.2, 0.5, 0.2));
            const legFL = new THREE.Mesh(legGeo, mat);
            const legFR = new THREE.Mesh(legGeo, mat);
            const legBL = new THREE.Mesh(legGeo, mat);
            const legBR = new THREE.Mesh(legGeo, mat);

            body.position.y = 0.7;
            head.position.set(0, 0.9, 0.8);
            
            legFL.position.set(-0.25, 0.25, 0.5);
            legFR.position.set(0.25, 0.25, 0.5);
            legBL.position.set(-0.25, 0.25, -0.5);
            legBR.position.set(0.25, 0.25, -0.5);

            body.castShadow = true; head.castShadow = true;
            group.add(body, head, legFL, legFR, legBL, legBR);
            
            customData.legs = [legFL, legFR, legBL, legBR];
            particles.push(body, head);
        }
        // --- 11. RADIANT SERAPH ---
        else if (type === "radiant_seraph") {
            const swordMat = this.getMat('seraph_sword', () => new THREE.MeshStandardMaterial({ color: 0xffffee, emissive: 0xffdd00, emissiveIntensity: 1.5 }));
            const haloMat = this.getMat('seraph_halo', () => new THREE.MeshBasicMaterial({ color: 0xffdd00, transparent: true, opacity: 0.8 }));
            const wingMat = this.getMat('seraph_wing', () => new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, side: THREE.DoubleSide }));
            
            const blade = new THREE.Mesh(this.getGeo('seraph_blade', () => new THREE.BoxGeometry(0.1, 1.4, 0.3)), swordMat);
            const guard = new THREE.Mesh(this.getGeo('seraph_guard', () => new THREE.BoxGeometry(0.5, 0.1, 0.5)), swordMat);
            const halo = new THREE.Mesh(this.getGeo('seraph_halo_geo', () => new THREE.TorusGeometry(0.5, 0.04, 8, 32)), haloMat);
            
            const wingGeo = this.getGeo('seraph_wing_geo', () => new THREE.PlaneGeometry(1.0, 2.5));
            const wingL = new THREE.Mesh(wingGeo, wingMat);
            const wingR = new THREE.Mesh(wingGeo, wingMat);
            
            blade.position.y = 1.0;
            guard.position.y = 1.6;
            halo.position.y = 2.2; halo.rotation.x = Math.PI / 2;
            
            wingL.position.set(-0.6, 1.5, 0); wingL.rotation.y = -Math.PI / 6;
            wingR.position.set(0.6, 1.5, 0); wingR.rotation.y = Math.PI / 6;

            const light = new THREE.PointLight(0xffdd00, 2.0, 8);
            light.position.y = 1.5;

            customData.halo = halo;
            customData.wings = [wingL, wingR];
            group.add(blade, guard, halo, wingL, wingR, light);
            particles.push(blade, guard);
        }

        this.scene.add(group);

        this.visuals.set(id, {
            mesh: group,
            type: type,
            targetPosition: new THREE.Vector3(x, y, z), 
            isDetached: false,
            action: "orbiting",
            particles: particles,
            customData: customData
        });

        if (DEBUG_FAMILIARS) {
            if (typeof globalThis !== "undefined") {
                (globalThis as any).debugFamiliar = group;
            }
            console.log(`[FamiliarRenderer] ✅ Successfully added ${type} to Scene!`);
        }
    }

    /**
     * Updates the target position and state from the server.
     * @param action Tells the renderer if it is "orbiting", "mounted", "attacking", etc.
     */
    public updateFamiliar(id: string, x: number, y: number, z: number, isDetached: boolean, action: string = "orbiting") {
        const visual = this.visuals.get(id);
        if (!visual) return;

        visual.targetPosition.set(x, y, z);
        visual.isDetached = isDetached;
        visual.action = action;
    }

    /**
     * Runs every frame to handle lerping, limb animations, and active VFX updates.
     */
    public animate(dt: number, time: number) {
        const moveLerp = 1.0 - Math.exp(-10.0 * dt);

        this.visuals.forEach((visual) => {
            // Apply positioning
            visual.mesh.position.x = THREE.MathUtils.lerp(visual.mesh.position.x, visual.targetPosition.x, moveLerp);
            visual.mesh.position.z = THREE.MathUtils.lerp(visual.mesh.position.z, visual.targetPosition.z, moveLerp);

            const baseY = visual.targetPosition.y;
            const dx = visual.targetPosition.x - visual.mesh.position.x;
            const dz = visual.targetPosition.z - visual.mesh.position.z;
            const distSqCalc = dx * dx + dz * dz;
            const isMoving = distSqCalc > 0.01; 

            // Calculate rotation if moving, unless it's a non-directional floating pet
            const floatingPets = ["apocalyptic_swarm", "orbital_arbiter", "symbiotic_spirit"];
            if (isMoving && !floatingPets.includes(visual.type)) {
                // Smooth rotation turning
                const targetAngle = Math.atan2(dx, dz);
                let angleDiff = targetAngle - visual.mesh.rotation.y;
                while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
                while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
                visual.mesh.rotation.y += angleDiff * moveLerp;
            }

            // --- ANIMATION BY TYPE ---
            if (visual.type === "apocalyptic_swarm") {
                visual.mesh.position.y = THREE.MathUtils.lerp(visual.mesh.position.y, baseY + 1.0, moveLerp);

                const swirlSpeed = visual.isDetached ? 4.0 : 1.5;
                visual.mesh.rotation.y += dt * swirlSpeed;
                
                const targetScale = visual.isDetached ? 3.5 : 1.0;
                const newScale = THREE.MathUtils.lerp(visual.mesh.scale.x, targetScale, dt * 5.0);
                visual.mesh.scale.setScalar(newScale);

                visual.particles.forEach((p) => {
                    p.position.applyAxisAngle(p.userData.orbitAxis, dt * p.userData.orbitSpeed);
                    const scale = 1.0 + Math.sin(time * 5.0 + p.position.x) * 0.2;
                    p.scale.setScalar(scale);
                });
            } 
            else if (visual.type === "orbital_arbiter") {
                visual.mesh.position.y = baseY + 1.5 + Math.sin(time * 2.0) * 0.2;
                if (visual.customData.rings) {
                    const spinMult = visual.action === "attacking" ? 4.0 : 1.0;
                    visual.customData.rings[0].rotation.x += dt * 1.0 * spinMult;
                    visual.customData.rings[1].rotation.y += dt * 1.5 * spinMult;
                    visual.customData.rings[2].rotation.z -= dt * 2.0 * spinMult;
                }
            }
            else if (visual.type === "void_servant" || visual.type === "shadow_monarch" || visual.type === "astral_reflection") {
                visual.mesh.position.y = baseY + 1.0 + Math.sin(time * 3.0) * 0.1;
                
                // Bobbing while moving
                if (isMoving) {
                    visual.mesh.position.y += Math.abs(Math.sin(time * 15.0)) * 0.15;
                }
            }
            else if (visual.type === "dragon_hoarder") {
                const flyHeight = visual.action === "transformed" ? 2.5 : 1.0;
                visual.mesh.position.y = THREE.MathUtils.lerp(visual.mesh.position.y, baseY + flyHeight + Math.sin(time * 4.0) * 0.2, moveLerp);
                
                if (visual.customData.wings) {
                    const flapSpeed = isMoving ? 15.0 : 5.0;
                    const flap = Math.sin(time * flapSpeed) * 0.5;
                    visual.customData.wings[0].rotation.y = -Math.PI / 4 + flap;
                    visual.customData.wings[1].rotation.y = Math.PI / 4 - flap;
                }
            }
            else if (visual.type === "storm_gryphon") {
                const flyHeight = visual.action === "mounted" ? 0.0 : 1.5;
                visual.mesh.position.y = THREE.MathUtils.lerp(visual.mesh.position.y, baseY + flyHeight + Math.sin(time * 3.0) * 0.15, moveLerp);
                
                if (visual.customData.wings) {
                    const flapSpeed = isMoving ? 18.0 : 6.0;
                    const flapAmp = isMoving ? 0.6 : 0.2;
                    const flap = Math.sin(time * flapSpeed) * flapAmp;
                    visual.customData.wings[0].rotation.z = flap; // Pivot along body
                    visual.customData.wings[1].rotation.z = -flap;
                }
            }
            else if (visual.type === "ironclad_behemoth") {
                visual.mesh.position.y = baseY; // Sticks to ground
                if (isMoving && visual.customData.legs) {
                    const walkSpeed = 12.0;
                    const swing = Math.sin(time * walkSpeed) * 0.4;
                    visual.customData.legs[0].rotation.x = swing;   // FL
                    visual.customData.legs[1].rotation.x = -swing;  // FR
                    visual.customData.legs[2].rotation.x = -swing;  // BL
                    visual.customData.legs[3].rotation.x = swing;   // BR
                    
                    visual.mesh.position.y += Math.abs(Math.sin(time * walkSpeed * 2)) * 0.05; // Heavy plod
                } else if (visual.customData.legs) {
                    visual.customData.legs.forEach((l: THREE.Mesh) => l.rotation.x = 0);
                }
            }
            else if (visual.type === "primal_beast") {
                visual.mesh.position.y = baseY; // Sticks to ground
                if (isMoving && visual.customData.legs) {
                    const walkSpeed = 18.0;
                    const swing = Math.sin(time * walkSpeed) * 0.5;
                    visual.customData.legs[0].rotation.x = swing;  
                    visual.customData.legs[1].rotation.x = -swing; 
                    visual.customData.legs[2].rotation.x = -swing; 
                    visual.customData.legs[3].rotation.x = swing;  
                    
                    visual.mesh.position.y += Math.abs(Math.sin(time * walkSpeed * 2)) * 0.1;
                } else if (visual.customData.legs) {
                    visual.customData.legs.forEach((l: THREE.Mesh) => l.rotation.x = 0);
                }
            }
            else if (visual.type === "symbiotic_spirit") {
                visual.mesh.position.y = baseY + 1.5 + Math.sin(time * 2.0) * 0.3;
                if (visual.customData.trail) {
                    visual.customData.trail.forEach((p: THREE.Mesh, i: number) => {
                        p.position.x = Math.sin(time * 3.0 + i) * 0.3;
                        p.position.y = Math.cos(time * 4.0 + i) * 0.3;
                        p.position.z = Math.sin(time * 2.0 + i) * 0.3;
                    });
                }
            }
            else if (visual.type === "radiant_seraph") {
                visual.mesh.position.y = baseY + 1.0 + Math.sin(time * 2.0) * 0.2;
                if (visual.customData.halo) {
                    visual.customData.halo.rotation.z -= dt * 1.0;
                }
                if (visual.customData.wings) {
                    const flap = Math.sin(time * 2.0) * 0.2;
                    visual.customData.wings[0].rotation.y = -Math.PI / 6 + flap;
                    visual.customData.wings[1].rotation.y = Math.PI / 6 - flap;
                }
            }
        });

        // --- PERFORMANCE: Process Active VFX loops ---
        for (let i = this.activeVFX.length - 1; i >= 0; i--) {
            const vfx = this.activeVFX[i];
            const isAlive = vfx.update(dt, vfx);
            if (!isAlive) {
                if (vfx.onDeath) vfx.onDeath(vfx);
                this.activeVFX.splice(i, 1);
            }
        }
    }

    /**
     * Handles one-off visual effects using object pools.
     */
    public playAbilityVisual(id: string, abilityId: string, targetX?: number, targetZ?: number) {
        // Fix: Route correctly to the "fam_" prefixed key to match Colyseus state mapping
        const familiarId = id.startsWith("fam_") ? id : `fam_${id}`;
        const visual = this.visuals.get(familiarId);
        
        if (!visual) return;

        if (abilityId === "swarm_devour_cast") {
            visual.particles.forEach(p => {
                if (p.material instanceof THREE.MeshStandardMaterial) {
                    p.material.emissive.setHex(0xff0000); 
                    p.material.emissiveIntensity = 1.0;
                }
            });
        } 
        else if (abilityId === "swarm_return") {
            visual.particles.forEach(p => {
                if (p.material instanceof THREE.MeshStandardMaterial) {
                    p.material.emissiveIntensity = 0;
                }
            });
        }
        else if (abilityId === "gordon_laser" || abilityId === "gordon_annihilation") {
            if (targetX === undefined || targetZ === undefined) return;

            const laser = this.getVFXMesh('laser', () => {
                const geo = new THREE.CylinderGeometry(1, 1, 1, 8);
                geo.translate(0, 0.5, 0); 
                geo.rotateX(Math.PI / 2); 
                const mat = new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
                return new THREE.Mesh(geo, mat);
            });

            const startPos = visual.mesh.position.clone();
            startPos.y += 1.5; 
            const targetPos = new THREE.Vector3(targetX, visual.targetPosition.y + 1.0, targetZ);
            const distance = startPos.distanceTo(targetPos);

            const thickness = abilityId === "gordon_annihilation" ? 0.3 : 0.05;
            laser.scale.set(thickness, thickness, distance); 

            laser.position.copy(startPos);
            laser.lookAt(targetPos);
            (laser.material as THREE.Material).opacity = 0.8;
            this.scene.add(laser);

            const fadeTime = abilityId === "gordon_annihilation" ? 3.0 : 0.2; 

            this.activeVFX.push({
                mesh: laser,
                life: fadeTime,
                maxLife: fadeTime,
                update: (dt, vfx) => {
                    vfx.life -= dt;
                    if (vfx.life <= 0) return false;
                    
                    (vfx.mesh.material as THREE.Material).opacity = 0.8 * (vfx.life / vfx.maxLife);
                    
                    if (abilityId === "gordon_annihilation") {
                        vfx.mesh.position.copy(visual.mesh.position);
                        vfx.mesh.position.y += 1.5;
                        vfx.mesh.lookAt(targetPos);
                    }
                    return true;
                },
                onDeath: (vfx) => this.releaseVFXMesh('laser', vfx.mesh)
            });
        }
        else if (abilityId === "stash_true_form") {
            // Smoothly scaling is handled by action state, but we can jump it here if preferred
            visual.mesh.scale.setScalar(4.0);
        }
        else if (abilityId === "stash_revert") {
            visual.mesh.scale.setScalar(1.0);
        }
        else if (abilityId === "pixie_lifeline" || abilityId === "pixie_cleanse") {
            const isLifeline = abilityId === "pixie_lifeline";
            
            const flash = this.getVFXMesh('pixie_flash', () => {
                const geo = new THREE.SphereGeometry(1.0, 16, 16);
                const mat = new THREE.MeshBasicMaterial({ color: 0xff66cc, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
                return new THREE.Mesh(geo, mat);
            });

            flash.position.copy(visual.mesh.position);
            flash.scale.setScalar(isLifeline ? 4.0 : 2.0);
            (flash.material as THREE.Material).opacity = 0.8;
            this.scene.add(flash);

            const animTime = 0.5; 
            
            this.activeVFX.push({
                mesh: flash,
                life: animTime,
                maxLife: animTime,
                update: (dt, vfx) => {
                    vfx.life -= dt;
                    if (vfx.life <= 0) return false;

                    const progress = 1.0 - (vfx.life / vfx.maxLife);
                    const baseScale = isLifeline ? 4.0 : 2.0;
                    
                    vfx.mesh.scale.setScalar(baseScale + progress * 2.0);
                    (vfx.mesh.material as THREE.Material).opacity = 0.8 * (1.0 - progress);
                    
                    return true;
                },
                onDeath: (vfx) => this.releaseVFXMesh('pixie_flash', vfx.mesh)
            });

            if (isLifeline) visual.mesh.visible = false;
        }
        else if (abilityId === "familiar_respawn") {
            visual.mesh.visible = true;
        }
        else if (abilityId === "seraph_aegis") {
            if (targetX === undefined || targetZ === undefined) return;
            
            const wall = this.getVFXMesh('aegis_wall', () => {
                const geo = new THREE.BoxGeometry(4.0, 3.0, 0.2);
                const mat = new THREE.MeshBasicMaterial({ color: 0xffdd00, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
                return new THREE.Mesh(geo, mat);
            });

            wall.position.set(targetX, visual.targetPosition.y + 1.5, targetZ);
            const dx = targetX - visual.mesh.position.x;
            const dz = targetZ - visual.mesh.position.z;
            wall.rotation.y = Math.atan2(dx, dz);
            
            this.scene.add(wall);
            
            this.activeVFX.push({
                mesh: wall,
                life: 5.0,
                maxLife: 5.0,
                update: (dt, vfx) => {
                    vfx.life -= dt;
                    return vfx.life > 0;
                },
                onDeath: (vfx) => this.releaseVFXMesh('aegis_wall', vfx.mesh)
            });
        }
    }

    public removeFamiliar(id: string) {
        if (DEBUG_FAMILIARS) console.log(`[FamiliarRenderer] 🗑️ REMOVING Familiar: ID=${id}`);
        const visual = this.visuals.get(id);
        if (!visual) return;

        this.scene.remove(visual.mesh);
        this.visuals.delete(id);
    }

    public dispose() {
        this.visuals.forEach((_, id) => this.removeFamiliar(id));
        
        for (const geo of this.geoCache.values()) geo.dispose();
        this.geoCache.clear();
        
        for (const mat of this.matCache.values()) mat.dispose();
        this.matCache.clear();
        
        this.vfxPools.forEach(pool => {
            pool.forEach(mesh => {
                if (mesh.geometry) mesh.geometry.dispose();
                if (mesh.material instanceof THREE.Material) mesh.material.dispose();
            });
        });
        this.vfxPools.clear();
        this.activeVFX = [];
    }
}