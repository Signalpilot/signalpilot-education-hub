#!/usr/bin/env node
/**
 * Console.log to Logger Migration Script
 * Automatically migrates console.log, console.warn, console.info to logger equivalents
 * Preserves console.error (as logger.error passes through)
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Files to skip (already using logger or special cases)
const skipFiles = [
  'logger.js',
  'dev-utils.js', // Will be deprecated
  'sw.js', // Service worker - no window.logger access
  'build.js',
  'minify-css.js',
  'minify-js.js',
  'check-links.js',
  'extract-critical-css.js',
  'migrate-to-logger.js'
];

/**
 * Find all JS files to migrate
 * @param {string} dir - Directory to search
 * @param {string[]} fileList - Accumulated file list
 * @returns {string[]} List of JS file paths
 */
function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    const fileName = path.basename(filePath);

    if (stat.isDirectory() && !fileName.startsWith('.')) {
      findJsFiles(filePath, fileList);
    } else if (file.endsWith('.js') && !skipFiles.includes(fileName)) {
      fileList.push(filePath);
    }
  });

  return fileList;
}

/**
 * Migrate console calls to logger in a file
 * @param {string} filePath - Path to JS file
 * @returns {Object} Migration stats
 */
function migrateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = content;
  let changes = 0;

  // Migration patterns
  const migrations = [
    {
      // console.log -> logger.log
      pattern: /console\.log\(/g,
      replacement: 'logger.log(',
      type: 'log'
    },
    {
      // console.info -> logger.info
      pattern: /console\.info\(/g,
      replacement: 'logger.info(',
      type: 'info'
    },
    {
      // console.warn -> logger.warn
      pattern: /console\.warn\(/g,
      replacement: 'logger.warn(',
      type: 'warn'
    },
    {
      // console.debug -> logger.debug
      pattern: /console\.debug\(/g,
      replacement: 'logger.debug(',
      type: 'debug'
    }
  ];

  // Apply migrations
  migrations.forEach(migration => {
    const matches = content.match(migration.pattern);
    if (matches) {
      modified = modified.replace(migration.pattern, migration.replacement);
      changes += matches.length;
    }
  });

  // Write back if changed
  if (changes > 0) {
    fs.writeFileSync(filePath, modified);
  }

  return { changes, filePath: path.relative(rootDir, filePath) };
}

console.log('🔄 Migrating console.log to logger.log...\n');

const jsFiles = findJsFiles(path.join(rootDir, 'assets'));
let totalChanges = 0;
const modifiedFiles = [];

jsFiles.forEach(file => {
  const result = migrateFile(file);

  if (result.changes > 0) {
    modifiedFiles.push(result);
    totalChanges += result.changes;
    console.log(`✅ ${result.filePath} - ${result.changes} change(s)`);
  }
});

console.log(`\n📊 Migration complete:`);
console.log(`   Files modified: ${modifiedFiles.length}`);
console.log(`   Total changes: ${totalChanges}`);

if (modifiedFiles.length > 0) {
  console.log(`\n⚠️  Important:`);
  console.log(`   1. Make sure logger.js is loaded before these files`);
  console.log(`   2. Test the application thoroughly`);
  console.log(`   3. Check for any console.error that should remain`);
}

console.log(`\n📝 Skipped files (special cases):`);
skipFiles.forEach(file => {
  console.log(`   - ${file}`);
});
