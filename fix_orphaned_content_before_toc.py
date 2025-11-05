#!/usr/bin/env python3
"""
Fix orphaned content and extra closing divs before TOC.
Removes paragraphs and extra divs that appear between the last content section and the TOC.
"""

import re
from pathlib import Path

def fix_orphaned_content(filepath):
    """Remove orphaned content before TOC."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Pattern 1: Remove orphaned paragraphs before TOC
    # Match: </div> (closes resources), then blank lines, then <p>, then blank lines, then TOC or nav-article
    pattern1 = r'(</div>\s*\n)\s*<p[^>]*>.*?</p>\s*\n\s*\n\s*(<(?:aside class="toc"|div class="wrap nav-article"))'
    content = re.sub(pattern1, r'\1\n    \2', content, flags=re.DOTALL)

    # Pattern 2: Remove orphaned closing divs before nav-article
    # Match: </article-grid closing div>, then blank lines, then orphaned paragraph, then nav-article
    pattern2 = r'(</div>\s*\n)\s*\n\s*\n\s*<p[^>]*>.*?</p>\s*\n\s*\n\s*(<div class="wrap nav-article">)'
    content = re.sub(pattern2, r'\1\n  \2', content, flags=re.DOTALL)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True

    return False

def count_div_balance(filepath):
    """Count div balance in a file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    opening = content.count('<div')
    closing = content.count('</div>')
    return opening - closing

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')
    all_lessons = sorted(curriculum_dir.rglob('*.html'))

    print(f"\n{'='*80}")
    print(f"FIXING ORPHANED CONTENT BEFORE TOC")
    print(f"{'='*80}\n")

    fixed_count = 0

    for filepath in all_lessons:
        balance_before = count_div_balance(filepath)

        if balance_before != 0:  # Only fix files with imbalance
            fixed = fix_orphaned_content(filepath)

            if fixed:
                balance_after = count_div_balance(filepath)
                fixed_count += 1

                if balance_after == 0:
                    print(f"✅ {filepath.name}: {balance_before} → {balance_after} (PERFECT)")
                elif abs(balance_after) < abs(balance_before):
                    print(f"📈 {filepath.name}: {balance_before} → {balance_after} (improved)")
                else:
                    print(f"⚠️  {filepath.name}: {balance_before} → {balance_after}")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Fixed {fixed_count} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
