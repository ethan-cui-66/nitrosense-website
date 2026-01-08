import { render, screen } from '@/utils/test-utils'
import Impact from '@/components/Impact'

describe('Impact Component', () => {
  test('identifies who benefits including patients, caregivers, and clinicians', () => {
    render(<Impact />)
    
    // Check for "Who Benefits" section
    expect(screen.getByText('Who Benefits')).toBeInTheDocument()
    
    // All three beneficiary types should be present
    expect(screen.getByText('Patients')).toBeInTheDocument()
    expect(screen.getByText('Caregivers & Families')).toBeInTheDocument()
    expect(screen.getByText('Clinicians & Healthcare Providers')).toBeInTheDocument()
    
    // Should have meaningful benefits for each
    expect(screen.getByText(/Prevent attacks before symptoms appear/i)).toBeInTheDocument()
    expect(screen.getByText(/Peace of mind when loved ones are away/i)).toBeInTheDocument()
    expect(screen.getByText(/Objective data for better treatment decisions/i)).toBeInTheDocument()
  })

  test('explains why early detection saves lives and reduces hospitalizations', () => {
    render(<Impact />)
    
    // Should have early detection section
    expect(screen.getByText('The Power of Early Detection')).toBeInTheDocument()
    expect(screen.getByText(/Every minute matters in asthma care/i)).toBeInTheDocument()
    
    // Should include specific metrics
    expect(screen.getByText('70%')).toBeInTheDocument()
    expect(screen.getByText(/Reduction in emergency room visits/i)).toBeInTheDocument()
    
    expect(screen.getByText('$2,400')).toBeInTheDocument()
    expect(screen.getByText(/Average annual savings per patient/i)).toBeInTheDocument()
    
    expect(screen.getByText('15-30min')).toBeInTheDocument()
    expect(screen.getByText(/Early warning before symptoms/i)).toBeInTheDocument()
  })

  test('demonstrates how modular wearable design makes adoption easier', () => {
    render(<Impact />)
    
    // Should have adoption section
    expect(screen.getByText('Designed for Easy Adoption')).toBeInTheDocument()
    expect(screen.getByText(/modular approach removes traditional barriers/i)).toBeInTheDocument()
    
    // Should contrast traditional vs modular approaches
    expect(screen.getByText('Traditional Wearables')).toBeInTheDocument()
    expect(screen.getByText('NitroSense Modular Design')).toBeInTheDocument()
    
    // Should highlight modular advantages
    expect(screen.getByText(/Multiple wearing options/i)).toBeInTheDocument()
    expect(screen.getByText(/Adaptable to lifestyle preferences/i)).toBeInTheDocument()
    expect(screen.getByText(/High long-term compliance/i)).toBeInTheDocument()
    
    // Should address traditional problems
    expect(screen.getByText(/High abandonment rates/i)).toBeInTheDocument()
    expect(screen.getByText(/Stigmatizing medical appearance/i)).toBeInTheDocument()
  })

  test('includes "Why now?" section connecting to modern sensors and AI', () => {
    render(<Impact />)
    
    // Should have "Why Now?" section
    expect(screen.getByText('Why Now?')).toBeInTheDocument()
    expect(screen.getByText(/convergence of advanced sensors, AI maturation/i)).toBeInTheDocument()
    
    // Should mention technology readiness
    expect(screen.getByText('Technology Readiness')).toBeInTheDocument()
    expect(screen.getByText('Advanced Sensor Technology')).toBeInTheDocument()
    expect(screen.getByText('AI & Machine Learning')).toBeInTheDocument()
    
    // Should include readiness status
    expect(screen.getByText('Available Today')).toBeInTheDocument()
    expect(screen.getByText('Mature Technology')).toBeInTheDocument()
    expect(screen.getByText('Industry Standard')).toBeInTheDocument()
    
    // Should mention market timing
    expect(screen.getByText('Perfect Market Timing')).toBeInTheDocument()
    expect(screen.getByText(/COVID-19 accelerated adoption/i)).toBeInTheDocument()
    expect(screen.getByText(/FDA pathways.*well-established/i)).toBeInTheDocument()
  })

  test('presents feasibility arguments that judges can quickly understand', () => {
    render(<Impact />)
    
    // Should have clear feasibility messaging
    expect(screen.getByText(/technically possible.*urgently needed.*ready to deploy/i)).toBeInTheDocument()
    
    // Should present technology as mature and ready
    expect(screen.getByText(/Miniaturized sensors now capable/i)).toBeInTheDocument()
    expect(screen.getByText(/Proven algorithms for pattern recognition/i)).toBeInTheDocument()
    expect(screen.getByText(/Smartphones now have sufficient processing power/i)).toBeInTheDocument()
    
    // Should include specific timelines
    expect(screen.getByText('2020-2024')).toBeInTheDocument()
    expect(screen.getByText('2022-2024')).toBeInTheDocument()
    expect(screen.getByText('2021-Present')).toBeInTheDocument()
  })

  test('includes testimonials from different user types', () => {
    render(<Impact />)
    
    // Should have quotes from each beneficiary type
    expect(screen.getByText(/For the first time in years, I can exercise/i)).toBeInTheDocument()
    expect(screen.getByText('Sarah M., Beta Tester')).toBeInTheDocument()
    
    expect(screen.getByText(/I finally sleep through the night/i)).toBeInTheDocument()
    expect(screen.getByText('Michael R., Parent')).toBeInTheDocument()
    
    expect(screen.getByText(/This data transforms how we manage asthma/i)).toBeInTheDocument()
    expect(screen.getByText('Dr. Jennifer L., Pulmonologist')).toBeInTheDocument()
  })

  test('has proper semantic structure', () => {
    render(<Impact />)
    
    // Should have section with impact id
    const impactSection = document.getElementById('impact')
    expect(impactSection).toBeInTheDocument()
    expect(impactSection?.tagName).toBe('SECTION')
    
    // Should have proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1, name: /Impact & Feasibility/i })
    expect(mainHeading).toBeInTheDocument()
    
    const subHeadings = screen.getAllByRole('heading', { level: 2 })
    expect(subHeadings.length).toBeGreaterThanOrEqual(4) // Who Benefits, Early Detection, Adoption, Why Now
  })

  test('uses appropriate background and spacing', () => {
    render(<Impact />)
    
    const impactSection = document.getElementById('impact')
    expect(impactSection).toHaveClass('bg-nitro-charcoal') // Secondary background
    
    // Should have proper padding
    expect(impactSection).toHaveClass('py-20', 'lg:py-32') // XL padding
  })

  test('includes visual metrics and statistics', () => {
    render(<Impact />)
    
    // Should have prominent statistics
    const largeNumbers = document.querySelectorAll('[class*="text-4xl"]')
    expect(largeNumbers.length).toBeGreaterThanOrEqual(3) // 70%, $2,400, 15-30min
    
    // Should have status indicators
    expect(screen.getByText('Available Today')).toBeInTheDocument()
    expect(screen.getByText('Mature Technology')).toBeInTheDocument()
    expect(screen.getByText('Industry Standard')).toBeInTheDocument()
    expect(screen.getByText('Ubiquitous')).toBeInTheDocument()
  })

  test('maintains scannable format for judges', () => {
    render(<Impact />)
    
    // Should have clear section divisions
    expect(screen.getByText('Who Benefits')).toBeInTheDocument()
    expect(screen.getByText('The Power of Early Detection')).toBeInTheDocument()
    expect(screen.getByText('Designed for Easy Adoption')).toBeInTheDocument()
    expect(screen.getByText('Why Now?')).toBeInTheDocument()
    
    // Should use bullet points for easy scanning
    const content = document.body.textContent || ''
    expect(content).toContain('Prevent attacks before symptoms appear')
    expect(content).toContain('Peace of mind when loved ones are away')
    expect(content).toContain('Objective data for better treatment decisions')
    
    // Should have comparison tables
    expect(screen.getByText('Traditional Wearables')).toBeInTheDocument()
    expect(screen.getByText('NitroSense Modular Design')).toBeInTheDocument()
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

    render(<Impact />)
    
    // Component should still render properly with reduced motion
    expect(screen.getByText('Impact & Feasibility')).toBeInTheDocument()
    expect(screen.getByText('Who Benefits')).toBeInTheDocument()
    expect(screen.getByText('Why Now?')).toBeInTheDocument()
  })
})