#!/usr/bin/env node
/**
 * SEO Meta Tag Injection Script
 * Adds OG/Twitter meta tags to all HTML pages missing them.
 * Standardizes title patterns to "Title — Signal Pilot Education".
 * Ensures canonical tags, theme-color, and favicon links are present.
 */

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const BASE_URL = 'https://education.signalpilot.io';
const PREVIEW_IMG = BASE_URL + '/preview.png';
const SITE_NAME = 'Signal Pilot Education';

// Title suffix standardization
const TITLE_SUFFIX = ' — Signal Pilot Education';

// Load lesson index for metadata
const lessonIndex = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'curriculum', 'index.json'), 'utf8')
);

// Build a map of href -> lesson data
const lessonMap = {};
lessonIndex.forEach(lesson => {
  lessonMap[lesson.href] = lesson;
});

function getRelativePath(filePath) {
  const root = path.join(__dirname, '..');
  let rel = '/' + path.relative(root, filePath);
  if (rel.endsWith('/index.html')) rel = rel.replace('/index.html', '/');
  return rel;
}

function getCanonicalUrl(relPath) {
  if (relPath === '/index.html') return BASE_URL + '/';
  return BASE_URL + relPath;
}

function hasTag(html, pattern) {
  return pattern.test(html);
}

function processFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const relPath = getRelativePath(filePath);
  const canonicalUrl = getCanonicalUrl(relPath);
  let modified = false;

  // Extract current title
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  if (!titleMatch) return;
  let currentTitle = titleMatch[1];

  // Extract current description
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/);
  const description = descMatch ? descMatch[1] : '';

  // --- Standardize title pattern ---
  // Remove old suffixes and apply consistent one
  const oldSuffixes = [
    / — Signal Pilot Learn$/,
    / — Signal Pilot Education$/,
    / — Signal Pilot$/,
    / - SignalPilot Education Hub$/,
    / - Signal Pilot Education Hub$/,
    / — SignalPilot$/,
    / \| Signal Pilot$/,
  ];

  let baseTitle = currentTitle;
  for (const suffix of oldSuffixes) {
    baseTitle = baseTitle.replace(suffix, '');
  }

  const newTitle = baseTitle + TITLE_SUFFIX;
  if (newTitle !== currentTitle) {
    html = html.replace(
      `<title>${currentTitle}</title>`,
      `<title>${newTitle}</title>`
    );
    modified = true;
  }

  // --- Add theme-color if missing ---
  if (!hasTag(html, /<meta\s+name="theme-color"/)) {
    html = html.replace(
      /<link\s+rel="canonical"/,
      '<meta name="theme-color" content="#05070d">\n  <link rel="canonical"'
    );
    modified = true;
  }

  // --- Add OG tags if missing ---
  if (!hasTag(html, /property="og:title"/)) {
    const ogTags = `
  <!-- Open Graph / Social Media Preview -->
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${newTitle.replace(/"/g, '&quot;')}">
  <meta property="og:description" content="${description.replace(/"/g, '&quot;')}">
  <meta property="og:image" content="${PREVIEW_IMG}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:site_name" content="${SITE_NAME}">`;

    // Insert after canonical tag
    const canonicalPattern = /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/;
    const canonicalMatch = html.match(canonicalPattern);
    if (canonicalMatch) {
      html = html.replace(
        canonicalMatch[0],
        canonicalMatch[0] + ogTags
      );
      modified = true;
    }
  } else {
    // Update existing OG title to match new standardized title
    html = html.replace(
      /(<meta\s+property="og:title"\s+content=")([^"]+)(")/,
      `$1${newTitle.replace(/"/g, '&quot;')}$3`
    );
    modified = true;
  }

  // --- Add Twitter card tags if missing ---
  if (!hasTag(html, /name="twitter:card"/)) {
    const twitterTags = `
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:url" content="${canonicalUrl}">
  <meta name="twitter:title" content="${newTitle.replace(/"/g, '&quot;')}">
  <meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}">
  <meta name="twitter:image" content="${PREVIEW_IMG}">`;

    // Insert after OG tags (find the last og: tag)
    const lastOgPattern = /<meta\s+property="og:site_name"[^>]*>/;
    const lastOgMatch = html.match(lastOgPattern);
    if (lastOgMatch) {
      html = html.replace(
        lastOgMatch[0],
        lastOgMatch[0] + twitterTags
      );
      modified = true;
    } else {
      // Fallback: insert after last og:image tag
      const ogImagePattern = /<meta\s+property="og:image:height"[^>]*>/;
      const ogImageMatch = html.match(ogImagePattern);
      if (ogImageMatch) {
        html = html.replace(
          ogImageMatch[0],
          ogImageMatch[0] + twitterTags
        );
        modified = true;
      }
    }
  } else {
    // Update existing Twitter title
    html = html.replace(
      /(<meta\s+name="twitter:title"\s+content=")([^"]+)(")/,
      `$1${newTitle.replace(/"/g, '&quot;')}$3`
    );
    modified = true;
  }

  // --- Ensure favicon links are present ---
  if (!hasTag(html, /rel="icon"/) && !hasTag(html, /rel="shortcut icon"/)) {
    html = html.replace(
      /<link\s+rel="manifest"/,
      '<link rel="icon" type="image/x-icon" href="/favicon.ico">\n  <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/icon-180x180.png">\n  <link rel="manifest"'
    );
    modified = true;
  }

  // --- Ensure manifest link is present ---
  if (!hasTag(html, /rel="manifest"/)) {
    html = html.replace(
      '</head>',
      '  <link rel="manifest" href="/manifest.json">\n</head>'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log('Updated:', relPath);
  } else {
    console.log('  (no changes):', relPath);
  }
}

async function main() {
  const root = path.join(__dirname, '..');

  // Find all HTML files (excluding node_modules, .git)
  const files = await glob('**/*.html', {
    cwd: root,
    absolute: true,
    ignore: ['**/node_modules/**', '**/.git/**', '**/offline.html']
  });

  console.log(`Found ${files.length} HTML files\n`);

  let updated = 0;
  for (const file of files) {
    try {
      processFile(file);
      updated++;
    } catch (err) {
      console.error(`Error processing ${file}:`, err.message);
    }
  }

  console.log(`\nDone. Processed ${updated} files.`);
}

main().catch(console.error);
