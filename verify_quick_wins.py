#!/usr/bin/env python3
"""
Verify Quick Wins sections have proper collapsible structure.
"""
import re
import glob
from pathlib import Path

def verify_quick_wins_structure(file_path):
    """Verify a single file has proper Quick Wins collapsible structure."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Look for Quick Wins section specifically
    quick_wins_pattern = r'<details[^>]*>\s*<summary[^>]*>⚡ Quick Wins for Tomorrow'

    if not re.search(quick_wins_pattern, content):
        return False, "No Quick Wins collapsible section found"

    # Find the Quick Wins details section
    match = re.search(quick_wins_pattern, content)
    start_pos = match.start()

    # Extract a reasonable chunk after the start (10000 chars to handle even the longest content)
    chunk = content[start_pos:start_pos+10000]

    # Check for required elements within this chunk
    checks = {
        'has_details_open': '<details' in chunk[:100],
        'has_summary': '<summary' in chunk[:200],
        'has_quick_wins_text': 'Quick Wins for Tomorrow' in chunk[:300],
        'has_div_open': '<div style="margin-top:1rem">' in chunk,
        'has_details_close': '</details>' in chunk,
        'has_summary_close': '</summary>' in chunk
    }

    failed_checks = [k for k, v in checks.items() if not v]

    if failed_checks:
        return False, f"Failed checks: {', '.join(failed_checks)}"

    return True, "OK"

# Find all lesson HTML files
lesson_files = sorted(glob.glob('curriculum/**/*.html', recursive=True))

print(f"Checking {len(lesson_files)} lesson files...\n")

all_valid = True
issues = []

for file_path in lesson_files:
    lesson_num = Path(file_path).stem.split('-')[0]
    is_valid, message = verify_quick_wins_structure(file_path)

    if is_valid:
        print(f"✓ Lesson {lesson_num}: {message}")
    else:
        print(f"✗ Lesson {lesson_num}: {message}")
        all_valid = False
        issues.append((file_path, message))

print(f"\n{'='*60}")
if all_valid:
    print(f"✓ ALL {len(lesson_files)} lessons have valid Quick Wins structure!")
else:
    print(f"✗ Found {len(issues)} files with issues:")
    for file_path, message in issues:
        print(f"  - {file_path}: {message}")
