# Divergence Trading Guide

**Complete Framework for Price vs. Indicator Divergence**

---

## Introduction

Divergence occurs when price and an indicator move in opposite directions. It's one of the most reliable warning signals that a move may be exhausting.

This guide covers divergence identification, validation, and trading across multiple indicators.

---

## Part 1: What Is Divergence?

### Definition

Divergence is a disagreement between price action and an indicator reading. When they "diverge," it suggests the current price movement may not be sustainable.

### Why Divergence Works

**Price = What happened**
**Indicator = Momentum/conviction behind it**

When price makes new highs but momentum doesn't, fewer traders are driving the move. The move is losing steam.

---

## Part 2: Types of Divergence

### Regular Divergence (Reversal Signals)

#### Regular Bullish Divergence

```
Price:      ╲          Lower low
             ╲
Indicator:   ╱         Higher low
            ╱
```

**Meaning:** Selling pressure decreasing
**Signal:** Potential reversal up

#### Regular Bearish Divergence

```
Price:      ╱          Higher high
           ╱
Indicator:  ╲         Lower high
             ╲
```

**Meaning:** Buying pressure decreasing
**Signal:** Potential reversal down

---

### Hidden Divergence (Continuation Signals)

#### Hidden Bullish Divergence

```
Price:      ╱          Higher low (uptrend intact)
           ╱
Indicator:  ╲         Lower low
             ╲
```

**Meaning:** Pullback absorbed, buyers still present
**Signal:** Trend continuation up

#### Hidden Bearish Divergence

```
Price:      ╲          Lower high (downtrend intact)
             ╲
Indicator:   ╱         Higher high
            ╱
```

**Meaning:** Rally absorbed, sellers still present
**Signal:** Trend continuation down

---

### Summary Table

| Type | Price | Indicator | Signal |
|------|-------|-----------|--------|
| Regular Bullish | Lower low | Higher low | Reversal up |
| Regular Bearish | Higher high | Lower high | Reversal down |
| Hidden Bullish | Higher low | Lower low | Continue up |
| Hidden Bearish | Lower high | Higher high | Continue down |

---

## Part 3: Indicators for Divergence

### Most Common Divergence Indicators

| Indicator | Divergence Quality | Best For |
|-----------|-------------------|----------|
| **RSI** | Excellent | Overbought/oversold extremes |
| **MACD** | Very good | Momentum divergence |
| **Stochastic** | Good | Shorter-term divergence |
| **OBV/Plutus Flow** | Excellent | Volume-based divergence |
| **CVD (Delta)** | Very good | Order flow divergence |
| **Harmonic Oscillator** | Very good | Multi-factor momentum |

### Signal Pilot Divergence Tools

**Pentarch:**
- Not a divergence indicator directly
- But TD often appears WITH divergence
- WRN/CAP often appear WITH divergence

**Plutus Flow:**
- OBV divergence detection
- CVD (delta) divergence
- Built-in divergence alerts

**Harmonic Oscillator:**
- Vote-based momentum
- Divergence when votes decrease while price extends

---

## Part 4: Divergence Detection

### Step 1: Identify Price Swings

You need clear swing highs/lows to compare.

```
For bullish divergence:
Find at least 2 clear swing lows

For bearish divergence:
Find at least 2 clear swing highs
```

### Step 2: Compare to Indicator

Draw a line connecting the swing points on BOTH price and indicator.

```
Price:
    ────╲
         ╲────  ← Lower low

Indicator:
    ────────────  ← Higher or equal low (divergence!)
```

### Step 3: Validate the Divergence

Not all divergences are tradeable. Apply filters:

| Filter | Requirement |
|--------|-------------|
| Minimum swings | At least 2, ideally 3 |
| Time span | 10+ bars between swings |
| Indicator extreme | Should be at or near extreme (30/70+) |
| Obvious visually | If you have to squint, it's not valid |

---

## Part 5: Divergence Quality Assessment

### Strong Divergence Characteristics

| Factor | Strong | Weak |
|--------|--------|------|
| Number of swings | 3+ swings | 2 swings only |
| Time span | 20+ bars | 5-10 bars |
| Indicator level | At extremes (80+/20-) | Mid-range (40-60) |
| Trend context | Counter to extended trend | Within choppy action |
| Volume | High volume on signals | Low volume |
| Multi-indicator | Multiple indicators diverge | Single indicator |

### Divergence Quality Score

Rate each factor 1-5:

| Factor | Score | Notes |
|--------|-------|-------|
| Swing count | ___ | 2 swings = 1-2, 3+ = 4-5 |
| Time span | ___ | <10 bars = 1-2, 20+ = 4-5 |
| Indicator extreme | ___ | At 30/70 = 4-5, at 50 = 1-2 |
| Trend exhaustion | ___ | Extended trend = 4-5 |
| Volume support | ___ | High vol = 4-5 |
| **Total** | ___/25 | |

**Interpretation:**
- 20-25: High quality, trade aggressively
- 15-19: Good quality, standard trade
- 10-14: Moderate, reduce size
- <10: Weak, avoid or wait

---

## Part 6: Trading Divergence

### The Cardinal Rule

**Divergence is a WARNING, not an entry signal.**

You must wait for price confirmation before entering.

### Confirmation Methods

| Confirmation | Description |
|--------------|-------------|
| **Candle pattern** | Hammer, engulfing, star at the divergence point |
| **Trendline break** | Price breaks micro trendline |
| **Indicator cross** | RSI crosses above 30, MACD cross, etc. |
| **Pentarch signal** | TD fires (bullish) or WRN fires (bearish) |
| **Price level reclaim** | Price closes back above/below key level |

### Entry Strategy

```
1. Identify divergence
2. Wait for confirmation signal
3. Enter on confirmation close
4. Stop below divergence low (bullish) or above high (bearish)
5. Target 2R or structure level
```

---

## Part 7: Stop Loss & Targets

### Stop Placement

**For bullish divergence:**
```
Stop = Below the lowest low in the divergence pattern
Buffer = Add 0.5-1 ATR below that level
```

**For bearish divergence:**
```
Stop = Above the highest high in the divergence pattern
Buffer = Add 0.5-1 ATR above that level
```

### Target Setting

**Method 1: Fixed R:R**
```
Target = 2R or 3R from entry
```

**Method 2: Structure-Based**
```
Target = Previous swing high/low
Target = Key support/resistance level
```

**Method 3: Measured Move**
```
Target = Distance of the divergence range projected
```

---

## Part 8: Multi-Timeframe Divergence

### Why Multi-TF Matters

Divergence on higher timeframes is more significant.

| Your Trading TF | Check Divergence On |
|-----------------|---------------------|
| 5m | 15m, 1H |
| 15m | 1H, 4H |
| 1H | 4H, Daily |
| 4H | Daily, Weekly |

### Multi-TF Strategy

**Best setup:**
1. HTF shows divergence (Daily)
2. Intermediate TF shows divergence (4H)
3. Trading TF gives entry signal (1H)
4. = High conviction trade

**Example:**
- Daily RSI bearish divergence forming
- 4H MACD showing bearish divergence
- 1H: Wait for Pentarch WRN or breakdown
- = Short with confidence

---

## Part 9: Divergence Across Indicators

### RSI Divergence

**Characteristics:**
- Works best at extremes (below 30, above 70)
- 14-period standard
- Very reliable at major turning points

**Adjustment for trends:**
- In uptrends, look for divergence at higher range (50-80)
- In downtrends, look for divergence at lower range (20-50)

### MACD Divergence

**Characteristics:**
- Uses MACD histogram or signal line
- Slightly lagging but reliable
- Good for swing trading timeframes

**Best practice:**
- Compare histogram peaks, not just crosses
- Look for decreasing histogram with increasing price

### Plutus Flow (OBV/CVD) Divergence

**Characteristics:**
- Volume-based, very reliable
- Shows actual buying/selling conviction
- Often leads price

**Best practice:**
- OBV divergence is powerful at major levels
- CVD divergence shows real-time buyer/seller exhaustion

### Harmonic Oscillator Divergence

**Characteristics:**
- Multi-factor momentum
- Vote count can diverge from price
- Useful for confirmation

---

## Part 10: Common Mistakes

### Mistake 1: Trading Divergence Alone

**Problem:** Enter as soon as divergence appears
**Reality:** Divergence can persist for many bars
**Fix:** Always wait for price confirmation

### Mistake 2: Ignoring the Trend

**Problem:** Regular bullish divergence in strong downtrend
**Reality:** First divergence often fails in strong trends
**Fix:** Use hidden divergence with trend, or wait for trend break

### Mistake 3: Forcing Divergence

**Problem:** Adjusting swing points to "find" divergence
**Reality:** If it's not obvious, it's not valid
**Fix:** Divergence should be visually clear

### Mistake 4: Wrong Timeframe

**Problem:** Trading 1m divergence for a swing trade
**Reality:** Lower TF divergence is noisy
**Fix:** Match divergence TF to trade duration

### Mistake 5: Single Indicator

**Problem:** Only using one indicator for divergence
**Reality:** Multiple divergences = stronger signal
**Fix:** Confirm with 2+ indicators

---

## Part 11: Divergence + Signal Pilot

### Pentarch + Divergence

| Divergence | Pentarch Confirmation |
|------------|----------------------|
| Bullish divergence | TD fires | = High probability long |
| Bullish divergence | No signal | = Wait for confirmation |
| Bearish divergence | WRN or CAP fires | = High probability short |
| Bearish divergence | No signal | = Wait for confirmation |

### Janus Atlas + Divergence

| Divergence | Janus Confirmation |
|------------|-------------------|
| Bullish divergence | Sweep of lows | = Prime buy zone |
| Bearish divergence | Sweep of highs | = Prime sell zone |

### Plutus Flow Built-In

Plutus Flow has divergence detection:
- Automatically marks divergences
- Shows OBV vs price divergence
- Shows CVD vs price divergence
- Alert options for divergence

---

## Part 12: Divergence Checklist

### Identification Checklist

- [ ] At least 2 clear swing points identified
- [ ] Price and indicator moving in opposite directions
- [ ] Divergence is visually obvious (no squinting)
- [ ] Indicator at or near extreme levels
- [ ] 10+ bars between swing points

### Validation Checklist

- [ ] Current trend is extended (room to reverse)
- [ ] Higher timeframe doesn't contradict
- [ ] Multiple indicators showing divergence (ideal)
- [ ] Volume supports the divergence thesis

### Entry Checklist

- [ ] Price confirmation present (candle pattern, signal)
- [ ] Entry price defined
- [ ] Stop loss placed beyond divergence extreme
- [ ] Position sized appropriately
- [ ] Target defined (structure or R-based)

---

## Part 13: Summary

### Core Divergence Principles

1. **Divergence = Warning, not signal** — Wait for confirmation
2. **Quality matters** — Not all divergences are equal
3. **Higher TF = More reliable** — Daily divergence > 5m
4. **Multiple confirmations** — More indicators = stronger
5. **Trend context matters** — First divergence in trend often fails

### The Divergence Trader's Mindset

```
"Price makes a new high, but momentum doesn't. Something's wrong."

"I see divergence. Now I wait for the market to confirm it."

"Divergence is a clue, not a command."

"The best divergence setups are obvious."
```

### Quick Reference

```
REGULAR DIVERGENCE = REVERSAL WARNING
- Bullish: Lower low price, higher low indicator
- Bearish: Higher high price, lower high indicator

HIDDEN DIVERGENCE = CONTINUATION SIGNAL
- Bullish: Higher low price, lower low indicator
- Bearish: Lower high price, higher high indicator

ALWAYS WAIT FOR CONFIRMATION
```

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
