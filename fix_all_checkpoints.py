#!/usr/bin/env python3
"""
Fix all checkpoint positioning to be at exactly 50% of lesson content.
"""

import os
import re
from pathlib import Path

# Standard checkpoint HTML template
CHECKPOINT_TEMPLATE = '''<div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
  <h4>🟡 CHECKPOINT (10 minutes)</h4>
  <p>You're now at the halfway point. You've learned the key strategies.</p>
  <p style="margin-top:0.5rem;font-size:0.9rem">Great progress! Take a quick stretch break if needed, then we'll dive into the advanced concepts ahead.</p>
</div>'''

def find_h2_headings(lines):
    """Find all H2 heading positions in the content."""
    h2_positions = []
    for i, line in enumerate(lines):
        # Match H2 headings but skip special sections
        if '<h2>' in line or '<h2 ' in line:
            # Skip if it's in TL;DR, Key Takeaways, Test Your Knowledge, etc.
            if i > 0:
                context = ' '.join(lines[max(0, i-2):min(len(lines), i+3)])
                if any(skip in context for skip in [
                    'TL;DR', 'Key Takeaways', 'Test Your Knowledge',
                    'Practice Exercise', 'Related Lessons', 'nav-article'
                ]):
                    continue
            h2_positions.append(i)
    return h2_positions

def find_checkpoint_lines(lines):
    """Find all checkpoint div blocks and return their line ranges."""
    checkpoint_ranges = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if 'CHECKPOINT' in line and any(emoji in line for emoji in ['🔴', '🟡', '🟢']):
            # Find the start of the div
            start = i
            # Walk backwards to find the opening div tag
            while start > 0 and '<div class="callout-info"' not in lines[start]:
                start -= 1
            # Find the end of the div
            end = i
            while end < len(lines) and '</div>' not in lines[end]:
                end += 1
            checkpoint_ranges.append((start, end))
            i = end + 1
        else:
            i += 1
    return checkpoint_ranges

def get_content_boundaries(lines):
    """
    Find the actual content boundaries.
    Start: After header/TL;DR section
    End: Before footer/navigation
    """
    start_line = 0
    end_line = len(lines) - 1

    # Find start (after TL;DR or first H2)
    for i, line in enumerate(lines):
        if '<h2>' in line or '<h2 ' in line:
            start_line = i
            break

    # Find end (before nav-article or Test Your Knowledge)
    for i in range(len(lines) - 1, 0, -1):
        if 'nav-article' in lines[i] or 'Test Your Knowledge' in lines[i]:
            end_line = i
            break

    return start_line, end_line

def fix_lesson_checkpoint(lesson_path):
    """
    Fix checkpoint positioning in a lesson:
    1. Remove all existing checkpoints
    2. Find the 50% point based on H2 headings
    3. Insert checkpoint at that position
    """
    print(f"\nProcessing: {os.path.basename(lesson_path)}")

    with open(lesson_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    original_lines = len(lines)

    # Step 1: Remove all existing checkpoints
    checkpoint_ranges = find_checkpoint_lines(lines)
    if checkpoint_ranges:
        print(f"  Found {len(checkpoint_ranges)} existing checkpoint(s), removing...")
        # Remove in reverse order to maintain line numbers
        for start, end in reversed(checkpoint_ranges):
            del lines[start:end+1]

    # Step 2: Find content boundaries
    start_line, end_line = get_content_boundaries(lines)
    print(f"  Content boundaries: lines {start_line} to {end_line}")

    # Step 3: Find H2 headings within content
    h2_positions = find_h2_headings(lines[start_line:end_line])
    if not h2_positions:
        print(f"  ⚠️  No H2 headings found in content area!")
        return False

    # Adjust H2 positions to be relative to full file
    h2_positions = [pos + start_line for pos in h2_positions]
    print(f"  Found {len(h2_positions)} H2 headings in content")

    # Step 4: Find the H2 closest to 50% of headings
    midpoint_index = len(h2_positions) // 2
    if len(h2_positions) % 2 == 0 and midpoint_index > 0:
        # Even number of headings, use the one just before middle
        midpoint_index -= 1

    insertion_line = h2_positions[midpoint_index]

    # Calculate actual percentage
    content_length = end_line - start_line
    position_in_content = insertion_line - start_line
    percentage = (position_in_content / content_length) * 100

    print(f"  Inserting checkpoint after H2 #{midpoint_index + 1} at line {insertion_line} ({percentage:.1f}%)")

    # Step 5: Insert checkpoint after the selected H2
    # Find the end of that section (usually after the next paragraph or two)
    insert_pos = insertion_line + 1
    # Skip forward a bit to place after the heading and first paragraph
    while insert_pos < len(lines) and insert_pos < insertion_line + 5:
        if '</p>' in lines[insert_pos] or '</div>' in lines[insert_pos]:
            insert_pos += 1
            break
        insert_pos += 1

    # Insert the checkpoint
    checkpoint_lines = CHECKPOINT_TEMPLATE.split('\n')
    for i, cp_line in enumerate(checkpoint_lines):
        lines.insert(insert_pos + i, cp_line + '\n')

    print(f"  ✅ Checkpoint inserted at line {insert_pos}")

    # Step 6: Write back to file
    with open(lesson_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    new_lines = len(lines)
    print(f"  File updated: {original_lines} → {new_lines} lines")
    return True

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')
    levels = ['beginner', 'intermediate', 'advanced', 'professional']

    print("="*100)
    print("FIXING ALL CHECKPOINT POSITIONS TO 50%")
    print("="*100)

    fixed_count = 0
    failed_count = 0

    for level in levels:
        level_dir = curriculum_dir / level
        if not level_dir.exists():
            continue

        print(f"\n{'='*100}")
        print(f"{level.upper()}")
        print(f"{'='*100}")

        html_files = sorted(level_dir.glob('*.html'))
        for lesson_path in html_files:
            try:
                if fix_lesson_checkpoint(lesson_path):
                    fixed_count += 1
                else:
                    failed_count += 1
            except Exception as e:
                print(f"  ❌ ERROR: {e}")
                failed_count += 1

    print(f"\n{'='*100}")
    print(f"SUMMARY")
    print(f"{'='*100}")
    print(f"✅ Fixed: {fixed_count}")
    print(f"❌ Failed: {failed_count}")
    print(f"{'='*100}\n")

if __name__ == '__main__':
    main()
