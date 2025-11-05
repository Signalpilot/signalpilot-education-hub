#!/usr/bin/env python3
"""
Add ID attributes to H2 headings and generate TOC for lessons missing both.
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

def generate_toc(content):
    """Generate TOC from H2 headings."""
    h2_pattern = r'<h2[^>]*id="([^"]+)"[^>]*>([^<]+)</h2>'
    headings = re.findall(h2_pattern, content)

    if not headings or len(headings) < 2:
        return None

    toc_lines = [
        '    <aside class="toc" aria-label="On this page">',
        '      <h3 id="on-this-page">On this page</h3>'
    ]

    for heading_id, heading_text in headings[:8]:
        heading_text = heading_text.strip()
        toc_lines.append(f'      <a href="#{heading_id}">{heading_text}</a>')

    toc_lines.append('    </aside>')

    return '\n'.join(toc_lines)

def fix_lesson(filepath):
    """Add heading IDs and TOC to lesson."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Step 1: Add IDs to headings without them
    content = add_heading_ids(content)

    # Step 2: Check if already has TOC
    if '<aside class="toc"' in content:
        # Just save the heading ID changes
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True, "Added heading IDs"
        return False, "Already has TOC"

    # Step 3: Generate TOC
    toc_html = generate_toc(content)
    if not toc_html:
        if content != original_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            return True, "Added heading IDs (no TOC - not enough headings)"
        return False, "Not enough headings for TOC"

    # Step 4: Insert TOC before nav-article
    pattern = r'(\n\s*)<div class="wrap nav-article">'
    replacement = f'''
    </div>

{toc_html}
  </div>

\\1<div class="wrap nav-article">'''

    content = re.sub(pattern, replacement, content, count=1)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True, "Added heading IDs + TOC"

    return False, "No changes"

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    missing_toc_lessons = [
        '24-footprint-charts.html',
        '25-dark-pools.html',
        '26-smart-money-divergence.html',
        '27-multi-timeframe-mastery.html',
        '28-janus-atlas-advanced.html',
        '56-high-frequency-concepts.html',
        '57-trading-automation-apis.html',
        '58-portfolio-theory-advanced.html',
        '59-performance-attribution.html',
        '60-tax-optimization.html',
        '61-professional-infrastructure.html',
    ]

    print(f"\n{'='*80}")
    print(f"ADDING HEADING IDs AND TOC TO {len(missing_toc_lessons)} LESSONS")
    print(f"{'='*80}\n")

    fixed_count = 0
    for filename in missing_toc_lessons:
        matches = list(curriculum_dir.rglob(filename))
        if not matches:
            print(f"❌ Not found: {filename}")
            continue

        filepath = matches[0]
        changed, message = fix_lesson(filepath)

        if changed:
            fixed_count += 1
            print(f"✅ {filename}: {message}")
        else:
            print(f"⚠️  {filename}: {message}")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Fixed {fixed_count} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
