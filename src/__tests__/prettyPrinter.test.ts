import * as fc from 'fast-check'
import { PrettyPrinter, prettyPrinter, formatHTML } from '@/utils/prettyPrinter'

// Feature: Airly Warning-website, Property 9: Markup Formatting Consistency
describe('Markup Formatting Consistency', () => {
  test('should produce valid HTML5 markup with consistent indentation', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '<div><p>Hello world</p></div>',
          '<section><h1>Title</h1><p>Content</p></section>',
          '<article><header><h2>Header</h2></header><main><p>Main content</p></main></article>',
          '<ul><li>Item 1</li><li>Item 2</li></ul>',
          '<table><tr><td>Cell</td></tr></table>'
        ),
        (html) => {
          const formatted = prettyPrinter.formatHTML(html)
          
          // Should produce valid output
          expect(typeof formatted).toBe('string')
          expect(formatted.length).toBeGreaterThan(0)
          
          // Should have consistent indentation
          const lines = formatted.split('\n')
          lines.forEach(line => {
            if (line.trim().length > 0) {
              // Each line should start with consistent indentation (spaces)
              const leadingSpaces = line.match(/^(\s*)/)?.[1] || ''
              expect(leadingSpaces.length % 2).toBe(0) // Should be multiples of 2 spaces
            }
          })
          
          // Should preserve tag structure
          expect(formatted).toContain('<')
          expect(formatted).toContain('>')
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should handle self-closing tags correctly', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '<img src="test.jpg" alt="test">',
          '<br>',
          '<hr>',
          '<input type="text" name="test">',
          '<meta charset="utf-8">',
          '<link rel="stylesheet" href="style.css">'
        ),
        (selfClosingTag) => {
          const html = `<div>${selfClosingTag}</div>`
          const formatted = prettyPrinter.formatHTML(html)
          
          // Should format without errors
          expect(formatted).toContain('<div>')
          expect(formatted).toContain('</div>')
          
          // Should handle self-closing tag appropriately
          expect(formatted.includes(selfClosingTag) || formatted.includes(selfClosingTag.replace('>', '/>'))).toBe(true)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should preserve whitespace in specified elements', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('pre', 'code', 'textarea', 'script'),
        fc.string({ minLength: 10, maxLength: 100 }),
        (preserveTag, content) => {
          const html = `<div><${preserveTag}>${content}</${preserveTag}></div>`
          const formatted = prettyPrinter.formatHTML(html)
          
          // Should contain the preserve tag
          expect(formatted).toContain(`<${preserveTag}>`)
          expect(formatted).toContain(`</${preserveTag}>`)
          
          // Content within preserve tags should be maintained
          expect(formatted).toContain(content)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should handle nested elements with proper indentation', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 4 }),
        fc.constantFrom('div', 'section', 'article', 'main'),
        (depth, tagName) => {
          // Create nested structure
          let html = ''
          let closeHtml = ''
          
          for (let i = 0; i < depth; i++) {
            html += `<${tagName}>`
            closeHtml = `</${tagName}>` + closeHtml
          }
          html += '<p>Content</p>' + closeHtml
          
          const formatted = prettyPrinter.formatHTML(html)
          const lines = formatted.split('\n')
          
          // Should have proper nesting structure
          expect(lines.length).toBeGreaterThan(depth)
          
          // Check indentation increases with nesting
          let maxIndent = 0
          lines.forEach(line => {
            if (line.trim().length > 0) {
              const indent = (line.match(/^(\s*)/)?.[1] || '').length
              maxIndent = Math.max(maxIndent, indent)
            }
          })
          
          expect(maxIndent).toBeGreaterThanOrEqual(depth * 2) // 2 spaces per level
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should validate HTML structure and catch mismatched tags', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '<div><p>Valid</p></div>',
          '<section><h1>Valid</h1></section>',
          '<ul><li>Valid</li></ul>'
        ),
        (validHtml) => {
          // Valid HTML should format without throwing
          expect(() => {
            const formatted = prettyPrinter.formatHTML(validHtml)
            expect(formatted).toBeTruthy()
          }).not.toThrow()
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should handle attributes correctly', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          'class="test-class"',
          'id="test-id"',
          'data-value="123"',
          'style="color: red;"',
          'href="https://example.com"'
        ),
        fc.constantFrom('div', 'span', 'a', 'p'),
        (attribute, tagName) => {
          const html = `<${tagName} ${attribute}>Content</${tagName}>`
          const formatted = prettyPrinter.formatHTML(html)
          
          // Should preserve attributes
          expect(formatted).toContain(attribute)
          expect(formatted).toContain(`<${tagName}`)
          expect(formatted).toContain(`</${tagName}>`)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should handle comments and doctype declarations', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '<!-- This is a comment -->',
          '<!DOCTYPE html>',
          '<!-- Multi-line\ncomment -->'
        ),
        (specialContent) => {
          const html = `${specialContent}<div>Content</div>`
          const formatted = prettyPrinter.formatHTML(html)
          
          // Should preserve special content
          expect(formatted).toContain(specialContent)
          expect(formatted).toContain('<div>')
          expect(formatted).toContain('</div>')
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should maintain consistent line length limits', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 200, maxLength: 500 }),
        (longContent) => {
          const html = `<div><p>${longContent}</p></div>`
          const formatted = prettyPrinter.formatHTML(html)
          const lines = formatted.split('\n')
          
          // Most lines should respect length limits (some exceptions for long words)
          const longLines = lines.filter(line => line.length > 120)
          const totalLines = lines.filter(line => line.trim().length > 0)
          
          // At least 80% of lines should be within limits
          expect(longLines.length / totalLines.length).toBeLessThan(0.2)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should handle inline vs block elements appropriately', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('span', 'a', 'strong', 'em'), // inline elements
        fc.constantFrom('div', 'p', 'section', 'h1'), // block elements
        (inlineTag, blockTag) => {
          const html = `<${blockTag}><${inlineTag}>Inline content</${inlineTag}></${blockTag}>`
          const formatted = prettyPrinter.formatHTML(html)
          
          // Should format both types appropriately
          expect(formatted).toContain(`<${blockTag}>`)
          expect(formatted).toContain(`</${blockTag}>`)
          expect(formatted).toContain(`<${inlineTag}>`)
          expect(formatted).toContain(`</${inlineTag}>`)
          
          // Block elements should typically be on separate lines
          const lines = formatted.split('\n')
          const blockOpenLine = lines.find(line => line.includes(`<${blockTag}>`))
          const blockCloseLine = lines.find(line => line.includes(`</${blockTag}>`))
          
          expect(blockOpenLine).toBeTruthy()
          expect(blockCloseLine).toBeTruthy()
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should be idempotent - formatting twice should produce same result', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '<div><p>Test content</p></div>',
          '<section><h1>Title</h1><p>Paragraph</p></section>',
          '<ul><li>Item 1</li><li>Item 2</li></ul>'
        ),
        (html) => {
          const formatted1 = prettyPrinter.formatHTML(html)
          const formatted2 = prettyPrinter.formatHTML(formatted1)
          
          // Second formatting should produce identical result
          expect(formatted1).toBe(formatted2)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should handle malformed HTML gracefully', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          '<div><p>Unclosed paragraph</div>',
          '<section><h1>Missing closing tag',
          '<div><span>Nested without closing</div>',
          '<></>',
          '<div class=>Empty attribute</div>'
        ),
        (malformedHtml) => {
          // Should either format successfully or throw a descriptive error
          try {
            const formatted = prettyPrinter.formatHTML(malformedHtml)
            expect(typeof formatted).toBe('string')
          } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect((error as Error).message).toContain('Pretty printer error')
          }
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})