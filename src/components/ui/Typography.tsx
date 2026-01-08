import React from 'react'
import { typography } from '@/styles/design-tokens'

interface TypographyProps {
  variant?: 'hero' | 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'small'
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold'
  color?: 'primary' | 'secondary'
  className?: string
  children: React.ReactNode
  as?: keyof JSX.IntrinsicElements
}

const variantClasses = {
  hero: 'text-hero font-bold leading-tight',
  h1: 'text-h1 font-semibold leading-tight',
  h2: 'text-h2 font-semibold leading-normal',
  h3: 'text-h3 font-medium leading-normal',
  h4: 'text-h4 font-medium leading-normal',
  body: 'text-base font-normal leading-relaxed',
  small: 'text-sm font-normal leading-normal',
}

const weightClasses = {
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

const colorClasses = {
  primary: 'text-nitro-text',
  secondary: 'text-nitro-text-secondary',
}

export function Typography({
  variant = 'body',
  weight,
  color = 'primary',
  className = '',
  children,
  as,
}: TypographyProps) {
  const Component = as || getDefaultElement(variant)
  
  const classes = [
    'font-inter', // Default to Inter font
    variantClasses[variant],
    weight && weightClasses[weight],
    colorClasses[color],
    className,
  ].filter(Boolean).join(' ')

  return (
    <Component className={classes}>
      {children}
    </Component>
  )
}

function getDefaultElement(variant: TypographyProps['variant']): keyof JSX.IntrinsicElements {
  switch (variant) {
    case 'hero':
    case 'h1':
      return 'h1'
    case 'h2':
      return 'h2'
    case 'h3':
      return 'h3'
    case 'h4':
      return 'h4'
    case 'small':
      return 'small'
    default:
      return 'p'
  }
}

// Specialized typography components
export function Heading({ level = 1, children, className = '', ...props }: {
  level?: 1 | 2 | 3 | 4
  children: React.ReactNode
  className?: string
}) {
  const variants = {
    1: 'h1' as const,
    2: 'h2' as const,
    3: 'h3' as const,
    4: 'h4' as const,
  }
  
  return (
    <Typography variant={variants[level]} className={className} {...props}>
      {children}
    </Typography>
  )
}

export function CodeText({ children, className = '', ...props }: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <code className={`font-mono text-sm bg-nitro-charcoal px-2 py-1 rounded ${className}`} {...props}>
      {children}
    </code>
  )
}

export function TechnicalText({ children, className = '', ...props }: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span className={`font-mono text-nitro-green ${className}`} {...props}>
      {children}
    </span>
  )
}