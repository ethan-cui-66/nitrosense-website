import * as fc from 'fast-check'
import { render } from '@/utils/test-utils'
import { Typography, CodeText, TechnicalText } from '@/components/ui/Typography'
import { typography } from '@/styles/design-tokens'

// Feature: nitrosense-website, Property 2: Typography System Compliance
describe('Typography System Compliance', () => {
  test('should use clinical font families without playful fonts', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('hero', 'h1', 'h2', 'h3', 'h4', 'body', 'small'),
        fc.string({ minLength: 1, maxLength: 100 }),
        (variant, content) => {
          const { container } = render(
            <Typography variant={variant as any}>{content}</Typography>
          )
          
          const element = container.firstChild as HTMLElement
          const computedStyle = window.getComputedStyle(element)
          
          // Should use Inter font family (clinical, not playful)
          expect(element.className).toContain('font-inter')
          
          // Should not contain playful font indicators
          expect(element.className).not.toContain('font-comic')
          expect(element.className).not.toContain('font-cursive')
          expect(element.className).not.toContain('font-decorative')
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should use JetBrains Mono for technical content', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 50 }),
        (content) => {
          const { container: codeContainer } = render(
            <CodeText>{content}</CodeText>
          )
          const { container: techContainer } = render(
            <TechnicalText>{content}</TechnicalText>
          )
          
          const codeElement = codeContainer.firstChild as HTMLElement
          const techElement = techContainer.firstChild as HTMLElement
          
          // Both should use monospace font
          expect(codeElement.className).toContain('font-mono')
          expect(techElement.className).toContain('font-mono')
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should maintain consistent typography scale', () => {
    const variants = ['hero', 'h1', 'h2', 'h3', 'h4', 'body', 'small'] as const
    
    fc.assert(
      fc.property(
        fc.constantFrom(...variants),
        fc.string({ minLength: 1, maxLength: 100 }),
        (variant, content) => {
          const { container } = render(
            <Typography variant={variant}>{content}</Typography>
          )
          
          const element = container.firstChild as HTMLElement
          
          // Check that appropriate text size class is applied
          const expectedSizeClass = {
            hero: 'text-hero',
            h1: 'text-h1',
            h2: 'text-h2',
            h3: 'text-h3',
            h4: 'text-h4',
            body: 'text-base',
            small: 'text-sm',
          }[variant]
          
          expect(element.className).toContain(expectedSizeClass)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should apply proper semantic HTML elements', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('hero', 'h1', 'h2', 'h3', 'h4', 'body', 'small'),
        fc.string({ minLength: 1, maxLength: 100 }),
        (variant, content) => {
          const { container } = render(
            <Typography variant={variant as any}>{content}</Typography>
          )
          
          const element = container.firstChild as HTMLElement
          
          // Check semantic HTML element mapping
          const expectedTagName = {
            hero: 'H1',
            h1: 'H1',
            h2: 'H2',
            h3: 'H3',
            h4: 'H4',
            body: 'P',
            small: 'SMALL',
          }[variant]
          
          expect(element.tagName).toBe(expectedTagName)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should maintain readable line heights', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('hero', 'h1', 'h2', 'h3', 'h4', 'body', 'small'),
        fc.string({ minLength: 10, maxLength: 200 }),
        (variant, content) => {
          const { container } = render(
            <Typography variant={variant as any}>{content}</Typography>
          )
          
          const element = container.firstChild as HTMLElement
          
          // Check that appropriate line height is applied
          const hasLineHeight = 
            element.className.includes('leading-tight') ||
            element.className.includes('leading-normal') ||
            element.className.includes('leading-relaxed')
          
          expect(hasLineHeight).toBe(true)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})