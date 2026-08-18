import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SolarCarScene } from "./SolarCarScene";
import { assemblyStages } from "../../data/assemblyTimeline";
import { assemblyProgress } from "../../data/assemblyProgress";

gsap.registerPlugin(ScrollTrigger);

export const AssemblyTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeStageRef = useRef("mobility");
  const [activeStageId, setActiveStageId] = useState("mobility");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getStage = (progress: number) =>
      assemblyStages.find(
        (stage) =>
          progress >= stage.startProgress && progress <= stage.endProgress
      ) ?? assemblyStages[assemblyStages.length - 1];

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.35,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        assemblyProgress.value = self.progress;

        const stage = getStage(self.progress);
        if (stage.id !== activeStageRef.current) {
          activeStageRef.current = stage.id;
          setActiveStageId(stage.id);
        }
      },
    });

    assemblyProgress.value = trigger.progress;

    return () => {
      trigger.kill();
      assemblyProgress.value = 0;
    };
  }, []);

  const handleStageClick = (progress: number) => {
    const container = containerRef.current;
    if (!container) return;

    const start = container.getBoundingClientRect().top + window.scrollY;
    const scrollDistance = container.offsetHeight - window.innerHeight;
    const target = start + scrollDistance * progress;

    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  };

  return (
    <section
      ref={containerRef}
      id="timeline-container"
      aria-label="Solar car engineering assembly"
      className="assembly-timeline relative min-h-[360vh] bg-[#141411]"
    >
      <div className="assembly-stage-layout sticky top-0 h-screen w-full overflow-hidden">
        <div className="assembly-scene-panel relative h-full min-h-0 lg:col-span-7">
          <SolarCarScene activePartId={activeStageId} />

          <div className="assembly-instruction absolute left-4 top-4 z-10 sm:left-8 sm:top-8">
            <div className="rounded-xl border border-[#3b3932] bg-[#24231f]/82 px-4 py-3 shadow-2xl backdrop-blur-xl">
              <span className="block text-[9px] font-mono font-bold tracking-[0.22em] text-[#8e887d]">
                DARK HORSE / ENGINEERING LAB
              </span>
              <span className="mt-1 flex items-center gap-2 text-xs font-bold tracking-wider text-white">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#D9773F] shadow-[0_0_12px_rgba(217,119,63,.8)]" />
                SCROLL TO BUILD
              </span>
            </div>
          </div>

          <div className="assembly-scroll-caption pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-[10px] font-mono tracking-[0.18em] text-white/60 backdrop-blur-md lg:hidden">
            KEEP SCROLLING
          </div>
        </div>

        <aside className="assembly-copy-panel absolute inset-x-0 bottom-0 z-20 max-h-[38vh] bg-gradient-to-t from-[#141411] via-[#141411]/95 to-transparent px-5 pb-6 pt-12 lg:static lg:col-span-5 lg:flex lg:h-full lg:max-h-none lg:flex-col lg:justify-center lg:bg-[#24231f] lg:px-10 lg:py-12">
          <div className="assembly-copy-inner mx-auto w-full max-w-xl">
            <div className="mb-6 hidden items-center gap-3 lg:flex">
              <span className="h-px w-10 bg-[#D9773F]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#E89A68]">
                HOW AN IDEA BECOMES A PROTOTYPE
              </span>
            </div>

            <div className="assembly-progress mb-5 flex items-center justify-between lg:mb-8">
              <div className="flex gap-2" aria-label="Assembly progress">
                {assemblyStages.map((stage) => {
                  const active = activeStageId === stage.id;
                  return (
                    <button
                      key={stage.id}
                      type="button"
                      onClick={() => handleStageClick(stage.startProgress)}
                      aria-label={`Go to ${stage.title}`}
                      className={`${active ? "active w-10 bg-[#D9773F]" : "w-4 bg-[#4A4841] hover:bg-[#68645B]"} h-1.5 rounded-full transition-all duration-300`}
                    />
                  );
                })}
              </div>
              <span className="text-[10px] font-mono text-[#8e887d]">
                {String(
                  assemblyStages.findIndex((s) => s.id === activeStageId) + 1
                ).padStart(2, "0")}
                /07
              </span>
            </div>

            {assemblyStages.map((stage) => {
              const active = activeStageId === stage.id;
              return (
                <div
                  key={stage.id}
                  className={`transition-all duration-500 ${
                    active
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none absolute translate-y-3 opacity-0"
                  }`}
                  aria-hidden={!active}
                >
                  <span className="stage-name text-[10px] font-mono font-bold tracking-[0.22em] text-[#E89A68]">
                    {stage.name}
                  </span>
                  <h2 className="stage-title mt-2 font-heading text-3xl font-extrabold uppercase leading-none tracking-tight text-white md:text-4xl">
                    {stage.title}
                  </h2>
                  <p className="stage-description mt-4 max-w-lg text-sm leading-6 text-[#B8B2A8] md:text-base">
                    {stage.description}
                  </p>
                </div>
              );
            })}

            <div className="assembly-scroll-caption mt-5 hidden text-[10px] font-mono tracking-wider text-[#777269] lg:block">
              SCROLL PROGRESS DRIVES THE ASSEMBLY
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
