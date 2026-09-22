"use client"

import { useEffect, useRef, useSyncExternalStore } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { ContactShadows, OrbitControls } from "@react-three/drei"
import { MathUtils, ACESFilmicToneMapping, type Group } from "three"
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib"
import { CssOrbit } from "@/components/css-orbit"
import { prefersReducedMotion } from "@/lib/lenis"

type OrbitApi = { nudge: (direction: number) => void }

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas")
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    )
  } catch {
    return false
  }
}

function unit(index: number) {
  const value = Math.sin(index * 127.1) * 43758.5453
  return value - Math.floor(value)
}

const particlePositions = (() => {
  const count = 160
  const array = new Float32Array(count * 3)
  for (let index = 0; index < count; index += 1) {
    const radius = 2.25 + unit(index + 1) * 0.45
    const theta = unit(index + 19) * Math.PI * 2
    const phi = Math.acos(2 * unit(index + 47) - 1)
    array[index * 3] = radius * Math.sin(phi) * Math.cos(theta)
    array[index * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55
    array[index * 3 + 2] = radius * Math.cos(phi)
  }
  return array
})()

function Particles() {
  const positions = particlePositions

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#d5eee9"
        size={0.018}
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

function Sculpture({
  angleRef,
  apiRef,
  active,
}: {
  angleRef: React.RefObject<HTMLSpanElement | null>
  apiRef: React.MutableRefObject<OrbitApi | null>
  active: boolean
}) {
  const tilt = useRef<Group>(null)
  const orbitA = useRef<Group>(null)
  const orbitB = useRef<Group>(null)
  const orbitC = useRef<Group>(null)
  const controls = useRef<OrbitControlsImpl>(null)
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    apiRef.current = {
      nudge(direction) {
        const control = controls.current
        if (!control) return
        control.autoRotate = false
        control.setAzimuthalAngle(control.getAzimuthalAngle() + direction * 0.28)
        control.update()
        window.setTimeout(() => {
          if (controls.current) controls.current.autoRotate = !prefersReducedMotion()
        }, 650)
      },
    }

    const onPointer = (event: PointerEvent) => {
      pointer.current.x = event.clientX / window.innerWidth - 0.5
      pointer.current.y = event.clientY / window.innerHeight - 0.5
    }
    window.addEventListener("pointermove", onPointer)
    return () => {
      apiRef.current = null
      window.removeEventListener("pointermove", onPointer)
    }
  }, [apiRef])

  useFrame((_, delta) => {
    if (!active) return
    if (orbitA.current) orbitA.current.rotation.y += delta * 0.38
    if (orbitB.current) orbitB.current.rotation.y -= delta * 0.24
    if (orbitC.current) orbitC.current.rotation.z += delta * 0.16

    if (tilt.current) {
      const dragging = Boolean(controls.current && !controls.current.autoRotate)
      const targetX = dragging ? 0 : pointer.current.y * 0.16
      const targetY = dragging ? 0 : pointer.current.x * 0.2
      tilt.current.rotation.x = MathUtils.lerp(tilt.current.rotation.x, targetX, 0.05)
      tilt.current.rotation.y = MathUtils.lerp(tilt.current.rotation.y, targetY, 0.05)
    }

    const azimuth = controls.current?.getAzimuthalAngle() ?? 0
    const degrees = (Math.round((azimuth * 180) / Math.PI) % 360 + 360) % 360
    if (angleRef.current) {
      angleRef.current.textContent = `${degrees.toString().padStart(3, "0")}°`
    }
  })

  return (
    <>
      <group ref={tilt}>
        <mesh>
          <icosahedronGeometry args={[0.62, 1]} />
          <meshPhysicalMaterial
            color="#14302d"
            emissive="#7dcec6"
            emissiveIntensity={0.42}
            metalness={0.62}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.18}
          />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[0.68, 1]} />
          <meshBasicMaterial color="#b7ebe4" wireframe transparent opacity={0.28} />
        </mesh>

        <mesh rotation={[Math.PI / 2.2, 0.18, 0.15]}>
          <torusGeometry args={[1.22, 0.011, 16, 140]} />
          <meshStandardMaterial color="#e2d0b0" metalness={0.92} roughness={0.22} />
        </mesh>
        <mesh rotation={[1.08, 0.86, 0.2]}>
          <torusGeometry args={[1.62, 0.008, 12, 150]} />
          <meshStandardMaterial color="#8fd0c8" metalness={0.8} roughness={0.26} />
        </mesh>
        <mesh rotation={[0.32, 1.2, 0.9]}>
          <torusGeometry args={[2.02, 0.0055, 12, 160]} />
          <meshStandardMaterial
            color="#f4f1ea"
            metalness={0.84}
            roughness={0.28}
            transparent
            opacity={0.72}
          />
        </mesh>

        <group ref={orbitA}>
          <mesh position={[1.22, 0, 0]}>
            <sphereGeometry args={[0.07, 24, 24]} />
            <meshStandardMaterial
              color="#9be0d8"
              emissive="#8fd0c8"
              emissiveIntensity={0.7}
              metalness={0.2}
              roughness={0.3}
            />
          </mesh>
        </group>
        <group ref={orbitB} rotation={[0.85, 0.35, 0.15]}>
          <mesh position={[1.62, 0, 0]}>
            <sphereGeometry args={[0.05, 24, 24]} />
            <meshStandardMaterial
              color="#e4d0ae"
              emissive="#d7c4a4"
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>
        <group ref={orbitC} rotation={[0.25, 0.4, 1.05]}>
          <mesh position={[2.02, 0, 0]}>
            <sphereGeometry args={[0.042, 20, 20]} />
            <meshStandardMaterial color="#f7f4ee" emissive="#f3f1ea" emissiveIntensity={0.25} />
          </mesh>
        </group>

        <Particles />
      </group>

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.38}
        scale={8}
        blur={2.4}
        far={3.2}
        color="#000000"
      />

      <OrbitControls
        ref={controls}
        enableZoom={false}
        enablePan={false}
        autoRotate={!prefersReducedMotion()}
        autoRotateSpeed={0.55}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.6}
        minPolarAngle={Math.PI / 2.7}
        maxPolarAngle={Math.PI / 1.6}
        onStart={() => {
          if (controls.current) controls.current.autoRotate = false
        }}
        onEnd={() => {
          if (controls.current && !prefersReducedMotion()) {
            controls.current.autoRotate = true
          }
        }}
      />
    </>
  )
}

export function HeroScene({
  angleRef,
  apiRef,
  active,
}: {
  angleRef: React.RefObject<HTMLSpanElement | null>
  apiRef: React.MutableRefObject<OrbitApi | null>
  active: boolean
}) {
  const webgl = useSyncExternalStore(
    () => () => {},
    supportsWebGL,
    () => false
  )

  if (!webgl) {
    return <CssOrbit angleRef={angleRef} apiRef={apiRef} />
  }

  return (
    <Canvas
      camera={{ position: [0.15, 0.42, 5.35], fov: 30 }}
      dpr={[1, 1.6]}
      frameloop={active ? "always" : "demand"}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
        gl.toneMapping = ACESFilmicToneMapping
        gl.toneMappingExposure = 1.08
      }}
    >
      <ambientLight intensity={0.32} />
      <directionalLight position={[4.5, 5, 3]} intensity={2.4} color="#fff4e6" />
      <directionalLight position={[-4, -1.5, -2]} intensity={0.9} color="#7ec8c3" />
      <pointLight position={[0, 0.2, 0.4]} intensity={1.4} color="#8fd0c8" distance={7} />
      <Sculpture angleRef={angleRef} apiRef={apiRef} active={active} />
    </Canvas>
  )
}
