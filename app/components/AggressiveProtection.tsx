```tsx
'use client'

import { useEffect, useRef, useState } from'react'
import { applyProtection, detectInspection, detectScreenshotAttempts } from '../../utils/protectionUtils'

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

    const cleanup = detectScreenshotAttempts(setProtectionLevel, containerRef)
    return cleanup
  }, [enableAggressiveMode])

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
    }, 10000)

    return () => clearInterval(resetInterval)
  }, [protectionLevel, isBlocked])

  useEffect(() => {
    applyProtection(protectionLevel, containerRef, setIsBlocked)
  }, [protectionLevel])

  return (
    <div ref={containerRef} style={{ position:'relative' }}>
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
```