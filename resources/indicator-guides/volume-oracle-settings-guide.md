# Volume Oracle Settings Guide

**Order Flow Confluence Engine Configuration**

---

## What Is Volume Oracle?

Volume Oracle is Signal Pilot's volume analysis and order flow confluence indicator. It synthesizes multiple volume metrics into actionable signals:
- **Volume analysis** (above/below average)
- **Delta (buy vs. sell pressure)**
- **Cumulative volume delta (CVD)**
- **Volume profile zones**
- **Confluence scoring**

---

## Core Components

| Component | What It Measures | Display |
|-----------|------------------|---------|
| **Volume Bars** | Current vs. average volume | Colored histogram |
| **Delta** | Buy volume minus sell volume | Green/red bars |
| **CVD Line** | Cumulative delta trend | Line overlay |
| **POC** | Point of Control (highest volume price) | Horizontal line |
| **VAH/VAL** | Value Area High/Low | Zone boundaries |
| **Confluence Score** | Multiple factors combined | 0-100 score |

---

## Default Settings

### Volume Analysis

| Setting | Default | Range | Purpose |
|---------|---------|-------|---------|
| Volume MA Length | 20 | 10-50 | Average volume baseline |
| High Volume Threshold | 1.5x | 1.2-2.0x | Above average definition |
| Low Volume Threshold | 0.7x | 0.5-0.9x | Below average definition |
| Volume Smoothing | 3 | 1-5 | Reduce noise |

### Delta Analysis

| Setting | Default | Range | Purpose |
|---------|---------|-------|---------|
| Delta Calculation | Close-based | Close/OHLC | How delta is estimated |
| Delta MA Length | 14 | 7-21 | Delta trend smoothing |
| Significant Delta | 2x | 1.5-3x | Strong delta threshold |

### Volume Profile

| Setting | Default | Range | Purpose |
|---------|---------|-------|---------|
| Profile Period | Session | Session/Daily/Weekly | Profile scope |
| Row Size | 24 | 12-48 | Price level granularity |
| Value Area % | 70 | 68-80 | VAH/VAL calculation |
| Show POC | On | On/Off | Point of Control line |

---

## Volume Bar Color Coding

### Standard Mode

| Color | Meaning | Volume Level |
|-------|---------|--------------|
| 🟢 **Bright Green** | High volume + price up | >1.5x average, bullish |
| 🟢 Light Green | Normal volume + price up | 0.7-1.5x average, bullish |
| 🔴 **Bright Red** | High volume + price down | >1.5x average, bearish |
| 🔴 Light Red | Normal volume + price down | 0.7-1.5x average, bearish |
| ⚪ Gray | Low volume | <0.7x average |

### Delta-Enhanced Mode

| Color | Meaning |
|-------|---------|
| 🟢 Green bar + green outline | Price up, positive delta (confirmed) |
| 🟢 Green bar + red outline | Price up, negative delta (divergence!) |
| 🔴 Red bar + red outline | Price down, negative delta (confirmed) |
| 🔴 Red bar + green outline | Price down, positive delta (divergence!) |

---

## Confluence Score Breakdown

### Score Components

```
Confluence Score = Sum of:
├── Volume component (0-25 pts)
├── Delta component (0-25 pts)
├── CVD component (0-25 pts)
└── Profile component (0-25 pts)

Total: 0-100 points
```

### Score Interpretation

| Score | Interpretation | Action Context |
|-------|----------------|----------------|
| 80-100 | Very strong confluence | High conviction signal |
| 60-79 | Strong confluence | Standard signal |
| 40-59 | Moderate confluence | Proceed with caution |
| 20-39 | Weak confluence | Wait for better setup |
| 0-19 | No confluence | Avoid trading |

---

## Preset Configurations

### Preset 1: Scalping

```
Volume MA Length: 10
High Volume Threshold: 1.3x
Delta Calculation: Close-based
Delta MA Length: 7
Profile Period: Session
Row Size: 48 (fine granularity)
```

**Best for:** 1m-5m charts, quick volume spikes

---

### Preset 2: Day Trading

```
Volume MA Length: 20
High Volume Threshold: 1.5x
Delta Calculation: Close-based
Delta MA Length: 14
Profile Period: Session
Row Size: 24
```

**Best for:** 15m-1H charts, intraday setups

---

### Preset 3: Swing Trading

```
Volume MA Length: 30
High Volume Threshold: 2.0x
Delta Calculation: OHLC-based
Delta MA Length: 21
Profile Period: Weekly
Row Size: 24
```

**Best for:** 4H-Daily charts, multi-day holds

---

## CVD (Cumulative Volume Delta) Settings

### CVD Display Options

| Setting | Options | Recommendation |
|---------|---------|----------------|
| Show CVD Line | On/Off | On |
| CVD Color Mode | Single/Gradient | Gradient |
| CVD Smoothing | 1-5 | 3 |
| Show CVD Divergence | On/Off | On |

### Reading CVD

| CVD Pattern | Price Pattern | Interpretation |
|-------------|---------------|----------------|
| CVD rising | Price rising | Confirmed uptrend |
| CVD rising | Price falling | Bullish divergence (accumulation) |
| CVD falling | Price falling | Confirmed downtrend |
| CVD falling | Price rising | Bearish divergence (distribution) |

---

## Volume Profile Settings

### Profile Period Options

| Period | Shows | Best For |
|--------|-------|----------|
| **Session** | Current day's profile | Day trading |
| **Daily** | Yesterday + today | Swing context |
| **Weekly** | Current week | Swing trading |
| **Custom** | User-defined bars | Special analysis |

### Key Profile Levels

| Level | What It Is | How to Use |
|-------|-----------|------------|
| **POC** | Price with most volume | Strong S/R, magnet for price |
| **VAH** | Upper 70% volume boundary | Resistance zone |
| **VAL** | Lower 70% volume boundary | Support zone |
| **HVN** | High Volume Node | Strong S/R |
| **LVN** | Low Volume Node | Price moves fast through |

---

## Integration with Other Indicators

### Volume Oracle + Pentarch

| Pentarch Signal | Volume Oracle Confirmation |
|-----------------|---------------------------|
| **TD** | High volume, positive delta, at/below VAL |
| **IGN** | Volume expansion, CVD rising |
| **WRN** | Declining delta despite price rise |
| **CAP** | Climax volume (2x+), exhaustion |
| **BDN** | High volume breakdown, negative delta |

### Volume Oracle + Janus Atlas

| Janus Signal | Volume Oracle Confirmation |
|--------------|---------------------------|
| Sweep at lows | Positive delta on sweep bar |
| Sweep at highs | Negative delta on sweep bar |
| Reclaim | Volume confirmation of reversal |

---

## Session-Based Settings

### Pre-Market / After-Hours

```
Volume MA Length: 10 (shorter, less liquidity)
High Volume Threshold: 2.0x (only significant spikes)
Show Profile: Off (incomplete data)
```

### Market Open (First 30 min)

```
Volume MA Length: 5 (recent context only)
High Volume Threshold: 1.2x (everything is "high")
Profile Period: Previous Session
```

### Regular Hours

```
Standard settings
Profile Period: Session (building)
```

---

## Asset-Specific Adjustments

### High-Volume Assets (SPY, BTC, AAPL)

```
Volume MA Length: 20 (standard)
High Volume Threshold: 1.5x (standard)
Row Size: 24 (standard)
```

### Low-Volume Assets (Small caps, exotic pairs)

```
Volume MA Length: 30 (longer for stability)
High Volume Threshold: 2.0x (filter noise)
Row Size: 12 (fewer levels)
Volume Smoothing: 5 (more smoothing)
```

### Crypto (24/7 Markets)

```
Volume MA Length: 20
Profile Period: Custom (8-hour blocks)
Consider session: Asian/London/NY
```

---

## Alerts Configuration

### Available Alert Types

| Alert | Trigger | Use For |
|-------|---------|---------|
| High Volume | Volume > threshold | Breakout/breakdown watch |
| Delta Divergence | Delta vs price mismatch | Reversal warning |
| CVD Cross Zero | CVD crosses zero line | Momentum shift |
| At POC | Price reaches POC | Key level test |
| Outside Value Area | Price exits VA | Breakout/acceptance |

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Volume always "high" | Threshold too low | Increase to 1.8-2.0x |
| Volume never "high" | Threshold too high | Decrease to 1.2-1.3x |
| CVD too choppy | Not enough smoothing | Increase CVD smoothing |
| Profile too cluttered | Too many rows | Decrease row size to 12 |
| Delta not meaningful | Low volume asset | Use delta only on high vol bars |
| Confluence always low | Strict settings | Relax thresholds |

---

## Optimization Workflow

### Daily

- [ ] Check if volume thresholds match recent volatility
- [ ] Verify POC aligns with obvious price reactions
- [ ] Note any CVD divergences forming

### Weekly

- [ ] Review confluence scores vs. actual outcomes
- [ ] Adjust thresholds if too many/few signals
- [ ] Check profile period matches trading style

---

## Non-Repainting Guarantee

- Volume bars only render on close
- Delta calculation uses closed bar data
- CVD line updates only on bar close
- Profile levels from historical data (don't repaint)
- Confluence score locks in on bar close

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
