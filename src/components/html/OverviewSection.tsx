import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function OverviewSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#overview",
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          if (!containerRef.current) return;
          const p = self.progress;
          const fadeIn = Math.min(p * 3, 1);
          const fadeOut = Math.min((1 - p) * 3, 1);
          containerRef.current.style.opacity = String(Math.min(fadeIn, fadeOut));
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center opacity-0">
      {/* Texto na ESQUERDA */}
      <div className="ml-[6%] md:ml-[8%] lg:ml-[10%] max-w-lg">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-warm-100 tracking-wide leading-tight">
          O Violao
          <br />
          Classico
        </h2>

        <p className="mt-5 text-white/45 text-sm md:text-base leading-relaxed font-light max-w-md">
          Seis cordas. Dezenove trastes. Seculos de historia.
          O violao classico e um dos instrumentos mais versateis do mundo,
          capaz de expressar desde a melancolia do fado portugues
          ate a complexidade de uma fuga de Bach.
        </p>

        {/* Stats em boxes */}
        <div className="mt-8 grid grid-cols-3 gap-3">
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-warm-400 font-serif text-3xl">6</div>
            <div className="text-white/40 text-[11px] mt-1 tracking-wider">Cordas</div>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-warm-400 font-serif text-3xl">19</div>
            <div className="text-white/40 text-[11px] mt-1 tracking-wider">Trastes</div>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-warm-400 font-serif text-3xl">~45</div>
            <div className="text-white/40 text-[11px] mt-1 tracking-wider">Notas unicas</div>
          </div>
        </div>

        {/* Afinacao padrao - box destacada com shadow */}
        <div className="mt-4 bg-warm-400/[0.06] border border-warm-400/15 rounded-xl p-5 shadow-lg shadow-warm-400/5 backdrop-blur-sm">
          <div className="text-warm-300/60 text-[10px] tracking-[0.3em] uppercase mb-2">
            Afinacao padrao
          </div>
          <div className="flex gap-3 justify-center">
            {["E2", "A2", "D3", "G3", "B3", "E4"].map((note) => (
              <span
                key={note}
                className="text-warm-200 font-mono text-sm tracking-wider"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
