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
  role: string;
  emotion: string;
  soul: string;
  music: string;
  color: string;
  freq: number;
}

export function StringSection({
  sectionId,
  stringIndex,
  name,
  number,
  note,
  role,
  emotion,
  soul,
  music,
  color,
  freq,
}: StringSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);

  // Par = violao na DIREITA, texto na ESQUERDA
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
            // a voz "fala" sozinha ao entrar
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
        {/* Número da corda, fantasma ao fundo */}
        <div
          className="text-8xl md:text-9xl font-serif font-bold opacity-[0.08] leading-none"
          style={{ color }}
        >
          {stringIndex + 1}
        </div>

        {/* O papel da voz — o que ela É */}
        <h2
          className="-mt-8 font-serif text-4xl md:text-5xl tracking-wide leading-[1.05]"
          style={{ color }}
        >
          {role}
        </h2>

        {/* Identidade: nome · corda · nota */}
        <p className="mt-3 font-mono text-[11px] tracking-[0.25em] uppercase text-white/40">
          {name} · {number} · {note}
        </p>

        {/* Emoção */}
        <p
          className="mt-2 font-mono text-[11px] tracking-[0.3em] uppercase"
          style={{ color: color + "cc" }}
        >
          {emotion}
        </p>

        {/* A alma — o texto principal */}
        <p className="mt-6 text-warm-100/75 text-base md:text-lg leading-relaxed font-light">
          {soul}
        </p>

        {/* Onde ela vive — referência cultural, em itálico */}
        <p
          className="mt-5 border-l-2 pl-4 text-white/45 text-sm md:text-base italic leading-relaxed font-light"
          style={{ borderColor: color + "40" }}
        >
          {music}
        </p>

        {/* Ouvir a voz */}
        <button
          onClick={playNote}
          className="mt-7 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm tracking-wider transition-all duration-300 hover:scale-105 pointer-events-auto cursor-pointer"
          style={{
            backgroundColor: color + "18",
            color,
            border: `1px solid ${color}25`,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
          Ouvir a voz
        </button>
      </div>
    </div>
  );
}
