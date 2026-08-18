import React, { useEffect } from "react";
import type { Project } from "../../data/projects";
import { ProjectGallery } from "./ProjectGallery";
import { DocumentPreview } from "../documents/DocumentPreview";
import { WhatsAppButton } from "../whatsapp/WhatsAppButton";
import { ArrowLeft, Cpu, Settings, Globe, Flag, Sparkles, BookOpen } from "lucide-react";

interface ProjectDetailsProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project, onBack }) => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [project.slug]);

  return (
    <div className="min-h-screen bg-[#050810] text-[#94A3B8] pb-24">
      {/* Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono tracking-wider text-[#94A3B8] hover:text-[#38BDF8] transition-colors duration-200 bg-transparent border-none cursor-pointer"
        >
          <ArrowLeft size={16} /> BACK TO PROJECTS
        </button>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Main Info (8 cols) */}
        <div className="lg:col-span-8 flex flex-col gap-10">
          
          {/* Project Title and Hero Info */}
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#38BDF8] uppercase bg-[#0066FF]/10 border border-[#0066FF]/30 px-3 py-1 rounded">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white tracking-tight mt-4 mb-3 uppercase">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-[#F8FAFC]/80 leading-relaxed font-sans font-light">
              {project.description}
            </p>
          </div>

          {/* Project Image Gallery */}
          <div>
            <ProjectGallery images={project.gallery} />
          </div>

          {/* Problem & Solution block */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-y border-[#1E293B] py-8">
            <div>
              <h3 className="font-heading font-extrabold text-white text-lg mb-3 tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                THE PROBLEM
              </h3>
              <p className="text-sm leading-relaxed">{project.problem}</p>
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-white text-lg mb-3 tracking-wide flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0066FF]" />
                OUR APPROACH
              </h3>
              <p className="text-sm leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* How It Works */}
          <div>
            <h3 className="font-heading font-extrabold text-white text-xl mb-4 tracking-wide flex items-center gap-2">
              <Cpu size={20} className="text-[#38BDF8]" />
              HOW IT WORKS & ARCHITECTURE
            </h3>
            <p className="text-sm leading-relaxed text-[#94A3B8]">{project.documents.howItWorks}</p>
          </div>

          {/* Components Cards */}
          <div>
            <h3 className="font-heading font-extrabold text-white text-xl mb-4 tracking-wide flex items-center gap-2">
              <Settings size={20} className="text-[#38BDF8]" />
              INTEGRATED MECHANICAL MODULES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.components.map((comp, idx) => (
                <div key={idx} className="bg-[#101827] border border-[#1E293B] p-5 rounded-lg flex flex-col gap-2">
                  <span className="font-heading font-bold text-white text-sm uppercase tracking-wide">
                    {comp.name}
                  </span>
                  <p className="text-xs text-[#94A3B8] leading-relaxed">{comp.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Uniqueness & Applications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#0B1220] border border-[#1E293B] p-6 rounded-xl">
            <div>
              <h4 className="font-heading font-extrabold text-white text-base mb-3 tracking-wide flex items-center gap-2">
                <Sparkles size={16} className="text-[#38BDF8]" />
                WHY IT IS UNIQUE
              </h4>
              <p className="text-xs leading-relaxed">{project.uniqueness}</p>
            </div>
            <div>
              <h4 className="font-heading font-extrabold text-white text-base mb-3 tracking-wide flex items-center gap-2">
                <Globe size={16} className="text-[#38BDF8]" />
                REAL-WORLD APPLICATION
              </h4>
              <ul className="list-disc pl-4 text-xs space-y-1.5">
                {project.applications.map((app, idx) => (
                  <li key={idx}>{app}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Indian Context & Swachh / Sugamya details */}
          <div className="bg-[#101827] border-l-4 border-[#0066FF] p-6 rounded-r-lg">
            <h4 className="font-heading font-extrabold text-white text-base mb-2 tracking-wide flex items-center gap-2">
              <Flag size={16} className="text-[#38BDF8]" />
              RELEVANCE TO INDIAN SOCIETY
            </h4>
            <p className="text-xs leading-relaxed text-[#94A3B8]">{project.indiaImpact}</p>
          </div>

          {/* Documentation Preview Container */}
          <div id="documentation">
            <h3 className="font-heading font-extrabold text-white text-xl mb-4 tracking-wide flex items-center gap-2">
              <BookOpen size={20} className="text-[#38BDF8]" />
              PROJECT DOCUMENTATION
            </h3>
            <DocumentPreview project={project} />
          </div>

        </div>

        {/* RIGHT COLUMN: Specifications Panel (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Specifications Card */}
          <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-6 shadow-xl sticky top-28">
            <h3 className="font-heading font-extrabold text-white text-base mb-4 tracking-wider uppercase border-b border-[#1E293B] pb-3">
              TECHNICAL SPECIFICATIONS
            </h3>
            
            <div className="flex flex-col gap-4">
              {Object.entries(project.specifications).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] uppercase">
                    {key}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            {/* Config warning alert */}
            <div className="mt-6 p-4 rounded bg-[#050810] border border-[#1E293B] text-[11px] leading-relaxed text-[#94A3B8]">
              <strong>Note:</strong> Specifications are project-specific presets and can be fully customized by our mechanical engineers to match student design criteria.
            </div>

            {/* Quick CTAs */}
            <div className="flex flex-col gap-3 mt-6">
              <WhatsAppButton 
                customMessage={project.whatsappMessage} 
                label="DISCUSS THIS PROJECT"
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
