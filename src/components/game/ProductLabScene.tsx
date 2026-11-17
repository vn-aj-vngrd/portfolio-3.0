"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import type { LabGameId } from "@/content/lab";

type Palette = {
  canvas: THREE.Color;
  surface: THREE.Color;
  ink: THREE.Color;
  muted: THREE.Color;
  border: THREE.Color;
  signal: THREE.Color;
};

function cssColor(
  styles: CSSStyleDeclaration,
  token: string,
  fallback: string
) {
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
    new THREE.LineBasicMaterial({ color, transparent: true, opacity })
  );
  mesh.add(lines);
}

function box(
  size: [number, number, number],
  color: THREE.Color,
  edge: THREE.Color,
  position: [number, number, number]
) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material(color));
  mesh.position.set(...position);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  addEdges(mesh, edge);
  return mesh;
}

type Station = {
  id: LabGameId;
  group: THREE.Group;
  outline: THREE.LineBasicMaterial;
  lift: number;
};

type Hub = {
  stations: Station[];
  topLayer: THREE.Mesh;
  orb: THREE.Mesh;
  devices: THREE.Mesh[];
};

function station(
  hub: THREE.Group,
  palette: Palette,
  id: LabGameId,
  x: number,
  footprint: [number, number]
): Station {
  const group = new THREE.Group();
  group.position.x = x;
  group.userData.station = id;
  hub.add(group);

  const outline = new THREE.LineBasicMaterial({
    color: palette.signal,
    transparent: true,
    opacity: 0,
  });
  const frame = new THREE.LineSegments(
    new THREE.EdgesGeometry(
      new THREE.BoxGeometry(footprint[0], 0.02, footprint[1])
    ),
    outline
  );
  frame.position.y = -0.21;
  group.add(frame);

  // An invisible volume makes the whole station easy to point at.
  const hit = new THREE.Mesh(
    new THREE.BoxGeometry(footprint[0], 1.9, footprint[1]),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hit.position.y = 0.7;
  group.add(hit);

  return { id, group, outline, lift: 0 };
}

function buildHub(hub: THREE.Group, palette: Palette): Hub {
  hub.add(
    box([6.9, 0.25, 3.6], palette.surface, palette.border, [0, -0.35, 0])
  );

  const stack = station(hub, palette, "stack", -2.2, [1.75, 1.6]);
  let topLayer: THREE.Mesh | null = null;
  for (let index = 0; index < 4; index += 1) {
    const layer = box(
      [1.35 - index * 0.09, 0.28, 1.2 - index * 0.06],
      index === 3 ? palette.signal : palette.canvas,
      palette.border,
      [0, -0.04 + index * 0.35, 0]
    );
    stack.group.add(layer);
    topLayer = layer;
  }

  const ship = station(hub, palette, "ship", 0, [2.05, 2.05]);
  ship.group.add(
    box([1.65, 0.2, 1.65], palette.canvas, palette.border, [0, -0.08, 0])
  );
  const route = box(
    [1.35, 0.08, 0.16],
    palette.signal,
    palette.signal,
    [0, 0.07, 0]
  );
  route.rotation.y = -Math.PI / 4;
  ship.group.add(route);
  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 24, 16),
    new THREE.MeshStandardMaterial({
      color: palette.signal,
      emissive: palette.signal,
      emissiveIntensity: 0.45,
      roughness: 0.28,
    })
  );
  orb.position.set(0.42, 0.27, 0.42);
  orb.castShadow = true;
  ship.group.add(orb);

  const match = station(hub, palette, "match", 2.2, [2.05, 1.6]);
  const devices: THREE.Mesh[] = [];
  for (let index = 0; index < 3; index += 1) {
    const device = box(
      [0.62, 1.15, 0.12],
      index === 1 ? palette.signal : palette.ink,
      palette.border,
      [(index - 1) * 0.55, 0.38, (index - 1) * 0.24]
    );
    device.rotation.y = (index - 1) * -0.16;
    match.group.add(device);
    devices.push(device);
  }

  return { stations: [stack, ship, match], topLayer: topLayer!, orb, devices };
}

type ProductLabSceneProps = {
  focus?: LabGameId | null;
  onFocus?: (id: LabGameId | null) => void;
  onSelect?: (id: LabGameId) => void;
};

export function ProductLabScene({
  focus = null,
  onFocus,
  onSelect,
}: ProductLabSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const focusRef = useRef(focus);
  const handlers = useRef({ onFocus, onSelect });
  const wake = useRef<() => void>(() => undefined);

  useEffect(() => {
    focusRef.current = focus;
    handlers.current = { onFocus, onSelect };
    wake.current();
  }, [focus, onFocus, onSelect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
      });
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
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 80);
    const cameraHome = new THREE.Vector3(7, 5.8, 8.2);
    const lookAt = new THREE.Vector3(0, 0.4, 0);
    let reach = 1;

    const hub = new THREE.Group();
    scene.add(hub);
    scene.add(new THREE.HemisphereLight(0xffffff, 0x7b8390, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 3.1);
    key.position.set(4, 8, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x4c7dff, 1.35);
    rim.position.set(-5, 3, -4);
    scene.add(rim);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointer = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    let parts: Hub | null = null;
    let frame = 0;
    let visible = true;
    const started = performance.now();
    let last = started;

    const disposeHub = () => {
      for (const child of [...hub.children]) {
        hub.remove(child);
        child.traverse((object) => {
          if (
            !(
              object instanceof THREE.Mesh ||
              object instanceof THREE.LineSegments
            )
          )
            return;
          object.geometry?.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          for (const entry of materials) entry.dispose();
        });
      }
    };

    const draw = (now: number) => {
      const still = reducedMotion.matches;
      const time = still ? 0 : (now - started) / 1000;
      const ease = still ? 1 : 1 - Math.exp(-(now - last) / 140);
      last = now;
      if (!parts) return;

      const focused = parts.stations.find(
        (entry) => entry.id === focusRef.current
      );
      for (const entry of parts.stations) {
        const on = entry === focused ? 1 : 0;
        entry.lift += (on - entry.lift) * ease;
        entry.group.position.y = entry.lift * 0.3;
        entry.group.scale.setScalar(1 + entry.lift * 0.05);
        entry.outline.opacity = entry.lift;
      }

      parts.topLayer.position.y =
        1.01 + (Math.sin(time * 1.7) * 0.5 + 0.5) * 0.24;
      const travel = Math.sin(time * 1.2) * 0.46;
      parts.orb.position.set(travel, 0.27, travel);
      parts.devices.forEach((device, index) => {
        device.position.y = 0.38 + Math.sin(time * 1.4 + index * 0.9) * 0.05;
      });

      const targetX = focused ? focused.group.position.x * 0.32 : 0;
      lookAt.x += (targetX - lookAt.x) * ease;
      hub.rotation.y = -0.08 + Math.sin(time * 0.25) * 0.1 + pointer.x * 0.14;
      hub.rotation.x = pointer.y * 0.04;
      camera.position.copy(cameraHome).multiplyScalar(reach);
      camera.position.x += lookAt.x;
      camera.lookAt(lookAt);
      renderer.render(scene, camera);
    };

    const loop = (now: number) => {
      draw(now);
      frame =
        visible && !document.hidden && !reducedMotion.matches
          ? requestAnimationFrame(loop)
          : 0;
    };
    const start = () => {
      if (frame) return;
      last = performance.now();
      if (reducedMotion.matches || !visible || document.hidden) draw(last);
      else frame = requestAnimationFrame(loop);
    };
    wake.current = start;

    const rebuild = () => {
      disposeHub();
      parts = buildHub(hub, readPalette());
      draw(performance.now());
    };
    const resize = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      // Pull the camera back on narrow stages so all three stations stay in frame.
      reach = Math.min(2.2, Math.max(0.85, 1.2 / camera.aspect));
      camera.updateProjectionMatrix();
      draw(performance.now());
    };

    const pick = (event: PointerEvent) => {
      if (!parts) return null;
      const rect = canvas.getBoundingClientRect();
      pointer.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      );
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(
        parts.stations.map((entry) => entry.group),
        true
      )[0];
      let node: THREE.Object3D | null = hit?.object ?? null;
      while (node && !node.userData.station) node = node.parent;
      return (node?.userData.station as LabGameId | undefined) ?? null;
    };
    let hovered: LabGameId | null = null;
    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const id = pick(event);
      canvas.style.cursor = id ? "pointer" : "";
      if (id !== hovered) {
        hovered = id;
        handlers.current.onFocus?.(id);
      }
      start();
    };
    const onPointerLeave = () => {
      pointer.set(0, 0);
      canvas.style.cursor = "";
      if (hovered) {
        hovered = null;
        handlers.current.onFocus?.(null);
      }
      start();
    };
    const onClick = (event: MouseEvent) => {
      const id = pick(event as PointerEvent);
      if (id) handlers.current.onSelect?.(id);
    };
    const onVisibility = () => start();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const themeObserver = new MutationObserver(rebuild);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    const viewObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      start();
    });
    viewObserver.observe(canvas);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", onVisibility);
    rebuild();
    resize();
    start();

    return () => {
      cancelAnimationFrame(frame);
      wake.current = () => undefined;
      resizeObserver.disconnect();
      themeObserver.disconnect();
      viewObserver.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("click", onClick);
      document.removeEventListener("visibilitychange", onVisibility);
      disposeHub();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="product-lab-canvas"
        aria-hidden="true"
      />
      <div className="product-lab-scene-fallback" role="status">
        <span>3D preview unavailable</span>
        Every experiment is still listed beside this panel.
      </div>
    </>
  );
}
