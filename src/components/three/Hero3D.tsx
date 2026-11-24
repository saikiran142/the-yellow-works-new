"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * Real-time hero object: the logo cube, lit. A rounded dark body with the three edges at its near corner
 * glowing yellow, seen along the body diagonal so the edges read as the logo's Y.
 * Loaded only on capable devices (see lib/capability.ts); the SVG cube is the fallback.
 */
function Cube() {
  const group = useRef<THREE.Group>(null);
  const body = useMemo(() => new RoundedBoxGeometry(2, 2, 2, 6, 0.16), []);
  const bars = useMemo(
    () =>
      ([
        [[0, 1, 1], [2.1, 0.46, 0.46]],
        [[1, 0, 1], [0.46, 2.1, 0.46]],
        [[1, 1, 0], [0.46, 0.46, 2.1]],
      ] as const).map(([p, s]) => ({ p, geo: new RoundedBoxGeometry(s[0], s[1], s[2], 4, 0.14) })),
    [],
  );
  useEffect(() => () => { body.dispose(); bars.forEach((b) => b.geo.dispose()); }, [body, bars]);

  // Gentle tilt toward the cursor, only with a precise pointer (the capability gate already ensures this).
  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y += (state.pointer.x * 0.35 - g.rotation.y) * 0.06;
    g.rotation.x += (-state.pointer.y * 0.2 - g.rotation.x) * 0.06;
  });

  return (
    <group ref={group}>
      <mesh geometry={body}>
        <meshStandardMaterial color="#4b40b8" roughness={0.55} />
      </mesh>
      {bars.map((b, i) => (
        <mesh key={i} geometry={b.geo} position={[b.p[0], b.p[1], b.p[2]]}>
          <meshStandardMaterial color="#FFD52A" emissive="#FF9F1C" emissiveIntensity={0.45} roughness={0.4} />
        </mesh>
      ))}
      <mesh position={[1, 1, 1]}>
        <sphereGeometry args={[0.34, 32, 24]} />
        <meshStandardMaterial color="#FFF1B8" emissive="#FF9F1C" emissiveIntensity={0.6} roughness={0.4} />
      </mesh>
      <pointLight position={[1.9, 1.9, 1.9]} color="#FF9F1C" intensity={14} distance={7} decay={2} />
    </group>
  );
}

export default function Hero3D({ onReady }: { onReady: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  // Pause the render loop when offscreen or the tab is hidden.
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    let inView = true;
    const update = () => setVisible(inView && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => { inView = e.isIntersecting; update(); });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", update); };
  }, []);

  return (
    <div ref={wrap} style={{ position: "absolute", inset: 0 }} aria-hidden="true">
      <Canvas
        flat
        dpr={[1, 2]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [11, 10.6, 11], fov: 17 }}
        gl={{ alpha: true, antialias: true, powerPreference: "default" }}
        onCreated={({ camera }) => { camera.lookAt(0, 0.05, 0); onReady(); }}
      >
        <hemisphereLight args={["#FFF1B8", "#2A2160", 1.3]} />
        <directionalLight position={[-5, 9, 6]} color="#FFE2B0" intensity={1.8} />
        <directionalLight position={[6, 2, 7]} color="#FF9F1C" intensity={0.9} />
        <Cube />
      </Canvas>
    </div>
  );
}
