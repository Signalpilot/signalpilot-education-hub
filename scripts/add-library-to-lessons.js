#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

/**
 * Add library.js to all lesson HTML files
 */
async function addLibraryToLessons() {
  console.log('🔍 Finding lesson HTML files...\n');

  // Find all lesson HTML files
  const files = await glob('curriculum/**/*.html', {
    cwd: path.join(__dirname, '..'),
    absolute: true
  });

  console.log(`Found ${files.length} lesson files\n`);

  let modifiedCount = 0;
  let skippedCount = 0;

  for (const file of files) {
    try {
      let content = fs.readFileSync(file, 'utf8');

      // Check if library.js is already present
      if (content.includes('assets/library.js')) {
        console.log(`⏭️  Skipped: ${path.basename(file)} (already has library.js)`);
        skippedCount++;
        continue;
      }

      // Add library.js after auth-ui.js in the body section
      // Pattern: Find auth-ui.js and add library.js after it
      const authUiPattern = /(<script src="\/assets\/auth-ui\.js"><\/script>)/;

      if (authUiPattern.test(content)) {
        content = content.replace(
          authUiPattern,
          '$1\n  <script src="/assets/library.js"></script>'
        );
      } else {
        // Fallback: Add before closing </body> tag
        content = content.replace(
          '</body>',
          '  <script src="/assets/library.js"></script>\n</body>'
        );
      }

      // Write the modified content
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Modified: ${path.basename(file)}`);
      modifiedCount++;

    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully modified: ${modifiedCount} files`);
  console.log(`⏭️  Skipped (already updated): ${skippedCount} files`);
  console.log('='.repeat(50));
}

// Run the script
addLibraryToLessons().catch(console.error);
