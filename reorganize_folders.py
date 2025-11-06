#!/usr/bin/env python3
"""
Reorganize lesson folders to remove 'bridge' from paths.

Actions:
1. Move curriculum/beginner-bridge/ (lessons 13-20) → curriculum/intermediate/
2. Move curriculum/intermediate-bridge/ (lessons 36-47) → curriculum/advanced/
3. Update all internal links across ALL lessons to point to new paths
4. Update canonical URLs in moved files
"""

import os
import re
import glob
import shutil

def move_files():
    """Move files from bridge folders to proper tier folders."""
    moves = []

    # Move beginner-bridge to intermediate
    for file in glob.glob('curriculum/beginner-bridge/*.html'):
        filename = os.path.basename(file)
        new_path = f'curriculum/intermediate/{filename}'
        moves.append((file, new_path))

    # Move intermediate-bridge to advanced
    for file in glob.glob('curriculum/intermediate-bridge/*.html'):
        filename = os.path.basename(file)
        new_path = f'curriculum/advanced/{filename}'
        moves.append((file, new_path))

    print("=" * 80)
    print("STEP 1: MOVING FILES")
    print("=" * 80)

    for old_path, new_path in moves:
        print(f"  {old_path} → {new_path}")
        os.makedirs(os.path.dirname(new_path), exist_ok=True)
        shutil.move(old_path, new_path)

    print(f"\n✅ Moved {len(moves)} files")
    return moves


def update_all_links():
    """Update all internal links across ALL lesson files."""

    print("\n" + "=" * 80)
    print("STEP 2: UPDATING ALL INTERNAL LINKS")
    print("=" * 80)

    replacements = {
        '/curriculum/beginner-bridge/': '/curriculum/intermediate/',
        'curriculum/beginner-bridge/': 'curriculum/intermediate/',
        '/beginner-bridge/': '/intermediate/',

        '/curriculum/intermediate-bridge/': '/curriculum/advanced/',
        'curriculum/intermediate-bridge/': 'curriculum/advanced/',
        '/intermediate-bridge/': '/advanced/',
    }

    # Get all HTML files
    all_files = glob.glob('curriculum/**/*.html', recursive=True)
    updated_count = 0

    for filepath in all_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        original = content

        # Apply all replacements
        for old, new in replacements.items():
            content = content.replace(old, new)

        # Update canonical URLs specifically
        content = re.sub(
            r'education\.signalpilot\.io/curriculum/beginner-bridge/',
            'education.signalpilot.io/curriculum/intermediate/',
            content
        )
        content = re.sub(
            r'education\.signalpilot\.io/curriculum/intermediate-bridge/',
            'education.signalpilot.io/curriculum/advanced/',
            content
        )

        if content != original:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            updated_count += 1
            print(f"  ✅ Updated: {filepath.split('/')[-1]}")

    print(f"\n✅ Updated {updated_count} files with new paths")


def cleanup_empty_folders():
    """Remove empty bridge folders."""

    print("\n" + "=" * 80)
    print("STEP 3: CLEANING UP EMPTY FOLDERS")
    print("=" * 80)

    folders_to_remove = [
        'curriculum/beginner-bridge',
        'curriculum/intermediate-bridge'
    ]

    for folder in folders_to_remove:
        if os.path.exists(folder):
            # Check if empty (might have hidden files)
            if not os.listdir(folder) or all(f.startswith('.') for f in os.listdir(folder)):
                os.rmdir(folder)
                print(f"  ✅ Removed: {folder}")
            else:
                print(f"  ⚠️  Not empty: {folder}")


def verify_moves():
    """Verify all files moved correctly."""

    print("\n" + "=" * 80)
    print("STEP 4: VERIFICATION")
    print("=" * 80)

    # Check for any remaining bridge references in paths
    all_files = glob.glob('curriculum/**/*.html', recursive=True)

    bridge_in_content = []

    for filepath in all_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check for bridge in links (not in folder names themselves)
        if re.search(r'href="[^"]*beginner-bridge[^"]*"', content):
            bridge_in_content.append((filepath, 'beginner-bridge in href'))
        if re.search(r'href="[^"]*intermediate-bridge[^"]*"', content):
            bridge_in_content.append((filepath, 'intermediate-bridge in href'))
        if re.search(r'education\.signalpilot\.io/curriculum/[^/"]*bridge', content):
            bridge_in_content.append((filepath, 'bridge in canonical URL'))

    if bridge_in_content:
        print("\n⚠️  Found remaining bridge references:")
        for filepath, issue in bridge_in_content:
            print(f"  {filepath}: {issue}")
    else:
        print("\n✅ No bridge references in links/URLs!")

    # Check folder structure
    print("\n📁 New folder structure:")
    for folder in ['beginner', 'intermediate', 'advanced', 'professional-capstone', 'advanced-mastery']:
        folder_path = f'curriculum/{folder}'
        if os.path.exists(folder_path):
            count = len(glob.glob(f'{folder_path}/*.html'))
            print(f"  • curriculum/{folder}/: {count} lessons")


def main():
    print("=" * 80)
    print("REORGANIZING FOLDERS - REMOVING 'BRIDGE' FROM PATHS")
    print("=" * 80)
    print()
    print("This will:")
    print("  1. Move curriculum/beginner-bridge/ → curriculum/intermediate/")
    print("  2. Move curriculum/intermediate-bridge/ → curriculum/advanced/")
    print("  3. Update ALL internal links across ALL 82 lessons")
    print("  4. Update canonical URLs")
    print()

    # Execute steps
    moved_files = move_files()
    update_all_links()
    cleanup_empty_folders()
    verify_moves()

    print("\n" + "=" * 80)
    print("✅ REORGANIZATION COMPLETE!")
    print("=" * 80)
    print(f"Total files moved: {len(moved_files)}")
    print("\nNew structure:")
    print("  • curriculum/beginner/ (lessons 1-12)")
    print("  • curriculum/intermediate/ (lessons 13-35)")
    print("  • curriculum/advanced/ (lessons 36-63)")
    print("  • curriculum/professional-capstone/ (lessons 64-82)")
    print("=" * 80)


if __name__ == "__main__":
    main()
