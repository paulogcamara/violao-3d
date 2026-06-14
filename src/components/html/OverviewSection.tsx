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
        <div className="text-warm-400/30 text-[10px] tracking-[0.5em] uppercase mb-5 font-light">
          Antes da primeira nota
        </div>

        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-warm-100 tracking-wide leading-tight">
          A Origem
          <br />
          do Som
        </h2>

        <p className="mt-5 text-warm-100/70 text-base md:text-lg leading-relaxed font-light max-w-md">
          Um violão é só uma caixa de madeira e ar. Mas quando uma corda
          vibra, a madeira respira junto, e o ar preso lá dentro devolve o
          som ao mundo — mais cheio, mais quente, mais vivo.
        </p>
        <p className="mt-4 text-white/45 text-sm md:text-base leading-relaxed font-light max-w-md">
          Antes de ser música, o som é isso: matéria tremendo. E esse tremor
          ganha voz em seis cordas, da mais grave à mais aguda.
        </p>

        {/* As seis vozes, da grave à aguda — ponte para as próximas seções */}
        <div className="mt-8 bg-warm-400/[0.06] border border-warm-400/15 rounded-xl p-5 shadow-lg shadow-warm-400/5 backdrop-blur-sm">
          <div className="text-warm-300/60 text-[10px] tracking-[0.3em] uppercase mb-3">
            As seis vozes
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
