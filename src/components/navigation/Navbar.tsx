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

  const handleNavClick = (item: typeof navItems[0]) => {
    setIsOpen(false);
    navigate(item.path);
    if (item.hash) {
      setTimeout(() => {
        const el = document.querySelector(item.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#050810]/90 backdrop-blur-md border-b border-[#1E293B] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => navigate("/")} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Blue horse-head SVG */}
          <div className="w-10 h-10 rounded-lg bg-[#0066FF]/10 border border-[#0066FF]/30 flex items-center justify-center transition-all duration-300 group-hover:border-[#0066FF] group-hover:shadow-[0_0_15px_rgba(0,102,255,0.4)]">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-7 h-7 text-[#1683FF] transition-transform duration-300 group-hover:scale-110"
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M4 18c2-2.5 5.5-3.5 8-2.5s4 3 6.5 2" />
              <path d="M12 12c.5-1.5 2-4.5 4-5.5s4 .5 4 2.5c0 2-2 5-6 6" />
              <path d="M9 13.5C7.5 12 5 8 5 5.5s1.5-2.5 3-2.5 4 2 5 4.5" />
              <path d="M12 6c.5-1.5 2-2 3.5-1.5s2 1.5 2 3" />
              <path d="M6 21h12" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold tracking-wider text-xl text-white group-hover:text-[#38BDF8] transition-colors duration-300">
              DARK HORSE
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[#94A3B8] -mt-1 uppercase">
              Hydraulics & Prototypes
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleNavClick(item)}
              className={`font-heading font-medium text-sm tracking-wide transition-colors duration-200 bg-transparent border-none cursor-pointer ${
                currentPath === item.path 
                  ? "text-[#38BDF8]" 
                  : "text-[#94A3B8] hover:text-white"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <button 
            onClick={() => navigate("/find-project")}
            className="btn-primary flex items-center gap-2"
          >
            START YOUR PROJECT
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-[#94A3B8] hover:text-white bg-transparent border-none cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-[73px] left-0 w-full bg-[#050810] border-b border-[#1E293B] px-6 py-6 flex flex-col gap-6 animate-fade-in z-50">
          <div className="flex flex-col gap-4">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item)}
                className="w-full text-left font-heading font-semibold text-lg text-[#94A3B8] hover:text-[#38BDF8] py-2 bg-transparent border-none cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              setIsOpen(false);
              navigate("/find-project");
            }}
            className="btn-primary w-full justify-center py-3"
          >
            START YOUR PROJECT
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </nav>
  );
};
