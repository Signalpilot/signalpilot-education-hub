#!/usr/bin/env python3
"""
Find checkpoint placement issues in all lesson HTML files.
Issues to detect:
1. Checkpoints appearing immediately after "What You'll Learn"
2. Multiple checkpoints before first H2 heading (actual content)
3. Duplicate checkpoint timings (e.g., two "5 minutes")
"""

import re
import os
from pathlib import Path

def analyze_lesson(filepath):
    """Analyze a single lesson file for checkpoint issues."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    issues = []

    # Find all checkpoints
    checkpoint_pattern = r'<div class="callout-info"[^>]*>.*?<h4>(🔴|🟡|🟢)\s*CHECKPOINT\s*\((\d+)\s*minutes?\)</h4>.*?</div>'
    checkpoints = list(re.finditer(checkpoint_pattern, content, re.DOTALL))

    # Find "What You'll Learn" section
    what_youll_learn = re.search(r'<h3[^>]*>🎯 What You\'ll Learn</h3>', content)

    # Find first actual content H2
    first_h2 = re.search(r'<h2 id="[^"]*">[^<]+</h2>', content)

    if not checkpoints:
        return None

    # Check for checkpoints before first H2
    checkpoints_before_content = []
    if first_h2:
        first_h2_pos = first_h2.start()
        for cp in checkpoints:
            if cp.start() < first_h2_pos:
                timing = cp.group(2)
                checkpoints_before_content.append(timing)

    if checkpoints_before_content:
        issues.append(f"❌ {len(checkpoints_before_content)} checkpoint(s) BEFORE actual content starts: {checkpoints_before_content}")

    # Check for duplicate timings
    timings = [cp.group(2) for cp in checkpoints]
    duplicates = [t for t in set(timings) if timings.count(t) > 1]
    if duplicates:
        issues.append(f"❌ Duplicate checkpoint timings: {duplicates}")

    # Check spacing after "What You'll Learn"
    if what_youll_learn and checkpoints:
        learn_pos = what_youll_learn.start()
        for cp in checkpoints:
            cp_pos = cp.start()
            if cp_pos > learn_pos:
                # Check if checkpoint is within 500 chars of "What You'll Learn"
                distance = cp_pos - learn_pos
                if distance < 500:
                    issues.append(f"⚠️  Checkpoint appears {distance} chars after 'What You'll Learn' (likely misplaced)")
                break

    return {
        'file': os.path.basename(filepath),
        'path': filepath,
        'total_checkpoints': len(checkpoints),
        'checkpoint_timings': timings,
        'issues': issues
    }

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    all_lessons = []
    for html_file in curriculum_dir.rglob('*.html'):
        result = analyze_lesson(html_file)
        if result:
            all_lessons.append(result)

    # Sort by number of issues
    problematic_lessons = [l for l in all_lessons if l['issues']]
    problematic_lessons.sort(key=lambda x: len(x['issues']), reverse=True)

    print(f"\n{'='*80}")
    print(f"CHECKPOINT ANALYSIS REPORT")
    print(f"{'='*80}")
    print(f"Total lessons analyzed: {len(all_lessons)}")
    print(f"Lessons with checkpoint issues: {len(problematic_lessons)}")
    print(f"{'='*80}\n")

    if problematic_lessons:
        for lesson in problematic_lessons:
            print(f"\n📄 {lesson['file']}")
            print(f"   Path: {lesson['path']}")
            print(f"   Total checkpoints: {lesson['total_checkpoints']}")
            print(f"   Timings: {', '.join(lesson['checkpoint_timings'])} minutes")
            for issue in lesson['issues']:
                print(f"   {issue}")

    # Summary statistics
    print(f"\n{'='*80}")
    print(f"SUMMARY")
    print(f"{'='*80}")

    checkpoints_before_content_count = sum(1 for l in problematic_lessons if any('BEFORE actual content' in i for i in l['issues']))
    duplicate_timing_count = sum(1 for l in problematic_lessons if any('Duplicate' in i for i in l['issues']))

    print(f"Lessons with checkpoints BEFORE content: {checkpoints_before_content_count}")
    print(f"Lessons with duplicate timings: {duplicate_timing_count}")

    if problematic_lessons:
        print(f"\n⚠️  THIS IS UNACCEPTABLE - FIXING ALL {len(problematic_lessons)} LESSONS")

if __name__ == '__main__':
    main()
