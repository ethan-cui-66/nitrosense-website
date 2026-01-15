'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container, Section, Grid } from '@/components/ui/Layout'
import { Typography, TechnicalText } from '@/components/ui/Typography'
import SensorStone from '@/components/ui/SensorStone'
import WearableMounts from '@/components/ui/WearableMounts'
import DataFlow from '@/components/ui/DataFlow'

export default function Model() {
  const [activeView, setActiveView] = useState<'sensor' | 'mounts' | 'ecosystem'>('sensor')

  const views = [
    { id: 'sensor', label: 'Sensor Technology'},
    { id: 'mounts', label: 'Wearable Options'},
    { id: 'ecosystem', label: 'App Ecosystem'},
  ]

  return (
    <Section id="model" background="primary" padding="xl">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Typography variant="h1" className="mb-6">
              The Innovation Explained
            </Typography>
            <Typography variant="h3" color="secondary" className="max-w-3xl mx-auto mb-8">
              A complete system that transforms breath analysis into predictive insights, 
              making respiratory monitoring as simple as wearing a watch.
            </Typography>
            
            {/* View Selector */}
            <div className="flex justify-center space-x-4 mb-12">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id as any)}
                  className={`
                    px-6 py-3 rounded-lg border transition-all duration-300
                    ${activeView === view.id 
                      ? 'bg-nitro-green text-nitro-black border-nitro-green' 
                      : 'bg-nitro-charcoal text-nitro-text border-nitro-green/20 hover:border-nitro-green/40'
                    }
                  `}
                >
                  {view.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Dynamic Content Based on Active View */}
          <AnimatePresence mode="wait">
            {activeView === 'sensor' && (
              <motion.div
                key="sensor"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <SensorStoneVisualization />
              </motion.div>
            )}
            
            {activeView === 'mounts' && (
              <motion.div
                key="mounts"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <WearableMounts />
              </motion.div>
            )}
            
            {activeView === 'ecosystem' && (
              <motion.div
                key="ecosystem"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <DataFlow />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Key Differentiators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <Typography variant="h2" className="mb-4">
                Why This Changes Everything
              </Typography>
              <Typography variant="body" color="secondary" className="max-w-2xl mx-auto">
                Traditional asthma management is reactive. NitroSense is predictive.
              </Typography>
            </div>

            <Grid cols={2} gap="lg" className="max-w-4xl mx-auto">
              <div className="bg-nitro-red/10 p-8 rounded-xl border border-nitro-red/20">
                <Typography variant="h3" className="mb-4 text-nitro-red">
                  Traditional Approach
                </Typography>
                <ul className="space-y-3 text-nitro-text-secondary">
                  <li>• Wait for symptoms to appear</li>
                  <li>• React with rescue medications</li>
                  <li>• Emergency room visits</li>
                  <li>• Fear and uncertainty</li>
                  <li>• Disrupted daily activities</li>
                </ul>
              </div>

              <div className="bg-nitro-green/10 p-8 rounded-xl border border-nitro-green/20">
                <Typography variant="h3" className="mb-4 text-nitro-green">
                  NitroSense Approach
                </Typography>
                <ul className="space-y-3 text-nitro-text-secondary">
                  <li>• Continuous biomarker monitoring</li>
                  <li>• Predict attacks before symptoms</li>
                  <li>• Preventive action and medication</li>
                  <li>• Confidence and peace of mind</li>
                  <li>• Uninterrupted life activities</li>
                </ul>
              </div>
            </Grid>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}

// Sensor Stone Visualization Component
function SensorStoneVisualization() {
  const measurements = [
    {
      name: 'FeNO',
      fullName: 'Fractional Exhaled Nitric Oxide',
      description: 'Measures airway inflammation levels in real-time',
      color: 'text-nitro-green',
      
    },
    {
      name: 'VOCs',
      fullName: 'Volatile Organic Compounds',
      description: 'Detects chemical signatures of respiratory stress',
      color: 'text-nitro-yellow',
      
    },
    {
      name: 'Inflammation Signals',
      fullName: 'Inflammatory Biomarkers',
      description: 'Identifies early warning signs of asthma triggers',
      color: 'text-nitro-red',
      
    },
  ]

  return (
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      {/* Sensor Stone Visual */}
      <div className="flex justify-center">
        <SensorStone size="xl" />
      </div>

      {/* Measurements Explanation */}
      <div>
        <Typography variant="h2" className="mb-6">
          Advanced Sensor Technology
        </Typography>
        <Typography variant="body" color="secondary" className="mb-8 leading-relaxed">
          The NitroSense sensor stone continuously analyzes your breath for three critical biomarkers 
          that indicate respiratory health changes before symptoms appear.
        </Typography>

        <div className="space-y-6">
          {measurements.map((measurement, index) => (
            <motion.div
              key={measurement.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-nitro-charcoal/50 p-6 rounded-lg border border-nitro-green/10"
            >
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <TechnicalText className={measurement.color}>
                    {measurement.name}
                  </TechnicalText>
                  <Typography variant="small" color="secondary">
                    ({measurement.fullName})
                  </Typography>
                </div>
                <Typography variant="body" color="secondary">
                  {measurement.description}
                </Typography>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-nitro-green/5 rounded-lg border border-nitro-green/20">
          <Typography variant="body" className="text-nitro-green font-medium">
            The key insight: These biomarkers change 15-30 minutes before traditional symptoms appear, 
            giving you precious time to take preventive action.
          </Typography>
        </div>
      </div>
    </div>
  )
}