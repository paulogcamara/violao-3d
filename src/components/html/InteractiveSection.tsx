import { useEffect, useRef, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getAudioEngine } from "@/lib/audio-engine";
import type { StringId } from "@/types/audio";

gsap.registerPlugin(ScrollTrigger);

const NOTE_NAMES = ["Dó", "Dó#", "Ré", "Ré#", "Mi", "Fá", "Fá#", "Sol", "Sol#", "Lá", "Lá#", "Si"];
const OPEN_STRING_MIDI = [40, 45, 50, 55, 59, 64];
const STRING_LABELS = ["E", "A", "D", "G", "B", "e"];

function midiToFreq(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function midiToNoteName(midi: number): string {
  return NOTE_NAMES[midi % 12];
}

const FRET_COUNT = 12;

const CHORDS: { name: string; frets: (number | null)[] }[] = [
  { name: "Dó Maior", frets: [null, 3, 2, 0, 1, 0] },
  { name: "Ré Maior", frets: [null, null, 0, 2, 3, 2] },
  { name: "Mi Maior", frets: [0, 2, 2, 1, 0, 0] },
  { name: "Sol Maior", frets: [3, 2, 0, 0, 0, 3] },
  { name: "Lá Maior", frets: [null, 0, 2, 2, 2, 0] },
  { name: "Lá menor", frets: [null, 0, 2, 2, 1, 0] },
  { name: "Mi menor", frets: [0, 2, 2, 0, 0, 0] },
  { name: "Ré menor", frets: [null, null, 0, 2, 3, 1] },
];

export function InteractiveSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#interactive",
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

  const playFret = useCallback(async (stringIndex: number, fret: number) => {
    const midi = OPEN_STRING_MIDI[stringIndex] + fret;
    const freq = midiToFreq(midi);
    const stringIds: StringId[] = ["E2", "A2", "D3", "G3", "B3", "E4"];

    try {
      const audio = await getAudioEngine();
      await audio.resume();
      audio.pluck(stringIds[stringIndex], freq);
    } catch {
      // silencioso
    }
  }, []);

  const playChord = useCallback(async (frets: (number | null)[]) => {
    try {
      const audio = await getAudioEngine();
      await audio.resume();

      const notes = frets
        .map((fret, i) => {
          if (fret === null) return null;
          const midi = OPEN_STRING_MIDI[i] + fret;
          const stringIds: StringId[] = ["E2", "A2", "D3", "G3", "B3", "E4"];
          return { id: stringIds[i], frequency: midiToFreq(midi) };
        })
        .filter((n): n is { id: StringId; frequency: number } => n !== null);

      audio.playArpeggio(notes, 60);
    } catch {
      // silencioso
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-start opacity-0"
    >
      {/* Conteudo na ESQUERDA (violao na direita via camera) */}
      <div className="ml-[4%] md:ml-[6%] lg:ml-[8%] max-w-xl w-full">
        <h2 className="font-serif text-3xl md:text-4xl text-warm-100 tracking-wide">
          Explore o Braço
        </h2>
        <p className="mt-2 text-white/35 text-sm font-light">
          Clique em qualquer posição para ouvir a nota
        </p>

        {/* Fretboard interativo - FONTE MAIOR */}
        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[520px]">
            {/* Numeros dos trastes */}
            <div className="flex ml-12 mb-1.5">
              <div className="w-12 text-center text-xs text-white/25 font-mono">0</div>
              {Array.from({ length: FRET_COUNT }, (_, i) => (
                <div key={i} className="flex-1 text-center text-xs text-white/25 font-mono">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Cordas */}
            {OPEN_STRING_MIDI.map((baseMidi, stringIdx) => (
              <div key={stringIdx} className="flex items-center h-10">
                {/* Label da corda */}
                <div className="w-12 text-right pr-3 text-sm text-white/35 font-mono font-medium">
                  {STRING_LABELS[stringIdx]}
                </div>

                {/* Corda aberta */}
                <button
                  onClick={() => playFret(stringIdx, 0)}
                  className="w-12 h-9 rounded-lg border border-white/10 text-xs text-white/45 font-medium hover:bg-warm-400/20 hover:text-warm-300 hover:border-warm-400/30 transition-all pointer-events-auto cursor-pointer flex items-center justify-center"
                >
                  {midiToNoteName(baseMidi)}
                </button>

                {/* Trastes */}
                {Array.from({ length: FRET_COUNT }, (_, fret) => {
                  const midi = baseMidi + fret + 1;
                  const noteName = midiToNoteName(midi);
                  const isDot = [3, 5, 7, 9, 12].includes(fret + 1);
                  return (
                    <button
                      key={fret}
                      onClick={() => playFret(stringIdx, fret + 1)}
                      className={`flex-1 h-9 border-r border-white/[0.06] text-xs font-medium text-white/30 hover:bg-warm-400/15 hover:text-warm-300 transition-all pointer-events-auto cursor-pointer flex items-center justify-center ${
                        isDot && stringIdx === 2 ? "bg-white/[0.03]" : ""
                      }`}
                    >
                      {noteName}
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Marcadores dos trastes */}
            <div className="flex ml-12 mt-1">
              <div className="w-12" />
              {Array.from({ length: FRET_COUNT }, (_, i) => (
                <div key={i} className="flex-1 flex justify-center">
                  {[3, 5, 7, 9].includes(i + 1) && (
                    <div className="w-2 h-2 rounded-full bg-warm-400/15" />
                  )}
                  {i + 1 === 12 && (
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-warm-400/15" />
                      <div className="w-2 h-2 rounded-full bg-warm-400/15" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Acordes */}
        <div className="mt-8">
          <h3 className="text-warm-200/80 text-sm tracking-wider mb-3">
            Acordes
          </h3>
          <div className="flex flex-wrap gap-2">
            {CHORDS.map((chord) => (
              <button
                key={chord.name}
                onClick={() => playChord(chord.frets)}
                className="px-4 py-2.5 rounded-xl border border-white/[0.08] text-sm text-white/50 hover:bg-warm-400/10 hover:text-warm-300 hover:border-warm-400/20 transition-all pointer-events-auto cursor-pointer bg-white/[0.02]"
              >
                {chord.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
