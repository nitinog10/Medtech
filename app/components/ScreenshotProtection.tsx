```
'use client'

import { useEffect, useRef, useState } from'react'
import { detectDevTools, handleKeyDown, handleContextMenu, handleVisibilityChange, handleBeforePrint } from '../utils/protectionUtils'

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

  useEffect(() => {
    if (enableDevToolsDetection) {
      detectDevTools(setDevToolsOpen, containerRef)
    }
  }, [enableDevToolsDetection])

  useEffect(() => {
    if (enableKeyboardProtection) {
      handleKeyDown()
    }
  }, [enableKeyboardProtection])

  useEffect(() => {
    if (enableContextMenuProtection) {
      handleContextMenu()
    }
  }, [enableContextMenuProtection])

  useEffect(() => {
    handleVisibilityChange()
  }, [])

  useEffect(() => {
    handleBeforePrint()
  }, [])

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
        position:'relative',
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
```