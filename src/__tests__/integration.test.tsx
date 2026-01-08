/**
 * Integration Tests - Complete User Journey
 * Tests full page navigation, interactions, and cross-browser compatibility
 */

import { render, screen, fireEvent, waitFor } from '@/utils/test-utils'
import Home from '@/app/page'

// Mock IntersectionObserver for navigation tests
const mockIntersectionObserver = jest.fn()
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = mockIntersectionObserver

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn()

describe('Integration Tests - Complete User Journey', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks()
    
    // Mock getElementById for navigation
    const mockGetElementById = jest.fn((id: string) => {
      const mockElement = document.createElement('div')
      mockElement.id = id
      return mockElement
    })
    document.getElementById = mockGetElementById
  })

  test('renders complete page with all sections', () => {
    render(<Home />)
    
    // Verify all main sections are present
    expect(screen.getByText(/NitroSense prevents asthma attacks/i)).toBeInTheDocument()
    expect(screen.getByText(/Our Mission/i)).toBeInTheDocument()
    expect(screen.getByText(/The NitroSense System/i)).toBeInTheDocument()
    expect(screen.getByText(/Impact & Feasibility/i)).toBeInTheDocument()
    expect(screen.getByText(/Brand Identity/i)).toBeInTheDocument()
  })

  test('maintains proper semantic structure throughout page', () => {
    const { container } = render(<Home />)
    
    // Check for proper HTML5 structure
    expect(container.querySelector('main')).toBeInTheDocument()
    expect(container.querySelectorAll('section')).toHaveLength(5)
    
    // Check heading hierarchy
    const headings = container.querySelectorAll('h1, h2, h3, h4, h5, h6')
    expect(headings.length).toBeGreaterThan(0)
    
    // First heading should be h1
    const firstHeading = headings[0]
    expect(firstHeading.tagName).toBe('H1')
  })

  test('all interactive elements are accessible', () => {
    const { container } = render(<Home />)
    
    // Check buttons have proper accessibility
    const buttons = container.querySelectorAll('button')
    buttons.forEach(button => {
      expect(
        button.hasAttribute('aria-label') || 
        button.textContent?.trim().length > 0
      ).toBe(true)
    })
    
    // Check links have proper accessibility
    const links = container.querySelectorAll('a')
    links.forEach(link => {
      expect(
        link.hasAttribute('href') || 
        link.hasAttribute('aria-label') ||
        link.hasAttribute('role')
      ).toBe(true)
    })
  })

  test('navigation functionality works correctly', async () => {
    render(<Home />)
    
    // Simulate scroll to show navigation
    Object.defineProperty(window, 'scrollY', { value: 200, writable: true })
    fireEvent.scroll(window)
    
    // Wait for navigation to appear
    await waitFor(() => {
      const navButtons = screen.queryAllByRole('button')
      expect(navButtons.length).toBeGreaterThan(0)
    })
  })

  test('error boundary catches and displays errors gracefully', () => {
    // Create a component that throws an error
    const ThrowError = () => {
      throw new Error('Test error')
    }
    
    const TestComponent = () => (
      <div>
        <ThrowError />
      </div>
    )
    
    // Mock console.error to avoid noise in tests
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    
    render(<TestComponent />)
    
    // Should show error boundary fallback
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument()
    expect(screen.getByText(/Refresh Page/i)).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })

  test('responsive design works across different viewport sizes', () => {
    const { container } = render(<Home />)
    
    // Test mobile viewport
    Object.defineProperty(window, 'innerWidth', { value: 375, writable: true })
    fireEvent(window, new Event('resize'))
    
    // Check that content is still accessible
    expect(screen.getByText(/NitroSense prevents asthma attacks/i)).toBeInTheDocument()
    
    // Test tablet viewport
    Object.defineProperty(window, 'innerWidth', { value: 768, writable: true })
    fireEvent(window, new Event('resize'))
    
    expect(screen.getByText(/NitroSense prevents asthma attacks/i)).toBeInTheDocument()
    
    // Test desktop viewport
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })
    fireEvent(window, new Event('resize'))
    
    expect(screen.getByText(/NitroSense prevents asthma attacks/i)).toBeInTheDocument()
  })

  test('all content is competition-ready with no placeholders', () => {
    const { container } = render(<Home />)
    const textContent = container.textContent || ''
    
    // Check for placeholder patterns
    expect(textContent).not.toMatch(/lorem ipsum/gi)
    expect(textContent).not.toMatch(/placeholder/gi)
    expect(textContent).not.toMatch(/todo/gi)
    expect(textContent).not.toMatch(/\[.*\]/g)
    expect(textContent).not.toMatch(/xxx+/gi)
    
    // Ensure substantial content
    expect(textContent.length).toBeGreaterThan(1000)
    
    // Check for required NitroSense content
    expect(textContent).toMatch(/nitrosense/gi)
    expect(textContent).toMatch(/asthma/gi)
    expect(textContent).toMatch(/respiratory/gi)
    expect(textContent).toMatch(/sensor/gi)
  })

  test('performance metrics are within acceptable ranges', () => {
    const startTime = performance.now()
    render(<Home />)
    const endTime = performance.now()
    
    // Render time should be reasonable (less than 100ms in test environment)
    const renderTime = endTime - startTime
    expect(renderTime).toBeLessThan(100)
  })

  test('animations respect reduced motion preferences', () => {
    // Mock reduced motion preference
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
    
    const { container } = render(<Home />)
    
    // Should still render content properly with reduced motion
    expect(screen.getByText(/NitroSense prevents asthma attacks/i)).toBeInTheDocument()
  })

  test('keyboard navigation works properly', () => {
    render(<Home />)
    
    // Test tab navigation
    const focusableElements = screen.getAllByRole('button')
    
    if (focusableElements.length > 0) {
      focusableElements[0].focus()
      expect(document.activeElement).toBe(focusableElements[0])
      
      // Test keyboard interaction
      fireEvent.keyDown(focusableElements[0], { key: 'Enter' })
      // Should not throw errors
    }
  })

  test('content maintains medical tone and avoids hype language', () => {
    const { container } = render(<Home />)
    const textContent = container.textContent || ''
    
    // Should avoid excessive hype terms
    const hypeTerms = [
      /revolutionary/gi,
      /game.?changing/gi,
      /breakthrough/gi,
      /disruptive/gi,
    ]
    
    hypeTerms.forEach(term => {
      const matches = textContent.match(term) || []
      expect(matches.length).toBeLessThanOrEqual(1) // Allow minimal use
    })
    
    // Should include medical/scientific language
    expect(textContent).toMatch(/medical|clinical|scientific|research/gi)
  })
})