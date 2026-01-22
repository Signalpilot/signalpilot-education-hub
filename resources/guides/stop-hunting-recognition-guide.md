# Stop Hunting Pattern Recognition Guide

**Identifying & Trading Liquidity Sweeps**

---

## Introduction

Stop hunting is not a conspiracy—it's a market mechanic. Large players need liquidity to fill orders, and retail stops provide that liquidity.

This guide teaches you to recognize stop hunts as they happen and trade them profitably.

---

## Part 1: Why Stops Get Hunted

### The Liquidity Problem

Markets need two-way order flow. When everyone is long:
- Few sellers remain
- Large buyers can't fill orders
- Solution: Create selling by triggering stops

### How It Works

```
Setup:
- 10,000 traders long with stops at $95
- Price at $100

Execution:
1. Push price to $95.00
2. Stops trigger (become market sell orders)
3. 10,000 sell orders hit the market
4. Someone absorbs all that selling
5. Price reverses to $105+

Who wins:
- The absorber bought at $95
- 10,000 traders got stopped out at $95
- Price goes where they expected, without them
```

---

## Part 2: Where Stops Cluster (Liquidity Pools)

### Common Stop Locations

| Location | Why Stops Are Here |
|----------|-------------------|
| **Below swing lows** | "Stop below support" is standard teaching |
| **Above swing highs** | "Stop above resistance" |
| **Below round numbers** | $99.50 if long at $100 |
| **Above round numbers** | $100.50 if short at $100 |
| **At moving averages** | MA breaks trigger stops |
| **Below trendlines** | Trendline breaks trigger stops |
| **At Fibonacci levels** | Technical stops |
| **Previous day/week H/L** | Time-based reference |

### Quantifying Stop Clusters

The more obvious a level, the more stops cluster there.

```
Visibility score:
- Multiple touches: +10
- Round number: +10
- Confluence with MA: +10
- Visible on higher TF: +10
- Taught in popular TA: +10

High score = High liquidity target
```

---

## Part 3: Recognizing Stop Hunt Patterns

### Pattern 1: The Classic Sweep

**Setup:**
- Clear support or resistance
- Price approaches the level
- Quick spike through
- Immediate reversal

```
            │
    ────────│────────  Support
            │
            ↓ Sweep spike
            │
            ↑ Immediate recovery
            │
    ████████████████  Strong reversal candle
```

**Characteristics:**
- Duration: 1-3 candles
- Depth: Just beyond level (0.2-0.5%)
- Volume: Spike on sweep, often higher on recovery
- Result: Strong reversal follows

---

### Pattern 2: The Fake Breakout

**Setup:**
- Consolidation or range
- "Breakout" with initial conviction
- Rapid failure and reversal

```
Resistance ──────────────────
                      ████
                      ████  ← Breakout
                      ████
                        ↓   ← Failure
                      ████
                      ████  ← Now below resistance
                    ████
```

**Characteristics:**
- Initial volume may look convincing
- But follow-through fails
- Reversal is swift (within 3-5 candles)
- Often ends up making significant move opposite

---

### Pattern 3: The Double Sweep

**Setup:**
- Price sweeps one side
- Then sweeps the other side
- Then makes real move

```
    ────────────────  Resistance
          ↑ Sweep 1 (trap shorts)
          │
          ↓
          │
          ↓ Sweep 2 (trap longs)
    ────────────────  Support
          │
          ↑ Real move begins
    █████████████████████████
```

**Characteristics:**
- Both sides get stopped out
- Maximum frustration for traders
- Often precedes strong trend
- "Everyone is wrong" before real move

---

### Pattern 4: The Shakeout Spring (Wyckoff)

**Setup:**
- Accumulation range
- Break below range (spring)
- Immediate recovery into range
- Then breakout upward

```
Range high ──────────────────
    ████    ████    ████
    ████    ████    ████
            ████
    ────────────────────────  Range low
              ↓
            ████  ← Spring (shakeout)
              ↑
            ████  ← Recovery
    ████████████████████████████████
              ↑
           Real breakout
```

---

### Pattern 5: The Upthrust

**Setup:**
- Distribution range
- Break above range (upthrust)
- Immediate rejection into range
- Then breakdown

```
                ████  ← Upthrust (trap)
                  ↓
    ────────────────────────  Range high
    ████    ████    ████
    ████    ████    ████
            ████
Range low ──────────────────
              ↓
    ████████████████████████████████
              ↓
           Real breakdown
```

---

## Part 4: Real-Time Recognition

### Speed of Move

| Speed | Interpretation |
|-------|----------------|
| Slow approach | Normal test |
| Fast spike | Stop hunt likely |
| Gradual break | Real breakout possible |
| Violent wick | Classic sweep |

### Volume Signature

| Volume Pattern | Meaning |
|----------------|---------|
| Spike on break | Stops triggered (expected) |
| Low volume break | Weak, likely fake |
| Sustained volume after | Real breakout |
| Volume spike then silence | Stop hunt, reversal coming |

### Candle Patterns at Sweeps

**Hammer at sweep low:**
- Long lower wick = buying absorbed selling
- Small body = reversal indication
- Green close = strong

**Shooting star at sweep high:**
- Long upper wick = selling absorbed buying
- Small body = reversal indication
- Red close = strong

---

## Part 5: Trading Stop Hunts

### Strategy 1: Wait for Reclaim

**Rules:**
1. Identify obvious support/resistance
2. Wait for price to break it (sweep)
3. Wait for price to close back on original side
4. Enter on reclaim candle close
5. Stop beyond the sweep extreme
6. Target 2:1 minimum

**Example:**
```
Support at $100
Price sweeps to $98.50
Candle closes back above $100

Entry: $100.10
Stop: $98.00 (beyond sweep)
Target: $103.10 (2:1)
```

---

### Strategy 2: Limit Order at Sweep Zone

**Rules:**
1. Identify high-probability sweep zone
2. Place limit order at sweep zone
3. Stop just beyond expected sweep
4. Target previous range or 2:1

**Risk:** Order may not fill, or sweep continues

**Advantage:** Best entry price if it works

---

### Strategy 3: Aggressive Entry on Sweep Bar

**Rules:**
1. Watch for sweep in real-time
2. Enter before bar closes if signs of reversal
3. Very tight stop (just beyond current low/high)
4. Scale out at levels

**Risk:** Higher false signal rate

**Advantage:** Catch the exact bottom/top

---

## Part 6: Janus Atlas Integration

### How Janus Atlas Detects Sweeps

Janus Atlas marks:
- **Sweep signals** — When price breaks a liquidity zone
- **Reclaim signals** — When price recovers the zone
- **Liquidity pools** — Where sweeps are likely

### Using Janus Atlas for Stop Hunts

**Identification:**
- Look for Janus liquidity pools at obvious levels
- Wait for sweep signal

**Confirmation:**
- Janus shows reclaim
- Enter on reclaim

**Stop Placement:**
- Beyond the Janus-marked sweep low/high

---

## Part 7: Filtering Valid Sweeps

### Sweep Quality Score

| Factor | Points |
|--------|--------|
| Level tested 2+ times prior | +20 |
| Sweep occurred on high volume | +20 |
| Immediate rejection (1-2 bars) | +20 |
| Volume on recovery > sweep | +20 |
| Higher TF trend supports reversal | +20 |

**Score Interpretation:**
- 80-100: High-quality setup
- 60-79: Standard setup
- <60: Weak, avoid or reduce size

### Red Flags (Not a Sweep)

| Red Flag | Why It's Concerning |
|----------|---------------------|
| No immediate reversal | May be real break |
| Volume continues in break direction | Momentum behind break |
| Multiple candles closing beyond | Acceptance, not rejection |
| Higher TF trending against you | Fighting the current |

---

## Part 8: Timeframe Considerations

### Which Timeframes Show Sweeps?

All timeframes have sweeps, but:

| Timeframe | Sweep Characteristics |
|-----------|----------------------|
| 1m-5m | Noisy, many false signals |
| 15m-1H | Good for day trades |
| 4H | High quality, swing trades |
| Daily | Very high quality, position trades |
| Weekly | Major pivots, rare but powerful |

### Multi-Timeframe Sweep Analysis

**Best approach:**
1. Identify sweep on your trading TF
2. Confirm HTF trend supports direction
3. Use LTF for entry timing

**Example:**
- Daily: Clear support level
- 4H: Sweep occurs, reclaim forming
- 1H: Enter on reclaim with tight stop

---

## Part 9: Psychology of Sweeps

### Why Traders Get Swept

1. **Obvious stops** — "Just below support"
2. **Tight stops** — No room for volatility
3. **Standard placement** — Where everyone else
4. **No buffer** — Exactly at the level

### How to Avoid Being Swept

1. **Wide stops** — Beyond the sweep zone
2. **Non-obvious placement** — Not at the exact level
3. **ATR-based stops** — Volatility-adjusted
4. **Smaller size** — Afford the wider stop

### The Trader's Dilemma

```
Tight stop = Get stopped out on sweep, miss the move
Wide stop = Larger loss if wrong, but catch the move
No stop = Dangerous, but never get "swept"

Solution: Wide stop + Appropriate size + Sweep-aware levels
```

---

## Part 10: Checklist

### Pre-Trade (Identifying Sweeps)

- [ ] Is this an obvious level? (high liquidity)
- [ ] Has price swept through?
- [ ] Is there immediate rejection?
- [ ] What does volume show?
- [ ] Does Janus Atlas confirm?
- [ ] Does higher TF support this trade?

### Entry

- [ ] Reclaim candle closed
- [ ] Volume confirms reversal
- [ ] Entry at reclaim level
- [ ] Stop placed beyond sweep extreme

### Management

- [ ] Position sized for the stop distance
- [ ] Target defined (2:1+ or structure level)
- [ ] Plan for partials at logical levels

---

## Part 11: Examples by Asset Class

### Crypto

**Characteristics:**
- 24/7 = sweeps happen anytime
- High volatility = deeper sweeps
- Less regulation = more obvious manipulation
- Weekend sweeps common

**Adjustment:**
- Wider stops (1-2 ATR beyond level)
- Expect deeper wicks
- Sunday low often swept Monday

### Equities

**Characteristics:**
- Session-based sweeps (open, close)
- Pre-market sweeps
- More orderly than crypto
- News catalysts create sweeps

**Adjustment:**
- Watch 9:30-10:00 AM ET for sweeps
- Previous day high/low key targets
- Wait for regular hours confirmation

### Forex

**Characteristics:**
- Session sweeps (London, NY opens)
- Asian range sweeps at London open
- Sunday gap sweeps
- Round number sweeps

**Adjustment:**
- Know session times
- Asian high/low key targets
- London open prime sweep time

---

## Part 12: Summary

### Core Principles

1. **Stops are liquidity** — Institutions need them
2. **Obvious levels get swept** — The more obvious, the higher probability
3. **Trade the reclaim** — Not the breakdown
4. **Speed indicates intent** — Fast moves often sweep
5. **Volume tells the story** — Spike then reversal
6. **Wider stops survive** — Don't be the liquidity

### The Sweep Trader's Mindset

```
Old: "My stop got hit, then it reversed. So unfair."
New: "The market swept obvious stops. I'll trade the reclaim."

Old: "Support broke, I should sell."
New: "Support swept, I'm looking to buy the reclaim."

Old: "Stop below the low."
New: "Stop below where the sweep will likely extend."
```

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
