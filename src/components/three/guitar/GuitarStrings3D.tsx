import { useRef, useMemo, useCallback } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { GUITAR_STRINGS } from "@/config/strings";
import { getAudioEngine } from "@/lib/audio-engine";

interface StringState {
  pluckTime: number;
  hovered: boolean;
  hoverAmount: number;
}

/**
 * Cordas 3D realistas com vibracao via CPU vertex displacement.
 * Usa TubeGeometry fina com muitos segmentos para vibracao suave.
 */
export function GuitarStrings3D() {
  const { gl } = useThree();

  // Posicoes das cordas: da pestana (nut) ao cavalete (bridge)
  const stringStartY = 1.175; // Pestana
  const stringEndY = -0.575;  // Rastilho
  const stringZ = 0.052;
  const stringSpacing = 0.008;
  const startX = -stringSpacing * 2.5;

  const stringsData = useMemo(() => {
    return GUITAR_STRINGS.map((config, i) => {
      const x = startX + i * stringSpacing;
      const length = stringStartY - stringEndY;

      // Criar tubo com muitos segmentos para vibracao
      const segments = 64;
      const curve = new THREE.LineCurve3(
        new THREE.Vector3(x, stringStartY, stringZ),
        new THREE.Vector3(x, stringEndY, stringZ)
      );

      // Raio varia: bordoes (E2, A2, D3) mais grossos, agudas (G3, B3, E4) mais finas
      const radius = i < 3 ? 0.0006 - i * 0.00005 : 0.0004 - (i - 3) * 0.00003;

      const geometry = new THREE.TubeGeometry(curve, segments, radius, 6, false);

      // Material metalico para bordoes, nylon para agudas
      const isBass = i < 3;
      const material = new THREE.MeshPhysicalMaterial({
        color: isBass ? "#B8976A" : "#E8E0D0",
        roughness: isBass ? 0.3 : 0.4,
        metalness: isBass ? 0.85 : 0.05,
        clearcoat: isBass ? 0.4 : 0.2,
        emissive: config.color,
        emissiveIntensity: 0,
        toneMapped: false,
      });

      // Hit proxy
      const hitGeometry = new THREE.TubeGeometry(curve, 8, 0.006, 6, false);

      return {
        config,
        geometry,
        material,
        hitGeometry,
        x,
        radius,
        length,
        isBass,
      };
    });
  }, []);

  const statesRef = useRef<StringState[]>(
    GUITAR_STRINGS.map(() => ({ pluckTime: -10, hovered: false, hoverAmount: 0 }))
  );

  const handleHover = useCallback(
    (index: number, enter: boolean) => {
      statesRef.current[index].hovered = enter;
      gl.domElement.style.cursor = enter ? "pointer" : "default";
    },
    [gl]
  );

  const handlePluck = useCallback(async (index: number) => {
    const state = statesRef.current[index];
    state.pluckTime = performance.now() / 1000;

    const config = GUITAR_STRINGS[index];
    try {
      const audio = await getAudioEngine();
      await audio.resume();
      audio.pluck(config.id, config.frequency);
    } catch {
      // silencioso
    }
  }, []);

  useFrame(() => {
    const now = performance.now() / 1000;

    stringsData.forEach(({ geometry, material, config, x }, i) => {
      const state = statesRef.current[i];
      const elapsed = now - state.pluckTime;

      // Hover glow
      const targetHover = state.hovered ? 1 : 0;
      state.hoverAmount += (targetHover - state.hoverAmount) * 0.12;
      material.emissiveIntensity = state.hoverAmount * 0.5;

      // Vibracao
      if (elapsed > 0 && elapsed < 4) {
        const positions = geometry.attributes.position;
        const count = positions.count;
        const damping = Math.exp(-config.damping * elapsed);
        const freq = config.frequency * 0.08;

        for (let v = 0; v < count; v++) {
          const origY = positions.getY(v);
          // Posicao normalizada ao longo da corda (0 = pestana, 1 = cavalete)
          const t = (stringStartY - origY) / (stringStartY - stringEndY);
          // Envelope: zero nas extremidades, maximo no centro
          const envelope = Math.sin(Math.PI * t);
          // Onda: fundamental + harmonico
          const wave =
            Math.sin(2 * Math.PI * freq * elapsed) +
            0.3 * Math.sin(4 * Math.PI * freq * elapsed) * Math.sin(2 * Math.PI * t);

          const displacement = config.amplitude * damping * envelope * wave;

          // Deslocar no eixo X (perpendicular a corda)
          positions.setX(v, x + displacement);
          // Leve deslocamento Z para mais volume visual
          positions.setZ(v, stringZ + displacement * 0.3);
        }

        positions.needsUpdate = true;

        // Glow durante vibracao
        material.emissiveIntensity = Math.max(
          state.hoverAmount * 0.5,
          damping * 1.5
        );
      } else if (elapsed >= 4 && elapsed < 4.1) {
        // Reset das posicoes
        const positions = geometry.attributes.position;
        for (let v = 0; v < positions.count; v++) {
          positions.setX(v, x);
          positions.setZ(v, stringZ);
        }
        positions.needsUpdate = true;
        if (!state.hovered) material.emissiveIntensity = 0;
      }
    });
  });

  return (
    <group>
      {stringsData.map(({ geometry, material, hitGeometry }, i) => (
        <group key={GUITAR_STRINGS[i].id}>
          {/* Corda visual */}
          <mesh geometry={geometry} material={material} />

          {/* Hit proxy invisivel */}
          <mesh
            geometry={hitGeometry}
            visible={false}
            onPointerEnter={() => handleHover(i, true)}
            onPointerLeave={() => handleHover(i, false)}
            onClick={() => handlePluck(i)}
          >
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
