#!/usr/bin/env python3
"""
Consolidate to 4 tiers only:
- beginner (1-12)
- intermediate (13-35)
- advanced (36-63)
- professional (64-82)

This merges advanced-mastery and professional-capstone into professional.
"""

import os
import re
import glob
import shutil

def move_to_professional():
    """Move advanced-mastery and professional-capstone to professional."""

    print("=" * 80)
    print("CONSOLIDATING TO 4 TIERS")
    print("=" * 80)

    # Create professional folder
    os.makedirs('curriculum/professional', exist_ok=True)

    moves = []

    # Move from advanced-mastery
    for file in glob.glob('curriculum/advanced-mastery/*.html'):
        filename = os.path.basename(file)
        new_path = f'curriculum/professional/{filename}'
        moves.append((file, new_path))

    # Move from professional-capstone
    for file in glob.glob('curriculum/professional-capstone/*.html'):
        filename = os.path.basename(file)
        new_path = f'curriculum/professional/{filename}'
        moves.append((file, new_path))

    print(f"\n📦 Moving {len(moves)} files to curriculum/professional/\n")

    for old_path, new_path in moves:
        print(f"  {old_path.split('/')[-1]}")
        shutil.move(old_path, new_path)

    print(f"\n✅ Moved {len(moves)} files")


def update_all_links():
    """Update all links to point to professional folder."""

    print("\n" + "=" * 80)
    print("UPDATING ALL LINKS")
    print("=" * 80)

    replacements = {
        '/curriculum/advanced-mastery/': '/curriculum/professional/',
        'curriculum/advanced-mastery/': 'curriculum/professional/',
        '/advanced-mastery/': '/professional/',

        '/curriculum/professional-capstone/': '/curriculum/professional/',
        'curriculum/professional-capstone/': 'curriculum/professional/',
        '/professional-capstone/': '/professional/',
    }

    all_files = glob.glob('curriculum/**/*.html', recursive=True)
    updated_count = 0

    for filepath in all_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # Apply replacements
        for old, new in replacements.items():
            content = content.replace(old, new)

        # Update canonical URLs
        content = re.sub(
            r'education\.signalpilot\.io/curriculum/advanced-mastery/',
            'education.signalpilot.io/curriculum/professional/',
            content
        )
        content = re.sub(
            r'education\.signalpilot\.io/curriculum/professional-capstone/',
            'education.signalpilot.io/curriculum/professional/',
            content
        )

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1

    print(f"\n✅ Updated {updated_count} files")


def cleanup_old_folders():
    """Remove old folders."""

    print("\n" + "=" * 80)
    print("CLEANUP")
    print("=" * 80)

    folders = ['curriculum/advanced-mastery', 'curriculum/professional-capstone']

    for folder in folders:
        if os.path.exists(folder):
            if not os.listdir(folder):
                os.rmdir(folder)
                print(f"  ✅ Removed: {folder}")
            else:
                print(f"  ⚠️  Not empty: {folder}")


def verify_structure():
    """Verify final structure."""

    print("\n" + "=" * 80)
    print("FINAL STRUCTURE")
    print("=" * 80)

    folders = {
        'beginner': 'Beginner (🟢)',
        'intermediate': 'Intermediate (🟡)',
        'advanced': 'Advanced (🔴)',
        'professional': 'Professional (⚫)'
    }

    total = 0
    for folder, display in folders.items():
        path = f'curriculum/{folder}'
        if os.path.exists(path):
            count = len(glob.glob(f'{path}/*.html'))
            total += count
            print(f"  📁 {display:25s} {count:2d} lessons")

    print(f"\n  Total: {total} lessons")
    print("=" * 80)


def main():
    move_to_professional()
    update_all_links()
    cleanup_old_folders()
    verify_structure()

    print("\n✅ CONSOLIDATION COMPLETE - 4 TIERS ONLY!")


if __name__ == "__main__":
    main()
