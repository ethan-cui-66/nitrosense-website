// Pretty Printer for HTML5 Markup Formatting

export interface FormattingOptions {
  indentSize: number
  indentChar: string
  maxLineLength: number
  preserveWhitespace: string[]
  selfClosingTags: string[]
  blockElements: string[]
  inlineElements: string[]
}

const defaultOptions: FormattingOptions = {
  indentSize: 2,
  indentChar: ' ',
  maxLineLength: 120,
  preserveWhitespace: ['pre', 'code', 'textarea', 'script', 'style'],
  selfClosingTags: [
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr'
  ],
  blockElements: [
    'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'section', 'article',
    'header', 'footer', 'nav', 'main', 'aside', 'ul', 'ol', 'li', 'dl',
    'dt', 'dd', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th',
    'form', 'fieldset', 'legend', 'blockquote', 'pre', 'address'
  ],
  inlineElements: [
    'a', 'span', 'strong', 'em', 'b', 'i', 'u', 'small', 'sub', 'sup',
    'code', 'kbd', 'samp', 'var', 'time', 'mark', 'del', 'ins', 'q',
    'cite', 'abbr', 'dfn', 'data'
  ]
}

export class PrettyPrinter {
  private options: FormattingOptions

  constructor(options: Partial<FormattingOptions> = {}) {
    this.options = { ...defaultOptions, ...options }
  }

  /**
   * Formats HTML markup with consistent indentation and structure
   */
  formatHTML(html: string): string {
    try {
      // Clean up the input HTML
      const cleanedHTML = this.cleanHTML(html)
      
      // Parse and format
      const formatted = this.formatMarkup(cleanedHTML)
      
      // Validate the output
      this.validateHTML(formatted)
      
      return formatted
    } catch (error) {
      throw new Error(`Pretty printer error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Formats React JSX markup
   */
  formatJSX(jsx: string): string {
    try {
      // JSX-specific formatting (similar to HTML but with some differences)
      const cleanedJSX = this.cleanJSX(jsx)
      const formatted = this.formatMarkup(cleanedJSX, true)
      
      return formatted
    } catch (error) {
      throw new Error(`JSX formatter error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  /**
   * Main markup formatting logic
   */
  private formatMarkup(markup: string, isJSX: boolean = false): string {
    const lines: string[] = []
    let currentIndent = 0
    let inPreserveWhitespace = false
    let preserveTag = ''

    // Tokenize the markup
    const tokens = this.tokenize(markup)

    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]

      if (token.type === 'opening-tag' || token.type === 'self-closing-tag') {
        const tagName = this.extractTagName(token.content)
        
        // Check if we're entering a whitespace-preserving element
        if (this.options.preserveWhitespace.includes(tagName)) {
          inPreserveWhitespace = true
          preserveTag = tagName
        }

        // Add the opening tag with proper indentation
        if (this.options.blockElements.includes(tagName)) {
          lines.push(this.indent(currentIndent) + token.content)
          if (token.type === 'opening-tag') {
            currentIndent++
          }
        } else {
          // Inline element - might stay on same line
          if (lines.length === 0) {
            lines.push(this.indent(currentIndent) + token.content)
          } else {
            const lastLine = lines[lines.length - 1]
            if (lastLine.trim().length + token.content.length < this.options.maxLineLength) {
              lines[lines.length - 1] = lastLine + token.content
            } else {
              lines.push(this.indent(currentIndent) + token.content)
            }
          }
        }
      } else if (token.type === 'closing-tag') {
        const tagName = this.extractTagName(token.content)
        
        // Check if we're exiting a whitespace-preserving element
        if (preserveTag === tagName) {
          inPreserveWhitespace = false
          preserveTag = ''
        }

        if (this.options.blockElements.includes(tagName)) {
          currentIndent--
          lines.push(this.indent(currentIndent) + token.content)
        } else {
          // Inline closing tag
          if (lines.length > 0) {
            const lastLine = lines[lines.length - 1]
            if (lastLine.trim().length + token.content.length < this.options.maxLineLength) {
              lines[lines.length - 1] = lastLine + token.content
            } else {
              lines.push(this.indent(currentIndent) + token.content)
            }
          }
        }
      } else if (token.type === 'text') {
        if (inPreserveWhitespace) {
          // Preserve whitespace exactly as is
          lines.push(token.content)
        } else {
          // Format text content
          const trimmedText = token.content.trim()
          if (trimmedText) {
            if (lines.length > 0 && !this.endsWithBlockElement(lines[lines.length - 1])) {
              // Continue on same line if possible
              const lastLine = lines[lines.length - 1]
              if (lastLine.length + trimmedText.length < this.options.maxLineLength) {
                lines[lines.length - 1] = lastLine + trimmedText
              } else {
                lines.push(this.indent(currentIndent) + trimmedText)
              }
            } else {
              lines.push(this.indent(currentIndent) + trimmedText)
            }
          }
        }
      } else if (token.type === 'comment') {
        lines.push(this.indent(currentIndent) + token.content)
      } else if (token.type === 'doctype') {
        lines.push(token.content)
      }
    }

    return lines.join('\n')
  }

  /**
   * Tokenizes markup into manageable pieces
   */
  private tokenize(markup: string): Array<{type: string, content: string}> {
    const tokens: Array<{type: string, content: string}> = []
    const regex = /(<\/?[^>]+>|<!--[\s\S]*?-->|<!DOCTYPE[^>]*>)/gi
    let lastIndex = 0
    let match

    while ((match = regex.exec(markup)) !== null) {
      // Add text content before the tag
      if (match.index > lastIndex) {
        const textContent = markup.slice(lastIndex, match.index)
        if (textContent.trim()) {
          tokens.push({ type: 'text', content: textContent })
        }
      }

      const tag = match[0]
      
      if (tag.startsWith('<!--')) {
        tokens.push({ type: 'comment', content: tag })
      } else if (tag.startsWith('<!DOCTYPE')) {
        tokens.push({ type: 'doctype', content: tag })
      } else if (tag.startsWith('</')) {
        tokens.push({ type: 'closing-tag', content: tag })
      } else if (tag.endsWith('/>') || this.isSelfClosingTag(tag)) {
        tokens.push({ type: 'self-closing-tag', content: tag })
      } else {
        tokens.push({ type: 'opening-tag', content: tag })
      }

      lastIndex = regex.lastIndex
    }

    // Add remaining text content
    if (lastIndex < markup.length) {
      const textContent = markup.slice(lastIndex)
      if (textContent.trim()) {
        tokens.push({ type: 'text', content: textContent })
      }
    }

    return tokens
  }

  /**
   * Extracts tag name from tag string
   */
  private extractTagName(tag: string): string {
    const match = tag.match(/<\/?([a-zA-Z][a-zA-Z0-9]*)/i)
    return match ? match[1].toLowerCase() : ''
  }

  /**
   * Checks if tag is self-closing
   */
  private isSelfClosingTag(tag: string): boolean {
    const tagName = this.extractTagName(tag)
    return this.options.selfClosingTags.includes(tagName)
  }

  /**
   * Creates indentation string
   */
  private indent(level: number): string {
    return this.options.indentChar.repeat(level * this.options.indentSize)
  }

  /**
   * Checks if line ends with a block element
   */
  private endsWithBlockElement(line: string): boolean {
    const trimmed = line.trim()
    if (trimmed.endsWith('>')) {
      const tagName = this.extractTagName(trimmed)
      return this.options.blockElements.includes(tagName)
    }
    return false
  }

  /**
   * Cleans HTML input
   */
  private cleanHTML(html: string): string {
    return html
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .trim()
  }

  /**
   * Cleans JSX input
   */
  private cleanJSX(jsx: string): string {
    return jsx
      .replace(/\s+/g, ' ') // Normalize whitespace
      .replace(/>\s+</g, '><') // Remove whitespace between tags
      .replace(/className=/g, 'class=') // Convert JSX className to HTML class for processing
      .trim()
  }

  /**
   * Validates HTML structure
   */
  private validateHTML(html: string): void {
    const openTags: string[] = []
    const tokens = this.tokenize(html)

    for (const token of tokens) {
      if (token.type === 'opening-tag') {
        const tagName = this.extractTagName(token.content)
        if (!this.options.selfClosingTags.includes(tagName)) {
          openTags.push(tagName)
        }
      } else if (token.type === 'closing-tag') {
        const tagName = this.extractTagName(token.content)
        const lastOpenTag = openTags.pop()
        if (lastOpenTag !== tagName) {
          throw new Error(`Mismatched tags: expected </${lastOpenTag}>, found </${tagName}>`)
        }
      }
    }

    if (openTags.length > 0) {
      throw new Error(`Unclosed tags: ${openTags.join(', ')}`)
    }
  }

  /**
   * Formats attributes within tags
   */
  formatAttributes(tag: string): string {
    // Simple attribute formatting - could be enhanced
    return tag
      .replace(/\s+/g, ' ')
      .replace(/=\s*"/g, '="')
      .replace(/"\s+/g, '" ')
      .trim()
  }

  /**
   * Minifies HTML by removing unnecessary whitespace
   */
  minifyHTML(html: string): string {
    return html
      .replace(/\s+/g, ' ')
      .replace(/>\s+</g, '><')
      .replace(/\s+>/g, '>')
      .replace(/<\s+/g, '<')
      .trim()
  }

  /**
   * Validates that the formatted output is valid HTML5
   */
  isValidHTML5(html: string): boolean {
    try {
      this.validateHTML(html)
      
      // Additional HTML5 validation checks
      const hasDoctype = html.toLowerCase().includes('<!doctype html>')
      const hasHtmlTag = /<html[^>]*>/i.test(html)
      const hasHeadTag = /<head[^>]*>/i.test(html)
      const hasBodyTag = /<body[^>]*>/i.test(html)
      
      // For complete HTML documents, these should be present
      if (html.toLowerCase().includes('<!doctype')) {
        return hasDoctype && hasHtmlTag && hasHeadTag && hasBodyTag
      }
      
      // For HTML fragments, just check structure validity
      return true
    } catch {
      return false
    }
  }
}

// Export singleton instance
export const prettyPrinter = new PrettyPrinter()

// Utility functions
export function formatHTML(html: string, options?: Partial<FormattingOptions>): string {
  const printer = new PrettyPrinter(options)
  return printer.formatHTML(html)
}

export function formatJSX(jsx: string, options?: Partial<FormattingOptions>): string {
  const printer = new PrettyPrinter(options)
  return printer.formatJSX(jsx)
}

export function minifyHTML(html: string): string {
  const printer = new PrettyPrinter()
  return printer.minifyHTML(html)
}