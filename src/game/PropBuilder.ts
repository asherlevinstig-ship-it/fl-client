import * as THREE from "three";

// ==========================================
// PERFORMANCE: SHARED GEOMETRIES & MATERIALS
// ==========================================
// We create unit-sized geometries (1x1x1). We scale the meshes instead of rebuilding 
// the geometries, which allows every house, shop, and bed to share the same underlying buffer.
const GEOS = {
    box: new THREE.BoxGeometry(1, 1, 1),
    plane: new THREE.PlaneGeometry(1, 1),
    cylinder: new THREE.CylinderGeometry(1, 1, 1, 16),
    cone: new THREE.ConeGeometry(1, 1, 4),
};

const MATS = {
    foundation: new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 1.0 }),
    houseWall: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }),
    shopWall: new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.9 }),
    floor: new THREE.MeshStandardMaterial({ color: 0x5a4a36, roughness: 0.8 }),
    redRoof: new THREE.MeshStandardMaterial({ color: 0xcc3333, roughness: 0.8 }),
    blueAwning: new THREE.MeshStandardMaterial({ color: 0x22aaff, roughness: 0.9, side: THREE.DoubleSide }),
    dirt: new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 1.0 }),
    crop: new THREE.MeshStandardMaterial({ color: 0x22aa22, roughness: 0.8 }),
    wood: new THREE.MeshStandardMaterial({ color: 0x5c4033, roughness: 0.9 }),
    cloth: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }),
    redCloth: new THREE.MeshStandardMaterial({ color: 0xcc4444, roughness: 0.9 }),
    metal: new THREE.MeshStandardMaterial({ color: 0xaaaaaa })
};

// Cache for dynamic wireframe materials based on hex color
const wireMats = new Map<number, THREE.MeshBasicMaterial>();

function getMat(baseMat: THREE.Material, isWireframe: boolean, colorHex: number): THREE.Material {
    if (!isWireframe) return baseMat;
    
    if (!wireMats.has(colorHex)) {
        wireMats.set(colorHex, new THREE.MeshBasicMaterial({ 
            color: colorHex, 
            transparent: true, 
            opacity: 0.4, 
            depthWrite: false, 
            side: THREE.DoubleSide, 
            wireframe: true // Replaces expensive EdgesGeometry duplication
        }));
    }
    return wireMats.get(colorHex)!;
}

// Helper to quickly stamp out standard scaled meshes without repetitive boilerplate
function createMesh(
    geo: THREE.BufferGeometry, 
    mat: THREE.Material, 
    scale: [number, number, number], 
    pos: [number, number, number], 
    castShadow: boolean, 
    receiveShadow: boolean
): THREE.Mesh {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.scale.set(...scale);
    mesh.position.set(...pos);
    mesh.castShadow = castShadow;
    mesh.receiveShadow = receiveShadow;
    return mesh;
}

// ==========================================
// CACHES FOR COMPLETED MODELS
// ==========================================
const structureCache = new Map<string, THREE.Group>();
const decoCache = new Map<string, THREE.Group>();

/**
 * Builds a 3D model for town structures (Houses, Shops, Farms).
 */
export function buildStructureModel(type: string, isWireframe: boolean, colorHex: number = 0x00ffaa): THREE.Group {
    const cacheKey = `${type}_${isWireframe}_${colorHex}`;
    
    // Return a clone of the cached model if it exists (virtually zero CPU/Memory cost)
    if (structureCache.has(cacheKey)) {
        return structureCache.get(cacheKey)!.clone();
    }

    const group = _internalBuildStructure(type, isWireframe, colorHex);
    structureCache.set(cacheKey, group);
    return group.clone();
}

function _internalBuildStructure(type: string, isWireframe: boolean, colorHex: number): THREE.Group {
    const group = new THREE.Group();
    const roofGroup = new THREE.Group();
    roofGroup.name = "roofGroup";
    const baseGroup = new THREE.Group();

    const cast = !isWireframe; // Holograms don't cast shadows
    const rec = !isWireframe;

    if (!isWireframe) {
        let fw = 8, fd = 8;
        if (type === "house") { fw = 12; fd = 12; } 
        else if (type === "shop") { fw = 10; fd = 8; }
        else if (type === "farm") { fw = 14; fd = 14; }
        
        baseGroup.add(createMesh(GEOS.box, MATS.foundation, [fw, 10, fd], [0, -4.95, 0], false, rec));
    }

    if (type === "house") {
        const wMat = getMat(MATS.houseWall, isWireframe, colorHex);
        
        const floor = createMesh(GEOS.plane, getMat(MATS.floor, isWireframe, colorHex), [12, 12, 1], [0, 0.05, 0], false, rec);
        floor.rotation.x = -Math.PI / 2;
        baseGroup.add(floor);

        baseGroup.add(createMesh(GEOS.box, wMat, [12, 6, 1], [0, 3, -5.5], cast, rec));
        baseGroup.add(createMesh(GEOS.box, wMat, [1, 6, 12], [-5.5, 3, 0], cast, rec));
        baseGroup.add(createMesh(GEOS.box, wMat, [1, 6, 12], [5.5, 3, 0], cast, rec));
        baseGroup.add(createMesh(GEOS.box, wMat, [4.5, 6, 1], [-3.75, 3, 5.5], cast, rec));
        baseGroup.add(createMesh(GEOS.box, wMat, [4.5, 6, 1], [3.75, 3, 5.5], cast, rec));

        const roof = createMesh(GEOS.cone, getMat(MATS.redRoof, isWireframe, colorHex), [9.5, 5, 9.5], [0, 8.5, 0], cast, rec);
        roof.rotation.y = Math.PI / 4;
        roofGroup.add(roof);

    } else if (type === "shop") {
        const wMat = getMat(MATS.shopWall, isWireframe, colorHex);
        
        const floor = createMesh(GEOS.plane, getMat(MATS.floor, isWireframe, colorHex), [10, 8, 1], [0, 0.05, 0], false, rec);
        floor.rotation.x = -Math.PI / 2;
        baseGroup.add(floor);

        baseGroup.add(createMesh(GEOS.box, wMat, [10, 5, 1], [0, 2.5, -3.5], cast, rec));
        baseGroup.add(createMesh(GEOS.box, wMat, [1, 5, 8], [-4.5, 2.5, 0], cast, rec));
        baseGroup.add(createMesh(GEOS.box, wMat, [1, 5, 8], [4.5, 2.5, 0], cast, rec));
        baseGroup.add(createMesh(GEOS.box, wMat, [3.5, 5, 1], [-3.25, 2.5, 3.5], cast, rec));
        baseGroup.add(createMesh(GEOS.box, wMat, [3.5, 5, 1], [3.25, 2.5, 3.5], cast, rec));
        baseGroup.add(createMesh(GEOS.box, wMat, [6, 1.2, 1.5], [0, 0.6, 1], cast, rec));

        const awning = createMesh(GEOS.plane, getMat(MATS.blueAwning, isWireframe, colorHex), [10.5, 4, 1], [0, 4, 5], cast, rec);
        awning.rotation.x = -Math.PI / 3;
        roofGroup.add(awning);

        roofGroup.add(createMesh(GEOS.box, wMat, [10.5, 0.5, 8.5], [0, 5.25, 0], cast, rec));

    } else if (type === "farm") {
        baseGroup.add(createMesh(GEOS.box, getMat(MATS.dirt, isWireframe, colorHex), [14, 0.4, 14], [0, 0.2, 0], false, rec));

        // PERFORMANCE: Replaced 25 independent meshes with 1 InstancedMesh
        const cropMat = getMat(MATS.crop, isWireframe, colorHex);
        const cropInstanced = new THREE.InstancedMesh(GEOS.box, cropMat, 25);
        cropInstanced.castShadow = false; // Crops are too small to justify shadow calculations
        cropInstanced.receiveShadow = rec;
        
        const dummy = new THREE.Object3D();
        let idx = 0;
        for (let i = -5; i <= 5; i += 2.5) {
            for (let j = -5; j <= 5; j += 2.5) {
                dummy.position.set(i, 0.6, j);
                dummy.scale.set(0.8, 0.8, 0.8);
                dummy.updateMatrix();
                cropInstanced.setMatrixAt(idx++, dummy.matrix);
            }
        }
        baseGroup.add(cropInstanced);
    }

    group.add(baseGroup);
    group.add(roofGroup);

    return group;
}

/**
 * Builds a 3D model for player-placeable decorations and furniture.
 */
export function buildDecoModel(type: string, isWireframe: boolean, colorHex: number = 0x00ffaa): THREE.Group {
    const cacheKey = `${type}_${isWireframe}_${colorHex}`;
    
    if (decoCache.has(cacheKey)) {
        return decoCache.get(cacheKey)!.clone();
    }

    const group = _internalBuildDeco(type, isWireframe, colorHex);
    decoCache.set(cacheKey, group);
    return group.clone();
}

function _internalBuildDeco(type: string, isWireframe: boolean, colorHex: number): THREE.Group {
    const group = new THREE.Group();
    
    const wMat = getMat(MATS.wood, isWireframe, colorHex);
    const cMat = getMat(MATS.cloth, isWireframe, colorHex);
    const rMat = getMat(MATS.redCloth, isWireframe, colorHex);
    const mMat = getMat(MATS.metal, isWireframe, colorHex);

    const cast = !isWireframe;
    const rec = !isWireframe;

    if (type === "Oak Bed") {
        group.add(createMesh(GEOS.box, wMat, [2.2, 0.5, 4.2], [0, 0.25, 0], cast, rec)); // frame
        group.add(createMesh(GEOS.box, cMat, [2.0, 0.4, 4.0], [0, 0.7, 0], cast, rec));  // mattress
        group.add(createMesh(GEOS.box, cMat, [1.6, 0.2, 0.8], [0, 0.9, -1.5], false, rec)); // pillow
        group.add(createMesh(GEOS.box, rMat, [2.1, 0.45, 2.5], [0, 0.7, 0.8], cast, rec));  // blanket

    } else if (type === "Cozy Rug") {
        group.add(createMesh(GEOS.cylinder, rMat, [2, 0.1, 2], [0, 0.05, 0], false, rec));

    } else if (type === "Wooden Chair") {
        group.add(createMesh(GEOS.box, wMat, [0.8, 0.1, 0.8], [0, 0.6, 0], cast, rec)); // seat
        group.add(createMesh(GEOS.box, wMat, [0.8, 0.8, 0.1], [0, 1.0, -0.35], cast, rec)); // back
        
        const legs = [[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35]];
        legs.forEach(pos => {
            group.add(createMesh(GEOS.cylinder, wMat, [0.05, 0.6, 0.05], [pos[0], 0.3, pos[1]], false, rec));
        });

    } else if (type === "Dining Table") {
        group.add(createMesh(GEOS.box, wMat, [3.0, 0.2, 2.0], [0, 1.2, 0], cast, rec));
        
        const legs = [[-1.3, -0.8], [1.3, -0.8], [-1.3, 0.8], [1.3, 0.8]];
        legs.forEach(pos => {
            group.add(createMesh(GEOS.cylinder, wMat, [0.1, 1.2, 0.1], [pos[0], 0.6, pos[1]], false, rec));
        });

    } else if (type === "Storage Chest") {
        group.add(createMesh(GEOS.box, wMat, [1.2, 0.6, 0.8], [0, 0.3, 0], cast, rec));
        group.add(createMesh(GEOS.box, wMat, [1.2, 0.2, 0.8], [0, 0.7, 0], cast, rec));
        group.add(createMesh(GEOS.box, mMat, [0.2, 0.2, 0.1], [0, 0.6, 0.45], false, rec)); // lock

    } else if (type === "Wardrobe") {
        group.add(createMesh(GEOS.box, wMat, [1.5, 3.0, 1.0], [0, 1.5, 0], cast, rec));
        group.add(createMesh(GEOS.box, mMat, [0.1, 0.4, 0.1], [-0.2, 1.5, 0.55], false, rec)); // handle 1
        group.add(createMesh(GEOS.box, mMat, [0.1, 0.4, 0.1], [0.2, 1.5, 0.55], false, rec));  // handle 2

    } else if (type === "Nightstand") {
        group.add(createMesh(GEOS.box, wMat, [0.8, 1.0, 0.8], [0, 0.5, 0], cast, rec));
        group.add(createMesh(GEOS.box, mMat, [0.1, 0.1, 0.1], [0, 0.7, 0.45], false, rec)); // knob
    }

    return group;
}