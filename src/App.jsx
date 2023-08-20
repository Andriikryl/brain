import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import {data} from "./data"


const PATHS = data.economics[0].paths

function Tube() {
  let points = []
    for(let i = 0; i < 10; i++){
      points.push(
        new THREE.Vector3(
          (i - 5) * 0.5, 
          Math.sin(i * 2) * 10 + 5,
        0)
      )
    }
    let curve = new THREE.CatmullRomCurve3(points)
  return (
    <>
    <mesh>
      <tubeGeometry args={[curve, 64, 0.1, 8, false]}/>
      <meshStandardMaterial color="hotpink"/>
    </mesh>
    </>
  )
}

function App() {

  return (
    <Canvas>
      <ambientLight/>
      <pointLight position={[10, 10, 10]}/>
      <mesh>
        <boxGeometry args={[1,1,1]}></boxGeometry>
        <meshStandardMaterial color="tomato"/>
      </mesh>
      <Tube/>
      <OrbitControls/>
    </Canvas>
  )
}

export default App
