#!/usr/bin/env python3
"""
Add toc-active.js script to all lesson HTML files.
"""

import re
from pathlib import Path

def add_toc_script(filepath):
    """Add toc-active.js script after edu-enhanced.js."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Check if already has toc-active.js
    if 'toc-active.js' in content:
        return False

    # Pattern: Find edu-enhanced.js and insert toc-active.js after it
    pattern = r'(<script src="/assets/edu-enhanced\.js"></script>)'
    replacement = r'\1\n<script src="/assets/toc-active.js"></script>'

    content = re.sub(pattern, replacement, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True

    return False

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')
    all_lessons = list(curriculum_dir.rglob('*.html'))

    print(f"\n{'='*80}")
    print(f"ADDING TOC ACTIVE SCRIPT TO ALL LESSONS")
    print(f"{'='*80}\n")

    added_count = 0
    for filepath in sorted(all_lessons):
        if add_toc_script(filepath):
            added_count += 1
            print(f"✅ {filepath.name}")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Added script to {added_count} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
