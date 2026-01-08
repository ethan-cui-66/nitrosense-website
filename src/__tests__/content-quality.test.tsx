/**
 * Property Test: Content Quality Standards
 * Validates Requirements 9.1 - No placeholder content, competition-ready quality
 */

import { render } from '@/utils/test-utils'
import fc from 'fast-check'
import Home from '@/app/page'
import Hero from '@/components/Hero'
import Story from '@/components/Story'
import Model from '@/components/Model'
import Impact from '@/components/Impact'
import Brand from '@/components/Brand'

// Placeholder patterns to detect
const PLACEHOLDER_PATTERNS = [
  /lorem ipsum/gi,
  /placeholder/gi,
  /todo/gi,
  /fixme/gi,
  /\[.*\]/g, // Bracketed placeholders like [Your content here]
  /xxx+/gi,
  /sample text/gi,
  /dummy text/gi,
  /test content/gi,
  /coming soon/gi,
  /under construction/gi,
  /\.\.\./g, // Ellipsis indicating incomplete content
]

// Medical hype terms that should be avoided (from contentParser)
const HYPE_PATTERNS = [
  /revolutionary/gi,
  /game.?changing/gi,
  /breakthrough/gi,
  /disruptive/gi,
  /cutting.?edge/gi,
  /next.?generation/gi,
  /world.?class/gi,
  /industry.?leading/gi,
  /state.?of.?the.?art/gi,
  /unprecedented/gi,
]

// Required content patterns for competition readiness
const REQUIRED_CONTENT_PATTERNS = {
  hero: [
    /nitrosense/gi,
    /asthma/gi,
    /prevent/gi,
    /respiratory/gi,
  ],
  story: [
    /mission/gi,
    /vision/gi,
    /values/gi,
  ],
  model: [
    /sensor/gi,
    /wearable/gi,
    /FeNO|VOC/gi,
  ],
  impact: [
    /patients/gi,
    /caregivers/gi,
    /clinicians/gi,
  ],
  brand: [
    /nitro/gi,
    /sense/gi,
    /medical/gi,
  ],
}

describe('Property Test: Content Quality Standards', () => {
  it('should have no placeholder content across all components', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          { component: Home, name: 'Home' },
          { component: Hero, name: 'Hero' },
          { component: Story, name: 'Story' },
          { component: Model, name: 'Model' },
          { component: Impact, name: 'Impact' },
          { component: Brand, name: 'Brand' }
        ),
        ({ component: Component, name }) => {
          const { container } = render(<Component />)
          const textContent = container.textContent || ''
          const html = container.innerHTML
          
          // Property: No placeholder patterns should exist
          PLACEHOLDER_PATTERNS.forEach(pattern => {
            const matches = textContent.match(pattern)
            expect(matches).toBeNull()
          })
          
          // Property: Content should be substantial (not just whitespace)
          const meaningfulContent = textContent.replace(/\s+/g, ' ').trim()
          expect(meaningfulContent.length).toBeGreaterThan(10)
          
          // Property: Should not contain obvious development artifacts
          expect(textContent).not.toMatch(/console\.log/gi)
          expect(textContent).not.toMatch(/debug/gi)
          expect(html).not.toMatch(/data-testid/gi) // Should not leak test attributes
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should avoid startup hype language in favor of medical tone', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(Hero, Story, Model, Impact, Brand),
        (Component) => {
          const { container } = render(<Component />)
          const textContent = container.textContent || ''
          
          // Property: Should avoid hype terms
          HYPE_PATTERNS.forEach(pattern => {
            const matches = textContent.match(pattern)
            if (matches) {
              // Allow some flexibility but warn about excessive use
              expect(matches.length).toBeLessThanOrEqual(1)
            }
          })
          
          // Property: Should use medical/scientific language
          const medicalTerms = [
            /medical/gi,
            /clinical/gi,
            /scientific/gi,
            /research/gi,
            /evidence/gi,
            /validated/gi,
            /proven/gi,
          ]
          
          const medicalTermCount = medicalTerms.reduce((count, pattern) => {
            const matches = textContent.match(pattern) || []
            return count + matches.length
          }, 0)
          
          // Should have some medical terminology (unless it's a very short component)
          if (textContent.length > 100) {
            expect(medicalTermCount).toBeGreaterThan(0)
          }
        }
      ),
      { numRuns: 50 }
    )
  })

  it('should contain required content for each section', () => {
    const testCases = [
      { component: Hero, name: 'hero', patterns: REQUIRED_CONTENT_PATTERNS.hero },
      { component: Story, name: 'story', patterns: REQUIRED_CONTENT_PATTERNS.story },
      { component: Model, name: 'model', patterns: REQUIRED_CONTENT_PATTERNS.model },
      { component: Impact, name: 'impact', patterns: REQUIRED_CONTENT_PATTERNS.impact },
      { component: Brand, name: 'brand', patterns: REQUIRED_CONTENT_PATTERNS.brand },
    ]

    testCases.forEach(({ component: Component, name, patterns }) => {
      const { container } = render(<Component />)
      const textContent = container.textContent || ''
      
      // Property: Each section should contain its required content patterns
      patterns.forEach(pattern => {
        expect(textContent).toMatch(pattern)
      })
    })
  })

  it('should maintain content quality across different rendering contexts', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.constantFrom(Hero, Story, Model, Impact, Brand),
          { minLength: 2, maxLength: 5 }
        ),
        (components) => {
          const TestPage = () => (
            <div>
              {components.map((Component, index) => (
                <Component key={index} />
              ))}
            </div>
          )
          
          const { container } = render(<TestPage />)
          const textContent = container.textContent || ''
          
          // Property: Combined content should maintain quality standards
          PLACEHOLDER_PATTERNS.forEach(pattern => {
            expect(textContent).not.toMatch(pattern)
          })
          
          // Property: Should have substantial combined content
          const words = textContent.split(/\s+/).filter(word => word.length > 2)
          expect(words.length).toBeGreaterThan(50)
          
          // Property: Should not have repeated content blocks
          const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 10)
          const uniqueSentences = new Set(sentences.map(s => s.trim().toLowerCase()))
          
          // Allow some repetition but not excessive
          const repetitionRatio = uniqueSentences.size / sentences.length
          expect(repetitionRatio).toBeGreaterThan(0.7)
        }
      ),
      { numRuns: 30 }
    )
  })

  it('should have professional, competition-ready content quality', () => {
    const { container } = render(<Home />)
    const textContent = container.textContent || ''
    const html = container.innerHTML
    
    // Property: Should have comprehensive content
    expect(textContent.length).toBeGreaterThan(1000)
    
    // Property: Should have proper capitalization
    const sentences = textContent.split(/[.!?]+/).filter(s => s.trim().length > 5)
    sentences.forEach(sentence => {
      const trimmed = sentence.trim()
      if (trimmed.length > 0) {
        // First character should be uppercase (allowing for quotes, etc.)
        const firstLetter = trimmed.match(/[a-zA-Z]/)
        if (firstLetter) {
          expect(firstLetter[0]).toMatch(/[A-Z]/)
        }
      }
    })
    
    // Property: Should not have obvious typos or formatting issues
    expect(textContent).not.toMatch(/\s{3,}/g) // No excessive whitespace
    expect(textContent).not.toMatch(/[.]{2,}/g) // No multiple periods (except ellipsis)
    expect(textContent).not.toMatch(/[!]{2,}/g) // No multiple exclamations
    expect(textContent).not.toMatch(/[?]{2,}/g) // No multiple questions
    
    // Property: HTML should be well-formed
    expect(html).not.toMatch(/<[^>]*<[^>]*>/g) // No unclosed tags
    expect(html).not.toMatch(/&[a-zA-Z]+(?!;)/g) // Proper entity encoding
    
    // Property: Should have proper semantic structure
    expect(html).toMatch(/<h1[^>]*>/gi) // Should have main heading
    expect(html).toMatch(/<main[^>]*>/gi) // Should have main landmark
  })

  it('should maintain content integrity under stress conditions', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 10 }),
        (renderCount) => {
          // Render the same component multiple times to test consistency
          const results = Array.from({ length: renderCount }, () => {
            const { container } = render(<Home />)
            return container.textContent || ''
          })
          
          // Property: Content should be consistent across renders
          const firstResult = results[0]
          results.forEach(result => {
            expect(result).toBe(firstResult)
          })
          
          // Property: Content should maintain quality regardless of render count
          PLACEHOLDER_PATTERNS.forEach(pattern => {
            expect(firstResult).not.toMatch(pattern)
          })
        }
      ),
      { numRuns: 20 }
    )
  })
})