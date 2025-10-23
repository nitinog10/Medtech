'use client'

import { useEffect, useRef, useState } from 'react'

interface CanvasProtectionProps {
  children: React.ReactNode
  enableCanvasRendering?: boolean
}

export default function CanvasProtection({
  children,
  enableCanvasRendering = true
}: CanvasProtectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isCanvasReady, setIsCanvasReady] = useState(false)

  useEffect(() => {
    if (!enableCanvasRendering) return

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to match container
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    updateCanvasSize()
    setIsCanvasReady(true)

    // Create a complex pattern overlay
    const drawProtectionPattern = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw diagonal lines
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.1)'
      ctx.lineWidth = 1
      for (let i = -canvas.height; i < canvas.width + canvas.height; i += 20) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i + canvas.height, canvas.height)
        ctx.stroke()
      }

      // Draw watermark text
      ctx.fillStyle = 'rgba(255, 0, 0, 0.15)'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      
      for (let x = 0; x < canvas.width; x += 200) {
        for (let y = 0; y < canvas.height; y += 100) {
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(-Math.PI / 4)
          ctx.fillText('PROTECTED CONTENT', 0, 0)
          ctx.restore()
        }
      }

      // Draw random noise
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < 0.01) {
          data[i] = 255     // Red
          data[i + 1] = 0   // Green
          data[i + 2] = 0   // Blue
          data[i + 3] = 50  // Alpha
        }
      }
      ctx.putImageData(imageData, 0, 0)
    }

    drawProtectionPattern()

    // Redraw pattern periodically
    const interval = setInterval(drawProtectionPattern, 2000)

    // Handle window resize
    const handleResize = () => {
      updateCanvasSize()
      drawProtectionPattern()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [enableCanvasRendering])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {children}
      {enableCanvasRendering && isCanvasReady && (
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 10,
            mixBlendMode: 'multiply'
          }}
        />
      )}
    </div>
  )
}
