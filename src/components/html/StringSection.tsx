import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAudioEngine } from "@/lib/audio-engine";
import type { StringId } from "@/types/audio";

gsap.registerPlugin(ScrollTrigger);

interface StringSectionProps {
  sectionId: string;
  stringIndex: number;
  name: string;
  number: string;
  note: string;
  frequency: string;
  type: string;
  description: string;
  curiosity: string;
  color: string;
  freq: number;
}

export function StringSection({
  sectionId,
  stringIndex,
  name,
  number,
  note,
  frequency,
  type,
  description,
  curiosity,
  color,
  freq,
}: StringSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);

  // Par = violao na DIREITA, texto na ESQUERDA
  // Impar = violao na ESQUERDA, texto na DIREITA
  const isRight = stringIndex % 2 === 0;

  const playNote = useCallback(async () => {
    try {
      const audio = await getAudioEngine();
      await audio.resume();
      audio.pluck(note as StringId, freq);
    } catch {
      // silencioso
    }
  }, [note, freq]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: `#${sectionId}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          if (!hasPlayedRef.current) {
            hasPlayedRef.current = true;
            setTimeout(() => playNote(), 500);
          }
        },
        onLeaveBack: () => {
          hasPlayedRef.current = false;
        },
        onUpdate: (self) => {
          if (!containerRef.current) return;
          const p = self.progress;
          const fadeIn = Math.min(p * 4, 1);
          const fadeOut = Math.min((1 - p) * 4, 1);
          const opacity = Math.min(fadeIn, fadeOut);
          containerRef.current.style.opacity = String(opacity);

          const slideDir = isRight ? -1 : 1;
          containerRef.current.style.transform = `translateX(${
            (1 - fadeIn) * 30 * slideDir
          }px)`;
        },
      });
    });

    return () => ctx.revert();
  }, [sectionId, playNote, isRight]);

  const isBass = stringIndex < 3;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 flex items-center opacity-0 ${
        isRight ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-md ${
          isRight
            ? "ml-[6%] md:ml-[8%] lg:ml-[10%]"
            : "mr-[6%] md:mr-[8%] lg:mr-[10%]"
        }`}
      >
        {/* Numero grande da corda */}
        <div
          className="text-8xl md:text-9xl font-serif font-bold opacity-[0.07] leading-none"
          style={{ color }}
        >
          {stringIndex + 1}
        </div>

        {/* Nome e nota */}
        <div className="-mt-6 flex items-baseline gap-4">
          <h2 className="font-serif text-3xl md:text-4xl text-warm-100 tracking-wide">
            {name}
          </h2>
          <span
            className="text-xs font-mono tracking-widest px-3 py-1 rounded-full border"
            style={{ borderColor: color + "40", color }}
          >
            {note}
          </span>
        </div>

        {/* Info tecnica em mini boxes */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="text-[11px] text-white/35 tracking-wider bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5">
            {number}
          </span>
          <span className="text-[11px] text-white/35 tracking-wider bg-white/[0.03] border border-white/[0.06] rounded-lg px-3 py-1.5">
            {frequency}
          </span>
        </div>

        {/* Tipo da corda */}
        <div
          className="mt-3 text-sm font-light px-4 py-2 rounded-lg inline-block"
          style={{
            backgroundColor: isBass ? "#C4A35A12" : "#E8E0D012",
            color: isBass ? "#C4A35A" : "#E8E0D0",
            border: `1px solid ${isBass ? "#C4A35A15" : "#E8E0D015"}`,
          }}
        >
          {type}
        </div>

        {/* Descricao */}
        <p className="mt-5 text-white/55 text-sm leading-relaxed font-light">
          {description}
        </p>

        {/* Curiosidade em box */}
        <div
          className="mt-4 border-l-2 pl-4 bg-white/[0.02] rounded-r-lg py-3 pr-4"
          style={{ borderColor: color + "25" }}
        >
          <p className="text-white/35 text-xs leading-relaxed italic">
            {curiosity}
          </p>
        </div>

        {/* Botao tocar */}
        <button
          onClick={playNote}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 hover:scale-105 pointer-events-auto cursor-pointer"
          style={{
            backgroundColor: color + "18",
            color,
            border: `1px solid ${color}25`,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          Ouvir {note}
        </button>
      </div>
    </div>
  );
}
