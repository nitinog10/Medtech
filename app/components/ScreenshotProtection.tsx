'use client'

import { useEffect, useRef, useState } from 'react'

interface ScreenshotProtectionProps {
  children: React.ReactNode
  enableWatermark?: boolean
  enableDevToolsDetection?: boolean
  enableKeyboardProtection?: boolean
  enableContextMenuProtection?: boolean
}
export default function ScreenshotProtection({
  children,
  enableWatermark = true,
  enableDevToolsDetection = true,
  enableKeyboardProtection = true,
  enableContextMenuProtection = true
}: ScreenshotProtectionProps) {
  const [isProtected, setIsProtected] = useState(true)
  const [devToolsOpen, setDevToolsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Enhanced DevTools detection
  useEffect(() => {
    if (!enableDevToolsDetection) return

    let devtools = { open: false, orientation: null }
    const threshold = 160
    let detectionCount = 0

    const detectDevTools = () => {
      // Multiple detection methods
      const heightDiff = window.outerHeight - window.innerHeight
      const widthDiff = window.outerWidth - window.innerWidth
      const isDevToolsOpen = heightDiff > threshold || widthDiff > threshold
      
      // Additional detection methods
      const isConsoleOpen = window.outerHeight - window.innerHeight > 200
      const isElementsOpen = window.outerWidth - window.innerWidth > 200
      
      if (isDevToolsOpen || isConsoleOpen || isElementsOpen) {
        detectionCount++
        if (detectionCount >= 2) { // Require multiple detections
          if (!devtools.open) {
            devtools.open = true
            setDevToolsOpen(true)
            console.clear()
            console.log('%c🚫 SCREENSHOT PROTECTION ACTIVE', 'color: red; font-size: 24px; font-weight: bold;')
            console.log('%c⚠️ Developer Tools Detected!', 'color: red; font-size: 20px; font-weight: bold;')
            console.log('%cScreenshot protection is active. Please close developer tools to continue.', 'color: red; font-size: 14px;')
            
            // Aggressive content protection
            if (containerRef.current) {
              containerRef.current.style.filter = 'blur(10px) brightness(0.3)'
              containerRef.current.style.pointerEvents = 'none'
              containerRef.current.style.userSelect = 'none'
            }
            
            // Hide content completely after 3 seconds
            setTimeout(() => {
              if (containerRef.current) {
                containerRef.current.style.display = 'none'
              }
            }, 3000)
          }
        }
      } else {
        if (devtools.open) {
          devtools.open = false
          setDevToolsOpen(false)
          detectionCount = 0
          if (containerRef.current) {
            containerRef.current.style.filter = 'none'
            containerRef.current.style.pointerEvents = 'auto'
            containerRef.current.style.display = 'block'
          }
        }
      }
    }

    // More frequent detection
    const interval = setInterval(detectDevTools, 100)
    return () => clearInterval(interval)
  }, [enableDevToolsDetection])

  // Keyboard shortcut protection
  useEffect(() => {
    if (!enableKeyboardProtection) return

    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S, Ctrl+A, Ctrl+C, Ctrl+V
      if (
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J')) ||
        (e.ctrlKey && e.key === 'u') ||
        (e.ctrlKey && e.key === 's') ||
        (e.ctrlKey && e.key === 'a') ||
        (e.ctrlKey && e.key === 'c') ||
        (e.ctrlKey && e.key === 'v') ||
        (e.ctrlKey && e.key === 'p') ||
        (e.ctrlKey && e.key === 'PrintScreen')
      ) {
        e.preventDefault()
        e.stopPropagation()
        
        // Show warning
        alert('⚠️ Screenshot protection is active. This action is not allowed.')
        return false
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)
    return () => document.removeEventListener('keydown', handleKeyDown, true)
  }, [enableKeyboardProtection])

  // Context menu protection
  useEffect(() => {
    if (!enableContextMenuProtection) return

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    const handleSelectStart = (e: Event) => {
      e.preventDefault()
      return false
    }

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    document.addEventListener('contextmenu', handleContextMenu, true)
    document.addEventListener('selectstart', handleSelectStart, true)
    document.addEventListener('dragstart', handleDragStart, true)

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu, true)
      document.removeEventListener('selectstart', handleSelectStart, true)
      document.removeEventListener('dragstart', handleDragStart, true)
    }
  }, [enableContextMenuProtection])

  // Screenshot detection using visibility API
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, might be taking screenshot
        console.log('Page visibility changed - potential screenshot detected')
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  // Disable print
  useEffect(() => {
    const handleBeforePrint = (e: Event) => {
      e.preventDefault()
      alert('⚠️ Printing is disabled for security reasons.')
      return false
    }

    window.addEventListener('beforeprint', handleBeforePrint)
    return () => window.removeEventListener('beforeprint', handleBeforePrint)
  }, [])

  // Watermark component
  const WatermarkOverlay = () => {
    if (!enableWatermark) return null

    return (
      <div className="watermark-overlay">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="watermark-text"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`
            }}
          >
            CONFIDENTIAL - DO NOT SCREENSHOT
          </div>
        ))}
      </div>
    )
  }

  return (
    <div 
      ref={containerRef}
      className="screenshot-protected protected-content no-capture no-context-menu"
      style={{
        position: 'relative',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none'
      }}
    >
      {children}
      {enableWatermark && <WatermarkOverlay />}
      
      {devToolsOpen && (
        <div className="fixed inset-0 bg-red-500 bg-opacity-20 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">⚠️ Developer Tools Detected</h2>
            <p className="text-gray-700 mb-4">
              Please close the developer tools to continue viewing the content.
            </p>
            <p className="text-sm text-gray-500">
              Screenshot protection is active for security reasons.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
