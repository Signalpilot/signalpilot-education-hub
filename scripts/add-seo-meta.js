#!/usr/bin/env node
/**
 * SEO Enhancement Script
 *
 * Adds:
 * 1. <meta name="robots" content="index,follow"> to all HTML pages
 * 2. rel="prev" and rel="next" pagination links to lesson pages
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const CURRICULUM_INDEX = path.join(ROOT_DIR, 'curriculum', 'index.json');

// Load curriculum index for lesson ordering
const curriculum = JSON.parse(fs.readFileSync(CURRICULUM_INDEX, 'utf8'));

// Sort lessons by order for prev/next linking
const sortedLessons = [...curriculum].sort((a, b) => a.order - b.order);

// Create a map for quick lookup: href -> { prev, next }
const lessonNavMap = new Map();
for (let i = 0; i < sortedLessons.length; i++) {
  const lesson = sortedLessons[i];
  const prev = i > 0 ? sortedLessons[i - 1] : null;
  const next = i < sortedLessons.length - 1 ? sortedLessons[i + 1] : null;
  lessonNavMap.set(lesson.href, { prev, next });
}

// Find all HTML files
function findHtmlFiles(dir) {
  let results = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
      results = results.concat(findHtmlFiles(fullPath));
    } else if (item.isFile() && item.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

// Process a single HTML file
function processHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Add robots meta tag if missing
  if (!html.includes('name="robots"')) {
    // Find a good place to insert - after viewport meta
    const viewportMatch = html.match(/<meta name="viewport"[^>]*>/);
    if (viewportMatch) {
      const insertPoint = viewportMatch.index + viewportMatch[0].length;
      const robotsMeta = '\n  <meta name="robots" content="index,follow"/>';
      html = html.slice(0, insertPoint) + robotsMeta + html.slice(insertPoint);
      modified = true;
      console.log(`  [+] Added robots meta tag`);
    } else {
      // Fallback: insert after <head>
      html = html.replace(/<head>/, '<head>\n  <meta name="robots" content="index,follow"/>');
      modified = true;
      console.log(`  [+] Added robots meta tag (after <head>)`);
    }
  }

  // 2. Add prev/next links for lesson pages
  const relativePath = '/' + path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const navInfo = lessonNavMap.get(relativePath);

  if (navInfo) {
    // This is a lesson page - add prev/next if not already present
    const hasPrev = html.includes('rel="prev"');
    const hasNext = html.includes('rel="next"');

    if (!hasPrev && navInfo.prev) {
      const canonicalMatch = html.match(/<link rel="canonical"[^>]*>/);
      if (canonicalMatch) {
        const insertPoint = canonicalMatch.index + canonicalMatch[0].length;
        const prevUrl = `https://education.signalpilot.io${navInfo.prev.href}`;
        const prevLink = `\n  <link rel="prev" href="${prevUrl}"/>`;
        html = html.slice(0, insertPoint) + prevLink + html.slice(insertPoint);
        modified = true;
        console.log(`  [+] Added rel="prev" -> ${navInfo.prev.href}`);
      }
    }

    if (!hasNext && navInfo.next) {
      // Find where to insert (after canonical or after prev if just added)
      const prevMatch = html.match(/<link rel="prev"[^>]*>/);
      const canonicalMatch = html.match(/<link rel="canonical"[^>]*>/);
      const insertAfter = prevMatch || canonicalMatch;

      if (insertAfter) {
        const insertPoint = insertAfter.index + insertAfter[0].length;
        const nextUrl = `https://education.signalpilot.io${navInfo.next.href}`;
        const nextLink = `\n  <link rel="next" href="${nextUrl}"/>`;
        html = html.slice(0, insertPoint) + nextLink + html.slice(insertPoint);
        modified = true;
        console.log(`  [+] Added rel="next" -> ${navInfo.next.href}`);
      }
    }
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    return true;
  }

  return false;
}

// Main
console.log('SEO Enhancement Script');
console.log('======================\n');
console.log(`Loaded ${curriculum.length} lessons from curriculum index\n`);

const htmlFiles = findHtmlFiles(ROOT_DIR);
console.log(`Found ${htmlFiles.length} HTML files\n`);

let modifiedCount = 0;
for (const file of htmlFiles) {
  const relativePath = path.relative(ROOT_DIR, file);
  console.log(`Processing: ${relativePath}`);
  if (processHtmlFile(file)) {
    modifiedCount++;
  }
}

console.log(`\n======================`);
console.log(`Modified ${modifiedCount} files`);
console.log('Done!');
