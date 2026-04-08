import {
  EffectComposer,
  Bloom,
  Vignette,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useScrollStore } from "@/stores/scroll-store";
import * as THREE from "three";

export function PostProcessing() {
  const chromaticRef = useRef<any>(null);
  const vignetteRef = useRef<any>(null);
  const bloomRef = useRef<any>(null);

  useFrame(() => {
    const { currentSection } = useScrollStore.getState();

    // Vinheta: mais intensa no hero e footer
    if (vignetteRef.current) {
      const vignettes = [0.5, 0.25, 0.2, 0.3, 0.2, 0.5];
      const target = vignettes[currentSection] ?? 0.3;
      vignetteRef.current.darkness +=
        (target - vignetteRef.current.darkness) * 0.03;
    }

    // Bloom: mais intenso na secao de musica
    if (bloomRef.current) {
      const bloomIntensities = [0.4, 0.3, 0.5, 0.3, 1.2, 0.2];
      const target = bloomIntensities[currentSection] ?? 0.4;
      bloomRef.current.intensity +=
        (target - bloomRef.current.intensity) * 0.03;
    }
  });

  return (
    <EffectComposer>
      <Bloom
        ref={bloomRef}
        luminanceThreshold={1.0}
        luminanceSmoothing={0.9}
        intensity={0.4}
        mipmapBlur
      />
      <Vignette
        ref={vignetteRef}
        eskil={false}
        offset={0.15}
        darkness={0.5}
        blendFunction={BlendFunction.NORMAL}
      />
      <ChromaticAberration
        ref={chromaticRef}
        offset={new THREE.Vector2(0.0005, 0.0005)}
        radialModulation={false}
        modulationOffset={0}
        blendFunction={BlendFunction.NORMAL}
      />
    </EffectComposer>
  );
}
