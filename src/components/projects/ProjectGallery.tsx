import React, { useState } from "react";

interface ProjectGalleryProps {
  images: string[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(images[0]);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Primary Display */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-[#1E293B] bg-[#050810]">
        <img 
          src={activeImage} 
          alt="Prototype Detail View" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050810]/50 to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`w-24 h-16 rounded-lg overflow-hidden border transition-all duration-200 cursor-pointer ${
                activeImage === img 
                  ? "border-[#0066FF] ring-2 ring-[#0066FF]/20" 
                  : "border-[#1E293B] opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`thumbnail-${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
