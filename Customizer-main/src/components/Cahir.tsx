import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { useEffect, useState } from "react";
import { COLORS } from "../options/colors";

const modelPath = "models/Chair.glb";

const Chair = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedPart, setSelectePart] = useState("");


  const gltf = useLoader(GLTFLoader, modelPath);
 
  const INITIAL_MAP = [
    { name: "Frame", childID: "01_Wood_Material_#3_0",  mtl: null },
    { name: "Seat", childID:"Object001_Material_#5_0",  mtl: null },
    { name: "Back side", childID:"02_Base_Material_#2_0",  mtl: null },
  
  ]

  function initColor(parent :any, type: any, mtl: any) {
    parent.scene.traverse((o: any )=> {
      if (o.isMesh) {
        if (o.name.includes(type)) {
          if(mtl) {
            o.material = mtl;
          }
          o.nameID = type;
        }
      }
    });
  }

  useEffect(() => {
    if (gltf) {
      for (let object of INITIAL_MAP) {
        initColor(gltf, object.childID, object.mtl);
      }
    } 
  }, [gltf]);

  function setMaterial(parent: any, type: any, mtl: any) {
    parent.scene.traverse((o: any) => {
      if (o.isMesh && o.nameID != null) {
        if (o.nameID == type) {
          o.material = mtl;
        }
      }
    });
  }
  
  const handleSelectTexture = (texturePath : string) => {
    let new_mtl;
    
    let txt = new THREE.TextureLoader().load(texturePath);
  
    txt.repeat.set(4,4);
    // txt.flipY = true,
    txt.wrapS = THREE.RepeatWrapping;
    txt.wrapT = THREE.RepeatWrapping;

    new_mtl = new THREE.MeshPhongMaterial({
      map: txt,
      shininess : 10 });


    setMaterial(gltf, selectedPart, new_mtl);
  };

  const handleObjectColor = (color: any) => {
    let new_mtl;
    new_mtl = new THREE.MeshPhongMaterial({
      color: color,
      shininess: 10 });
    setMaterial(gltf, selectedPart, new_mtl);
    setSelectedColor(color)
  }

  const selectChild = (id: string) => {
    setSelectePart(id);
  };

  return (
    <>
    <Canvas className="webgl" shadows>
      <ambientLight />
      <directionalLight castShadow />
      <primitive object={gltf.scene} scale={[4, 4, 4]} position-y={-1.2} rotation-x={0.2} />
      <OrbitControls />
    </Canvas>
    <div>

    <div>
      <p style={{fontSize: "h3", color: "red"}}>Select any part of chair*</p>
    </div>

    <div style={{ display: "flex", justifyContent: "center" }}>
        {INITIAL_MAP.map((item) => (
          <div style={{ margin: "5px" }} key={item.childID}>
            <button
              style={{ color: selectedPart === item.childID ? "green" : "" }}
              onClick={() => selectChild(item.childID)}
            >
              {item.name}
            </button>
          </div>
        ))}
      </div>
  
  

    <div style={{display: "flex", gap: "5px", overflow: "auto"}}>
     {
       COLORS.map((item, index) => item.texture ? (
         <div 
          key={index} 
          onClick={() => handleSelectTexture(item.texture)} 
          style={{
            height: "50px", 
            minWidth: "60px", 
            border: "1px solid", 
            backgroundImage: `url(${item.texture})`, 
            cursor: "pointer" 
           }}></div>
        ) : <div 
              key={index} 
              onClick={() => handleObjectColor(item.color)} 
              style={{
                height: "50px", 
                minWidth: "60px", 
                border: "3px solid", 
                borderColor: selectedColor === item.color ? "green" : '' , 
                cursor: "pointer", 
                background: item.color}}>
            </div>)
          }
      </div>
    </div>
    </>
  );
};

export default Chair;
