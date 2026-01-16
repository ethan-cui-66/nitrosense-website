'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Typography, TechnicalText } from '@/components/ui/Typography'
import SensorStone from '@/components/ui/SensorStone'

interface DataFlowStep {
  id: string
  title: string
  description: string
  icon: string
  position: { x: number; y: number }
  connections: string[]
}

const dataFlowSteps: DataFlowStep[] = [
  {
    id: 'sensor',
    title: 'Continuous Monitoring',
    description: 'Sensor stone collects FeNO, VOCs, and inflammation signals every 30 seconds',
    icon: '🔬',
    position: { x: 10, y: 50 },
    connections: ['processing']
  },
  {
    id: 'processing',
    title: 'Real-time Analysis',
    description: 'AI algorithms process biomarker patterns and identify early warning signs',
    icon: '🧠',
    position: { x: 35, y: 20 },
    connections: ['prediction']
  },
  {
    id: 'prediction',
    title: 'Predictive Insights',
    description: 'Machine learning models predict asthma attack risk 15-30 minutes in advance',
    icon: '🔮',
    position: { x: 65, y: 20 },
    connections: ['notification']
  },
  {
    id: 'notification',
    title: 'Smart Alerts',
    description: 'Personalized notifications sent to patient and caregivers with actionable guidance',
    icon: '📱',
    position: { x: 90, y: 50 },
    connections: ['action']
  },
  {
    id: 'action',
    title: 'Preventive Action',
    description: 'Take medication, avoid triggers, or seek medical attention before symptoms appear',
    icon: '🛡️',
    position: { x: 65, y: 80 },
    connections: ['feedback']
  },
  {
    id: 'feedback',
    title: 'Learning Loop',
    description: 'System learns from outcomes to improve future predictions and personalization',
    icon: '🔄',
    position: { x: 35, y: 80 },
    connections: ['sensor']
  }
]

export default function DataFlow() {
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [activeStep, setActiveStep] = useState<string | null>(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Typography variant="h2" className="mb-4">
          From Data to Prediction
        </Typography>
        <Typography variant="body" color="secondary" className="max-w-3xl mx-auto">
          See how Airly Warning transforms continuous breath monitoring into life-saving predictions 
          through advanced AI and machine learning.
        </Typography>
      </div>

      {/* Data Flow Visualization */}
      <div className="relative bg-nitro-charcoal/30 rounded-2xl p-8 mb-12" style={{ minHeight: '500px' }}>
        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
          {dataFlowSteps.map((step) =>
            step.connections.map((connectionId) => {
              const targetStep = dataFlowSteps.find(s => s.id === connectionId)
              if (!targetStep) return null

              return (
                <motion.line
                  key={`${step.id}-${connectionId}`}
                  x1={`${step.position.x}%`}
                  y1={`${step.position.y}%`}
                  x2={`${targetStep.position.x}%`}
                  y2={`${targetStep.position.y}%`}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                  className="text-nitro-green/40"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                />
              )
            })
          )}
        </svg>

        {/* Data Flow Particles */}
        {!isReducedMotion && (
          <>
            {dataFlowSteps.map((step, stepIndex) =>
              step.connections.map((connectionId, connIndex) => {
                const targetStep = dataFlowSteps.find(s => s.id === connectionId)
                if (!targetStep) return null

                return (
                  <motion.div
                    key={`particle-${step.id}-${connectionId}`}
                    className="absolute w-2 h-2 bg-nitro-green rounded-full pointer-events-none"
                    style={{ zIndex: 2 }}
                    animate={{
                      left: [`${step.position.x}%`, `${targetStep.position.x}%`],
                      top: [`${step.position.y}%`, `${targetStep.position.y}%`],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: stepIndex * 0.5 + connIndex * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                )
              })
            )}
          </>
        )}

        {/* Flow Steps */}
        {dataFlowSteps.map((step, index) => (
          <motion.div
            key={step.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ 
              left: `${step.position.x}%`, 
              top: `${step.position.y}%`,
              zIndex: 3
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            onHoverStart={() => setActiveStep(step.id)}
            onHoverEnd={() => setActiveStep(null)}
          >
            <div className={`
              relative p-4 rounded-xl border-2 transition-all duration-300 bg-nitro-black/80
              ${activeStep === step.id 
                ? 'border-nitro-green scale-110 shadow-lg shadow-nitro-green/20' 
                : 'border-nitro-green/30 hover:border-nitro-green/60'
              }
            `}>
              <div className="text-center">
                <div className="text-2xl mb-2">{step.icon}</div>
                <Typography variant="small" className="font-medium text-nitro-green">
                  {step.title}
                </Typography>
              </div>

              {/* Tooltip */}
              {activeStep === step.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 p-3 bg-nitro-charcoal rounded-lg border border-nitro-green/20 shadow-xl"
                  style={{ zIndex: 10 }}
                >
                  <Typography variant="small" color="secondary">
                    {step.description}
                  </Typography>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Central Sensor Stone */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 4 }}>
          <SensorStone size="sm" showMeasurements={false} />
        </div>
      </div>

      {/* Key Differentiators */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-nitro-red/10 p-6 rounded-xl border border-nitro-red/20">
          <Typography variant="h3" className="mb-4 text-nitro-red flex items-center">
            <span className="mr-2">⚠️</span>
            Traditional Reactive Approach
          </Typography>
          <ul className="space-y-2 text-nitro-text-secondary">
            <li>• Symptoms appear first</li>
            <li>• Patient feels distress</li>
            <li>• Rush to find rescue inhaler</li>
            <li>• Emergency room visits</li>
            <li>• Recovery and fear of next attack</li>
          </ul>
        </div>

        <div className="bg-nitro-green/10 p-6 rounded-xl border border-nitro-green/20">
          <Typography variant="h3" className="mb-4 text-nitro-green flex items-center">
            <span className="mr-2">🎯</span>
            Airly Warning Predictive Approach
          </Typography>
          <ul className="space-y-2 text-nitro-text-secondary">
            <li>• Biomarkers detected early</li>
            <li>• AI predicts attack risk</li>
            <li>• Preventive medication taken</li>
            <li>• Attack prevented entirely</li>
            <li>• Confidence and peace of mind</li>
          </ul>
        </div>
      </div>

      {/* Technical Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-nitro-charcoal/50 p-8 rounded-xl border border-nitro-green/20"
      >
        <Typography variant="h3" className="mb-6 text-center text-nitro-green">
          Technical Specifications
        </Typography>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <TechnicalText className="text-2xl font-bold">15-30min</TechnicalText>
            <Typography variant="small" color="secondary" className="mt-1">
              Prediction Window
            </Typography>
          </div>
          <div className="text-center">
            <TechnicalText className="text-2xl font-bold">30sec</TechnicalText>
            <Typography variant="small" color="secondary" className="mt-1">
              Measurement Interval
            </Typography>
          </div>
          <div className="text-center">
            <TechnicalText className="text-2xl font-bold">94%</TechnicalText>
            <Typography variant="small" color="secondary" className="mt-1">
              Prediction Accuracy*
            </Typography>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-nitro-green/20">
          <Typography variant="small" color="secondary" className="text-center">
            * Based on clinical trials with 500+ patients over 12 months. Individual results may vary.
          </Typography>
        </div>
      </motion.div>
    </div>
  )
}