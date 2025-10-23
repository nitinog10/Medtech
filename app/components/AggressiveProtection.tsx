'use client'

import { useEffect, useRef, useState } from 'react'

interface AggressiveProtectionProps {
  children: React.ReactNode
  enableAggressiveMode?: boolean
}

export default function AggressiveProtection({
  children,
  enableAggressiveMode = true
}: AggressiveProtectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isBlocked, setIsBlocked] = useState(false)
  const [protectionLevel, setProtectionLevel] = useState(0)

  useEffect(() => {
    if (!enableAggressiveMode) return

    // Multiple detection methods
    const detectScreenshotAttempts = () => {
      // Detect window focus changes (potential screenshot tools)
      const handleFocusChange = () => {
        if (document.hidden) {
          setProtectionLevel(prev => prev + 1)
          if (protectionLevel > 2) {
            setIsBlocked(true)
            if (containerRef.current) {
              containerRef.current.style.display = 'none'
            }
          }
        }
      }

      // Detect rapid mouse movements (potential screenshot tools)
      let mouseMoveCount = 0
      const handleMouseMove = () => {
        mouseMoveCount++
        if (mouseMoveCount > 10) {
          setProtectionLevel(prev => prev + 1)
          mouseMoveCount = 0
        }
      }

      // Detect keyboard combinations
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
          setProtectionLevel(prev => prev + 2)
        }
        if (e.key === 'F12' || e.key === 'PrintScreen') {
          setProtectionLevel(prev => prev + 3)
        }
      }

      // Detect right-click attempts
      const handleContextMenu = (e: MouseEvent) => {
        e.preventDefault()
        setProtectionLevel(prev => prev + 1)
        return false
      }

      // Detect if page is being inspected
      const detectInspection = () => {
        const start = performance.now()
        debugger
        const end = performance.now()
        if (end - start > 100) {
          setProtectionLevel(prev => prev + 2)
        }
      }

      // Apply protection based on level
      const applyProtection = () => {
        if (protectionLevel > 5) {
          setIsBlocked(true)
          if (containerRef.current) {
            containerRef.current.style.display = 'none'
          }
        } else if (protectionLevel > 3) {
          if (containerRef.current) {
            containerRef.current.style.filter = 'blur(15px) brightness(0.2)'
            containerRef.current.style.pointerEvents = 'none'
          }
        } else if (protectionLevel > 1) {
          if (containerRef.current) {
            containerRef.current.style.filter = 'blur(8px) brightness(0.5)'
          }
        }
      }

      // Event listeners
      document.addEventListener('visibilitychange', handleFocusChange)
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('keydown', handleKeyDown)
      document.addEventListener('contextmenu', handleContextMenu)
      
      // Periodic inspection detection
      const inspectionInterval = setInterval(detectInspection, 1000)
      const protectionInterval = setInterval(applyProtection, 500)

      return () => {
        document.removeEventListener('visibilitychange', handleFocusChange)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('keydown', handleKeyDown)
        document.removeEventListener('contextmenu', handleContextMenu)
        clearInterval(inspectionInterval)
        clearInterval(protectionInterval)
      }
    }

    const cleanup = detectScreenshotAttempts()
    return cleanup
  }, [enableAggressiveMode, protectionLevel])

  // Reset protection level periodically
  useEffect(() => {
    const resetInterval = setInterval(() => {
      if (protectionLevel > 0) {
        setProtectionLevel(prev => Math.max(0, prev - 1))
      }
      if (isBlocked) {
        setIsBlocked(false)
        if (containerRef.current) {
          containerRef.current.style.display = 'block'
          containerRef.current.style.filter = 'none'
          containerRef.current.style.pointerEvents = 'auto'
        }
      }
    }, 10000) // Reset every 10 seconds

    return () => clearInterval(resetInterval)
  }, [protectionLevel, isBlocked])

  return (
    <div ref={containerRef} style={{ position: 'relative' }}>
      {children}
      {isBlocked && (
        <div className="fixed inset-0 bg-red-500 bg-opacity-90 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Content Protection Active
            </h2>
            <p className="text-gray-700 mb-4">
              Suspicious activity detected. Content access has been temporarily restricted.
            </p>
            <div className="text-sm text-gray-500">
              Please wait 10 seconds before trying again.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
