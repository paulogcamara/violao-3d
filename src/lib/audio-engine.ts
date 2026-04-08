import type { StringId } from "@/types/audio";

let audioEngine: AudioEngine | null = null;
let initPromise: Promise<AudioEngine> | null = null;

class AudioEngine {
  private ctx: AudioContext | null = null;
  private convolver: ConvolverNode | null = null;
  ready = false;

  async init(): Promise<void> {
    this.ctx = new AudioContext();

    // Criar reverb com impulse response sintetico
    const sampleRate = this.ctx.sampleRate;
    const length = sampleRate * 2.5;
    const impulse = this.ctx.createBuffer(2, length, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2.5);
      }
    }

    this.convolver = this.ctx.createConvolver();
    this.convolver.buffer = impulse;

    const wet = this.ctx.createGain();
    wet.gain.value = 0.25;
    this.convolver.connect(wet);
    wet.connect(this.ctx.destination);

    this.ready = true;
  }

  async resume(): Promise<void> {
    if (this.ctx?.state === "suspended") {
      await this.ctx.resume();
    }
  }

  pluck(_note: StringId, frequency: number): void {
    if (!this.ctx || !this.ready) return;

    // Karplus-Strong synthesis
    const sampleRate = this.ctx.sampleRate;
    const duration = 3;
    const samples = sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, samples, sampleRate);
    const data = buffer.getChannelData(0);

    // Periodo baseado na frequencia
    const period = Math.round(sampleRate / frequency);

    // Burst de ruido branco inicial
    for (let i = 0; i < period; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    // Karplus-Strong: media de amostras adjacentes com leve decaimento
    const dampingFactor = 0.996;
    for (let i = period; i < samples; i++) {
      data[i] =
        dampingFactor * 0.5 * (data[i - period] + data[i - period + 1]);
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;

    const gainNode = this.ctx.createGain();
    gainNode.gain.value = 0.4;

    source.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    // Tambem conectar ao reverb
    if (this.convolver) {
      gainNode.connect(this.convolver);
    }

    source.start();
  }

  playArpeggio(
    notes: { id: StringId; frequency: number }[],
    interval = 300
  ): void {
    notes.forEach((note, i) => {
      setTimeout(() => {
        this.pluck(note.id, note.frequency);
      }, i * interval);
    });
  }

  destroy(): void {
    this.ctx?.close();
    this.ctx = null;
    this.ready = false;
  }
}

export async function getAudioEngine(): Promise<AudioEngine> {
  if (audioEngine?.ready) return audioEngine;

  if (!initPromise) {
    initPromise = (async () => {
      const engine = new AudioEngine();
      await engine.init();
      audioEngine = engine;
      return engine;
    })();
  }

  return initPromise;
}

export function getAudioEngineSync(): AudioEngine | null {
  return audioEngine;
}

export type { AudioEngine };
