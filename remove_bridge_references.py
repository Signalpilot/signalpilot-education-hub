#!/usr/bin/env python3
"""
Remove all "bridge" references from lesson files.

Mapping:
- Lessons 13-20 (beginner-bridge) → Intermediate
- Lessons 36-47 (intermediate-bridge) → Advanced
"""

import re
import glob

def fix_bridge_references(filepath):
    """Remove bridge references and replace with proper tier."""

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Determine the correct tier based on folder
    if '/beginner-bridge/' in filepath:
        # Lessons 13-20 should be Intermediate
        tier = 'Intermediate'
        tier_badge_color = '🟡'
    elif '/intermediate-bridge/' in filepath:
        # Lessons 36-47 should be Advanced
        tier = 'Advanced'
        tier_badge_color = '🔴'
    else:
        # File might have bridge references but not in a bridge folder
        # Just remove bridge text but don't know tier
        tier = None

    if tier:
        # Fix meta tag
        content = re.sub(
            r'<meta name="sp-level" content="[^"]*[Bb]ridge[^"]*">',
            f'<meta name="sp-level" content="{tier}">',
            content
        )

        # Fix breadcrumbs - multiple patterns
        content = re.sub(
            r'<a href="/">Beginner Bridge</a>',
            f'<a href="/{tier.lower()}.html">{tier}</a>',
            content
        )

        content = re.sub(
            r'<a href="/">Intermediate-Bridge</a>',
            f'<a href="/{tier.lower()}.html">{tier}</a>',
            content
        )

        content = re.sub(
            r'<a href="/">Intermediate Bridge</a>',
            f'<a href="/{tier.lower()}.html">{tier}</a>',
            content
        )

        content = re.sub(
            r'<a href="/">Int Bridge</a>',
            f'<a href="/{tier.lower()}.html">{tier}</a>',
            content
        )

        # Fix badges
        content = re.sub(
            r'<span class="badge">[^<]*[Bb]eginner-?[Ii]ntermediate [Bb]ridge[^<]*Lesson (\d+)</span>',
            f'<span class="badge">{tier_badge_color} {tier} • Lesson \\1</span>',
            content
        )

        content = re.sub(
            r'<span class="badge">Bridge #(\d+)</span>',
            f'<span class="badge">{tier} #\\1</span>',
            content
        )

        # Fix "Back to ... Bridge" links
        content = re.sub(
            r'Back to (Beginner|Intermediate) Bridge',
            f'Back to {tier}',
            content
        )

    # Generic cleanup - remove any remaining "bridge" in display text (case insensitive)
    # But be careful not to replace it in URLs or where it's part of actual content
    # (like "bridge from student to professional" should stay)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True

    return False


def main():
    print("=" * 80)
    print("REMOVING ALL 'BRIDGE' REFERENCES FROM LESSONS")
    print("=" * 80)

    # Get all HTML files
    files = glob.glob('curriculum/**/*.html', recursive=True)

    beginner_bridge_fixed = []
    intermediate_bridge_fixed = []
    other_fixed = []

    for filepath in sorted(files):
        if fix_bridge_references(filepath):
            filename = filepath.split('/')[-1]

            if '/beginner-bridge/' in filepath:
                beginner_bridge_fixed.append(filename)
            elif '/intermediate-bridge/' in filepath:
                intermediate_bridge_fixed.append(filename)
            else:
                other_fixed.append(filename)

    print("\n📁 BEGINNER-BRIDGE → INTERMEDIATE (Lessons 13-20):")
    print("=" * 80)
    for f in beginner_bridge_fixed:
        print(f"  ✅ {f}")

    print(f"\n  Total: {len(beginner_bridge_fixed)} files")

    print("\n📁 INTERMEDIATE-BRIDGE → ADVANCED (Lessons 36-47):")
    print("=" * 80)
    for f in intermediate_bridge_fixed:
        print(f"  ✅ {f}")

    print(f"\n  Total: {len(intermediate_bridge_fixed)} files")

    if other_fixed:
        print("\n📁 OTHER FILES WITH BRIDGE REFERENCES:")
        print("=" * 80)
        for f in other_fixed:
            print(f"  ✅ {f}")

        print(f"\n  Total: {len(other_fixed)} files")

    print("\n" + "=" * 80)
    print(f"SUMMARY: Fixed {len(beginner_bridge_fixed) + len(intermediate_bridge_fixed) + len(other_fixed)} files")
    print("=" * 80)


if __name__ == "__main__":
    main()
