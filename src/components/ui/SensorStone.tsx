'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface SensorStoneProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showMeasurements?: boolean
  className?: string
}

export default function SensorStone({ 
  size = 'lg', 
  showMeasurements = true,
  className = '' 
}: SensorStoneProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
    xl: 'w-64 h-64',
  }

  const measurements = [
    { name: 'FeNO', color: 'bg-nitro-green', position: { top: '20%', left: '30%' } },
    { name: 'VOCs', color: 'bg-nitro-yellow', position: { top: '60%', left: '70%' } },
    { name: 'Inflammation', color: 'bg-nitro-red', position: { top: '80%', left: '20%' } },
  ]

  return (
    <div className={`${sizeClasses[size]} ${className} relative flex items-center justify-center`}>
      {/* Main Sensor Stone */}
      <motion.div
        className="relative w-full h-full"
        animate={!isReducedMotion ? {
          rotateY: [0, 360],
        } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Stone Body */}
        <div className="w-full h-full bg-gradient-to-br from-nitro-charcoal via-gray-700 to-nitro-charcoal rounded-full border-2 border-nitro-green/30 shadow-2xl shadow-nitro-green/20">
          {/* Surface Texture */}
          <div className="absolute inset-2 bg-gradient-to-tr from-transparent via-white/5 to-transparent rounded-full"></div>
          
          {/* Center Core */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-nitro-green rounded-full shadow-lg shadow-nitro-green/50"
            animate={!isReducedMotion ? {
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-1 bg-white rounded-full opacity-30"></div>
          </motion.div>

          {/* Sensor Arrays */}
          {[...Array(8)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-nitro-green/60 rounded-full"
              style={{
                top: `${50 + 30 * Math.cos(index * 45 * Math.PI / 180)}%`,
                left: `${50 + 30 * Math.sin(index * 45 * Math.PI / 180)}%`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={!isReducedMotion ? {
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              } : {}}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Data Collection Indicators */}
          {showMeasurements && measurements.map((measurement, index) => (
            <motion.div
              key={measurement.name}
              className={`absolute w-3 h-3 ${measurement.color} rounded-full shadow-lg`}
              style={measurement.position}
              animate={!isReducedMotion ? {
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.7,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Scanning Effect */}
        {!isReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-nitro-green/50"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        )}
      </motion.div>

      {/* Technical Specifications */}
      {size === 'xl' && (
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-center">
          <div className="bg-nitro-charcoal/80 px-4 py-2 rounded-lg border border-nitro-green/20">
            <div className="text-xs text-nitro-text-secondary space-y-1">
              <div>Diameter: 15mm • Weight: 2.3g</div>
              <div>Battery: 7 days • Range: 10m</div>
              <div className="text-nitro-green">Medical Grade • FDA Pending</div>
            </div>
          </div>
        </div>
      )}

      {/* Measurement Labels for Large Sizes */}
      {showMeasurements && (size === 'lg' || size === 'xl') && (
        <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 space-y-4">
          {measurements.map((measurement, index) => (
            <motion.div
              key={measurement.name}
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={`w-3 h-3 ${measurement.color} rounded-full`}></div>
              <span className="text-sm text-nitro-text-secondary">{measurement.name}</span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}