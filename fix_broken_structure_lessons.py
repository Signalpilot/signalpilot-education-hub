#!/usr/bin/env python3
"""
Fix lessons with broken HTML structure (missing closing divs + TOC).
"""

import re
from pathlib import Path

def extract_toc_from_lesson(content):
    """Extract h2 headings to generate TOC."""
    h2_pattern = r'<h2[^>]*id="([^"]+)"[^>]*>([^<]+)</h2>'
    headings = re.findall(h2_pattern, content)

    if not headings or len(headings) < 2:
        return None

    toc_html = '    <aside class="toc" aria-label="On this page">\n'
    toc_html += '      <h3 id="on-this-page">On this page</h3>\n'

    for heading_id, heading_text in headings[:8]:
        heading_text = heading_text.strip()
        toc_html += f'      <a href="#{heading_id}">{heading_text}</a>\n'

    toc_html += '    </aside>\n'
    toc_html += '  </div>\n'  # Close article-grid

    return toc_html

def fix_broken_structure(filepath):
    """Fix broken HTML structure and add TOC."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Check if already has TOC
    if '<aside class="toc"' in content:
        return False

    # Generate TOC
    toc_html = extract_toc_from_lesson(content)
    if not toc_html:
        return False

    # Pattern: Find the last checkpoint before nav-article
    # Insert TOC + closing div right before nav-article
    pattern = r'(</div>\s*\n)\s*(<div class="wrap nav-article">)'
    replacement = f'\n{toc_html}\n\\2'

    content = re.sub(pattern, replacement, content, count=1)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True

    return False

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    broken_lessons = [
        '24-footprint-charts.html',
        '25-dark-pools.html',
        '26-smart-money-divergence.html',
        '27-multi-timeframe-mastery.html',
        '28-janus-atlas-advanced.html',
        '33-advanced-risk-management.html',
        '56-high-frequency-concepts.html',
        '57-trading-automation-apis.html',
        '58-portfolio-theory-advanced.html',
        '59-performance-attribution.html',
        '60-tax-optimization.html',
        '61-professional-infrastructure.html',
    ]

    print(f"\n{'='*80}")
    print(f"FIXING BROKEN STRUCTURE + ADDING TOC TO {len(broken_lessons)} LESSONS")
    print(f"{'='*80}\n")

    fixed_count = 0
    for filename in broken_lessons:
        matches = list(curriculum_dir.rglob(filename))
        if not matches:
            print(f"❌ Not found: {filename}")
            continue

        filepath = matches[0]

        if fix_broken_structure(filepath):
            fixed_count += 1
            print(f"✅ {filename}: Added TOC + fixed structure")
        else:
            print(f"⚠️  {filename}: No changes")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Fixed {fixed_count} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
