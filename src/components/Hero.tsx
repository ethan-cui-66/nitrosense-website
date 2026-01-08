'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container, Section } from '@/components/ui/Layout'
import { Typography } from '@/components/ui/Typography'
import BreathRing from '@/components/ui/BreathRing'

export default function Hero() {
  return (
    <Section id="hero" padding="xl" className="min-h-screen flex items-center">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          {/* Breath Ring Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-12 flex justify-center"
          >
            <BreathRing />
          </motion.div>

          {/* Main Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8"
          >
            <Typography variant="hero" className="mb-6 leading-tight">
              NitroSense prevents asthma attacks before they happen through continuous, predictive respiratory monitoring.
            </Typography>
          </motion.div>

          {/* Core Mission Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <Typography variant="h2" color="secondary" className="max-w-3xl mx-auto">
              Revolutionary wearable technology that transforms reactive asthma care into proactive health management, 
              giving patients and caregivers the power to prevent attacks rather than just respond to them.
            </Typography>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mb-16"
          >
            <div className="inline-flex items-center px-8 py-4 bg-nitro-charcoal rounded-lg border border-nitro-green/20">
              <div className="w-2 h-2 bg-nitro-green rounded-full mr-3 animate-pulse"></div>
              <Typography variant="h4" className="text-nitro-green font-medium">
                Redefining proactive respiratory care
              </Typography>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col items-center"
          >
            <Typography variant="small" color="secondary" className="mb-4">
              Discover the innovation
            </Typography>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 border-2 border-nitro-green/30 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-nitro-green rounded-full mt-2"></div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}