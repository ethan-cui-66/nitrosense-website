'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container, Section, Grid } from '@/components/ui/Layout'
import { Typography, TechnicalText } from '@/components/ui/Typography'
import { colors } from '@/styles/design-tokens'

const colorMeanings = [
  {
    name: 'Medical Green',
    hex: colors.green,
    meaning: 'Health, Growth, Prevention',
    usage: 'Primary brand color',
    medicalSignificance: 'Healing and safety'
  },
  {
    name: 'Charcoal Black',
    hex: colors.black,
    meaning: 'Precision, Technology',
    usage: 'Primary background',
    medicalSignificance: 'Professional and trustworthy'
  },
  {
    name: 'Caution Yellow',
    hex: colors.yellow,
    meaning: 'Warning, Attention',
    usage: 'Alert states',
    medicalSignificance: 'Immediate attention'
  },
  {
    name: 'Critical Red',
    hex: colors.red,
    meaning: 'Urgency, Critical',
    usage: 'High-priority alerts',
    medicalSignificance: 'Emergency action required'
  }
]

const brandVoiceAttributes = [
  {
    attribute: 'Calm',
    description: 'Reassuring confidence of a trusted medical professional',
    example: '"Your breathing patterns show normal variation today."',
    avoid: 'Panic-inducing language'
  },
  {
    attribute: 'Medical',
    description: 'Precise, clinical terminology while remaining accessible',
    example: '"FeNO levels indicate reduced airway inflammation."',
    avoid: 'Overly casual language'
  },
  {
    attribute: 'Reassuring',
    description: 'Comfort and confidence in uncertain health situations',
    example: '"We\'re monitoring your respiratory health around the clock."',
    avoid: 'Dismissive language'
  },
  {
    attribute: 'Precise',
    description: 'Scientific accuracy and measurable specificity',
    example: '"15-minute early warning with 94% accuracy in clinical trials."',
    avoid: 'Vague claims'
  }
]

export default function Brand() {
  return (
    <Section id="brand" background="primary" padding="xl">
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
              Brand
            </Typography>
          </motion.div>

          {/* Name Explanation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <Typography variant="h2" className="mb-4">
                NitroSense
              </Typography>
            </div>

            <div className="bg-nitro-charcoal/50 p-8 rounded-2xl border border-nitro-green/20">
              <Grid cols={2} gap="lg" className="items-center">
                <div>
                  <div className="mb-8">
                    <Typography variant="h3" className="mb-4 text-nitro-green">
                      <TechnicalText>Nitro</TechnicalText>
                    </Typography>
                    <Typography variant="body" color="secondary" className="leading-relaxed">
                      Nitric Oxide (NO) - the key biomarker we measure. FeNO indicates airway inflammation 
                      and predicts asthma attacks.
                    </Typography>
                  </div>
                  
                  <div>
                    <Typography variant="h3" className="mb-4 text-nitro-green">
                      <TechnicalText>Sense</TechnicalText>
                    </Typography>
                    <Typography variant="body" color="secondary" className="leading-relaxed">
                      Advanced sensing technology and intuitive insights. Security and awareness from predictive monitoring.
                    </Typography>
                  </div>
                </div>

                <div className="text-center">
                  <div className="relative">
                    {/* Logo Placeholder */}
                    <div className="w-48 h-48 mx-auto bg-gradient-to-br from-nitro-green/20 to-nitro-green/5 rounded-full border-2 border-nitro-green/30 flex items-center justify-center">
                      <div className="text-center">
                        <Typography variant="h1" className="text-nitro-green font-bold mb-2">
                          NS
                        </Typography>
                        <div className="w-16 h-1 bg-nitro-green mx-auto rounded-full"></div>
                        <Typography variant="small" color="secondary" className="mt-2 font-mono">
                          NITROSENSE
                        </Typography>
                      </div>
                    </div>
                    
                    {/* Breathing Animation */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-nitro-green/20"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.6, 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                  
                  <Typography variant="small" color="secondary" className="mt-4">
                    Logo Concept: Breathing rhythm visualization
                  </Typography>
                </div>
              </Grid>
            </div>
          </motion.div>

          {/* Color System */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <Typography variant="h2" className="mb-4">
                Color System & Medical Meaning
              </Typography>
              <Typography variant="body" color="secondary" className="max-w-3xl mx-auto">
                Each color in our palette carries specific medical and emotional significance, 
                creating an intuitive visual language for respiratory health.
              </Typography>
            </div>

            <div className="space-y-6">
              {colorMeanings.map((color, index) => (
                <motion.div
                  key={color.name}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-nitro-charcoal/30 p-6 rounded-xl border border-nitro-green/10"
                >
                  <div className="flex items-start space-x-6">
                    {/* Color Swatch */}
                    <div className="flex-shrink-0">
                      <div 
                        className="w-16 h-16 rounded-lg border-2 border-white/20 shadow-lg"
                        style={{ backgroundColor: color.hex }}
                      ></div>
                      <Typography variant="small" className="text-center mt-2 font-mono">
                        {color.hex}
                      </Typography>
                    </div>

                    {/* Color Information */}
                    <div className="flex-1">
                      <Typography variant="h3" className="mb-2 text-nitro-green">
                        {color.name}
                      </Typography>
                      <Typography variant="body" className="mb-3">
                        <strong>Meaning:</strong> {color.meaning}
                      </Typography>
                      <Typography variant="body" color="secondary" className="mb-3">
                        <strong>Usage:</strong> {color.usage}
                      </Typography>
                      <Typography variant="small" color="secondary">
                        <strong>Medical Significance:</strong> {color.medicalSignificance}
                      </Typography>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Brand Voice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <Typography variant="h2" className="mb-4">
                Brand Voice: Clinical Yet Human
              </Typography>
              <Typography variant="body" color="secondary" className="max-w-3xl mx-auto">
                Our voice balances medical authority with human empathy, providing the confidence of clinical expertise 
                with the warmth of genuine care.
              </Typography>
            </div>

            <Grid cols={2} gap="lg">
              {brandVoiceAttributes.map((voice, index) => (
                <motion.div
                  key={voice.attribute}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-nitro-charcoal/50 p-6 rounded-xl border border-nitro-green/20"
                >
                  <Typography variant="h3" className="mb-3 text-nitro-green">
                    {voice.attribute}
                  </Typography>
                  <Typography variant="body" color="secondary" className="mb-4 leading-relaxed">
                    {voice.description}
                  </Typography>
                  
                  <div className="mb-4 p-3 bg-nitro-green/5 rounded-lg border border-nitro-green/20">
                    <Typography variant="small" className="text-nitro-green font-medium mb-1">
                      Example:
                    </Typography>
                    <Typography variant="small" className="italic">
                      {voice.example}
                    </Typography>
                  </div>
                  
                  <div className="p-3 bg-nitro-red/5 rounded-lg border border-nitro-red/20">
                    <Typography variant="small" className="text-nitro-red font-medium mb-1">
                      Avoid:
                    </Typography>
                    <Typography variant="small">
                      {voice.avoid}
                    </Typography>
                  </div>
                </motion.div>
              ))}
            </Grid>
          </motion.div>

          {/* Brand Principles */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gradient-to-r from-nitro-green/5 to-nitro-green/10 p-8 rounded-2xl border border-nitro-green/20">
              <Typography variant="h2" className="mb-6 text-center text-nitro-green">
                Brand Promise
              </Typography>
              <Typography variant="body" className="text-lg text-center leading-relaxed max-w-4xl mx-auto">
                NitroSense transforms the anxiety of living with asthma into the confidence of predictive health management. 
                We don&apos;t just monitor—we protect. We don&apos;t just alert—we prevent. We don&apos;t just treat patients—we empower people 
                to live their fullest lives, breathing freely with the knowledge that advanced science is quietly watching over them.
              </Typography>
              
              <div className="mt-8 text-center">
                <Typography variant="h3" className="text-nitro-green italic">
                  "                  &ldquo;Breathe freely. Live fully. We&apos;ve got you covered.&rdquo;"
                </Typography>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}