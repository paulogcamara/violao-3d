import { useMemo } from "react";
import * as THREE from "three";
import { useWoodMaterial } from "./WoodMaterial";

/**
 * Corpo do violao classico com formato realista usando LatheGeometry + escala.
 * O perfil simula a cintura e as curvas do corpo.
 */
export function GuitarBody() {
  const topMaterial = useWoodMaterial("spruce");
  const backMaterial = useWoodMaterial("rosewood");

  const { topGeometry, backGeometry } = useMemo(() => {
    // Perfil do corpo do violao (vista lateral -> contorno)
    // x = raio, y = altura ao longo do eixo
    const bodyProfile: [number, number][] = [
      [0, -0.48],     // base
      [0.18, -0.47],
      [0.30, -0.44],
      [0.36, -0.38],
      [0.38, -0.30],  // bojo inferior (mais largo)
      [0.37, -0.20],
      [0.34, -0.10],
      [0.28, -0.02],  // cintura
      [0.26, 0.0],    // cintura (ponto mais estreito)
      [0.28, 0.02],
      [0.32, 0.08],
      [0.34, 0.14],
      [0.33, 0.20],   // bojo superior
      [0.30, 0.24],
      [0.24, 0.27],
      [0.16, 0.29],
      [0.06, 0.30],
      [0, 0.30],      // topo (onde conecta o braco)
    ];

    const points = bodyProfile.map(
      ([x, y]) => new THREE.Vector2(x, y)
    );

    // Tampo (frente) - disco achatado seguindo o perfil
    const topShape = new THREE.LatheGeometry(points, 64);
    // Escalar no eixo Z para achatar (violao e fino)
    const topPositions = topShape.attributes.position;
    for (let i = 0; i < topPositions.count; i++) {
      const z = topPositions.getZ(i);
      topPositions.setZ(i, z > 0 ? Math.min(z, 0.05) : Math.max(z, -0.05));
    }

    // Criar a forma completa: frente e costas com lados
    const bodyDepth = 0.09;

    // Tampo frontal
    const topGeo = new THREE.LatheGeometry(points, 64);
    const topPos = topGeo.attributes.position;
    for (let i = 0; i < topPos.count; i++) {
      const z = topPos.getZ(i);
      const x = topPos.getX(i);
      // Achatar e curvar levemente (abaulamento do tampo)
      const radius = Math.sqrt(x * x + z * z);
      const maxR = 0.38;
      const bulge = (1 - (radius / maxR) ** 2) * 0.015;
      topPos.setZ(i, z > 0 ? bodyDepth / 2 + bulge : -(bodyDepth / 2 + bulge));
      topPos.setX(i, x);
    }
    topGeo.computeVertexNormals();

    // Fundo
    const backGeo = topGeo.clone();
    const backPos = backGeo.attributes.position;
    for (let i = 0; i < backPos.count; i++) {
      backPos.setZ(i, -backPos.getZ(i));
    }
    backGeo.computeVertexNormals();

    return { topGeometry: topGeo, backGeometry: backGeo };
  }, []);

  return (
    <group position={[0, -0.3, 0]}>
      {/* Tampo */}
      <mesh geometry={topGeometry} material={topMaterial} castShadow />
      {/* Fundo */}
      <mesh geometry={backGeometry} material={backMaterial} castShadow />
      {/* Filetes decorativos ao redor do tampo */}
      <mesh position={[0, 0, 0.046]}>
        <torusGeometry args={[0.32, 0.003, 8, 64]} />
        <meshStandardMaterial color="#F5F0E0" roughness={0.3} />
      </mesh>
    </group>
  );
}
