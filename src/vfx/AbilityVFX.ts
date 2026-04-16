import * as THREE from "three";

export function spawnAbilityVFX(
    threeScene: THREE.Scene, 
    abilityId: string, 
    targetX: number, 
    targetZ: number, 
    terrainHeight: number = 0,
    playerVisual?: { mesh: THREE.Object3D }
) {
    if (!threeScene) return;

    // Helper for snappy animations (Ease-Out Cubic)
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    // ==========================================
    // 🌑 SHADOW PATHWAY VFX
    // ==========================================
    if (abilityId === "reaper_step" || abilityId === "shadow_step") {
        // High-fidelity Void Implosion
        const group = new THREE.Group();
        group.position.set(targetX, terrainHeight + 1.0, targetZ);

        // 1. Inward collapsing void sphere
        const coreGeo = new THREE.SphereGeometry(2.0, 16, 16);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x110022, transparent: true, opacity: 0.9 });
        const core = new THREE.Mesh(coreGeo, coreMat);
        group.add(core);

        // 2. Void particles sucking inward
        const pCount = 30;
        const pGeo = new THREE.TetrahedronGeometry(0.15);
        const pMat = new THREE.MeshBasicMaterial({ color: 0x6600cc, blending: THREE.AdditiveBlending });
        const particles = new THREE.InstancedMesh(pGeo, pMat, pCount);
        const pData = Array.from({ length: pCount }, () => ({
            vec: new THREE.Vector3((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6),
            speed: 0.2 + Math.random() * 0.2
        }));
        group.add(particles);

        threeScene.add(group);

        let life = 1.0;
        const dummy = new THREE.Object3D();
        const anim = setInterval(() => {
            if (!group.parent) { clearInterval(anim); return; }

            life -= 0.05;
            
            // Core collapses
            const s = Math.max(0.01, life * 2.0);
            core.scale.setScalar(s);
            core.rotation.y += 0.5;

            // Particles suck into the center
            pData.forEach((p, i) => {
                p.vec.lerp(new THREE.Vector3(0,0,0), p.speed);
                dummy.position.copy(p.vec);
                dummy.rotation.x += 0.2;
                dummy.scale.setScalar(life);
                dummy.updateMatrix();
                particles.setMatrixAt(i, dummy.matrix);
            });
            particles.instanceMatrix.needsUpdate = true;

            if (life <= 0) {
                clearInterval(anim);
                threeScene.remove(group);
                coreGeo.dispose(); coreMat.dispose();
                pGeo.dispose(); pMat.dispose(); particles.dispose();
            }
        }, 20);
    }
    else if (abilityId === "shadow_step_dash" || abilityId === "umbral_dash") {
        // Creates a sleek purple after-image streak connecting the start and end points
        let startX = targetX;
        let startZ = targetZ;
        
        if (playerVisual && playerVisual.mesh) {
            startX = playerVisual.mesh.position.x;
            startZ = playerVisual.mesh.position.z;
        }
        
        const dist = Math.sqrt((targetX - startX)**2 + (targetZ - startZ)**2) || 0.1;
        
        const geo = new THREE.CylinderGeometry(0.8, 0.8, dist, 8);
        geo.rotateX(Math.PI / 2);
        const mat = new THREE.MeshBasicMaterial({ color: 0x440088, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
        const streak = new THREE.Mesh(geo, mat);
        
        streak.position.set((startX + targetX)/2, terrainHeight + 1, (startZ + targetZ)/2);
        streak.lookAt(targetX, terrainHeight + 1, targetZ);
        
        threeScene.add(streak);
        
        let scale = 1.0;
        const anim = setInterval(() => {
            if (!streak.parent) { clearInterval(anim); return; }

            scale -= 0.1;
            streak.scale.set(scale, 1.0, scale);
            mat.opacity = scale;
            if (scale <= 0) {
                clearInterval(anim);
                threeScene.remove(streak);
                geo.dispose(); mat.dispose();
            }
        }, 20);
    }
    else if (abilityId === "shadow_anchor_spawn") {
        const poolGeo = new THREE.CircleGeometry(1.5, 32);
        poolGeo.rotateX(-Math.PI / 2);
        const poolMat = new THREE.MeshBasicMaterial({ color: 0x220044, transparent: true, opacity: 0.7, depthWrite: false });
        const pool = new THREE.Mesh(poolGeo, poolMat);
        
        pool.position.set(targetX, terrainHeight + 0.05, targetZ);
        pool.userData.isAnchor = true;
        threeScene.add(pool);

        const anim = setInterval(() => {
            if (!pool.parent) {
                clearInterval(anim);
                return;
            }
            pool.rotation.z += 0.01;
        }, 30);

        setTimeout(() => {
            clearInterval(anim);
            if (pool.parent) threeScene.remove(pool);
            poolGeo.dispose(); poolMat.dispose();
        }, 300000);
    }
    else if (abilityId === "town_portal_spawn") {
        const portalGroup = new THREE.Group();
        portalGroup.position.set(targetX, terrainHeight, targetZ);
        portalGroup.userData.isTownPortal = true;
        portalGroup.userData.forceDestroy = false;

        if (playerVisual && playerVisual.mesh) {
            portalGroup.rotation.y = playerVisual.mesh.rotation.y;
        }

        const frameGeo = new THREE.BoxGeometry(2.8, 5.0, 0.2);
        const frameMat = new THREE.MeshBasicMaterial({ color: 0x0088ff, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
        const frameMesh = new THREE.Mesh(frameGeo, frameMat);
        frameMesh.position.y = 2.5; 
        portalGroup.add(frameMesh);

        const voidGeo = new THREE.BoxGeometry(2.5, 4.7, 0.25);
        const voidMat = new THREE.MeshBasicMaterial({ color: 0x000011 });
        const voidMesh = new THREE.Mesh(voidGeo, voidMat);
        voidMesh.position.y = 2.5;
        portalGroup.add(voidMesh);

        const particleCount = 50;
        const pGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
        const pMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, blending: THREE.AdditiveBlending });
        const pMesh = new THREE.InstancedMesh(pGeo, pMat, particleCount);
        
        const pData = Array.from({ length: particleCount }, () => ({
            x: (Math.random() - 0.5) * 2.6,
            y: Math.random() * 5.0,
            z: (Math.random() - 0.5) * 0.6,
            speedY: 0.03 + Math.random() * 0.05,
            speedX: (Math.random() - 0.5) * 0.02,
            scale: Math.random() * 0.6 + 0.4
        }));

        const dummy = new THREE.Object3D();
        portalGroup.add(pMesh);
        threeScene.add(portalGroup);

        let life = 15.0; 
        let growPhase = 0.0;
        
        portalGroup.scale.set(1, 0.001, 1);

        const anim = setInterval(() => {
            if (!portalGroup.parent) { clearInterval(anim); return; }

            if (portalGroup.userData.forceDestroy) {
                life = Math.min(life, 0.3); 
                portalGroup.userData.forceDestroy = false; 
            }

            life -= 0.03; 
            
            if (growPhase < 1.0 && life > 0.3) {
                growPhase += 0.1;
                const easeO = 1 - Math.pow(1 - growPhase, 3);
                portalGroup.scale.set(1, Math.max(0.001, easeO), 1);
            }

            frameMat.opacity = 0.5 + Math.sin(life * 5) * 0.3;

            for (let i = 0; i < particleCount; i++) {
                const p = pData[i];
                p.y += p.speedY;
                p.x += p.speedX;
                
                if (p.y > 5.0) {
                    p.y = 0;
                    p.x = (Math.random() - 0.5) * 2.6; 
                }

                dummy.position.set(p.x, p.y, p.z);
                const heightScale = Math.sin((p.y / 5.0) * Math.PI); 
                dummy.scale.setScalar(p.scale * heightScale);
                dummy.rotation.x += 0.05;
                dummy.rotation.y += 0.05;
                dummy.updateMatrix();
                pMesh.setMatrixAt(i, dummy.matrix);
            }
            pMesh.instanceMatrix.needsUpdate = true;

            if (life <= 0.3 && life > 0) {
                portalGroup.scale.set(1, Math.max(0.001, life * 3.33), 1);
            }

            if (life <= 0) {
                clearInterval(anim);
                if (portalGroup.parent) threeScene.remove(portalGroup);
                frameGeo.dispose(); frameMat.dispose();
                voidGeo.dispose(); voidMat.dispose();
                pGeo.dispose(); pMat.dispose(); pMesh.dispose();
            }
        }, 30);
    }
    else if (abilityId === "town_portal_destroy") {
        threeScene.children.forEach(c => {
            if (c.userData.isTownPortal && Math.abs(c.position.x - targetX) < 1 && Math.abs(c.position.z - targetZ) < 1) {
                c.userData.forceDestroy = true;
            }
        });
    }
    else if (abilityId === "town_recall_teleport") {
        const flashGeo = new THREE.CylinderGeometry(2, 2, 10, 16);
        const flashMat = new THREE.MeshBasicMaterial({ color: 0x00aaff, transparent: true, opacity: 1, blending: THREE.AdditiveBlending });
        const flash = new THREE.Mesh(flashGeo, flashMat);
        flash.position.set(targetX, terrainHeight + 5, targetZ);
        threeScene.add(flash);
        
        let scale = 1.0;
        const anim = setInterval(() => {
            if (!flash.parent) { clearInterval(anim); return; }

            scale -= 0.1;
            flash.scale.set(scale, 1, scale);
            flashMat.opacity = scale;
            if (scale <= 0) {
                clearInterval(anim);
                threeScene.remove(flash);
                flashGeo.dispose(); flashMat.dispose(); 
            }
        }, 20);
    }
    else if (abilityId === "blood_harvest") {
        // Jagged Slash + Blood Splatter Particles
        const group = new THREE.Group();
        group.position.set(targetX, terrainHeight + 1.0, targetZ);

        const slashGeo = new THREE.TorusGeometry(3.0, 0.3, 4, 20, Math.PI);
        slashGeo.rotateX(-Math.PI / 2);
        slashGeo.rotateZ(-Math.PI / 4); 
        const slashMat = new THREE.MeshBasicMaterial({ color: 0xaa0000, transparent: true, opacity: 1.0, side: THREE.DoubleSide });
        const slash = new THREE.Mesh(slashGeo, slashMat);
        
        if (playerVisual && playerVisual.mesh) {
            slash.rotation.y = Math.atan2(targetX - playerVisual.mesh.position.x, targetZ - playerVisual.mesh.position.z);
        }
        group.add(slash);

        // Blood droplets
        const pCount = 20;
        const pGeo = new THREE.SphereGeometry(0.15, 4, 4);
        const pMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const blood = new THREE.InstancedMesh(pGeo, pMat, pCount);
        const bData = Array.from({ length: pCount }, () => ({
            pos: new THREE.Vector3(0, 0, 0),
            vel: new THREE.Vector3((Math.random() - 0.5) * 0.8, Math.random() * 0.5, (Math.random() - 0.5) * 0.8)
        }));
        group.add(blood);

        threeScene.add(group);

        let life = 0;
        const dummy = new THREE.Object3D();
        const anim = setInterval(() => {
            if (!group.parent) { clearInterval(anim); return; }

            life += 0.05;
            
            // Slash expands and fades
            slash.scale.setScalar(1.0 + life);
            slashMat.opacity = 1.0 - (life * 1.5);

            // Blood splatters outward and falls
            bData.forEach((b, i) => {
                b.pos.add(b.vel);
                b.vel.y -= 0.05; // gravity
                dummy.position.copy(b.pos);
                dummy.scale.setScalar(Math.max(0, 1.0 - life));
                dummy.updateMatrix();
                blood.setMatrixAt(i, dummy.matrix);
            });
            blood.instanceMatrix.needsUpdate = true;

            if (life >= 1.0) {
                clearInterval(anim);
                threeScene.remove(group);
                slashGeo.dispose(); slashMat.dispose();
                pGeo.dispose(); pMat.dispose(); blood.dispose();
            }
        }, 20);
    }
    else if (abilityId === "reapers_toll") {
        const group = new THREE.Group();
        group.position.set(targetX, terrainHeight + 1.0, targetZ);

        const crescentGeo = new THREE.TorusGeometry(5.0, 0.4, 4, 32, Math.PI);
        crescentGeo.rotateX(Math.PI / 2);
        const crescentMat = new THREE.MeshBasicMaterial({ color: 0xcc0000, transparent: true, opacity: 1.0, side: THREE.DoubleSide });
        
        const crescent1 = new THREE.Mesh(crescentGeo, crescentMat);
        const crescent2 = new THREE.Mesh(crescentGeo, crescentMat);
        crescent2.rotation.y = Math.PI;

        group.add(crescent1, crescent2);

        const pCount = 40;
        const pGeo = new THREE.PlaneGeometry(0.3, 1.5);
        const pMat = new THREE.MeshBasicMaterial({ color: 0x770000, transparent: true, opacity: 0.8, side: THREE.DoubleSide });
        const streaks = new THREE.InstancedMesh(pGeo, pMat, pCount);
        
        const sData = Array.from({ length: pCount }, () => {
            const angle = Math.random() * Math.PI * 2;
            return {
                pos: new THREE.Vector3(Math.cos(angle) * 2, (Math.random() - 0.5) * 2, Math.sin(angle) * 2),
                vel: new THREE.Vector3(Math.cos(angle) * 0.4, Math.random() * 0.2, Math.sin(angle) * 0.4),
                rot: angle
            };
        });

        group.add(streaks);
        threeScene.add(group);

        let p = 0;
        const dummy = new THREE.Object3D();
        const anim = setInterval(() => {
            if (!group.parent) { clearInterval(anim); return; }

            p += 0.05;
            
            crescent1.scale.setScalar(1.0 + p * 1.5);
            crescent2.scale.setScalar(1.0 + p * 1.5);
            crescent1.rotation.y += 0.2;
            crescent2.rotation.y += 0.2;
            crescentMat.opacity = 1.0 - p;

            sData.forEach((s, i) => {
                s.pos.add(s.vel);
                s.vel.y -= 0.02; 
                dummy.position.copy(s.pos);
                dummy.rotation.set(0, -s.rot, p * Math.PI);
                dummy.scale.setScalar(1.0 - p);
                dummy.updateMatrix();
                streaks.setMatrixAt(i, dummy.matrix);
            });
            streaks.instanceMatrix.needsUpdate = true;

            if (p >= 1.0) {
                clearInterval(anim);
                threeScene.remove(group);
                crescentGeo.dispose(); crescentMat.dispose();
                pGeo.dispose(); pMat.dispose(); streaks.dispose();
            }
        }, 20);
    }
    else if (abilityId === "deep_wounds") {
        const group = new THREE.Group();
        group.position.set(targetX, terrainHeight + 1.5, targetZ);

        const woundGeo = new THREE.PlaneGeometry(3.0, 0.2);
        const woundMat = new THREE.MeshBasicMaterial({ color: 0xaa0000, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
        
        const w1 = new THREE.Mesh(woundGeo, woundMat);
        w1.rotation.set(Math.PI/2, Math.PI/4, 0);
        const w2 = new THREE.Mesh(woundGeo, woundMat);
        w2.rotation.set(Math.PI/2, -Math.PI/4, 0);
        const w3 = new THREE.Mesh(woundGeo, woundMat);
        w3.rotation.set(Math.PI/2, 0, 0);

        group.add(w1, w2, w3);

        if (playerVisual && playerVisual.mesh) {
            group.lookAt(playerVisual.mesh.position);
        }

        threeScene.add(group);

        let life = 1.0;
        const anim = setInterval(() => {
            if (!group.parent) { clearInterval(anim); return; }

            life -= 0.05;
            const scale = 1.0 + (1.0 - life) * 0.5;
            w1.scale.set(scale, 1, 1);
            w2.scale.set(scale, 1, 1);
            w3.scale.set(scale, 1, 1);
            
            woundMat.opacity = life;

            if (life <= 0) {
                clearInterval(anim);
                threeScene.remove(group);
                woundGeo.dispose(); woundMat.dispose();
            }
        }, 20);
    }
    else if (abilityId === "umbral_snare_spawn") {
        const ringGeo = new THREE.RingGeometry(1.2, 1.5, 6);
        ringGeo.rotateX(-Math.PI / 2);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x7700cc, transparent: true, opacity: 0.5, depthWrite: false });
        const snare = new THREE.Mesh(ringGeo, ringMat);
        snare.position.set(targetX, terrainHeight + 0.05, targetZ);
        
        const innerGeo = new THREE.CircleGeometry(0.8, 3);
        innerGeo.rotateX(-Math.PI / 2);
        const innerMat = new THREE.MeshBasicMaterial({ color: 0x330055, transparent: true, opacity: 0.6, depthWrite: false });
        const inner = new THREE.Mesh(innerGeo, innerMat);
        snare.add(inner);

        snare.userData.isSnare = true;
        threeScene.add(snare);

        const anim = setInterval(() => {
            if (!snare.parent) { clearInterval(anim); return; }
            snare.rotation.y += 0.02;
            inner.rotation.y -= 0.04;
        }, 30);

        setTimeout(() => {
            clearInterval(anim);
            if (snare.parent) threeScene.remove(snare);
            ringGeo.dispose(); ringMat.dispose();
            innerGeo.dispose(); innerMat.dispose();
        }, 60000);
    }
    else if (abilityId === "umbral_snare_trigger") {
        threeScene.children.forEach(c => {
            if (c.userData.isSnare && Math.abs(c.position.x - targetX) < 1 && Math.abs(c.position.z - targetZ) < 1) {
                threeScene.remove(c);
            }
        });

        const spikesGeo = new THREE.ConeGeometry(2, 4, 8);
        spikesGeo.translate(0, 2, 0); 
        const spikesMat = new THREE.MeshBasicMaterial({ color: 0xaa00ff, transparent: true, opacity: 0.9, wireframe: true });
        const spikes = new THREE.Mesh(spikesGeo, spikesMat);
        spikes.position.set(targetX, terrainHeight, targetZ);
        threeScene.add(spikes);

        let progress = 0;
        const anim = setInterval(() => {
            if (!spikes.parent) { clearInterval(anim); return; }

            progress += 0.1;
            if (progress <= 1.0) {
                spikes.scale.set(1, progress, 1);
            } else {
                spikesMat.opacity -= 0.1;
            }

            if (spikesMat.opacity <= 0) {
                clearInterval(anim);
                threeScene.remove(spikes);
                spikesGeo.dispose(); spikesMat.dispose();
            }
        }, 30);
    }
    else if (abilityId === "veil_of_shadows_cast") {
        const smokeGroup = new THREE.Group();
        smokeGroup.position.set(targetX, terrainHeight + 1.0, targetZ);

        const pCount = 15;
        const pGeo = new THREE.SphereGeometry(1.0, 8, 8);
        const pMat = new THREE.MeshBasicMaterial({ color: 0x110033, transparent: true, opacity: 0.9 });
        const smoke = new THREE.InstancedMesh(pGeo, pMat, pCount);
        
        const sData = Array.from({ length: pCount }, () => ({
            pos: new THREE.Vector3((Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2),
            scale: Math.random() * 1.5 + 0.5,
            expandSpeed: 0.05 + Math.random() * 0.05
        }));
        
        smokeGroup.add(smoke);
        threeScene.add(smokeGroup);

        if (playerVisual && playerVisual.mesh) {
            playerVisual.mesh.userData.veilActive = true;
            const stealthMat = new THREE.MeshBasicMaterial({ color: 0x5500aa, transparent: true, opacity: 0.2, wireframe: true, blending: THREE.AdditiveBlending });
            playerVisual.mesh.traverse((child: any) => {
                if (child.isMesh && child.material) {
                    if (!child.userData.origMat) child.userData.origMat = child.material;
                    child.material = stealthMat;
                }
            });
        }

        let life = 1.0;
        const dummy = new THREE.Object3D();
        const anim = setInterval(() => {
            if (!smokeGroup.parent) { clearInterval(anim); return; }

            life -= 0.03;
            pMat.opacity = life;

            sData.forEach((s, i) => {
                s.pos.x *= 1.05; s.pos.y *= 1.05; s.pos.z *= 1.05; 
                dummy.position.copy(s.pos);
                dummy.scale.setScalar(s.scale + (1.0 - life) * 2.0);
                dummy.updateMatrix();
                smoke.setMatrixAt(i, dummy.matrix);
            });
            smoke.instanceMatrix.needsUpdate = true;

            if (life <= 0) {
                clearInterval(anim);
                threeScene.remove(smokeGroup);
                pGeo.dispose(); pMat.dispose(); smoke.dispose();
            }
        }, 30);
    }
    else if (abilityId === "veil_of_shadows_burst" || abilityId === "veil_of_shadows_break") {
        if (playerVisual && playerVisual.mesh) {
            playerVisual.mesh.userData.veilActive = false;
            playerVisual.mesh.traverse((child: any) => {
                if (child.isMesh && child.userData.origMat) {
                    if (child.material !== child.userData.origMat) child.material.dispose();
                    child.material = child.userData.origMat;
                    // Safely check if we are still affected by Nightfall stealth before clearing
                    if (!playerVisual.mesh.userData.nightfallActive) {
                        child.userData.origMat = null;
                    }
                }
            });
        }

        if (abilityId === "veil_of_shadows_burst") {
            const burstGroup = new THREE.Group();
            burstGroup.position.set(targetX, terrainHeight + 1.0, targetZ);
            
            const bladeGeo = new THREE.ConeGeometry(0.4, 2.5, 3);
            bladeGeo.rotateX(Math.PI / 2);
            const bladeMat = new THREE.MeshBasicMaterial({ color: 0x220044, blending: THREE.AdditiveBlending });
            
            const blades: THREE.Mesh[] = [];
            for(let i=0; i<12; i++) {
                const blade = new THREE.Mesh(bladeGeo, bladeMat);
                const angle = (i / 12) * Math.PI * 2;
                blade.position.set(Math.cos(angle), 0, Math.sin(angle));
                blade.lookAt(Math.cos(angle)*10, 0, Math.sin(angle)*10);
                burstGroup.add(blade);
                blades.push(blade);
            }
            threeScene.add(burstGroup);
            
            let p = 0;
            const anim = setInterval(() => {
                if (!burstGroup.parent) { clearInterval(anim); return; }

                p += 0.05;
                blades.forEach((b, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    const dist = 1.0 + easeOut(p) * 8.0; 
                    b.position.set(Math.cos(angle)*dist, 0, Math.sin(angle)*dist);
                    b.scale.setScalar(1.0 - p);
                });
                
                if (p >= 1.0) {
                    clearInterval(anim);
                    threeScene.remove(burstGroup);
                    bladeGeo.dispose(); bladeMat.dispose();
                }
            }, 20);
        } else {
            const geo = new THREE.SphereGeometry(1.5, 16, 16);
            const mat = new THREE.MeshBasicMaterial({ color: 0x330066, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
            const smoke = new THREE.Mesh(geo, mat);
            smoke.position.set(targetX, terrainHeight + 1.0, targetZ);
            smoke.scale.setScalar(2.0);
            threeScene.add(smoke);

            let scale = 2.0;
            const anim = setInterval(() => {
                if (!smoke.parent) { clearInterval(anim); return; }

                scale -= 0.1;
                smoke.scale.setScalar(scale);
                mat.opacity -= 0.05;
                if (mat.opacity <= 0) {
                    clearInterval(anim);
                    threeScene.remove(smoke);
                    geo.dispose(); mat.dispose();
                }
            }, 30);
        }
    }
    else if (abilityId === "blood_decoy_spawn") {
        let cloneMesh: THREE.Object3D;

        if (playerVisual && playerVisual.mesh) {
            cloneMesh = playerVisual.mesh.clone();
            
            const tintMaterial = (mat: any) => {
                const newMat = mat.clone();
                if (newMat.color) newMat.color.setHex(0x990000);
                if (newMat.emissive) newMat.emissive.setHex(0x330000);
                newMat.transparent = true;
                newMat.opacity = 0.8;
                return newMat;
            };

            cloneMesh.traverse((child: any) => {
                if (child.isMesh && child.material) {
                    if (Array.isArray(child.material)) {
                        child.material = child.material.map(tintMaterial);
                    } else {
                        child.material = tintMaterial(child.material);
                    }
                }
            });
        } else {
            const geo = new THREE.CapsuleGeometry(0.4, 0.8, 4, 8);
            const mat = new THREE.MeshBasicMaterial({ color: 0xaa0000, transparent: true, opacity: 0.7 });
            cloneMesh = new THREE.Mesh(geo, mat);
            cloneMesh.position.y += 0.8; 
        }

        cloneMesh.position.set(targetX, terrainHeight, targetZ);
        
        if (playerVisual && playerVisual.mesh) {
            cloneMesh.rotation.copy(playerVisual.mesh.rotation);
        }

        cloneMesh.userData.isBloodClone = true;
        threeScene.add(cloneMesh);
        
        setTimeout(() => {
            if (cloneMesh.parent) cloneMesh.parent.remove(cloneMesh);
        }, 2500);
    } 
    else if (abilityId === "blood_decoy_explode") {
        threeScene.children.forEach(c => {
            if (c.userData.isBloodClone && Math.abs(c.position.x - targetX) < 1 && Math.abs(c.position.z - targetZ) < 1) {
                threeScene.remove(c);
            }
        });
        
        const pGeo = new THREE.SphereGeometry(2.5, 16, 16);
        const pMat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8 });
        const blast = new THREE.Mesh(pGeo, pMat);
        blast.position.set(targetX, terrainHeight + 1, targetZ);
        threeScene.add(blast);
        
        let scale = 1;
        const anim = setInterval(() => {
            if (!blast.parent) { clearInterval(anim); return; }

            scale += 0.2;
            blast.scale.set(scale, scale, scale);
            pMat.opacity -= 0.1;
            if (pMat.opacity <= 0) {
                clearInterval(anim);
                threeScene.remove(blast);
                pGeo.dispose(); pMat.dispose();
            }
        }, 30);
    } 
    else if (abilityId === "feast_of_absolution") {
        const leechCount = 200;
        const leechGeo = new THREE.CapsuleGeometry(0.08, 0.3, 4, 8);
        leechGeo.rotateX(Math.PI / 2);

        const leechMat = new THREE.MeshStandardMaterial({ 
            color: 0x1a001a, emissive: 0x440011, roughness: 0.2, transparent: true, opacity: 0.9 
        });

        const swarmMesh = new THREE.InstancedMesh(leechGeo, leechMat, leechCount);
        swarmMesh.frustumCulled = false; 

        const dummy = new THREE.Object3D();
        const leeches = Array.from({ length: leechCount }, () => ({
            angle: Math.random() * Math.PI * 2,
            radius: Math.random() * 4.5 + 0.5, 
            height: Math.random() * 3 + 0.5,   
            speed: (Math.random() * 0.15 + 0.05) * (Math.random() > 0.5 ? 1 : -1), 
            verticalPhase: Math.random() * Math.PI * 2,
            verticalSpeed: Math.random() * 0.1 + 0.05
        }));

        let life = 1.0;
        const updateSwarm = () => {
            leechMat.opacity = life < 0.2 ? life * 5 : 0.9;

            for (let i = 0; i < leechCount; i++) {
                const l = leeches[i];
                l.angle += l.speed;
                l.verticalPhase += l.verticalSpeed;

                const currentRadius = l.radius * (0.4 + life * 0.6);

                const px = targetX + Math.cos(l.angle) * currentRadius;
                const pz = targetZ + Math.sin(l.angle) * currentRadius;
                const py = terrainHeight + l.height + Math.sin(l.verticalPhase) * 1.5;

                dummy.position.set(px, py, pz);
                
                const nextX = targetX + Math.cos(l.angle + l.speed) * currentRadius;
                const nextZ = targetZ + Math.sin(l.angle + l.speed) * currentRadius;
                const nextY = terrainHeight + l.height + Math.sin(l.verticalPhase + l.verticalSpeed) * 1.5;
                
                if (px !== nextX || py !== nextY || pz !== nextZ) {
                    dummy.lookAt(nextX, nextY, nextZ);
                }

                dummy.rotation.z += Math.sin(l.verticalPhase * 4) * 0.5;
                const s = life < 0.15 ? life * 6.6 : 1.0;
                dummy.scale.setScalar(s);
                dummy.updateMatrix();
                swarmMesh.setMatrixAt(i, dummy.matrix);
            }
            swarmMesh.instanceMatrix.needsUpdate = true;
        };

        updateSwarm();
        threeScene.add(swarmMesh);

        const anim = setInterval(() => {
            if (!swarmMesh.parent) { clearInterval(anim); return; }

            life -= (30 / 4000);
            if (life <= 0) {
                clearInterval(anim);
                threeScene.remove(swarmMesh);
                leechGeo.dispose(); leechMat.dispose(); swarmMesh.dispose();
                return;
            }
            updateSwarm();
        }, 30);
    }
    else if (abilityId === "void_eruption") {
        const eruptionGroup = new THREE.Group();
        eruptionGroup.position.set(targetX, terrainHeight + 0.1, targetZ);
        
        const coreGeo = new THREE.SphereGeometry(1, 32, 32);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0x110022, transparent: true, opacity: 1.0 });
        const core = new THREE.Mesh(coreGeo, coreMat);
        eruptionGroup.add(core);

        const waveGeo = new THREE.RingGeometry(1, 2, 32);
        waveGeo.rotateX(-Math.PI / 2);
        const waveMat = new THREE.MeshBasicMaterial({ color: 0x5500aa, transparent: true, opacity: 0.8, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });
        const wave = new THREE.Mesh(waveGeo, waveMat);
        eruptionGroup.add(wave);

        const pillarGeo = new THREE.CylinderGeometry(1, 1, 20, 16, 1, true);
        pillarGeo.translate(0, 10, 0);
        const pillarMat = new THREE.MeshBasicMaterial({ color: 0x330066, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false });
        const pillar = new THREE.Mesh(pillarGeo, pillarMat);
        eruptionGroup.add(pillar);

        threeScene.add(eruptionGroup);

        let life = 3.0; 
        
        const anim = setInterval(() => {
            if (!eruptionGroup.parent) { clearInterval(anim); return; }

            life -= 0.03; 

            if (life > 2.5) {
                const p = (3.0 - life) * 2.0; 
                core.scale.setScalar(1 + p * 8); 
                pillar.scale.set(1 + p * 5, 1, 1 + p * 5); 
                
                wave.scale.setScalar(1 + p * 8);
                waveMat.opacity = Math.max(0, 0.8 - p); 
            } else {
                waveMat.opacity = 0; 
            }

            if (life <= 2.5 && life > 0.5) {
                core.rotation.y += 0.1;
                core.rotation.z += 0.1;
                pillar.rotation.y -= 0.05;
            }

            if (life <= 0.5) {
                const fade = life * 2.0; 
                coreMat.opacity = fade * 0.9;
                pillarMat.opacity = fade * 0.6;
                
                core.scale.setScalar(9 * (0.5 + fade * 0.5));
                pillar.scale.set(6 * (0.5 + fade * 0.5), 1, 6 * (0.5 + fade * 0.5));
            }

            if (life <= 0) {
                clearInterval(anim);
                threeScene.remove(eruptionGroup);
                coreGeo.dispose(); coreMat.dispose();
                waveGeo.dispose(); waveMat.dispose();
                pillarGeo.dispose(); pillarMat.dispose();
            }
        }, 30);
    }
    else if (abilityId === "avatar_of_doom") {
        const cleaveGeo = new THREE.TorusGeometry(6.0, 1.2, 16, 64, Math.PI); 
        cleaveGeo.rotateX(-Math.PI / 2);
        
        const cleaveMat = new THREE.MeshBasicMaterial({ color: 0x111111, transparent: true, opacity: 1.0, side: THREE.DoubleSide });
        const cleaveMesh = new THREE.Mesh(cleaveGeo, cleaveMat);
        cleaveMesh.position.set(targetX, terrainHeight + 1.5, targetZ);
        
        if (playerVisual && playerVisual.mesh) {
            const angle = Math.atan2(targetX - playerVisual.mesh.position.x, targetZ - playerVisual.mesh.position.z);
            cleaveMesh.rotation.y = angle - (Math.PI / 2);
        }

        threeScene.add(cleaveMesh);

        const glowGeo = new THREE.TorusGeometry(6.0, 1.6, 16, 64, Math.PI);
        glowGeo.rotateX(-Math.PI / 2);
        const glowMat = new THREE.MeshBasicMaterial({ color: 0x8800ff, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false });
        const glowMesh = new THREE.Mesh(glowGeo, glowMat);
        cleaveMesh.add(glowMesh);

        let progress = 0;
        const anim = setInterval(() => {
            if (!cleaveMesh.parent) { clearInterval(anim); return; }

            progress += 0.015; 
            cleaveMesh.rotation.y += 0.08;
            
            const scale = 1.0 + progress * 1.5;
            cleaveMesh.scale.set(scale, scale, scale);
            
            cleaveMat.opacity = 1.0 - Math.pow(progress, 2);
            glowMat.opacity = 0.6 * (1.0 - progress);

            if (progress >= 1.0) {
                clearInterval(anim);
                threeScene.remove(cleaveMesh);
                cleaveGeo.dispose(); cleaveMat.dispose();
                glowGeo.dispose(); glowMat.dispose();
            }
        }, 30);

        if (playerVisual && playerVisual.mesh) {
            const eyeGroup = new THREE.Group();
            
            const eyeGeo = new THREE.SphereGeometry(0.4, 16, 16);
            const eyeMat = new THREE.MeshBasicMaterial({ color: 0xaa00ff });
            const eyeMesh = new THREE.Mesh(eyeGeo, eyeMat);
            
            const pupilGeo = new THREE.CapsuleGeometry(0.05, 0.3, 4, 8);
            const pupilMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
            const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
            pupilMesh.position.z = 0.38; 
            
            const auraGeo = new THREE.IcosahedronGeometry(0.6, 1);
            const auraMat = new THREE.MeshBasicMaterial({ color: 0x220033, wireframe: true, transparent: true, opacity: 0.6 });
            const auraMesh = new THREE.Mesh(auraGeo, auraMat);

            eyeGroup.add(eyeMesh, pupilMesh, auraMesh);
            eyeGroup.position.set(0.8, 3.0, -0.5);
            playerVisual.mesh.add(eyeGroup);

            playerVisual.mesh.userData.doomFamiliar = eyeGroup;

            let time = 0;
            const eyeAnim = setInterval(() => {
                if (!eyeGroup.parent) { clearInterval(eyeAnim); return; }
                time += 0.05;
                eyeGroup.position.y = 3.0 + Math.sin(time * 3) * 0.2; 
                auraMesh.rotation.y += 0.05;
                auraMesh.rotation.x += 0.03;
            }, 30);

            setTimeout(() => {
                clearInterval(eyeAnim);
                if (eyeGroup.parent) eyeGroup.parent.remove(eyeGroup);
                playerVisual.mesh.userData.doomFamiliar = null; 
                eyeGeo.dispose(); eyeMat.dispose();
                pupilGeo.dispose(); pupilMat.dispose();
                auraGeo.dispose(); auraMat.dispose();
            }, 10000);
        }
    }
    else if (abilityId === "gordon_beam") {
        let startX = targetX; let startY = terrainHeight + 2.0; let startZ = targetZ;

        if (playerVisual && playerVisual.mesh) {
            const familiar = playerVisual.mesh.userData.doomFamiliar;
            if (familiar) {
                const worldPos = new THREE.Vector3();
                familiar.getWorldPosition(worldPos); 
                startX = worldPos.x; startY = worldPos.y; startZ = worldPos.z;
                familiar.lookAt(targetX, terrainHeight + 1.0, targetZ);
            } else {
                startX = playerVisual.mesh.position.x;
                startY = playerVisual.mesh.position.y + 3.0; 
                startZ = playerVisual.mesh.position.z;
            }
        }
        
        const endY = terrainHeight + 1.0;
        const dx = targetX - startX; const dy = endY - startY; const dz = targetZ - startZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.1;
        
        const geo = new THREE.CylinderGeometry(0.2, 0.2, dist, 8);
        geo.rotateX(Math.PI / 2); 
        
        const mat = new THREE.MeshBasicMaterial({ color: 0xaa00ff, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
        const beam = new THREE.Mesh(geo, mat);
        beam.position.set(startX + dx / 2, startY + dy / 2, startZ + dz / 2);
        beam.lookAt(targetX, endY, targetZ);
        threeScene.add(beam);
        
        const sparkGeo = new THREE.IcosahedronGeometry(0.8, 0);
        const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffaaff, wireframe: true });
        const spark = new THREE.Mesh(sparkGeo, sparkMat);
        spark.position.set(targetX, endY, targetZ);
        threeScene.add(spark);
        
        let opacity = 1.0;
        const fadeAnim = setInterval(() => {
            if (!beam.parent) { clearInterval(fadeAnim); return; }

            opacity -= 0.1; 
            beam.scale.set(opacity, 1.0, opacity); 
            mat.opacity = opacity;
            spark.scale.setScalar(1.0 + (1.0 - opacity)); 
            sparkMat.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(fadeAnim);
                if (beam.parent) threeScene.remove(beam);
                if (spark.parent) threeScene.remove(spark);
                geo.dispose(); mat.dispose();
                sparkGeo.dispose(); sparkMat.dispose();
            }
        }, 30); 
    }
    else if (abilityId === "nightfall") {
        const nightGroup = new THREE.Group();
        nightGroup.position.set(targetX, terrainHeight + 1.0, targetZ);

        const domeGeo = new THREE.SphereGeometry(15.0, 32, 32);
        const domeMat = new THREE.MeshBasicMaterial({ color: 0x020005, transparent: true, opacity: 0.95, side: THREE.DoubleSide });
        const dome = new THREE.Mesh(domeGeo, domeMat);
        nightGroup.add(dome);

        const slashGeo = new THREE.TorusGeometry(8.0, 0.3, 8, 32, Math.PI);
        const slashMat = new THREE.MeshBasicMaterial({ color: 0x5500aa, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
        
        const slashes: THREE.Mesh[] = [];
        for (let i = 0; i < 8; i++) {
            const slash = new THREE.Mesh(slashGeo, slashMat);
            slash.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
            slash.scale.setScalar(0.1); 
            nightGroup.add(slash);
            slashes.push(slash);
        }

        const interiorLight = new THREE.PointLight(0xff0000, 5.0, 15.0);
        interiorLight.position.y = 2.0;
        nightGroup.add(interiorLight);

        threeScene.add(nightGroup);

        if (playerVisual && playerVisual.mesh) {
            playerVisual.mesh.userData.nightfallActive = true;
            const stealthMat = new THREE.MeshBasicMaterial({ color: 0xaa00ff, transparent: true, opacity: 0.3, wireframe: true, blending: THREE.AdditiveBlending });
            playerVisual.mesh.traverse((child: any) => {
                if (child.isMesh && child.material) {
                    if (!child.userData.origMat) child.userData.origMat = child.material;
                    child.material = stealthMat;
                }
            });
        }

        let life = 8.0; 
        let slashLife = 1.5;

        const anim = setInterval(() => {
            if (!nightGroup.parent) { clearInterval(anim); return; }

            life -= 0.03;
            slashLife -= 0.03;
            
            if (slashLife > 0) {
                const p = 1.0 - (slashLife / 1.5);
                slashes.forEach((s, idx) => {
                    s.rotation.z += (idx % 2 === 0 ? 0.3 : -0.3);
                    s.scale.setScalar(0.3 + p * 2.0);
                });
                slashMat.opacity = slashLife;
            } else {
                slashMat.opacity = 0;
            }

            if (life > 1.0) {
                domeMat.opacity = 0.95 + Math.sin(life * 5) * 0.05; 
                interiorLight.intensity = 3.0 + Math.sin(life * 10) * 2.0;
            } else {
                domeMat.opacity = life * 0.95;
                interiorLight.intensity = life * 5.0;
            }

            if (life <= 0) {
                clearInterval(anim);
                threeScene.remove(nightGroup);
                domeGeo.dispose(); domeMat.dispose();
                slashGeo.dispose(); slashMat.dispose();
                interiorLight.dispose();
                
                if (playerVisual && playerVisual.mesh) {
                    playerVisual.mesh.userData.nightfallActive = false;
                    playerVisual.mesh.traverse((child: any) => {
                        if (child.isMesh && child.userData.origMat) {
                            if (child.material !== child.userData.origMat) child.material.dispose();
                            child.material = child.userData.origMat;
                            if (!playerVisual.mesh.userData.veilActive) {
                                child.userData.origMat = null;
                            }
                        }
                    });
                }
            }
        }, 30);
    }
    // ==========================================
    // ✨ LIGHT PATHWAY VFX
    // ==========================================
    else if (abilityId === "radiant_dash" || abilityId === "radiant_dash_silver") {
        const startX = playerVisual && playerVisual.mesh ? playerVisual.mesh.position.x : targetX;
        const startZ = playerVisual && playerVisual.mesh ? playerVisual.mesh.position.z : targetZ;
        
        if (abilityId === "radiant_dash_silver") {
            const flashGeo = new THREE.SphereGeometry(2.0, 32, 32);
            const flashMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
            
            const startFlash = new THREE.Mesh(flashGeo, flashMat);
            startFlash.position.set(startX, terrainHeight + 1.0, startZ);
            const endFlash = new THREE.Mesh(flashGeo, flashMat.clone());
            endFlash.position.set(targetX, terrainHeight + 1.0, targetZ);
            
            threeScene.add(startFlash, endFlash);

            let s = 1.0;
            const fAnim = setInterval(() => {
                if (!startFlash.parent) { clearInterval(fAnim); return; }

                s += 0.2;
                startFlash.scale.setScalar(s);
                endFlash.scale.setScalar(s);
                startFlash.material.opacity -= 0.1;
                endFlash.material.opacity -= 0.1;
                if (startFlash.material.opacity <= 0) {
                    clearInterval(fAnim);
                    threeScene.remove(startFlash, endFlash);
                    flashGeo.dispose(); startFlash.material.dispose(); endFlash.material.dispose();
                }
            }, 20);
        } else {
            const dist = Math.sqrt((targetX - startX)**2 + (targetZ - startZ)**2) || 0.1;
            const geo = new THREE.CylinderGeometry(0.8, 0.8, dist, 16);
            geo.rotateX(Math.PI / 2);
            const mat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
            const streak = new THREE.Mesh(geo, mat);
            
            streak.position.set((startX + targetX)/2, terrainHeight + 1.0, (startZ + targetZ)/2);
            streak.lookAt(targetX, terrainHeight + 1.0, targetZ);
            threeScene.add(streak);
            
            let life = 1.0;
            const anim = setInterval(() => {
                if (!streak.parent) { clearInterval(anim); return; }

                life -= 0.05;
                streak.scale.set(life, 1.0, life);
                mat.opacity = life;
                if (life <= 0) {
                    clearInterval(anim);
                    threeScene.remove(streak);
                    geo.dispose(); mat.dispose();
                }
            }, 20);
        }
    }
    else if (abilityId === "blinding_trail_spawn") {
        const trailGeo = new THREE.CircleGeometry(1.5, 16);
        trailGeo.rotateX(-Math.PI / 2);
        const trailMat = new THREE.MeshBasicMaterial({ color: 0xffffaa, transparent: true, opacity: 0.6, depthWrite: false, blending: THREE.AdditiveBlending });
        const trail = new THREE.Mesh(trailGeo, trailMat);
        trail.position.set(targetX, terrainHeight + 0.05, targetZ);
        threeScene.add(trail);

        setTimeout(() => {
            if (trail.parent) threeScene.remove(trail);
            trailGeo.dispose(); trailMat.dispose();
        }, 3000);
    }
    else if (abilityId === "divine_smite" || abilityId === "divine_smite_silver") {
        const smiteGroup = new THREE.Group();
        smiteGroup.position.set(targetX, terrainHeight, targetZ);

        const beamGeo = new THREE.CylinderGeometry(0.5, 0.5, 40, 16);
        beamGeo.translate(0, 20, 0); 
        const beamMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
        const beam = new THREE.Mesh(beamGeo, beamMat);
        smiteGroup.add(beam);

        const sparkGeo = new THREE.IcosahedronGeometry(2.0, 1);
        const sparkMat = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
        const spark = new THREE.Mesh(sparkGeo, sparkMat);
        spark.position.y = 1.0;
        smiteGroup.add(spark);

        threeScene.add(smiteGroup);

        let progress = 0;
        const anim = setInterval(() => {
            if (!smiteGroup.parent) { clearInterval(anim); return; }

            progress += 0.08;
            
            if (progress < 0.3) {
                beam.scale.set(1.0 + progress * 5, 1, 1.0 + progress * 5); 
                spark.scale.setScalar(1.0 + progress * 3);
                spark.rotation.y += 0.5;
            } else {
                const fade = (1.0 - progress);
                beam.scale.set(Math.max(0.01, fade), 1, Math.max(0.01, fade)); 
                beamMat.opacity = fade;
                sparkMat.opacity = fade;
            }

            if (progress >= 1.0) {
                clearInterval(anim);
                threeScene.remove(smiteGroup);
                beamGeo.dispose(); beamMat.dispose();
                sparkGeo.dispose(); sparkMat.dispose();
            }
        }, 20);

        if (abilityId === "divine_smite_silver") {
            const staticGeo = new THREE.SphereGeometry(1.5, 8, 8);
            const staticMat = new THREE.MeshBasicMaterial({ color: 0xffffaa, wireframe: true, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
            const staticMesh = new THREE.Mesh(staticGeo, staticMat);
            staticMesh.position.set(targetX, terrainHeight + 1.0, targetZ);
            threeScene.add(staticMesh);

            let ticks = 0;
            const sAnim = setInterval(() => {
                if (!staticMesh.parent) { clearInterval(sAnim); return; }

                ticks++;
                staticMesh.rotation.x += 0.2;
                staticMesh.rotation.z += 0.2;
                staticMesh.scale.setScalar(1.0 + Math.sin(ticks * 0.5) * 0.2);
                if (ticks > 150) { 
                    clearInterval(sAnim);
                    threeScene.remove(staticMesh);
                    staticGeo.dispose(); staticMat.dispose();
                }
            }, 20);
        }
    }
    else if (abilityId === "chain_lightning") {
        const group = new THREE.Group();
        group.position.set(targetX, terrainHeight + 1.0, targetZ);
        
        const count = 5;
        const lines: THREE.Mesh[] = [];
        const lGeo = new THREE.CylinderGeometry(0.1, 0.1, 6, 4);
        lGeo.translate(0, 3, 0);
        lGeo.rotateX(Math.PI / 2);
        const lMat = new THREE.MeshBasicMaterial({ color: 0xffffff, blending: THREE.AdditiveBlending, transparent: true });

        for(let i=0; i<count; i++) {
            const line = new THREE.Mesh(lGeo, lMat);
            line.rotation.set((Math.random() - 0.5) * Math.PI, Math.random() * Math.PI * 2, 0);
            group.add(line);
            lines.push(line);
        }

        threeScene.add(group);

        let p = 0;
        const anim = setInterval(() => {
            if (!group.parent) { clearInterval(anim); return; }
            p += 0.1;
            
            lines.forEach(l => {
                l.rotation.y += (Math.random() - 0.5) * 0.5;
                l.rotation.x += (Math.random() - 0.5) * 0.5;
            });
            
            lMat.opacity = 1.0 - p;
            if (p >= 1.0) {
                clearInterval(anim);
                threeScene.remove(group);
                lGeo.dispose(); lMat.dispose();
            }
        }, 30);
    }
    else if (abilityId === "searing_light") {
        const brandGeo = new THREE.RingGeometry(0.2, 1.5, 5);
        brandGeo.rotateX(-Math.PI / 2);
        const brandMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending, depthWrite: false });
        const brand = new THREE.Mesh(brandGeo, brandMat);
        brand.position.set(targetX, terrainHeight + 0.1, targetZ);
        threeScene.add(brand);

        let p = 0;
        const anim = setInterval(() => {
            if (!brand.parent) { clearInterval(anim); return; }
            p += 0.02;
            brand.scale.setScalar(1.0 - p * 0.5);
            brandMat.opacity = 1.0 - p;
            if (p >= 1.0) {
                clearInterval(anim);
                threeScene.remove(brand);
                brandGeo.dispose(); brandMat.dispose();
            }
        }, 30);
    }
    else if (abilityId === "blinding_flare") {
        const flareGeo = new THREE.SphereGeometry(2.0, 32, 32);
        const flareMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
        const flare = new THREE.Mesh(flareGeo, flareMat);
        flare.position.set(targetX, terrainHeight + 1.5, targetZ);
        threeScene.add(flare);

        let scale = 1.0;
        const anim = setInterval(() => {
            if (!flare.parent) { clearInterval(anim); return; }

            scale += 0.5; 
            flare.scale.setScalar(scale);
            flareMat.opacity -= 0.05;
            
            if (flareMat.opacity <= 0) {
                clearInterval(anim);
                threeScene.remove(flare);
                flareGeo.dispose(); flareMat.dispose();
            }
        }, 20);
    }
    else if (abilityId === "solar_flare") {
        const group = new THREE.Group();
        group.position.set(targetX, terrainHeight + 1.5, targetZ);

        const coreGeo = new THREE.SphereGeometry(1.5, 16, 16);
        const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
        const core = new THREE.Mesh(coreGeo, coreMat);
        group.add(core);

        const rayGeo = new THREE.ConeGeometry(0.3, 10.0, 4);
        rayGeo.translate(0, 5.0, 0);
        rayGeo.rotateX(Math.PI / 2);
        const rays: THREE.Mesh[] = [];
        
        for (let i = 0; i < 12; i++) {
            const ray = new THREE.Mesh(rayGeo, coreMat);
            ray.rotation.y = (i / 12) * Math.PI * 2;
            group.add(ray);
            rays.push(ray);
        }

        threeScene.add(group);

        let p = 0;
        const anim = setInterval(() => {
            if (!group.parent) { clearInterval(anim); return; }
            p += 0.05;

            core.scale.setScalar(1.0 + p * 3);
            rays.forEach(r => {
                r.scale.set(1.0 - p, 1.0 + p * 2, 1.0 - p);
            });
            coreMat.opacity = 1.0 - p;

            if (p >= 1.0) {
                clearInterval(anim);
                threeScene.remove(group);
                coreGeo.dispose(); coreMat.dispose();
                rayGeo.dispose();
            }
        }, 30);
    }
    else if (abilityId === "aura_of_purity_start") {
        if (playerVisual && playerVisual.mesh) {
            const auraGroup = new THREE.Group();
            
            const ringGeo = new THREE.TorusGeometry(4.0, 0.1, 4, 64);
            ringGeo.rotateX(Math.PI / 2);
            
            const ring1 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xffdd00, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending }));
            ring1.position.y = 0.5;
            
            const ring2 = new THREE.Mesh(ringGeo, new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending }));
            ring2.position.y = 1.5;
            ring2.scale.setScalar(0.8);

            auraGroup.add(ring1, ring2);
            playerVisual.mesh.add(auraGroup);
            playerVisual.mesh.userData.purityAura = auraGroup;

            const anim = setInterval(() => {
                if (!auraGroup.parent) { clearInterval(anim); return; }
                ring1.rotation.y += 0.02;
                ring2.rotation.y -= 0.03;
                ring1.scale.setScalar(1.0 + Math.sin(Date.now() * 0.005) * 0.05);
            }, 30);
            playerVisual.mesh.userData.purityAnim = anim;
        }
    }
    else if (abilityId === "aura_of_purity_end" || abilityId === "aura_of_purity_detonate" || abilityId === "cleansing_fire") {
        if (playerVisual && playerVisual.mesh && playerVisual.mesh.userData.purityAura) {
            playerVisual.mesh.remove(playerVisual.mesh.userData.purityAura);
            clearInterval(playerVisual.mesh.userData.purityAnim);
            playerVisual.mesh.userData.purityAura = null;
        }

        if (abilityId === "aura_of_purity_detonate" || abilityId === "cleansing_fire") {
            const boomGroup = new THREE.Group();
            boomGroup.position.set(targetX, terrainHeight + 1.0, targetZ);

            const boomGeo = new THREE.SphereGeometry(6.0, 32, 32);
            const boomMat = new THREE.MeshBasicMaterial({ color: 0xffffee, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
            const boom = new THREE.Mesh(boomGeo, boomMat);
            boomGroup.add(boom);

            let particles: THREE.InstancedMesh | null = null;
            let pData: any[] = [];
            const pGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
            const pMat = new THREE.MeshBasicMaterial({ color: 0xff8800, blending: THREE.AdditiveBlending });

            if (abilityId === "cleansing_fire") {
                const pCount = 50;
                particles = new THREE.InstancedMesh(pGeo, pMat, pCount);
                pData = Array.from({ length: pCount }, () => ({
                    pos: new THREE.Vector3((Math.random() - 0.5) * 12, Math.random() * 8, (Math.random() - 0.5) * 12),
                    speed: Math.random() * 0.2 + 0.1
                }));
                boomGroup.add(particles);
            }

            threeScene.add(boomGroup);

            let s = 0.5;
            const dummy = new THREE.Object3D();
            const bAnim = setInterval(() => {
                if (!boomGroup.parent) { clearInterval(bAnim); return; }

                s += 0.2;
                boom.scale.setScalar(s);
                boomMat.opacity -= 0.08;

                if (particles) {
                    pData.forEach((p, i) => {
                        p.pos.y -= p.speed;
                        dummy.position.copy(p.pos);
                        dummy.rotation.x += 0.1;
                        dummy.rotation.y += 0.1;
                        dummy.updateMatrix();
                        particles!.setMatrixAt(i, dummy.matrix);
                    });
                    particles.instanceMatrix.needsUpdate = true;
                }

                if (boomMat.opacity <= -0.5) { // let particles fall a bit longer
                    clearInterval(bAnim);
                    threeScene.remove(boomGroup);
                    boomGeo.dispose(); boomMat.dispose();
                    pGeo.dispose(); pMat.dispose();
                    if (particles) particles.dispose();
                }
            }, 20);
        }
    }
    else if (abilityId === "holy_nova") {
        const novaGeo = new THREE.SphereGeometry(6.0, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const novaMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.9, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, wireframe: true });
        const nova = new THREE.Mesh(novaGeo, novaMat);
        nova.position.set(targetX, terrainHeight + 0.1, targetZ);
        threeScene.add(nova);

        let scale = 0.1;
        const anim = setInterval(() => {
            if (!nova.parent) { clearInterval(anim); return; }

            scale += 0.15;
            nova.scale.setScalar(easeOut(scale)); 
            novaMat.opacity = 1.0 - scale;
            if (scale >= 1.0) {
                clearInterval(anim);
                threeScene.remove(nova);
                novaGeo.dispose(); novaMat.dispose();
            }
        }, 20);
    }
    else if (abilityId === "repelling_force") {
        const group = new THREE.Group();
        group.position.set(targetX, terrainHeight + 1.0, targetZ);

        const rGeo = new THREE.TorusGeometry(6.0, 0.2, 8, 32);
        rGeo.rotateX(Math.PI / 2);
        const rMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
        const ring1 = new THREE.Mesh(rGeo, rMat);
        const ring2 = new THREE.Mesh(rGeo, rMat);
        group.add(ring1, ring2);
        
        threeScene.add(group);

        let p = 0;
        const anim = setInterval(() => {
            if (!group.parent) { clearInterval(anim); return; }
            p += 0.05;

            ring1.scale.setScalar(p);
            ring2.scale.setScalar(Math.max(0.01, p - 0.2));
            rMat.opacity = 1.0 - p;

            if (p >= 1.0) {
                clearInterval(anim);
                threeScene.remove(group);
                rGeo.dispose(); rMat.dispose();
            }
        }, 20);
    }
    else if (abilityId === "holy_fire_ring_spawn") {
        const ringGeo = new THREE.RingGeometry(5.5, 6.5, 64);
        ringGeo.rotateX(-Math.PI / 2);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xff5500, transparent: true, opacity: 0.8, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.position.set(targetX, terrainHeight + 0.1, targetZ);
        threeScene.add(ring);

        let ticks = 0;
        const anim = setInterval(() => {
            if (!ring.parent) { clearInterval(anim); return; }

            ticks++;
            ring.rotation.z += 0.05;
            ringMat.opacity = 0.6 + Math.sin(ticks * 0.2) * 0.3;
            if (ticks > 150) { 
                clearInterval(anim);
                threeScene.remove(ring);
                ringGeo.dispose(); ringMat.dispose();
            }
        }, 20);
    }
    else if (abilityId === "consecrated_ground" || abilityId === "hallowed_domain") {
        const holyGroup = new THREE.Group();
        holyGroup.position.set(targetX, terrainHeight + 0.05, targetZ);

        const outerGeo = new THREE.RingGeometry(4.8, 5.0, 64);
        const runeMat = new THREE.MeshBasicMaterial({ color: 0xffdd44, transparent: true, opacity: 0.0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });
        const outerRune = new THREE.Mesh(outerGeo, runeMat);
        outerRune.rotateX(-Math.PI / 2);
        holyGroup.add(outerRune);

        const innerGeo = new THREE.CircleGeometry(4.5, 6); 
        const innerMat = new THREE.MeshBasicMaterial({ color: 0xffffaa, transparent: true, opacity: 0.0, wireframe: true, blending: THREE.AdditiveBlending, depthWrite: false });
        const innerRune = new THREE.Mesh(innerGeo, innerMat);
        innerRune.rotateX(-Math.PI / 2);
        holyGroup.add(innerRune);

        const auraGeo = new THREE.CylinderGeometry(5.0, 5.0, 8, 32, 1, true);
        auraGeo.translate(0, 4, 0);
        const auraMat = new THREE.MeshBasicMaterial({ color: 0xffffcc, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide, depthWrite: false });
        const aura = new THREE.Mesh(auraGeo, auraMat);
        holyGroup.add(aura);

        const pCount = 40;
        const pGeo = new THREE.PlaneGeometry(0.2, 0.2);
        const pMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
        const particles = new THREE.InstancedMesh(pGeo, pMat, pCount);
        
        const pData = Array.from({ length: pCount }, () => ({
            x: (Math.random() - 0.5) * 9.0,
            y: Math.random() * 2.0,
            z: (Math.random() - 0.5) * 9.0,
            speedY: 0.02 + Math.random() * 0.04,
            rotSpeed: (Math.random() - 0.5) * 0.1
        }));
        
        const dummy = new THREE.Object3D();
        holyGroup.add(particles);

        let dome: THREE.Mesh | null = null;
        if (abilityId === "hallowed_domain") {
            const dGeo = new THREE.SphereGeometry(5.0, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2);
            const dMat = new THREE.MeshBasicMaterial({ color: 0xffffaa, transparent: true, opacity: 0.0, blending: THREE.AdditiveBlending, wireframe: true });
            dome = new THREE.Mesh(dGeo, dMat);
            holyGroup.add(dome);
        }

        threeScene.add(holyGroup);

        let life = 6.0; 
        const anim = setInterval(() => {
            if (!holyGroup.parent) { clearInterval(anim); return; }

            life -= 0.03;
            outerRune.rotation.z += 0.01; 
            innerRune.rotation.z -= 0.005;
            
            if (life > 5.5) {
                const fadeIn = (6.0 - life) * 2.0; 
                runeMat.opacity = fadeIn * 0.8;
                innerMat.opacity = fadeIn * 0.4;
                auraMat.opacity = fadeIn * 0.15;
                pMat.opacity = fadeIn;
                if (dome) (dome.material as THREE.Material).opacity = fadeIn * 0.2;
            } else if (life <= 5.5 && life > 0.5) {
                auraMat.opacity = 0.15 + Math.sin(life * 4) * 0.05;
                if (dome) (dome.material as THREE.Material).opacity = 0.2 + Math.sin(life * 2) * 0.05;
            } else if (life <= 0.5) {
                const fadeOut = life * 2.0; 
                runeMat.opacity = fadeOut * 0.8;
                innerMat.opacity = fadeOut * 0.4;
                auraMat.opacity = fadeOut * 0.15;
                pMat.opacity = fadeOut;
                if (dome) (dome.material as THREE.Material).opacity = fadeOut * 0.2;
            }

            for (let i = 0; i < pCount; i++) {
                const p = pData[i];
                p.y += p.speedY;
                if (p.y > 8.0) p.y = 0; 

                if (Math.sqrt(p.x*p.x + p.z*p.z) > 4.8) {
                    p.x *= 0.9;
                    p.z *= 0.9;
                }

                dummy.position.set(p.x, p.y, p.z);
                dummy.rotation.y += p.rotSpeed;
                dummy.rotation.x += p.rotSpeed;
                
                const fade = Math.sin((p.y / 8.0) * Math.PI);
                dummy.scale.setScalar(fade);
                
                dummy.updateMatrix();
                particles.setMatrixAt(i, dummy.matrix);
            }
            particles.instanceMatrix.needsUpdate = true;

            if (life <= 0) {
                clearInterval(anim);
                threeScene.remove(holyGroup);
                outerGeo.dispose(); runeMat.dispose();
                innerGeo.dispose(); innerMat.dispose();
                auraGeo.dispose(); auraMat.dispose();
                pGeo.dispose(); pMat.dispose(); particles.dispose();
                if (dome) {
                    dome.geometry.dispose();
                    (dome.material as THREE.Material).dispose();
                }
            }
        }, 30);
    }
    else if (abilityId === "grand_cross" || abilityId === "grand_cross_silver") {
        const crossGroup = new THREE.Group();
        crossGroup.userData.isGrandCross = true;
        crossGroup.position.set(targetX, terrainHeight + 15.0, targetZ); 

        const barGeo = new THREE.BoxGeometry(3.0, 20.0, 3.0);
        const barMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
        
        const vertical = new THREE.Mesh(barGeo, barMat);
        const horizontal = new THREE.Mesh(barGeo, barMat);
        horizontal.rotation.z = Math.PI / 2;
        horizontal.position.y = 4.0; 

        crossGroup.add(vertical, horizontal);
        threeScene.add(crossGroup);

        let state = 0; 
        let p = 0;
        
        const anim = setInterval(() => {
            if (!crossGroup.parent && state === 0) { clearInterval(anim); return; }

            if (state === 0) {
                p += 0.10; 
                crossGroup.position.y = (terrainHeight + 15.0) - (easeOut(p) * 14.0); 
                
                if (p >= 1.0) {
                    state = 1; 
                    p = 0;
                    const ringGeo = new THREE.RingGeometry(0.1, 15.0, 32);
                    ringGeo.rotateX(-Math.PI/2);
                    const ring = new THREE.Mesh(ringGeo, barMat);
                    ring.position.set(targetX, terrainHeight + 0.1, targetZ);
                    threeScene.add(ring);
                    
                    let rs = 0;
                    const rAnim = setInterval(() => {
                        if (!ring.parent) { clearInterval(rAnim); return; }

                        rs += 0.1;
                        ring.scale.setScalar(rs);
                        ring.material.opacity = 1.0 - rs;
                        if (rs >= 1.0) { clearInterval(rAnim); threeScene.remove(ring); ringGeo.dispose(); }
                    }, 20);
                }
            } else {
                p += abilityId === "grand_cross_silver" ? 0.002 : 0.02; 
                barMat.opacity = 1.0 - easeOut(p);
                
                if (abilityId === "grand_cross_silver") {
                    crossGroup.rotation.y += 0.02;
                }

                if (p >= 1.0) {
                    clearInterval(anim);
                    if (crossGroup.parent) threeScene.remove(crossGroup);
                    barGeo.dispose(); barMat.dispose();
                }
            }
        }, 20);
    }
    else if (abilityId === "grand_cross_laser") {
        let startX = targetX;
        let startZ = targetZ;
        let startY = terrainHeight + 4.0;

        threeScene.children.forEach(c => {
            if (c.userData.isGrandCross) {
                startX = c.position.x;
                startZ = c.position.z;
                startY = c.position.y - 2.0; 
            }
        });

        const dx = targetX - startX;
        const dy = (terrainHeight + 1.0) - startY;
        const dz = targetZ - startZ;
        const dist = Math.sqrt(dx*dx + dy*dy + dz*dz) || 0.1;

        const geo = new THREE.CylinderGeometry(0.2, 0.2, dist, 8);
        geo.rotateX(Math.PI / 2);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
        const laser = new THREE.Mesh(geo, mat);
        
        laser.position.set(startX + dx/2, startY + dy/2, startZ + dz/2);
        laser.lookAt(targetX, terrainHeight + 1.0, targetZ);
        threeScene.add(laser);
        
        let life = 1.0;
        const anim = setInterval(() => {
            if (!laser.parent) { clearInterval(anim); return; }

            life -= 0.1;
            laser.scale.set(life, 1.0, life);
            mat.opacity = life;
            if (life <= 0) {
                clearInterval(anim);
                threeScene.remove(laser);
                geo.dispose(); mat.dispose();
            }
        }, 20);
    }
    else if (abilityId === "heavenly_judgment" || abilityId === "orbital_strike_mini" || abilityId === "heavenly_judgment_move" || abilityId === "heavenly_judgment_grow") {
        const isMini = abilityId === "orbital_strike_mini";
        
        if (abilityId === "heavenly_judgment" || abilityId === "orbital_strike_mini") {
            const radius = isMini ? 2.0 : 6.0;
            
            const pillarGeo = new THREE.CylinderGeometry(radius, radius, 60, 32, 1, true);
            pillarGeo.translate(0, 30, 0);
            const pillarMat = new THREE.MeshBasicMaterial({ color: 0xffdd55, transparent: true, opacity: 0.8, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false });
            const pillar = new THREE.Mesh(pillarGeo, pillarMat);
            pillar.position.set(targetX, terrainHeight, targetZ);
            
            const group = new THREE.Group();
            group.add(pillar);
            
            const markGeo = new THREE.CircleGeometry(radius, 32);
            markGeo.rotateX(-Math.PI / 2);
            const markMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
            const mark = new THREE.Mesh(markGeo, markMat);
            mark.position.y = 0.1;
            group.add(mark);

            group.userData.isOrbital = true;
            group.userData.ownerId = playerVisual ? playerVisual.mesh.userData.sessionId : "";
            group.userData.isMini = isMini;
            threeScene.add(group);

            let life = isMini ? 5.0 : 10.0;
            const anim = setInterval(() => {
                if (!group.parent) { clearInterval(anim); return; }

                if (group.userData.forceDestroy) { life = 0; }
                life -= 0.03;
                
                if (!isMini && group.userData.growMultiplier) {
                    const s = 1.0 + group.userData.growMultiplier;
                    pillar.scale.lerp(new THREE.Vector3(s, 1, s), 0.1);
                    mark.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
                }

                pillar.rotation.y += 0.1;
                
                if (life <= 0) {
                    clearInterval(anim);
                    threeScene.remove(group);
                    pillarGeo.dispose(); pillarMat.dispose();
                    markGeo.dispose(); markMat.dispose();
                }
            }, 30);
        }
        else if (abilityId === "heavenly_judgment_move") {
            const ownerId = playerVisual ? playerVisual.mesh.userData.sessionId : "";
            
            threeScene.children.forEach(c => {
                if (c.userData.isOrbital && c.userData.ownerId === ownerId) {
                    if (c.userData.isMini) {
                        const dist = Math.sqrt((c.position.x - targetX)**2 + (c.position.z - targetZ)**2);
                        if (dist < 4.0) {
                            c.position.set(targetX, terrainHeight, targetZ);
                        }
                    } else {
                        c.position.lerp(new THREE.Vector3(targetX, terrainHeight, targetZ), 0.3);
                    }
                }
            });
        }
        else if (abilityId === "heavenly_judgment_grow") {
            const ownerId = playerVisual ? playerVisual.mesh.userData.sessionId : "";
            threeScene.children.forEach(c => {
                if (c.userData.isOrbital && !c.userData.isMini && c.userData.ownerId === ownerId) {
                    c.userData.growMultiplier = (c.userData.growMultiplier || 0) + 0.2;
                }
            });
        }
    }
    else if (abilityId === "wings_of_dawn" || abilityId === "wings_of_dawn_silver") {
        if (playerVisual && playerVisual.mesh) {
            const wingsGroup = new THREE.Group();
            
            const wingGeo = new THREE.ConeGeometry(1.5, 6.0, 4);
            wingGeo.translate(0, 3.0, 0);
            const wingMat = new THREE.MeshBasicMaterial({ color: 0xffffee, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
            
            const leftWing = new THREE.Mesh(wingGeo, wingMat);
            leftWing.rotation.z = Math.PI / 3;
            leftWing.position.set(-0.5, 1.0, -0.5);

            const rightWing = new THREE.Mesh(wingGeo, wingMat);
            rightWing.rotation.z = -Math.PI / 3;
            rightWing.position.set(0.5, 1.0, -0.5);

            wingsGroup.add(leftWing, rightWing);
            playerVisual.mesh.add(wingsGroup);

            const ringGeo = new THREE.RingGeometry(0.5, 3.0, 32);
            ringGeo.rotateX(-Math.PI / 2);
            const ringMat = new THREE.MeshBasicMaterial({ color: 0xffcc00, transparent: true, opacity: 1.0, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
            const takeoffFlash = new THREE.Mesh(ringGeo, ringMat);
            takeoffFlash.position.set(playerVisual.mesh.position.x, terrainHeight + 0.1, playerVisual.mesh.position.z);
            threeScene.add(takeoffFlash);

            let progress = 0;
            const anim = setInterval(() => {
                if (!takeoffFlash.parent && progress < 0.3) { clearInterval(anim); return; }

                progress += 0.05; 
                
                const height = 10.0; 
                const yOffset = 4 * height * progress * (1 - progress);
                playerVisual.mesh.userData.leapOffset = Math.max(0, yOffset);

                leftWing.rotation.z = (Math.PI / 3) + Math.sin(progress * Math.PI * 4) * 0.3;
                rightWing.rotation.z = (-Math.PI / 3) - Math.sin(progress * Math.PI * 4) * 0.3;
                
                if (progress > 0.7) {
                    wingMat.opacity = (1.0 - progress) * 3.0;
                }

                if (progress < 0.3) {
                    takeoffFlash.scale.setScalar(1.0 + progress * 5);
                    ringMat.opacity = 1.0 - (progress * 3.3);
                } else if (takeoffFlash.parent) {
                    threeScene.remove(takeoffFlash);
                }

                if (progress >= 1.0) {
                    clearInterval(anim);
                    if (wingsGroup.parent) playerVisual.mesh.remove(wingsGroup);
                    wingGeo.dispose(); wingMat.dispose();
                    playerVisual.mesh.userData.leapOffset = 0;

                    if (abilityId === "wings_of_dawn_silver") {
                        const flareGeo = new THREE.SphereGeometry(6.0, 32, 32);
                        const flareMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
                        const flare = new THREE.Mesh(flareGeo, flareMat);
                        flare.position.set(targetX, terrainHeight + 1.0, targetZ);
                        threeScene.add(flare);

                        let flareScale = 0.1;
                        const flareAnim = setInterval(() => {
                            if (!flare.parent) { clearInterval(flareAnim); return; }

                            flareScale += 0.15;
                            flare.scale.setScalar(easeOut(flareScale));
                            flareMat.opacity = 1.0 - flareScale;
                            if (flareScale >= 1.0) {
                                clearInterval(flareAnim);
                                threeScene.remove(flare);
                                flareGeo.dispose(); flareMat.dispose();
                            }
                        }, 20);
                    } else {
                        const landRing = new THREE.Mesh(ringGeo, ringMat);
                        landRing.position.set(targetX, terrainHeight + 0.1, targetZ);
                        ringMat.opacity = 1.0;
                        threeScene.add(landRing);
                        
                        let lrScale = 0.1;
                        const lrAnim = setInterval(() => {
                            if (!landRing.parent) { clearInterval(lrAnim); return; }

                            lrScale += 0.1;
                            landRing.scale.setScalar(lrScale * 2.0);
                            ringMat.opacity = 1.0 - lrScale;
                            if (lrScale >= 1.0) {
                                clearInterval(lrAnim);
                                threeScene.remove(landRing);
                                ringGeo.dispose(); ringMat.dispose();
                            }
                        }, 20);
                    }
                }
            }, 30); 
        }
    }
    // ==========================================
    // 🔥 BERSERKER PATHWAY VFX
    // ==========================================
    else if (abilityId === "sunder") {
        const sunderGroup = new THREE.Group();
        sunderGroup.position.set(targetX, terrainHeight + 0.1, targetZ);

        const slashGeo = new THREE.TorusGeometry(3.5, 0.5, 8, 32, Math.PI);
        const slashMat = new THREE.MeshBasicMaterial({ color: 0xff3300, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
        const slash = new THREE.Mesh(slashGeo, slashMat);
        
        if (playerVisual && playerVisual.mesh) {
            const angle = Math.atan2(targetX - playerVisual.mesh.position.x, targetZ - playerVisual.mesh.position.z);
            sunderGroup.rotation.y = angle; 
        }
        slash.rotation.x = Math.PI / 4; 
        slash.position.y = 1.5;
        sunderGroup.add(slash);

        const crackGeo = new THREE.PlaneGeometry(1.0, 8.0);
        crackGeo.rotateX(-Math.PI / 2);
        crackGeo.translate(0, 0, 4.0); 
        const crackMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
        const crack = new THREE.Mesh(crackGeo, crackMat);
        sunderGroup.add(crack);

        threeScene.add(sunderGroup);

        let p = 0;
        const anim = setInterval(() => {
            if (!sunderGroup.parent) { clearInterval(anim); return; }

            p += 0.1;
            
            slash.rotation.z -= 0.3;
            slash.scale.setScalar(1.0 + p);
            slashMat.opacity -= 0.1;

            crack.scale.set(1.0 + Math.sin(p*Math.PI)*2.0, 1.0 + p, 1);
            crackMat.opacity -= 0.05;
            
            if (p >= 1.0) {
                clearInterval(anim);
                threeScene.remove(sunderGroup);
                slashGeo.dispose(); slashMat.dispose();
                crackGeo.dispose(); crackMat.dispose();
            }
        }, 20);
    }
    else if (abilityId === "intimidating_shout" || abilityId === "shattering_roar") {
        const shoutGroup = new THREE.Group();
        
        let pX = targetX; 
        let pZ = targetZ;
        if (playerVisual && playerVisual.mesh) {
            pX = playerVisual.mesh.position.x;
            pZ = playerVisual.mesh.position.z;
        }
        shoutGroup.position.set(pX, terrainHeight + 1.5, pZ);

        if (playerVisual && playerVisual.mesh) {
            shoutGroup.rotation.y = playerVisual.mesh.rotation.y;
        }

        const waveGeo = abilityId === "shattering_roar" 
            ? new THREE.ConeGeometry(3.0, 4.0, 8, 1, true) 
            : new THREE.RingGeometry(0.1, 1.0, 32);

        if (abilityId === "shattering_roar") {
            waveGeo.rotateX(Math.PI / 2);
        } else {
            waveGeo.rotateX(-Math.PI / 2);
        }
        
        const waves: THREE.Mesh[] = [];
        for(let i=0; i<3; i++) {
            const waveMat = new THREE.MeshBasicMaterial({ 
                color: abilityId === "shattering_roar" ? 0xdd4400 : 0xbb0000, 
                transparent: true, 
                opacity: 1.0, 
                side: THREE.DoubleSide,
                wireframe: abilityId === "shattering_roar"
            });
            const wave = new THREE.Mesh(waveGeo, waveMat);
            wave.scale.setScalar(0.1);
            shoutGroup.add(wave);
            waves.push(wave);
        }

        let shards: THREE.InstancedMesh | null = null;
        let sData: any[] = [];
        if (abilityId === "shattering_roar") {
            const sGeo = new THREE.TetrahedronGeometry(0.3);
            const sMat = new THREE.MeshBasicMaterial({ color: 0x88ccff, transparent: true, opacity: 0.8 });
            shards = new THREE.InstancedMesh(sGeo, sMat, 20);
            sData = Array.from({ length: 20 }, () => ({
                pos: new THREE.Vector3(0, 0, 0),
                vel: new THREE.Vector3((Math.random() - 0.5) * 0.8, Math.random() * 0.5 - 0.2, Math.random() * 0.8 + 0.5)
            }));
            shoutGroup.add(shards);
        }

        threeScene.add(shoutGroup);

        let ticks = 0;
        const dummy = new THREE.Object3D();
        const anim = setInterval(() => {
            if (!shoutGroup.parent) { clearInterval(anim); return; }

            ticks++;
            
            waves.forEach((w, i) => {
                const delay = i * 5; 
                if (ticks > delay) {
                    const localTick = ticks - delay;
                    const p = localTick / 15.0; 
                    if (p <= 1.0) {
                        w.scale.setScalar(1.0 + p * 15.0); 
                        (w.material as THREE.Material).opacity = 1.0 - p;
                    }
                }
            });

            if (shards) {
                sData.forEach((s, i) => {
                    s.pos.add(s.vel);
                    dummy.position.copy(s.pos);
                    dummy.rotation.x += 0.2;
                    dummy.rotation.y += 0.2;
                    dummy.scale.setScalar(Math.max(0, 1.0 - (ticks / 30)));
                    dummy.updateMatrix();
                    shards!.setMatrixAt(i, dummy.matrix);
                });
                shards.instanceMatrix.needsUpdate = true;
            }

            if (ticks > 30) {
                clearInterval(anim);
                threeScene.remove(shoutGroup);
                waveGeo.dispose();
                waves.forEach(w => (w.material as THREE.Material).dispose());
                if (shards) {
                    shards.geometry.dispose();
                    (shards.material as THREE.Material).dispose();
                }
            }
        }, 30);
    }
    else if (abilityId === "bull_rush" || abilityId === "unstoppable_force") {
        let startX = targetX;
        let startZ = targetZ;
        if (playerVisual && playerVisual.mesh) {
            startX = playerVisual.mesh.position.x;
            startZ = playerVisual.mesh.position.z;
        }
        
        const group = new THREE.Group();

        const dist = Math.sqrt((targetX - startX)**2 + (targetZ - startZ)**2) || 0.1;
        const geo = new THREE.CylinderGeometry(1.5, 1.5, dist, 8);
        geo.rotateX(Math.PI / 2);
        const mat = new THREE.MeshBasicMaterial({ color: 0xff3300, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending });
        const streak = new THREE.Mesh(geo, mat);
        
        streak.position.set((startX + targetX)/2, terrainHeight + 1.5, (startZ + targetZ)/2);
        streak.lookAt(targetX, terrainHeight + 1.5, targetZ);
        group.add(streak);

        if (abilityId === "unstoppable_force") {
            const trailGeo = new THREE.PlaneGeometry(2.0, dist);
            trailGeo.rotateX(-Math.PI / 2);
            const trailMat = new THREE.MeshBasicMaterial({ color: 0xff5500, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
            const trail = new THREE.Mesh(trailGeo, trailMat);
            trail.position.set((startX + targetX)/2, terrainHeight + 0.1, (startZ + targetZ)/2);
            trail.lookAt(targetX, terrainHeight + 0.1, targetZ);
            group.add(trail);

            const burstGeo = new THREE.SphereGeometry(3.0, 16, 16);
            const burstMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
            const burst = new THREE.Mesh(burstGeo, burstMat);
            burst.position.set(targetX, terrainHeight + 1.5, targetZ);
            burst.scale.setScalar(0.1);
            group.add(burst);
            burst.userData.isBurst = true;
        }

        threeScene.add(group);
        
        let life = 1.0;
        const anim = setInterval(() => {
            if (!group.parent) { clearInterval(anim); return; }

            life -= 0.05;
            streak.scale.set(life, 1.0, life);
            mat.opacity = life;

            group.children.forEach(child => {
                // Cast the generic Object3D to a Mesh to satisfy TypeScript
                const c = child as THREE.Mesh;
                
                if (c.userData.isBurst) {
                    c.scale.setScalar(1.0 + (1.0 - life) * 3.0);
                    if (c.material) (c.material as THREE.Material).opacity = life;
                } else if (c.geometry && (c.geometry as any).type === "PlaneGeometry") {
                    if (c.material) (c.material as THREE.Material).opacity = life;
                }
            });

            if (life <= 0) {
                clearInterval(anim);
                threeScene.remove(group);
                geo.dispose(); mat.dispose();
                group.children.forEach(child => {
                    const c = child as THREE.Mesh;
                    if (c.geometry) c.geometry.dispose();
                    if (c.material) {
                        if (Array.isArray(c.material)) {
                            c.material.forEach(m => m.dispose());
                        } else {
                            c.material.dispose();
                        }
                    }
                });
            }
        }, 20);
    }
    else if (abilityId === "bull_rush_shockwave") {
        const geo = new THREE.SphereGeometry(4.0, 16, 16);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 1.0, wireframe: true });
        const wave = new THREE.Mesh(geo, mat);
        wave.position.set(targetX, terrainHeight + 1.0, targetZ);
        threeScene.add(wave);

        let scale = 0.5;
        const anim = setInterval(() => {
            if (!wave.parent) { clearInterval(anim); return; }

            scale += 0.3;
            wave.scale.setScalar(scale);
            mat.opacity -= 0.08;
            if (mat.opacity <= 0) {
                clearInterval(anim);
                threeScene.remove(wave);
                geo.dispose(); mat.dispose();
            }
        }, 20);
    }
    else if (abilityId === "heroic_leap") {
        if (playerVisual && playerVisual.mesh) {
            let jumpProgress = 0;
            const jumpAnim = setInterval(() => {
                jumpProgress += 0.05; 
                const height = 8.0; 
                const yOffset = 4 * height * jumpProgress * (1 - jumpProgress);
                
                playerVisual.mesh.userData.leapOffset = Math.max(0, yOffset);

                if (jumpProgress >= 1.0) {
                    clearInterval(jumpAnim);
                    playerVisual.mesh.userData.leapOffset = 0;
                }
            }, 20);
        }

        setTimeout(() => {
            const geo = new THREE.RingGeometry(1, 6, 32);
            geo.rotateX(-Math.PI / 2);
            const mat = new THREE.MeshBasicMaterial({ color: 0xff3300, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
            const impact = new THREE.Mesh(geo, mat);
            impact.position.set(targetX, terrainHeight + 0.1, targetZ);
            threeScene.add(impact);

            let scale = 0.2;
            const anim = setInterval(() => {
                if (!impact.parent) { clearInterval(anim); return; }

                scale += 0.15;
                impact.scale.setScalar(scale);
                mat.opacity -= 0.1;
                if (mat.opacity <= 0) {
                    clearInterval(anim);
                    threeScene.remove(impact);
                    geo.dispose(); mat.dispose();
                }
            }, 20);
        }, 400); 
    }
    else if (abilityId === "shattered_crater_spawn" || abilityId === "crater_impact") {
        setTimeout(() => {
            const group = new THREE.Group();
            group.position.set(targetX, terrainHeight + 0.02, targetZ);

            const geo = new THREE.CircleGeometry(5.0, 16);
            geo.rotateX(-Math.PI / 2);
            const mat = new THREE.MeshBasicMaterial({ color: 0x110000, transparent: true, opacity: 0.8, depthWrite: false });
            const crater = new THREE.Mesh(geo, mat);
            group.add(crater);

            if (abilityId === "crater_impact") {
                const fGeo = new THREE.CircleGeometry(4.8, 8);
                fGeo.rotateX(-Math.PI / 2);
                const fMat = new THREE.MeshBasicMaterial({ color: 0xff5500, transparent: true, opacity: 0.6, wireframe: true, depthWrite: false });
                const fissure = new THREE.Mesh(fGeo, fMat);
                group.add(fissure);

                const dGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
                const dMat = new THREE.MeshStandardMaterial({ color: 0x332211, roughness: 1.0 });
                const debris = new THREE.InstancedMesh(dGeo, dMat, 10);
                const dummy = new THREE.Object3D();
                
                for(let i=0; i<10; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const r = 2.0 + Math.random() * 2.0;
                    dummy.position.set(Math.cos(angle)*r, Math.random() * 2.0, Math.sin(angle)*r);
                    dummy.rotation.set(Math.random(), Math.random(), Math.random());
                    dummy.updateMatrix();
                    debris.setMatrixAt(i, dummy.matrix);
                }
                group.add(debris);

                let p = 0;
                const anim = setInterval(() => {
                    if (!group.parent) { clearInterval(anim); return; }
                    p += 0.05;
                    for(let i=0; i<10; i++) {
                        debris.getMatrixAt(i, dummy.matrix);
                        dummy.position.setFromMatrixPosition(dummy.matrix);
                        dummy.position.lerp(new THREE.Vector3(0, 0, 0), 0.1);
                        dummy.position.y -= 0.1; 
                        dummy.updateMatrix();
                        debris.setMatrixAt(i, dummy.matrix);
                    }
                    debris.instanceMatrix.needsUpdate = true;
                    if (p >= 1.0) { clearInterval(anim); group.remove(debris); dGeo.dispose(); dMat.dispose(); debris.dispose(); }
                }, 30);
            }

            threeScene.add(group);

            setTimeout(() => {
                if (group.parent) threeScene.remove(group);
                geo.dispose(); mat.dispose();
                group.children.forEach(c => {
                    if ((c as any).geometry) (c as any).geometry.dispose();
                    if ((c as any).material) (c as any).material.dispose();
                });
            }, 30000);
        }, 400);
    }
    else if (abilityId === "whirlwind_start" || abilityId === "cyclone_pull") {
        if (playerVisual && playerVisual.mesh) {
            const wwGroup = new THREE.Group();
            
            const funnelGeo = new THREE.CylinderGeometry(4.5, 1.0, 6.0, 16, 1, true); 
            funnelGeo.translate(0, 3.0, 0); 
            const funnelMat = new THREE.MeshBasicMaterial({ color: 0xff5500, transparent: true, opacity: 0.3, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, wireframe: true });
            const funnel = new THREE.Mesh(funnelGeo, funnelMat);
            wwGroup.add(funnel);

            const innerFunnelGeo = new THREE.CylinderGeometry(3.0, 0.5, 5.0, 16, 1, true);
            innerFunnelGeo.translate(0, 2.5, 0);
            const innerFunnelMat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.5, side: THREE.DoubleSide, blending: THREE.AdditiveBlending });
            const innerFunnel = new THREE.Mesh(innerFunnelGeo, innerFunnelMat);
            wwGroup.add(innerFunnel);

            const slashes: THREE.Mesh[] = [];
            const slashGeo = new THREE.TorusGeometry(3.0, 0.15, 4, 32, Math.PI * 1.5);
            slashGeo.rotateX(Math.PI / 2);
            for (let i = 0; i < 3; i++) {
                const sMat = new THREE.MeshBasicMaterial({ color: 0xff2200, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
                const slash = new THREE.Mesh(slashGeo, sMat);
                slash.position.y = 1.0 + i * 1.5;
                slash.rotation.y = (Math.PI * 2 / 3) * i;
                wwGroup.add(slash);
                slashes.push(slash);
            }

            const particleCount = 50;
            const pGeo = new THREE.TetrahedronGeometry(0.2);
            const pMat = new THREE.MeshBasicMaterial({ color: abilityId === "cyclone_pull" ? 0xaaaaaa : 0xffdd44, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
            const pMesh = new THREE.InstancedMesh(pGeo, pMat, particleCount);
            
            const pData = Array.from({ length: particleCount }, () => ({
                angle: Math.random() * Math.PI * 2,
                y: Math.random() * 5.0,
                speed: 0.2 + Math.random() * 0.2, 
                upSpeed: abilityId === "cyclone_pull" ? -0.1 : 0.1 + Math.random() * 0.2  
            }));
            wwGroup.add(pMesh);

            const barrierGeo = new THREE.SphereGeometry(5.0, 16, 16);
            const barrierMat = new THREE.MeshBasicMaterial({ color: abilityId === "cyclone_pull" ? 0xaaffff : 0xffffff, transparent: true, opacity: abilityId === "cyclone_pull" ? 0.2 : 0.08, wireframe: true, blending: THREE.AdditiveBlending });
            const barrier = new THREE.Mesh(barrierGeo, barrierMat);
            barrier.position.y = 2.5;
            wwGroup.add(barrier);

            playerVisual.mesh.add(wwGroup);
            playerVisual.mesh.userData.whirlwindAura = wwGroup;

            let time = 0;
            const dummy = new THREE.Object3D();
            const anim = setInterval(() => {
                if (!wwGroup.parent) {
                    clearInterval(anim);
                    return;
                }
                time += 0.05;

                funnel.rotation.y -= 0.3;
                innerFunnel.rotation.y -= 0.5;

                slashes.forEach((slash, idx) => {
                    slash.rotation.y -= (0.4 + idx * 0.1);
                    slash.scale.setScalar(1.0 + Math.sin(time * 10 + idx) * 0.15); 
                });

                barrier.rotation.y += 0.05;
                barrier.scale.setScalar(1.0 + Math.sin(time * 8) * 0.03);

                for(let i = 0; i < particleCount; i++) {
                    const p = pData[i];
                    p.angle -= p.speed; 
                    p.y += p.upSpeed;
                    
                    if (abilityId === "cyclone_pull") {
                        if (p.y < 0) { p.y = 6.0; p.angle = Math.random() * Math.PI * 2; }
                    } else {
                        if (p.y > 6.0) { p.y = 0; p.angle = Math.random() * Math.PI * 2; }
                    }
                    
                    const currentRadius = 0.5 + (p.y * 0.7); 

                    dummy.position.set(Math.cos(p.angle) * currentRadius, p.y, Math.sin(p.angle) * currentRadius);
                    dummy.rotation.set(time, time, time);
                    const scale = p.y > 5.0 ? (6.0 - p.y) : 1.0;
                    dummy.scale.setScalar(scale);
                    dummy.updateMatrix();
                    pMesh.setMatrixAt(i, dummy.matrix);
                }
                pMesh.instanceMatrix.needsUpdate = true;

            }, 30);
            
            playerVisual.mesh.userData.whirlwindAnim = anim;
        }
    }
    else if (abilityId === "whirlwind_end") {
        if (playerVisual && playerVisual.mesh && playerVisual.mesh.userData.whirlwindAura) {
            const wwGroup = playerVisual.mesh.userData.whirlwindAura;
            playerVisual.mesh.remove(wwGroup);
            if (playerVisual.mesh.userData.whirlwindAnim) {
                clearInterval(playerVisual.mesh.userData.whirlwindAnim);
            }
            playerVisual.mesh.userData.whirlwindAura = null;
            playerVisual.mesh.userData.whirlwindAnim = null;
        }
    }
    else if (abilityId === "devastating_cleave" || abilityId === "devastating_cleave_silver") {
        const cleaveGroup = new THREE.Group();
        cleaveGroup.position.set(targetX, terrainHeight + 1.0, targetZ);

        const swingGeo = new THREE.TorusGeometry(4.0, 0.8, 4, 32, Math.PI * 2);
        swingGeo.rotateX(Math.PI / 2);
        const swingMat = new THREE.MeshBasicMaterial({ color: 0xff3300, transparent: true, opacity: 1.0, blending: THREE.AdditiveBlending });
        const swing = new THREE.Mesh(swingGeo, swingMat);
        swing.scale.setScalar(0.1); 
        cleaveGroup.add(swing);

        const discGeo = new THREE.CircleGeometry(4.0, 32);
        discGeo.rotateX(-Math.PI / 2);
        const discMat = new THREE.MeshBasicMaterial({ color: 0xff1100, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
        const disc = new THREE.Mesh(discGeo, discMat);
        disc.scale.setScalar(0.1);
        cleaveGroup.add(disc);

        let bloodWave: THREE.Mesh | null = null;
        let bloodParticles: THREE.InstancedMesh | null = null;
        let bData: any[] = [];

        if (abilityId === "devastating_cleave_silver") {
            const waveGeo = new THREE.RingGeometry(3.5, 4.5, 32);
            waveGeo.rotateX(-Math.PI / 2);
            const waveMat = new THREE.MeshBasicMaterial({ color: 0x880000, transparent: true, opacity: 0.9, side: THREE.DoubleSide });
            bloodWave = new THREE.Mesh(waveGeo, waveMat);
            cleaveGroup.add(bloodWave);

            const pCount = 40;
            const pGeo = new THREE.SphereGeometry(0.2, 4, 4);
            const pMat = new THREE.MeshBasicMaterial({ color: 0x990000 });
            bloodParticles = new THREE.InstancedMesh(pGeo, pMat, pCount);
            
            bData = Array.from({ length: pCount }, () => {
                const angle = Math.random() * Math.PI * 2;
                return {
                    pos: new THREE.Vector3(Math.cos(angle) * 4, 0, Math.sin(angle) * 4),
                    vel: new THREE.Vector3(Math.cos(angle) * 0.8, Math.random() * 0.4 + 0.2, Math.sin(angle) * 0.8)
                };
            });
            cleaveGroup.add(bloodParticles);
        }

        threeScene.add(cleaveGroup);

        let p = 0;
        const dummy = new THREE.Object3D();
        
        const anim = setInterval(() => {
            if (!cleaveGroup.parent) { clearInterval(anim); return; }

            p += 0.08; 
            
            swing.rotation.y += 0.5;
            disc.rotation.y += 0.5;
            
            if (p < 0.3) {
                const scale = p / 0.3;
                swing.scale.setScalar(scale);
                disc.scale.setScalar(scale);
            } else {
                const fade = (p - 0.3) / 0.7;
                swingMat.opacity = 1.0 - fade;
                discMat.opacity = 0.5 - (fade * 0.5);
            }

            if (bloodWave) {
                bloodWave.scale.setScalar(1.0 + p * 1.2); 
                (bloodWave.material as THREE.Material).opacity = 1.0 - p;
            }

            if (bloodParticles) {
                bData.forEach((b, i) => {
                    b.pos.add(b.vel);
                    b.vel.y -= 0.05; 
                    dummy.position.copy(b.pos);
                    dummy.scale.setScalar(Math.max(0, 1.0 - p));
                    dummy.updateMatrix();
                    bloodParticles!.setMatrixAt(i, dummy.matrix);
                });
                bloodParticles.instanceMatrix.needsUpdate = true;
            }

            if (p >= 1.0) {
                clearInterval(anim);
                threeScene.remove(cleaveGroup);
                swingGeo.dispose(); swingMat.dispose();
                discGeo.dispose(); discMat.dispose();
                if (bloodWave) {
                    bloodWave.geometry.dispose();
                    (bloodWave.material as THREE.Material).dispose();
                }
                if (bloodParticles) {
                    bloodParticles.geometry.dispose();
                    (bloodParticles.material as THREE.Material).dispose();
                }
            }
        }, 20);
    }
    else if (abilityId === "seismic_slam" || abilityId === "aftershock") {
        const geo = new THREE.SphereGeometry(5.0, 16, 16);
        const mat = new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 1.0, wireframe: true });
        const wave = new THREE.Mesh(geo, mat);
        wave.position.set(targetX, terrainHeight + 1.0, targetZ);
        threeScene.add(wave);

        let scale = 0.5;
        const anim = setInterval(() => {
            if (!wave.parent) { clearInterval(anim); return; }
            scale += 0.3;
            wave.scale.setScalar(scale);
            mat.opacity -= 0.08;
            if (mat.opacity <= 0) {
                clearInterval(anim);
                threeScene.remove(wave);
                geo.dispose(); mat.dispose();
            }
        }, 20);

        if (abilityId === "aftershock") {
            setTimeout(() => {
                const group = new THREE.Group();
                group.position.set(targetX, terrainHeight, targetZ);

                const w2 = new THREE.Mesh(geo, mat.clone());
                w2.position.y = 1.0;
                group.add(w2);

                const spikeGeo = new THREE.ConeGeometry(0.8, 3.0, 4);
                const spikeMat = new THREE.MeshStandardMaterial({ color: 0x442211, roughness: 1.0 });
                const spikes: THREE.Mesh[] = [];

                for(let i=0; i<8; i++) {
                    const spike = new THREE.Mesh(spikeGeo, spikeMat);
                    const angle = (i / 8) * Math.PI * 2;
                    spike.position.set(Math.cos(angle)*4, -1.5, Math.sin(angle)*4);
                    spike.rotation.set((Math.random() - 0.5), angle, (Math.random() - 0.5));
                    group.add(spike);
                    spikes.push(spike);
                }

                threeScene.add(group);

                let p = 0;
                const aAnim = setInterval(() => {
                    if (!group.parent) { clearInterval(aAnim); return; }
                    p += 0.05;

                    w2.scale.setScalar(p * 2.0);
                    (w2.material as THREE.Material).opacity = 1.0 - p;

                    if (p < 0.5) {
                        spikes.forEach(s => s.position.y += 0.4);
                    }

                    if (p >= 1.0) {
                        clearInterval(aAnim);
                        setTimeout(() => {
                            if (group.parent) threeScene.remove(group);
                            w2.geometry.dispose(); (w2.material as THREE.Material).dispose();
                            spikeGeo.dispose(); spikeMat.dispose();
                        }, 2000);
                    }
                }, 20);
            }, 1000);
        }
    }
    else if (abilityId === "meteor_strike" || abilityId === "meteor_strike_magma" || abilityId === "extinction_event") {
        const meteorGroup = new THREE.Group();
        
        const startY = terrainHeight + 60; 
        meteorGroup.position.set(targetX + 15, startY, targetZ - 15);

        const rockGeo = new THREE.DodecahedronGeometry(3.5, 1);
        const rockMat = new THREE.MeshStandardMaterial({ color: 0x221100, roughness: 0.9 });
        const rock = new THREE.Mesh(rockGeo, rockMat);
        meteorGroup.add(rock);

        const fireGeo = new THREE.IcosahedronGeometry(4.5, 2);
        const fireMat = new THREE.MeshBasicMaterial({ color: 0xff3300, wireframe: true, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
        const fire = new THREE.Mesh(fireGeo, fireMat);
        meteorGroup.add(fire);

        threeScene.add(meteorGroup);

        const targetPos = new THREE.Vector3(targetX, terrainHeight, targetZ);
        
        const fallAnim = setInterval(() => {
            if (!meteorGroup.parent) { clearInterval(fallAnim); return; }

            meteorGroup.position.lerp(targetPos, 0.15); 
            
            rock.rotation.x += 0.3; rock.rotation.y += 0.4;
            fire.scale.setScalar(1.0 + Math.random() * 0.3);

            if (meteorGroup.position.distanceTo(targetPos) < 1.5) {
                clearInterval(fallAnim);
                threeScene.remove(meteorGroup);
                rockGeo.dispose(); rockMat.dispose(); 
                fireGeo.dispose(); fireMat.dispose();

                const boomRadius = abilityId === "extinction_event" ? 12.0 : 8.0;
                const boomGeo = new THREE.SphereGeometry(boomRadius, 32, 32);
                const boomMat = new THREE.MeshBasicMaterial({ color: 0xff2200, transparent: true, opacity: 1.0 });
                const boom = new THREE.Mesh(boomGeo, boomMat);
                boom.position.copy(targetPos);
                threeScene.add(boom);

                let boomScale = 1.0;
                const boomAnim = setInterval(() => {
                    if (!boom.parent) { clearInterval(boomAnim); return; }

                    boomScale += 0.25;
                    boom.scale.setScalar(boomScale);
                    boomMat.opacity -= 0.05;
                    
                    if (boomMat.opacity <= 0) {
                        clearInterval(boomAnim);
                        threeScene.remove(boom);
                        boomGeo.dispose(); boomMat.dispose();
                    }
                }, 20);

                if (abilityId === "meteor_strike_magma" || abilityId === "extinction_event") {
                    const poolGroup = new THREE.Group();
                    poolGroup.position.set(targetX, terrainHeight + 0.05, targetZ); 

                    const poolRadius = abilityId === "extinction_event" ? 12.5 : 8.5;
                    const poolGeo = new THREE.CircleGeometry(poolRadius, 32);
                    poolGeo.rotateX(-Math.PI / 2);
                    const poolMat = new THREE.MeshBasicMaterial({ color: 0xff3300, transparent: true, opacity: 0.8, depthWrite: false });
                    const pool = new THREE.Mesh(poolGeo, poolMat);
                    poolGroup.add(pool);

                    if (abilityId === "extinction_event") {
                        const coreGeo = new THREE.SphereGeometry(3.0, 16, 16);
                        const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffee, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
                        const core = new THREE.Mesh(coreGeo, coreMat);
                        poolGroup.add(core);

                        const eGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
                        const eMat = new THREE.MeshBasicMaterial({ color: 0xffaa00 });
                        const embers = new THREE.InstancedMesh(eGeo, eMat, 50);
                        const dummy = new THREE.Object3D();
                        for(let i=0; i<50; i++){
                            dummy.position.set((Math.random()-0.5)*20, Math.random()*10, (Math.random()-0.5)*20);
                            dummy.updateMatrix();
                            embers.setMatrixAt(i, dummy.matrix);
                        }
                        poolGroup.add(embers);
                    }

                    threeScene.add(poolGroup);

                    let ticks = 0;
                    const poolAnim = setInterval(() => {
                        if (!poolGroup.parent) { clearInterval(poolAnim); return; }

                        ticks++;
                        poolMat.opacity = 0.6 + Math.sin(ticks * 0.1) * 0.2;
                        if (abilityId === "extinction_event") {
                            poolGroup.children.forEach(c => {
                                if ((c as any).isInstancedMesh) {
                                    c.rotation.y += 0.01;
                                }
                            });
                        }
                        if (ticks > 260) { 
                            clearInterval(poolAnim);
                            threeScene.remove(poolGroup);
                            poolGeo.dispose(); poolMat.dispose();
                            poolGroup.children.forEach(c => {
                                if ((c as any).geometry) (c as any).geometry.dispose();
                                if ((c as any).material) (c as any).material.dispose();
                            });
                        }
                    }, 30);
                }
            }
        }, 30);
    }
    else if (abilityId === "wrath_of_the_berserker" || abilityId === "undying_rage") {
        if (playerVisual && playerVisual.mesh) {
            if (playerVisual.mesh.userData.wrathAura) {
                playerVisual.mesh.remove(playerVisual.mesh.userData.wrathAura);
                clearInterval(playerVisual.mesh.userData.wrathAnim);
            }

            const wrathGroup = new THREE.Group();
            
            const shellGeo = new THREE.CapsuleGeometry(1.2, 1.5, 16, 16);
            shellGeo.translate(0, 1.5, 0);
            const shellMat = new THREE.MeshBasicMaterial({ 
                color: abilityId === "undying_rage" ? 0x880000 : 0xff2200, 
                transparent: true, 
                opacity: 0.4, 
                wireframe: abilityId !== "undying_rage", 
                blending: THREE.AdditiveBlending 
            });
            const shell = new THREE.Mesh(shellGeo, shellMat);
            wrathGroup.add(shell);

            const pCount = 20;
            const pGeo = new THREE.BoxGeometry(0.15, 0.15, 0.15);
            const pMat = new THREE.MeshBasicMaterial({ color: abilityId === "undying_rage" ? 0xff0000 : 0xffaa00, blending: THREE.AdditiveBlending });
            const embers = new THREE.InstancedMesh(pGeo, pMat, pCount);
            const eData = Array.from({ length: pCount }, () => ({
                x: (Math.random() - 0.5) * 2.0,
                y: Math.random() * 3.0,
                z: (Math.random() - 0.5) * 2.0,
                speedY: 0.05 + Math.random() * 0.1
            }));
            wrathGroup.add(embers);

            if (abilityId === "undying_rage") {
                const flareGeo = new THREE.SphereGeometry(4.0, 32, 32);
                const flareMat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
                const flare = new THREE.Mesh(flareGeo, flareMat);
                flare.position.y = 1.5;
                wrathGroup.add(flare);

                let p = 0;
                const fAnim = setInterval(() => {
                    if (!flare.parent) { clearInterval(fAnim); return; }
                    p += 0.1;
                    flare.scale.setScalar(1.0 + p * 2);
                    flareMat.opacity = 0.8 - p;
                    if (p >= 1.0) { clearInterval(fAnim); wrathGroup.remove(flare); flareGeo.dispose(); flareMat.dispose(); }
                }, 20);
            }

            playerVisual.mesh.add(wrathGroup);
            playerVisual.mesh.userData.wrathAura = wrathGroup;

            let time = 0;
            const dummy = new THREE.Object3D();
            const anim = setInterval(() => {
                if (!wrathGroup.parent) {
                    clearInterval(anim);
                    return;
                }
                time += 0.1;
                
                if (abilityId === "undying_rage") {
                    // Heartbeat pulse
                    const pulse = 1.0 + Math.pow(Math.sin(time * 6), 4) * 0.2;
                    shell.scale.setScalar(pulse);
                } else {
                    shell.scale.setScalar(1.0 + Math.sin(time * 5) * 0.05);
                }

                eData.forEach((e, i) => {
                    e.y += e.speedY;
                    if (e.y > 3.5) {
                        e.y = 0;
                        e.x = (Math.random() - 0.5) * 2.0;
                        e.z = (Math.random() - 0.5) * 2.0;
                    }
                    dummy.position.set(e.x, e.y, e.z);
                    dummy.rotation.x += 0.1;
                    dummy.rotation.y += 0.1;
                    
                    const fade = e.y > 3.0 ? (3.5 - e.y) * 2.0 : 1.0;
                    dummy.scale.setScalar(fade);
                    dummy.updateMatrix();
                    embers.setMatrixAt(i, dummy.matrix);
                });
                embers.instanceMatrix.needsUpdate = true;

            }, 30);
            
            playerVisual.mesh.userData.wrathAnim = anim;

            setTimeout(() => {
                if (playerVisual && playerVisual.mesh && playerVisual.mesh.userData.wrathAura) {
                    clearInterval(playerVisual.mesh.userData.wrathAnim);
                    playerVisual.mesh.remove(playerVisual.mesh.userData.wrathAura);
                    playerVisual.mesh.userData.wrathAura = null;
                    shellGeo.dispose(); shellMat.dispose();
                    pGeo.dispose(); pMat.dispose(); embers.dispose();
                }
            }, 15000);
        }
    }
    // ==========================================
    // 🌿 NATURE PATHWAY VFX
    // ==========================================
    else if (abilityId === "wolf_bite") {
        const biteGroup = new THREE.Group();
        biteGroup.position.set(targetX, terrainHeight + 1.0, targetZ);
        
        // Two intersecting glowing green slashes
        const slashGeo = new THREE.PlaneGeometry(3.0, 0.4);
        const slashMat = new THREE.MeshBasicMaterial({ 
            color: 0x44ff88, 
            transparent: true, 
            opacity: 1.0, 
            blending: THREE.AdditiveBlending, 
            side: THREE.DoubleSide 
        });
        
        const slash1 = new THREE.Mesh(slashGeo, slashMat);
        slash1.rotation.x = -Math.PI / 2;
        slash1.rotation.z = Math.PI / 4;
        
        const slash2 = new THREE.Mesh(slashGeo, slashMat);
        slash2.rotation.x = -Math.PI / 2;
        slash2.rotation.z = -Math.PI / 4;

        if (playerVisual && playerVisual.mesh) {
            biteGroup.rotation.y = playerVisual.mesh.rotation.y;
        }

        biteGroup.add(slash1, slash2);
        threeScene.add(biteGroup);

        let scale = 0.2;
        const anim = setInterval(() => {
            if (!biteGroup.parent) { clearInterval(anim); return; }

            scale += 0.2;
            slash1.scale.set(scale, scale, scale);
            slash2.scale.set(scale, scale, scale);
            slashMat.opacity -= 0.1;
            
            if (slashMat.opacity <= 0) {
                clearInterval(anim);
                threeScene.remove(biteGroup);
                slashGeo.dispose(); slashMat.dispose();
            }
        }, 20);
    }
    else if (abilityId === "spirit_animal" || abilityId === "pack_leader") {
        if (playerVisual && playerVisual.mesh) {
            if (playerVisual.mesh.userData.wolfAnim) {
                clearInterval(playerVisual.mesh.userData.wolfAnim);
                playerVisual.mesh.userData.wolfAnim = null;
            }
            const orphans: THREE.Object3D[] = [];
            playerVisual.mesh.traverse((child: any) => {
                if (child.userData && child.userData.isWolfMesh) {
                    orphans.push(child);
                }
            });
            for (let i = orphans.length - 1; i >= 0; i--) {
                const o = orphans[i];
                if (o.parent) o.parent.remove(o);
                if ((o as any).geometry) (o as any).geometry.dispose();
                if ((o as any).material) {
                    if (Array.isArray((o as any).material)) {
                        (o as any).material.forEach((m: any) => m.dispose());
                    } else {
                        (o as any).material.dispose();
                    }
                }
            }

            playerVisual.mesh.traverse((child: any) => {
                if (child.isMesh && !child.userData.isWolfMesh) {
                    if (child.userData.wasVisible === undefined) {
                        child.userData.wasVisible = child.visible;
                    }
                    child.visible = false;
                }
            });

            const wolfGroup = new THREE.Group();
            wolfGroup.userData.isWolfMesh = true; 
            
            const wolfMat = new THREE.MeshStandardMaterial({ 
                color: 0x00ffa5, 
                emissive: 0x00aa55, 
                emissiveIntensity: 1.2,
                transparent: true, 
                opacity: 0.85, 
                roughness: 0.2,
                metalness: 0.5
            });

            const wireMat = new THREE.MeshBasicMaterial({
                color: 0xccffdd,
                wireframe: true,
                transparent: true,
                opacity: 0.4,
                blending: THREE.AdditiveBlending
            });

            const createPart = (geo: THREE.BufferGeometry, pos: number[], rot: number[]) => {
                const mesh = new THREE.Mesh(geo, wolfMat);
                const wire = new THREE.Mesh(geo, wireMat);
                wire.scale.setScalar(1.05);
                mesh.add(wire);
                
                mesh.position.set(pos[0], pos[1], pos[2]);
                mesh.rotation.set(rot[0], rot[1], rot[2]);
                
                mesh.userData.isWolfMesh = true;
                wire.userData.isWolfMesh = true;
                return mesh;
            };

            const chest = createPart(new THREE.CylinderGeometry(0.5, 0.4, 1.2, 6), [0, 1.0, 0.4], [Math.PI/2, 0, 0]);
            const pelvis = createPart(new THREE.CylinderGeometry(0.4, 0.3, 1.0, 6), [0, 0.9, -0.6], [Math.PI/2, 0, 0]);
            wolfGroup.add(chest, pelvis);

            const head = createPart(new THREE.ConeGeometry(0.35, 1.0, 5), [0, 1.4, 1.3], [Math.PI/2 + 0.2, 0, 0]);
            wolfGroup.add(head);

            const earL = createPart(new THREE.ConeGeometry(0.1, 0.3, 4), [0.2, 1.7, 1.1], [0.2, 0, 0]);
            const earR = createPart(new THREE.ConeGeometry(0.1, 0.3, 4), [-0.2, 1.7, 1.1], [0.2, 0, 0]);
            wolfGroup.add(earL, earR);

            const tailGroup = new THREE.Group();
            tailGroup.position.set(0, 1.0, -1.1);
            const tail = createPart(new THREE.ConeGeometry(0.15, 0.8, 4), [0, -0.4, -0.2], [-0.5, 0, 0]);
            tailGroup.userData.isWolfMesh = true;
            tailGroup.add(tail);
            wolfGroup.add(tailGroup);

            const legGeo = new THREE.CylinderGeometry(0.15, 0.05, 0.9, 5);
            legGeo.translate(0, -0.45, 0); 

            const legs: THREE.Mesh[] = [];
            const legPositions = [
                [-0.3, 1.0, 0.8], [0.3, 1.0, 0.8],   
                [-0.3, 0.9, -0.8], [0.3, 0.9, -0.8]  
            ];

            legPositions.forEach(pos => {
                const leg = createPart(legGeo, [pos[0], pos[1], pos[2]], [0, 0, 0]);
                wolfGroup.add(leg);
                legs.push(leg);
            });

            const light = new THREE.PointLight(0x00ffa5, 2.0, 8.0);
            light.position.set(0, 1.0, 0);
            light.userData.isWolfMesh = true;
            wolfGroup.add(light);

            if (abilityId === "pack_leader") {
                const auraGeo = new THREE.RingGeometry(0.1, 6.0, 32);
                auraGeo.rotateX(-Math.PI / 2);
                const auraMat = new THREE.MeshBasicMaterial({ color: 0x00ffa5, transparent: true, opacity: 0.3, depthWrite: false });
                const aura = new THREE.Mesh(auraGeo, auraMat);
                aura.position.y = 0.1;
                wolfGroup.add(aura);

                const howlGeo = new THREE.SphereGeometry(6.0, 32, 32);
                const howlMat = new THREE.MeshBasicMaterial({ color: 0x44ffaa, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
                const howl = new THREE.Mesh(howlGeo, howlMat);
                howl.position.y = 1.0;
                wolfGroup.add(howl);
                
                let p = 0;
                const hAnim = setInterval(() => {
                    if (!howl.parent) { clearInterval(hAnim); return; }
                    p += 0.1;
                    howl.scale.setScalar(p);
                    howlMat.opacity = 1.0 - p;
                    if (p >= 1.0) { clearInterval(hAnim); wolfGroup.remove(howl); howlGeo.dispose(); howlMat.dispose(); }
                }, 20);
            }

            playerVisual.mesh.add(wolfGroup);
            playerVisual.mesh.userData.wolfGroup = wolfGroup;

            let lastPos = playerVisual.mesh.position.clone();
            let time = 0;
            
            const anim = setInterval(() => {
                if (!wolfGroup.parent) {
                    clearInterval(anim);
                    return;
                }
                
                time += 0.1;
                
                const currentPos = playerVisual.mesh.position.clone();
                const distMoved = currentPos.distanceTo(lastPos);
                lastPos.copy(currentPos);
                
                tailGroup.rotation.y = Math.sin(time * 2) * 0.2;
                tailGroup.rotation.x = Math.sin(time) * 0.1;

                if (distMoved > 0.01) {
                    legs[0].rotation.x = Math.sin(time * 5) * 0.8;
                    legs[3].rotation.x = Math.sin(time * 5) * 0.8;
                    legs[1].rotation.x = Math.cos(time * 5) * 0.8;
                    legs[2].rotation.x = Math.cos(time * 5) * 0.8;
                    
                    chest.position.y = 1.0 + Math.sin(time * 10) * 0.05;
                    pelvis.position.y = 0.9 + Math.cos(time * 10) * 0.05;
                } else {
                    legs.forEach(leg => leg.rotation.x *= 0.8);
                    chest.position.y = 1.0 + Math.sin(time * 2) * 0.02;
                    pelvis.position.y = 0.9 + Math.sin(time * 2) * 0.02;
                }
            }, 30);
            
            playerVisual.mesh.userData.wolfAnim = anim;
        }
    }
    else if (abilityId === "spirit_animal_end") {
        if (playerVisual && playerVisual.mesh) {
            playerVisual.mesh.traverse((child: any) => {
                if (child.isMesh && child.userData.wasVisible !== undefined) {
                    child.visible = child.userData.wasVisible;
                    delete child.userData.wasVisible;
                }
            });

            if (playerVisual.mesh.userData.wolfAnim) {
                clearInterval(playerVisual.mesh.userData.wolfAnim);
                playerVisual.mesh.userData.wolfAnim = null;
            }

            const orphans: THREE.Object3D[] = [];
            playerVisual.mesh.traverse((child: any) => {
                if (child.userData && child.userData.isWolfMesh) {
                    orphans.push(child);
                }
            });

            for (let i = orphans.length - 1; i >= 0; i--) {
                const o = orphans[i];
                if (o.parent) o.parent.remove(o);
                if ((o as any).geometry) (o as any).geometry.dispose();
                if ((o as any).material) {
                    if (Array.isArray((o as any).material)) {
                        (o as any).material.forEach((m: any) => m.dispose());
                    } else {
                        (o as any).material.dispose();
                    }
                }
            }
            playerVisual.mesh.userData.wolfGroup = null;
        }
    }
    else if (abilityId === "earth_spike" || abilityId === "jagged_stone") {
        const group = new THREE.Group();
        group.position.set(targetX, terrainHeight, targetZ);

        const spikeGeo = new THREE.ConeGeometry(1.0, 4.0, 5);
        spikeGeo.translate(0, 2.0, 0);
        const spikeMat = new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 });
        const mainSpike = new THREE.Mesh(spikeGeo, spikeMat);
        mainSpike.position.y = -4.0;
        group.add(mainSpike);

        const spikes: THREE.Mesh[] = [];
        if (abilityId === "jagged_stone") {
            for(let i=0; i<4; i++) {
                const s = new THREE.Mesh(spikeGeo, spikeMat);
                s.scale.setScalar(0.5);
                const angle = (i/4) * Math.PI * 2;
                s.position.set(Math.cos(angle)*1.5, -2.0, Math.sin(angle)*1.5);
                s.rotation.x = Math.PI / 4;
                s.rotation.y = angle;
                group.add(s);
                spikes.push(s);
            }
        }

        threeScene.add(group);

        let ticks = 0;
        const anim = setInterval(() => {
            if (!group.parent) { clearInterval(anim); return; }
            ticks++;
            if (ticks < 10) {
                mainSpike.position.y += 0.5; 
                spikes.forEach(s => s.position.y += 0.3);
            } else if (ticks > 30) {
                mainSpike.position.y -= 0.2; 
                spikes.forEach(s => s.position.y -= 0.1);
            }
            if (ticks > 50) {
                clearInterval(anim);
                threeScene.remove(group);
                spikeGeo.dispose(); spikeMat.dispose();
            }
        }, 20);
    }
    else if (abilityId === "healing_blossom" || abilityId === "natures_bounty") {
        const blossomGroup = new THREE.Group();
        blossomGroup.position.set(targetX, terrainHeight + 0.1, targetZ);

        const flowerGeo = new THREE.TorusGeometry(1.5, 0.4, 8, 16, Math.PI * 2);
        flowerGeo.rotateX(-Math.PI / 2);
        const flowerMat = new THREE.MeshBasicMaterial({ color: 0xff66cc, transparent: true, opacity: 0.8 });
        const flower = new THREE.Mesh(flowerGeo, flowerMat);
        blossomGroup.add(flower);

        const auraGeo = new THREE.CircleGeometry(5.0, 32);
        auraGeo.rotateX(-Math.PI / 2);
        const auraMat = new THREE.MeshBasicMaterial({ color: 0x44ff44, transparent: true, opacity: 0.3, depthWrite: false });
        const aura = new THREE.Mesh(auraGeo, auraMat);
        blossomGroup.add(aura);

        let spores: THREE.InstancedMesh | null = null;
        let sData: any[] = [];
        if (abilityId === "natures_bounty") {
            const sGeo = new THREE.SphereGeometry(0.2, 4, 4);
            const sMat = new THREE.MeshBasicMaterial({ color: 0xffaacc, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
            spores = new THREE.InstancedMesh(sGeo, sMat, 30);
            sData = Array.from({ length: 30 }, () => ({
                pos: new THREE.Vector3((Math.random()-0.5)*8, Math.random()*4, (Math.random()-0.5)*8),
                vel: new THREE.Vector3(0, Math.random()*0.05 + 0.02, 0)
            }));
            blossomGroup.add(spores);

            const fruitGeo = new THREE.SphereGeometry(0.8, 16, 16);
            const fruitMat = new THREE.MeshBasicMaterial({ color: 0xaaff00 });
            const fruit = new THREE.Mesh(fruitGeo, fruitMat);
            fruit.position.y = 1.0;
            blossomGroup.add(fruit);
        }

        threeScene.add(blossomGroup);

        let ticks = 0;
        const dummy = new THREE.Object3D();
        const anim = setInterval(() => {
            if (!blossomGroup.parent) { clearInterval(anim); return; }
            ticks++;
            flower.rotation.z += 0.05;
            aura.scale.setScalar(1.0 + Math.sin(ticks * 0.1) * 0.1); 
            
            if (spores) {
                sData.forEach((s, i) => {
                    s.pos.add(s.vel);
                    if (s.pos.y > 4.0) s.pos.y = 0;
                    dummy.position.copy(s.pos);
                    dummy.updateMatrix();
                    spores!.setMatrixAt(i, dummy.matrix);
                });
                spores.instanceMatrix.needsUpdate = true;
            }

            if (ticks > 300) { 
                clearInterval(anim);
                threeScene.remove(blossomGroup);
                flowerGeo.dispose(); flowerMat.dispose();
                auraGeo.dispose(); auraMat.dispose();
                if (spores) {
                    spores.geometry.dispose();
                    (spores.material as THREE.Material).dispose();
                }
            }
        }, 20);
    }
    else if (abilityId === "wrath_of_the_forest" || abilityId === "world_tree") {
        const rootGroup = new THREE.Group();
        rootGroup.position.set(targetX, terrainHeight, targetZ);

        const rootGeo = new THREE.CylinderGeometry(0.5, 1.5, 8.0, 8);
        const rootMat = new THREE.MeshStandardMaterial({ color: 0x3b2f2f, roughness: 1.0 });

        for (let i = 0; i < 8; i++) {
            const root = new THREE.Mesh(rootGeo, rootMat);
            const angle = (i / 8) * Math.PI * 2;
            const dist = 3.0 + Math.random() * 4.0;
            root.position.set(Math.cos(angle) * dist, -4.0, Math.sin(angle) * dist);
            root.rotation.set((Math.random() - 0.5), angle, (Math.random() - 0.5));
            rootGroup.add(root);
        }

        const groundAuraGeo = new THREE.CircleGeometry(10.0, 32);
        groundAuraGeo.rotateX(-Math.PI / 2);
        const groundAuraMat = new THREE.MeshBasicMaterial({ color: 0x00aa22, transparent: true, opacity: 0.4, depthWrite: false });
        const groundAura = new THREE.Mesh(groundAuraGeo, groundAuraMat);
        groundAura.position.y = 0.1;
        rootGroup.add(groundAura);

        let treeGroup: THREE.Group | null = null;
        if (abilityId === "world_tree") {
            treeGroup = new THREE.Group();
            
            const trunkGeo = new THREE.CylinderGeometry(1.5, 2.0, 15.0, 8);
            trunkGeo.translate(0, 7.5, 0);
            const trunk = new THREE.Mesh(trunkGeo, rootMat);
            trunk.scale.setScalar(0.01);
            treeGroup.add(trunk);

            const leafGeo = new THREE.DodecahedronGeometry(5.0, 1);
            const leafMat = new THREE.MeshBasicMaterial({ color: 0x00ff55, transparent: true, opacity: 0.9 });
            const leaves = new THREE.Mesh(leafGeo, leafMat);
            leaves.position.y = 15.0;
            leaves.scale.setScalar(0.01);
            treeGroup.add(leaves);

            rootGroup.add(treeGroup);
            treeGroup.userData.trunk = trunk;
            treeGroup.userData.leaves = leaves;
        }

        threeScene.add(rootGroup);

        let ticks = 0;
        const anim = setInterval(() => {
            if (!rootGroup.parent) { clearInterval(anim); return; }
            ticks++;
            
            if (ticks < 20) {
                rootGroup.children.forEach(c => { 
                    const mesh = c as THREE.Mesh;
                    if (mesh.geometry && mesh.geometry.type === 'CylinderGeometry') mesh.position.y += 0.2; 
                });
            }

            if (treeGroup && ticks < 50) {
                const p = ticks / 50.0;
                treeGroup.userData.trunk.scale.set(p, p, p);
                treeGroup.userData.leaves.scale.set(p, p, p);
            }
            
            if (ticks > 200) { 
                rootGroup.children.forEach(c => { 
                    const mesh = c as THREE.Mesh;
                    if (mesh.geometry && mesh.geometry.type === 'CylinderGeometry') mesh.position.y -= 0.1; 
                });
                groundAuraMat.opacity -= 0.05;

                if (treeGroup) {
                    const p = Math.max(0.01, 1.0 - ((ticks - 200) / 50));
                    treeGroup.userData.trunk.scale.set(p, p, p);
                    treeGroup.userData.leaves.scale.set(p, p, p);
                    (treeGroup.userData.leaves.material as THREE.Material).opacity = p;
                }
            }

            if (ticks > 250) {
                clearInterval(anim);
                threeScene.remove(rootGroup);
                rootGeo.dispose(); rootMat.dispose();
                groundAuraGeo.dispose(); groundAuraMat.dispose();
                if (treeGroup) {
                    treeGroup.userData.trunk.geometry.dispose();
                    treeGroup.userData.leaves.geometry.dispose();
                    treeGroup.userData.leaves.material.dispose();
                }
            }
        }, 20);
    }
    // ==========================================
    // UNIVERSAL FALLBACK VFX 
    // ==========================================
    else {
        const pGeo = new THREE.SphereGeometry(3.0, 16, 16);
        
        let hexColor = 0xffffff; 
        if (abilityId.includes("radiant") || abilityId.includes("holy") || abilityId.includes("divine") || abilityId.includes("heavenly") || abilityId.includes("pure") || abilityId.includes("consecrated") || abilityId.includes("dawn") || abilityId.includes("nova") || abilityId.includes("flare") || abilityId.includes("cross")) {
            hexColor = 0xffffaa; 
        } else if (abilityId.includes("bull") || abilityId.includes("heroic") || abilityId.includes("sunder") || abilityId.includes("wrath") || abilityId.includes("meteor") || abilityId.includes("seismic") || abilityId.includes("cleave") || abilityId.includes("whirlwind") || abilityId.includes("shout")) {
            hexColor = 0xff4400; 
        } else if (abilityId.includes("void") || abilityId.includes("shadow") || abilityId.includes("umbral") || abilityId.includes("reaper") || abilityId.includes("harvest") || abilityId.includes("feast") || abilityId.includes("doom") || abilityId.includes("nightfall") || abilityId.includes("blood")) {
            hexColor = 0x330066; 
        } else if (abilityId.includes("spirit") || abilityId.includes("earth") || abilityId.includes("healing") || abilityId.includes("blossom") || abilityId.includes("forest") || abilityId.includes("root")) {
            hexColor = 0x22cc44; 
        }

        const pMat = new THREE.MeshBasicMaterial({ color: hexColor, transparent: true, opacity: 0.9, wireframe: true });
        const burst = new THREE.Mesh(pGeo, pMat);
        burst.position.set(targetX, terrainHeight + 1, targetZ);
        threeScene.add(burst);
        
        let scale = 0.1;
        const anim = setInterval(() => {
            if (!burst.parent) { clearInterval(anim); return; }

            scale += 0.2;
            burst.scale.set(scale, scale, scale);
            pMat.opacity -= 0.1;
            
            if (pMat.opacity <= 0) {
                clearInterval(anim);
                threeScene.remove(burst);
                pGeo.dispose(); pMat.dispose();
            }
        }, 30);
    }
}

export const CATEGORY_MAP: Record<string, { name: string, slot: number }> = {
    "mobility": { name: "Mobility", slot: 2 },
    "tactical": { name: "Tactical", slot: 3 },
    "aoe": { name: "Area of Effect", slot: 4 },
    "ultimate": { name: "Confluence", slot: 5 }
};

export const UTILITY_CATEGORY_MAP: Record<string, { name: string, slot: number }> = {
    "core": { name: "Core Progression", slot: 6 },
    "branches": { name: "Specializations", slot: 7 }
};

export const FAMILIAR_CATEGORY_MAP: Record<string, { name: string, slot: number }> = {
    "core": { name: "Familiar Core", slot: 8 },
    "branches": { name: "Companion Commands", slot: 9 }
};

export const SKILL_TREE_DATA: Record<string, Record<string, Record<string, any>>> = {
    shadow: {
        mobility: {
            "reaper_step": { 
                name: "Reaper's Step", icon: "👣", desc: "Meld into the shadows and instantly teleport to a target location.", cooldownTime: 5.0, color: "#5500aa", 
                upgrades: { 
                    "blood_clone": { 
                        name: "Blood Clone", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Leaves a blood decoy at your starting location that draws enemy aggro.",
                            "Bronze Rank: If the decoy is destroyed or expires, it explodes, applying Bleed to nearby enemies.",
                            "Silver Rank: [EVOLUTION] Teleporting directly through an enemy tears their soul, instantly applying 2 stacks of Necrosis."
                        ]
                    } 
                } 
            },
            "shadow_step": {
                name: "Shadow Step", 
                icon: "🌑", 
                desc: "Target any location in range to instantly dissolve into shadows and reappear.", 
                cooldownTime: 4.0, 
                color: "#440088",
                upgrades: {
                    "way_of_the_night": {
                        name: "Way of the Night", 
                        maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Targeted teleportation. Dissolve into a shadow and reappear at any location within 15 units.",
                            "Bronze Rank: Use your ability to leave a Shadow Anchor. You can target this anchor from any distance to warp back to it.",
                            "Silver Rank: [EVOLUTION] Tear open a shadow rift. Unlocks the 'Town Recall' ability to open a portal back to the Town of Beginnings."
                        ]
                    }
                }
            }
        },
        tactical: {
            "blood_harvest": { 
                name: "Blood Harvest", icon: "🩸", desc: "A vicious shadowy dagger strike that inflicts Bleed.", cooldownTime: 4.0, color: "#aa0000", 
                upgrades: { 
                    "sanguine_feast": { 
                        name: "Sanguine Feast", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Heals you for 50% of the initial damage dealt.",
                            "Bronze Rank: If the target dies while bleeding, the affliction jumps to 2 nearby enemies.",
                            "Silver Rank: [EVOLUTION] Consumes all Bleed stacks on the target to deal massive instant Execution damage."
                        ]
                    } 
                } 
            },
            "umbral_snare": {
                name: "Umbral Snare",
                icon: "🕸️",
                color: "#7700cc",
                desc: "Trap. Place a hidden shadow rune on the ground (lasts 60s). Triggers when an enemy walks over it, rooting them for 3 seconds.",
                cooldownTime: 12.0,
                upgrades: {
                    "abyssal_binding": {
                        name: "Abyssal Binding",
                        maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Trapped enemies are afflicted with Necrosis (DoT).",
                            "Bronze Rank: When triggered, violent gravity pulls all enemies within 8 units into the center of the trap.",
                            "Silver Rank: [EVOLUTION] The trap explodes into a blinding cloud, silencing all pulled enemies for 4 seconds."
                        ]
                    }
                }
            },
            "veil_of_shadows": {
                name: "Veil of Shadows",
                icon: "🥷",
                color: "#222244",
                desc: "Drop aggro and fade into absolute invisibility for 5 seconds. Movement speed is heavily increased.",
                cooldownTime: 15.0,
                upgrades: {
                    "phantom_assassin": {
                        name: "Phantom Assassin",
                        maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Your first attack out of stealth deals 50% bonus damage.",
                            "Bronze Rank: Passively regenerate 5% of your Max HP per second while stealthed.",
                            "Silver Rank: [EVOLUTION] Leaving stealth unleashes a burst of shadowy blades, dealing damage and silencing enemies within 6 units."
                        ]
                    }
                }
            }
        },
        aoe: {
            "feast_of_absolution": { 
                name: "Feast of Absolution", icon: "🦇", desc: "Release a swarm of shadowy leeches that drain nearby enemies.", cooldownTime: 8.0, color: "#8800ff", 
                upgrades: { 
                    "creeping_doom": { 
                        name: "Creeping Doom", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Applies Necrosis to all enemies hit, reducing their speed and dealing damage over time.",
                            "Bronze Rank: The swarm lingers in the area for 4 seconds, continually biting enemies inside.",
                            "Silver Rank: [EVOLUTION] Enemies that die to the swarm violently explode into a burst of healing blood for you."
                        ]
                    } 
                } 
            },
            "void_eruption": { 
                name: "Void Eruption", icon: "🌋", desc: "A massive explosion of dark energy from the earth.", cooldownTime: 12.0, color: "#330066", 
                upgrades: { 
                    "abyssal_cataclysm": { 
                        name: "Abyssal Cataclysm", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Enemies hit are violently afflicted with Necrosis.",
                            "Bronze Rank: Creates a gravitational pull, dragging enemies to the center before exploding.",
                            "Silver Rank: [EVOLUTION] The eruption tears a Dark Singularity that lingers for 3 seconds, constantly Silencing enemies caught inside."
                        ]
                    } 
                } 
            }
        },
        ultimate: {
            "avatar_of_doom": { 
                name: "Avatar of Doom", icon: "👁️", desc: "Summon a massive executioner's scythe to cleave the battlefield.", cooldownTime: 30.0, color: "#111111", 
                upgrades: { 
                    "gaze_of_the_abyss": { 
                        name: "Gaze of the Abyss", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Damage increases by 15% for every Affliction (Bleed/Necrosis) on the target.",
                            "Bronze Rank: Silences all surviving enemies for 3 seconds, canceling active telegraphs.",
                            "Silver Rank: [EVOLUTION] Tears a rift that summons a Doom Familiar. It floats behind you and shoots eye-beams at afflicted enemies for 10s."
                        ]
                    } 
                } 
            },
            "nightfall": { 
                name: "Nightfall", icon: "🌘", desc: "Plunge the area into absolute darkness, becoming untargetable and unleashing a flurry of rapid shadow strikes.", cooldownTime: 40.0, color: "#220044", 
                upgrades: { 
                    "blade_of_the_eclipse": { 
                        name: "Blade of the Eclipse", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Heals you for 20% of the total damage dealt by the strikes.",
                            "Bronze Rank: Enemies caught in the darkness are heavily staggered, stunning them for 3 seconds.",
                            "Silver Rank: [EVOLUTION] Ruthless execution. Any enemy caught in the darkness with less than 30% HP is instantly killed."
                        ]
                    } 
                } 
            }
        }
    },
    light: {
        mobility: {
            "radiant_dash": { 
                name: "Radiant Dash", icon: "🛡️", desc: "Dash forward, passing harmlessly through enemies.", cooldownTime: 6.0, color: "#ffaa00", 
                upgrades: {
                    "blinding_trail": {
                        name: "Blinding Trail", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Leaves a trail of light that grants allies +20% movement speed when they walk on it.",
                            "Bronze Rank: Enemies caught in the trail are Blinded for 1.5 seconds.",
                            "Silver Rank: [EVOLUTION] The dash becomes a teleport of pure light, instantly healing any allies you phase through."
                        ]
                    }
                } 
            },
            "wings_of_dawn": { 
                name: "Wings of Dawn", icon: "🕊️", desc: "Leap into the air, evading all ground Area of Effect damage.", cooldownTime: 8.0, color: "#ffcc00", 
                upgrades: {
                    "solar_flare": {
                        name: "Solar Flare", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Deals minor holy damage to enemies when you take off and land.",
                            "Bronze Rank: Grants brief crowd-control immunity while in the air.",
                            "Silver Rank: [EVOLUTION] Landing unleashes a blinding solar flare, stunning all enemies in a 6-unit radius."
                        ]
                    }
                } 
            }
        },
        tactical: {
            "divine_smite": { 
                name: "Divine Smite", icon: "⚡", desc: "Strike a single enemy with pure holy energy.", cooldownTime: 4.0, color: "#ffffaa", 
                upgrades: {
                    "chain_lightning": {
                        name: "Chain Lightning", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: The smite arcs to 2 additional nearby enemies for 50% damage.",
                            "Bronze Rank: Arcs prioritize the lowest-health enemies and execute them if below 10% health.",
                            "Silver Rank: [EVOLUTION] Lightning leaves a static charge on targets; attacking them detonates it for holy AoE damage."
                        ]
                    }
                } 
            },
            "blinding_flare": { 
                name: "Blinding Flare", icon: "☀️", desc: "Release a flash that stuns a target for 3 seconds.", cooldownTime: 10.0, color: "#ffee88", 
                upgrades: {
                    "searing_light": {
                        name: "Searing Light", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Strips all magical buffs from the stunned target.",
                            "Bronze Rank: Reduces the target's damage output by 30% for 5 seconds after the stun wears off.",
                            "Silver Rank: [EVOLUTION] Flare permanently sears armor, increasing all physical damage taken by 20%."
                        ]
                    }
                } 
            }
        },
        aoe: {
            "aura_of_purity": { 
                name: "Aura of Purity", icon: "✨", desc: "Heal yourself and damage nearby enemies.", cooldownTime: 10.0, color: "#ffdd00", 
                upgrades: {
                    "cleansing_fire": {
                        name: "Cleansing Fire", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Automatically cleanses one negative status effect from allies every 3 seconds.",
                            "Bronze Rank: Enemies inside the aura have their healing received reduced by 50%.",
                            "Silver Rank: [EVOLUTION] When aura expires, it detonates, healing allies based on damage mitigated."
                        ]
                    }
                } 
            },
            "holy_nova": { 
                name: "Holy Nova", icon: "🌟", desc: "Expand a ring of light that pushes enemies away.", cooldownTime: 12.0, color: "#ffff00", 
                upgrades: {
                    "repelling_force": {
                        name: "Repelling Force", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: The knockback distance is doubled.",
                            "Bronze Rank: Enemies knocked into walls or solid obstacles are stunned for 2 seconds.",
                            "Silver Rank: [EVOLUTION] Leaves a lingering ring of holy fire that damages enemies crossing it."
                        ]
                    }
                } 
            },
            "consecrated_ground": { 
                name: "Consecrated Ground", icon: "💮", desc: "Sanctify the earth beneath you, burning enemies and empowering allies for 6 seconds.", cooldownTime: 15.0, color: "#ffffcc", 
                upgrades: { 
                    "hallowed_domain": { 
                        name: "Hallowed Domain", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Allies standing in the zone gain +20% movement speed.",
                            "Bronze Rank: Undead and Shadow enemies take double damage from the holy flames.",
                            "Silver Rank: [EVOLUTION] The zone becomes a true Sanctuary. Allies inside cannot be reduced below 1 HP."
                        ]
                    } 
                } 
            }
        },
        ultimate: {
            "grand_cross": { 
                name: "Grand Cross", icon: "✝️", desc: "Summon a massive cross of light to smite an entire zone.", cooldownTime: 30.0, color: "#ffffff", 
                upgrades: {
                    "divine_execution": {
                        name: "Divine Execution", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Heals all allies standing inside the cross for a massive amount.",
                            "Bronze Rank: Enemies killed by the cross turn into pillars of salt (physical obstacles).",
                            "Silver Rank: [EVOLUTION] The cross persists for 8 seconds, continually firing beams of light."
                        ]
                    }
                } 
            },
            "heavenly_judgment": { 
                name: "Heavenly Judgment", icon: "⚖️", desc: "Call down a massive pillar of light that persists for 10 seconds.", cooldownTime: 40.0, color: "#ffffee", 
                upgrades: {
                    "orbital_strike": {
                        name: "Orbital Strike", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: The pillar slowly tracks the nearest enemy.",
                            "Bronze Rank: Beam grows 20% wider and deals 20% more damage every second it strikes a target.",
                            "Silver Rank: [EVOLUTION] The pillar splits into four smaller pillars that autonomously hunt separate targets."
                        ]
                    }
                } 
            }
        }
    },
    berserker: {
        mobility: {
            "bull_rush": { 
                name: "Bull Rush", icon: "🐗", desc: "Charge forward, knocking back any enemies in your path.", cooldownTime: 6.0, color: "#cc0000", 
                upgrades: {
                    "unstoppable_force": {
                        name: "Unstoppable Force", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: You are immune to all crowd control while charging.",
                            "Bronze Rank: Leaves a trail of fire in your wake that burns enemies.",
                            "Silver Rank: [EVOLUTION] Colliding with a wall creates a shockwave that knocks down all nearby enemies."
                        ]
                    }
                } 
            },
            "heroic_leap": { 
                name: "Heroic Leap", icon: "🦘", desc: "Jump to a target location, crashing down heavily.", cooldownTime: 8.0, color: "#dd2222", 
                upgrades: {
                    "crater_impact": {
                        name: "Crater Impact", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: The impact destroys enemy armor, reducing defense by 10%.",
                            "Bronze Rank: Pull enemies slightly toward the center of the impact zone.",
                            "Silver Rank: [EVOLUTION] Ground shatters, leaving a permanent crater that slows enemies walking through it."
                        ]
                    }
                } 
            }
        },
        tactical: {
            "sunder": { 
                name: "Sunder", icon: "🪓", desc: "A heavy strike that causes severe bleeding over time.", cooldownTime: 3.0, color: "#ff4444", 
                upgrades: {
                    "deep_wounds": {
                        name: "Deep Wounds", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: The bleed effect stacks up to 3 times on a single target.",
                            "Bronze Rank: Hitting a bleeding target restores a small amount of Health Points.",
                            "Silver Rank: [EVOLUTION] At 3 stacks, targets hemorrhage for burst damage based on Max HP."
                        ]
                    }
                } 
            },
            "intimidating_shout": { 
                name: "Intimidating Shout", icon: "🗣️", desc: "Reduce the damage of all enemies in front of you.", cooldownTime: 12.0, color: "#bb0000", 
                upgrades: {
                    "shattering_roar": {
                        name: "Shattering Roar", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Also reduces enemy movement speed by 40%.",
                            "Bronze Rank: Allies in the cone gain an Attack Speed buff.",
                            "Silver Rank: [EVOLUTION] Physical force that instantly destroys enemy shields and barriers."
                        ]
                    }
                } 
            }
        },
        aoe: {
            "seismic_slam": { 
                name: "Seismic Slam", icon: "💥", desc: "Slam the ground, dealing Area of Effect physical damage.", cooldownTime: 8.0, color: "#ffaa00", 
                upgrades: {
                    "aftershock": {
                        name: "Aftershock", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: A second, smaller tremor hits 1 second after the initial slam.",
                            "Bronze Rank: Enemies hit by both the slam and the aftershock are stunned.",
                            "Silver Rank: [EVOLUTION] Pillars of jagged earth erupt from the ground, blocking enemy movement."
                        ]
                    }
                } 
            },
            "whirlwind": { 
                name: "Whirlwind", icon: "🌪️", desc: "Spin rapidly, damaging all nearby enemies repeatedly.", cooldownTime: 10.0, color: "#ff6600", 
                upgrades: {
                    "cyclone_pull": {
                        name: "Cyclone Pull", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: You can move at 150% speed while channeling Whirlwind.",
                            "Bronze Rank: Continuously pulls enemies toward your weapon.",
                            "Silver Rank: [EVOLUTION] Generates a wind barrier, reflecting all incoming projectiles."
                        ]
                    }
                } 
            },
            "devastating_cleave": { 
                name: "Devastating Cleave", icon: "🌪️", desc: "A massive 360-degree swing that decimates surrounding enemies.", cooldownTime: 8.0, color: "#cc0000", 
                upgrades: { 
                    "reapers_toll": { 
                        name: "Reaper's Toll", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Inflicts 2 stacks of deep Bleed on all enemies hit.",
                            "Bronze Rank: The cooldown is instantly reset if this ability kills an enemy.",
                            "Silver Rank: [EVOLUTION] The swing fires a circular shockwave of blood outward, doubling the AoE radius."
                        ]
                    } 
                } 
            }
        },
        ultimate: {
            "meteor_strike": { 
                name: "Meteor Strike", icon: "☄️", desc: "Crash down from above like a meteor, decimating the area.", cooldownTime: 30.0, color: "#ff0000", 
                upgrades: {
                    "extinction_event": {
                        name: "Extinction Event", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: The radius of the explosion increases by 50%.",
                            "Bronze Rank: Enemies in the center of the impact take triple damage.",
                            "Silver Rank: [EVOLUTION] Leaves a pool of molten magma that deals massive damage over time."
                        ]
                    }
                } 
            },
            "wrath_of_the_berserker": { 
                name: "Wrath of the Berserker", icon: "🔥", desc: "Increase all stats and movement speed massively for 15 seconds.", cooldownTime: 45.0, color: "#ff3300", 
                upgrades: {
                    "undying_rage": {
                        name: "Undying Rage", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Every kill extends the duration of the Wrath by 2 seconds.",
                            "Bronze Rank: You are immune to all crowd control while active.",
                            "Silver Rank: [EVOLUTION] Cannot be killed while active. Restore to 25% HP when effect ends."
                        ]
                    }
                } 
            }
        }
    },
    nature: {
        mobility: {
            "spirit_animal": { 
                name: "Spirit Animal", icon: "🐺", desc: "Transform into a swift spirit wolf for 5 seconds, gaining massive movement speed and ignoring collision.", cooldownTime: 8.0, color: "#22cc44", 
                upgrades: { 
                    "pack_leader": { 
                        name: "Pack Leader", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Nearby allies also gain a 20% movement speed boost.",
                            "Bronze Rank: Dashing through enemies inflicts Bleed and slows them.",
                            "Silver Rank: [EVOLUTION] Exiting the form unleashes a feral howl, fearing nearby enemies for 2 seconds."
                        ]
                    } 
                } 
            }
        },
        tactical: {
            "earth_spike": { 
                name: "Earth Spike", icon: "🏔️", desc: "Command the earth to erupt under a target, dealing physical damage and rooting them.", cooldownTime: 5.0, color: "#885522", 
                upgrades: { 
                    "jagged_stone": { 
                        name: "Jagged Stone", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Leaves behind a jagged rock that slows enemies who walk near it.",
                            "Bronze Rank: Hitting an enemy grants you a temporary stone shield absorbing 50 damage.",
                            "Silver Rank: [EVOLUTION] The spike shatters on impact, sending piercing shrapnel to hit up to 3 additional nearby enemies."
                        ]
                    } 
                } 
            }
        },
        aoe: {
            "healing_blossom": { 
                name: "Healing Blossom", icon: "🌸", desc: "Grow a radiant magical flower that pulses healing to all nearby allies over 6 seconds.", cooldownTime: 12.0, color: "#ff66cc", 
                upgrades: { 
                    "natures_bounty": { 
                        name: "Nature's Bounty", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Cleanses one negative status effect from allies upon sprouting.",
                            "Bronze Rank: Emits toxic spores that Poison enemies inside the radius.",
                            "Silver Rank: [EVOLUTION] When the blossom expires, it leaves behind a fruit that instantly restores 30% Max HP to whoever picks it up."
                        ]
                    } 
                } 
            }
        },
        ultimate: {
            "wrath_of_the_forest": { 
                name: "Wrath of the Forest", icon: "🌳", desc: "Summon massive roots over a huge area, rooting enemies and constantly draining their health to heal your team.", cooldownTime: 40.0, color: "#00aa22", 
                upgrades: {
                    "world_tree": {
                        name: "World Tree", maxRank: 3,
                        rankDescs: [
                            "Iron Rank: Damage dealt by the roots bypasses 50% of enemy armor.",
                            "Bronze Rank: Revives any fallen allies within the roots' radius with 20% HP.",
                            "Silver Rank: [EVOLUTION] Transforms the center of the area into a World Tree Sapling that persists, providing a permanent defensive aura until destroyed."
                        ]
                    }
                } 
            }
        }
    }
};

export const UTILITY_TREE_DATA: Record<string, Record<string, Record<string, any>>> = {
    wayfinder: {
        core: {
            "wayfinder_base": {
                name: "Wayfinder Core", icon: "🧭", desc: "Enhance your map, navigation, and spatial awareness systems.", cooldownTime: 0.0, color: "#00aaff",
                upgrades: {
                    "core_progression": {
                        name: "Core Navigation", maxRank: 5,
                        rankDescs: [
                            "Tier 1 (Mini Map): [Passive] Displays nearby area. Fog of war enabled.",
                            "Tier 2 (Expanded Map): [Passive] Increased radius + Points of Interest.",
                            "Tier 3 (World Map): [Active] Access full region map with exploration tracking.",
                            "Tier 4 (Custom Markers): [Active] Store custom coordinates and icon types on the map.",
                            "Tier 5 (Route Guidance): [Active] Generates a pathfinding line to a selected marker."
                        ]
                    }
                }
            }
        },
        branches: {
            "explorer_branch": {
                name: "Explorer", icon: "🌍", desc: "Discovery System: Master the art of uncovering the hidden world.", cooldownTime: 30.0, color: "#00ffaa",
                upgrades: {
                    "branch_progression": {
                        name: "World Discovery", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Hidden Path Reveal): [Passive] Automatically highlight hidden objects in a radius.",
                            "Tier 7 (Secret Scan): [Active] Pulse reveals hidden areas with a temporary visibility overlay.",
                            "Tier 8 (Resource Mapping): [Passive] Resource nodes permanently appear on your map layer.",
                            "Tier 9 (Domain Scan): [Active] Reveal all POIs in the current region chunk.",
                            "Tier 10 (Omniscient Survey): [Active] Permanently removes fog of war and shows all secrets in the region."
                        ]
                    }
                }
            },
            "tactical_branch": {
                name: "Tactical", icon: "⚔️", desc: "Combat Intelligence System: Total battlefield awareness.", cooldownTime: 0.0, color: "#ff4444",
                upgrades: {
                    "branch_progression": {
                        name: "Combat Intel", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Enemy Tracking): [Passive] Enemies appear on the minimap.",
                            "Tier 7 (Threat Zones): [Passive] Color-coded danger heatmap overlay based on enemy density/level.",
                            "Tier 8 (Boss Locator): [Passive] Unique icons mark Elite/Boss enemies from afar.",
                            "Tier 9 (Ambush Warning): [Passive] UI alert and sound cue triggers when an off-screen enemy attacks.",
                            "Tier 10 (Battlefield Awareness): [Passive] Live combat overlay tracking real-time enemy positioning and attack directions."
                        ]
                    }
                }
            },
            "traveler_branch": {
                name: "Traveler", icon: "🌀", desc: "Teleportation System: Bend space to traverse the world instantly.", cooldownTime: 120.0, color: "#aa44ff",
                upgrades: {
                    "branch_progression": {
                        name: "Spatial Traversal", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Fast Travel Nodes): [Active] Teleport between discovered fast-travel nodes via the map.",
                            "Tier 7 (Recall Beacon): [Active] Place a physical beacon in the world and teleport back to it at will.",
                            "Tier 8 (Teleport Markers): [Active] Convert any custom map marker into a valid teleport destination.",
                            "Tier 9 (Portal Link): [Active] Permanently link two locations together with a stored node connection.",
                            "Tier 10 (Instant Relocation): [Active] Free-target teleport to any visible location (Range limited, High Cooldown)."
                        ]
                    }
                }
            }
        }
    },
    perception: {
        core: {
            "perception_base": {
                name: "Perception Core", icon: "👁️", desc: "Enhance information visibility and entity detection systems.", cooldownTime: 15.0, color: "#ff00ff",
                upgrades: {
                    "core_progression": {
                        name: "Core Senses", maxRank: 5,
                        rankDescs: [
                            "Tier 1 (Highlight Objects): [Passive] Interactable objects glow softly.",
                            "Tier 2 (Aura Sight): [Active] Reveal enemies through walls for a short duration.",
                            "Tier 3 (Weakness Insight): [Passive] Visually highlights weak points on enemies.",
                            "Tier 4 (Loot Highlight): [Passive] Dropped loot glows brightly.",
                            "Tier 5 (Scan Pulse): [Active] Release a massive pulse revealing all nearby entities."
                        ]
                    }
                }
            }
        },
        branches: {
            "hunter_branch": {
                name: "Hunter", icon: "🎯", desc: "Combat Prediction: Read your enemies before they strike.", cooldownTime: 0.0, color: "#ff5500",
                upgrades: {
                    "branch_progression": {
                        name: "Predatory Instincts", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Movement Trails): [Passive] Render past movement paths of moving targets.",
                            "Tier 7 (Stealth Reveal): [Passive] Automatically detect and highlight invisible enemies.",
                            "Tier 8 (Critical Windows): [Passive] Highlight specific vulnerability frames during enemy attacks.",
                            "Tier 9 (Predictive Marker): [Passive] Renders a ghost marker showing an enemy's future position.",
                            "Tier 10 (True Sight): [Passive] Ignore all enemy concealment, illusions, and line-of-sight blockers."
                        ]
                    }
                }
            },
            "treasure_branch": {
                name: "Treasure", icon: "💰", desc: "Loot System: Maximize your economic and item gains.", cooldownTime: 0.0, color: "#ffd700",
                upgrades: {
                    "branch_progression": {
                        name: "Treasure Hunter", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Rare Ping): [Passive] Audio/Visual notification when rare loot is nearby.",
                            "Tier 7 (Hidden Loot): [Passive] Reveal buried caches and invisible chests.",
                            "Tier 8 (Rarity Colors): [Passive] Loot models are color-coded in the world based on rarity.",
                            "Tier 9 (Legendary Sense): [Passive] Detect high-tier (Gold/Diamond) items through solid walls.",
                            "Tier 10 (Drop Prediction): [Passive] View the exact loot drop table and chances above an enemy's head before killing them."
                        ]
                    }
                }
            },
            "arcane_branch": {
                name: "Arcane", icon: "🔮", desc: "Environment System: See the magical threads holding the world together.", cooldownTime: 45.0, color: "#8800ff",
                upgrades: {
                    "branch_progression": {
                        name: "Arcane Vision", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Magic Detection): [Passive] Highlight magical objects, wards, and spells.",
                            "Tier 7 (Trap Vision): [Passive] Clearly outlines the hitboxes of all traps.",
                            "Tier 8 (Illusion Break): [Passive] Reveal fake terrain and dispel visual illusions.",
                            "Tier 9 (Energy Mapping): [Passive] Show system connections (e.g., wires connecting a lever to a door).",
                            "Tier 10 (Reality Layer): [Active] Shift your vision to reveal a hidden dimensional layer of the world."
                        ]
                    }
                }
            }
        }
    },
    tinkerer: {
        core: {
            "tinkerer_base": {
                name: "Tinkerer Core", icon: "🧰", desc: "Control devices, traps, and environmental tools.", cooldownTime: 5.0, color: "#ff8800",
                upgrades: {
                    "core_progression": {
                        name: "Core Engineering", maxRank: 5,
                        rankDescs: [
                            "Tier 1 (Fast Interaction): [Passive] 50% faster use/interaction speed with the world.",
                            "Tier 2 (Basic Traps): [Active] Deploy a basic trap entity.",
                            "Tier 3 (Devices): [Active] Deploy simple automated machines (e.g., decoys).",
                            "Tier 4 (Efficiency): [Passive] Reduced material cost for crafting and deploying.",
                            "Tier 5 (Multi Deploy): [Passive] Allows multiple active devices to be deployed simultaneously."
                        ]
                    }
                }
            }
        },
        branches: {
            "engineer_branch": {
                name: "Engineer", icon: "🏗️", desc: "Construct System: Build automated defenses and assistants.", cooldownTime: 25.0, color: "#aaaaaa",
                upgrades: {
                    "branch_progression": {
                        name: "Heavy Constructs", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Turret): [Active] Deploy an auto-targeting defensive unit.",
                            "Tier 7 (Shield Dome): [Active] Deploy a generator that projects a large area-protection shield.",
                            "Tier 8 (Drone): [Active] Deploy a floating AI assistant that follows and helps you.",
                            "Tier 9 (Linked Grid): [Passive] Deployed devices share power, buffing each other when placed nearby.",
                            "Tier 10 (Mobile Base): [Active] Deploy a massive, slowly moving structure with heavy utility."
                        ]
                    }
                }
            },
            "saboteur_branch": {
                name: "Saboteur", icon: "💣", desc: "Disruption System: Control the battlefield through destruction.", cooldownTime: 15.0, color: "#ff2222",
                upgrades: {
                    "branch_progression": {
                        name: "Demolitions", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Remote Trigger): [Active] Detonate traps manually from a distance.",
                            "Tier 7 (Chain Reaction): [Passive] Explosions spread to nearby traps or volatile environment objects.",
                            "Tier 8 (Disable): [Active] Shoot a scrambler that shuts down enemy technology/magic.",
                            "Tier 9 (Hazard Control): [Active] Convert regular terrain into hazardous traps.",
                            "Tier 10 (Shutdown Field): [Active] Drop an EMP field that disables all enemy systems and abilities."
                        ]
                    }
                }
            }
        }
    },
    mobility: {
        core: {
            "mobility_base": {
                name: "Mobility Core", icon: "🌀", desc: "Enhance movement physics and traversal mechanics.", cooldownTime: 4.0, color: "#ffffff",
                upgrades: {
                    "core_progression": {
                        name: "Core Athletics", maxRank: 5,
                        rankDescs: [
                            "Tier 1 (Speed Boost): [Passive] Base movement speed increased by 15%.",
                            "Tier 2 (Dash): [Active] Perform a quick directional dash.",
                            "Tier 3 (Climb): [Passive] Unlocks the ability to climb vertical surfaces.",
                            "Tier 4 (Double Jump): [Active] Perform a second jump while in mid-air.",
                            "Tier 5 (Air Control): [Passive] Drastically improves directional steering while jumping or falling."
                        ]
                    }
                }
            }
        },
        branches: {
            "speed_branch": {
                name: "Speed", icon: "⚡", desc: "Momentum System: Move faster than the eye can see.", cooldownTime: 8.0, color: "#ffff00",
                upgrades: {
                    "branch_progression": {
                        name: "Velocity", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Blink): [Active] Teleport a short distance instantly in your facing direction.",
                            "Tier 7 (Momentum): [Passive] Your speed continuously scales up the longer you run without stopping.",
                            "Tier 8 (Time Slow): [Active] Slow down the world around you while maintaining your normal speed.",
                            "Tier 9 (Afterimage): [Passive] Dashing leaves behind a decoy that absorbs one instance of damage.",
                            "Tier 10 (Burst): [Active] A high-speed, long-distance dash that heavily damages anything you pass through."
                        ]
                    }
                }
            },
            "traversal_branch": {
                name: "Traversal", icon: "🧗", desc: "Parkour System: Ignore standard geographical limitations.", cooldownTime: 5.0, color: "#aaddff",
                upgrades: {
                    "branch_progression": {
                        name: "Acrobatics", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Grapple): [Active] Fire a hook system to pull yourself to walls or enemies.",
                            "Tier 7 (Wall Run): [Passive] Move horizontally across vertical surfaces without falling.",
                            "Tier 8 (Glide): [Active] Deploy a glider to maintain altitude while moving through the air.",
                            "Tier 9 (Ignore Terrain): [Passive] Walking through mud, water, or thick brush no longer causes slowdown.",
                            "Tier 10 (Flight): [Active] Gain full movement freedom on the Y-axis for 10 seconds."
                        ]
                    }
                }
            },
            "escape_branch": {
                name: "Escape", icon: "🫥", desc: "Evasion System: Slip away from deadly encounters.", cooldownTime: 20.0, color: "#8888aa",
                upgrades: {
                    "branch_progression": {
                        name: "Elusiveness", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Smoke): [Active] Drop a smoke bomb that breaks enemy targeting locks.",
                            "Tier 7 (Phase): [Active] Briefly turn ethereal, passing harmlessly through enemies and projectiles.",
                            "Tier 8 (Invulnerable): [Passive] Taking fatal damage instead grants a 2-second invulnerability window (Long Cooldown).",
                            "Tier 9 (Shadow Step): [Active] Teleport directly behind your current locked target.",
                            "Tier 10 (Exit Combat): [Active] Force an immediate disengage, wiping all aggro and resetting enemy states."
                        ]
                    }
                }
            }
        }
    },
    agrarian: {
        core: {
            "agrarian_base": {
                name: "Agrarian Core", icon: "🌾", desc: "Master the earth to control crop growth and foraging yields.", cooldownTime: 5.0, color: "#33aa33",
                upgrades: {
                    "core_progression": {
                        name: "Core Farming", maxRank: 5,
                        rankDescs: [
                            "Tier 1 (Green Thumb): [Passive] Gather wild plants and wood 50% faster.",
                            "Tier 2 (Sower): [Active] Unlocks the ability to plant seeds in claimed land.",
                            "Tier 3 (Seed Recovery): [Passive] Harvesting crops guarantees a seed is returned.",
                            "Tier 4 (Cross-Pollination): [Active] Combine different seeds to grow hybrid or rare crops.",
                            "Tier 5 (Nature's Rhythm): [Passive] Radiate an aura that accelerates crop growth around you."
                        ]
                    }
                }
            }
        },
        branches: {
            "harvester_branch": {
                name: "Harvester", icon: "🌿", desc: "Foraging System: Plunder the wild for rare organic materials.", cooldownTime: 0.0, color: "#55cc55",
                upgrades: {
                    "branch_progression": {
                        name: "Wild Gathering", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Bountiful Forage): [Passive] Higher chance for rare drops from trees and bushes.",
                            "Tier 7 (Herb Tracking): [Passive] Rare herbs permanently appear on your minimap.",
                            "Tier 8 (Double Yield): [Passive] Gathering in the wild yields twice as many materials.",
                            "Tier 9 (Hidden Groves): [Passive] Reveal hidden nature grottos on the world map.",
                            "Tier 10 (Auto-Harvest Aura): [Passive] Automatically collect nearby wild forageables as you walk."
                        ]
                    }
                }
            },
            "cultivator_branch": {
                name: "Cultivator", icon: "🚜", desc: "Domestic Farming System: Automate and maximize crop production.", cooldownTime: 0.0, color: "#aaff00",
                upgrades: {
                    "branch_progression": {
                        name: "Agriculture", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Automated Sprinklers): [Active] Craft and deploy sprinklers to water adjacent tiles.",
                            "Tier 7 (Giant Crops): [Passive] Planting 3x3 grids of identical seeds merges them into massive, high-yield crops.",
                            "Tier 8 (Disease Immunity): [Passive] Your crops can no longer decay or catch blight.",
                            "Tier 9 (Instant Fertilizer): [Active] Apply specialized compost that forces immediate crop maturation.",
                            "Tier 10 (Bountiful Harvest): [Passive] Base farm yields are permanently tripled."
                        ]
                    }
                }
            },
            "ranger_branch": {
                name: "Ranger", icon: "🏹", desc: "Flora Combat System: Weaponize your crops against enemies.", cooldownTime: 12.0, color: "#228822",
                upgrades: {
                    "branch_progression": {
                        name: "Wild Combat", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Spore Pods): [Active] Throw an explosive mushroom that poisons enemies.",
                            "Tier 7 (Tangleweeds): [Active] Summon grasping vines to root enemies in place.",
                            "Tier 8 (Raw Consumption): [Active] Eat raw crops instantly for massive burst healing.",
                            "Tier 9 (Briar Trap): [Active] Place permanent thorny traps that bleed enemies.",
                            "Tier 10 (Summon Treant): [Active] Awaken a massive tree to fight alongside you for 30 seconds."
                        ]
                    }
                }
            }
        }
    },
    forgemaster: {
        core: {
            "forgemaster_base": {
                name: "Forgemaster Core", icon: "⚒️", desc: "Master metalwork to enhance weapons, armor, and mining.", cooldownTime: 0.0, color: "#888888",
                upgrades: {
                    "core_progression": {
                        name: "Core Smithing", maxRank: 5,
                        rankDescs: [
                            "Tier 1 (Miner's Eye): [Passive] Double ore yields from mining rocks.",
                            "Tier 2 (Basic Repair): [Active] Repair equipped items using raw materials anywhere in the field.",
                            "Tier 3 (Smelting Efficiency): [Passive] Refine ores into ingots instantly with no failure rate.",
                            "Tier 4 (Tempering): [Active] Temporarily buff a weapon's damage by sharpening it.",
                            "Tier 5 (Masterwork): [Passive] Crafting any item has a 10% chance to roll an extra stat line."
                        ]
                    }
                }
            }
        },
        branches: {
            "armorer_branch": {
                name: "Armorer", icon: "🛡️", desc: "Defense System: Craft impenetrable barriers.", cooldownTime: 30.0, color: "#aaaacc",
                upgrades: {
                    "branch_progression": {
                        name: "Heavy Plating", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Heavy Plating): [Passive] Craft armor that grants immunity to knockbacks.",
                            "Tier 7 (Shield Block): [Passive] Upgrade shield block values permanently.",
                            "Tier 8 (Reinforced Walls): [Passive] Town structures you build have triple health.",
                            "Tier 9 (Heavy Armor Master): [Passive] Removes the movement speed penalty from heavy armor.",
                            "Tier 10 (Invulnerable Plating): [Active] Briefly render your armor completely impenetrable."
                        ]
                    }
                }
            },
            "weaponsmith_branch": {
                name: "Weaponsmith", icon: "⚔️", desc: "Offense System: Forge lethal instruments of war.", cooldownTime: 0.0, color: "#ff6666",
                upgrades: {
                    "branch_progression": {
                        name: "Lethal Edges", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Honed Edge): [Passive] Weapons you craft have +10% Critical Strike Chance.",
                            "Tier 7 (Elemental Coat): [Active] Coat your weapon in fire or ice for elemental damage.",
                            "Tier 8 (Armor Piercer): [Passive] Your crafted weapons ignore 25% of enemy armor.",
                            "Tier 9 (Bleeding Edge): [Passive] Your crafted weapons apply permanent Bleed stacks.",
                            "Tier 10 (Forged Relic): [Passive] Crafting weapons guarantees a high-tier stat roll."
                        ]
                    }
                }
            },
            "scrapper_branch": {
                name: "Scrapper", icon: "♻️", desc: "Salvage System: Reduce the world to base materials.", cooldownTime: 0.0, color: "#cc9955",
                upgrades: {
                    "branch_progression": {
                        name: "Recycling", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Deconstruct): [Active] Break down old weapons and armor into raw materials.",
                            "Tier 7 (Salvage): [Passive] Chance to salvage rare ingots from defeated mechanical enemies.",
                            "Tier 8 (Free Repair): [Passive] Your equipment repairs itself slowly over time.",
                            "Tier 9 (Recycled Traps): [Passive] Pick up and reuse traps placed by other players or enemies.",
                            "Tier 10 (Jury-Rigged Mech): [Active] Assemble a temporary, rideable combat suit from scrap."
                        ]
                    }
                }
            }
        }
    },
    artisan: {
        core: {
            "artisan_base": {
                name: "Artisan Core", icon: "🧵", desc: "Manipulate trade, inventory, and non-combat wearable stats.", cooldownTime: 0.0, color: "#ff88ff",
                upgrades: {
                    "core_progression": {
                        name: "Core Tailoring", maxRank: 5,
                        rankDescs: [
                            "Tier 1 (Expanded Pockets): [Passive] Unlocks 10 extra inventory slots.",
                            "Tier 2 (Lightweight Weave): [Passive] Equipped armor no longer reduces stamina regeneration.",
                            "Tier 3 (Dyeing): [Active] Change the color of gear (certain colors subtly reduce enemy aggro).",
                            "Tier 4 (Haggler): [Passive] NPC shops sell for 10% less and buy for 10% more.",
                            "Tier 5 (Pocket Dimension): [Active] Access your town storage chest remotely from the wilderness."
                        ]
                    }
                }
            }
        },
        branches: {
            "merchant_branch": {
                name: "Merchant", icon: "⚖️", desc: "Trade System: Control the flow of coins across the server.", cooldownTime: 0.0, color: "#ffcc00",
                upgrades: {
                    "branch_progression": {
                        name: "Commerce", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Player Shop): [Passive] Set up automated player-shops that don't charge tax.",
                            "Tier 7 (Market History): [Active] See server-wide price histories for specific items.",
                            "Tier 8 (NPC Hire): [Active] Hire an NPC to sell your goods while you are offline.",
                            "Tier 9 (Global Trade): [Passive] Sell items globally from any location.",
                            "Tier 10 (Monopoly): [Passive] Receive a percentage of all NPC shop transactions in your region."
                        ]
                    }
                }
            },
            "shadow_weaver_branch": {
                name: "Shadow-Weaver", icon: "🥷", desc: "Stealth Fabric System: Become the wind.", cooldownTime: 0.0, color: "#444466",
                upgrades: {
                    "branch_progression": {
                        name: "Invisibility", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Muffled Steps): [Passive] Craft boots that completely silence your footsteps.",
                            "Tier 7 (Still Concealment): [Passive] Craft cloaks that grant invisibility when standing perfectly still.",
                            "Tier 8 (Trap Immune): [Passive] Your woven fabrics no longer trigger pressure plates.",
                            "Tier 9 (Shadow Cloak): [Active] Activate a woven cloak to instantly drop all enemy aggro.",
                            "Tier 10 (Intangible Weave): [Passive] Ignore physical collision with non-boss enemies."
                        ]
                    }
                }
            },
            "enchanter_branch": {
                name: "Enchanter", icon: "✨", desc: "Magic Thread System: Sew power directly into garments.", cooldownTime: 0.0, color: "#ee88ff",
                upgrades: {
                    "branch_progression": {
                        name: "Magical Garments", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (HP Thread): [Passive] Sew magical threads into clothing to grant extra Max HP.",
                            "Tier 7 (MP Thread): [Passive] Sew magical threads to grant massive Mana regeneration.",
                            "Tier 8 (Resist Thread): [Passive] Grant immunity to specific elemental statuses (Fire/Ice/Poison).",
                            "Tier 9 (Reflect Thread): [Passive] Craft cloaks that passively reflect 20% of incoming damage.",
                            "Tier 10 (Soulbound Gear): [Passive] Craft items that can never be dropped on death."
                        ]
                    }
                }
            }
        }
    },
    publican: {
        core: {
            "publican_base": {
                name: "Publican Core", icon: "🍻", desc: "Control food, stamina regeneration, and social hub mechanics.", cooldownTime: 0.0, color: "#cc7722",
                upgrades: {
                    "core_progression": {
                        name: "Core Hospitality", maxRank: 5,
                        rankDescs: [
                            "Tier 1 (Iron Stomach): [Passive] Raw or uncooked food no longer causes sickness.",
                            "Tier 2 (Basic Cooking): [Active] Combine raw ingredients to make meals that restore massive Hunger/Stamina.",
                            "Tier 3 (Preservation): [Passive] Food in your inventory degrades and spoils 90% slower.",
                            "Tier 4 (Rested Buff): [Passive] Sleeping in a bed grants a 1-hour XP and damage buff.",
                            "Tier 5 (Tavern Hearth): [Passive] Standing idle in town passively regenerates health and mana for you and nearby allies."
                        ]
                    }
                }
            }
        },
        branches: {
            "brewmaster_branch": {
                name: "Brewmaster", icon: "🍺", desc: "Liquid Buff System: Brew potent, high-risk concoctions.", cooldownTime: 0.0, color: "#ddaa33",
                upgrades: {
                    "branch_progression": {
                        name: "Brewing", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Stat Brews): [Active] Craft drinks that give massive, short-term combat buffs (e.g., +50% attack speed).",
                            "Tier 7 (Speed Brews): [Active] Craft drinks that grant insane movement speed with a subsequent hangover debuff.",
                            "Tier 8 (Party Keg): [Active] Drop a keg that buffs the entire party simultaneously.",
                            "Tier 9 (Element Brew): [Active] Drink to gain total immunity to elemental damage for 30 seconds.",
                            "Tier 10 (Liquid Courage): [Passive] While under the effect of alcohol, you cannot be staggered or knocked down."
                        ]
                    }
                }
            },
            "chef_branch": {
                name: "Chef", icon: "🍲", desc: "Feast System: Craft meals that alter permanent state.", cooldownTime: 0.0, color: "#ff8855",
                upgrades: {
                    "branch_progression": {
                        name: "Culinary Arts", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Banquet): [Active] Lay out a feast that completely restores the party's vitals.",
                            "Tier 7 (Max HP Meal): [Passive] Craft high-tier meals that permanently increase a player's Max HP until they die.",
                            "Tier 8 (Max Stamina Meal): [Passive] Craft meals that permanently increase Max Stamina.",
                            "Tier 9 (Hero's Feast): [Active] Provide a meal granting 24-hour immunity to all debuffs.",
                            "Tier 10 (Ambrosia): [Active] Craft the food of the gods, granting instant leveling and max stats."
                        ]
                    }
                }
            },
            "information_broker_branch": {
                name: "Info Broker", icon: "📜", desc: "Social Economy System: Rule the rumor mill.", cooldownTime: 0.0, color: "#55bbff",
                upgrades: {
                    "branch_progression": {
                        name: "Networking", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Patrons): [Passive] Running a tavern attracts NPC Patrons who generate passive coin income.",
                            "Tier 7 (Boss Rumors): [Active] Pay Patrons to reveal active boss locations on your world map.",
                            "Tier 8 (Loot Rumors): [Active] Pay Patrons to reveal the location of legendary dropped items.",
                            "Tier 9 (Hidden Quests): [Passive] Access exclusive, highly lucrative quests from shady NPCs.",
                            "Tier 10 (Black Market): [Active] Access an exclusive shop selling illegal, overpowered server items."
                        ]
                    }
                }
            }
        }
    },
    architect: {
        core: {
            "architect_base": {
                name: "Architect Core", icon: "🏛️", desc: "Dominate town building, land ownership, and passive income.", cooldownTime: 0.0, color: "#aa88cc",
                upgrades: {
                    "core_progression": {
                        name: "Core Infrastructure", maxRank: 5,
                        rankDescs: [
                            "Tier 1 (Surveyor): [Passive] Buying land plots costs 25% less.",
                            "Tier 2 (Quick Build): [Passive] Contributing materials to a construction site fills the progress bar twice as fast.",
                            "Tier 3 (Resource Silo): [Passive] Buildings you own have a shared, massive resource storage pool.",
                            "Tier 4 (Sturdy Foundations): [Passive] Buildings you own have 2x maximum Health Points.",
                            "Tier 5 (Advanced Blueprints): [Passive] Unlocks the ability to build multi-story structures or specialized guild halls."
                        ]
                    }
                }
            }
        },
        branches: {
            "landlord_branch": {
                name: "Landlord", icon: "📜", desc: "Property System: Monetize the town's expansion.", cooldownTime: 0.0, color: "#ffd700",
                upgrades: {
                    "branch_progression": {
                        name: "Real Estate", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Tax Collection): [Passive] Passively collect property tax (coins) from players who buy land next to yours.",
                            "Tier 7 (Merge Plots): [Active] Merge adjacent owned plots into single, massive mega-plots.",
                            "Tier 8 (Eviction Notice): [Active] Forcefully buy out abandoned plots at half market value.",
                            "Tier 9 (Town Portal): [Active] Build permanent fast-travel nodes on your properties.",
                            "Tier 10 (Mayor Status): [Passive] Receive a percentage of all land sales in the server."
                        ]
                    }
                }
            },
            "fortifier_branch": {
                name: "Fortifier", icon: "🧱", desc: "Defense System: Turn the town into a fortress.", cooldownTime: 0.0, color: "#777777",
                upgrades: {
                    "branch_progression": {
                        name: "Strongholds", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Defense Tower): [Active] Build automated defense towers that shoot hostile mobs.",
                            "Tier 7 (Reinforced Gate): [Active] Build massive gates with 10x standard wall HP.",
                            "Tier 8 (Safe Zone Expansion): [Passive] Expand the PvP/PvE 'Safe Zone' radius to cover your properties.",
                            "Tier 9 (Artillery): [Active] Build long-range cannons to bombard field bosses from town.",
                            "Tier 10 (Impenetrable Fortress): [Passive] Your structures become entirely immune to siege damage."
                        ]
                    }
                }
            },
            "industrialist_branch": {
                name: "Industrialist", icon: "⚙️", desc: "Automation System: Let the machines do the work.", cooldownTime: 0.0, color: "#aaaaaa",
                upgrades: {
                    "branch_progression": {
                        name: "Industry", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Lumber Mill): [Active] Build a structure that automatically generates wood over time.",
                            "Tier 7 (Mine Shaft): [Active] Build a structure that automatically generates stone and ore.",
                            "Tier 8 (Conveyor Belt): [Active] Automatically move items from mills/mines directly into your storage.",
                            "Tier 9 (Auto-Crafter): [Active] Set a building to automatically craft base materials into complex items.",
                            "Tier 10 (Factory Complex): [Passive] All industrial buildings work 300% faster."
                        ]
                    }
                }
            }
        }
    },
    alchemist: {
        core: {
            "alchemist_base": {
                name: "Alchemist Core", icon: "🧪", desc: "Modify consumables, healing, and the transmutation of matter.", cooldownTime: 0.0, color: "#33ffaa",
                upgrades: {
                    "core_progression": {
                        name: "Core Alchemy", maxRank: 5,
                        rankDescs: [
                            "Tier 1 (Forager's Flask): [Active] Convert water and herbs into basic healing potions.",
                            "Tier 2 (Extended Duration): [Passive] Temporary potion buffs last twice as long.",
                            "Tier 3 (Toxicity Resistance): [Passive] Drink multiple potions back-to-back without suffering the 'Overdose' debuff.",
                            "Tier 4 (Equivalent Exchange): [Active] Transmute useless items (like dirt or bones) into base elements.",
                            "Tier 5 (Multi-Brew): [Passive] Every potion you craft yields two potions instead of one."
                        ]
                    }
                }
            }
        },
        branches: {
            "apothecary_branch": {
                name: "Apothecary", icon: "🌿", desc: "Restoration System: Cure the incurable.", cooldownTime: 0.0, color: "#55ffcc",
                upgrades: {
                    "branch_progression": {
                        name: "Medicine", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (AoE Heal): [Passive] Your potions burst into a mist, healing allies nearby when you drink.",
                            "Tier 7 (Revive Potion): [Active] Throw a potion to instantly revive fallen players.",
                            "Tier 8 (Cleanse): [Active] Craft elixirs that wipe all severe debuffs (Silence, Bleed, Necrosis).",
                            "Tier 9 (Regeneration Mist): [Active] Create a lingering cloud that restores HP/MP over time.",
                            "Tier 10 (Panacea): [Active] Craft the ultimate cure-all that maxes out all stats permanently."
                        ]
                    }
                }
            },
            "mutator_branch": {
                name: "Mutator", icon: "🧬", desc: "Transmutation System: Alter your physical form.", cooldownTime: 0.0, color: "#aa33ff",
                upgrades: {
                    "branch_progression": {
                        name: "Biomancy", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Stone Skin): [Active] Drink to physically change your character model, gaining massive defense.",
                            "Tier 7 (Beast Claws): [Active] Mutate your arms for massive unarmed melee damage.",
                            "Tier 8 (Giant Growth): [Active] Double your size, gaining massive AoE radius but moving slower.",
                            "Tier 9 (Elemental Body): [Active] Turn your body into pure fire or ice, damaging attackers.",
                            "Tier 10 (Chimera Form): [Active] Combine multiple mutations into a monstrous, overpowered form."
                        ]
                    }
                }
            },
            "grenadier_branch": {
                name: "Grenadier", icon: "💣", desc: "Explosive System: Turn potions into weapons of war.", cooldownTime: 5.0, color: "#ffaa33",
                upgrades: {
                    "branch_progression": {
                        name: "Volatile Chemistry", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Explosive Flask): [Active] Throw a volatile flask that deals heavy AoE fire damage.",
                            "Tier 7 (Acid Pool): [Active] Throw a flask that creates a lingering pool, shredding enemy armor.",
                            "Tier 8 (Freezing Concoction): [Active] Throw liquid nitrogen to completely freeze enemies in place.",
                            "Tier 9 (Flashbang): [Active] Throw a blinding potion to stun and silence a large area.",
                            "Tier 10 (Nuke): [Active] Combine all volatile elements into a singular, devastating explosion."
                        ]
                    }
                }
            }
        }
    }
};

export const FAMILIAR_TREE_DATA: Record<string, Record<string, Record<string, any>>> = {
    apocalyptic_swarm: {
        core: {
            "swarm_base": {
                name: "Apocalyptic Swarm", icon: "🩸", desc: "Summon a permanent swarm of blood-leeches.", cooldownTime: 0.0, color: "#aa0000",
                upgrades: {
                    "endless_hunger": {
                        name: "Endless Hunger", maxRank: 5,
                        rankDescs: [
                            "Tier 1: [Passive] The swarm bites enemies within 3 units, applying minor Bleed.",
                            "Tier 2: [Passive] You heal for 20% of all Bleed damage dealt by the swarm.",
                            "Tier 3: [Passive] The swarm's passive radius increases to 5 units.",
                            "Tier 4: [Passive] Enemies affected by the swarm have their healing received reduced by 50%.",
                            "Tier 5: [Passive] The swarm grants you a permanent lifesteal aura."
                        ]
                    }
                }
            }
        },
        branches: {
            "devour_branch": {
                name: "Devour", icon: "🌪️", desc: "Command the swarm to devour a target area.", cooldownTime: 20.0, color: "#ff0000",
                upgrades: {
                    "feast_of_blood": {
                        name: "Feast of Blood", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Command): [Active] Detach the swarm to a target area for 8s, heavily Slowing enemies inside.",
                            "Tier 7 (Shred): [Active] Enemies inside the Devour zone have their armor continuously shredded.",
                            "Tier 8 (Gluttony): [Active] The Slow effect inside the Devour zone becomes a Root if enemies stay for 3s.",
                            "Tier 9 (Siphon): [Active] Devour zone drains mana from enemies, feeding it back to you.",
                            "Tier 10 (Carnage): [EVOLUTION] Enemies killed inside the Devour zone explode into a massive burst of healing for you and your allies."
                        ]
                    }
                }
            }
        }
    },
    orbital_arbiter: {
        core: {
            "arbiter_base": {
                name: "Orbital Arbiter", icon: "👁️", desc: "A floating eye that executes cosmic authority.", cooldownTime: 0.0, color: "#00aaff",
                upgrades: {
                    "cosmic_judgment": {
                        name: "Cosmic Judgment", maxRank: 5,
                        rankDescs: [
                            "Tier 1: [Passive] The Arbiter fires a laser at your target every 5 seconds.",
                            "Tier 2: [Passive] Laser damage ignores 30% of enemy armor.",
                            "Tier 3: [Passive] Fire rate increased to every 3.5 seconds.",
                            "Tier 4: [Passive] The laser arcs to one additional nearby enemy.",
                            "Tier 5: [Passive] Arbiter lasers interrupt and silence targets for 0.5s."
                        ]
                    }
                }
            }
        },
        branches: {
            "annihilation_branch": {
                name: "Annihilation", icon: "☄️", desc: "Channel absolute destruction.", cooldownTime: 30.0, color: "#0055ff",
                upgrades: {
                    "focused_beam": {
                        name: "Focused Beam", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Lock-on): [Active] The Arbiter fires a continuous, heavy beam for 3s, tracking the target.",
                            "Tier 7 (Scorched Earth): [Active] The beam leaves a trail of cosmic fire on the ground.",
                            "Tier 8 (Vulnerability): [Active] Targets hit by the continuous beam take 20% more damage from all sources.",
                            "Tier 9 (Width Increase): [Active] The beam's radius is tripled, hitting multiple enemies in a line.",
                            "Tier 10 (Erased): [EVOLUTION] If the beam reduces an enemy below 10% HP, they are instantly disintegrated."
                        ]
                    }
                }
            }
        }
    },
    void_servant: {
        core: {
            "shade_base": {
                name: "Void Servant", icon: "🌌", desc: "A shade that melds with your shadow.", cooldownTime: 0.0, color: "#440088",
                upgrades: {
                    "shadow_meld": {
                        name: "Shadow Meld", maxRank: 5,
                        rankDescs: [
                            "Tier 1: [Passive] The servant grants you +10% movement speed while out of combat.",
                            "Tier 2: [Passive] Completely muffles your footsteps.",
                            "Tier 3: [Passive] Passively grants a 15% dodge chance against physical attacks.",
                            "Tier 4: [Passive] If you stand still for 3 seconds, you turn completely invisible.",
                            "Tier 5: [Passive] The servant automatically absorbs the first instance of fatal damage every 5 minutes."
                        ]
                    }
                }
            }
        },
        branches: {
            "legion_branch": {
                name: "Legion of Shadows", icon: "👥", desc: "Split your presence across the battlefield.", cooldownTime: 25.0, color: "#8800ff",
                upgrades: {
                    "decoy_master": {
                        name: "Decoy Master", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Split): [Active] The Shade steps out and splits into 3 decoys that grab enemy aggro.",
                            "Tier 7 (Explosive Fakes): [Active] Decoys explode for void damage when destroyed.",
                            "Tier 8 (Mirror Strike): [Active] Decoys mimic your basic attacks at 10% damage.",
                            "Tier 9 (Mass Confusion): [Active] Spawns 5 decoys instead of 3, and applying Blindness when they explode.",
                            "Tier 10 (Omnipresence): [EVOLUTION] You can instantly swap places with any active decoy without breaking stealth."
                        ]
                    }
                }
            }
        }
    },
    shadow_monarch: {
        core: {
            "monarch_base": {
                name: "Sovereign's Legion", icon: "👑", desc: "Extract the souls of the slain to build your army.", cooldownTime: 0.0, color: "#111111",
                upgrades: {
                    "shadow_capacity": {
                        name: "Shadow Capacity", maxRank: 5,
                        rankDescs: [
                            "Tier 1: [Passive] Unlocks the ability to hold 3 Shadow Capacity.",
                            "Tier 2: [Passive] Shadow Capacity increased to 5.",
                            "Tier 3: [Passive] Shadow Capacity increased to 10.",
                            "Tier 4: [Passive] Shadow Capacity increased to 20.",
                            "Tier 5: [Passive] Unlocks the ability to extract Elite and Boss enemies."
                        ]
                    }
                }
            }
        },
        branches: {
            "arise_branch": {
                name: "Arise", icon: "🧟", desc: "Summon your stored shadows to overwhelm the enemy.", cooldownTime: 60.0, color: "#330066",
                upgrades: {
                    "necromancy": {
                        name: "Necromancy", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Extract): [Active] Extract the soul of a recently slain enemy to add it to your legion.",
                            "Tier 7 (Summon): [Active] Summons your stored army for 15 seconds to fight for you.",
                            "Tier 8 (Vanguard): [Passive] Summoned shadows inherit 50% of their original HP and damage.",
                            "Tier 9 (Bloodlust): [Active] Summoned shadows gain +100% attack speed and movement speed.",
                            "Tier 10 (Absolute Command): [EVOLUTION] Shadow duration is doubled, and they heal you for a portion of the damage they deal."
                        ]
                    }
                }
            }
        }
    },
    dragon_hoarder: {
        core: {
            "stash_base": {
                name: "Polymorphic Hoarder", icon: "🐉", desc: "A shape-shifting dragon with an infinite stomach.", cooldownTime: 0.0, color: "#ff8800",
                upgrades: {
                    "infinite_pockets": {
                        name: "Infinite Pockets", maxRank: 5,
                        rankDescs: [
                            "Tier 1: [Passive] The familiar acts as a portable chest with 20 slots.",
                            "Tier 2: [Passive] Automatically loots nearby dropped items into its stomach.",
                            "Tier 3: [Passive] Inventory size increased to 50 slots.",
                            "Tier 4: [Passive] Allows remote access to your Town Storage chest from anywhere.",
                            "Tier 5: [Passive] Items stored inside the dragon never spoil or degrade."
                        ]
                    }
                }
            }
        },
        branches: {
            "true_form_branch": {
                name: "True Form", icon: "🔥", desc: "The hoarder sheds its disguise.", cooldownTime: 120.0, color: "#ffaa00",
                upgrades: {
                    "dragon_wrath": {
                        name: "Dragon Wrath", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Unleash): [Active] The familiar transforms into a massive Dragon for 15 seconds.",
                            "Tier 7 (Scales): [Active] The Dragon form draws all enemy aggro and has massive defense.",
                            "Tier 8 (Tail Swipe): [Active] Replaces your hotbar with Dragon controls. Unlocks an AoE Tail Swipe knockback.",
                            "Tier 9 (Breath Weapon): [Active] Unlocks Dragon Breath, dealing massive continuous fire damage.",
                            "Tier 10 (Hoarder's Greed): [EVOLUTION] If the Dragon kills an enemy, it permanently increases its Breath Weapon damage by 1% (Caps at 100%)."
                        ]
                    }
                }
            }
        }
    },
    symbiotic_spirit: {
        core: {
            "pixie_base": {
                name: "Symbiotic Spirit", icon: "🧚", desc: "A glowing orb of pure natural energy that supports you.", cooldownTime: 0.0, color: "#00ffaa",
                upgrades: {
                    "cleansing_light": {
                        name: "Cleansing Light", maxRank: 5,
                        rankDescs: [
                            "Tier 1: [Passive] Passively restores a small amount of MP every 5 seconds.",
                            "Tier 2: [Passive] Automatically removes one negative status effect every 10 seconds.",
                            "Tier 3: [Passive] MP restoration doubled.",
                            "Tier 4: [Passive] The cleanse effect is upgraded to an AoE, affecting nearby allies.",
                            "Tier 5: [Passive] Grants a constant +15% boost to all healing received."
                        ]
                    }
                }
            }
        },
        branches: {
            "lifeline_branch": {
                name: "Lifeline", icon: "💖", desc: "The spirit sacrifices itself to save you.", cooldownTime: 90.0, color: "#ff66cc",
                upgrades: {
                    "ultimate_sacrifice": {
                        name: "Ultimate Sacrifice", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Sacrifice): [Active] The spirit dissipates, instantly restoring 50% of your Max HP.",
                            "Tier 7 (Over-shield): [Active] Also grants a shield equal to 30% of your Max HP.",
                            "Tier 8 (Clean Slate): [Active] Instantly wipes all cooldowns for your utility skills.",
                            "Tier 9 (Rebirth): [Passive] If you take fatal damage, the Lifeline triggers automatically.",
                            "Tier 10 (Phoenix): [EVOLUTION] The spirit revives itself after only 30 seconds instead of the full cooldown, and restores you to 100% HP."
                        ]
                    }
                }
            }
        }
    },
    astral_reflection: {
        core: {
            "gemini_base": {
                name: "Astral Reflection", icon: "🪞", desc: "A perfect, translucent clone of yourself.", cooldownTime: 0.0, color: "#aaddff",
                upgrades: {
                    "mimicry": {
                        name: "Mimicry", maxRank: 5,
                        rankDescs: [
                            "Tier 1: [Passive] The clone mimics your basic attacks, dealing 10% of your damage.",
                            "Tier 2: [Passive] The clone mimics your equipped weapon and armor visuals.",
                            "Tier 3: [Passive] Clone damage increased to 20%.",
                            "Tier 4: [Passive] The clone also mimics your non-ultimate combat skills.",
                            "Tier 5: [Passive] Clone damage increased to 30%."
                        ]
                    }
                }
            }
        },
        branches: {
            "transposition_branch": {
                name: "Transposition", icon: "🔁", desc: "Instantly swap positions with your reflection.", cooldownTime: 15.0, color: "#00aaff",
                upgrades: {
                    "spatial_swap": {
                        name: "Spatial Swap", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Swap): [Active] Instantly swap places with your clone. Drops all enemy aggro.",
                            "Tier 7 (Confusion): [Active] Swapping stuns all enemies near the clone's previous location for 2s.",
                            "Tier 8 (Vanish): [Active] You turn invisible for 2 seconds after swapping.",
                            "Tier 9 (Twin Strike): [Active] Your next attack after a swap is guaranteed to Critical Hit.",
                            "Tier 10 (Quantum Entanglement): [EVOLUTION] You can swap while crowd-controlled, instantly transferring the stun/root to the clone."
                        ]
                    }
                }
            }
        }
    },
    primal_beast: {
        core: {
            "beast_base": {
                name: "Primal Beast", icon: "🐻", desc: "A physical animal companion that tanks and distracts.", cooldownTime: 0.0, color: "#884422",
                upgrades: {
                    "wild_companion": {
                        name: "Wild Companion", maxRank: 5,
                        rankDescs: [
                            "Tier 1: [Passive] Summons a Wolf. It has its own HP and attacks enemies automatically.",
                            "Tier 2: [Passive] The beast gains a Taunt aura, pulling aggro from you.",
                            "Tier 3: [Passive] Evolves into a Dire Wolf. HP and Damage doubled.",
                            "Tier 4: [Passive] The beast gains 50% damage reduction against AoE attacks.",
                            "Tier 5: [Passive] Evolves into an Armored Bear. Max HP tripled, gains massive knockback immunity."
                        ]
                    }
                }
            }
        },
        branches: {
            "kill_command_branch": {
                name: "Kill Command", icon: "🎯", desc: "Direct your beast to eliminate a specific threat.", cooldownTime: 12.0, color: "#cc2222",
                upgrades: {
                    "hunters_mark": {
                        name: "Hunter's Mark", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Sic 'Em): [Active] The beast leaps to your target, dealing heavy physical damage.",
                            "Tier 7 (Maim): [Active] The leap attack applies a deep Bleed stack.",
                            "Tier 8 (Throat Bite): [Active] The leap attack Silence the target for 3 seconds.",
                            "Tier 9 (Frenzy): [Active] The beast attacks 50% faster for 5 seconds after a Kill Command.",
                            "Tier 10 (Alpha Predator): [EVOLUTION] If Kill Command kills the target, the cooldown is reset and the beast heals for 100% of its Max HP."
                        ]
                    }
                }
            }
        }
    },
    radiant_seraph: {
        core: {
            "seraph_base": {
                name: "Radiant Seraph", icon: "👼", desc: "An angelic guardian of pure light.", cooldownTime: 0.0, color: "#ffffee",
                upgrades: {
                    "holy_presence": {
                        name: "Holy Presence", maxRank: 5,
                        rankDescs: [
                            "Tier 1: [Passive] Projects a constant 4-unit aura. Undead/Shadow enemies inside burn.",
                            "Tier 2: [Passive] Allies inside the aura gain +10% defense.",
                            "Tier 3: [Passive] Aura radius increased to 8 units.",
                            "Tier 4: [Passive] Undead/Shadow enemies inside the aura are heavily slowed.",
                            "Tier 5: [Passive] Allies inside the aura cannot be reduced below 1 HP by non-boss attacks."
                        ]
                    }
                }
            }
        },
        branches: {
            "aegis_branch": {
                name: "Aegis", icon: "🛡️", desc: "The Seraph transforms into an impenetrable shield.", cooldownTime: 25.0, color: "#ffffaa",
                upgrades: {
                    "divine_wall": {
                        name: "Divine Wall", maxRank: 5,
                        rankDescs: [
                            "Tier 6 (Wall of Light): [Active] The Seraph turns into a wide wall of light for 5s, blocking projectiles.",
                            "Tier 7 (Repel): [Active] Enemies that touch the wall are violently knocked back.",
                            "Tier 8 (Refraction): [Active] Blocked projectiles are reflected back at the attacker.",
                            "Tier 9 (Enduring Faith): [Active] Wall duration increased to 10 seconds.",
                            "Tier 10 (Bulwark of the Heavens): [EVOLUTION] While the wall is active, you and allies behind it regenerate 10% Max HP per second."
                        ]
                    }
                }
            }
        }
    }
};

// --- OPTIMIZATION: FLAT CACHING ---
const FLAT_SKILL_DB: Record<string, any> = {};
const FLAT_CATEGORY_MAP: Record<string, string> = {};

function buildSkillCache() {
    // Cache Combat Skills
    for (const essence in SKILL_TREE_DATA) {
        for (const category in SKILL_TREE_DATA[essence]) {
            for (const skillId in SKILL_TREE_DATA[essence][category]) {
                FLAT_SKILL_DB[skillId] = SKILL_TREE_DATA[essence][category][skillId];
                FLAT_CATEGORY_MAP[skillId] = category;
            }
        }
    }
    
    // Cache Utility Skills
    for (const pathway in UTILITY_TREE_DATA) {
        for (const category in UTILITY_TREE_DATA[pathway]) {
            for (const skillId in UTILITY_TREE_DATA[pathway][category]) {
                FLAT_SKILL_DB[skillId] = UTILITY_TREE_DATA[pathway][category][skillId];
                FLAT_CATEGORY_MAP[skillId] = category;
            }
        }
    }

    // Cache Familiar Skills
    for (const familiar in FAMILIAR_TREE_DATA) {
        for (const category in FAMILIAR_TREE_DATA[familiar]) {
            for (const skillId in FAMILIAR_TREE_DATA[familiar][category]) {
                FLAT_SKILL_DB[skillId] = FAMILIAR_TREE_DATA[familiar][category][skillId];
                FLAT_CATEGORY_MAP[skillId] = category;
            }
        }
    }
}

buildSkillCache();

export const getSkillDef = (id: string) => {
    return FLAT_SKILL_DB[id] || null;
};

export const getAbilityCategory = (id: string) => {
    return FLAT_CATEGORY_MAP[id] || null;
};