#!/usr/bin/env python3
"""
Fix lessons missing the article-grid and prose wrapper structure.
These lessons have content directly under <article> with no wrappers.
"""

import re
from pathlib import Path

def fix_missing_wrappers(filepath):
    """Add missing article-grid and prose wrappers."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Check if already has article-grid
    if 'article-grid' in content:
        return False, "Already has article-grid"

    # Pattern: Insert wrappers after <article class="article">
    # and before content starts (after breadcrumb/badges/h1)
    pattern = r'(<article class="article">.*?<h1>.*?</h1>)(.*?)(</article>)'

    def add_wrappers(match):
        article_start = match.group(1)  # <article> through </h1>
        article_content = match.group(2)  # Everything between h1 and </article>
        article_end = match.group(3)  # </article>

        # Find where TOC is (might be after </article>)
        toc_match = re.search(r'(<aside class="toc".*?</aside>)', article_content + article_end, re.DOTALL)

        if toc_match:
            toc_html = toc_match.group(1)
            # Remove TOC from its current location
            article_content = article_content.replace(toc_html, '')
            # Also check if TOC is after </article>
            if toc_html in article_end:
                article_end = article_end.replace(toc_html, '')
        else:
            toc_html = ""

        # Find navigation links (might be unwrapped)
        nav_match = re.search(r'(<a class="btn btn-ghost".*?Previous.*?</a>.*?<a class="btn btn-primary".*?Next.*?</a>)', article_content, re.DOTALL)

        if nav_match:
            nav_html = nav_match.group(1)
            # Remove nav from content
            article_content = article_content.replace(nav_html, '')
            # Wrap nav
            nav_wrapped = f'\n  <div class="wrap nav-article">\n    {nav_html.strip()}\n  </div>\n'
        else:
            nav_wrapped = ""

        # Build correct structure
        new_content = f'''{article_start}
  <div class="wrap article-grid">
    <div class="prose">
{article_content}
    </div>
    {toc_html}
  </div>
{nav_wrapped}{article_end}'''

        return new_content

    content = re.sub(pattern, add_wrappers, content, flags=re.DOTALL)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, "Added wrappers"

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

    # Focus on the catastrophically broken lessons
    problem_lessons = [
        '11-timeframe-illusion.html',
        '12-paper-trading.html'
    ]

    print(f"\n{'='*80}")
    print(f"FIXING MISSING WRAPPER STRUCTURE")
    print(f"{'='*80}\n")

    for filename in problem_lessons:
        matches = list(curriculum_dir.rglob(filename))
        if not matches:
            print(f"❌ Not found: {filename}")
            continue

        filepath = matches[0]
        balance_before = count_div_balance(filepath)

        fixed, message = fix_missing_wrappers(filepath)

        if fixed:
            balance_after = count_div_balance(filepath)
            print(f"✅ {filename}: {balance_before} → {balance_after} ({message})")
        else:
            print(f"⚠️  {filename}: {message}")

    print(f"\n{'='*80}")
    print(f"COMPLETE")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
