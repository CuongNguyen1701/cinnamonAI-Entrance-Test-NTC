import React, { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../MainPageComponents/Loader";

const Gear = ({ loading }) => {
  const ref = useRef();
  const Gear = useMemo(() => useGLTF("./gear/scene.gltf"), []);
  useFrame((state, delta) => {
    if (loading == 0) return;
    let speed = 5;
    ref.current.rotation.x += delta * speed * loading;
  });
  return (
    <mesh>
      <hemisphereLight intensity={0.15} groundColor="black" />

      <spotLight
        position={[-20, 50, 10]} //[x,y,z]
        angle={0.12}
        penumbra={1}
        intensity={1}
      />
      <pointLight intensity={1} />
      <primitive
        ref={ref}
        object={Gear.scene}
        scale={1 /* (1 + loading * 0.2)*/}
        rotation-z={Math.PI / 2}
      />
    </mesh>
  );
};

const GearCanvas = ({ loading }) => {
  return (
    <Canvas
      frameloop="demand"
      dpr={[1, 2]}
      performance={{ min: 0.1, max: 0.5 }}
      gl={{ preserveDrawingBuffer: false, antialias: false }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
      className="w-fit h-fit"
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.4}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />

        <Gear loading={loading} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default GearCanvas;
