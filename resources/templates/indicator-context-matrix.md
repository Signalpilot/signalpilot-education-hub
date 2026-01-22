# Indicator Context Matching Matrix

**When to Use Each Indicator & Avoid Common Mismatches**

---

## Purpose

Not every indicator works in every market condition. This matrix helps you:
- Match indicators to the right market regime
- Avoid common indicator misapplication
- Build context-appropriate analysis

---

## Part 1: Market Regime Identification

### The 4 Market Regimes

| Regime | Characteristics | Identification |
|--------|-----------------|----------------|
| **Trending Up** | HH/HL, above MAs, momentum up | ADX > 25, price above 20 EMA |
| **Trending Down** | LH/LL, below MAs, momentum down | ADX > 25, price below 20 EMA |
| **Ranging** | Sideways, within boundaries | ADX < 20, price oscillating |
| **Volatile/Choppy** | Whipsaws, no clear direction | Wide bars, failed breakouts |

### Quick Regime Check

**Before using any indicator, answer:**

1. Is the market trending or ranging?
2. If trending, up or down?
3. What is volatility level? (Low/Normal/High)

---

## Part 2: The Master Matrix

### Signal Pilot Indicators by Regime

| Indicator | Trending Up | Trending Down | Ranging | Choppy |
|-----------|-------------|---------------|---------|--------|
| **Pentarch** | ✅ Use TD/IGN | ✅ Use WRN/CAP/BDN | ⚠️ Noisy | ⚠️ Many false signals |
| **Janus Atlas** | ✅ Sweep lows | ✅ Sweep highs | ✅ Range boundaries | ⚠️ Double sweeps |
| **Plutus Flow** | ✅ Confirm trend | ✅ Confirm trend | ⚠️ Mixed signals | ❌ Unreliable |
| **Volume Oracle** | ✅ POC as support | ✅ POC as resistance | ✅ Range edges | ⚠️ Less useful |
| **Harmonic Osc.** | ⚠️ Stays overbought | ⚠️ Stays oversold | ✅ Mean reversion | ❌ Choppy signals |
| **Augury Grid** | ✅ Trend signals | ✅ Trend signals | ⚠️ Many triggers | ⚠️ Filter heavily |

### Legend

- ✅ Optimal use case
- ⚠️ Use with caution/modifications
- ❌ Avoid or heavily discount

---

## Part 3: Pentarch Context Rules

### Trending Up Context

| Signal | Meaning | Action |
|--------|---------|--------|
| **TD** | Dip-buying opportunity | Long on pullback |
| **IGN** | Breakout confirmation | Add to position |
| **WRN** | First caution sign | Tighten stops |
| **CAP** | Consider taking profits | Partial exit |
| **BDN** | Trend may be ending | Exit longs |

**Key rule:** TD/IGN are the primary signals. WRN/CAP are warnings, not shorts.

### Trending Down Context

| Signal | Meaning | Action |
|--------|---------|--------|
| **TD** | Potential bounce/reversal | Watch only (or counter-trend) |
| **IGN** | Failed rally | Continue short bias |
| **WRN** | Rally exhausting | Short on rally |
| **CAP** | Selling climax possible | Cover shorts |
| **BDN** | Breakdown continues | Add to shorts |

**Key rule:** WRN/CAP/BDN are primary. TD might be a trap.

### Ranging Context

| Signal | Meaning | Action |
|--------|---------|--------|
| **TD** | At range support | Long to resistance |
| **WRN** | At range resistance | Short to support |
| Other | Less reliable | Reduce significance |

**Key rule:** Only trade signals at range boundaries. Middle-range signals are noise.

---

## Part 4: Janus Atlas Context Rules

### Trending Market

| Context | Sweep Type | Action |
|---------|-----------|--------|
| Uptrend | Sweep of lows | High-probability long entry |
| Uptrend | Sweep of highs | Likely continuation (less useful) |
| Downtrend | Sweep of highs | High-probability short entry |
| Downtrend | Sweep of lows | Likely continuation (less useful) |

**Key rule:** Trade sweeps AGAINST the trend direction for reversals.

### Ranging Market

| Context | Sweep Type | Action |
|---------|-----------|--------|
| Range | Sweep below range | Long to range high |
| Range | Sweep above range | Short to range low |
| Range | Double sweep (both sides) | Prepare for breakout |

**Key rule:** Sweeps at range boundaries = mean reversion trades.

### Choppy Market

**Warning:** Janus may show many sweeps in both directions.

**Adjustment:**
- Require larger sweeps (wider threshold)
- Require stronger reclaim candles
- Trade only with HTF alignment

---

## Part 5: Plutus Flow Context Rules

### Trending Market

| Plutus Reading | Trend Direction | Interpretation |
|----------------|-----------------|----------------|
| OBV rising | Uptrend | Confirmed, continue |
| OBV rising | Downtrend | Bullish divergence, watch |
| OBV falling | Downtrend | Confirmed, continue |
| OBV falling | Uptrend | Bearish divergence, watch |

**Key rule:** OBV should confirm trend. Divergence = warning.

### Ranging Market

| Plutus Reading | Interpretation |
|----------------|----------------|
| OBV making higher highs | Hidden accumulation |
| OBV making lower lows | Hidden distribution |
| OBV flat | True balance |

**Key rule:** Watch for OBV breakout to predict range break.

### Choppy Market

**Warning:** Delta will flip rapidly. OBV will be erratic.

**Adjustment:**
- Ignore single-bar delta
- Focus only on clear multi-bar patterns
- Or turn off temporarily

---

## Part 6: Harmonic Oscillator Context Rules

### Trending Market

**Uptrend behavior:**
- Oscillator ranges 40-80 (not 30-70)
- "Oversold" is 40-50 (buy zone)
- Can stay "overbought" (70+) for extended periods
- Don't short overbought in uptrend

**Downtrend behavior:**
- Oscillator ranges 20-60 (not 30-70)
- "Overbought" is 50-60 (sell zone)
- Can stay "oversold" (30-) for extended periods
- Don't buy oversold in downtrend

### Ranging Market

**Standard behavior:**
- Oscillator ranges 30-70
- Overbought (70) = sell signal
- Oversold (30) = buy signal
- Mean reversion works

**Key rule:** Adjust thresholds based on regime.

### Choppy Market

**Warning:** Vote count will flip frequently.

**Adjustment:**
- Increase required votes (e.g., 4/5 instead of 3/5)
- Use Rock Solid sensitivity
- Focus only on extremes (80+, 20-)

---

## Part 7: Common Mismatches to Avoid

### Mismatch 1: RSI Oversold in Downtrend

**The trap:** "RSI is 25, must be a bottom!"
**Reality:** RSI can stay oversold for weeks in downtrend
**Fix:** Wait for divergence + price confirmation

### Mismatch 2: Breakout Trading in Range

**The trap:** "Price broke resistance, go long!"
**Reality:** Ranging markets produce many false breakouts
**Fix:** Wait for reclaim to confirm OR volume confirmation

### Mismatch 3: Mean Reversion in Trend

**The trap:** "Price is far from the mean, it must revert!"
**Reality:** Trends can extend far beyond "normal"
**Fix:** Trade pullbacks in trend direction only

### Mismatch 4: Single Indicator Reliance

**The trap:** Using Pentarch alone without context
**Reality:** Signals are more reliable with confluence
**Fix:** Combine Pentarch + Janus + Plutus for confirmation

---

## Part 8: Regime-Based Indicator Combinations

### Trending Market Stack

```
Primary: Pentarch (TD/IGN for up, WRN/CAP/BDN for down)
Confirm: Plutus Flow (OBV confirming trend)
Entry: Janus Atlas (sweeps for entry timing)
Filter: Harmonic at adjusted range (40-80 up, 20-60 down)
```

### Ranging Market Stack

```
Primary: Janus Atlas (sweeps at range boundaries)
Confirm: Pentarch TD/WRN at range edges
Entry: Harmonic at extremes (30/70)
Filter: Plutus for hidden accumulation/distribution
```

### Transitional Market Stack

```
Primary: Plutus Flow (watch for divergence)
Confirm: Pentarch (watch for signal sequence change)
Watch: Janus (double sweeps = breakout coming)
Filter: Harmonic crossing 50 level
```

---

## Part 9: Quick Reference Checklists

### Before Using Any Indicator

- [ ] What is the current regime? (Trend/Range/Choppy)
- [ ] Is this indicator appropriate for this regime?
- [ ] Have I adjusted settings/interpretation for context?
- [ ] Do I have confirming indicators aligned?

### Trending Market Checklist

- [ ] Using Pentarch in correct direction
- [ ] Plutus OBV confirming
- [ ] Trading pullbacks, not tops/bottoms
- [ ] Adjusted oscillator ranges

### Ranging Market Checklist

- [ ] Trading only at range boundaries
- [ ] Using Janus for sweep entries
- [ ] Using oscillators for mean reversion
- [ ] Watching for breakout setup

### Choppy Market Checklist

- [ ] Reduced position size
- [ ] Increased confirmation requirements
- [ ] Trading only clearest signals
- [ ] Or simply not trading

---

## Part 10: Personal Context Matrix

### My Trading Style

**I primarily trade:**
☐ Trending markets (momentum)
☐ Ranging markets (mean reversion)
☐ Both

**My primary timeframe:** _____________

### My Indicator Stack by Regime

**Trending:**
1. _____________
2. _____________
3. _____________

**Ranging:**
1. _____________
2. _____________
3. _____________

**I avoid trading in:** _____________

### My Context Rules

**I will NOT trade when:**

- [ ] _____________________________________________
- [ ] _____________________________________________
- [ ] _____________________________________________

**I will use reduced size when:**

- [ ] _____________________________________________
- [ ] _____________________________________________

---

## Part 11: Summary

### The Core Principle

**No indicator works in all conditions.**

Before using any indicator:
1. Identify the regime
2. Check if the indicator is appropriate
3. Adjust interpretation if needed
4. Seek confirmation from context-appropriate indicators

### The Quick Check

```
REGIME → INDICATOR SELECTION → ADJUSTED INTERPRETATION → CONFIRMATION
```

### The Matrix Mindset

"This indicator says X, but what is the regime?"
"Is this signal reliable in this context?"
"What would confirm or contradict this signal?"

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
