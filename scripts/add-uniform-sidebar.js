#!/usr/bin/env node
/**
 * Add uniform sidebar links to all curriculum files
 */

const fs = require('fs');
const path = require('path');

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

// Uniform sidebar links - all same muted style
const sidebarLinks = `
      <div class="sidebar-links" style="margin-top:1rem;font-size:0.85rem">
        <a href="https://signalpilot.io" target="_blank" rel="noopener" style="display:block;color:var(--muted);text-decoration:none;padding:0.5rem 0">
          ⚡ Signal Pilot Suite
        </a>
        <a href="https://discord.gg/5guVbGEyj8" target="_blank" rel="noopener" style="display:block;color:var(--muted);text-decoration:none;padding:0.5rem 0">
          💬 Discuss on Discord
        </a>
        <a href="https://signalpilot.io/affiliates.html" target="_blank" rel="noopener" style="display:block;color:var(--muted);text-decoration:none;padding:0.5rem 0">
          💰 Earn 15-30% as Affiliate
        </a>
      </div>`;

const curriculumPath = path.join(__dirname, '..', 'curriculum');
const htmlFiles = findHtmlFiles(curriculumPath);

console.log(`Updating ${htmlFiles.length} files...`);

let updated = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Check if already has sidebar-links
  if (content.includes('class="sidebar-links"')) {
    console.log(`⏭️  Already has links: ${path.basename(filePath)}`);
    return;
  }

  // Insert after lesson-actions div, before </aside>
  const pattern = /(<\/div>\s*)(    <\/aside>)/;

  if (pattern.test(content)) {
    content = content.replace(pattern, `$1${sidebarLinks}\n$2`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${path.basename(filePath)}`);
    updated++;
  } else {
    console.log(`⚠️  Pattern not found: ${path.basename(filePath)}`);
  }
});

console.log(`\n📊 Updated ${updated} files`);
