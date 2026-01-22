# Pentarch v1.0 Guide

**Cycle Phase Detection with Four-Layer Confirmation**

---

## What is Pentarch?

Pentarch is Signal Pilot's cycle phase detector. It identifies where price sits within the market cycle using a **four-layer detection system** that confirms signals before they fire. All events appear at bar close and do not repaint.

---

## The Five Cycle Signals

Pentarch displays five distinct signals representing different phases:

| Signal | Label | Position | Meaning |
|--------|-------|----------|---------|
| **TD** (Touchdown) | Purple | Below candle | Early-cycle reversal conditions detected. Accumulation phase. |
| **IGN** (Ignition) | Teal | Below candle | Momentum breakout conditions detected. Markup phase initiation. |
| **WRN** (Warning) | Yellow | Above candle | Weakening momentum detected. Distribution phase warning. |
| **CAP** (Climax) | Orange | Above candle | Late-cycle exhaustion. Extreme extension across all detection layers. |
| **BDN** (Breakdown) | Red | Above candle | Decline phase confirmed. Bearish structure break with four-layer alignment. |

---

## Four-Layer Detection System

Every signal must pass through four validation layers before firing:

1. **Regime Classification** - Market structure state (bullish/bearish/neutral)
2. **Pilot Line Distance** - Price extension relative to dynamic trend baseline
3. **NanoFlow Momentum** - Oscillator confirmation between -100 and +100
4. **Bar Close Confirmation** - Final validation only at candle close

All four layers must align simultaneously. This prevents false signals and eliminates repainting.

---

## Core Components

### Pilot Line
The dynamic adaptive trend line serving as reference baseline.

| Color | Meaning |
|-------|---------|
| Green | Bullish regime |
| Blue | Bearish regime |
| Gray | Neutral/transitional |

Price distance from the Pilot Line determines oversold/overbought conditions for signal generation.

### Regime Bar Colors
Candle body coloring reflects market structure:
- **Green candles** - Bullish characteristics detected
- **Red candles** - Bearish characteristics detected
- **Gray candles** - Neutral/transitional conditions

### NanoFlow
Momentum oscillator displayed in a separate panel below the chart:
- Oscillates between -100 and +100
- Green = Bullish momentum
- Red = Bearish momentum
- Validates momentum requirements before events fire

---

## Adjustable Settings

Pentarch has limited user adjustments by design—the detection parameters are internally optimized.

### Alert Toggles
Enable or disable alerts for each signal type:
- [ ] TD Alerts
- [ ] IGN Alerts
- [ ] WRN Alerts
- [ ] CAP Alerts
- [ ] BDN Alerts

### Color Palette
Choose from 5 preset color schemes or customize individual event colors to match your chart theme.

### Label Display
- **Label Position** - Automatic positioning above/below candles
- **Label Size** - Small, Medium, or Large

---

## Signal Interpretation

### TD (Touchdown)
- Often appears at support levels
- Indicates accumulation conditions
- Watch for IGN to follow after basing period

### IGN (Ignition)
- Momentum breakout signal
- Commonly interpreted as potential long entry
- Higher probability when following TD

### WRN (Warning)
- Appears near resistance zones
- Signals weakening momentum
- Time to review risk management

### CAP (Climax)
- Marks potential tops/bottoms
- Extreme extension detected
- Don't chase—watch for reversal

### BDN (Breakdown)
- Confirms downtrend continuation
- Bearish structure break validated
- Four-layer bearish alignment complete

---

## Important Characteristics

- **One event per bar maximum** - No multiple simultaneous signals
- **Complete cycles are rare** - Partial sequences (TD→IGN or WRN→CAP) occur more frequently
- **Works on all timeframes** - Event clarity varies by timeframe
- **Zero repaint guarantee** - Events confirm at bar close and never change

---

## Alert Setup

To set alerts in TradingView:

1. Right-click on Pentarch indicator
2. Select "Add alert on Pentarch"
3. Set frequency to **"Once Per Bar Close"** (prevents mid-bar false signals)
4. Set condition to **"Any alert() function call"** (captures all 5 signal types)

---

## Common Usage Patterns

### The Trinity Approach
Combine Pentarch with Janus Atlas (levels) and Volume Oracle (regime) for multi-factor confluence. Setups where all three align have higher probability.

### Confluence with Levels
- TD at support = stronger signal
- WRN at resistance = stronger signal
- CAP at extreme extensions = reversal watch

### Partial Sequences
Most trades come from partial sequences:
- **TD → IGN** = Accumulation to markup (long setup)
- **WRN → CAP** = Distribution to exhaustion (exit/short setup)

---

## Platform Requirements

- Works on all TradingView tiers including Free
- Free tier: 3 indicators per chart limit
- Essential ($14.95/mo): 5 indicators (recommended for The Trinity)

---

*For more on cycle analysis, see the Education Hub curriculum lessons on market cycles and Pentarch methodology.*
