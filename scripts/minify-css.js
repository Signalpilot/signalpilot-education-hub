#!/usr/bin/env node
/**
 * CSS Minification Script
 * Minifies all CSS files in the assets directory
 * Creates .min.css versions alongside originals
 */

const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');

const assetsDir = path.join(__dirname, '..', 'assets');
const cssFiles = fs.readdirSync(assetsDir)
  .filter(file => file.endsWith('.css') && !file.endsWith('.min.css'));

console.log('🎨 Minifying CSS files...\n');

const cleanCSS = new CleanCSS({
  level: 2,
  compatibility: 'ie9'
});

let totalOriginalSize = 0;
let totalMinifiedSize = 0;

cssFiles.forEach(file => {
  const inputPath = path.join(assetsDir, file);
  const outputPath = path.join(assetsDir, file.replace('.css', '.min.css'));

  const input = fs.readFileSync(inputPath, 'utf8');
  const originalSize = Buffer.byteLength(input, 'utf8');

  const output = cleanCSS.minify(input);

  if (output.errors.length > 0) {
    console.error(`❌ Error minifying ${file}:`, output.errors);
    return;
  }

  const minifiedSize = Buffer.byteLength(output.styles, 'utf8');
  const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(2);

  fs.writeFileSync(outputPath, output.styles);

  totalOriginalSize += originalSize;
  totalMinifiedSize += minifiedSize;

  console.log(`✅ ${file}`);
  console.log(`   ${(originalSize / 1024).toFixed(2)} KB → ${(minifiedSize / 1024).toFixed(2)} KB (${savings}% reduction)`);
});

const totalSavings = ((1 - totalMinifiedSize / totalOriginalSize) * 100).toFixed(2);

console.log(`\n📊 Total CSS minification:`);
console.log(`   ${(totalOriginalSize / 1024).toFixed(2)} KB → ${(totalMinifiedSize / 1024).toFixed(2)} KB`);
console.log(`   ${totalSavings}% reduction`);
