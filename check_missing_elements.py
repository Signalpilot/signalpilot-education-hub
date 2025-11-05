#!/usr/bin/env python3
"""
Check for missing critical elements across all lessons.
"""

from pathlib import Path

def check_lesson(filepath):
    """Check for missing critical elements."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    issues = []

    if 'bg-aurora' not in content:
        issues.append("Missing bg-aurora")

    if '<aside class="toc"' not in content:
        issues.append("Missing TOC sidebar")

    return issues

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')
    all_lessons = list(curriculum_dir.rglob('*.html'))

    damaged_lessons = {}

    for filepath in sorted(all_lessons):
        issues = check_lesson(filepath)
        if issues:
            damaged_lessons[filepath.name] = issues

    print(f"\n{'='*80}")
    print(f"CRITICAL ELEMENTS CHECK")
    print(f"{'='*80}\n")

    if damaged_lessons:
        print(f"Found {len(damaged_lessons)} lessons with missing elements:\n")
        for filename, issues in sorted(damaged_lessons.items()):
            print(f"{filename}:")
            for issue in issues:
                print(f"  - {issue}")
    else:
        print("✅ All lessons have required elements")

    print(f"\n{'='*80}\n")

if __name__ == '__main__':
    main()
