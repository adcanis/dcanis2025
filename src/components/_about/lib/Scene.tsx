import React from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  CubeCamera,
  Environment,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  HueSaturation,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import Robot from "./Robot";

const Scene = () => {
  return (
    <React.Suspense fallback={null}>
      <Canvas
        dpr={[1, 1.5]}
        shadows={false}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: true,
        }}
        style={{
          position: "absolute",
          height: "105%",
          width: "100%",
          top: 0,
          left: 0,
          opacity: 0.15,
        }}
      >
        <OrbitControls
          target={[0, 0.35, 0]}
          maxPolarAngle={1.45}
          enableZoom={false}
          enableRotate={false}
        />

        <PerspectiveCamera makeDefault fov={50} position={[3.5, 2, 3.25]} />

        <CubeCamera resolution={128} frames={1}>
          {(texture) => (
            <>
              <Environment background={false} map={texture} />
              <Robot />
            </>
          )}
        </CubeCamera>

        <spotLight
          color={[1.0, 0.95, 0.8]}
          intensity={33}
          angle={1}
          penumbra={0.5}
          position={[5, 5, 0]}
        />
        <spotLight
          color={[1.0, 1.0, 1.0]}
          intensity={30}
          angle={1}
          penumbra={0.5}
          position={[-5, 5, 0]}
        />

        <EffectComposer multisampling={0}>
          <Bloom
            blendFunction={BlendFunction.ADD}
            intensity={1.2}
            width={200}
            height={200}
            kernelSize={3}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.03}
          />
          <HueSaturation
            blendFunction={BlendFunction.NORMAL}
            hue={-0.15}
            saturation={0.2}
          />
        </EffectComposer>
      </Canvas>
    </React.Suspense>
  );
};

export default Scene;
