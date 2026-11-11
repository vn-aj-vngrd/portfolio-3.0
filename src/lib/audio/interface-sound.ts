/**
 * Interface sounds, synthesized in the browser: no files to load, no latency, and the notes sit in the
 * same F major pentatonic as the guided tour's score so the site has one voice. Soft sine plucks with a
 * fast attack and an exponential decay; the click adds a low, damped "press" and a tiny transient.
 */
export type InterfaceSound = "hover" | "focus" | "click" | "enable";

type Voice = {
  freq: number;
  start?: number;
  dur: number;
  gain: number;
  glideTo?: number;
  overtone?: number;
};

// F major pentatonic (F G A C D), one octave above middle C and the one above.
const HOVER_NOTES = [698.46, 783.99, 880, 1046.5, 1174.66];
const HOVER_GAP_MS = 60;

let context: AudioContext | null = null;
let master: GainNode | null = null;
let lastHoverAt = 0;
let lastHoverNote = -1;

function ensureContext() {
  if (context) return context;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  context = new Ctor({ latencyHint: "interactive" });

  const compressor = context.createDynamicsCompressor();
  compressor.threshold.value = -18;
  compressor.ratio.value = 4;
  compressor.attack.value = 0.003;
  compressor.release.value = 0.12;

  const tone = context.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 6200;
  tone.Q.value = 0.4;

  master = context.createGain();
  master.gain.value = 0.9;
  master.connect(tone).connect(compressor).connect(context.destination);
  return context;
}

/** Call from a user gesture (the toggle) so the browser lets the context run. */
export function unlockInterfaceAudio() {
  const ctx = ensureContext();
  if (ctx && ctx.state === "suspended") void ctx.resume();
}

function pluck(ctx: AudioContext, voice: Voice) {
  if (!master) return;
  const t0 = ctx.currentTime + (voice.start ?? 0);
  const end = t0 + voice.dur;

  const env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, t0);
  env.gain.exponentialRampToValueAtTime(voice.gain, t0 + 0.005);
  env.gain.exponentialRampToValueAtTime(0.0001, end);
  env.connect(master);

  const body = ctx.createOscillator();
  body.type = "sine";
  body.frequency.setValueAtTime(voice.freq, t0);
  if (voice.glideTo) {
    body.frequency.exponentialRampToValueAtTime(voice.glideTo, end);
  }
  body.connect(env);
  body.start(t0);
  body.stop(end + 0.02);

  if (voice.overtone) {
    const upper = ctx.createOscillator();
    const upperGain = ctx.createGain();
    upper.type = "sine";
    upper.frequency.setValueAtTime(voice.freq * voice.overtone, t0);
    upperGain.gain.value = 0.22;
    upper.connect(upperGain).connect(env);
    upper.start(t0);
    upper.stop(end + 0.02);
  }
}

/** A few milliseconds of high-passed noise: the tactile edge of a press. */
function transient(ctx: AudioContext, gain: number) {
  if (!master) return;
  const length = Math.floor(ctx.sampleRate * 0.012);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 2;
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const highpass = ctx.createBiquadFilter();
  highpass.type = "highpass";
  highpass.frequency.value = 2800;
  const level = ctx.createGain();
  level.gain.value = gain;
  source.connect(highpass).connect(level).connect(master);
  source.start();
}

export function playInterfaceSound(name: InterfaceSound) {
  const ctx = ensureContext();
  if (!ctx) return;
  if (ctx.state === "suspended") void ctx.resume();

  if (name === "hover") {
    const now = performance.now();
    if (now - lastHoverAt < HOVER_GAP_MS) return;
    lastHoverAt = now;
    let index = Math.floor(Math.random() * HOVER_NOTES.length);
    if (index === lastHoverNote) index = (index + 1) % HOVER_NOTES.length;
    lastHoverNote = index;
    pluck(ctx, {
      freq: HOVER_NOTES[index],
      dur: 0.11,
      gain: 0.03,
      overtone: 2,
    });
    return;
  }

  if (name === "click") {
    transient(ctx, 0.05);
    pluck(ctx, { freq: 190, glideTo: 112, dur: 0.1, gain: 0.2 });
    pluck(ctx, {
      freq: 1046.5,
      start: 0.012,
      dur: 0.14,
      gain: 0.045,
      overtone: 2,
    });
    return;
  }

  if (name === "focus") {
    pluck(ctx, { freq: 880, glideTo: 932, dur: 0.15, gain: 0.05, overtone: 2 });
    return;
  }

  // enable: a calm rising fifth, F then C.
  pluck(ctx, { freq: 698.46, dur: 0.55, gain: 0.08, overtone: 2 });
  pluck(ctx, { freq: 1046.5, start: 0.11, dur: 0.7, gain: 0.07, overtone: 2 });
}
