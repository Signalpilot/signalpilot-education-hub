# Janus Atlas v1.0 Guide

**Multi-Timeframe Auto-Levels with 60+ Level Types**

---

## What is Janus Atlas?

Janus Atlas automatically plots **60+ level types** across nine categories—from classic support/resistance to VWAP, volume profile, and Fibonacci levels. It eliminates manual level drawing while providing institutional-grade price mapping.

---

## Level Categories (9 Groups)

### 1. Classic Timeframe Levels
Daily, Weekly, Monthly, Quarterly, and Yearly:
- High / Low
- Open / Close
- Midpoints

### 2. VWAP Family
Volume-Weighted Average Price levels:
- Daily through Yearly VWAP
- Previous period VWAPs
- ±1σ and ±2σ deviation bands

### 3. Volume Profile
- **POC** (Point of Control) - Highest volume price
- **VAH** (Value Area High) - Upper value boundary
- **VAL** (Value Area Low) - Lower value boundary
- Available across Daily, Weekly, Monthly timeframes
- **Naked POC (nPOC)** - Untested POC levels

### 4. Session Levels
Asian, European, and North American sessions:
- Session High / Low
- Session Open / Close

### 5. Market Structure
- **HH** - Higher High
- **HL** - Higher Low
- **LH** - Lower High
- **LL** - Lower Low
- **BOS** - Break of Structure
- **CHoCH** - Change of Character

### 6. Opening Range
Configurable session start duration:
- **orH** - Opening Range High
- **orL** - Opening Range Low
- **orMid** - Opening Range Midpoint
- Duration options: 5, 15, 30, or 60 minutes

### 7. Gap Levels
- Daily gaps with auto-fill detection
- Weekend gaps
- CME gaps (for futures)

### 8. Killzones
Session timing with background shading:
- Asian session
- London Open
- New York Open
- London Close
- Custom killzone option

### 9. Fibonacci Levels
- 8 Fib levels (6 retracements + 2 extensions)
- 20 anchor options for calculation
- Two independent Fib sets available

---

## Additional Features

- **Fair Value Gaps (FVG)** - Bullish/bearish imbalance detection
- **Confluence Zones** - Where multiple levels cluster
- **Distance Table** - Real-time distance to nearest levels
- **Custom Sessions** - Define your own session times

---

## Adjustable Settings (19 Groups)

### Primary Controls
| Setting | Description |
|---------|-------------|
| Master Toggles | Enable/disable entire feature groups |
| Colors | Individual color for each level type |
| Line Styles | Solid, Dashed, or Dotted |
| Label Style | Box (default) or Text Only |
| Label Size | Multiple size options |
| Line Dim % | 0-50% (dims lines relative to labels) |
| Extend Lines Right | On/Off toggle |

### Level Toggles (Groups 3-7)
Each timeframe (Daily, Weekly, Monthly, Quarterly, Yearly) has individual toggles for:
- High, Low, Open, Close, Midpoint

### Opening Range Settings
- Session selection: Regular/ETH/Custom
- Duration: 5, 15, 30, or 60 minutes
- Individual level toggles (orH, orL, orMid)

### Killzone Settings
- 5 predefined session windows
- Custom killzone option
- Background shading toggle

### VWAP Settings
- Individual toggles for Daily/Weekly/Monthly/Quarterly/Yearly VWAP
- ±1σ and ±2σ deviation bands (toggleable)
- Previous period VWAP options
- Separate band colors from main line

### Volume Profile Settings
- POC/VAH/VAL toggles per timeframe
- Naked POC count: 1-10 daily, 1-5 weekly
- Color customization

### Fibonacci Settings
- Two independent Fib sets
- 20 anchor options for calculation
- Individual level toggles:
  - Retracements: 0.236, 0.382, 0.5, 0.618, 0.786, 0.886
  - Extensions: 1.272, 1.618

### Fair Value Gap Settings
- Bullish/Bearish detection toggle
- Max count display: 1-50
- Show: All or Unmitigated only
- Mitigation mode: Wick or Close
- Custom colors

### Confluence Zone Settings
- Minimum levels for confluence: 3+
- Proximity percentage: default 0.5%
- Zone color customization
- Label toggle

### Distance Table Settings
- Layout: Vertical, Horizontal, or Compact
- Position: 9 options (corners and edges)
- Size: Tiny, Small, or Normal
- Sorting: By Distance, Name, or Type
- Max rows: 5 to All

---

## Alert System

Janus Atlas offers **50 selectable alerts**:

### Individual Alerts (36)
Specific high-interest levels like:
- Previous Day High/Low
- Weekly Open/High/Low
- VWAP touches
- POC approaches
- And more

### Grouped Alerts (14)
- Previous Day levels
- Daily levels
- Weekly levels
- Monday levels
- Opening Range
- VWAP (all timeframes)
- Volume Profile (Daily/Weekly)
- Gap levels
- CME Gaps
- Market Structure
- Fair Value Gaps
- Naked POC
- Confluence Zones
- Fibonacci levels

---

## CME Gap Detection (Futures)

For futures traders:
- Auto-detect gaps from CME settlement
- Manual symbol selection from 22 presets
- Display style: Box or Lines
- Max gaps: 1-50
- Box transparency: 0-95%

---

## Recommended Configurations

### Day Trading Setup
Enable:
- Previous Day High/Low/Close
- Opening Range (15 or 30 min)
- Daily VWAP with bands
- Daily Volume Profile (POC/VAH/VAL)
- Killzones (NY Open, London Open)

### Swing Trading Setup
Enable:
- Weekly High/Low/Open/Close
- Monthly levels
- Weekly VWAP
- Fibonacci (Weekly anchor)
- Market Structure

### Scalping Setup
Enable:
- Session levels (Asian, European, NA)
- Opening Range (5 min)
- Daily VWAP only
- Fair Value Gaps
- Confluence Zones

---

## Best Practices

1. **Don't enable everything** - Start with one category and add as needed
2. **Use confluence zones** - Where multiple levels cluster, probability increases
3. **Check the distance table** - Know which levels are nearest to current price
4. **Match levels to timeframe** - Daily levels for day trading, weekly for swing
5. **Combine with other indicators** - Janus levels + Pentarch signals + Volume Oracle regime

---

*For level-based trading strategies, see the Education Hub curriculum on support/resistance and liquidity concepts.*
