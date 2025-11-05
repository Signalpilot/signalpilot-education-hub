#!/usr/bin/env python3
"""
Add prerequisite warnings to intermediate, advanced, and professional lessons.
Uses curriculum index to determine which foundational lessons are required.
"""

import os
import json
import re
from pathlib import Path

def load_lessons_index():
    """Load lessons metadata"""
    with open('curriculum/index.json', 'r', encoding='utf-8') as f:
        return {lesson['id']: lesson for lesson in json.load(f)}

def get_prerequisite_lessons(lesson_id, lessons_index):
    """Determine prerequisite lessons based on tier"""
    lesson = lessons_index.get(lesson_id)
    if not lesson:
        return []

    level = lesson.get('level', '')
    order = lesson.get('order', 0)

    prerequisites = []

    # Intermediate lessons: require Beginner 1-3
    if 'Intermediate' in level:
        prerequisites = [
            ('beginner-01', 'The Liquidity Lie', 'Understand institutional liquidity engineering'),
            ('beginner-02', 'Volume Doesn\'t Lie', 'Master delta analysis and absorption patterns'),
            ('beginner-03', 'Price Action is Dead', 'Learn order flow and tape reading basics')
        ]

    # Advanced lessons: require Beginner 1-3 + Intermediate 21-24
    elif 'Advanced' in level:
        prerequisites = [
            ('beginner-01', 'The Liquidity Lie', 'Institutional liquidity concepts'),
            ('beginner-02', 'Volume Doesn\'t Lie', 'Delta and volume analysis'),
            ('intermediate-21', 'Bid-Ask Spread Dynamics', 'Market microstructure fundamentals'),
            ('intermediate-22', 'Order Book Analysis', 'Level 2 reading and depth analysis')
        ]

    # Professional lessons: require Advanced foundation
    elif 'Professional' in level:
        prerequisites = [
            ('beginner-01', 'The Liquidity Lie', 'Core institutional concepts'),
            ('intermediate-21', 'Bid-Ask Spread Dynamics', 'Market microstructure'),
            ('advanced-48', 'Institutional Order Flow', 'Professional order flow reading'),
            ('advanced-54', 'System Development', 'Strategy design methodology')
        ]

    return prerequisites

def create_prerequisite_html(prerequisites, lessons_index):
    """Create prerequisite warning HTML"""
    if not prerequisites:
        return None

    prereq_items = ""
    for prereq_id, title, reason in prerequisites:
        lesson = lessons_index.get(prereq_id)
        if lesson:
            href = lesson.get('href', '')
            prereq_items += f'''            <li><a href="{href}" style="color:#00d4aa;text-decoration:underline">Lesson {prereq_id.split('-')[1]}: {title}</a> — {reason}</li>
'''

    html = f'''
      <!-- Prerequisites Warning -->
      <div class="callout-warning" style="margin:2rem 0;background:rgba(255,193,7,0.1);border-left:4px solid #ffc107">
        <h4>📋 Prerequisites</h4>
        <p>This lesson builds on concepts from:</p>
        <ul style="margin:0.5rem 0 0.75rem 1.5rem;line-height:1.8">
{prereq_items}        </ul>
        <p style="margin-top:0.75rem">✅ If you've completed these, you're ready. Otherwise, start with the foundational lessons first.</p>
      </div>
'''

    return html

def add_prerequisite_warning(content, lesson_id, lessons_index):
    """Add prerequisite warning to lesson"""

    # Check if already has prerequisite warning
    if 'Prerequisites' in content and '📋' in content:
        return None, "Already has prerequisite warning"

    # Get prerequisites for this lesson
    prerequisites = get_prerequisite_lessons(lesson_id, lessons_index)

    if not prerequisites:
        return None, "No prerequisites needed (Beginner tier)"

    # Create HTML
    prereq_html = create_prerequisite_html(prerequisites, lessons_index)

    if not prereq_html:
        return None, "Could not create prerequisite HTML"

    # Find insertion point: after TL;DR or after first paragraph
    patterns = [
        (r'(</details>\s*\n)', 'after_tldr'),  # After TL;DR
        (r'(<p><b>.*?</b>.*?</p>)', 'after_intro')  # After intro paragraph
    ]

    for pattern, location in patterns:
        match = re.search(pattern, content, re.DOTALL)
        if match:
            insert_pos = match.end()
            new_content = content[:insert_pos] + prereq_html + '\n' + content[insert_pos:]
            return new_content, f"Added prerequisites ({len(prerequisites)} lessons)"

    return None, "Could not find insertion point"

def extract_lesson_id_from_path(filepath):
    """Extract lesson ID from file path"""
    filename = filepath.stem
    parent = filepath.parent.name

    match = re.match(r'(\d+)-', filename)
    if match:
        lesson_num = match.group(1)
        return f"{parent}-{lesson_num}"

    return None

def process_lesson_file(filepath, lessons_index):
    """Process a single lesson file"""
    try:
        lesson_id = extract_lesson_id_from_path(filepath)
        if not lesson_id:
            return False, "Could not extract lesson ID"

        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content, message = add_prerequisite_warning(content, lesson_id, lessons_index)

        if new_content is None:
            return False, message

        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True, message

    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    """Main function"""

    # Load index
    print("Loading lessons index...")
    lessons_index = load_lessons_index()
    print(f"Loaded {len(lessons_index)} lessons\n")

    # Find all lesson files
    curriculum_dir = Path('curriculum')

    # Only process intermediate, advanced, professional tiers
    tier_dirs = [
        'intermediate',
        'intermediate-bridge',
        'advanced',
        'advanced-mastery',
        'professional-capstone'
    ]

    lesson_files = []
    for tier in tier_dirs:
        tier_path = curriculum_dir / tier
        if tier_path.exists():
            lesson_files.extend(tier_path.glob('*.html'))

    print(f"Found {len(lesson_files)} intermediate+ lessons\n")

    success_count = 0
    skip_count = 0
    error_count = 0

    for lesson_file in sorted(lesson_files):
        relative_path = lesson_file.relative_to(curriculum_dir)
        success, message = process_lesson_file(lesson_file, lessons_index)

        if success:
            print(f"✅ {relative_path}: {message}")
            success_count += 1
        elif "Already has" in message or "No prerequisites" in message:
            print(f"⏭️  {relative_path}: {message}")
            skip_count += 1
        else:
            print(f"❌ {relative_path}: {message}")
            error_count += 1

    print(f"\n{'='*60}")
    print(f"✅ Added prerequisites: {success_count}")
    print(f"⏭️  Skipped: {skip_count}")
    print(f"❌ Errors: {error_count}")
    print(f"📊 Total processed: {len(lesson_files)}")

if __name__ == '__main__':
    main()
