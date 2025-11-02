#!/usr/bin/env node
/**
 * Automated Link Checker
 * Scans all HTML files for broken internal links
 * Validates anchor links and file references
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const rootDir = path.join(__dirname, '..');
const htmlFiles = [];
const errors = [];
const warnings = [];

/**
 * Find all HTML files in the root directory
 * @param {string} dir - Directory to search
 */
function findHtmlFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile() && file.endsWith('.html')) {
      htmlFiles.push(filePath);
    }
  });
}

/**
 * Check if a file exists relative to root
 * @param {string} href - Link href attribute
 * @returns {boolean} True if file exists
 */
function fileExists(href) {
  // Remove hash
  const cleanHref = href.split('#')[0];

  if (!cleanHref || cleanHref.startsWith('http://') || cleanHref.startsWith('https://') || cleanHref.startsWith('mailto:') || cleanHref.startsWith('tel:')) {
    return true; // Skip external links
  }

  const filePath = path.join(rootDir, cleanHref);
  return fs.existsSync(filePath);
}

/**
 * Check if an anchor exists in a file
 * @param {string} href - Link href attribute
 * @param {string} currentFile - Current HTML file path
 * @returns {boolean} True if anchor exists
 */
function anchorExists(href, currentFile) {
  if (!href.includes('#')) {
    return true;
  }

  const [file, anchor] = href.split('#');
  const targetFile = file ? path.join(rootDir, file) : currentFile;

  if (!fs.existsSync(targetFile)) {
    return false;
  }

  const content = fs.readFileSync(targetFile, 'utf8');
  const $ = cheerio.load(content);

  // Check for id or name attribute
  const exists = $(`#${anchor}, [name="${anchor}"]`).length > 0;
  return exists;
}

/**
 * Check links in an HTML file
 * @param {string} filePath - Path to HTML file
 */
function checkLinks(filePath) {
  const fileName = path.relative(rootDir, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(content);

  // Check all anchor tags
  $('a[href]').each((i, elem) => {
    const href = $(elem).attr('href');

    if (!href || href === '#' || href.startsWith('javascript:')) {
      return;
    }

    // Skip external links
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return;
    }

    // Check if file exists
    if (!fileExists(href)) {
      errors.push({
        file: fileName,
        type: 'broken-link',
        link: href,
        message: `Broken link: ${href}`
      });
      return;
    }

    // Check if anchor exists
    if (href.includes('#') && !anchorExists(href, filePath)) {
      errors.push({
        file: fileName,
        type: 'broken-anchor',
        link: href,
        message: `Broken anchor: ${href}`
      });
    }
  });

  // Check script sources
  $('script[src]').each((i, elem) => {
    const src = $(elem).attr('src');

    if (!src || src.startsWith('http://') || src.startsWith('https://')) {
      return;
    }

    if (!fileExists(src)) {
      errors.push({
        file: fileName,
        type: 'missing-script',
        link: src,
        message: `Missing script: ${src}`
      });
    }
  });

  // Check link stylesheets
  $('link[rel="stylesheet"][href]').each((i, elem) => {
    const href = $(elem).attr('href');

    if (!href || href.startsWith('http://') || href.startsWith('https://')) {
      return;
    }

    if (!fileExists(href)) {
      errors.push({
        file: fileName,
        type: 'missing-stylesheet',
        link: href,
        message: `Missing stylesheet: ${href}`
      });
    }
  });

  // Check images
  $('img[src]').each((i, elem) => {
    const src = $(elem).attr('src');

    if (!src || src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
      return;
    }

    if (!fileExists(src)) {
      warnings.push({
        file: fileName,
        type: 'missing-image',
        link: src,
        message: `Missing image: ${src}`
      });
    }
  });
}

console.log('🔍 Checking links in HTML files...\n');

findHtmlFiles(rootDir);

htmlFiles.forEach(file => {
  checkLinks(file);
});

// Report results
if (errors.length === 0 && warnings.length === 0) {
  console.log('✅ All links are valid!\n');
} else {
  if (errors.length > 0) {
    console.log(`❌ Found ${errors.length} error(s):\n`);
    errors.forEach(error => {
      console.log(`  ${error.file}`);
      console.log(`    ${error.message}`);
    });
    console.log();
  }

  if (warnings.length > 0) {
    console.log(`⚠️  Found ${warnings.length} warning(s):\n`);
    warnings.forEach(warning => {
      console.log(`  ${warning.file}`);
      console.log(`    ${warning.message}`);
    });
    console.log();
  }
}

console.log(`📊 Summary:`);
console.log(`   Files checked: ${htmlFiles.length}`);
console.log(`   Errors: ${errors.length}`);
console.log(`   Warnings: ${warnings.length}`);

process.exit(errors.length > 0 ? 1 : 0);
