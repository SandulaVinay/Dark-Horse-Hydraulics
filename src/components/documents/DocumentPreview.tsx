import React from "react";
import type { Project } from "../../data/projects";
import { WhatsAppButton } from "../whatsapp/WhatsAppButton";
import { FileText, Lock } from "lucide-react";

interface DocumentPreviewProps {
  project: Project;
}

export const DocumentPreview: React.FC<DocumentPreviewProps> = ({ project }) => {
  const doc = project.documents;

  return (
    <div className="bg-[#0B1220] border border-[#1E293B] rounded-xl overflow-hidden shadow-2xl relative my-8">
      {/* Document Header */}
      <div className="bg-[#101827] border-b border-[#1E293B] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="text-[#38BDF8]" size={20} />
          <span className="font-heading font-semibold text-sm tracking-wide text-white uppercase">
            Project Documentation Preview
          </span>
        </div>
        <span className="bg-[#0066FF]/20 text-[#38BDF8] border border-[#0066FF]/40 text-xs px-2.5 py-1 rounded font-mono">
          Page 1-2 of [PROJECT DATA]
        </span>
      </div>

      {/* Document Content Sheet */}
      <div className="p-8 max-h-[600px] overflow-y-auto font-sans text-left text-sm leading-relaxed text-[#94A3B8] relative select-none">
        
        {/* Document Title */}
        <h3 className="text-xl font-heading font-extrabold text-white mb-6 text-center border-b border-[#1E293B] pb-4 uppercase tracking-wide">
          {doc.title}
        </h3>

        {/* Section 1: Overview */}
        <div className="mb-6">
          <h4 className="text-white font-heading font-bold text-base mb-2 tracking-wide text-[#38BDF8]">
            1. PROJECT OVERVIEW
          </h4>
          <p>{doc.overview}</p>
        </div>

        {/* Section 2: Problem Statement */}
        <div className="mb-6">
          <h4 className="text-white font-heading font-bold text-base mb-2 tracking-wide text-[#38BDF8]">
            2. PROBLEM STATEMENT
          </h4>
          <p>{doc.problemStatement}</p>
        </div>

        {/* Section 3: Objective */}
        <div className="mb-6">
          <h4 className="text-white font-heading font-bold text-base mb-2 tracking-wide text-[#38BDF8]">
            3. OBJECTIVE
          </h4>
          <p>{doc.objective}</p>
        </div>

        {/* Section 4: How It Works */}
        <div className="mb-6">
          <h4 className="text-white font-heading font-bold text-base mb-2 tracking-wide text-[#38BDF8]">
            4. METHODOLOGY & WORKING
          </h4>
          <p>{doc.howItWorks}</p>
        </div>

        {/* Section 5: Components */}
        <div className="mb-6">
          <h4 className="text-white font-heading font-bold text-base mb-2 tracking-wide text-[#38BDF8]">
            5. KEY COMPONENT ANALYSIS
          </h4>
          <p>{doc.componentsList}</p>
        </div>

        {/* Section 6: Innovation */}
        <div className="mb-6">
          <h4 className="text-white font-heading font-bold text-base mb-2 tracking-wide text-[#38BDF8]">
            6. SYSTEM INNOVATION & DOCKING
          </h4>
          <p>{doc.innovation}</p>
        </div>

        {/* Blur Fade Lock Overlay */}
        <div className="absolute bottom-0 left-0 w-full h-[320px] bg-gradient-to-t from-[#0B1220] via-[#0B1220]/90 to-transparent flex flex-col items-center justify-end p-8 text-center border-t border-transparent pointer-events-auto">
          {/* Backing Card for contrast */}
          <div className="bg-[#101827]/95 border border-[#1E293B] p-6 md:p-8 rounded-xl max-w-lg shadow-2xl backdrop-blur-md flex flex-col items-center gap-4 transform translate-y-4">
            <div className="w-12 h-12 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center text-[#38BDF8]">
              <Lock size={20} />
            </div>
            <div>
              <h5 className="font-heading font-extrabold text-white text-lg tracking-wide">
                WANT THE COMPLETE DOCUMENTATION?
              </h5>
              <p className="text-xs text-[#94A3B8] mt-1.5 leading-normal max-w-sm">
                Get full access to schematics, component selection formulas, CAD models, code, and presentation templates.
              </p>
            </div>
            <div className="w-full flex flex-col sm:flex-row gap-3 mt-2">
              <WhatsAppButton 
                customMessage={project.whatsappMessage}
                label="REQUEST FULL DOCUMENTATION" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
