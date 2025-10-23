'use client'

import { useEffect, useState, useRef } from 'react'

interface ContentObfuscatorProps {
  children: React.ReactNode
  enableDynamicObfuscation?: boolean
  obfuscationInterval?: number
}

export default function ContentObfuscator({
  children,
  enableDynamicObfuscation = true,
  obfuscationInterval = 3000
}: ContentObfuscatorProps) {
  const [isObfuscated, setIsObfuscated] = useState(false)
  const [obfuscationKey, setObfuscationKey] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  // Enhanced dynamic content obfuscation
  useEffect(() => {
    if (!enableDynamicObfuscation) return

    const obfuscateContent = () => {
      setIsObfuscated(true)
      setObfuscationKey(prev => prev + 1)
      
      // Random obfuscation duration
      const randomDuration = Math.random() * 400 + 100 // 100-500ms
      setTimeout(() => {
        setIsObfuscated(false)
      }, randomDuration)
    }

    // More frequent obfuscation
    const interval = setInterval(obfuscateContent, obfuscationInterval / 2)
    
    // Random additional obfuscation
    const randomInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance
        obfuscateContent()
      }
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(randomInterval)
    }
  }, [enableDynamicObfuscation, obfuscationInterval])

  // Mouse movement detection for additional protection
  useEffect(() => {
    let mouseTimer: NodeJS.Timeout

    const handleMouseMove = () => {
      if (enableDynamicObfuscation) {
        clearTimeout(mouseTimer)
        mouseTimer = setTimeout(() => {
          setIsObfuscated(true)
          setTimeout(() => setIsObfuscated(false), 100)
        }, 1000)
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(mouseTimer)
    }
  }, [enableDynamicObfuscation])

  return (
    <div
      ref={containerRef}
      className={`ebook-content ${isObfuscated ? 'content-blur' : ''}`}
      style={{
        filter: isObfuscated ? 'blur(2px) brightness(0.8)' : 'none',
        transition: 'filter 0.2s ease-in-out',
        position: 'relative'
      }}
      key={obfuscationKey}
    >
      {children}
    </div>
  )
}
