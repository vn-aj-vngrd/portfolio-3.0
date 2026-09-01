"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import type { ProductMatchEntry } from "@/types/content";

type ProductMatchSceneProps = {
  correctAnswer: number;
  products: readonly ProductMatchEntry[];
  onSelect: (index: number) => void;
};

const productDevices = [
  {
    name: "RELAY",
    color: "#b8df24",
    body: [1.9, 2.55] as const,
    screen: [1.62, 1.86] as const,
    baseY: 0.7,
  },
  {
    name: "ROLEWAY",
    color: "#155eef",
    body: [1.9, 2.55] as const,
    screen: [1.62, 1.86] as const,
    baseY: 0.7,
  },
  {
    name: "VIYA",
    color: "#eef2f8",
    body: [1.5, 3.05] as const,
    screen: [1.23, 2.36] as const,
    baseY: 0.45,
  },
  {
    name: "ACSFI",
    color: "#6f65a8",
    body: [1.9, 2.55] as const,
    screen: [1.62, 1.86] as const,
    baseY: 0.7,
  },
] as const;

function labelSprite(text: string, accent: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.Sprite();
  context.fillStyle = "rgba(7, 9, 13, .88)";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = accent;
  context.lineWidth = 4;
  context.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
  context.fillStyle = "#f5f7fa";
  context.font = "600 34px monospace";
  context.textAlign = "center";
  context.fillText(text, canvas.width / 2, 78);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }),
  );
  sprite.scale.set(2.45, 0.62, 1);
  return sprite;
}

export function ProductMatchScene({
  correctAnswer,
  products,
  onSelect,
}: ProductMatchSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectCallback = useRef(onSelect);

  useEffect(() => {
    selectCallback.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    } catch {
      canvas.dataset.unavailable = "true";
      return;
    }

    const world = new THREE.Color("#090b0f");
    const signal = new THREE.Color("#155eef");
    const muted = new THREE.Color("#556071");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(world, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(world, 9, 25);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    camera.position.set(0, 4.4, 12.2);
    camera.lookAt(0, 1, 0);

    scene.add(new THREE.HemisphereLight(0xc7d5ff, 0x050608, 2.2));
    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(3, 8, 5);
    key.castShadow = true;
    scene.add(key);
    const rim = new THREE.PointLight(signal, 24, 18, 1.8);
    rim.position.set(-4, 3, 1);
    scene.add(rim);

    const stage = new THREE.Mesh(
      new THREE.CylinderGeometry(6.2, 6.8, 0.4, 8),
      new THREE.MeshStandardMaterial({ color: 0x171b22, roughness: 0.82, metalness: 0.18 }),
    );
    stage.position.y = -0.45;
    stage.receiveShadow = true;
    scene.add(stage);
    const grid = new THREE.GridHelper(16, 16, signal, muted);
    grid.position.y = -0.23;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.2;
    scene.add(grid);

    const devices: THREE.Group[] = [];
    const selectable: THREE.Object3D[] = [];
    const positions = [-3.6, -1.2, 1.2, 3.6];

    productDevices.forEach((product, index) => {
      const group = new THREE.Group();
      group.position.set(positions[index], product.baseY, 0);
      group.rotation.y = (index - 1.5) * -0.13;
      group.userData.productIndex = index;

      const body = new THREE.Mesh(
        new THREE.BoxGeometry(product.body[0], product.body[1], 0.24),
        new THREE.MeshStandardMaterial({ color: product.color, roughness: 0.42, metalness: 0.2 }),
      );
      body.castShadow = true;
      body.userData.productIndex = index;
      group.add(body);
      selectable.push(body);

      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(product.screen[0], product.screen[1]),
        new THREE.MeshStandardMaterial({ color: 0x0f1217, roughness: 0.6, emissive: world, emissiveIntensity: 0 }),
      );
      screen.position.z = 0.126;
      screen.userData.productIndex = index;
      group.add(screen);
      selectable.push(screen);

      for (let line = 0; line < index + 2; line += 1) {
        const detail = new THREE.Mesh(
          new THREE.PlaneGeometry(0.82 - line * 0.08, 0.08),
          new THREE.MeshBasicMaterial({ color: line === 0 ? signal : 0x6f7885 }),
        );
        detail.position.set(0, 0.62 - line * 0.33, 0.135);
        detail.userData.productIndex = index;
        group.add(detail);
        selectable.push(detail);
      }

      const label = labelSprite(products[index]?.name ?? product.name, "#155eef");
      label.position.y = -1.9;
      group.add(label);
      devices.push(group);
      scene.add(group);
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered = -1;
    let selected = -1;
    let selectStarted = 0;
    let frame = 0;
    let lastTime = performance.now();

    const setPointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
    };

    const pick = (event: PointerEvent) => {
      if (selected >= 0) return;
      setPointer(event);
      const hit = raycaster.intersectObjects(selectable, false)[0];
      if (!hit) return;
      const index = hit.object.userData.productIndex as number;
      selectCallback.current(index);
      if (index === correctAnswer) {
        selected = index;
        selectStarted = performance.now();
      } else {
        const device = devices[index];
        device.userData.shakeUntil = performance.now() + 420;
      }
    };

    const hover = (event: PointerEvent) => {
      if (selected >= 0) return;
      setPointer(event);
      const hit = raycaster.intersectObjects(selectable, false)[0];
      hovered = hit ? (hit.object.userData.productIndex as number) : -1;
      canvas.style.cursor = hit ? "pointer" : "default";
    };

    const resize = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      const portrait = camera.aspect < 0.75;
      positions[0] = portrait ? -3.45 : -3.6;
      positions[1] = portrait ? -1.15 : -1.2;
      positions[2] = portrait ? 1.15 : 1.2;
      positions[3] = portrait ? 3.45 : 3.6;
      camera.position.z = portrait ? 18.5 : 12.2;
      camera.position.y = portrait ? 5.2 : 4.4;
      camera.lookAt(0, 1, 0);
      camera.updateProjectionMatrix();
    };

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.04);
      lastTime = time;

      devices.forEach((device, index) => {
        const baseY = productDevices[index].baseY;
        if (!reducedMotion && selected !== index) {
          device.position.y = baseY + Math.sin(time * 0.0015 + index) * 0.08;
          device.rotation.y += delta * (hovered === index ? 0.35 : 0.08);
        }
        if (device.userData.shakeUntil > time) {
          device.position.x = positions[index] + Math.sin(time * 0.08) * 0.12;
        } else if (selected !== index) {
          device.position.x += (positions[index] - device.position.x) * Math.min(1, delta * 12);
        }
      });

      if (selected >= 0) {
        const elapsed = Math.min(1, (time - selectStarted) / 650);
        const eased = 1 - Math.pow(1 - elapsed, 3);
        const device = devices[selected];
        device.position.x += (0 - device.position.x) * eased;
        device.position.y += (1.15 - device.position.y) * eased;
        device.position.z += (1.2 - device.position.z) * eased;
        device.scale.setScalar(1 + eased * 0.22);
      }

      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    canvas.addEventListener("pointerdown", pick);
    canvas.addEventListener("pointermove", hover);
    resize();
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", pick);
      canvas.removeEventListener("pointermove", hover);
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.LineSegments || object instanceof THREE.Sprite)) return;
        if ("geometry" in object && object.geometry) object.geometry.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const entry of materials) {
          if (entry instanceof THREE.SpriteMaterial) entry.map?.dispose();
          entry.dispose();
        }
      });
      renderer.dispose();
    };
  }, [correctAnswer, products]);

  return <canvas ref={canvasRef} className="product-match-canvas" aria-label="Product Match 3D selection game" />;
}
