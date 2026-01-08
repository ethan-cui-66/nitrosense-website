// Content Parser with Brand Validation for NitroSense Website

export interface ContentValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  score: number // 0-100 brand compliance score
}

export interface BrandGuidelines {
  voiceAttributes: string[]
  approvedTerms: string[]
  forbiddenTerms: string[]
  toneKeywords: {
    calm: string[]
    medical: string[]
    reassuring: string[]
    precise: string[]
  }
  medicalTerms: string[]
}

const brandGuidelines: BrandGuidelines = {
  voiceAttributes: ['calm', 'medical', 'reassuring', 'precise'],
  
  approvedTerms: [
    'predictive', 'monitoring', 'respiratory', 'biomarker', 'clinical',
    'prevention', 'early detection', 'healthcare', 'medical-grade',
    'scientific', 'evidence-based', 'validated', 'precision', 'accuracy',
    'patient', 'caregiver', 'clinician', 'health', 'breathing', 'asthma',
    'inflammation', 'FeNO', 'VOCs', 'sensor', 'wearable', 'continuous'
  ],
  
  forbiddenTerms: [
    'revolutionary', 'game-changing', 'disruptive', 'cutting-edge',
    'amazing', 'incredible', 'awesome', 'mind-blowing', 'breakthrough',
    'world-class', 'best-in-class', 'paradigm shift', 'synergy',
    'leverage', 'scalable solution', 'next-generation', 'state-of-the-art'
  ],
  
  toneKeywords: {
    calm: [
      'peaceful', 'steady', 'stable', 'consistent', 'reliable',
      'gentle', 'quiet', 'smooth', 'balanced', 'controlled'
    ],
    medical: [
      'clinical', 'diagnostic', 'therapeutic', 'medical', 'healthcare',
      'treatment', 'patient', 'physician', 'hospital', 'evidence-based',
      'peer-reviewed', 'validated', 'approved', 'certified'
    ],
    reassuring: [
      'confident', 'trusted', 'secure', 'protected', 'safe',
      'reliable', 'dependable', 'proven', 'established', 'supported'
    ],
    precise: [
      'accurate', 'specific', 'measured', 'quantified', 'exact',
      'detailed', 'systematic', 'methodical', 'rigorous', 'scientific'
    ]
  },
  
  medicalTerms: [
    'FeNO', 'fractional exhaled nitric oxide', 'VOCs', 'volatile organic compounds',
    'biomarker', 'inflammation', 'respiratory', 'asthma', 'airway',
    'pulmonary', 'breathing', 'exhaled breath', 'clinical trial',
    'FDA', 'medical device', 'diagnostic', 'monitoring', 'sensor'
  ]
}

export class ContentParser {
  private guidelines: BrandGuidelines

  constructor(guidelines: BrandGuidelines = brandGuidelines) {
    this.guidelines = guidelines
  }

  /**
   * Validates content against NitroSense brand guidelines
   */
  validateContent(content: string): ContentValidationResult {
    const errors: string[] = []
    const warnings: string[] = []
    let score = 100

    // Check for forbidden terms (startup hype language)
    const forbiddenFound = this.checkForbiddenTerms(content)
    if (forbiddenFound.length > 0) {
      errors.push(`Forbidden startup hype terms found: ${forbiddenFound.join(', ')}`)
      score -= forbiddenFound.length * 15
    }

    // Check tone compliance
    const toneScore = this.assessToneCompliance(content)
    if (toneScore < 60) {
      warnings.push(`Tone compliance below threshold (${toneScore}%). Consider adding more medical, calm, reassuring, or precise language.`)
      score -= (60 - toneScore) * 0.5
    }

    // Check medical terminology usage
    const medicalScore = this.assessMedicalTerminology(content)
    if (medicalScore < 40 && content.length > 100) {
      warnings.push(`Low medical terminology usage (${medicalScore}%). Consider adding relevant medical terms for credibility.`)
      score -= (40 - medicalScore) * 0.3
    }

    // Check for placeholder content
    const placeholders = this.checkPlaceholderContent(content)
    if (placeholders.length > 0) {
      errors.push(`Placeholder content found: ${placeholders.join(', ')}`)
      score -= placeholders.length * 20
    }

    // Check sentence length (medical content should be clear and concise)
    const longSentences = this.checkSentenceLength(content)
    if (longSentences > 0) {
      warnings.push(`${longSentences} sentences exceed 25 words. Consider breaking into shorter, clearer sentences.`)
      score -= longSentences * 2
    }

    // Ensure score doesn't go below 0
    score = Math.max(0, score)

    return {
      isValid: errors.length === 0,
      errors,
      warnings,
      score: Math.round(score)
    }
  }

  /**
   * Checks for forbidden startup hype terms
   */
  private checkForbiddenTerms(content: string): string[] {
    const lowerContent = content.toLowerCase()
    return this.guidelines.forbiddenTerms.filter(term => 
      lowerContent.includes(term.toLowerCase())
    )
  }

  /**
   * Assesses tone compliance based on brand voice keywords
   */
  private assessToneCompliance(content: string): number {
    const lowerContent = content.toLowerCase()
    const words = lowerContent.split(/\s+/)
    let toneMatches = 0

    // Count matches for each tone category
    Object.values(this.guidelines.toneKeywords).forEach(keywords => {
      keywords.forEach(keyword => {
        if (lowerContent.includes(keyword.toLowerCase())) {
          toneMatches++
        }
      })
    })

    // Calculate percentage based on content length
    const toneScore = Math.min(100, (toneMatches / Math.max(words.length / 50, 1)) * 100)
    return Math.round(toneScore)
  }

  /**
   * Assesses medical terminology usage
   */
  private assessMedicalTerminology(content: string): number {
    const lowerContent = content.toLowerCase()
    const words = lowerContent.split(/\s+/)
    let medicalMatches = 0

    this.guidelines.medicalTerms.forEach(term => {
      if (lowerContent.includes(term.toLowerCase())) {
        medicalMatches++
      }
    })

    // Calculate percentage based on content length
    const medicalScore = Math.min(100, (medicalMatches / Math.max(words.length / 100, 1)) * 100)
    return Math.round(medicalScore)
  }

  /**
   * Checks for placeholder content
   */
  private checkPlaceholderContent(content: string): string[] {
    const placeholders: string[] = []
    const placeholderPatterns = [
      /lorem ipsum/gi,
      /placeholder/gi,
      /sample text/gi,
      /dummy text/gi,
      /\[.*?\]/g, // [placeholder] format
      /\{.*?\}/g, // {placeholder} format
      /xxx+/gi,   // xxx or XXXX
      /tbd|to be determined/gi,
      /coming soon/gi
    ]

    placeholderPatterns.forEach(pattern => {
      const matches = content.match(pattern)
      if (matches) {
        placeholders.push(...matches)
      }
    })

    return [...new Set(placeholders)] // Remove duplicates
  }

  /**
   * Checks sentence length for readability
   */
  private checkSentenceLength(content: string): number {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0)
    let longSentenceCount = 0

    sentences.forEach(sentence => {
      const wordCount = sentence.trim().split(/\s+/).length
      if (wordCount > 25) {
        longSentenceCount++
      }
    })

    return longSentenceCount
  }

  /**
   * Suggests improvements for content
   */
  suggestImprovements(content: string): string[] {
    const suggestions: string[] = []
    const validation = this.validateContent(content)

    if (validation.score < 80) {
      suggestions.push('Consider adding more medical terminology to increase credibility')
      suggestions.push('Use more precise, measurable language (e.g., "94% accuracy" instead of "highly accurate")')
      suggestions.push('Include calm, reassuring language to reduce patient anxiety')
    }

    if (this.assessToneCompliance(content) < 70) {
      suggestions.push('Add more brand voice keywords: calm, medical, reassuring, precise')
    }

    if (this.assessMedicalTerminology(content) < 50) {
      suggestions.push('Include relevant medical terms: FeNO, biomarker, clinical, respiratory, etc.')
    }

    return suggestions
  }

  /**
   * Parses content and extracts structured data
   */
  parseContent(content: string): {
    headings: string[]
    paragraphs: string[]
    medicalTerms: string[]
    keyPhrases: string[]
    validation: ContentValidationResult
  } {
    // Extract headings (simple markdown-style)
    const headings = content.match(/^#+\s+(.+)$/gm)?.map(h => h.replace(/^#+\s+/, '')) || []
    
    // Extract paragraphs
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0)
    
    // Extract medical terms found in content
    const lowerContent = content.toLowerCase()
    const medicalTermsFound = this.guidelines.medicalTerms.filter(term => 
      lowerContent.includes(term.toLowerCase())
    )
    
    // Extract key phrases (simple approach - could be enhanced with NLP)
    const keyPhrases = this.extractKeyPhrases(content)
    
    // Validate content
    const validation = this.validateContent(content)

    return {
      headings,
      paragraphs,
      medicalTerms: medicalTermsFound,
      keyPhrases,
      validation
    }
  }

  /**
   * Simple key phrase extraction
   */
  private extractKeyPhrases(content: string): string[] {
    const phrases: string[] = []
    
    // Look for important medical phrases
    const medicalPhrases = [
      'predictive monitoring', 'early detection', 'respiratory health',
      'asthma prevention', 'biomarker analysis', 'clinical validation',
      'medical device', 'healthcare innovation', 'patient outcomes'
    ]
    
    const lowerContent = content.toLowerCase()
    medicalPhrases.forEach(phrase => {
      if (lowerContent.includes(phrase)) {
        phrases.push(phrase)
      }
    })
    
    return phrases
  }
}

// Export singleton instance
export const contentParser = new ContentParser()