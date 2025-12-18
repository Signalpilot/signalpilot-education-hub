#!/usr/bin/env node
/**
 * Script to inject Trial CTA system into all lesson HTML files
 *
 * This script adds:
 * 1. trial-cta.css link in <head>
 * 2. trial-cta.js script before </body>
 *
 * Usage: node scripts/inject-trial-cta.js
 */

const fs = require('fs');
const path = require('path');

const CURRICULUM_DIR = path.join(__dirname, '..', 'curriculum');
const TIERS = ['beginner', 'intermediate', 'advanced', 'professional'];

// CSS link to inject (in head, after auth-ui.css)
const CSS_LINK = '  <link rel="stylesheet" href="/assets/trial-cta.css">';

// JS script to inject (before </body>)
const JS_SCRIPT = '  <script src="/assets/trial-cta.js"></script>';

let processedCount = 0;
let skippedCount = 0;
let errorCount = 0;

function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Check if already has trial-cta.css
    if (!content.includes('trial-cta.css')) {
      // Insert after auth-ui.css or discussions.css
      if (content.includes('auth-ui.css')) {
        content = content.replace(
          '<link rel="stylesheet" href="/assets/auth-ui.css">',
          '<link rel="stylesheet" href="/assets/auth-ui.css">\n' + CSS_LINK
        );
        modified = true;
      } else if (content.includes('discussions.css')) {
        content = content.replace(
          '<link rel="stylesheet" href="/assets/discussions.css">',
          '<link rel="stylesheet" href="/assets/discussions.css">\n' + CSS_LINK
        );
        modified = true;
      }
    }

    // Check if already has trial-cta.js
    if (!content.includes('trial-cta.js')) {
      // Insert before discussions.js or before </body>
      if (content.includes('<script src="/assets/discussions.js">')) {
        content = content.replace(
          '<script src="/assets/discussions.js">',
          JS_SCRIPT + '\n  <script src="/assets/discussions.js">'
        );
        modified = true;
      } else if (content.includes('</body>')) {
        content = content.replace(
          '</body>',
          JS_SCRIPT + '\n</body>'
        );
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${path.relative(CURRICULUM_DIR, filePath)}`);
      processedCount++;
    } else {
      console.log(`⏭️  Skipped (already has CTAs): ${path.relative(CURRICULUM_DIR, filePath)}`);
      skippedCount++;
    }
  } catch (err) {
    console.error(`❌ Error processing ${filePath}: ${err.message}`);
    errorCount++;
  }
}

function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processDirectory(filePath);
    } else if (file.endsWith('.html')) {
      processFile(filePath);
    }
  }
}

// Main execution
console.log('🚀 Injecting Trial CTA system into lesson files...\n');

for (const tier of TIERS) {
  const tierPath = path.join(CURRICULUM_DIR, tier);
  if (fs.existsSync(tierPath)) {
    console.log(`\n📂 Processing ${tier}...`);
    processDirectory(tierPath);
  }
}

console.log('\n' + '='.repeat(50));
console.log(`📊 Summary:`);
console.log(`   ✅ Updated: ${processedCount} files`);
console.log(`   ⏭️  Skipped: ${skippedCount} files`);
console.log(`   ❌ Errors: ${errorCount} files`);
console.log('='.repeat(50));
