#!/usr/bin/env python3
"""
FINAL FIX: Properly place TOC as sibling of prose div, not child.

Correct structure:
<div class="wrap article-grid">
  <div class="prose">
    ... content ...
  </div>  <!-- Close prose -->

  <aside class="toc">
    ... toc links ...
  </aside>
</div>  <!-- Close article-grid -->

<div class="wrap nav-article">
  ... buttons ...
</div>
"""

import re
from pathlib import Path

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

def fix_toc_placement(filepath):
    """Fix TOC placement to be sibling of prose."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Check if already has properly placed TOC (as sibling of prose)
    # Look for: </div> (prose close) followed by <aside class="toc"
    if re.search(r'</div>\s*\n\s*<aside class="toc"', content):
        return False, "Already has properly placed TOC"

    # Check if has TOC but incorrectly placed (inside prose)
    has_toc_inside_prose = '<aside class="toc"' in content and not re.search(r'</div>\s*\n\s*<aside class="toc"', content)

    if has_toc_inside_prose:
        # Remove incorrectly placed TOC
        toc_pattern = r'<aside class="toc".*?</aside>\s*</div>\s*\n'
        content = re.sub(toc_pattern, '', content, flags=re.DOTALL)

    # Generate TOC
    toc_html = generate_toc(content)
    if not toc_html:
        return False, "Cannot generate TOC (not enough headings)"

    # Find insertion point: right before nav-article
    # The pattern should be: (content) </div> <div class="wrap nav-article">
    # We need to insert: </div> (close prose) + TOC + </div> (close article-grid)

    pattern = r'(\n\s*)<div class="wrap nav-article">'

    replacement = f'''
    </div>

{toc_html}
  </div>

\\1<div class="wrap nav-article">'''

    new_content = re.sub(pattern, replacement, content, count=1)

    if new_content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True, "Fixed TOC placement"

    return False, "No changes made"

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    # All lessons that might need TOC fix
    all_lessons = list(curriculum_dir.rglob('*.html'))

    print(f"\n{'='*80}")
    print(f"FIXING TOC PLACEMENT IN ALL LESSONS")
    print(f"{'='*80}\n")

    fixed_count = 0
    for filepath in sorted(all_lessons):
        changed, message = fix_toc_placement(filepath)

        if changed:
            fixed_count += 1
            print(f"✅ {filepath.name}: {message}")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Fixed TOC placement in {fixed_count} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
