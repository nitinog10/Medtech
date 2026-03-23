```typescript
'use client'

import { useEffect, useState } from'react'
import { useSecurityUtils } from 'utils/securityUtils'

interface AdvancedSecurityProps {
  children: React.ReactNode
}

export default function AdvancedSecurity({ children }: AdvancedSecurityProps) {
  const [securityLevel, setSecurityLevel] = useState('high')
  const [isTampered, setIsTampered] = useState(false)
  const { checkDevTools, checkDebugger, monitorConsole, checkScreenshotTools, applySecurityStyles } = useSecurityUtils(setIsTampered)

  useEffect(() => {
    const interval = setInterval(() => {
      checkDevTools()
      checkDebugger()
    }, 1000)

    return () => {
      clearInterval(interval)
      monitorConsole(false)
    }
  }, [checkDevTools, checkDebugger, monitorConsole])

  useEffect(() => {
    checkScreenshotTools()
  }, [checkScreenshotTools])

  const getSecurityStyles = () => applySecurityStyles(securityLevel, isTampered)

  return (
    <div 
      style={getSecurityStyles()}
      className="advanced-security-container"
    >
      {children}
      
      {isTampered && (
        <div className="fixed inset-0 bg-red-500 bg-opacity-90 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🚫</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Security Violation Detected
            </h2>
            <p className="text-gray-700 mb-4">
              Screenshot protection is active. Please close any developer tools or screenshot applications to continue.
            </p>
            <div className="text-sm text-gray-500">
              This content is protected by advanced security measures.
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
```

```typescript
// File: utils/securityUtils.ts

import { useEffect } from'react'

export const useSecurityUtils = (setIsTampered: (value: boolean) => void) => {
  const checkDevTools = () => {
    const threshold = 160
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
      setIsTampered(true)
      return true
    }
    return false
  }

  const checkDebugger = () => {
    const start = performance.now()
    debugger
    const end = performance.now()
    if (end - start > 100) {
      setIsTampered(true)
      return true
    }
    return false
  }

  const monitorConsole = (enable: boolean) => {
    const originalConsole = {...console }
    if (enable) {
      console.log = (...args) => {
        setIsTampered(true)
        return originalConsole.log(...args)
      }
    } else {
      console.log = originalConsole.log
    }
  }

  const checkScreenshotTools = () => {
    const suspiciousWindows = [
      'Snipping Tool',
      'Snagit',
      'Lightshot',
      'Greenshot',
      'ShareX',
      'PicPick'
    ]

    if (navigator.userAgent.includes('SnippingTool') || 
        navigator.userAgent.includes('Snagit')) {
      setIsTampered(true)
    }
  }

  const applySecurityStyles = (securityLevel: string, isTampered: boolean) => {
    switch (securityLevel) {
      case 'high':
        return {
          filter: isTampered ? 'blur(10px) brightness(0.3)' : 'none',
          pointerEvents: isTampered? 'none' : 'auto',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }
      case'medium':
        return {
          filter: isTampered ? 'blur(5px)' : 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }
      default:
        return {
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }
    }
  }

  return {
    checkDevTools,
    checkDebugger,
    monitorConsole,
    checkScreenshotTools,
    applySecurityStyles
  }
}
```