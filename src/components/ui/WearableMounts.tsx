'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Typography } from '@/components/ui/Typography'
import SensorStone from '@/components/ui/SensorStone'

interface Mount {
  id: 'necklace' | 'wristband' | 'patch'
  name: string
  description: string
  benefits: string[]
  idealFor: string
  image: string
}

const mounts: Mount[] = [
  {
    id: 'necklace',
    name: 'Necklace Mount',
    description: 'Elegant pendant design that positions the sensor stone close to your breathing zone for optimal data collection.',
    benefits: [
      'Closest to respiratory system',
      'Fashionable and discreet',
      'No interference with daily activities',
      'Adjustable chain length'
    ],
    idealFor: 'Daily wear, professional settings, social occasions',
    
    image: '/images/necklace-mount.svg'
  },
  {
    id: 'wristband',
    name: 'Wristband Mount',
    description: 'Comfortable silicone band that integrates the sensor stone into a familiar smartwatch-style form factor.',
    benefits: [
      'Familiar smartwatch design',
      'Secure and comfortable fit',
      'Water-resistant construction',
      'Easy to check status'
    ],
    idealFor: 'Active lifestyles, sports, fitness activities',
   
    image: '/images/wristband-mount.svg'
  },
  {
    id: 'patch',
    name: 'Skin Patch',
    description: 'Medical-grade adhesive patch that provides the most direct contact with your body for maximum sensitivity.',
    benefits: [
      'Maximum sensor sensitivity',
      'Medical-grade adhesive',
      'Completely invisible under clothing',
      'Hypoallergenic materials'
    ],
    idealFor: 'Clinical monitoring, sleep studies, high-risk periods',
   
    image: '/images/patch-mount.svg'
  }
]

export default function WearableMounts() {
  const [selectedMount, setSelectedMount] = useState<Mount['id']>('necklace')
  const activeMount = mounts.find(mount => mount.id === selectedMount)!

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Typography variant="h2" className="mb-4">
          Flexible Wearable Options
        </Typography>
        <Typography variant="body" color="secondary" className="max-w-2xl mx-auto">
          Choose the mounting option that best fits your lifestyle. The same advanced sensor technology 
          works seamlessly across all form factors.
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
            Modular Design Advantage
          </Typography>
          <Typography variant="body" className="max-w-3xl mx-auto leading-relaxed">
            The same sensor stone works across all mounting options. Start with one style and easily switch 
            to another based on your activities, preferences, or medical needs. No need to buy separate devices 
            or lose your health data history.
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
      {mount.id === 'necklace' && (
        <div className="relative w-full h-full">
          {/* Necklace Chain */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
            <path
              d="M160 50 Q120 80 100 120 Q90 140 90 160 Q90 180 100 200 Q120 240 160 270 Q200 240 220 200 Q230 180 230 160 Q230 140 220 120 Q200 80 160 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-nitro-green/60"
            />
          </svg>
          {/* Pendant with Sensor */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <SensorStone size="md" showMeasurements={false} />
          </div>
        </div>
      )}

      {mount.id === 'wristband' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Wristband */}
          <div className="relative">
            <div className="w-48 h-32 border-4 border-nitro-green/60 rounded-full"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <SensorStone size="sm" showMeasurements={false} />
            </div>
            {/* Band Details */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-nitro-charcoal rounded"></div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-nitro-charcoal rounded"></div>
          </div>
        </div>
      )}

      {mount.id === 'patch' && (
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Skin Patch */}
          <div className="relative">
            <div className="w-32 h-32 bg-nitro-charcoal/30 rounded-2xl border-2 border-nitro-green/40 border-dashed">
              <div className="absolute inset-4 bg-nitro-green/10 rounded-xl"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <SensorStone size="sm" showMeasurements={false} />
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
    </div>
  )
}