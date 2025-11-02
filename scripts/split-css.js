#!/usr/bin/env node
/**
 * CSS Splitting Script
 * Splits large edu.css into modular, maintainable files
 * Creates separate files for different concerns
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const cssDir = path.join(rootDir, 'assets', 'css-modules');
const eduCssPath = path.join(rootDir, 'assets', 'edu.css');

// Create output directory
if (!fs.existsSync(cssDir)) {
  fs.mkdirSync(cssDir, { recursive: true });
}

console.log('✂️  Splitting edu.css into modular files...\n');

// Read the full CSS file
const fullCss = fs.readFileSync(eduCssPath, 'utf8');
const lines = fullCss.split('\n');

// Define module boundaries by identifying key sections
const modules = {
  'base.css': {
    start: 0,
    patterns: ['SYSTEMATIC BEAUTIFULNESS', 'Universal box-sizing', ':root', 'html,body', '.wrap'],
    description: 'Foundation styles, resets, CSS variables, and base typography'
  },
  'header.css': {
    patterns: ['.sp-header', '.brand', '#mainnav', '.header-ctls', '.menu-toggle', '.mobile-nav'],
    description: 'Header, navigation, and mobile menu styles'
  },
  'article.css': {
    patterns: ['.article', '.badge', '.headline', '.meta', '.article-grid', '.prose'],
    description: 'Article layout, typography, and content styles'
  },
  'toc.css': {
    patterns: ['.toc'],
    description: 'Table of contents sidebar styles'
  },
  'components.css': {
    patterns: ['.btn', '.nav-article', '.callout'],
    description: 'Reusable UI components (buttons, callouts, etc.)'
  },
  'footer.css': {
    patterns: ['.sp-footer'],
    description: 'Footer styles'
  },
  'background.css': {
    patterns: ['.bg-stars', '.sp-constellations', '.bg-aurora', '.bg-radial'],
    description: 'Background effects (stars, aurora, gradients)'
  }
};

// Extract CSS for each module
const extractedModules = {};

// Simple extraction logic - find sections by selectors
let currentModule = 'base.css';
let buffer = [];

lines.forEach((line, i) => {
  // Check if line matches any module pattern
  for (const [moduleName, config] of Object.entries(modules)) {
    if (config.patterns && config.patterns.some(pattern => line.includes(pattern))) {
      // Save previous buffer
      if (buffer.length > 0 && currentModule) {
        if (!extractedModules[currentModule]) {
          extractedModules[currentModule] = [];
        }
        extractedModules[currentModule].push(...buffer);
        buffer = [];
      }
      currentModule = moduleName;
      break;
    }
  }

  buffer.push(line);
});

// Save remaining buffer
if (buffer.length > 0 && currentModule) {
  if (!extractedModules[currentModule]) {
    extractedModules[currentModule] = [];
  }
  extractedModules[currentModule].push(...buffer);
}

// Write each module to its own file
let totalSize = 0;
Object.entries(extractedModules).forEach(([moduleName, lines]) => {
  const content = lines.join('\n').trim();
  if (content.length === 0) return;

  const config = modules[moduleName];
  const header = `/* ==================================================
   ${moduleName.replace('.css', '').toUpperCase()} MODULE
   ${config.description}
   ================================================== */\n\n`;

  const moduleContent = header + content;
  const filePath = path.join(cssDir, moduleName);
  fs.writeFileSync(filePath, moduleContent);

  const size = Buffer.byteLength(moduleContent, 'utf8');
  totalSize += size;

  console.log(`✅ ${moduleName.padEnd(20)} ${(size / 1024).toFixed(2)} KB`);
});

// Create main import file
const importFile = `/* ==================================================
   EDU.CSS - MODULAR VERSION
   Import all CSS modules in correct order
   ================================================== */

/* Foundation - must load first */
@import 'css-modules/base.css';

/* Layout */
@import 'css-modules/header.css';
@import 'css-modules/article.css';
@import 'css-modules/toc.css';
@import 'css-modules/footer.css';

/* Components */
@import 'css-modules/components.css';

/* Effects */
@import 'css-modules/background.css';

/*
  Usage: Replace <link rel="stylesheet" href="assets/edu.css">
         with <link rel="stylesheet" href="assets/edu-modular.css">

  Benefits:
  - Better code organization
  - Easier maintenance
  - Selective loading (import only what you need)
  - Better version control diffs
*/
`;

const importFilePath = path.join(rootDir, 'assets', 'edu-modular.css');
fs.writeFileSync(importFilePath, importFile);

console.log(`\n📦 Created import file: edu-modular.css`);
console.log(`📊 Total modular CSS: ${(totalSize / 1024).toFixed(2)} KB`);
console.log(`📁 Modules directory: assets/css-modules/`);

console.log(`\n✨ CSS splitting complete!`);
console.log(`\n💡 Next steps:`);
console.log(`   1. Review the generated modules in assets/css-modules/`);
console.log(`   2. Optionally use edu-modular.css instead of edu.css`);
console.log(`   3. Or keep using edu.css - modules are for maintenance only`);
