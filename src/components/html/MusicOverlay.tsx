import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAudioEngine } from "@/lib/audio-engine";
import { GUITAR_STRINGS } from "@/config/strings";

gsap.registerPlugin(ScrollTrigger);

export function MusicOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasPlayedRef = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#music",
        start: "top center",
        end: "bottom center",
        onEnter: async () => {
          if (hasPlayedRef.current) return;
          hasPlayedRef.current = true;

          try {
            const audio = await getAudioEngine();
            await audio.resume();

            const arpeggio = [
              GUITAR_STRINGS[0],
              GUITAR_STRINGS[4],
              GUITAR_STRINGS[5],
              GUITAR_STRINGS[3],
              GUITAR_STRINGS[4],
              GUITAR_STRINGS[2],
              GUITAR_STRINGS[1],
              GUITAR_STRINGS[0],
            ].map((s) => ({ id: s.id, frequency: s.frequency }));

            audio.playArpeggio(arpeggio, 350);
          } catch {
            // silencioso
          }
        },
        onLeaveBack: () => {
          hasPlayedRef.current = false;
        },
        onUpdate: (self) => {
          if (containerRef.current) {
            const p = self.progress;
            const fadeIn = Math.min(p * 3, 1);
            const fadeOut = Math.min((1 - p) * 3, 1);
            containerRef.current.style.opacity = String(Math.min(fadeIn, fadeOut));
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center opacity-0">
      {/* Texto na ESQUERDA (violao na direita via camera) */}
      <div className="ml-[6%] md:ml-[8%] lg:ml-[10%] max-w-md">
        <div className="text-warm-400/20 text-[10px] tracking-[0.5em] uppercase mb-5">
          Sinta a musica
        </div>

        <blockquote className="font-serif text-warm-100/80 text-2xl md:text-3xl italic leading-relaxed">
          "A musica expressa aquilo que nao pode ser dito e sobre o qual e
          impossivel permanecer em silencio."
        </blockquote>
        <cite className="block mt-5 text-warm-300/35 text-sm font-light tracking-wider not-italic">
          &mdash; Victor Hugo
        </cite>

        <div className="mt-8 w-20 h-px bg-gradient-to-r from-warm-400/20 to-transparent" />

        <p className="mt-8 text-white/30 text-sm font-light leading-relaxed max-w-sm">
          O violao classico e capaz de reproduzir melodia, harmonia e ritmo
          simultaneamente — uma orquestra nas maos de um so musico.
        </p>
      </div>
    </div>
  );
}
