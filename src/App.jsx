import { Canvas } from "@react-three/fiber"
import { OrbitControls } from "@react-three/drei"

function App() {

  return (
    <Canvas>
      <ambientLight/>
      <pointLight position={[10, 10, 10]}/>
      <mesh>
        <boxGeometry args={[1,1,1]}></boxGeometry>
        <meshStandardMaterial color="tomato"/>
      </mesh>
      <OrbitControls/>
    </Canvas>
  )
}

export default App
