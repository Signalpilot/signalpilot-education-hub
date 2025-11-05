#!/usr/bin/env python3
"""
Properly rewrite TL;DR summaries for all 82 lessons
Read each lesson, understand the content, write real executive summaries
"""

import re
from pathlib import Path

# Manual TL;DR summaries based on lesson analysis
TLDR_SUMMARIES = {
    "01-the-liquidity-lie.html": {
        "summary": """• Marcus Chen lost $8,200 in 8 weeks (47 trades, 34% win rate) trading textbook support/resistance
• He was right about direction 31/47 times but got stopped out before price bounced—he was the liquidity
• Smart money targets obvious stop-loss levels below support to fill large orders at better prices
• After learning liquidity sweeps, Marcus waited for sweeps THEN entered, turning losses into $18,340 profit (9 months)
• Key lesson: Support doesn't "hold"—it's broken intentionally to harvest retail stops""",
        "actions": [
            "Open your charts and identify 3 obvious support or resistance levels",
            "Watch for price to approach these levels over the next few days",
            "Note when Janus Atlas marks a sweep (price wicks through level, then reverses)",
            "Practice waiting for the sweep + reclaim before entering (not AT the level)"
        ]
    },

    "02-volume-doesnt-lie.html": {
        "summary": """• Price action alone shows WHAT happened, but volume shows WHO won (buyers vs sellers)
• Jason Kim lost $14,200 trading "perfect" chart patterns that failed because volume showed weakness
• Absorption (large volume, small price move) = institutions accumulating or defending levels
• Exhaustion (large volume, big price move) = weak hands panicking, no one absorbing
• After adding Volume Oracle, Jason's win rate jumped from 42% to 64% by filtering out weak setups""",
        "actions": [
            "Add Volume Oracle (or volume analysis) to your charts",
            "Compare volume at swing highs vs swing lows—who's more aggressive?",
            "Look for absorption at key levels (large buy volume, price barely moves = strong hands)",
            "Avoid exhaustion moves (huge volume spike, price flies = no absorption, likely reversal)"
        ]
    },

    "03-price-action-is-dead.html": {
        "summary": """• Alex Martinez lost $22,400 trading "textbook" candlestick patterns (hammers, engulfing) without volume context
• A bullish hammer with no follow-through volume is just a wick—means nothing
• Time & Sales (tape) reveals WHO is aggressive: buyers hitting asks vs sellers hitting bids
• Order flow (delta, cumulative delta) shows the real battle between bulls and bears in real-time
• After adding footprint charts + tape reading, Alex went from 38% win rate to 67% by seeing the real story""",
        "actions": [
            "Open Time & Sales feed and watch which side is aggressive (buy/sell imbalance)",
            "Compare a bullish candle WITH volume confirmation vs WITHOUT—see the difference",
            "Add footprint charts to see volume at each price level INSIDE the candle",
            "Filter out \"perfect\" patterns that have weak delta/volume—they're traps"
        ]
    },

    "04-repaint-problem.html": {
        "summary": """• Emily Watson lost $9,800 in 6 weeks (73% backtest win rate → 31% live) using repainting indicators
• Repainting = signals appear during the bar, then disappear after bar closes (making backtests fantasy)
• 80%+ of retail indicators on TradingView repaint—backtests show perfection, live trading shows disaster
• All SignalPilot indicators are non-repainting (signals final at bar close, never disappear)
• After switching to non-repainting tools, Emily's live performance matched backtests, recovered losses + $4,200 profit""",
        "actions": [
            "Test your indicators: Screenshot a signal during the bar, check if it's still there after bar close",
            "If it disappears = repainting = useless for live trading (even if backtests look amazing)",
            "Switch to non-repainting indicators (SignalPilot guaranteed non-repaint)",
            "Walk-forward test any new indicator on live data for 2-4 weeks before trusting it"
        ]
    },

    "05-rsi-extremes.html": {
        "summary": """• Sarah Kim lost $11,400 in 5 weeks fading "overbought" RSI >70 in strong uptrends (35 losing trades)
• RSI >70 in uptrends = continuation signal (momentum), not reversal—she was fighting the trend
• Regime determines interpretation: Trending markets (RSI >70 = stay long), Ranging markets (RSI >70 = potential exit)
• Harmonic Oscillator (5-indicator voting: RSI, Stoch, CCI, Williams, MFI) prevents false signals in choppy conditions
• After learning regime-based RSI, Sarah made back losses + $13,000 profit in 7 months (68% win rate)""",
        "actions": [
            "Identify market regime FIRST (trending vs ranging) before reading RSI",
            "Trending markets: RSI >70 = stay long, RSI pullback to 40-50 = add to position",
            "Ranging markets: RSI >70 = potential exit zone, RSI <30 = potential entry zone",
            "Use Harmonic Oscillator (5-indicator voting) to confirm regime changes before flipping strategy"
        ]
    },

    "06-moving-averages.html": {
        "summary": """• David Lee lost $15,600 in 8 weeks trading moving average crossovers (50/200 EMA) with 28% win rate
• MA crossovers are LAGGING—signal appears after move is 60-80% done, entries are late with terrible risk:reward
• In ranging markets, crossovers whipsaw constantly (6-8 false signals/month), causing death by 1000 cuts
• Pilot Line (adaptive trend reference in Pentarch/Omnideck) = MA done right (doesn't crossover-spam)
• After switching to Pilot Line + waiting for pullbacks, David recovered $12,200 in 6 months (58% win rate)""",
        "actions": [
            "Stop trading MA crossovers as entry signals—they're late and low R:R",
            "Use MAs as trend FILTERS only (\"Is price above/below 200 EMA?\" = trend bias)",
            "Wait for pullbacks TO the MA (retest), don't chase crossovers",
            "Try Pilot Line (in Pentarch/Omnideck) for adaptive trend reference without whipsaw spam"
        ]
    },

    "07-revenge-trading.html": {
        "summary": """• Tom Garcia lost $31,400 in 4 months (started with 1 bad day, spiraled into revenge trading loop)
• Revenge trading pattern: Lose → get angry → overtrade → bigger loss → more anger → catastrophic loss
• His \"$5,200 Tuesday\": Lost $1,800 on 2 trades, then took 14 more revenge trades, lost $3,400 more (total $5,200 in 1 day)
• Psychological triggers: Fear of being \"wrong,\" need to \"win it back,\" FOMO on \"obvious\" setups
• After implementing hard rules (max 2 losses/day, walk away after loss #2), Tom rebuilt to +$18,900 in 8 months""",
        "actions": [
            "Set a daily loss limit (e.g., -2% of account) and STOP trading when hit—no exceptions",
            "After 2 consecutive losses, close platform and walk away for rest of day",
            "Journal your emotional state BEFORE each trade—if angry/frustrated, don't trade",
            "Remove \"revenge\" opportunity by scheduling mandatory breaks after losses"
        ]
    },

    "08-confirmation-bias.html": {
        "summary": """• Rachel Moore lost $18,200 in 6 months seeing only bullish signals in a bear market (ignored 23 bearish setups)
• Confirmation bias = cherry-picking evidence that supports your existing belief, ignoring contradictory data
• She had a \"bull thesis\" on tech stocks, so she saw every dip as \"buying opportunity\"—missed obvious distribution
• Reality check: 23 perfect short setups ignored, 31 long trades forced (19 stopped out immediately)
• After forcing herself to write BOTH bull AND bear case for every trade, win rate went from 38% to 61%""",
        "actions": [
            "Before EVERY trade, write down the opposite case (bullish trade? Write the bear argument)",
            "If you can't make a strong opposite case, your bias is blinding you—skip the trade",
            "Track \"missed opportunities\" you ignored—if pattern emerges, you have confirmation bias",
            "Set a rule: Must take at least 30% of trades in opposite direction of your \"thesis\" to force objectivity"
        ]
    },

    "09-position-sizing.html": {
        "summary": """• Kevin Zhang lost $27,800 in 3 months risking too much per trade (5-8% per trade vs recommended 1-2%)
• His \"TSLA disaster\": 8% risk on \"perfect setup,\" lost, tried to recover with 12% risk, lost again → -$11,200 in 2 days
• Position sizing formula: Risk per trade = Account Size × Risk % ÷ (Entry - Stop) × Contract multiplier
• 2% risk rule: If account is $50K, risk $1,000/trade max—keeps you alive through losing streaks
• After dropping to 1.5% risk, Kevin rebuilt $19,400 in 9 months despite 48% win rate (small losses, big wins)""",
        "actions": [
            "Calculate your position size BEFORE entering: (Account × 1-2% risk) ÷ (Entry - Stop distance)",
            "Never exceed 2% risk per trade—even on \"sure things\" (they're not)",
            "If a setup requires >2% risk to hit meaningful target, SKIP IT—bad risk:reward",
            "Use a position sizing calculator or spreadsheet—don't eyeball it"
        ]
    },

    "10-stop-losses.html": {
        "summary": """• Michelle Wong lost $24,600 in 5 months using tight stops (0.3-0.5% from entry) that got hunted constantly
• 67 trades stopped out, price immediately reversed—she was providing liquidity for smart money entries
• ATR-based stops: Place stops 1.5-2× ATR below entry to account for normal volatility + sweep buffer
• \"Swing structure\" stops: Place below swing low + buffer (0.2-0.5% past obvious level where everyone else's stops are)
• After widening stops to ATR-based + structure, win rate jumped from 31% to 58%, recovered $16,800 in 6 months""",
        "actions": [
            "Measure current ATR (14-period) and place stops 1.5-2× ATR from entry (not arbitrary 0.5%)",
            "Add 0.2-0.5% buffer below swing lows to avoid obvious stop-hunt levels",
            "If required stop is too wide for 2% risk, reduce position size (don't tighten stop)",
            "Track your \"stopped then reversed\" rate—if >50%, your stops are too obvious"
        ]
    },

    "11-timeframe-illusion.html": {
        "summary": """• Carlos Rivera lost $19,400 in 4 months trading 1-min charts with 89 trades/week (whipsaw hell)
• Lower timeframes = more noise, more fake signals, more commissions, less follow-through
• His \"perfect\" 1-min breakouts failed 78% of time—confirmed on 15-min, they worked 64% of time
• Multi-timeframe confluence: Identify setup on higher TF (4H/1D), enter on lower TF (15-min) for precision
• After moving to 15-min entries + 4H bias, trades dropped to 12/week, win rate rose to 63%, profit +$14,200 in 7 months""",
        "actions": [
            "Choose ONE execution timeframe (15-min or 1H) and stick to it for 3 months",
            "Use higher timeframe (4H or 1D) for trend bias ONLY—don't enter there",
            "Require 2+ timeframes to agree before entering (e.g., 1D uptrend + 15-min breakout)",
            "Track performance by timeframe—if lower TF has <50% win rate, move up one level"
        ]
    },

    "12-paper-trading.html": {
        "summary": """• Sophia Lin jumped from paper trading (78% win rate) to live trading ($50K account) and lost $16,800 in 6 weeks (41% win rate)
• Paper trading hides: Slippage (market orders), emotional pressure (fear/greed with real money), execution delays, spread costs
• Her \"sim success\" used limit orders at perfect fills—live trading with market orders = -$45-120/trade slippage
• Emotional difference: Sim = calm, logical; Live = fear-based exits, FOMO entries, revenge trades
• After running 3-month sim with realistic slippage + starting with $5K live (not $50K), she rebuilt confidence and skills""",
        "actions": [
            "Paper trade for 90 days minimum before going live (not 2 weeks)",
            "Add realistic slippage to sim (subtract 0.1-0.2% from entries, add to exits) to mimic market orders",
            "Start live with TINY size (10-20% of intended size) to experience emotional pressure gradually",
            "Track sim vs live performance gap—if >20% difference, emotional control is the issue"
        ]
    },
}

def get_lesson_filename(filepath):
    return filepath.name

def fix_tldr(filepath):
    """Fix TL;DR for a single lesson"""
    filename = get_lesson_filename(filepath)

    if filename not in TLDR_SUMMARIES:
        print(f"  ⏭  Skipping {filename} (no manual summary yet)")
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find TL;DR section
    pattern = r'(<details[^>]*TL;DR[^>]*>.*?<summary[^>]*>.*?</summary>\s*<div[^>]*>)(.*?)(</div>\s*</details>)'
    match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)

    if not match:
        print(f"  ⚠️  No TL;DR found in {filename}")
        return False

    opening = match.group(1)
    closing = match.group(3)

    # Build new TL;DR
    summary_data = TLDR_SUMMARIES[filename]

    new_tldr = f'''
          <h4 style="margin:0 0 0.75rem 0">📋 Quick Summary</h4>
          <p style="line-height:1.8;margin:0 0 1rem 0">{summary_data["summary"]}</p>

          <h4 style="margin:1rem 0 0.75rem 0">✅ Action Steps</h4>
          <ol style="line-height:1.8;margin:0 0 0 1.5rem">
'''

    for action in summary_data["actions"]:
        new_tldr += f"            <li>{action}</li>\n"

    new_tldr += '''          </ol>

          <p style="margin-top:1rem;font-size:0.9rem;color:var(--muted)"><em>Read the full lesson for detailed case studies, trader stories, and common mistakes to avoid.</em></p>
'''

    new_section = opening + new_tldr + "        " + closing

    content = content[:match.start()] + new_section + content[match.end():]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  ✓ Fixed {filename}")
    return True

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    # Start with beginner lessons
    beginner_files = sorted(curriculum_dir.glob('beginner/*.html'))

    print(f"Fixing TL;DR summaries for {len(beginner_files)} beginner lessons...")
    print("=" * 60)

    fixed = 0
    for filepath in beginner_files:
        if fix_tldr(filepath):
            fixed += 1

    print("\n" + "=" * 60)
    print(f"✓ Fixed {fixed} TL;DR summaries")
    print(f"⏭ Skipped {len(beginner_files) - fixed} (need manual summaries)")

if __name__ == '__main__':
    main()
