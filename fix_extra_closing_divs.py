#!/usr/bin/env python3
"""
Fix extra closing divs that are pushing TOC to the footer.
Pattern to fix:
    </div>  ← closes prose

    <!-- comments -->
    </div>  ← EXTRA DIV TO REMOVE

    <aside class="toc">
"""

import re
from pathlib import Path

def fix_extra_closing_div(filepath):
    """Remove extra closing div before TOC."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Pattern 1: Extra closing div between comments and TOC
    # This is the most common pattern
    pattern1 = r'(<!-- Table of Contents Sidebar -->.*?<!-- Bottom Navigation -->)\s*</div>\s*(<aside class="toc")'
    content = re.sub(pattern1, r'\1\n\n    \2', content, flags=re.DOTALL)

    # Pattern 2: Extra closing div right before TOC (no comments)
    # Match: </div> followed by whitespace, then another </div>, then whitespace, then <aside class="toc"
    pattern2 = r'(    </div>\s*\n\s*)\n\s+</div>\s*\n\s*(<aside class="toc")'
    content = re.sub(pattern2, r'\1\n    \2', content)

    # Pattern 3: Multiple extra closing divs before TOC
    # This handles cases with -2 or -3 balance
    pattern3 = r'(</div>\s*\n)\s*</div>\s*\n\s*</div>\s*\n\s*(<aside class="toc")'
    content = re.sub(pattern3, r'\1\n    \2', content)

    # Pattern 4: Two extra closing divs
    pattern4 = r'(</div>\s*\n)\s*</div>\s*\n\s*</div>\s*\n\s*(<aside class="toc")'
    content = re.sub(pattern4, r'\1\n    \2', content)

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
    print(f"FIXING EXTRA CLOSING DIVS IN ALL LESSONS")
    print(f"{'='*80}\n")

    fixed_count = 0
    improved_count = 0

    for filepath in all_lessons:
        balance_before = count_div_balance(filepath)

        if balance_before < 0:  # Only fix files with extra closing divs
            fixed = fix_extra_closing_div(filepath)

            if fixed:
                balance_after = count_div_balance(filepath)
                fixed_count += 1

                if balance_after == 0:
                    print(f"✅ {filepath.name}: {balance_before} → {balance_after} (PERFECT)")
                elif abs(balance_after) < abs(balance_before):
                    print(f"📈 {filepath.name}: {balance_before} → {balance_after} (improved)")
                    improved_count += 1
                else:
                    print(f"⚠️  {filepath.name}: {balance_before} → {balance_after} (changed but not better)")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Fixed {fixed_count} lessons")
    print(f"  - {improved_count} fully fixed to balance 0")
    print(f"  - {fixed_count - improved_count} partially improved")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
