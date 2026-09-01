"use client";

import { useEffect, useImperativeHandle, useRef } from "react";
import * as THREE from "three";

const stages = ["Plan", "Build", "Test", "Ship"] as const;
export type ReleaseControl = "forward" | "back" | "left" | "right" | "turnLeft" | "turnRight";

export type ReleaseRunSceneHandle = {
  activate: () => void;
  setControl: (action: ReleaseControl, pressed: boolean) => void;
};

type ReleaseRunSceneProps = {
  ref?: React.Ref<ReleaseRunSceneHandle>;
  onProgress: (progress: number) => void;
  onReady: () => void;
};

function readColor(token: string, fallback: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  return new THREE.Color(value || fallback);
}

function makeLabel(text: string, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.Sprite();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = color;
  context.font = "600 42px monospace";
  context.textAlign = "center";
  context.fillText(text.toUpperCase(), canvas.width / 2, 76);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false }),
  );
  sprite.scale.set(2.6, 0.65, 1);
  return sprite;
}

export function ReleaseRunScene({ ref, onProgress, onReady }: ReleaseRunSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressCallback = useRef(onProgress);
  const readyCallback = useRef(onReady);
  const activateAction = useRef(() => {});
  const controlAction = useRef((_action: ReleaseControl, _pressed: boolean) => {});

  useImperativeHandle(ref, () => ({
    activate: () => activateAction.current(),
    setControl: (action, pressed) => controlAction.current(action, pressed),
  }), []);

  useEffect(() => {
    progressCallback.current = onProgress;
    readyCallback.current = onReady;
  }, [onProgress, onReady]);

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

    const canvasColor = readColor("--canvas", "#0b0c0e");
    const surface = readColor("--surface", "#141619");
    const border = readColor("--border", "#34383d");
    const ink = readColor("--ink", "#f1f3f4");
    const muted = readColor("--muted", "#858b93");
    const signal = readColor("--signal", "#155eef");
    const dark = canvasColor.getHSL({ h: 0, s: 0, l: 0 }).l < 0.2;
    const world = dark ? canvasColor : new THREE.Color("#0a0c10");
    const worldSurface = dark ? surface.clone().lerp(ink, 0.08) : new THREE.Color("#171a20");
    const worldBorder = dark ? border.clone().lerp(ink, 0.14) : new THREE.Color("#343a45");

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(world, 1);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(world, 8, 28);
    const camera = new THREE.PerspectiveCamera(68, 1, 0.08, 60);
    camera.rotation.order = "YXZ";

    const player = new THREE.Vector3(0, 1.45, 6);
    let yaw = 0;
    let pitch = 0;
    let progress = 0;
    let lastTime = performance.now();
    let frame = 0;
    let running = true;
    const keys = new Set<string>();
    const controls = new Set<ReleaseControl>();
    const targets: THREE.Group[] = [];
    const targetMeshes: THREE.Object3D[] = [];
    const raycaster = new THREE.Raycaster();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const floorMaterial = new THREE.MeshStandardMaterial({ color: worldSurface, roughness: 0.86, metalness: 0.08 });
    const floor = new THREE.Mesh(new THREE.BoxGeometry(10, 0.28, 28), floorMaterial);
    floor.position.set(0, -0.2, -7);
    floor.receiveShadow = true;
    scene.add(floor);

    const grid = new THREE.GridHelper(28, 28, signal, worldBorder);
    grid.position.set(0, -0.05, -7);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.23;
    scene.add(grid);

    const wallMaterial = new THREE.MeshStandardMaterial({ color: worldSurface, roughness: 0.72, metalness: 0.18 });
    for (const x of [-5.05, 5.05]) {
      const wall = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.2, 28), wallMaterial);
      wall.position.set(x, 1.35, -7);
      wall.receiveShadow = true;
      scene.add(wall);
    }

    for (let z = 5; z >= -19; z -= 4) {
      for (const x of [-4.15, 4.15]) {
        const marker = new THREE.Mesh(
          new THREE.BoxGeometry(0.12, 2.2, 0.12),
          new THREE.MeshStandardMaterial({
            color: progress === 4 ? signal : worldBorder,
            emissive: signal,
            emissiveIntensity: 0.08,
            roughness: 0.4,
          }),
        );
        marker.position.set(x, 1.1, z);
        scene.add(marker);
      }
    }

    const stagePositions = [
      new THREE.Vector3(0, 1.55, 1.5),
      new THREE.Vector3(2.6, 1.45, -3.5),
      new THREE.Vector3(-2.35, 1.7, -8.5),
      new THREE.Vector3(0, 1.5, -14),
    ];

    stagePositions.forEach((position, index) => {
      const group = new THREE.Group();
      group.position.copy(position);
      group.userData.stageIndex = index;

      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.72, 0.09, 14, 48),
        new THREE.MeshStandardMaterial({
          color: index === 0 ? signal : muted,
          emissive: index === 0 ? signal : world,
          emissiveIntensity: index === 0 ? 1.35 : 0.05,
          roughness: 0.25,
          metalness: 0.35,
        }),
      );
      ring.userData.stageIndex = index;
      group.add(ring);

      const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.36, 1),
        new THREE.MeshStandardMaterial({
          color: index === 0 ? signal : worldBorder,
          emissive: index === 0 ? signal : world,
          emissiveIntensity: index === 0 ? 0.72 : 0,
          roughness: 0.3,
        }),
      );
      core.userData.stageIndex = index;
      group.add(core);

      const label = makeLabel(`${String(index + 1).padStart(2, "0")}  ${stages[index]}`, dark ? "#f1f3f4" : "#ffffff");
      label.position.y = 1.12;
      group.add(label);

      targets.push(group);
      targetMeshes.push(ring, core);
      scene.add(group);
    });

    const finishGate = new THREE.Group();
    finishGate.position.set(0, 1.7, -18.2);
    const leftPost = new THREE.Mesh(new THREE.BoxGeometry(0.18, 3.4, 0.18), wallMaterial);
    leftPost.position.x = -2.2;
    const rightPost = leftPost.clone();
    rightPost.position.x = 2.2;
    const topPost = new THREE.Mesh(new THREE.BoxGeometry(4.55, 0.18, 0.18), wallMaterial);
    topPost.position.y = 1.7;
    finishGate.add(leftPost, rightPost, topPost);
    scene.add(finishGate);

    const ambient = new THREE.HemisphereLight(0xb9c9ff, 0x08090b, 1.65);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(3, 8, 5);
    key.castShadow = true;
    scene.add(key);
    const signalLight = new THREE.PointLight(signal, 18, 16, 1.8);
    signalLight.position.set(0, 3, -6);
    scene.add(signalLight);

    const updateTargetState = () => {
      targets.forEach((target, index) => {
        const active = index === progress;
        const complete = index < progress;
        for (const child of target.children) {
          if (!(child instanceof THREE.Mesh)) continue;
          const entry = child.material as THREE.MeshStandardMaterial;
          entry.color.copy(active ? signal : complete ? ink : muted);
          entry.emissive.copy(active ? signal : world);
          entry.emissiveIntensity = active ? 1.15 : complete ? 0.08 : 0.02;
        }
      });
    };

    const activateTarget = () => {
      if (progress >= targets.length) return;
      raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
      const hit = raycaster.intersectObjects(targetMeshes, false)[0];
      if (!hit || hit.object.userData.stageIndex !== progress || hit.distance > 11) return;
      progress += 1;
      updateTargetState();
      progressCallback.current(progress);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const focusedControl = target?.closest("button, a, input, textarea, select");
      if (focusedControl && document.pointerLockElement !== canvas) return;
      if (["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(event.code)) {
        event.preventDefault();
      }
      if (event.code === "Space") activateTarget();
      keys.add(event.code);
    };
    const onKeyUp = (event: KeyboardEvent) => keys.delete(event.code);
    const onMouseMove = (event: MouseEvent) => {
      if (document.pointerLockElement !== canvas) return;
      yaw -= event.movementX * 0.0022;
      pitch -= event.movementY * 0.0018;
      pitch = THREE.MathUtils.clamp(pitch, -0.72, 0.72);
    };
    const onCanvasClick = () => {
      if (document.pointerLockElement !== canvas) {
        void canvas.requestPointerLock();
        return;
      }
      activateTarget();
    };
    activateAction.current = activateTarget;
    controlAction.current = (action, pressed) => {
      if (pressed) controls.add(action);
      else controls.delete(action);
    };

    const resize = () => {
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const render = (time: number) => {
      if (!running) return;
      const delta = Math.min((time - lastTime) / 1000, 0.04);
      lastTime = time;

      if (controls.has("turnLeft")) yaw += delta * 1.8;
      if (controls.has("turnRight")) yaw -= delta * 1.8;

      camera.rotation.set(pitch, yaw, 0);
      const forward = new THREE.Vector3(0, 0, -1).applyEuler(new THREE.Euler(0, yaw, 0));
      const right = new THREE.Vector3(1, 0, 0).applyEuler(new THREE.Euler(0, yaw, 0));
      const movement = new THREE.Vector3();
      if (keys.has("KeyW") || keys.has("ArrowUp") || controls.has("forward")) movement.add(forward);
      if (keys.has("KeyS") || keys.has("ArrowDown") || controls.has("back")) movement.sub(forward);
      if (keys.has("KeyD") || controls.has("right")) movement.add(right);
      if (keys.has("KeyA") || controls.has("left")) movement.sub(right);
      if (keys.has("ArrowLeft")) yaw += delta * 1.8;
      if (keys.has("ArrowRight")) yaw -= delta * 1.8;
      if (movement.lengthSq() > 0) {
        movement.normalize().multiplyScalar(delta * 4.2);
        player.add(movement);
        player.x = THREE.MathUtils.clamp(player.x, -4.45, 4.45);
        player.z = THREE.MathUtils.clamp(player.z, -19.2, 6.2);
      }
      camera.position.copy(player);

      targets.forEach((target, index) => {
        if (!reducedMotion) {
          target.rotation.y += delta * (index === progress ? 0.95 : 0.18);
          if (index === progress) {
            target.position.y = stagePositions[index].y + Math.sin(time * 0.002) * 0.08;
          }
        }
      });
      signalLight.position.z = player.z - 3;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);
    document.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("click", onCanvasClick);
    updateTargetState();
    resize();
    camera.position.copy(player);
    frame = requestAnimationFrame(render);
    readyCallback.current();

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      if (document.pointerLockElement === canvas) document.exitPointerLock();
      resizeObserver.disconnect();
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
      activateAction.current = () => {};
      controlAction.current = () => {};
      document.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("click", onCanvasClick);
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
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="release-run-canvas" aria-label="Release Run first-person game" />
      <div className="release-run-crosshair" aria-hidden="true"><span /><span /></div>
    </>
  );
}
