import { useWoodMaterial } from "./WoodMaterial";

export function GuitarHeadstock() {
  const material = useWoodMaterial("cedar");

  return (
    <group position={[0, 1.32, -0.012]}>
      {/* Mao (headstock) - formato classico */}
      <mesh castShadow>
        <boxGeometry args={[0.068, 0.22, 0.018]} />
        <primitive object={material} attach="material" />
      </mesh>

      {/* Aberturas da mao (slots) */}
      {[0, 1].map((row) => (
        <mesh key={`slot-${row}`} position={[0, 0.03 - row * 0.1, 0]}>
          <boxGeometry args={[0.035, 0.06, 0.02]} />
          <meshStandardMaterial color="#0a0705" roughness={0.9} />
        </mesh>
      ))}

      {/* Tarraxas - lado esquerdo (bordoes E2, A2, D3) */}
      {[0, 1, 2].map((i) => (
        <group key={`peg-L-${i}`}>
          {/* Eixo */}
          <mesh position={[-0.042, 0.07 - i * 0.065, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.004, 0.004, 0.025, 12]} />
            <meshStandardMaterial color="#C0C0C0" roughness={0.15} metalness={0.95} />
          </mesh>
          {/* Botao */}
          <mesh position={[-0.058, 0.07 - i * 0.065, 0]}>
            <sphereGeometry args={[0.009, 12, 12]} />
            <meshPhysicalMaterial
              color="#E8D5B7"
              roughness={0.25}
              clearcoat={0.7}
            />
          </mesh>
        </group>
      ))}

      {/* Tarraxas - lado direito (G3, B3, E4) */}
      {[0, 1, 2].map((i) => (
        <group key={`peg-R-${i}`}>
          <mesh position={[0.042, 0.07 - i * 0.065, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.004, 0.004, 0.025, 12]} />
            <meshStandardMaterial color="#C0C0C0" roughness={0.15} metalness={0.95} />
          </mesh>
          <mesh position={[0.058, 0.07 - i * 0.065, 0]}>
            <sphereGeometry args={[0.009, 12, 12]} />
            <meshPhysicalMaterial
              color="#E8D5B7"
              roughness={0.25}
              clearcoat={0.7}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
