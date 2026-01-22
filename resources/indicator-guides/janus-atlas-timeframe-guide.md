# Janus Atlas Timeframe Guide

**Multi-Timeframe Liquidity Analysis & Configuration**

---

## What Is Janus Atlas?

Janus Atlas is Signal Pilot's liquidity detection system. It identifies:
- **Liquidity sweeps** (stop hunts)
- **Liquidity pools** (where stops cluster)
- **Sweep + reclaim patterns** (high-probability reversal setups)

Named after the two-faced Roman god Janus, it looks both ways—at liquidity taken AND liquidity remaining.

---

## Core Functionality

| Feature | What It Does |
|---------|--------------|
| **Sweep Detection** | Identifies when price breaks a level briefly and reverses |
| **Pool Marking** | Shows where liquidity likely clusters |
| **Reclaim Signals** | Fires when price sweeps AND reclaims a level |
| **Multi-TF Pools** | Displays liquidity from higher timeframes |

---

## Timeframe Settings Overview

### The Two Timeframe Modes

| Mode | Description | Use Case |
|------|-------------|----------|
| **Single TF** | Shows liquidity for current chart only | Simple, clean display |
| **Multi-TF** | Shows liquidity from 2-3 timeframes | Full context, confluence |

---

## Single Timeframe Configuration

### Settings

| Setting | Default | Options |
|---------|---------|---------|
| Lookback Period | 20 | 10-50 bars |
| Sweep Sensitivity | Normal | Low/Normal/High |
| Show Pool Zones | On | On/Off |
| Reclaim Candles | 3 | 1-5 bars |

### Lookback Period Explained

```
Lookback = How many bars back to identify swing highs/lows

Short (10-15):  More levels, more signals, more noise
Medium (20-30): Balanced, default recommendation
Long (40-50):   Fewer levels, major swings only
```

### Sweep Sensitivity

| Level | Trigger | Best For |
|-------|---------|----------|
| **Low** | Must break level by 0.5%+ | Major sweeps only |
| **Normal** | Must break level by 0.2% | Standard trading |
| **High** | Any break counts | Scalping, every sweep |

---

## Multi-Timeframe Configuration

### Recommended TF Combinations

| Your Trading TF | HTF 1 | HTF 2 | HTF 3 |
|-----------------|-------|-------|-------|
| 1m | 5m | 15m | — |
| 5m | 15m | 1H | — |
| 15m | 1H | 4H | — |
| 1H | 4H | Daily | — |
| 4H | Daily | Weekly | — |
| Daily | Weekly | Monthly | — |

### Multi-TF Display Settings

| Setting | Options | Recommendation |
|---------|---------|----------------|
| HTF Pool Color | Customizable | Distinct from current TF |
| HTF Pool Style | Solid/Dashed | Dashed (differentiate) |
| Show HTF Labels | On/Off | On (identify source TF) |
| HTF Pool Opacity | 10-100% | 50% (visible but not dominant) |

---

## Timeframe-Specific Strategies

### Scalping (1m-5m Charts)

```
Settings:
- Lookback: 10-15
- Sensitivity: High
- Show HTF Pools: 15m, 1H
- Reclaim Candles: 1-2

Focus: Quick sweeps at HTF levels, fast reclaims
```

**Key insight:** HTF liquidity pools on 1m chart = high-conviction levels

---

### Day Trading (15m-1H Charts)

```
Settings:
- Lookback: 20
- Sensitivity: Normal
- Show HTF Pools: 4H, Daily
- Reclaim Candles: 3

Focus: Session high/low sweeps, Daily level sweeps
```

**Key insight:** Look for sweeps at yesterday's high/low, session extremes

---

### Swing Trading (4H-Daily Charts)

```
Settings:
- Lookback: 30
- Sensitivity: Normal
- Show HTF Pools: Weekly, Monthly
- Reclaim Candles: 3-5

Focus: Major swing point sweeps, weekly level sweeps
```

**Key insight:** Weekly liquidity pools = major reversal zones

---

### Position Trading (Weekly+ Charts)

```
Settings:
- Lookback: 40-50
- Sensitivity: Low
- Show HTF Pools: Monthly only
- Reclaim Candles: 5

Focus: Major structural sweeps only
```

---

## Understanding Sweep Types

### Type 1: Simple Sweep

```
    ────────── Level
         │
         ▼ Sweep below
         │
    ─────┴────
```

Price breaks level briefly, returns. Basic pattern.

### Type 2: Sweep + Reclaim

```
    ────────── Level
         │
         ▼ Sweep below
         │
    ─────┴────
         │
         ▲ Reclaim above level
    ████████████
```

Price breaks level, returns, AND closes back above. **Strong signal.**

### Type 3: Double Sweep

```
    ────────── Upper Level
         │
    ─────┬──── Sweep above
         │
         ▼
    ─────┴──── Sweep below
         │
    ────────── Lower Level
```

Both sides taken in quick succession. **Very strong reversal signal.**

---

## Multi-TF Confluence Scoring

| Confluence Level | What You See | Signal Strength |
|------------------|--------------|-----------------|
| **Maximum** | Sweep at pool visible on 3 TFs | Highest conviction |
| **Strong** | Sweep at pool visible on 2 TFs | High conviction |
| **Standard** | Sweep at current TF pool only | Normal conviction |
| **Weak** | Sweep without pool marking | Lower conviction |

---

## Session-Based Settings

### London Session (02:00-10:00 EST)

```
Focus: Sweeps of Asian session high/low
HTF Pools: Show Daily, 4H
Sensitivity: Normal to High
```

**Common pattern:** Sweep Asian high → reverse for London

---

### New York Session (08:00-16:00 EST)

```
Focus: Sweeps of London high/low, OR previous day
HTF Pools: Show Daily, Weekly
Sensitivity: Normal
```

**Common pattern:** Sweep London high → continuation OR reversal

---

### Asian Session (20:00-02:00 EST)

```
Focus: Sweeps within range, setting up for London
HTF Pools: Show 4H, Daily
Sensitivity: Low (less volatility)
```

**Common pattern:** Range-bound, building liquidity for London

---

## Janus + Pentarch Integration

| Janus Signal | Pentarch Confirmation | Result |
|--------------|----------------------|--------|
| Sweep below pool | TD fires | High-conviction long setup |
| Sweep + Reclaim | IGN fires | Breakout confirmation |
| Sweep above pool | WRN fires | Late-cycle warning |
| Double sweep | TD + IGN sequence | Strong reversal |

---

## Visual Display Guide

### Pool Zone Colors (Recommended)

| Pool Type | Color | Meaning |
|-----------|-------|---------|
| Current TF Support Pool | Green (transparent) | Buy-side liquidity below |
| Current TF Resistance Pool | Red (transparent) | Sell-side liquidity above |
| HTF Support Pool | Blue (dashed) | Major buy-side liquidity |
| HTF Resistance Pool | Orange (dashed) | Major sell-side liquidity |

### Signal Markers

| Marker | Meaning |
|--------|---------|
| ▼ below candle | Sweep of lows detected |
| ▲ above candle | Sweep of highs detected |
| ★ | Sweep + Reclaim (strongest) |

---

## Optimization Checklist

### Weekly Settings Review

- [ ] Are sweeps being detected at obvious levels?
- [ ] Too many pool zones? Increase lookback
- [ ] Missing sweeps? Decrease lookback or increase sensitivity
- [ ] HTF pools aligning with major S/R?
- [ ] Reclaim signals giving enough time? Adjust reclaim candles

### Before Each Session

- [ ] Identify key liquidity pools for the day
- [ ] Note HTF pools that may be swept
- [ ] Mark previous session high/low
- [ ] Check daily/weekly level proximity

---

## Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Too many pools | Lookback too short | Increase to 30+ |
| Missing obvious sweeps | Sensitivity too low | Increase sensitivity |
| HTF pools cluttering chart | Too many TFs shown | Limit to 2 HTFs |
| Sweeps not reclaiming | Reclaim candles too few | Increase to 4-5 |
| Pools not at key levels | Looking at wrong swings | Check lookback period |

---

## Non-Repainting Guarantee

- Sweep detection only fires on closed bars
- Pool zones calculated from historical swings (don't move)
- Reclaim signals require candle close above/below
- All signals are permanent once rendered

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
