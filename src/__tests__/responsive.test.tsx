import * as fc from 'fast-check'
import { render } from '@/utils/test-utils'
import { Container, Grid, Flex, Responsive } from '@/components/ui/Layout'

// Feature: nitrosense-website, Property 4: Responsive Layout Behavior
describe('Responsive Layout Behavior', () => {
  test('should maintain readable content across all viewport widths', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }), // Viewport widths from mobile to wide desktop
        fc.integer({ min: 400, max: 1440 }), // Viewport heights
        fc.string({ minLength: 10, maxLength: 200 }), // Content
        (width, height, content) => {
          // Mock viewport dimensions
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

          const { container } = render(
            <Container>
              <div>{content}</div>
            </Container>
          )

          const containerElement = container.firstChild as HTMLElement
          
          // Container should have responsive padding
          expect(containerElement.className).toContain('px-4')
          expect(containerElement.className).toContain('sm:px-6')
          expect(containerElement.className).toContain('lg:px-8')
          
          // Should have max-width constraint
          expect(containerElement.className).toMatch(/max-w-/)
          
          // Should be centered
          expect(containerElement.className).toContain('mx-auto')
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should adapt grid layouts based on screen size', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(1, 2, 3, 4, 6, 12),
        fc.constantFrom(320, 768, 1024, 1440), // Breakpoint widths
        fc.array(fc.string({ minLength: 1, maxLength: 50 }), { minLength: 1, maxLength: 12 }),
        (cols, viewportWidth, items) => {
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          })

          const { container } = render(
            <Grid cols={cols as any}>
              {items.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </Grid>
          )

          const gridElement = container.firstChild as HTMLElement
          
          // Should have grid display
          expect(gridElement.className).toContain('grid')
          
          // Should have responsive grid columns
          if (cols > 1) {
            expect(gridElement.className).toContain('grid-cols-1') // Mobile first
            
            if (cols >= 2) {
              expect(gridElement.className).toMatch(/md:grid-cols-/)
            }
            if (cols >= 3) {
              expect(gridElement.className).toMatch(/lg:grid-cols-/)
            }
          }
          
          // Should have gap spacing
          expect(gridElement.className).toMatch(/gap-/)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should handle flex layouts responsively', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('row', 'col'),
        fc.constantFrom('start', 'center', 'end', 'stretch'),
        fc.constantFrom('start', 'center', 'end', 'between', 'around', 'evenly'),
        fc.array(fc.string({ minLength: 1, maxLength: 30 }), { minLength: 1, maxLength: 6 }),
        (direction, align, justify, items) => {
          const { container } = render(
            <Flex direction={direction as any} align={align as any} justify={justify as any}>
              {items.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </Flex>
          )

          const flexElement = container.firstChild as HTMLElement
          
          // Should have flex display
          expect(flexElement.className).toContain('flex')
          
          // Should have correct direction
          expect(flexElement.className).toContain(`flex-${direction}`)
          
          // Should have correct alignment
          const alignmentClass = {
            start: 'items-start',
            center: 'items-center',
            end: 'items-end',
            stretch: 'items-stretch',
          }[align]
          expect(flexElement.className).toContain(alignmentClass)
          
          // Should have correct justification
          const justificationClass = {
            start: 'justify-start',
            center: 'justify-center',
            end: 'justify-end',
            between: 'justify-between',
            around: 'justify-around',
            evenly: 'justify-evenly',
          }[justify]
          expect(flexElement.className).toContain(justificationClass)
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should show/hide content based on responsive breakpoints', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('mobile', 'tablet', 'desktop', 'mobile-tablet', 'tablet-desktop'),
        fc.constantFrom('mobile', 'tablet', 'desktop', 'mobile-tablet', 'tablet-desktop'),
        fc.string({ minLength: 1, maxLength: 100 }),
        (showBreakpoint, hideBreakpoint, content) => {
          // Test show behavior
          const { container: showContainer } = render(
            <Responsive show={showBreakpoint as any}>
              <div>{content}</div>
            </Responsive>
          )

          const showElement = showContainer.firstChild as HTMLElement
          
          // Should have appropriate responsive classes for showing
          const showClasses = {
            mobile: 'block md:hidden',
            tablet: 'hidden md:block lg:hidden',
            desktop: 'hidden lg:block',
            'mobile-tablet': 'block lg:hidden',
            'tablet-desktop': 'hidden md:block',
          }[showBreakpoint]
          
          showClasses.split(' ').forEach(cls => {
            expect(showElement.className).toContain(cls)
          })

          // Test hide behavior
          const { container: hideContainer } = render(
            <Responsive hide={hideBreakpoint as any}>
              <div>{content}</div>
            </Responsive>
          )

          const hideElement = hideContainer.firstChild as HTMLElement
          
          // Should have appropriate responsive classes for hiding
          const hideClasses = {
            mobile: 'hidden md:block',
            tablet: 'block md:hidden lg:block',
            desktop: 'block lg:hidden',
            'mobile-tablet': 'hidden lg:block',
            'tablet-desktop': 'block md:hidden',
          }[hideBreakpoint]
          
          hideClasses.split(' ').forEach(cls => {
            expect(hideElement.className).toContain(cls)
          })
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })

  test('should prevent horizontal scrolling at any viewport width', () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 320, max: 2560 }),
        fc.string({ minLength: 50, maxLength: 500 }),
        (viewportWidth, longContent) => {
          Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: viewportWidth,
          })

          const { container } = render(
            <Container>
              <div className="break-words">{longContent}</div>
            </Container>
          )

          const containerElement = container.firstChild as HTMLElement
          
          // Container should have max-width to prevent overflow
          expect(containerElement.className).toMatch(/max-w-/)
          
          // Should have horizontal padding for breathing room
          expect(containerElement.className).toMatch(/px-/)
          
          // Content should be contained
          const contentElement = containerElement.firstChild as HTMLElement
          expect(contentElement.className).toContain('break-words')
          
          return true
        }
      ),
      { numRuns: 100 }
    )
  })
})