#!/usr/bin/env python3
"""
Fix checkpoint positioning to be at exactly 50% of lesson content.
V3: Improved algorithm that handles lessons with H2 or H3 structures.
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

def find_checkpoint_lines(lines):
    """Find all checkpoint div blocks and return their line ranges."""
    checkpoint_ranges = []
    i = 0
    while i < len(lines):
        line = lines[i]
        if 'CHECKPOINT' in line and any(emoji in line for emoji in ['🔴', '🟡', '🟢']):
            # Find the start of the div
            start = i
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
    Find actual content boundaries using multiple strategies.
    Start: After header/TL;DR, look for:
      1. First H3 heading (Strategy 1, Part 1, etc.)
      2. Or first H2 heading if no early H3s
    End: Before footer/navigation
    """
    start_line = 0
    end_line = len(lines) - 1

    # Strategy 1: Look for first H3 heading after "What You'll Learn"
    found_learning_objectives = False
    for i, line in enumerate(lines):
        if "What You'll Learn" in line or "🎯" in line:
            found_learning_objectives = True

        if found_learning_objectives and ('<h3' in line or '<h2>' in line or '<h2 ' in line):
            # Skip special sections
            context = ' '.join(lines[max(0, i-2):min(len(lines), i+5)])
            if not any(skip in context for skip in ['TL;DR', 'Key Takeaways', 'Test', 'Related Lessons']):
                start_line = i
                break

    # Fallback: If no H3 found, look for first H2
    if start_line == 0:
        for i, line in enumerate(lines):
            if ('<h2>' in line or '<h2 ' in line):
                context = ' '.join(lines[max(0, i-2):min(len(lines), i+3)])
                if not any(skip in context for skip in ['TL;DR', 'Key Takeaways', 'Test']):
                    start_line = i
                    break

    # Find end - before nav-article, Test Your Knowledge, etc.
    for i in range(len(lines) - 1, 0, -1):
        line = lines[i]
        if any(marker in line for marker in [
            'nav-article', 'Test Your Knowledge', 'Practice Exercise',
            'class="related-articles"', '<div class="key-takeaway"'
        ]):
            end_line = i - 1
            break

    return start_line, end_line

def find_good_insertion_point(lines, target_line):
    """
    Find a good insertion point near the target line.
    Prefer: after </p>, </div>, </ul>, </ol>, but before <h2> or <h3>
    """
    # Search window: ±15 lines from target
    search_start = max(0, target_line - 15)
    search_end = min(len(lines), target_line + 15)

    # First, try to find a position after target_line
    for i in range(target_line, search_end):
        line = lines[i].strip()
        # Good insertion points: after closing tags
        if line.endswith('</p>') or line.endswith('</div>') or line.endswith('</ul>') or line.endswith('</ol>'):
            # Make sure next line isn't a heading or special section
            if i + 1 < len(lines):
                next_line = lines[i + 1].strip()
                if not ('<h2' in next_line or '<h3' in next_line or '<div class="section-break"' in next_line):
                    return i + 1

    # If no good point found after, try before
    for i in range(target_line, search_start, -1):
        line = lines[i].strip()
        if line.endswith('</p>') or line.endswith('</div>') or line.endswith('</ul>') or line.endswith('</ol>'):
            if i + 1 < len(lines):
                next_line = lines[i + 1].strip()
                if not ('<h2' in next_line or '<h3' in next_line):
                    return i + 1

    # Fallback: just use target_line
    return target_line

def fix_lesson_checkpoint(lesson_path):
    """
    Fix checkpoint positioning in a lesson.
    """
    print(f"\nProcessing: {os.path.basename(lesson_path)}")

    with open(lesson_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    # Step 1: Remove all existing checkpoints
    checkpoint_ranges = find_checkpoint_lines(lines)
    if checkpoint_ranges:
        print(f"  Removing {len(checkpoint_ranges)} existing checkpoint(s)")
        for start, end in reversed(checkpoint_ranges):
            del lines[start:end+1]

    # Step 2: Find content boundaries
    start_line, end_line = get_content_boundaries(lines)
    content_length = end_line - start_line

    if content_length <= 0:
        print(f"  ⚠️  WARNING: Invalid content boundaries")
        return False

    print(f"  Content: lines {start_line}-{end_line} ({content_length} lines)")

    # Step 3: Calculate exact 50% point
    midpoint_line = start_line + (content_length // 2)

    # Step 4: Find good insertion point
    insertion_line = find_good_insertion_point(lines, midpoint_line)

    # Calculate actual percentage
    actual_position = insertion_line - start_line
    percentage = (actual_position / content_length) * 100
    print(f"  Inserting at line {insertion_line} ({percentage:.1f}%)")

    # Step 5: Insert the checkpoint
    checkpoint_lines = CHECKPOINT_TEMPLATE.split('\n')
    for i, cp_line in enumerate(checkpoint_lines):
        lines.insert(insertion_line + i, cp_line + '\n')

    # Step 6: Write back
    with open(lesson_path, 'w', encoding='utf-8') as f:
        f.writelines(lines)

    return True

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')
    levels = ['beginner', 'intermediate', 'advanced', 'professional']

    print("="*100)
    print("FIXING CHECKPOINT POSITIONS TO 50% (V3 - Improved Content Detection)")
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
    print(f"✅ Fixed: {fixed_count}")
    print(f"❌ Failed: {failed_count}")
    print(f"{'='*100}\n")

if __name__ == '__main__':
    main()
