# Volume Analysis Deep Dive

**Understanding What Price Can't Tell You**

---

## Introduction

Price is what the market did. Volume is *why* it happened and *who* did it.

Most traders watch price obsessively while ignoring volume—the single most reliable indicator of conviction behind a move. This guide will teach you to read volume like a professional.

---

## Part 1: Volume Fundamentals

### What Volume Actually Represents

Volume counts the number of shares, contracts, or coins that changed hands during a period. But here's what matters:

| Volume Event | What It Really Means |
|--------------|---------------------|
| High volume + price up | Strong buying conviction |
| High volume + price down | Strong selling conviction |
| Low volume + price up | Weak rally, likely to fail |
| Low volume + price down | Weak selloff, likely to reverse |
| High volume + no price movement | Absorption happening (important!) |

### The Volume-Price Relationship

```
HEALTHY TREND:
Volume rises with price → Confirms trend
Volume falls on pullbacks → Confirms healthy consolidation

UNHEALTHY TREND:
Volume falls with rising price → Warning sign
Volume rises on pullbacks → Trend may be reversing
```

---

## Part 2: Volume Bar Analysis

### Reading Individual Volume Bars

Every volume bar tells a story:

**Bar Height = Participation Level**
- Tall bar: Many participants active
- Short bar: Few participants active

**Bar Context = Meaning**
- Tall bar at breakout: Conviction
- Tall bar at top: Potential climax
- Short bar at support test: Weak test

### Relative Volume

Absolute volume means nothing. Relative volume is everything.

```
Relative Volume = Current Bar Volume / Average Volume

RV > 1.5x = High volume (significant)
RV 0.7-1.5x = Normal volume
RV < 0.7x = Low volume (insignificant)
```

---

## Part 3: Volume Patterns

### Pattern 1: Volume Climax

**What it looks like:**
```
                     ████
                     ████
           ██        ████
    ██     ██   ██   ████
    ██  ██ ██   ██   ████
─────────────────────────────
                  ↑
             Volume spike
```

**What it means:**
- Extreme participation (often 2-3x average)
- Usually marks exhaustion
- Often precedes reversal or consolidation

**How to trade it:**
- Volume climax at resistance → Watch for reversal
- Volume climax at breakout → Wait for pullback entry
- Volume climax at bottom → Capitulation, potential reversal

---

### Pattern 2: Declining Volume in Trend

**What it looks like:**
```
Price: ↗ ↗ ↗ ↗ ↗ (rising)

Volume:
    ████
    ████  ███
    ████  ███  ██
    ████  ███  ██  █
─────────────────────────
         Declining
```

**What it means:**
- Fewer participants buying each rally
- Trend is weakening
- Reversal or consolidation approaching

**How to trade it:**
- Tighten stops
- Take partial profits
- Watch for reversal signals (WRN, CAP)

---

### Pattern 3: Volume Dry-Up

**What it looks like:**
```
Volume:
    ████
    ████
    ████
    ████
    ████  ██  █  ·  ·  ·
───────────────────────────
              ↑
         Very low volume
```

**What it means:**
- Nobody trading
- Often before explosive move
- Compression before expansion

**How to trade it:**
- Prepare for breakout
- Watch for volume expansion
- Don't trade the quiet period

---

### Pattern 4: Volume Expansion on Breakout

**What it looks like:**
```
                           ████████
                           ████████
                      ████ ████████
    ────────────────── RESISTANCE ────
         ██   ██   ██
    ██   ██   ██   ██
─────────────────────────────────────────
                   ↑
              Breakout bar
```

**What it means:**
- Real breakout (volume confirms)
- Many new participants entering
- Trend likely to continue

**How to trade it:**
- Enter on breakout or retest
- Stop below breakout candle
- Volume should sustain on follow-through

---

## Part 4: Buy Volume vs. Sell Volume (Delta)

### What Is Delta?

Delta = Buy Volume - Sell Volume

```
Positive delta: More buying than selling
Negative delta: More selling than buying
Zero delta: Balanced (indecision)
```

### How Delta Is Calculated

On most platforms, delta is estimated from price action:
- Close near high → Most volume assumed buying
- Close near low → Most volume assumed selling
- Close in middle → Split

**More precise:** Actual tape reading (futures, Time & Sales)

### Delta Patterns

**Bullish Delta Pattern:**
```
Price:  ↗
Delta: ████ (strongly positive)
= Buyers in control, trend confirmed
```

**Bearish Delta Pattern:**
```
Price:  ↘
Delta: ████ (strongly negative)
= Sellers in control, trend confirmed
```

**Bullish Divergence (Absorption):**
```
Price:  ↘ (down)
Delta: ████ (positive)
= Buyers absorbing selling pressure
= Potential reversal
```

**Bearish Divergence (Distribution):**
```
Price:  ↗ (up)
Delta: ████ (negative)
= Sellers distributing into strength
= Potential reversal
```

---

## Part 5: On-Balance Volume (OBV)

### What Is OBV?

OBV is cumulative volume that adds volume on up days and subtracts on down days:

```
If today's close > yesterday's close:
    OBV = Previous OBV + Today's Volume

If today's close < yesterday's close:
    OBV = Previous OBV - Today's Volume
```

### Reading OBV

**OBV Confirmation:**
```
Price trending up + OBV trending up = Healthy trend
Price trending down + OBV trending down = Healthy trend
```

**OBV Divergence:**
```
Price making higher high + OBV making lower high = Bearish divergence
Price making lower low + OBV making higher low = Bullish divergence
```

### OBV Trading Applications

| OBV Pattern | Price Pattern | Interpretation |
|-------------|---------------|----------------|
| OBV breakout | Price at resistance | Breakout likely |
| OBV breakdown | Price at support | Breakdown likely |
| OBV rising | Price falling | Accumulation (bullish) |
| OBV falling | Price rising | Distribution (bearish) |

---

## Part 6: Volume Profile

### What Is Volume Profile?

Volume Profile shows volume traded at each price level, not at each time period.

```
        Price
          │
  $110 ─  █████████████████ ← High volume (POC)
  $109 ─  ████████
  $108 ─  █████
  $107 ─  ███████████████
  $106 ─  ████
  $105 ─  ██████████████████ ← High volume
  $104 ─  ████████
  $103 ─  ███
          │
          └── Volume traded at each price
```

### Key Volume Profile Levels

| Level | Name | Meaning |
|-------|------|---------|
| **POC** | Point of Control | Most traded price, strong S/R |
| **VAH** | Value Area High | Upper 70% boundary |
| **VAL** | Value Area Low | Lower 70% boundary |
| **HVN** | High Volume Node | Price accepted here |
| **LVN** | Low Volume Node | Price rejected here, moves fast |

### Trading Volume Profile

**Price at POC:**
- Strong S/R level
- Expect price to spend time here
- Magnet for price

**Price at LVN:**
- Price moves fast through
- Don't expect support/resistance
- Use for targets, not stops

**Price above VAH:**
- Bullish bias
- Look for longs

**Price below VAL:**
- Bearish bias
- Look for shorts

---

## Part 7: Volume and Market Structure

### Volume at Key Levels

**Breakout with Volume:**
```
Volume confirms → Real breakout → Trade it
Volume absent → Fake breakout → Fade it
```

**Support Test with Volume:**
```
High volume test → Strong defense → Bounce likely
Low volume test → Weak defense → Watch for break
```

### Volume Through Structure Breaks

**Before the Break:**
- Volume often dries up (compression)
- Tight range, low participation

**At the Break:**
- Volume should expand significantly
- 1.5-2x average minimum for real break

**After the Break:**
- Volume should sustain
- Declining volume post-break = potential failure

---

## Part 8: Advanced Volume Concepts

### Absorption

When large orders absorb opposing pressure without moving price.

**Bullish Absorption:**
```
Candle: Red (sellers attacking)
Volume: Very high
Delta: Positive (buyers absorbing)
Result: Price doesn't drop
Next: Price rises
```

**Bearish Absorption:**
```
Candle: Green (buyers attacking)
Volume: Very high
Delta: Negative (sellers absorbing)
Result: Price doesn't rise
Next: Price drops
```

### Exhaustion vs. Absorption

| Characteristic | Exhaustion | Absorption |
|----------------|------------|------------|
| Volume | Climactic spike | Sustained high |
| Price movement | Extreme, overextended | Contained |
| Delta | Confirms price direction | Contradicts price |
| Following bars | Immediate reversal | Gradual turn |

### Initiative vs. Response

**Initiative:**
- New buyers/sellers entering
- Wide-range bars
- Volume expanding
- Often at breakouts

**Response:**
- Counteracting existing move
- Rejection wicks
- Volume spike then decline
- Often at S/R levels

---

## Part 9: Plutus Flow Application

### How Plutus Flow Uses These Concepts

Plutus Flow combines:
1. Statistical OBV (with significance bands)
2. Delta histogram
3. Absorption detection
4. Divergence identification

### Plutus Flow + Pentarch

| Pentarch Signal | Plutus Confirmation |
|-----------------|---------------------|
| TD | OBV divergence + positive delta |
| IGN | OBV breakout + volume expansion |
| WRN | OBV divergence forming |
| CAP | Volume climax + OBV extreme |
| BDN | OBV breakdown + negative delta |

---

## Part 10: Volume Analysis Checklist

### Before Entry

- [ ] Is volume confirming price direction?
- [ ] Any divergences present?
- [ ] Where is price vs. POC?
- [ ] Is this a high-volume or low-volume environment?
- [ ] What does delta say about buying/selling pressure?

### During Trade

- [ ] Is volume sustaining in my direction?
- [ ] Watch for delta divergence against position
- [ ] Note absorption patterns at targets

### At Exit Points

- [ ] Volume climax at my target? Take profit.
- [ ] Volume divergence forming? Tighten stops.
- [ ] Volume dying? Move may stall.

---

## Part 11: Common Mistakes

| Mistake | Reality |
|---------|---------|
| "High volume = price goes up" | High volume means participation, not direction |
| Ignoring relative volume | Absolute numbers mean nothing |
| Trading low volume breakouts | Most are fake |
| Only watching price | Volume often leads price |
| Using volume on very low TF | Noisy below 5m |

---

## Part 12: Summary

### Key Principles

1. **Volume confirms or contradicts price**
2. **Relative volume matters more than absolute**
3. **Delta reveals buying/selling pressure**
4. **OBV shows cumulative conviction**
5. **Volume Profile shows where price accepted/rejected**
6. **Climax volume often marks exhaustion**
7. **Low volume breakouts usually fail**
8. **Absorption can be more important than direction**

### Volume Analysis Hierarchy

```
Level 1: Is volume high or low?
Level 2: Is volume confirming price?
Level 3: What does delta say?
Level 4: Any divergences forming?
Level 5: Where are we in Volume Profile?
```

Master these levels in order. Volume analysis is a skill that develops over time.

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
