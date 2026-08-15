"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export type LabGame = "stack" | "ship" | "match";

type ProductLabSceneProps = {
  game: LabGame | null;
  stackCount: number;
  stackComplete: boolean;
  stackOptionCount: number;
  matchSelection: number;
  matchRound: number;
  matchComplete: boolean;
  onSelectStackOption: (index: number) => void;
  onSelectMatch: (index: number) => void;
};

type Palette = {
  canvas: THREE.Color;
  surface: THREE.Color;
  ink: THREE.Color;
  muted: THREE.Color;
  border: THREE.Color;
  signal: THREE.Color;
};

function cssColor(styles: CSSStyleDeclaration, token: string, fallback: string) {
  const value = styles.getPropertyValue(token).trim();
  return new THREE.Color(value || fallback);
}

function readPalette(): Palette {
  const styles = getComputedStyle(document.documentElement);
  const palette = {
    canvas: cssColor(styles, "--canvas", "#fbfbfa"),
    surface: cssColor(styles, "--surface", "#f1f2f2"),
    ink: cssColor(styles, "--ink", "#121416"),
    muted: cssColor(styles, "--muted", "#62686f"),
    border: cssColor(styles, "--border", "#dfe2e4"),
    signal: cssColor(styles, "--signal", "#155eef"),
  };
  const lightness = palette.canvas.getHSL({ h: 0, s: 0, l: 0 }).l;
  if (lightness < 0.2) {
    palette.surface.lerp(palette.ink, 0.12);
    palette.border.lerp(palette.ink, 0.18);
    palette.muted.lerp(palette.ink, 0.08);
  }
  return palette;
}

function material(color: THREE.Color, roughness = 0.72, metalness = 0.08) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function addEdges(mesh: THREE.Mesh, color: THREE.Color, opacity = 0.42) {
  const lines = new THREE.LineSegments(
    new THREE.EdgesGeometry(mesh.geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
  );
  mesh.add(lines);
}

function box(
  size: [number, number, number],
  color: THREE.Color,
  edge: THREE.Color,
  position: [number, number, number],
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material(color));
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  addEdges(mesh, edge);
  return mesh;
}

function addHub(group: THREE.Group, palette: Palette) {
  const pedestal = box([6.7, 0.25, 3.6], palette.surface, palette.border, [0, -0.35, 0]);
  group.add(pedestal);

  for (let index = 0; index < 4; index += 1) {
    const layer = box(
      [1.35 - index * 0.09, 0.28, 1.2 - index * 0.06],
      index === 3 ? palette.signal : palette.canvas,
      palette.border,
      [-2.15, -0.04 + index * 0.35, 0],
    );
    group.add(layer);
  }

  const routeBase = box([1.65, 0.2, 1.65], palette.canvas, palette.border, [0, -0.08, 0]);
  group.add(routeBase);
  const route = box([1.35, 0.08, 0.16], palette.signal, palette.signal, [0, 0.07, 0]);
  route.rotation.y = -Math.PI / 4;
  group.add(route);
  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 24, 16),
    new THREE.MeshStandardMaterial({
      color: palette.signal,
      emissive: palette.signal,
      emissiveIntensity: 0.45,
      roughness: 0.28,
    }),
  );
  orb.position.set(0.42, 0.27, -0.42);
  group.add(orb);

  for (let index = 0; index < 3; index += 1) {
    const device = box(
      [0.62, 1.15, 0.12],
      index === 1 ? palette.signal : palette.ink,
      palette.border,
      [1.62 + index * 0.55, 0.38, (index - 1) * 0.24],
    );
    device.rotation.y = (index - 1) * -0.16;
    group.add(device);
  }
}

function addStack(
  group: THREE.Group,
  palette: Palette,
  count: number,
  complete: boolean,
  optionCount: number,
) {
  group.add(box([6.5, 0.25, 3.5], palette.surface, palette.border, [0.55, -0.45, 0]));
  const widths = [3.6, 3.25, 2.9, 2.55, 2.2];

  for (let index = 0; index < 5; index += 1) {
    const selected = index < count;
    const layerColor = selected
      ? complete && index === 4
        ? palette.signal
        : palette.canvas
      : palette.surface;
    const layer = box(
      [widths[index], 0.42, 2.05 - index * 0.08],
      layerColor,
      selected ? palette.signal : palette.border,
      [0, -0.12 + index * 0.54, 0],
    );
    if (!selected) {
      (layer.material as THREE.MeshStandardMaterial).transparent = true;
      (layer.material as THREE.MeshStandardMaterial).opacity = 0.42;
    }
    group.add(layer);

    if (selected) {
      const marker = box(
        [0.08, 0.16, 1.55 - index * 0.06],
        palette.signal,
        palette.signal,
        [-widths[index] / 2 + 0.12, -0.12 + index * 0.54, 0],
      );
      group.add(marker);
    }
  }

  if (!complete) {
    const dropTarget = box(
      [widths[count] + 0.28, 0.08, 2.2 - count * 0.08],
      palette.signal,
      palette.signal,
      [0, -0.32 + count * 0.54, 0],
    );
    (dropTarget.material as THREE.MeshStandardMaterial).transparent = true;
    (dropTarget.material as THREE.MeshStandardMaterial).opacity = 0.12;
    group.add(dropTarget);

    for (let index = 0; index < optionCount; index += 1) {
      const token = box(
        [0.72, 0.72, 0.72],
        index === 0 ? palette.signal : palette.ink,
        palette.border,
        [2.75, 0.02 + index * 0.78, 0.55 - index * 0.52],
      );
      token.rotation.y = index * 0.24;
      token.traverse((child) => { child.userData.stackOption = index; });
      group.add(token);
    }
  }
}

function addMatch(
  group: THREE.Group,
  palette: Palette,
  selection: number,
  round: number,
  complete: boolean,
) {
  group.add(box([6.5, 0.25, 3.7], palette.surface, palette.border, [0, -0.48, 0]));
  const colors = [palette.signal, palette.ink, palette.muted];

  for (let index = 0; index < 3; index += 1) {
    const relative = (index - selection + 3) % 3;
    const x = relative === 0 ? 0 : relative === 1 ? 2.15 : -2.15;
    const z = relative === 0 ? 0 : 0.7;
    const scale = relative === 0 ? 1 : 0.72;
    const deviceGroup = new THREE.Group();
    deviceGroup.position.set(x, relative === 0 ? 0.36 : 0.08, z);
    deviceGroup.scale.setScalar(scale);

    const device = box([1.2, 2.15, 0.16], colors[index], palette.border, [0, 0, 0]);
    deviceGroup.add(device);
    const screen = box(
      [0.96, 1.58, 0.035],
      index === round || complete ? palette.canvas : palette.surface,
      palette.border,
      [0, 0.08, -0.1],
    );
    deviceGroup.add(screen);

    const detailCount = index + 2;
    for (let detail = 0; detail < detailCount; detail += 1) {
      const line = box(
        [0.62 - detail * 0.07, 0.05, 0.025],
        detail === 0 ? palette.signal : palette.muted,
        palette.muted,
        [0, 0.48 - detail * 0.27, -0.14],
      );
      deviceGroup.add(line);
    }

    deviceGroup.traverse((child) => { child.userData.matchIndex = index; });
    group.add(deviceGroup);
  }
}

export function ProductLabScene({
  game,
  stackCount,
  stackComplete,
  stackOptionCount,
  matchSelection,
  matchRound,
  matchComplete,
  onSelectStackOption,
  onSelectMatch,
}: ProductLabSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    game,
    stackCount,
    stackComplete,
    stackOptionCount,
    matchSelection,
    matchRound,
    matchComplete,
    onSelectStackOption,
    onSelectMatch,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    } catch {
      canvas.dataset.unavailable = "true";
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearAlpha(0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 50);
    camera.position.set(7, 5.8, 8.2);
    camera.lookAt(0, 0.5, 0);

    const gameGroup = new THREE.Group();
    gameGroup.rotation.y = -0.08;
    scene.add(gameGroup);

    const hemisphere = new THREE.HemisphereLight(0xffffff, 0x7b8390, 2.2);
    scene.add(hemisphere);
    const key = new THREE.DirectionalLight(0xffffff, 3.1);
    key.position.set(4, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x4c7dff, 1.35);
    rim.position.set(-5, 3, -4);
    scene.add(rim);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const disposeGroup = () => {
      for (const child of [...gameGroup.children]) {
        gameGroup.remove(child);
        child.traverse((object) => {
          if (!(object instanceof THREE.Mesh || object instanceof THREE.LineSegments)) return;
          object.geometry?.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          for (const entry of materials) entry.dispose();
        });
      }
    };

    const render = () => renderer.render(scene, camera);

    const rebuild = () => {
      disposeGroup();
      const palette = readPalette();
      const state = stateRef.current;
      if (state.game === "stack") {
        addStack(
          gameGroup,
          palette,
          state.stackCount,
          state.stackComplete,
          state.stackOptionCount,
        );
      } else if (state.game === "match") {
        addMatch(
          gameGroup,
          palette,
          state.matchSelection,
          state.matchRound,
          state.matchComplete,
        );
      } else {
        addHub(gameGroup, palette);
      }
      render();
    };

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      const width = Math.max(1, clientWidth);
      const height = Math.max(1, clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      render();
    };

    const pickInteractiveObject = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(gameGroup.children, true).find((entry) => {
        const data = entry.object.userData;
        return (
          typeof data.stackOption === "number" ||
          typeof data.matchIndex === "number"
        );
      });
      if (!hit) return;
      const state = stateRef.current;
      const data = hit.object.userData;
      if (state.game === "stack" && typeof data.stackOption === "number") {
        state.onSelectStackOption(data.stackOption as number);
      } else if (state.game === "match" && typeof data.matchIndex === "number") {
        state.onSelectMatch(data.matchIndex as number);
      }
    };

    const updateCursor = (event: PointerEvent) => {
      const state = stateRef.current;
      const interactive =
        (state.game === "stack" && !state.stackComplete) || state.game === "match";
      if (!interactive) {
        canvas.style.cursor = "default";
        return;
      }
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(gameGroup.children, true).some((entry) => {
        const data = entry.object.userData;
        return (
          typeof data.stackOption === "number" ||
          typeof data.matchIndex === "number"
        );
      });
      canvas.style.cursor = hit ? "pointer" : "default";
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const themeObserver = new MutationObserver(rebuild);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    canvas.addEventListener("pointerdown", pickInteractiveObject);
    canvas.addEventListener("pointermove", updateCursor);
    rebuild();
    resize();

    const updateEvent = () => rebuild();
    canvas.addEventListener("product-lab-update", updateEvent);

    return () => {
      canvas.removeEventListener("pointerdown", pickInteractiveObject);
      canvas.removeEventListener("pointermove", updateCursor);
      canvas.removeEventListener("product-lab-update", updateEvent);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      disposeGroup();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    stateRef.current = {
      game,
      stackCount,
      stackComplete,
      stackOptionCount,
      matchSelection,
      matchRound,
      matchComplete,
      onSelectStackOption,
      onSelectMatch,
    };
    canvasRef.current?.dispatchEvent(new Event("product-lab-update"));
  }, [
    game,
    stackCount,
    stackComplete,
    stackOptionCount,
    matchSelection,
    matchRound,
    matchComplete,
    onSelectStackOption,
    onSelectMatch,
  ]);

  return (
    <>
      <canvas ref={canvasRef} className="product-lab-canvas" aria-hidden="true" />
      <div className="product-lab-scene-fallback" role="status">
        <span>3D preview unavailable</span>
        The games remain fully playable with the controls.
      </div>
    </>
  );
}
