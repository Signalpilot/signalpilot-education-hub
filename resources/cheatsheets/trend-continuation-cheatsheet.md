# Trend Continuation Patterns Cheatsheet

**Quick Reference for Pullback & Consolidation Setups**

---

## The Core Principle

> **Trends don't move in straight lines. They advance, consolidate, then continue.**

The goal: Enter during consolidation, ride the next leg.

---

## Flag Patterns

### Bull Flag

```
         │
    ████████ (Pole)
    ████████
    ████████
         ██═══
           ══██═══  (Flag)
              ══██═══
                 ████████ → Breakout
                 ████████
```

| Element | Description |
|---------|-------------|
| **Pole** | Sharp, high-volume advance |
| **Flag** | Downward sloping parallel channel |
| **Duration** | Flag should be shorter than pole |
| **Volume** | Declining during flag, expanding on break |
| **Target** | Pole height added to breakout point |

---

### Bear Flag

```
                 ████████
                 ████████
              ══██═══
           ══██═══  (Flag)
         ██═══
    ████████ (Pole)
    ████████
    ████████
         │
         ↓
```

| Element | Description |
|---------|-------------|
| **Pole** | Sharp, high-volume decline |
| **Flag** | Upward sloping parallel channel |
| **Duration** | Flag should be shorter than pole |
| **Volume** | Declining during flag, expanding on break |
| **Target** | Pole height subtracted from breakout point |

---

## Pennant Patterns

### Bull Pennant

```
         │
    ████████ (Pole)
    ████████
    ████████
         ██══╲
           ══╳═══  (Converging)
              ══╱══
                 ████████ → Breakout
```

| Element | Description |
|---------|-------------|
| **Pole** | Sharp advance |
| **Pennant** | Converging trendlines (triangle) |
| **Apex** | Point where lines meet |
| **Break** | Usually before 75% to apex |
| **Target** | Pole height added to breakout |

---

### Bear Pennant

```
                 ████████ → Breakdown
              ══╲══
           ══╳═══  (Converging)
         ██══╱
    ████████ (Pole)
    ████████
    ████████
         │
```

---

## Ascending/Descending Triangles

### Ascending Triangle (Bullish)

```
    ─────────────────────  Flat Resistance
          ╱
        ╱
      ╱
    ╱        → Usually breaks up
```

| Element | Description |
|---------|-------------|
| **Structure** | Flat top, rising bottom |
| **Psychology** | Buyers more aggressive each test |
| **Break** | Usually upward (70%+) |
| **Target** | Height of triangle at base |

---

### Descending Triangle (Bearish)

```
    ╲        → Usually breaks down
      ╲
        ╲
          ╲
    ─────────────────────  Flat Support
```

| Element | Description |
|---------|-------------|
| **Structure** | Falling top, flat bottom |
| **Psychology** | Sellers more aggressive each test |
| **Break** | Usually downward (70%+) |
| **Target** | Height of triangle at base |

---

## Rectangle (Trading Range)

### Bullish Rectangle

```
    ═══════════════════════  Resistance
    ██   ██   ██   ██   ████████ → Break
    ══   ══   ══   ══
    ═══════════════════════  Support
```

| Element | Description |
|---------|-------------|
| **Structure** | Parallel horizontal lines |
| **Prior Trend** | Uptrend = expect upside break |
| **Volume** | Low in range, high on break |
| **Target** | Range height added to breakout |

---

## Cup and Handle

```
                        ══
                      ══  ══ (Handle)
                    ══      ██████→
         ╲        ╱
          ╲      ╱
           ╲    ╱
            ╲  ╱
             ╲╱ (Cup)
```

| Element | Description |
|---------|-------------|
| **Cup** | U-shaped base (not V) |
| **Handle** | Small pullback from right side of cup |
| **Duration** | Cup: weeks to months; Handle: days to weeks |
| **Volume** | Lower on right side of cup, spikes on break |
| **Target** | Cup depth added to breakout |

---

## Pullback Entry Patterns

### The 3-Bar Pullback

```
Uptrend:
    ████
      ██  ← Pullback bar 1
        █ ← Pullback bar 2
       █  ← Pullback bar 3 (entry)
     █████████ → Continuation
```

**Rules:**
- 2-4 bars against trend
- Shallow retracement (38-50% Fib)
- Lower volume on pullback
- Enter when trend resumes

---

### Moving Average Pullback

```
          ████
        ████
      ████
    ████
      ██    ← Pullback to MA
      ██
    ████████████ → Bounce off MA
```

| MA | Best For |
|----|----------|
| 10 EMA | Aggressive (scalping) |
| 20 EMA | Standard (swing) |
| 50 SMA | Conservative (position) |

---

## Continuation Candlestick Patterns

### Rising Three Methods (Bullish)

```
    ████
    ████
      ██
      ██
      ██
    ████████ ← Continuation candle
```

| Element | Description |
|---------|-------------|
| Long green | Establishes trend |
| 3 small reds | Contained within first green |
| Long green | Closes above first green's high |

---

### Falling Three Methods (Bearish)

```
    ████████ ← Continuation candle
      ██
      ██
      ██
    ████
    ████
```

---

## Entry Strategies

| Strategy | Entry Point | Risk |
|----------|-------------|------|
| **Breakout** | On break of pattern | Higher (false breaks) |
| **Retest** | On retest of breakout level | Lower (may not retest) |
| **Anticipation** | Before breakout on pullback | Higher (pattern may fail) |

---

## Measuring Targets

### Measured Move Formula

```
Target = Breakout Point + Pattern Height

Flag/Pennant: Pole height
Triangle: Height at widest point
Rectangle: Range height
Cup & Handle: Cup depth
```

---

## Quality Checklist

### Before Trading Continuation Pattern

- [ ] **Clear prior trend** exists (not ranging)
- [ ] **Pattern is proportional** (consolidation < trend move)
- [ ] **Volume declining** during consolidation
- [ ] **Pattern not overextended** (within time limits)
- [ ] **Higher TF trend** supports direction
- [ ] **Risk/reward** minimum 2:1

---

## Pattern Failure Signs

| Warning Sign | What It Means |
|--------------|---------------|
| Volume rising in pattern | Distribution, not consolidation |
| Pattern taking too long | Trend may be reversing |
| Break on low volume | Fake breakout likely |
| Immediate reversal after break | Failed pattern, exit |
| Counter-trend break | Pattern failed, may reverse |

---

## SignalPilot Integration

| Pattern | Pentarch Signal |
|---------|-----------------|
| Flag/Pennant setup | Look for TD in pullback |
| Breakout candle | IGN should fire |
| Extended flag (warning) | WRN may appear |
| Failed pattern | BDN on breakdown |

| Pattern | Janus Atlas |
|---------|-------------|
| Pullback low | Sweep + reclaim = strong |
| Breakout | No sweep = clean break |

---

## Time Rules

| Pattern | Ideal Duration |
|---------|---------------|
| Flag | 1-3 weeks (5-20 bars daily) |
| Pennant | 1-4 weeks |
| Triangle | 3-8 weeks |
| Rectangle | 2-8 weeks |
| Cup & Handle | Cup: 1-6 months, Handle: 1-4 weeks |

**General Rule:** Consolidation < 1/3 of prior trend duration

---

## Stop Placement

| Pattern | Stop Location |
|---------|---------------|
| Flag/Pennant | Below pattern low (long) |
| Triangle | Below last swing low (long) |
| Rectangle | Below range support (long) |
| Cup & Handle | Below handle low |

**Buffer:** Add 0.5-1 ATR for safety

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
