import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

// Custom render function that includes providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { ...options })

export * from '@testing-library/react'
export { customRender as render }

// Accessibility testing utilities - simplified version without external dependencies
export const checkAccessibility = async (container: HTMLElement) => {
  // Basic accessibility checks without axe-core dependency
  const issues: string[] = []
  
  // Check for images without alt text
  const images = container.querySelectorAll('img')
  images.forEach((img, index) => {
    if (!img.getAttribute('alt') && img.getAttribute('alt') !== '') {
      issues.push(`Image ${index + 1} missing alt attribute`)
    }
  })
  
  // Check for buttons without accessible names
  const buttons = container.querySelectorAll('button')
  buttons.forEach((button, index) => {
    const hasText = button.textContent?.trim()
    const hasAriaLabel = button.getAttribute('aria-label')
    const hasAriaLabelledBy = button.getAttribute('aria-labelledby')
    
    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push(`Button ${index + 1} missing accessible name`)
    }
  })
  
  // Check for proper heading hierarchy
  const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
  let previousLevel = 0
  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1))
    if (index === 0 && level !== 1) {
      issues.push('First heading should be h1')
    } else if (level > previousLevel + 1) {
      issues.push(`Heading level skipped: ${heading.tagName} after h${previousLevel}`)
    }
    previousLevel = level
  })
  
  return {
    violations: issues.map(issue => ({ description: issue })),
    passes: issues.length === 0 ? [{ description: 'Basic accessibility checks passed' }] : []
  }
}

// Color contrast testing utility
export const getContrastRatio = (foreground: string, background: string): number => {
  // Simplified contrast ratio calculation for testing
  // In a real implementation, you'd use a proper color contrast library
  const getLuminance = (color: string): number => {
    // Convert hex to RGB and calculate luminance
    const hex = color.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16) / 255
    const g = parseInt(hex.substr(2, 2), 16) / 255
    const b = parseInt(hex.substr(4, 2), 16) / 255
    
    const sRGB = [r, g, b].map(c => {
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    })
    
    return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2]
  }
  
  const l1 = getLuminance(foreground)
  const l2 = getLuminance(background)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  
  return (lighter + 0.05) / (darker + 0.05)
}

// Viewport testing utilities
export const setViewport = (width: number, height: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: height,
  })
  window.dispatchEvent(new Event('resize'))
}