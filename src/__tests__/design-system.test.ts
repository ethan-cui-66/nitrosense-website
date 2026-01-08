import * as fc from 'fast-check'
import { colors } from '@/styles/design-tokens'

// Feature: nitrosense-website, Property 1: Dark Mode Color System Consistency
describe('Color System Consistency', () => {
  test('should maintain dark mode color system across all theme states', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('dark', 'light'), // Theme states
        fc.constantFrom('background', 'accent', 'text', 'semantic'), // Color categories
        (theme, category) => {
          // Test that dark mode colors are consistently applied
          if (theme === 'dark') {
            // Background colors should be near-black/charcoal
            if (category === 'background') {
              expect(colors.black).toBe('#0A0A0B')
              expect(colors.charcoal).toBe('#1A1A1C')
            }
            
            // Primary accent should be medical green/teal
            if (category === 'accent') {
              expect(colors.green).toBe('#00D4AA')
              expect(colors.greenLight).toBe('#4ADE80')
            }
            
            // Text should be high contrast white
            if (category === 'text') {
              expect(colors.text).toBe('#FFFFFF')
              expect(colors.textSecondary).toBe('#A1A1AA')
            }
            
            // Semantic colors should use muted yellow/red
            if (category === 'semantic') {
              expect(colors.warning).toBe('#FCD34D') // Muted yellow
              expect(colors.error).toBe('#F87171')   // Muted red
            }
          }
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should validate color format consistency', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...Object.values(colors)),
        (color) => {
          // All colors should be valid hex format
          expect(color).toMatch(/^#[0-9A-F]{6}$/i)
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should ensure proper contrast ratios for accessibility', () => {
    const calculateLuminance = (hex: string): number => {
      const rgb = hex.substring(1).match(/.{2}/g)?.map(x => parseInt(x, 16) / 255) || [0, 0, 0]
      const [r, g, b] = rgb.map(c => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4))
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }

    const getContrastRatio = (color1: string, color2: string): number => {
      const l1 = calculateLuminance(color1)
      const l2 = calculateLuminance(color2)
      const lighter = Math.max(l1, l2)
      const darker = Math.min(l1, l2)
      return (lighter + 0.05) / (darker + 0.05)
    }

    fc.assert(
      fc.property(
        fc.constantFrom(colors.text, colors.textSecondary),
        fc.constantFrom(colors.black, colors.charcoal),
        (textColor, backgroundColor) => {
          const contrastRatio = getContrastRatio(textColor, backgroundColor)
          
          // WCAG AA standard: 4.5:1 for normal text, 3:1 for large text
          if (textColor === colors.text) {
            expect(contrastRatio).toBeGreaterThanOrEqual(4.5)
          } else {
            expect(contrastRatio).toBeGreaterThanOrEqual(3.0)
          }
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})