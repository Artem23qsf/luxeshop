import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const Chair = () => {
  const chairRef = useRef();

  useFrame(({ clock }) => {
    if (chairRef.current) {
      chairRef.current.rotation.y = clock.getElapsedTime() * 0.2;
    }
  });

  return (
    <group ref={chairRef} position={[0, -1, 0]}>
      {/* Seat */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.15, 1.5]} />
        <meshStandardMaterial
          color="#3a2618"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 1.2, -0.65]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 0.15]} />
        <meshStandardMaterial
          color="#3a2618"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Front Left Leg */}
      <mesh position={[-0.6, 0, 0.6]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial
          color="#2a1810"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Front Right Leg */}
      <mesh position={[0.6, 0, 0.6]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 1, 16]} />
        <meshStandardMaterial
          color="#2a1810"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Back Left Leg */}
      <mesh position={[-0.6, 0.5, -0.6]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
        <meshStandardMaterial
          color="#2a1810"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Back Right Leg */}
      <mesh position={[0.6, 0.5, -0.6]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 2, 16]} />
        <meshStandardMaterial
          color="#2a1810"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      {/* Armrest Left */}
      <mesh position={[-0.7, 0.8, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.1, 1.2]} />
        <meshStandardMaterial
          color="#3a2618"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Armrest Right */}
      <mesh position={[0.7, 0.8, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.1, 0.1, 1.2]} />
        <meshStandardMaterial
          color="#3a2618"
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Gold accent details */}
      <mesh position={[0, 0.6, 0.76]} rotation={[0, 0, 0]}>
        <torusGeometry args={[0.08, 0.015, 8, 32]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={1}
          roughness={0.2}
          emissive="#d4af37"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Cushion padding effect */}
      <mesh position={[0, 0.58, 0]} receiveShadow>
        <boxGeometry args={[1.4, 0.08, 1.4]} />
        <meshStandardMaterial
          color="#5a3828"
          roughness={0.6}
          metalness={0}
        />
      </mesh>
    </group>
  );
};

export const Furniture3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[3, 2, 5]} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 3, -5]} intensity={0.5} color="#d4af37" />
        <Chair />
        {/* Ground plane */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <Environment preset="apartment" />
      </Canvas>
    </div>
  );
};