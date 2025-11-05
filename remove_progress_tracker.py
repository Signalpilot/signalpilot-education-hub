#!/usr/bin/env python3
"""
Remove the useless progress-tracker element from all lesson HTML files.

This element:
- Has no CSS styling
- Has no JavaScript functionality
- Shows the same generic labels on EVERY lesson
- Provides no educational value
- Confuses students

Good riddance.
"""

import re
import os
from pathlib import Path

def remove_progress_tracker(filepath):
    """Remove progress-tracker from a single lesson file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Remove the entire progress-tracker div block
    # This pattern matches the div and all its nested content
    pattern = r'\s*<div class="progress-tracker">.*?</div>\s*</div>\s*'

    # Remove it
    content_cleaned = re.sub(pattern, '\n', content, flags=re.DOTALL)

    # Write back if changed
    if content_cleaned != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content_cleaned)
        return True
    return False

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    all_lessons = list(curriculum_dir.rglob('*.html'))

    print(f"\n{'='*80}")
    print(f"REMOVING USELESS PROGRESS-TRACKER FROM ALL LESSONS")
    print(f"{'='*80}\n")

    removed_count = 0
    for filepath in all_lessons:
        try:
            if remove_progress_tracker(filepath):
                removed_count += 1
                print(f"✅ Removed from: {filepath.name}")
        except Exception as e:
            print(f"❌ ERROR in {filepath.name}: {e}")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Removed progress-tracker from {removed_count} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
