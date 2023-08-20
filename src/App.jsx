import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"
import * as THREE from "three"
import {data} from "./data"



let curves = []

for(let i = 0; i < 100; i++){
  let points = []
  for(let j = 0; j < 100; j++){
      points.push(
        new THREE.Vector3().setFromSphericalCoords(
          0.2,
          (i / 100) * Math.PI,
          (j / 100) * Math.PI * 2,
        )
      )
    }
    let tempcurve = new THREE.CatmullRomCurve3(points)
    curves.push(tempcurve)
}


function Tube({curve}) {
  return (
    <>
    <mesh>
      <tubeGeometry args={[curve, 64, 0.1, 8, false]}/>
      <meshStandardMaterial color="hotpink"/>
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
    <Canvas>
      <ambientLight/>
      <pointLight position={[10, 10, 10]}/>
      <Tubes/>
      <OrbitControls/>
    </Canvas>
  )
}

export default App
