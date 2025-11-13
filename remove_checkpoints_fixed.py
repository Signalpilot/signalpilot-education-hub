#!/usr/bin/env python3
"""
Remove all checkpoint h4 tags from lesson HTML files.
"""

import os
import re
from pathlib import Path

def remove_checkpoints(html_content):
    """
    Remove all checkpoint h4 tags from HTML content.
    Matches patterns like:
    - <h4>🟡 CHECKPOINT</h4>
    - <h4>🔴 CHECKPOINT</h4>
    - <h4>🟢 CHECKPOINT</h4>
    - <h4>🟠 CHECKPOINT</h4>
    With possible variations in spacing and time indicators
    """
    # Pattern to match checkpoint h4 tags with any emoji and optional content
    patterns = [
        r'\s*<h4>[🟡🔴🟢🟠]\s*CHECKPOINT[^<]*</h4>\s*\n?',
        r'\s*<h4>\s*CHECKPOINT[^<]*</h4>\s*\n?',  # In case emoji is separate
    ]

    modified = html_content
    for pattern in patterns:
        modified = re.sub(pattern, '', modified, flags=re.IGNORECASE)

    return modified

def process_lesson_files():
    """
    Process all lesson HTML files in the curriculum directory.
    """
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')
    levels = ['beginner', 'intermediate', 'advanced', 'professional']

    total_files = 0
    modified_files = 0
    total_checkpoints = 0

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

            # Count checkpoints before removal
            checkpoint_count = len(re.findall(r'<h4>[🟡🔴🟢🟠]?\s*CHECKPOINT', original_content, re.IGNORECASE))

            # Remove checkpoints
            modified_content = remove_checkpoints(original_content)

            # Check if anything changed
            if modified_content != original_content:
                # Write back the modified content
                with open(html_file, 'w', encoding='utf-8') as f:
                    f.write(modified_content)

                modified_files += 1
                total_checkpoints += checkpoint_count
                print(f"  ✅ Removed {checkpoint_count} checkpoint(s) from: {html_file.name}")
            else:
                print(f"  ⚪ No checkpoints found in: {html_file.name}")

    print(f"\n{'='*60}")
    print(f"✨ SUMMARY")
    print(f"{'='*60}")
    print(f"Total files processed: {total_files}")
    print(f"Files modified: {modified_files}")
    print(f"Files unchanged: {total_files - modified_files}")
    print(f"Total checkpoints removed: {total_checkpoints}")
    print(f"{'='*60}\n")

if __name__ == '__main__':
    print("🚀 Starting checkpoint removal process...\n")
    process_lesson_files()
    print("✅ Checkpoint removal complete!")
