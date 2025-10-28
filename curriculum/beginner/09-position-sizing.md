# Position Sizing: The Only Edge That Matters

**Category:** Risk Reality | **Tier:** Beginner | **Reading Time:** 14-17 minutes

---

## The Hook

Two traders. Same strategy. Same signals. Same entries.

**Trader A:** +$50K profit after 12 months.  
**Trader B:** -$15K loss after 12 months, account blown.

The only difference? **Position sizing.**

Win rate doesn't matter. Entry precision doesn't matter. If your position sizing is wrong, you'll lose.

This article covers:
- Why fixed percentage is amateur hour
- Kelly Criterion simplified
- ATR-based position calculator
- Portfolio heat management

---

## Part 1: The Position Sizing Truth

### Win Rate Is A Vanity Metric

**Example:**

| Trader | Win Rate | Avg Win | Avg Loss | Expectancy | Result |
|--------|----------|---------|----------|------------|--------|
| A | 70% | +$100 | -$500 | -$80/trade | **LOSES** |
| B | 40% | +$300 | -$100 | +$60/trade | **WINS** |

Trader A wins MORE often but LOSES money (poor position sizing).  
Trader B wins LESS often but MAKES money (proper sizing).

### The Ruin Formula

**Gambler's Ruin:**

```
Probability of Ruin = ((1 - Edge) / (1 + Edge))^Capital

Example:
Edge: 55% win rate, 1:1 R:R = 10% edge
Capital: 100 units
Risk per trade: 10%

After 10 losses in a row (likely):
→ Capital drops 65%
→ Need +185% to recover
→ Probability of recovery: 12%

You're statistically ruined.
```

**Key Insight:** Large position sizes guarantee eventual ruin, even with edge.

---

## Part 2: Kelly Criterion

### The Formula

**Full Kelly:**

```
f* = (bp - q) / b

Where:
f* = Fraction of capital to risk
b = Odds received (Reward:Risk ratio)
p = Probability of winning
q = Probability of losing (1 - p)

Example:
Win rate: 60% (p = 0.6, q = 0.4)
R:R: 2:1 (b = 2)

f* = (2 × 0.6 - 0.4) / 2
   = (1.2 - 0.4) / 2
   = 0.4 = 40%

Kelly says risk 40% of capital per trade.
```

**WARNING: Full Kelly will bankrupt you.**

### Why Full Kelly Fails

1. **Variance:** Losing streaks happen  
2. **Overestimation:** Your edge isn't as good as you think  
3. **Drawdowns:** 40% risk = potential 80%+ drawdowns

**Real-World Application:**

```
Full Kelly: 40%
Half Kelly: 20% (safer)
Quarter Kelly: 10% (realistic for most)
```

### Practical Kelly

**Use Fractional Kelly:**

```
Conservative: 1/4 Kelly (divide result by 4)
Moderate: 1/3 Kelly
Aggressive: 1/2 Kelly

Example (from above):
Full Kelly: 40%
Quarter Kelly: 10% per trade

Much more sustainable.
```

---

## Part 3: Fixed Fractional Method

### The Standard Approach

**Risk fixed % of account per trade:**

```
Position Size = (Account × Risk%) / Stop Distance

Example:
Account: $10,000
Risk per trade: 1%
Max loss: $100

Entry: $45,000
Stop: $44,500
Stop distance: $500

Position Size = $100 / $500 = 0.2 BTC
```

**Benefits:**
- Simple calculation
- Scales with account
- Protects capital

**Drawbacks:**
- Ignores win rate & R:R
- Same size for all setups (A+ and C+ treated equally)

---

## Part 4: ATR-Based Position Sizing

### What Is ATR?

**Average True Range:** Measures volatility

```
ATR = Average of True Range over N periods

True Range = Max of:
1. Current High - Current Low
2. Abs(Current High - Previous Close)
3. Abs(Current Low - Previous Close)

Common: ATR(14) for daily charts
```

### ATR Position Sizing

**Method:**

```
Stop Distance = X × ATR (typically 1.5-2.0)

Position Size = (Account × Risk%) / Stop Distance

Example:
Account: $10,000
Risk: 1% = $100
Current Price: $45,000
ATR(14): $800

Stop Distance: 2 × ATR = $1,600

Position Size = $100 / $1,600 = 0.0625 BTC

Entry: $45,000
Stop: $45,000 - $1,600 = $43,400
```

**Benefits:**
- Adapts to volatility
- Gives market room to breathe
- Prevents tight stops in volatile markets

---

## Part 5: Setup Quality Scaling

### Not All Setups Are Equal

**Problem:** Fixed 1% risk treats perfect A+ setup same as mediocre C+ setup.

**Solution: Scale position size by quality.**

```
Setup Quality Score (1-10):

9-10 (Perfect): 2.0% risk
7-8 (Good): 1.5% risk
5-6 (Decent): 1.0% risk
3-4 (Marginal): 0.5% risk
<3 (Poor): SKIP

Quality Criteria:
- Higher TF alignment (+2)
- Multiple indicator confluence (+2)
- High volume confirmation (+2)
- Clean price structure (+2)
- Regime appropriate (+2)

Total: ___/10
```

**Example:**

```
Setup:
☑ Higher TF aligned (+2)
☑ Janus Atlas sweep (+2)
☑ Plutus Flow spike (+2)
☑ At key structure (+2)
☑ Minimal Flow trending (+2)

Score: 10/10 → Risk 2%

Account: $10,000
Risk: $200
ATR-based stop: $1,000

Position: $200 / $1,000 = 0.2 units
```

---

## Part 6: Portfolio Heat

### The Concept

**Portfolio Heat:** Total risk across all open positions.

```
Single Position: 1% risk
2 Positions: 2% combined risk
5 Positions: 5% combined risk

Max Portfolio Heat: 4-6% (typical limit)
```

### Why It Matters

**Correlation Risk:**

```
Scenario: 5 crypto positions

If crypto crashes:
- All 5 stop out simultaneously
- 1% each = 5% total loss
- If max loss is 5%, you're at limit

Better: Limit to 3-4 correlated positions max
```

### Portfolio Heat Calculator

```
Before opening new position:

Current positions:
Position 1: $_____ risk
Position 2: $_____ risk
Position 3: $_____ risk

Total Current Risk: $_____
Total Current Risk %: _____%

New Position Risk: $_____

Total After New Position: _____%

IF > 5%: Don't add position
       OR close existing position first
       OR reduce size on new position
```

---

## Part 7: The Complete System

### Step-by-Step Process

**Step 1: Calculate Base Risk**

```
Account Size: $_____
Risk Per Trade: 1-2% (base)
Max Single Trade Risk: $_____
```

**Step 2: Assess Setup Quality**

```
Quality Score: ___/10

Adjust Risk:
9-10: 2.0× base
7-8: 1.5× base
5-6: 1.0× base
<5: Skip
```

**Step 3: Calculate Stop Distance**

```
Method: ATR-based (recommended)

ATR Value: $_____
Multiplier: 1.5-2.0×
Stop Distance: $_____
```

**Step 4: Calculate Position Size**

```
Position Size = Adjusted Risk / Stop Distance

Example:
Risk: $200 (2% of $10K, quality = 10/10)
Stop Distance: $1,000 (2× ATR)

Position Size: $200 / $1,000 = 0.2 units
```

**Step 5: Check Portfolio Heat**

```
Current open risk: $_____
New position risk: $_____
Total: $_____
As % of account: _____%

IF ≤ 5%: PROCEED
IF > 5%: Reduce size OR skip
```

---

## Quick Reference

```
==================================
POSITION SIZING CALCULATOR
==================================

Account Size: $_________
Max Risk %: ____% (1-2%)
Max Risk $: $_________

SETUP QUALITY:
Score: ___/10
Risk Multiplier: ___×
Adjusted Risk $: $_________

STOP CALCULATION:
Entry: $_________
ATR: $_________
ATR Multiplier: ___× (1.5-2.0)
Stop Distance: $_________
Stop Level: $_________

POSITION SIZE:
$Risk / $Stop = _________ units

PORTFOLIO CHECK:
Current Heat: _____%
New Position: _____%
Total Heat: _____%

APPROVED: YES / NO
==================================
```

---

## Summary

**Position sizing is THE edge.**

Systems:
1. **Kelly Criterion** (fractional) - Theoretical optimum
2. **Fixed Fractional** (1-2%) - Simple, effective
3. **ATR-Based Stops** - Volatility-adjusted
4. **Quality Scaling** - Size by setup strength
5. **Portfolio Heat** - Total risk management

Get this right, everything else is details.  
Get this wrong, nothing else matters.

---

*Educational content only. Not financial advice.*

**Word Count:** ~3,000 words  
**Last Updated:** 2025-10-28
