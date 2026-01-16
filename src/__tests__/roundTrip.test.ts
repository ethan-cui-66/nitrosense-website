import * as fc from 'fast-check'
import { ContentParser, contentParser } from '@/utils/contentParser'
import { PrettyPrinter, prettyPrinter } from '@/utils/prettyPrinter'

// Feature: Airly Warning-website, Property 10: Content Round-Trip Integrity
describe('Content Round-Trip Integrity', () => {
  test('should maintain content equivalence through parse-print-parse cycle', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'This is medical content about FeNO monitoring and respiratory health.',
          'Clinical validation shows 94% accuracy in predictive monitoring.',
          'The sensor measures biomarkers including VOCs and inflammation signals.',
          'Healthcare providers benefit from evidence-based diagnostic data.',
          'Patient outcomes improve with continuous respiratory monitoring.'
        ),
        (originalContent) => {
          // Parse the content
          const parsed1 = contentParser.parseContent(originalContent)
          
          // Convert back to content (simulate content reconstruction)
          const reconstructedContent = reconstructContent(parsed1)
          
          // Parse again
          const parsed2 = contentParser.parseContent(reconstructedContent)
          
          // Key properties should be equivalent
          expect(parsed1.headings).toEqual(parsed2.headings)
          expect(parsed1.medicalTerms.sort()).toEqual(parsed2.medicalTerms.sort())
          expect(parsed1.keyPhrases.sort()).toEqual(parsed2.keyPhrases.sort())
          
          // Validation scores should be similar (within reasonable tolerance)
          expect(Math.abs(parsed1.validation.score - parsed2.validation.score)).toBeLessThanOrEqual(5)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should preserve HTML structure through format-parse-format cycle', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '<div><p>Medical content</p></div>',
          '<section><h1>Clinical Study</h1><p>Results show efficacy.</p></section>',
          '<article><header><h2>FeNO Monitoring</h2></header><main><p>Biomarker analysis</p></main></article>',
          '<ul><li>Respiratory health</li><li>Predictive monitoring</li></ul>',
          '<table><tr><td>Metric</td><td>Value</td></tr><tr><td>Accuracy</td><td>94%</td></tr></table>'
        ),
        (originalHtml) => {
          // Format the HTML
          const formatted1 = prettyPrinter.formatHTML(originalHtml)
          
          // Extract structure information
          const structure1 = extractHtmlStructure(formatted1)
          
          // Format again
          const formatted2 = prettyPrinter.formatHTML(formatted1)
          
          // Extract structure again
          const structure2 = extractHtmlStructure(formatted2)
          
          // Structure should be identical
          expect(structure1.tagCount).toEqual(structure2.tagCount)
          expect(structure1.tagOrder).toEqual(structure2.tagOrder)
          expect(structure1.textContent).toBe(structure2.textContent)
          
          // Formatted output should be identical (idempotent)
          expect(formatted1).toBe(formatted2)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should maintain content validation consistency across round trips', () => {
    fc.assert(
      fc.property(
        fc.record({
          content: fc.string({ minLength: 50, maxLength: 300 }),
          medicalTerms: fc.array(fc.constantFrom('FeNO', 'biomarker', 'clinical', 'respiratory'), { minLength: 0, maxLength: 3 }),
          forbiddenTerms: fc.array(fc.constantFrom('amazing', 'revolutionary', 'incredible'), { minLength: 0, maxLength: 2 })
        }),
        ({ content, medicalTerms, forbiddenTerms }) => {
          // Create content with known characteristics
          const enhancedContent = `${content} ${medicalTerms.join(' ')} ${forbiddenTerms.join(' ')}`
          
          // First validation
          const validation1 = contentParser.validateContent(enhancedContent)
          
          // Parse and reconstruct
          const parsed = contentParser.parseContent(enhancedContent)
          const reconstructed = reconstructContent(parsed)
          
          // Second validation
          const validation2 = contentParser.validateContent(reconstructed)
          
          // Validation results should be consistent
          expect(validation1.isValid).toBe(validation2.isValid)
          
          // If there were forbidden terms, both should detect them
          if (forbiddenTerms.length > 0) {
            expect(validation1.errors.length).toBeGreaterThan(0)
            expect(validation2.errors.length).toBeGreaterThan(0)
          }
          
          // Medical terms should be detected in both
          if (medicalTerms.length > 0) {
            expect(parsed.medicalTerms.length).toBeGreaterThan(0)
          }
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should preserve semantic meaning through content transformations', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'The FeNO sensor provides clinical validation for respiratory monitoring.',
          'Biomarker analysis enables predictive healthcare interventions.',
          'Medical device accuracy reaches 94% in peer-reviewed studies.',
          'Patient outcomes improve with continuous diagnostic monitoring.',
          'Healthcare providers benefit from evidence-based treatment data.'
        ),
        (semanticContent) => {
          // Parse content to extract semantic elements
          const parsed = contentParser.parseContent(semanticContent)
          
          // Reconstruct content
          const reconstructed = reconstructContent(parsed)
          
          // Parse reconstructed content
          const reparsed = contentParser.parseContent(reconstructed)
          
          // Semantic elements should be preserved
          expect(reparsed.medicalTerms).toEqual(expect.arrayContaining(parsed.medicalTerms))
          expect(reparsed.keyPhrases).toEqual(expect.arrayContaining(parsed.keyPhrases))
          
          // Content should maintain medical tone
          expect(reparsed.validation.score).toBeGreaterThan(50) // Should maintain reasonable quality
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should handle edge cases in round-trip processing', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '', // Empty content
          '   ', // Whitespace only
          '<div></div>', // Empty HTML
          '<!-- Comment only -->', // Comment only
          'Single word', // Minimal content
          'A'.repeat(1000) // Very long content
        ),
        (edgeContent) => {
          try {
            // Should handle edge cases without throwing
            const parsed = contentParser.parseContent(edgeContent)
            const reconstructed = reconstructContent(parsed)
            const reparsed = contentParser.parseContent(reconstructed)
            
            // Should produce valid results
            expect(parsed.validation).toHaveProperty('score')
            expect(reparsed.validation).toHaveProperty('score')
            
            // For HTML content, should maintain structure
            if (edgeContent.includes('<') && edgeContent.includes('>')) {
              const formatted1 = prettyPrinter.formatHTML(edgeContent)
              const formatted2 = prettyPrinter.formatHTML(formatted1)
              expect(formatted1).toBe(formatted2)
            }
            
          } catch (error) {
            // If it throws, should be a descriptive error
            expect(error).toBeInstanceOf(Error)
            expect((error as Error).message.length).toBeGreaterThan(0)
          }
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should maintain data integrity across multiple round trips', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 100, maxLength: 500 }),
        fc.integer({ min: 2, max: 5 }),
        (content, iterations) => {
          let currentContent = content
          let previousValidation = contentParser.validateContent(content)
          
          // Perform multiple round trips
          for (let i = 0; i < iterations; i++) {
            const parsed = contentParser.parseContent(currentContent)
            currentContent = reconstructContent(parsed)
            const currentValidation = contentParser.validateContent(currentContent)
            
            // Validation should remain stable
            expect(Math.abs(currentValidation.score - previousValidation.score)).toBeLessThanOrEqual(10)
            
            // Should not introduce new errors
            if (previousValidation.isValid) {
              expect(currentValidation.errors.length).toBeLessThanOrEqual(previousValidation.errors.length + 1)
            }
            
            previousValidation = currentValidation
          }
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should preserve HTML validity through formatting cycles', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '<html><head><title>Test</title></head><body><div><p>Content</p></div></body></html>',
          '<section><article><h1>Title</h1><p>Paragraph</p></article></section>',
          '<div><ul><li>Item 1</li><li>Item 2</li></ul></div>',
          '<table><thead><tr><th>Header</th></tr></thead><tbody><tr><td>Data</td></tr></tbody></table>'
        ),
        (validHtml) => {
          // Format multiple times
          let formatted = validHtml
          for (let i = 0; i < 3; i++) {
            formatted = prettyPrinter.formatHTML(formatted)
          }
          
          // Should remain valid HTML
          expect(prettyPrinter.isValidHTML5(formatted)).toBe(true)
          
          // Should maintain tag balance
          const openTags = (formatted.match(/<[^\/][^>]*>/g) || []).length
          const closeTags = (formatted.match(/<\/[^>]*>/g) || []).length
          const selfClosingTags = (formatted.match(/<[^>]*\/>/g) || []).length
          
          // Open tags should equal close tags (accounting for self-closing)
          expect(openTags - selfClosingTags).toBe(closeTags)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})

// Helper function to reconstruct content from parsed data
function reconstructContent(parsed: ReturnType<ContentParser['parseContent']>): string {
  const parts: string[] = []
  
  // Add headings
  parsed.headings.forEach(heading => {
    parts.push(`# ${heading}`)
  })
  
  // Add paragraphs
  parsed.paragraphs.forEach(paragraph => {
    parts.push(paragraph.trim())
  })
  
  // Add medical terms as a sentence
  if (parsed.medicalTerms.length > 0) {
    parts.push(`Medical terms include: ${parsed.medicalTerms.join(', ')}.`)
  }
  
  // Add key phrases
  if (parsed.keyPhrases.length > 0) {
    parts.push(`Key concepts: ${parsed.keyPhrases.join(', ')}.`)
  }
  
  return parts.join('\n\n')
}

// Helper function to extract HTML structure
function extractHtmlStructure(html: string): {
  tagCount: Record<string, number>
  tagOrder: string[]
  textContent: string
} {
  const tagCount: Record<string, number> = {}
  const tagOrder: string[] = []
  
  // Extract tags
  const tagMatches = html.match(/<[^>]+>/g) || []
  tagMatches.forEach(tag => {
    const tagName = tag.match(/<\/?([a-zA-Z][a-zA-Z0-9]*)/)?.[1]?.toLowerCase()
    if (tagName) {
      tagCount[tagName] = (tagCount[tagName] || 0) + 1
      tagOrder.push(tagName)
    }
  })
  
  // Extract text content
  const textContent = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  
  return { tagCount, tagOrder, textContent }
}