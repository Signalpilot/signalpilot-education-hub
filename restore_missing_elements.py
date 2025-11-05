#!/usr/bin/env python3
"""
Restore missing bg-aurora and TOC sidebar to damaged lessons.
"""

import re
from pathlib import Path

# Template bg-aurora div (insert after bg-stars)
BG_AURORA_TEMPLATE = '  <div class="bg-aurora" aria-hidden="true"></div>\n'

def restore_bg_aurora(content):
    """Restore missing bg-aurora div after bg-stars."""
    # Check if bg-aurora already exists
    if 'bg-aurora' in content:
        return content, False

    # Find bg-stars div and insert bg-aurora after it
    pattern = r'(<div class="bg-stars" aria-hidden="true"></div>\s*\n)'
    replacement = r'\1' + BG_AURORA_TEMPLATE

    new_content = re.sub(pattern, replacement, content)

    return new_content, new_content != content

def extract_toc_from_lesson(lesson_content):
    """Extract h2 and h3 headings to generate TOC."""
    # Find all H2 headings with IDs
    h2_pattern = r'<h2 id="([^"]+)">([^<]+)</h2>'
    headings = re.findall(h2_pattern, lesson_content)

    if not headings or len(headings) < 3:
        return None

    # Build TOC HTML
    toc_html = '''    <aside class="toc" aria-label="On this page">
      <h3 id="on-this-page">On this page</h3>\n'''

    for heading_id, heading_text in headings[:7]:  # Limit to 7 headings
        toc_html += f'      <a href="#{heading_id}">{heading_text}</a>\n'

    toc_html += '    </aside>'

    return toc_html

def restore_toc(content):
    """Restore missing TOC sidebar."""
    # Check if TOC already exists
    if '<aside class="toc"' in content:
        return content, False

    # Generate TOC from headings
    toc_html = extract_toc_from_lesson(content)

    if not toc_html:
        return content, False

    # Find insertion point: right before closing </div> of article-grid
    # Look for the pattern: </div> followed by section-break or nav-article
    pattern = r'(</div>\s*\n\s*<div class="section-break">.*?Downloadable Resources)'

    # If that doesn't work, try inserting before the closing prose div
    if not re.search(pattern, content, re.DOTALL):
        # Insert before nav-article
        pattern = r'(\s*<div class="wrap nav-article">)'
        replacement = f'\n{toc_html}\n  </div>\n\n\\1'
        new_content = re.sub(pattern, replacement, content)
    else:
        new_content = content

    return new_content, new_content != content

def restore_lesson(filepath):
    """Restore missing elements in a lesson."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes = []

    # Restore bg-aurora
    content, changed = restore_bg_aurora(content)
    if changed:
        changes.append("bg-aurora")

    # Restore TOC
    content, changed = restore_toc(content)
    if changed:
        changes.append("TOC")

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return changes

    return []

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    # List of damaged lessons from check
    damaged_files = [
        '02-volume-doesnt-lie.html',
        '03-price-action-is-dead.html',
        '04-repaint-problem.html',
        '21-bid-ask-spread-dynamics.html',
        '22-order-book-analysis.html',
        '23-market-making-hft.html',
        '24-footprint-charts.html',
        '25-dark-pools.html',
        '26-smart-money-divergence.html',
        '27-multi-timeframe-mastery.html',
        '28-janus-atlas-advanced.html',
        '29-plutus-flow-mastery.html',
        '33-advanced-risk-management.html',
        '34-trade-journal-mastery.html',
        '35-professional-operations.html',
        '48-institutional-order-flow.html',
        '49-market-regime-recognition.html',
        '50-auction-theory-advanced.html',
        '51-cross-asset-correlations.html',
        '52-volatility-trading.html',
        '53-algorithmic-execution.html',
        '54-system-development.html',
        '55-machine-learning-trading.html',
        '56-high-frequency-concepts.html',
        '57-trading-automation-apis.html',
        '58-portfolio-theory-advanced.html',
        '59-performance-attribution.html',
        '60-tax-optimization.html',
        '61-professional-infrastructure.html',
        '62-trading-career-path.html',
    ]

    print(f"\n{'='*80}")
    print(f"RESTORING MISSING ELEMENTS TO {len(damaged_files)} LESSONS")
    print(f"{'='*80}\n")

    fixed_count = 0
    for filename in damaged_files:
        matches = list(curriculum_dir.rglob(filename))
        if not matches:
            print(f"❌ Not found: {filename}")
            continue

        filepath = matches[0]
        changes = restore_lesson(filepath)

        if changes:
            fixed_count += 1
            print(f"✅ {filename}: Restored {', '.join(changes)}")
        else:
            print(f"⚠️  {filename}: No changes needed")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Restored elements in {fixed_count} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
