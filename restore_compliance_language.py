#!/usr/bin/env python3
"""
RESTORE compliance language (potential, area, etc.)
This is REQUIRED for financial education compliance - no directive language!
"""

import re
from pathlib import Path

def restore_compliance_language(content):
    """Restore hedging language for compliance"""

    replacements = [
        # Restore "potential" before trading actions
        (r'\bbuy\b(?! signal| pressure| volume| orders| side)', 'potential buy'),
        (r'\bsell\b(?! signal| pressure| volume| orders| side| off)', 'potential sell'),
        (r'\bentry\b(?! area| point| signal|:)', 'entry area'),
        (r'\bexit\b(?! area| point| signal|:)', 'potential exit'),
        (r'\bbreakout\b(?! area| confirmation| signal)', 'potential breakout'),
        (r'\bbreakdown\b(?! area| confirmation)', 'potential breakdown'),
        (r'\breversal signal\b', 'potential reversal signal'),
        (r'\breversal zone\b', 'potential reversal zone'),

        # But NOT in these contexts:
        # - "buy signal" (indicator output)
        # - "buy pressure" (market state)
        # - "buy volume" (measurement)
        # - "sell side" (order book side)
    ]

    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)

    return content

def process_lesson_file(filepath):
    """Process a single lesson file"""
    print(f"Processing: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_length = len(content)
    content = restore_compliance_language(content)

    if len(content) != original_length:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Restored compliance language ({len(content) - original_length:+d} chars)")
        return True
    else:
        print(f"  - No changes needed")
        return False

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    lesson_files = []
    for pattern in ['beginner/*.html', 'beginner-bridge/*.html',
                    'intermediate/*.html', 'intermediate-bridge/*.html',
                    'advanced/*.html', 'advanced-mastery/*.html',
                    'professional-capstone/*.html']:
        lesson_files.extend(sorted(curriculum_dir.glob(pattern)))

    print(f"Found {len(lesson_files)} lesson files")
    print("=" * 60)

    updated_count = 0
    for filepath in lesson_files:
        if process_lesson_file(filepath):
            updated_count += 1

    print("\n" + "=" * 60)
    print(f"✓ Processed {len(lesson_files)} lessons")
    print(f"✓ Restored compliance language in {updated_count} files")
    print(f"✓ Already compliant: {len(lesson_files) - updated_count} files")

if __name__ == '__main__':
    main()
