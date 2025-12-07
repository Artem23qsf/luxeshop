import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Phone = () => {
  const phoneRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    if (phoneRef.current) {
      phoneRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(clock.getElapsedTime() * 2) * 0.05);
    }
  });

  return (
    <group ref={phoneRef}>
      {/* Phone body */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 3, 0.15]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Screen */}
      <mesh position={[0, 0, 0.076]} castShadow>
        <boxGeometry args={[1.4, 2.9, 0.01]} />
        <meshStandardMaterial
          color="#0a0a14"
          metalness={0.5}
          roughness={0.2}
          emissive="#1a3a5a"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Camera module */}
      <mesh position={[-0.4, 1.2, 0.08]} castShadow>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
        <meshStandardMaterial color="#0a0a14" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Camera lens */}
      <mesh position={[-0.4, 1.2, 0.11]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 32]} />
        <meshStandardMaterial
          color="#1a4a7a"
          metalness={1}
          roughness={0}
          emissive="#0066cc"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Gold accent ring */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.75, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={1}
          roughness={0.2}
          emissive="#d4af37"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Glow effect */}
      <mesh ref={glowRef} position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 3.1, 0.2]} />
        <meshBasicMaterial
          color="#d4af37"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
};

export const Phone3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d4af37" />
        <Phone />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={1}
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};