import { useEffect } from "react";
import { CanvasWrapper } from "@/components/layout/CanvasWrapper";
import { ScrollContainer } from "@/components/layout/ScrollContainer";
import { initLenis, destroyLenis } from "@/lib/scroll-sync";
import { useScrollStore } from "@/stores/scroll-store";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    initLenis();

    // ScrollTrigger master que atualiza o Zustand store
    ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => {
        useScrollStore.getState().setProgress(self.progress);
        useScrollStore.getState().setVelocity(self.getVelocity() / 1000);
      },
    });

    // Inicializar audio no primeiro gesto
    const initAudioOnGesture = async () => {
      try {
        const { getAudioEngine } = await import("@/lib/audio-engine");
        const engine = await getAudioEngine();
        await engine.resume();
      } catch {
        // Silencioso
      }
      window.removeEventListener("click", initAudioOnGesture);
      window.removeEventListener("scroll", initAudioOnGesture);
    };

    window.addEventListener("click", initAudioOnGesture, { once: true });
    window.addEventListener("scroll", initAudioOnGesture, { once: true });

    return () => {
      destroyLenis();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("click", initAudioOnGesture);
      window.removeEventListener("scroll", initAudioOnGesture);
    };
  }, []);

  return (
    <>
      <CanvasWrapper />
      <ScrollContainer />
    </>
  );
}
