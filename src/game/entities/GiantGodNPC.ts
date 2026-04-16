import * as THREE from "three";
// Note: Adjust this import path if you end up moving getTerrainHeight into a TerrainUtils file later!
import { getTerrainHeight } from "../TownScene"; 

export class GiantGodNPC {
  public mesh: THREE.Group;
  private timeOffset: number;
  private bodyGroup: THREE.Group;
  private torso: THREE.Mesh;
  private head: THREE.Group;
  private leftArmPivot: THREE.Group;
  private rightArmPivot: THREE.Group;
  private capeGroup: THREE.Group;
  private warSpear: THREE.Group;
  private glowLight: THREE.PointLight;

  constructor() {
    this.mesh = new THREE.Group();
    this.timeOffset = Math.random() * 1000;

    const matBronze = new THREE.MeshStandardMaterial({ color: 0xcd853f, roughness: 1.0, flatShading: true }); 
    const matIron = new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 1.0, flatShading: true }); 
    const matRed = new THREE.MeshStandardMaterial({ color: 0x8b0000, roughness: 1.0, flatShading: true, side: THREE.DoubleSide }); 
    const matGold = new THREE.MeshStandardMaterial({ color: 0xffd700, roughness: 1.0, flatShading: true }); 
    const glowMat = new THREE.MeshStandardMaterial({ color: 0xff4400, emissive: 0xff2200, emissiveIntensity: 2.0 });

    this.bodyGroup = new THREE.Group();
    this.bodyGroup.position.y = 8.5; 
    this.mesh.add(this.bodyGroup);

    const torsoGeo = new THREE.BoxGeometry(4.5, 7, 3);
    this.torso = new THREE.Mesh(torsoGeo, matBronze);
    this.torso.castShadow = true; this.torso.receiveShadow = true;
    this.bodyGroup.add(this.torso);

    const abStrip = new THREE.Mesh(new THREE.BoxGeometry(1.0, 5, 0.5), matIron);
    abStrip.position.set(0, -0.5, 1.6);
    this.torso.add(abStrip);

    const skirtGroup = new THREE.Group();
    skirtGroup.position.y = -3.5;
    const flapGeo = new THREE.BoxGeometry(0.6, 3.5, 0.2);
    for(let i = 0; i < 7; i++) {
       const flapF = new THREE.Mesh(flapGeo, matIron);
       flapF.position.set(-2.1 + i * 0.7, -1.75, 1.5);
       skirtGroup.add(flapF);
       const flapB = new THREE.Mesh(flapGeo, matIron);
       flapB.position.set(-2.1 + i * 0.7, -1.75, -1.5);
       skirtGroup.add(flapB);
    }
    this.torso.add(skirtGroup);

    const legGeo = new THREE.BoxGeometry(1.6, 7, 2);
    const leftLeg = new THREE.Mesh(legGeo, matIron);
    leftLeg.position.set(-1.3, -5, 0);
    leftLeg.castShadow = true;
    
    const greaveL = new THREE.Mesh(new THREE.BoxGeometry(1.8, 5, 0.5), matBronze);
    greaveL.position.set(0, -1, 0.9);
    leftLeg.add(greaveL);
    this.torso.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, matIron);
    rightLeg.position.set(1.3, -5, 0);
    rightLeg.castShadow = true;
    
    const greaveR = new THREE.Mesh(new THREE.BoxGeometry(1.8, 5, 0.5), matBronze);
    greaveR.position.set(0, -1, 0.9);
    rightLeg.add(greaveR);
    this.torso.add(rightLeg);

    this.head = new THREE.Group();
    this.head.position.y = 4.8;
    this.torso.add(this.head);

    const helmBase = new THREE.Mesh(new THREE.BoxGeometry(3.0, 4.0, 3.2), matBronze);
    this.head.add(helmBase);

    const guardGeo = new THREE.BoxGeometry(0.8, 2.5, 0.4);
    const guardL = new THREE.Mesh(guardGeo, matBronze);
    guardL.position.set(-1.1, -1.5, 1.6);
    this.head.add(guardL);
    const guardR = new THREE.Mesh(guardGeo, matBronze);
    guardR.position.set(1.1, -1.5, 1.6);
    this.head.add(guardR);

    const eyeGeo = new THREE.BoxGeometry(0.5, 0.3, 0.3);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.7, 0.8, 1.6);
    this.head.add(eyeL);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat);
    eyeR.position.set(0.7, 0.8, 1.6);
    this.head.add(eyeR);

    const plumeGroup = new THREE.Group();
    plumeGroup.position.y = 2.0;
    this.head.add(plumeGroup);
    
    const mount = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.8, 4.0), matGold);
    plumeGroup.add(mount);
    
    for(let i=0; i<6; i++) {
        const seg = new THREE.Mesh(new THREE.BoxGeometry(0.4, 2, 0.6), matRed);
        seg.position.z = -1.5 + i * 0.6;
        seg.position.y = 1.0;
        seg.scale.y = 1.0 - Math.abs(i - 2.5) * 0.1;
        plumeGroup.add(seg);
    }

    const armGeo = new THREE.BoxGeometry(1.5, 6, 2.0);
    const pauldronGeo = new THREE.BoxGeometry(2.8, 2.8, 2.8);
    
    this.leftArmPivot = new THREE.Group();
    this.leftArmPivot.position.set(-3.5, 2.8, 0);
    this.torso.add(this.leftArmPivot);

    const pauldronL = new THREE.Mesh(pauldronGeo, matIron);
    this.leftArmPivot.add(pauldronL);

    const lArm = new THREE.Mesh(armGeo, matIron);
    lArm.position.y = -3;
    this.leftArmPivot.add(lArm);
    
    const shieldGroup = new THREE.Group();
    shieldGroup.position.set(-0.6, -3, 1.2);
    this.leftArmPivot.add(shieldGroup);
    
    const shieldMat = new THREE.MeshStandardMaterial({ color: 0x8b0000, roughness: 1.0 }); 
    const shieldBase = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.2, 0.4, 8), shieldMat); 
    shieldBase.rotation.x = Math.PI / 2;
    shieldBase.castShadow = true;
    shieldGroup.add(shieldBase);
    
    const shieldCenter = new THREE.Mesh(new THREE.BoxGeometry(2.0, 2.0, 0.4), matIron);
    shieldCenter.position.z = 0.3;
    shieldCenter.rotation.z = Math.PI / 4; 
    shieldGroup.add(shieldCenter);

    this.rightArmPivot = new THREE.Group();
    this.rightArmPivot.position.set(3.5, 2.8, 0);
    this.torso.add(this.rightArmPivot);

    const pauldronR = new THREE.Mesh(pauldronGeo, matIron);
    this.rightArmPivot.add(pauldronR);

    const rArm = new THREE.Mesh(armGeo, matIron);
    rArm.position.y = -3;
    this.rightArmPivot.add(rArm);

    this.warSpear = new THREE.Group();
    this.warSpear.position.set(0, -4.0, 1.5);
    this.warSpear.rotation.x = -Math.PI / 4; 
    this.rightArmPivot.add(this.warSpear);

    const spearShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 26, 4), matIron);
    spearShaft.position.y = 5;
    spearShaft.castShadow = true;
    this.warSpear.add(spearShaft);

    const spearHeadGroup = new THREE.Group();
    spearHeadGroup.position.y = 19;
    this.warSpear.add(spearHeadGroup);

    const headBase = new THREE.Mesh(new THREE.BoxGeometry(1.2, 4, 0.4), matBronze);
    spearHeadGroup.add(headBase);
    
    const headTip = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.85, 0.4), matBronze);
    headTip.position.y = 2.0;
    headTip.rotation.z = Math.PI / 4;
    spearHeadGroup.add(headTip);

    const spearCore = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2, 0.6), glowMat);
    spearCore.position.y = -0.5;
    spearHeadGroup.add(spearCore);

    this.glowLight = new THREE.PointLight(0xff4400, 4.0, 30);
    this.glowLight.position.set(0, 18, 0);
    this.warSpear.add(this.glowLight);

    this.capeGroup = new THREE.Group();
    this.capeGroup.position.set(0, 3.5, -1.8);
    this.torso.add(this.capeGroup);

    for (let i = 0; i < 5; i++) {
        const segGeo = new THREE.PlaneGeometry(10 - i * 0.5, 18);
        segGeo.translate(0, -9, 0);
        const seg = new THREE.Mesh(segGeo, matRed);
        seg.position.set(0, 0, -0.1 * i);
        seg.rotation.x = 0.1 * i;
        this.capeGroup.add(seg);
    }
    
    this.mesh.scale.set(1.2, 1.2, 1.2);
    this.mesh.position.set(35, getTerrainHeight(35, -35), -35); 
  }

  public update(t: number) {
    const time = t + this.timeOffset;
    
    this.bodyGroup.rotation.y = Math.sin(time * 0.001) * 0.08;
    this.bodyGroup.rotation.x = Math.cos(time * 0.0007) * 0.03;

    this.head.rotation.y = Math.sin(time * 0.0012) * 0.05;
    this.head.rotation.x = Math.cos(time * 0.0008) * 0.02 + 0.1; 

    this.leftArmPivot.rotation.z = Math.sin(time * 0.0015) * 0.03 + 0.05;
    this.leftArmPivot.rotation.x = Math.cos(time * 0.001) * 0.02 - 0.1;
    
    this.warSpear.rotation.z = Math.sin(time * 0.002) * 0.015;
    this.glowLight.intensity = 3.0 + Math.sin(time * 0.005) * 1.5;

    this.rightArmPivot.rotation.z = Math.sin(time * 0.0008) * 0.02 + 0.1;

    this.capeGroup.children.forEach((seg, i) => {
        seg.rotation.x = Math.sin((time * 0.0018) + i * 0.5) * 0.07 + 0.1 * i;
    });
  }
}