import React, { useState } from "react";
import type { Project } from "../../data/projects";
import { projects } from "../../data/projects";
import { siteConfig } from "../../data/siteConfig";
import { ArrowRight, RotateCcw, Check, Sparkles, Send, FileText } from "lucide-react";

interface ProjectDiscoveryProps {
  onSelectProject: (slug: string) => void;
}

export const ProjectDiscovery: React.FC<ProjectDiscoveryProps> = ({ onSelectProject }) => {
  const [step, setStep] = useState(1);
  const [interest, setInterest] = useState<string | null>(null);
  const [projectType, setProjectType] = useState<string | null>(null);

  // States for custom idea form
  const [isCustomPath, setIsCustomPath] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customDomain, setCustomDomain] = useState("Mechanical");
  const [customDesc, setCustomDesc] = useState("");
  const [customReqs, setCustomReqs] = useState("");

  const interests = [
    "Mechanical",
    "Automobile",
    "Hydraulics",
    "Electrical",
    "Electronics",
    "Renewable Energy",
    "Robotics",
    "IoT",
    "Automation"
  ];

  const projectTypes = [
    "Final Year Project",
    "Diploma Project",
    "Mini Project",
    "Prototype",
    "Research Project"
  ];

  const handleReset = () => {
    setStep(1);
    setInterest(null);
    setProjectType(null);
    setIsCustomPath(false);
    setCustomTitle("");
    setCustomDesc("");
    setCustomReqs("");
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `Hello Dark Horse Hydraulics,

I have a custom project idea I would like to design and prototype:
- *Project Title:* ${customTitle || "[PROJECT TITLE]"}
- *Engineering Domain:* ${customDomain}
- *Description:* ${customDesc || "[DESCRIPTION]"}
- *Key Requirements:* ${customReqs || "[REQUIREMENTS]"}

Please guide me through the engineering feasibility, CAD modeling, and physical prototyping process.`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodedText}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  // Rule-based recommendation engine
  const getRecommendedProjects = (): Project[] => {
    if (!interest) return [];

    return projects.filter((project) => {
      const matchCategory = project.category.toLowerCase().includes(interest.toLowerCase());
      const matchTags = project.technologies.some((tech) =>
        tech.toLowerCase().includes(interest.toLowerCase())
      );
      
      let generalMatch = false;
      if (interest === "Automobile" && project.slug === "solar-car") generalMatch = true;
      if (interest === "Hydraulics" && project.slug === "hydraulics") generalMatch = true;
      if (interest === "Robotics" && project.slug === "robotics") generalMatch = true;
      if (interest === "Automation" && (project.slug === "automatic-waste-picker" || project.slug === "robotics" || project.slug === "automatic-staircase-mobility")) generalMatch = true;
      if (interest === "Mechanical" && (project.slug === "automatic-staircase-mobility" || project.slug === "hydraulics" || project.slug === "solar-car")) generalMatch = true;
      if (interest === "Renewable Energy" && (project.slug === "solar-car" || project.slug === "renewable-energy")) generalMatch = true;
      if (interest === "Electrical" && (project.slug === "solar-car" || project.slug === "renewable-energy" || project.slug === "robotics")) generalMatch = true;
      if (interest === "Electronics" && (project.slug === "robotics" || project.slug === "automatic-waste-picker")) generalMatch = true;
      if (interest === "IoT" && (project.slug === "robotics" || project.slug === "solar-car")) generalMatch = true;

      return matchCategory || matchTags || generalMatch;
    });
  };

  const recommended = getRecommendedProjects();

  return (
    <div id="find-project" className="py-20 px-6 bg-[#0B1220] border-y border-[#1E293B] relative overflow-hidden blueprint-grid">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050810]/80 via-transparent to-[#050810]/80 pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#38BDF8] text-xs font-mono mb-4">
            <Sparkles size={12} />
            GUIDED DISCOVERY WIZARD
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight">
            {isCustomPath ? "ELABORATE YOUR PROJECT IDEA" : "FIND YOUR PERFECT PROJECT"}
          </h2>
          <p className="text-[#94A3B8] max-w-xl mx-auto mt-3 text-base">
            {isCustomPath 
              ? "Tell our engineering team about your concept. We will calculate load criteria, sizing, and help you prototype it."
              : "Select your interest and project type to view matching physical engineering prototypes we help design and build."
            }
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="bg-[#101827] border border-[#1E293B] rounded-xl p-8 shadow-2xl relative">
          
          {/* Step Indicator */}
          <div className="flex justify-between items-center mb-8 border-b border-[#1E293B] pb-6">
            <div className="flex gap-4">
              {isCustomPath ? (
                <span className="text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-[#0066FF] text-white">
                  CUSTOM IDEA DOCK
                </span>
              ) : (
                <>
                  <span className={`text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded transition-colors duration-300 ${
                    step >= 1 ? "bg-[#0066FF] text-white" : "bg-[#050810] text-[#94A3B8]"
                  }`}>
                    01. INTERESTS
                  </span>
                  <span className={`text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded transition-colors duration-300 ${
                    step >= 2 ? "bg-[#0066FF] text-white" : "bg-[#050810] text-[#94A3B8]"
                  }`}>
                    02. PROJECT TYPE
                  </span>
                  <span className={`text-xs font-mono font-bold tracking-wider px-2.5 py-1 rounded transition-colors duration-300 ${
                    step >= 3 ? "bg-[#0066FF] text-white" : "bg-[#050810] text-[#94A3B8]"
                  }`}>
                    03. RECOMMENDED
                  </span>
                </>
              )}
            </div>
            {(step > 1 || isCustomPath) && (
              <button 
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-[#94A3B8] hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
              >
                <RotateCcw size={12} /> Reset to Start
              </button>
            )}
          </div>

          {/* CUSTOM IDEA PATH FORM */}
          {isCustomPath ? (
            <form onSubmit={handleCustomSubmit} className="animate-fade-in text-left flex flex-col gap-5">
              
              {/* Domain Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono tracking-widest text-[#94A3B8] uppercase">
                  Engineering Domain / Branch *
                </label>
                <select
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  className="bg-[#050810] border border-[#1E293B] text-white rounded p-3 text-sm focus:outline-none focus:border-[#0066FF] font-sans"
                  required
                >
                  {interests.map((branch, idx) => (
                    <option key={idx} value={branch}>{branch}</option>
                  ))}
                </select>
              </div>

              {/* Title Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono tracking-widest text-[#94A3B8] uppercase">
                  Project Title / Working Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Dual-Axis Solar Tracker Irrigation Pump"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="bg-[#050810] border border-[#1E293B] text-white rounded p-3 text-sm focus:outline-none focus:border-[#0066FF]"
                  required
                />
              </div>

              {/* Description Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono tracking-widest text-[#94A3B8] uppercase">
                  Elaborate Your Project Idea (What problem does it solve?) *
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your concept in detail. Mention what physical movement or mechanization you expect."
                  value={customDesc}
                  onChange={(e) => setCustomDesc(e.target.value)}
                  className="bg-[#050810] border border-[#1E293B] text-white rounded p-3 text-sm focus:outline-none focus:border-[#0066FF] font-sans resize-none"
                  required
                />
              </div>

              {/* Key Components Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-mono tracking-widest text-[#94A3B8] uppercase">
                  Key Requirements / Components (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g., Hydraulic Cylinder, Arduino Mega, 12V Li-Ion battery pack, Stepper motor drives..."
                  value={customReqs}
                  onChange={(e) => setCustomReqs(e.target.value)}
                  className="bg-[#050810] border border-[#1E293B] text-white rounded p-3 text-sm focus:outline-none focus:border-[#0066FF] font-sans resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-between items-center border-t border-[#1E293B] pt-6">
                <button
                  type="button"
                  onClick={() => setIsCustomPath(false)}
                  className="btn-secondary py-2.5 px-6 text-xs w-full sm:w-auto"
                >
                  Back to Recommended Lists
                </button>
                <button
                  type="submit"
                  className="btn-primary py-2.5 px-6 text-xs w-full sm:w-auto justify-center"
                >
                  SUBMIT SPECIFICATIONS ON WHATSAPP
                  <Send size={14} />
                </button>
              </div>

            </form>
          ) : (
            /* STANDARD GUIDED RECOMMENDATION PATH */
            <>
              {/* STEP 1: Select Interest */}
              {step === 1 && (
                <div className="animate-fade-in">
                  <h3 className="font-heading font-extrabold text-white text-xl mb-6 text-left">
                    What fields of engineering are you interested in?
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {interests.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setInterest(item);
                          setStep(2);
                        }}
                        className={`py-4 px-4 rounded-lg border text-left font-heading font-bold transition-all duration-300 cursor-pointer ${
                          interest === item 
                            ? "bg-[#0066FF] border-[#1683FF] text-white" 
                            : "bg-[#050810] border-[#1E293B] text-[#94A3B8] hover:border-[#0066FF] hover:text-white"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{item}</span>
                          <ArrowRight size={14} className="opacity-50" />
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* CUSTOM IDEA OPTION */}
                  <div className="mt-8 border-t border-[#1E293B]/60 pt-6 flex flex-col items-center">
                    <p className="text-xs text-[#94A3B8] mb-3 font-mono">
                      Don't see your specific branch, or have a pre-defined concept?
                    </p>
                    <button
                      onClick={() => setIsCustomPath(true)}
                      className="btn-secondary py-2.5 px-6 text-xs tracking-wider flex items-center gap-2 border-[#0066FF]/30 hover:border-[#0066FF]/70 text-white"
                    >
                      <FileText size={14} className="text-[#38BDF8]" />
                      ELABORATE MY OWN PROJECT IDEA
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Select Project Type */}
              {step === 2 && (
                <div className="animate-fade-in">
                  <h3 className="font-heading font-extrabold text-white text-xl mb-6 text-left">
                    What type of prototype project are you building?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {projectTypes.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setProjectType(item);
                          setStep(3);
                        }}
                        className={`py-4 px-6 rounded-lg border text-left font-heading font-bold transition-all duration-300 cursor-pointer ${
                          projectType === item 
                            ? "bg-[#0066FF] border-[#1683FF] text-white" 
                            : "bg-[#050810] border-[#1E293B] text-[#94A3B8] hover:border-[#0066FF] hover:text-white"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{item}</span>
                          <Check size={16} className="text-[#38BDF8]" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Recommended Results */}
              {step === 3 && (
                <div className="animate-fade-in text-left">
                  <h3 className="font-heading font-extrabold text-white text-xl mb-4">
                    Recommended Prototypes for Your Requirements
                  </h3>
                  <p className="text-xs text-[#94A3B8] mb-6">
                    Showing matching projects for <span className="text-[#38BDF8] font-semibold">{interest}</span> / <span className="text-[#38BDF8] font-semibold">{projectType}</span>.
                  </p>

                  {recommended.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {recommended.map((project, idx) => (
                        <div 
                          key={idx} 
                          className="bg-[#050810] border border-[#1E293B] rounded-lg p-5 flex flex-col justify-between hover:border-[#0066FF] transition-all duration-300"
                        >
                          <div>
                            <div className="text-xs font-mono text-[#38BDF8] mb-1">{project.category}</div>
                            <h4 className="font-heading font-bold text-white text-lg mb-2">{project.title}</h4>
                            <p className="text-xs text-[#94A3B8] leading-relaxed line-clamp-3 mb-4">{project.description}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => onSelectProject(project.slug)}
                              className="btn-primary py-2 px-4 text-xs font-semibold"
                            >
                              Explore Project
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-[#050810] border border-[#1E293B] rounded-lg">
                      <p className="text-[#94A3B8] mb-4">We have customized physical prototypes matching your exact request.</p>
                      <a
                        href={`https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=Hello%20Dark%20Horse%20Hydraulics%2C%20I%20am%20looking%20for%20a%20project%20in%20${interest}%20(${projectType}).%20Can%20you%20help%20me%20design%20and%20develop%20it%3F`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary py-2.5 px-6 inline-flex"
                      >
                        DISCUSS CUSTOM PROTOTYPE ON WHATSAPP
                      </a>
                    </div>
                  )}

                  <div className="mt-8 border-t border-[#1E293B] pt-6 flex justify-end">
                    <button
                      onClick={handleReset}
                      className="btn-secondary py-2 px-4 text-xs font-semibold"
                    >
                      Start Search Again
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};
