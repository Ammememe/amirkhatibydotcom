import React, { useRef, useEffect } from 'react';
import { useGLTF, useAnimations, useVideoTexture } from '@react-three/drei'; // Changed back to useVideoTexture
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
import { useTheme } from '../context/ThemeContext';

// Type for the computer model - Based on your snippet
type GLTFResult = GLTF & {
  nodes: {
    ['monitor-screen']: THREE.Mesh;
    // Add other nodes from computer.glb if needed for casting
    ['Monitor-B-_computer_0_1']: THREE.Mesh;
    ['Monitor-B-_computer_0_2']: THREE.Mesh;
    ['Monitor-B-_computer_0_3']: THREE.Mesh;
    ['Monitor-B-_computer_0_4']: THREE.Mesh;
    ['Monitor-B-_computer_0_5']: THREE.Mesh;
    ['Monitor-B-_computer_0_6']: THREE.Mesh;
    ['Monitor-B-_computer_0_7']: THREE.Mesh;
    ['Monitor-B-_computer_0_8']: THREE.Mesh;
  }
  materials: {
    // Add material names from computer.glb
    ['monitor-screen']: THREE.Material; // Assuming screen has its own material
    computer: THREE.Material;
    base__0: THREE.Material;
    Material_36: THREE.Material;
    Material_35: THREE.Material;
    Material_34: THREE.Material;
    keys: THREE.Material;
    keys2: THREE.Material;
    Material_37: THREE.Material;
  }
  animations: THREE.AnimationClip[];
};

interface DemoComputerProps {
  texture?: string;
  // Allow passing other props like scale, position etc.
  [key: string]: any; 
}

const DemoComputer = (props: DemoComputerProps) => {
  const group = useRef<THREE.Group>(null);
  const { theme } = useTheme();
  // Load model - **VERIFY THIS PATH**
  const { nodes, materials, animations } = useGLTF('/animation/computer.glb') as GLTFResult;
  const { actions } = useAnimations(animations, group);

  // Use video texture - provide a default fallback video if needed
  const textureUrl = props.texture || '/project/default.mp4'; 
  const txt = useVideoTexture(textureUrl) as THREE.VideoTexture; // Cast to VideoTexture

  useEffect(() => {
    if (txt) {
      // Video texture specific settings
      txt.flipY = false; 
      // No need for colorSpace with video typically
    }
  }, [txt]);

  useGSAP(() => {
    if (group.current) {
      gsap.from(group.current.rotation, {
        y: Math.PI / 2,
        duration: 1,
        ease: 'power3.out',
      });
    }
  // Dependency should likely be just group, unless animation restarts on texture change
  }, [group]); 

  // Get nodes - Use optional chaining for safety
  const screenNode = nodes?.['monitor-screen'];
  const computerNode1 = nodes?.['Monitor-B-_computer_0_1'];
  const computerNode2 = nodes?.['Monitor-B-_computer_0_2'];
  const computerNode3 = nodes?.['Monitor-B-_computer_0_3'];
  const computerNode4 = nodes?.['Monitor-B-_computer_0_4'];
  const computerNode5 = nodes?.['Monitor-B-_computer_0_5'];
  const computerNode6 = nodes?.['Monitor-B-_computer_0_6'];
  const computerNode7 = nodes?.['Monitor-B-_computer_0_7'];
  const computerNode8 = nodes?.['Monitor-B-_computer_0_8'];

  // Update the color of the computer based on the theme
  useEffect(() => {
    if (materials.computer && materials.computer instanceof THREE.MeshStandardMaterial) {
      materials.computer.color = new THREE.Color(theme === 'light' ? '#f97316' : '#4299e1');
    }
  }, [theme, materials.computer]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        {/* Screen Mesh - Apply texture override */}
        {screenNode && (
          <mesh
            name="monitor-screen"
            geometry={screenNode.geometry}
            position={[0.127, 1.831, 0.511]} 
            rotation={[1.571, -0.005, 0.031]} 
            scale={[0.661, 0.608, 0.401]}
          >
            {/* Apply video texture */}
            <meshBasicMaterial map={txt} toneMapped={false} side={THREE.FrontSide} />
          </mesh>
        )}

        {/* Root Node Group (often contains main structure or animations) */}
        <group name="RootNode" position={[0, 1.093, 0]} rotation={[-Math.PI / 2, 0, -0.033]} scale={0.045}>
           {/* The numbered screen groups from your snippet seem extraneous if screenNode exists */} 
           {/* If animations target these, they might be needed, but usually RootNode is the target */}
        </group>

        {/* Computer Body Group */}
        <group
          name="Monitor-B-_computer_0"
          position={[0.266, 1.132, 0.051]}
          rotation={[0, -0.033, 0]}
          scale={[0.042, 0.045, 0.045]}
        >
          {/* Render body parts - Ensure material names match your GLB */}
          {computerNode1 && <mesh geometry={computerNode1.geometry} material={materials.computer} />} 
          {computerNode2 && <mesh geometry={computerNode2.geometry} material={materials.base__0} />} 
          {computerNode3 && <mesh geometry={computerNode3.geometry} material={materials.Material_36} />} 
          {computerNode4 && <mesh geometry={computerNode4.geometry} material={materials.Material_35} />} 
          {computerNode5 && <mesh geometry={computerNode5.geometry} material={materials.Material_34} />} 
          {computerNode6 && <mesh geometry={computerNode6.geometry} material={materials.keys} />} 
          {computerNode7 && <mesh geometry={computerNode7.geometry} material={materials.keys2} />} 
          {computerNode8 && <mesh geometry={computerNode8.geometry} material={materials.Material_37} />} 
        </group>
      </group>
    </group>
  );
};

// Preload model - **VERIFY THIS PATH**
useGLTF.preload('/animation/computer.glb');

export default DemoComputer; 