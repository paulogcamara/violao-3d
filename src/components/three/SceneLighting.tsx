import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useScrollStore } from "@/stores/scroll-store";
import { LIGHT_PRESETS } from "@/config/lighting";
import { SECTIONS } from "@/config/scroll-sections";

const presetKeys = SECTIONS.map((s) => s.id);

function lerpVal(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpPos(a: [number, number, number], b: [number, number, number], t: number): [number, number, number] {
  return [lerpVal(a[0], b[0], t), lerpVal(a[1], b[1], t), lerpVal(a[2], b[2], t)];
}

export function SceneLighting() {
  const ambientRef = useRef<THREE.AmbientLight>(null!);
  const keyRef = useRef<THREE.DirectionalLight>(null!);
  const fillRef = useRef<THREE.PointLight>(null!);
  const rimRef = useRef<THREE.SpotLight>(null!);

  useFrame(() => {
    const { currentSection, sectionProgress } = useScrollStore.getState();

    const currentKey = presetKeys[currentSection] ?? "hero";
    const nextKey = presetKeys[Math.min(currentSection + 1, presetKeys.length - 1)] ?? "footer";

    const current = LIGHT_PRESETS[currentKey] ?? LIGHT_PRESETS.hero;
    const next = LIGHT_PRESETS[nextKey] ?? LIGHT_PRESETS.footer;

    const t = sectionProgress;

    ambientRef.current.color.lerpColors(
      new THREE.Color(current.ambient.color),
      new THREE.Color(next.ambient.color),
      t
    );
    ambientRef.current.intensity = lerpVal(current.ambient.intensity, next.ambient.intensity, t);

    keyRef.current.color.lerpColors(new THREE.Color(current.key.color), new THREE.Color(next.key.color), t);
    keyRef.current.intensity = lerpVal(current.key.intensity, next.key.intensity, t);
    keyRef.current.position.set(...lerpPos(current.key.position, next.key.position, t));

    fillRef.current.color.lerpColors(new THREE.Color(current.fill.color), new THREE.Color(next.fill.color), t);
    fillRef.current.intensity = lerpVal(current.fill.intensity, next.fill.intensity, t);
    fillRef.current.position.set(...lerpPos(current.fill.position, next.fill.position, t));

    rimRef.current.color.lerpColors(new THREE.Color(current.rim.color), new THREE.Color(next.rim.color), t);
    rimRef.current.intensity = lerpVal(current.rim.intensity, next.rim.intensity, t);
    rimRef.current.position.set(...lerpPos(current.rim.position, next.rim.position, t));
  });

  return (
    <>
      <ambientLight ref={ambientRef} />
      <directionalLight ref={keyRef} castShadow />
      <pointLight ref={fillRef} />
      <spotLight ref={rimRef} angle={0.6} penumbra={0.8} />
    </>
  );
}
