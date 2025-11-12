#!/usr/bin/env python3
"""
Verify that each lesson has exactly 1 checkpoint positioned at ~50% of the lesson content.
"""

import os
import json
from pathlib import Path

def find_checkpoints(html_content):
    """Find all checkpoint positions in the HTML content."""
    lines = html_content.split('\n')
    checkpoints = []

    for i, line in enumerate(lines, 1):
        if 'CHECKPOINT' in line and ('🔴' in line or '🟡' in line or '🟢' in line):
            checkpoints.append(i)

    return checkpoints

def get_content_boundaries(html_content):
    """
    Find the actual content boundaries (skip header/boilerplate, exclude footer).
    Returns (start_line, end_line) for the main content section.
    """
    lines = html_content.split('\n')

    # Find where main content starts (after header/TL;DR)
    start_line = 0
    for i, line in enumerate(lines, 1):
        if '<article>' in line or 'What You\'ll Learn' in line or '<h2>' in line:
            start_line = i
            break

    # Find where main content ends (before footer navigation)
    end_line = len(lines)
    for i in range(len(lines) - 1, 0, -1):
        if 'nav-article' in lines[i] or 'Test Your Knowledge' in lines[i]:
            end_line = i
            break

    return start_line, end_line

def verify_lesson(lesson_path):
    """
    Verify a single lesson has exactly 1 checkpoint at ~50%.
    Returns (lesson_id, checkpoint_count, position_percentage, status, details)
    """
    try:
        with open(lesson_path, 'r', encoding='utf-8') as f:
            content = f.read()

        checkpoints = find_checkpoints(content)
        total_lines = len(content.split('\n'))
        start_line, end_line = get_content_boundaries(content)
        content_lines = end_line - start_line

        lesson_name = os.path.basename(lesson_path)

        if len(checkpoints) == 0:
            return (lesson_name, 0, 0, '❌ MISSING', 'No checkpoint found')
        elif len(checkpoints) > 1:
            positions = [f"{cp} ({((cp - start_line) / content_lines * 100):.1f}%)" for cp in checkpoints]
            return (lesson_name, len(checkpoints), 0, '❌ MULTIPLE', f'Found {len(checkpoints)} checkpoints at lines: {", ".join(positions)}')
        else:
            checkpoint_line = checkpoints[0]
            # Calculate position relative to content area
            position_in_content = checkpoint_line - start_line
            percentage = (position_in_content / content_lines) * 100

            # Check if within acceptable range (45-55%)
            if 45 <= percentage <= 55:
                status = '✅ GOOD'
            elif 40 <= percentage <= 60:
                status = '⚠️  ACCEPTABLE'
            else:
                status = '❌ BAD'

            details = f'Line {checkpoint_line}/{total_lines} (content: {start_line}-{end_line})'
            return (lesson_name, 1, percentage, status, details)

    except Exception as e:
        lesson_name = os.path.basename(lesson_path)
        return (lesson_name, -1, 0, '❌ ERROR', str(e))

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    # Collect all lesson files
    levels = ['beginner', 'intermediate', 'advanced', 'professional']
    all_lessons = []

    for level in levels:
        level_dir = curriculum_dir / level
        if level_dir.exists():
            html_files = sorted(level_dir.glob('*.html'))
            all_lessons.extend([(level, f) for f in html_files])

    print(f"\n{'='*100}")
    print(f"CHECKPOINT POSITIONING VERIFICATION REPORT")
    print(f"{'='*100}\n")
    print(f"Total lessons to verify: {len(all_lessons)}\n")

    # Statistics
    stats = {
        'good': [],
        'acceptable': [],
        'bad': [],
        'missing': [],
        'multiple': [],
        'errors': []
    }

    # Verify each lesson
    current_level = None
    for level, lesson_path in all_lessons:
        if level != current_level:
            print(f"\n{level.upper()}")
            print(f"{'-'*100}")
            current_level = level

        lesson_name, count, percentage, status, details = verify_lesson(lesson_path)

        # Print result
        if count == 1:
            print(f"{status} {lesson_name:60s} | Position: {percentage:5.1f}% | {details}")
        else:
            print(f"{status} {lesson_name:60s} | Count: {count} | {details}")

        # Track statistics
        if '✅' in status:
            stats['good'].append((lesson_name, percentage))
        elif '⚠️' in status:
            stats['acceptable'].append((lesson_name, percentage))
        elif 'BAD' in status:
            stats['bad'].append((lesson_name, percentage))
        elif 'MISSING' in status:
            stats['missing'].append(lesson_name)
        elif 'MULTIPLE' in status:
            stats['multiple'].append(lesson_name)
        elif 'ERROR' in status:
            stats['errors'].append((lesson_name, details))

    # Print summary
    print(f"\n{'='*100}")
    print(f"SUMMARY")
    print(f"{'='*100}\n")

    total = len(all_lessons)
    print(f"✅ Good (45-55%):        {len(stats['good']):3d} / {total} ({len(stats['good'])/total*100:.1f}%)")
    print(f"⚠️  Acceptable (40-60%): {len(stats['acceptable']):3d} / {total} ({len(stats['acceptable'])/total*100:.1f}%)")
    print(f"❌ Bad positioning:      {len(stats['bad']):3d} / {total} ({len(stats['bad'])/total*100:.1f}%)")
    print(f"❌ Missing checkpoint:   {len(stats['missing']):3d} / {total} ({len(stats['missing'])/total*100:.1f}%)")
    print(f"❌ Multiple checkpoints: {len(stats['multiple']):3d} / {total} ({len(stats['multiple'])/total*100:.1f}%)")
    print(f"❌ Errors:               {len(stats['errors']):3d} / {total} ({len(stats['errors'])/total*100:.1f}%)")

    # Show problems that need fixing
    if stats['bad'] or stats['missing'] or stats['multiple']:
        print(f"\n{'='*100}")
        print(f"ISSUES REQUIRING ATTENTION")
        print(f"{'='*100}\n")

        if stats['missing']:
            print(f"Missing checkpoints ({len(stats['missing'])}):")
            for lesson in stats['missing']:
                print(f"  - {lesson}")

        if stats['multiple']:
            print(f"\nMultiple checkpoints ({len(stats['multiple'])}):")
            for lesson in stats['multiple']:
                print(f"  - {lesson}")

        if stats['bad']:
            print(f"\nBadly positioned checkpoints ({len(stats['bad'])}):")
            for lesson, percentage in sorted(stats['bad'], key=lambda x: abs(x[1] - 50), reverse=True):
                print(f"  - {lesson:60s} at {percentage:5.1f}%")

    # Overall pass/fail
    print(f"\n{'='*100}")
    if len(stats['bad']) == 0 and len(stats['missing']) == 0 and len(stats['multiple']) == 0:
        print("✅ ALL LESSONS PASS: Every lesson has exactly 1 checkpoint within acceptable range!")
    else:
        issues = len(stats['bad']) + len(stats['missing']) + len(stats['multiple'])
        print(f"❌ VERIFICATION FAILED: {issues} lessons need attention")
    print(f"{'='*100}\n")

if __name__ == '__main__':
    main()
