# Plutus Flow Divergence Guide

**Complete Reference for Volume-Based Divergence Trading**

---

## What Are Plutus Flow Divergences?

Divergence occurs when price and Plutus Flow (OBV/Delta) move in opposite directions. This indicates potential reversal as underlying volume dynamics disagree with price action.

---

## Types of Divergence

### Regular Divergence (Reversal Signals)

#### Regular Bullish Divergence

```
Price:      ╲         Lower low
             ╲
Plutus OBV:  ╱        Higher low
            ╱
```

| Element | Description |
|---------|-------------|
| Price | Makes lower low |
| OBV/Delta | Makes higher low |
| Meaning | Selling pressure decreasing despite lower prices |
| Implication | Potential bullish reversal |

---

#### Regular Bearish Divergence

```
Price:      ╱         Higher high
           ╱
Plutus OBV: ╲        Lower high
             ╲
```

| Element | Description |
|---------|-------------|
| Price | Makes higher high |
| OBV/Delta | Makes lower high |
| Meaning | Buying pressure decreasing despite higher prices |
| Implication | Potential bearish reversal |

---

### Hidden Divergence (Continuation Signals)

#### Hidden Bullish Divergence

```
Price:      ╱         Higher low
           ╱
Plutus OBV: ╲        Lower low
             ╲
```

| Element | Description |
|---------|-------------|
| Price | Makes higher low (uptrend pullback) |
| OBV/Delta | Makes lower low |
| Meaning | Accumulation during pullback |
| Implication | Trend continuation higher |

---

#### Hidden Bearish Divergence

```
Price:      ╲         Lower high
             ╲
Plutus OBV:  ╱        Higher high
            ╱
```

| Element | Description |
|---------|-------------|
| Price | Makes lower high (downtrend rally) |
| OBV/Delta | Makes higher high |
| Meaning | Distribution during rally |
| Implication | Trend continuation lower |

---

## Divergence Detection Settings

### Plutus Flow Divergence Settings

| Setting | Default | Range | Purpose |
|---------|---------|-------|---------|
| Divergence Lookback | 14 | 5-30 | Bars to compare |
| Pivot Strength | 3 | 2-5 | Swing point detection |
| Show Regular | On | On/Off | Regular divergence display |
| Show Hidden | Off | On/Off | Hidden divergence display |
| Divergence Lines | On | On/Off | Draw connecting lines |

### Pivot Strength Explained

```
Pivot Strength = Bars required on each side of swing

Pivot 2: ──╲╱── (2 bars each side)
Pivot 3: ───╲╱─── (3 bars each side, more significant)
Pivot 5: ─────╲╱───── (5 bars each side, major swings only)
```

---

## Reading Divergence Signals

### Visual Indicators

| Visual | Meaning |
|--------|---------|
| 🟢 Line on chart | Bullish divergence between price points |
| 🔴 Line on chart | Bearish divergence between price points |
| ✓ Below price | Bullish divergence confirmed |
| ✗ Above price | Bearish divergence confirmed |
| Solid line | Regular divergence |
| Dashed line | Hidden divergence |

### Signal Strength Factors

| Factor | Stronger | Weaker |
|--------|----------|--------|
| Time span | 10-20 bars | 3-5 bars |
| Price movement | Large % move | Small % move |
| OBV divergence | Obvious visual | Subtle |
| Volume | High on signal bar | Low |
| Location | At key S/R | Random level |

---

## Divergence Quality Score

### Scoring Components

```
Quality Score = Sum of:
├── Time span (0-25): Longer = better
├── Magnitude (0-25): Larger divergence = better
├── Volume (0-25): Higher volume = better
└── Context (0-25): At key level = better

Total: 0-100 points
```

### Score Interpretation

| Score | Quality | Action |
|-------|---------|--------|
| 80-100 | A-grade | High conviction trade |
| 60-79 | B-grade | Standard setup |
| 40-59 | C-grade | Wait for confirmation |
| <40 | D-grade | Avoid trading |

---

## Trading Divergences Step-by-Step

### Step 1: Identify the Divergence

```
Checklist:
[ ] Clear price swing (lower low or higher high)
[ ] Clear OBV/Delta swing (opposite direction)
[ ] Minimum lookback period (10+ bars ideal)
[ ] Divergence line visible on indicator
```

### Step 2: Wait for Confirmation

**DO NOT enter on divergence alone!**

| Confirmation Type | What to Look For |
|-------------------|------------------|
| Candle pattern | Engulfing, hammer, star |
| Pentarch signal | TD (bullish) or WRN/CAP (bearish) |
| Trendline break | Price breaks micro trend |
| Volume spike | Increased volume on reversal bar |

### Step 3: Plan the Trade

```
Entry: After confirmation candle close
Stop: Beyond the divergence extreme
Target: Measured move or previous swing
R:R: Minimum 2:1
```

### Step 4: Execute & Manage

```
Entry triggered → Position sized → Stop placed
Monitor: Divergence should not break
Exit: Target hit OR stop hit OR new divergence opposite
```

---

## Divergence Timeframe Guidelines

### Timeframe Reliability

| Timeframe | Divergence Reliability | Hold Time |
|-----------|----------------------|-----------|
| 1m-5m | Low (many false signals) | Minutes |
| 15m-1H | Medium | Hours |
| 4H | High | Days |
| Daily | Very High | Weeks |
| Weekly | Highest | Months |

### Multi-Timeframe Divergence

```
Best setup: Divergence on multiple timeframes

Example:
- Daily shows bullish divergence (major)
- 4H shows bullish divergence (confirmation)
- 1H shows TD signal (entry trigger)

= High probability reversal
```

---

## Common Divergence Mistakes

### Mistake 1: Trading Too Early

```
❌ Wrong: Enter when divergence first appears
✓ Right: Wait for price confirmation
```

### Mistake 2: Ignoring Trend

```
❌ Wrong: Bullish divergence in strong downtrend = buy
✓ Right: First divergence often fails; wait for trend break
```

### Mistake 3: Cherry-Picking Pivots

```
❌ Wrong: Adjust pivot points to "find" divergence
✓ Right: Use consistent pivot settings; divergence is obvious or not
```

### Mistake 4: Wrong Timeframe

```
❌ Wrong: Trade 1m divergence for swing trade
✓ Right: Match divergence TF to trade duration
```

### Mistake 5: Single Indicator

```
❌ Wrong: Trade Plutus divergence alone
✓ Right: Combine with Pentarch, Janus, price action
```

---

## Divergence + Pentarch Integration

### Bullish Setups

| Plutus Divergence | Pentarch Signal | Strength |
|-------------------|-----------------|----------|
| Regular bullish | TD fires | Very Strong |
| Regular bullish | No signal | Moderate |
| Hidden bullish | IGN fires | Strong |
| Hidden bullish | Pullback TD | Strong |

### Bearish Setups

| Plutus Divergence | Pentarch Signal | Strength |
|-------------------|-----------------|----------|
| Regular bearish | WRN or CAP | Very Strong |
| Regular bearish | No signal | Moderate |
| Hidden bearish | BDN fires | Strong |
| Hidden bearish | Rally WRN | Strong |

---

## Divergence at Key Levels

### Best Divergence Locations

| Location | Why It Matters |
|----------|----------------|
| Major S/R level | Confluence with horizontal structure |
| Fibonacci level (61.8%, 78.6%) | Price + volume alignment |
| Moving average (50, 200) | Dynamic support/resistance |
| Trendline touch | Diagonal support/resistance |
| Previous high/low | Swing point significance |

### Location Scoring Bonus

```
Divergence at random level: Base score only
Divergence at key level: +15-20 points
Divergence at multiple confluences: +25-30 points
```

---

## Advanced: Delta Divergence

### OBV vs. Delta Divergence

| Type | Uses | Best For |
|------|------|----------|
| OBV Divergence | Cumulative volume trend | Swing trades |
| Delta Divergence | Bar-by-bar buy/sell | Day trades |
| Combined | Both disagree with price | Highest conviction |

### Delta Divergence Specifics

```
Bullish Delta Divergence:
- Price: Lower low
- Delta: Higher low (more buying pressure)

Bearish Delta Divergence:
- Price: Higher high
- Delta: Lower high (less buying pressure)
```

---

## Divergence Failure Recognition

### When Divergence Fails

| Sign | What It Means |
|------|---------------|
| Price makes new extreme | Divergence negated |
| OBV confirms price direction | False divergence |
| No confirmation after 5+ bars | Setup stale |
| Volume dies | No conviction |

### Exit Protocol for Failed Divergence

```
1. Stop loss triggered → Exit immediately
2. Price closes beyond divergence extreme → Exit
3. New divergence forms opposite direction → Re-evaluate
4. 10+ bars without follow-through → Cut position
```

---

## Quick Reference: Divergence Types

| Type | Price | Plutus | Signal |
|------|-------|--------|--------|
| Regular Bullish | Lower low | Higher low | Reversal up |
| Regular Bearish | Higher high | Lower high | Reversal down |
| Hidden Bullish | Higher low | Lower low | Continue up |
| Hidden Bearish | Lower high | Higher high | Continue down |

---

## Settings by Trading Style

### Scalping

```
Lookback: 8
Pivot Strength: 2
Show Hidden: Off
Focus: Quick reversals only
```

### Day Trading

```
Lookback: 14
Pivot Strength: 3
Show Hidden: On
Focus: Session reversals and continuations
```

### Swing Trading

```
Lookback: 20
Pivot Strength: 4
Show Hidden: On
Focus: Multi-day divergences
```

---

## Divergence Checklist

### Before Entry

- [ ] Clear divergence visible (not forced)
- [ ] Appropriate timeframe for trade duration
- [ ] At or near key level (confluence)
- [ ] Price confirmation present
- [ ] Pentarch or other indicator alignment
- [ ] Minimum 2:1 risk/reward
- [ ] Stop placement clear (beyond extreme)

### Red Flags

- [ ] Divergence in strong trend (first one often fails)
- [ ] Very short lookback (<5 bars)
- [ ] No volume on signal bar
- [ ] Against higher timeframe trend
- [ ] Multiple recent failed divergences

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
