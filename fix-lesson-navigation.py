#!/usr/bin/env python3
"""
Fix navigation buttons across all lessons to ensure proper Previous/Next links.
"""

import re
import os

# Map of lesson number to next lesson path
LESSON_NAV = {
    '/home/user/signalpilot-education-hub/curriculum/beginner-bridge/20-swing-trading-framework.html': {
        'next': '/curriculum/intermediate/21-bid-ask-spread-dynamics.html'
    },
    '/home/user/signalpilot-education-hub/curriculum/intermediate/35-professional-operations.html': {
        'next': '/curriculum/intermediate-bridge/36-dark-pool-indicators.html'
    },
    '/home/user/signalpilot-education-hub/curriculum/intermediate-bridge/36-dark-pool-indicators.html': {
        'next': '/curriculum/intermediate-bridge/37-options-order-flow.html'
    },
    '/home/user/signalpilot-education-hub/curriculum/intermediate-bridge/47-portfolio-construction-kelly.html': {
        'next': '/curriculum/advanced/48-institutional-order-flow.html'
    },
    '/home/user/signalpilot-education-hub/curriculum/advanced/62-trading-career-path.html': {
        'next': '/curriculum/advanced-mastery/63-statistical-arbitrage.html'
    },
    '/home/user/signalpilot-education-hub/curriculum/advanced-mastery/74-building-trading-business.html': {
        'next': '/curriculum/professional-capstone/75-real-time-market-analysis.html'
    },
}

def fix_navigation(filepath, next_link):
    """Add or fix navigation to include Next Lesson link."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content

    # Pattern 1: Single "Back to X" button
    pattern1 = r'<a class="btn btn-ghost" href="/">&larr; Back to [^<]+</a>'
    match1 = re.search(pattern1, content)

    if match1:
        # Replace with proper navigation
        old_nav = match1.group(0)

        # Get the previous lesson link if it exists
        # Extract lesson number from filepath
        lesson_num = int(re.search(r'/(\d+)-', filepath).group(1))

        # Determine previous lesson
        if lesson_num == 21:
            prev_link = '/curriculum/beginner-bridge/20-swing-trading-framework.html'
        elif lesson_num == 36:
            prev_link = '/curriculum/intermediate/35-professional-operations.html'
        elif lesson_num == 48:
            prev_link = '/curriculum/intermediate-bridge/47-portfolio-construction-kelly.html'
        elif lesson_num == 63:
            prev_link = '/curriculum/advanced/62-trading-career-path.html'
        elif lesson_num == 75:
            prev_link = '/curriculum/advanced-mastery/74-building-trading-business.html'
        else:
            # For others, try to find the previous lesson in same directory
            dirname = os.path.dirname(filepath)
            prev_num = lesson_num - 1
            prev_file = f"{prev_num:02d}"
            # Find file that starts with prev_num
            import glob
            prev_files = glob.glob(f"{dirname}/{prev_file}-*.html")
            if prev_files:
                prev_link = prev_files[0].replace('/home/user/signalpilot-education-hub', '')
            else:
                prev_link = '/'

        new_nav = f'''<div class="wrap nav-article">
        <a class="btn btn-ghost" href="{prev_link}">&larr; Previous Lesson</a>
        <a class="btn btn-primary" href="{next_link}">Next Lesson &rarr;</a>
      </div>'''

        content = content.replace(old_nav, new_nav)

    # Write back if changes were made
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return True

    return False

def main():
    """Fix navigation across all lessons."""
    fixed = 0

    for filepath, nav in LESSON_NAV.items():
        if 'next' in nav:
            if os.path.exists(filepath):
                if fix_navigation(filepath, nav['next']):
                    rel_path = filepath.replace('/home/user/signalpilot-education-hub/', '')
                    print(f"✅ Fixed: {rel_path}")
                    fixed += 1

    print(f"\n{'='*60}")
    print(f"Fixed navigation in {fixed} lessons")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
