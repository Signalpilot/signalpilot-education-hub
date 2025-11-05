#!/usr/bin/env python3
"""
RESTORE "potential" language for financial compliance
We NEED hedging language to avoid directive trading advice!
"""

import re
from pathlib import Path

def restore_potential_language(content):
    """Add back 'potential' where it was removed"""

    # These patterns restore what was removed
    # Be careful not to add "potential" where it doesn't make sense

    replacements = [
        # Restore "potential reversal" phrases
        (r'(?<!potential )reversal signal(?!s)', 'potential reversal signal'),
        (r'(?<!potential )reversal zone(?!s)', 'potential reversal zone'),
        (r'(?<!potential )reversal area', 'potential reversal area'),

        # Restore "potential breakout/breakdown"
        (r'(?<!potential )breakout(?! of| from| above| below| through|s)', 'potential breakout'),
        (r'(?<!potential )breakdown(?! of| from|s)', 'potential breakdown'),

        # Restore "potential entry/exit"
        (r'(?<!potential )entry(?! area| point| signal| price| level| zone|:)', 'potential entry'),
        (r'(?<!potential )exit(?! area| point| signal| price| level| zone|:| strategy|,)', 'potential exit'),

        # Restore "buying area" and "selling area" (not "buy"/"sell")
        (r'\bbuy\b(?= level| zone| region| opportunity)', 'buying area'),
        (r'\bsell\b(?= level| zone| region| opportunity)', 'selling area'),

        # Special cases seen in diffs
        (r'is your reversal signal', 'is your potential reversal signal'),
        (r'Watching for breakdown below', 'Watching for potential breakdown below'),
        (r'Wait for structural confirmation \(breakdown, sweep, potential reversal\)',
         'Wait for structural confirmation (potential breakdown, sweep, potential reversal)'),
    ]

    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)

    return content

def process_file(filepath):
    """Process a single file"""

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original = content
    content = restore_potential_language(content)

    if content != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Restored: {filepath.name}")
        return True
    else:
        print(f"  - No changes: {filepath.name}")
        return False

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    lesson_files = []
    for pattern in ['beginner/*.html', 'beginner-bridge/*.html',
                    'intermediate/*.html', 'intermediate-bridge/*.html',
                    'advanced/*.html', 'advanced-mastery/*.html',
                    'professional-capstone/*.html']:
        lesson_files.extend(sorted(curriculum_dir.glob(pattern)))

    print(f"Restoring 'potential' language in {len(lesson_files)} lessons...")
    print("=" * 60)

    updated = 0
    for filepath in lesson_files:
        if process_file(filepath):
            updated += 1

    print("\n" + "=" * 60)
    print(f"✓ Restored {updated} files")
    print(f"✓ Already compliant: {len(lesson_files) - updated} files")

if __name__ == '__main__':
    main()
