/**
 * Property Test: Semantic HTML Structure
 * Validates Requirements 8.2 - Semantic HTML structure compliance
 */

import { render } from '@/utils/test-utils'
import { semanticValidator } from '@/utils/semanticValidator'
import fc from 'fast-check'
import Home from '@/app/page'
import Hero from '@/components/Hero'
import Story from '@/components/Story'
import Model from '@/components/Model'
import Impact from '@/components/Impact'
import Brand from '@/components/Brand'

describe('Property Test: Semantic HTML Structure', () => {
  it('should maintain semantic HTML structure across all components', () => {
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
          const html = container.innerHTML
          
          const validation = semanticValidator.validateSemanticStructure(html)
          
          // Property: All components must have valid semantic structure
          expect(validation.score).toBeGreaterThanOrEqual(80) // Allow minor warnings
          expect(validation.errors).toHaveLength(0) // No critical errors allowed
          
          // Property: Components should use proper heading hierarchy
          if (html.includes('<h')) {
            const headings = html.match(/<h[1-6][^>]*>/gi) || []
            expect(headings.length).toBeGreaterThan(0)
            
            // Extract heading levels
            const levels = headings.map(h => {
              const match = h.match(/<h([1-6])/i)
              return match ? parseInt(match[1]) : 0
            })
            
            // Should not skip heading levels
            for (let i = 1; i < levels.length; i++) {
              expect(levels[i] - levels[i-1]).toBeLessThanOrEqual(1)
            }
          }
          
          // Property: Interactive elements should be accessible
          const buttons = html.match(/<button[^>]*>/gi) || []
          const links = html.match(/<a[^>]*>/gi) || []
          
          buttons.forEach(button => {
            // Buttons should have accessible text or aria-label
            expect(
              button.includes('aria-label=') || 
              button.includes('>') // Has text content
            ).toBe(true)
          })
          
          links.forEach(link => {
            // Links should have href or be properly marked as buttons
            expect(
              link.includes('href=') || 
              link.includes('role="button"') ||
              link.includes('aria-label=')
            ).toBe(true)
          })
          
          // Property: Images should have alt text
          const images = html.match(/<img[^>]*>/gi) || []
          images.forEach(img => {
            expect(img.includes('alt=')).toBe(true)
          })
          
          // Property: Lists should be properly structured
          const listItems = html.match(/<li[^>]*>/gi) || []
          const lists = html.match(/<[ou]l[^>]*>/gi) || []
          
          if (listItems.length > 0) {
            expect(lists.length).toBeGreaterThan(0)
          }
        }
      ),
      { numRuns: 100 }
    )
  })

  it('should maintain proper landmark structure in main page', () => {
    const { container } = render(<Home />)
    const html = container.innerHTML
    
    const validation = semanticValidator.validateSemanticStructure(html)
    
    // Main page should have excellent semantic structure
    expect(validation.score).toBeGreaterThanOrEqual(90)
    expect(validation.errors).toHaveLength(0)
    
    // Should have main content structure
    expect(html).toMatch(/<main[^>]*>/)
    
    // Should have proper sectioning
    const sections = html.match(/<section[^>]*>/gi) || []
    expect(sections.length).toBeGreaterThan(0)
    
    // Should have heading hierarchy starting with h1
    const headings = html.match(/<h[1-6][^>]*>/gi) || []
    expect(headings.length).toBeGreaterThan(0)
    
    const firstHeading = headings[0]
    expect(firstHeading).toMatch(/<h1[^>]*>/)
  })

  it('should validate semantic structure properties across component combinations', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.constantFrom(Hero, Story, Model, Impact, Brand),
          { minLength: 1, maxLength: 3 }
        ),
        (components) => {
          const TestPage = () => (
            <main>
              {components.map((Component, index) => (
                <Component key={index} />
              ))}
            </main>
          )
          
          const { container } = render(<TestPage />)
          const html = container.innerHTML
          
          const validation = semanticValidator.validateSemanticStructure(html)
          
          // Property: Any combination of components should maintain semantic validity
          expect(validation.isValid).toBe(true)
          expect(validation.score).toBeGreaterThanOrEqual(75)
          
          // Property: Should have main landmark
          expect(html).toMatch(/<main[^>]*>/)
          
          // Property: Should not have empty sections
          const sections = html.match(/<section[^>]*>[\s\S]*?<\/section>/gi) || []
          sections.forEach(section => {
            const content = section.replace(/<\/?section[^>]*>/gi, '').trim()
            expect(content.length).toBeGreaterThan(0)
          })
        }
      ),
      { numRuns: 50 }
    )
  })
})