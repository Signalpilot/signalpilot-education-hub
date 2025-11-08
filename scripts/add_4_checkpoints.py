#!/usr/bin/env python3
"""
Add 4 checkpoints at 25%, 50%, 75%, 95% reading progress
Replaces existing 3-checkpoint system with more frequent cognitive breaks
"""

import re
from pathlib import Path
import sys

CHECKPOINT_TEMPLATES = {
    25: '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🔴 CHECKPOINT</h4>
        <p>You've completed the first quarter of this lesson.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Take a 30-second breath before continuing...</p>
      </div>
''',
    50: '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🟡 CHECKPOINT</h4>
        <p>You're now at the halfway point. You've learned the key concepts.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Great progress! Take a quick stretch break...</p>
      </div>
''',
    75: '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🟠 CHECKPOINT</h4>
        <p>Three-quarters done! You're mastering the advanced strategies.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Almost there - stay focused...</p>
      </div>
''',
    95: '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🟢 CHECKPOINT</h4>
        <p>Almost done! You've mastered the complete framework.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Final stretch - you're doing great...</p>
      </div>
''',
}

def remove_existing_checkpoints(content):
    """Remove existing checkpoint markers"""
    # Match checkpoint divs with any emoji (🔴, 🟡, 🟢, 🟠)
    pattern = r'\s*<div class="callout-info"[^>]*>\s*<h4>[🔴🟡🟢🟠]\s*CHECKPOINT[^<]*</h4>.*?</div>\s*'
    content = re.sub(pattern, '\n', content, flags=re.DOTALL)
    return content

def find_content_bounds(content):
    """Find start and end of main content (exclude header/footer)"""

    # Start: After progress tracker or after first TL;DR
    start_patterns = [
        r'</details>\s*\n',  # After TL;DR
        r'<div class="key-insights">.*?</div>\s*\n',  # After key insights box
    ]

    start_pos = 0
    for pattern in start_patterns:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            start_pos = match.end()
            break

    # End: Before "Key Takeaways" or before closing sections
    end_patterns = [
        r'<div class="key-takeaway">',
        r'<div class="section-break"><span>Practice Exercise</span></div>',
        r'<div class="section-break"><span>Test Your',
        r'<div class="practice-section">',
    ]

    end_pos = len(content)
    for pattern in end_patterns:
        match = re.search(pattern, content)
        if match:
            end_pos = min(end_pos, match.start())

    return start_pos, end_pos

def find_heading_positions(content, start_pos, end_pos):
    """Find all H2 and H3 positions in content area for checkpoint placement"""
    # Match both H2 and H3 headings
    h2_pattern = r'<h2[^>]*>'
    h3_pattern = r'<h3[^>]*>'

    h2_matches = [(start_pos + m.start(), m.group(), 'h2') for m in re.finditer(h2_pattern, content[start_pos:end_pos])]
    h3_matches = [(start_pos + m.start(), m.group(), 'h3') for m in re.finditer(h3_pattern, content[start_pos:end_pos])]

    # Combine and sort by position
    all_headings = sorted(h2_matches + h3_matches, key=lambda x: x[0])

    return all_headings

def insert_checkpoints(file_path, dry_run=False):
    """Insert 4 checkpoint markers at 25%, 50%, 75%, 95% positions"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Remove existing checkpoints first
    content = remove_existing_checkpoints(content)

    # Find content bounds
    start_pos, end_pos = find_content_bounds(content)
    content_length = end_pos - start_pos

    if content_length < 5000:  # Too short for 4 checkpoints
        return False, f"Content too short for 4 checkpoints ({content_length} chars)"

    # Find heading positions (H2 and H3) to insert near
    heading_positions = find_heading_positions(content, start_pos, end_pos)

    if len(heading_positions) < 4:  # Need at least 4 headings for 4 checkpoints
        return False, f"Not enough headings ({len(heading_positions)} found, need 4+)"

    # Calculate target positions (25%, 50%, 75%, 95% of content)
    target_positions = {
        25: start_pos + int(content_length * 0.25),
        50: start_pos + int(content_length * 0.50),
        75: start_pos + int(content_length * 0.75),
        95: start_pos + int(content_length * 0.95)
    }

    # Find nearest heading before each target
    insertions = []
    for percent, target_pos in sorted(target_positions.items()):
        # Find heading closest to but before target position
        nearest_heading = None
        nearest_distance = float('inf')

        for heading_pos, heading_text, heading_type in heading_positions:
            if heading_pos < target_pos:
                distance = target_pos - heading_pos
                if distance < nearest_distance:
                    nearest_distance = distance
                    nearest_heading = heading_pos
            else:
                break  # Headings are in order, no need to check further

        if nearest_heading:
            insertions.append((nearest_heading, percent))

    if len(insertions) < 4:
        return False, f"Could only find {len(insertions)} insertion points (need 4)"

    # Insert checkpoints (in reverse to preserve positions)
    for pos, percent in reversed(insertions):
        checkpoint_html = CHECKPOINT_TEMPLATES[percent]
        content = content[:pos] + checkpoint_html + '\n\n' + content[pos:]

    # Write back if not dry run
    if not dry_run:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

    chars_added = len(content) - len(original_content)
    return True, f"Added {len(insertions)} checkpoints ({chars_added:+d} chars)"

def main():
    """Process lessons 1-41"""
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    # Check for --dry-run flag
    dry_run = '--dry-run' in sys.argv or '--test' in sys.argv

    if dry_run:
        print("🧪 DRY RUN MODE - No files will be modified\n")

    # Get lessons 1-41
    lesson_files = []
    lesson_files.extend(sorted(curriculum_dir.glob('beginner/*.html')))
    lesson_files.extend(sorted(curriculum_dir.glob('intermediate/*.html')))

    # Filter to lessons 1-41
    lesson_files = [f for f in lesson_files if any(
        f.name.startswith(f'{i:02d}-') or f.name.startswith(f'{i}-')
        for i in range(1, 42)
    )][:41]

    print(f"Adding 4 checkpoints (25%, 50%, 75%, 95%) to {len(lesson_files)} lessons...\n")

    success_count = 0
    fail_count = 0

    for lesson_file in lesson_files:
        try:
            success, message = insert_checkpoints(lesson_file, dry_run=dry_run)
            if success:
                print(f"✓ {lesson_file.name}: {message}")
                success_count += 1
            else:
                print(f"✗ {lesson_file.name}: {message}")
                fail_count += 1
        except Exception as e:
            print(f"✗ {lesson_file.name}: ERROR - {e}")
            fail_count += 1

    print(f"\n{'='*60}")
    print(f"✓ Updated: {success_count} lessons")
    print(f"✗ Failed: {fail_count} lessons")
    print(f"{'='*60}")

    if dry_run:
        print("\n🧪 This was a dry run. Re-run without --dry-run to apply changes.")

if __name__ == '__main__':
    main()
