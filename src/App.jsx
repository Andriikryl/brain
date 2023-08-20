import { Canvas } from "@react-three/fiber"
import { OrbitControls, shaderMaterial } from "@react-three/drei"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import {data} from "./data"
import { useRef } from "react"

const PATHS = data.economics[0].paths

let curves = []
const randoRange = (min, max) => Math.random() * (max - min) + min

for(let i = 0; i < 100; i++){
  let points = []
  let length= randoRange(0.5, 1)
  for(let j = 0; j < 100; j++){
      points.push(
        new THREE.Vector3().setFromSphericalCoords(
          1,
          Math.PI - (j / 100) * Math.PI * length,
          (i / 100) * Math.PI * 2,
        )
      )
    }
    let tempcurve = new THREE.CatmullRomCurve3(points)
    curves.push(tempcurve)
}


function Tube({curve}) {

  const brainMat = useRef()

  const BrainMatirial = shaderMaterial(
    { time: 0, color: new THREE.Color(0.2, 0.4, 0.1) },
    // vertex shader
    /*glsl*/`
      varying vec2 vUv;
      varying float vProgress; 
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    // fragment shader
    /*glsl*/`
      uniform float time;
      uniform vec3 color;
      varying vec2 vUv;
      varying float vProgress; 
      void main() {
        vec3 color1 = vec3(1.0, 0.0, 0.0);
        vec3 color2 = vec3(1.0, 1.0, 0.0);
        vec3 finalColor = mix(color1, color2, vUv.y);
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `
  )
  
  // declaratively
  extend({ BrainMatirial }) 
  return (
    <>
    <mesh>
      <tubeGeometry args={[curve, 64, 0.01, 8, false]}/>
      <brainMatirial ref={brainMat}/>
    </mesh>
    </>
  )
}

function Tubes(){
  return (
    <>
    {curves.map((curve, index) => (
      <Tube curve={curve} key={index}/>
    ))}
    </>
  )
}

function App() {

  return (
    <Canvas camera={{position:[0,0, 1.3]}}>
      <color attach="background" args={["black"]}/>
      <ambientLight/>
      <pointLight position={[10, 10, 10]}/>
      <Tubes/>
      <OrbitControls/>
    </Canvas>
  )
}

export default App
