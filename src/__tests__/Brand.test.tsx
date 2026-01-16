import { render, screen } from '@/utils/test-utils'
import Brand from '@/components/Brand'

describe('Brand Component', () => {
  test('explains the name meaning of Nitro + Sense', () => {
    render(<Brand />)
    
    // Should have name explanation section
    expect(screen.getByText('The Name: Airly Warning')).toBeInTheDocument()
    
    // Should explain "Nitro" component
    expect(screen.getByText('Nitro')).toBeInTheDocument()
    expect(screen.getByText(/References.*Nitric Oxide.*NO/i)).toBeInTheDocument()
    expect(screen.getByText(/FeNO.*Fractional exhaled Nitric Oxide/i)).toBeInTheDocument()
    expect(screen.getByText(/clinically validated indicator/i)).toBeInTheDocument()
    
    // Should explain "Sense" component
    expect(screen.getByText('Sense')).toBeInTheDocument()
    expect(screen.getByText(/advanced.*sensing technology/i)).toBeInTheDocument()
    expect(screen.getByText(/intuitive insights/i)).toBeInTheDocument()
    expect(screen.getByText(/human sense of security/i)).toBeInTheDocument()
  })

  test('displays logo usage or appropriate placeholder', () => {
    render(<Brand />)
    
    // Should have logo concept/placeholder
    expect(screen.getByText('NS')).toBeInTheDocument() // Logo initials
    expect(screen.getByText('Airly Warning')).toBeInTheDocument() // Brand name
    expect(screen.getByText(/Logo Concept.*Breathing rhythm/i)).toBeInTheDocument()
    
    // Should have visual logo representation
    const logoContainer = document.querySelector('[class*="w-48 h-48"]')
    expect(logoContainer).toBeInTheDocument()
    expect(logoContainer).toHaveClass('rounded-full')
  })

  test('demonstrates the color system and its medical meaning', () => {
    render(<Brand />)
    
    // Should have color system section
    expect(screen.getByText('Color System & Medical Meaning')).toBeInTheDocument()
    
    // Should explain all brand colors
    expect(screen.getByText('Medical Green')).toBeInTheDocument()
    expect(screen.getByText('Charcoal Black')).toBeInTheDocument()
    expect(screen.getByText('Caution Yellow')).toBeInTheDocument()
    expect(screen.getByText('Critical Red')).toBeInTheDocument()
    
    // Should provide medical significance for each color
    expect(screen.getByText(/Associated with healing, safety/i)).toBeInTheDocument()
    expect(screen.getByText(/Professional medical equipment aesthetic/i)).toBeInTheDocument()
    expect(screen.getByText(/Universal warning color in medical contexts/i)).toBeInTheDocument()
    expect(screen.getByText(/Emergency medical color/i)).toBeInTheDocument()
    
    // Should have color swatches
    const colorSwatches = document.querySelectorAll('[class*="w-16 h-16"]')
    expect(colorSwatches.length).toBeGreaterThanOrEqual(4) // One for each color
  })

  test('communicates brand voice as calm, medical, reassuring, and precise', () => {
    render(<Brand />)
    
    // Should have brand voice section
    expect(screen.getByText('Brand Voice: Clinical Yet Human')).toBeInTheDocument()
    
    // Should list all four voice attributes
    expect(screen.getByText('Calm')).toBeInTheDocument()
    expect(screen.getByText('Medical')).toBeInTheDocument()
    expect(screen.getByText('Reassuring')).toBeInTheDocument()
    expect(screen.getByText('Precise')).toBeInTheDocument()
    
    // Should provide descriptions for each attribute
    expect(screen.getByText(/reassuring confidence of a trusted medical professional/i)).toBeInTheDocument()
    expect(screen.getByText(/precise, clinical terminology while remaining accessible/i)).toBeInTheDocument()
    expect(screen.getByText(/comfort and confidence in uncertain health situations/i)).toBeInTheDocument()
    expect(screen.getByText(/scientific accuracy and measurable specificity/i)).toBeInTheDocument()
  })

  test('balances clinical professionalism with human approachability', () => {
    render(<Brand />)
    
    // Should demonstrate balance in brand voice description
    expect(screen.getByText(/balances medical authority with human empathy/i)).toBeInTheDocument()
    expect(screen.getByText(/confidence of clinical expertise.*warmth of genuine care/i)).toBeInTheDocument()
    
    // Should provide examples that show this balance
    expect(screen.getByText(/Your breathing patterns show normal variation/i)).toBeInTheDocument()
    expect(screen.getByText(/We're monitoring your respiratory health around the clock/i)).toBeInTheDocument()
    
    // Should show what to avoid (overly clinical or casual)
    expect(screen.getByText(/Panic-inducing language, alarmist tone/i)).toBeInTheDocument()
    expect(screen.getByText(/Overly casual language, medical jargon without explanation/i)).toBeInTheDocument()
  })

  test('includes brand promise and positioning', () => {
    render(<Brand />)
    
    // Should have brand promise section
    expect(screen.getByText('Brand Promise')).toBeInTheDocument()
    
    // Should articulate the brand promise
    expect(screen.getByText(/transforms the anxiety of living with asthma/i)).toBeInTheDocument()
    expect(screen.getByText(/confidence of predictive health management/i)).toBeInTheDocument()
    
    // Should have memorable tagline
    expect(screen.getByText(/Breathe freely. Live fully. We've got you covered/i)).toBeInTheDocument()
    
    // Should emphasize prevention over reaction
    expect(screen.getByText(/don't just monitor.*we protect/i)).toBeInTheDocument()
    expect(screen.getByText(/don't just alert.*we prevent/i)).toBeInTheDocument()
  })

  test('provides examples and anti-examples for voice attributes', () => {
    render(<Brand />)
    
    // Should have example sections
    const exampleLabels = screen.getAllByText('Example:')
    expect(exampleLabels.length).toBe(4) // One for each voice attribute
    
    const avoidLabels = screen.getAllByText('Avoid:')
    expect(avoidLabels.length).toBe(4) // One for each voice attribute
    
    // Should provide specific examples
    expect(screen.getByText(/FeNO levels indicate reduced airway inflammation/i)).toBeInTheDocument()
    expect(screen.getByText(/15-minute early warning with 94% accuracy/i)).toBeInTheDocument()
    
    // Should provide specific anti-examples
    expect(screen.getByText(/Dismissive language, false promises/i)).toBeInTheDocument()
    expect(screen.getByText(/Vague claims, unmeasurable benefits/i)).toBeInTheDocument()
  })

  test('has proper semantic structure', () => {
    render(<Brand />)
    
    // Should have section with brand id
    const brandSection = document.getElementById('brand')
    expect(brandSection).toBeInTheDocument()
    expect(brandSection?.tagName).toBe('SECTION')
    
    // Should have proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1, name: /Brand Identity/i })
    expect(mainHeading).toBeInTheDocument()
    
    const subHeadings = screen.getAllByRole('heading', { level: 2 })
    expect(subHeadings.length).toBeGreaterThanOrEqual(4) // Name, Color, Voice, Promise
  })

  test('uses appropriate background and styling', () => {
    render(<Brand />)
    
    const brandSection = document.getElementById('brand')
    expect(brandSection).toHaveClass('bg-nitro-black') // Primary background
    
    // Should have visual elements with proper styling
    const colorCards = document.querySelectorAll('[class*="bg-nitro-charcoal/30"]')
    expect(colorCards.length).toBeGreaterThanOrEqual(4) // Color explanation cards
    
    const voiceCards = document.querySelectorAll('[class*="bg-nitro-charcoal/50"]')
    expect(voiceCards.length).toBeGreaterThanOrEqual(4) // Voice attribute cards
  })

  test('includes hex color codes for technical reference', () => {
    render(<Brand />)
    
    // Should display hex codes for brand colors
    expect(screen.getByText('#00D4AA')).toBeInTheDocument() // Medical green
    expect(screen.getByText('#0A0A0B')).toBeInTheDocument() // Charcoal black
    expect(screen.getByText('#FCD34D')).toBeInTheDocument() // Caution yellow
    expect(screen.getByText('#F87171')).toBeInTheDocument() // Critical red
  })

  test('demonstrates medical innovation tone rather than startup hype', () => {
    render(<Brand />)
    
    const content = document.body.textContent || ''
    
    // Should use medical and scientific language
    expect(content).toContain('clinical')
    expect(content).toContain('medical')
    expect(content).toContain('scientific')
    expect(content).toContain('precision')
    
    // Should avoid startup hype language
    expect(content).not.toMatch(/revolutionary|game-changing|disruptive|cutting-edge/i)
    expect(content).not.toMatch(/amazing|incredible|awesome|mind-blowing/i)
    
    // Should focus on patient outcomes and medical benefits
    expect(content).toContain('patient')
    expect(content).toContain('health')
    expect(content).toContain('respiratory')
    expect(content).toContain('clinical expertise')
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

    render(<Brand />)
    
    // Component should still render properly with reduced motion
    expect(screen.getByText('Brand Identity')).toBeInTheDocument()
    expect(screen.getByText('The Name: Airly Warning')).toBeInTheDocument()
    expect(screen.getByText('Brand Voice: Clinical Yet Human')).toBeInTheDocument()
  })
})