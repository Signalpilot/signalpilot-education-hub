#!/usr/bin/env python3
"""
Fix all expanded lessons to match the perfected lesson structure.
Adds: GUGI font, proper headers, backgrounds, TOC sidebar, all CSS/JS files, metadata
"""

import re
import os
from pathlib import Path

# Lesson metadata mapping
LESSON_META = {
    # Beginner Bridge
    '19': {'tier': 'Beginner Bridge', 'order': '19', 'title': 'Footprint Charts Advanced'},
    '20': {'tier': 'Beginner Bridge', 'order': '20', 'title': 'Swing Trading Framework'},

    # Intermediate Bridge
    '36': {'tier': 'Intermediate', 'order': '36', 'title': 'Dark Pool Indicators'},
    '37': {'tier': 'Intermediate', 'order': '37', 'title': 'Options Order Flow'},
    '38': {'tier': 'Intermediate', 'order': '38', 'title': 'Game Theory Trading'},
    '39': {'tier': 'Intermediate', 'order': '39', 'title': 'Options Market Microstructure'},
    '40': {'tier': 'Intermediate', 'order': '40', 'title': 'Market Maker Algorithms'},
    '41': {'tier': 'Intermediate', 'order': '41', 'title': 'Fed Policy & Liquidity'},
    '42': {'tier': 'Intermediate', 'order': '42', 'title': 'Volatility Trading Strategies'},
    '43': {'tier': 'Intermediate', 'order': '43', 'title': 'Cross-Market Correlation'},
    '44': {'tier': 'Intermediate', 'order': '44', 'title': 'HFT Mechanics'},
    '45': {'tier': 'Intermediate', 'order': '45', 'title': 'Auction Theory & Imbalances'},

    # Advanced Mastery
    '63': {'tier': 'Advanced', 'order': '63', 'title': 'Statistical Arbitrage'},
    '68': {'tier': 'Advanced', 'order': '68', 'title': 'Crypto Market Microstructure'},

    # Professional Capstone
    '75': {'tier': 'Professional', 'order': '75', 'title': 'Real-Time Market Analysis'},
    '76': {'tier': 'Professional', 'order': '76', 'title': 'Live Trading Case Studies'},
    '77': {'tier': 'Professional', 'order': '77', 'title': 'Building Your Edge'},
    '78': {'tier': 'Professional', 'order': '78', 'title': 'Professional Risk Systems'},
    '79': {'tier': 'Professional', 'order': '79', 'title': 'Institutional Trading Strategies'},
    '80': {'tier': 'Professional', 'order': '80', 'title': 'Career Pathways Trading'},
    '81': {'tier': 'Professional', 'order': '81', 'title': 'Final Capstone Project'},
    '82': {'tier': 'Professional', 'order': '82', 'title': 'Ongoing Learning Community'},
}

LESSON_FILES = [
    'curriculum/beginner-bridge/19-footprint-charts-advanced.html',
    'curriculum/beginner-bridge/20-swing-trading-framework.html',
    'curriculum/intermediate-bridge/36-dark-pool-indicators.html',
    'curriculum/intermediate-bridge/37-options-order-flow.html',
    'curriculum/intermediate-bridge/38-game-theory-trading.html',
    'curriculum/intermediate-bridge/39-options-market-microstructure.html',
    'curriculum/intermediate-bridge/40-market-maker-algorithms.html',
    'curriculum/intermediate-bridge/41-fed-policy-liquidity.html',
    'curriculum/intermediate-bridge/42-volatility-trading-strategies.html',
    'curriculum/intermediate-bridge/43-cross-market-correlation.html',
    'curriculum/intermediate-bridge/44-hft-mechanics.html',
    'curriculum/intermediate-bridge/45-auction-theory-imbalances.html',
    'curriculum/advanced-mastery/63-statistical-arbitrage.html',
    'curriculum/advanced-mastery/68-crypto-market-microstructure.html',
    'curriculum/professional-capstone/75-real-time-market-analysis.html',
    'curriculum/professional-capstone/76-live-trading-case-studies.html',
    'curriculum/professional-capstone/77-building-your-edge.html',
    'curriculum/professional-capstone/78-professional-risk-systems.html',
    'curriculum/professional-capstone/79-institutional-trading-strategies.html',
    'curriculum/professional-capstone/80-career-pathways-trading.html',
    'curriculum/professional-capstone/81-final-capstone-project.html',
    'curriculum/professional-capstone/82-ongoing-learning-community.html',
]

def extract_lesson_number(filepath):
    """Extract lesson number from filepath"""
    match = re.search(r'/(\d+)-', filepath)
    return match.group(1) if match else None

def extract_title_from_h1(content):
    """Extract title from <h1> tag"""
    match = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
    if match:
        # Clean HTML tags from title
        title = re.sub(r'<[^>]+>', '', match.group(1))
        return title.strip()
    return None

def extract_article_content(html):
    """Extract content between <article> tags"""
    # Try to find article content
    match = re.search(r'<article[^>]*>(.*?)</article>', html, re.DOTALL)
    if match:
        return match.group(1)

    # If no article tag, extract body content
    match = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL)
    if match:
        return match.group(1)

    return None

def create_toc_from_content(content):
    """Generate 'On This Page' TOC from h2 headings"""
    headings = re.findall(r'<h2[^>]*>(.*?)</h2>', content, re.DOTALL)
    toc_items = []
    for heading in headings[:8]:  # Limit to first 8 headings
        # Clean HTML tags
        clean_heading = re.sub(r'<[^>]+>', '', heading).strip()
        # Create anchor (simplified)
        toc_items.append(f'      <a href="#">{clean_heading}</a>')

    return '\n'.join(toc_items) if toc_items else '      <a href="#">Overview</a>'

def create_fixed_lesson(filepath):
    """Read lesson, extract content, wrap in proper template"""

    base_dir = Path('/home/user/signalpilot-education-hub')
    full_path = base_dir / filepath

    if not full_path.exists():
        print(f"❌ File not found: {filepath}")
        return False

    # Read existing content
    with open(full_path, 'r', encoding='utf-8') as f:
        original_html = f.read()

    # Extract lesson number
    lesson_num = extract_lesson_number(filepath)
    if not lesson_num or lesson_num not in LESSON_META:
        print(f"❌ Unknown lesson number for: {filepath}")
        return False

    meta = LESSON_META[lesson_num]

    # Extract article content
    article_content = extract_article_content(original_html)
    if not article_content:
        print(f"❌ Could not extract content from: {filepath}")
        return False

    # Extract title
    title = extract_title_from_h1(article_content)
    if not title:
        title = meta['title']

    # Generate TOC
    toc_html = create_toc_from_content(article_content)

    # Determine breadcrumb path
    tier_folder = filepath.split('/')[1]
    tier_link = tier_folder.replace('-', ' ').title()

    # Create fixed HTML
    fixed_html = f'''<!doctype html>
<html lang="en" dir="ltr" data-theme="dark">
<head>
  <link rel="manifest" href="/manifest.json">
  <link rel="icon" type="image/x-icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/icon-180x180.png">
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5, viewport-fit=cover"/>
  <!-- AGGRESSIVE CACHE PREVENTION -->
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate, max-age=0"/>
  <meta http-equiv="Pragma" content="no-cache"/>
  <meta http-equiv="Expires" content="0"/>
  <title>{title} — Signal Pilot Education</title>
  <meta name="description" content="{title}">
  <meta name="sp-level" content="{meta['tier']}"><meta name="sp-order" content="{meta['order']}">
  <link rel="canonical" href="https://education.signalpilot.io/{filepath}">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Gugi&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
  <!-- SignalPilot Theme System -->
  <link rel="stylesheet" href="/assets/signalpilot-theme.css">
  <link rel="stylesheet" href="/assets/edu.css">
  <link rel="stylesheet" href="/assets/chatbot.css">
  <link rel="stylesheet" href="/assets/notes.css">
  <link rel="stylesheet" href="/assets/auth-ui.css">
  <!-- Logger must load first -->
  <script src="/assets/logger.js"></script>
  <script src="/assets/dev-utils.js" defer></script>
  <script src="/assets/structured-data.js" defer></script>
  <script src="/assets/lazy-load.js" defer></script>
  <script defer data-domain="signalpilot.io" src="https://plausible.io/js/script.js"></script>
</head>
<body>
  <div class="bg-stars" aria-hidden="true"></div>
  <canvas id="constellations" class="sp-constellations" aria-hidden="true"></canvas>
  <div class="bg-aurora" aria-hidden="true"></div>

<header class="sp-header">
  <div class="wrap">
    <a href="https://signalpilot.io" class="brand">
      <span>Signal Pilot</span>
    </a>
    <nav id="mainnav" aria-label="Main"><ul>
      <li><a href="/">Education</a></li>
      <li><a href="/search.html">Search</a></li>
    </ul></nav>
    <div class="header-ctls"><button id="themeToggle" class="btn btn-ghost btn-sm" type="button" aria-label="Toggle theme">
        <span id="theme-icon">🌙</span>
      </button><button id="menuToggle" class="menu-toggle" aria-expanded="false">Menu ☰</button></div>
  </div>
</header>

<article class="article">
{article_content}

  <div class="wrap nav-article">
    <a class="btn btn-ghost" href="/{tier_folder}.html">&larr; Back to {tier_link}</a>
  </div>
</article>

<aside class="toc" aria-label="On this page">
  <h3>On this page</h3>
{toc_html}
</aside>

<footer class="sp-footer"><div class="wrap"><div>© <span id="year"></span> Signal Pilot Labs, Inc.</div><div class="links"><a href="https://signalpilot.io/privacy.html">Privacy</a><a href="https://signalpilot.io/terms.html">Terms</a></div></div></footer>

<script src="/assets/edu.js"></script>
<script src="/assets/edu-enhanced.js"></script>
<script src="/assets/sp-bg.js"></script>
<script>
document.getElementById('year').textContent = new Date().getFullYear();
</script>
<!-- SignalPilot Theme Switcher -->
<script src="/assets/signalpilot-theme.js"></script>
<script src="/assets/spaced-repetition.js" defer></script>
<script src="/assets/chatbot.js" defer></script>
<script src="/assets/notes.js" defer></script>
<script src="/assets/analytics.js"></script>
<script src="/assets/quiz-enhanced.js"></script>
<script src="/assets/social-share.js"></script>
<script src="/assets/pwa-init.js"></script>
<script src="/assets/config.js"></script>
<script src="/assets/supabase-client.js"></script>
<script src="/assets/auth-ui.js"></script>
<script src="/assets/library.js"></script>
<script src="/assets/lesson-notes.js"></script>
</body>
</html>'''

    # Write fixed HTML
    with open(full_path, 'w', encoding='utf-8') as f:
        f.write(fixed_html)

    print(f"✅ Fixed: Lesson #{lesson_num} - {title}")
    return True

def main():
    """Fix all lessons"""
    print("🔧 Fixing all 22 expanded lessons...\n")

    success_count = 0
    for filepath in LESSON_FILES:
        if create_fixed_lesson(filepath):
            success_count += 1

    print(f"\n✅ Successfully fixed {success_count}/{len(LESSON_FILES)} lessons!")

if __name__ == '__main__':
    main()
