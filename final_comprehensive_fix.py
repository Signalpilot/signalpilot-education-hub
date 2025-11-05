#!/usr/bin/env python3
"""
FINAL COMPREHENSIVE FIX: Fix all remaining missing elements across ALL lessons.
"""

import re
from pathlib import Path

def fix_missing_bg_aurora(content):
    """Add bg-aurora if missing."""
    if 'bg-aurora' in content:
        return content, False

    # Pattern 1: Has bg-stars and canvas, missing bg-aurora
    pattern1 = r'(<div class="bg-stars"[^>]*></div><canvas[^>]*></canvas>)\s*\n'
    replacement1 = r'\1\n  <div class="bg-aurora" aria-hidden="true"></div>\n'

    new_content = re.sub(pattern1, replacement1, content)
    if new_content != content:
        return new_content, True

    # Pattern 2: Has bg-stars only, missing both canvas and aurora
    pattern2 = r'(<div class="bg-stars"[^>]*></div>)\s*\n'
    replacement2 = r'\1\n  <canvas id="constellations" class="sp-constellations" aria-hidden="true"></canvas>\n  <div class="bg-aurora" aria-hidden="true"></div>\n'

    new_content = re.sub(pattern2, replacement2, content)
    if new_content != content:
        return new_content, True

    # Pattern 3: No background divs at all after <body>
    pattern3 = r'(<body>\s*\n)\s*(<header)'
    replacement3 = r'\1  <div class="bg-stars" aria-hidden="true"></div>\n  <canvas id="constellations" class="sp-constellations" aria-hidden="true"></canvas>\n  <div class="bg-aurora" aria-hidden="true"></div>\n\n\2'

    new_content = re.sub(pattern3, replacement3, content)
    if new_content != content:
        return new_content, True

    return content, False

def extract_toc_from_lesson(content):
    """Extract h2 headings to generate TOC."""
    h2_pattern = r'<h2 id="([^"]+)">([^<]+)</h2>'
    headings = re.findall(h2_pattern, content)

    if not headings or len(headings) < 2:
        return None

    toc_html = '    <aside class="toc" aria-label="On this page">\n'
    toc_html += '      <h3 id="on-this-page">On this page</h3>\n'

    for heading_id, heading_text in headings[:8]:  # Max 8 headings
        # Clean up heading text
        heading_text = heading_text.strip()
        toc_html += f'      <a href="#{heading_id}">{heading_text}</a>\n'

    toc_html += '    </aside>'

    return toc_html

def fix_missing_toc(content):
    """Add TOC if missing."""
    if '<aside class="toc"' in content:
        return content, False

    toc_html = extract_toc_from_lesson(content)
    if not toc_html:
        return content, False

    # Find where to insert: before closing </div> of article-grid
    # Look for the closing tag pattern before nav-article
    pattern = r'(    </div>\s*\n\s*<div class="wrap nav-article">)'
    replacement = f'\n{toc_html}\n\\1'

    new_content = re.sub(pattern, replacement, content, count=1)

    if new_content != content:
        return new_content, True

    return content, False

def fix_lesson(filepath):
    """Fix all issues in a lesson."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes = []

    # Fix bg-aurora
    content, changed = fix_missing_bg_aurora(content)
    if changed:
        changes.append("bg-aurora")

    # Fix TOC
    content, changed = fix_missing_toc(content)
    if changed:
        changes.append("TOC")

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return changes

    return []

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    # All lessons that still have issues
    problematic_lessons = [
        '24-footprint-charts.html',
        '25-dark-pools.html',
        '26-smart-money-divergence.html',
        '27-multi-timeframe-mastery.html',
        '28-janus-atlas-advanced.html',
        '29-plutus-flow-mastery.html',
        '33-advanced-risk-management.html',
        '34-trade-journal-mastery.html',
        '35-professional-operations.html',
        '56-high-frequency-concepts.html',
        '57-trading-automation-apis.html',
        '58-portfolio-theory-advanced.html',
        '59-performance-attribution.html',
        '60-tax-optimization.html',
        '61-professional-infrastructure.html',
        '62-trading-career-path.html',
    ]

    print(f"\n{'='*80}")
    print(f"FINAL COMPREHENSIVE FIX FOR {len(problematic_lessons)} LESSONS")
    print(f"{'='*80}\n")

    fixed_count = 0
    for filename in problematic_lessons:
        matches = list(curriculum_dir.rglob(filename))
        if not matches:
            print(f"❌ Not found: {filename}")
            continue

        filepath = matches[0]
        changes = fix_lesson(filepath)

        if changes:
            fixed_count += 1
            print(f"✅ {filename}: Fixed {', '.join(changes)}")
        else:
            print(f"⚠️  {filename}: No changes (may need manual fix)")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Fixed {fixed_count} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
