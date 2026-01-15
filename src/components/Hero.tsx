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

          {/* Main Message - Clean and Minimal */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-16"
          >
            <Typography variant="hero" className="leading-tight">
              AirlyWarning
            </Typography>
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