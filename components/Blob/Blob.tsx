import { useMemo, useRef } from "react";
import vertexShader from "./vertexShader";
import fragmentShader from "./fragmentShader";
import { useFrame } from "@react-three/fiber/native";
import { MathUtils, Mesh, IcosahedronGeometry } from "three";
import { stressLevel } from "@/constants";

interface BlobProps {
  stressLevel: stressLevel;
}

const Blob = (props: BlobProps) => {
  const mesh = useRef<Mesh | null>(null);
  const uniforms = useMemo(() => {
    return {
      u_time: { value: 0 },
      u_intensity: { value: 0.1 },
    };
  }, []);

  useFrame((state) => {
    const { clock } = state;
    if (mesh.current) {
      mesh.current.material.uniforms.u_time.value =
        0.4 * clock.getElapsedTime();

      const intensity_mult =
        props.stressLevel === stressLevel.CALM
          ? 0.05
          : props.stressLevel === stressLevel.MODERATE
          ? 0.5
          : 1.0;

      mesh.current.material.uniforms.u_intensity.value = MathUtils.lerp(
        mesh.current.material.uniforms.u_intensity.value,
        intensity_mult,
        0.02
      );
    }
  });

  return (
    <mesh ref={mesh} scale={2} position={[0, 0, -4]}>
      <icosahedronGeometry args={[1, 5]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
};

export default Blob;
