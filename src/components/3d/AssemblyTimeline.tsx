import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SolarCarScene } from "./SolarCarScene";
import { assemblyStages } from "../../data/assemblyTimeline";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export const AssemblyTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageId, setActiveStageId] = useState("mobility");

  useEffect(() => {
    // Listen to scroll timeline progress to update the highlighted text stage description
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const currentStage = assemblyStages.find(
          (stage) => progress >= stage.startProgress && progress <= stage.endProgress
        );
        if (currentStage && currentStage.id !== activeStageId) {
          setActiveStageId(currentStage.id);
        }
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [activeStageId]);

  const handleStageClick = (progress: number) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const absoluteTop = rect.top + window.scrollY;
      const targetScroll = absoluteTop + (rect.height * progress);
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <div 
      ref={containerRef} 
      id="timeline-container"
      className="relative min-h-[400vh] bg-[#050810]"
    >
      {/* 3D Visual and Content Double Column Grid Layout */}
      <div className="sticky top-0 left-0 w-full h-screen grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left Column: 3D Scene Wrapper (7 cols) */}
        <div className="lg:col-span-7 h-[50vh] lg:h-screen w-full relative">
          <SolarCarScene activePartId={activeStageId} />

          {/* Assembly Status Tag */}
          <div className="absolute top-8 left-8 z-10 hidden sm:block">
            <div className="bg-[#101827]/90 border border-[#1E293B] backdrop-blur p-4 rounded-lg flex flex-col gap-1">
              <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase">
                Prototype Status
              </span>
              <span className="font-heading font-extrabold text-white tracking-wide text-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0066FF] animate-pulse" />
                SIMULATING ASSEMBLY
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative scroll descriptions (5 cols) */}
        <div className="lg:col-span-5 h-[50vh] lg:h-screen overflow-y-auto px-8 md:px-12 py-16 relative flex flex-col justify-center gap-16 scrollbar-thin">
          
          {/* Scroll Progress Tracker Dot Bar */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-20">
            {assemblyStages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => handleStageClick(stage.startProgress)}
                className={`scroll-indicator-dot ${activeStageId === stage.id ? "active" : ""} cursor-pointer`}
                title={stage.title}
              />
            ))}
          </div>

          {/* Floating dynamic textual content based on scroll */}
          {assemblyStages.map((stage) => {
            const isActive = activeStageId === stage.id;
            return (
              <div 
                key={stage.id}
                className={`transition-all duration-500 pl-4 border-l-2 ${
                  isActive 
                    ? "border-[#0066FF] opacity-100 translate-x-0" 
                    : "border-transparent opacity-20 translate-x-4"
                }`}
              >
                <span className="text-xs font-mono font-bold tracking-widest text-[#38BDF8]">
                  {stage.name}
                </span>
                <h3 className="font-heading font-extrabold text-white text-2xl md:text-3xl mt-2 tracking-wide uppercase">
                  {stage.title}
                </h3>
                <p className="text-sm md:text-base text-[#94A3B8] leading-relaxed mt-4">
                  {stage.description}
                </p>
              </div>
            );
          })}

        </div>

      </div>
    </div>
  );
};
