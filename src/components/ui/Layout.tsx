import React from 'react'

interface ContainerProps {
  children: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

export function Container({ children, className = '', size = 'xl' }: ContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl',
    md: 'max-w-4xl',
    lg: 'max-w-6xl',
    xl: 'max-w-7xl',
    full: 'max-w-full',
  }

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeClasses[size]} ${className}`}>
      {children}
    </div>
  )
}

interface SectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  background?: 'primary' | 'secondary' | 'transparent'
  padding?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Section({ 
  children, 
  className = '', 
  id,
  background = 'transparent',
  padding = 'lg'
}: SectionProps) {
  const backgroundClasses = {
    primary: 'bg-nitro-black',
    secondary: 'bg-nitro-charcoal',
    transparent: 'bg-transparent',
  }

  const paddingClasses = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16 lg:py-24',
    xl: 'py-20 lg:py-32',
  }

  return (
    <section 
      id={id}
      className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </section>
  )
}

interface GridProps {
  children: React.ReactNode
  className?: string
  cols?: 1 | 2 | 3 | 4 | 6 | 12
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
}

export function Grid({ 
  children, 
  className = '', 
  cols = 1, 
  gap = 'md',
  responsive = true 
}: GridProps) {
  const colClasses = responsive ? {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-1 md:grid-cols-6 lg:grid-cols-12',
  } : {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  }

  return (
    <div className={`grid ${colClasses[cols]} ${gapClasses[gap]} ${className}`}>
      {children}
    </div>
  )
}

interface FlexProps {
  children: React.ReactNode
  className?: string
  direction?: 'row' | 'col'
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  wrap?: boolean
  gap?: 'sm' | 'md' | 'lg' | 'xl'
}

export function Flex({ 
  children, 
  className = '', 
  direction = 'row',
  align = 'start',
  justify = 'start',
  wrap = false,
  gap = 'md'
}: FlexProps) {
  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col',
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly',
  }

  const gapClasses = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8',
    xl: 'gap-12',
  }

  return (
    <div className={`
      flex 
      ${directionClasses[direction]} 
      ${alignClasses[align]} 
      ${justifyClasses[justify]} 
      ${wrap ? 'flex-wrap' : 'flex-nowrap'}
      ${gapClasses[gap]}
      ${className}
    `}>
      {children}
    </div>
  )
}

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
  axis?: 'x' | 'y' | 'both'
}

export function Spacer({ size = 'md', axis = 'y' }: SpacerProps) {
  const sizeClasses = {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
    '4xl': '8rem',
  }

  const axisClasses = {
    x: `w-[${sizeClasses[size]}]`,
    y: `h-[${sizeClasses[size]}]`,
    both: `w-[${sizeClasses[size]}] h-[${sizeClasses[size]}]`,
  }

  return <div className={axisClasses[axis]} aria-hidden="true" />
}

// Responsive visibility utilities
interface ResponsiveProps {
  children: React.ReactNode
  show?: 'mobile' | 'tablet' | 'desktop' | 'mobile-tablet' | 'tablet-desktop'
  hide?: 'mobile' | 'tablet' | 'desktop' | 'mobile-tablet' | 'tablet-desktop'
}

export function Responsive({ children, show, hide }: ResponsiveProps) {
  let className = ''

  if (show) {
    const showClasses = {
      mobile: 'block md:hidden',
      tablet: 'hidden md:block lg:hidden',
      desktop: 'hidden lg:block',
      'mobile-tablet': 'block lg:hidden',
      'tablet-desktop': 'hidden md:block',
    }
    className = showClasses[show]
  }

  if (hide) {
    const hideClasses = {
      mobile: 'hidden md:block',
      tablet: 'block md:hidden lg:block',
      desktop: 'block lg:hidden',
      'mobile-tablet': 'hidden lg:block',
      'tablet-desktop': 'block md:hidden',
    }
    className = hideClasses[hide]
  }

  return <div className={className}>{children}</div>
}