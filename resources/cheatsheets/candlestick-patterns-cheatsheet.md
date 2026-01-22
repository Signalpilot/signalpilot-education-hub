# Candlestick Patterns Cheatsheet

**Essential Single & Multi-Candle Formations**

---

## Anatomy of a Candlestick

```
        │ ← Upper Wick (Shadow)
        │
    ┌───────┐
    │       │ ← Body (Open to Close)
    │       │
    └───────┘
        │
        │ ← Lower Wick (Shadow)
```

| Element | Bullish Candle | Bearish Candle |
|---------|----------------|----------------|
| **Body Color** | Green/White | Red/Black |
| **Open** | Bottom of body | Top of body |
| **Close** | Top of body | Bottom of body |
| **High** | Top of upper wick | Top of upper wick |
| **Low** | Bottom of lower wick | Bottom of lower wick |

---

## Single Candle Patterns

### Doji Varieties

| Pattern | Shape | Meaning |
|---------|-------|---------|
| **Standard Doji** | ─┼─ | Indecision, open = close |
| **Long-Legged Doji** | │┼│ | High volatility indecision |
| **Dragonfly Doji** | ┬ | Bullish at support (rejected lows) |
| **Gravestone Doji** | ┴ | Bearish at resistance (rejected highs) |

---

### Hammer & Hanging Man

```
    Hammer (Bullish)        Hanging Man (Bearish)

          ██                      ██
          │                       │
          │                       │
          │                       │

    (After downtrend)       (After uptrend)
```

| Feature | Description |
|---------|-------------|
| **Body** | Small, at top of range |
| **Lower Wick** | 2-3x body length |
| **Upper Wick** | Little to none |
| **Key** | Location determines meaning |

---

### Inverted Hammer & Shooting Star

```
    Inverted Hammer          Shooting Star
    (Bullish)                (Bearish)

          │                       │
          │                       │
          │                       │
          ██                      ██

    (After downtrend)       (After uptrend)
```

| Feature | Description |
|---------|-------------|
| **Body** | Small, at bottom of range |
| **Upper Wick** | 2-3x body length |
| **Lower Wick** | Little to none |
| **Key** | Location determines meaning |

---

### Marubozu

```
    Bullish Marubozu         Bearish Marubozu

    ┌───────────┐            ┌───────────┐
    │███████████│            │███████████│
    │███████████│            │███████████│
    │███████████│            │███████████│
    └───────────┘            └───────────┘
    (No wicks)               (No wicks)
```

| Feature | Description |
|---------|-------------|
| **Body** | Full range, open to close |
| **Wicks** | None or very small |
| **Meaning** | Strong conviction in direction |

---

### Spinning Top

```
        │
    ┌───────┐
    │  ██   │
    └───────┘
        │
```

| Feature | Description |
|---------|-------------|
| **Body** | Small (color irrelevant) |
| **Wicks** | Roughly equal upper and lower |
| **Meaning** | Indecision, potential reversal |

---

## Two-Candle Patterns

### Engulfing Patterns

```
Bullish Engulfing           Bearish Engulfing

    ██                          ████████
  ████████                        ██

(Red → Big Green)           (Green → Big Red)
```

| Type | First Candle | Second Candle | Signal |
|------|--------------|---------------|--------|
| Bullish | Small red | Large green engulfs | Buy at support |
| Bearish | Small green | Large red engulfs | Sell at resistance |

---

### Harami (Inside Bar)

```
Bullish Harami              Bearish Harami

████████                    ████████
  ██                          ██

(Big Red → Small inside)   (Big Green → Small inside)
```

| Type | First Candle | Second Candle | Signal |
|------|--------------|---------------|--------|
| Bullish | Large red | Small inside | Reversal possible |
| Bearish | Large green | Small inside | Reversal possible |

---

### Piercing Line & Dark Cloud Cover

```
Piercing Line               Dark Cloud Cover

    ██                           ██
  ████                         ████
████                             ████
                                   ██

(Red → Green opens below,   (Green → Red opens above,
 closes > 50% into red)      closes > 50% into green)
```

---

### Tweezer Tops & Bottoms

```
Tweezer Bottom              Tweezer Top

    ██ ██                       ██ ██
    │   │                       │   │
    │   │                       ██ ██
    ─────                       ─────
(Same lows)                 (Same highs)
```

| Type | Structure | Signal |
|------|-----------|--------|
| Tweezer Bottom | Two candles with identical lows | Bullish reversal |
| Tweezer Top | Two candles with identical highs | Bearish reversal |

---

## Three-Candle Patterns

### Morning Star (Bullish)

```
    1       2       3

    ██
    ██
    ██      █      ██████
          (gap)  (gap up)
```

| Position | Description |
|----------|-------------|
| Candle 1 | Long red (bearish) |
| Candle 2 | Small body/doji (indecision) |
| Candle 3 | Long green closes into candle 1 |

---

### Evening Star (Bearish)

```
    1       2       3

            █      ██
          (gap)    ██
  ██████           ██
```

| Position | Description |
|----------|-------------|
| Candle 1 | Long green (bullish) |
| Candle 2 | Small body/doji (indecision) |
| Candle 3 | Long red closes into candle 1 |

---

### Three White Soldiers (Bullish)

```
                ██████
            ██████
        ██████
```

| Feature | Description |
|---------|-------------|
| Structure | Three consecutive long green candles |
| Opens | Each opens within prior body |
| Closes | Each closes near high |
| Signal | Strong bullish continuation/reversal |

---

### Three Black Crows (Bearish)

```
    ██████
        ██████
            ██████
```

| Feature | Description |
|---------|-------------|
| Structure | Three consecutive long red candles |
| Opens | Each opens within prior body |
| Closes | Each closes near low |
| Signal | Strong bearish continuation/reversal |

---

## Pattern Strength Modifiers

| Factor | Stronger Signal | Weaker Signal |
|--------|-----------------|---------------|
| **Volume** | High volume | Low volume |
| **Body Size** | Long body | Short body |
| **Wicks** | Small wicks | Large wicks |
| **Gaps** | Gaps present | No gaps |
| **Location** | At key S/R | Random location |
| **Timeframe** | Daily/Weekly | 1m/5m |

---

## Quick Reference Table

| Pattern | Type | Candles | Reliability |
|---------|------|---------|-------------|
| Hammer | Bullish | 1 | Medium |
| Shooting Star | Bearish | 1 | Medium |
| Bullish Engulfing | Bullish | 2 | High |
| Bearish Engulfing | Bearish | 2 | High |
| Morning Star | Bullish | 3 | High |
| Evening Star | Bearish | 3 | High |
| Doji | Neutral | 1 | Low (needs context) |
| Three Soldiers | Bullish | 3 | High |
| Three Crows | Bearish | 3 | High |

---

## Context Rules

### Bullish Patterns Need:
- [ ] Prior downtrend or at support
- [ ] Higher timeframe not in strong downtrend
- [ ] Volume confirmation
- [ ] Follow-through next bar

### Bearish Patterns Need:
- [ ] Prior uptrend or at resistance
- [ ] Higher timeframe not in strong uptrend
- [ ] Volume confirmation
- [ ] Follow-through next bar

---

## Common Mistakes

| Mistake | Reality |
|---------|---------|
| Trading every pattern | Context matters more than pattern |
| Ignoring prior trend | No trend = no reversal to trade |
| Using on low timeframes | Too much noise on 1m/5m |
| No stop loss | Pattern failure = quick exit needed |
| Ignoring volume | Low volume = low conviction |

---

## SignalPilot Integration

| Candle Pattern | Look For |
|----------------|----------|
| Hammer at low | TD firing same bar |
| Shooting Star | WRN or CAP same bar |
| Bullish Engulfing | TD → IGN sequence |
| Bearish Engulfing | WRN → BDN sequence |
| Morning/Evening Star | Pentarch signals on star bar |

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
