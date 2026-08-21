import React from "react";
import { Play, Image as ImageIcon, ExternalLink } from "lucide-react";

const demoImages = [
  {
    title: "Hydraulic Engineering Demo",
    url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85",
    source: "Demo image — replace with your project photo",
  },
  {
    title: "Engineering Prototype Workshop",
    url: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=85",
    source: "Demo image — replace with your project photo",
  },
  {
    title: "Prototype Development",
    url: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1200&q=85",
    source: "Demo image — replace with your project photo",
  },
];

export const MediaShowcase: React.FC = () => {
  return (
    <section id="media" className="py-20 px-6 bg-[#080D17] border-y border-[#1E293B]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0066FF]/10 border border-[#0066FF]/30 text-[#38BDF8] text-xs font-mono">
              <ImageIcon size={13} /> PROJECT MEDIA
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-4">
              SEE THE ENGINEERING IN ACTION
            </h2>
            <p className="text-[#94A3B8] max-w-2xl mt-3">
              Real project photos and videos will live here. For now, these demo assets show exactly how the finished media section will look.
            </p>
          </div>
          <span className="text-xs font-mono text-[#64748B] border border-[#1E293B] rounded-full px-3 py-2">
            DEMO MEDIA — REPLACE BEFORE LAUNCH
          </span>
        </div>

        <div className="grid lg:grid-cols-[1.35fr_1fr] gap-6">
          <div className="relative overflow-hidden rounded-2xl border border-[#1E293B] bg-[#101827] min-h-[360px] group">
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1600&q=85"
              alt="Demo engineering workshop"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent" />
            <div className="absolute left-6 right-6 bottom-6">
              <div className="flex items-center gap-2 text-[#38BDF8] text-xs font-mono mb-2">
                <ImageIcon size={14} /> PHOTO GALLERY
              </div>
              <h3 className="text-2xl font-heading font-bold text-white">Workshop & Prototype Fabrication</h3>
              <p className="text-sm text-[#CBD5E1] mt-1">Demo image — replace with your own fabrication photos.</p>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-[#1E293B] bg-[#101827] min-h-[360px]">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              controls
              preload="metadata"
              poster="https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?auto=format&fit=crop&w=1200&q=85"
            >
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
              Your browser does not support the video element.
            </video>
            <div className="absolute top-5 left-5 pointer-events-none inline-flex items-center gap-2 px-3 py-2 rounded-full bg-black/70 text-white text-xs font-mono">
              <Play size={13} /> DEMO VIDEO
            </div>
            <div className="absolute bottom-5 left-5 right-5 pointer-events-none">
              <h3 className="text-xl font-heading font-bold text-white">Working Prototype Video</h3>
              <p className="text-xs text-[#CBD5E1] mt-1">Replace this demo with a 30–60 second project walkthrough.</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {demoImages.map((image) => (
            <div key={image.title} className="group rounded-xl overflow-hidden border border-[#1E293B] bg-[#101827]">
              <div className="aspect-video overflow-hidden">
                <img src={image.url} alt={image.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-4">
                <h4 className="font-heading font-bold text-white">{image.title}</h4>
                <p className="text-xs text-[#64748B] mt-1">{image.source}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-[#1E293B] bg-[#0B1220] p-5">
          <div>
            <p className="text-white font-heading font-bold">Have a project you want to build?</p>
            <p className="text-sm text-[#94A3B8] mt-1">Use the project finder to turn your idea into a prototype.</p>
          </div>
          <a href="#find-project" className="btn-primary inline-flex items-center gap-2 whitespace-nowrap">
            START PROJECT DISCOVERY <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </section>
  );
};
