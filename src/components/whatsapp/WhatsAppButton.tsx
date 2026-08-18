import React from "react";
import { siteConfig } from "../../data/siteConfig";

interface WhatsAppButtonProps {
  customMessage?: string;
  isFloating?: boolean;
  label?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  customMessage,
  isFloating = false,
  label = "Discuss on WhatsApp",
}) => {
  const defaultMessage = "Hello Dark Horse Hydraulics, I am interested in building an engineering prototype. I would like to discuss my project requirements.";
  const encodedText = encodeURIComponent(customMessage || defaultMessage);
  const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodedText}`;

  if (isFloating) {
    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_rgba(37,211,102,0.6)] cursor-pointer"
        aria-label="Contact on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.66.986 3.288 1.488 4.605 1.489 5.425.002 9.845-4.417 9.848-9.842.002-2.628-1.02-5.1-2.877-6.958-1.856-1.856-4.329-2.879-6.957-2.88-5.427 0-9.848 4.417-9.85 9.844-.001 2.015.549 3.58 1.47 5.016l-.997 3.637 3.758-.986zm11.233-6.417c-.302-.152-1.793-.884-2.072-.985-.278-.102-.48-.153-.68.152-.2.304-.775.98-.95 1.18-.175.202-.35.228-.652.076-.301-.15-1.272-.47-2.422-1.493-.895-.8-1.5-1.787-1.675-2.09-.175-.303-.019-.467.132-.618.136-.135.302-.35.453-.526.15-.177.202-.303.302-.505.101-.202.051-.38-.025-.531-.076-.152-.68-1.64-.932-2.247-.245-.589-.494-.509-.68-.519-.175-.01-.376-.01-.577-.01-.201 0-.527.076-.803.38-.276.304-1.054 1.03-1.054 2.513s1.08 2.916 1.23 3.12c.15.202 2.125 3.245 5.15 4.553.72.31 1.28.497 1.717.637.724.23 1.383.197 1.903.12.58-.087 1.794-.734 2.046-1.443.251-.708.251-1.317.176-1.442-.076-.126-.277-.202-.579-.354z" />
        </svg>
      </a>
    );
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-secondary flex items-center justify-center gap-3 bg-[#25D366]/10 border-[#25D366]/40 hover:border-[#25D366] text-[#25D366] hover:bg-[#25D366]/20 transition-all duration-300 py-3 px-6 rounded-lg font-heading font-semibold tracking-wide text-sm cursor-pointer"
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-5 h-5"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.454L0 24zm6.59-4.846c1.66.986 3.288 1.488 4.605 1.489 5.425.002 9.845-4.417 9.848-9.842.002-2.628-1.02-5.1-2.877-6.958-1.856-1.856-4.329-2.879-6.957-2.88-5.427 0-9.848 4.417-9.85 9.844-.001 2.015.549 3.58 1.47 5.016l-.997 3.637 3.758-.986zm11.233-6.417c-.302-.152-1.793-.884-2.072-.985-.278-.102-.48-.153-.68.152-.2.304-.775.98-.95 1.18-.175.202-.35.228-.652.076-.301-.15-1.272-.47-2.422-1.493-.895-.8-1.5-1.787-1.675-2.09-.175-.303-.019-.467.132-.618.136-.135.302-.35.453-.526.15-.177.202-.303.302-.505.101-.202.051-.38-.025-.531-.076-.152-.68-1.64-.932-2.247-.245-.589-.494-.509-.68-.519-.175-.01-.376-.01-.577-.01-.201 0-.527.076-.803.38-.276.304-1.054 1.03-1.054 2.513s1.08 2.916 1.23 3.12c.15.202 2.125 3.245 5.15 4.553.72.31 1.28.497 1.717.637.724.23 1.383.197 1.903.12.58-.087 1.794-.734 2.046-1.443.251-.708.251-1.317.176-1.442-.076-.126-.277-.202-.579-.354z" />
      </svg>
      {label}
    </a>
  );
};
