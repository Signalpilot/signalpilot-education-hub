# Omnideck Settings & Configuration Guide

**The Complete Setup Manual for Signal Pilot's All-In-One Analysis System**

---

## What is Omnideck?

Omnideck is Signal Pilot's comprehensive "everything indicator" - a modular analysis system that combines 10+ detection engines into one customizable overlay. Think of it as your trading command center.

**Why Omnideck?**
- Single indicator replaces multiple chart tools
- Modular: Enable only what you need
- Unified visual language across all components
- Reduces chart clutter while increasing information density

---

## Core Components

Omnideck integrates these systems:

| Component | Function | Source |
|-----------|----------|--------|
| Pentarch Events | Cycle phase detection (TD/IGN/WRN/CAP/BDN) | Pentarch engine |
| NanoFlow | Micro-momentum signals | Pentarch engine |
| Pilot Line | Dynamic trend direction | Pentarch engine |
| Regime Bars | Market phase coloring | Internal classifier |
| Fibonacci Levels | Auto-retracement/extension | Auto-swing detection |
| Pattern Detection | Chart patterns | ML pattern engine |
| Support/Resistance | Key price levels | Multi-source |
| Volume Zones | High-activity areas | Volume profile |
| Session Markers | Trading session boundaries | Time-based |
| Alerts | Customizable notifications | All components |

---

## Default Settings

### Global Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Theme | Auto | Match chart theme |
| Opacity | 80% | Overall transparency |
| Label Size | Medium | Signal label sizing |
| Show Tooltips | On | Hover information |

### Component Toggles (All On by Default)

| Component | Default | Recommended |
|-----------|---------|-------------|
| Pentarch Events | On | Always on |
| NanoFlow | On | Keep on |
| Pilot Line | On | Essential |
| Regime Bars | On | Highly useful |
| Fibonacci | On | Optional |
| Patterns | On | Optional |
| S/R Levels | On | Keep on |
| Volume Zones | Off | Enable if needed |
| Session Markers | Off | Enable for forex/futures |
| Alerts | On | Customize triggers |

---

## Recommended Configurations

### Minimalist Setup (Clean Charts)

Enable only:
- [x] Pilot Line
- [x] Regime Bars
- [x] Pentarch Events (TD, BDN only)

**Best for:** Experienced traders who want confirmation without clutter

### Standard Setup (Balanced)

Enable:
- [x] Pentarch Events (all)
- [x] NanoFlow
- [x] Pilot Line
- [x] Regime Bars
- [x] S/R Levels

**Best for:** Most traders, day trading, swing entries

### Full Analysis Setup (Maximum Information)

Enable all components

**Best for:** Learning phase, complex analysis, multiple confluence

### Scalping Setup (Speed-Focused)

Enable:
- [x] NanoFlow
- [x] Pilot Line
- [x] Regime Bars
- [x] Session Markers

**Best for:** Fast entries, quick decisions

---

## Component Deep Dives

### Pentarch Events Module

Controls the 5 cycle event signals:

| Event | Display Option | Default |
|-------|----------------|---------|
| TD (Touchdown) | Show/Hide | Show |
| IGN (Ignition) | Show/Hide | Show |
| WRN (Warning) | Show/Hide | Show |
| CAP (Climax) | Show/Hide | Show |
| BDN (Breakdown) | Show/Hide | Show |

**Settings:**
- Signal Sensitivity: 1-5 (default 3)
- Label Position: Above/Below/Auto
- Show Historical: On/Off

### NanoFlow Module

Micro-momentum signal display:

| Setting | Range | Default |
|---------|-------|---------|
| Sensitivity | 1.0-3.0 | 1.5 |
| Display Mode | Dots/Arrows/Both | Dots |
| Cluster Threshold | 2-5 | 3 |
| Show Divergent | On/Off | On |

### Pilot Line Module

Trend direction indicator:

| Setting | Range | Default |
|---------|-------|---------|
| Length | 13-34 | 21 |
| Smoothing | 1-5 | 2 |
| Line Style | Solid/Dashed | Solid |
| Width | 1-4 | 2 |
| Color Mode | Gradient/Solid | Gradient |

### Regime Bars Module

Candle coloring based on market regime:

| Regime | Color | Meaning |
|--------|-------|---------|
| Strong Trend | Bright Green/Red | Clear direction |
| Weak Trend | Faded Green/Red | Caution |
| Range | Gray/Purple | Avoid trend plays |
| Volatile | Orange/Yellow | Increased risk |

**Settings:**
- Regime Source: Harmonic/Volume/Combined
- Color Intensity: 50-100%
- Show Background: On/Off

### Fibonacci Module

Auto-detected retracement and extension levels:

| Setting | Options | Default |
|---------|---------|---------|
| Detection Mode | Swing/Impulse/Both | Swing |
| Levels Shown | 23.6/38.2/50/61.8/78.6 | All |
| Extensions | 127.2/161.8/200 | 127.2, 161.8 |
| Auto-Update | On/Off | On |
| Lookback | 20-200 bars | 50 |

### Pattern Detection Module

Automated chart pattern recognition:

| Pattern Type | Default |
|--------------|---------|
| Double Top/Bottom | On |
| Head & Shoulders | On |
| Triangles | On |
| Wedges | On |
| Flags/Pennants | On |
| Channels | Off |

**Settings:**
- Minimum Pattern Size: 5-50 bars
- Confidence Threshold: 60-90%
- Show Incomplete: On/Off

### Support/Resistance Module

Key price level detection:

| Level Type | Source | Default |
|------------|--------|---------|
| Swing Highs/Lows | Price action | On |
| Round Numbers | Psychological | On |
| VWAP Levels | Volume | Off |
| Previous Day H/L/C | Session | On |
| Weekly Levels | HTF | Off |

### Volume Zones Module

High-activity price areas:

| Setting | Range | Default |
|---------|-------|---------|
| Zone Type | Profile/Delta/Both | Profile |
| Lookback | Session/Week/Custom | Session |
| Threshold | 1-3 std dev | 1.5 |
| Display | Background/Lines | Background |
| Opacity | 10-50% | 25% |

### Session Markers Module

Trading session boundaries:

| Session | Default Color | Times (ET) |
|---------|---------------|------------|
| Asia | Purple | 7PM-4AM |
| London | Blue | 3AM-12PM |
| New York | Green | 8AM-5PM |
| Overlap | Yellow | 8AM-12PM |

---

## Visual Customization

### Color Schemes

**Default Dark:**
- Bullish: #00FF88
- Bearish: #FF4444
- Neutral: #888888
- Accent: #76DDFF

**Colorblind Friendly:**
- Bullish: #00BFFF
- Bearish: #FF8C00
- Neutral: #888888
- Accent: #9370DB

**Light Mode:**
- Bullish: #16A34A
- Bearish: #DC2626
- Neutral: #6B7280
- Accent: #2563EB

### Layout Options

| Option | Choices | Default |
|--------|---------|---------|
| Label Position | Top/Bottom/Right | Right |
| Info Panel | Collapsed/Expanded/Hidden | Collapsed |
| Legend | Show/Hide | Show |
| Compact Mode | On/Off | Off |

---

## Performance Optimization

Omnideck can be resource-intensive with all components enabled.

### Reduce CPU Usage

1. Disable unused components
2. Reduce historical lookback
3. Turn off pattern detection
4. Use lower sensitivity settings
5. Disable auto-update on Fibonacci

### Recommended for Slow Devices

- Enable only: Pilot Line, Regime Bars, S/R Levels
- Set Fibonacci lookback to 20
- Turn off pattern detection
- Reduce Volume Zone complexity

---

## Alert Configuration

Omnideck supports customizable alerts:

### Alert Types

| Alert | Trigger | Default |
|-------|---------|---------|
| Pentarch Event | Any TD/IGN/WRN/CAP/BDN | On (TD, BDN) |
| Regime Change | Trend → Range, etc. | Off |
| S/R Touch | Price at key level | Off |
| Pattern Complete | Pattern confirmation | Off |
| NanoFlow Cluster | 3+ signals | Off |
| Pilot Line Cross | Bull/Bear transition | On |

### Alert Settings

| Setting | Options |
|---------|---------|
| Sound | On/Off |
| Popup | On/Off |
| Email | On/Off (requires setup) |
| Webhook | Custom URL |

---

## Integration with Other Indicators

### Omnideck + Volume Oracle
- Use Volume Oracle for detailed flow analysis
- Omnideck provides quick regime context
- Combine alerts for confluence

### Omnideck + Janus Atlas
- Janus for precise level mapping
- Omnideck S/R for quick reference
- Use together for sweep confirmation

### Omnideck + Augury Grid
- Augury for multi-symbol scanning
- Omnideck for deep single-chart analysis
- Switch between for workflow efficiency

---

## Quick Setup Checklist

- [ ] Decide your trading style (scalp/day/swing)
- [ ] Choose configuration preset
- [ ] Enable only needed components
- [ ] Set color scheme preference
- [ ] Configure alert triggers
- [ ] Test on paper for 1 week
- [ ] Fine-tune based on results
- [ ] Document your optimal setup

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Chart lag | Too many components | Disable unused modules |
| Signals not appearing | Sensitivity too high | Lower to 1-2 |
| Too many signals | Sensitivity too low | Increase to 3-4 |
| Colors not showing | Theme mismatch | Set to Auto |
| Levels outdated | Auto-update off | Enable or manual refresh |
| Patterns false positives | Threshold too low | Increase to 75-80% |

---

## Pro Tips

1. **Start minimal, add gradually** - Begin with Pilot Line + Regime Bars only
2. **Match to timeframe** - Lower TF = fewer components to reduce noise
3. **Use presets** - Save configurations for different market conditions
4. **Leverage alerts** - Let Omnideck notify you instead of watching constantly
5. **Combine with standalone** - Use Omnideck for overview, dedicated indicators for detail

---

*For advanced Omnideck strategies, explore the Education Hub curriculum and component-specific indicator guides.*
