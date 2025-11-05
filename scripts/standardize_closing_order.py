#!/usr/bin/env python3
"""
Standardize closing section order across all lessons
Target order: Takeaways → Practice → Quiz → Related → Download
Version: 1.0
Date: November 5, 2025
"""

import re
from pathlib import Path
import sys

# Target order for closing sections
TARGET_ORDER = [
    'key-takeaway',      # Key Takeaways
    'Practice Exercise', # Practice Exercise
    'Test Your',         # Test Your Knowledge/Understanding
    'Related Lessons',   # Related Lessons
    'Downloadable'       # Downloadable Resources
]

def identify_section_type(html_block):
    """Identify what type of section this is"""
    if 'key-takeaway' in html_block or 'Key Takeaways' in html_block:
        return 'key-takeaway'
    elif 'Practice Exercise' in html_block:
        return 'Practice Exercise'
    elif 'Test Your' in html_block:
        return 'Test Your'
    elif 'Related Lessons' in html_block:
        return 'Related Lessons'
    elif 'Downloadable' in html_block or 'Download' in html_block:
        return 'Downloadable'
    return None

def extract_closing_sections(content):
    """Extract all closing sections with their positions"""
    sections = []

    # Find the start of closing sections (after last case study or main content)
    # Look for "Key Takeaways" as the marker
    key_takeaway_match = re.search(r'<div class="key-takeaway">', content)
    if not key_takeaway_match:
        return None, "No Key Takeaways section found"

    search_start = key_takeaway_match.start()

    # Find the end (navigation footer)
    nav_match = re.search(r'<!-- Bottom Navigation -->|<div class="wrap nav-article">', content)
    if not nav_match:
        return None, "No navigation footer found"

    search_end = nav_match.start()

    # Extract the closing section area
    closing_area = content[search_start:search_end]

    # Pattern to match major closing blocks
    # Match from one section-break to the next, or key-takeaway block
    patterns = [
        (r'(<div class="key-takeaway">.*?</div>\s*\n)', 'key-takeaway'),
        (r'(<div class="section-break"><span>Practice Exercise</span></div>.*?)(?=<div class="section-break">|<div class="wrap nav-article">|$)', 'Practice Exercise'),
        (r'(<div class="section-break"><span>Test Your [^<]*</span></div>.*?)(?=<div class="section-break">|<div class="wrap nav-article">|$)', 'Test Your'),
        (r'(<div class="section-break"><span>Related Lessons</span></div>.*?)(?=<div class="section-break">|<div class="wrap nav-article">|$)', 'Related Lessons'),
        (r'(<div class="section-break"><span>Downloadable[^<]*</span></div>.*?)(?=<div class="section-break">|<div class="wrap nav-article">|$)', 'Downloadable'),
    ]

    for pattern, section_type in patterns:
        matches = list(re.finditer(pattern, closing_area, re.DOTALL))
        for match in matches:
            block = match.group(1)
            pos_in_closing = match.start()
            actual_pos = search_start + pos_in_closing

            sections.append({
                'type': section_type,
                'html': block,
                'start': actual_pos,
                'end': actual_pos + len(block)
            })

    # Sort by position
    sections.sort(key=lambda x: x['start'])

    return sections, None

def get_current_order(sections):
    """Get the current order of sections"""
    return [s['type'] for s in sections]

def reorder_sections(sections):
    """Reorder sections according to TARGET_ORDER"""
    ordered = []

    for target_type in TARGET_ORDER:
        for section in sections:
            if section['type'] == target_type:
                ordered.append(section)
                break  # Only take the first match of each type

    return ordered

def apply_standardization(file_path, dry_run=False):
    """Standardize closing section order in a single lesson"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Extract sections
    sections, error = extract_closing_sections(content)

    if error:
        return False, error

    if len(sections) < 3:
        return False, f"Only {len(sections)} closing sections found (need at least 3)"

    # Check current order
    current_order = get_current_order(sections)
    target_types = [t for t in TARGET_ORDER if t in current_order]

    # Check if already in correct order
    if current_order == target_types:
        return False, "Already in correct order"

    # Reorder
    reordered = reorder_sections(sections)

    if len(reordered) != len(sections):
        return False, f"Reordering mismatch: {len(sections)} → {len(reordered)}"

    # Remove old sections from content (in reverse order to preserve positions)
    for section in reversed(sections):
        content = content[:section['start']] + content[section['end']:]

    # Find insertion point (where Key Takeaways was)
    insert_pos = sections[0]['start']

    # Assemble new section HTML
    new_sections_html = '\n\n'.join([s['html'] for s in reordered])

    # Insert reordered sections
    content = content[:insert_pos] + new_sections_html + '\n\n' + content[insert_pos:]

    # Write back if not dry run
    if not dry_run:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)

    order_str = ' → '.join([s['type'][:10] for s in reordered])
    return True, f"Reordered {len(sections)} sections: {order_str}"

def main():
    """Process all lesson files"""
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    # Check for flags
    dry_run = '--dry-run' in sys.argv or '--test' in sys.argv

    if dry_run:
        print("🧪 DRY RUN MODE - No files will be modified\n")

    lesson_files = sorted(curriculum_dir.glob('*/*.html'))

    print(f"Standardizing closing section order in {len(lesson_files)} lessons...\n")

    success_count = 0
    skip_count = 0
    fail_count = 0

    for lesson_file in lesson_files:
        try:
            success, message = apply_standardization(lesson_file, dry_run=dry_run)
            if success:
                print(f"✓ {lesson_file.name}: {message}")
                success_count += 1
            else:
                if "Already in correct order" in message:
                    skip_count += 1
                else:
                    print(f"- {lesson_file.name}: {message}")
                    fail_count += 1
        except Exception as e:
            print(f"✗ {lesson_file.name}: ERROR - {e}")
            fail_count += 1

    print(f"\n{'='*60}")
    print(f"✓ Standardized: {success_count} lessons")
    print(f"⊘ Skipped (already correct): {skip_count} lessons")
    print(f"✗ Failed/incomplete: {fail_count} lessons")
    print(f"{'='*60}")

    if dry_run:
        print("\n🧪 This was a dry run. Re-run without --dry-run to apply changes.")

if __name__ == '__main__':
    main()
