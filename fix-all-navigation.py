#!/usr/bin/env python3
"""
Fix ALL lesson navigation buttons to ensure every lesson has correct previous/next navigation
"""

import os
import re
from pathlib import Path

# Define all lessons in order
LESSONS = [
    # Beginner (1-20)
    ("beginner", "01-the-liquidity-lie.html", 1),
    ("beginner", "02-volume-doesnt-lie.html", 2),
    ("beginner", "03-price-action-is-dead.html", 3),
    ("beginner", "04-repaint-problem.html", 4),
    ("beginner", "05-rsi-extremes.html", 5),
    ("beginner", "06-moving-averages.html", 6),
    ("beginner", "07-revenge-trading.html", 7),
    ("beginner", "08-confirmation-bias.html", 8),
    ("beginner", "09-position-sizing.html", 9),
    ("beginner", "10-stop-losses.html", 10),
    ("beginner", "11-timeframe-illusion.html", 11),
    ("beginner", "12-paper-trading.html", 12),
    ("beginner", "13-smart-money-concepts.html", 13),
    ("beginner", "14-cot-report.html", 14),
    ("beginner", "15-liquidity-pools.html", 15),
    ("beginner", "16-market-structure-advanced.html", 16),
    ("beginner", "17-time-sales-mastery.html", 17),
    ("beginner", "18-session-liquidity-advanced.html", 18),
    ("beginner", "19-footprint-charts-advanced.html", 19),
    ("beginner", "20-swing-trading-framework.html", 20),
    # Intermediate (21-47)
    ("intermediate", "21-bid-ask-spread-dynamics.html", 21),
    ("intermediate", "22-order-book-analysis.html", 22),
    ("intermediate", "23-market-making-hft.html", 23),
    ("intermediate", "24-footprint-charts.html", 24),
    ("intermediate", "25-dark-pools.html", 25),
    ("intermediate", "26-smart-money-divergence.html", 26),
    ("intermediate", "27-multi-timeframe-mastery.html", 27),
    ("intermediate", "28-janus-atlas-advanced.html", 28),
    ("intermediate", "29-plutus-flow-mastery.html", 29),
    ("intermediate", "30-minimal-flow-regimes.html", 30),
    ("intermediate", "31-portfolio-construction.html", 31),
    ("intermediate", "32-backtesting-reality.html", 32),
    ("intermediate", "33-advanced-risk-management.html", 33),
    ("intermediate", "34-trade-journal-mastery.html", 34),
    ("intermediate", "35-professional-operations.html", 35),
    ("intermediate", "36-dark-pool-indicators.html", 36),
    ("intermediate", "37-options-order-flow.html", 37),
    ("intermediate", "38-game-theory-trading.html", 38),
    ("intermediate", "39-options-market-microstructure.html", 39),
    ("intermediate", "40-market-maker-algorithms.html", 40),
    ("intermediate", "41-fed-policy-liquidity.html", 41),
    ("intermediate", "42-volatility-trading-strategies.html", 42),
    ("intermediate", "43-cross-market-correlation.html", 43),
    ("intermediate", "44-hft-mechanics.html", 44),
    ("intermediate", "45-auction-theory-imbalances.html", 45),
    ("intermediate", "46-advanced-risk-management.html", 46),
    ("intermediate", "47-portfolio-construction-kelly.html", 47),
    # Advanced (48-74)
    ("advanced", "48-institutional-order-flow.html", 48),
    ("advanced", "49-market-regime-recognition.html", 49),
    ("advanced", "50-auction-theory-advanced.html", 50),
    ("advanced", "51-cross-asset-correlations.html", 51),
    ("advanced", "52-volatility-trading.html", 52),
    ("advanced", "53-algorithmic-execution.html", 53),
    ("advanced", "54-system-development.html", 54),
    ("advanced", "55-machine-learning-trading.html", 55),
    ("advanced", "56-high-frequency-concepts.html", 56),
    ("advanced", "57-trading-automation-apis.html", 57),
    ("advanced", "58-portfolio-theory-advanced.html", 58),
    ("advanced", "59-performance-attribution.html", 59),
    ("advanced", "60-tax-optimization.html", 60),
    ("advanced", "61-professional-infrastructure.html", 61),
    ("advanced", "62-trading-career-path.html", 62),
    ("advanced", "63-statistical-arbitrage.html", 63),
    ("advanced", "64-macro-regime-framework.html", 64),
    ("advanced", "65-market-impact-models.html", 65),
    ("advanced", "66-quantitative-strategy-design.html", 66),
    ("advanced", "67-machine-learning-trading.html", 67),
    ("advanced", "68-crypto-market-microstructure.html", 68),
    ("advanced", "69-institutional-order-types.html", 69),
    ("advanced", "70-execution-algorithms-twap-vwap.html", 70),
    ("advanced", "71-multi-timeframe-confluence.html", 71),
    ("advanced", "72-intermarket-analysis-advanced.html", 72),
    ("advanced", "73-behavioral-finance-psychology.html", 73),
    ("advanced", "74-building-trading-business.html", 74),
    # Professional (75-82)
    ("professional", "75-real-time-market-analysis.html", 75),
    ("professional", "76-live-trading-case-studies.html", 76),
    ("professional", "77-building-your-edge.html", 77),
    ("professional", "78-professional-risk-systems.html", 78),
    ("professional", "79-institutional-trading-strategies.html", 79),
    ("professional", "80-career-pathways-trading.html", 80),
    ("professional", "81-final-capstone-project.html", 81),
    ("professional", "82-ongoing-learning-community.html", 82),
]

def get_level_name(level_folder):
    """Get the proper capitalized level name"""
    return level_folder.capitalize()

def fix_lesson_navigation(lesson_idx):
    """Fix navigation for a single lesson"""
    level, filename, number = LESSONS[lesson_idx]
    filepath = Path(f"curriculum/{level}/{filename}")

    if not filepath.exists():
        print(f"⚠️  Skipping {filepath} - file not found")
        return False

    print(f"Processing lesson {number}: {filepath}")

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Generate navigation HTML
    nav_html_parts = []

    # Previous lesson button
    if lesson_idx > 0:
        prev_level, prev_file, prev_num = LESSONS[lesson_idx - 1]
        prev_url = f"/curriculum/{prev_level}/{prev_file}"
        nav_html_parts.append(f'  <a class="btn btn-ghost" href="{prev_url}">&larr; Previous Lesson</a>')

    # Next lesson button
    if lesson_idx < len(LESSONS) - 1:
        next_level, next_file, next_num = LESSONS[lesson_idx + 1]
        next_url = f"/curriculum/{next_level}/{next_file}"
        nav_html_parts.append(f'  <a class="btn btn-primary" href="{next_url}">Next Lesson &rarr;</a>')

    # Build the complete navigation div
    if nav_html_parts:
        new_nav = '  <div class="wrap nav-article">\n' + '\n'.join(nav_html_parts) + '\n  </div>'
    else:
        new_nav = ''

    # Remove ALL existing navigation at the end of the article
    # Pattern 1: Standard nav-article divs before </article>
    content = re.sub(
        r'  <div class="wrap nav-article">.*?</div>\s*</article>',
        new_nav + '\n</article>' if new_nav else '</article>',
        content,
        flags=re.DOTALL
    )

    # Pattern 2: Multiple nested nav-article divs
    content = re.sub(
        r'  <div class="wrap nav-article">\s*<div class="wrap nav-article">.*?</div>\s*</div>\s*</article>',
        new_nav + '\n</article>' if new_nav else '</article>',
        content,
        flags=re.DOTALL
    )

    # Pattern 3: nav-article with nav tags
    content = re.sub(
        r'  <nav class="nav-article".*?</nav>\s*</article>',
        new_nav + '\n</article>' if new_nav else '</article>',
        content,
        flags=re.DOTALL
    )

    # Pattern 4: Simple nav-article divs
    content = re.sub(
        r'  <div class="nav-article">.*?</div>\s*</article>',
        new_nav + '\n</article>' if new_nav else '</article>',
        content,
        flags=re.DOTALL
    )

    # Write back
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"✅ Fixed lesson {number}")
    return True

def main():
    """Fix all lesson navigation"""
    print("=" * 60)
    print("FIXING ALL LESSON NAVIGATION")
    print("=" * 60)

    fixed_count = 0
    for idx in range(len(LESSONS)):
        if fix_lesson_navigation(idx):
            fixed_count += 1

    print("=" * 60)
    print(f"✅ Fixed {fixed_count} lessons")
    print("=" * 60)

if __name__ == "__main__":
    main()
