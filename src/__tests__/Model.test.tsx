import { render, screen, fireEvent } from '@/utils/test-utils'
import Model from '@/components/Model'

describe('Model Component', () => {
  test('displays visual representation of sensor stone', () => {
    render(<Model />)
    
    // Should have sensor technology view by default
    expect(screen.getByText('Sensor Technology')).toBeInTheDocument()
    
    // Should show sensor measurements
    expect(screen.getByText('FeNO')).toBeInTheDocument()
    expect(screen.getByText('VOCs')).toBeInTheDocument()
    expect(screen.getByText('Inflammation Signals')).toBeInTheDocument()
    
    // Should provide full names
    expect(screen.getByText(/Fractional Exhaled Nitric Oxide/i)).toBeInTheDocument()
    expect(screen.getByText(/Volatile Organic Compounds/i)).toBeInTheDocument()
    expect(screen.getByText(/Inflammatory Biomarkers/i)).toBeInTheDocument()
  })

  test('shows all three wearable mount options', () => {
    render(<Model />)
    
    // Click on wearable mounts view
    fireEvent.click(screen.getByText('Wearable Options'))
    
    // Should show all three mount types
    expect(screen.getByText('Necklace Mount')).toBeInTheDocument()
    expect(screen.getByText('Wristband Mount')).toBeInTheDocument()
    expect(screen.getByText('Skin Patch')).toBeInTheDocument()
    
    // Should have descriptions for each
    expect(screen.getByText(/pendant design/i)).toBeInTheDocument()
    expect(screen.getByText(/smartwatch-style/i)).toBeInTheDocument()
    expect(screen.getByText(/medical-grade adhesive/i)).toBeInTheDocument()
  })

  test('illustrates mobile app ecosystem integration', () => {
    render(<Model />)
    
    // Click on app ecosystem view
    fireEvent.click(screen.getByText('App Ecosystem'))
    
    // Should show data flow stages
    expect(screen.getByText(/Continuous Monitoring/i)).toBeInTheDocument()
    expect(screen.getByText(/Real-time Analysis/i)).toBeInTheDocument()
    expect(screen.getByText(/Predictive Insights/i)).toBeInTheDocument()
    expect(screen.getByText(/Smart Alerts/i)).toBeInTheDocument()
    expect(screen.getByText(/Preventive Action/i)).toBeInTheDocument()
  })

  test('explains what sensor measures including FeNO, VOCs, and inflammation signals', () => {
    render(<Model />)
    
    // Should be on sensor view by default
    const content = document.body.textContent || ''
    
    // All three measurements should be explained
    expect(content).toContain('FeNO')
    expect(content).toContain('VOCs')
    expect(content).toContain('Inflammation')
    
    // Should have meaningful descriptions
    expect(content).toContain('airway inflammation')
    expect(content).toContain('chemical signatures')
    expect(content).toContain('warning signs')
  })

  test('demonstrates how data becomes predictive insight', () => {
    render(<Model />)
    
    // Navigate to ecosystem view
    fireEvent.click(screen.getByText('App Ecosystem'))
    
    // Should show the prediction process
    expect(screen.getByText(/AI algorithms process biomarker patterns/i)).toBeInTheDocument()
    expect(screen.getByText(/Machine learning models predict/i)).toBeInTheDocument()
    expect(screen.getByText(/15-30 minutes in advance/i)).toBeInTheDocument()
    
    // Should show technical specifications
    expect(screen.getByText('15-30min')).toBeInTheDocument()
    expect(screen.getByText('30sec')).toBeInTheDocument()
    expect(screen.getByText('94%')).toBeInTheDocument()
  })

  test('differentiates system from reactive inhaler use', () => {
    render(<Model />)
    
    // Should show comparison between approaches
    expect(screen.getByText(/Traditional Approach/i)).toBeInTheDocument()
    expect(screen.getByText(/NitroSense Approach/i)).toBeInTheDocument()
    
    // Traditional approach should mention reactive elements
    expect(screen.getByText(/Wait for symptoms/i)).toBeInTheDocument()
    expect(screen.getByText(/rescue medications/i)).toBeInTheDocument()
    expect(screen.getByText(/Emergency room visits/i)).toBeInTheDocument()
    
    // NitroSense approach should emphasize prediction
    expect(screen.getByText(/Continuous biomarker monitoring/i)).toBeInTheDocument()
    expect(screen.getByText(/Predict attacks before symptoms/i)).toBeInTheDocument()
    expect(screen.getByText(/Preventive action/i)).toBeInTheDocument()
  })

  test('avoids heavy technical jargon while maintaining clarity', () => {
    render(<Model />)
    
    const content = document.body.textContent || ''
    
    // Should use appropriate technical terms with explanations
    expect(content).toContain('biomarker')
    expect(content).toContain('Fractional Exhaled Nitric Oxide')
    expect(content).toContain('Volatile Organic Compounds')
    
    // Should avoid unexplained heavy jargon
    expect(content).not.toContain('pathophysiology')
    expect(content).not.toContain('bronchodilation')
    expect(content).not.toContain('immunomodulation')
    
    // Should use accessible language
    expect(content).toContain('breath analysis')
    expect(content).toContain('early warning signs')
    expect(content).toContain('precious time')
  })

  test('has interactive view switching functionality', () => {
    render(<Model />)
    
    // Should have three view buttons
    const sensorButton = screen.getByText('Sensor Technology')
    const mountsButton = screen.getByText('Wearable Options')
    const ecosystemButton = screen.getByText('App Ecosystem')
    
    expect(sensorButton).toBeInTheDocument()
    expect(mountsButton).toBeInTheDocument()
    expect(ecosystemButton).toBeInTheDocument()
    
    // Should start with sensor view active
    expect(sensorButton.closest('button')).toHaveClass('bg-nitro-green')
    
    // Should switch views when clicked
    fireEvent.click(mountsButton)
    expect(mountsButton.closest('button')).toHaveClass('bg-nitro-green')
    expect(sensorButton.closest('button')).not.toHaveClass('bg-nitro-green')
    
    fireEvent.click(ecosystemButton)
    expect(ecosystemButton.closest('button')).toHaveClass('bg-nitro-green')
    expect(mountsButton.closest('button')).not.toHaveClass('bg-nitro-green')
  })

  test('includes proper semantic structure', () => {
    render(<Model />)
    
    // Should have section with model id
    const modelSection = document.getElementById('model')
    expect(modelSection).toBeInTheDocument()
    expect(modelSection?.tagName).toBe('SECTION')
    
    // Should have proper heading hierarchy
    const mainHeading = screen.getByRole('heading', { level: 1, name: /The Innovation Explained/i })
    expect(mainHeading).toBeInTheDocument()
    
    // Should have interactive buttons
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThanOrEqual(3) // At least the view switcher buttons
  })

  test('provides modular design explanation', () => {
    render(<Model />)
    
    // Navigate to mounts view
    fireEvent.click(screen.getByText('Wearable Options'))
    
    // Should explain modular advantage
    expect(screen.getByText(/Modular Design Advantage/i)).toBeInTheDocument()
    expect(screen.getByText(/same sensor stone works across all mounting options/i)).toBeInTheDocument()
    expect(screen.getByText(/easily switch to another/i)).toBeInTheDocument()
  })

  test('includes visual elements and proper styling', () => {
    render(<Model />)
    
    const modelSection = document.getElementById('model')
    expect(modelSection).toHaveClass('bg-nitro-black') // Primary background
    
    // Should have view selector buttons with proper styling
    const viewButtons = screen.getAllByRole('button')
    viewButtons.forEach(button => {
      expect(button.className).toMatch(/rounded-lg|border|transition/)
    })
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

    render(<Model />)
    
    // Component should still render properly with reduced motion
    expect(screen.getByText('The Innovation Explained')).toBeInTheDocument()
    expect(screen.getByText('Sensor Technology')).toBeInTheDocument()
  })
})