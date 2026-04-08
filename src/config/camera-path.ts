import * as THREE from "three";

interface CameraKeyframe {
  progress: number;
  position: [number, number, number];
  lookAt: [number, number, number];
}

// Para posicionar o violao na DIREITA da tela: camera olha para a direita do centro
// Para posicionar o violao na ESQUERDA da tela: camera olha para a esquerda do centro

const KEYFRAMES: CameraKeyframe[] = [
  // Hero: violao na DIREITA (camera deslocada pra esquerda)
  { progress: 0.0, position: [-1.5, 0.5, 7], lookAt: [0.8, 0, 0] },
  { progress: 0.04, position: [-1.2, 0.3, 4.5], lookAt: [0.8, 0, 0] },
  { progress: 0.07, position: [-1.0, 0.2, 3.2], lookAt: [0.6, 0, 0] },

  // Overview: violao na DIREITA
  { progress: 0.09, position: [-0.8, 0.3, 3.5], lookAt: [0.6, 0, 0] },
  { progress: 0.12, position: [-0.6, 0.1, 3.0], lookAt: [0.5, -0.1, 0] },
  { progress: 0.14, position: [-0.6, 0.1, 3.0], lookAt: [0.5, -0.1, 0] },

  // E2 (6a corda): violao na DIREITA, zoom no braco superior, inclinado 45 graus
  { progress: 0.16, position: [-0.6, 0.9, 1.0], lookAt: [0.3, 0.9, 0.05] },
  { progress: 0.22, position: [-0.6, 0.8, 1.0], lookAt: [0.3, 0.8, 0.05] },

  // A2 (5a corda): violao na ESQUERDA, zoom braco
  { progress: 0.24, position: [0.6, 0.7, 1.0], lookAt: [-0.3, 0.7, 0.05] },
  { progress: 0.30, position: [0.6, 0.6, 1.0], lookAt: [-0.3, 0.6, 0.05] },

  // D3 (4a corda): violao na DIREITA
  { progress: 0.32, position: [-0.6, 0.5, 1.0], lookAt: [0.3, 0.5, 0.05] },
  { progress: 0.38, position: [-0.6, 0.4, 1.0], lookAt: [0.3, 0.4, 0.05] },

  // G3 (3a corda): violao na ESQUERDA
  { progress: 0.40, position: [0.6, 0.3, 1.0], lookAt: [-0.3, 0.3, 0.05] },
  { progress: 0.46, position: [0.6, 0.2, 1.0], lookAt: [-0.3, 0.2, 0.05] },

  // B3 (2a corda): violao na DIREITA
  { progress: 0.48, position: [-0.6, 0.1, 1.0], lookAt: [0.3, 0.1, 0.05] },
  { progress: 0.54, position: [-0.6, 0.0, 1.0], lookAt: [0.3, 0.0, 0.05] },

  // E4 (1a corda): violao na ESQUERDA
  { progress: 0.56, position: [0.6, -0.1, 1.0], lookAt: [-0.3, -0.1, 0.05] },
  { progress: 0.62, position: [0.6, -0.2, 1.0], lookAt: [-0.3, -0.2, 0.05] },

  // Escalas: corpo do violao na DIREITA
  { progress: 0.65, position: [-0.8, 0.1, 2.5], lookAt: [0.5, 0, 0] },
  { progress: 0.72, position: [-0.7, 0.0, 2.5], lookAt: [0.5, -0.1, 0] },

  // Interactive: violao na DIREITA
  { progress: 0.76, position: [-1.5, 0.1, 2.8], lookAt: [0.8, 0, 0] },
  { progress: 0.84, position: [-1.5, 0.1, 2.8], lookAt: [0.8, 0, 0] },

  // Music: violao na DIREITA
  { progress: 0.88, position: [-0.6, 0.2, 3.5], lookAt: [0.4, 0, 0] },
  { progress: 0.92, position: [-0.5, 0.1, 3.5], lookAt: [0.3, 0, 0] },

  // Footer: CENTRALIZADO
  { progress: 0.95, position: [0, 0.5, 4.0], lookAt: [0, 0, 0] },
  { progress: 1.0, position: [0, 2, 5.5], lookAt: [0, 0, 0] },
];

function buildCurve(
  extractFn: (kf: CameraKeyframe) => [number, number, number]
): THREE.CatmullRomCurve3 {
  const points = KEYFRAMES.map((kf) => new THREE.Vector3(...extractFn(kf)));
  return new THREE.CatmullRomCurve3(points, false, "catmullrom", 0.5);
}

export const positionCurve = buildCurve((kf) => kf.position);
export const lookAtCurve = buildCurve((kf) => kf.lookAt);

export const keyframeProgresses = KEYFRAMES.map((kf) => kf.progress);

export function getProgressOnCurve(scrollProgress: number): number {
  const progresses = keyframeProgresses;
  const n = progresses.length;

  if (scrollProgress <= progresses[0]) return 0;
  if (scrollProgress >= progresses[n - 1]) return 1;

  for (let i = 0; i < n - 1; i++) {
    if (
      scrollProgress >= progresses[i] &&
      scrollProgress <= progresses[i + 1]
    ) {
      const t =
        (scrollProgress - progresses[i]) /
        (progresses[i + 1] - progresses[i]);
      const curveStart = i / (n - 1);
      const curveEnd = (i + 1) / (n - 1);
      return curveStart + t * (curveEnd - curveStart);
    }
  }

  return 1;
}
