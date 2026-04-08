import { useEffect, useState } from "react";
import { useScrollStore } from "@/stores/scroll-store";
import { SECTIONS } from "@/config/scroll-sections";
import { getLenis } from "@/lib/scroll-sync";

export function NavigationDots() {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const unsub = useScrollStore.subscribe((state) => {
      if (state.currentSection !== currentSection) {
        setCurrentSection(state.currentSection);
      }
    });
    return unsub;
  }, [currentSection]);

  const handleClick = (index: number) => {
    const lenis = getLenis();
    const target = document.getElementById(SECTIONS[index].id);
    if (lenis && target) {
      lenis.scrollTo(target, { duration: 2 });
    }
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-auto">
      {SECTIONS.map((section, i) => (
        <button
          key={section.id}
          onClick={() => handleClick(i)}
          className="group relative flex items-center justify-end"
          aria-label={`Ir para ${section.label}`}
        >
          {/* Tooltip */}
          <span className="absolute right-6 text-white/0 group-hover:text-white/60 text-xs tracking-wider transition-all duration-300 whitespace-nowrap pr-2">
            {section.label}
          </span>

          {/* Dot */}
          <span
            className={`block rounded-full transition-all duration-500 ${
              i === currentSection
                ? "w-2.5 h-2.5 bg-warm-400"
                : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}
