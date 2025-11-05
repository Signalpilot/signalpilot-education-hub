#!/usr/bin/env python3
"""
Comprehensive check: Verify TOC active highlighting will work on ALL 82 lessons.
"""

import re
from pathlib import Path

def check_lesson_toc(filepath):
    """Check if TOC active highlighting will work."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    issues = []

    # 1. Check if toc-active.js is loaded
    if 'toc-active.js' not in content:
        issues.append("Missing toc-active.js script")

    # 2. Check if TOC exists
    if '<aside class="toc"' not in content:
        issues.append("Missing TOC sidebar")
        return issues  # Can't check further without TOC

    # 3. Extract TOC links
    toc_match = re.search(r'<aside class="toc"[^>]*>(.*?)</aside>', content, re.DOTALL)
    if not toc_match:
        issues.append("TOC structure malformed")
        return issues

    toc_content = toc_match.group(1)
    toc_links = re.findall(r'href="#([^"]+)"', toc_content)
    toc_links = [link for link in toc_links if link != 'on-this-page']

    # 4. Extract H2 IDs
    h2_ids = re.findall(r'<h2[^>]*id="([^"]+)"', content)

    # 5. Check if TOC links match H2 IDs
    if not toc_links:
        issues.append("No TOC links found")
    elif not h2_ids:
        issues.append("No H2 headings with IDs found")
    else:
        # Check how many TOC links have matching H2s
        matching = [link for link in toc_links if link in h2_ids]
        missing = [link for link in toc_links if link not in h2_ids]

        if missing:
            issues.append(f"TOC links without matching H2s: {missing[:3]}")

        if len(matching) == 0:
            issues.append("NO TOC links match H2 IDs!")
        elif len(matching) < len(toc_links):
            issues.append(f"Only {len(matching)}/{len(toc_links)} TOC links match H2s")

    return issues

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')
    all_lessons = sorted(curriculum_dir.rglob('*.html'))

    print(f"\n{'='*80}")
    print(f"COMPREHENSIVE TOC CHECK - ALL {len(all_lessons)} LESSONS")
    print(f"{'='*80}\n")

    perfect_lessons = []
    problematic_lessons = []

    for filepath in all_lessons:
        issues = check_lesson_toc(filepath)

        if issues:
            problematic_lessons.append((filepath.name, issues))
        else:
            perfect_lessons.append(filepath.name)

    # Print results
    if problematic_lessons:
        print(f"❌ FOUND {len(problematic_lessons)} LESSONS WITH ISSUES:\n")
        for filename, issues in problematic_lessons:
            print(f"  {filename}:")
            for issue in issues:
                print(f"    - {issue}")
            print()

    print(f"\n{'='*80}")
    print(f"SUMMARY")
    print(f"{'='*80}")
    print(f"✅ Perfect lessons: {len(perfect_lessons)}")
    print(f"❌ Problematic lessons: {len(problematic_lessons)}")
    print(f"{'='*80}\n")

    if len(perfect_lessons) == len(all_lessons):
        print("🎉 ALL LESSONS PERFECT - TOC ACTIVE HIGHLIGHTING WILL WORK!")
    else:
        print(f"⚠️  {len(problematic_lessons)} lessons need fixes")

if __name__ == '__main__':
    main()
