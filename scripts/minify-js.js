#!/usr/bin/env node
/**
 * JavaScript Minification Script
 * Minifies all JS files in the assets directory
 * Creates .min.js versions alongside originals
 */

const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const assetsDir = path.join(__dirname, '..', 'assets');

/**
 * Recursively find all JS files in a directory
 * @param {string} dir - Directory to search
 * @param {string[]} fileList - Accumulated file list
 * @returns {string[]} List of JS file paths
 */
function findJsFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findJsFiles(filePath, fileList);
    } else if (file.endsWith('.js') && !file.endsWith('.min.js') && file !== 'config.js') {
      fileList.push(filePath);
    }
  });

  return fileList;
}

const jsFiles = findJsFiles(assetsDir);

// Also include service worker
const swPath = path.join(__dirname, '..', 'sw.js');
if (fs.existsSync(swPath)) {
  jsFiles.push(swPath);
}

console.log('⚙️  Minifying JavaScript files...\n');

let totalOriginalSize = 0;
let totalMinifiedSize = 0;

/**
 * Minify a JavaScript file
 * @param {string} inputPath - Path to input file
 * @returns {Promise<void>}
 */
async function minifyFile(inputPath) {
  const outputPath = inputPath.replace('.js', '.min.js');

  const input = fs.readFileSync(inputPath, 'utf8');
  const originalSize = Buffer.byteLength(input, 'utf8');

  try {
    const result = await minify(input, {
      compress: {
        dead_code: true,
        drop_console: false, // Keep console for logger compatibility
        drop_debugger: true,
        conditionals: true,
        evaluate: true,
        booleans: true,
        loops: true,
        unused: true,
        hoist_funs: true,
        if_return: true,
        join_vars: true,
        side_effects: true
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: /^!/
      }
    });

    if (result.error) {
      console.error(`❌ Error minifying ${path.basename(inputPath)}:`, result.error);
      return;
    }

    const minifiedSize = Buffer.byteLength(result.code, 'utf8');
    const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(2);

    fs.writeFileSync(outputPath, result.code);

    totalOriginalSize += originalSize;
    totalMinifiedSize += minifiedSize;

    console.log(`✅ ${path.relative(path.join(__dirname, '..'), inputPath)}`);
    console.log(`   ${(originalSize / 1024).toFixed(2)} KB → ${(minifiedSize / 1024).toFixed(2)} KB (${savings}% reduction)`);
  } catch (error) {
    console.error(`❌ Error minifying ${path.basename(inputPath)}:`, error.message);
  }
}

/**
 * Process all JS files
 */
async function processFiles() {
  for (const file of jsFiles) {
    await minifyFile(file);
  }

  const totalSavings = ((1 - totalMinifiedSize / totalOriginalSize) * 100).toFixed(2);

  console.log(`\n📊 Total JS minification:`);
  console.log(`   ${(totalOriginalSize / 1024).toFixed(2)} KB → ${(totalMinifiedSize / 1024).toFixed(2)} KB`);
  console.log(`   ${totalSavings}% reduction`);
}

processFiles().catch(console.error);
