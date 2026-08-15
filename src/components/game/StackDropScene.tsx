"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type StackDropSceneProps = {
  running: boolean;
  layers: readonly string[];
  onDrop: (progress: number, accuracy: number) => void;
  onFail: () => void;
  onComplete: () => void;
};

type Block = {
  mesh: THREE.Mesh;
  width: number;
  depth: number;
};

export function StackDropScene({
  running,
  layers,
  onDrop,
  onFail,
  onComplete,
}: StackDropSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const callbacks = useRef({ onDrop, onFail, onComplete });

  useEffect(() => {
    callbacks.current = { onDrop, onFail, onComplete };
  }, [onDrop, onFail, onComplete]);

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

    const signal = new THREE.Color("#155eef");
    const world = new THREE.Color("#090b0f");
    const surface = new THREE.Color("#171b22");
    const edge = new THREE.Color("#687384");
    const layerColors = ["#e8edf5", "#a9c4ff", "#5d8eff", "#155eef", "#0c3ca9"];
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(world, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(world, 10, 28);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
    camera.position.set(7.5, 6.5, 8.5);
    camera.lookAt(0, 1, 0);

    const ambient = new THREE.HemisphereLight(0xc9d6ff, 0x050608, 2.1);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 3.2);
    key.position.set(4, 9, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    scene.add(key);
    const rim = new THREE.PointLight(signal, 20, 18, 1.7);
    rim.position.set(-4, 4, -3);
    scene.add(rim);

    const floor = new THREE.Mesh(
      new THREE.CylinderGeometry(5.5, 6.2, 0.45, 6),
      new THREE.MeshStandardMaterial({ color: surface, roughness: 0.78, metalness: 0.2 }),
    );
    floor.position.y = -0.5;
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(18, 18, signal, edge);
    grid.position.y = -0.26;
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.22;
    scene.add(grid);

    const makeBlock = (
      width: number,
      depth: number,
      color: string,
      y: number,
    ): Block => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(width, 0.56, depth),
        new THREE.MeshStandardMaterial({
          color,
          roughness: 0.48,
          metalness: 0.18,
        }),
      );
      mesh.position.y = y;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const outline = new THREE.LineSegments(
        new THREE.EdgesGeometry(mesh.geometry),
        new THREE.LineBasicMaterial({ color: edge, transparent: true, opacity: 0.7 }),
      );
      mesh.add(outline);
      scene.add(mesh);
      return { mesh, width, depth };
    };

    const base = makeBlock(3.5, 2.35, "#eef2f8", 0);
    const blocks: Block[] = [base];
    let active: Block | null = null;
    let axis: "x" | "z" = "x";
    let direction = 1;
    let progress = 0;
    let speed = 2.4;
    let failed = false;
    let complete = false;
    let frame = 0;
    let lastTime = performance.now();
    let cameraTargetY = 1;
    const falling: { mesh: THREE.Mesh; velocity: number }[] = [];

    const spawn = () => {
      const previous = blocks[blocks.length - 1];
      const next = makeBlock(
        previous.width,
        previous.depth,
        layerColors[progress],
        0.58 + progress * 0.58,
      );
      if (axis === "x") {
        next.mesh.position.x = -4.4;
        next.mesh.position.z = previous.mesh.position.z;
      } else {
        next.mesh.position.z = -4.4;
        next.mesh.position.x = previous.mesh.position.x;
      }
      active = next;
    };

    const finishDrop = () => {
      if (!running || !active || failed || complete) return;
      const previous = blocks[blocks.length - 1];
      const activePosition = axis === "x" ? active.mesh.position.x : active.mesh.position.z;
      const previousPosition = axis === "x" ? previous.mesh.position.x : previous.mesh.position.z;
      const activeSize = axis === "x" ? active.width : active.depth;
      const previousSize = axis === "x" ? previous.width : previous.depth;
      const delta = activePosition - previousPosition;
      const overlap = Math.min(activeSize, previousSize) - Math.abs(delta);

      if (overlap <= 0.12) {
        failed = true;
        falling.push({ mesh: active.mesh, velocity: 0 });
        active = null;
        callbacks.current.onFail();
        return;
      }

      const accuracy = Math.max(0, Math.min(1, overlap / previousSize));
      const keptCenter = previousPosition + delta / 2;
      const cutSize = activeSize - overlap;
      const cutCenter = activePosition + (overlap / 2) * Math.sign(delta || 1);

      if (axis === "x") {
        active.width = overlap;
        active.mesh.scale.x = overlap / activeSize;
        active.mesh.position.x = keptCenter;
      } else {
        active.depth = overlap;
        active.mesh.scale.z = overlap / activeSize;
        active.mesh.position.z = keptCenter;
      }

      if (cutSize > 0.08 && !reducedMotion) {
        const offcut = makeBlock(
          axis === "x" ? cutSize : active.width,
          axis === "z" ? cutSize : active.depth,
          layerColors[progress],
          active.mesh.position.y,
        );
        offcut.mesh.position.copy(active.mesh.position);
        if (axis === "x") offcut.mesh.position.x = cutCenter;
        else offcut.mesh.position.z = cutCenter;
        falling.push({ mesh: offcut.mesh, velocity: 0 });
      }

      blocks.push(active);
      active = null;
      progress += 1;
      callbacks.current.onDrop(progress, accuracy);

      if (progress >= layers.length) {
        complete = true;
        callbacks.current.onComplete();
        return;
      }

      axis = axis === "x" ? "z" : "x";
      direction = 1;
      speed += 0.34;
      cameraTargetY = 1 + progress * 0.22;
      spawn();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("button, a, input, textarea, select")) return;
      if (event.code !== "Space" && event.code !== "Enter") return;
      event.preventDefault();
      finishDrop();
    };
    const onDropEvent = () => finishDrop();
    const onCanvasPointer = () => finishDrop();

    const resize = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.x = camera.aspect < 0.75 ? 9.4 : 7.5;
      camera.position.z = camera.aspect < 0.75 ? 11.4 : 8.5;
      camera.updateProjectionMatrix();
    };

    const render = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.04);
      lastTime = time;

      if (running && active && !failed && !complete) {
        const limit = 4.4;
        const next = (axis === "x" ? active.mesh.position.x : active.mesh.position.z) + direction * speed * delta;
        if (Math.abs(next) >= limit) direction *= -1;
        if (axis === "x") active.mesh.position.x += direction * speed * delta;
        else active.mesh.position.z += direction * speed * delta;
      }

      for (const piece of falling) {
        piece.velocity += 12 * delta;
        piece.mesh.position.y -= piece.velocity * delta;
        piece.mesh.rotation.x += delta * 1.3;
        piece.mesh.rotation.z += delta * 0.8;
      }

      camera.position.y += (5.7 + cameraTargetY - camera.position.y) * Math.min(1, delta * 3.5);
      camera.lookAt(0, cameraTargetY, 0);
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("stack-drop", onDropEvent);
    canvas.addEventListener("pointerdown", onCanvasPointer);
    resize();
    if (running) spawn();
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("stack-drop", onDropEvent);
      canvas.removeEventListener("pointerdown", onCanvasPointer);
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.LineSegments)) return;
        object.geometry?.dispose();
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const entry of materials) entry.dispose();
      });
      renderer.dispose();
    };
  }, [layers, running]);

  return <canvas ref={canvasRef} className="stack-drop-canvas" aria-label="Stack Builder timing game" />;
}
