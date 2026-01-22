# Plutus Flow Quick Reference

**Statistical OBV, Delta Analysis & Absorption Signals**

---

## What Is Plutus Flow?

Plutus Flow is Signal Pilot's advanced volume analysis indicator combining:
- **Statistical OBV** — On-Balance Volume with statistical significance filtering
- **Delta Analysis** — Buy volume vs. sell volume breakdown
- **Absorption Detection** — Identifying when large orders absorb selling/buying

---

## Core Components

| Component | What It Shows | Visual |
|-----------|---------------|--------|
| **OBV Line** | Cumulative volume trend | Main line (green/red) |
| **Statistical Bands** | Normal OBV range | Upper/lower bands |
| **Delta Histogram** | Buy vs. sell volume | Green/red bars |
| **Absorption Dots** | Large order detection | Colored dots on chart |

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

## Delta Analysis

### Reading the Delta Histogram

```
        ████  Strong buying pressure
        ██    Moderate buying
        █     Light buying
       ─┼─    Neutral
        █     Light selling
        ██    Moderate selling
        ████  Strong selling pressure
```

### Delta Signals

| Delta Pattern | Meaning |
|---------------|---------|
| **Positive delta + green candle** | Buyers in control, trend confirmed |
| **Negative delta + red candle** | Sellers in control, trend confirmed |
| **Positive delta + red candle** | Absorption — buyers absorbing selling |
| **Negative delta + green candle** | Distribution — selling into strength |

---

## Absorption Detection

### What Is Absorption?

When large institutional orders "absorb" opposing pressure without letting price move significantly.

### Absorption Signals

| Signal | What Happened | Implication |
|--------|---------------|-------------|
| **Bullish Absorption** 🟢 | Large buying absorbed selling pressure | Price likely to rise |
| **Bearish Absorption** 🔴 | Large selling absorbed buying pressure | Price likely to fall |

### Recognizing Absorption

| Characteristic | Bullish Absorption | Bearish Absorption |
|----------------|-------------------|-------------------|
| Candle | Red body or doji | Green body or doji |
| Delta | Strongly positive | Strongly negative |
| Volume | Above average | Above average |
| Result | Price doesn't fall | Price doesn't rise |

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

## Volume Delta Patterns

### Healthy Trend (Long)
| Bar | Delta | Volume | Interpretation |
|-----|-------|--------|----------------|
| 1 | +++ | High | Strong initiation |
| 2 | ++ | Medium | Continuation |
| 3 | + | Low | Pullback (healthy) |
| 4 | +++ | High | New leg higher |

### Exhausting Trend (Caution)
| Bar | Delta | Volume | Interpretation |
|-----|-------|--------|----------------|
| 1 | +++ | High | Strong move |
| 2 | ++ | High | Still strong |
| 3 | + | Very High | Climax volume |
| 4 | — | High | No follow-through |

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
- [ ] Any divergence vs. price?
- [ ] Delta supporting the trade direction?
- [ ] Absorption signal present?
- [ ] OBV inside or outside statistical bands?

### During Trade
- [ ] Is delta supporting continued move?
- [ ] Watch for divergence developing
- [ ] Monitor for absorption against your position

### Exit Signals
- [ ] OBV divergence against position
- [ ] Delta consistently opposing your trade
- [ ] Absorption signal against your position
- [ ] OBV hits extreme band (exhaustion)

---

## Common Mistakes

| Mistake | Better Approach |
|---------|-----------------|
| Trading every divergence | Wait for price confirmation |
| Ignoring volume context | High volume divergence > low volume |
| Using Plutus alone | Combine with Pentarch + Janus |
| Expecting instant reversals | Divergence can persist for bars |

---

## Settings Quick Reference

| Setting | Default | Options |
|---------|---------|---------|
| OBV Length | 20 | 10-50 |
| Delta Display | Histogram | Histogram / Line |
| Absorption Sensitivity | Normal | Low / Normal / High |
| Statistical Bands | On | On / Off |

---

## Key Formulas

**OBV Calculation:**
```
If Close > Previous Close:
    OBV = Previous OBV + Volume
If Close < Previous Close:
    OBV = Previous OBV - Volume
If Close = Previous Close:
    OBV = Previous OBV
```

**Delta:**
```
Delta = Buy Volume - Sell Volume
(Estimated from price action within bar)
```

---

## Signal Strength Ranking

| Strength | What You See |
|----------|--------------|
| **Strongest** | Divergence + Absorption + Band extreme |
| **Strong** | Divergence + Absorption |
| **Moderate** | Divergence alone |
| **Weak** | Delta shift without divergence |

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
