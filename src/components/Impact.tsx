'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Container, Section, Grid } from '@/components/ui/Layout'
import { Typography, TechnicalText } from '@/components/ui/Typography'

const beneficiaries = [
  {
    type: 'patients',
    title: 'Patients',
    
    benefits: [
      'Prevent attacks before symptoms appear',
      'Reduce emergency visits by 70%',
      'Live with confidence',
      'Maintain active lifestyle',
      'Better sleep',
      'Personalized trigger insights'
    ],
    quote: '"For the first time in years, I can exercise without worrying about an attack."',
    quoteName: 'Sarah M., Beta Tester'
  },
  {
    type: 'caregivers',
    title: 'Caregivers',
    
    benefits: [
      'Peace of mind',
      'Real-time alerts',
      'Shared data with providers',
      'Reduced anxiety',
      'Pattern understanding',
      'Proactive prevention'
    ],
    quote: '"I finally sleep through the night knowing the system is watching over my daughter."',
    quoteName: 'Michael R., Parent'
  },
  {
    type: 'clinicians',
    title: 'Clinicians',
    
    benefits: [
      'Objective data for decisions',
      'Early intervention',
      'Reduced readmissions',
      'Improved outcomes',
      'Evidence-based adjustments',
      'Population health insights'
    ],
    quote: '"This data transforms how we manage asthma - from reactive to truly predictive care."',
    quoteName: 'Dr. Jennifer L., Pulmonologist'
  }
]

const feasibilityFactors = [
  {
    title: 'Advanced Sensor Technology',
    description: 'Miniaturized sensors now capable of detecting ppb-level biomarkers',
    
    status: 'Available Today'
  },
  {
    title: 'AI & Machine Learning',
    description: 'Proven algorithms for pattern recognition in medical applications',
    
    status: 'Mature Technology'
  },
  {
    title: 'Wireless Connectivity',
    description: 'Bluetooth Low Energy enables seamless data transmission',
    
    status: 'Industry Standard'
  },
  {
    title: 'Mobile Computing Power',
    description: 'Smartphones now have sufficient processing power for real-time analysis',
    
    status: 'Ubiquitous'
  }
]

const whyNowReasons = [
  {
    title: 'Sensor Miniaturization',
    description: 'Recent breakthroughs in MEMS technology enable medical-grade sensors in wearable form factors',
    timeline: '2020-2024'
  },
  {
    title: 'AI Maturation',
    description: 'Machine learning models now achieve clinical-grade accuracy for biomarker pattern recognition',
    timeline: '2022-2024'
  },
  {
    title: 'Healthcare Digitization',
    description: 'COVID-19 accelerated adoption of remote monitoring and digital health solutions',
    timeline: '2020-Present'
  },
  {
    title: 'Regulatory Clarity',
    description: 'FDA pathways for digital therapeutics and AI-based medical devices are now well-established',
    timeline: '2021-Present'
  }
]

export default function Impact() {
  return (
    <Section id="impact" background="secondary" padding="xl">
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
              Impact
            </Typography>
          </motion.div>

          {/* Beneficiaries Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <Typography variant="h2" className="mb-4">
                Who Benefits
              </Typography>
            </div>

            <div className="space-y-12">
              {beneficiaries.map((beneficiary, index) => (
                <motion.div
                  key={beneficiary.type}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`grid lg:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  {/* Benefits List */}
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center mb-6">
                      <div className="text-4xl mr-4">{beneficiary.icon}</div>
                      <Typography variant="h2" className="text-nitro-green">
                        {beneficiary.title}
                      </Typography>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      {beneficiary.benefits.map((benefit, benefitIndex) => (
                        <motion.li
                          key={benefit}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + benefitIndex * 0.1 }}
                          viewport={{ once: true }}
                          className="flex items-start space-x-3"
                        >
                          <div className="w-2 h-2 bg-nitro-green rounded-full mt-2 flex-shrink-0"></div>
                          <Typography variant="body" color="secondary">
                            {benefit}
                          </Typography>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Quote */}
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="bg-nitro-black/50 p-8 rounded-xl border border-nitro-green/20">
                      <div className="text-4xl text-nitro-green mb-4">&ldquo;</div>
                      <Typography variant="body" className="text-lg italic mb-4 leading-relaxed">
                        {beneficiary.quote}
                      </Typography>
                      <Typography variant="small" className="text-nitro-green font-medium">
                        — {beneficiary.quoteName}
                      </Typography>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Early Detection Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <Typography variant="h2" className="mb-4">
                Early Detection
              </Typography>
            </div>

            <div className="bg-gradient-to-r from-nitro-green/5 to-nitro-green/10 p-8 rounded-2xl border border-nitro-green/20">
              <Grid cols={3} gap="lg">
                <div className="text-center">
                  <TechnicalText className="text-4xl font-bold text-nitro-green">70%</TechnicalText>
                  <Typography variant="body" color="secondary" className="mt-2">
                    Reduction in emergency room visits
                  </Typography>
                </div>
                <div className="text-center">
                  <TechnicalText className="text-4xl font-bold text-nitro-green">$2,400</TechnicalText>
                  <Typography variant="body" color="secondary" className="mt-2">
                    Average annual savings per patient
                  </Typography>
                </div>
                <div className="text-center">
                  <TechnicalText className="text-4xl font-bold text-nitro-green">15-30min</TechnicalText>
                  <Typography variant="body" color="secondary" className="mt-2">
                    Early warning before symptoms
                  </Typography>
                </div>
              </Grid>
            </div>
          </motion.div>

          {/* Modular Design Adoption */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="text-center mb-12">
              <Typography variant="h2" className="mb-4">
                Designed for Easy Adoption
              </Typography>
              <Typography variant="body" color="secondary" className="max-w-3xl mx-auto">
                Our modular approach removes traditional barriers to wearable technology adoption.
              </Typography>
            </div>

            <Grid cols={2} gap="lg">
              <div className="bg-nitro-red/10 p-6 rounded-xl border border-nitro-red/20">
                <Typography variant="h3" className="mb-4 text-nitro-red">
                  Traditional Wearables
                </Typography>
                <ul className="space-y-2 text-nitro-text-secondary">
                  <li>• One-size-fits-all design</li>
                  <li>• Limited wearing options</li>
                  <li>• Uncomfortable for extended use</li>
                  <li>• Stigmatizing medical appearance</li>
                  <li>• High abandonment rates</li>
                </ul>
              </div>

              <div className="bg-nitro-green/10 p-6 rounded-xl border border-nitro-green/20">
                <Typography variant="h3" className="mb-4 text-nitro-green">
                  NitroSense Modular Design
                </Typography>
                <ul className="space-y-2 text-nitro-text-secondary">
                  <li>• Multiple wearing options</li>
                  <li>• Adaptable to lifestyle preferences</li>
                  <li>• Comfortable for 24/7 use</li>
                  <li>• Discreet, fashionable designs</li>
                  <li>• High long-term compliance</li>
                </ul>
              </div>
            </Grid>
          </motion.div>

          {/* Why Now Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-12">
              <Typography variant="h2" className="mb-4">
                Why Now?
              </Typography>
              <Typography variant="body" color="secondary" className="max-w-3xl mx-auto">
                The convergence of advanced sensors, AI maturation, and healthcare digitization 
                creates a unique window of opportunity for predictive respiratory monitoring.
              </Typography>
            </div>

            {/* Technology Readiness */}
            <div className="mb-12">
              <Typography variant="h3" className="mb-6 text-center text-nitro-green">
                Technology Readiness
              </Typography>
              <Grid cols={2} gap="lg">
                {feasibilityFactors.map((factor, index) => (
                  <motion.div
                    key={factor.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-nitro-black/30 p-6 rounded-xl border border-nitro-green/20"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{factor.icon}</div>
                      <div className="flex-1">
                        <Typography variant="h4" className="mb-2 text-nitro-green">
                          {factor.title}
                        </Typography>
                        <Typography variant="body" color="secondary" className="mb-3">
                          {factor.description}
                        </Typography>
                        <div className="inline-flex items-center px-3 py-1 bg-nitro-green/20 rounded-full">
                          <div className="w-2 h-2 bg-nitro-green rounded-full mr-2"></div>
                          <Typography variant="small" className="text-nitro-green font-medium">
                            {factor.status}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Grid>
            </div>

            {/* Market Timing */}
            <div className="bg-nitro-charcoal/50 p-8 rounded-xl border border-nitro-green/20">
              <Typography variant="h3" className="mb-6 text-center text-nitro-green">
                Perfect Market Timing
              </Typography>
              <div className="space-y-6">
                {whyNowReasons.map((reason, index) => (
                  <motion.div
                    key={reason.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start space-x-4 p-4 bg-nitro-black/30 rounded-lg"
                  >
                    <div className="flex-shrink-0 w-20 text-center">
                      <Typography variant="small" className="text-nitro-green font-mono">
                        {reason.timeline}
                      </Typography>
                    </div>
                    <div className="flex-1">
                      <Typography variant="h4" className="mb-2">
                        {reason.title}
                      </Typography>
                      <Typography variant="body" color="secondary">
                        {reason.description}
                      </Typography>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}