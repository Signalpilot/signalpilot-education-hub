#!/usr/bin/env python3
"""
Fix remaining 28 lessons:
1. Add toc-active.js script to 16 lessons
2. Add IDs to H2 headings in 12 lessons
"""

import re
from pathlib import Path

def slugify(text):
    """Convert heading text to URL-safe slug."""
    text = text.lower()
    text = re.sub(r'[^\w\s-]', '', text)
    text = re.sub(r'[-\s]+', '-', text)
    return text.strip('-')

def add_heading_ids(content):
    """Add id attributes to H2 headings that don't have them."""
    def add_id(match):
        opening_tag = match.group(1)
        heading_text = match.group(2)

        # Check if already has id
        if 'id="' in opening_tag:
            return match.group(0)

        # Generate slug from heading text
        slug = slugify(heading_text)

        # Add id to opening tag
        new_opening_tag = opening_tag.replace('<h2', f'<h2 id="{slug}"')

        return f'{new_opening_tag}{heading_text}</h2>'

    # Pattern: <h2 (with optional attributes)>text</h2>
    pattern = r'(<h2[^>]*>)([^<]+)(</h2>)'

    new_content = re.sub(pattern, add_id, content)

    return new_content

def add_toc_script(content):
    """Add toc-active.js script after edu-enhanced.js."""
    if 'toc-active.js' in content:
        return content

    # Pattern: Find edu-enhanced.js and insert toc-active.js after it
    pattern = r'(<script src="/assets/edu-enhanced\.js"></script>)'
    replacement = r'\1\n<script src="/assets/toc-active.js"></script>'

    return re.sub(pattern, replacement, content)

def regenerate_toc_from_h2s(content):
    """Regenerate TOC from H2 headings."""
    # Find all H2 headings with IDs
    h2_pattern = r'<h2[^>]*id="([^"]+)"[^>]*>([^<]+)</h2>'
    headings = re.findall(h2_pattern, content)

    if not headings or len(headings) < 2:
        return content

    toc_lines = [
        '    <aside class="toc" aria-label="On this page">',
        '      <h3 id="on-this-page">On this page</h3>'
    ]

    for heading_id, heading_text in headings[:8]:
        heading_text = heading_text.strip()
        if len(heading_text) > 60:
            heading_text = heading_text[:57] + '...'
        toc_lines.append(f'      <a href="#{heading_id}">{heading_text}</a>')

    toc_lines.append('    </aside>')

    new_toc = '\n'.join(toc_lines)

    # Remove existing TOC
    toc_pattern = r'<aside class="toc"[^>]*>.*?</aside>'
    content_no_toc = re.sub(toc_pattern, '{{TOC_PLACEHOLDER}}', content, flags=re.DOTALL, count=1)

    # Replace placeholder with new TOC
    return content_no_toc.replace('{{TOC_PLACEHOLDER}}', new_toc)

def fix_lesson(filepath):
    """Fix all issues in a lesson."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    changes = []

    # Step 1: Add IDs to H2 headings
    content_with_ids = add_heading_ids(content)
    if content_with_ids != content:
        changes.append("Added H2 IDs")
        content = content_with_ids

    # Step 2: Regenerate TOC from H2s (now with IDs)
    content_with_toc = regenerate_toc_from_h2s(content)
    if content_with_toc != content:
        changes.append("Regenerated TOC")
        content = content_with_toc

    # Step 3: Add toc-active.js script
    content_with_script = add_toc_script(content)
    if content_with_script != content:
        changes.append("Added toc-active.js")
        content = content_with_script

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return changes

    return []

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

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
        '46-advanced-risk-management.html',
        '47-portfolio-construction-kelly.html',
        '56-high-frequency-concepts.html',
        '57-trading-automation-apis.html',
        '58-portfolio-theory-advanced.html',
        '59-performance-attribution.html',
        '60-tax-optimization.html',
        '61-professional-infrastructure.html',
        '62-trading-career-path.html',
        '64-macro-regime-framework.html',
        '65-market-impact-models.html',
        '66-quantitative-strategy-design.html',
        '67-machine-learning-trading.html',
        '69-institutional-order-types.html',
        '70-execution-algorithms-twap-vwap.html',
        '71-multi-timeframe-confluence.html',
        '72-intermarket-analysis-advanced.html',
        '73-behavioral-finance-psychology.html',
        '74-building-trading-business.html',
    ]

    print(f"\n{'='*80}")
    print(f"FIXING REMAINING {len(problematic_lessons)} LESSONS")
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
            print(f"✅ {filename}: {', '.join(changes)}")
        else:
            print(f"⚠️  {filename}: No changes needed")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Fixed {fixed_count} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
