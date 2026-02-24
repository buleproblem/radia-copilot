"use client";
import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { continents, Continent, formatListeners } from "@/lib/mockData";
import { useRouter } from "next/navigation";

function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  const wireframeMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: "#0a2040",
        wireframe: true,
        transparent: true,
        opacity: 0.3,
      }),
    []
  );

  const solidMaterial = useMemo(
    () =>
      new THREE.MeshPhongMaterial({
        color: "#040d1a",
        transparent: true,
        opacity: 0.95,
        shininess: 80,
        specular: new THREE.Color("#003355"),
      }),
    []
  );

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Solid base sphere */}
      <Sphere args={[1, 64, 64]}>
        <primitive object={solidMaterial} attach="material" />
      </Sphere>
      {/* Wireframe overlay */}
      <Sphere args={[1.001, 24, 24]}>
        <primitive object={wireframeMaterial} attach="material" />
      </Sphere>
      {/* Atmosphere glow */}
      <Sphere args={[1.05, 32, 32]}>
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

function ContinentPin({
  continent,
  onClick,
}: {
  continent: Continent;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2 + continent.position[0] * 5) * 0.15
      );
    }
  });

  return (
    <group position={continent.position as [number, number, number]}>
      {/* Halo ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.06, 0.008, 8, 32]} />
        <meshBasicMaterial color={continent.color} transparent opacity={0.5} />
      </mesh>
      {/* Pin sphere */}
      <mesh ref={meshRef} onClick={onClick}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color={continent.color} />
      </mesh>
      {/* Glow */}
      <mesh>
        <sphereGeometry args={[0.055, 16, 16]} />
        <meshBasicMaterial color={continent.color} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function GlobeScene({ onContinentClick }: { onContinentClick: (slug: string) => void }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#0044ff" />
      <GlobeMesh />
      {continents.map((c) => (
        <ContinentPin
          key={c.slug}
          continent={c}
          onClick={() => onContinentClick(c.slug)}
        />
      ))}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={1.5}
        maxDistance={4}
        autoRotate={false}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

export default function Globe() {
  const router = useRouter();

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <GlobeScene onContinentClick={(slug) => router.push(`/continent/${slug}`)} />
      </Canvas>
      {/* Continent labels overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 text-center"
          style={{ color: "#9999bb" }}
        >
          <p className="text-xs tracking-widest">CLICK A PIN TO EXPLORE</p>
        </div>
      </div>
    </div>
  );
}
