#!/usr/bin/env python3
"""
Add missing closing divs to lessons 11 and 12.
"""

import re
from pathlib import Path

def fix_unclosed_divs(filepath):
    """Fix unclosed divs in the file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Fix 1: section-break divs that are missing </div>
    # Pattern: <div class="section-break"><span>TEXT</span> (no closing </div>)
    content = re.sub(
        r'(<div class="section-break"><span>[^<]+</span>)(\s*\n)',
        r'\1</div>\2',
        content
    )

    # Fix 2: Card divs that are missing closing tags
    # Find all card divs and ensure they close properly
    # Pattern: <div class="card"> ... </a> (should be followed by </div>)
    content = re.sub(
        r'(<div class="card">.*?</a>)\s*\n\s*\n\s*(<div class="card">|<div class="section-break">|<blockquote>)',
        r'\1\n        </div>\n\n      \2',
        content,
        flags=re.DOTALL
    )

    # Fix 3: Related Lessons grid div that's missing closing
    # Pattern: grid div opens, 3 cards, then should close
    content = re.sub(
        r'(<div style="display:grid;grid-template-columns:repeat\(auto-fit,minmax\(250px,1fr\)\);gap:1rem;margin:2rem 0">.*?</div>\s*</div>\s*</div>)\s*\n\s*\n\s*(<div class="section-break">)',
        r'\1\n      </div>\n\n      \2',
        content,
        flags=re.DOTALL
    )

    # Fix 4: Downloadable resources div that's missing closing
    # Pattern: <div style="background:rgba(118,221,255..."> ... </p> (should be followed by </div>)
    content = re.sub(
        r'(<div style="background:rgba\(118,221,255,0\.08\);[^>]+>.*?<p[^>]*>Print it out[^<]+</p>)\s*\n\s*\n\s*(<blockquote>)',
        r'\1\n      </div>\n\n      \2',
        content,
        flags=re.DOTALL
    )

    # Fix 5: Social share divs
    content = re.sub(
        r'(<div class="social-share">.*?</div>)\s*\n\s*\n\s*(<div class="section-break">)',
        r'\1\n      </div>\n\n      \2',
        content,
        flags=re.DOTALL
    )

    # Fix 6: Callout divs that might be missing closings
    content = re.sub(
        r'(<div class="callout-key">.*?</pre>)\s*\n\s*\n\s*(<div class="social-share">|<div class="section-break">)',
        r'\1\n      </div>\n\n      \2',
        content,
        flags=re.DOTALL
    )

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

    problem_lessons = [
        '11-timeframe-illusion.html',
        '12-paper-trading.html'
    ]

    print(f"\n{'='*80}")
    print(f"FIXING UNCLOSED DIVS IN LESSONS 11 & 12")
    print(f"{'='*80}\n")

    for filename in problem_lessons:
        matches = list(curriculum_dir.rglob(filename))
        if not matches:
            print(f"❌ Not found: {filename}")
            continue

        filepath = matches[0]
        balance_before = count_div_balance(filepath)

        fixed = fix_unclosed_divs(filepath)

        if fixed:
            balance_after = count_div_balance(filepath)
            print(f"{'✅' if balance_after == 0 else '📈'} {filename}: {balance_before} → {balance_after}")
        else:
            print(f"⚠️  {filename}: No changes")

    print(f"\n{'='*80}")
    print(f"COMPLETE")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
