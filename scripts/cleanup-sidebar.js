#!/usr/bin/env node
/**
 * Remove duplicate sidebar-links div since JS now handles it
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

// Pattern to remove the sidebar-links div we added in HTML
const sidebarLinksPattern = /\s*<div class="sidebar-links"[^>]*>[\s\S]*?<\/div>\s*(?=<\/aside>)/g;

const curriculumPath = path.join(__dirname, '..', 'curriculum');
const htmlFiles = findHtmlFiles(curriculumPath);

console.log(`Cleaning up ${htmlFiles.length} files...`);

let cleaned = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('class="sidebar-links"')) {
    content = content.replace(sidebarLinksPattern, '\n    ');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Cleaned: ${path.basename(filePath)}`);
    cleaned++;
  }
});

console.log(`\n📊 Cleaned ${cleaned} files`);
