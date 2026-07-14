import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Torus, Sphere, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

function RotatingCore() {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.x = state.clock.elapsedTime * 0.3;
    ref.current.rotation.y = state.clock.elapsedTime * 0.5;
  });
  return (
    <Icosahedron ref={ref} args={[0.8, 0]}>
      <meshStandardMaterial wireframe color="#00FF41" emissive="#00FF41" emissiveIntensity={0.3} />
    </Icosahedron>
  );
}

function OrbitRing({ radius, speed, offset = 0, color = "#00FF41" }) {
  const groupRef = useRef();
  const sphereRef = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime * speed + offset;
    groupRef.current.rotation.z = t * 0.3;
    sphereRef.current.position.x = Math.cos(t) * radius;
    sphereRef.current.position.y = Math.sin(t) * radius;
  });
  return (
    <group ref={groupRef}>
      <Torus args={[radius, 0.01, 2, 100]}>
        <meshStandardMaterial color={color} opacity={0.3} transparent wireframe />
      </Torus>
      <Sphere ref={sphereRef} args={[0.08, 8, 8]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} wireframe />
      </Sphere>
    </group>
  );
}

function OuterWireframe() {
  const ref = useRef();
  useFrame((s) => {
    ref.current.rotation.x = s.clock.elapsedTime * 0.1;
    ref.current.rotation.y = s.clock.elapsedTime * 0.15;
  });
  return (
    <Icosahedron ref={ref} args={[2.5, 1]}>
      <meshStandardMaterial wireframe color="#FF003C" opacity={0.15} transparent />
    </Icosahedron>
  );
}

const Orbit3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} color="#00FF41" intensity={1} />
        <pointLight position={[-5, -5, -5]} color="#FF003C" intensity={0.5} />

        <OuterWireframe />
        <RotatingCore />
        <OrbitRing radius={1.5} speed={1} offset={0} color="#00FF41" />
        <OrbitRing radius={1.8} speed={0.7} offset={2} color="#FF003C" />
        <OrbitRing radius={2.1} speed={0.5} offset={4} color="#ffffff" />

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
};

export default Orbit3D;
