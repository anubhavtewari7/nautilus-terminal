"use client"

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
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

// ── Atmospheric glow — Fresnel-effect blue limb visible from orbit ──
function Atmosphere() {
  const atmoVert = `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `
  const atmoFrag = `
    varying vec3 vNormal;
    void main() {
      float intensity = pow(0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 5.0);
      gl_FragColor = vec4(0.15, 0.5, 1.0, intensity);
    }
  `
  return (
    <mesh>
      <sphereGeometry args={[2.18, 64, 64]} />
      <shaderMaterial
        vertexShader={atmoVert}
        fragmentShader={atmoFrag}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

// ── Country border lines — single LineSegments draw call for all countries ──
function CountryBorders() {
  const [lineGeo, setLineGeo] = useState(null)

  useEffect(() => {
    fetch('/countries.json')
      .then(r => r.json())
      .then(data => {
        const positions = []
        const R = 2.003 // just above Earth surface (radius 2)

        const addRing = (ring) => {
          for (let i = 0; i < ring.length - 1; i++) {
            const [lng0, lat0] = ring[i]
            const [lng1, lat1] = ring[i + 1]
            const push = (lng, lat) => {
              const phi   = (90 - lat) * (Math.PI / 180)
              const theta = (lng + 180) * (Math.PI / 180)
              positions.push(
                -R * Math.sin(phi) * Math.cos(theta),
                 R * Math.cos(phi),
                 R * Math.sin(phi) * Math.sin(theta)
              )
            }
            push(lng0, lat0)
            push(lng1, lat1)
          }
        }

        for (const feature of data.features) {
          const { type, coordinates } = feature.geometry
          if (type === 'Polygon') {
            for (const ring of coordinates) addRing(ring)
          } else if (type === 'MultiPolygon') {
            for (const poly of coordinates)
              for (const ring of poly) addRing(ring)
          }
        }

        const geo = new THREE.BufferGeometry()
        geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
        setLineGeo(geo)
      })
      .catch(() => {}) // silent fail — borders are decorative
  }, [])

  if (!lineGeo) return null
  return (
    <lineSegments geometry={lineGeo}>
      <lineBasicMaterial color="#38bdf8" transparent opacity={0.22} />
    </lineSegments>
  )
}

// ── Major port / trade city labels — visible only when zoomed in ──
const CITIES = [
  { name: 'Shanghai',     lat:  31.23,  lng: 121.47 },
  { name: 'Singapore',    lat:   1.35,  lng: 103.82 },
  { name: 'Rotterdam',    lat:  51.90,  lng:   4.48 },
  { name: 'Dubai',        lat:  25.20,  lng:  55.27 },
  { name: 'Hong Kong',    lat:  22.32,  lng: 114.17 },
  { name: 'Los Angeles',  lat:  33.73,  lng: -118.26 },
  { name: 'New York',     lat:  40.65,  lng:  -74.07 },
  { name: 'Busan',        lat:  35.10,  lng: 129.04 },
  { name: 'Antwerp',      lat:  51.25,  lng:   4.42 },
  { name: 'Qingdao',      lat:  36.07,  lng: 120.38 },
  { name: 'Ningbo',       lat:  29.87,  lng: 121.56 },
  { name: 'Guangzhou',    lat:  23.10,  lng: 113.26 },
  { name: 'Tianjin',      lat:  39.00,  lng: 117.72 },
  { name: 'Klang',        lat:   3.00,  lng: 101.39 },
  { name: 'Hamburg',      lat:  53.53,  lng:   9.99 },
  { name: 'Kaohsiung',    lat:  22.62,  lng: 120.28 },
  { name: 'Tokyo',        lat:  35.65,  lng: 139.76 },
  { name: 'Mumbai',       lat:  18.95,  lng:  72.84 },
  { name: 'Jeddah',       lat:  21.48,  lng:  39.17 },
  { name: 'Tanjung Pelepas', lat: 1.36, lng: 103.55 },
  { name: 'Colombo',      lat:   6.93,  lng:  79.84 },
  { name: 'Jakarta',      lat:  -6.10,  lng: 106.83 },
  { name: 'Laem Chabang', lat:  13.07,  lng: 100.88 },
  { name: 'Long Beach',   lat:  33.76,  lng: -118.21 },
  { name: 'Savannah',     lat:  32.08,  lng:  -81.09 },
  { name: 'Felixstowe',   lat:  51.96,  lng:   1.35 },
  { name: 'Algeciras',    lat:  36.13,  lng:  -5.45 },
  { name: 'Valencia',     lat:  39.44,  lng:  -0.32 },
  { name: 'Santos',       lat: -23.95,  lng:  -46.33 },
  { name: 'Durban',       lat: -29.87,  lng:  31.04 },
]

const _worldPos = new THREE.Vector3()
const _camDir   = new THREE.Vector3()

function CityLabel({ city }) {
  const { camera } = useThree()
  const htmlRef  = useRef()
  const meshRef  = useRef()
  const dotRef   = useRef()

  const R = 2.04
  const phi   = (90 - city.lat) * (Math.PI / 180)
  const theta = (city.lng + 180) * (Math.PI / 180)
  const pos = [
    -R * Math.sin(phi) * Math.cos(theta),
     R * Math.cos(phi),
     R * Math.sin(phi) * Math.sin(theta),
  ]

  useFrame(() => {
    if (!meshRef.current) return
    // World position of this city after Earth rotation
    meshRef.current.getWorldPosition(_worldPos)
    // Unit vector from Earth centre toward camera
    _camDir.copy(camera.position).normalize()
    // Positive dot → city is on the near hemisphere; negative → behind the globe
    const onFront = _worldPos.dot(_camDir) > 0.05
    const dist = camera.position.length()
    const opacity = onFront
      ? (dist < 4.5 ? 0.9 : dist > 7.0 ? 0 : (7.0 - dist) / 2.5 * 0.9)
      : 0
    if (htmlRef.current) htmlRef.current.style.opacity = String(opacity)
    if (dotRef.current)  dotRef.current.style.opacity  = onFront ? '1' : '0'
  })

  return (
    <mesh ref={meshRef} position={pos}>
      {/* Tiny dot — visibility controlled via dotRef */}
      <sphereGeometry args={[0.012, 5, 5]} />
      <meshBasicMaterial color="#38bdf8" />
      <Html distanceFactor={6} zIndexRange={[50, 0]}>
        <div style={{ pointerEvents: 'none', userSelect: 'none' }}>
          <div
            ref={dotRef}
            style={{ width: 4, height: 4, borderRadius: '50%', background: '#38bdf8', marginBottom: 2 }}
          />
          <div
            ref={htmlRef}
            className="pointer-events-none select-none"
            style={{
              color: '#38bdf8',
              fontSize: '8px',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              textShadow: '0 0 6px rgba(0,0,0,1)',
              opacity: 0,
              transform: 'translateX(5px)',
              transition: 'opacity 0.15s',
            }}
          >
            {city.name}
          </div>
        </div>
      </Html>
    </mesh>
  )
}

function CityLabels() {
  return (
    <>
      {CITIES.map(city => <CityLabel key={city.name} city={city} />)}
    </>
  )
}

function Earth({ risks, opportunities, chokepoints, autoRotate, showChokepoints, showDayNight, showThreats, onNodeClick, survFires, showSurvFires, survSeismic, showSurvSeismic }) {
  const meshRef    = useRef()
  const earthRotY  = useRef(0)           // shared with NightOverlay via ref
  const [colorMap, bumpMap] = useLoader(THREE.TextureLoader, ['/earth.jpg', '/earth-bump.png'])
  const { gl } = useThree()

  // Max anisotropy = sharper texture at oblique angles
  useEffect(() => {
    const max = gl.capabilities.getMaxAnisotropy()
    colorMap.anisotropy = max
    bumpMap.anisotropy  = max
    colorMap.needsUpdate = true
    bumpMap.needsUpdate  = true
  }, [colorMap, bumpMap, gl])

  useFrame((state, delta) => {
    if (autoRotate && meshRef.current) {
      meshRef.current.rotation.y += delta * 0.04
      earthRotY.current = meshRef.current.rotation.y
    }
  })

  return (
    <group>
      {/* Atmospheric glow — always visible, sits outside the Earth sphere */}
      <Atmosphere />

      {/* Night-side overlay -- sibling to the Earth mesh; sun direction is
          corrected each frame by -earthRotY so it stays geographically accurate */}
      {showDayNight && <NightOverlay earthRotRef={earthRotY} />}

      <mesh ref={meshRef} rotation={[-0.25, 0, 0]}>
        <sphereGeometry args={[2, 96, 96]} />
        <meshPhongMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.06}
          shininess={18}
          emissive="#ffffff"
          emissiveIntensity={0.12}
        />

        {/* Country borders + city labels inside the rotating Earth mesh so they spin with it */}
        <CountryBorders />
        <CityLabels />

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
        <ambientLight intensity={2.2} />
        <pointLight position={[10, 10, 10]} intensity={4.5} color="#ffffff" />
        <pointLight position={[-8, 6, 4]} intensity={1.8} color="#60a5fa" />
        <pointLight position={[0, -8, 4]} intensity={1.2} color="#ffffff" />

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
