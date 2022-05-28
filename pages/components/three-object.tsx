import { Canvas, useFrame } from "@react-three/fiber";
import { FC, useRef } from "react";

type MeshBoxProps = {
  color: string;
  position: number[];
  args: number[];
};
const MeshBox: FC<MeshBoxProps> = ({ position, color, args }) => {
  const mesh = useRef<any>(null);

  useFrame(
    () => (mesh!.current.rotation.x = mesh!.current.rotation.y += 0.007)
  );

  return (
    <mesh ref={mesh} position={position}>
      {/* angles size and angles */}
      <boxBufferGeometry attach="geometry" args={args} />

      <meshStandardMaterial attach="material" color={color} />
    </mesh>
  );
};

export const ObjectCanvas: FC = () => {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [-5, 2, 10], fov: 60 }}>
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[0, 10, 0]}
          intensity={1}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <pointLight position={[-10, 0, -20]} intensity={0.5} />
        <pointLight position={[0, -10, 0]} intensity={1.5} />

        <MeshBox color="deeppink" position={[0, 1, 0]} args={[4, 6, 6]} />
        <MeshBox color="orange" position={[-4, 1, -7]} args={[4, 6, 6]} />
        <MeshBox color="greenyellow" position={[7, 1, 0]} args={[4, 6, 6]} />
      </Canvas>
    </div>
  );
};

export default ObjectCanvas;
