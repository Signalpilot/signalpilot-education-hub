#!/usr/bin/env node
/**
 * Add affiliate tier card to all curriculum lesson sidebars
 */

const fs = require('fs');
const path = require('path');

// Affiliate card HTML - matches the Discord card style
const affiliateCardHTML = `
      <div class="card affiliate-tiers-card" style="margin-top:1rem;padding:1rem;background:linear-gradient(135deg,rgba(62,213,152,0.15),rgba(249,162,60,0.1));border:1px solid rgba(62,213,152,0.3)">
        <h4 style="margin:0 0 0.5rem 0;font-size:1rem;display:flex;align-items:center;gap:0.5rem">
          💰 Earn With Signal Pilot
        </h4>
        <p style="margin:0 0 0.75rem 0;font-size:0.85rem;color:var(--muted)">Share & earn up to 30% commission.</p>
        <div style="font-size:0.8rem;margin-bottom:0.75rem;display:grid;grid-template-columns:1fr 1fr;gap:0.25rem 0.5rem">
          <span style="color:var(--muted)">0-9 refs:</span><span style="color:var(--good)">15%</span>
          <span style="color:var(--muted)">10-24:</span><span style="color:var(--good)">20%</span>
          <span style="color:var(--muted)">25-49:</span><span style="color:#f9a23c">25%</span>
          <span style="color:var(--muted)">50+:</span><span style="color:#ffd700;font-weight:600">30%</span>
        </div>
        <a href="https://signalpilot.io/affiliates.html" class="btn btn-sm btn-primary btn-block" target="_blank" rel="noopener">Become an Affiliate →</a>
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

// Find all curriculum HTML files
const curriculumPath = path.join(__dirname, '..', 'curriculum');
const htmlFiles = findHtmlFiles(curriculumPath);

console.log(`Found ${htmlFiles.length} curriculum files to process...`);

let modified = 0;
let skipped = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already has affiliate card
  if (content.includes('affiliate-tiers-card')) {
    console.log(`⏭️  Skipping (already has card): ${path.basename(filePath)}`);
    skipped++;
    return;
  }

  // Find the Discord card and insert affiliate card after it
  const discordCardPattern = /<div class="card" style="margin-top:1rem;padding:1rem;background:linear-gradient\(135deg,rgba\(88,101,242/;

  if (discordCardPattern.test(content)) {
    // Find the closing </div> of the Discord card and insert after it
    // The Discord card ends with </a>\n      </div>
    const discordCardEndPattern = /(<a href="https:\/\/discord\.gg\/[^"]*" class="btn btn-sm btn-primary btn-block"[^>]*>Join Discord →<\/a>\s*<\/div>)/;

    if (discordCardEndPattern.test(content)) {
      content = content.replace(discordCardEndPattern, `$1${affiliateCardHTML}`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Added affiliate card to: ${path.basename(filePath)}`);
      modified++;
    } else {
      console.log(`⚠️  Could not find Discord card end pattern in: ${path.basename(filePath)}`);
    }
  } else {
    console.log(`⚠️  No Discord card found in: ${path.basename(filePath)}`);
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Modified: ${modified} files`);
console.log(`   Skipped:  ${skipped} files`);
console.log(`   Total:    ${htmlFiles.length} files`);
