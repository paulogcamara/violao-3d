export interface LightPreset {
  ambient: { color: string; intensity: number };
  key: { color: string; intensity: number; position: [number, number, number] };
  fill: { color: string; intensity: number; position: [number, number, number] };
  rim: { color: string; intensity: number; position: [number, number, number] };
}

export const LIGHT_PRESETS: Record<string, LightPreset> = {
  hero: {
    ambient: { color: "#1a1a2e", intensity: 0.02 },
    key: { color: "#F5A623", intensity: 2.5, position: [3, 4, 2] },
    fill: { color: "#2a1a0a", intensity: 0.3, position: [-2, 1, 3] },
    rim: { color: "#F5A623", intensity: 1.5, position: [-2, 3, -2] },
  },
  overview: {
    ambient: { color: "#2a2a3e", intensity: 0.15 },
    key: { color: "#FFF5E6", intensity: 2.0, position: [2, 3, 2] },
    fill: { color: "#8B7355", intensity: 0.8, position: [-3, 1, 2] },
    rim: { color: "#C4A35A", intensity: 0.6, position: [0, 2, -3] },
  },
  // Cordas: iluminacao focada lateral
  "string-e2": {
    ambient: { color: "#1a1a28", intensity: 0.08 },
    key: { color: "#FFE8C4", intensity: 2.2, position: [-2, 2, 2] },
    fill: { color: "#4a3a2a", intensity: 0.6, position: [2, 0, 1] },
    rim: { color: "#C4A35A", intensity: 1.2, position: [1, 1, -1] },
  },
  "string-a2": {
    ambient: { color: "#1a1a28", intensity: 0.08 },
    key: { color: "#FFE4B8", intensity: 2.2, position: [-2, 1.5, 2] },
    fill: { color: "#4a3a2a", intensity: 0.6, position: [2, 0, 1] },
    rim: { color: "#B89256", intensity: 1.2, position: [1, 0.5, -1] },
  },
  "string-d3": {
    ambient: { color: "#1a1a28", intensity: 0.08 },
    key: { color: "#FFDFA8", intensity: 2.2, position: [-2, 1, 2] },
    fill: { color: "#4a3a2a", intensity: 0.6, position: [2, 0, 1] },
    rim: { color: "#A88348", intensity: 1.2, position: [1, 0.2, -1] },
  },
  "string-g3": {
    ambient: { color: "#1a1a28", intensity: 0.1 },
    key: { color: "#FFF0E0", intensity: 2.0, position: [-2, 0.5, 2] },
    fill: { color: "#3a4a5a", intensity: 0.5, position: [2, 0, 1] },
    rim: { color: "#E8E0D0", intensity: 0.8, position: [1, 0, -1] },
  },
  "string-b3": {
    ambient: { color: "#1a1a28", intensity: 0.1 },
    key: { color: "#FFF4E8", intensity: 2.0, position: [-2, 0, 2] },
    fill: { color: "#3a4a5a", intensity: 0.5, position: [2, 0, 1] },
    rim: { color: "#E8E0D0", intensity: 0.8, position: [1, -0.2, -1] },
  },
  "string-e4": {
    ambient: { color: "#1a1a28", intensity: 0.1 },
    key: { color: "#FFF8F0", intensity: 2.0, position: [-2, -0.5, 2] },
    fill: { color: "#3a4a5a", intensity: 0.5, position: [2, 0, 1] },
    rim: { color: "#E8E0D0", intensity: 0.8, position: [1, -0.5, -1] },
  },
  scales: {
    ambient: { color: "#1a2030", intensity: 0.12 },
    key: { color: "#FFE8D0", intensity: 1.8, position: [0, 3, 3] },
    fill: { color: "#5a4a3a", intensity: 0.7, position: [-2, 0, 2] },
    rim: { color: "#D4A664", intensity: 0.8, position: [2, 1, -2] },
  },
  interactive: {
    ambient: { color: "#2a2a3e", intensity: 0.15 },
    key: { color: "#FFF5E6", intensity: 2.0, position: [2, 3, 3] },
    fill: { color: "#6a5a4a", intensity: 0.8, position: [-2, 1, 2] },
    rim: { color: "#C4A35A", intensity: 0.6, position: [0, 2, -3] },
  },
  music: {
    ambient: { color: "#0a0a2e", intensity: 0.06 },
    key: { color: "#FF8C42", intensity: 2.8, position: [3, 3, 2] },
    fill: { color: "#1a2a5a", intensity: 0.6, position: [-3, 1, 2] },
    rim: { color: "#4a6aff", intensity: 2.0, position: [-2, 2, -3] },
  },
  footer: {
    ambient: { color: "#0a0a0a", intensity: 0.02 },
    key: { color: "#F5A623", intensity: 0.8, position: [2, 4, 2] },
    fill: { color: "#1a1a1a", intensity: 0.1, position: [-2, 1, 3] },
    rim: { color: "#F5A623", intensity: 0.3, position: [-2, 3, -2] },
  },
};
