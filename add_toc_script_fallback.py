#!/usr/bin/env python3
"""
Add toc-active.js to lessons that don't have edu-enhanced.js.
Insert after edu.js instead.
"""

import re
from pathlib import Path

def add_toc_script_fallback(filepath):
    """Add toc-active.js after edu.js if edu-enhanced.js doesn't exist."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Check if already has toc-active.js
    if 'toc-active.js' in content:
        return False

    # Try pattern 1: After edu.js
    pattern1 = r'(<script src="/assets/edu\.js"></script>)'
    replacement1 = r'\1\n<script src="/assets/toc-active.js"></script>'

    content = re.sub(pattern1, replacement1, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True

    return False

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    missing_script_lessons = [
        '24-footprint-charts.html',
        '25-dark-pools.html',
        '26-smart-money-divergence.html',
        '27-multi-timeframe-mastery.html',
        '28-janus-atlas-advanced.html',
        '29-plutus-flow-mastery.html',
        '33-advanced-risk-management.html',
        '34-trade-journal-mastery.html',
        '35-professional-operations.html',
        '56-high-frequency-concepts.html',
        '57-trading-automation-apis.html',
        '58-portfolio-theory-advanced.html',
        '59-performance-attribution.html',
        '60-tax-optimization.html',
        '61-professional-infrastructure.html',
        '62-trading-career-path.html',
    ]

    print(f"\n{'='*80}")
    print(f"ADDING TOC-ACTIVE.JS TO {len(missing_script_lessons)} LESSONS")
    print(f"{'='*80}\n")

    added_count = 0
    for filename in missing_script_lessons:
        matches = list(curriculum_dir.rglob(filename))
        if not matches:
            print(f"❌ Not found: {filename}")
            continue

        filepath = matches[0]

        if add_toc_script_fallback(filepath):
            added_count += 1
            print(f"✅ {filename}")
        else:
            print(f"⚠️  {filename}: Already has script or couldn't add")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Added script to {added_count} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
