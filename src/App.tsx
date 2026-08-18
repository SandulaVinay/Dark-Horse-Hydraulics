import { useState, useEffect } from "react";
import { Navbar } from "./components/navigation/Navbar";
import { Homepage } from "./components/sections/Homepage";
import { ProjectDetails } from "./components/projects/ProjectDetails";
import { ProjectDiscovery } from "./components/projects/ProjectDiscovery";
import { WhatsAppButton } from "./components/whatsapp/WhatsAppButton";
import { projects } from "./data/projects";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Sync state with back/forward history buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigate = (path: string) => {
    if (window.location.pathname !== path) {
      window.history.pushState(null, "", path);
      setCurrentPath(path);
    }
  };

  // Resolve matching route
  const getRouteContent = () => {
    if (currentPath.startsWith("/projects/")) {
      const slug = currentPath.replace("/projects/", "");
      const project = projects.find((p) => p.slug === slug);
      if (project) {
        return (
          <ProjectDetails 
            project={project} 
            onBack={() => navigate("/")} 
          />
        );
      }
    }

    if (currentPath === "/find-project") {
      return (
        <div className="py-12 bg-[#050810] min-h-[85vh] flex items-center justify-center">
          <div className="w-full">
            <ProjectDiscovery onSelectProject={(slug) => navigate(`/projects/${slug}`)} />
          </div>
        </div>
      );
    }

    // Default route: Homepage
    return (
      <Homepage 
        onSelectProject={(slug) => navigate(`/projects/${slug}`)} 
        onNavigateToFinder={() => navigate("/find-project")}
      />
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#050810] text-[#94A3B8]">
      {/* Dynamic SEO Meta Title Tag Update per Page */}
      <SEOHeader currentPath={currentPath} />

      {/* Navigation */}
      <Navbar currentPath={currentPath} navigate={navigate} />

      {/* Body content */}
      <main className="flex-grow">
        {getRouteContent()}
      </main>

      {/* Footer */}
      <footer className="bg-[#050810] border-t border-[#1E293B] py-8 text-center text-xs text-[#94A3B8] font-mono">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            &copy; {new Date().getFullYear()} DARK HORSE HYDRAULICS. All rights reserved.
          </div>
          <div className="flex gap-6 text-[10px]">
            <span className="hover:text-white transition-colors duration-200 cursor-pointer">TERMS OF SERVICE</span>
            <span className="hover:text-white transition-colors duration-200 cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-white transition-colors duration-200 cursor-pointer">ENGINEERING DESIGN CENTER</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Widget */}
      <WhatsAppButton isFloating={true} />
    </div>
  );
}

// Sub-component to handle head titles dynamically for SEO
const SEOHeader: React.FC<{ currentPath: string }> = ({ currentPath }) => {
  useEffect(() => {
    let title = "Dark Horse Hydraulics | Premium Student Engineering Prototypes";
    let desc = "We turn student engineering ideas into physical working prototypes. Explore solar car, hydraulics, robotics, and automatic accessibility projects.";

    if (currentPath.startsWith("/projects/")) {
      const slug = currentPath.replace("/projects/", "");
      const project = projects.find((p) => p.slug === slug);
      if (project) {
        title = `${project.title} | Dark Horse Hydraulics`;
        desc = project.description;
      }
    } else if (currentPath === "/find-project") {
      title = "Find Your Project | Dark Horse Hydraulics";
      desc = "Discover and match your mechanical, robotics, electronics, and solar project ideas using our guided recommendation engine.";
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", desc);
    }
  }, [currentPath]);

  return null;
};

export default App;
