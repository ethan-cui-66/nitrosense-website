// Airly Warning Design System Tokens
export const colors = {
  // Primary backgrounds
  black: '#0A0A0B',
  charcoal: '#1A1A1C',
  
  // Primary accents
  green: '#00D4AA',
  greenLight: '#4ADE80',
  
  // Secondary accents
  yellow: '#FCD34D', // Caution
  red: '#F87171',    // Danger
  
  // Text colors
  text: '#FFFFFF',
  textSecondary: '#A1A1AA',
  
  // Semantic colors
  success: '#4ADE80',
  warning: '#FCD34D',
  error: '#F87171',
  info: '#00D4AA',
} as const

export const typography = {
  fontFamily: {
    primary: ['Inter', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    hero: '3.5rem',    // 56px
    h1: '2.25rem',     // 36px
    h2: '1.875rem',    // 30px
    h3: '1.5rem',      // 24px
    h4: '1.25rem',     // 20px
    body: '1rem',      // 16px
    small: '0.875rem', // 14px
  },
  lineHeight: {
    tight: '1.2',
    normal: '1.5',
    relaxed: '1.6',
    loose: '1.8',
  },
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const

export const spacing = {
  xs: '0.5rem',    // 8px
  sm: '1rem',      // 16px
  md: '1.5rem',    // 24px
  lg: '2rem',      // 32px
  xl: '3rem',      // 48px
  '2xl': '4rem',   // 64px
  '3xl': '6rem',   // 96px
  '4xl': '8rem',   // 128px
} as const

export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
} as const

export const animations = {
  duration: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
  },
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const

// Accessibility standards
export const accessibility = {
  contrastRatios: {
    normal: 4.5,
    large: 3.0,
    enhanced: 7.0,
  },
  focusRing: {
    width: '2px',
    color: colors.green,
    offset: '2px',
  },
} as const

// Export type definitions for TypeScript
export type Colors = typeof colors
export type Typography = typeof typography
export type Spacing = typeof spacing
export type Breakpoints = typeof breakpoints
export type Animations = typeof animations