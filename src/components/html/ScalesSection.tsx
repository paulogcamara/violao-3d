import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAudioEngine } from "@/lib/audio-engine";
import type { StringId } from "@/types/audio";

gsap.registerPlugin(ScrollTrigger);

const SCALES = [
  {
    name: "Escala Maior (Dó Maior)",
    notes: ["Dó", "Ré", "Mi", "Fá", "Sol", "Lá", "Si"],
    pattern: "T T ST T T T ST",
    description:
      "A escala maior é a base da música ocidental. Seu padrão de tons e semitons cria uma sonoridade alegre e brilhante.",
    playData: [
      { note: "E4" as StringId, freq: 329.63 },
      { note: "B3" as StringId, freq: 293.66 },
      { note: "G3" as StringId, freq: 329.63 },
      { note: "D3" as StringId, freq: 349.23 },
      { note: "A2" as StringId, freq: 392.0 },
      { note: "E2" as StringId, freq: 440.0 },
      { note: "E4" as StringId, freq: 493.88 },
    ],
  },
  {
    name: "Escala Menor Natural (Lá menor)",
    notes: ["Lá", "Si", "Dó", "Ré", "Mi", "Fá", "Sol"],
    pattern: "T ST T T ST T T",
    description:
      "A relativa menor de Dó Maior. Compartilha as mesmas notas, mas começando de Lá, criando um caráter melancólico e introspectivo.",
    playData: [
      { note: "A2" as StringId, freq: 220.0 },
      { note: "D3" as StringId, freq: 246.94 },
      { note: "E2" as StringId, freq: 261.63 },
      { note: "G3" as StringId, freq: 293.66 },
      { note: "B3" as StringId, freq: 329.63 },
      { note: "E4" as StringId, freq: 349.23 },
      { note: "A2" as StringId, freq: 392.0 },
    ],
  },
  {
    name: "Escala Pentatônica",
    notes: ["Lá", "Dó", "Ré", "Mi", "Sol"],
    pattern: "1.5T T T 1.5T T",
    description:
      "Com apenas 5 notas, a pentatônica é a escala mais intuitiva. Presente em blues, rock, música oriental e folclore brasileiro.",
    playData: [
      { note: "A2" as StringId, freq: 220.0 },
      { note: "D3" as StringId, freq: 261.63 },
      { note: "G3" as StringId, freq: 293.66 },
      { note: "B3" as StringId, freq: 329.63 },
      { note: "E4" as StringId, freq: 392.0 },
    ],
  },
];

export function ScalesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#scales",
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

  const playScale = useCallback(async (playData: typeof SCALES[0]["playData"]) => {
    try {
      const audio = await getAudioEngine();
      await audio.resume();
      audio.playArpeggio(
        playData.map((d) => ({ id: d.note, frequency: d.freq })),
        350
      );
    } catch {
      // silencioso
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center opacity-0"
    >
      {/* Conteudo na ESQUERDA (violao na direita via camera) */}
      <div className="ml-[6%] md:ml-[8%] lg:ml-[10%] max-w-md">
        <h2 className="font-serif text-3xl md:text-4xl text-warm-100 tracking-wide">
          Escalas Musicais
        </h2>
        <p className="mt-2 text-white/35 text-sm font-light">
          Padrões de notas que formam a base de toda melodia e harmonia
        </p>

        <div className="mt-6 space-y-4">
          {SCALES.map((scale) => (
            <div
              key={scale.name}
              className="border border-white/[0.08] rounded-xl p-5 backdrop-blur-sm bg-white/[0.02]"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-warm-200 text-base">
                  {scale.name}
                </h3>
                <button
                  onClick={() => playScale(scale.playData)}
                  className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-warm-400 border border-warm-400/20 hover:bg-warm-400/10 transition-colors pointer-events-auto cursor-pointer"
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                  Ouvir
                </button>
              </div>

              <div className="mt-3 flex gap-2 flex-wrap">
                {scale.notes.map((n, i) => (
                  <span
                    key={`${n}-${i}`}
                    className="w-9 h-9 rounded-lg bg-warm-400/10 flex items-center justify-center text-warm-300 text-xs font-medium"
                  >
                    {n}
                  </span>
                ))}
              </div>

              <div className="mt-2 text-[10px] text-white/20 font-mono tracking-wider">
                {scale.pattern}
              </div>

              <p className="mt-3 text-white/35 text-xs leading-relaxed font-light">
                {scale.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
