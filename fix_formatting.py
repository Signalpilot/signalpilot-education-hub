#!/usr/bin/env python3
"""
Fix formatting issues caused by checkpoint removal.
Add newlines between closing divs and headings.
"""

import os
import re
from pathlib import Path

def fix_formatting(html_content):
    """
    Fix formatting by adding newlines between </div> and <h tags.
    """
    # Replace </div><h with </div>\n<h
    modified = re.sub(r'</div>(<h[1-6])', r'</div>\n\1', html_content)

    # Replace </div> <h with </div>\n<h (in case there's a space)
    modified = re.sub(r'</div>\s*(<h[1-6])', r'</div>\n\1', modified)

    return modified

def process_lesson_files():
    """
    Process all lesson HTML files in the curriculum directory.
    """
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')
    levels = ['beginner', 'intermediate', 'advanced', 'professional']

    total_files = 0
    modified_files = 0

    for level in levels:
        level_dir = curriculum_dir / level
        if not level_dir.exists():
            continue

        html_files = list(level_dir.glob('*.html'))
        print(f"\n📁 Processing {len(html_files)} files in {level}/")

        for html_file in html_files:
            total_files += 1

            # Read the file
            with open(html_file, 'r', encoding='utf-8') as f:
                original_content = f.read()

            # Fix formatting
            modified_content = fix_formatting(original_content)

            # Check if anything changed
            if modified_content != original_content:
                # Write back the modified content
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(modified_content)

                modified_files += 1
                print(f"  ✅ Fixed formatting in: {html_file.name}")
            else:
                print(f"  ⚪ No formatting issues in: {html_file.name}")

    print(f"\n{'='*60}")
    print(f"✨ SUMMARY")
    print(f"{'='*60}")
    print(f"Total files processed: {total_files}")
    print(f"Files with formatting fixed: {modified_files}")
    print(f"Files unchanged: {total_files - modified_files}")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    print("🚀 Starting formatting fix...\n")
    process_lesson_files()
    print("✅ Formatting fix complete!")
