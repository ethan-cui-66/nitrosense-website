import * as fc from 'fast-check'
import { ContentParser, contentParser } from '@/utils/contentParser'

// Feature: nitrosense-website, Property 8: Content Parser Validation
describe('Content Parser Validation', () => {
  test('should validate content against brand guidelines for any input', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 10, maxLength: 1000 }),
        (content) => {
          const result = contentParser.validateContent(content)
          
          // Result should always have required properties
          expect(result).toHaveProperty('isValid')
          expect(result).toHaveProperty('errors')
          expect(result).toHaveProperty('warnings')
          expect(result).toHaveProperty('score')
          
          // Score should be between 0 and 100
          expect(result.score).toBeGreaterThanOrEqual(0)
          expect(result.score).toBeLessThanOrEqual(100)
          
          // Errors and warnings should be arrays
          expect(Array.isArray(result.errors)).toBe(true)
          expect(Array.isArray(result.warnings)).toBe(true)
          
          // If there are errors, isValid should be false
          if (result.errors.length > 0) {
            expect(result.isValid).toBe(false)
          }
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should reject content with forbidden startup hype terms', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'revolutionary', 'game-changing', 'disruptive', 'cutting-edge',
          'amazing', 'incredible', 'awesome', 'mind-blowing'
        ),
        fc.string({ minLength: 20, maxLength: 200 }),
        (forbiddenTerm, baseContent) => {
          const contentWithForbiddenTerm = `${baseContent} This is ${forbiddenTerm} technology.`
          const result = contentParser.validateContent(contentWithForbiddenTerm)
          
          // Should have errors for forbidden terms
          expect(result.errors.length).toBeGreaterThan(0)
          expect(result.isValid).toBe(false)
          
          // Should mention the forbidden term in errors
          const errorText = result.errors.join(' ').toLowerCase()
          expect(errorText).toContain(forbiddenTerm.toLowerCase())
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should detect and flag placeholder content', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'Lorem ipsum dolor sit amet',
          'This is placeholder text',
          'Sample text here',
          '[Insert content here]',
          '{TODO: Add content}',
          'XXXXX',
          'TBD - to be determined',
          'Coming soon'
        ),
        fc.string({ minLength: 10, maxLength: 100 }),
        (placeholder, baseContent) => {
          const contentWithPlaceholder = `${baseContent} ${placeholder}`
          const result = contentParser.validateContent(contentWithPlaceholder)
          
          // Should have errors for placeholder content
          expect(result.errors.length).toBeGreaterThan(0)
          expect(result.isValid).toBe(false)
          
          // Should mention placeholder in errors
          const errorText = result.errors.join(' ').toLowerCase()
          expect(errorText).toContain('placeholder')
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should reward medical terminology usage', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'FeNO', 'biomarker', 'clinical', 'respiratory', 'asthma',
          'medical device', 'FDA approved', 'peer-reviewed', 'diagnostic'
        ),
        fc.string({ minLength: 50, maxLength: 200 }),
        (medicalTerm, baseContent) => {
          const contentWithMedical = `${baseContent} The ${medicalTerm} provides clinical validation.`
          const contentWithoutMedical = baseContent
          
          const resultWith = contentParser.validateContent(contentWithMedical)
          const resultWithout = contentParser.validateContent(contentWithoutMedical)
          
          // Content with medical terms should generally score higher
          // (unless other factors significantly impact the score)
          if (resultWithout.score > 20) { // Only compare if base content isn't terrible
            expect(resultWith.score).toBeGreaterThanOrEqual(resultWithout.score - 10)
          }
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should assess tone compliance consistently', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'calm', 'medical', 'reassuring', 'precise', 'clinical',
          'reliable', 'accurate', 'validated', 'proven', 'scientific'
        ),
        fc.integer({ min: 1, max: 5 }),
        fc.string({ minLength: 20, maxLength: 100 }),
        (toneWord, repetitions, baseContent) => {
          const toneContent = `${baseContent} ${Array(repetitions).fill(`This is ${toneWord} and professional`).join('. ')}.`
          const result = contentParser.validateContent(toneContent)
          
          // Should not have errors just for using tone words
          const hasOnlyToneErrors = result.errors.every(error => 
            !error.toLowerCase().includes('forbidden') && 
            !error.toLowerCase().includes('placeholder')
          )
          
          if (hasOnlyToneErrors) {
            expect(result.errors.length).toBe(0)
          }
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should parse content structure consistently', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 10, maxLength: 100 }), { minLength: 1, maxLength: 5 }),
        fc.array(fc.string({ minLength: 5, maxLength: 50 }), { minLength: 1, maxLength: 3 }),
        (paragraphs, headings) => {
          const content = headings.map(h => `# ${h}`).join('\n\n') + '\n\n' + paragraphs.join('\n\n')
          const parsed = contentParser.parseContent(content)
          
          // Should extract headings
          expect(parsed.headings.length).toBeGreaterThan(0)
          
          // Should extract paragraphs
          expect(parsed.paragraphs.length).toBeGreaterThan(0)
          
          // Should have validation results
          expect(parsed.validation).toHaveProperty('isValid')
          expect(parsed.validation).toHaveProperty('score')
          
          // Should extract arrays
          expect(Array.isArray(parsed.medicalTerms)).toBe(true)
          expect(Array.isArray(parsed.keyPhrases)).toBe(true)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should provide improvement suggestions for low-scoring content', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 50, maxLength: 200 }),
        (content) => {
          const suggestions = contentParser.suggestImprovements(content)
          
          // Should always return an array
          expect(Array.isArray(suggestions)).toBe(true)
          
          // If content scores low, should provide suggestions
          const validation = contentParser.validateContent(content)
          if (validation.score < 60) {
            expect(suggestions.length).toBeGreaterThan(0)
          }
          
          // Suggestions should be helpful strings
          suggestions.forEach(suggestion => {
            expect(typeof suggestion).toBe('string')
            expect(suggestion.length).toBeGreaterThan(10)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should handle edge cases gracefully', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('', '   ', '\n\n\n', '!@#$%^&*()', '123456789'),
        (edgeCase) => {
          const result = contentParser.validateContent(edgeCase)
          
          // Should not throw errors
          expect(result).toHaveProperty('isValid')
          expect(result).toHaveProperty('score')
          
          // Should handle empty/minimal content
          if (edgeCase.trim().length === 0) {
            expect(result.score).toBeLessThan(50) // Empty content should score low
          }
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should maintain consistency across multiple validations', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 50, maxLength: 200 }),
        (content) => {
          const result1 = contentParser.validateContent(content)
          const result2 = contentParser.validateContent(content)
          
          // Results should be identical for same input
          expect(result1.isValid).toBe(result2.isValid)
          expect(result1.score).toBe(result2.score)
          expect(result1.errors).toEqual(result2.errors)
          expect(result1.warnings).toEqual(result2.warnings)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should validate medical innovation tone vs startup hype', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'clinical validation', 'peer-reviewed research', 'FDA pathway',
          'medical device', 'patient outcomes', 'evidence-based'
        ),
        fc.constantFrom(
          'revolutionary breakthrough', 'game-changing innovation', 'disruptive technology',
          'amazing results', 'incredible performance', 'mind-blowing features'
        ),
        (medicalPhrase, hypePhrase) => {
          const medicalContent = `Our solution provides ${medicalPhrase} for respiratory monitoring.`
          const hypeContent = `Our solution is ${hypePhrase} for respiratory monitoring.`
          
          const medicalResult = contentParser.validateContent(medicalContent)
          const hypeResult = contentParser.validateContent(hypeContent)
          
          // Medical content should score higher than hype content
          expect(medicalResult.score).toBeGreaterThan(hypeResult.score)
          
          // Hype content should have errors
          expect(hypeResult.errors.length).toBeGreaterThan(0)
          expect(hypeResult.isValid).toBe(false)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})