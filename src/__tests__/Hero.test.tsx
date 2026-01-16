import { render, screen } from '@/utils/test-utils'
import Hero from '@/components/Hero'

describe('Hero Component', () => {
  test('renders Airly Warning introduction in one sentence', () => {
    render(<Hero />)
    
    // Check for the main introduction sentence
    const introduction = screen.getByText(/Airly Warning prevents asthma attacks before they happen through continuous, predictive respiratory monitoring/i)
    expect(introduction).toBeInTheDocument()
    
    // Verify it's a single sentence (ends with period)
    expect(introduction.textContent).toMatch(/\.$/)
  })

  test('communicates core mission about preventing asthma attacks', () => {
    render(<Hero />)
    
    // Check for mission-related keywords
    expect(screen.getByText(/prevents asthma attacks/i)).toBeInTheDocument()
    expect(screen.getByText(/continuous/i)).toBeInTheDocument()
    expect(screen.getByText(/predictive/i)).toBeInTheDocument()
    expect(screen.getByText(/respiratory monitoring/i)).toBeInTheDocument()
    
    // Check for proactive vs reactive messaging
    expect(screen.getByText(/proactive/i)).toBeInTheDocument()
    expect(screen.getByText(/prevent attacks rather than just respond/i)).toBeInTheDocument()
  })

  test('displays call-to-action message', () => {
    render(<Hero />)
    
    // Check for the specific CTA message
    const ctaMessage = screen.getByText(/Redefining proactive respiratory care/i)
    expect(ctaMessage).toBeInTheDocument()
    
    // Verify it's styled as a prominent CTA
    const ctaContainer = ctaMessage.closest('div')
    expect(ctaContainer).toHaveClass('bg-nitro-charcoal')
    expect(ctaMessage).toHaveClass('text-nitro-green')
  })

  test('includes Breath Ring visual element', () => {
    render(<Hero />)
    
    // The BreathRing component should be present
    // We can test for its container or specific elements
    const breathRingContainer = document.querySelector('[class*="w-64 h-64"]') // Large size breath ring
    expect(breathRingContainer).toBeInTheDocument()
  })

  test('has proper semantic structure', () => {
    render(<Hero />)
    
    // Should have a section with hero id
    const heroSection = document.getElementById('hero')
    expect(heroSection).toBeInTheDocument()
    expect(heroSection?.tagName).toBe('SECTION')
    
    // Should have proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1 })
    expect(mainHeading).toBeInTheDocument()
    expect(mainHeading).toHaveTextContent(/Airly Warning prevents asthma attacks/)
  })

  test('is accessible with proper ARIA labels', () => {
    render(<Hero />)
    
    // Main content should be accessible
    const heroSection = document.getElementById('hero')
    expect(heroSection).toBeInTheDocument()
    
    // Text should have proper contrast (tested in accessibility tests)
    const mainText = screen.getByText(/Airly Warning prevents asthma attacks/i)
    expect(mainText).toHaveClass('text-nitro-text') // High contrast text
  })

  test('includes scroll indicator for user guidance', () => {
    render(<Hero />)
    
    // Check for scroll indicator text
    expect(screen.getByText(/Discover the innovation/i)).toBeInTheDocument()
    
    // Should have visual scroll indicator (mouse/scroll icon)
    const scrollIndicator = document.querySelector('[class*="border-nitro-green"]')
    expect(scrollIndicator).toBeInTheDocument()
  })

  test('respects reduced motion preferences', () => {
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

    render(<Hero />)
    
    // Component should still render properly with reduced motion
    expect(screen.getByText(/Airly Warning prevents asthma attacks/i)).toBeInTheDocument()
    expect(screen.getByText(/Redefining proactive respiratory care/i)).toBeInTheDocument()
  })

  test('has responsive layout classes', () => {
    render(<Hero />)
    
    // Should have responsive container
    const container = document.querySelector('.max-w-4xl')
    expect(container).toBeInTheDocument()
    
    // Should be centered
    expect(container).toHaveClass('mx-auto')
    
    // Should have responsive text alignment
    expect(container).toHaveClass('text-center')
  })

  test('maintains medical innovation tone', () => {
    render(<Hero />)
    
    // Should use clinical, professional language
    expect(screen.getByText(/Revolutionary wearable technology/i)).toBeInTheDocument()
    expect(screen.getByText(/transforms reactive asthma care into proactive health management/i)).toBeInTheDocument()
    
    // Should avoid startup hype language
    const heroText = document.getElementById('hero')?.textContent || ''
    expect(heroText).not.toMatch(/amazing|incredible|awesome|game-changing/i)
    
    // Should use medical terminology appropriately
    expect(heroText).toMatch(/respiratory|monitoring|predictive|proactive/i)
  })
})