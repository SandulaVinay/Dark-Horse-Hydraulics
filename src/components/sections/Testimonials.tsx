import React from "react";
import { Quote } from "lucide-react";

const testimonials = [
  { name: "Student Project Showcase", role: "Demo testimonial placeholder", text: "Replace this card with a genuine student testimonial once you have completed projects and permission to publish feedback." },
  { name: "Engineering Faculty", role: "Demo testimonial placeholder", text: "Use this space for authentic faculty feedback about prototype quality, documentation and technical support." },
  { name: "Project Team", role: "Demo testimonial placeholder", text: "Add a real team story here describing the problem, prototype journey and final demonstration." },
];

export const Testimonials: React.FC = () => (
  <section id="testimonials" className="py-20 px-6 bg-[#0B1220] border-y border-[#1E293B]">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <span className="text-xs font-mono tracking-widest text-[#38BDF8]">SOCIAL PROOF</span>
        <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-white mt-3">WHAT OUR STUDENTS SAY</h2>
        <p className="text-[#94A3B8] max-w-2xl mx-auto mt-3">These are clearly marked placeholders until real customer feedback is available.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-xl border border-[#1E293B] bg-[#101827] p-6">
            <Quote size={22} className="text-[#38BDF8]" />
            <p className="text-[#CBD5E1] text-sm leading-6 mt-5">“{item.text}”</p>
            <div className="mt-6 pt-4 border-t border-[#1E293B]">
              <p className="text-white font-heading font-bold text-sm">{item.name}</p>
              <p className="text-[#64748B] text-xs mt-1">{item.role}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);
