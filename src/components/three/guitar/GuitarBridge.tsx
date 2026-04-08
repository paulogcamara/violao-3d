import { useWoodMaterial } from "./WoodMaterial";

export function GuitarBridge() {
  const bridgeMaterial = useWoodMaterial("ebony");

  return (
    <group position={[0, -0.58, 0.048]}>
      {/* Cavalete */}
      <mesh castShadow>
        <boxGeometry args={[0.1, 0.018, 0.014]} />
        <primitive object={bridgeMaterial} attach="material" />
      </mesh>

      {/* Rastilho (saddle) - osso */}
      <mesh position={[0, 0.004, 0.004]}>
        <boxGeometry args={[0.075, 0.004, 0.005]} />
        <meshPhysicalMaterial
          color="#F8F4E8"
          roughness={0.2}
          clearcoat={0.9}
        />
      </mesh>

      {/* Pinos do cavalete (6) */}
      {Array.from({ length: 6 }, (_, i) => {
        const x = -0.025 + i * 0.01;
        return (
          <mesh key={`pin-${i}`} position={[x, -0.005, 0.002]}>
            <cylinderGeometry args={[0.002, 0.0015, 0.008, 8]} />
            <meshPhysicalMaterial
              color="#F8F4E8"
              roughness={0.2}
              clearcoat={0.8}
            />
          </mesh>
        );
      })}
    </group>
  );
}
