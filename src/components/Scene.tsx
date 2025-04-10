import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Scene: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <Canvas className="absolute top-0 left-0 w-full h-full -z-10">
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh>
        <torusGeometry args={[2, 0.2, 16, 100]} />
        <meshStandardMaterial color={theme === 'light' ? "#f97316" : "#4299e1"} />
      </mesh>
    </Canvas>
  );
};

export default Scene;