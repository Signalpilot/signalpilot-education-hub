#!/usr/bin/env python3
"""
Fix non-semantic div-based accordions to use semantic HTML5 <details> and <summary> elements
This script converts:
  <div class="accordion-item">
    <div class="accordion-header">Title</div>
    <div class="accordion-content">Content</div>
  </div>

To:
  <details class="accordion-item">
    <summary class="accordion-header">Title</summary>
    <div class="accordion-content">Content</div>
  </details>
"""

import re
import os
from pathlib import Path

def fix_accordion_in_file(file_path):
    """Fix accordion elements in a single file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Step 1: Convert <div class="accordion-item"> to <details class="accordion-item">
    content = re.sub(
        r'<div class="accordion-item">',
        r'<details class="accordion-item">',
        content
    )

    # Step 2: Convert closing </div> of accordion-item to </details>
    # We need to be careful here - we only want to replace the closing div that matches accordion-item
    # First, let's convert accordion-header divs to summary tags
    content = re.sub(
        r'<div class="accordion-header">',
        r'<summary class="accordion-header">',
        content
    )

    # Convert closing </div> after accordion-header to </summary>
    # This regex finds </div> that comes after accordion-header content
    content = re.sub(
        r'(</summary>.*?)</div>(\s*</details>)',
        r'\1\2',
        content,
        flags=re.DOTALL
    )

    # Now we need to find and replace the </div> that closes accordion-item with </details>
    # This is tricky because we need to match the structure correctly
    # Let's use a different approach - find accordion-item blocks and replace them

    # Actually, let's use a more reliable approach:
    # Find patterns like: </div>\s*</div> where the outer one should be </details>
    # This occurs at the end of accordion-item blocks

    # Better approach: Replace the pattern more carefully
    # After accordion-content closes, the next </div> should be </details>
    content = re.sub(
        r'(</div>\s*</div>)(\s*</(details|div))',
        lambda m: m.group(1).replace('</div>', '</details>', 1) + m.group(2),
        content
    )

    # Let's use a cleaner regex-based approach
    # Find the entire accordion-item structure and replace it
    def replace_accordion_item(match):
        """Replace a single accordion-item block"""
        full_match = match.group(0)
        # Replace opening div
        result = full_match.replace('<div class="accordion-item">', '<details class="accordion-item">', 1)
        # Replace accordion-header
        result = result.replace('<div class="accordion-header">', '<summary class="accordion-header">', 1)
        result = re.sub(r'(</summary>.*?)</div>(\s*$)', r'\1</details>\2', result, count=1, flags=re.DOTALL)
        return result

    # Let me try a different, more robust approach
    # Process the file line by line or use a state machine

    # Simpler approach: Just do string replacements in order
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    fixed_lines = []
    in_accordion_item = False
    accordion_content_divs = 0

    for line in lines:
        modified_line = line

        # Track when we enter an accordion-item
        if 'class="accordion-item"' in line and '<div' in line:
            modified_line = line.replace('<div class="accordion-item">', '<details class="accordion-item">')
            in_accordion_item = True
            accordion_content_divs = 0

        # Convert accordion-header div to summary
        elif 'class="accordion-header"' in line and '<div' in line and in_accordion_item:
            modified_line = line.replace('<div class="accordion-header">', '<summary class="accordion-header">')

        # Convert closing div of accordion-header to summary
        elif '</div>' in line and in_accordion_item:
            # Check if this is likely the header close (next line or soon after should be accordion-content)
            # For now, let's check if we haven't entered accordion-content yet
            if accordion_content_divs == 0 and 'accordion-content' not in line:
                # This is likely the header closing
                modified_line = line.replace('</div>', '</summary>', 1)
            elif accordion_content_divs > 0:
                # We're inside accordion-content, decrement counter
                accordion_content_divs -= 1
                if accordion_content_divs == 0:
                    # This closes the accordion-content, next </div> closes accordion-item
                    modified_line = line  # Keep as is
                    # Mark that next </div> should become </details>
            else:
                # Check if this is the accordion-item closer
                # It should be after accordion-content
                modified_line = line.replace('</div>', '</details>', 1)
                in_accordion_item = False

        # Track accordion-content
        elif 'class="accordion-content"' in line and in_accordion_item:
            accordion_content_divs = 1  # Start counting divs inside accordion-content
            modified_line = line

        # Count nested divs in accordion-content
        elif in_accordion_item and accordion_content_divs > 0:
            # Count opening and closing divs
            accordion_content_divs += line.count('<div')
            accordion_content_divs -= line.count('</div>')
            modified_line = line

        fixed_lines.append(modified_line)

    return ''.join(fixed_lines)

def main():
    """Main function to fix all accordion files"""
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    # Get all HTML files with accordion class
    import subprocess
    result = subprocess.run(
        ['grep', '-r', '-l', 'class="accordion-item"', str(curriculum_dir)],
        capture_output=True,
        text=True
    )

    files_with_accordions = result.stdout.strip().split('\n')
    files_with_accordions = [f for f in files_with_accordions if f]  # Remove empty strings

    print(f"Found {len(files_with_accordions)} files with accordion-item classes")

    fixed_count = 0
    for file_path in files_with_accordions:
        print(f"Fixing: {file_path}")
        try:
            fixed_content = fix_accordion_in_file(file_path)
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(fixed_content)
            fixed_count += 1
            print(f"  ✓ Fixed")
        except Exception as e:
            print(f"  ✗ Error: {e}")

    print(f"\nFixed {fixed_count} / {len(files_with_accordions)} files")

if __name__ == '__main__':
    main()
