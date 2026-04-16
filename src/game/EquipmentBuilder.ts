import * as THREE from "three";
import { ITEM_DB, ItemRank } from "../ItemDatabase";
import { PlayerVisual } from "./BaseScene";

export class EquipmentBuilder {
  private itemModelCache = new Map<string, THREE.Group>();

  public updateBackEquipment(visual: PlayerVisual, itemName?: string) {
    if (visual.current_back === itemName) return;
    visual.current_back = itemName || "";

    if (visual.capeGroup) {
        visual.modelMesh?.getObjectByName("torso")?.remove(visual.capeGroup); 
        visual.capeGroup = undefined;
    }

    if (!itemName || itemName === "") return;

    visual.capeGroup = new THREE.Group();
    visual.capeGroup.position.set(0, 0.35, -0.25); 

    let color = 0x5c4033; 
    let emissive = 0x000000;
    
    if (itemName === "Essence Weaver Cloak") {
        color = 0x110033;
        emissive = 0x3300aa;
    } else if (itemName === "Demon Wings") {
        color = 0x880000; 
    }

    const mat = new THREE.MeshStandardMaterial({ 
        color: color, 
        emissive: emissive,
        side: THREE.DoubleSide,
        roughness: 0.9
    });

    if (itemName === "Demon Wings") {
        // Build Wings instead of a cape
        const wingGeo = new THREE.ConeGeometry(0.4, 1.2, 3);
        wingGeo.rotateX(Math.PI / 2);
        
        const leftWing = new THREE.Mesh(wingGeo, mat);
        leftWing.position.set(-0.4, 0, -0.2);
        leftWing.rotation.set(0, -Math.PI / 6, -Math.PI / 4);

        const rightWing = new THREE.Mesh(wingGeo, mat);
        rightWing.position.set(0.4, 0, -0.2);
        rightWing.rotation.set(0, Math.PI / 6, Math.PI / 4);

        visual.capeGroup.add(leftWing, rightWing);
    } else {
        // Standard Segmented Cape
        const segments = 5;
        const height = 0.25;

        for (let i = 0; i < segments; i++) {
            const width = 0.8 - (i * 0.05); 
            const geo = new THREE.PlaneGeometry(width, height);
            geo.translate(0, -height / 2, 0); 
            
            const seg = new THREE.Mesh(geo, mat);
            seg.castShadow = false; 

            if (i === 0) {
                visual.capeGroup.add(seg);
            } else {
                seg.position.y = -height + 0.02; 
                let parent = visual.capeGroup.children[0];
                for(let j = 1; j < i; j++) { parent = parent.children[0]; }
                parent.add(seg);
            }
        }
    }

    visual.modelMesh?.getObjectByName("torso")?.add(visual.capeGroup); 
  }

  public applyWearableEquipment(visual: PlayerVisual, itemName: string, slot: string, isLocalPlayer: boolean) {
    if (!visual || !visual.modelMesh || !visual.limbs) return;

    const meshKey = `equipped_${slot}_Meshes` as keyof PlayerVisual;
    if (visual[meshKey] && Array.isArray(visual[meshKey])) {
        (visual[meshKey] as THREE.Mesh[]).forEach((m: THREE.Mesh) => m.parent?.remove(m));
    }
    (visual as any)[meshKey] = [];

    if (!itemName || itemName === "") return;

    const itemDef = ITEM_DB[itemName];
    const rank: ItemRank = itemDef ? itemDef.rank : "Iron";

    let emissiveColor = 0x000000;
    let emissiveIntensity = 0;

    if (rank === "Bronze") { emissiveColor = 0xcd7f32; emissiveIntensity = 0.2; }
    else if (rank === "Silver") { emissiveColor = 0xc0c0c0; emissiveIntensity = 0.6; }
    else if (rank === "Gold") { emissiveColor = 0xffd700; emissiveIntensity = 1.0; }
    else if (rank === "Diamond") { emissiveColor = 0x00ffff; emissiveIntensity = 2.0; }

    let mat = new THREE.MeshStandardMaterial({ color: 0x888888, emissive: emissiveColor, emissiveIntensity: emissiveIntensity }); 
    
    if (itemName.includes("Iron") || itemName.includes("Silver") || itemName.includes("Gold")) {
        mat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.4, metalness: 0.7, emissive: emissiveColor, emissiveIntensity: emissiveIntensity });
        if (itemName.includes("Gold")) mat.color.setHex(0xffd700);
        if (itemName.includes("Silver")) mat.color.setHex(0xe0e0e0);
    } else if (itemName.includes("Leather")) {
        mat = new THREE.MeshStandardMaterial({ color: 0x5c3a21, roughness: 0.9, emissive: emissiveColor, emissiveIntensity: emissiveIntensity });
    } else if (itemName.includes("Silk") || itemName.includes("Cloth") || itemName.includes("Vestments")) {
        mat = new THREE.MeshStandardMaterial({ color: 0xcc2222, roughness: 1.0, emissive: emissiveColor, emissiveIntensity: emissiveIntensity });
        if (itemName === "Silverweave Vestments") mat.color.setHex(0xeeeeff);
    }

    const head = visual.modelMesh.getObjectByName("head");
    const torso = visual.modelMesh.getObjectByName("torso");
    const leftArm = visual.limbs.leftArm?.bone.children[0];
    const rightArm = visual.limbs.rightArm?.bone.children[0];
    const leftLeg = visual.limbs.leftLeg?.bone.children[0];
    const rightLeg = visual.limbs.rightLeg?.bone.children[0];

    const newMeshes: THREE.Mesh[] = [];

    if (slot === "head" && head) {
        if (itemName === "Golden Crown") {
            const base = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.1, 0.52), mat);
            head.add(base);
            newMeshes.push(base);
            for(let x = -1; x <= 1; x+=2) {
                for(let z = -1; z <= 1; z+=2) {
                    const spike = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.1), mat);
                    spike.position.set(x * 0.21, 0.1, z * 0.21);
                    head.add(spike);
                    newMeshes.push(spike);
                }
            }
            base.position.y = 0.3; 
        } else if (itemName === "Silk Bandana") {
            const band = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.1, 0.52), mat);
            band.position.y = 0.1;
            const knot = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.15), mat);
            knot.position.set(0, 0.1, -0.28);
            head.add(band, knot);
            newMeshes.push(band, knot);
        } else if (itemName === "Shutter Shades") {
            const frames = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.15, 0.1), new THREE.MeshStandardMaterial({color: 0x111111}));
            frames.position.set(0, 0.05, 0.26);
            head.add(frames);
            newMeshes.push(frames);
        } else {
            const helm = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), mat);
            helm.position.y = 0; 
            head.add(helm);
            newMeshes.push(helm);
        }
    }
    else if (slot === "chest" && torso && leftArm && rightArm) {
        if (itemName === "Aegis of the Forgotten") {
            const aegisMat = new THREE.MeshStandardMaterial({ color: 0x222222, metalness: 0.9, roughness: 0.3, emissive: 0x00ffff, emissiveIntensity: 2.0 });
            const chest = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.9, 0.5), aegisMat);
            torso.add(chest);
            newMeshes.push(chest);

            // Bulky Pauldrons
            const lPad = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.5), aegisMat);
            lPad.position.set(0, 0.3, 0);
            leftArm.add(lPad);
            newMeshes.push(lPad);

            const rPad = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.4, 0.5), aegisMat);
            rPad.position.set(0, 0.3, 0);
            rightArm.add(rPad);
            newMeshes.push(rPad);
        } else {
            const chest = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.85, 0.45), mat);
            torso.add(chest);
            newMeshes.push(chest);

            const lSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.85, 0.45), mat);
            leftArm.add(lSleeve);
            newMeshes.push(lSleeve);

            const rSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.85, 0.45), mat);
            rightArm.add(rSleeve);
            newMeshes.push(rSleeve);
        }
    }
    else if (slot === "legs" && torso && leftLeg && rightLeg) {
        const lPants = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.85, 0.45), mat);
        leftLeg.add(lPants);
        newMeshes.push(lPants);

        const rPants = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.85, 0.45), mat);
        rightLeg.add(rPants);
        newMeshes.push(rPants);

        const pelvis = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.25, 0.45), mat);
        pelvis.position.y = -0.35; 
        torso.add(pelvis);
        newMeshes.push(pelvis);
    }
    else if (slot === "feet" && leftLeg && rightLeg) {
        const lBoot = new THREE.Mesh(new THREE.BoxGeometry(0.43, 0.4, 0.46), mat);
        lBoot.position.y = -0.22; 
        leftLeg.add(lBoot);
        newMeshes.push(lBoot);

        const rBoot = new THREE.Mesh(new THREE.BoxGeometry(0.43, 0.4, 0.46), mat);
        rBoot.position.y = -0.22;
        rightLeg.add(rBoot);
        newMeshes.push(rBoot);
    }

    newMeshes.forEach(m => {
        m.castShadow = isLocalPlayer;
        m.receiveShadow = isLocalPlayer;
    });
    (visual as any)[meshKey] = newMeshes;
  }

  public buildItemModel(itemName: string): THREE.Group {
    if (this.itemModelCache.has(itemName)) {
        return this.itemModelCache.get(itemName)!.clone();
    }

    const group = new THREE.Group();
    
    // --- MATERIALS DEFINITION ---
    const itemDef = ITEM_DB[itemName];
    const rank: ItemRank = itemDef ? itemDef.rank : "Iron";
    
    let emissiveColor = 0x000000;
    let emissiveIntensity = 0;
    
    if (rank === "Bronze") { emissiveColor = 0xcd7f32; emissiveIntensity = 0.2; }
    else if (rank === "Silver") { emissiveColor = 0xc0c0c0; emissiveIntensity = 0.6; }
    else if (rank === "Gold") { emissiveColor = 0xffd700; emissiveIntensity = 1.0; }
    else if (rank === "Diamond") { emissiveColor = 0x00ffff; emissiveIntensity = 2.0; }

    const metalMat = new THREE.MeshStandardMaterial({ color: 0xaaaaaa, roughness: 0.3, metalness: 0.8, emissive: emissiveColor, emissiveIntensity: emissiveIntensity });
    const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x555555, roughness: 0.5, metalness: 0.9 });
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x6b4226, roughness: 0.9 });
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x888888, roughness: 1.0 });

    // --- 1. WEAPONS & TOOLS ---
    if (itemName === "Legendary Void Blade") {
        const voidMat = new THREE.MeshStandardMaterial({ color: 0x220033, emissive: 0x440088, emissiveIntensity: 2.0 });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xffaa00, roughness: 0.2, metalness: 1.0 });

        const hilt = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.2, 0.04), goldMat);
        hilt.position.y = 0.1;
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.05, 0.08), goldMat);
        guard.position.y = 0.2;
        const leftBlade = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.7, 0.03), voidMat);
        leftBlade.position.set(-0.03, 0.55, 0);
        const rightBlade = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.7, 0.03), voidMat);
        rightBlade.position.set(0.03, 0.55, 0);
        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.03), new THREE.MeshBasicMaterial({ color: 0xaa00ff }));
        crystal.position.set(0, 0.35, 0);

        group.add(hilt, guard, leftBlade, rightBlade, crystal);
        group.position.y = -0.1;
    }
    else if (itemName.includes("Sword") || itemName.includes("Blade") || itemName.includes("Sunblade")) {
        const hilt = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.25, 0.06), woodMat);
        hilt.position.y = 0.125;
        const guard = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.06, 0.1), darkMetalMat);
        guard.position.y = 0.28;
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.7, 0.04), metalMat); 
        blade.position.y = 0.65;
        const tip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.08, 0.04), metalMat);
        tip.position.y = 1.04;
        group.add(hilt, guard, blade, tip);
        group.position.y = -0.2; 
    } 
    else if (itemName.includes("Axe")) {
        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.7, 0.06), woodMat);
        handle.position.y = 0.35;
        const headBase = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.2, 0.25), darkMetalMat); 
        headBase.position.set(0, 0.6, 0.1); 
        const bladeEdge = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.3, 0.15), metalMat);
        bladeEdge.position.set(0, 0.6, 0.25);
        group.add(handle, headBase, bladeEdge);
        group.position.y = -0.2;
    }
    else if (itemName.includes("Pickaxe")) {
        const handle = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.7, 0.06), woodMat);
        handle.position.y = 0.35;
        const head = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.5), darkMetalMat); 
        head.position.set(0, 0.65, 0);
        group.add(handle, head);
        group.position.y = -0.2;
    }
    else if (itemName.includes("Shield") || itemName === "Aegis of the Forgotten") { // Aegis is chest but just in case it drops
        const board = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.6, 0.06), woodMat);
        const rim = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.65, 0.04), darkMetalMat);
        const boss = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.1), metalMat);
        boss.position.z = 0.04;
        group.add(board, rim, boss);
        group.rotation.y = Math.PI / 2; 
    }
    else if (itemName === "Fishing Rod") {
        const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.04, 3.0, 8), woodMat);
        rod.position.y = 1.0; 
        const reel = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.1, 8), darkMetalMat);
        reel.rotation.x = Math.PI / 2;
        reel.position.set(0, 0.2, 0.05);
        group.add(rod, reel);
        group.position.y = -0.5;
    }

    // --- 2. CONSUMABLES & FOOD ---
    else if (itemName === "Crispy Apple") {
        const apple = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshStandardMaterial({color: 0xdd2222}));
        const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.05), woodMat);
        stem.position.y = 0.12;
        group.add(apple, stem);
    }
    else if (itemName === "Rye Bread") {
        const loaf = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.1, 0.15), new THREE.MeshStandardMaterial({color: 0x8b5a2b, roughness: 1.0}));
        group.add(loaf);
    }
    else if (itemName === "Roasted Boar Meat") {
        const bone = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.4), new THREE.MeshStandardMaterial({color: 0xeeeeee}));
        bone.rotation.z = Math.PI / 2;
        const meat = new THREE.Mesh(new THREE.SphereGeometry(0.15, 8, 8), new THREE.MeshStandardMaterial({color: 0x5c2e00}));
        group.add(bone, meat);
    }
    else if (itemName.includes("Potion") || itemName.includes("Vial") || itemName.includes("Elixir")) {
        const isHealth = itemName.includes("Health");
        const isMana = itemName.includes("Mana");
        const liquidMat = isHealth ? new THREE.MeshStandardMaterial({color: 0xcc2222}) : (isMana ? new THREE.MeshStandardMaterial({color: 0x2244cc, transparent: true, opacity: 0.8}) : new THREE.MeshStandardMaterial({color: 0x22cc22}));
        
        const flaskBase = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), liquidMat);
        flaskBase.position.y = 0.075;
        const neck = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.1, 0.06), new THREE.MeshStandardMaterial({color: 0xdddddd, transparent: true, opacity: 0.5}));
        neck.position.y = 0.2;
        const cork = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.04), woodMat);
        cork.position.y = 0.26;
        group.add(flaskBase, neck, cork);
    }

    // --- 3. FISH ---
    else if (itemName.includes("Carp") || itemName.includes("Trout") || itemName.includes("Koi")) {
        let fishColor = 0x888888;
        if (itemName.includes("Trout")) fishColor = 0xc0c0c0;
        if (itemName.includes("Koi")) fishColor = 0xffd700;

        const body = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.3, 4), new THREE.MeshStandardMaterial({color: fishColor, metalness: 0.5}));
        body.rotation.x = Math.PI / 2;
        const tail = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.1, 3), new THREE.MeshStandardMaterial({color: fishColor}));
        tail.rotation.x = -Math.PI / 2;
        tail.position.z = -0.18;
        group.add(body, tail);
    }
    else if (itemName === "Old Boot") {
        const bootBase = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.1, 0.2), new THREE.MeshStandardMaterial({color: 0x442211}));
        bootBase.position.z = 0.05;
        const bootTop = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.2, 0.1), new THREE.MeshStandardMaterial({color: 0x442211}));
        bootTop.position.y = 0.15;
        group.add(bootBase, bootTop);
    }

    // --- 4. ARTIFACTS & UTILITY ---
    else if (itemName === "Lantern of the Ancients") {
        const frame = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.25, 0.15), darkMetalMat);
        const glass = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.2, 0.12), new THREE.MeshStandardMaterial({color: 0xffffaa, emissive: 0xffaa00, emissiveIntensity: 2.0}));
        const handle = new THREE.Mesh(new THREE.TorusGeometry(0.05, 0.01, 4, 12, Math.PI), darkMetalMat);
        handle.position.y = 0.15;
        group.add(frame, glass, handle);
    }
    else if (itemName === "Tome of Awakening") {
        const book = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.05, 0.25), new THREE.MeshStandardMaterial({color: 0x330055, emissive: 0x5500aa, emissiveIntensity: 0.5}));
        const pages = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.04, 0.23), new THREE.MeshStandardMaterial({color: 0xddddcc}));
        group.add(book, pages);
    }
    else if (itemName === "Tattered Map") {
        const mapScroll = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.3), new THREE.MeshStandardMaterial({color: 0xd2b48c}));
        mapScroll.rotation.z = Math.PI / 2;
        group.add(mapScroll);
    }
    else if (itemName === "Repair Kit") {
        const toolbox = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.15, 0.15), new THREE.MeshStandardMaterial({color: 0xaa2222}));
        const tHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.15), darkMetalMat);
        tHandle.rotation.z = Math.PI / 2;
        tHandle.position.y = 0.1;
        group.add(toolbox, tHandle);
    }

    // --- 5. RAW MATERIALS ---
    else if (itemName === "Wood") {
        const log = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.4, 0.2), woodMat);
        log.position.y = 0.2;
        group.add(log);
    }
    else if (itemName === "Ironwood") {
        const log = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.4), new THREE.MeshStandardMaterial({color: 0x2b3322, roughness: 1.0}));
        log.position.y = 0.2;
        group.add(log);
    }
    else if (itemName === "Stone") {
        const stoneBlock = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), stoneMat);
        stoneBlock.position.y = 0.15;
        stoneBlock.rotation.set(0.1, 0.2, 0.1);
        group.add(stoneBlock);
    }
    else if (itemName === "Glacial Ore") {
        const ice = new THREE.Mesh(new THREE.DodecahedronGeometry(0.2), new THREE.MeshStandardMaterial({color: 0xaaffff, transparent: true, opacity: 0.8, emissive: 0x0055aa}));
        ice.position.y = 0.15;
        group.add(ice);
    }
    else if (itemName === "Sun-baked Clay") {
        const clay = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), new THREE.MeshStandardMaterial({color: 0xc46210}));
        clay.position.y = 0.125;
        group.add(clay);
    }
    else if (itemName === "Dire Wolf Pelt") {
        const pelt = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 0.5), new THREE.MeshStandardMaterial({color: 0x555555, roughness: 1.0}));
        group.add(pelt);
    }
    else if (itemName === "Plague Toad Skin") {
        const skin = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.05, 0.3), new THREE.MeshStandardMaterial({color: 0x225522, roughness: 1.0}));
        group.add(skin);
    }
    else if (itemName === "Sand Crawler Chitin") {
        const shell = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8, 0, Math.PI), new THREE.MeshStandardMaterial({color: 0xddaa55, roughness: 0.5}));
        shell.rotation.x = -Math.PI / 2;
        group.add(shell);
    }
    else if (itemName === "Frost Elemental Core") {
        const core = new THREE.Mesh(new THREE.OctahedronGeometry(0.15), new THREE.MeshStandardMaterial({color: 0xffffff, emissive: 0x00ffff, emissiveIntensity: 1.5}));
        core.position.y = 0.15;
        group.add(core);
    }
    else if (itemName === "Ent Bark") {
        const bark = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.4, 0.05), new THREE.MeshStandardMaterial({color: 0x4a3219, roughness: 1.0}));
        bark.position.y = 0.2;
        group.add(bark);
    }
    else if (itemName === "Aethelgard Crystal") {
        const aCrystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.15), new THREE.MeshStandardMaterial({color: 0x00ffaa, emissive: 0x00ffaa, emissiveIntensity: 2.0}));
        aCrystal.position.y = 0.15;
        aCrystal.scale.y = 2.0;
        group.add(aCrystal);
    }

    // --- 6. FURNITURE / DECORATION ---
    else if (itemName === "Oak Bed") {
        const frame = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 1.4), woodMat);
        const mattress = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.1, 1.35), new THREE.MeshStandardMaterial({color: 0xffffff}));
        mattress.position.y = 0.15;
        const pillow = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.3), new THREE.MeshStandardMaterial({color: 0xeeeeee}));
        pillow.position.set(0, 0.2, -0.5);
        group.add(frame, mattress, pillow);
    }
    else if (itemName === "Cozy Rug") {
        const rug = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.02, 1.2), new THREE.MeshStandardMaterial({color: 0xaa2222}));
        group.add(rug);
    }
    else if (itemName === "Wooden Chair") {
        const seat = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.05, 0.3), woodMat);
        seat.position.y = 0.3;
        const back = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.4, 0.05), woodMat);
        back.position.set(0, 0.5, -0.125);
        const legGeo = new THREE.BoxGeometry(0.05, 0.3, 0.05);
        for(let x=-1; x<=1; x+=2) {
            for(let z=-1; z<=1; z+=2) {
                const leg = new THREE.Mesh(legGeo, woodMat);
                leg.position.set(x * 0.125, 0.15, z * 0.125);
                group.add(leg);
            }
        }
        group.add(seat, back);
    }
    else if (itemName === "Dining Table") {
        const top = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.05, 0.8), woodMat);
        top.position.y = 0.6;
        const legGeo = new THREE.BoxGeometry(0.1, 0.6, 0.1);
        for(let x=-1; x<=1; x+=2) {
            for(let z=-1; z<=1; z+=2) {
                const leg = new THREE.Mesh(legGeo, woodMat);
                leg.position.set(x * 0.4, 0.3, z * 0.3);
                group.add(leg);
            }
        }
        group.add(top);
    }
    else if (itemName === "Storage Chest") {
        const base = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.3, 0.4), woodMat);
        base.position.y = 0.15;
        const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.6, 8, 1, false, 0, Math.PI), woodMat);
        lid.rotation.z = Math.PI / 2;
        lid.position.y = 0.3;
        const lock = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.05), darkMetalMat);
        lock.position.set(0, 0.3, 0.2);
        group.add(base, lid, lock);
    }
    else if (itemName === "Wardrobe") {
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.6, 0.4), woodMat);
        body.position.y = 0.8;
        const doorLine = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.5, 0.41), new THREE.MeshStandardMaterial({color: 0x221100}));
        doorLine.position.y = 0.8;
        group.add(body, doorLine);
    }
    else if (itemName === "Nightstand") {
        const body = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.5, 0.4), woodMat);
        body.position.y = 0.25;
        const drawer = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.15, 0.41), new THREE.MeshStandardMaterial({color: 0x5a3216}));
        drawer.position.y = 0.35;
        group.add(body, drawer);
    }

    // --- FALLBACK (If somehow something was missed) ---
    else {
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.15), new THREE.MeshStandardMaterial({ color: 0x8844ff }));
        box.position.y = 0.075;
        group.add(box);
    }

    group.traverse((c: THREE.Object3D) => {
        if (c instanceof THREE.Mesh) {
            c.castShadow = false; 
            c.receiveShadow = false;
        }
    });

    this.itemModelCache.set(itemName, group);
    return group.clone();
  }

  public dispose() {
    this.itemModelCache.clear();
  }
}