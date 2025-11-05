#!/usr/bin/env python3
"""
Add enhanced analytics and A/B test scripts to all lessons
Version: 1.0
Date: November 5, 2025
"""

import re
from pathlib import Path
import sys

def add_scripts_to_lesson(file_path, dry_run=False):
    """Add new analytics and A/B test scripts to a lesson"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Check if scripts already added
    if 'enhanced-analytics.js' in content:
        return False, "Scripts already added"

    # Find where to insert (before </body>)
    body_end_pattern = r'(</body>)'
    body_match = re.search(body_end_pattern, content)

    if not body_match:
        return False, "No </body> tag found"

    # Scripts to add (just before </body>)
    new_scripts = '''  <!-- Enhanced Analytics & A/B Testing -->
  <script src="/assets/enhanced-analytics.js" defer></script>
  <script src="/assets/ab-test-tldr.js" defer></script>
'''

    # Insert new scripts
    insert_pos = body_match.start()
    content = content[:insert_pos] + new_scripts + content[insert_pos:]

    # Write back if not dry run
    if not dry_run:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

    return True, "Added analytics and A/B test scripts"

def main():
    """Process all lesson files"""
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    dry_run = '--dry-run' in sys.argv or '--test' in sys.argv

    if dry_run:
        print("🧪 DRY RUN MODE - No files will be modified\n")

    lesson_files = sorted(curriculum_dir.glob('*/*.html'))

    print(f"Adding analytics scripts to {len(lesson_files)} lessons...\n")

    success_count = 0
    skip_count = 0

    for lesson_file in lesson_files:
        try:
            success, message = add_scripts_to_lesson(lesson_file, dry_run=dry_run)
            if success:
                print(f"✓ {lesson_file.name}")
                success_count += 1
            else:
                if "already added" in message:
                    skip_count += 1
        except Exception as e:
            print(f"✗ {lesson_file.name}: ERROR - {e}")

    print(f"\n{'='*60}")
    print(f"✓ Added scripts to: {success_count} lessons")
    print(f"⊘ Skipped (already had): {skip_count} lessons")
    print(f"{'='*60}")

    if dry_run:
        print("\n🧪 This was a dry run. Re-run without --dry-run to apply changes.")

if __name__ == '__main__':
    main()
