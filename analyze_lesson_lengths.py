#!/usr/bin/env python3
"""
Analyze lesson files for timeline and case study lengths
"""
import os
import re
from pathlib import Path

def count_words(text):
    """Count words in text (strip HTML tags first)"""
    # Remove HTML tags
    text = re.sub(r'<[^>]+>', ' ', text)
    # Remove HTML entities
    text = re.sub(r'&[a-z]+;', ' ', text)
    return len(re.findall(r'\w+', text))

def extract_section(content, class_pattern, start_tag='<div'):
    """Extract sections matching a class pattern"""
    sections = []
    pattern = re.compile(rf'{start_tag}[^>]*class="[^"]*{class_pattern}[^"]*"[^>]*>(.*?)</div>', re.DOTALL | re.I)
    matches = pattern.findall(content)
    for match in matches:
        sections.append(match)
    return sections

def analyze_lesson(filepath):
    """Analyze a single lesson file"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    results = {
        'file': filepath.name,
        'timelines': [],
        'case_studies': [],
        'completion_messages': []
    }

    # Find timeline structures (timeline-week divs)
    timeline_divs = re.findall(r'<div[^>]*class="[^"]*timeline-week[^"]*"[^>]*>.*?</div>(?:\s*</div>)*', content, re.DOTALL | re.I)
    if timeline_divs:
        total_timeline_words = sum(count_words(div) for div in timeline_divs)
        results['timelines'].append({
            'count': len(timeline_divs),
            'total_words': total_timeline_words,
            'avg_words_per_week': total_timeline_words // len(timeline_divs) if timeline_divs else 0
        })

    # Find case studies / story summaries
    case_study_patterns = [
        r'<div[^>]*class="[^"]*story-summary[^"]*"[^>]*>.*?</div>(?:\s*</div>)*',
        r'<div[^>]*class="[^"]*example-block[^"]*"[^>]*>.*?</div>(?:\s*</div>)*'
    ]
    case_studies = []
    for pattern in case_study_patterns:
        case_studies.extend(re.findall(pattern, content, re.DOTALL | re.I))

    for idx, cs in enumerate(case_studies):
        words = count_words(cs)
        if words > 100:  # Only count substantial sections
            results['case_studies'].append({
                'index': idx + 1,
                'words': words,
                'needs_trim': words > 800  # Flag if over 800 words
            })

    # Find completion/congratulation messages
    completion_patterns = [
        r'(Bridge Tier Complete!)',
        r'(Intermediate.*Complete!)',
        r'(Congratulations.*completed)',
        r'(You.*completed.*tier)'
    ]
    for pattern in completion_patterns:
        matches = re.findall(pattern, content, re.I)
        for match in matches:
            results['completion_messages'].append({
                'text': match[:100]
            })

    return results

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    # Find all HTML lesson files
    lesson_files = []
    for subdir in ['beginner', 'intermediate', 'advanced', 'professional']:
        subdir_path = curriculum_dir / subdir
        if subdir_path.exists():
            lesson_files.extend(sorted(subdir_path.glob('*.html')))

    print(f"Found {len(lesson_files)} lesson files\n")
    print("=" * 80)

    # Analyze each file
    issues = {
        'long_timelines': [],
        'long_case_studies': [],
        'completion_messages': []
    }

    for lesson_file in lesson_files:
        results = analyze_lesson(lesson_file)

        # Check for issues
        has_issues = False

        # Timeline issues
        for timeline in results['timelines']:
            if timeline['total_words'] > 1500:  # Flag timelines over 1500 words
                issues['long_timelines'].append({
                    'file': results['file'],
                    'words': timeline['total_words'],
                    'weeks': timeline['count']
                })
                has_issues = True

        # Case study issues
        for cs in results['case_studies']:
            if cs['needs_trim']:
                issues['long_case_studies'].append({
                    'file': results['file'],
                    'case_num': cs['index'],
                    'words': cs['words']
                })
                has_issues = True

        # Completion message detection
        if results['completion_messages']:
            issues['completion_messages'].append({
                'file': results['file'],
                'messages': results['completion_messages']
            })

    # Print summary
    print("\n🔍 TIMELINE ANALYSIS")
    print("=" * 80)
    if issues['long_timelines']:
        print(f"Found {len(issues['long_timelines'])} lessons with LONG timelines (>1500 words):\n")
        for item in sorted(issues['long_timelines'], key=lambda x: x['words'], reverse=True):
            print(f"  📊 {item['file']}")
            print(f"      Total: {item['words']} words across {item['weeks']} weeks")
            print(f"      Recommendation: Trim to ~1000 words total\n")
    else:
        print("✅ No excessively long timelines found\n")

    print("\n📖 CASE STUDY ANALYSIS")
    print("=" * 80)
    if issues['long_case_studies']:
        print(f"Found {len(issues['long_case_studies'])} case studies >800 words:\n")
        for item in sorted(issues['long_case_studies'], key=lambda x: x['words'], reverse=True):
            print(f"  📝 {item['file']} - Case #{item['case_num']}")
            print(f"      Current: {item['words']} words")
            print(f"      Target: ~500-600 words")
            print(f"      Trim: ~{item['words'] - 600} words\n")
    else:
        print("✅ All case studies are appropriately sized\n")

    print("\n🎓 COMPLETION MESSAGE ANALYSIS")
    print("=" * 80)
    if issues['completion_messages']:
        print(f"Found {len(issues['completion_messages'])} lessons with completion messages:\n")
        for item in issues['completion_messages']:
            print(f"  🏆 {item['file']}")
            for msg in item['messages'][:2]:  # Show first 2 messages
                print(f"      - {msg['text'][:60]}...")
            print()
    else:
        print("No completion messages found\n")

    print("\n" + "=" * 80)
    print(f"\n📊 SUMMARY:")
    print(f"  - {len(issues['long_timelines'])} lessons need timeline trimming")
    print(f"  - {len(issues['long_case_studies'])} case studies need trimming")
    print(f"  - {len(issues['completion_messages'])} lessons have completion messages")

if __name__ == '__main__':
    main()
