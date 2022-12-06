import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useRef, useState } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Cap from "../../models/Cap";
import Glasses from "./model";
const Box = (props) => {
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.z += 0.01));
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? "green" : "orange"} />
    </mesh>
  );
};

export const Three = (props) => {
  return (
    <div>
      <Canvas {...props}>
        {/* <OrbitControls /> */}
        {/* <color attach="background" args={["white"]} /> */}
        <hemisphereLight intensity={0.35} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.3}
          penumbra={1}
          intensity={2}
          castShadow
        />
        <Suspense fallback={null}>
          <Cap
            scale={0.1}
            position={[0, 0, -10]}
            rotation={[0, Math.PI / 2, 0]}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
