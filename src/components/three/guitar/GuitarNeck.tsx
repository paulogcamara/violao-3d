import { useMemo } from "react";
import { useWoodMaterial } from "./WoodMaterial";

export function GuitarNeck() {
  const neckMaterial = useWoodMaterial("cedar");
  const fretboardMaterial = useWoodMaterial("ebony");

  // Trastes reais do violao classico (19 trastes)
  const fretPositions = useMemo(() => {
    const scaleLength = 1.15;
    const frets: number[] = [];
    for (let i = 1; i <= 19; i++) {
      frets.push(scaleLength - scaleLength / Math.pow(2, i / 12));
    }
    return frets;
  }, []);

  // Marcadores de posicao (dots nos trastes 3, 5, 7, 9, 12, 15, 17)
  const dotFrets = [3, 5, 7, 9, 15, 17];
  const doubleDotFrets = [12];

  return (
    <group position={[0, 0.55, 0]}>
      {/* Braco principal */}
      <mesh castShadow>
        <boxGeometry args={[0.058, 1.25, 0.028]} />
        <primitive object={neckMaterial} attach="material" />
      </mesh>

      {/* Escala (fretboard) */}
      <mesh position={[0, 0, 0.015]}>
        <boxGeometry args={[0.054, 1.25, 0.004]} />
        <primitive object={fretboardMaterial} attach="material" />
      </mesh>

      {/* Trastes metalicos */}
      {fretPositions.map((pos, i) => (
        <mesh
          key={`fret-${i}`}
          position={[0, 0.625 - pos, 0.018]}
        >
          <boxGeometry args={[0.054, 0.0015, 0.002]} />
          <meshStandardMaterial
            color="#D4D4D4"
            roughness={0.15}
            metalness={0.95}
          />
        </mesh>
      ))}

      {/* Marcadores (dots) */}
      {dotFrets.map((fret) => {
        const pos1 = fretPositions[fret - 2] ?? 0;
        const pos2 = fretPositions[fret - 1];
        const y = 0.625 - (pos1 + pos2) / 2;
        return (
          <mesh key={`dot-${fret}`} position={[0, y, 0.018]}>
            <circleGeometry args={[0.004, 16]} />
            <meshStandardMaterial
              color="#F5F0E0"
              roughness={0.3}
            />
          </mesh>
        );
      })}

      {/* Marcador duplo no traste 12 */}
      {doubleDotFrets.map((fret) => {
        const pos1 = fretPositions[fret - 2] ?? 0;
        const pos2 = fretPositions[fret - 1];
        const y = 0.625 - (pos1 + pos2) / 2;
        return (
          <group key={`ddot-${fret}`}>
            <mesh position={[-0.012, y, 0.018]}>
              <circleGeometry args={[0.004, 16]} />
              <meshStandardMaterial color="#F5F0E0" roughness={0.3} />
            </mesh>
            <mesh position={[0.012, y, 0.018]}>
              <circleGeometry args={[0.004, 16]} />
              <meshStandardMaterial color="#F5F0E0" roughness={0.3} />
            </mesh>
          </group>
        );
      })}

      {/* Pestana (nut) */}
      <mesh position={[0, 0.625, 0.018]}>
        <boxGeometry args={[0.056, 0.005, 0.006]} />
        <meshPhysicalMaterial
          color="#F8F4E8"
          roughness={0.2}
          clearcoat={0.8}
        />
      </mesh>
    </group>
  );
}
