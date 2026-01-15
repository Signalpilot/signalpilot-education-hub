#!/usr/bin/env node
/**
 * Simplify all sidebar cards to be subtle and non-distracting
 */

const fs = require('fs');
const path = require('path');

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

// New simplified sidebar HTML - subtle, compact, single color
const newSidebarContent = `<aside class="toc-sidebar">
      <div class="lesson-actions">
        <button id="bookmark-btn" class="btn btn-secondary btn-sm btn-block" onclick="window.library?.isBookmarked() ? window.library.removeBookmark() : window.library.addBookmark({title:document.title})">🔖 Bookmark</button>
        <button onclick="window.print()" class="btn btn-secondary btn-sm btn-block">📄 Save PDF</button>
      </div>
      <div class="sidebar-links" style="margin-top:1rem;padding:0.75rem;background:var(--bg-elev);border-radius:8px;font-size:0.85rem">
        <a href="https://discord.gg/K6BgD8wN" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:0.5rem;color:var(--muted);text-decoration:none;padding:0.5rem 0;border-bottom:1px solid var(--bg-soft)">
          <span>💬</span> Discuss on Discord
        </a>
        <a href="https://signalpilot.io/affiliates.html" target="_blank" rel="noopener" style="display:flex;align-items:center;gap:0.5rem;color:var(--muted);text-decoration:none;padding:0.5rem 0">
          <span>💰</span> Earn 15-30% as Affiliate
        </a>
      </div>
    </aside>`;

// Pattern to match the entire aside.toc-sidebar section
const sidebarPattern = /<aside class="toc-sidebar">[\s\S]*?<\/aside>/g;

const curriculumPath = path.join(__dirname, '..', 'curriculum');
const htmlFiles = findHtmlFiles(curriculumPath);

console.log(`Found ${htmlFiles.length} curriculum files to simplify...`);

let updated = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  if (sidebarPattern.test(content)) {
    sidebarPattern.lastIndex = 0;
    content = content.replace(sidebarPattern, newSidebarContent);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Simplified: ${path.basename(filePath)}`);
    updated++;
  } else {
    console.log(`⚠️  No sidebar found: ${path.basename(filePath)}`);
  }
});

console.log(`\n📊 Simplified ${updated} files`);
