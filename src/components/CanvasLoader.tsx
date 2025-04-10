import React from 'react';
import { Html } from '@react-three/drei';

const CanvasLoader = () => {
  return (
    <Html center>
      <div className="flex justify-center items-center h-full">
        <div className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </Html>
  );
};

export default CanvasLoader; 