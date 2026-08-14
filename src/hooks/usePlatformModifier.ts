"use client";

import { useSyncExternalStore } from "react";

export type PlatformModifier = "⌘" | "Ctrl";

const subscribe = () => () => undefined;

function detectPlatformModifier(): PlatformModifier {
  const platform = navigator.platform || navigator.userAgent;
  return /Mac|iPhone|iPad|iPod/i.test(platform) ? "⌘" : "Ctrl";
}

export function usePlatformModifier() {
  return useSyncExternalStore<PlatformModifier | null>(
    subscribe,
    detectPlatformModifier,
    () => null,
  );
}

export function isPlatformModifierPressed(
  event: KeyboardEvent,
  modifier: PlatformModifier | null,
) {
  if (modifier === "⌘") return event.metaKey;
  if (modifier === "Ctrl") return event.ctrlKey;
  return event.metaKey || event.ctrlKey;
}
