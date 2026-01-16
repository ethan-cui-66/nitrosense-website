// Semantic HTML Structure Validator for Airly Warning Website

export interface SemanticValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
  score: number
  recommendations: string[]
}

export interface SemanticStructure {
  hasMainLandmark: boolean
  hasHeaderLandmark: boolean
  hasNavLandmark: boolean
  hasFooterLandmark: boolean
  headingHierarchy: number[]
  sectionsCount: number
  articlesCount: number
  asideCount: number
  listStructure: {
    orderedLists: number
    unorderedLists: number
    definitionLists: number
  }
  formStructure: {
    formsCount: number
    fieldsets: number
    legends: number
    labels: number
  }
  tableStructure: {
    tablesCount: number
    captions: number
    headers: number
  }
}

export class SemanticValidator {
  /**
   * Validates semantic HTML structure
   */
  validateSemanticStructure(html: string): SemanticValidationResult {
    const errors: string[] = []
    const warnings: string[] = []
    const recommendations: string[] = []
    let score = 100

    try {
      const structure = this.analyzeStructure(html)
      
      // Check for main landmark
      if (!structure.hasMainLandmark) {
        errors.push('Missing <main> landmark element')
        score -= 15
      }

      // Check heading hierarchy
      const headingIssues = this.validateHeadingHierarchy(structure.headingHierarchy)
      if (headingIssues.length > 0) {
        warnings.push(...headingIssues)
        score -= headingIssues.length * 5
      }

      // Check for proper sectioning
      if (structure.sectionsCount === 0 && html.length > 500) {
        warnings.push('Consider using <section> elements to structure content')
        score -= 5
      }

      // Check for semantic landmarks
      if (!structure.hasHeaderLandmark && html.includes('<header')) {
        recommendations.push('Use <header> element for page header content')
      }

      if (!structure.hasNavLandmark && (html.includes('nav') || html.includes('menu'))) {
        recommendations.push('Use <nav> element for navigation content')
      }

      if (!structure.hasFooterLandmark && html.includes('<footer')) {
        recommendations.push('Use <footer> element for page footer content')
      }

      // Check list structure
      const listIssues = this.validateListStructure(html)
      if (listIssues.length > 0) {
        warnings.push(...listIssues)
        score -= listIssues.length * 3
      }

      // Check form accessibility
      const formIssues = this.validateFormAccessibility(html)
      if (formIssues.length > 0) {
        warnings.push(...formIssues)
        score -= formIssues.length * 8
      }

      // Check table accessibility
      const tableIssues = this.validateTableAccessibility(html)
      if (tableIssues.length > 0) {
        warnings.push(...tableIssues)
        score -= tableIssues.length * 6
      }

      // Check for ARIA usage
      const ariaIssues = this.validateAriaUsage(html)
      if (ariaIssues.length > 0) {
        warnings.push(...ariaIssues)
        score -= ariaIssues.length * 4
      }

      // Ensure score doesn't go below 0
      score = Math.max(0, score)

      return {
        isValid: errors.length === 0,
        errors,
        warnings,
        score: Math.round(score),
        recommendations
      }
    } catch (error) {
      return {
        isValid: false,
        errors: [`Validation error: ${error instanceof Error ? error.message : 'Unknown error'}`],
        warnings: [],
        score: 0,
        recommendations: []
      }
    }
  }

  /**
   * Analyzes the semantic structure of HTML
   */
  private analyzeStructure(html: string): SemanticStructure {
    const structure: SemanticStructure = {
      hasMainLandmark: /<main[^>]*>/i.test(html),
      hasHeaderLandmark: /<header[^>]*>/i.test(html),
      hasNavLandmark: /<nav[^>]*>/i.test(html),
      hasFooterLandmark: /<footer[^>]*>/i.test(html),
      headingHierarchy: this.extractHeadingHierarchy(html),
      sectionsCount: (html.match(/<section[^>]*>/gi) || []).length,
      articlesCount: (html.match(/<article[^>]*>/gi) || []).length,
      asideCount: (html.match(/<aside[^>]*>/gi) || []).length,
      listStructure: {
        orderedLists: (html.match(/<ol[^>]*>/gi) || []).length,
        unorderedLists: (html.match(/<ul[^>]*>/gi) || []).length,
        definitionLists: (html.match(/<dl[^>]*>/gi) || []).length,
      },
      formStructure: {
        formsCount: (html.match(/<form[^>]*>/gi) || []).length,
        fieldsets: (html.match(/<fieldset[^>]*>/gi) || []).length,
        legends: (html.match(/<legend[^>]*>/gi) || []).length,
        labels: (html.match(/<label[^>]*>/gi) || []).length,
      },
      tableStructure: {
        tablesCount: (html.match(/<table[^>]*>/gi) || []).length,
        captions: (html.match(/<caption[^>]*>/gi) || []).length,
        headers: (html.match(/<th[^>]*>/gi) || []).length,
      }
    }

    return structure
  }

  /**
   * Extracts heading hierarchy from HTML
   */
  private extractHeadingHierarchy(html: string): number[] {
    const headingMatches = html.match(/<h[1-6][^>]*>/gi) || []
    return headingMatches.map(heading => {
      const level = heading.match(/<h([1-6])/i)
      return level ? parseInt(level[1]) : 0
    }).filter(level => level > 0)
  }

  /**
   * Validates heading hierarchy
   */
  private validateHeadingHierarchy(hierarchy: number[]): string[] {
    const issues: string[] = []

    if (hierarchy.length === 0) {
      return ['No headings found - consider adding headings for content structure']
    }

    // Check if starts with h1
    if (hierarchy[0] !== 1) {
      issues.push('Page should start with an <h1> element')
    }

    // Check for skipped levels
    for (let i = 1; i < hierarchy.length; i++) {
      const current = hierarchy[i]
      const previous = hierarchy[i - 1]
      
      if (current > previous + 1) {
        issues.push(`Heading level skipped: h${previous} followed by h${current}`)
      }
    }

    // Check for multiple h1s (warning, not error)
    const h1Count = hierarchy.filter(level => level === 1).length
    if (h1Count > 1) {
      issues.push(`Multiple h1 elements found (${h1Count}). Consider using only one h1 per page.`)
    }

    return issues
  }

  /**
   * Validates list structure
   */
  private validateListStructure(html: string): string[] {
    const issues: string[] = []

    // Check for orphaned list items
    const listItems = (html.match(/<li[^>]*>/gi) || []).length
    const lists = (html.match(/<[ou]l[^>]*>/gi) || []).length
    
    if (listItems > 0 && lists === 0) {
      issues.push('List items found without parent <ul> or <ol> elements')
    }

    // Check for empty lists
    const emptyListPattern = /<[ou]l[^>]*>\s*<\/[ou]l>/gi
    if (emptyListPattern.test(html)) {
      issues.push('Empty list elements found')
    }

    return issues
  }

  /**
   * Validates form accessibility
   */
  private validateFormAccessibility(html: string): string[] {
    const issues: string[] = []

    const inputs = (html.match(/<input[^>]*>/gi) || []).length
    const labels = (html.match(/<label[^>]*>/gi) || []).length
    const fieldsets = (html.match(/<fieldset[^>]*>/gi) || []).length
    const forms = (html.match(/<form[^>]*>/gi) || []).length

    if (inputs > 0) {
      // Check for labels
      if (labels === 0) {
        issues.push('Form inputs found without corresponding <label> elements')
      }

      // Check for fieldsets in complex forms
      if (inputs > 3 && fieldsets === 0) {
        issues.push('Complex forms should use <fieldset> and <legend> for grouping')
      }
    }

    // Check for form without action or method
    if (forms > 0) {
      const formsWithAction = (html.match(/<form[^>]*action=/gi) || []).length
      if (formsWithAction < forms) {
        issues.push('Forms should have explicit action attributes')
      }
    }

    return issues
  }

  /**
   * Validates table accessibility
   */
  private validateTableAccessibility(html: string): string[] {
    const issues: string[] = []

    const tables = (html.match(/<table[^>]*>/gi) || []).length
    const captions = (html.match(/<caption[^>]*>/gi) || []).length
    const headers = (html.match(/<th[^>]*>/gi) || []).length

    if (tables > 0) {
      // Check for captions
      if (captions === 0) {
        issues.push('Tables should have <caption> elements for accessibility')
      }

      // Check for header cells
      if (headers === 0) {
        issues.push('Tables should use <th> elements for header cells')
      }

      // Check for scope attributes on headers
      const headersWithScope = (html.match(/<th[^>]*scope=/gi) || []).length
      if (headers > 0 && headersWithScope === 0) {
        issues.push('Table headers should have scope attributes (row/col)')
      }
    }

    return issues
  }

  /**
   * Validates ARIA usage
   */
  private validateAriaUsage(html: string): string[] {
    const issues: string[] = []

    // Check for ARIA labels on interactive elements
    const buttons = (html.match(/<button[^>]*>/gi) || []).length
    const buttonsWithAria = (html.match(/<button[^>]*aria-label=/gi) || []).length
    
    if (buttons > buttonsWithAria && buttons > 2) {
      issues.push('Consider adding aria-label attributes to buttons for better accessibility')
    }

    // Check for ARIA landmarks
    const hasAriaMain = /aria-label="main"/i.test(html) || /role="main"/i.test(html)
    const hasMainElement = /<main[^>]*>/i.test(html)
    
    if (!hasMainElement && !hasAriaMain && html.length > 1000) {
      issues.push('Large content should have main landmark (either <main> or role="main")')
    }

    // Check for alt text on images
    const images = (html.match(/<img[^>]*>/gi) || []).length
    const imagesWithAlt = (html.match(/<img[^>]*alt=/gi) || []).length
    
    if (images > imagesWithAlt) {
      issues.push('All images should have alt attributes for accessibility')
    }

    return issues
  }

  /**
   * Generates accessibility recommendations
   */
  generateRecommendations(html: string): string[] {
    const recommendations: string[] = []

    // Check for skip links
    if (!html.includes('skip') && html.length > 2000) {
      recommendations.push('Consider adding skip navigation links for keyboard users')
    }

    // Check for focus management
    if (html.includes('modal') || html.includes('dialog')) {
      recommendations.push('Ensure proper focus management for modal dialogs')
    }

    // Check for color contrast
    if (html.includes('color:') || html.includes('background')) {
      recommendations.push('Verify color contrast ratios meet WCAG AA standards (4.5:1)')
    }

    // Check for responsive design
    if (!html.includes('viewport') && !html.includes('responsive')) {
      recommendations.push('Ensure responsive design for mobile accessibility')
    }

    return recommendations
  }
}

// Export singleton instance
export const semanticValidator = new SemanticValidator()