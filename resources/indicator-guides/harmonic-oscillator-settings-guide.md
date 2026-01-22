# Harmonic Oscillator Settings Guide

**Complete Configuration Reference for Signal Pilot's Momentum Voting System**

---

## What Is the Harmonic Oscillator?

The Harmonic Oscillator is Signal Pilot's advanced momentum indicator that combines multiple oscillator inputs into a single "voting" system. Instead of watching 5 different indicators, you get one unified momentum read.

---

## Core Components

| Component | What It Measures | Weight |
|-----------|------------------|--------|
| **RSI** | Relative strength (overbought/oversold) | Configurable |
| **Stochastic** | Price position within range | Configurable |
| **CCI** | Price deviation from mean | Configurable |
| **Williams %R** | Closing price vs. high-low range | Configurable |
| **MFI** | Money flow (volume-weighted RSI) | Configurable |

---

## Default Settings

### Oscillator Lengths

| Oscillator | Default Length | Range | Notes |
|------------|----------------|-------|-------|
| RSI | 14 | 7-21 | Standard period |
| Stochastic K | 14 | 7-21 | %K period |
| Stochastic D | 3 | 3-5 | %D smoothing |
| CCI | 20 | 14-30 | Commodity Channel Index |
| Williams %R | 14 | 7-21 | Williams Percent Range |
| MFI | 14 | 10-20 | Money Flow Index |

### Voting Thresholds

| Setting | Default | Purpose |
|---------|---------|---------|
| Bullish Threshold | 70 | Level above which oscillator votes bullish |
| Bearish Threshold | 30 | Level below which oscillator votes bearish |
| Strong Threshold | 80/20 | Extreme levels for strong signals |

---

## Settings Panel Breakdown

### Section 1: Display Options

| Setting | Options | Recommended |
|---------|---------|-------------|
| Show Histogram | On/Off | On |
| Show Signal Line | On/Off | On |
| Show Vote Count | On/Off | On |
| Show Divergence | On/Off | On |

### Section 2: Oscillator Weights

```
Each oscillator can be weighted 0-100%

Example configurations:

Conservative (equal weight):
RSI: 20% | Stoch: 20% | CCI: 20% | W%R: 20% | MFI: 20%

RSI-Heavy:
RSI: 40% | Stoch: 15% | CCI: 15% | W%R: 15% | MFI: 15%

Volume-Focused:
RSI: 15% | Stoch: 15% | CCI: 15% | W%R: 15% | MFI: 40%
```

### Section 3: Sensitivity

| Sensitivity | Votes Required | Best For |
|-------------|----------------|----------|
| Hair Trigger | 2 of 5 | Scalping, early signals |
| Normal | 3 of 5 | Standard trading |
| Rock Solid | 4 of 5 | Position trading, high conviction |

---

## Preset Configurations

### Preset 1: Scalping (Fast)

```
RSI Length: 7
Stochastic K: 9
CCI: 14
Williams %R: 9
MFI: 10
Sensitivity: Hair Trigger
```

**Use case:** 1m-15m charts, quick entries/exits

---

### Preset 2: Day Trading (Standard)

```
RSI Length: 14
Stochastic K: 14
CCI: 20
Williams %R: 14
MFI: 14
Sensitivity: Normal
```

**Use case:** 15m-1H charts, intraday setups

---

### Preset 3: Swing Trading (Slow)

```
RSI Length: 21
Stochastic K: 21
CCI: 30
Williams %R: 21
MFI: 20
Sensitivity: Rock Solid
```

**Use case:** 4H-Daily charts, multi-day holds

---

### Preset 4: Crypto Volatile

```
RSI Length: 10
Stochastic K: 10
CCI: 14
Williams %R: 10
MFI: 10
Sensitivity: Normal
Weight MFI: 30% (higher for volume focus)
```

**Use case:** BTC, ETH, high-volatility assets

---

## Reading the Display

### The Histogram

```
Strong Bullish:  ████████████ (Green, tall)
Bullish:         ████████     (Green, medium)
Neutral:         ████         (Gray)
Bearish:         ████████     (Red, medium)
Strong Bearish:  ████████████ (Red, tall)
```

| Color | Meaning |
|-------|---------|
| Bright Green | 4-5 oscillators voting bullish |
| Light Green | 3 oscillators voting bullish |
| Gray | Split vote (2-3 each side) |
| Light Red | 3 oscillators voting bearish |
| Bright Red | 4-5 oscillators voting bearish |

### The Signal Line

- **Above zero**: Bullish momentum bias
- **Below zero**: Bearish momentum bias
- **Crossing zero**: Momentum shift

### Vote Count Display

```
[5/0] = All 5 bullish (very strong)
[4/1] = 4 bullish, 1 bearish (strong)
[3/2] = 3 bullish, 2 bearish (moderate)
[2/3] = 2 bullish, 3 bearish (moderate bearish)
[1/4] = 1 bullish, 4 bearish (strong bearish)
[0/5] = All 5 bearish (very strong)
```

---

## Divergence Detection

### Bullish Divergence

```
Price:     ╲     Lower low
            ╲
Harmonic:   ╱    Higher low
           ╱
```

**Setting:** Divergence Lookback = 5-20 bars (default: 14)

### Bearish Divergence

```
Price:     ╱     Higher high
          ╱
Harmonic:  ╲    Lower high
            ╲
```

---

## Combining with Pentarch

| Pentarch Signal | Harmonic Confirmation |
|-----------------|----------------------|
| **TD** | Harmonic at extreme low, divergence forming |
| **IGN** | Harmonic crossing above zero, vote count improving |
| **WRN** | Harmonic at extreme high, divergence forming |
| **CAP** | Harmonic 5/0 bullish (exhaustion) |
| **BDN** | Harmonic crossing below zero, vote count declining |

---

## Timeframe Recommendations

| Timeframe | RSI | Stoch | CCI | Settings Profile |
|-----------|-----|-------|-----|------------------|
| 1m-5m | 7 | 9 | 14 | Scalping |
| 15m-1H | 14 | 14 | 20 | Day Trading |
| 4H-Daily | 21 | 21 | 30 | Swing Trading |
| Weekly+ | 14 | 14 | 20 | Position (standard works) |

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Too many signals | Sensitivity too high | Increase to Normal/Rock Solid |
| Missing moves | Sensitivity too low | Decrease to Hair Trigger |
| Choppy readings | Too short lengths | Increase oscillator lengths |
| Lagging signals | Too long lengths | Decrease oscillator lengths |
| False divergences | Lookback too short | Increase divergence lookback |

---

## Advanced: Custom Weighting Strategies

### Trend Following Weight

When trend trading, weight momentum oscillators higher:
```
RSI: 35%
Stochastic: 25%
CCI: 20%
Williams %R: 10%
MFI: 10%
```

### Mean Reversion Weight

When range trading, weight range oscillators higher:
```
RSI: 15%
Stochastic: 35%
CCI: 15%
Williams %R: 25%
MFI: 10%
```

### Volume Confirmation Weight

When volume matters (breakouts, news):
```
RSI: 15%
Stochastic: 15%
CCI: 15%
Williams %R: 15%
MFI: 40%
```

---

## Quick Settings Checklist

### Before Trading Session

- [ ] Correct timeframe selected
- [ ] Oscillator lengths match trading style
- [ ] Sensitivity appropriate for market conditions
- [ ] Divergence detection on/off as needed
- [ ] Vote count display enabled

### Weekly Review

- [ ] Are signals too frequent/rare? Adjust sensitivity
- [ ] Are signals early/late? Adjust lengths
- [ ] Is one oscillator dominating? Check weights
- [ ] Are divergences accurate? Adjust lookback

---

## Non-Repainting Guarantee

- All oscillator calculations use closed bar data only
- Vote counts lock in on bar close
- Histogram and signal line do not recalculate
- What you see is permanent once bar closes

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
