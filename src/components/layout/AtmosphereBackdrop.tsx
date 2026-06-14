import { useEffect, useRef } from "react";

/**
 * Atmosfera por trás do violão. Por quê: o instrumento vivia num vazio preto;
 * agora cada momento da jornada tem um CLIMA — o facho que revela, a madeira
 * quente da origem, a brasa grave das vozes baixas, a luz que sobe nas agudas,
 * o bokeh do salão quando elas se encontram. Sensação: o som tem um lugar.
 * Como: plates abstratos quentes em camadas fixas; a opacidade de cada uma
 * sobe conforme o scroll cruza seu ponto, num morph contínuo (sem re-render).
 * Um scrim à esquerda garante a leitura do texto sem escurecer o violão.
 */
const BASE = import.meta.env.BASE_URL;

interface Frame {
  src: string;
  at: number;
}

// progresso 0..1 ao longo das 12 seções (cada uma ~1/12)
const FRAMES: Frame[] = [
  { src: "stage-beam", at: 0.0 }, // hero — o facho que revela
  { src: "wood-soul", at: 0.09 }, // origem — a madeira
  { src: "deep-ember", at: 0.17 }, // vozes graves — a brasa
  { src: "luminous-warm", at: 0.42 }, // vozes agudas — a luz que sobe
  { src: "warm-bokeh", at: 0.67 }, // as vozes juntas — o salão
  { src: "luminous-warm", at: 0.84 }, // música — o canto
  { src: "stage-beam", at: 0.93 }, // fim — de volta ao palco
];

const FADE = 0.05;

export function AtmosphereBackdrop() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf = 0;
    let ticking = false;
    const apply = () => {
      ticking = false;
      const max = document.body.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      FRAMES.forEach((f, i) => {
        const el = refs.current[i];
        if (!el) return;
        const o = i === 0 ? 1 : Math.min(1, Math.max(0, (p - (f.at - FADE)) / FADE));
        el.style.opacity = String(o);
      });
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", apply);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 bg-black" aria-hidden>
      {FRAMES.map((f, i) => (
        <div
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          className="absolute inset-0"
          style={{ opacity: i === 0 ? 1 : 0, transition: "opacity 0.3s linear" }}
        >
          <img
            src={`${BASE}atmos/${f.src}.webp`}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      {/* scrim à esquerda: escurece a zona do texto, deixa o violão (direita) limpo */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(90deg, rgba(6,5,4,0.8) 0%, rgba(6,5,4,0.35) 38%, rgba(6,5,4,0) 65%)" }}
      />
      {/* leve unificador geral, para o instrumento lit destacar */}
      <div className="absolute inset-0" style={{ background: "rgba(6,5,4,0.18)" }} />
    </div>
  );
}
