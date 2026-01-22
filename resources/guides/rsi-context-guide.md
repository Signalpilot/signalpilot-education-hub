# RSI Context Guide

**Using RSI Correctly Across Market Conditions**

---

## Introduction

The Relative Strength Index (RSI) is one of the most popular indicators—and one of the most misused.

The standard teaching—"buy oversold, sell overbought"—works sometimes and fails spectacularly other times. This guide teaches you when RSI works, when it doesn't, and how to use it properly.

---

## Part 1: RSI Fundamentals

### What RSI Actually Measures

RSI measures the speed and magnitude of recent price changes.

**Formula (simplified):**
```
RSI = 100 - (100 / (1 + RS))

Where RS = Average Gain / Average Loss over N periods
```

**Standard period:** 14

### RSI Scale

| RSI Value | Traditional Interpretation |
|-----------|---------------------------|
| 70+ | Overbought |
| 30- | Oversold |
| 50 | Neutral midpoint |

### The Problem with Traditional Interpretation

**"Overbought" doesn't mean "sell."**
**"Oversold" doesn't mean "buy."**

In strong trends, RSI can stay overbought/oversold for extended periods while price continues.

---

## Part 2: Market Regimes & RSI

### Trending Markets

In strong trends, RSI behaves differently:

**Strong Uptrend:**
- RSI oscillates between 40-80
- "Oversold" is 40-50, not 30
- RSI can stay above 70 for weeks

**Strong Downtrend:**
- RSI oscillates between 20-60
- "Overbought" is 50-60, not 70
- RSI can stay below 30 for weeks

### Ranging Markets

In sideways markets:
- RSI oscillates between 30-70 more reliably
- Extremes (30/70) are more meaningful
- Mean reversion works

### The Key Insight

**Trend strength determines RSI behavior:**
- Strong trend → RSI ranges shift
- Weak trend/range → Traditional levels work

---

## Part 3: RSI Range Shifts

### Identifying the RSI Range

**Bull Market RSI Range:**
```
       80 ── Overbought in uptrend
       70 ── Warning zone
       │
       50 ── Midpoint (often support)
       │
       40 ── Oversold in uptrend (buy zone)
       30 ── Rarely reached in uptrend
```

**Bear Market RSI Range:**
```
       70 ── Rarely reached in downtrend
       60 ── Overbought in downtrend (sell zone)
       │
       50 ── Midpoint (often resistance)
       │
       30 ── Warning zone
       20 ── Oversold in downtrend
```

### Practical Application

**In uptrend:**
- Buy when RSI pulls back to 40-50
- Don't short just because RSI hits 70
- RSI below 40 = Trend may be breaking

**In downtrend:**
- Short when RSI rallies to 50-60
- Don't buy just because RSI hits 30
- RSI above 60 = Trend may be breaking

---

## Part 4: RSI Divergence

### What Is RSI Divergence?

When price and RSI move in opposite directions.

### Regular Bullish Divergence

```
Price:    ╲         Lower low
           ╲
RSI:       ╱        Higher low
          ╱
```

**Meaning:** Momentum increasing even as price falls.
**Signal:** Potential reversal up.

### Regular Bearish Divergence

```
Price:    ╱         Higher high
         ╱
RSI:      ╲        Lower high
           ╲
```

**Meaning:** Momentum decreasing even as price rises.
**Signal:** Potential reversal down.

### Hidden Divergence (Continuation)

**Hidden Bullish:**
- Price: Higher low
- RSI: Lower low
- Signal: Trend continuation up

**Hidden Bearish:**
- Price: Lower high
- RSI: Higher high
- Signal: Trend continuation down

### Divergence Quality

| Factor | Higher Quality | Lower Quality |
|--------|---------------|---------------|
| Swing count | 3+ swings | 2 swings |
| Time span | 10+ bars | 3-5 bars |
| Extremes | At 30/70+ | At 40-60 |
| Trend context | Counter-trend | With-trend |

---

## Part 5: RSI Failure Swings

### What Is a Failure Swing?

RSI breaks a support/resistance level without price confirming.

### Bullish Failure Swing

```
RSI:
       │
   60 ─┤     ╱╲
       │    ╱  ╲
   40 ─┤   ╱    ╲──────╱
       │  ╱           ↑
   30 ─┤ ╱       Fails to break below prior low
       │
```

**Interpretation:** RSI refuses to make new low = bullish signal.

### Bearish Failure Swing

```
RSI:
   70 ─┤  ╲       Fails to break above prior high
       │   ╲           ↓
   60 ─┤    ╲    ╱╲───
       │     ╲  ╱
   40 ─┤      ╲╱
       │
```

**Interpretation:** RSI refuses to make new high = bearish signal.

### Trading Failure Swings

1. Identify the initial RSI extreme
2. Wait for pullback
3. Watch if RSI fails to make new extreme
4. Enter on the failure confirmation
5. Stop beyond recent price extreme

---

## Part 6: RSI Midline (50)

### The Importance of 50

RSI 50 is not just a number—it's a battleground.

**Above 50:** Bulls in control
**Below 50:** Bears in control
**At 50:** Neutral, decision point

### Midline as Support/Resistance

**In uptrends:**
- RSI 50 acts as support
- Pullbacks often bounce off 50
- Break below 50 = Warning

**In downtrends:**
- RSI 50 acts as resistance
- Rallies often reject at 50
- Break above 50 = Warning

### Trading the Midline

**Bullish setup:**
1. Uptrend established
2. RSI pulls back to 50
3. RSI bounces from 50
4. Enter long
5. Stop if RSI closes below 45

**Bearish setup:**
1. Downtrend established
2. RSI rallies to 50
3. RSI rejects from 50
4. Enter short
5. Stop if RSI closes above 55

---

## Part 7: Multi-Timeframe RSI

### Why Multi-TF Matters

Lower TF RSI can be noisy. Higher TF RSI provides context.

### Alignment Strategy

**Best signals occur when:**
- Higher TF RSI supports direction
- Lower TF RSI gives entry

**Example:**
- Daily RSI: Above 50, rising (bullish bias)
- 4H RSI: Pulls back to 40
- 1H RSI: Shows bullish divergence
- = Strong buy signal

### Avoiding Conflicts

**Avoid:**
- Daily RSI overbought + trying to buy 1H oversold
- Daily RSI oversold + trying to short 1H overbought

---

## Part 8: RSI with Other Indicators

### RSI + Pentarch

| Pentarch Signal | RSI Confirmation |
|-----------------|------------------|
| TD | RSI oversold (30-40) or bullish divergence |
| IGN | RSI crossing above 50 |
| WRN | RSI overbought (60-70) or bearish divergence |
| CAP | RSI extremely overbought (80+) |
| BDN | RSI crossing below 50 |

### RSI + Price Action

| Price Pattern | RSI Confirmation |
|---------------|------------------|
| Double bottom | RSI bullish divergence |
| Double top | RSI bearish divergence |
| Breakout | RSI above 50, preferably 60+ |
| Breakdown | RSI below 50, preferably 40- |

### RSI + Volume

| RSI Pattern | Volume Confirmation |
|-------------|---------------------|
| RSI at extreme | High volume = valid signal |
| RSI divergence | Volume supporting reversal |
| RSI at 50 | Watch for volume on break |

---

## Part 9: RSI Settings

### Standard Settings

| Setting | Default | Alternative Uses |
|---------|---------|------------------|
| Period | 14 | 7-21 range |
| Overbought | 70 | 80 for strong trends |
| Oversold | 30 | 20 for strong trends |

### Adjusting for Timeframe

| Timeframe | RSI Period | Levels |
|-----------|------------|--------|
| 1m-5m | 9-10 | 80/20 |
| 15m-1H | 14 | 70/30 |
| 4H-Daily | 14-21 | 70/30 |
| Weekly+ | 14 | 70/30 |

### Adjusting for Volatility

| Volatility | RSI Period | Notes |
|------------|------------|-------|
| High (crypto) | 10-12 | More responsive |
| Normal | 14 | Standard |
| Low | 16-21 | Smoother |

---

## Part 10: Common RSI Mistakes

### Mistake 1: Shorting Overbought

**The trap:**
```
"RSI is at 75, I should short."
RSI stays at 70-80 for weeks as price doubles.
```

**The fix:**
- In uptrends, RSI 70 is not a short signal
- Wait for bearish divergence or trend break
- Or use RSI 80 pullback to enter long

---

### Mistake 2: Buying Oversold in Downtrend

**The trap:**
```
"RSI is at 25, must be a bottom."
RSI stays at 20-30 for weeks as price halves.
```

**The fix:**
- In downtrends, RSI 30 is not a buy signal
- Wait for bullish divergence or trend break
- Or use RSI 20 bounce to enter short

---

### Mistake 3: Ignoring Trend Context

**The trap:**
- Using 30/70 in all conditions
- Ignoring that ranges shift with trend

**The fix:**
- Identify the trend first
- Adjust RSI interpretation accordingly
- 40-80 range for uptrends, 20-60 for downtrends

---

### Mistake 4: Trading Every Divergence

**The trap:**
- Divergence appears, immediately trade
- Price continues against you

**The fix:**
- Divergence is a warning, not a signal
- Wait for price confirmation
- Use other indicators for confluence

---

## Part 11: RSI Decision Tree

### Step 1: Identify the Trend

```
Is price above 50-period MA and making HH/HL?
→ Yes: Uptrend (use bullish RSI rules)
→ No: Continue to Step 1b

Is price below 50-period MA and making LH/LL?
→ Yes: Downtrend (use bearish RSI rules)
→ No: Range (use traditional 30/70)
```

### Step 2: Apply Regime-Appropriate Rules

**Uptrend:**
- Buy at RSI 40-50 (support zone)
- Take profit at RSI 70-80
- RSI below 40 = Trend may be ending

**Downtrend:**
- Short at RSI 50-60 (resistance zone)
- Take profit at RSI 20-30
- RSI above 60 = Trend may be ending

**Range:**
- Buy at RSI 30 with confirmation
- Sell at RSI 70 with confirmation
- Look for mean reversion

---

## Part 12: RSI Checklist

### Before Trading RSI

- [ ] What is the trend? (Up/Down/Range)
- [ ] What is the appropriate RSI range for this trend?
- [ ] Is RSI at an extreme for this regime?
- [ ] Any divergence present?
- [ ] What does higher TF RSI show?

### At Entry

- [ ] RSI supports the trade direction
- [ ] Price confirmation present
- [ ] Other indicators align
- [ ] Position sized appropriately

### During Trade

- [ ] Watch for RSI divergence against position
- [ ] Note RSI midline (50) reactions
- [ ] Monitor higher TF RSI trend

---

## Part 13: Summary

### Core Principles

1. **Context determines interpretation** — Trend regime matters
2. **Ranges shift with trends** — 40-80 bull, 20-60 bear
3. **50 is a key level** — Support in uptrend, resistance in down
4. **Divergence is a warning** — Not a trading signal alone
5. **Multi-TF adds clarity** — Higher TF provides bias
6. **Overbought ≠ sell** — Oversold ≠ buy

### The RSI Mindset

```
Old: "RSI 30 = Buy"
New: "RSI 30 in downtrend = Not a buy"

Old: "RSI 70 = Sell"
New: "RSI 70 in uptrend = Might go higher"

Old: "Divergence = Trade"
New: "Divergence = Get ready, wait for confirmation"
```

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
