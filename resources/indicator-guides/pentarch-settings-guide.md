# Pentarch Settings & Configuration Guide

**The Complete Setup Manual for Multi-Timeframe Trend Analysis**

---

## What is Pentarch?

Pentarch is Signal Pilot's flagship trend analysis system. It combines 5 EMAs across 3 timeframes with proprietary signal classification to identify high-probability trend entries and regime changes.

**Core Components:**
- **Pilot Line** - Dynamic trend direction indicator
- **NanoFlow** - Micro-momentum signals
- **5 Signal Types** - TD, IGN, WRN, CAP, BDN classifications
- **Regime Colors** - Visual market phase identification

---

## Default Settings

| Setting | Default Value | Description |
|---------|---------------|-------------|
| EMA Fast | 8 | Short-term momentum |
| EMA Medium | 21 | Intermediate trend |
| EMA Slow | 50 | Primary trend |
| EMA Anchor | 100 | Major support/resistance |
| EMA Ultra | 200 | Long-term trend filter |
| Pilot Line Length | 21 | Trend direction calculation |
| NanoFlow Sensitivity | 1.5 | Micro-signal threshold |
| Multi-TF Mode | On | Enable 3-timeframe analysis |

---

## Settings by Trading Style

### Scalping (1-5 minute charts)

| Setting | Recommended | Why |
|---------|-------------|-----|
| EMA Fast | 5 | Faster momentum detection |
| EMA Medium | 13 | Tighter intermediate |
| EMA Slow | 34 | Quicker trend shifts |
| NanoFlow Sensitivity | 1.2 | More signals |
| Multi-TF Timeframes | 1m, 5m, 15m | Short-term alignment |

**Best For:** High-frequency entries, quick reversals

### Day Trading (15-60 minute charts)

| Setting | Recommended | Why |
|---------|-------------|-----|
| EMA Fast | 8 | Standard momentum |
| EMA Medium | 21 | Classic intermediate |
| EMA Slow | 50 | Reliable trend |
| NanoFlow Sensitivity | 1.5 | Balanced signals |
| Multi-TF Timeframes | 15m, 1H, 4H | Intraday alignment |

**Best For:** Most traders, balanced signal quality

### Swing Trading (4H-Daily charts)

| Setting | Recommended | Why |
|---------|-------------|-----|
| EMA Fast | 13 | Smoother momentum |
| EMA Medium | 34 | Fibonacci-based |
| EMA Slow | 89 | Major trend filter |
| NanoFlow Sensitivity | 2.0 | Fewer, higher-quality signals |
| Multi-TF Timeframes | 4H, Daily, Weekly | Position-level alignment |

**Best For:** Larger moves, fewer trades, higher conviction

---

## Understanding the 5 Signal Types

### TD (Trend Defined)
- **What It Means:** Strong trend confirmation
- **Visual:** Bright green/red candles
- **Action:** Primary entry signals in trend direction
- **Confidence:** Highest

### IGN (Ignition)
- **What It Means:** Potential trend start
- **Visual:** Signal marker appears
- **Action:** Early entry opportunity, use tighter stops
- **Confidence:** Medium-High

### WRN (Warning)
- **What It Means:** Trend weakening
- **Visual:** Color fade begins
- **Action:** Tighten stops, reduce position size
- **Confidence:** Caution required

### CAP (Capitulation)
- **What It Means:** Extreme move, potential exhaustion
- **Visual:** Intense color with divergence
- **Action:** Watch for reversal, don't chase
- **Confidence:** Reversal watch

### BDN (Breakdown)
- **What It Means:** Trend structure broken
- **Visual:** Color shift, Pilot Line cross
- **Action:** Exit positions, wait for new structure
- **Confidence:** Exit signal

---

## Pilot Line Configuration

The Pilot Line is Pentarch's core trend direction indicator.

### Understanding Pilot Line States

| State | Color | Meaning | Action |
|-------|-------|---------|--------|
| Strong Bull | Bright Green | Clear uptrend | Long bias |
| Weak Bull | Faded Green | Uptrend weakening | Caution |
| Neutral | Gray/White | No clear trend | Stay flat |
| Weak Bear | Faded Red | Downtrend weakening | Caution |
| Strong Bear | Bright Red | Clear downtrend | Short bias |

### Pilot Line Settings

| Setting | Range | Effect |
|---------|-------|--------|
| Length | 13-34 | Shorter = more responsive, longer = smoother |
| Smoothing | 1-5 | Higher = fewer whipsaws, slower signals |
| Multi-TF Weight | 0.5-2.0 | Higher = more HTF influence |

---

## NanoFlow Configuration

NanoFlow provides micro-momentum signals within the larger trend context.

### NanoFlow Sensitivity Settings

| Sensitivity | Signals/Day | Best For |
|-------------|-------------|----------|
| 1.0 | Many | Scalping, high activity |
| 1.5 | Moderate | Day trading (default) |
| 2.0 | Few | Swing trading, high conviction |
| 2.5 | Rare | Position trading only |

### NanoFlow Signal Types

- **Green NanoFlow** - Bullish micro-momentum
- **Red NanoFlow** - Bearish micro-momentum
- **Cluster** - Multiple signals = strong conviction
- **Divergent** - NanoFlow vs Price = potential reversal

---

## Multi-Timeframe Setup

Pentarch's power comes from analyzing 3 timeframes simultaneously.

### Recommended TF Combinations

| Your Chart | Lower TF | Higher TF | Use Case |
|------------|----------|-----------|----------|
| 1m | N/A | 5m, 15m | Scalping |
| 5m | 1m | 15m, 1H | Active day trading |
| 15m | 5m | 1H, 4H | Standard day trading |
| 1H | 15m | 4H, Daily | Swing entries |
| 4H | 1H | Daily, Weekly | Position building |
| Daily | 4H | Weekly, Monthly | Investment timing |

### Alignment Scoring

| Alignment | Score | Confidence |
|-----------|-------|------------|
| All 3 TF agree | 3/3 | Highest - full position |
| 2 TF agree | 2/3 | Medium - reduced size |
| 1 TF only | 1/3 | Low - avoid or scalp only |
| Conflicting | 0/3 | No trade |

---

## Visual Customization

### Color Schemes

**Default (Dark Mode)**
- Bullish: #00FF88 (Green)
- Bearish: #FF4444 (Red)
- Neutral: #888888 (Gray)

**Colorblind Friendly**
- Bullish: #00BFFF (Blue)
- Bearish: #FF8C00 (Orange)
- Neutral: #888888 (Gray)

### Display Options

| Option | Default | Description |
|--------|---------|-------------|
| Show EMAs | On | Display all 5 EMAs |
| Show Pilot Line | On | Main trend indicator |
| Show NanoFlow | On | Micro-signals |
| Show Signals | On | TD/IGN/WRN/CAP/BDN labels |
| Signal Size | Medium | Label size on chart |
| Background Shading | On | Regime color fill |

---

## Common Configuration Mistakes

### 1. Too Many Signals
**Problem:** NanoFlow sensitivity too low
**Fix:** Increase to 1.5-2.0

### 2. Missing Entries
**Problem:** Settings too conservative
**Fix:** Decrease EMA lengths by ~20%

### 3. Whipsaws in Ranges
**Problem:** Using trend settings in ranging market
**Fix:** Widen NanoFlow sensitivity, use Harmonic Oscillator for regime detection

### 4. Conflicting Signals
**Problem:** Not using Multi-TF alignment
**Fix:** Only trade when 2+ timeframes agree

### 5. Late Entries
**Problem:** EMA lengths too long
**Fix:** Use faster EMAs or focus on IGN signals

---

## Integration with Other Indicators

### Pentarch + Volume Oracle
- Use Volume Oracle to confirm Pentarch signals
- TD signal + Volume spike = highest conviction

### Pentarch + Janus Atlas
- Pentarch for trend direction
- Janus for entry timing (liquidity sweeps)

### Pentarch + Plutus Flow
- Pentarch WRN + Plutus divergence = reversal confirmation
- TD + Plutus absorption = continuation strength

### Pentarch + Harmonic Oscillator
- Harmonic identifies regime
- Use Pentarch settings appropriate to that regime

---

## Quick Setup Checklist

- [ ] Select your primary trading timeframe
- [ ] Choose preset (Scalp/Day/Swing)
- [ ] Configure Multi-TF timeframes
- [ ] Adjust NanoFlow sensitivity to preference
- [ ] Set color scheme
- [ ] Enable/disable visual elements
- [ ] Test with paper trading for 1 week
- [ ] Fine-tune based on your results

---

## Troubleshooting

| Issue | Likely Cause | Solution |
|-------|--------------|----------|
| No signals appearing | Sensitivity too high | Lower NanoFlow to 1.2-1.5 |
| Too many false signals | Settings too aggressive | Increase EMA lengths |
| Pilot Line choppy | Chart timeframe too low | Move up one timeframe |
| Colors not showing | Display settings off | Check visual options |
| Multi-TF not working | Wrong TF selection | Ensure TFs are properly spaced |

---

## Performance Tips

1. **Start with defaults** - Optimize only after understanding behavior
2. **One change at a time** - Isolate what's working
3. **Match to market** - Adjust for volatile vs calm periods
4. **Document changes** - Track what settings work for you
5. **Review weekly** - Refine based on actual trades

---

*For more Pentarch strategies, see the Education Hub curriculum Module 4: Pentarch Pilot Line Mastery*
