"use client";

import { useTheme } from "next-themes";
import {
  type ReactNode,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";

type ThemeChoice = "system" | "light" | "dark";
type InterfaceSound = "hover" | "focus" | "click" | "enable";

const soundFiles: Record<InterfaceSound, string> = {
  hover: "/sounds/hover.wav",
  focus: "/sounds/focus.wav",
  click: "/sounds/click.wav",
  enable: "/sounds/enable.wav",
};

const themes: { value: ThemeChoice; label: string; icon: ReactNode }[] = [
  {
    value: "system",
    label: "Use system theme",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="4.5" width="17" height="11.5" rx="1.5" />
        <path d="M9 20h6M12 16v4" />
      </svg>
    ),
  },
  {
    value: "light",
    label: "Use light theme",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3.5" />
        <path d="M12 2.5v2M12 19.5v2M4.5 12h-2M21.5 12h-2M5.4 5.4 4 4M20 20l-1.4-1.4M18.6 5.4 20 4M4 20l1.4-1.4" />
      </svg>
    ),
  },
  {
    value: "dark",
    label: "Use dark theme",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.2 15.2A8.5 8.5 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z" />
      </svg>
    ),
  },
];

export function InterfaceControls() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef<Partial<Record<InterfaceSound, HTMLAudioElement>>>({});

  const playSound = (name: InterfaceSound, volume: number) => {
    const audio = audioRef.current[name] ?? new Audio(soundFiles[name]);
    audioRef.current[name] = audio;
    audio.volume = volume;
    audio.currentTime = 0;
    void audio.play().catch(() => undefined);
  };

  useEffect(() => {
    for (const [name, src] of Object.entries(soundFiles)) {
      const audio = new Audio(src);
      audio.preload = "auto";
      audioRef.current[name as InterfaceSound] = audio;
    }

    const frame = requestAnimationFrame(() => {
      setSoundEnabled(localStorage.getItem("interface-sounds") === "on");
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!soundEnabled) return;

    let hoveredControl: Element | null = null;

    const findControl = (target: EventTarget | null) =>
      target instanceof Element
        ? target.closest("a, button, summary, [role='button']")
        : null;

    const handlePointerOver = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const control = findControl(event.target);
      if (!control || control === hoveredControl) return;

      hoveredControl = control;
      playSound("hover", 0.5);
    };

    const handlePointerOut = (event: PointerEvent) => {
      const control = findControl(event.target);
      if (!control) return;
      const nextControl = findControl(event.relatedTarget);
      if (nextControl !== control) hoveredControl = null;
    };

    const handlePointerDown = (event: PointerEvent) => {
      const control = findControl(event.target);
      if (!control) return;

      playSound("click", 0.72);
    };

    const handleFocus = (event: FocusEvent) => {
      const control = findControl(event.target);
      if (control?.matches(":focus-visible")) {
        playSound("focus", 0.55);
      }
    };

    document.addEventListener("pointerover", handlePointerOver, true);
    document.addEventListener("pointerout", handlePointerOut, true);
    document.addEventListener("pointerdown", handlePointerDown, true);
    document.addEventListener("focusin", handleFocus, true);

    return () => {
      document.removeEventListener("pointerover", handlePointerOver, true);
      document.removeEventListener("pointerout", handlePointerOut, true);
      document.removeEventListener("pointerdown", handlePointerDown, true);
      document.removeEventListener("focusin", handleFocus, true);
    };
  }, [soundEnabled]);

  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    localStorage.setItem("interface-sounds", next ? "on" : "off");

    if (next) {
      playSound("enable", 0.78);
    }
  };

  return (
    <div className="interface-controls" aria-label="Interface preferences">
      <div className="theme-options" role="group" aria-label="Color theme">
        {themes.map((choice) => (
          <button
            key={choice.value}
            type="button"
            onClick={() => setTheme(choice.value)}
            aria-label={choice.label}
            aria-pressed={mounted && theme === choice.value}
            title={choice.label}
          >
            {choice.icon}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="sound-toggle"
        onClick={toggleSound}
        aria-label={soundEnabled ? "Disable interface sounds" : "Enable interface sounds"}
        aria-pressed={soundEnabled}
        title={soundEnabled ? "Disable interface sounds" : "Enable interface sounds"}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 9.5v5h3.5l4 3.5V6l-4 3.5H5Z" />
          {soundEnabled ? (
            <path d="M16 9a4 4 0 0 1 0 6M18.5 6.5a7.5 7.5 0 0 1 0 11" />
          ) : (
            <path d="m16 10 5 5M21 10l-5 5" />
          )}
        </svg>
      </button>
    </div>
  );
}
