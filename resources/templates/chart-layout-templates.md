# Chart Layout Templates

**TradingView Configurations for Signal Pilot Users**

---

## Purpose

Well-organized chart layouts help you:
- See all relevant information quickly
- Avoid information overload
- Maintain consistency across sessions
- Reduce decision fatigue

---

## Part 1: Basic Layouts

### Layout 1: Single Chart Focus

**Best for:** Day trading, focused analysis

```
┌─────────────────────────────────────────────┐
│                                             │
│           Main Chart (Pentarch)             │
│           Price + Signals                   │
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│           Plutus Flow (Delta/OBV)           │
└─────────────────────────────────────────────┘
```

**Configuration:**
- Main chart: 75% of screen
- Lower panel: 25% of screen
- Timeframe: Your primary trading TF

**Indicators on main:**
- Pentarch (signals + Pilot Line + bar colors)
- Janus Atlas (optional, for sweeps)

**Lower panel:**
- Plutus Flow

---

### Layout 2: Multi-Timeframe (2 Charts)

**Best for:** Swing trading, context analysis

```
┌───────────────────────┬─────────────────────┐
│                       │                     │
│    Higher Timeframe   │   Trading Timeframe │
│       (Context)       │      (Entries)      │
│                       │                     │
├───────────────────────┴─────────────────────┤
│              Plutus Flow (Trading TF)       │
└─────────────────────────────────────────────┘
```

**Configuration:**
- Left chart: HTF (4H if trading 1H, Daily if trading 4H)
- Right chart: Your trading timeframe
- Lower panel: Plutus Flow for trading TF

**Example:**
- Left: 4H chart with Pentarch
- Right: 1H chart with Pentarch + Janus
- Bottom: Plutus Flow on 1H

---

### Layout 3: Triple Timeframe

**Best for:** Position trading, full context

```
┌───────────────┬───────────────┬─────────────┐
│    Weekly     │     Daily     │    4H       │
│   (Macro)     │   (Trend)     │  (Entry)    │
│               │               │             │
├───────────────┴───────────────┴─────────────┤
│           Plutus Flow (Entry TF)            │
└─────────────────────────────────────────────┘
```

**Configuration:**
- Left: Weekly with Pentarch
- Center: Daily with Pentarch
- Right: 4H with Pentarch + Janus
- Bottom: Plutus Flow on 4H

**Reading order:**
1. Weekly: What's the macro trend?
2. Daily: What's the intermediate trend?
3. 4H: Where's my entry?

---

## Part 2: Advanced Layouts

### Layout 4: Multi-Asset Watchlist

**Best for:** Scanning opportunities

```
┌─────────────────────────────────────────────┐
│                                             │
│              Augury Grid                    │
│         (Multi-symbol signal view)          │
│                                             │
├──────────────────────┬──────────────────────┤
│                      │                      │
│   Selected Chart 1   │   Selected Chart 2   │
│    (Best Signal)     │   (Second Best)      │
│                      │                      │
└──────────────────────┴──────────────────────┘
```

**Configuration:**
- Top: Augury Grid showing 10-15 symbols
- Bottom left: Chart for symbol with best signal
- Bottom right: Chart for second best signal

**Workflow:**
1. Scan Augury Grid for active signals
2. Click to open detailed chart below
3. Analyze and trade if valid

---

### Layout 5: Full Trading Station

**Best for:** Active day trading

```
┌─────────────────────┬───────────────────────┐
│                     │                       │
│   Trading Chart     │    HTF Context        │
│   (Pentarch+Janus)  │    (Pentarch)         │
│                     │                       │
├─────────────────────┼───────────────────────┤
│    Plutus Flow      │   Harmonic Oscillator │
├─────────────────────┴───────────────────────┤
│              Volume Oracle                   │
└─────────────────────────────────────────────┘
```

**Configuration:**
- Top left: Primary trading chart (1H)
- Top right: Higher timeframe (4H)
- Middle left: Plutus Flow
- Middle right: Harmonic Oscillator
- Bottom: Volume Oracle

**Screen requirements:** 27"+ or dual monitors recommended

---

### Layout 6: Correlation Analysis

**Best for:** Intermarket analysis

```
┌─────────────────────┬───────────────────────┐
│                     │                       │
│   Primary Asset     │   Correlated Asset    │
│      (BTC)          │       (ETH)           │
│                     │                       │
├─────────────────────┼───────────────────────┤
│                     │                       │
│   Market Index      │    Fear/Greed Proxy   │
│      (SPY)          │       (VIX)           │
│                     │                       │
└─────────────────────┴───────────────────────┘
```

**Example combinations:**
- Crypto: BTC, ETH, SPY, DXY
- Stocks: Individual stock, sector ETF, SPY, VIX
- Forex: Pair, correlated pair, DXY, TNX

---

## Part 3: Timeframe Recommendations

### By Trading Style

| Style | Main TF | HTF Context | LTF Entry |
|-------|---------|-------------|-----------|
| Scalping | 5m | 15m, 1H | 1m |
| Day Trading | 15m | 1H, 4H | 5m |
| Swing Trading | 1H | 4H, Daily | 15m |
| Position Trading | 4H | Daily, Weekly | 1H |
| Investing | Daily | Weekly, Monthly | 4H |

### Multi-TF Setup Rules

**3:1 or 4:1 ratio works best:**
- If trading 1H → HTF is 4H (4:1)
- If trading 15m → HTF is 1H (4:1)
- If trading 5m → HTF is 15m (3:1)

---

## Part 4: Indicator Placement

### Main Chart Indicators

**Required:**
- Pentarch (signals, Pilot Line, bar colors)

**Optional (choose 1-2):**
- Janus Atlas (sweeps)
- Moving averages (if you use them)
- Trendlines (draw manually)

**Avoid:** Overloading main chart with too many overlays

### Panel Indicators

**Standard configuration:**

| Panel | Indicator | Purpose |
|-------|-----------|---------|
| Panel 1 | Plutus Flow | Volume/delta analysis |
| Panel 2 | Harmonic Oscillator | Momentum voting |
| Panel 3 | Volume Oracle | Volume profile (optional) |

**Simplified configuration:**

| Panel | Indicator | Purpose |
|-------|-----------|---------|
| Panel 1 | Plutus Flow | Everything volume |

---

## Part 5: Color Schemes

### Dark Theme (Recommended)

```
Background: #131722 (TradingView dark)
Grid: Off or very subtle
Candles:
  - Bullish: #26A69A (green)
  - Bearish: #EF5350 (red)

With Pentarch:
  - Candles colored by regime
  - Pilot Line matches indicator
```

### Light Theme

```
Background: #FFFFFF
Grid: Light gray
Candles:
  - Bullish: #089981 (darker green)
  - Bearish: #F23645 (darker red)
```

### High Contrast

```
Background: Black #000000
Grid: Off
Candles:
  - Bullish: Bright green #00FF00
  - Bearish: Bright red #FF0000

For traders with vision concerns
```

---

## Part 6: TradingView Tips

### Saving Layouts

1. Set up your ideal configuration
2. Click the layout dropdown (top right)
3. "Save layout as..."
4. Name it (e.g., "SP Day Trading 1H")

**Recommended layouts to save:**
- [Your style] Primary
- [Your style] Multi-TF
- Scanning (Augury Grid focused)

### Syncing Charts

**To sync timeframes:**
1. Right-click on any chart
2. "Sync Interval"
3. All charts will match timeframe changes

**To sync symbols:**
1. Right-click on any chart
2. "Sync Symbol"
3. Changing symbol updates all charts

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| Alt + T | Trendline tool |
| Alt + H | Horizontal line |
| Alt + F | Fibonacci retracement |
| Alt + V | Vertical line |
| Space | Pause/unpause chart |
| + / - | Zoom in/out |

---

## Part 7: Layout Templates to Download

### Template 1: Day Trader Essential

**Save this as your starting point:**

```
Chart 1 (Main): 1H
- Pentarch: All settings default
- Janus Atlas: Default

Panel 1: Plutus Flow
- Default settings

Sync: Symbol + Interval synced

Watch list: Your top 5-10 symbols
```

### Template 2: Swing Trader Context

**Save this for swing trading:**

```
Chart 1 (Left): Daily
- Pentarch only

Chart 2 (Right): 4H
- Pentarch
- Janus Atlas

Panel 1 (under Chart 2): Plutus Flow

Sync: Symbol synced, Interval independent
```

### Template 3: Multi-Asset Scanner

**Save this for scanning:**

```
Chart 1 (Top): Augury Grid
- 10-15 symbols
- Active signals filter on

Chart 2 (Bottom Left): 1H
- Pentarch
- Janus Atlas

Chart 3 (Bottom Right): 4H
- Pentarch

No sync (update manually from grid)
```

---

## Part 8: Personal Layout Worksheet

### My Primary Layout

**Trading style:** _____________

**Main timeframe:** _____________

**HTF for context:** _____________

**Number of charts:** _____________

**Indicators on main chart:**
1. Pentarch (always)
2. _____________
3. _____________

**Panel indicators:**
1. _____________
2. _____________

**Layout sketch:**

```
┌─────────────────────────────────────────────┐
│                                             │
│                                             │
│                                             │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
└─────────────────────────────────────────────┘
```

### My Watchlist

**Symbols I always watch:**

1. _____________
2. _____________
3. _____________
4. _____________
5. _____________

---

## Part 9: Common Mistakes

### Mistake 1: Too Many Indicators

**Problem:** Chart becomes unreadable
**Fix:** Maximum 2-3 indicators on main chart

### Mistake 2: Wrong Timeframe Mix

**Problem:** HTF too close to trading TF (2H context for 1H)
**Fix:** Use 3:1 or 4:1 ratio

### Mistake 3: No Saved Layouts

**Problem:** Recreating setup daily
**Fix:** Save your configuration once it works

### Mistake 4: Ignoring Screen Real Estate

**Problem:** Important info is too small
**Fix:** Adjust panel sizes, use appropriate layout for screen size

---

## Part 10: Summary

### Layout Principles

1. **Less is more** — Only show what you use
2. **Consistency** — Same layout every day
3. **Context first** — HTF visible for context
4. **Action clear** — Trading TF prominent
5. **Save your work** — Don't recreate daily

### Quick Setup Guide

1. Decide your trading style
2. Choose appropriate layout template
3. Configure indicators
4. Save the layout
5. Use it consistently

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
