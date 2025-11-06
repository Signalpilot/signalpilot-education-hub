#!/usr/bin/env python3
"""
Fix header structure in lessons that are missing the proper wrapper.

BROKEN pattern:
<article class="article">
  <div style="...">badges</div>
  <h1>Title</h1>
  <p><b>description</b></p>
  <div class="article-progress">...</div>
  [content starts]

CORRECT pattern (like lessons 1-10):
<article class="article">
  <header>
    <div class="wrap">
      [breadcrumbs or badges]
      <h1>Title</h1>
      <p><b>description</b></p>
      <div class="article-progress">...</div>
    </div>
  </header>

  <div class="wrap article-grid">
    <div class="prose">
      [content starts]
"""

import re
import glob

BROKEN_LESSONS = [
    44, 46, 47, 64, 65, 66, 67, 69, 70, 71, 72, 73, 74, 76, 77, 79, 80, 81, 82
]

def fix_lesson(filepath):
    """Fix the header structure in a lesson file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the <article class="article"> tag
    article_match = re.search(r'<article class="article">', content)
    if not article_match:
        print(f"  ⚠️  No <article> tag found")
        return False

    article_pos = article_match.end()

    # Check if already has <header> right after
    next_chunk = content[article_pos:article_pos+100]
    if '<header>' in next_chunk:
        print(f"  ✓ Already has correct structure")
        return False

    # Find the content between <article> and where prose content should start
    # This includes: badges/breadcrumbs, h1, description, article-progress

    # Find where the TL;DR section starts (this marks beginning of prose content)
    tldr_match = re.search(r'<!-- TL;DR Skimmer Summary -->', content[article_pos:])
    if not tldr_match:
        # Try finding other content markers
        tldr_match = re.search(r'<details[^>]*>.*?TL;DR', content[article_pos:], re.DOTALL)

    if not tldr_match:
        print(f"  ⚠️  Could not find TL;DR section")
        return False

    # The header content is everything between <article> and TL;DR
    header_end_pos = article_pos + tldr_match.start()
    header_content = content[article_pos:header_end_pos].strip()

    # Remove leading/trailing whitespace and empty lines
    header_content = '\n'.join(line for line in header_content.split('\n') if line.strip())

    # Build the new structure
    new_header = f"""
  <header>
    <div class="wrap">
{header_content}
    </div>
  </header>

  <div class="wrap article-grid">
    <div class="prose">
"""

    # Construct new content
    new_content = (
        content[:article_pos] +
        new_header +
        content[header_end_pos:]
    )

    # Find where </article> is and ensure prose and article-grid divs are closed before it
    # Look for the closing </article> tag
    closing_article = new_content.rfind('</article>')
    if closing_article > 0:
        # Find the navigation section before </article>
        nav_match = re.search(r'<div class="wrap nav-article">', new_content[:closing_article])
        if nav_match:
            # Insert closing divs before the nav section
            insert_pos = nav_match.start()
            # Check if closing divs already exist
            before_nav = new_content[insert_pos-200:insert_pos]
            if '</div>' not in before_nav[-50:]:
                new_content = (
                    new_content[:insert_pos] +
                    "\n    </div>\n\n" +  # Close .prose
                    new_content[insert_pos:]
                )

    # Write the fixed content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    return True


def main():
    print("=" * 70)
    print("FIXING REMAINING 19 LESSONS WITH BROKEN HEADER STRUCTURE")
    print("=" * 70)

    fixed_count = 0

    for lesson_num in BROKEN_LESSONS:
        # Find the file
        pattern = f"curriculum/**/{lesson_num:02d}-*.html"
        files = glob.glob(pattern, recursive=True)

        if not files:
            # Try without leading zero
            pattern = f"curriculum/**/{lesson_num}-*.html"
            files = glob.glob(pattern, recursive=True)

        if not files:
            print(f"\n❌ Lesson {lesson_num}: File not found")
            continue

        filepath = files[0]
        filename = filepath.split('/')[-1]
        print(f"\n📝 Lesson {lesson_num}: {filename}")

        if fix_lesson(filepath):
            print(f"  ✅ FIXED")
            fixed_count += 1
        else:
            print(f"  ⏭️  Skipped")

    print("\n" + "=" * 70)
    print(f"SUMMARY: Fixed {fixed_count} / {len(BROKEN_LESSONS)} lessons")
    print("=" * 70)


if __name__ == "__main__":
    main()
