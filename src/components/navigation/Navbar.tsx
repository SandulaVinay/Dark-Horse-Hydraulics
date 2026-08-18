import React, { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Projects", path: "/", hash: "#projects" },
    { label: "How We Work", path: "/", hash: "#how-we-work" },
    { label: "Find Project", path: "/find-project", hash: "" },
    { label: "About", path: "/", hash: "#about" },
  ];

  const handleNavClick = (item: typeof navItems[number]) => {
    setIsOpen(false);
    navigate(item.path);
    if (item.hash) {
      setTimeout(() => {
        const el = document.querySelector(item.hash);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#05070b]/78 px-5 py-3 backdrop-blur-2xl md:px-8">
      <div className="mx-auto flex max-w-[1380px] items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="group flex cursor-pointer items-center gap-3 bg-transparent p-0 text-left"
          aria-label="Go to Dark Horse Hydraulics home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/8 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all duration-300 group-hover:border-blue-300/40 group-hover:bg-blue-500/12 group-hover:shadow-[0_0_28px_rgba(59,130,246,0.18)]">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-[#60A5FA] transition-transform duration-300 group-hover:scale-105" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 18c2-2.5 5.5-3.5 8-2.5s4 3 6.5 2" />
              <path d="M12 12c.5-1.5 2-4.5 4-5.5s4 .5 4 2.5c0 2-2 5-6 6" />
              <path d="M9 13.5C7.5 12 5 8 5 5.5s1.5-2.5 3-2.5 4 2 5 4.5" />
              <path d="M12 6c.5-1.5 2-2 3.5-1.5s2 1.5 2 3" />
              <path d="M6 21h12" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-heading text-[17px] font-extrabold tracking-[0.16em] text-white transition-colors duration-300 group-hover:text-[#DCEBFF] md:text-[18px]">DARK HORSE</span>
            <span className="-mt-0.5 font-mono text-[9px] uppercase tracking-[0.22em] text-slate-500">Hydraulics & Prototypes</span>
          </div>
        </button>

        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={`border-none bg-transparent font-heading text-[13px] font-medium tracking-[0.08em] transition-colors duration-200 ${
                currentPath === item.path && item.path !== "/"
                  ? "text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate("/find-project")}
          className="hidden items-center gap-2 rounded-full border border-blue-300/20 bg-white/[0.04] px-4 py-2.5 font-heading text-[11px] font-semibold tracking-[0.15em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-all duration-300 hover:border-blue-300/50 hover:bg-blue-500/10 hover:shadow-[0_10px_30px_rgba(37,99,235,0.16)] md:flex"
        >
          START YOUR PROJECT
          <ArrowRight size={14} />
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg border border-white/10 bg-white/[0.03] p-2 text-slate-300 transition-colors hover:text-white md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute left-0 top-full w-full border-b border-white/10 bg-[#05070b]/95 px-5 py-5 backdrop-blur-2xl md:hidden">
          <div className="mx-auto flex max-w-[1380px] flex-col gap-3">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="w-full rounded-xl border border-transparent bg-white/[0.02] px-4 py-3 text-left font-heading text-base font-semibold text-slate-300 transition-colors hover:border-white/10 hover:text-white"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                navigate("/find-project");
              }}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-blue-300/20 bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-3 font-heading text-sm font-semibold tracking-[0.1em] text-white"
            >
              START YOUR PROJECT
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
