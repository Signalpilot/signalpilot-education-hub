# Pentarch Quick Reference Card

**The 5 Signals + Supporting Components**

---

## The 5 Event Signals

| Signal | Color | Cycle Phase | What It Indicates |
|--------|-------|-------------|-------------------|
| **TD** (Touchdown) | 🟣 Purple | Early-Cycle | Reversal conditions forming |
| **IGN** (Ignition) | 🔵 Blue | Early-Cycle | Momentum breakout conditions |
| **WRN** (Warning) | 🟡 Yellow | Late-Cycle | Weakening momentum |
| **CAP** (Climax) | 🟠 Orange | Late-Cycle | Exhaustion conditions |
| **BDN** (Breakdown) | 🔴 Red | Transition | Bearish breakdown conditions |

---

## Signal Flow (Ideal Cycle)

```
BEAR MARKET          BULL MARKET           BEAR MARKET
    │                     │                     │
   TD ──→ IGN ──→ ────────────────→ WRN ──→ CAP ──→ BDN
    │       │              │          │       │       │
 Reversal  Breakout      Trend    Warning  Climax  Breakdown
  Setup     Fires      Continues   First   Peak    Confirmed
```

---

## The Pilot Line (PL)

| Color | Meaning | Interpretation |
|-------|---------|----------------|
| 🟢 **Green** | Strong uptrend | Momentum rising, trend healthy |
| 🔴 **Red** | Strong downtrend | Momentum falling, trend healthy |
| 🟠 **Orange** | Transitional | Momentum easing, caution |

**Key Uses:**
- Reference point for all signals
- Dynamic support/resistance
- Trend direction indicator

---

## Regime Bar Colors

| Candle Color | Regime | Context |
|--------------|--------|---------|
| 🟢 Green candles | Bull regime | Early-cycle signals preferred |
| 🔴 Red candles | Bear regime | Late-cycle signals preferred |
| Special colors | Event fired | Signal overrides regime color |

**3-Factor Voting:**
1. EMA34 vs EMA55
2. Price vs Pilot Line
3. Pilot Line slope

---

## NanoFlow Crosses

| Cross | Position | Meaning |
|-------|----------|---------|
| ✕ Green | Below candle | Micro bull momentum |
| ✕ Red | Above candle | Micro bear momentum |
| No cross | — | Choppy/unclear conditions |

**Use For:** Trend health assessment, signal validation

---

## Signal-by-Signal Details

### TD (Touchdown) 🟣
- **Fires:** Bear regime, near/below Pilot Line
- **Indicates:** Early-cycle reversal conditions
- **Look For:** Selling exhaustion, failed new lows
- **Validate With:** Green NanoFlow appearing after

### IGN (Ignition) 🔵
- **Fires:** Bear regime OR bull pullback
- **Indicates:** Momentum breakout conditions
- **Look For:** Volume expansion, reclaim of structure
- **Validate With:** Consistent green NanoFlow

### WRN (Warning) 🟡
- **Fires:** Bull regime, extended above Pilot Line
- **Indicates:** Weakening momentum
- **Look For:** Slowing advance, divergences
- **Validate With:** NanoFlow stops appearing

### CAP (Climax) 🟠
- **Fires:** Bull regime, far above Pilot Line
- **Indicates:** Late-cycle exhaustion
- **Look For:** Blow-off top behavior, extreme extension
- **Validate With:** Red NanoFlow appearing

### BDN (Breakdown) 🔴
- **Fires:** After WRN/CAP, losing Pilot Line
- **Indicates:** Bearish breakdown conditions
- **Look For:** Failed rally, structure break
- **Validate With:** Regime flip to red

---

## Regime Context Matrix

| Signal | In Correct Regime | Counter-Regime |
|--------|-------------------|----------------|
| **TD** | Standard setup | Dip buy in uptrend |
| **IGN** | Standard breakout | Pullback continuation |
| **WRN** | Standard warning | Bear rally fade |
| **CAP** | Standard climax | Rarely fires |
| **BDN** | Standard breakdown | Follows CAP |

---

## Signal Frequency (1H Chart)

| Component | Frequency | Purpose |
|-----------|-----------|---------|
| NanoFlow | 10-30/day | Micro momentum tracking |
| TD | 1-3/day | Reversal setups |
| IGN | 1-2/day | Breakout conditions |
| WRN | 1-2/day | Exhaustion warning |
| CAP | 0-1/day | Climax conditions |
| BDN | 0-1/day | Breakdown confirmation |

---

## Adjustable Settings

Pentarch has limited user-adjustable settings by design—detection parameters are internally optimized.

| Setting | Options | Description |
|---------|---------|-------------|
| Alert Toggles | On/Off for each signal | Enable alerts for TD, IGN, WRN, CAP, BDN |
| Color Palette | 5 presets | Choose color scheme or customize |
| Label Size | Small/Medium/Large | Adjust signal label size |

---

## The 4-Layer Reading System

```
Layer 1: PILOT LINE     → Where is trend?
Layer 2: REGIME COLOR   → What's the bias?
Layer 3: NANOFLOW       → How's momentum?
Layer 4: EVENT SIGNALS  → What's the indication?
```

**Read Order:** Start at Layer 1, work down to Layer 4

---

## Common Signal Combinations

| Sequence | Interpretation |
|----------|----------------|
| TD → IGN | Strong reversal underway |
| WRN → CAP | Exhaustion intensifying |
| CAP → BDN | Top confirmed, breakdown active |
| TD → TD | Failed first attempt, stronger setup |
| IGN → WRN (quick) | Weak breakout, caution |

---

## Red Flags (Low Quality Signals)

- Signal without volume confirmation
- Counter-regime signal without extreme conditions
- Signal during choppy NanoFlow (green/red alternating)
- Multiple signals in short time (uncertainty)
- Signal against higher timeframe trend

---

## Best Practices

1. **Wait for closed bars** — Signals only valid on close
2. **Check multi-timeframe** — Align with HTF trend
3. **Use NanoFlow validation** — Momentum should support
4. **Respect regime** — Trade with the structural bias
5. **Combine with Janus/Plutus** — Multi-indicator confluence

---

## Non-Repainting Guarantee

- All signals render on bar close only
- What you see is locked in permanently
- No recalculation on future bars
- Bar replay testing available

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
