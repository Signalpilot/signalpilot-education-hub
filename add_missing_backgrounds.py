#!/usr/bin/env python3
"""
Add missing background divs to lessons that never had them.
"""

import re
from pathlib import Path

# Complete background markup to insert after <body>
BACKGROUND_MARKUP = '''  <div class="bg-stars" aria-hidden="true"></div>
  <canvas id="constellations" class="sp-constellations" aria-hidden="true"></canvas>
  <div class="bg-aurora" aria-hidden="true"></div>

'''

def add_backgrounds(filepath):
    """Add background divs after <body> tag if missing."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Check if bg-aurora exists
    if 'bg-aurora' in content:
        return False

    # Pattern: Find <body> followed immediately by <header> (no background divs)
    pattern = r'(<body>\s*\n)\s*(<header class="sp-header">)'

    # Replace with body + background markup + header
    replacement = r'\1' + BACKGROUND_MARKUP + r'\2'

    content = re.sub(pattern, replacement, content)

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True

    return False

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    # Lessons still missing bg-aurora
    missing_bg_lessons = [
        '21-bid-ask-spread-dynamics.html',
        '22-order-book-analysis.html',
        '23-market-making-hft.html',
        '29-plutus-flow-mastery.html',
        '33-advanced-risk-management.html',
        '34-trade-journal-mastery.html',
        '35-professional-operations.html',
        '48-institutional-order-flow.html',
        '49-market-regime-recognition.html',
        '50-auction-theory-advanced.html',
        '51-cross-asset-correlations.html',
        '52-volatility-trading.html',
        '53-algorithmic-execution.html',
        '54-system-development.html',
        '55-machine-learning-trading.html',
        '62-trading-career-path.html',
    ]

    print(f"\n{'='*80}")
    print(f"ADDING BACKGROUND MARKUP TO {len(missing_bg_lessons)} LESSONS")
    print(f"{'='*80}\n")

    fixed_count = 0
    for filename in missing_bg_lessons:
        matches = list(curriculum_dir.rglob(filename))
        if not matches:
            print(f"❌ Not found: {filename}")
            continue

        filepath = matches[0]

        if add_backgrounds(filepath):
            fixed_count += 1
            print(f"✅ {filename}: Added background divs")
        else:
            print(f"⚠️  {filename}: Already has backgrounds or pattern didn't match")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Added backgrounds to {fixed_count} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
