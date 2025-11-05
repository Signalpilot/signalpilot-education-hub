#!/usr/bin/env python3
"""
Regenerate ALL TOCs from actual H2 headings in lessons.
This ensures TOC links match actual heading IDs.
"""

import re
from pathlib import Path

def generate_toc_from_headings(content):
    """Generate TOC from actual H2 headings in content."""
    # Find all H2 headings with IDs
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
        # Truncate very long headings
        if len(heading_text) > 60:
            heading_text = heading_text[:57] + '...'
        toc_lines.append(f'      <a href="#{heading_id}">{heading_text}</a>')

    toc_lines.append('    </aside>')

    return '\n'.join(toc_lines)

def regenerate_toc(filepath):
    """Replace existing TOC with one generated from actual H2s."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Generate new TOC from H2s
    new_toc = generate_toc_from_headings(content)
    if not new_toc:
        return False, "Not enough H2 headings"

    # Remove existing TOC
    toc_pattern = r'<aside class="toc"[^>]*>.*?</aside>'
    content_no_toc = re.sub(toc_pattern, '{{TOC_PLACEHOLDER}}', content, flags=re.DOTALL, count=1)

    # Replace placeholder with new TOC
    content_new_toc = content_no_toc.replace('{{TOC_PLACEHOLDER}}', new_toc)

    if content_new_toc != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content_new_toc)
        return True, "Regenerated TOC"

    return False, "No changes"

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')
    all_lessons = list(curriculum_dir.rglob('*.html'))

    print(f"\n{'='*80}")
    print(f"REGENERATING ALL TOCs FROM ACTUAL H2 HEADINGS")
    print(f"{'='*80}\n")

    regenerated_count = 0
    for filepath in sorted(all_lessons):
        changed, message = regenerate_toc(filepath)

        if changed:
            regenerated_count += 1
            print(f"✅ {filepath.name}: {message}")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Regenerated {regenerated_count} TOCs")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
