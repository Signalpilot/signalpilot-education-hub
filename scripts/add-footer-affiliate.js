#!/usr/bin/env node
/**
 * Add affiliate link to all footers
 */

const fs = require('fs');
const path = require('path');

function findHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      findHtmlFiles(fullPath, files);
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const rootPath = path.join(__dirname, '..');
const htmlFiles = findHtmlFiles(rootPath);

console.log(`Found ${htmlFiles.length} HTML files...`);

let updated = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has affiliate in footer
  if (content.includes('Affiliates</a><a href="https://signalpilot.io/privacy')) {
    console.log(`⏭️  Already has affiliate: ${path.relative(rootPath, filePath)}`);
    return;
  }

  // Pattern: Add "Affiliates" link before Privacy
  // Handles both minified (no spaces) and formatted footers
  const pattern = /(<a href="https:\/\/signalpilot\.io\/privacy\.html">Privacy<\/a>)/g;
  const replacement = '<a href="https://signalpilot.io/affiliates.html">Affiliates</a>$1';

  if (pattern.test(content)) {
    pattern.lastIndex = 0;
    content = content.replace(pattern, replacement);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${path.relative(rootPath, filePath)}`);
    updated++;
  }
});

console.log(`\n📊 Updated ${updated} files`);
