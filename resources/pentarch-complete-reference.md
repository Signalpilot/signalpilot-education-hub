# 🎯 Pentarch Complete Reference Guide

**Version**: 11.0
**Last Updated**: October 2025
**For**: Signal Pilot Education Hub

---

## Table of Contents

1. [Overview](#overview)
2. [The 8 Components](#the-8-components)
3. [The Pilot Line (PL)](#the-pilot-line-pl)
4. [Regime Bar Colors](#regime-bar-colors)
5. [NanoFlow](#nanoflow)
6. [The 5 Event Signals](#the-5-event-signals)
7. [How All Components Work Together](#how-all-components-work-together)
8. [Quick Reference](#quick-reference)

---

## Overview

**Pentarch** is Signal Pilot's cycle-phase detection system. While the name comes from the 5 event signals (TD, IGN, CAP, WRN, BDN), the complete system includes **8 components** that work together to show market cycle position and momentum.

### The 8 Components

| Component | Type | Frequency | Purpose |
|-----------|------|-----------|---------|
| **Pilot Line** | Trend indicator | Always visible | Shows trend direction and reference point |
| **Regime Bar Colors** | Visual state | Every candle | Indicates structural bias (bull/bear) |
| **NanoFlow** | Micro momentum | 10-30/day (1H) | Shows micro trend health |
| **TD (Touchdown)** | Event signal | 1-3/day (1H) | Indicates early-cycle reversal conditions |
| **IGN (Ignition)** | Event signal | 1-2/day (1H) | Indicates momentum breakout conditions |
| **CAP (Climax)** | Event signal | 1-2/day (1H) | Indicates late-cycle exhaustion conditions |
| **WRN (Warning)** | Event signal | 1-2/day (1H) | Indicates weakening momentum |
| **BDN (Breakdown)** | Event signal | 1-2/day (1H) | Indicates bearish breakdown conditions |

**Educational Purpose:** This system is designed to help traders understand market cycle phases and structure. It shows conditions and patterns, not predictions or trading directives.

---

## The Pilot Line (PL)

### What It Is

The **Pilot Line** is your primary trend reference indicator. Think of it as the "baseline" for price action. All event signals measure their position relative to this line.

### Technical Details

- **Calculation**: Double-smoothed EMA (34-period EMA, then 3-period EMA of that)
- **Why double-smoothed?** Balances responsiveness with noise filtering
- **Visual**: Thick line (2px width) with semi-transparent ribbon (±0.25 ATR)

### Color System

| Color | Meaning | Interpretation |
|-------|---------|----------------|
| 🟢 Green | Strong uptrend | Slope rising, momentum strong |
| 🔴 Red | Strong downtrend | Slope falling, momentum strong |
| 🟠 Orange | Transitional | Momentum easing or flat, trend weakening |

### What It Shows You

1. **Trend Direction**: The line's color indicates current trend state
2. **Reference Point**: Event signals measure distance FROM this line
3. **Dynamic Support/Resistance**: Price tends to return to PL (gravitational effect)
4. **Momentum Changes**: Color transitions (green→orange→red) show momentum shifts

### How to Read It

**Slope Detection:**
- The line uses "epsilon" logic (2% of ATR) to filter noise
- **Easing** = Trend still moving same direction BUT momentum slowing 25%+
- When easing occurs, color changes to orange (potential exhaustion)

**Distance Context:**
- Event candles measure their distance from PL in ATR units (volatility-normalized)
- **TD**: Typically near or below PL
- **IGN**: Below PL (reversal) or slightly above (pullback)
- **WRN/CAP**: Above PL (indicating late-cycle conditions)
- **BDN**: Often loses PL during breakdown

### Common Questions

**Q: Is the Pilot Line the same as a moving average?**
A: Similar concept, but double-smoothed for trend clarity and uses slope-based coloring for momentum insights.

**Q: Should I trade Pilot Line crossovers?**
A: No. The line itself doesn't give entry signals. Event candles (TD/IGN/WRN/CAP/BDN) use PL as context and provide the actual cycle-phase indications.

**Q: What does the ribbon mean?**
A: The semi-transparent bands show the "influence zone." Price within ribbon = balanced. Price outside ribbon = extended.

**Q: Does the Pilot Line repaint?**
A: No. It only updates on closed bars. What you see is locked in once the bar closes.

---

## Regime Bar Colors

### What It Is

Pentarch colors every candle on your chart based on the current **regime state**. This provides instant visual feedback about market structure.

### How Regime Is Determined

**Three-Factor Voting System:**

1. **EMA Structure**: Is EMA34 above EMA55? (+1 for bull)
2. **Price vs PL**: Is close above Pilot Line? (+1 for bull)
3. **Slope Direction**: Is PL sloping up? (+1 for bull)

**Regime Rules:**
- Requires 2+ of 3 votes to establish regime
- Needs 2+ consecutive bars of majority votes (prevents whipsaw)
- Once in regime, stays until strong opposing votes appear

### Visual System

| Candle Color | Meaning | Educational Context |
|--------------|---------|--------------|
| 🟢 Green | Bull regime active | Typically associated with analysis of early-cycle conditions (TD/IGN) |
| 🔴 Red | Bear regime active | Typically associated with analysis of late-cycle conditions (WRN/CAP/BDN) |
| 🟣🔵🟡🟠🔴 Special colors | Event signal fired | Specific reversal/continuation indication on that bar |

**Note:** Event candles override regime color when they fire.

### What It Shows You

1. **Instant Regime Awareness**: Candle color shows regime without checking additional indicators
2. **Context for Events**: Same signal means different things in different regimes
3. **Visual Structural Context**: Green indicates bull regime structure, Red indicates bear regime structure
4. **Trend Strength**: Long color streaks = strong trend, frequent changes = choppy

### Regime Context Examples

**TD in Different Regimes:**
- TD in red regime = Classic early-cycle reversal indication (standard)
- TD in green regime = Dip indication in uptrend (counter-regime, requires extreme conditions)

**WRN in Different Regimes:**
- WRN in green regime = Late-cycle exhaustion warning (standard)
- WRN in red regime = Bear rally fade indication (counter-regime, requires extreme conditions)

### Common Questions

**Q: Can I turn off bar coloring?**
A: Currently no—it's a core visual feature. Event candles override it, so signals remain clearly visible.

**Q: Why does regime stay green/red when price moves against it?**
A: Regime shows structure, not tick-by-tick action. A few bars against trend doesn't break structure—the system filters noise.

**Q: What if I'm colorblind?**
A: Focus on event labels (TD/IGN/WRN/CAP/BDN text) rather than colors. The text labels are clear identifiers.

**Q: Does regime affect which signals appear?**
A: Yes! Most events require the "correct" regime:
- TD typically requires bear regime (except counter-regime mode)
- IGN requires bear regime OR bull regime with pullback mode enabled
- WRN/CAP typically require bull regime (except counter-regime mode)
- BDN follows WRN/CAP, so it's regime-dependent

**Q: Can I adjust the regime detection?**
A: No. Regime detection parameters are internally optimized and not user-adjustable. This ensures consistent, tested behavior across all users. User-adjustable settings are limited to alert toggles, color palette, and label size.

---

## NanoFlow

### What It Is

**NanoFlow** is a high-frequency momentum indicator showing micro-scale trend shifts. It fires much more often than the 5 main event signals, providing "micro context" between major indications.

### Technical Details

**Calculation:**
- **Fast EMA**: 9-period
- **Slow EMA**: 21-period
- **Micro Trend**: Fast above slow = micro uptrend, Fast below slow = micro downtrend

**Conditions:**
- **Bullish NanoFlow**: Micro uptrend + green candle + price above Pilot Line
- **Bearish NanoFlow**: Micro downtrend + red candle + price below Pilot Line

### Visual Display

- **Bullish**: Small green cross ✕ BELOW the low of candle (offset 0.16 ATR)
- **Bearish**: Small red cross ✕ ABOVE the high of candle (offset 0.16 ATR)
- **Transparency**: 90% (subtle, not overwhelming)

### What It Shows You

1. **Micro Momentum**: Shows when fast momentum aligns with candle and Pilot Line
2. **Continuation Context**: Many NanoFlow crosses = strong momentum sustained
3. **Early Warning**: NanoFlow changes often precede major event signals
4. **Intrabar Structure**: Reveals the "texture" of the move (smooth vs. struggling)

### How to Use NanoFlow

**Trend Health Check:**
- In uptrend: Lots of green NanoFlow = healthy momentum
- In uptrend: No green NanoFlow = weakening momentum
- In downtrend: Lots of red NanoFlow = healthy momentum
- In downtrend: No red NanoFlow = weakening momentum

**Event Validation:**
- TD fires + green NanoFlow appears next bar = Good indication quality
- WRN fires + red NanoFlow appears next bar = Good indication quality
- IGN fires + no green NanoFlow for 5 bars = Weak indication quality

**Chop Detection:**
- NanoFlow flipping green/red rapidly = Indicates choppy conditions, unclear momentum
- NanoFlow absent entirely = Indicates low volatility conditions

### NanoFlow vs. Main Events

| Feature | NanoFlow | Main Events (TD/IGN/WRN/CAP/BDN) |
|---------|----------|----------------------------------|
| **Frequency** | 10-30 per day (1H chart) | 3-8 per day (1H chart) |
| **Sensitivity** | High (9 vs 21 EMA) | Low (multi-factor validation) |
| **Purpose** | Micro momentum tracking | Major cycle-phase indications |
| **Visual** | Small crosses | Large colored labels |
| **Actionability** | Context/validation | Primary analysis signals |
| **Regime Dependent?** | No (can fire anytime) | Yes (mostly regime-specific) |

### Common Questions

**Q: Should I trade every NanoFlow cross?**
A: No. NanoFlow is too sensitive for direct trading signals. It can be used to assess TD/IGN/WRN/CAP/BDN signal quality in educational analysis.

**Q: Can I turn off NanoFlow if it's too noisy?**
A: Yes. In TradingView settings, uncheck "Show NanoFlow Crosses."

**Q: Why don't I see NanoFlow sometimes?**
A: NanoFlow requires ALL conditions met:
- Micro trend (9 vs 21 EMA) aligned
- Candle color matching trend
- Price on correct side of Pilot Line
If any condition fails, no cross appears.

**Q: Does NanoFlow repaint?**
A: No. Like everything else, it only renders on closed bars. What you see is locked in.

**Q: What timeframe is best for NanoFlow?**
A: Works on all timeframes, but most useful on 5m, 15m, 1H (shows micro structure clearly). Less useful on Daily+ (too many crosses).

---

## The 5 Event Signals

### Signal Names & Descriptions

**ALL signals use "indicates"** (never "confirms", "signals", "detects", "marks")

✅ **TD (Touchdown)** → Indicates early-cycle reversal conditions
✅ **IGN (Ignition)** → Indicates momentum breakout conditions
✅ **CAP (Climax)** → Indicates late-cycle exhaustion conditions
✅ **WRN (Warning)** → Indicates weakening momentum
✅ **BDN (Breakdown)** → Indicates bearish breakdown conditions

### When Each Signal Appears

| Signal | Typical Regime | Distance from PL | Interpretation |
|--------|---------------|------------------|----------------|
| **TD** | Bear (red candles) | Near or below PL | Early-cycle reversal conditions indicated |
| **IGN** | Bear or Bull (pullback) | Below PL or slightly above | Momentum breakout conditions indicated |
| **WRN** | Bull (green candles) | Above PL | Weakening momentum indicated |
| **CAP** | Bull (green candles) | Above PL | Late-cycle exhaustion conditions indicated |
| **BDN** | After WRN/CAP | Losing PL | Bearish breakdown conditions indicated |

### Educational Note

These signals show market cycle phases and conditions for educational analysis. They are not trading directives or predictions. Always conduct your own research and risk management.

---

## How All Components Work Together

### The 4-Layer System

**Layer 1: Pilot Line (Macro Structure)**
- Shows overall trend direction
- Provides reference point for distance metrics
- Updates every bar based on slope and momentum

**Layer 2: Regime Bar Colors (Structural State)**
- Colors every candle based on 3-factor voting
- Shows if you're in bull or bear structural mode
- Overridden by event candles when they fire

**Layer 3: NanoFlow (Micro Momentum)**
- Small crosses showing fast-moving trend shifts
- Appears 10-30 times per day (1H)
- Validates or questions trend health

**Layer 4: Event Signals (Cycle-Phase Indications)**
- TD/IGN/WRN/CAP/BDN = The actual cycle-phase signals
- Appears 3-8 times per day (1H)
- Uses all above layers as context

### Visual Hierarchy

```
┌─────────────────────────────────────────────┐
│ Chart Candles (colored by regime)          │
│ 🟢🟢🟢🟢 → Bull regime active              │
│ 🔴🔴🔴🔴 → Bear regime active              │
│                                             │
│ Pilot Line (thick line with ribbon)        │
│ ━━━━━━━ → Green = uptrend                  │
│ ━━━━━━━ → Red = downtrend                  │
│                                             │
│ NanoFlow Crosses (subtle marks)             │
│   ╳ ╳ ╳ → Green = micro bull momentum      │
│ ╳ ╳ ╳   → Red = micro bear momentum        │
│                                             │
│ Event Labels (large, colored)               │
│ 🟣TD 🔵IGN 🟡WRN 🟠CAP 🔴BDN                │
│                                             │
└─────────────────────────────────────────────┘
```

### Decision Flow

**START: Looking at a bar**

1. **What COLOR is the candle?**
   - Green = Bull regime → Typically associated with early-cycle analysis
   - Red = Bear regime → Typically associated with late-cycle analysis
   - Special color = Event fired this bar

2. **Where is price vs PILOT LINE?**
   - Above + Green line = Strong uptrend structure
   - Below + Red line = Strong downtrend structure
   - At orange line = Transition/uncertainty

3. **Is there a NANOFLOW cross?**
   - Green cross = Micro momentum with trend
   - Red cross = Micro momentum against trend
   - No cross = Choppy or unclear micro trend

4. **Is there an EVENT LABEL?**
   - YES = This is your cycle-phase indication bar
   - NO = Monitor and wait

**END: Use EVENT LABELS for analysis, use other layers as context**

### Example Scenario (Full Integration)

**Bitcoin 1H Chart - Hypothetical Setup:**

**Bars 1-10:**
- Candles: 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢 (All green - bull regime)
- Pilot Line: Green, sloping up
- NanoFlow: Green crosses every 2-3 bars (healthy uptrend)
- Events: None yet

**Bar 11:**
- Candles: 🟢🟢🟢🟢🟢🟢🟢🟢🟢🟢🟡 (Yellow WRN candle)
- Pilot Line: Still green but starting to ease
- NanoFlow: No green cross (momentum fading)
- Events: **WRN fired** → Warning indication, late-cycle exhaustion may be near

**Bars 12-14:**
- Candles: 🟠🟠 (Orange - transition, regime not flipped yet)
- Pilot Line: Orange (easing, losing momentum)
- NanoFlow: Red cross appears on bar 13
- Events: None

**Bar 15:**
- Candles: 🔴 (First red candle - regime flipped to bear)
- Pilot Line: Now red
- NanoFlow: Red cross
- Events: **BDN fired** → Breakdown conditions indicated

**Interpretation:**
1. WRN indicated late-cycle exhaustion at cycle peak (bar 11)
2. NanoFlow stopped showing green (momentum died)
3. Pilot Line turned orange (trend weakening)
4. Regime flipped red (structural bearish)
5. BDN indicated breakdown conditions (bar 15)

**Result:** Clear cycle transition from late-cycle to early-cycle captured by all 4 layers working together.

---

## Quick Reference

### Color Guide

| Color | Component | Meaning |
|-------|-----------|---------|
| 🟢 Green candles | Regime | Bull regime active |
| 🔴 Red candles | Regime | Bear regime active |
| 🟢 Green Pilot Line | Trend | Strong uptrend |
| 🔴 Red Pilot Line | Trend | Strong downtrend |
| 🟠 Orange Pilot Line | Trend | Transitional, easing |
| ✕ Green cross below | NanoFlow | Micro bull momentum |
| ✕ Red cross above | NanoFlow | Micro bear momentum |
| 🟣 TD label | Event | Early-cycle reversal conditions |
| 🔵 IGN label | Event | Momentum breakout conditions |
| 🟡 WRN label | Event | Weakening momentum |
| 🟠 CAP label | Event | Late-cycle exhaustion conditions |
| 🔴 BDN label | Event | Bearish breakdown conditions |

### Key Principles

1. **Pilot Line is your baseline** - Everything else relates to it
2. **Regime colors show structural context** - Green indicates bull regime, Red indicates bear regime
3. **NanoFlow shows momentum quality** - Can be used to assess trend health in analysis
4. **Event signals are your cycle-phase indications** - These show market cycle phases
5. **All layers work together** - Context (PL, Regime, NanoFlow) informs Analysis (Events)

### Remember

- The five event candles indicate cycle phases for educational analysis
- Everything else provides context for understanding those phases
- Pilot Line (where), Regime (bias), NanoFlow (health) → inform → Events (indication)

---

**Educational Disclaimer:**

Pentarch provides educational tools designed to help traders understand market cycle phases and structure. All signals and indicators show current market conditions based on historical patterns and mathematical models—not predictions or guaranteed outcomes.

These materials are for educational purposes only and should not be considered financial advice or trading recommendations. Past performance does not guarantee future results. Trading involves significant risk of loss.

Always conduct your own research, understand the risks involved, and consider consulting with qualified financial professionals before making trading decisions.

---

**Version Information:**
- **Code Version**: v11.0
- **Documentation Updated**: October 2025
- **For**: Signal Pilot Education Hub

**Technical Implementation Notes:**
- Pilot Line: Code lines 209-231
- Regime System: Code lines 233-264
- Regime Bar Colors: Code lines 810-825
- NanoFlow: Code lines 827-843
