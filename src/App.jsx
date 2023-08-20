import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, shaderMaterial } from "@react-three/drei"
import * as THREE from "three"
import { extend } from "@react-three/fiber"
import {data} from "./data"
import { useRef } from "react"
import {Tubes} from "./BrainsTubes"

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

let brainCurves = []

PATHS.forEach((path) => {
  let points = []
  for(let i = 0; i < path.length; i+=3){
    points.push(new THREE.Vector3(path[i], path[i+1], path[i+2]))
  }
  let tempcurve = new THREE.CatmullRomCurve3(points);
  brainCurves.push(tempcurve)
})




function App() {

  return (
    <Canvas camera={{position:[0,0, 0.3], near: 0.001, far: 5}}>
      <color attach="background" args={["black"]}/>
      <ambientLight/>
      <pointLight position={[10, 10, 10]}/>
      <Tubes allthecurves={brainCurves}/>
      <OrbitControls/>
    </Canvas>
  )
}

export default App
