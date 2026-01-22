# Harmonic Oscillator v1.0 Guide

**7-Component Momentum Voting System**

---

## What is Harmonic Oscillator?

Harmonic Oscillator is Signal Pilot's momentum consensus indicator. It combines **seven independent components** into a unified voting system. Instead of watching multiple oscillators separately, you get one aggregated momentum reading with regime classification.

---

## The Seven Voting Components

Each component casts a bullish or bearish vote based on its analysis:

| # | Component | What It Analyzes |
|---|-----------|------------------|
| 1 | **RSI** | Momentum-aware RSI with directional confirmation |
| 2 | **Stochastic RSI** | Smoothed stochastic with slope analysis |
| 3 | **MACD** | Histogram acceleration detection (not just direction) |
| 4 | **EMA Trend** | Price position relative to trend with slope confirmation |
| 5 | **Momentum** | Rate of change analysis |
| 6 | **Volume** | Confirming volume on directional candles |
| 7 | **Divergence Zone** | Extreme zone detection with price confirmation |

---

## Regime Classification

Based on vote count, Harmonic Oscillator classifies the market:

| Vote Count | Regime | Meaning |
|------------|--------|---------|
| 5-7 votes | **TRENDING** | Strong directional momentum |
| 3-4 votes | **BIAS** | Moderate directional lean |
| 0-2 votes | **RANGING** | No clear momentum direction |

Displayed as: TRENDING▲, TRENDING▼, BIAS▲, BIAS▼, or RANGING—

---

## Adjustable Settings

**Important:** Oscillator parameters are internally optimized and **not user-adjustable**. This ensures consistent, tested behavior across all users.

### User-Configurable Settings

| Setting | Options | Description |
|---------|---------|-------------|
| **Signal Mode** | Conservative / Balanced / Aggressive | Adjusts consensus thresholds for alerts |
| **Higher Timeframe Filter** | On / Off | Filter divergence signals by HTF trend direction |
| **HTF Timeframe** | Dropdown selection | Which higher timeframe to reference |

### Display Settings
| Setting | Options |
|---------|---------|
| Show Divergences | On/Off |
| Show Consensus Meter | On/Off |
| Show Status Panel | On/Off |
| Show OB/OS Zone Fills | On/Off |

### Table Settings
| Setting | Options |
|---------|---------|
| Position | 9 locations (corners/edges) |
| Font Size | Multiple size options |
| Layout Orientation | Vertical/Horizontal |

---

## Visual Elements

### Status Panel
Displays current regime and vote count:
- **TRENDING▲ (6/7)** = Strong bullish momentum (6 of 7 components bullish)
- **BIAS▼ (4/7)** = Moderate bearish lean
- **RANGING— (2/7)** = No clear direction

### Composite Oscillator
- 0-100 scale oscillator line
- Signal line for crossover detection
- Overbought/oversold zones highlighted

### Divergence Labels
- **▲ DIV** = Bullish divergence detected
- **▼ DIV** = Bearish divergence detected

### Zone Fills
Optional shading in overbought (top) and oversold (bottom) regions.

### Consensus Meter
Visual representation of how many components agree on direction.

---

## Signal Mode Explained

### Conservative Mode
- Requires higher vote consensus for signals
- Fewer signals, higher conviction
- Best for: Swing trading, fewer trades

### Balanced Mode (Default)
- Standard consensus thresholds
- Moderate signal frequency
- Best for: Most trading styles

### Aggressive Mode
- Lower consensus required for signals
- More signals, requires filtering
- Best for: Active trading, scalping

---

## How to Use Harmonic Oscillator

### Reading the Regime
1. Check current regime (TRENDING, BIAS, or RANGING)
2. Note vote count (X/7)
3. Consider direction (▲ bullish, ▼ bearish, — neutral)

### Trading with Regime
| Regime | Approach |
|--------|----------|
| TRENDING | Trade breakouts, ride momentum |
| BIAS | Trade pullbacks in bias direction |
| RANGING | Fade extremes, mean reversion |

### Using the HTF Filter
Enable HTF filter to only receive divergence signals that align with the higher timeframe trend direction. This reduces false signals during counter-trend moves.

---

## Divergence Signals

Harmonic Oscillator automatically detects divergences between price and the composite oscillator:

### Bullish Divergence (▲ DIV)
- Price makes lower low
- Oscillator makes higher low
- Potential reversal up

### Bearish Divergence (▼ DIV)
- Price makes higher high
- Oscillator makes lower high
- Potential reversal down

---

## Integration with Other Indicators

### Harmonic Oscillator + Pentarch
- Harmonic identifies momentum regime
- Pentarch provides cycle timing
- Use Harmonic to filter Pentarch signals (only trade IGN in TRENDING▲)

### Harmonic Oscillator + Volume Oracle
- Both provide regime classification
- Harmonic = momentum-based regime
- Volume Oracle = volume-based regime
- Alignment = higher conviction

### Harmonic Oscillator + Janus Atlas
- Harmonic shows when momentum is strong
- Janus shows where to enter
- Trade key levels when momentum supports direction

---

## Best Practices

1. **Trust the voting system** - 7 components > any single oscillator
2. **Match strategy to regime** - Don't fade TRENDING markets
3. **Use HTF filter** - Reduces counter-trend false signals
4. **5+ votes = high conviction** - Best setups have strong consensus
5. **Divergences need confirmation** - Don't trade divergence alone

---

*For momentum trading strategies, see the Education Hub curriculum on oscillators and regime-based trading.*
