// Browser-side narration helpers: fetch once, decode on demand, play on the audio clock.
const raw = new Map<string, Promise<ArrayBuffer>>();

/** Fetch the bytes once; later decodes and preloads share the same request. */
export function fetchNarration(url: string) {
  let pending = raw.get(url);
  if (!pending) {
    pending = fetch(url).then((response) => {
      if (!response.ok)
        throw new Error(`Narration ${url} returned ${response.status}`);
      return response.arrayBuffer();
    });
    pending.catch(() => raw.delete(url));
    raw.set(url, pending);
  }
  return pending;
}

export async function loadStopBuffer(ctx: BaseAudioContext, url: string) {
  const bytes = await fetchNarration(url);
  return ctx.decodeAudioData(bytes.slice(0));
}

export function playStop(
  ctx: BaseAudioContext,
  destination: AudioNode,
  buffer: AudioBuffer,
  atContextTime: number,
  offset = 0
) {
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(destination);
  source.start(Math.max(atContextTime, 0), Math.max(offset, 0));
  return source;
}
