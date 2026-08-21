import React, { useMemo, useState } from "react";
import { Calculator, CheckCircle2, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { projects } from "../../data/projects";
import { WhatsAppButton } from "../whatsapp/WhatsAppButton";

const branches = ["All", "Mechanical", "Automobile", "Hydraulics", "Electrical", "Electronics", "Renewable Energy", "Robotics", "IoT", "Automation"];
const levels = ["Any", "Beginner", "Intermediate", "Advanced"];

export const ProjectTools: React.FC = () => {
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("All");
  const [level, setLevel] = useState("Any");
  const [budget, setBudget] = useState(25000);
  const [team, setTeam] = useState(4);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return projects.filter((project) => {
      const branchMatch = branch === "All" || project.category.toLowerCase().includes(branch.toLowerCase()) || project.technologies.some((t) => t.toLowerCase().includes(branch.toLowerCase()));
      const textMatch = !q || `${project.title} ${project.description} ${project.category} ${project.technologies.join(" ")}`.toLowerCase().includes(q);
      return branchMatch && textMatch;
    });
  }, [search, branch]);

  const score = (project: typeof projects[number]) => {
    const complexity = project.technologies.length >= 5 ? "Advanced" : project.technologies.length >= 3 ? "Intermediate" : "Beginner";
    return level === "Any" || complexity === level;
  };

  const recommendations = filtered.filter(score).slice(0, 4);

  return (
    <section id="project-tools" className="py-20 px-6 bg-[#0B1220] border-y border-[#1E293B]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#38BDF8] text-xs font-mono">
            <Sparkles size={13} /> SMART PROJECT PLANNER
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-4">FIND. COMPARE. BUILD.</h2>
          <p className="text-[#94A3B8] max-w-2xl mx-auto mt-3">Search the project library, filter by engineering branch and difficulty, then send the right project brief directly to WhatsApp.</p>
        </div>

        <div className="grid xl:grid-cols-[1.5fr_1fr] gap-6">
          <div className="rounded-2xl border border-[#1E293B] bg-[#101827] p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="md:col-span-2 relative block">
                <Search className="absolute left-3 top-3.5 text-[#64748B]" size={17} />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search solar car, robotics, hydraulics..." className="w-full bg-[#050810] border border-[#1E293B] text-white rounded-lg py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-[#0066FF]" />
              </label>
              <label className="block">
                <span className="text-xs font-mono text-[#94A3B8]">ENGINEERING BRANCH</span>
                <select value={branch} onChange={(e) => setBranch(e.target.value)} className="mt-2 w-full bg-[#050810] border border-[#1E293B] text-white rounded-lg p-3 text-sm">
                  {branches.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="text-xs font-mono text-[#94A3B8]">DIFFICULTY</span>
                <select value={level} onChange={(e) => setLevel(e.target.value)} className="mt-2 w-full bg-[#050810] border border-[#1E293B] text-white rounded-lg p-3 text-sm">
                  {levels.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
            </div>

            <div className="flex items-center justify-between mt-7 mb-4">
              <h3 className="text-white font-heading font-bold flex items-center gap-2"><SlidersHorizontal size={16} /> RECOMMENDED PROJECTS</h3>
              <span className="text-xs text-[#64748B]">{recommendations.length} matches</span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {recommendations.map((project) => (
                <div key={project.slug} className="rounded-xl border border-[#1E293B] bg-[#050810] p-4 hover:border-[#0066FF] transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-white font-heading font-bold">{project.title}</h4>
                    <CheckCircle2 size={16} className="text-[#38BDF8] shrink-0" />
                  </div>
                  <p className="text-xs text-[#94A3B8] mt-2 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#0066FF]/10 text-[#60A5FA]">{project.category}</span>
                    <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-[#CBD5E1]">{project.technologies.length >= 5 ? "Advanced" : project.technologies.length >= 3 ? "Intermediate" : "Beginner"}</span>
                  </div>
                </div>
              ))}
            </div>
            {recommendations.length === 0 && <p className="text-sm text-[#94A3B8] py-8 text-center">No matching projects yet. Try another branch or search term.</p>}
          </div>

          <div className="rounded-2xl border border-[#1E293B] bg-[#101827] p-6">
            <h3 className="text-xl font-heading font-extrabold text-white flex items-center gap-2"><Calculator size={19} /> PROJECT PLANNER</h3>
            <p className="text-sm text-[#94A3B8] mt-2">Use this planning tool to prepare your enquiry. The budget shown is an illustrative planning input, not a quotation.</p>

            <div className="mt-7 space-y-6">
              <label className="block">
                <div className="flex justify-between text-xs font-mono text-[#94A3B8]"><span>PLANNING BUDGET</span><span className="text-white">₹{budget.toLocaleString("en-IN")}</span></div>
                <input type="range" min="5000" max="100000" step="5000" value={budget} onChange={(e) => setBudget(Number(e.target.value))} className="w-full mt-3" />
              </label>
              <label className="block">
                <div className="flex justify-between text-xs font-mono text-[#94A3B8]"><span>TEAM SIZE</span><span className="text-white">{team} students</span></div>
                <input type="range" min="1" max="10" value={team} onChange={(e) => setTeam(Number(e.target.value))} className="w-full mt-3" />
              </label>
              <div className="rounded-xl border border-[#1E293B] bg-[#050810] p-4 space-y-3">
                <div className="flex justify-between text-sm"><span className="text-[#94A3B8]">Project format</span><span className="text-white">Student prototype</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#94A3B8]">Team</span><span className="text-white">{team} students</span></div>
                <div className="flex justify-between text-sm"><span className="text-[#94A3B8]">Planning budget</span><span className="text-white">₹{budget.toLocaleString("en-IN")}</span></div>
              </div>
              <WhatsAppButton label="DISCUSS MY PROJECT" customMessage={`Hello Dark Horse Hydraulics, I want to discuss a student project. Team size: ${team}. Planning budget: ₹${budget.toLocaleString("en-IN")}. Please help me choose and customize a suitable prototype.`} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
