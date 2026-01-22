# Signal Pilot Quick Start Guide

**Get Trading-Ready in 10 Minutes**

---

## Welcome to Signal Pilot

This guide will take you from installation to your first signal in 10 minutes or less. No fluff, just action.

---

## Step 1: Add Indicators to TradingView (2 minutes)

### Access Your Indicators

1. Log in to TradingView
2. Open any chart
3. Click **Indicators** (top toolbar or `/` key)
4. Go to **Invite-Only Scripts** tab
5. You'll see Signal Pilot indicators listed

### Core Indicators to Add First

| Priority | Indicator | Purpose |
|----------|-----------|---------|
| 1 | **Pentarch** | Cycle-phase signals (TD/IGN/WRN/CAP/BDN) |
| 2 | **Janus Atlas** | Liquidity sweeps |
| 3 | **Plutus Flow** | Volume/delta analysis |
| 4 | **Volume Oracle** | Order flow confluence |
| 5 | **Harmonic Oscillator** | Momentum voting |

**Start with Pentarch.** Add others as you learn.

---

## Step 2: Configure Pentarch (3 minutes)

### Default Settings (Recommended for Start)

Click the gear icon ⚙️ on Pentarch to access settings.

| Setting | Keep Default | Why |
|---------|--------------|-----|
| Regime Sensitivity | Normal | Balanced signals |
| Show Pilot Line | On | Trend reference |
| Show NanoFlow | On | Momentum health |
| Bar Coloring | On | Visual regime |

### Verify It's Working

You should see:
- ✅ Colored candles (green = bull regime, red = bear regime)
- ✅ Pilot Line (thick line through price)
- ✅ Historical signals (TD, IGN, WRN, CAP, BDN labels)

**If no signals appear:** Zoom out to see more history, or check a higher-volatility asset like BTC or SPY.

---

## Step 3: Understand the 5 Signals (2 minutes)

### Quick Signal Reference

| Signal | Color | Phase | What It Indicates |
|--------|-------|-------|-------------------|
| **TD** | 🟣 Purple | Early | Reversal conditions at lows |
| **IGN** | 🔵 Blue | Early | Momentum breakout starting |
| **WRN** | 🟡 Yellow | Late | Momentum weakening at highs |
| **CAP** | 🟠 Orange | Late | Exhaustion/climax conditions |
| **BDN** | 🔴 Red | Transition | Breakdown confirmed |

### The Cycle Flow

```
BOTTOMING              TRENDING UP              TOPPING
    │                       │                      │
   TD ──→ IGN ──→ ─────────────────→ WRN ──→ CAP ──→ BDN
```

---

## Step 4: Set Up Your First Chart (2 minutes)

### Recommended Starting Configuration

**Chart Settings:**
- Timeframe: 1H (best for learning)
- Asset: BTC/USD, SPY, or QQQ (liquid, signals often)
- Chart type: Candlestick

**Layout:**
```
┌─────────────────────────────────┐
│  Price + Pentarch (main)        │
│  Candles with signals overlaid  │
├─────────────────────────────────┤
│  Plutus Flow (panel below)      │
│  Volume/Delta analysis          │
└─────────────────────────────────┘
```

### Quick Layout Steps

1. Add Pentarch to main chart
2. Add Plutus Flow → it auto-creates lower panel
3. Adjust panel heights (drag divider)

---

## Step 5: Identify Your First Signal (1 minute)

### Look for Recent Signals

1. Scroll through recent history
2. Find a TD or WRN signal
3. Observe what happened next

### Signal Observation Exercise

```
Find a TD signal and note:
[ ] What was the regime? (red candles = correct)
[ ] Did price reverse after?
[ ] Was there an IGN after TD?
[ ] How many bars until the move?
```

---

## What's Next?

### Immediate Next Steps

1. **Watch 10-20 signals** — Don't trade yet, just observe
2. **Add Janus Atlas** — See where liquidity gets swept
3. **Complete Lesson 1** — "The Liquidity Lie" in Education Hub

### Learning Path

```
Day 1-3: Observe Pentarch signals, no trading
Day 4-7: Paper trade TD and IGN signals only
Week 2:  Add Janus Atlas, study sweeps
Week 3:  Add Plutus Flow, study volume
Week 4:  Start small live trading with system
```

---

## Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| No signals showing | Check timeframe (try 1H), check liquid asset |
| Indicator not loading | Refresh page, check invite-only access |
| Colors not showing | Enable bar coloring in settings |
| Signals too frequent | Increase regime sensitivity to Rock Solid |
| Signals too rare | Decrease regime sensitivity to Hair Trigger |

---

## Key Principles to Remember

### DO

- ✅ Wait for signals on closed bars
- ✅ Use higher timeframes first (1H, 4H)
- ✅ Combine TD/IGN with regime (red for TD, green for IGN)
- ✅ Practice before trading live

### DON'T

- ❌ Trade every signal blindly
- ❌ Ignore regime context
- ❌ Use on 1m charts right away
- ❌ Skip the education hub lessons

---

## Quick Reference Card

```
BULLISH SETUP:
Red regime → TD fires → Wait for IGN → Regime flips green

BEARISH SETUP:
Green regime → WRN fires → Watch for CAP → BDN confirms

PILOT LINE:
Green = uptrend | Red = downtrend | Orange = transition

NANOFLOW:
Green crosses = healthy bull | Red crosses = healthy bear
```

---

## Resources

| Resource | Location |
|----------|----------|
| Full Education Hub | signalpilot.io/education |
| Pentarch Reference | /resources/pentarch-complete-reference.md |
| Video Tutorials | signalpilot.io/tutorials |
| Discord Community | signalpilot.io/discord |

---

## You're Ready!

You now have:
- ✅ Pentarch installed and configured
- ✅ Understanding of the 5 core signals
- ✅ A chart setup to practice with
- ✅ A learning path to follow

**Next action:** Go observe 10 signals on the 1H chart without trading. Notice patterns. Build intuition.

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
