"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

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

function buildHub(group: THREE.Group, palette: Palette) {
  group.add(box([6.7, 0.25, 3.6], palette.surface, palette.border, [0, -0.35, 0]));

  for (let index = 0; index < 4; index += 1) {
    group.add(box(
      [1.35 - index * 0.09, 0.28, 1.2 - index * 0.06],
      index === 3 ? palette.signal : palette.canvas,
      palette.border,
      [-2.15, -0.04 + index * 0.35, 0],
    ));
  }

  group.add(box([1.65, 0.2, 1.65], palette.canvas, palette.border, [0, -0.08, 0]));
  const route = box([1.35, 0.08, 0.16], palette.signal, palette.signal, [0, 0.07, 0]);
  route.rotation.y = -Math.PI / 4;
  group.add(route);

  const orb = new THREE.Mesh(
    new THREE.SphereGeometry(0.16, 24, 16),
    new THREE.MeshStandardMaterial({ color: palette.signal, emissive: palette.signal, emissiveIntensity: 0.45, roughness: 0.28 }),
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

export function ProductLabScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const hub = new THREE.Group();
    hub.rotation.y = -0.08;
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

    const disposeHub = () => {
      for (const child of [...hub.children]) {
        hub.remove(child);
        child.traverse((object) => {
          if (!(object instanceof THREE.Mesh || object instanceof THREE.LineSegments)) return;
          object.geometry?.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          for (const entry of materials) entry.dispose();
        });
      }
    };
    const rebuild = () => {
      disposeHub();
      buildHub(hub, readPalette());
      renderer.render(scene, camera);
    };
    const resize = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    const themeObserver = new MutationObserver(rebuild);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    rebuild();
    resize();

    return () => {
      resizeObserver.disconnect();
      themeObserver.disconnect();
      disposeHub();
      renderer.dispose();
    };
  }, []);

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
