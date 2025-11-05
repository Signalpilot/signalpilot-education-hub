#!/usr/bin/env python3
"""
EMERGENCY FIX: Properly remove the progress-tracker and all its child elements.

The previous removal script failed - it removed the opening div but left
all the child progress-step divs orphaned, breaking the HTML structure.
"""

import re
import os
from pathlib import Path

def fix_broken_progress_tracker(filepath):
    """Remove ALL progress-tracker remnants."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Pattern 1: Remove complete progress-tracker blocks (if any remain)
    pattern1 = r'<div class="progress-tracker">.*?</div>\s*</div>'
    content = re.sub(pattern1, '', content, flags=re.DOTALL)

    # Pattern 2: Remove orphaned progress-step divs (the broken ones)
    # These are divs with step-number and step-label that are NOT inside progress-tracker
    pattern2 = r'<div class="progress-step">.*?</div>\s*</div>'
    content = re.sub(pattern2, '', content, flags=re.DOTALL)

    # Pattern 3: Aggressively find any remaining progress-step fragments
    pattern3 = r'<div class="progress-step">[\s\S]*?(?:</div>|$)'
    content = re.sub(pattern3, '', content)

    # Pattern 4: Clean up orphaned step-number and step-label divs
    pattern4 = r'<div class="step-(number|label)">.*?</div>'
    content = re.sub(pattern4, '', content, flags=re.DOTALL)

    # Clean up multiple consecutive newlines
    content = re.sub(r'\n{3,}', '\n\n', content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    all_lessons = list(curriculum_dir.rglob('*.html'))

    print(f"\n{'='*80}")
    print(f"EMERGENCY FIX: REMOVING BROKEN PROGRESS-TRACKER REMNANTS")
    print(f"{'='*80}\n")

    fixed_count = 0
    for filepath in all_lessons:
        try:
            if fix_broken_progress_tracker(filepath):
                fixed_count += 1
                print(f"✅ Fixed: {filepath.name}")
        except Exception as e:
            print(f"❌ ERROR in {filepath.name}: {e}")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Fixed {fixed_count} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
