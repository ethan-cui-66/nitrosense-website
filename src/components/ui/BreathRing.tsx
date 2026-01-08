'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface BreathRingProps {
  size?: 'sm' | 'md' | 'lg'
  intensity?: 'low' | 'medium' | 'high'
  color?: 'green' | 'blue' | 'teal'
  className?: string
}

export default function BreathRing({ 
  size = 'lg', 
  intensity = 'medium',
  color = 'green',
  className = '' 
}: BreathRingProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  }

  const colorClasses = {
    green: 'border-nitro-green',
    blue: 'border-blue-400',
    teal: 'border-teal-400',
  }

  const intensitySettings = {
    low: { duration: 6, scale: [1, 1.02, 1], opacity: [0.6, 0.8, 0.6] },
    medium: { duration: 4, scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] },
    high: { duration: 3, scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] },
  }

  const settings = intensitySettings[intensity]

  // Static version for reduced motion
  if (isReducedMotion) {
    return (
      <div className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}>
        <div className={`w-full h-full rounded-full border-2 ${colorClasses[color]} opacity-80`}>
          <div className="absolute inset-4 rounded-full border border-current opacity-60"></div>
          <div className="absolute inset-8 rounded-full border border-current opacity-40"></div>
          <div className="absolute inset-12 rounded-full border border-current opacity-20"></div>
        </div>
        
        {/* Center sensor stone */}
        <div className="absolute w-6 h-6 bg-nitro-green rounded-full shadow-lg shadow-nitro-green/50"></div>
      </div>
    )
  }

  return (
    <div className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}>
      {/* Outer breathing rings */}
      {[0, 1, 2, 3].map((index) => (
        <motion.div
          key={index}
          className={`absolute rounded-full border ${colorClasses[color]}`}
          style={{
            width: `${100 - index * 12}%`,
            height: `${100 - index * 12}%`,
            borderWidth: index === 0 ? '2px' : '1px',
          }}
          animate={{
            scale: settings.scale,
            opacity: settings.opacity.map(o => o * (1 - index * 0.2)),
          }}
          transition={{
            duration: settings.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
        />
      ))}

      {/* Data flow particles */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-nitro-green rounded-full"
          style={{
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, Math.cos(index * 60 * Math.PI / 180) * 80, 0],
            y: [0, Math.sin(index * 60 * Math.PI / 180) * 80, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          }}
        />
      ))}

      {/* Center sensor stone with pulse */}
      <motion.div
        className="absolute w-6 h-6 bg-nitro-green rounded-full shadow-lg shadow-nitro-green/50"
        animate={{
          scale: [1, 1.1, 1],
          boxShadow: [
            '0 0 20px rgba(0, 212, 170, 0.5)',
            '0 0 30px rgba(0, 212, 170, 0.8)',
            '0 0 20px rgba(0, 212, 170, 0.5)',
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-1 bg-white rounded-full opacity-30"></div>
      </motion.div>

      {/* Measurement indicators */}
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-4 text-xs text-nitro-text-secondary">
          <motion.div
            className="flex items-center space-x-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            <div className="w-2 h-2 bg-nitro-green rounded-full"></div>
            <span>FeNO</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
          >
            <div className="w-2 h-2 bg-nitro-yellow rounded-full"></div>
            <span>VOCs</span>
          </motion.div>
          <motion.div
            className="flex items-center space-x-1"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
          >
            <div className="w-2 h-2 bg-nitro-red rounded-full"></div>
            <span>Inflammation</span>
          </motion.div>
        </div>
      </div>
    </div>
  )
}