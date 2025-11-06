#!/usr/bin/env python3
"""
Fix remaining bridge text that appears in the UI.
Keep folder paths as-is (beginner-bridge, intermediate-bridge)
but change all display text to proper tiers.
"""

import re
import glob

def fix_file(filepath):
    """Fix remaining bridge display text."""

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content

    # Determine tier based on lesson number or folder
    lesson_match = re.search(r'/(\d+)-', filepath)
    if lesson_match:
        lesson_num = int(lesson_match.group(1))

        if 13 <= lesson_num <= 20:
            tier = 'Intermediate'
            tier_badge_color = '🟡'
        elif 36 <= lesson_num <= 47:
            tier = 'Advanced'
            tier_badge_color = '🔴'
        else:
            tier = None
            tier_badge_color = None
    else:
        tier = None
        tier_badge_color = None

    # Fix breadcrumbs - any standalone "Bridge" text
    if tier:
        content = re.sub(
            r'<a href="/">Bridge</a>',
            f'<a href="/{tier.lower()}.html">{tier}</a>',
            content
        )

        # Fix tier badges
        content = re.sub(
            r'<span class="tier-badge tier-bridge">Bridge</span>',
            f'<span class="tier-badge tier-{tier.lower()}">{tier}</span>',
            content
        )

        # Fix lesson badges that still say Bridge
        content = re.sub(
            r'<span class="badge badge-lesson">LESSON \d+</span>\s*<span class="badge badge-tier-bridge">BRIDGE</span>',
            f'<span class="badge badge-lesson">LESSON {lesson_num}</span>\n        <span class="badge badge-tier-{tier.lower()}">{tier.upper()}</span>',
            content,
            flags=re.IGNORECASE
        )

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True

    return False


def main():
    print("=" * 80)
    print("FIXING REMAINING BRIDGE DISPLAY TEXT")
    print("=" * 80)

    files = glob.glob('curriculum/**/*.html', recursive=True)
    fixed = []

    for filepath in sorted(files):
        if fix_file(filepath):
            fixed.append(filepath.split('/')[-1])

    if fixed:
        print("\n✅ Fixed display text in:")
        for f in fixed:
            print(f"  • {f}")
        print(f"\nTotal: {len(fixed)} files")
    else:
        print("\n✅ No additional fixes needed!")

    print("\n" + "=" * 80)


if __name__ == "__main__":
    main()
