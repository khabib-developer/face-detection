import { useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import { useGLTF } from "@react-three/drei";
export default function Glasses() {
  const gltf = useLoader(GLTFLoader, "../assets/eyeglasses.glb");
  const { nodes, materials } = useGLTF("/eyeglasses.glb");
  const { scene } = useThree();
  console.log(nodes);
  return (
    <Suspense fallback={null}>
      <primitive object={gltf.scene} />
    </Suspense>
  );
}
