# NitroSense Website

A competition-ready website for NitroSense, a medical innovation that prevents asthma attacks through continuous, predictive respiratory monitoring.

## Overview

This website showcases the NitroSense system with a focus on medical professionalism, scientific accuracy, and accessibility. Built with Next.js 14, TypeScript, and Tailwind CSS, it features a dark medical aesthetic with comprehensive testing and performance optimization.

## Features

- **Responsive Design**: Mobile-first approach with breakpoints at 320px, 768px, and 1024px+
- **Accessibility**: WCAG AA compliant with semantic HTML, proper ARIA labels, and keyboard navigation
- **Performance**: Optimized for Core Web Vitals with image optimization and caching
- **Testing**: Comprehensive unit tests and property-based testing with 90%+ coverage
- **Medical Tone**: Professional, scientific language avoiding startup hype
- **Competition Ready**: No placeholder content, proper SEO controls, and privacy settings

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **Animation**: Framer Motion
- **Testing**: Jest, React Testing Library, fast-check
- **Deployment**: Vercel-optimized

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nitrosense-website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run test` - Run test suite
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Main page component
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Hero.tsx          # Hero section
│   ├── Story.tsx         # Mission, vision, values
│   ├── Model.tsx         # System visualization
│   ├── Impact.tsx        # Impact and feasibility
│   ├── Brand.tsx         # Brand identity
│   └── ui/               # UI components
│       ├── Layout.tsx    # Layout components
│       ├── Typography.tsx # Typography system
│       ├── Navigation.tsx # Smooth scroll navigation
│       └── ErrorBoundary.tsx # Error handling
├── styles/               # Design system
│   └── design-tokens.ts  # Brand colors and tokens
├── utils/                # Utilities
│   ├── contentParser.ts  # Content validation
│   ├── prettyPrinter.ts  # HTML formatting
│   └── semanticValidator.ts # HTML structure validation
└── __tests__/            # Test files
    ├── *.test.tsx        # Component tests
    └── integration.test.tsx # Integration tests
```

## Design System

### Colors

- **Primary**: Medical Green (#10B981) - Trust, health, innovation
- **Background**: Near Black (#0F0F0F) - Professional, medical
- **Text**: Light Gray (#F3F4F6) - High contrast, readable
- **Accent**: Muted Yellow (#F59E0B) - Caution, attention
- **Critical**: Muted Red (#EF4444) - Alerts, critical states

### Typography

- **Primary**: Inter - Clean, readable, professional
- **Monospace**: JetBrains Mono - Technical content, code
- **Scale**: Responsive typography with proper line heights

## Content Sections

1. **Hero**: Introduction and core mission
2. **Story**: Mission, vision, and values
3. **Model**: Technical system visualization
4. **Impact**: Beneficiaries and feasibility
5. **Brand**: Identity and voice guidelines

## Testing

The project includes comprehensive testing:

- **Unit Tests**: Component behavior and rendering
- **Property Tests**: Universal correctness properties (100+ iterations)
- **Integration Tests**: Complete user journeys
- **Accessibility Tests**: WCAG compliance
- **Content Quality Tests**: No placeholders, medical tone

Run tests:
```bash
npm run test              # Run all tests
npm run test:coverage     # With coverage report
npm run test:watch        # Watch mode for development
```

## Deployment

### Vercel (Recommended)

1. Connect repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Manual Deployment

```bash
npm run build    # Build for production
npm run start    # Start production server
```

## Performance

- **Core Web Vitals**: Optimized for LCP, FID, CLS
- **Image Optimization**: WebP/AVIF formats with lazy loading
- **Caching**: Static assets cached for 1 year
- **Compression**: Gzip/Brotli compression enabled
- **Bundle Size**: Optimized with tree shaking and code splitting

## Accessibility

- **WCAG AA Compliant**: 4.5:1 contrast ratios
- **Semantic HTML**: Proper landmarks and heading hierarchy
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: ARIA labels and descriptions
- **Reduced Motion**: Respects user preferences

## Security

- **Headers**: Security headers for XSS, clickjacking protection
- **Privacy**: No tracking, competition-appropriate robots.txt
- **Content Security**: Proper content type handling

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is proprietary and confidential. Created for competition evaluation purposes.

## Contact

For questions about this implementation, please refer to the project documentation or contact the development team.