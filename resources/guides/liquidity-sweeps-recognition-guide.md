# Liquidity Sweeps Recognition Guide

**Identifying & Trading Institutional Liquidity Grabs**

---

## Introduction

A liquidity sweep occurs when price briefly breaks a key level to trigger stops, then immediately reverses. Understanding sweeps is essential for:
- Avoiding being the liquidity (getting stopped out)
- Trading the reversal after the sweep
- Recognizing institutional activity

---

## Part 1: What Is a Liquidity Sweep?

### Definition

A liquidity sweep is a rapid price move through a key level that:
1. Triggers stop orders (creating liquidity)
2. Allows larger orders to fill
3. Reverses quickly afterward

### Why Sweeps Happen

Large players need liquidity to fill orders:
- They can't market buy 1M shares without moving price
- Stop orders = Free liquidity when triggered
- Trigger stops → Absorb that order flow → Reverse

### Sweep vs. Breakout

| Characteristic | Sweep | Real Breakout |
|----------------|-------|---------------|
| Speed through level | Very fast | Gradual or sustained |
| Time beyond level | 1-3 candles | Multiple candles close beyond |
| Volume | Spike then reversal | Sustained in break direction |
| Follow-through | None—immediate reversal | Continuation moves |
| Closes | Back inside level quickly | Beyond level repeatedly |

---

## Part 2: Types of Liquidity Sweeps

### Type 1: Support Sweep (Bullish)

```
                    │
    ───────────────────  Support level
                  ↙│↖
             Sweep │ Reclaim
                   │
```

**What happens:**
1. Price breaks below support
2. Stops trigger (selling cascade)
3. Someone absorbs all sells
4. Price reverses back above

**Trade:** Long after reclaim

---

### Type 2: Resistance Sweep (Bearish)

```
                   │
             Sweep │ Rejection
                  ↗│↘
    ───────────────────  Resistance level
                    │
```

**What happens:**
1. Price breaks above resistance
2. Stops trigger (buying cascade)
3. Someone sells into all buys
4. Price reverses back below

**Trade:** Short after rejection

---

### Type 3: Range Sweep

```
    ─────────────────── Range high
         ↑
         │ ← Sweep high
         │
         │
         │
         │ ← Sweep low
         ↓
    ─────────────────── Range low
```

**What happens:**
- Price sweeps one or both sides of a range
- Traps traders on both sides
- Real move follows

**Trade:** After second sweep or clear direction

---

### Type 4: Session Sweep

```
Previous Session:
    ─────────────────── Session high
    ████████████████
    ████████████████
    ─────────────────── Session low

Current Session:
    Sweep of prior session H/L → Reversal
```

**Common patterns:**
- London sweeps Asian high/low
- NY sweeps London high/low
- Morning sweeps overnight high/low

---

### Type 5: Equal Highs/Lows Sweep

```
    Equal highs (liquidity magnet)
    ─────┬─────┬─────┬─────
         │     │     │
         │     │     │

    Price sweeps all three equal highs at once
```

**Why it matters:**
- Equal highs/lows = obvious stop placement
- Multiple touches = more stops clustered
- High-probability sweep target

---

## Part 3: Identifying Sweep Locations

### High-Probability Sweep Zones

| Location | Liquidity Reason |
|----------|------------------|
| **Swing lows** | "Stop below the low" |
| **Swing highs** | "Stop above the high" |
| **Range boundaries** | Range traders' stops |
| **Previous day H/L** | Intraday traders' stops |
| **Previous week H/L** | Swing traders' stops |
| **Round numbers** | Psychological stops |
| **Moving averages** | MA-based stops |
| **Trendline touches** | Trend traders' stops |

### Liquidity Visibility Score

Rate each level 0-10:

| Factor | Points |
|--------|--------|
| Multiple touches | +2 |
| Visible on higher TF | +2 |
| Round number | +1 |
| Confluence with MA | +1 |
| Confluence with Fib | +1 |
| Many traders discuss level | +1 |
| Part of popular pattern | +2 |

**Score 7+:** High-probability sweep target

---

## Part 4: Real-Time Sweep Recognition

### Speed Indicators

**Fast sweep (likely reversal):**
- 1-2 bar spike through level
- Long wick / short body
- Immediate reversal bar follows

**Slow break (possible real):**
- Multiple bars probing level
- Full bodies closing beyond
- No immediate reversal

### Candle Patterns at Sweeps

**Bullish sweep patterns:**
- Hammer at sweep low
- Bullish engulfing after sweep
- Pin bar with wick below level

**Bearish sweep patterns:**
- Shooting star at sweep high
- Bearish engulfing after sweep
- Pin bar with wick above level

### Volume Signature

**Sweep volume pattern:**
```
Bar 1: Normal volume, approaches level
Bar 2: HIGH volume, sweeps through (stops triggered)
Bar 3: HIGH volume, reverses (absorption)
Bar 4: Normal volume, continues reversal direction
```

---

## Part 5: Trading Sweep Setups

### Setup 1: Wait for Reclaim

**Process:**
1. Identify key support/resistance
2. Wait for price to break through (sweep)
3. Wait for candle to close back on original side
4. Enter on close of reclaim candle
5. Stop beyond sweep extreme

**Entry example:**
```
Support at $100
Sweep low: $98.50
Reclaim candle closes: $100.20

Entry: $100.20
Stop: $98.00 (below sweep)
Target: $103.50 (2:1)
```

**Pros:** Higher probability
**Cons:** Worse entry price, may miss fast reversals

---

### Setup 2: Anticipation Entry

**Process:**
1. Identify high-probability sweep zone
2. Place limit order at/near sweep zone
3. Stop just beyond expected sweep depth
4. Target 2-3R

**Entry example:**
```
Support at $100
Expected sweep zone: $98-99
Limit buy: $98.50
Stop: $97.50
Target: $101.50 (3:1)
```

**Pros:** Best entry price
**Cons:** May not fill, sweep may go deeper

---

### Setup 3: Aggressive Reversal Entry

**Process:**
1. Watch sweep happen in real-time
2. Enter on first sign of reversal (before bar closes)
3. Very tight stop
4. Quick scale out

**Pros:** Catch exact turning point
**Cons:** Higher false signal rate

---

## Part 6: Janus Atlas Integration

### How Janus Atlas Marks Sweeps

Janus Atlas automatically detects:
- **Liquidity pools** — Where sweeps are likely
- **Sweep signals** — When price breaks a pool
- **Reclaim signals** — When price recovers

### Using Janus Atlas for Sweeps

**Identification:**
1. Enable Janus Atlas on chart
2. Note liquidity pool zones (colored areas)
3. Wait for sweep signal (icon/label)

**Confirmation:**
1. Janus marks the sweep
2. Wait for reclaim signal
3. Enter with confidence

**Stop placement:**
1. Place stop beyond Janus-marked sweep extreme
2. This is the maximum expected sweep depth

---

## Part 7: Sweep Failure Recognition

### When Sweeps Fail

Not every break-and-reverse is a tradeable sweep.

**Real break signs:**
- Multiple candles closing beyond level
- Volume sustains in break direction
- No absorption visible
- Higher TF structure supports break

### Failed Sweep Filters

| Red Flag | What It Means |
|----------|---------------|
| No immediate reversal | May be real break |
| Reversal volume low | Weak absorption |
| Higher TF trend against you | Fighting the current |
| Three+ candles beyond level | Acceptance, not sweep |

---

## Part 8: Multi-Timeframe Sweeps

### Timeframe Hierarchy

**Higher TF sweeps > Lower TF sweeps**

| Your TF | HTF Context to Check |
|---------|---------------------|
| 5m | 1H, 4H |
| 15m | 4H, Daily |
| 1H | Daily, Weekly |
| 4H | Weekly, Monthly |

### Confluence Approach

**Best trades:**
- HTF level being swept on your TF
- Example: Daily support swept on 1H chart

**Avoid:**
- LTF sweep against HTF trend
- Example: 5m support sweep when Daily is breaking down

---

## Part 9: Session-Based Sweeps

### London Open Sweeps

**Common pattern:**
- Asian session forms a range
- London sweeps Asian high OR low
- Reversal sets up trend for the day

**How to trade:**
1. Mark Asian high/low
2. Watch for sweep at London open (02:00-04:00 EST)
3. Enter on reclaim
4. Target opposite end of Asian range, then extend

### New York Open Sweeps

**Common pattern:**
- London forms a range
- NY sweeps London high OR low
- Reversal or continuation sets up

**How to trade:**
1. Mark London high/low
2. Watch for sweep at NY open (08:00-10:00 EST)
3. Enter on reclaim
4. Target previous London extreme

### Sunday Open Sweeps

**Common pattern:**
- Weekend gap creates liquidity target
- Sunday/Monday sweep of Friday levels
- Week direction often set after sweep

---

## Part 10: Sweep Checklist

### Before the Sweep

- [ ] Key level identified (high visibility)
- [ ] Liquidity likely clustered there
- [ ] Higher TF supports trade direction
- [ ] Volume/delta normal (not already breaking)

### During the Sweep

- [ ] Fast move through level (not gradual)
- [ ] Volume spikes (stops triggering)
- [ ] Immediate reversal signs
- [ ] Candle pattern forming (hammer, engulfing, etc.)

### After the Sweep

- [ ] Reclaim candle closes inside level
- [ ] Volume on reversal (absorption visible)
- [ ] Janus Atlas confirms (if using)
- [ ] Entry placed, stop beyond sweep extreme

---

## Part 11: Risk Management for Sweeps

### Stop Placement

**Rule:** Stop beyond the sweep extreme + buffer

```
Sweep low: $98.50
Buffer: $0.50
Stop: $98.00
```

### Position Sizing

Wide stops require smaller size:

```
If normal stop = $1, use 100 shares
If sweep stop = $2.50, use 40 shares
Same dollar risk, different share count
```

### Partial Exits

**Scale out strategy:**
1. Take 50% at 1R
2. Move stop to breakeven
3. Take 25% at 2R
4. Let 25% run to structure target

---

## Part 12: Asset-Specific Considerations

### Crypto

- Deeper sweeps (high volatility)
- 24/7 = Sweeps anytime
- Sunday sweeps common
- Use wider stops

### Stocks

- Session-based sweeps (open, close)
- Pre/after-market sweeps
- News catalyst sweeps
- Use standard stops

### Forex

- Session sweeps (London, NY)
- Asian range sweeps
- Sunday gap sweeps
- Round number sweeps prominent

### Futures

- Session sweeps
- Pre-market sweeps
- Overnight sweeps
- CME globex hours important

---

## Part 13: Summary

### Core Principles

1. **Sweeps are institutional activity** — Not random noise
2. **Obvious levels get swept** — High visibility = target
3. **Speed indicates intent** — Fast break, fast reversal
4. **Trade the reclaim** — Not the breakout
5. **Volume tells the story** — Spike then absorption
6. **Wide stops survive** — Beyond the sweep zone

### The Sweep Trader's Mindset

```
"That wasn't random. That was a liquidity grab."

"I don't trade breakouts. I trade the reclaim after the fake breakout."

"My stop is beyond where they'll sweep. I'm not the liquidity."
```

### Sweep Recognition Summary

```
1. IDENTIFY: Key level with clustered stops
2. WAIT: For price to sweep through
3. CONFIRM: Immediate reversal + volume
4. ENTER: On reclaim candle close
5. STOP: Beyond sweep extreme
6. TARGET: 2R minimum or structure level
```

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
