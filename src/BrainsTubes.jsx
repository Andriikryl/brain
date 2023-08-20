import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { extend } from "@react-three/fiber";
import { data } from "./data";
import { useRef } from "react";


function Tube({ curve }) {
  const brainMat = useRef();

  useFrame(({ clock }) => {
    brainMat.current.uniforms.time.value = clock.getElapsedTime();
  });

  const BrainMatirial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.1, 0.3, 0.6) },
    // vertex shader
    /*glsl*/ `
      varying vec2 vUv;
      uniform float time;
      varying float vProgress; 
      
      void main() {
        vUv = uv;
        vProgress = smoothstep(-1.,1.,sin(vUv.x * 8.0 + time*4.0));
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
      `,
    // fragment shader
    /*glsl*/ `
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying float vProgress; 
      
      void main() {
        vec3 finalColor = mix(color, color * 0.25, vProgress);
        float hideCorners = smoothstep(1.0, 0.9, vUv.x);
        float hideCorners1 = smoothstep(0., 0.1, vUv.x);
        gl_FragColor.rgba = vec4(vec3(vProgress), 1.0);
        gl_FragColor.rgba = vec4(finalColor, hideCorners*hideCorners1);
      }
      `
  );

  // declaratively
  extend({ BrainMatirial });
  return (
    <>
      <mesh>
        <tubeGeometry args={[curve, 64, 0.001, 2, false]} />
        <brainMatirial
          ref={brainMat}
          side={THREE.DoubleSide}
          transparent={true}
          depthTest={false}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </>
  );
}

export function Tubes({ allthecurves }) {
  return (
    <>
      {allthecurves.map((curve, index) => (
        <Tube curve={curve} key={index} />
      ))}
    </>
  );
}
