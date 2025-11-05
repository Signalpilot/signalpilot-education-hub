#!/usr/bin/env python3
"""
Fix all remaining broken links.
"""

import re
import os
import glob

LINK_FIXES = {
    # Index page redirects
    '/advanced-mastery.html': '/',
    '/intermediate-bridge.html': '/',

    # Privacy/terms to main site
    '/privacy.html': 'https://signalpilot.io/privacy.html',
    '/terms.html': 'https://signalpilot.io/terms.html',

    # Relative path fixes
    '17-time-sales-mastery.html': '/curriculum/beginner-bridge/17-time-sales-mastery.html',

    # Wrong beginner lesson references
    '/curriculum/beginner/08-stop-loss-placement.html': '/curriculum/beginner/10-stop-losses.html',
    '/curriculum/beginner/07-janus-atlas-sweeps.html': '/curriculum/beginner/01-the-liquidity-lie.html',
}

def fix_links_in_file(filepath):
    """Fix broken links in a single file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    fixes_made = []

    # Fix all link replacements
    for old_link, new_link in LINK_FIXES.items():
        # Handle both href="link" and href='link'
        patterns = [
            f'href="{old_link}"',
            f"href='{old_link}'",
        ]

        for pattern in patterns:
            if pattern in content:
                replacement = f'href="{new_link}"'
                content = content.replace(pattern, replacement)
                fixes_made.append(f"{old_link} → {new_link}")

    # Write back if changes were made
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return fixes_made

    return None

def main():
    """Fix all broken links."""
    base_dir = '/home/user/signalpilot-education-hub'

    # Find all HTML files
    html_files = []
    patterns = [
        os.path.join(base_dir, '*.html'),
        os.path.join(base_dir, 'curriculum/**/*.html'),
    ]

    for pattern in patterns:
        html_files.extend(glob.glob(pattern, recursive=True))

    html_files.sort()

    print(f"Fixing remaining broken links in {len(html_files)} HTML files...\n")

    fixed_files = 0
    total_fixes = 0

    for filepath in html_files:
        rel_path = os.path.relpath(filepath, base_dir)
        fixes = fix_links_in_file(filepath)

        if fixes:
            fixed_files += 1
            total_fixes += len(fixes)
            print(f"✅ {rel_path}")
            for fix in fixes[:5]:
                print(f"   {fix}")
            if len(fixes) > 5:
                print(f"   ... and {len(fixes) - 5} more")

    print(f"\n{'='*80}")
    print(f"Fixed {total_fixes} links across {fixed_files} files")
    print(f"{'='*80}")

if __name__ == '__main__':
    main()
