import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { SolarCarModelPremiumV2 } from "./SolarCarModelPremiumV2";
import { SolarCarSilhouette } from "./SolarCarSilhouette";

interface SolarCarSceneProps { activePartId: string | null; }

export const SolarCarScene = ({ activePartId }: SolarCarSceneProps) => {
  const inspectionMode = activePartId === "final";
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="relative h-full min-h-0 w-full overflow-hidden solar-scene">
      <div className="engineering-glow pointer-events-none absolute inset-0" />
      <div className="blueprint-grid-fine pointer-events-none absolute inset-0 opacity-20" />
      <Suspense fallback={<div className="absolute inset-0 flex flex-col items-center justify-center bg-[#141411]/95 px-5 text-center"><span className="text-xs font-extrabold tracking-[0.2em] text-[#E89A68]">DARK HORSE ENGINEERING LAB</span><span className="mt-2 text-[10px] font-mono uppercase tracking-[0.16em] text-[#bcb6aa]">Building the prototype</span></div>}>
        <Canvas
          camera={{ position: isMobile ? [6.7, 3.7, 7.8] : [6.4, 3.35, 7.8], fov: isMobile ? 50 : 43 }}
          dpr={isMobile ? [1, 1.25] : [1, 1.5]}
          frameloop="always"
          gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }}
          style={{ height: "100%", width: "100%", touchAction: "none" }}
          onPointerDown={(event) => event.stopPropagation()}
          onWheel={(event) => event.preventDefault()}
        >
          <ambientLight intensity={0.46} color="#fff7e8" />
          <hemisphereLight args={["#fff5e4", "#181611", 0.72]} />
          <directionalLight position={[8, 12, 7]} intensity={1.45} color="#fffaf0" />
          <directionalLight position={[-7, 6, -6]} intensity={0.55} color="#d6c5ad" />
          <spotLight position={[0, 9, 2]} intensity={1.45} angle={0.7} penumbra={0.6} color="#ffbd78" />
          <pointLight position={[0, 2, -2]} intensity={0.42} color="#7bb6ae" distance={9} />
          <SolarCarModelPremiumV2 activePartId={activePartId} />
          <SolarCarSilhouette activePartId={activePartId} />
        </Canvas>
      </Suspense>

      <div className="pointer-events-none absolute left-4 top-4 hidden select-none sm:block">
        <div className="surface-glass rounded-2xl px-4 py-3">
          <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#777269]">DHH / SOLAR MOBILITY</div>
          <div className="mt-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#d97732] shadow-[0_0_12px_rgba(255,159,67,0.9)]" />
            Engineering Prototype
          </div>
        </div>
      </div>

      {inspectionMode && <div className="pointer-events-none absolute bottom-5 right-5 hidden rounded-full border border-white/10 bg-black/35 px-3 py-2 text-[9px] font-mono tracking-[0.16em] text-white/70 backdrop-blur-md sm:block">DRAG TO INSPECT</div>}
      {!inspectionMode && <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[8px] font-mono uppercase tracking-[0.16em] text-white/55 backdrop-blur-md sm:hidden">Scroll to assemble</div>}
    </div>
  );
};
