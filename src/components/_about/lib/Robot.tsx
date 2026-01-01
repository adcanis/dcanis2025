import React from "react";
import * as THREE from "three";
import {
  Text,
  MeshTransmissionMaterial,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";

const BASE_ROTATION_Y = Math.PI / -1.25;
const BASE_ROTATION_X = -0.05;

const HIDE_NAMES = new Set([
  "Plane002",
  "Plane002_Holograms_0",
  "Sphere002",
  "Sphere002_Holograms_0",
  "Plane003",
  "Plane003_Holograms_0",
]);

const Robot = React.memo(() => {
  const ref = React.useRef<THREE.Object3D | null>(null);
  const { scene, animations } = useGLTF("/models/face/scene.gltf");
  const { actions } = useAnimations(animations, ref);
  const { viewport } = useThree();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.002;
    }
  });

  React.useMemo(() => {
    if (!scene) return;

    scene.traverse((object) => {
      if (HIDE_NAMES.has(object.name)) {
        object.visible = false;
        return;
      }

      if (object instanceof THREE.Mesh) {
        object.castShadow = false;
        object.receiveShadow = false;

        const mat = object.material as THREE.MeshStandardMaterial | undefined;
        if (mat) {
          mat.envMapIntensity = 20;

          if (mat.name?.includes("Holograms")) {
            object.visible = false;
          }
        }
      }
    });
  }, [scene]);

  React.useEffect(() => {
    if (!ref.current) return;
    ref.current.scale.set(2.75, 2.75, 2.75);
    ref.current.position.set(0, -0.5, 0);
    ref.current.rotation.set(BASE_ROTATION_X, BASE_ROTATION_Y, 0);
  }, [scene]);

  React.useEffect(() => {
    Object.values(actions).forEach((action) => action?.reset().play());
  }, [actions]);

  return <primitive ref={ref} object={scene} />;
});

Robot.displayName = "Robot";

useGLTF.preload("/models/face/scene.gltf");

export default Robot;
