#!/usr/bin/env node
/**
 * Add logger.js to all curriculum lesson HTML files
 * Fixes auth state not persisting in lesson pages
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const rootDir = path.join(__dirname, '..');

console.log('🔧 Adding logger.js to all lesson pages...\n');

// Find all lesson HTML files
const lessonFiles = glob.sync('curriculum/**/*.html', { cwd: rootDir, absolute: true });

console.log(`Found ${lessonFiles.length} lesson files\n`);

let updatedCount = 0;

lessonFiles.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');

  // Check if logger.js is already present
  if (content.includes('logger.js')) {
    console.log(`⏭️  ${path.relative(rootDir, filePath)} - already has logger.js`);
    return;
  }

  // Find the insertion point - before dev-utils.js or before the first script tag in <head>
  let updated = content;

  // Pattern 1: Insert before dev-utils.js in <head>
  if (content.includes('<script src="/assets/dev-utils.js"')) {
    updated = content.replace(
      '<script src="/assets/dev-utils.js"',
      '<!-- Logger must load first, before other scripts that use it -->\n  <script src="/assets/logger.js"></script>\n  <script src="/assets/dev-utils.js"'
    );
  }
  // Pattern 2: Insert before structured-data.js in <head>
  else if (content.includes('<script src="/assets/structured-data.js"')) {
    updated = content.replace(
      '<script src="/assets/structured-data.js"',
      '<!-- Logger must load first, before other scripts that use it -->\n  <script src="/assets/logger.js"></script>\n<script src="/assets/structured-data.js"'
    );
  }
  // Pattern 3: Insert before closing </head> tag
  else if (content.includes('</head>')) {
    updated = content.replace(
      '</head>',
      '  <!-- Logger must load first, before other scripts that use it -->\n  <script src="/assets/logger.js"></script>\n</head>'
    );
  }

  if (updated !== content) {
    fs.writeFileSync(filePath, updated);
    updatedCount++;
    console.log(`✅ ${path.relative(rootDir, filePath)}`);
  } else {
    console.log(`⚠️  ${path.relative(rootDir, filePath)} - could not find insertion point`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Files updated: ${updatedCount}`);
console.log(`   Files skipped: ${lessonFiles.length - updatedCount}`);
console.log(`\n✨ Done! Auth state should now persist in lesson pages.`);
