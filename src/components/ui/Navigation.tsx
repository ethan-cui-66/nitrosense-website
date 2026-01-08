/**
 * Navigation Component
 * Provides smooth scrolling navigation between sections
 */

'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface NavigationProps {
  className?: string
}

const navigationItems = [
  { id: 'hero', label: 'Home' },
  { id: 'story', label: 'Story' },
  { id: 'model', label: 'Model' },
  { id: 'impact', label: 'Impact' },
  { id: 'brand', label: 'Brand' },
]

export default function Navigation({ className = '' }: NavigationProps) {
  const [activeSection, setActiveSection] = useState('hero')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show navigation after scrolling past hero
      setIsVisible(window.scrollY > 100)

      // Update active section based on scroll position
      const sections = navigationItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }))

      const currentSection = sections.find(section => {
        if (!section.element) return false
        const rect = section.element.getBoundingClientRect()
        return rect.top <= 100 && rect.bottom >= 100
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 ${className}`}
        >
          <div className="bg-nitro-black/90 backdrop-blur-sm border border-nitro-green/20 rounded-full px-6 py-3">
            <ul className="flex space-x-6">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`text-sm font-medium transition-colors duration-200 hover:text-nitro-green ${
                      activeSection === item.id
                        ? 'text-nitro-green'
                        : 'text-nitro-gray-300'
                    }`}
                    aria-label={`Navigate to ${item.label} section`}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}