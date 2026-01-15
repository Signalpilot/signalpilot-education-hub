#!/usr/bin/env node
/**
 * Remove box styling from sidebar-links, make them naked links
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

const curriculumPath = path.join(__dirname, '..', 'curriculum');
const htmlFiles = findHtmlFiles(curriculumPath);

console.log(`Updating ${htmlFiles.length} files...`);

let updated = 0;

htmlFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove box styling - just keep margin-top and font-size
  const oldPattern = /<div class="sidebar-links" style="margin-top:1rem;font-size:0\.85rem">/g;
  const newDiv = '<div class="sidebar-links" style="margin-top:1.5rem">';

  if (oldPattern.test(content)) {
    content = content.replace(oldPattern, newDiv);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated: ${path.basename(filePath)}`);
    updated++;
  }
});

console.log(`\n📊 Updated ${updated} files`);
