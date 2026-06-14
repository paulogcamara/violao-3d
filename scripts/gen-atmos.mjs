/**
 * Gera os plates de ATMOSFERA do Violão — quentes, escuros e ABSTRATOS
 * (luz, bokeh, brasa, madeira fora de foco). Por quê: a câmera orbita o
 * violão de perto, então o fundo não pode ser um cenário literal (brigaria
 * com a falta de parallax e roubaria o protagonismo). Ele lê como LUZ e
 * CLIMA, deixando o instrumento lit em primeiro plano.
 *
 * Uso: node scripts/gen-atmos.mjs [nome]   (sem arg = todos)
 */
import { execFileSync } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";

const GEN = "C:/Users/paulo.camara/Desktop/DAS/scripts/media/gen_image_gemini.py";
const OUT = path.resolve(import.meta.dirname, "..", "public", "atmos");
mkdirSync(OUT, { recursive: true });

const STYLE =
  "cinematic abstract atmosphere, warm golden and amber tones, deep black shadows, soft focus, " +
  "moody intimate light, fine film grain, no objects, no instruments, no people, no text, no watermark";

const PLATES = [
  {
    name: "stage-beam",
    prompt: "A single warm spotlight beam cutting through deep black darkness on an empty stage, golden dust motes floating in the light, heavy shadow around. " + STYLE,
  },
  {
    name: "wood-soul",
    prompt: "Extreme macro of warm spruce and rosewood guitar wood grain bathed in deep shadow, a soft golden light grazing the surface, rich amber tones, out of focus, abstract texture. " + STYLE,
  },
  {
    name: "deep-ember",
    prompt: "Abstract deep darkness with a faint warm ember glow low in the frame, amber and black, drifting smoke and shadow, very dark and grave. " + STYLE,
  },
  {
    name: "luminous-warm",
    prompt: "Soft luminous warm golden haze rising through darkness, glowing amber light, dreamy out-of-focus bokeh, warm and bright but moody, a feeling of song lifting. " + STYLE,
  },
  {
    name: "warm-bokeh",
    prompt: "Deep warm out-of-focus bokeh lights in a dark classical concert hall at night, golden orbs of blurred light, intimate and atmospheric. " + STYLE,
  },
];

const only = process.argv[2];
const list = only ? PLATES.filter((p) => p.name === only) : PLATES;

for (const pl of list) {
  const out = path.join(OUT, `${pl.name}.png`);
  console.log(`\n→ ${pl.name}`);
  try {
    const o = execFileSync("python", [GEN, "--prompt", pl.prompt, "--out", out, "--size", "inline", "--raw-style"], { encoding: "utf-8", timeout: 200000 });
    console.log(o.trim());
  } catch (e) {
    console.error("FALHOU", pl.name, e.stdout?.toString() || e.message);
  }
}
console.log("\nfim.");
