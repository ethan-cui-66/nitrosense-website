import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AirlyWarning',
  description: '"Your body warns you twice. We listen both times."',
  robots: 'noindex, nofollow', // Competition privacy
  keywords: ['respiratory monitoring', 'asthma prevention', 'medical innovation', 'predictive healthcare'],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#10B981', // nitro-green
  colorScheme: 'dark',
  authors: [{ name: 'Airly Warning Team' }],
  creator: 'Airly Warning',
  publisher: 'Airly Warning',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-nitro-black text-nitro-text antialiased`}>
        {children}
      </body>
    </html>
  )
}