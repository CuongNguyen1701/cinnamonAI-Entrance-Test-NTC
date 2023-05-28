import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls, Preload, useAnimations } from "@react-three/drei";

import CanvasLoader from "../MainPageComponents/Loader";
import { useMemo } from "react";
const objectName = "abstract_twisted_ball";
const MainObject = ({ isMobile }) => {
  const ref = useRef();
  const mainObject = useMemo(
    () => useLoader(GLTFLoader, `./${objectName}/scene.gltf`),
    []
  );
  const size = 0.4;
  const mobileSize = (70 / 75) * size;

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
        object={mainObject.scene}
        scale={isMobile ? mobileSize : size}
        position={isMobile ? [0, -3, 0] : [0, -3.25, 0]}
        rotation={[0, 0.5, 0]}
      />
    </mesh>
  );
};

const MainObjectCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);
    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };
    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      dpr={[0.1, 1]}
      performance={{
        min: 0.1,
        max: 1,
      }}
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: false }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          autoRotateSpeed={1}
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <MainObject isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default MainObjectCanvas;
