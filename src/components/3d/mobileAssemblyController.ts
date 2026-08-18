import { assemblyProgress } from "../../data/assemblyProgress";

let cleanup: (() => void) | null = null;

/** Native touch-scroll fallback for phones. Keeps the 3D assembly tied to page scroll. */
export function enableMobileAssemblyScroll() {
  cleanup?.();
  if (typeof window === "undefined" || window.innerWidth >= 768) return;

  const section = document.getElementById("timeline-container");
  if (!section) return;

  let raf = 0;
  const update = () => {
    raf = 0;
    const rect = section.getBoundingClientRect();
    const travel = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / travel));
    assemblyProgress.value = progress;
  };

  const onScroll = () => {
    if (!raf) raf = window.requestAnimationFrame(update);
  };
  const onResize = () => update();

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  update();

  cleanup = () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    if (raf) window.cancelAnimationFrame(raf);
    cleanup = null;
  };
}
