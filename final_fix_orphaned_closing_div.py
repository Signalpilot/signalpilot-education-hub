#!/usr/bin/env python3
"""
FINAL FIX: Remove the orphaned closing </div> tag left from progress-tracker removal.

This orphaned </div> is breaking the entire layout because it closes a div
that was never opened, causing all subsequent divs to be misaligned.
"""

import re
from pathlib import Path

def fix_orphaned_closing_div(filepath):
    """Remove orphaned closing div after details tag."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Pattern: Find </details> followed by whitespace and orphaned </div>
    # This is the signature of our broken progress-tracker removal
    pattern = r'(</details>\s*)\n\s+\n\s+\n\s+\n\s+\n\s+</div>'

    # Replace with just the closing details tag and clean spacing
    content = re.sub(pattern, r'\1\n\n', content)

    # Also catch variations with different amounts of whitespace
    pattern2 = r'(</details>)\s*\n+\s*</div>\s*\n+(\s*<div style="background:rgba\(118,221,255)'
    content = re.sub(pattern2, r'\1\n\n\2', content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')
    all_lessons = list(curriculum_dir.rglob('*.html'))

    print(f"\n{'='*80}")
    print(f"FINAL FIX: REMOVING ORPHANED CLOSING DIV TAGS")
    print(f"{'='*80}\n")

    fixed_count = 0
    for filepath in all_lessons:
        try:
            if fix_orphaned_closing_div(filepath):
                fixed_count += 1
                print(f"✅ Fixed: {filepath.name}")
        except Exception as e:
            print(f"❌ ERROR in {filepath.name}: {e}")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Fixed {fixed_count} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
