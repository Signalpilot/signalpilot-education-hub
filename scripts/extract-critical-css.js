#!/usr/bin/env node
/**
 * Critical CSS Extraction Script
 * Extracts critical above-the-fold CSS for faster page loads
 * Generates inline CSS for each HTML page
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rootDir = path.join(__dirname, '..');
const outputDir = path.join(rootDir, 'assets', 'critical');

// Critical selectors that should always be included
const criticalSelectors = [
  'html',
  'body',
  'header',
  'nav',
  '.navbar',
  '.hero',
  '.hero-content',
  'h1',
  'h2',
  '.btn',
  '.btn-primary',
  '.btn-secondary',
  '.container',
  '.card',
  '.loading',
  '.error',
  // Animation classes
  '@keyframes',
  '.fade-in',
  '.slide-up',
  // Layout
  '.grid',
  '.flex',
  '.main-content',
  // Critical UI elements
  '.auth-button',
  '.profile-badge',
  '.progress-indicator',
  // Responsive utilities
  '@media'
];

/**
 * Parse CSS and extract rules matching critical selectors
 * @param {string} cssContent - CSS file content
 * @returns {string} Critical CSS
 */
function extractCriticalRules(cssContent) {
  const criticalRules = [];

  // Simple regex-based extraction (for production, use PostCSS or similar)
  const rules = cssContent.match(/[^}]+\{[^}]*\}/g) || [];

  rules.forEach(rule => {
    const selector = rule.split('{')[0].trim();

    // Check if rule matches any critical selector
    const isCritical = criticalSelectors.some(critSel => {
      if (critSel.startsWith('@')) {
        return selector.includes(critSel);
      }
      return selector.includes(critSel);
    });

    if (isCritical) {
      criticalRules.push(rule);
    }
  });

  return criticalRules.join('\n');
}

/**
 * Process CSS files and extract critical CSS
 */
function processCriticalCSS() {
  console.log('🎯 Extracting critical CSS...\n');

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const assetsDir = path.join(rootDir, 'assets');
  const cssFiles = [
    'signalpilot-theme.css',
    'edu.css'
  ];

  let allCriticalCSS = '';

  cssFiles.forEach(file => {
    const filePath = path.join(assetsDir, file);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  ${file} not found, skipping...`);
      return;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const critical = extractCriticalRules(content);

    allCriticalCSS += `\n/* Critical from ${file} */\n${critical}\n`;

    console.log(`✅ Extracted critical CSS from ${file}`);
  });

  // Write combined critical CSS
  const outputPath = path.join(outputDir, 'critical.css');
  fs.writeFileSync(outputPath, allCriticalCSS);

  const size = (Buffer.byteLength(allCriticalCSS, 'utf8') / 1024).toFixed(2);
  console.log(`\n📊 Critical CSS: ${size} KB`);
  console.log(`   Output: ${path.relative(rootDir, outputPath)}`);

  console.log('\n📝 Usage:');
  console.log('   Add to <head> in your HTML files:');
  console.log('   <style>/* Inline critical CSS content here */</style>');
  console.log('   <link rel="preload" href="assets/edu.css" as="style" onload="this.rel=\'stylesheet\'">');
}

processCriticalCSS();
