import * as THREE from "three";
import vertexShader from "./string-vibration.vert";
import fragmentShader from "./string-vibration.frag";

interface StringMaterialOptions {
  baseColor: string;
  glowColor?: string;
  frequency: number;
  amplitude: number;
  damping: number;
}

export function createStringMaterial(
  options: StringMaterialOptions
): THREE.ShaderMaterial {
  const { baseColor, glowColor, frequency, amplitude, damping } = options;

  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      u_time: { value: 0 },
      u_pluckTime: { value: -1 },
      u_frequency: { value: frequency },
      u_amplitude: { value: amplitude },
      u_damping: { value: damping },
      u_hover: { value: 0 },
      u_baseColor: { value: new THREE.Color(baseColor) },
      u_glowColor: {
        value: new THREE.Color(glowColor ?? baseColor).multiplyScalar(1.5),
      },
    },
    toneMapped: false,
  });
}
