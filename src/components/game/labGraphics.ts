import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

type LabGraphicsOptions = {
  /** Bloom strength for anything brighter than white: signals, seams, rings. */
  bloom?: number;
  /** How strongly the studio environment lights and reflects in materials. */
  environment?: number;
  /** A slow field of dust that gives the dark stage depth. */
  dust?: { center: [number, number, number]; size: [number, number, number] };
};

/** A colour pushed past white so the bloom pass picks it up as light. */
export function glow(color: THREE.ColorRepresentation, intensity = 2.6) {
  return new THREE.Color(color).multiplyScalar(intensity);
}

/**
 * One look for every Product Lab game: soft shadows, studio reflections,
 * neutral tone mapping (screenshots keep their colours) and bloom on light.
 */
export function createLabGraphics(
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera,
  { bloom = 0.5, environment = 0.22, dust }: LabGraphicsOptions = {}
) {
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environmentMap = pmrem.fromScene(room, 0.04).texture;
  scene.environment = environmentMap;
  scene.environmentIntensity = environment;

  const target = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.HalfFloatType,
    samples: 4,
  });
  const composer = new EffectComposer(renderer, target);
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(
    new UnrealBloomPass(new THREE.Vector2(1, 1), bloom, 0.6, 0.95)
  );
  composer.addPass(new OutputPass());

  let particles: THREE.Points | null = null;
  if (dust) {
    const count = 260;
    const positions = new Float32Array(count * 3);
    for (let index = 0; index < count; index += 1) {
      for (let axis = 0; axis < 3; axis += 1) {
        positions[index * 3 + axis] = (Math.random() - 0.5) * dust.size[axis];
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particles = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        color: new THREE.Color("#82aaff"),
        size: 0.03,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      })
    );
    particles.position.set(...dust.center);
    scene.add(particles);
  }

  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return {
    setSize(width: number, height: number) {
      composer.setPixelRatio(renderer.getPixelRatio());
      composer.setSize(width, height);
    },
    render(time = 0) {
      if (particles && !still) {
        particles.rotation.y = time * 0.00004;
        particles.position.y = dust!.center[1] + Math.sin(time * 0.0003) * 0.2;
      }
      composer.render();
    },
    dispose() {
      scene.environment = null;
      environmentMap.dispose();
      room.dispose();
      pmrem.dispose();
      target.dispose();
      composer.dispose();
    },
  };
}
