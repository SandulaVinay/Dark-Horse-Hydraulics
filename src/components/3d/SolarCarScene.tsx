import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SolarCarModel } from "./SolarCarModel";


interface SolarCarSceneProps {
  activePartId: string | null;
}

export const SolarCarScene: React.FC<SolarCarSceneProps> = ({ activePartId }) => {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[600px] relative">
      {/* Grid Blueprint Overlay under the canvas */}
      <div className="absolute inset-0 blueprint-grid-fine opacity-20 pointer-events-none" />
      
      <Suspense fallback={
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050810]/80">
          <span className="font-heading font-extrabold tracking-widest text-[#38BDF8] text-sm animate-pulse">
            DARK HORSE DYNAMICS
          </span>
          <span className="text-[10px] font-mono text-[#94A3B8] mt-1.5 uppercase">
            Initializing Assembly Simulator
          </span>
        </div>
      }>
        <Canvas
          camera={{ position: [4, 3, 5], fov: 45 }}
          style={{ width: "100%", height: "100%" }}
          gl={{ antialias: true, alpha: true }}
        >
          {/* Ambient Lighting */}
          <ambientLight intensity={0.4} />

          {/* Directional Lights */}
          <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
          <directionalLight position={[-10, 5, -5]} intensity={0.3} />

          {/* Core Spotlight on model */}
          <spotLight 
            position={[0, 8, 0]} 
            intensity={1.5} 
            angle={0.6} 
            penumbra={0.5} 
            color="#38BDF8" 
          />

          <SolarCarModel activePartId={activePartId} />

          {/* Setup controls with safety features */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            maxPolarAngle={Math.PI / 2} 
            minPolarAngle={0.2}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};
