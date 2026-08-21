import React from "react";
import { AssemblyTimeline } from "../3d/AssemblyTimeline";
import { ProjectGrid } from "../projects/ProjectGrid";
import { ProjectDiscovery } from "../projects/ProjectDiscovery";
import { MediaShowcase } from "./MediaShowcase";
import { ProjectTools } from "./ProjectTools";
import { TrustAndProcess } from "./TrustAndProcess";
import { Testimonials } from "./Testimonials";
import { siteConfig } from "../../data/siteConfig";
import { Sparkles, ArrowDown, ChevronRight } from "lucide-react";

interface HomepageProps {
  onSelectProject: (slug: string) => void;
  onNavigateToFinder: () => void;
}

export const Homepage: React.FC<HomepageProps> = ({ onSelectProject, onNavigateToFinder }) => {
  const workflowSteps = [
    { num: "01", title: "IDEA", desc: "Students pitch their mechanical or automated system requirements." },
    { num: "02", title: "RESEARCH", desc: "We study background math models, fluid power formulas, and electrical loads." },
    { num: "03", title: "DESIGN", desc: "Produce 3D CAD modeling, component specifications, and circuit layouts." },
    { num: "04", title: "ENGINEERING", desc: "Calculate battery sizing, gear ratios, torque inputs, and safety factors." },
    { num: "05", title: "PROTOTYPE", desc: "We assemble the physical prototype in our lab using high-grade metal/components." },
    { num: "06", title: "TEST", desc: "Rigorous testing for payload load thresholds, heat, and speed stability." },
    { num: "07", title: "DOCUMENT", desc: "Structure high-quality academic formatting, blueprint designs, and formulas." },
    { num: "08", title: "PRESENT", desc: "Prepare students to defend, explain, and confidently showcase their work." }
  ];

  return (
    <div className="bg-[#050810] text-[#94A3B8]">
      <section className="mobile-hero relative min-h-[90svh] flex flex-col justify-center items-center px-6 text-center overflow-hidden blueprint-grid">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050810]/50 to-[#050810] pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D9773F]/10 border border-[#D9773F]/30 text-[#E89A68] text-xs font-mono mb-8 uppercase tracking-widest">
            <Sparkles size={12} /> Physical Engineering Lab & Prototyping
          </div>
          <h1 className="text-5xl md:text-8xl font-heading font-extrabold text-white tracking-tight leading-none uppercase">
            ENGINEERING IDEAS <br /><span className="text-[#D9773F]">INTO REALITY.</span>
          </h1>
          <p className="text-lg md:text-2xl text-[#B8B2A8] max-w-2xl mx-auto mt-6 font-sans font-light leading-relaxed">We don't just provide project files. We turn student concepts into functional, high-precision engineering prototypes.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <a href="#projects" className="btn-primary py-3 px-8 text-base tracking-wide">EXPLORE OUR PROJECTS</a>
            <button onClick={onNavigateToFinder} className="btn-secondary py-3 px-8 text-base tracking-wide">START YOUR PROJECT</button>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-xs font-mono text-[#B8B2A8]/60 uppercase tracking-widest animate-bounce"><span>Scroll to Build</span><ArrowDown size={14} /></div>
      </section>

      <section id="about" className="py-24 px-6 max-w-7xl mx-auto border-t border-[#3b3932]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-[#D9773F] uppercase">WHO WE ARE</span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight mt-2 uppercase">WE TURN STUDENT IDEAS INTO WORKING MACHINES.</h2>
            <p className="text-sm leading-relaxed mt-4">Academic document submission shouldn't just be about compiling text. At <strong>Dark Horse Hydraulics</strong>, we partner with engineering students to fabricate actual working systems. From custom micro-mobility chassis structures to automated fluid power rigs, we make sure you walk into your evaluation with a product that stands out.</p>
          </div>
          <div className="lg:col-span-7 bg-[#24231f] border border-[#3b3932] rounded-xl p-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[["01", "CAD / Design", "SolidWorks simulations and dynamic structural calculations."],["02", "Fabrication", "High precision laser-cutting, welding, and mechanical assembly."],["03", "Control Kits", "Custom program configurations for Arduino, ESP32, and hydraulics."],["04", "Mentorship", "Full technical walkthrough so students understand how to explain it."]].map(([num, title, desc]) => (
              <div key={num} className="flex flex-col gap-2 text-left"><span className="text-2xl font-heading font-extrabold text-[#E89A68]">{num}</span><span className="font-heading font-bold text-white text-sm">{title}</span><p className="text-[11px] leading-relaxed">{desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-we-work" className="py-24 px-6 bg-[#1d1d19] border-t border-[#3b3932]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16"><span className="text-xs font-mono font-bold tracking-widest text-[#D9773F] uppercase">THE PIPELINE</span><h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight mt-2 uppercase">HOW WE DELIVER SUCCESS</h2><p className="text-sm text-[#B8B2A8] max-w-xl mx-auto mt-3">Step-by-step roadmap from conceptual sketch to completed physical submission.</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((step) => <div key={step.num} className="bg-[#24231f] border border-[#3b3932] p-6 rounded-lg text-left transition-all duration-300 hover:border-[#D9773F] hover:translate-y-[-2px]"><div className="flex justify-between items-center mb-4"><span className="text-xs font-mono text-[#E89A68] bg-[#D9773F]/10 border border-[#D9773F]/30 px-2 py-0.5 rounded">PHASE {step.num}</span><ChevronRight size={14} className="text-[#E89A68]" /></div><h4 className="font-heading font-extrabold text-white text-lg tracking-wide">{step.title}</h4><p className="text-xs text-[#B8B2A8] leading-relaxed mt-2">{step.desc}</p></div>)}
          </div>
        </div>
      </section>

      <div className="bg-[#050810] border-t border-[#3b3932]"><div className="mobile-3d-intro max-w-7xl mx-auto px-6 pt-24 text-center"><span className="text-xs font-mono font-bold tracking-widest text-[#D9773F] uppercase">FEATURED INTERACTIVE PROTOTYPE</span><h2 className="text-3xl md:text-6xl font-heading font-extrabold text-white tracking-tight mt-2 uppercase">3D SOLAR VEHICLE ASSEMBLY</h2><p className="text-sm text-[#B8B2A8] max-w-xl mx-auto mt-3">Scroll down to view mechanical and electrical systems connect step-by-step in real-time.</p></div><AssemblyTimeline /></div>

      <ProjectGrid onExploreProject={onSelectProject} />
      <ProjectTools />
      <MediaShowcase />
      <ProjectDiscovery onSelectProject={onSelectProject} />
      <TrustAndProcess />
      <Testimonials />

      <section className="py-24 px-6 text-center relative overflow-hidden bg-[#1d1d19] border-t border-[#3b3932]">
        <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10"><h2 className="text-4xl md:text-7xl font-heading font-extrabold text-white uppercase tracking-tight">HAVE A PROJECT IDEA?</h2><p className="text-base md:text-xl text-[#B8B2A8] max-w-xl mx-auto mt-4 font-sans font-light leading-relaxed">Let's turn it into something you can build, demonstrate and defend. Contact our engineers on WhatsApp now to map out your specs.</p><div className="mt-8 flex justify-center"><a href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello%20Dark%20Horse%20Hydraulics%2C%20I%20have%20a%20project%20idea%20I'd%20like%20to%20discuss%20with%20your%20team.`} target="_blank" rel="noopener noreferrer" className="btn-primary py-3 px-8 text-base tracking-wide flex items-center gap-2">DISCUSS YOUR PROJECT</a></div></div>
      </section>
    </div>
  );
};
