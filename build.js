#!/usr/bin/env node

// Clean build script for production deployment
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting clean production build...');

// Set environment variables
process.env.NEXT_TELEMETRY_DISABLED = '1';
process.env.NODE_ENV = 'production';
process.env.NPM_CONFIG_AUDIT = 'false';
process.env.NPM_CONFIG_FUND = 'false';
process.env.NPM_CONFIG_PROGRESS = 'false';

try {
  // Clean previous builds
  console.log('🧹 Cleaning previous builds...');
  if (fs.existsSync('.next')) {
    fs.rmSync('.next', { recursive: true, force: true });
  }
  if (fs.existsSync('out')) {
    fs.rmSync('out', { recursive: true, force: true });
  }

  // Type check
  console.log('🔍 Type checking...');
  execSync('npx tsc --noEmit', { stdio: 'inherit' });

  // Build
  console.log('🏗️ Building application...');
  execSync('npx next build', { stdio: 'inherit' });

  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}