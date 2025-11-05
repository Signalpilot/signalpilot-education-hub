#!/usr/bin/env python3
"""
Write PROPER concept-focused TL;DRs for all 82 lessons
Focus on CONCEPTS taught, not case study summaries
"""

import re
from pathlib import Path

# Concept-focused TL;DRs for ALL 82 lessons
CONCEPT_TLDRS = {
    # BEGINNER LESSONS (1-12)
    "01-the-liquidity-lie.html": """• Liquidity is engineered, not natural—institutions target obvious stop levels to fill large orders at better prices
• Support/resistance "breaks" are intentional sweeps, not failures—they harvest retail stops before reversing
• Liquidity sweep pattern: Price wicks through level (0.3-0.8% past) → triggers stops → immediately reverses with volume
• Framework: Identify obvious levels where stops cluster → Wait for sweep → Enter on reclaim with volume spike confirmation
• Common mistake: Buying AT support with stop just below—you're the liquidity being swept
• Validation: Track "stopped then reversed" rate—if >50%, your stops are in sweep zones (move them 1.5-2% below obvious levels)
• Case study: Marcus lost $8.2K (47 trades, 34% WR) buying support; made $31.4K (125 trades, 68% WR) waiting for sweeps first""",

    "02-volume-doesnt-lie.html": """• Price shows WHAT happened, volume shows WHO won—buy/sell imbalance reveals institutional intent
• Absorption: Large volume + small price move = strong hands defending level (institutions accumulating/distributing)
• Exhaustion: Large volume + big price move = weak hands panicking, no one absorbing (reversal imminent)
• Delta analysis: Buy volume minus sell volume at each price level—positive delta at lows = accumulation
• Framework: Require volume confirmation for ALL setups—no volume spike = no trade
• Common mistake: Trading chart patterns without checking volume—85% of "perfect" patterns fail without volume confirmation
• Validation: Compare win rate with vs without volume filter—should improve 15-25%
• Case study: Jason's win rate jumped from 42% to 64% after adding Volume Oracle to filter weak setups""",

    "03-price-action-is-dead.html": """• Candlestick patterns alone are incomplete—same pattern with different order flow = opposite outcomes
• Time & Sales (tape) reveals aggressor side: buyers hitting asks (bullish) vs sellers hitting bids (bearish)
• Footprint charts show volume at each price INSIDE the candle—reveals absorption/exhaustion hidden by price action
• Order flow (delta, cumulative delta) is the real battle—positive delta at lows = buyers winning despite down candle
• Framework: Never trade patterns without order flow confirmation—bullish hammer needs buying delta at the low
• Common mistake: Trusting candlestick patterns blindly—80% fail without volume/delta confirmation
• Validation: Check delta on every "perfect" pattern—if delta contradicts pattern, skip the trade
• Case study: Alex's win rate improved from 38% to 67% by adding footprint charts + tape reading to pattern trading""",

    "04-repaint-problem.html": """• Repainting = indicator signals appear during bar, then disappear after bar closes—makes backtests fantasy
• 80%+ of retail indicators on TradingView repaint—perfect backtests, disaster live trading
• Non-repainting test: Screenshot signal during bar → check after close → if gone, it repaints
• All SignalPilot indicators are non-repainting: signals final at bar close, never disappear, backtests = live results
• Framework: ONLY use non-repainting indicators—repaint = worthless for live trading regardless of backtest
• Common mistake: Trusting backtests without verifying non-repaint—73% backtest WR becomes 31% live
• Validation: Walk-forward test on live data for 2-4 weeks before trusting any indicator
• Case study: Emily lost $9.8K in 6 weeks using repainting indicators; recovered after switching to non-repainting tools""",

    "05-rsi-extremes.html": """• RSI measures momentum, not reversal zones—RSI >70 in uptrends = continuation (stay long), not overbought
• Regime determines interpretation: Trending markets (RSI >70 = momentum confirmation) vs Ranging markets (RSI >70 = potential exit zone)
• Harmonic Oscillator (5-indicator voting: RSI, Stochastic, CCI, Williams %R, MFI) prevents false signals—4-5/5 agreement = high confidence
• Framework: Identify regime FIRST → Trending: RSI >70 stay long, pullback to 40-50 add | Ranging: RSI >70 potential exit, <30 potential entry
• Common mistake: Fading RSI extremes without checking market regime—fighting trends because "it's overbought"
• Validation: Track regime-appropriate RSI trades vs regime-inappropriate—proper regime filter improves WR 20-30%
• Case study: Sarah lost $11.4K fading RSI >70 in uptrends; made $13K back using regime-based RSI (68% WR)""",

    "06-moving-averages.html": """• Moving average crossovers are LAGGING signals—entry after 60-80% of move is done, poor risk:reward
• In ranging markets, MA crossovers whipsaw constantly—6-8 false signals per month, death by 1000 cuts
• Use MAs as trend FILTERS only (price above/below 200 EMA = bias), NOT as entry triggers
• Pilot Line (adaptive trend reference in Pentarch/Omnideck) = MA done right—no whipsaw spam, adapts to volatility
• Framework: Use higher TF MA for bias → Wait for pullback TO the MA (not crossover) → Enter on bounce with confirmation
• Common mistake: Trading crossovers as entries—late entries, tight stops, constant whipsaws in chop
• Validation: Track MA crossover trades vs pullback-to-MA trades—pullbacks should have 2-3x better R:R
• Case study: David lost $15.6K trading 50/200 EMA crossovers (28% WR); recovered $12.2K using Pilot Line + pullbacks (58% WR)""",

    "07-revenge-trading.html": """• Revenge trading = emotional loop triggered by losses: Lose → anger → overtrade → bigger loss → more anger → catastrophic loss
• Psychological triggers: Fear of being "wrong," need to "win it back," FOMO on "obvious" setups after losses
• Hard rules prevent revenge: Max 2 losses/day = stop trading (no exceptions), mandatory break after loss
• Journal emotional state BEFORE every trade—if angry/frustrated/desperate, close platform immediately
• Framework: Set daily loss limit (-2% account) → Hit limit = done for day → Close platform, walk away
• Common mistake: "I'll just make it back on the next trade"—leads to oversizing, forcing setups, ignoring rules
• Validation: Track trades taken after 2+ losses vs first 2 trades of day—post-loss trades usually have 20-40% lower WR
• Case study: Tom lost $31.4K in 4 months via revenge trading spirals; rebuilt $18.9K in 8 months with hard stop-loss rules""",

    "08-confirmation-bias.html": """• Confirmation bias = cherry-picking evidence supporting existing belief, ignoring contradictory data—blinds you to opposite setups
• Write BOTH bull AND bear case before every trade—if you can't make strong opposite argument, bias is blinding you
• Track "missed opportunities" you ignored—if pattern emerges (e.g., ignored 23 shorts, forced 31 longs), you have bias
• Set rule: Must take at least 30% of trades opposite your "thesis" to force objectivity
• Framework: Before trade → Write bear case if long, bull case if short → If opposite case is strong, skip trade
• Common mistake: Having market "thesis" that overrides price action—ignoring perfect opposite setups because "I'm bullish"
• Validation: Compare trades aligned with bias vs counter-bias trades—if counter-bias WR >50%, your bias hurts performance
• Case study: Rachel lost $18.2K seeing only bullish signals in bear market; improved from 38% to 61% WR by writing opposite case""",

    "09-position-sizing.html": """• Position sizing formula: (Account × Risk % [1-2%]) ÷ (Entry - Stop Distance) = Position Size
• 2% risk rule maximum—even on "sure things" (they're not)—keeps you alive through losing streaks
• If setup requires >2% risk for meaningful target, SKIP IT—bad risk:reward, don't tighten stop to fit
• Never increase risk to "recover" losses—revenge sizing kills accounts faster than revenge trading
• Framework: Calculate position size BEFORE entering → Never exceed 2% risk → If stop too wide, reduce size (not stop distance)
• Common mistake: Eyeballing position size or risking 5-8% "because setup is perfect"—leads to catastrophic losses
• Validation: Track max drawdown at 1% vs 2% vs 5% risk—5% risk drawdowns are 3-5x deeper and harder to recover
• Case study: Kevin lost $27.8K risking 5-8% per trade (TSLA disaster: -$11.2K in 2 days); rebuilt $19.4K at 1.5% risk (48% WR)""",

    "10-stop-losses.html": """• ATR-based stops: Place stops 1.5-2× ATR (14-period) from entry—accounts for normal volatility + sweep buffer
• Swing structure stops: Place below swing low + 0.2-0.5% buffer—avoids obvious level where everyone else's stops are
• Tight stops (0.3-0.5% from entry) get hunted—you're providing liquidity for smart money entries
• If required stop is too wide for 2% risk, reduce position size (don't tighten stop to fit)
• Framework: Measure ATR → Calculate 1.5-2× ATR from entry → Add 0.2-0.5% buffer below swing structure → That's your stop
• Common mistake: Arbitrary tight stops or stops exactly at obvious swing lows—both get swept constantly
• Validation: Track "stopped then reversed" rate—if >50%, stops too tight or too obvious (widen and add buffer)
• Case study: Michelle lost $24.6K with tight stops (67 trades stopped then reversed); recovered $16.8K using ATR-based stops (win rate 31% → 58%)""",

    "11-timeframe-illusion.html": """• Lower timeframes = more noise, more fake signals, more commissions, less follow-through—1-min charts are whipsaw hell
• Multi-timeframe confluence: Identify setup on higher TF (4H/1D for bias) → Enter on lower TF (15-min/1H) for precision
• Higher timeframe dictates trend, lower timeframe refines entry—don't trade 1-min breakouts without 4H confirmation
• Overtrading penalty: 89 trades/week on 1-min = constant commissions + slippage + emotional exhaustion
• Framework: Choose ONE execution timeframe (15-min or 1H) → Use 4H/1D for bias ONLY → Require 2+ TF agreement before entering
• Common mistake: Trading too low a timeframe for your experience—beginners on 1-min = guaranteed failure
• Validation: Track performance by timeframe—if lower TF has <50% win rate, move up one level (1-min → 5-min → 15-min)
• Case study: Carlos lost $19.4K on 1-min charts (89 trades/week, 22% WR); made $14.2K on 15-min with 4H bias (12 trades/week, 63% WR)""",

    "12-paper-trading.html": """• Paper trading hides: Slippage (market orders), emotional pressure (fear/greed with real money), execution delays, spread costs
• Sim success doesn't predict live success—78% sim WR → 41% live WR is common due to emotional pressure + slippage
• Add realistic slippage to sim: Subtract 0.1-0.2% from entries, add to exits—mimics market orders instead of perfect limit fills
• Start live with TINY size (10-20% of intended size) to experience emotional pressure gradually before scaling up
• Framework: Paper trade 90 days minimum → Add slippage to sim → Start live with mini size ($5K not $50K) → Scale up after 3 months
• Common mistake: Jumping from sim to full-size live trading—emotions destroy performance immediately
• Validation: Track sim vs live performance gap—if >20% difference, emotional control is the issue (stay small longer)
• Case study: Sophia jumped from sim (78% WR) to live $50K (lost $16.8K in 6 weeks, 41% WR); rebuilt with $5K start + realistic sim""",

    # BEGINNER-BRIDGE LESSONS (13-20)
    "13-smart-money-concepts.html": """• Smart money (institutions) operates opposite retail: Accumulate weakness (when retail panics), distribute strength (when retail FOMOs)
• Order blocks = price areas where institutions placed large orders—these become support/resistance zones on retest
• Fair value gaps (FVG) = price imbalances left by fast moves—price returns to fill these 70-80% of time before continuing
• Framework: Identify order blocks (strong move from level) → Wait for price to return to block → Enter on bounce/rejection with volume
• Common mistake: Chasing breakouts when institutions are distributing—buying strength instead of waiting for retracements
• Validation: Track trades taken AT order blocks vs chasing price—order block entries should have better R:R""",

    "14-cot-report.html": """• COT (Commitments of Traders) report shows positioning of commercials, large specs, small specs—released every Friday
• Commercials (producers/hedgers) are usually right at extremes—when they're max long/short, market often reverses
• Small speculators are usually wrong at extremes—their max long = market top, max short = market bottom
• Framework: Check COT positioning → Commercials at extreme + opposing small specs at opposite extreme = strong reversal signal
• Common mistake: Trading against commercial positioning—they have better info and deeper pockets
• Validation: Compare trades aligned with commercial positioning vs against—alignment should improve win rate""",

    "15-liquidity-pools.html": """• Liquidity pools = clusters of stop losses at obvious levels: round numbers, previous highs/lows, trendlines, support/resistance
• Institutions target these pools to fill large orders—sweep the pool, collect liquidity, reverse direction
• Double/triple liquidity pools (multiple obvious levels stacked) = highest probability sweep targets
• Framework: Identify obvious levels where retail places stops → Mark liquidity pools → Wait for sweep → Enter on reclaim
• Common mistake: Placing stops AT liquidity pool levels—you're the liquidity being harvested
• Validation: Track identified liquidity pools—do they get swept 60-70% of time? If not, you're marking wrong levels""",

    "16-market-structure-advanced.html": """• Market structure = pattern of higher highs + higher lows (uptrend) or lower highs + lower lows (downtrend)
• BOS (Break of Structure) = price breaks swing high in uptrend (or swing low in downtrend)—confirms trend continuation
• CHoCH (Change of Character) = price breaks counter-trend structure—warning of potential trend reversal (weaker than BOS)
• Framework: Mark swing highs/lows → Wait for BOS (continuation) or CHoCH (reversal warning) → Enter on pullback after break
• Common mistake: Trading against structure breaks—trying to fade BOS because "it's extended"
• Validation: BOS in direction of trend should have 65-75% follow-through rate—if lower, you're marking wrong structure""",

    "17-time-sales-mastery.html": """• Time & Sales (tape) shows every executed trade: time, price, volume, aggressor side (buy at ask vs sell at bid)
• Reading the tape: More buys at ask = bullish aggression, more sells at bid = bearish aggression
• Iceberg orders: Large volume prints at single price = institutional order slowly filled—marks key level
• Framework: Watch tape at key levels → Heavy buying at support (absorption) = bullish → Heavy selling at resistance = bearish
• Common mistake: Ignoring order flow and trading charts only—missing real-time institutional activity
• Validation: Compare trades with tape confirmation vs without—tape confirmation should improve win rate 10-15%""",

    "18-session-liquidity-advanced.html": """• Session liquidity varies: Asia session (low volume, range), London session (initial volatility), NY session (highest volume, trends)
• Asia range highs/lows = liquidity targets for London/NY sweep—70% of time, these get swept first hour of London
• NY open (9:30 AM ET) = highest liquidity, most institutional activity—best time for breakouts/trend trades
• Framework: Note Asia range → Expect London sweep of range extremes → Enter after sweep on NY open confirmation
• Common mistake: Trading Asia range breakouts—they fail 80% of time, just liquidity grabs before real move
• Validation: Track trades by session—NY trades should have highest win rate and follow-through""",

    "19-footprint-charts-advanced.html": """• Footprint charts display volume traded at each price level INSIDE each candle, split by bid/ask side
• Absorption pattern: Large buy volume at specific price, price barely moves down = strong hands defending level (bullish)
• Exhaustion pattern: Large sell volume, price drops fast = no one buying, weak hands panicking (bearish reversal coming)
• Framework: Watch footprint at key levels → Absorption = enter in that direction → Exhaustion = fade the move
• Common mistake: Trading candle patterns without checking footprint—missing absorption/exhaustion that predicts outcome
• Validation: Absorption followed by reversal should work 65-75% of time—if lower, you're misreading patterns""",

    "20-swing-trading-framework.html": """• Swing trading holds 2-7 days, targeting 3-8% moves—requires higher timeframe analysis (4H/Daily) vs intraday
• Framework: Daily trend bias → Wait for 4H pullback to support/MA → Enter on 1H confirmation candle → Hold for swing
• Position management: Wider stops (1.5-2% from entry), fewer trades (2-4/week), less screen time
• Common mistake: Using intraday tactics for swing trades—too tight stops, too much monitoring, exiting too early
• Validation: Track trades held 2-7 days vs closed same day—proper swings should have better R:R (2:1 minimum)""",

}

def create_tldr_html(concept_text):
    """Convert concept text to HTML TL;DR section"""

    # Split into bullets (lines starting with •)
    bullets = [line.strip() for line in concept_text.strip().split('\n') if line.strip().startswith('•')]

    html = '''
          <h4 style="margin:0 0 0.75rem 0">📋 Lesson Concepts</h4>
          <ul style="line-height:1.8;margin:0 0 1rem 1.5rem">
'''

    for bullet in bullets:
        # Remove the bullet point character
        text = bullet[1:].strip()
        html += f"            <li>{text}</li>\n"

    html += '''          </ul>
          <p style="margin-top:1rem;font-size:0.9rem;color:var(--muted)"><em>Read the full lesson for detailed case studies, trader stories with real P&L numbers, and step-by-step examples.</em></p>
'''

    return html

def fix_lesson_tldr(filepath):
    """Fix TL;DR for a single lesson"""
    filename = filepath.name

    if filename not in CONCEPT_TLDRS:
        print(f"  ⏭️  Skipping {filename} (TL;DR not written yet)")
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find TL;DR section
    pattern = r'(<details[^>]*>.*?<summary[^>]*>.*?TL;DR.*?</summary>\s*<div[^>]*>)(.*?)(</div>\s*</details>)'
    match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)

    if not match:
        print(f"  ⚠️  No TL;DR section in {filename}")
        return False

    opening = match.group(1)
    closing = match.group(3)

    # Build new TL;DR from concepts
    new_tldr = create_tldr_html(CONCEPT_TLDRS[filename])

    new_section = opening + new_tldr + "        " + closing

    content = content[:match.start()] + new_section + content[match.end():]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  ✅ Fixed {filename}")
    return True

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    print("=" * 70)
    print("FIXING TL;DRs - CONCEPT-FOCUSED (Not case study summaries!)")
    print("=" * 70)

    # Process beginner + beginner-bridge
    print("\n📚 BEGINNER + BRIDGE LESSONS:")
    beginner_files = sorted(curriculum_dir.glob('beginner/*.html'))
    bridge_files = sorted(curriculum_dir.glob('beginner-bridge/*.html'))

    fixed = 0
    total = 0

    for filepath in beginner_files + bridge_files:
        total += 1
        if fix_lesson_tldr(filepath):
            fixed += 1

    print(f"\n✅ Fixed {fixed}/{total} beginner lessons")

    # Summary
    print("\n" + "=" * 70)
    print(f"TOTAL: {fixed} lessons with concept-focused TL;DRs")
    print(f"REMAINING: {total - fixed} lessons need TL;DRs written")
    print("=" * 70)

if __name__ == '__main__':
    main()

    # INTERMEDIATE LESSONS (21-35)
    "21-bid-ask-spread-dynamics.html": """• Bid-ask spread = difference between highest bid and lowest ask—represents cost of immediacy for market orders
• Spread changes predict price moves: Widening = uncertainty/hidden flow, tightening = confidence/liquidity
• Spread must be <10% of stop loss distance—if spread too wide, setup isn't worth trading
• Use limit orders to save 70-85% on spread costs vs market orders—patience saves thousands
• Framework: Calculate (Spread ÷ Stop Distance) × 100 → If >10%, skip trade → Use limit orders within spread
• Common mistake: Ignoring spread costs—death by 1000 cuts ($25-45/round-trip adds up to $45K+ over months)
• Validation: Track total spread costs per month—should be <0.5% of account if using limits properly
• Case study: Nina paid $45K in spread costs over 18 weeks without tracking it; saved 85% switching to limits""",

    "22-order-book-analysis.html": """• Order book (DOM = Depth of Market) shows all pending buy/sell orders at different price levels
• Order book imbalances predict short-term moves: 70% more bids than asks at level = likely bounce
• Spoofing = fake large orders that disappear before fill—institutions manipulate book to trigger stops
• Absorption at key levels: Large orders sitting at price, absorbing aggression = strong hands defending
• Framework: Watch order book at key levels → Imbalance >60% one side = trade that direction → Cancel if fake orders disappear
• Common mistake: Trading order book without checking for spoofing—fake walls disappear, trapping you
• Validation: Track order book imbalance trades—should have 60-70% accuracy for quick scalps""",

    "23-market-making-hft.html": """• Market makers provide liquidity by posting bid/ask quotes—profit from spread, not direction
• HFT (High Frequency Trading) dominates 50-70% of volume—they frontrun orders, arbitrage spreads
• Adverse selection: When market makers REMOVE liquidity at level, it signals institutional flow coming
• Framework: When market makers pull quotes at key level → Price about to move through → Trade breakout, not reversal
• Common mistake: Buying when market makers are pulling bids—you're the exit liquidity
• Validation: Observe bid/ask depth changes at key levels—withdrawal predicts breakouts 65-75% of time""",

    "24-footprint-charts.html": """• Footprint charts show volume at EACH PRICE inside every candle, split by bid/ask
• Absorption: Large buy volume at price, small down move = institutions accumulating (bullish)
• Exhaustion: Huge sell volume, price crashes = panic, no absorption (reversal coming)
• Point of Control (POC): Price with most volume in candle—acts as magnet for retests
• Framework: Watch footprint at key levels → Absorption = enter that direction → Exhaustion = fade the move
• Common mistake: Trading candles without footprint—missing 80% of order flow story
• Validation: Absorption patterns should lead to reversals 65-75% of time at key levels""",

    "25-dark-pools.html": """• Dark pools = private exchanges for institutional block trades—hidden from public order books
• Dark pool prints = large trades executed off-exchange, reported later—reveals institutional positioning
• Above-market dark pool prints = institutions accumulating (bullish), below-market = distributing (bearish)
• Framework: Monitor dark pool prints → Cluster of large prints above price = accumulation → Trade long on retest
• Common mistake: Ignoring dark pool activity—missing institutional positioning that predicts moves
• Validation: Track dark pool print clusters—should correlate with moves 60-70% of time""",

    "26-smart-money-divergence.html": """• Smart money divergence = retail goes one way (visible order flow), institutions go opposite (dark pools, icebergs)
• Price/volume divergence: New high on declining volume = distribution (smart money exiting)
• Delta divergence: Price makes new high, delta makes lower high = buyers exhausted
• Framework: Look for divergences at extremes → Price new high + volume/delta lower high = short setup
• Common mistake: Trading price action only, ignoring volume/delta divergences—missing distribution signals
• Validation: Divergences at swing highs/lows should lead to reversals 60-70% of time""",

    "27-multi-timeframe-mastery.html": """• Multi-timeframe analysis: Higher TF for bias (Daily/4H), lower TF for entry (15-min/1H)
• Timeframe confluence: Setup aligns on 3+ timeframes = highest probability trades
• Framework: Check Daily trend → 4H structure → 1H entry trigger → All aligned = take trade
• Common mistake: Trading 1 timeframe only—missing bigger picture that invalidates setup
• Validation: Trades with 3+ TF confluence should have 15-25% higher win rate than single TF""",

    "28-janus-atlas-advanced.html": """• Janus Atlas displays 39 level types: VWAP, volume profile (POC/VAH/VAL), session levels, market structure
• Level confluence: 3+ levels at same price = high probability support/resistance
• Sweep detection: Janus marks when price wicks through level then reverses—liquidity grab confirmation
• Framework: Identify 3+ level confluence zones → Wait for sweep → Enter on reclaim with volume
• Common mistake: Trading every level—should only trade 3+ level confluences
• Validation: 3+ level confluence trades should have 65-75% win rate vs single level trades""",

    "29-plutus-flow-mastery.html": """• Plutus Flow = advanced OBV (On-Balance Volume) with trend ribbons and divergence detection
• OBV divergences: Price new high, OBV lower high = distribution (smart money selling)
• Trend ribbons: 3-EMA system shows OBV momentum—ribbon flips signal flow reversals
• Framework: Watch for OBV divergence at price extremes → Ribbon flip confirms → Enter reversal
• Common mistake: Trading OBV signals without price confirmation—need structural break too
• Validation: OBV divergences + price structure break should work 65-75% of time""",

    "30-minimal-flow-regimes.html": """• Volume Oracle (Minimal Flow) detects market regimes: Trending, Ranging, Volatile
• Regime bars color-code each candle: Green = trending up, Red = trending down, Gray = ranging
• Indicator interpretation changes by regime: RSI >70 in trend = stay long, in range = exit
• Framework: Check Volume Oracle regime → Apply regime-appropriate strategy → Don't fight the regime
• Common mistake: Using same strategy in all regimes—ranging strategies fail in trends
• Validation: Regime-appropriate trades should have 20-30% higher WR than regime-inappropriate""",

    "31-portfolio-construction.html": """• Portfolio allocation: Never risk >2% per trade, never hold >10% of account in single position
• Correlation management: Don't hold 5 tech stocks—diversify sectors to reduce correlated risk
• Position heat: Total open risk across all positions should be <10% of account
• Framework: Max 2% risk per trade → Max 5 positions open → Check correlation before adding position
• Common mistake: Overconcentration in one sector—one sector crash wipes account
• Validation: Track max drawdown with diversified vs concentrated portfolio—diversification should reduce drawdown 30-50%""",

    "32-backtesting-reality.html": """• Backtest lies: Overfitting, survivorship bias, lookahead bias, ignoring slippage/commissions
• Walk-forward testing: Train on Period 1, test on Period 2, train on Period 2, test on Period 3—prevents overfitting
• Add realistic costs: Subtract 0.1-0.2% slippage per trade + $1-5 commissions—see if strategy still works
• Framework: Walk-forward test strategy → Add slippage/commissions → If still profitable across all periods, it's valid
• Common mistake: Optimizing on full dataset then deploying—works on history, fails live
• Validation: Live results should match walk-forward test results within 10-15%""",

    "33-advanced-risk-management.html": """• Kelly Criterion: Optimal position size = (Win Rate × Avg Win - Loss Rate × Avg Loss) ÷ Avg Win
• Risk-adjusted returns: Track Sharpe ratio (return ÷ volatility)—higher is better
• Drawdown management: At -10% drawdown, reduce size 25%; at -20%, reduce 50%; at -30%, stop trading
• Framework: Calculate Kelly → Use 25-50% of Kelly (full Kelly too aggressive) → Scale down in drawdowns
• Common mistake: Fixed position sizing regardless of performance—should reduce size in drawdowns
• Validation: Track drawdown recovery time with vs without size scaling—scaling should recover 2-3x faster""",

    "34-trade-journal-mastery.html": """• Trade journal = document setup, entry, exit, emotions, mistakes—reveals patterns in losses
• Required fields: Date, symbol, setup type, entry/exit, P&L, emotional state, mistake made (if any)
• Weekly review: Analyze losing trades for patterns—same mistake 3+ times = fix that first
• Framework: Log every trade → Weekly review to find patterns → Monthly review to track progress
• Common mistake: Not journaling or only journaling wins—need to analyze losses to improve
• Validation: Traders who journal consistently improve 15-25% faster than those who don't""",

    "35-professional-operations.html": """• Professional setup: Dedicated workspace, dual monitors, reliable internet (backup connection), trading plan document
• Daily routine: Pre-market prep (30 min), trading session (2-4 hours), post-market review (20 min)
• Mental breaks: 10-min break after every 2 hours of trading—prevents fatigue mistakes
• Framework: Consistent daily routine → Pre-market levels marked → Trade only A-setups → Review every evening
• Common mistake: Trading all day without breaks—fatigue leads to mistakes in afternoon
• Validation: Track performance by time of day—should see degradation after 3-4 hours without break""",

}

def create_tldr_html(concept_text):
    """Convert concept text to HTML TL;DR section"""

    # Split into bullets (lines starting with •)
    bullets = [line.strip() for line in concept_text.strip().split('\n') if line.strip().startswith('•')]

    html = '''
          <h4 style="margin:0 0 0.75rem 0">📋 Lesson Concepts</h4>
          <ul style="line-height:1.8;margin:0 0 1rem 1.5rem">
'''

    for bullet in bullets:
        # Remove the bullet point character
        text = bullet[1:].strip()
        html += f"            <li>{text}</li>\n"

    html += '''          </ul>
          <p style="margin-top:1rem;font-size:0.9rem;color:var(--muted)"><em>Read the full lesson for detailed case studies, trader stories with real P&L numbers, and step-by-step examples.</em></p>
'''

    return html

def fix_lesson_tldr(filepath):
    """Fix TL;DR for a single lesson"""
    filename = filepath.name

    if filename not in CONCEPT_TLDRS:
        print(f"  ⏭️  Skipping {filename} (TL;DR not written yet)")
        return False

    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find TL;DR section
    pattern = r'(<details[^>]*>.*?<summary[^>]*>.*?TL;DR.*?</summary>\s*<div[^>]*>)(.*?)(</div>\s*</details>)'
    match = re.search(pattern, content, re.DOTALL | re.IGNORECASE)

    if not match:
        print(f"  ⚠️  No TL;DR section in {filename}")
        return False

    opening = match.group(1)
    closing = match.group(3)

    # Build new TL;DR from concepts
    new_tldr = create_tldr_html(CONCEPT_TLDRS[filename])

    new_section = opening + new_tldr + "        " + closing

    content = content[:match.start()] + new_section + content[match.end():]

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  ✅ Fixed {filename}")
    return True

def main():
    curriculum_dir = Path('/home/user/signalpilot-education-hub/curriculum')

    print("=" * 70)
    print("FIXING TL;DRs - CONCEPT-FOCUSED (Not case study summaries!)")
    print("=" * 70)

    # Process beginner + beginner-bridge + intermediate
    print("\n📚 BEGINNER + BRIDGE + INTERMEDIATE LESSONS:")
    beginner_files = sorted(curriculum_dir.glob('beginner/*.html'))
    bridge_files = sorted(curriculum_dir.glob('beginner-bridge/*.html'))
    intermediate_files = sorted(curriculum_dir.glob('intermediate/*.html'))

    fixed = 0
    total = 0

    for filepath in beginner_files + bridge_files + intermediate_files:
        total += 1
        if fix_lesson_tldr(filepath):
            fixed += 1

    print(f"\n✅ Fixed {fixed}/{total} lessons")

    # Summary
    print("\n" + "=" * 70)
    print(f"TOTAL: {fixed} lessons with concept-focused TL;DRs")
    print(f"REMAINING: {total - fixed} lessons need TL;DRs written")
    print("=" * 70)

if __name__ == '__main__':
    main()
