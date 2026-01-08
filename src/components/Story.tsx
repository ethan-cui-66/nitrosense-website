'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container, Section, Grid } from '@/components/ui/Layout'
import { Typography } from '@/components/ui/Typography'

const values = [
  {
    title: 'Preventative Medicine',
    description: 'We believe healthcare should prevent problems before they occur, not just treat them after. Our technology shifts the paradigm from reactive emergency care to proactive health management.',
    icon: '🛡️',
  },
  {
    title: 'Accessibility',
    description: 'Advanced respiratory monitoring should be available to everyone, not just those in specialized medical facilities. We design for universal access and ease of use.',
    icon: '🌍',
  },
  {
    title: 'Scientific Transparency',
    description: 'Every algorithm, every measurement, every prediction is grounded in peer-reviewed science. We share our methodologies openly and invite scrutiny from the medical community.',
    icon: '🔬',
  },
  {
    title: 'Patient Empowerment',
    description: 'Patients and their families deserve to understand and control their health data. We put the power of prediction directly into the hands of those who need it most.',
    icon: '💪',
  },
]

export default function Story() {
  return (
    <Section id="story" background="secondary" padding="xl">
      <Container>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h1" className="mb-8">
              Our Story
            </Typography>
            <Typography variant="h3" color="secondary" className="mb-12">
              Transforming respiratory care through human-centered innovation
            </Typography>
          </motion.div>
        </div>

        {/* Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="max-w-3xl mx-auto">
            <Typography variant="h2" className="mb-6 text-center">
              Our Mission
            </Typography>
            <Typography variant="body" className="text-lg leading-relaxed text-center mb-8">
              Every year, asthma affects over 300 million people worldwide, leading to countless emergency room visits, 
              missed school days, and lives lived in fear of the next attack. Traditional asthma management is reactive—
              patients wait for symptoms to appear, then respond with rescue medications.
            </Typography>
            <Typography variant="body" className="text-lg leading-relaxed text-center">
              NitroSense changes this equation entirely. By continuously monitoring the biomarkers that precede asthma 
              attacks, we give patients and caregivers the gift of time—time to take preventive action, time to adjust 
              medications, time to avoid triggers, and time to live without fear.
            </Typography>
          </div>
        </motion.div>

        {/* Vision Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="max-w-3xl mx-auto text-center">
            <Typography variant="h2" className="mb-6">
              Our Vision
            </Typography>
            <Typography variant="body" className="text-lg leading-relaxed mb-8">
              We envision a future where asthma attacks become increasingly rare—not because we've cured asthma, 
              but because we've made them predictable and preventable. A future where children can play freely, 
              adults can exercise confidently, and families can sleep peacefully, knowing that advanced AI is 
              quietly watching over their respiratory health.
            </Typography>
            <div className="inline-flex items-center px-6 py-3 bg-nitro-black/50 rounded-lg border border-nitro-green/20">
              <Typography variant="body" className="text-nitro-green font-medium">
                From reactive treatment to predictive prevention
              </Typography>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <Typography variant="h2" className="mb-4">
              Our Values
            </Typography>
            <Typography variant="body" color="secondary" className="max-w-2xl mx-auto">
              These principles guide every decision we make, from the algorithms we develop to the partnerships we form.
            </Typography>
          </div>

          <Grid cols={2} gap="lg" className="max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                viewport={{ once: true }}
                className="bg-nitro-black/30 p-8 rounded-xl border border-nitro-green/10 hover:border-nitro-green/20 transition-colors"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <Typography variant="h3" className="mb-4 text-nitro-green">
                  {value.title}
                </Typography>
                <Typography variant="body" color="secondary" className="leading-relaxed">
                  {value.description}
                </Typography>
              </motion.div>
            ))}
          </Grid>
        </motion.div>

        {/* Human Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-nitro-green/5 to-nitro-green/10 rounded-2xl border border-nitro-green/20">
            <Typography variant="h3" className="mb-6 text-nitro-green">
              This is about more than technology
            </Typography>
            <Typography variant="body" className="text-lg leading-relaxed">
              It's about the parent who can finally sleep through the night. The athlete who can push their limits 
              without fear. The child who never has to miss another birthday party. The teacher who can focus on 
              education instead of emergency inhalers. This is about giving people their lives back.
            </Typography>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}