#!/usr/bin/env node
/**
 * Update affiliate card to more compact version
 */

const fs = require('fs');
const path = require('path');

// Old card pattern (the full card we added)
const oldCardPattern = /<div class="card affiliate-tiers-card"[^>]*>[\s\S]*?<a href="https:\/\/signalpilot\.io\/affiliates\.html"[^>]*>Become an Affiliate →<\/a>\s*<\/div>/g;

// New compact affiliate card HTML
const newCardHTML = `<div class="card affiliate-tiers-card" style="margin-top:1rem;padding:1rem;background:linear-gradient(135deg,rgba(62,213,152,0.15),rgba(249,162,60,0.1));border:1px solid rgba(62,213,152,0.3)">
        <h4 style="margin:0 0 0.5rem 0;font-size:1rem">💰 Become an Affiliate</h4>
        <p style="margin:0 0 0.75rem 0;font-size:0.85rem;color:var(--muted)">Earn <span style="color:var(--good)">15-30%</span> commission on referrals.</p>
        <a href="https://signalpilot.io/affiliates.html" class="btn btn-sm btn-primary btn-block" target="_blank" rel="noopener">Learn More →</a>
      </div>`;

// Recursively find HTML files
function findHtmlFiles(dir, files = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      findHtmlFiles(fullPath, files);
    } else if (item.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  return files;
}

const curriculumPath = path.join(__dirname, '..', 'curriculum');
const htmlFiles = findHtmlFiles(curriculumPath);

console.log(`Found ${htmlFiles.length} curriculum files to update...`);

let updated = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  if (oldCardPattern.test(content)) {
    // Reset regex lastIndex
    oldCardPattern.lastIndex = 0;
    content = content.replace(oldCardPattern, newCardHTML);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${path.basename(filePath)}`);
    updated++;
  } else {
    console.log(`⏭️  No old card found: ${path.basename(filePath)}`);
  }
});

console.log(`\n📊 Updated ${updated} files`);
