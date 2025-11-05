#!/usr/bin/env python3
"""
Fix checkpoint placement issues in all lesson HTML files.

Correct structure:
1. Remove all checkpoints that appear BEFORE first H2
2. Remove duplicate checkpoint timings
3. Place checkpoints at proper intervals in content:
   - Checkpoint 1 (5 min) at ~33% of content
   - Checkpoint 2 (10 min) at ~50% of content
   - Checkpoint 3 (15 min) at ~75% of content
"""

import re
import os
from pathlib import Path

# Checkpoint templates
CHECKPOINT_5_MIN = '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🔴 CHECKPOINT (5 minutes)</h4>
        <p>You now understand the core concepts.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Take a 30-second breath before continuing...</p>
      </div>
'''

CHECKPOINT_10_MIN = '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🟡 CHECKPOINT (10 minutes)</h4>
        <p>You're now at the halfway point. You've learned the key strategies.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Great progress! Take a quick stretch break...</p>
      </div>
'''

CHECKPOINT_15_MIN = '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🟢 CHECKPOINT (15 minutes)</h4>
        <p>Almost done! You've mastered the complete framework.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Final stretch - you're doing great...</p>
      </div>
'''

def fix_lesson_checkpoints(filepath):
    """Fix checkpoint placement in a single lesson file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Find the first H2 (where actual content starts)
    first_h2_match = re.search(r'<h2 id="[^"]*">[^<]+</h2>', content)
    if not first_h2_match:
        print(f"   ⚠️  No H2 found, skipping: {os.path.basename(filepath)}")
        return False

    first_h2_pos = first_h2_match.start()

    # Find "What You'll Learn" section end
    what_learn_match = re.search(r'</ul>\s*</div>\s*(?=\s*<div class="callout-info")', content)
    if not what_learn_match:
        # Try alternative pattern
        what_learn_match = re.search(r'🎯 What You\'ll Learn.*?</div>', content, re.DOTALL)

    # Remove ALL existing checkpoints
    checkpoint_pattern = r'\s*<div class="callout-info"[^>]*>.*?CHECKPOINT.*?</div>\s*'
    content_no_checkpoints = re.sub(checkpoint_pattern, '\n', content, flags=re.DOTALL)

    # Find all H2 and H3 headings in the actual content (after first H2)
    heading_pattern = r'<h[23] id="[^"]*">[^<]+</h[23]>'
    all_headings = list(re.finditer(heading_pattern, content_no_checkpoints))

    # Filter headings that come after first H2
    content_headings = [h for h in all_headings if h.start() > first_h2_pos]

    if len(content_headings) < 3:
        print(f"   ⚠️  Not enough content sections, skipping: {os.path.basename(filepath)}")
        return False

    # Calculate insertion points (approximately 33%, 50%, 75% through content)
    total_headings = len(content_headings)

    # Find positions right after specific headings
    checkpoint_1_idx = int(total_headings * 0.25)  # ~25% through
    checkpoint_2_idx = int(total_headings * 0.50)  # ~50% through
    checkpoint_3_idx = int(total_headings * 0.75)  # ~75% through

    # Get the heading positions
    positions = []
    if checkpoint_1_idx < len(content_headings):
        positions.append((content_headings[checkpoint_1_idx].end(), CHECKPOINT_5_MIN))
    if checkpoint_2_idx < len(content_headings):
        positions.append((content_headings[checkpoint_2_idx].end(), CHECKPOINT_10_MIN))
    if checkpoint_3_idx < len(content_headings):
        positions.append((content_headings[checkpoint_3_idx].end(), CHECKPOINT_15_MIN))

    # Sort positions in reverse order to insert from end to start (maintains positions)
    positions.sort(reverse=True)

    # Insert checkpoints
    for pos, checkpoint_html in positions:
        content_no_checkpoints = content_no_checkpoints[:pos] + checkpoint_html + content_no_checkpoints[pos:]

    # Write back to file
    if content_no_checkpoints != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content_no_checkpoints)
        return True
    return False

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    problematic_files = [
        '43-cross-market-correlation.html',
        '32-backtesting-reality.html',
        '51-cross-asset-correlations.html',
        '18-session-liquidity-advanced.html',
        '17-time-sales-mastery.html',
        '13-smart-money-concepts.html',
        '06-moving-averages.html',
        '05-rsi-extremes.html',
        '04-repaint-problem.html',
        '01-the-liquidity-lie.html',
        '75-real-time-market-analysis.html',
        '45-auction-theory-imbalances.html',
        '37-options-order-flow.html',
        '41-fed-policy-liquidity.html',
        '40-market-maker-algorithms.html',
        '34-trade-journal-mastery.html',
        '21-bid-ask-spread-dynamics.html',
        '35-professional-operations.html',
        '22-order-book-analysis.html',
        '23-market-making-hft.html',
        '50-auction-theory-advanced.html',
        '48-institutional-order-flow.html',
        '19-footprint-charts-advanced.html',
        '16-market-structure-advanced.html',
        '14-cot-report.html',
        '02-volume-doesnt-lie.html',
        '07-revenge-trading.html',
        '09-position-sizing.html',
    ]

    print(f"\n{'='*80}")
    print(f"FIXING CHECKPOINT PLACEMENT IN {len(problematic_files)} LESSONS")
    print(f"{'='*80}\n")

    fixed_count = 0
    for filename in problematic_files:
        # Find the file in curriculum directory
        matches = list(curriculum_dir.rglob(filename))
        if not matches:
            print(f"❌ File not found: {filename}")
            continue

        filepath = matches[0]
        print(f"Fixing: {filename}")

        try:
            if fix_lesson_checkpoints(filepath):
                fixed_count += 1
                print(f"   ✅ Fixed successfully")
            else:
                print(f"   ⚠️  No changes needed or skipped")
        except Exception as e:
            print(f"   ❌ ERROR: {e}")

    print(f"\n{'='*80}")
    print(f"COMPLETE: Fixed {fixed_count} out of {len(problematic_files)} lessons")
    print(f"{'='*80}\n")

if __name__ == '__main__':
    main()
