# Order Book Analysis Trading Checklist

**From Lesson 14: Order Book Analysis**

Use this checklist to read order book depth, detect fake walls, and trade absorption vs. exhaustion patterns.

---

## 📋 Pre-Trade: Order Book Assessment

- [ ] **Check bid/ask imbalance**
  - Total bid size within 5 levels: ________ shares
  - Total ask size within 5 levels: ________ shares
  - Ratio: ________ (bid ÷ ask)
  - Imbalance direction: Heavy Bid / Heavy Ask / Balanced

- [ ] **Identify large walls**
  - Largest bid: $________ → ________ shares
  - Largest ask: $________ → ________ shares
  - Wall size vs. typical: 5-10× larger? Yes / No

- [ ] **Check for spoofing patterns**
  - Wall appeared then disappeared without trades? Yes / No
  - Wall "chasing" price (moves with it, never hit)? Yes / No
  - Walls on BOTH sides (keeping price in range)? Yes / No
  - If Yes to any: Likely fake wall (don't trust it)

---

## ✅ Order Book Confirmation Criteria

**Before trusting imbalance:**
- [ ] Imbalance > 1.5:1 (or < 0.67:1 for shorts)
- [ ] Plutus Flow CVD confirms direction (positive delta if heavy bid)
- [ ] Janus Atlas suggests setup at this level
- [ ] Volume Oracle regime supports direction
- [ ] Wall has been TESTED (price approached and held)

**If all ✓ → High-probability setup**

---

## 🎯 Trading Strategy Selection

### Strategy A: Absorption Reversal

**Setup criteria:**
- [ ] Large wall identified at key level ($________)
- [ ] Price approaches wall from above/below
- [ ] Volume absorbed (price holds, wall doesn't break)
- [ ] Footprint shows positive/negative delta (absorption)
- [ ] Janus sweep or structure test confirmed

**Execution:**
- **Entry:** $________ (above/below wall after absorption confirmed)
- **Stop:** $________ (beyond wall + buffer)
- **Target:** $________ (HTF level) = ____R
- **Position size:** ________ shares

### Strategy B: Wall Breakout (Exhaustion)

**Setup criteria:**
- [ ] Large wall identified at $________
- [ ] Aggressive flow hits wall
- [ ] Wall BROKEN (price moves through, order filled/pulled)
- [ ] Plutus Flow shows volume spike
- [ ] HTF trend supports continuation

**Execution:**
- **Entry:** $________ (continuation after break)
- **Stop:** $________ (above/below broken wall)
- **Target:** $________ (next HVN/LVN) = ____R
- **Position size:** ________ shares

---

## 🔍 Iceberg Order Detection

**Signs of hidden liquidity:**
- [ ] Price "stuck" at level for 10+ minutes
- [ ] Volume traded > visible order size (e.g., 5,000 traded, only 500 visible)
- [ ] Order refreshing repeatedly at same price
- [ ] Small visible size but massive volume absorbed

**If iceberg detected:**
- Level: $________
- Estimated hidden size: ________ shares (based on volume)
- Interpretation: Strong support/resistance (institutional accumulation/distribution)
- Action: Trade breakout away from iceberg level (momentum likely to follow)

---

## 🚫 Invalidation Criteria (Exit Immediately)

- [ ] Wall disappeared before being tested (spoofing confirmed)
- [ ] Absorption failed (price broke through after initial hold)
- [ ] HTF structure breaks against you
- [ ] CVD diverges from order book imbalance
- [ ] Price action doesn't confirm within 5 candles

---

## 📊 Post-Trade Review

**Order book analysis:**
- Did wall hold/break as expected? Yes / No
- Was imbalance reliable (confirmed by volume)? Yes / No
- Did I identify spoofing correctly? Yes / No

**What went right:**
- ________________________________________________

**What could be improved:**
- ________________________________________________

**Lesson learned:**
- ________________________________________________

**Win/Loss:** ________ **R-multiple:** ________

---

**Remember:**
- ✅ Imbalance needs confirmation (CVD, Janus, Volume Oracle)
- ✅ Only trust TESTED walls (not pre-test)
- ✅ Spoofing is real (walls disappear before hit)
- ✅ Iceberg orders = hidden institutional flow

**This is for educational purposes only. Not financial advice.**

---

© Signal Pilot Education Hub
