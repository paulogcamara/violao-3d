import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useScrollStore } from "@/stores/scroll-store";

const PARTICLE_COUNT = 150;

export function ParticleSystem() {
  const pointsRef = useRef<THREE.Points>(null!);

  const { positions, velocities, lifetimes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const lifetimes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 4;
      positions[i3 + 1] = (Math.random() - 0.5) * 4;
      positions[i3 + 2] = (Math.random() - 0.5) * 4;

      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = Math.random() * 0.003 + 0.001;
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;

      lifetimes[i] = Math.random();
    }

    return { positions, velocities, lifetimes };
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const { currentSection } = useScrollStore.getState();
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    const time = clock.getElapsedTime();
    const speed = currentSection === 4 ? 2 : 1; // Mais rapido na secao musica

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      lifetimes[i] += 0.002 * speed;

      if (lifetimes[i] > 1) {
        lifetimes[i] = 0;
        posArray[i3] = (Math.random() - 0.5) * 4;
        posArray[i3 + 1] = (Math.random() - 0.5) * 3 - 1;
        posArray[i3 + 2] = (Math.random() - 0.5) * 4;
      }

      posArray[i3] += velocities[i3] + Math.sin(time + i) * 0.0003;
      posArray[i3 + 1] += velocities[i3 + 1];
      posArray[i3 + 2] += velocities[i3 + 2] + Math.cos(time + i) * 0.0003;
    }

    posAttr.needsUpdate = true;

    // Opacidade baseada na secao
    const mat = pointsRef.current.material as THREE.PointsMaterial;
    const targetOpacity = [0.15, 0.2, 0.1, 0.25, 0.5, 0.1][currentSection] ?? 0.15;
    mat.opacity += (targetOpacity - mat.opacity) * 0.02;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={PARTICLE_COUNT}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#D4A664"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
