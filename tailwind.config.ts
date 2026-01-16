import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Airly Warning Brand Colors
        'nitro-black': '#0A0A0B',
        'nitro-charcoal': '#1A1A1C',
        'nitro-green': '#00D4AA',
        'nitro-green-light': '#4ADE80',
        'nitro-yellow': '#FCD34D',
        'nitro-red': '#F87171',
        'nitro-text': '#FFFFFF',
        'nitro-text-secondary': '#A1A1AA',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'hero': '3.5rem',
        'h1': '2.25rem',
        'h2': '1.875rem',
        'h3': '1.5rem',
        'h4': '1.25rem',
      },
      lineHeight: {
        'relaxed': '1.6',
      },
      animation: {
        'breath': 'breath 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        breath: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.8' },
          '50%': { transform: 'scale(1.05)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
export default config