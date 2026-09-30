"use client"

import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'

// ── Solar terminator -- computes where the sun is right now ──
function getSunPosition() {
  const now = new Date()
  const start = new Date(now.getFullYear(), 0, 0)
  const dayOfYear = Math.floor((now - start) / 86400000)
  // Approximate solar declination (degrees)
  const decl = -23.45 * Math.cos(2 * Math.PI * (dayOfYear + 10) / 365)
  // Subsolar longitude: at UTC 12:00, sun is over 0° lng (Greenwich)
  const utcH = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600
  const sunLng = (12 - utcH) * 15
  return { lat: decl, lng: sunLng }
}

// Night-side overlay -- GLSL shader with per-frame sun direction sync.
//
// MATH: The Earth mesh applies Ry(earthRotY) * Rx(-0.25) to local normals to
// get world-space normals (XYZ Euler order, -0.25 rad fixed X tilt + Y auto-spin).
// The NightOverlay has no rotation, so its world normals are its local normals.
// For the overlay to match the geography we need:
//   dot(n_overlay, sunDir_shader) = dot(n_local_earth, baseSunDir)
// which requires:
//   sunDir_shader = Ry(+earthRotY) × Rx(-0.25) × baseSunDir
// Note the POSITIVE earthRotY (not negative).
function NightOverlay({ earthRotRef }) {
  // Base sun direction in the Earth-local frame at rotation.y = 0
  const baseSunDir = useMemo(() => {
    const p     = getSunPosition()
    const phi   = (90 - p.lat) * (Math.PI / 180)
    const theta = (p.lng + 180) * (Math.PI / 180)
    return new THREE.Vector3(
      -Math.sin(phi) * Math.cos(theta),
       Math.cos(phi),
       Math.sin(phi) * Math.sin(theta)
    ).normalize()
  }, [])

  // Shader uniforms -- sunDir mutated each frame
  const uniforms = useMemo(() => ({ sunDir: { value: baseSunDir.clone() } }), [baseSunDir])

  // Pre-allocated scratch objects (no per-frame GC)
  const _mat  = useMemo(() => new THREE.Matrix4(), [])
  const _matX = useMemo(() => new THREE.Matrix4().makeRotationX(-0.25), []) // Earth's fixed X tilt
  const _vec  = useMemo(() => new THREE.Vector3(), [])

  // Each frame: sunDir_shader = Ry(+earthRotY) × Rx(-0.25) × baseSunDir
  useFrame(() => {
    const rotY = earthRotRef?.current ?? 0
    _mat.makeRotationY(rotY)   // ← positive: matches the Earth's own Y rotation
    _mat.multiply(_matX)       // then apply the fixed -0.25 rad X tilt
    _vec.copy(baseSunDir).applyMatrix4(_mat)
    uniforms.sunDir.value.copy(_vec)
  })

  return (
    <mesh renderOrder={1}>
      <sphereGeometry args={[2.016, 64, 64]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec3 vWorldNormal;
          void main() {
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 sunDir;
          varying vec3 vWorldNormal;
          void main() {
            float cosA = dot(normalize(vWorldNormal), normalize(sunDir));
            float night = smoothstep(0.08, -0.12, cosA);
            gl_FragColor = vec4(0.0, 0.005, 0.04, night * 0.62);
          }
        `}
      />
    </mesh>
  )
}

// Chokepoint marker -- amber diamond pulsing dot
function ChokepointMarker({ cp }) {
  const [hovered, setHovered] = useState(false)

  const position = useMemo(() => {
    const phi   = (90 - cp.lat) * (Math.PI / 180)
    const theta = (cp.lng + 180) * (Math.PI / 180)
    const radius = 2.03
    return [
      -radius * Math.sin(phi) * Math.cos(theta),
       radius * Math.cos(phi),
       radius * Math.sin(phi) * Math.sin(theta)
    ]
  }, [cp.lat, cp.lng])

  const isCrit = cp.status === 'CRITICAL'
  const isElev = cp.status === 'ELEVATED'
  const color  = isCrit ? '#ef4444' : isElev ? '#f97316' : cp.status === 'MODERATE' ? '#f59e0b' : '#10b981'

  return (
    <mesh
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Diamond core (rotated box) */}
      <boxGeometry args={[0.055, 0.055, 0.055]} />
      <meshBasicMaterial color={color} />

      {/* Soft glow ring */}
      <mesh scale={[1, 1, 1]}>
        <sphereGeometry args={[0.10, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.18} />
      </mesh>

      <Html distanceFactor={8} zIndexRange={[90, 0]}>
        <div className="pointer-events-none select-none">
          {hovered && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col bg-black/95 border-l-2 px-3 py-2 shadow-2xl rounded-r-lg max-w-[200px]"
              style={{ borderColor: color }}
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-1.5 h-1.5 rounded-sm rotate-45" style={{ backgroundColor: color }} />
                <span className="text-white text-[9px] font-mono font-bold uppercase tracking-widest whitespace-nowrap">
                  {cp.name}
                </span>
              </div>
              <span className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color }}>
                {cp.status}
              </span>
              <p className="text-[9px] text-slate-400 leading-snug">{cp.desc}</p>
            </motion.div>
          )}
        </div>
      </Html>
    </mesh>
  )
}

// Small stationary dot used for surveillance layer (flights, vessels)
function SurvDot({ lat, lng, color }) {
  const position = useMemo(() => {
    const phi   = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)
    const r     = 2.04
    return [
      -r * Math.sin(phi) * Math.cos(theta),
       r * Math.cos(phi),
       r * Math.sin(phi) * Math.sin(theta),
    ]
  }, [lat, lng])

  return (
    <mesh position={position}>
      <sphereGeometry args={[0.018, 6, 6]} />
      <meshBasicMaterial color={color} />
    </mesh>
  )
}

function Earth({ risks, opportunities, chokepoints, autoRotate, showChokepoints, showDayNight, showThreats, onNodeClick, survFires, showSurvFires, survSeismic, showSurvSeismic }) {
  const meshRef    = useRef()
  const earthRotY  = useRef(0)           // shared with NightOverlay via ref
  const texture    = useLoader(THREE.TextureLoader, '/earth.jpg')

  useFrame((state, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.04
      earthRotY.current = meshRef.current.rotation.y
    }
  })

  return (
    <group>
      {/* Night-side overlay -- sibling to the Earth mesh; sun direction is
          corrected each frame by -earthRotY so it stays geographically accurate */}
      {showDayNight && <NightOverlay earthRotRef={earthRotY} />}

      <mesh ref={meshRef} rotation={[-0.25, 0, 0]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial map={texture} shininess={5} emissive="#ffffff" emissiveIntensity={0.18} />
        
        <mesh>
          <sphereGeometry args={[2.005, 32, 32]} />
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.05} />
        </mesh>

        {/* RISK NODES (RED) — toggleable via showThreats button */}
        {showThreats && risks.filter(node => typeof node.lat === 'number' && typeof node.lng === 'number').map((node, i) => (
          <Marker key={`risk-${i}`} node={node} color="#ff3333" type="RISK" onNodeClick={onNodeClick} />
        ))}

        {/* OPPORTUNITY NODES (GREEN) */}
        {opportunities.map((node, i) => (
          <Marker key={`opp-${i}`} node={node} color="#10b981" type="OPPORTUNITY" onNodeClick={onNodeClick} />
        ))}

        {/* CHOKEPOINT NODES (AMBER/RED) -- toggleable via showChokepoints */}
        {showChokepoints && (chokepoints || []).map((cp, i) => (
          <ChokepointMarker key={`cp-${cp.id || i}`} cp={cp} />
        ))}

        {/* SURVEILLANCE — ACTIVE FIRES (ORANGE dots) */}
        {showSurvFires && (survFires || []).map((f, i) => (
          <SurvDot key={`fire-${i}`} lat={f.lat} lng={f.lng} color="#f97316" />
        ))}

        {/* SURVEILLANCE — SEISMIC EVENTS (AMBER dots) */}
        {showSurvSeismic && (survSeismic || []).map((e, i) => (
          <SurvDot key={`eq-${i}`} lat={e.lat} lng={e.lng} color="#f59e0b" />
        ))}
      </mesh>
    </group>
  )
}

function Marker({ node, color, type, onNodeClick }) {
  const { lat, lng, title, hub } = node
  const [hovered, setHovered] = useState(false)
  
  const position = useMemo(() => {
    const phi = (90 - lat) * (Math.PI / 180)
    const theta = (lng + 180) * (Math.PI / 180)
    const radius = 2.03 
    return [
      -radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.cos(phi),
      radius * Math.sin(phi) * Math.sin(theta)
    ]
  }, [lat, lng])

  return (
    <mesh
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true) }}
      onPointerOut={(e) => { e.stopPropagation(); setHovered(false) }}
      onClick={(e) => { e.stopPropagation(); if (onNodeClick) onNodeClick(node) }}
    >
      {/* CORE DOT */}
      <sphereGeometry args={[0.055, 16, 16]} />
      <meshBasicMaterial color={color} />

      {/* TIGHT GLOW RING — small, no giant halo */}
      <mesh>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} />
      </mesh>
      
      <Html distanceFactor={8} zIndexRange={[100, 0]}>
        <div className="pointer-events-none select-none">
          {hovered && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="flex flex-col bg-black/90 border-l-2 px-3 py-2 shadow-2xl rounded-r-lg" 
              style={{ borderColor: color }}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: color }} />
                <span className="text-white text-[10px] font-mono font-bold uppercase tracking-widest whitespace-nowrap">
                  {type === 'OPPORTUNITY' ? hub : title}
                </span>
              </div>
              {type === 'OPPORTUNITY' && (
                <div className="text-[9px] font-mono mt-1" style={{ color }}>
                  {title}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </Html>
    </mesh>
  )
}

export default function Globe({ risks = [], opportunities = [], chokepoints = [], autoRotate = true, showChokepoints = true, showDayNight = true, showThreats = false, onNodeClick, survFires = [], showSurvFires = false, survSeismic = [], showSurvSeismic = false }) {
  return (
    <div className="w-full h-full">
      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 1.8, 5.8]} />
        <ambientLight intensity={3.5} />
        <pointLight position={[10, 10, 10]} intensity={5} color="#ffffff" />
        <pointLight position={[-10, 10, 5]} intensity={2.5} color="#38bdf8" />
        <pointLight position={[0, -10, 5]} intensity={1.5} color="#ffffff" />

        <React.Suspense fallback={<Html center><div className="text-sky-400 font-mono text-[10px] animate-pulse">SYNCING_MAP...</div></Html>}>
          <Earth
            risks={risks}
            opportunities={opportunities}
            chokepoints={chokepoints}
            autoRotate={autoRotate}
            showChokepoints={showChokepoints}
            showDayNight={showDayNight}
            showThreats={showThreats}
            onNodeClick={onNodeClick}
            survFires={survFires}
            showSurvFires={showSurvFires}
            survSeismic={survSeismic}
            showSurvSeismic={showSurvSeismic}
          />
        </React.Suspense>

        <OrbitControls enablePan={false} minDistance={3} maxDistance={12} rotateSpeed={0.5} />
      </Canvas>
    </div>
  )
}
