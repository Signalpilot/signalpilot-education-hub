# OmniDeck v1.0 Guide

**The All-In-One Multi-System Analysis Indicator**

---

## What is OmniDeck?

OmniDeck integrates **10 distinct analysis systems** into a single modular indicator. Each system can be toggled independently, allowing you to customize your chart without indicator clutter.

---

## The 10 Core Systems

### 1. TD Sequential
Exhaustion counter displaying numbers 1-9 above/below candles. Identifies potential trend exhaustion points when counts reach completion.

### 2. Squeeze Detector
Volatility compression identification system. Shows:
- Compression dots when Bollinger Bands enter Keltner Channels
- Directional arrows indicating potential breakout direction
- Early warning of explosive moves

### 3. Liquidity Sweeps
Stop-hunt detection with visual markers:
- 💧 (Water droplet) - Bullish sweep (stops taken below support)
- 🩸 (Blood drop) - Bearish sweep (stops taken above resistance)

### 4. EMA Trio
Three moving averages (50, 100, 200 EMA) with automated cross signals:
- **GC** - Golden Cross (bullish cross)
- **DC** - Death Cross (bearish cross)
- **PB** - Pullback to EMA

### 5. SuperTrend
Trend ribbon overlay:
- Green ribbon = Bullish conditions
- Red ribbon = Bearish conditions
- Automatic trend direction detection

### 6. BMSB (Bull Market Support Band)
Dynamic support zone combining 20 SMA and 21 EMA:
- Acts as support during uptrends
- Acts as resistance during downtrends
- Popular for pullback entries

### 7. Regime Box
Background coloring indicating market direction:
- Green background = Bullish regime
- Red background = Bearish regime
- Gray background = Neutral/ranging

### 8. Supply/Demand Zones
Automatically detected institutional zones:
- Color-coded boxes (supply = red, demand = green)
- Star ratings (⭐) indicating zone quality
- Fresh vs. tested zone identification

### 9. Candlestick Patterns (RCS)
Recognizes **16 classic reversal patterns** with labels:
- HAM (Hammer)
- SS (Shooting Star)
- BUE (Bullish Engulfing)
- BEE (Bearish Engulfing)
- And 12 more patterns

### 10. Meta Tools
Integration layer that coordinates system harmony and manages the Confluence Score.

---

## Adjustable Settings

### System Toggles
Each of the 10 systems has an individual On/Off switch. Enable only what you need.

**Default Configuration:**
- Enabled: TD Sequential, Squeeze, SuperTrend, Regime Box, Confluence Score
- Disabled: Others (enable as needed)

### Color Settings (9 Groups)
Customize colors for:

| Group | Options |
|-------|---------|
| Trend Colors | Bull/Bear trend ribbon colors |
| Exhaustion Colors | TD Sequential bull/bear colors |
| Structure Colors | Supply/Demand zone colors |
| Squeeze Color | Compression indicator color |
| Warning Color | Alert/warning element color |
| Neutral Color | Neutral state color |

### Confluence Panel Settings

| Setting | Options |
|---------|---------|
| Display Mode | Badge or Table |
| Panel Position | Top-Left, Top-Right, Bottom-Left, Bottom-Right |
| High Score Threshold | 1-10 scale |
| Low Score Threshold | 1-10 scale |
| System Weighting | Adjust importance of each system |

### Pattern Detection Settings
- **Dynamic RCS Lookback** - Automatically adjusts 4-10 bars based on timeframe
- **Individual Pattern Alerts** - Enable alerts for specific patterns among the 16 available

---

## Confluence Score

OmniDeck calculates a confluence score based on how many systems agree on direction:

| Score | Interpretation |
|-------|----------------|
| 8-10 | Strong confluence - High conviction setup |
| 5-7 | Moderate confluence - Proceed with caution |
| 1-4 | Weak confluence - Wait for more alignment |

The score appears as a badge or table (configurable) showing real-time system agreement.

---

## Visual Elements

OmniDeck displays these elements on your chart:

- **Numbered exhaustion counters** on candles (TD Sequential)
- **Colored trend ribbons** (SuperTrend)
- **Moving average lines** (EMA Trio)
- **Background regime coloring** (Regime Box)
- **Supply/Demand zone rectangles** with quality stars
- **Candlestick pattern abbreviation labels**
- **Confluence score badge/table panel**
- **Liquidity sweep emoji markers**
- **Volatility compression dots and arrows**

---

## Recommended Configurations

### Clean Setup (Minimal)
Enable only:
- Regime Box (background context)
- SuperTrend (trend direction)
- Confluence Score (alignment check)

### Pattern Trading Setup
Enable:
- Candlestick Patterns (RCS)
- Supply/Demand Zones
- EMA Trio (for trend filter)

### Breakout Trading Setup
Enable:
- Squeeze Detector
- Liquidity Sweeps
- TD Sequential
- Volume (from external indicator)

### Full Analysis Setup
Enable all systems for comprehensive analysis (may be visually busy).

---

## Tips for Best Use

1. **Start minimal** - Enable only 2-3 systems initially
2. **Add gradually** - Turn on more systems as you learn them
3. **Watch confluence** - Higher scores = better setups
4. **Combine with other indicators** - OmniDeck works well with Volume Oracle and Janus Atlas
5. **Customize colors** - Match your chart theme for clarity

---

## Alert Configuration

OmniDeck supports alerts for:
- TD Sequential completions (count 9)
- Pattern detections (16 patterns)
- Squeeze releases
- Liquidity sweeps
- Zone touches

Set alerts via TradingView's alert system using "Any alert() function call" condition.

---

*For advanced OmniDeck strategies, explore the Education Hub curriculum and confluence trading lessons.*
