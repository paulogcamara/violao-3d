import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 1.5, ease: "power3.out", delay: 0.3 }
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 1.2, ease: "power3.out", delay: 0.7 }
      );

      gsap.to(scrollHintRef.current, {
        y: 8,
        opacity: 0.3,
        duration: 1.5,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
      });

      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          if (containerRef.current) {
            const p = self.progress;
            containerRef.current.style.opacity = String(1 - p * 3);
            containerRef.current.style.transform = `translateY(${-p * 60}px)`;
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center pointer-events-none select-none"
    >
      {/* Texto na ESQUERDA */}
      <div className="ml-[6%] md:ml-[8%] lg:ml-[10%] max-w-lg">
        <div className="text-warm-400/30 text-xs tracking-[0.5em] uppercase mb-5 font-light">
          Uma experiencia interativa
        </div>

        <h1
          ref={titleRef}
          className="font-serif text-5xl md:text-6xl lg:text-7xl text-warm-100 tracking-wide leading-[1.1] opacity-0"
        >
          A Alma
          <br />
          do Som
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-white/50 text-base md:text-lg font-light tracking-wider opacity-0 max-w-sm"
        >
          Descubra cada corda, cada nota, cada vibracao do violao classico
        </p>

        <div className="mt-8 w-16 h-px bg-warm-400/20" />

        <div ref={scrollHintRef} className="mt-10 flex items-center gap-3">
          <svg width="16" height="24" viewBox="0 0 20 30" className="text-white/15">
            <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <circle cx="10" cy="10" r="2" fill="currentColor">
              <animate attributeName="cy" values="8;18;8" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>
          <span className="text-white/20 text-[10px] tracking-[0.3em] uppercase">
            Role para explorar
          </span>
        </div>
      </div>
    </div>
  );
}
