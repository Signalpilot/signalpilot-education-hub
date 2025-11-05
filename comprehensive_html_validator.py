#!/usr/bin/env python3
"""
Comprehensive HTML structure validator for all 82 lessons.
Checks:
1. Div balance (opening vs closing tags)
2. TOC presence
3. TOC-active.js script
4. bg-aurora background
5. H2 headings with IDs
6. TOC links matching H2 IDs
"""

import re
from pathlib import Path

def validate_lesson(filepath):
    """Comprehensive validation of a lesson file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    issues = []

    # 1. Check div balance
    opening_divs = content.count('<div')
    closing_divs = content.count('</div>')
    div_balance = opening_divs - closing_divs

    if div_balance != 0:
        issues.append(f"DIV IMBALANCE: {opening_divs} opening, {closing_divs} closing, balance={div_balance}")

    # 2. Check TOC presence
    if '<aside class="toc"' not in content:
        issues.append("MISSING TOC sidebar")

    # 3. Check toc-active.js
    if 'toc-active.js' not in content:
        issues.append("Missing toc-active.js script")

    # 4. Check bg-aurora
    if 'bg-aurora' not in content:
        issues.append("Missing bg-aurora background")

    # 5. Extract H2 IDs
    h2_ids = re.findall(r'<h2[^>]*id="([^"]+)"', content)
    h2_without_ids = re.findall(r'<h2(?![^>]*id=)[^>]*>([^<]+)</h2>', content)

    if h2_without_ids:
        issues.append(f"H2 headings without IDs: {len(h2_without_ids)} found")

    # 6. Check TOC links match H2 IDs (only if TOC exists)
    if '<aside class="toc"' in content:
        toc_match = re.search(r'<aside class="toc"[^>]*>(.*?)</aside>', content, re.DOTALL)
        if toc_match:
            toc_content = toc_match.group(1)
            toc_links = re.findall(r'href="#([^"]+)"', toc_content)
            toc_links = [link for link in toc_links if link != 'on-this-page']

            if toc_links and h2_ids:
                mismatched = [link for link in toc_links if link not in h2_ids]
                if mismatched:
                    issues.append(f"TOC links without matching H2s: {mismatched[:3]}")

    return div_balance, issues

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')
    all_lessons = sorted(curriculum_dir.rglob('*.html'))

    print(f"\n{'='*80}")
    print(f"COMPREHENSIVE HTML VALIDATION - ALL {len(all_lessons)} LESSONS")
    print(f"{'='*80}\n")

    perfect_lessons = []
    problematic_lessons = []

    for filepath in all_lessons:
        div_balance, issues = validate_lesson(filepath)

        if issues:
            problematic_lessons.append((filepath.name, div_balance, issues))
        else:
            perfect_lessons.append(filepath.name)

    # Print results grouped by severity
    if problematic_lessons:
        # Group by div balance severity
        critical = [(name, bal, iss) for name, bal, iss in problematic_lessons if abs(bal) > 5]
        severe = [(name, bal, iss) for name, bal, iss in problematic_lessons if 1 < abs(bal) <= 5]
        minor = [(name, bal, iss) for name, bal, iss in problematic_lessons if abs(bal) == 1]
        other = [(name, bal, iss) for name, bal, iss in problematic_lessons if bal == 0]

        if critical:
            print(f"🚨 CRITICAL ({len(critical)} lessons) - CATASTROPHIC DIV IMBALANCE:\n")
            for filename, balance, issues in critical:
                print(f"  {filename}:")
                for issue in issues:
                    print(f"    - {issue}")
                print()

        if severe:
            print(f"❌ SEVERE ({len(severe)} lessons) - MAJOR DIV IMBALANCE:\n")
            for filename, balance, issues in severe:
                print(f"  {filename}:")
                for issue in issues:
                    print(f"    - {issue}")
                print()

        if minor:
            print(f"⚠️  MINOR ({len(minor)} lessons) - SMALL DIV IMBALANCE:\n")
            for filename, balance, issues in minor:
                print(f"  {filename}:")
                for issue in issues:
                    print(f"    - {issue}")
                print()

        if other:
            print(f"ℹ️  OTHER ISSUES ({len(other)} lessons) - NO DIV IMBALANCE:\n")
            for filename, balance, issues in other:
                print(f"  {filename}:")
                for issue in issues:
                    print(f"    - {issue}")
                print()

    print(f"{'='*80}")
    print(f"SUMMARY")
    print(f"{'='*80}")
    print(f"✅ Perfect lessons: {len(perfect_lessons)}")
    print(f"❌ Problematic lessons: {len(problematic_lessons)}")

    if critical:
        print(f"🚨 CRITICAL issues: {len(critical)} (must fix immediately)")
    if severe:
        print(f"❌ SEVERE issues: {len(severe)} (must fix)")
    if minor:
        print(f"⚠️  MINOR issues: {len(minor)} (should fix)")
    if other:
        print(f"ℹ️  OTHER issues: {len(other)} (can fix)")

    print(f"{'='*80}\n")

    if len(perfect_lessons) == len(all_lessons):
        print("🎉 ALL LESSONS PERFECT!")
    else:
        print(f"⚠️  {len(problematic_lessons)} lessons need fixes")

if __name__ == '__main__':
    main()
