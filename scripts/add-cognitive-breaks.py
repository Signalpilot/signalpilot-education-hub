#!/usr/bin/env python3
"""
Add cognitive breaks/checkpoints to lessons at 5-minute intervals.
Inserts checkpoints after major h2 sections based on word count.
"""

import os
import re
from pathlib import Path

# Cognitive checkpoint templates
CHECKPOINT_5MIN = '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🔴 CHECKPOINT (5 minutes)</h4>
        <p>You now understand {concept}.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Take a 30-second breath before continuing...</p>
      </div>'''

CHECKPOINT_10MIN = '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🟡 CHECKPOINT (10 minutes)</h4>
        <p>You're now at the halfway point. You've learned {concept}.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Great progress! Take a quick stretch break...</p>
      </div>'''

CHECKPOINT_15MIN = '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🟢 CHECKPOINT (15 minutes)</h4>
        <p>Almost done! You've mastered {concept}.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Final stretch - you're doing great...</p>
      </div>'''

def count_words_in_section(text):
    """Count words in a text section"""
    # Remove HTML tags
    text_clean = re.sub(r'<[^>]+>', '', text)
    # Count words
    words = len(text_clean.split())
    return words

def extract_h2_sections(content):
    """Extract h2 sections and their positions"""
    # Find all h2 tags and their positions
    h2_pattern = r'<h2[^>]*>(.*?)</h2>'
    sections = []

    for match in re.finditer(h2_pattern, content, re.DOTALL):
        title = re.sub(r'<[^>]+>', '', match.group(1))  # Clean HTML tags
        title = re.sub(r'id="[^"]*"', '', title).strip()
        sections.append({
            'title': title,
            'start': match.end(),
            'match': match
        })

    return sections

def calculate_checkpoint_positions(content):
    """Calculate where to insert checkpoints based on word count"""
    # Assume 200 words/minute reading speed
    # 5 min = ~1000 words, 10 min = ~2000 words, 15 min = ~3000 words

    sections = extract_h2_sections(content)
    if not sections:
        return [], []

    # Calculate cumulative word counts
    total_words = 0
    section_cumulative = []

    prose_match = re.search(r'<div class="prose">(.*?)(?:</div>\s*</div>\s*<div class="wrap nav-article"|</div>\s*</div>\s*<aside|$)', content, re.DOTALL)
    if not prose_match:
        return [], []

    prose_content = prose_match.group(1)

    for i, section in enumerate(sections):
        if i < len(sections) - 1:
            section_text = prose_content[section['start'] - prose_match.start():sections[i+1]['start'] - prose_match.start()]
        else:
            section_text = prose_content[section['start'] - prose_match.start():]

        words = count_words_in_section(section_text)
        total_words += words
        section_cumulative.append({
            'section_idx': i,
            'cumulative_words': total_words,
            'title': section['title']
        })

    # Determine which sections to place checkpoints after
    checkpoints = []

    # 5-minute checkpoint (~1000 words)
    for item in section_cumulative:
        if item['cumulative_words'] >= 1000 and not any(cp['type'] == '5min' for cp in checkpoints):
            checkpoints.append({
                'type': '5min',
                'section_idx': item['section_idx'],
                'concept': item['title']
            })

    # 10-minute checkpoint (~2000 words)
    for item in section_cumulative:
        if item['cumulative_words'] >= 2000 and not any(cp['type'] == '10min' for cp in checkpoints):
            checkpoints.append({
                'type': '10min',
                'section_idx': item['section_idx'],
                'concept': item['title']
            })

    # 15-minute checkpoint (~3000 words)
    for item in section_cumulative:
        if item['cumulative_words'] >= 3000 and not any(cp['type'] == '15min' for cp in checkpoints):
            checkpoints.append({
                'type': '15min',
                'section_idx': item['section_idx'],
                'concept': item['title']
            })

    return checkpoints, sections

def add_cognitive_checkpoints(content):
    """Add cognitive checkpoints at strategic intervals"""

    # Check if checkpoints already exist
    if 'CHECKPOINT' in content and '🔴' in content:
        return None, "Already has checkpoints"

    checkpoints, sections = calculate_checkpoint_positions(content)

    if not checkpoints:
        return None, "Could not calculate checkpoint positions"

    # Insert checkpoints in reverse order (to preserve positions)
    new_content = content
    for cp in reversed(checkpoints):
        section_idx = cp['section_idx']
        if section_idx >= len(sections):
            continue

        # Find the end of this section's first paragraph or callout
        section_start = sections[section_idx]['start']

        # Find next h2, h3, or end of prose
        next_break = re.search(r'(<h[23][^>]*>|<div class="section-break">)', new_content[section_start:])

        if next_break:
            insert_pos = section_start + next_break.start()
        else:
            continue

        # Choose template
        if cp['type'] == '5min':
            template = CHECKPOINT_5MIN.format(concept=f"the core concepts")
        elif cp['type'] == '10min':
            template = CHECKPOINT_10MIN.format(concept=f"the key strategies")
        else:  # 15min
            template = CHECKPOINT_15MIN.format(concept=f"the complete framework")

        # Insert checkpoint
        new_content = new_content[:insert_pos] + template + '\n\n' + new_content[insert_pos:]

    return new_content, f"Added {len(checkpoints)} checkpoints"

def process_lesson_file(filepath):
    """Process a single lesson file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content, message = add_cognitive_checkpoints(content)

        if new_content is None:
            return False, message

        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True, message

    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    """Main function"""
    curriculum_dir = Path('curriculum')

    if not curriculum_dir.exists():
        print("❌ curriculum directory not found")
        return

    lesson_files = list(curriculum_dir.rglob('*.html'))
    print(f"Found {len(lesson_files)} lesson files\n")

    success_count = 0
    skip_count = 0
    error_count = 0

    for lesson_file in sorted(lesson_files):
        relative_path = lesson_file.relative_to(curriculum_dir)
        success, message = process_lesson_file(lesson_file)

        if success:
            print(f"✅ {relative_path}: {message}")
            success_count += 1
        elif "Already has" in message:
            print(f"⏭️  {relative_path}: {message}")
            skip_count += 1
        else:
            print(f"❌ {relative_path}: {message}")
            error_count += 1

    print(f"\n{'='*60}")
    print(f"✅ Added checkpoints: {success_count}")
    print(f"⏭️  Skipped: {skip_count}")
    print(f"❌ Errors: {error_count}")
    print(f"📊 Total processed: {len(lesson_files)}")

if __name__ == '__main__':
    main()
