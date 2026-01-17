'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Typography } from '@/components/ui/Typography'
import SensorStone from '@/components/ui/SensorStone'

interface Mount {
  id: 'patch' | 'breathalyzer'
  name: string
  description: string
  benefits: string[]
  idealFor: string
  image: string
}

const mounts: Mount[] = [
  {
    id: 'patch',
    name: 'Chest Patch',
    description: 'Medical-grade adhesive patch that provides direct contact with your chest for continuous respiratory monitoring.',
    benefits: [
      'Maximum sensor sensitivity',
      'Medical-grade adhesive',
      'Completely invisible under clothing',
      'Hypoallergenic materials'
    ],
    idealFor: 'Continuous monitoring, sleep studies, high-risk periods',
   
    image: '/images/patch-mount.svg'
  },
  {
    id: 'breathalyzer',
    name: 'Breathalyzer',
    description: 'Portable handheld device for on-demand breath analysis. Perfect for spot-checks and periodic monitoring.',
    benefits: [
      'Instant breath analysis',
      'Portable and convenient',
      'No wearable required',
      'Medical-grade accuracy'
    ],
    idealFor: 'Spot-checks, travel, periodic monitoring',
    
    image: '/images/breathalyzer-mount.svg'
  }
]

export default function WearableMounts() {
  const [selectedMount, setSelectedMount] = useState<Mount['id']>('patch')
  const activeMount = mounts.find(mount => mount.id === selectedMount)!

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Typography variant="h2" className="mb-4">
          Two Monitoring Options
        </Typography>
        <Typography variant="body" color="secondary" className="max-w-2xl mx-auto">
          Choose between continuous monitoring with the chest patch or on-demand analysis with the breathalyzer. 
          Both use the same advanced sensor technology.
        </Typography>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Mount Selector */}
        <div>
          <div className="space-y-4 mb-8">
            {mounts.map((mount) => (
              <motion.button
                key={mount.id}
                onClick={() => setSelectedMount(mount.id)}
                className={`
                  w-full text-left p-6 rounded-xl border transition-all duration-300
                  ${selectedMount === mount.id 
                    ? 'bg-nitro-green/10 border-nitro-green text-nitro-text' 
                    : 'bg-nitro-charcoal/30 border-nitro-green/20 text-nitro-text-secondary hover:border-nitro-green/40'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <Typography variant="h4" className={selectedMount === mount.id ? 'text-nitro-green' : ''}>
                      {mount.name}
                    </Typography>
                    <Typography variant="small" color="secondary" className="mt-1">
                      {mount.description}
                    </Typography>
                  </div>
                  <div className={`
                    w-4 h-4 rounded-full border-2 transition-colors
                    ${selectedMount === mount.id 
                      ? 'bg-nitro-green border-nitro-green' 
                      : 'border-nitro-green/40'
                    }
                  `}>
                    {selectedMount === mount.id && (
                      <motion.div
                        className="w-2 h-2 bg-nitro-black rounded-full m-0.5"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Mount Visualization */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMount}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              {/* Mount Illustration */}
              <div className="relative mb-8">
                <MountIllustration mount={activeMount} />
              </div>

              {/* Mount Details */}
              <div className="bg-nitro-charcoal/50 p-8 rounded-xl border border-nitro-green/20">
                <Typography variant="h3" className="mb-4 text-nitro-green">
                  {activeMount.name}
                </Typography>
                
                <Typography variant="body" color="secondary" className="mb-6">
                  {activeMount.description}
                </Typography>

                {/* Benefits */}
                <div className="mb-6">
                  <Typography variant="h4" className="mb-3">
                    Key Benefits
                  </Typography>
                  <ul className="space-y-2">
                    {activeMount.benefits.map((benefit, index) => (
                      <motion.li
                        key={benefit}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center space-x-2 text-nitro-text-secondary"
                      >
                        <div className="w-2 h-2 bg-nitro-green rounded-full"></div>
                        <span>{benefit}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Ideal For */}
                <div className="p-4 bg-nitro-green/5 rounded-lg border border-nitro-green/20">
                  <Typography variant="small" className="text-nitro-green font-medium mb-1">
                    Ideal For:
                  </Typography>
                  <Typography variant="small" color="secondary">
                    {activeMount.idealFor}
                  </Typography>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Modular Design Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mt-16 text-center"
      >
        <div className="bg-gradient-to-r from-nitro-green/5 to-nitro-green/10 p-8 rounded-2xl border border-nitro-green/20">
          <Typography variant="h3" className="mb-4 text-nitro-green">
            Flexible Monitoring Approach
          </Typography>
          <Typography variant="body" className="max-w-3xl mx-auto leading-relaxed">
            Use the chest patch for continuous 24/7 monitoring during high-risk periods, or switch to the breathalyzer 
            for convenient spot-checks throughout your day. Both devices sync to the same app and maintain your complete 
            health data history.
          </Typography>
        </div>
      </motion.div>
    </div>
  )
}

// Mount Illustration Component
function MountIllustration({ mount }: { mount: Mount }) {
  return (
    <div className="relative w-80 h-80 mx-auto">
      {mount.id === 'patch' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Chest Patch */}
          <div className="relative">
            <div className="w-40 h-40 bg-nitro-charcoal/30 rounded-2xl border-2 border-nitro-green/40 border-dashed">
              <div className="absolute inset-4 bg-nitro-green/10 rounded-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <SensorStone size="md" showMeasurements={false} />
              </div>
            </div>
            {/* Adhesive Indicators */}
            <div className="absolute -top-1 -left-1 w-4 h-4 bg-nitro-yellow/60 rounded-full"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-nitro-yellow/60 rounded-full"></div>
            <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-nitro-yellow/60 rounded-full"></div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-nitro-yellow/60 rounded-full"></div>
          </div>
        </div>
      )}

      {mount.id === 'breathalyzer' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Breathalyzer Device */}
          <div className="relative">
            {/* Device Body */}
            <div className="w-32 h-48 bg-nitro-charcoal border-2 border-nitro-green/60 rounded-2xl relative">
              {/* Screen */}
              <div className="absolute top-4 left-4 right-4 h-20 bg-nitro-black rounded-lg border border-nitro-green/40 flex items-center justify-center">
                <SensorStone size="sm" showMeasurements={false} />
              </div>
              {/* Mouthpiece */}
              <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-12 h-8 bg-nitro-charcoal border-2 border-nitro-green/60 rounded-r-full"></div>
              {/* Button */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-nitro-green/20 border-2 border-nitro-green rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-nitro-green rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}