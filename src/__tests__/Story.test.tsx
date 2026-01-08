import { render, screen } from '@/utils/test-utils'
import Story from '@/components/Story'

describe('Story Component', () => {
  test('renders mission explanation in public-friendly language', () => {
    render(<Story />)
    
    // Check for mission section
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
    
    // Should explain the problem in accessible terms
    expect(screen.getByText(/300 million people worldwide/i)).toBeInTheDocument()
    expect(screen.getByText(/emergency room visits/i)).toBeInTheDocument()
    expect(screen.getByText(/lives lived in fear/i)).toBeInTheDocument()
    
    // Should explain the solution clearly
    expect(screen.getByText(/gift of time/i)).toBeInTheDocument()
    expect(screen.getByText(/preventive action/i)).toBeInTheDocument()
  })

  test('articulates vision for predictive asthma care', () => {
    render(<Story />)
    
    // Check for vision section
    expect(screen.getByText('Our Vision')).toBeInTheDocument()
    
    // Should describe the future state
    expect(screen.getByText(/asthma attacks become increasingly rare/i)).toBeInTheDocument()
    expect(screen.getByText(/predictable and preventable/i)).toBeInTheDocument()
    
    // Should paint a human picture
    expect(screen.getByText(/children can play freely/i)).toBeInTheDocument()
    expect(screen.getByText(/families can sleep peacefully/i)).toBeInTheDocument()
    
    // Should mention AI/technology appropriately
    expect(screen.getByText(/advanced AI/i)).toBeInTheDocument()
    expect(screen.getByText(/quietly watching over/i)).toBeInTheDocument()
  })

  test('communicates all four core values', () => {
    render(<Story />)
    
    // Check for values section
    expect(screen.getByText('Our Values')).toBeInTheDocument()
    
    // All four required values
    expect(screen.getByText('Preventative Medicine')).toBeInTheDocument()
    expect(screen.getByText('Accessibility')).toBeInTheDocument()
    expect(screen.getByText('Scientific Transparency')).toBeInTheDocument()
    expect(screen.getByText('Patient Empowerment')).toBeInTheDocument()
    
    // Check for meaningful descriptions
    expect(screen.getByText(/prevent problems before they occur/i)).toBeInTheDocument()
    expect(screen.getByText(/available to everyone/i)).toBeInTheDocument()
    expect(screen.getByText(/peer-reviewed science/i)).toBeInTheDocument()
    expect(screen.getByText(/power of prediction directly into the hands/i)).toBeInTheDocument()
  })

  test('presents story in human tone rather than corporate language', () => {
    render(<Story />)
    
    // Should use human-centered language
    expect(screen.getByText(/parent who can finally sleep/i)).toBeInTheDocument()
    expect(screen.getByText(/child who never has to miss/i)).toBeInTheDocument()
    expect(screen.getByText(/giving people their lives back/i)).toBeInTheDocument()
    
    // Should avoid corporate buzzwords
    const content = document.body.textContent || ''
    expect(content).not.toMatch(/synergy|leverage|paradigm shift|best-in-class/i)
  })

  test('makes mission accessible to general public understanding', () => {
    render(<Story />)
    
    // Should explain medical concepts clearly
    expect(screen.getByText(/biomarkers that precede asthma attacks/i)).toBeInTheDocument()
    expect(screen.getByText(/rescue medications/i)).toBeInTheDocument()
    
    // Should use accessible metaphors
    expect(screen.getByText(/gift of time/i)).toBeInTheDocument()
    expect(screen.getByText(/changes this equation entirely/i)).toBeInTheDocument()
    
    // Should provide context for statistics
    expect(screen.getByText(/over 300 million people worldwide/i)).toBeInTheDocument()
  })

  test('has proper semantic structure', () => {
    render(<Story />)
    
    // Should have section with story id
    const storySection = document.getElementById('story')
    expect(storySection).toBeInTheDocument()
    expect(storySection?.tagName).toBe('SECTION')
    
    // Should have proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1, name: /Our Story/i })
    expect(mainHeading).toBeInTheDocument()
    
    const subHeadings = screen.getAllByRole('heading', { level: 2 })
    expect(subHeadings.length).toBeGreaterThanOrEqual(3) // Mission, Vision, Values
  })

  test('includes visual elements and proper styling', () => {
    render(<Story />)
    
    // Should have value cards with proper styling
    const valueCards = document.querySelectorAll('[class*="bg-nitro-black/30"]')
    expect(valueCards.length).toBe(4)
    
    // Each card should have hover effects
    valueCards.forEach(card => {
      expect(card).toHaveClass('hover:border-nitro-green/20')
    })
    
    // Should have human impact statement with special styling
    const impactStatement = screen.getByText(/This is about more than technology/i)
    expect(impactStatement).toBeInTheDocument()
    
    const impactContainer = impactStatement.closest('div')
    expect(impactContainer).toHaveClass('bg-gradient-to-r')
  })

  test('uses appropriate background and spacing', () => {
    render(<Story />)
    
    const storySection = document.getElementById('story')
    expect(storySection).toHaveClass('bg-nitro-charcoal') // Secondary background
    
    // Should have proper padding
    expect(storySection).toHaveClass('py-20', 'lg:py-32') // XL padding
  })

  test('includes icons for visual appeal', () => {
    render(<Story />)
    
    // Should have emoji icons for each value
    const content = document.body.textContent || ''
    const emojiPattern = /[\u{1F300}-\u{1F9FF}]/u
    expect(emojiPattern.test(content)).toBe(true)
    
    // Should have at least 4 emojis (one per value)
    const emojiMatches = content.match(/[\u{1F300}-\u{1F9FF}]/gu)
    expect(emojiMatches?.length).toBeGreaterThanOrEqual(4)
  })

  test('respects animation preferences', () => {
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

    render(<Story />)
    
    // Component should still render properly with reduced motion
    expect(screen.getByText('Our Mission')).toBeInTheDocument()
    expect(screen.getByText('Our Vision')).toBeInTheDocument()
    expect(screen.getByText('Our Values')).toBeInTheDocument()
  })
})