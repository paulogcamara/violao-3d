import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "@/stores/scroll-store";
import { GuitarBody } from "./guitar/GuitarBody";
import { GuitarNeck } from "./guitar/GuitarNeck";
import { GuitarHeadstock } from "./guitar/GuitarHeadstock";
import { GuitarBridge } from "./guitar/GuitarBridge";
import { GuitarSoundhole } from "./guitar/GuitarSoundhole";
import { GuitarStrings3D } from "./guitar/GuitarStrings3D";

export function GuitarModel() {
  const groupRef = useRef<THREE.Group>(null!);
  const currentRotZ = useRef(0);

  useFrame(() => {
    const { progress, currentSection } = useScrollStore.getState();

    // Rotacao Y no hero (revelacao)
    if (progress < 0.07) {
      const heroProgress = progress / 0.07;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(-0.5, 0, heroProgress);
    } else {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        0,
        0.05
      );
    }

    // Inclinacao Z nas secoes de cordas (index 2-7)
    let targetRotZ = 0;
    if (currentSection >= 2 && currentSection <= 7) {
      // Cordas: inclinar ~35 graus, alternando direcao
      const isRight = (currentSection - 2) % 2 === 0;
      targetRotZ = isRight ? -0.55 : 0.55; // ~31 graus
    }

    // Suavizar transicao
    currentRotZ.current += (targetRotZ - currentRotZ.current) * 0.04;
    groupRef.current.rotation.z = currentRotZ.current;
  });

  return (
    <group ref={groupRef} scale={1.2}>
      <GuitarBody />
      <GuitarNeck />
      <GuitarHeadstock />
      <GuitarBridge />
      <GuitarSoundhole />
      <GuitarStrings3D />
    </group>
  );
}
