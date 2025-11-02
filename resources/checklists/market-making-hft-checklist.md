# Market Making & HFT Defense Checklist

**From Lesson 15: Market Making & HFT**

Use this checklist to defend against HFT tactics and avoid being exit liquidity.

---

## 📋 Pre-Trade: HFT Defense Protocol

- [ ] **Check time of day (HFT most active)**
  - Avoid first 15 minutes (9:30-9:45 AM ET)
  - Avoid last 15 minutes (3:45-4:00 PM ET)
  - Avoid overnight/illiquid sessions
  - Best hours: 9:45 AM - 3:45 PM ET

- [ ] **Verify stop placement**
  - Support/resistance level: $________
  - Obvious stop cluster zone: $________ (5-10 ticks below support)
  - Your stop: $________ (below cluster + ATR buffer)
  - ATR distance: ________ points/ticks
  - Stop is NOT at obvious level? ✓

- [ ] **Check liquidity conditions**
  - Current spread: $________ (or __ basis points)
  - Spread < 5 basis points? Yes / No
  - Volume profile: Adequate depth? Yes / No
  - If illiquid (wide spread, thin volume): Skip or reduce size

---

## ✅ Anti-HFT Entry Criteria

- [ ] Trading during liquid hours (9:45 AM - 3:45 PM ET)
- [ ] Spread < 5 basis points (tight, fair execution)
- [ ] Using LIMIT orders (not market orders)
- [ ] Stop placement: ATR-based, below obvious clusters
- [ ] No major news within 10 minutes (spreads normalize)
- [ ] Position size appropriate for liquidity (won't move market)

---

## 🎯 Order Execution Strategy

**ALWAYS use limit orders unless:**
- [ ] Breakout with strong momentum (can't miss it)
- [ ] Stop loss hit (immediate exit required)
- [ ] Spread already < 2 basis points (minimal cost)

**Order type:** Limit / Market (circle one)
**Limit price:** $________
**Actual fill:** $________ (within 1-2 ticks of limit? ✓)

**Alternative: IEX routing**
- [ ] Using IEX (speed bump exchange) for large orders
- [ ] Reduces HFT latency arbitrage
- [ ] Trade-off: Lower volume, but fairer fills

---

## 🔍 Stop Hunt Detection

**Watch for liquidity sweep patterns:**
- [ ] Obvious support/resistance: $________
- [ ] Expected stop cluster: $________ (just below/above)
- [ ] Did price knife through then reverse quickly? Yes / No
- [ ] Volume spike at sweep low/high? Yes / No
- [ ] Reclaim within 1-3 candles? Yes / No

**If stop hunt detected:**
- Time: ________
- Sweep level: $________
- Reclaim level: $________
- Action taken: Entered long/short after reclaim ✓
- Result: ________ R-multiple

---

## 🛡️ HFT Defense Tactics

**Spread monitoring:**
- [ ] Spread widening without news? (HFT senses uncertainty)
  - From: $________ to $________
  - Action: Tighten stops, reduce size, wait for clarity

**Quote pulling detection:**
- [ ] Large bid/ask wall disappeared before test? (Spoofing)
  - Level: $________
  - Action: Don't trust, trade opposite direction

**Absorption without movement:**
- [ ] High volume traded, price not moving? (Iceberg order)
  - Level: $________
  - Volume: ________ vs. visible: ________
  - Action: Strong level, trade breakout away from it

---

## 🚫 Invalidation Criteria (Don't Trade)

- [ ] Spread > 10 basis points (too wide, HFT advantage too large)
- [ ] Trading first/last 15 minutes (highest HFT activity)
- [ ] Illiquid hours (overnight, pre-market)
- [ ] Major news within 10 minutes (spreads explode)
- [ ] Position size > 10% of average volume (you'll move market)

---

## 📊 Post-Trade Review

**HFT defense effectiveness:**
- Did I use limit orders appropriately? Yes / No
- Was my stop placement optimal (avoided cluster)? Yes / No
- Did I trade during liquid hours? Yes / No
- Fill quality (slippage): $________ (< 0.05%? ✓)

**Stop hunt analysis:**
- Was I stopped out by a liquidity sweep? Yes / No
- If Yes: Stop was at obvious level? Yes / No
- Lesson: Move stop further from clusters next time

**What went right:**
- ________________________________________________

**What could be improved:**
- ________________________________________________

**Lesson learned:**
- ________________________________________________

**Win/Loss:** ________ **R-multiple:** ________

---

**Remember:**
- ✅ Limit orders > market orders (always)
- ✅ Stops: ATR-based, NOT at obvious levels
- ✅ Trade liquid hours only (9:45 AM - 3:45 PM ET)
- ✅ Spread widening = leading indicator (caution)

**This is for educational purposes only. Not financial advice.**

---

© Signal Pilot Education Hub
