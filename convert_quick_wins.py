#!/usr/bin/env python3
"""
Convert Quick Wins sections from div to collapsible details format.
"""
import re
import sys

def convert_quick_wins(content):
    """Convert Quick Wins div to collapsible details format."""

    # Pattern to match the Quick Wins div section
    # Looking for: <div class="callout-key">...<h4>⚡ Quick Wins for Tomorrow</h4>...content...</div>

    # First, let's find the opening div
    pattern = r'(<div class="callout-key">)\s*(<h4>⚡ Quick Wins for Tomorrow</h4>)'

    # Check if pattern exists
    if not re.search(pattern, content):
        return content, False

    # Find the full Quick Wins section
    # We need to find the matching closing </div>
    start_match = re.search(pattern, content)
    if not start_match:
        return content, False

    start_pos = start_match.start()

    # Find the matching closing </div> by counting div depth
    pos = start_match.end()
    depth = 1
    end_pos = None

    while pos < len(content) and depth > 0:
        # Look for next <div or </div>
        next_open = content.find('<div', pos)
        next_close = content.find('</div>', pos)

        if next_close == -1:
            break

        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            if depth == 0:
                end_pos = next_close + 6  # Include </div>
                break
            pos = next_close + 6

    if end_pos is None:
        return content, False

    # Extract the old section
    old_section = content[start_pos:end_pos]

    # Extract the inner content (everything after <h4> and before final </div>)
    inner_start = start_match.end()
    inner_content = content[inner_start:end_pos-6]  # -6 to exclude </div>

    # Build new collapsible section
    new_section = '''<details style="background:rgba(0,212,170,0.08);padding:1.5rem;border-radius:8px;margin:2rem 0;border-left:4px solid #00d4aa">
        <summary style="cursor:pointer;font-weight:600;font-size:1.1rem">⚡ Quick Wins for Tomorrow (Click to expand)</summary>
        <div style="margin-top:1rem">
''' + inner_content + '''
        </div>
      </details>'''

    # Replace in content
    new_content = content[:start_pos] + new_section + content[end_pos:]

    return new_content, True


def process_file(filepath):
    """Process a single HTML file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content, changed = convert_quick_wins(content)

        if changed:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False


if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python convert_quick_wins.py <file1.html> [file2.html ...]")
        sys.exit(1)

    for filepath in sys.argv[1:]:
        if process_file(filepath):
            print(f"✓ Converted: {filepath}")
        else:
            print(f"✗ Skipped: {filepath}")
