# Plutus Flow Quick Reference

**Statistical OBV, Delta Analysis & Absorption Signals**

---

## What Is Plutus Flow?

Plutus Flow is Signal Pilot's **enhanced On-Balance Volume (OBV)** indicator with four analytical layers:
- **OBV Line** — Cumulative volume line (rising = accumulation, falling = distribution)
- **Flow Ribbon & Basis** — Colored bands comparing OBV to dynamic baseline
- **Statistical Bands** — Upper/lower bands at ±2 standard deviations
- **Divergence Detection** — Automatic identification of price-OBV divergences

---

## Core Components

| Component | What It Shows | Visual |
|-----------|---------------|--------|
| **OBV Line** | Cumulative volume trend | Main line |
| **Flow Ribbon** | OBV vs. basis comparison | Green/red background shading |
| **Statistical Bands** | ±2σ OBV range | Upper/lower boundary lines |
| **Divergence Labels** | Price-OBV divergences | Bull Div, Bear Div, Bull Hid, Bear Hid |

---

## OBV Interpretation

### OBV Line Color

| Color | Meaning |
|-------|---------|
| 🟢 **Green** | OBV rising (accumulation) |
| 🔴 **Red** | OBV falling (distribution) |
| 🟠 **Orange** | OBV flat (neutral) |

### OBV vs. Price

| OBV | Price | Interpretation |
|-----|-------|----------------|
| Rising | Rising | **Confirmed uptrend** — healthy |
| Rising | Falling | **Bullish divergence** — accumulation |
| Falling | Falling | **Confirmed downtrend** — healthy |
| Falling | Rising | **Bearish divergence** — distribution |

---

## Statistical Significance

### Band Breakouts

| Event | Meaning | Implication |
|-------|---------|-------------|
| OBV above upper band | Unusually strong buying | Potential breakout |
| OBV below lower band | Unusually strong selling | Potential breakdown |
| OBV at upper band | Buying exhaustion possible | Watch for reversal |
| OBV at lower band | Selling exhaustion possible | Watch for reversal |

**The Bands:** 2 standard deviations from 20-period mean of OBV

---

## Extreme Zone Analysis

### Statistical Band Markers

| Marker | Meaning | Implication |
|--------|---------|-------------|
| **White dot** | OBV entering extreme zone (±2σ) | Stretched conditions |
| **Yellow dot** | OBV exiting extreme zone | Potential reversal area |

### Zone Interpretation

| OBV Position | Condition | Watch For |
|--------------|-----------|-----------|
| Above upper band | Unusually strong buying | Potential exhaustion |
| Below lower band | Unusually strong selling | Potential exhaustion |
| At upper band | Buying stretched | Watch for reversal signals |
| At lower band | Selling stretched | Watch for reversal signals |

---

## Flow Ribbon Interpretation

### Reading the Ribbon

The flow ribbon shows OBV position relative to its dynamic basis:

| Ribbon Color | Meaning | Implication |
|--------------|---------|-------------|
| **Green ribbon expanding** | OBV above basis, growing | Strong accumulation underway |
| **Red ribbon expanding** | OBV below basis, growing | Strong distribution underway |
| **Ribbon flipping color** | OBV crossing basis | Flow direction changing |

### Cross Signals

| Signal | What It Shows |
|--------|---------------|
| **Green dot** | OBV crossing above basis (bullish) |
| **Red dot** | OBV crossing below basis (bearish) |

---

## Divergence Recognition

### Bullish Divergence (Buy Setup)

```
Price:    ╲          Lower low
           ╲
OBV:       ╱        Higher low
          ╱
```
**Translation:** Sellers exhausted, buyers accumulating quietly

### Bearish Divergence (Sell Setup)

```
Price:    ╱          Higher high
         ╱
OBV:      ╲         Lower high
           ╲
```
**Translation:** Buyers exhausted, sellers distributing quietly

---

## OBV Trend Patterns

### Healthy Uptrend
| OBV Behavior | Price Behavior | Interpretation |
|--------------|----------------|----------------|
| Rising steadily | Rising | Confirmed accumulation |
| Rising on dips | Shallow pullbacks | Buyers absorbing supply |
| Green ribbon expanding | New highs | Strong bullish flow |

### Weakening Trend (Caution)
| OBV Behavior | Price Behavior | Interpretation |
|--------------|----------------|----------------|
| Flat or falling | Still rising | Bearish divergence warning |
| Red ribbon appearing | Stalling | Distribution beginning |
| Exits upper band | Near highs | Exhaustion possible |

---

## Plutus + Pentarch Confluence

| Pentarch Signal | Plutus Confirmation |
|-----------------|---------------------|
| **TD** | Bullish divergence, absorption at lows |
| **IGN** | Delta expansion, OBV breakout |
| **WRN** | Bearish divergence forming |
| **CAP** | Climax volume, delta exhaustion |
| **BDN** | OBV breakdown, negative delta |

---

## Quick Checklist: Using Plutus Flow

### Before Entry
- [ ] What's OBV trend direction? (Rising/Falling)
- [ ] What color is the flow ribbon? (Green/Red)
- [ ] Any divergence vs. price?
- [ ] OBV inside or outside statistical bands?
- [ ] Any cross signals (green/red dots) recently?

### During Trade
- [ ] Is OBV continuing in trade direction?
- [ ] Watch for divergence developing
- [ ] Monitor flow ribbon color

### Exit Signals
- [ ] OBV divergence against position
- [ ] Flow ribbon flips color
- [ ] OBV hits extreme band (yellow dot exit)
- [ ] Divergence label appears against position

---

## Common Mistakes

| Mistake | Better Approach |
|---------|-----------------|
| Trading every divergence | Wait for price confirmation |
| Ignoring volume context | High volume divergence > low volume |
| Using Plutus alone | Combine with Pentarch + Janus |
| Expecting instant reversals | Divergence can persist for bars |

---

## Adjustable Settings

Plutus Flow has specialized settings for signal quality and filtering:

| Setting Group | Key Options |
|---------------|-------------|
| **Calculation** | HTF Timeframe selection |
| **FlipGuard System** | FlipGuard Bars, Strict Cross Gate, Robust Extremes, Z-gate settings |
| **Assists** | HTF Alignment Timeframe |
| **Divergence** | Min Price Swing (xATR threshold) |
| **Visual** | Show Divergence Labels, Show Extreme Zone Exits, Colors |

---

## Key Concepts

**OBV Calculation:**
```
If Close > Previous Close:
    OBV = Previous OBV + Volume
If Close < Previous Close:
    OBV = Previous OBV - Volume
If Close = Previous Close:
    OBV = Previous OBV
```

**Statistical Bands:**
```
Upper Band = OBV Mean + 2σ
Lower Band = OBV Mean - 2σ
(Where σ = standard deviation of OBV)
```

---

## Signal Strength Ranking

| Strength | What You See |
|----------|--------------|
| **Strongest** | Divergence + Band extreme + Flow ribbon flip |
| **Strong** | Divergence + Cross signal |
| **Moderate** | Divergence alone |
| **Weak** | Flow ribbon change without divergence |

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
