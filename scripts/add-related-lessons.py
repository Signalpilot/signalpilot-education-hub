#!/usr/bin/env python3
"""
Add Related Lessons navigation to all lessons using index.json metadata.
Creates cards linking to related lessons at the bottom of each lesson.
"""

import os
import json
import re
from pathlib import Path

def load_lessons_index():
    """Load lessons metadata from index.json"""
    index_path = Path('curriculum/index.json')
    if not index_path.exists():
        return {}

    with open(index_path, 'r', encoding='utf-8') as f:
        lessons = json.load(f)

    # Create lookup dict by lesson ID
    lookup = {}
    for lesson in lessons:
        lesson_id = lesson.get('id')
        if lesson_id:
            lookup[lesson_id] = lesson

    return lookup

def extract_lesson_id_from_path(filepath):
    """Extract lesson ID from file path"""
    # Example: curriculum/beginner/01-the-liquidity-lie.html → beginner-01
    filename = filepath.stem
    parent = filepath.parent.name

    # Extract lesson number
    match = re.match(r'(\d+)-', filename)
    if match:
        lesson_num = match.group(1)
        return f"{parent}-{lesson_num}"

    return None

def get_level_badge(level):
    """Get badge HTML for lesson level"""
    badges = {
        'Beginner': '🟢 Beginner',
        'Beginner Bridge': '🔵 Beginner Bridge',
        'Intermediate': '🟡 Intermediate',
        'Intermediate Bridge': '🟠 Intermediate Bridge',
        'Advanced': '🔴 Advanced',
        'Advanced Mastery': '🔴 Advanced Mastery',
        'Professional Capstone': '⚫ Professional'
    }
    return badges.get(level, level)

def create_related_lessons_html(current_lesson_id, lessons_index):
    """Create related lessons HTML section"""

    current_lesson = lessons_index.get(current_lesson_id)
    if not current_lesson:
        return None, "Lesson not found in index"

    related_ids = current_lesson.get('relatedArticles', [])
    if not related_ids:
        # If no related articles, suggest next/previous lessons
        order = current_lesson.get('order', 0)
        level = current_lesson.get('level', '')

        # Find lessons in same tier
        same_tier = [l for l in lessons_index.values() if l.get('level') == level]
        same_tier_sorted = sorted(same_tier, key=lambda x: x.get('order', 0))

        # Get prev and next
        related_lessons = []
        for i, lesson in enumerate(same_tier_sorted):
            if lesson.get('id') == current_lesson_id:
                if i > 0:
                    related_lessons.append(same_tier_sorted[i-1])
                if i < len(same_tier_sorted) - 1:
                    related_lessons.append(same_tier_sorted[i+1])
                break

        # Add one from next tier
        if len(related_lessons) < 3:
            next_tier_map = {
                'Beginner': 'Beginner Bridge',
                'Beginner Bridge': 'Intermediate',
                'Intermediate': 'Intermediate Bridge',
                'Intermediate Bridge': 'Advanced',
                'Advanced': 'Advanced Mastery',
                'Advanced Mastery': 'Professional Capstone'
            }
            next_tier = next_tier_map.get(level)
            if next_tier:
                next_tier_lessons = [l for l in lessons_index.values() if l.get('level') == next_tier]
                if next_tier_lessons:
                    next_tier_sorted = sorted(next_tier_lessons, key=lambda x: x.get('order', 0))
                    related_lessons.append(next_tier_sorted[0])

    else:
        # Use defined related articles
        related_lessons = []
        for rel_id in related_ids[:3]:
            lesson = lessons_index.get(rel_id)
            if lesson:
                related_lessons.append(lesson)

    if not related_lessons:
        return None, "No related lessons found"

    # Generate HTML cards
    cards_html = ""
    for lesson in related_lessons[:3]:
        level_badge = get_level_badge(lesson.get('level', ''))
        title = lesson.get('title', '')
        description = lesson.get('description', '')
        href = lesson.get('href', '')
        order = lesson.get('order', '')

        # Truncate description if too long
        if len(description) > 120:
            description = description[:117] + '...'

        cards_html += f'''        <div class="card" style="padding:1rem">
          <span class="badge">{level_badge} #{order}</span>
          <h4 style="margin:.5rem 0 .5rem 0;font-size:1rem">{title}</h4>
          <p style="font-size:.9rem;color:var(--muted);margin-bottom:.75rem">{description}</p>
          <a href="{href}" class="btn btn-sm btn-ghost">Read Lesson &rarr;</a>
        </div>
'''

    html = f'''
      <div class="section-break"><span>Related Lessons</span></div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem;margin:1.5rem 0">
{cards_html}      </div>
'''

    return html, f"Added {len(related_lessons)} related lesson cards"

def add_related_lessons(content, current_lesson_id, lessons_index):
    """Add related lessons section to lesson content"""

    # Check if already has related lessons section
    if 'Related Lessons' in content or 'related-lessons' in content:
        return None, "Already has Related Lessons section"

    # Create related lessons HTML
    related_html, message = create_related_lessons_html(current_lesson_id, lessons_index)

    if related_html is None:
        return None, message

    # Find insertion point: before "Coming Up Next" callout or before nav-article or before footer
    patterns = [
        (r'(<div class="callout-info">\s*<h4>⏭️ Coming Up Next</h4>)', 'before'),  # Before "Coming Up Next"
        (r'(</div>\s*<aside class="toc")', 'before'),  # Before TOC sidebar
        (r'(<div class="wrap nav-article">)', 'before'),  # Before bottom navigation
        (r'(<blockquote><strong>Educational only\.</strong>)', 'before'),  # Before disclaimer
    ]

    for pattern, position in patterns:
        match = re.search(pattern, content)
        if match:
            insert_pos = match.start() if position == 'before' else match.end()
            new_content = content[:insert_pos] + related_html + '\n' + content[insert_pos:]
            return new_content, message

    return None, "Could not find insertion point"

def process_lesson_file(filepath, lessons_index):
    """Process a single lesson file"""
    try:
        # Extract lesson ID from path
        lesson_id = extract_lesson_id_from_path(filepath)
        if not lesson_id:
            return False, "Could not extract lesson ID from path"

        # Read content
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Add related lessons
        new_content, message = add_related_lessons(content, lesson_id, lessons_index)

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

    # Load lessons index
    print("Loading lessons index...")
    lessons_index = load_lessons_index()
    print(f"Loaded {len(lessons_index)} lessons from index.json\n")

    if not lessons_index:
        print("❌ Could not load lessons index")
        return

    # Find all lesson files
    curriculum_dir = Path('curriculum')
    lesson_files = list(curriculum_dir.rglob('*.html'))
    print(f"Found {len(lesson_files)} lesson files\n")

    success_count = 0
    skip_count = 0
    error_count = 0

    for lesson_file in sorted(lesson_files):
        relative_path = lesson_file.relative_to(curriculum_dir)
        success, message = process_lesson_file(lesson_file, lessons_index)

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
    print(f"✅ Added Related Lessons: {success_count}")
    print(f"⏭️  Skipped: {skip_count}")
    print(f"❌ Errors: {error_count}")
    print(f"📊 Total processed: {len(lesson_files)}")

if __name__ == '__main__':
    main()
