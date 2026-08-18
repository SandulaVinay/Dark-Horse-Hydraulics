import React from "react";
import { projects } from "../../data/projects";
import { ProjectCard } from "./ProjectCard";

interface ProjectGridProps {
  onExploreProject: (slug: string) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ onExploreProject }) => {
  return (
    <div id="projects" className="py-24 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="text-xs font-mono font-bold tracking-widest text-[#0066FF] uppercase">
          OUR PROJECT LAB
        </span>
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight mt-2">
          ENGINEERING PROTOTYPES
        </h2>
        <p className="text-sm text-[#94A3B8] max-w-xl mx-auto mt-3 leading-relaxed">
          Explore physical prototypes built by Dark Horse Hydraulics. Each project includes custom mechanical engineering, control circuits, and documentation.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, idx) => (
          <ProjectCard 
            key={idx} 
            project={project} 
            onExplore={onExploreProject} 
          />
        ))}
      </div>
    </div>
  );
};
