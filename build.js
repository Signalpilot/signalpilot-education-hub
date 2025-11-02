#!/usr/bin/env node
/**
 * Main Build Script
 * Orchestrates CSS/JS minification and optimization
 */

const { execSync } = require('child_process');

console.log('🚀 Starting build process...\n');

try {
  // Minify CSS
  console.log('Step 1: Minifying CSS...');
  execSync('node scripts/minify-css.js', { stdio: 'inherit' });
  console.log();

  // Minify JS
  console.log('Step 2: Minifying JavaScript...');
  execSync('node scripts/minify-js.js', { stdio: 'inherit' });
  console.log();

  // Check links
  console.log('Step 3: Checking links...');
  try {
    execSync('node scripts/check-links.js', { stdio: 'inherit' });
  } catch (e) {
    console.log('⚠️  Link check found issues (non-fatal)\n');
  }

  console.log('✅ Build complete!\n');
  console.log('📝 Next steps:');
  console.log('   1. Update HTML files to use .min.css and .min.js versions');
  console.log('   2. Test the minified versions locally');
  console.log('   3. Deploy to production');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
