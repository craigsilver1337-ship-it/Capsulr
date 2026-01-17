/* eslint-disable @typescript-eslint/ban-ts-comment */
"use client"
import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import FloatingCapsule from '@/components/three/FloatingCapsule'

export default function Scene() {
  const [isReady, setIsReady] = useState(false)
  const [contextLost, setContextLost] = useState(false)

  useEffect(() => {
    // Ensure component is ready after mount
    setIsReady(true)
  }, [])

  if (!isReady) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-transparent" />
    )
  }

  if (contextLost) {
    // If context is lost, show a fallback or try to restore
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-transparent" />
    )
  }

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: false,
          powerPreference: "default",
          failIfMajorPerformanceCaveat: false,
          stencil: false,
          depth: true
        }}
        dpr={[1, 2]}
        frameloop="always"
        style={{ background: 'transparent' }}
        onCreated={({ gl }) => {
          // Set clear color to transparent
          gl.setClearColor(0x000000, 0)

          const handleContextLost = (event: Event) => {
            event.preventDefault();
            setContextLost(true);
            // Try to restore after a delay
            setTimeout(() => {
              setContextLost(false);
            }, 1000);
          };

          const handleContextRestored = () => {
            // Force re-render when context is restored
            gl.setClearColor(0x000000, 0);
            setContextLost(false);
          };

          gl.domElement.addEventListener('webglcontextlost', handleContextLost);
          gl.domElement.addEventListener('webglcontextrestored', handleContextRestored);

          return () => {
            gl.domElement.removeEventListener('webglcontextlost', handleContextLost);
            gl.domElement.removeEventListener('webglcontextrestored', handleContextRestored);
          };
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={false} enablePan={false} />
        {/* @ts-ignore */}
        <ambientLight intensity={0.8} />
        {/* @ts-ignore */}
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        {/* @ts-ignore */}
        <pointLight position={[-10, -10, 10]} intensity={0.8} />
        <FloatingCapsule />
        <Environment files="/dikhololo_night_1k.hdr" />
      </Canvas>
    </div>
  )
}