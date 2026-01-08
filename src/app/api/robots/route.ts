/**
 * Robots.txt API Route
 * Provides robots.txt for search engine control
 */

import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Disallow: /

# Competition privacy - no indexing allowed
# This website is for evaluation purposes only`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
    },
  })
}