import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { SolarCarModel } from "./SolarCarModel";

interface SolarCarSceneProps {
  activePartId: string | null;
}

export const SolarCarScene = ({ activePartId }: SolarCarSceneProps) => {
  const inspectionMode = activePartId === "final";

  return (
    <div className="relative h-full min-h-[420px] w-full">
      <div className="blueprint-grid-fine pointer-events-none absolute inset-0 opacity-20" />

      <Suspense
        fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050810]/80">
            <span className="font-heading text-sm font-extrabold tracking-widest text-[#38BDF8]">
              DARK HORSE ENGINEERING LAB
            </span>
            <span className="mt-1.5 text-[10px] font-mono uppercase text-[#94A3B8]">
              Initializing assembly simulator
            </span>
          </div>
        }
      >
        <Canvas
          camera={{ position: [4, 3, 5], fov: 45 }}
          dpr={[1, 1.5]}
          frameloop="always"
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ height: "100%", width: "100%" }}
        >
          <ambientLight intensity={0.42} />
          <directionalLight position={[10, 10, 5]} intensity={1.15} />
          <directionalLight position={[-10, 5, -5]} intensity={0.28} />
          <spotLight
            position={[0, 8, 0]}
            intensity={1.35}
            angle={0.6}
            penumbra={0.5}
            color="#38BDF8"
          />

          <SolarCarModel activePartId={activePartId} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={inspectionMode}
            rotateSpeed={0.45}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={0.25}
          />
        </Canvas>
      </Suspense>

      {inspectionMode && (
        <div className="pointer-events-none absolute bottom-5 right-5 hidden rounded-full border border-white/10 bg-black/30 px-3 py-2 text-[9px] font-mono tracking-[0.16em] text-white/55 backdrop-blur-md sm:block">
          DRAG TO INSPECT
        </div>
      )}
    </div>
  );
};
