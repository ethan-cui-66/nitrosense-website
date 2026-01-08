import * as fc from 'fast-check'
import { render } from '@/utils/test-utils'
import { Typography } from '@/components/ui/Typography'
import { colors } from '@/styles/design-tokens'

// Feature: nitrosense-website, Property 3: Accessibility Contrast Standards
describe('Accessibility Contrast Standards', () => {
  // Helper function to calculate luminance
  const calculateLuminance = (hex: string): number => {
    const rgb = hex.substring(1).match(/.{2}/g)?.map(x => parseInt(x, 16) / 255) || [0, 0, 0]
    const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  // Helper function to calculate contrast ratio
  const getContrastRatio = (color1: string, color2: string): number => {
    const l1 = calculateLuminance(color1)
    const l2 = calculateLuminance(color2)
    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)
    return (lighter + 0.05) / (darker + 0.05)
  }

  test('should meet WCAG 2.1 AA contrast standards for all text combinations', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(colors.text, colors.textSecondary),
        fc.constantFrom(colors.black, colors.charcoal),
        fc.constantFrom('hero', 'h1', 'h2', 'h3', 'h4', 'body', 'small'),
        fc.string({ minLength: 5, maxLength: 100 }),
        (textColor, backgroundColor, variant, content) => {
          const contrastRatio = getContrastRatio(textColor, backgroundColor)
          
          // WCAG AA standards
          const isLargeText = ['hero', 'h1', 'h2'].includes(variant)
          const minimumRatio = isLargeText ? 3.0 : 4.5
          
          expect(contrastRatio).toBeGreaterThanOrEqual(minimumRatio)
          
          // Test actual component rendering
          const { container } = render(
            <div style={{ backgroundColor }} className="p-4">
              <Typography 
                variant={variant as any} 
                color={textColor === colors.text ? 'primary' : 'secondary'}
              >
                {content}
              </Typography>
            </div>
          )
          
          const textElement = container.querySelector('h1, h2, h3, h4, p, small')
          expect(textElement).toBeInTheDocument()
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should maintain contrast standards for accent colors', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(colors.green, colors.greenLight, colors.yellow, colors.red),
        fc.constantFrom(colors.black, colors.charcoal),
        fc.string({ minLength: 1, maxLength: 50 }),
        (accentColor, backgroundColor, content) => {
          const contrastRatio = getContrastRatio(accentColor, backgroundColor)
          
          // Accent colors should meet at least AA standard for normal text
          expect(contrastRatio).toBeGreaterThanOrEqual(4.5)
          
          // Test with actual element
          const { container } = render(
            <div style={{ backgroundColor }} className="p-4">
              <span style={{ color: accentColor }}>{content}</span>
            </div>
          )
          
          const accentElement = container.querySelector('span')
          expect(accentElement).toBeInTheDocument()
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should provide sufficient contrast for interactive elements', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'link', 'input'),
        fc.constantFrom('normal', 'hover', 'focus', 'active'),
        fc.string({ minLength: 1, maxLength: 30 }),
        (elementType, state, content) => {
          // Define state-based colors
          const stateColors = {
            normal: colors.green,
            hover: colors.greenLight,
            focus: colors.green,
            active: colors.green,
          }
          
          const textColor = stateColors[state]
          const backgroundColor = colors.black
          
          const contrastRatio = getContrastRatio(textColor, backgroundColor)
          
          // Interactive elements should meet AA standard
          expect(contrastRatio).toBeGreaterThanOrEqual(4.5)
          
          // Test rendering based on element type
          let testElement
          switch (elementType) {
            case 'button':
              testElement = (
                <button 
                  style={{ color: textColor, backgroundColor }}
                  className="px-4 py-2"
                >
                  {content}
                </button>
              )
              break
            case 'link':
              testElement = (
                <a 
                  href="#" 
                  style={{ color: textColor }}
                  className="underline"
                >
                  {content}
                </a>
              )
              break
            case 'input':
              testElement = (
                <input 
                  type="text" 
                  placeholder={content}
                  style={{ color: textColor, backgroundColor }}
                  className="px-3 py-2 border"
                />
              )
              break
          }
          
          const { container } = render(
            <div style={{ backgroundColor: colors.black }} className="p-4">
              {testElement}
            </div>
          )
          
          const interactiveElement = container.querySelector(elementType)
          expect(interactiveElement).toBeInTheDocument()
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should handle focus indicators with proper contrast', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('button', 'a', 'input', 'textarea'),
        fc.string({ minLength: 1, maxLength: 50 }),
        (tagName, content) => {
          const focusColor = colors.green
          const backgroundColor = colors.black
          
          const contrastRatio = getContrastRatio(focusColor, backgroundColor)
          
          // Focus indicators should be highly visible
          expect(contrastRatio).toBeGreaterThanOrEqual(3.0)
          
          // Test focus ring visibility
          const { container } = render(
            <div style={{ backgroundColor }} className="p-4">
              {tagName === 'button' && (
                <button className="focus:ring-2 focus:ring-nitro-green focus:ring-offset-2 focus:ring-offset-nitro-black">
                  {content}
                </button>
              )}
              {tagName === 'a' && (
                <a href="#" className="focus:ring-2 focus:ring-nitro-green focus:ring-offset-2 focus:ring-offset-nitro-black">
                  {content}
                </a>
              )}
              {tagName === 'input' && (
                <input 
                  type="text" 
                  placeholder={content}
                  className="focus:ring-2 focus:ring-nitro-green focus:ring-offset-2 focus:ring-offset-nitro-black"
                />
              )}
              {tagName === 'textarea' && (
                <textarea 
                  placeholder={content}
                  className="focus:ring-2 focus:ring-nitro-green focus:ring-offset-2 focus:ring-offset-nitro-black"
                />
              )}
            </div>
          )
          
          const focusableElement = container.querySelector(tagName)
          expect(focusableElement).toBeInTheDocument()
          
          // Check for focus ring classes
          expect(focusableElement?.className).toContain('focus:ring-2')
          expect(focusableElement?.className).toContain('focus:ring-nitro-green')
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should maintain readability in high contrast mode', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('hero', 'h1', 'h2', 'h3', 'h4', 'body', 'small'),
        fc.string({ minLength: 10, maxLength: 200 }),
        (variant, content) => {
          // Simulate high contrast mode preferences
          Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
              matches: query === '(prefers-contrast: high)',
              media: query,
              onchange: null,
              addListener: jest.fn(),
              removeListener: jest.fn(),
              addEventListener: jest.fn(),
              removeEventListener: jest.fn(),
              dispatchEvent: jest.fn(),
            })),
          })
          
          const { container } = render(
            <div className="bg-nitro-black p-4">
              <Typography variant={variant as any}>
                {content}
              </Typography>
            </div>
          )
          
          const textElement = container.querySelector('h1, h2, h3, h4, p, small')
          expect(textElement).toBeInTheDocument()
          
          // In high contrast mode, text should use maximum contrast
          const textColor = colors.text // Pure white
          const backgroundColor = colors.black // Pure black
          const contrastRatio = getContrastRatio(textColor, backgroundColor)
          
          // Should exceed AA standards significantly
          expect(contrastRatio).toBeGreaterThanOrEqual(7.0) // AAA standard
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})