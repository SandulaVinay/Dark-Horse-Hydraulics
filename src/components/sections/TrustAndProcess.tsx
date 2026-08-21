import React from "react";
import { BadgeCheck, Boxes, FileCheck2, MessageCircle, Ruler, Wrench } from "lucide-react";

const steps = [
  { icon: MessageCircle, title: "1. DISCUSS", text: "Tell us your branch, idea, project type and requirements." },
  { icon: Ruler, title: "2. ENGINEER", text: "We refine the concept, mechanism, components and prototype plan." },
  { icon: Boxes, title: "3. DESIGN", text: "CAD, calculations, drawings and technical documentation are prepared." },
  { icon: Wrench, title: "4. BUILD", text: "The physical prototype is fabricated, assembled and tested." },
  { icon: FileCheck2, title: "5. DOCUMENT", text: "Receive project documentation and testing information for your academic work." },
  { icon: BadgeCheck, title: "6. PRESENT", text: "Prepare a clearer demonstration of how your prototype works." },
];

export const TrustAndProcess: React.FC = () => (
  <section id="process" className="py-20 px-6 bg-[#090D16]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs font-mono tracking-widest text-[#38BDF8]">FROM IDEA TO WORKING PROTOTYPE</span>
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-3">A CLEAR ENGINEERING PROCESS</h2>
        <p className="text-[#94A3B8] max-w-2xl mx-auto mt-3">A structured path makes it easier for students to understand what happens after they submit a project idea.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {steps.map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl border border-[#1E293B] bg-[#0F131C] p-6 hover:border-[#2563EB] transition-colors">
            <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#60A5FA] mb-5"><Icon size={19} /></div>
            <h3 className="font-heading font-bold text-white">{title}</h3>
            <p className="text-sm text-[#94A3B8] mt-2 leading-6">{text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
