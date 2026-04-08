import { create } from "zustand";
import { SECTIONS } from "@/config/scroll-sections";

interface ScrollStore {
  progress: number;
  currentSection: number;
  sectionProgress: number;
  velocity: number;
  setProgress: (progress: number) => void;
  setVelocity: (velocity: number) => void;
}

export const useScrollStore = create<ScrollStore>((set) => ({
  progress: 0,
  currentSection: 0,
  sectionProgress: 0,
  velocity: 0,
  setProgress: (progress: number) => {
    let currentSection = 0;
    let sectionProgress = 0;

    for (let i = 0; i < SECTIONS.length; i++) {
      if (progress >= SECTIONS[i].start && progress <= SECTIONS[i].end) {
        currentSection = i;
        const range = SECTIONS[i].end - SECTIONS[i].start;
        sectionProgress = range > 0 ? (progress - SECTIONS[i].start) / range : 0;
        break;
      }
    }

    set({ progress, currentSection, sectionProgress });
  },
  setVelocity: (velocity: number) => set({ velocity }),
}));
