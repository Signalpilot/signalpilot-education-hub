#!/usr/bin/env python3
"""
Direct fix for lessons 11 and 12:
1. Move TOC inside article
2. Ensure proper div closing
"""

import re
from pathlib import Path

def fix_lesson_structure(filepath):
    """Fix lesson structure directly."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Step 1: Find and extract TOC (might be after </article>)
    toc_match = re.search(r'(<aside class="toc".*?</aside>)', content, re.DOTALL)
    if not toc_match:
        return False, "No TOC found"

    toc_html = toc_match.group(1)

    # Step 2: Remove TOC from wherever it currently is
    content = content.replace(toc_html, '{{TOC_PLACEHOLDER}}', 1)

    # Step 3: Find where article closes and insert TOC before it
    # Look for the pattern: </div> (closes nav-article or article-grid) followed by </article>
    pattern = r'(</div>\s*\n)(</article>)'

    def insert_toc_before_article_close(match):
        div_close = match.group(1)
        article_close = match.group(2)

        # Insert TOC with proper indentation (4 spaces, as sibling of prose)
        return f'''{div_close}
    {{{{TOC_PLACEHOLDER}}}}
  </div>

{article_close}'''

    content = re.sub(pattern, insert_toc_before_article_close, content)

    # Step 4: Replace placeholder with actual TOC
    # Indent TOC properly (4 spaces for aside, 6 for content)
    toc_indented = '\n'.join(['    ' + line if line.strip() else line for line in toc_html.split('\n')])
    content = content.replace('{{TOC_PLACEHOLDER}}', toc_indented.strip())

    # Step 5: Remove any TOC that might still be after </article>
    content = re.sub(r'</article>\s*<aside class="toc".*?</aside>', '</article>', content, flags=re.DOTALL)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, "Fixed structure"

    return False, "No changes"

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
    print(f"DIRECT FIX FOR LESSONS 11 & 12")
    print(f"{'='*80}\n")

    for filename in problem_lessons:
        matches = list(curriculum_dir.rglob(filename))
        if not matches:
            print(f"❌ Not found: {filename}")
            continue

        filepath = matches[0]
        balance_before = count_div_balance(filepath)

        fixed, message = fix_lesson_structure(filepath)

        if fixed:
            balance_after = count_div_balance(filepath)
            print(f"{'✅' if balance_after == 0 else '📈'} {filename}: {balance_before} → {balance_after} ({message})")
        else:
            print(f"⚠️  {filename}: {message}")

    print(f"\n{'='*80}")
    print(f"COMPLETE")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
