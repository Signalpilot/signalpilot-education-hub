# 📈 Performance Attribution Checklist

**Lesson 39: Performance Attribution**

This checklist helps you decompose returns to understand exactly where profits came from—by strategy, asset, time period—and identify what works vs. what doesn't.

---

## 📋 Monthly Performance Attribution

### Export Trade Data
- [ ] **Pull last month's trades** - From broker or trading journal
- [ ] **Required fields:** Date, time, symbol, strategy, entry, exit, P&L, R-multiple
- [ ] **Include all trades** - Winners, losers, breakevens (complete dataset)

### Attribution by Strategy
- [ ] **Group trades by strategy** - Janus sweeps, breakouts, mean reversion, etc.
- [ ] **Calculate for each strategy:**
  - Total P&L
  - Number of trades
  - Win rate
  - Average R-multiple
  - % contribution to total profit
- [ ] **Identify top performer** - Which strategy made most profit?
- [ ] **Identify underperformer** - Which strategy dragged down results?

### Example Strategy Attribution
```
Total Return: +$13,500

By Strategy:
1. Janus Sweeps: +$7,600 (56% of profit) ← Dominant strategy
   - 45 trades, 71% WR, 3.2R avg
2. Breakouts: +$3,200 (24%)
   - 20 trades, 55% WR, 1.8R avg
3. Mean Reversion: +$2,700 (20%)
   - 18 trades, 61% WR, 2.1R avg

Action: Allocate MORE to Janus Sweeps (highest contribution)
```

### Attribution by Asset
- [ ] **Group by symbol** - SPY, QQQ, IWM, etc.
- [ ] **Calculate P&L per asset** - Which asset most profitable?
- [ ] **Check trade frequency per asset** - Are you overtrading one symbol?
- [ ] **Identify best execution** - SPY: tight spreads, best fills

### Attribution by Time Period
- [ ] **Break down by week/month** - Which periods were best/worst?
- [ ] **Identify regime patterns** - Q3 trending = best, Q4 ranging = worst
- [ ] **Check seasonality** - November-December historically stronger? Weaker?

---

## 🎯 Alpha vs. Beta Analysis

### Separate Skill from Market Exposure
- [ ] **Your total return:** +40%
- [ ] **SPY return (same period):** +20%
- [ ] **Estimate your beta:** If portfolio moves 1.5x SPY, beta = 1.5
- [ ] **Calculate expected return:** Beta × SPY return = 1.5 × 20% = 30%
- [ ] **Calculate alpha:** Your return - Expected return = 40% - 30% = +10%

### Alpha Interpretation
```
Positive alpha (+10%):
= Skill-based excess return
= Your edge generated 10% beyond market exposure

Negative alpha (-5%):
= Underperformance vs. market
= Better off holding index (SPY)

Zero alpha:
= You're just riding market beta
= No skill-based edge
```

### Risk-Adjusted Metrics
- [ ] **Sharpe Ratio:** (Return - Risk-Free Rate) / Std Dev
  - Target: > 1.5 (excellent)
  - < 1.0 = Poor risk-adjusted returns
- [ ] **Sortino Ratio:** (Return - Risk-Free) / Downside Deviation
  - Higher than Sharpe = asymmetric returns (good)
- [ ] **Information Ratio:** Alpha / Tracking Error
  - Measures consistency of alpha generation

---

## 📊 Top Winners & Losers Analysis

### Identify Top 5 Winners
- [ ] **Sort trades by P&L (largest gains)** - Top 5 trades
- [ ] **Calculate contribution:** Top 5 P&L / Total P&L × 100
- [ ] **Analyze common patterns:**
  - What setup? (Sweep, breakout, mean reversion?)
  - What timeframe? (15-min, 1H, Daily?)
  - HTF aligned? (Yes = higher win rate)
  - Time of day? (Morning, midday, afternoon?)

### Example Top 5 Winners
```
Top 5 Winners (out of 83 trades):
1. SPY sweep reversal: +$2,500 (5R) - HTF aligned, 10:45 AM entry
2. QQQ breakout: +$1,800 (4.5R) - Volume confirmation, held to 3R
3. IWM mean reversion: +$1,200 (3R) - Value area bounce
4. SPY VWAP: +$1,100 (2.8R) - Multi-TF confluence
5. QQQ Janus: +$1,000 (2.5R) - Perfect execution

Total: +$7,600 (56% of total profit!)
Lesson: Let winners run, hold for 3R+ targets
```

### Identify Bottom 5 Losers
- [ ] **Sort trades by P&L (largest losses)** - Bottom 5 trades
- [ ] **Find common mistake patterns:**
  - FOMO/chasing? (3/5 losses)
  - Ignored HTF? (4/5 losses)
  - Wrong regime? (VIX > 30, high vol)
  - Oversized? (Risked 3% instead of 2%)
  - Broke rules? (Skipped checklist)

### Example Bottom 5 Losers
```
Bottom 5 Losers:
1. IWM false breakout: -$800 (-1R) - FOMO chase
2. SPY ignored HTF: -$600 (-1R) - Daily downtrend, shorted uptrend
3. QQQ oversized: -$500 (-0.8R) - Risked 3%, violated rules
4. SPY news spike: -$450 (-1R) - VIX spike, high vol
5. IWM late entry: -$400 (-1R) - Chased after move started

Common themes: FOMO (3/5), Ignored context (3/5)
Action: Create pre-entry checklist, wait for A-grade setups
```

---

## 📊 Time-of-Day & Day-of-Week Analysis

### Performance by Time Window
- [ ] **9:30-10:30 AM:** Win rate ___%, Avg R ___
- [ ] **10:30-12:00 PM:** Win rate ___%, Avg R ___
- [ ] **12:00-2:00 PM:** Win rate ___%, Avg R ___
- [ ] **2:00-4:00 PM:** Win rate ___%, Avg R ___
- [ ] **Identify best window** - Focus trading here
- [ ] **Avoid worst window** - Lunch (12-2 PM) often choppy

### Performance by Day of Week
- [ ] **Monday:** Win rate ___%, Avg R ___
- [ ] **Tuesday:** Win rate ___%, Avg R ___
- [ ] **Wednesday:** Win rate ___%, Avg R ___
- [ ] **Thursday:** Win rate ___%, Avg R ___
- [ ] **Friday:** Win rate ___%, Avg R ___
- [ ] **Pattern:** Monday = reversal tendency? Friday = low volume?

---

## 📊 Regime-Based Performance

### Performance by Volatility Regime
- [ ] **Low vol (VIX < 15):** ___ trades, ___% WR, ___ avg R
- [ ] **Normal vol (VIX 15-25):** ___ trades, ___% WR, ___ avg R
- [ ] **High vol (VIX > 25):** ___ trades, ___% WR, ___ avg R
- [ ] **Insight:** Avoid high vol? Or reduce size?

### Performance by Trend Regime
- [ ] **Trending (ADX > 25):** ___ trades, ___% WR, ___ avg R
- [ ] **Ranging (ADX < 20):** ___ trades, ___% WR, ___ avg R
- [ ] **Insight:** Janus works best in trending? Mean reversion in ranging?

---

## 💡 Pro Tips

### Attribution Mastery
- **Review monthly, not daily** - Daily noise, monthly = signal
- **Track top 5 winners/losers** - 80% of learning comes from extremes
- **Separate alpha from beta** - Know if you're skilled or lucky
- **Regime-specific performance** - Know when your edge works best

### Common Mistakes to Avoid
- ❌ Not journaling trades (can't attribute without data)
- ❌ Celebrating profit without asking "why?" (was it skill or market?)
- ❌ Ignoring loss patterns (same mistakes repeated = fixable)
- ❌ No strategy-level breakdown (can't scale what you don't measure)

### Monthly Review Checklist
- [ ] Which strategy contributed most profit?
- [ ] Which strategy had best Sharpe ratio?
- [ ] What's the common theme in losses? (FOMO, ignored HTF, wrong regime)
- [ ] Did I follow my rules? (% of trades following checklist)
- [ ] What regime performed best? Worst?

### Action Items from Attribution
- **Scale winners:** If Janus = 56% of profit → allocate more capital
- **Kill losers:** If breakouts = negative expectancy → stop trading them
- **Fix mistakes:** If FOMO = 3/5 losses → add pre-entry checklist
- **Adapt to regime:** If high vol = poor results → pause in VIX > 30

---

## 📚 Related Resources
- **Lesson 38:** Portfolio Theory Advanced (use attribution to optimize allocations)
- **Lesson 34:** System Development (performance attribution informs system design)
- **Recommended Tools:** TradeZella, Edgewonk, TraderSync, Excel (manual)

---

**Version:** 1.0
**Last Updated:** 2025-11-02
**Difficulty:** Advanced

---

*Remember: "I made +45%" is noise. "I made +25% from Janus sweeps in trending regimes, lost -5% from breakouts in ranging regimes" is signal. Attribution = your competitive edge.*
