#!/usr/bin/env python3
"""
Add article progress indicator to all lessons missing it.
Inserts the progress bar after the meta div in the header section.
"""

import os
import re
from pathlib import Path

# Article progress HTML component
ARTICLE_PROGRESS_HTML = '''
      <!-- Article Progress Indicator -->
      <div class="article-progress" style="--progress:0%">
        <div class="progress-circle"><span>0%</span></div>
        <div class="progress-text">
          <strong>You're making progress!</strong>
          <div style="font-size:.85rem;color:var(--muted)">Keep reading to mark this lesson complete</div>
        </div>
      </div>'''

def has_article_progress(content):
    """Check if file already has article-progress component"""
    return 'article-progress' in content

def add_article_progress(content):
    """Add article progress indicator after meta div or after h1 + description"""

    # Try Pattern 1: <div class="meta">...</div>
    pattern1 = r'(<div class="meta">.*?</div>)'
    if re.search(pattern1, content, re.DOTALL):
        replacement = r'\1' + ARTICLE_PROGRESS_HTML
        new_content = re.sub(pattern1, replacement, content, count=1, flags=re.DOTALL)
        return new_content

    # Try Pattern 2: After <h1>...</h1> and description paragraph
    # This pattern captures: <h1>...</h1>\n\n  <p><b>...</p>
    pattern2 = r'(<h1>.*?</h1>\s*\n\s*<p><b>.*?</p>)'
    if re.search(pattern2, content, re.DOTALL):
        replacement = r'\1' + ARTICLE_PROGRESS_HTML
        new_content = re.sub(pattern2, replacement, content, count=1, flags=re.DOTALL)
        return new_content

    # Try Pattern 3: Just after <h1>...</h1> if no description found
    pattern3 = r'(<h1>.*?</h1>)'
    if re.search(pattern3, content, re.DOTALL):
        replacement = r'\1' + ARTICLE_PROGRESS_HTML
        new_content = re.sub(pattern3, replacement, content, count=1, flags=re.DOTALL)
        return new_content

    print("  ⚠️  Could not find insertion point")
    return None

def process_lesson_file(filepath):
    """Process a single lesson file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Skip if already has article-progress
        if has_article_progress(content):
            return False, "Already has article-progress"

        # Add article progress
        new_content = add_article_progress(content)

        if new_content is None:
            return False, "Could not find insertion point"

        # Write back
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)

        return True, "Added article-progress"

    except Exception as e:
        return False, f"Error: {str(e)}"

def main():
    """Main function to process all lesson files"""
    curriculum_dir = Path('curriculum')

    if not curriculum_dir.exists():
        print("❌ curriculum directory not found")
        return

    # Find all HTML lesson files
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
    print(f"✅ Added article-progress: {success_count}")
    print(f"⏭️  Skipped (already had it): {skip_count}")
    print(f"❌ Errors: {error_count}")
    print(f"📊 Total processed: {len(lesson_files)}")

if __name__ == '__main__':
    main()
