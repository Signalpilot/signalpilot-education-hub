#!/usr/bin/env python3
"""
Remove all checkpoint callouts from lesson HTML files.
"""

import os
import re
from pathlib import Path

def remove_checkpoints(html_content):
    """
    Remove all checkpoint callout divs from HTML content.
    Handles both multi-line and single-line checkpoint divs.
    """
    # Pattern to match checkpoint divs with any content between opening and closing tags
    # This handles multi-line divs with the checkpoint indicator
    checkpoint_pattern = r'<div class="callout-info"[^>]*>.*?<h4>🟡 CHECKPOINT.*?</div>\s*'

    # Also match red and green checkpoint variants
    red_checkpoint_pattern = r'<div class="callout-info"[^>]*>.*?<h4>🔴 CHECKPOINT.*?</div>\s*'
    green_checkpoint_pattern = r'<div class="callout-info"[^>]*>.*?<h4>🟢 CHECKPOINT.*?</div>\s*'
    orange_checkpoint_pattern = r'<div class="callout-info"[^>]*>.*?<h4>🟠 CHECKPOINT.*?</div>\s*'

    # Remove all checkpoint variants (using DOTALL flag to match across newlines)
    html_content = re.sub(checkpoint_pattern, '', html_content, flags=re.DOTALL | re.IGNORECASE)
    html_content = re.sub(red_checkpoint_pattern, '', html_content, flags=re.DOTALL | re.IGNORECASE)
    html_content = re.sub(green_checkpoint_pattern, '', html_content, flags=re.DOTALL | re.IGNORECASE)
    html_content = re.sub(orange_checkpoint_pattern, '', html_content, flags=re.DOTALL | re.IGNORECASE)

    return html_content

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
            print(f"⚠️  Directory not found: {level_dir}")
            continue

        html_files = list(level_dir.glob('*.html'))
        print(f"\n📁 Processing {len(html_files)} files in {level}/")

        for html_file in html_files:
            total_files += 1

            # Read the file
            with open(html_file, 'r', encoding='utf-8') as f:
                original_content = f.read()

            # Remove checkpoints
            modified_content = remove_checkpoints(original_content)

            # Check if anything changed
            if modified_content != original_content:
                # Write back the modified content
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(modified_content)

                modified_files += 1
                print(f"  ✅ Removed checkpoints from: {html_file.name}")
            else:
                print(f"  ⚪ No checkpoints found in: {html_file.name}")

    print(f"\n{'='*60}")
    print(f"✨ SUMMARY")
    print(f"{'='*60}")
    print(f"Total files processed: {total_files}")
    print(f"Files modified: {modified_files}")
    print(f"Files unchanged: {total_files - modified_files}")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    print("🚀 Starting checkpoint removal process...\n")
    process_lesson_files()
    print("✅ Checkpoint removal complete!")
