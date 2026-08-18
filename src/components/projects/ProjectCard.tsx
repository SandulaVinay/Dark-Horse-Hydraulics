import React from "react";
import type { Project } from "../../data/projects";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  onExplore: (slug: string) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onExplore }) => {
  return (
    <div 
      onClick={() => onExplore(project.slug)}
      className="group bg-[#101827] border border-[#1E293B] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-[#0066FF] hover:translate-y-[-4px] hover:shadow-[0_10px_30px_rgba(0,102,255,0.15)] flex flex-col justify-between"
    >
      <div>
        {/* Project Thumbnail Image */}
        <div className="relative aspect-video overflow-hidden border-b border-[#1E293B]">
          <img 
            src={project.gallery[0] || "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"} 
            alt={project.title} 
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#101827] via-transparent to-transparent opacity-60" />
          <span className="absolute bottom-3 left-4 bg-[#050810] border border-[#1E293B] text-[#38BDF8] text-[10px] font-mono tracking-wider px-2 py-0.5 rounded uppercase">
            {project.category}
          </span>
        </div>

        {/* Text Details */}
        <div className="p-6">
          <h3 className="font-heading font-extrabold text-xl text-white group-hover:text-[#38BDF8] transition-colors duration-200 line-clamp-1">
            {project.title}
          </h3>
          <p className="text-sm text-[#94A3B8] leading-relaxed mt-2 line-clamp-3">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.technologies.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx} 
                className="bg-[#050810] border border-[#1E293B] text-white text-[10px] font-mono px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-[10px] font-mono text-[#94A3B8] self-center ml-1">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>

      {/* CTA Footer */}
      <div className="px-6 pb-6 pt-2 border-t border-[#1E293B]/40 flex justify-end">
        <span className="inline-flex items-center gap-1 text-xs font-heading font-bold text-[#0066FF] group-hover:text-[#38BDF8] group-hover:gap-2 transition-all duration-300">
          EXPLORE PROJECT
          <ArrowRight size={14} />
        </span>
      </div>
    </div>
  );
};
