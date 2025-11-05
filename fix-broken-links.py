#!/usr/bin/env python3
"""
Fix broken internal links across the site.

Priority fixes:
1. Index page links (beginner-bridge.html → index.html, etc.)
2. Cross-lesson references (update to actual lesson numbers)
3. Resource links (mark as TODO for later)
"""

import re
import os
import glob

# Mapping of broken index pages to actual pages
INDEX_PAGE_FIXES = {
    '/beginner-bridge.html': '/',
    '/intermediate-bridge.html': '/',
    '/advanced-mastery.html': '/',
    '/professional.html': '/',
    '/library.html': '/my-library.html',
    '/curriculum/index.html': '/',
    '/curriculum/beginner/index.html': '/beginner.html',
    '/curriculum/intermediate/index.html': '/intermediate.html',
    '/curriculum/intermediate-bridge/index.html': '/intermediate-bridge.html',
    '/curriculum/advanced/index.html': '/advanced.html',
    '/curriculum/advanced-mastery/index.html': '/advanced-mastery.html',
    '/curriculum/professional-capstone/index.html': '/professional-capstone.html',
}

# Mapping of old lesson numbers to new (actual) lesson filenames
# Format: 'old-number-name.html': 'actual-number-name.html'
LESSON_REMAPPING = {
    # Intermediate lessons (old numbering 13-27 → new 21-35)
    '/curriculum/intermediate/13-bid-ask-spread-dynamics.html': '/curriculum/intermediate/21-bid-ask-spread-dynamics.html',
    '/curriculum/intermediate/14-order-book-analysis.html': '/curriculum/intermediate/22-order-book-analysis.html',
    '/curriculum/intermediate/15-market-making-hft.html': '/curriculum/intermediate/23-market-making-hft.html',
    '/curriculum/intermediate/16-footprint-charts.html': '/curriculum/intermediate/24-footprint-charts.html',
    '/curriculum/intermediate/17-dark-pools.html': '/curriculum/intermediate/25-dark-pools.html',
    '/curriculum/intermediate/18-smart-money-divergence.html': '/curriculum/intermediate/26-smart-money-divergence.html',
    '/curriculum/intermediate/19-multi-timeframe-mastery.html': '/curriculum/intermediate/27-multi-timeframe-mastery.html',
    '/curriculum/intermediate/20-janus-atlas-advanced.html': '/curriculum/intermediate/28-janus-atlas-advanced.html',
    '/curriculum/intermediate/21-plutus-flow-mastery.html': '/curriculum/intermediate/29-plutus-flow-mastery.html',
    '/curriculum/intermediate/22-minimal-flow-regimes.html': '/curriculum/intermediate/30-minimal-flow-regimes.html',
    '/curriculum/intermediate/23-portfolio-construction.html': '/curriculum/intermediate/31-portfolio-construction.html',
    '/curriculum/intermediate/24-backtesting-reality.html': '/curriculum/intermediate/32-backtesting-reality.html',
    '/curriculum/intermediate/25-advanced-risk-management.html': '/curriculum/intermediate/33-advanced-risk-management.html',
    '/curriculum/intermediate/26-trade-journal-mastery.html': '/curriculum/intermediate/34-trade-journal-mastery.html',
    '/curriculum/intermediate/27-professional-operations.html': '/curriculum/intermediate/35-professional-operations.html',

    # Advanced lessons (old numbering 28-42 → new 48-62)
    '/curriculum/advanced/28-institutional-order-flow.html': '/curriculum/advanced/48-institutional-order-flow.html',
    '/curriculum/advanced/29-market-regime-recognition.html': '/curriculum/advanced/49-market-regime-recognition.html',
    '/curriculum/advanced/30-auction-theory-advanced.html': '/curriculum/advanced/50-auction-theory-advanced.html',
    '/curriculum/advanced/31-cross-asset-correlations.html': '/curriculum/advanced/51-cross-asset-correlations.html',
    '/curriculum/advanced/32-volatility-trading.html': '/curriculum/advanced/52-volatility-trading.html',
    '/curriculum/advanced/33-algorithmic-execution.html': '/curriculum/advanced/53-algorithmic-execution.html',
    '/curriculum/advanced/34-system-development.html': '/curriculum/advanced/54-system-development.html',
    '/curriculum/advanced/35-machine-learning-trading.html': '/curriculum/advanced/55-machine-learning-trading.html',
    '/curriculum/advanced/36-high-frequency-concepts.html': '/curriculum/advanced/56-high-frequency-concepts.html',
    '/curriculum/advanced/37-trading-automation-apis.html': '/curriculum/advanced/57-trading-automation-apis.html',
    '/curriculum/advanced/38-portfolio-theory-advanced.html': '/curriculum/advanced/58-portfolio-theory-advanced.html',
    '/curriculum/advanced/39-performance-attribution.html': '/curriculum/advanced/59-performance-attribution.html',
    '/curriculum/advanced/40-tax-optimization.html': '/curriculum/advanced/60-tax-optimization.html',
    '/curriculum/advanced/41-professional-infrastructure.html': '/curriculum/advanced/61-professional-infrastructure.html',
    '/curriculum/advanced/42-trading-career-path.html': '/curriculum/advanced/62-trading-career-path.html',

    # Other misnamed lessons
    '/curriculum/intermediate/29-bid-ask-spread-dynamics.html': '/curriculum/intermediate/21-bid-ask-spread-dynamics.html',
    '/curriculum/beginner/01-the-liquidity-lie-enhanced.html': '/curriculum/beginner/01-the-liquidity-lie.html',
    '/curriculum/professional/76-live-trading-case-studies.html': '/curriculum/professional-capstone/76-live-trading-case-studies.html',
    '/curriculum/professional/77-building-your-edge.html': '/curriculum/professional-capstone/77-building-your-edge.html',
    '/curriculum/professional/79-institutional-trading-strategies.html': '/curriculum/professional-capstone/79-institutional-trading-strategies.html',

    # Missing intermediate lessons that don't exist
    '/curriculum/intermediate/19-execution-order-types.html': '/curriculum/intermediate/35-professional-operations.html',
    '/curriculum/intermediate/24-position-sizing-advanced.html': '/curriculum/intermediate/33-advanced-risk-management.html',
    '/curriculum/intermediate/25-trade-journaling.html': '/curriculum/intermediate/34-trade-journal-mastery.html',

    # Beginner lessons referenced incorrectly
    '/curriculum/beginner/17-time-sales-mastery.html': '/curriculum/beginner-bridge/17-time-sales-mastery.html',
    '/curriculum/beginner/04-why-market-orders-lose.html': '/curriculum/beginner/04-repaint-problem.html',

    # Intermediate-bridge references
    '/curriculum/intermediate/30-auction-theory-advanced.html': '/curriculum/advanced/50-auction-theory-advanced.html',
    '/curriculum/intermediate/34-order-book-analysis.html': '/curriculum/intermediate/22-order-book-analysis.html',
    '/curriculum/intermediate/37-session-analysis.html': '/curriculum/beginner-bridge/18-session-liquidity-advanced.html',
    '/curriculum/intermediate/35-order-flow-sequencing.html': '/curriculum/intermediate/22-order-book-analysis.html',
    '/curriculum/intermediate/35-multi-timeframe-system.html': '/curriculum/intermediate/27-multi-timeframe-mastery.html',
    '/curriculum/intermediate/43-janus-atlas-advanced.html': '/curriculum/intermediate/28-janus-atlas-advanced.html',
    '/curriculum/intermediate/48-institutional-order-flow.html': '/curriculum/advanced/48-institutional-order-flow.html',
    '/curriculum/intermediate/39-options-market-microstructure.html': '/curriculum/intermediate-bridge/39-options-market-microstructure.html',
    '/curriculum/intermediate/41-fed-policy-liquidity.html': '/curriculum/intermediate-bridge/41-fed-policy-liquidity.html',
    '/curriculum/intermediate/45-auction-theory-imbalances.html': '/curriculum/intermediate-bridge/45-auction-theory-imbalances.html',
    '/curriculum/intermediate/46-advanced-risk-management.html': '/curriculum/intermediate-bridge/46-advanced-risk-management.html',
    '/curriculum/intermediate/47-portfolio-construction-kelly.html': '/curriculum/intermediate-bridge/47-portfolio-construction-kelly.html',
    '/curriculum/intermediate/22-order-flow-analysis.html': '/curriculum/intermediate/22-order-book-analysis.html',
    '/curriculum/intermediate/29-correlation-vs-causation.html': '/curriculum/intermediate-bridge/43-cross-market-correlation.html',

    # Advanced lessons
    '/curriculum/advanced/32-backtesting-advanced.html': '/curriculum/intermediate/32-backtesting-reality.html',
    '/curriculum/advanced/31-system-development.html': '/curriculum/advanced/54-system-development.html',
    '/curriculum/advanced/57-hft-footprint-signatures.html': '/curriculum/advanced/56-high-frequency-concepts.html',
    '/curriculum/advanced/52-portfolio-swing-trading.html': '/curriculum/beginner-bridge/20-swing-trading-framework.html',
    '/curriculum/advanced/71-multi-timeframe-confluence.html': '/curriculum/advanced-mastery/71-multi-timeframe-confluence.html',
    '/curriculum/advanced/72-stress-testing-portfolios.html': '/curriculum/intermediate-bridge/46-advanced-risk-management.html',
    '/curriculum/advanced/74-trading-psychology-discipline.html': '/curriculum/advanced-mastery/73-behavioral-finance-psychology.html',

    # Beginner-bridge lessons
    '/curriculum/beginner-bridge/15-order-blocks-deep-dive.html': '/curriculum/beginner-bridge/15-liquidity-pools.html',
    '/curriculum/beginner-bridge/17-volume-profile-institutional-levels.html': '/curriculum/beginner-bridge/17-time-sales-mastery.html',
    '/curriculum/beginner-bridge/18-delta-divergence-traps.html': '/curriculum/beginner-bridge/18-session-liquidity-advanced.html',
    '/curriculum/intermediate-bridge/17-time-sales-mastery.html': '/curriculum/beginner-bridge/17-time-sales-mastery.html',
    '/curriculum/intermediate-bridge/16-market-structure-advanced.html': '/curriculum/beginner-bridge/16-market-structure-advanced.html',

    # Professional capstone
    '/curriculum/beginner-core/01-introduction.html': '/curriculum/beginner/01-the-liquidity-lie.html',
}

def fix_links_in_file(filepath):
    """Fix broken links in a single file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    fixes_made = []

    # Fix index page links
    for old_link, new_link in INDEX_PAGE_FIXES.items():
        pattern = f'href="{re.escape(old_link)}"'
        replacement = f'href="{new_link}"'
        if pattern.replace('\\', '') in content:
            content = content.replace(pattern.replace('\\', ''), replacement)
            fixes_made.append(f"{old_link} → {new_link}")

    # Fix lesson number remapping
    for old_link, new_link in LESSON_REMAPPING.items():
        pattern = f'href="{re.escape(old_link)}"'
        replacement = f'href="{new_link}"'
        if pattern.replace('\\', '') in content:
            content = content.replace(pattern.replace('\\', ''), replacement)
            fixes_made.append(f"{old_link} → {new_link}")

    # Write back if changes were made
    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        return fixes_made

    return None

def main():
    """Fix all broken links."""
    base_dir = '/home/user/signalpilot-education-hub'

    # Find all HTML files
    html_files = []
    patterns = [
        os.path.join(base_dir, '*.html'),
        os.path.join(base_dir, 'curriculum/**/*.html'),
    ]

    for pattern in patterns:
        html_files.extend(glob.glob(pattern, recursive=True))

    html_files.sort()

    print(f"Fixing broken links in {len(html_files)} HTML files...\n")

    fixed_files = 0
    total_fixes = 0

    for filepath in html_files:
        rel_path = os.path.relpath(filepath, base_dir)
        fixes = fix_links_in_file(filepath)

        if fixes:
            fixed_files += 1
            total_fixes += len(fixes)
            print(f"✅ {rel_path}")
            for fix in fixes[:5]:  # Show first 5 fixes per file
                print(f"   {fix}")
            if len(fixes) > 5:
                print(f"   ... and {len(fixes) - 5} more")

    print(f"\n{'='*80}")
    print(f"Fixed {total_fixes} links across {fixed_files} files")
    print(f"{'='*80}")

if __name__ == '__main__':
    main()
