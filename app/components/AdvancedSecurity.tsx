'use client'

import { useEffect, useState } from 'react'

interface AdvancedSecurityProps {
  children: React.ReactNode
}

export default function AdvancedSecurity({ children }: AdvancedSecurityProps) {
  const [securityLevel, setSecurityLevel] = useState('high')
  const [isTampered, setIsTampered] = useState(false)

  // Detect if page is being inspected or tampered with
  useEffect(() => {
    // Check for common developer tools
    const checkDevTools = () => {
      const threshold = 160
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        setIsTampered(true)
        return true
      }
      return false
    }

    // Check for debugging tools
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

    // Monitor console usage
    const originalConsole = { ...console }
    console.log = (...args) => {
      setIsTampered(true)
      return originalConsole.log(...args)
    }

    // Check for iframe embedding (potential screenshot tools)
    if (window.self !== window.top) {
      setIsTampered(true)
    }

    const interval = setInterval(() => {
      checkDevTools()
      checkDebugger()
    }, 1000)

    return () => {
      clearInterval(interval)
      console.log = originalConsole.log
    }
  }, [])

  // Disable common screenshot methods
  useEffect(() => {
    // Disable print screen
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        e.preventDefault()
        alert('⚠️ Screenshot protection is active!')
        return false
      }
    }

    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    // Disable drag and drop
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // Disable text selection
    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    document.addEventListener('keydown', handleKeyDown, true)
    document.addEventListener('contextmenu', handleContextMenu, true)
    document.addEventListener('dragstart', handleDragStart, true)
    document.addEventListener('selectstart', handleSelectStart, true)

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true)
      document.removeEventListener('contextmenu', handleContextMenu, true)
      document.removeEventListener('dragstart', handleDragStart, true)
      document.removeEventListener('selectstart', handleSelectStart, true)
    }
  }, [])

  // Advanced screenshot detection
  useEffect(() => {
    // Monitor for screenshot tools
    const checkScreenshotTools = () => {
      // Check for common screenshot tool window names
      const suspiciousWindows = [
        'Snipping Tool',
        'Snagit',
        'Lightshot',
        'Greenshot',
        'ShareX',
        'PicPick'
      ]

      // This is a simplified check - in reality, detecting external tools is complex
      if (navigator.userAgent.includes('SnippingTool') || 
          navigator.userAgent.includes('Snagit')) {
        setIsTampered(true)
      }
    }

    const interval = setInterval(checkScreenshotTools, 2000)
    return () => clearInterval(interval)
  }, [])

  // Content protection based on security level
  const getSecurityStyles = () => {
    switch (securityLevel) {
      case 'high':
        return {
          filter: isTampered ? 'blur(10px) brightness(0.3)' : 'none',
          pointerEvents: isTampered ? 'none' : 'auto',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }
      case 'medium':
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
