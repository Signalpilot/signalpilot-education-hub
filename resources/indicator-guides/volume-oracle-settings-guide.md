# Volume Oracle v1.0 Guide

**Regime Detection & Institutional Flow Analysis**

---

## What is Volume Oracle?

Volume Oracle is Signal Pilot's **regime detection indicator** that analyzes institutional buying and selling pressure through five backend detection systems. It identifies whether smart money is accumulating, distributing, or neutral.

---

## Core Function: Regime Detection

Volume Oracle classifies the market into three states:

| Regime | Color | Meaning |
|--------|-------|---------|
| **ACCUMULATION** | Green | Sustained institutional buying detected |
| **DISTRIBUTION** | Red | Sustained institutional selling detected |
| **NEUTRAL** | Gray | No clear directional flow |

---

## Five Detection Engines

Volume Oracle uses five internal systems to determine regime:

### 1. Market Structure Detection
Swing analysis identifying higher highs/lows vs. lower highs/lows to confirm directional bias.

### 2. Volume Footprint Detection
Classifies each bar into one of four types:
- **Momentum** - Strong directional volume
- **Absorption** - Volume absorbed at levels
- **Spike** - Unusual volume activity
- **Normal** - Standard volume

### 3. Regime Stability Index
Tracks how often regime flips occur. Stable regimes = higher conviction.

### 4. Confluence Scoring
Multi-factor alignment scoring up to 7 factors including trend, volume, structure.

### 5. Signal Density Tracking
Monitors clustering of signals in choppy conditions to filter noise.

---

## Adjustable Settings (6 Groups)

### Detection Settings
| Setting | Options | Description |
|---------|---------|-------------|
| Volume Spike Threshold | Default 2.0 | Multiplier for spike detection |
| Signal Cooldown | Default 45 bars | Minimum bars between signals |
| Regime Sensitivity | Conservative/Balanced/Aggressive | Detection strictness |
| Auto-Volatility Adaptation | On/Off | Adjusts to market conditions |

### Risk Settings
| Setting | Default | Description |
|---------|---------|-------------|
| Account Size | $10,000 | For position sizing calculation |
| Risk Per Trade | 1% | Risk percentage |
| ATR Length | 14 | For stop/target calculation |
| Stop Multiple | 1.5× ATR | Stop loss distance |
| Target Multiples | 2.0-3.5× ATR | Take profit distances |
| Trailing Stop | Configurable | Trailing stop settings |

### Multi-Timeframe Settings
| Setting | Default | Description |
|---------|---------|-------------|
| Enable HTF Filter | On/Off | Filter by higher timeframe |
| Primary HTF | 1H | First higher timeframe |
| Secondary HTF | 4H | Second higher timeframe |
| Strict Mode | On/Off | Require HTF alignment |
| Min HTF Strength | 40% | Minimum HTF confirmation |

### Strategy Settings
| Setting | Options | Description |
|---------|---------|-------------|
| Strategy Mode | Trend Following/Mean Reversion/Hybrid | Trading approach |
| Mean Reversion Threshold | Default 2.5 | For MR signals |

### Display Settings
Toggles for:
- Regime table (show/hide)
- Background tint
- Exit warnings
- Quality stars
- Tooltips
- HTF panel

### Table Style Settings
| Setting | Options |
|---------|---------|
| Layout | Vertical or Horizontal |
| Position | 9 locations (corners/edges) |
| Text Size | Multiple sizes |
| Transparency | 0-100% |
| Border/Frame Width | Customizable |

---

## Visual Components

### On-Chart Elements
- **Colored volume bars** - Green/red based on regime
- **Signal labels** - Directional arrows (↑ BULL, ↓ BEAR)
- **Quality star ratings** - ⭐ to ⭐⭐⭐
- **Regime background tint** - Subtle green/red shading
- **Exit warning labels** - ⚠️ when conditions change
- **Position management labels** - T1, BE, T2 targets

### Regime Table Dashboard
Displays 8 key fields in real-time:

| Field | Shows |
|-------|-------|
| **Regime** | Current state (Accumulation/Distribution/Neutral) |
| **Strength** | 0-100% conviction level |
| **Duration** | Hours since regime started |
| **Status** | STRONG ✓, FADING ▼, WEAK ✗, CRIT ▼ |
| **Health** | Warning count (🟢🟡🟠🔴) |
| **Structure** | ✓ ALIGNED, ✗ CONFLICT, — UNCLEAR |
| **Market Character** | TRENDING ▲, NORMAL —, CHOPPY ▼ |
| **Flip Counter** | STABLE or countdown to potential regime change |

---

## Signal Quality Scoring

Signals receive a 0-100% quality score based on:
- Volume Z-score
- Flow consistency
- Trend alignment
- Regime strength

Displayed as star ratings:
| Rating | Score Range | Interpretation |
|--------|-------------|----------------|
| ⭐⭐⭐ | 85-100% | High conviction |
| ⭐⭐ | 70-84% | Good quality |
| ⭐ | Below 70% | Lower conviction |

---

## How to Use Volume Oracle

### Reading the Regime
1. Check current regime (Green = accumulation, Red = distribution)
2. Verify strength (higher % = more conviction)
3. Confirm structure alignment (✓ means price confirms regime)
4. Note duration (longer regimes = more established)

### Signal Interpretation
- **BULL ↑ with ⭐⭐⭐** = High-conviction long setup
- **BEAR ↓ with ⭐⭐⭐** = High-conviction short setup
- **Exit warning ⚠️** = Consider closing or reducing position

### Multi-Timeframe Approach
Enable HTF filter to ensure your signals align with higher timeframe regime. Strict mode requires both HTFs to confirm.

---

## Integration with Other Indicators

### Volume Oracle + Pentarch
- Volume Oracle provides regime context
- Pentarch signals become more reliable when aligned with Volume Oracle regime
- Example: IGN signal during Accumulation regime = stronger long setup

### Volume Oracle + Janus Atlas
- Volume Oracle shows directional bias
- Janus Atlas provides entry levels
- Trade key levels in direction of Volume Oracle regime

### The Trinity
Pentarch + Janus Atlas + Volume Oracle = Maximum confluence

---

*For regime-based trading strategies, see the Education Hub curriculum on volume analysis and institutional flow.*
