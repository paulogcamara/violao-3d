import { useMemo } from "react";
import * as THREE from "three";

export function GuitarSoundhole() {
  // Roseta decorativa com aneis concentricos
  const rosetteColors = useMemo(
    () => ["#8B6234", "#2A1A0A", "#C4A35A", "#2A1A0A", "#D4A664", "#2A1A0A", "#8B6234"],
    []
  );

  return (
    <group position={[0, -0.15, 0.048]}>
      {/* Buraco (soundhole) */}
      <mesh>
        <circleGeometry args={[0.055, 48]} />
        <meshStandardMaterial color="#050302" roughness={0.95} side={THREE.DoubleSide} />
      </mesh>

      {/* Roseta - aneis decorativos */}
      {rosetteColors.map((color, i) => {
        const innerR = 0.056 + i * 0.004;
        const outerR = innerR + 0.003;
        return (
          <mesh key={`rosette-${i}`} position={[0, 0, 0.001]}>
            <ringGeometry args={[innerR, outerR, 64]} />
            <meshStandardMaterial
              color={color}
              roughness={0.4}
              metalness={0.05}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}

      {/* Anel externo da roseta (mais grosso) */}
      <mesh position={[0, 0, 0.001]}>
        <ringGeometry args={[0.083, 0.088, 64]} />
        <meshStandardMaterial
          color="#C4A35A"
          roughness={0.35}
          metalness={0.08}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
