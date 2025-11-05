#!/usr/bin/env python3
"""
Fix HTML structure issues caused by TOC insertion.

Problem: The article-grid div is closing too early (right after TOC),
leaving navigation and other content outside the proper structure.

Solution: Move the closing </div> for article-grid to before </article> tag.
"""

import re
import glob
import os

def fix_html_structure(filepath):
    """Fix HTML structure in a lesson file."""
    print(f"Processing: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if file has the problematic pattern
    if '<aside class="toc"' not in content:
        print(f"  ✓ No TOC found, skipping")
        return False

    # Pattern: Find the structure where TOC closes, then article-grid closes immediately
    # We need to find:
    # 1. </aside>  (TOC closing)
    # 2. Followed by </div> (article-grid closing - THIS IS THE PROBLEM)
    # 3. Then content until </article>

    # Find the closing </aside> for TOC
    toc_pattern = r'(</aside>\s*</div>)\s*\n\s*\n\s*(.*?)(</article>)'

    match = re.search(toc_pattern, content, re.DOTALL)
    if not match:
        print(f"  ✗ Pattern not found")
        return False

    # Extract the orphaned content
    orphaned_content = match.group(2).strip()

    if not orphaned_content or orphaned_content.startswith('<footer'):
        print(f"  ✓ No orphaned content found")
        return False

    print(f"  → Found orphaned content ({len(orphaned_content)} chars)")

    # Reconstruct the proper structure:
    # </aside></div> + orphaned_content + </div></article>
    # becomes:
    # </aside> + orphaned_content + </div></article>

    # Replace the problematic section
    fixed_section = f"{match.group(1)}\n\n{orphaned_content}\n{match.group(3)}"

    # Wait, that's not right. Let me reconsider...
    # The structure should be:
    # <div class="wrap article-grid">
    #   <div class="prose">...</div>
    #   <aside class="toc">...</aside>
    # </div>  <!-- This closes article-grid TOO EARLY -->
    #
    # <p>orphaned content</p>
    # <div class="nav-article">...</div>
    # </article>
    #
    # Should become:
    # <div class="wrap article-grid">
    #   <div class="prose">...</div>
    #   <aside class="toc">...</aside>
    #
    #   <p>orphaned content</p>  <!-- Move inside -->
    #   <div class="nav-article">...</div>  <!-- Move inside -->
    # </div>  <!-- Close article-grid here -->
    # </article>

    # So we need to:
    # 1. Remove the </div> after </aside>
    # 2. Add </div> before </article>

    # Find and remove the early closing div
    content = re.sub(
        r'(</aside>\s*)\n\s*</div>\s*\n\s*\n',
        r'\1\n\n',
        content,
        count=1
    )

    # Add the closing div before </article>
    content = re.sub(
        r'\n(</article>)',
        r'\n  </div>\n\1',
        content,
        count=1
    )

    # Write the fixed content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  ✅ Fixed!")
    return True

def main():
    """Fix all lesson files."""
    # Find all lesson HTML files
    patterns = [
        '/home/user/signalpilot-education-hub/curriculum/**/*.html',
    ]

    files = []
    for pattern in patterns:
        files.extend(glob.glob(pattern, recursive=True))

    files.sort()

    print(f"Found {len(files)} lesson files\n")

    fixed_count = 0
    for filepath in files:
        if fix_html_structure(filepath):
            fixed_count += 1

    print(f"\n{'='*60}")
    print(f"Fixed {fixed_count} out of {len(files)} files")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
