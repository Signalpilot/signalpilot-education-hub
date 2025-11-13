#!/usr/bin/env python3
"""
Fix div tag balance issues in all HTML files.
Surgically removes extra closing divs or adds missing ones.
"""

import re
from pathlib import Path

def fix_div_balance(file_path):
    """Fix div tag balance issues"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Count total opens and closes (excluding comments)
    content_no_comments = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
    total_opens = len(re.findall(r'<div', content_no_comments))
    total_closes = len(re.findall(r'</div>', content_no_comments))
    diff = total_opens - total_closes

    if diff == 0:
        return None  # Already balanced

    if diff < 0:
        # Too many closing divs
        # Find the location right before </article> and remove extra closing divs
        # Look for pattern like: </div>\n</div>\n</article>
        num_to_remove = abs(diff)

        # Find </article> tag
        article_close_pos = content.rfind('</article>')
        if article_close_pos == -1:
            return None

        # Work backwards from </article> and remove closing divs
        section_before = content[:article_close_pos]
        section_after = content[article_close_pos:]

        # Remove the last N closing divs before </article>
        for _ in range(num_to_remove):
            # Find the last </div> before article close
            last_div_close = section_before.rfind('</div>')
            if last_div_close != -1:
                # Remove this closing div and any whitespace before it
                before_div = section_before[:last_div_close].rstrip()
                after_div = section_before[last_div_close + 6:]  # len('</div>') = 6
                section_before = before_div + after_div.lstrip('\n')

        content = section_before + '\n' + section_after
        return content

    elif diff > 0:
        # Missing closing divs - add them before </article>
        article_close_match = re.search(r'</article>', content)
        if article_close_match:
            pos = article_close_match.start()
            # Add the missing closing divs with proper indentation
            extra_closes = '  </div>\n' * diff
            content = content[:pos] + extra_closes + content[pos:]
            return content

    return None

def process_all_files():
    """Process all lesson HTML files"""
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')
    levels = ['beginner', 'intermediate', 'advanced', 'professional']

    total_fixed = 0
    total_files = 0

    for level in levels:
        level_dir = curriculum_dir / level
        if not level_dir.exists():
            continue

        print(f"\n📁 Processing {level}/")

        for html_file in sorted(level_dir.glob('*.html')):
            total_files += 1

            # Check if file needs fixing
            with open(html_file, 'r') as f:
                content = f.read()
                content_no_comments = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
                opens = len(re.findall(r'<div', content_no_comments))
                closes = len(re.findall(r'</div>', content_no_comments))

            if opens == closes:
                print(f"  ✅ {html_file.name}: Already balanced")
                continue

            # Try to fix
            fixed_content = fix_div_balance(html_file)

            if fixed_content:
                # Verify the fix
                content_no_comments = re.sub(r'<!--.*?-->', '', fixed_content, flags=re.DOTALL)
                new_opens = len(re.findall(r'<div', content_no_comments))
                new_closes = len(re.findall(r'</div>', content_no_comments))

                if new_opens == new_closes:
                    # Write the fixed content
                    with open(html_file, 'w', encoding='utf-8') as f:
                        f.write(fixed_content)

                    total_fixed += 1
                    print(f"  🔧 {html_file.name}: Fixed ({opens} opens, {closes} closes) → ({new_opens} opens, {new_closes} closes)")
                else:
                    print(f"  ⚠️  {html_file.name}: Fix failed, still unbalanced")
            else:
                print(f"  ⚠️  {html_file.name}: Could not fix ({opens} opens, {closes} closes)")

    print(f"\n{'='*70}")
    print(f"✨ SUMMARY")
    print(f"{'='*70}")
    print(f"Total files processed: {total_files}")
    print(f"Files fixed: {total_fixed}")
    print(f"{'='*70}\n")

if __name__ == '__main__':
    print("🚀 Starting div balance fix...\n")
    process_all_files()
    print("✅ Div balance fix complete!")
