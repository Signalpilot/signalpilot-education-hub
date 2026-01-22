# Delta Analysis Deep Dive

**Mastering Buy vs. Sell Pressure**

---

## Introduction

Delta is the difference between buying volume and selling volume. It tells you who's winning the battle—buyers or sellers—regardless of what price is doing.

Price can lie. Delta tells the truth about conviction.

---

## Part 1: What Is Delta?

### The Basic Formula

```
Delta = Buying Volume - Selling Volume
```

**Positive delta:** More buying than selling
**Negative delta:** More selling than buying
**Zero delta:** Balanced (rare)

### How Buy/Sell Volume Is Determined

**Precise method (futures, Level 2):**
- Trades hitting the ask = Buying volume
- Trades hitting the bid = Selling volume

**Estimated method (most platforms):**
- Close near high = Volume attributed to buying
- Close near low = Volume attributed to selling
- Close in middle = Split

### Delta vs. Total Volume

| Metric | What It Shows |
|--------|---------------|
| Volume | Total participation |
| Delta | Direction of aggression |

**Example:**
- Volume: 1 million shares
- Delta: +200,000

**Meaning:** 600,000 bought, 400,000 sold. Net buying of 200,000.

---

## Part 2: Reading Single Bar Delta

### Delta + Price Combinations

| Price Move | Delta | Interpretation |
|------------|-------|----------------|
| Up | Positive | **Confirmed** — Buyers in control |
| Up | Negative | **Divergence** — Distribution warning |
| Down | Negative | **Confirmed** — Sellers in control |
| Down | Positive | **Divergence** — Accumulation signal |
| Flat | Positive | Hidden accumulation |
| Flat | Negative | Hidden distribution |

### Significant Delta

Not all delta is meaningful. Look for:

```
Significant delta = Delta > 2x Average Delta

If average delta is ±100,000
Then ±200,000+ is significant
```

### Delta Magnitude

| Delta Size | Interpretation |
|------------|----------------|
| 3x+ average | Very significant, likely pivot |
| 2x average | Significant, pay attention |
| 1x average | Normal, less meaningful |
| Below average | Noise, ignore |

---

## Part 3: Cumulative Volume Delta (CVD)

### What Is CVD?

CVD is the running total of delta over time:

```
Bar 1: Delta +100 → CVD: +100
Bar 2: Delta -50  → CVD: +50
Bar 3: Delta +200 → CVD: +250
Bar 4: Delta -100 → CVD: +150
Bar 5: Delta +50  → CVD: +200
```

### Reading CVD

**CVD trend tells you:**
- Rising CVD = Net buyers dominating over time
- Falling CVD = Net sellers dominating over time
- Flat CVD = Balanced, no dominant force

### CVD Visualization

```
Price going up + CVD going up:
    Price: ↗ ↗ ↗ ↗
    CVD:   ↗ ↗ ↗ ↗
    = Healthy trend, continue

Price going up + CVD going down:
    Price: ↗ ↗ ↗ ↗
    CVD:   ↘ ↘ ↘ ↘
    = WARNING: Buyers exhausting
```

---

## Part 4: Delta Divergence

### What Is Delta Divergence?

When price and CVD move in opposite directions.

### Bullish Delta Divergence

```
Price:    ╲         Lower low
           ╲
CVD:       ╱        Higher low
          ╱
```

**Meaning:** Sellers getting weaker even as price drops.
**Implication:** Potential reversal up.

### Bearish Delta Divergence

```
Price:    ╱         Higher high
         ╱
CVD:      ╲        Lower high
           ╲
```

**Meaning:** Buyers getting weaker even as price rises.
**Implication:** Potential reversal down.

---

## Part 5: Delta Patterns

### Pattern 1: Delta Confirmation

**Bullish Confirmation:**
- Price breaks resistance
- Delta surges positive
- CVD makes new high
- Trend continues

**Bearish Confirmation:**
- Price breaks support
- Delta surges negative
- CVD makes new low
- Trend continues

**How to use:** Trade in direction, confidence in continuation.

---

### Pattern 2: Delta Exhaustion

**Bullish Exhaustion:**
- Price makes higher high
- Delta is positive but weakening
- CVD barely makes new high or fails
- Warning of reversal

**Bearish Exhaustion:**
- Price makes lower low
- Delta is negative but weakening
- CVD barely makes new low or fails
- Warning of reversal

**How to use:** Tighten stops, prepare for reversal signals.

---

### Pattern 3: Absorption

**What it is:** Large delta in one direction, but price doesn't move.

**Bullish Absorption:**
```
Candle: Red or neutral
Volume: Very high
Delta: Strongly positive
Price: Doesn't drop (or barely)
```
**Meaning:** Buyers absorbing all selling pressure.
**Implication:** Price should rise.

**Bearish Absorption:**
```
Candle: Green or neutral
Volume: Very high
Delta: Strongly negative
Price: Doesn't rise (or barely)
```
**Meaning:** Sellers absorbing all buying pressure.
**Implication:** Price should fall.

---

### Pattern 4: Initiative

**What it is:** Strong delta driving price in that direction.

**Bullish Initiative:**
```
Candle: Strong green, wide range
Volume: High
Delta: Strongly positive
Price: Moves up significantly
```
**Meaning:** Aggressive buyers driving price.
**Action:** Trade with the move, pullback entry.

**Bearish Initiative:**
```
Candle: Strong red, wide range
Volume: High
Delta: Strongly negative
Price: Moves down significantly
```
**Meaning:** Aggressive sellers driving price.
**Action:** Trade with the move, pullback entry.

---

## Part 6: Delta at Key Levels

### Delta at Support

| Delta at Support | Interpretation |
|------------------|----------------|
| Strong positive | Buyers defending, support likely holds |
| Weak positive | Some defense, watch closely |
| Negative | No defense, support may break |
| Strong negative | Breakdown likely |

### Delta at Resistance

| Delta at Resistance | Interpretation |
|---------------------|----------------|
| Strong negative | Sellers defending, resistance likely holds |
| Weak negative | Some defense, watch closely |
| Positive | No defense, resistance may break |
| Strong positive | Breakout likely |

### Breakout Validation

**Real Breakout:**
- Price breaks level
- Delta confirms (positive for up break, negative for down break)
- CVD makes new extreme in direction
- Volume expanding

**Fake Breakout:**
- Price breaks level
- Delta diverges or weak
- CVD doesn't confirm
- Volume weak or contrary

---

## Part 7: Delta by Timeframe

### Timeframe Selection

| Timeframe | Delta Characteristics |
|-----------|----------------------|
| 1m | Very noisy, hard to read |
| 5m | Noisy but usable for scalping |
| 15m | Better signal quality |
| 1H | Good for day trading |
| 4H | High quality, swing trades |
| Daily | Strategic, position trades |

### Multi-Timeframe Delta

**Alignment approach:**
1. Check higher TF delta trend
2. Trade when lower TF delta aligns
3. Avoid when lower TF delta contradicts

**Example:**
- Daily CVD rising (bullish bias)
- 1H shows positive delta on pullback
- Enter long with confidence

---

## Part 8: Plutus Flow Delta Features

### How Plutus Flow Shows Delta

**Delta Histogram:**
- Green bars above zero = Positive delta
- Red bars below zero = Negative delta
- Bar height = Delta magnitude

**CVD Line:**
- Overlaid line showing cumulative delta
- Color changes with direction
- Used for divergence detection

### Plutus Flow Settings for Delta

| Setting | Purpose |
|---------|---------|
| Delta Display | Histogram or line |
| CVD Overlay | Show cumulative delta |
| Divergence Alert | Auto-detect divergences |
| Smoothing | Reduce noise |

---

## Part 9: Combining Delta with Pentarch

### Pentarch + Delta Confirmation

| Pentarch Signal | Delta Confirmation |
|-----------------|-------------------|
| **TD** | CVD divergence (higher low while price lower low) |
| **IGN** | Delta surge positive, CVD new high |
| **WRN** | CVD divergence (lower high while price higher high) |
| **CAP** | Delta exhaustion, climax print |
| **BDN** | Delta collapse negative, CVD breakdown |

### Signal Quality Enhancement

**High-quality TD:**
- TD fires on Pentarch
- CVD shows bullish divergence
- Delta positive on TD bar
- = High conviction long

**Low-quality TD:**
- TD fires on Pentarch
- CVD still making lower lows
- Delta negative on TD bar
- = Wait for more confirmation

---

## Part 10: Advanced Delta Concepts

### Delta at Different Price Levels

Using footprint or profile:

```
Price     Delta
$100.20   +50    ← Weak buying
$100.15   +200   ← Strong buying
$100.10   -100   ← Some selling
$100.05   +300   ← Very strong buying
$100.00   +500   ← Strongest buying here
```

**Interpretation:** Strong bid at $100, likely support.

### Delta Imbalance

```
Imbalance = When one side is 3x+ the other

Price    Bid Vol   Ask Vol
$100.10    50       200    ← 4:1 ask imbalance (aggressive buying)
$100.05   150        40    ← 3.75:1 bid imbalance (aggressive selling)
```

**Trading imbalances:**
- Stack of buy imbalances = Bullish
- Stack of sell imbalances = Bearish

---

## Part 11: Practical Application

### Pre-Trade Delta Check

- [ ] What is overall CVD trend?
- [ ] Is delta confirming or diverging from price?
- [ ] What was delta on recent support/resistance tests?
- [ ] Is there absorption or initiative?

### During Trade

- [ ] Is delta sustaining in my direction?
- [ ] Watch for divergence developing
- [ ] Note absorption against my position

### Exit Decisions

- [ ] Delta divergence against position = Tighten stop
- [ ] Absorption against position = Consider exit
- [ ] Delta exhaustion at target = Take profit

---

## Part 12: Common Mistakes

| Mistake | Reality |
|---------|---------|
| "Positive delta = price goes up" | Delta shows who's aggressive, not direction |
| Only looking at single bars | CVD trend matters more |
| Trading every divergence | Need price confirmation |
| Ignoring timeframe | Higher TF delta > Lower TF |
| Using delta on illiquid assets | Unreliable data |

---

## Part 13: Delta Analysis Checklist

### Trend Confirmation

- [ ] Price trending in one direction
- [ ] Delta confirming (positive for up, negative for down)
- [ ] CVD making new extremes with price
- [ ] Volume supporting

### Divergence Detection

- [ ] Price making new extreme
- [ ] CVD failing to confirm
- [ ] Look for 3+ swing points
- [ ] Wait for price reversal signal

### Absorption Identification

- [ ] High volume bar
- [ ] Delta opposite to candle color
- [ ] Price doesn't move in delta direction
- [ ] Follow-through expected

---

## Part 14: Summary

### Core Principles

1. **Delta = Buying minus Selling** — Who's aggressive
2. **CVD = Running total** — Who's winning the war
3. **Confirmation = Delta agrees with price** — Trend healthy
4. **Divergence = Delta disagrees with price** — Warning signal
5. **Absorption = Delta high, price flat** — Someone loading
6. **Higher TF CVD > Lower TF** — Big picture first

### Delta Reading Hierarchy

```
Level 1: Is delta positive or negative? (direction)
Level 2: Is delta confirming price? (trend health)
Level 3: Is CVD making new extremes? (conviction)
Level 4: Any divergence forming? (warning)
Level 5: Any absorption happening? (hidden activity)
```

### The Delta Mindset

```
"Price shows what happened. Delta shows who made it happen."

"Divergence is a warning, not a signal."

"Absorption is the smart money loading."

"Trade with CVD, not against it."
```

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
