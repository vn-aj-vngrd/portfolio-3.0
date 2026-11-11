// The tour's generated score: warm pads, a soft bass and a sparse felt-piano motif
// through a generated reverb, in F major. Original, seeded and 0 bytes: nothing is
// sampled or downloaded, and it never loops audibly because it is generated.
// Pure note data (`scoreEvents`) is separate from playback (`startScore`) so it can be tested.

/** Linear gains: the bed sits well under the voice and ducks a further ~9.6 dB while it speaks. */
export const MUSIC_LEVEL = 0.9;
export const VOICE_LEVEL = 0.95;
export const DUCK_DEPTH = 0.33;

const CHORD_SECONDS = 8;
const RELEASE = 3.2;
const PIANO_ENTRY = 4;
// F major: Fmaj9, Dm9, Bbmaj9, C6/9sus (MIDI)
export const PROGRESSION: readonly (readonly number[])[] = [
  [53, 60, 64, 67, 69],
  [50, 57, 60, 64, 65],
  [46, 53, 57, 60, 62],
  [48, 55, 62, 64, 65],
];
// F major pentatonic
export const MELODY: readonly number[] = [65, 67, 69, 72, 74, 77, 79, 81, 84];

const hz = (midi: number) => 440 * Math.pow(2, (midi - 69) / 12);

function rng(seed: number) {
  let state = seed >>> 0 || 1;
  return () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export type NoteEvent = {
  kind: "pad" | "bass" | "piano";
  t: number;
  dur: number;
  midi: number;
  vel: number;
};

/** Every note for a score of `duration` seconds. Pure and seeded: same input, same notes. */
export function scoreEvents(duration: number, seed = 3): NoteEvent[] {
  const random = rng(seed);
  const events: NoteEvent[] = [];
  let degree = 4;
  for (
    let chord = 0;
    chord * CHORD_SECONDS < duration + CHORD_SECONDS;
    chord += 1
  ) {
    const t0 = chord * CHORD_SECONDS;
    const notes = PROGRESSION[chord % PROGRESSION.length];
    notes.forEach((midi, i) =>
      events.push({
        kind: "pad",
        t: t0,
        dur: CHORD_SECONDS,
        midi,
        vel: i === 0 ? 0.9 : 0.6 + 0.1 * random(),
      })
    );
    events.push({
      kind: "bass",
      t: t0,
      dur: CHORD_SECONDS,
      midi: notes[0] - 12,
      vel: 0.8,
    });
    if (t0 < PIANO_ENTRY) continue;
    for (let beat = 0; beat < CHORD_SECONDS; beat += 1) {
      const on = beat === 0 ? random() < 0.75 : random() < 0.32;
      if (!on) continue;
      degree = Math.min(
        MELODY.length - 1,
        Math.max(0, degree + Math.round((random() - 0.5) * 4))
      );
      events.push({
        kind: "piano",
        t: t0 + beat + (random() - 0.5) * 0.06,
        dur: 3.6,
        midi: MELODY[degree],
        vel: 0.45 + 0.4 * random(),
      });
    }
  }
  return events.sort((a, b) => a.t - b.t).filter((event) => event.t < duration);
}

/** A stereo hall: decaying, slightly darkening seeded noise. */
export function makeImpulse(ctx: BaseAudioContext, seconds = 4.2, seed = 11) {
  const length = Math.floor(ctx.sampleRate * seconds);
  const buffer = ctx.createBuffer(2, length, ctx.sampleRate);
  const random = rng(seed);
  for (let channel = 0; channel < 2; channel += 1) {
    const data = buffer.getChannelData(channel);
    let low = 0;
    for (let i = 0; i < length; i += 1) {
      const k = i / length;
      const a = 0.35 + 0.6 * k;
      low = low * a + (random() * 2 - 1) * (1 - a);
      data[i] = low * Math.pow(1 - k, 2.6) * 1.8;
    }
  }
  return buffer;
}

export type ScoreHandle = {
  /** Fade envelope node; the director automates it for the start, seeks and the ending. */
  level: GainNode;
  /** Context time the score began (note times are relative to it). */
  startedAt: number;
  /** Create notes that begin before context time `until`. Call often with a few seconds of lead. */
  schedule(until: number): void;
  /** Fade out over `fade` seconds and release every node. */
  stop(fade?: number): void;
};

const SCORE_SECONDS = 20 * 60;

export function startScore(
  ctx: BaseAudioContext,
  destination: AudioNode,
  options: { seed?: number } = {}
): ScoreHandle {
  const startedAt = ctx.currentTime;
  const events = scoreEvents(SCORE_SECONDS, options.seed ?? 3);
  const out = ctx.createGain();
  out.gain.value = 0;
  const dry = ctx.createGain();
  const send = ctx.createGain();
  const wet = ctx.createGain();
  const reverb = ctx.createConvolver();
  const padLowpass = ctx.createBiquadFilter();
  const pianoLowpass = ctx.createBiquadFilter();
  const pianoSend = ctx.createGain();
  padLowpass.type = "lowpass";
  padLowpass.frequency.value = 1100;
  padLowpass.Q.value = 0.4;
  pianoLowpass.type = "lowpass";
  pianoLowpass.frequency.value = 2400;
  pianoLowpass.Q.value = 0.3;
  reverb.buffer = makeImpulse(ctx);
  dry.gain.value = 0.75;
  send.gain.value = 0.5;
  pianoSend.gain.value = 0.9;
  wet.gain.value = 0.6;
  padLowpass.connect(dry);
  padLowpass.connect(send);
  pianoLowpass.connect(dry);
  pianoLowpass.connect(pianoSend);
  send.connect(reverb);
  pianoSend.connect(reverb);
  reverb.connect(wet);
  wet.connect(out);
  dry.connect(out);
  out.connect(destination);

  let next = 0;
  const live = new Set<AudioScheduledSourceNode>();
  const track = (node: AudioScheduledSourceNode) => {
    live.add(node);
    node.onended = () => {
      live.delete(node);
      node.disconnect();
    };
  };

  function voice(event: NoteEvent) {
    const start = Math.max(startedAt + event.t, ctx.currentTime);
    const frequency = hz(event.midi);
    if (event.kind === "piano") {
      const amp = ctx.createGain();
      amp.connect(pianoLowpass);
      amp.gain.setValueAtTime(0, start);
      amp.gain.linearRampToValueAtTime(0.16 * event.vel, start + 0.012);
      amp.gain.exponentialRampToValueAtTime(0.0008, start + event.dur);
      for (const [multiple, level] of [
        [1, 1],
        [2, 0.22],
        [3, 0.06],
        [4, 0.03],
      ]) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = frequency * multiple;
        osc.detune.value = multiple === 1 ? 0 : 2 * multiple;
        gain.gain.value = level;
        osc.connect(gain);
        gain.connect(amp);
        osc.start(start);
        osc.stop(start + event.dur + 0.05);
        track(osc);
      }
      return;
    }
    const end = startedAt + event.t + event.dur;
    const amp = ctx.createGain();
    amp.connect(padLowpass);
    const peak = (event.kind === "bass" ? 0.11 : 0.045) * event.vel;
    amp.gain.setValueAtTime(0, start);
    amp.gain.linearRampToValueAtTime(
      peak,
      Math.min(end, Math.max(start + 0.3, startedAt + event.t + 2.8))
    );
    amp.gain.setValueAtTime(peak, end);
    amp.gain.linearRampToValueAtTime(0, end + RELEASE);
    for (const detune of event.kind === "bass" ? [0] : [-5, 6]) {
      const osc = ctx.createOscillator();
      osc.type = event.kind === "bass" ? "sine" : "triangle";
      osc.frequency.value = frequency;
      osc.detune.value = detune;
      osc.connect(amp);
      osc.start(start);
      osc.stop(end + RELEASE + 0.05);
      track(osc);
    }
  }

  return {
    level: out,
    startedAt,
    schedule(until) {
      while (next < events.length && startedAt + events[next].t <= until) {
        voice(events[next]);
        next += 1;
      }
    },
    stop(fade = 0.6) {
      const t = ctx.currentTime;
      out.gain.cancelScheduledValues(t);
      out.gain.setValueAtTime(out.gain.value, t);
      out.gain.linearRampToValueAtTime(0, t + fade);
      next = events.length;
      for (const node of live) {
        try {
          node.stop(t + fade + 0.05);
        } catch {
          // Not started yet.
        }
      }
      window.setTimeout(() => out.disconnect(), (fade + 0.2) * 1000);
    },
  };
}
