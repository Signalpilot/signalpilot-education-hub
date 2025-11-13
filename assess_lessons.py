#!/usr/bin/env python3
"""
Comprehensive lesson engagement assessment.
Analyzes each lesson for readability, engagement factors, and improvement opportunities.
"""

import os
import re
from pathlib import Path
from collections import defaultdict

def analyze_lesson(filepath):
    """Analyze a single lesson for engagement metrics."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        lines = content.split('\n')

    analysis = {
        'filename': os.path.basename(filepath),
        'total_lines': len(lines),
        'total_chars': len(content),
        'has_tldr': '⚡ TL;DR' in content,
        'has_case_study': 'case study' in content.lower() or 'real-world example' in content.lower(),
        'has_trader_story': any(name in content for name in ['Jordan', 'Sarah', 'Mike', 'Alex', 'Tyler', 'Marcus']),
        'story_count': 0,
        'has_pnl_numbers': '$' in content and any(word in content for word in ['profit', 'loss', 'P&L', 'made', 'lost']),
        'has_tables': '<table' in content,
        'has_visual_callouts': content.count('callout-'),
        'h2_count': content.count('<h2'),
        'h3_count': content.count('<h3'),
        'paragraph_count': content.count('<p>'),
        'list_count': content.count('<ul>') + content.count('<ol>'),
        'has_practice_exercise': 'practice exercise' in content.lower(),
        'has_related_lessons': 'related lessons' in content.lower(),
        'emotional_hooks': 0,
        'specificity_score': 0,
        'engagement_issues': [],
        'strengths': [],
        'recommendations': []
    }

    # Count trader stories
    trader_names = ['Jordan', 'Sarah', 'Mike', 'Alex', 'Tyler', 'Marcus', 'Emma', 'Chris', 'David', 'Lisa']
    for name in trader_names:
        analysis['story_count'] += content.count(name)

    # Check for emotional hooks
    emotional_words = ['disaster', 'nightmare', 'mistake', 'failed', 'success', 'breakthrough', 'painful', 'frustrating']
    analysis['emotional_hooks'] = sum(content.lower().count(word) for word in emotional_words)

    # Check for specificity (dates, numbers, specific examples)
    date_patterns = [r'202\d', r'January|February|March|April|May|June|July|August|September|October|November|December']
    for pattern in date_patterns:
        analysis['specificity_score'] += len(re.findall(pattern, content))

    # Assess engagement issues
    if not analysis['has_tldr']:
        analysis['engagement_issues'].append("Missing TL;DR summary")

    if not analysis['has_case_study']:
        analysis['engagement_issues'].append("No case studies or real-world examples")

    if not analysis['has_trader_story']:
        analysis['engagement_issues'].append("No named trader stories for emotional connection")

    if not analysis['has_pnl_numbers']:
        analysis['engagement_issues'].append("No concrete P&L numbers to make outcomes tangible")

    if analysis['paragraph_count'] < 20:
        analysis['engagement_issues'].append("Very short content - may lack depth")

    if analysis['h2_count'] < 3:
        analysis['engagement_issues'].append("Too few sections - poor content structure")

    if analysis['has_visual_callouts'] < 3:
        analysis['engagement_issues'].append("Minimal visual callouts - text-heavy")

    if not analysis['has_practice_exercise']:
        analysis['engagement_issues'].append("No practice exercise for skill application")

    # Assess strengths
    if analysis['has_tldr']:
        analysis['strengths'].append("Has TL;DR for quick scanning")

    if analysis['story_count'] >= 3:
        analysis['strengths'].append(f"Multiple trader stories ({analysis['story_count']} mentions)")

    if analysis['has_pnl_numbers']:
        analysis['strengths'].append("Includes concrete P&L examples")

    if analysis['has_visual_callouts'] >= 5:
        analysis['strengths'].append("Good use of visual callouts and formatting")

    if analysis['emotional_hooks'] >= 3:
        analysis['strengths'].append("Strong emotional hooks and storytelling")

    if analysis['has_tables']:
        analysis['strengths'].append("Uses tables for data presentation")

    # Generate recommendations
    if not analysis['has_case_study']:
        analysis['recommendations'].append("ADD: Real-world case study with specific dates and outcomes")

    if not analysis['has_trader_story']:
        analysis['recommendations'].append("ADD: Named trader story (e.g., 'Jordan, a...') for emotional connection")

    if not analysis['has_pnl_numbers']:
        analysis['recommendations'].append("ADD: Specific P&L numbers ($X profit/loss) to make outcomes tangible")

    if analysis['emotional_hooks'] < 2:
        analysis['recommendations'].append("IMPROVE: Add emotional language (mistakes, breakthroughs, disasters)")

    if analysis['specificity_score'] < 5:
        analysis['recommendations'].append("IMPROVE: Add specific dates, numbers, and concrete details")

    if analysis['has_visual_callouts'] < 4:
        analysis['recommendations'].append("ADD: More visual callouts (warnings, tips, examples)")

    if not analysis['has_practice_exercise']:
        analysis['recommendations'].append("ADD: Hands-on practice exercise at the end")

    # Calculate engagement score (0-100)
    score = 0
    score += 15 if analysis['has_tldr'] else 0
    score += 20 if analysis['has_case_study'] else 0
    score += 15 if analysis['has_trader_story'] else 0
    score += 10 if analysis['has_pnl_numbers'] else 0
    score += 10 if analysis['has_tables'] else 0
    score += min(15, analysis['has_visual_callouts'] * 3)
    score += 10 if analysis['has_practice_exercise'] else 0
    score += min(5, analysis['emotional_hooks'])

    analysis['engagement_score'] = score

    return analysis

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')
    levels = ['beginner', 'intermediate', 'advanced', 'professional']

    all_analyses = []

    for level in levels:
        level_dir = curriculum_dir / level
        if not level_dir.exists():
            continue

        html_files = sorted(level_dir.glob('*.html'))
        for filepath in html_files:
            analysis = analyze_lesson(filepath)
            analysis['level'] = level
            all_analyses.append(analysis)

    # Generate report
    print("="*100)
    print("LESSON ENGAGEMENT ASSESSMENT REPORT")
    print("="*100)
    print(f"\nTotal lessons analyzed: {len(all_analyses)}\n")

    # Summary statistics
    avg_score = sum(a['engagement_score'] for a in all_analyses) / len(all_analyses)
    lessons_with_stories = sum(1 for a in all_analyses if a['has_trader_story'])
    lessons_with_case_studies = sum(1 for a in all_analyses if a['has_case_study'])
    lessons_with_pnl = sum(1 for a in all_analyses if a['has_pnl_numbers'])

    print("OVERALL STATISTICS")
    print("-" * 100)
    print(f"Average Engagement Score: {avg_score:.1f}/100")
    print(f"Lessons with TL;DR: {sum(1 for a in all_analyses if a['has_tldr'])}/82 ({sum(1 for a in all_analyses if a['has_tldr'])/82*100:.1f}%)")
    print(f"Lessons with Case Studies: {lessons_with_case_studies}/82 ({lessons_with_case_studies/82*100:.1f}%)")
    print(f"Lessons with Trader Stories: {lessons_with_stories}/82 ({lessons_with_stories/82*100:.1f}%)")
    print(f"Lessons with P&L Numbers: {lessons_with_pnl}/82 ({lessons_with_pnl/82*100:.1f}%)")

    # Sort by engagement score
    all_analyses.sort(key=lambda x: x['engagement_score'])

    print("\n\n" + "="*100)
    print("TOP 10 MOST ENGAGING LESSONS")
    print("="*100)
    for analysis in all_analyses[-10:]:
        print(f"\n{analysis['filename']} (Score: {analysis['engagement_score']}/100)")
        print(f"  Strengths: {', '.join(analysis['strengths']) if analysis['strengths'] else 'None identified'}")

    print("\n\n" + "="*100)
    print("BOTTOM 10 LESSONS NEEDING MOST IMPROVEMENT")
    print("="*100)
    for analysis in all_analyses[:10]:
        print(f"\n{analysis['filename']} (Score: {analysis['engagement_score']}/100)")
        print(f"  Issues: {', '.join(analysis['engagement_issues'])}")
        print(f"  Recommendations:")
        for rec in analysis['recommendations']:
            print(f"    • {rec}")

    # Generate detailed report for all lessons
    print("\n\n" + "="*100)
    print("DETAILED ASSESSMENT BY LEVEL")
    print("="*100)

    for level in levels:
        level_lessons = [a for a in all_analyses if a['level'] == level]
        if not level_lessons:
            continue

        print(f"\n{'='*100}")
        print(f"{level.upper()} LESSONS ({len(level_lessons)} lessons)")
        print(f"{'='*100}")

        for analysis in sorted(level_lessons, key=lambda x: x['filename']):
            print(f"\n{analysis['filename']}")
            print(f"  Engagement Score: {analysis['engagement_score']}/100")
            print(f"  Strengths: {len(analysis['strengths'])}")
            print(f"  Issues: {len(analysis['engagement_issues'])}")

            if analysis['engagement_score'] < 60:
                print(f"  ⚠️  PRIORITY: Low engagement - needs improvement")
            elif analysis['engagement_score'] < 75:
                print(f"  📊 MODERATE: Good but could be enhanced")
            else:
                print(f"  ✅ STRONG: High engagement")

            if analysis['recommendations']:
                print(f"  Top Recommendation: {analysis['recommendations'][0]}")

if __name__ == '__main__':
    main()
