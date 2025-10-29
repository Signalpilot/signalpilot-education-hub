# Backtesting Validation Template

**From Lesson 24: Backtesting Reality - That 95% Win Rate Is Lying to You**

Use this template to validate backtest results and avoid curve-fitting disasters.

---

## ⚠️ The Brutal Truth

**If your backtest looks too good to be true, it is.**

You didn't find the holy grail. You curve-fit to noise, not signal.

---

## 📋 PRE-BACKTEST: Strategy Definition

### Strategy Name: ________________________________

### Core Thesis:
**What edge am I trying to capture?**
________________________________________________
________________________________________________

**Why should this work?** (Behavioral edge, structural inefficiency, etc.)
________________________________________________
________________________________________________

---

### Entry Rules (Must Be Objective):

1. ________________________________________________
2. ________________________________________________
3. ________________________________________________

**Any subjective discretion?** Yes / No
*If Yes, this strategy can't be backtested reliably*

---

### Exit Rules:

**Stop Loss:**
- ________________________________________________

**Take Profit:**
- Target 1: ____________ (____% of position)
- Target 2: ____________ (____% of position)
- Trailing: ____________ (____% of position)

---

### Position Sizing:
- Risk per trade: ________%
- Max portfolio heat: ________%
- Correlation adjustments: Yes / No

---

### Filters (Market Conditions):
- [ ] Regime filter (trending/ranging)
- [ ] Volatility filter (ATR threshold)
- [ ] Time-of-day filter
- [ ] Volume filter
- [ ] Other: ________________________________

---

## 🔍 BACKTEST EXECUTION

### Data Quality Check:

- [ ] **Tick data or 1-minute bars minimum** (not daily bars)
- [ ] **Includes bid-ask spread** (execution costs matter)
- [ ] **Commission + slippage modeled** ($0.50-$2.00 per side realistic)
- [ ] **Dividends/splits adjusted**
- [ ] **Survival bias avoided** (includes delisted stocks)

**Data Source:** ________________________________

**Date Range:** ____________ to ____________

**Total Trading Days:** ________

---

### Results (Raw Numbers):

**Total Trades:** ________

**Winning Trades:** ________
**Losing Trades:** ________
**Win Rate:** ________%

**Average Winner:** $________
**Average Loser:** $________
**Average R:** ________

**Total P&L:** $________
**Total R:** ________

**Largest Winner:** $________ (________ R)
**Largest Loser:** $________ (________ R)

**Max Drawdown:** ________% ($________)
**Longest Losing Streak:** ________ trades

---

### Performance Metrics:

**Sharpe Ratio:** ________
**Sortino Ratio:** ________
**Profit Factor:** ________ (Gross Profit ÷ Gross Loss)
**Expectancy:** $________ (Avg R × Win Rate - Avg R × Loss Rate)

---

## 🚩 RED FLAG DETECTOR

### Critical Questions (Be Brutally Honest):

**1. Sample Size: Is it statistically significant?**

- [ ] **<30 trades:** ❌ Not enough data, pure luck
- [ ] **30-100 trades:** ⚠️ Marginal, needs more data
- [ ] **100-300 trades:** ✅ Decent sample
- [ ] **300+ trades:** ✅ Statistically significant

**My Trade Count:** ________

**Verdict:** Pass / Fail / Needs More Data

---

**2. Sharpe Ratio: Is it realistic?**

- [ ] **>4.0:** 🚩 Almost certainly overfit
- [ ] **3.0-4.0:** 🚩 Suspiciously high, verify
- [ ] **2.0-3.0:** ⚠️ Excellent but rare, double-check
- [ ] **1.5-2.5:** ✅ Realistic for skilled trader
- [ ] **1.0-1.5:** ✅ Solid, achievable
- [ ] **<1.0:** ❌ Not worth trading

**My Sharpe:** ________

**Verdict:** Pass / Fail / Suspicious

---

**3. Parameter Optimization: Did I curve-fit?**

**Did I test multiple parameter values?** Yes / No

**If Yes:**
- Total parameters tested: ________
- Parameters selected: ________
- Selection criteria: Best P&L / Best Sharpe / Best DD / Other

🚩 **RED FLAG:** If you tested 50+ parameter combinations and picked the best one, you curve-fit.

**How I selected parameters:**
________________________________________________
________________________________________________

**Verdict:** Clean / Suspicious / Overfit

---

**4. Look-Ahead Bias: Am I cheating?**

**Do any rules use future information?**

Examples of look-ahead bias:
- [ ] Using "swing high/low" (only known AFTER the swing completes)
- [ ] Using "end of day" signals (can't trade at unknown close)
- [ ] Using repainting indicators
- [ ] Using future volatility/ATR that wasn't available at trade time

**My strategy has look-ahead bias:** Yes / No

**If Yes, where:**
________________________________________________

**Verdict:** Clean / Biased

---

**5. Out-of-Sample Testing: Did I validate on unseen data?**

**In-Sample Period:** ____________ to ____________
**Out-of-Sample Period:** ____________ to ____________

| Metric | In-Sample | Out-of-Sample | Difference |
|--------|-----------|---------------|------------|
| Win Rate | ________% | ________% | ________% |
| Avg R | ________ | ________ | ________ |
| Sharpe | ________ | ________ | ________ |
| Max DD | ________% | ________% | ________% |

**🚩 RED FLAG:** If out-of-sample results are >20% worse, strategy is overfit.

**Performance Degradation:** ________%

**Verdict:** Pass / Fail

---

**6. Walk-Forward Analysis: Is it robust over time?**

**Did you test rolling periods?** Yes / No

**If Yes, results by year/quarter:**

| Period | Trades | Win Rate | Avg R | Total R |
|--------|--------|----------|-------|---------|
| Q1 | ________ | ________% | ________ | ________ |
| Q2 | ________ | ________% | ________ | ________ |
| Q3 | ________ | ________% | ________ | ________ |
| Q4 | ________ | ________% | ________ | ________ |

**Consistency Check:**
- [ ] All periods positive R
- [ ] No single period dominates results
- [ ] Similar win rates across periods

**Verdict:** Consistent / Inconsistent

---

**7. Market Conditions: Did one regime inflate results?**

**Performance by Regime:**

| Regime | Trades | Win Rate | Avg R |
|--------|--------|----------|-------|
| Trending Up | ________ | ________% | ________ |
| Trending Down | ________ | ________% | ________ |
| Ranging | ________ | ________% | ________ |
| Volatile | ________ | ________% | ________ |

**🚩 RED FLAG:** If 80%+ of profit came from one regime that rarely occurs.

**Verdict:** Balanced / Regime-Dependent

---

**8. Cost Reality Check: Did I model slippage?**

**Modeled Costs Per Trade:**
- Commission: $________
- Slippage: $________
- Total: $________

**Realistic Costs (Manual Entry):**
- Should be $1-3 per side minimum

**Did I use realistic costs?** Yes / No

**If I removed slippage, results would:**
- Improve by: ________% ❌ (unrealistic)
- Stay similar ✅ (robust)

**Verdict:** Realistic / Optimistic

---

## ✅ VALIDATION SCORECARD

**Score each category:**

| Category | Score | Weight |
|----------|-------|--------|
| Sample Size (100+ trades) | __/5 | ×2 = __ |
| Sharpe Ratio (1.5-2.5 realistic) | __/5 | ×1 = __ |
| No Curve-Fitting | __/5 | ×2 = __ |
| No Look-Ahead Bias | __/5 | ×2 = __ |
| Out-of-Sample Validation | __/5 | ×2 = __ |
| Walk-Forward Consistency | __/5 | ×1 = __ |
| Regime Balance | __/5 | ×1 = __ |
| Realistic Costs | __/5 | ×1 = __ |

**Total Score:** ________ / 60

### Score Interpretation:

**50-60 points:** ✅ Strategy is likely valid, proceed to paper trading
**40-49 points:** ⚠️ Some concerns, address red flags before live trading
**30-39 points:** 🚩 Multiple issues, significant revision needed
**<30 points:** ❌ Overfit or biased, start over with cleaner approach

**My Score:** ________

**Decision:** Proceed / Revise / Scrap

---

## 🔄 NEXT STEPS

### If Score ≥50 (Proceed to Paper Trading):

- [ ] Paper trade for 30-60 trades minimum
- [ ] Track live vs. backtest performance
- [ ] Document any execution challenges
- [ ] Verify slippage assumptions
- [ ] Check emotional difficulty of following rules

**Paper Trading Start Date:** ____________

**Expected Completion:** ____________ (after 30+ trades)

---

### If Score 40-49 (Revise):

**Red flags identified:**
1. ________________________________________________
2. ________________________________________________
3. ________________________________________________

**Revision plan:**
1. ________________________________________________
2. ________________________________________________
3. ________________________________________________

**Re-test date:** ____________

---

### If Score <40 (Scrap or Major Overhaul):

**Major issues:**
1. ________________________________________________
2. ________________________________________________

**Core problem:** Curve-fit / Look-ahead bias / Unrealistic / Sample too small

**Lesson learned:**
________________________________________________
________________________________________________

**Next strategy idea:**
________________________________________________
________________________________________________

---

## 📊 Paper Trading Comparison

**After 30-60 paper trades:**

| Metric | Backtest | Paper Trading | Difference |
|--------|----------|---------------|------------|
| Trades | ________ | ________ | ________ |
| Win Rate | ________% | ________% | ________% |
| Avg R | ________ | ________ | ________ |
| Total R | ________ | ________ | ________ |
| Max DD | ________% | ________% | ________% |

**🚩 RED FLAGS in Paper Trading:**
- Win rate drops >15%: Strategy may not translate to live
- Avg R drops >20%: Slippage worse than expected
- Max DD increases >30%: Risk model inadequate
- Can't follow rules: Strategy too complex or emotionally difficult

**Performance Difference:** ________%

**Decision:** Go Live / More Paper Trading / Revise / Scrap

---

## 🎓 Key Principles

**1. Be Skeptical of Great Results**
- If backtest shows 70%+ win rate, assume error
- If Sharpe >3.0, verify extensively
- Best strategies are "good enough," not perfect

**2. Out-of-Sample Testing is Non-Negotiable**
- Always reserve 30% of data for validation
- Never optimize on full dataset

**3. Walk-Forward Analysis Reveals Truth**
- Test rolling periods
- Consistent performance = robust
- One great year = curve-fit

**4. Model Reality, Not Fantasy**
- Use real slippage ($1-3 per side)
- Include commission
- Test during different market conditions

**5. Paper Trade Before Live**
- 30-60 trades minimum
- Real-time execution reveals issues
- Psychology can't be backtested

---

**The goal isn't a perfect backtest. It's a robust strategy that works in real time.**

**Be honest. Be skeptical. Be thorough.**

---

© Signal Pilot Education Hub
