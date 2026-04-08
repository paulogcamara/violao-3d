import { useMemo } from "react";
import * as THREE from "three";

/**
 * Gera textura procedural de madeira usando canvas.
 */
function generateWoodTexture(
  baseColor: string,
  grainColor: string,
  width = 512,
  height = 512,
  grainDensity = 60
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;

  // Base
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, width, height);

  // Veios da madeira
  ctx.strokeStyle = grainColor;
  ctx.globalAlpha = 0.3;

  for (let i = 0; i < grainDensity; i++) {
    ctx.beginPath();
    ctx.lineWidth = Math.random() * 2 + 0.5;

    const startY = Math.random() * height;
    ctx.moveTo(0, startY);

    for (let x = 0; x < width; x += 10) {
      const wobble = Math.sin(x * 0.02 + i) * 3 + Math.sin(x * 0.005) * 8;
      ctx.lineTo(x, startY + wobble + (Math.random() - 0.5) * 2);
    }

    ctx.stroke();
  }

  // Variacao sutil de tom
  ctx.globalAlpha = 0.08;
  for (let i = 0; i < 20; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const radius = Math.random() * 80 + 20;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, i % 2 === 0 ? "#ffffff" : "#000000");
    gradient.addColorStop(1, "transparent");
    ctx.fillStyle = gradient;
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function useWoodMaterial(type: "spruce" | "rosewood" | "ebony" | "cedar") {
  return useMemo(() => {
    const configs = {
      spruce: {
        base: "#C8A55A",
        grain: "#9E7B3A",
        color: "#C8A55A",
        roughness: 0.55,
        metalness: 0.02,
        clearcoat: 0.6,
      },
      rosewood: {
        base: "#5A2D0C",
        grain: "#3A1A06",
        color: "#6B3410",
        roughness: 0.45,
        metalness: 0.03,
        clearcoat: 0.8,
      },
      ebony: {
        base: "#1A0E08",
        grain: "#0D0604",
        color: "#1A0E08",
        roughness: 0.3,
        metalness: 0.02,
        clearcoat: 0.9,
      },
      cedar: {
        base: "#8B6234",
        grain: "#6B4A28",
        color: "#8B6234",
        roughness: 0.5,
        metalness: 0.02,
        clearcoat: 0.5,
      },
    };

    const cfg = configs[type];
    const map = generateWoodTexture(cfg.base, cfg.grain);

    return new THREE.MeshPhysicalMaterial({
      map,
      color: cfg.color,
      roughness: cfg.roughness,
      metalness: cfg.metalness,
      clearcoat: cfg.clearcoat,
      clearcoatRoughness: 0.3,
    });
  }, [type]);
}
