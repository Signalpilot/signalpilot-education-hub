#!/usr/bin/env python3
"""
Add checkpoint markers at 33%, 66%, 90% reading progress
Version: 1.0
Date: November 5, 2025
"""

import re
from pathlib import Path
import sys

CHECKPOINT_TEMPLATES = {
    33: '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🔴 CHECKPOINT (5 minutes)</h4>
        <p>You've completed the first third of this lesson.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Take a 30-second breath before continuing...</p>
      </div>
''',
    66: '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🟡 CHECKPOINT (10 minutes)</h4>
        <p>You're now at the halfway point. You've learned the key strategies.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Great progress! Take a quick stretch break...</p>
      </div>
''',
    90: '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🟢 CHECKPOINT (15 minutes)</h4>
        <p>Almost done! You've mastered the complete framework.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Final stretch - you're doing great...</p>
      </div>
'''
}

def find_content_bounds(content):
    """Find start and end of main content (exclude header/footer)"""

    # Start: After progress tracker or after first TL;DR
    start_patterns = [
        r'</div>\s*\n\s*<h2',  # After progress tracker
        r'</details>\s*\n.*?<h2',  # After TL;DR to first H2
    ]

    start_pos = 0
    for pattern in start_patterns:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            start_pos = match.start()
            break

    # End: Before "Key Takeaways" or before closing sections
    end_patterns = [
        r'<div class="key-takeaway">',
        r'<div class="section-break"><span>Practice Exercise</span></div>',
        r'<div class="section-break"><span>Test Your',
    ]

    end_pos = len(content)
    for pattern in end_patterns:
        match = re.search(pattern, content)
        if match:
            end_pos = min(end_pos, match.start())

    return start_pos, end_pos

def find_h2_positions(content, start_pos, end_pos):
    """Find all H2 positions in content area"""
    h2_pattern = r'<h2[^>]*id="[^"]*"[^>]*>'
    matches = re.finditer(h2_pattern, content[start_pos:end_pos])

    positions = [(start_pos + m.start(), m.group()) for m in matches]
    return positions

def insert_checkpoints(file_path, dry_run=False):
    """Insert checkpoint markers at 33%, 66%, 90% positions"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Skip if already has 3+ checkpoints
    checkpoint_count = content.count('CHECKPOINT')
    if checkpoint_count >= 3:
        return False, f"Already has {checkpoint_count} checkpoints"

    # Find content bounds
    start_pos, end_pos = find_content_bounds(content)
    content_length = end_pos - start_pos

    if content_length < 5000:  # Too short for checkpoints
        return False, "Content too short for checkpoints (< 5000 chars)"

    # Find H2 positions to insert near
    h2_positions = find_h2_positions(content, start_pos, end_pos)

    if len(h2_positions) < 4:  # Need at least 4 H2s for good placement
        return False, f"Not enough H2 headings for placement ({len(h2_positions)} found, need 4+)"

    # Calculate target positions (33%, 66%, 90% of content)
    target_positions = {
        33: start_pos + int(content_length * 0.33),
        66: start_pos + int(content_length * 0.66),
        90: start_pos + int(content_length * 0.90)
    }

    # Find nearest H2 before each target
    insertions = []
    for percent, target_pos in sorted(target_positions.items()):
        # Find H2 closest to but before target position
        nearest_h2 = None
        nearest_distance = float('inf')

        for h2_pos, h2_text in h2_positions:
            if h2_pos < target_pos:
                distance = target_pos - h2_pos
                if distance < nearest_distance:
                    nearest_distance = distance
                    nearest_h2 = h2_pos
            else:
                break  # H2s are in order, no need to check further

        if nearest_h2:
            insertions.append((nearest_h2, percent))

    if len(insertions) < 3:
        return False, f"Could only find {len(insertions)} insertion points (need 3)"

    # Insert checkpoints (in reverse to preserve positions)
    for pos, percent in reversed(insertions):
        checkpoint_html = CHECKPOINT_TEMPLATES[percent]
        content = content[:pos] + checkpoint_html + '\n\n' + content[pos:]

    # Write back if not dry run
    if not dry_run:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

    chars_added = len(content) - len(original_content)
    return True, f"Added {len(insertions)} checkpoints (+{chars_added} chars)"

def main():
    """Process all lesson files"""
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    # Check for --dry-run flag
    dry_run = '--dry-run' in sys.argv or '--test' in sys.argv

    if dry_run:
        print("🧪 DRY RUN MODE - No files will be modified\n")

    lesson_files = sorted(curriculum_dir.glob('*/*.html'))

    print(f"Adding checkpoint markers to {len(lesson_files)} lessons...\n")

    success_count = 0
    skip_count = 0
    fail_count = 0

    for lesson_file in lesson_files:
        try:
            success, message = insert_checkpoints(lesson_file, dry_run=dry_run)
            if success:
                print(f"✓ {lesson_file.name}: {message}")
                success_count += 1
            else:
                if "Already has" in message:
                    skip_count += 1
                else:
                    print(f"- {lesson_file.name}: {message}")
                    fail_count += 1
        except Exception as e:
            print(f"✗ {lesson_file.name}: ERROR - {e}")
            fail_count += 1

    print(f"\n{'='*60}")
    print(f"✓ Added checkpoints to: {success_count} lessons")
    print(f"⊘ Skipped (already had): {skip_count} lessons")
    print(f"✗ Failed: {fail_count} lessons")
    print(f"{'='*60}")

    if dry_run:
        print("\n🧪 This was a dry run. Re-run without --dry-run to apply changes.")

if __name__ == '__main__':
    main()
