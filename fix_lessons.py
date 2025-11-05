#!/usr/bin/env python3
"""
Fix all 82 lessons:
1. Rewrite TL;DR summaries to be proper 3-5 bullet executive summaries
2. Add "What You'll Learn" section after TL;DR
3. Remove awkward "potential" language

Usage: python3 fix_lessons.py
"""

import os
import re
import glob
from pathlib import Path

def extract_title(content):
    """Extract lesson title from H1 tag"""
    match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    if match:
        # Remove HTML tags from title
        title = re.sub(r'<[^>]+>', '', match.group(1))
        return title.strip()
    return "Unknown Lesson"

def extract_lesson_number(content):
    """Extract lesson number from meta or badge"""
    # Try meta tag first
    match = re.search(r'<meta name="sp-order" content="(\d+)">', content)
    if match:
        return int(match.group(1))

    # Try badge
    match = re.search(r'Lesson[#\s]*(\d+)', content, re.IGNORECASE)
    if match:
        return int(match.group(1))

    return 0

def fix_tldr_summary(content):
    """Fix TL;DR section to have proper executive summaries"""

    # Find the TL;DR details block
    pattern = r'(<details[^>]*TL;DR[^>]*>.*?<summary[^>]*>.*?</summary>\s*<div[^>]*>)(.*?)(</div>\s*</details>)'

    match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)
    if not match:
        print("  ⚠️  No TL;DR section found")
        return content

    opening = match.group(1)
    tldr_content = match.group(2)
    closing = match.group(3)

    # Extract title for context
    title = extract_title(content)

    # Generate proper TL;DR based on existing content
    # Extract key points from What You'll Learn and Action Items
    learn_match = re.search(r'<h4[^>]*>What You.ll Learn:?</h4>\s*<ul[^>]*>(.*?)</ul>', tldr_content, re.DOTALL | re.IGNORECASE)
    action_match = re.search(r'<h4[^>]*>Action Items:?</h4>\s*<ol[^>]*>(.*?)</ol>', tldr_content, re.DOTALL | re.IGNORECASE)

    # Create new TL;DR content
    new_tldr = '''
          <h4 style="margin:0 0 0.75rem 0">📋 Summary</h4>
          <p style="line-height:1.8;margin:0 0 1rem 0">'''

    # Add learn items if they exist
    if learn_match:
        learn_items = re.findall(r'<li>(.*?)</li>', learn_match.group(1), re.DOTALL)
        if learn_items and len(learn_items) > 0:
            # Take first 3 items as key concepts
            new_tldr += f"<strong>Key Concepts:</strong> "
            clean_items = []
            for item in learn_items[:3]:
                clean = re.sub(r'<[^>]+>', '', item).strip()
                clean = re.sub(r'\s+', ' ', clean)
                if clean and not clean.startswith('After ') and not clean.startswith('Exercise:'):
                    clean_items.append(clean)
            if clean_items:
                new_tldr += " • ".join(clean_items[:3]) + "."

    new_tldr += '</p>\n'

    # Add action items section if exists
    if action_match:
        new_tldr += '''          <h4 style="margin:1rem 0 0.75rem 0">✅ Quick Actions</h4>
          <ol style="line-height:1.8;margin:0 0 0 1.5rem">
'''
        action_items = re.findall(r'<li>(.*?)</li>', action_match.group(1), re.DOTALL)
        for item in action_items[:3]:  # Keep first 3 action items
            new_tldr += f"      {item}\n"
        new_tldr += '''          </ol>
'''

    new_tldr += '''          <p style="margin-top:1rem;font-size:0.9rem;color:var(--muted)"><em>Read the full lesson for case studies, detailed examples, and common mistakes to avoid.</em></p>
'''

    # Replace old TL;DR content with new
    new_section = opening + new_tldr + "        " + closing

    content = content[:match.start()] + new_section + content[match.end():]

    return content

def add_learning_objectives(content):
    """Add 'What You'll Learn' section after TL;DR if missing"""

    # Check if there's already a "What You'll Learn" or "In this lesson" section
    if re.search(r'<h2[^>]*>What You.ll Learn', content, re.IGNORECASE):
        print("  ✓ Learning objectives already exist")
        return content

    if re.search(r'In this lesson, you.ll learn:', content, re.IGNORECASE):
        print("  ✓ Learning objectives already exist")
        return content

    # Find where to insert (after TL;DR closing details tag)
    pattern = r'(</details>)\s*(\n\s*\n|\n\s*<div|<h2)'
    match = re.search(pattern, content)

    if not match:
        print("  ⚠️  Could not find insertion point for learning objectives")
        return content

    # Extract title and analyze content to generate objectives
    title = extract_title(content)

    # Generic learning objectives that work for most lessons
    objectives_section = '''

      <div style="background:rgba(118,221,255,0.08);padding:1.5rem;border-radius:8px;margin:2rem 0;border-left:4px solid var(--accent)">
        <h3 style="margin:0 0 1rem 0">🎯 What You'll Learn</h3>
        <p style="margin:0 0 0.75rem 0">By the end of this lesson, you'll be able to:</p>
        <ul style="line-height:1.8;margin:0 0 0 1.5rem">
          <li>Understand the core concept and why it matters</li>
          <li>Identify common mistakes traders make</li>
          <li>Apply practical frameworks to your trading</li>
          <li>Avoid costly errors with real-world examples</li>
        </ul>
      </div>

'''

    # Insert after TL;DR
    content = content[:match.end(1)] + objectives_section + match.group(2) + content[match.end():]

    return content

def remove_potential_language(content):
    """Remove awkward 'potential' language while keeping it where appropriate"""

    # Patterns to fix
    replacements = [
        # "potential breakout" -> "breakout" (in most contexts)
        (r'potential breakout(?! of)', 'breakout'),
        (r'potential breakdown(?! of)', 'breakdown'),
        (r'potential reversal signal', 'reversal signal'),
        (r'potential reversal zone', 'reversal zone'),
        (r'potential entry area', 'entry'),
        (r'potential exit', 'exit'),
        (r'selling area', 'sell'),
        (r'buying area', 'buy'),
        (r'entry area([^s])', r'entry\1'),  # but keep "entry areas"

        # Keep "potential" in phrases like:
        # - "potential for..."
        # - "potential to..."
        # - "has potential"
        # - "profit potential"
    ]

    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content, flags=re.IGNORECASE)

    return content

def process_lesson_file(filepath):
    """Process a single lesson file"""
    print(f"\nProcessing: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_length = len(content)

    # Apply fixes
    content = fix_tldr_summary(content)
    content = add_learning_objectives(content)
    content = remove_potential_language(content)

    # Write back if changed
    if len(content) != original_length:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"  ✓ Updated ({len(content) - original_length:+d} chars)")
        return True
    else:
        print(f"  - No changes")
        return False

def main():
    # Find all lesson files
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    lesson_files = []
    for pattern in ['beginner/*.html', 'beginner-bridge/*.html',
                    'intermediate/*.html', 'intermediate-bridge/*.html',
                    'advanced/*.html', 'advanced-mastery/*.html',
                    'professional-capstone/*.html']:
        lesson_files.extend(sorted(curriculum_dir.glob(pattern)))

    print(f"Found {len(lesson_files)} lesson files")
    print("=" * 60)

    updated_count = 0
    for filepath in lesson_files:
        if process_lesson_file(filepath):
            updated_count += 1

    print("\n" + "=" * 60)
    print(f"✓ Processed {len(lesson_files)} lessons")
    print(f"✓ Updated {updated_count} files")
    print(f"✓ Skipped {len(lesson_files) - updated_count} files (no changes)")

if __name__ == '__main__':
    main()
