# Breakout Trading Basics Guide

**Identifying, Validating & Trading Price Breakouts**

---

## Introduction

A breakout occurs when price moves decisively beyond a defined level of support or resistance. Breakouts can lead to significant trending moves—or fail immediately (fake breakouts).

This guide teaches you to distinguish real breakouts from traps.

---

## Part 1: What Is a Breakout?

### Definition

A breakout is price moving through and closing beyond a previously established boundary (support, resistance, trendline, or pattern).

### Types of Breakouts

| Type | Description |
|------|-------------|
| **Horizontal breakout** | Through flat S/R level |
| **Pattern breakout** | From triangle, flag, wedge, etc. |
| **Trendline breakout** | Through diagonal support/resistance |
| **Range breakout** | Beyond established trading range |
| **Volatility breakout** | Beyond Bollinger Bands, ATR bands |

---

## Part 2: The Anatomy of a Real Breakout

### What Happens During a Real Breakout

```
1. COMPRESSION: Price consolidates near the level
2. TEST: Price probes the level (may reject once)
3. BREAK: Price moves through decisively
4. VOLUME: Volume expands significantly
5. FOLLOW-THROUGH: Additional bars close beyond
6. RETEST (often): Price returns to level, holds
7. CONTINUATION: Trend continues in break direction
```

### Visual

```
                         CONTINUATION
                              ↗
                    █████████████████
                    █      ↗
              ██████████████
              █   RETEST ↗
        ██████████████████
        █     ↗ BREAK
────────█────────────────────────── RESISTANCE
        █
    ██████
    COMPRESSION
```

---

## Part 3: Fake Breakout Recognition

### What Is a Fake Breakout?

A move through a level that quickly reverses, trapping traders who entered on the "breakout."

### Fake Breakout Characteristics

| Characteristic | Fake Breakout | Real Breakout |
|----------------|---------------|---------------|
| Speed through level | Often fast | Can be gradual |
| Volume | Spike then dies | Sustained |
| Follow-through | None (1-3 bars max) | Multiple bars beyond |
| Candle close | Returns inside level | Stays beyond |
| Time beyond level | Brief | Extended |

### Common Fake Breakout Patterns

**The Trap:**
```
                ████  ← Trap buyers
                ████
    ────────────────────────── Resistance
            ████████████████████████
            ████████████████████████  ← Reversal
```

**The Sweep:**
```
    Price sweeps beyond level (triggers stops)
    Then immediately reverses
    = Liquidity grab, not real breakout
```

---

## Part 4: Breakout Validation

### Volume Confirmation

**Real breakout:**
- Volume 1.5-2x+ average on break bar
- Volume sustains on follow-through bars
- Volume declines on any retest

**Fake breakout:**
- Low volume on break
- Volume spike but then silence
- No sustained participation

### Close Confirmation

**Strong close:**
- Bar closes near the high (bullish break)
- Bar closes near the low (bearish break)
- Full body beyond the level

**Weak close:**
- Long wick back into the level
- Close back inside the level
- Indecision candle (doji, spinning top)

### Time Confirmation

**Real breakout:**
- Multiple bars close beyond level
- At least 2-3 bars for confirmation
- Price spends time in the new area

**Fake breakout:**
- Quick return (within 1-3 bars)
- "V" reversal back inside
- No acceptance in the new area

---

## Part 5: Entry Strategies

### Strategy 1: Breakout Entry

**Entry:** On close of breakout bar
**Stop:** Below breakout bar low (for long)
**Pro:** Captures the initial move
**Con:** Higher false positive rate

```
Entry: As bar closes beyond level
Stop: Below breakout candle (+ buffer)
Target: 2:1 or measured move
```

### Strategy 2: Retest Entry

**Entry:** On successful retest of broken level
**Stop:** Below the retest low
**Pro:** Better entry price, confirmed breakout
**Con:** May miss breakouts that don't retest

```
Wait for:
1. Breakout occurs
2. Price returns to level
3. Level holds as new support/resistance
4. Enter on confirmation candle
```

### Strategy 3: First Pullback Entry

**Entry:** On first pullback after breakout (not necessarily to the level)
**Stop:** Below pullback low
**Pro:** Confirms momentum, good entry
**Con:** Pullback may not come

```
Wait for:
1. Breakout occurs with volume
2. 1-3 bar pullback (shallow)
3. Continuation signal (green bar, higher low)
4. Enter on confirmation
```

---

## Part 6: Signal Pilot Integration

### Pentarch + Breakouts

| Pentarch Signal | Breakout Context |
|-----------------|------------------|
| **IGN** | Often fires on valid breakouts |
| **TD** | May fire on pullback after breakout (entry) |
| **WRN** | Breakout may be exhausting |
| **CAP** | Breakout likely to fail |
| **BDN** | Breakdown valid |

**Best confirmation:**
- Breakout occurs
- IGN fires on break bar or shortly after
- = High probability continuation

### Janus Atlas + Breakouts

| Pattern | Meaning |
|---------|---------|
| Clean break (no sweep) | Likely valid breakout |
| Sweep before break | Shakeout then real break = strong |
| Sweep after break | May be trap, wait for reclaim |

**Best setup:**
- Sweep of stops opposite to break direction
- THEN break in intended direction
- = Double confirmation

### Plutus Flow + Breakouts

| OBV Pattern | Breakout Validity |
|-------------|-------------------|
| OBV breaks out with price | Confirmed |
| OBV breaks out BEFORE price | Very strong (anticipation) |
| OBV lags or doesn't confirm | Weak, be cautious |
| OBV diverges | Likely fake breakout |

---

## Part 7: Measured Move Targets

### Pattern-Based Targets

**Horizontal breakout:**
```
Target = Breakout point + Range height
```

**Triangle breakout:**
```
Target = Breakout point + Triangle height at base
```

**Flag/Pennant breakout:**
```
Target = Breakout point + Pole height
```

### Fibonacci Extension Targets

```
Primary targets:
127.2% extension
161.8% extension
200% extension
```

### Multiple Targets Strategy

```
Target 1 (1R): Take 25-50%
Target 2 (2R): Take 25%
Target 3 (measured move): Take remaining
```

---

## Part 8: Stop Loss Placement

### Below Structure

**For bullish breakouts:**
```
Stop options:
1. Below breakout bar low
2. Below the pattern (triangle low, etc.)
3. Below the most recent swing low
4. ATR-based (1-2 ATR below entry)
```

### Volatility-Based

```
Stop = Entry - (N × ATR)

Conservative: N = 2
Normal: N = 1.5
Aggressive: N = 1
```

### Position Size Adjustment

```
If stop is wider → Reduce position size
If stop is tighter → Can use larger size

Goal: Same dollar risk regardless of stop distance
```

---

## Part 9: Breakout Quality Scorecard

### Rate Each Factor (1-10)

| Factor | Score | Weight | Weighted |
|--------|-------|--------|----------|
| Volume on break | ___/10 | 2x | ___/20 |
| Close quality | ___/10 | 2x | ___/20 |
| Prior consolidation | ___/10 | 1x | ___/10 |
| HTF trend alignment | ___/10 | 2x | ___/20 |
| Pattern clarity | ___/10 | 1x | ___/10 |
| Pentarch confirmation | ___/10 | 2x | ___/20 |
| **Total** | | | ___/100 |

### Score Interpretation

| Score | Quality | Action |
|-------|---------|--------|
| 80-100 | A-grade | Full position |
| 60-79 | B-grade | Standard position |
| 40-59 | C-grade | Reduced position or skip |
| <40 | D-grade | Avoid |

---

## Part 10: Common Breakout Mistakes

### Mistake 1: Chasing

**Problem:** Entering after extended move from breakout
**Fix:** Wait for pullback or skip the trade

### Mistake 2: No Volume Check

**Problem:** Trading breakouts without volume confirmation
**Fix:** Always check volume (minimum 1.5x average)

### Mistake 3: Against HTF Trend

**Problem:** Trading breakouts against higher timeframe trend
**Fix:** Align with HTF direction

### Mistake 4: Tight Stops

**Problem:** Stop hit by normal volatility
**Fix:** Use ATR-based stops, give room

### Mistake 5: All-In Entry

**Problem:** Full position on breakout bar
**Fix:** Scale in: 50% on break, 50% on retest

---

## Part 11: Breakout Checklist

### Pre-Breakout (Setup Phase)

- [ ] Clear level identified (multiple touches)
- [ ] Price compressed near level
- [ ] Volume declining during compression
- [ ] HTF trend supports break direction
- [ ] Room for price to run after break

### At Breakout (Validation Phase)

- [ ] Decisive move through level
- [ ] Volume 1.5x+ average
- [ ] Strong close (near high/low of bar)
- [ ] No immediate reversal
- [ ] Pentarch signal present (IGN ideal)

### Post-Breakout (Entry Phase)

- [ ] Entry strategy defined (break/retest/pullback)
- [ ] Stop placed with room
- [ ] Position sized appropriately
- [ ] Target defined (measured move or levels)

---

## Part 12: Breakout vs. Sweep Decision Tree

```
Price breaks key level
        │
        ▼
Does it close beyond level?
        │
    ┌───┴───┐
   YES      NO → Not a breakout, watch
    │
    ▼
Does volume confirm?
        │
    ┌───┴───┐
   YES      NO → Weak break, be cautious
    │
    ▼
Does next bar follow through?
        │
    ┌───┴───┐
   YES      NO → Possible sweep, wait for reclaim
    │
    ▼
Likely REAL BREAKOUT
→ Consider entry
```

---

## Part 13: Summary

### Core Breakout Principles

1. **Volume is king** — No volume, no real break
2. **Close matters** — Where the bar closes, not the wick
3. **Confirmation takes time** — Wait for follow-through
4. **Retests are gifts** — Better entry, more confirmation
5. **Fake breakouts are opportunity** — Trade the reversal

### The Breakout Trader's Mindset

```
"Is this a real break or a sweep for liquidity?"

"Volume will tell me if this is real."

"I'd rather miss a breakout than get trapped in a fake one."

"The best breakouts retest and continue."
```

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
