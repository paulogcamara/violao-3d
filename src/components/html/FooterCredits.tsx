import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function FooterCredits() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#footer",
        start: "top center",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (containerRef.current) {
            const opacity = Math.min(self.progress * 3, 1);
            containerRef.current.style.opacity = String(opacity);
            containerRef.current.style.transform = `translateY(${(1 - opacity) * 30}px)`;
          }
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="text-center px-8 opacity-0">
      <div className="w-20 h-px bg-gradient-to-r from-transparent via-warm-400/20 to-transparent mx-auto mb-8" />

      <h2 className="font-serif text-warm-200 text-3xl md:text-4xl tracking-wide">
        Obrigado por explorar
      </h2>

      <p className="text-white/30 text-sm mt-4 font-light max-w-md mx-auto leading-relaxed">
        Uma experiencia construida com React Three Fiber, GSAP ScrollTrigger,
        sintese Karplus-Strong e paixao por interfaces imersivas.
      </p>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <span className="px-3 py-1 rounded-full text-[10px] text-white/25 border border-white/8 tracking-wider">
          React + TypeScript
        </span>
        <span className="px-3 py-1 rounded-full text-[10px] text-white/25 border border-white/8 tracking-wider">
          Three.js / R3F
        </span>
        <span className="px-3 py-1 rounded-full text-[10px] text-white/25 border border-white/8 tracking-wider">
          GSAP ScrollTrigger
        </span>
        <span className="px-3 py-1 rounded-full text-[10px] text-white/25 border border-white/8 tracking-wider">
          Web Audio API
        </span>
        <span className="px-3 py-1 rounded-full text-[10px] text-white/25 border border-white/8 tracking-wider">
          Tailwind CSS
        </span>
      </div>

      <div className="flex gap-6 justify-center mt-10">
        <a href="#" className="px-6 py-2.5 border border-warm-400/30 text-warm-300 rounded-full text-sm tracking-wider hover:bg-warm-400/10 transition-colors pointer-events-auto">
          GitHub
        </a>
        <a href="#" className="px-6 py-2.5 border border-warm-400/30 text-warm-300 rounded-full text-sm tracking-wider hover:bg-warm-400/10 transition-colors pointer-events-auto">
          LinkedIn
        </a>
        <a href="#" className="px-6 py-2.5 bg-warm-400/20 text-warm-200 rounded-full text-sm tracking-wider hover:bg-warm-400/30 transition-colors pointer-events-auto">
          Portfolio
        </a>
      </div>

      <div className="mt-12 text-white/10 text-xs font-light">
        <p>Modelo 3D procedural &bull; Audio sintetizado via Karplus-Strong &bull; 2026</p>
      </div>
    </div>
  );
}
