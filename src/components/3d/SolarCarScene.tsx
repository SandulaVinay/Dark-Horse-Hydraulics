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
    <div className="relative h-full min-h-[420px] w-full overflow-hidden">
      <div className="engineering-glow pointer-events-none absolute inset-0" />
      <div className="blueprint-grid-fine pointer-events-none absolute inset-0 opacity-25" />

      <Suspense
        fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#05070b]/88">
            <span className="font-heading text-sm font-extrabold tracking-[0.24em] text-[#93C5FD]">
              DARK HORSE ENGINEERING LAB
            </span>
            <span className="mt-2 text-[10px] font-mono uppercase tracking-[0.18em] text-[#94A3B8]">
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
          <ambientLight intensity={0.34} />
          <hemisphereLight args={["#e8eef7", "#090d14", 0.58]} />
          <directionalLight position={[8, 12, 7]} intensity={1.3} color="#ffffff" />
          <directionalLight position={[-8, 5, -6]} intensity={0.42} color="#9fb5cf" />
          <spotLight
            position={[0, 9, 1]}
            intensity={1.1}
            angle={0.72}
            penumbra={0.62}
            color="#6fb6ff"
          />
          <pointLight position={[0, 1, -2]} intensity={0.55} color="#22d3ee" distance={8} />

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

      <div className="pointer-events-none absolute left-6 top-6 hidden select-none sm:block">
        <div className="surface-glass rounded-2xl px-4 py-3">
          <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#64748B]">
            DHH / SOLAR MOBILITY
          </div>
          <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
            Engineering Prototype
          </div>
        </div>
      </div>

      {inspectionMode && (
        <div className="pointer-events-none absolute bottom-5 right-5 hidden rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[9px] font-mono tracking-[0.16em] text-white/60 backdrop-blur-md sm:block">
          DRAG TO INSPECT
        </div>
      )}
    </div>
  );
};
