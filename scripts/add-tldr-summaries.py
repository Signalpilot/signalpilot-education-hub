#!/usr/bin/env python3
"""
Add TL;DR skimmer summaries to all lessons.
Extracts key insights and creates a 3-minute summary at the top of each lesson.
"""

import os
import re
from pathlib import Path

def extract_title(content):
    """Extract lesson title from h1 tag"""
    match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    if match:
        title = re.sub(r'<[^>]+>', '', match.group(1))
        return title.strip()
    return "this lesson"

def extract_key_insights(content):
    """Extract key insights from callout boxes and section titles"""
    insights = []

    # Extract from callout-key boxes
    key_callouts = re.findall(r'<div class="callout-key">(.*?)</div>', content, re.DOTALL)
    for callout in key_callouts[:3]:  # Max 3
        # Get first meaningful paragraph
        paras = re.findall(r'<p[^>]*>(.*?)</p>', callout, re.DOTALL)
        for para in paras:
            text = re.sub(r'<[^>]+>', '', para).strip()
            if text and len(text) > 20 and not text.startswith('—'):
                insights.append(text[:150])
                break

    # Extract from key takeaway boxes if present
    takeaway_match = re.search(r'<div class="key-takeaway">(.*?)</div>', content, re.DOTALL)
    if takeaway_match and len(insights) < 3:
        lis = re.findall(r'<li>(.*?)</li>', takeaway_match.group(1), re.DOTALL)
        for li in lis[:3]:
            text = re.sub(r'<[^>]+>', '', li).strip()
            if text:
                insights.append(text[:150])

    # If still not enough, extract from first h2 section summary
    if len(insights) < 2:
        h2_match = re.search(r'<h2[^>]*>.*?</h2>(.*?)<h[23]', content, re.DOTALL)
        if h2_match:
            paras = re.findall(r'<p[^>]*>(.*?)</p>', h2_match.group(1), re.DOTALL)
            for para in paras[:2]:
                text = re.sub(r'<[^>]+>', '', para).strip()
                if text and len(text) > 30:
                    insights.append(text[:150])
                    if len(insights) >= 3:
                        break

    return insights[:4]  # Max 4 insights

def extract_action_items(content):
    """Extract action items from practice exercises or strategy sections"""
    actions = []

    # Look for practice exercise section
    practice_match = re.search(r'<div class="section-break">.*?Practice Exercise.*?</div>(.*?)(?:<div class="section-break">|<h2)', content, re.DOTALL)
    if practice_match:
        lis = re.findall(r'<li>(.*?)</li>', practice_match.group(1), re.DOTALL)
        for li in lis[:3]:
            text = re.sub(r'<[^>]+>', '', li).strip()
            if text and len(text) > 10:
                actions.append(text[:120])

    # Look for "Old Way vs New Way" or strategy sections
    if len(actions) < 2:
        strategy_matches = re.findall(r'<h4[^>]*>.*?(?:Step|Strategy|Framework).*?</h4>(.*?)</(?:div|h[234])', content, re.DOTALL | re.IGNORECASE)
        for match in strategy_matches[:2]:
            lis = re.findall(r'<li>(.*?)</li>', match, re.DOTALL)
            for li in lis[:2]:
                text = re.sub(r'<[^>]+>', '', li).strip()
                if text:
                    actions.append(text[:120])
                    if len(actions) >= 3:
                        break

    # Fallback: extract from numbered lists
    if len(actions) < 2:
        ol_matches = re.findall(r'<ol[^>]*>(.*?)</ol>', content, re.DOTALL)
        for ol in ol_matches[:1]:
            lis = re.findall(r'<li>(.*?)</li>', ol, re.DOTALL)
            for li in lis[:3]:
                text = re.sub(r'<[^>]+>', '', li).strip()
                if text and len(text) > 15:
                    # Remove any nested tags
                    text = re.sub(r'<strong>(.*?)</strong>', r'\1', text)
                    actions.append(text[:120])
                    if len(actions) >= 3:
                        break

    return actions[:3]  # Max 3 actions

def create_tldr_html(title, insights, actions):
    """Create TL;DR HTML component"""

    # Prepare insights HTML
    insights_html = ""
    for insight in insights[:4]:
        # Clean up text
        clean_text = insight.strip()
        if clean_text:
            insights_html += f"      <li>{clean_text}</li>\n"

    # Prepare actions HTML
    actions_html = ""
    if actions:
        for action in actions[:3]:
            clean_text = action.strip()
            if clean_text:
                actions_html += f"      <li>{clean_text}</li>\n"

    # If no actions, create generic ones
    if not actions_html:
        actions_html = f'''      <li>Read the full lesson for detailed case studies</li>
      <li>Review the common mistakes section</li>
      <li>Complete the practice exercise</li>
'''

    tldr_html = f'''
      <!-- TL;DR Skimmer Summary -->
      <details style="background:rgba(0,212,170,0.08);padding:1.5rem;border-radius:8px;margin:2rem 0;border-left:4px solid #00d4aa">
        <summary style="cursor:pointer;font-weight:600;font-size:1.1rem">⚡ TL;DR - 3-Minute Summary (Click to expand)</summary>
        <div style="margin-top:1rem">
          <h4 style="margin:0 0 0.75rem 0">What You'll Learn:</h4>
          <ul style="line-height:1.8;margin:0 0 1rem 1.5rem">
{insights_html}          </ul>
          <h4 style="margin:1rem 0 0.75rem 0">Action Items:</h4>
          <ol style="line-height:1.8;margin:0 0 0 1.5rem">
{actions_html}          </ol>
          <p style="margin-top:1rem;font-size:0.9rem;color:var(--muted)"><em>Read the full lesson for case studies, detailed examples, and common mistakes to avoid.</em></p>
        </div>
      </details>
'''

    return tldr_html

def add_tldr_summary(content):
    """Add TL;DR summary at the top of the lesson content"""

    # Check if TL;DR already exists
    if 'TL;DR' in content or 'tl;dr' in content.lower():
        return None, "Already has TL;DR"

    # Extract information
    title = extract_title(content)
    insights = extract_key_insights(content)
    actions = extract_action_items(content)

    if not insights:
        return None, "Could not extract key insights"

    # Create TL;DR HTML
    tldr_html = create_tldr_html(title, insights, actions)

    # Find insertion point: after article-progress or after first h2
    # Try after article-progress first
    pattern1 = r'(</div>\s*</div>\s*</header>\s*\n\s*<div class="wrap article-grid">\s*<div class="prose">)'
    match1 = re.search(pattern1, content, re.DOTALL)

    if match1:
        insert_pos = match1.end()
        new_content = content[:insert_pos] + tldr_html + '\n' + content[insert_pos:]
        return new_content, f"Added TL;DR with {len(insights)} insights, {len(actions)} actions"

    # Try Pattern 2: After first h2
    pattern2 = r'(<h2[^>]*>.*?</h2>)'
    match2 = re.search(pattern2, content, re.DOTALL)

    if match2:
        # Insert BEFORE the h2
        insert_pos = match2.start()
        new_content = content[:insert_pos] + tldr_html + '\n\n' + content[insert_pos:]
        return new_content, f"Added TL;DR with {len(insights)} insights, {len(actions)} actions"

    return None, "Could not find insertion point"

def process_lesson_file(filepath):
    """Process a single lesson file"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        new_content, message = add_tldr_summary(content)

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
    print(f"✅ Added TL;DR: {success_count}")
    print(f"⏭️  Skipped: {skip_count}")
    print(f"❌ Errors: {error_count}")
    print(f"📊 Total processed: {len(lesson_files)}")

if __name__ == '__main__':
    main()
