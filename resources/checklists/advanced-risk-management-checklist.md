# Advanced Risk Management Checklist

**From Lesson 25: Advanced Risk Management**

Use this checklist for Kelly Criterion, dynamic sizing, and institutional risk protocols.

---

## 📋 Daily Risk Assessment

### Account Status Check

- [ ] **Current equity:** $________
- [ ] **Peak equity (all-time high):** $________
- [ ] **Drawdown:** ____% = ($________ - $________) / $________
- [ ] **Daily P&L:** $________ (____%)

### Risk Limits

- [ ] **Max risk per trade:** ____% (1-2% normal)
  - If DD 0-10%: 2% max
  - If DD 10-15%: 1.5% max (reduce 25%)
  - If DD 15-20%: 1% max (reduce 50%)
  - If DD > 20%: STOP TRADING

- [ ] **Portfolio heat:** ____% (sum of all open positions)
  - Must be < 6-8%
  - If > 8%: Close weakest position

- [ ] **Max daily loss:** 3% = $________ (if hit, close all & stop)
- [ ] **Max weekly loss:** 5% = $________ (if hit, no new trades until Monday)

---

## ✅ Position Sizing Calculation

### Method 1: Kelly Criterion (Optimal Size)

**Your strategy stats:**
- [ ] Win rate: ____% (from last 50-100 trades)
- [ ] Average R:R: ____:1 (from journal)

**Kelly formula:**
- Kelly % = (Win Rate × Avg R - (1 - Win Rate)) / Avg R
- Full Kelly: ____% (usually 20-40%, TOO aggressive)
- **Quarter Kelly:** ____% (recommended: use 1/4 to 1/2 Kelly)

**Example:**
```
Win Rate: 60%, Avg R:R: 2.5:1
Kelly = (0.60 × 2.5 - 0.40) / 2.5 = 0.34 = 34%
Quarter Kelly = 8.5%
But per-trade limit = 2% → Use 2% (lower of two)
```

**My Kelly calculation:**
- Full Kelly: ____%
- Quarter Kelly: ____%
- Per-trade limit: ____%
- **Use:** ____% (LOWER of Kelly vs. limit)

### Method 2: Equity-Based Dynamic Sizing

- [ ] **Base risk %:** 2% of current equity (not fixed $)
- [ ] **Current equity:** $________
- [ ] **Risk for next trade:** $________ × 2% = $________

**Benefit:** Automatically scales down during drawdowns, up during wins

### Method 3: ATR-Based Volatility Adjustment

- [ ] **Target risk:** $________ (2% of account)
- [ ] **Asset ATR:** $________
- [ ] **Position size:** $________ ÷ $________ = ________ shares

**Example:**
```
Target risk: $200
SPY ATR: $4.00
Position: $200 / $4 = 50 shares
```

### Method 4: Setup Quality-Based Sizing

- [ ] **Setup grade:** A+ / A / B / C
- [ ] **Risk allocation:**
  - A+ (Perfect): 2.0% (all factors aligned)
  - A (Excellent): 1.5% (HTF + MTF aligned)
  - B (Good): 1.0% (partial alignment)
  - C (Marginal): 0% (SKIP)

**My setup grade:** ____ → **Risk:** ____%

---

## 🚨 Drawdown Protocol

### Drawdown Tiers & Actions

| Drawdown | Action | Position Size | Setup Quality |
|----------|--------|---------------|---------------|
| 0-10% | Normal (no change) | 100% (2% risk) | A/B setups |
| 10-15% | Caution | 75% (1.5% risk) | Review trades |
| 15-20% | Warning | 50% (1% risk) | A-grade ONLY |
| 20-25% | Critical | 25% (0.5% risk) | Or stop trading |
| > 25% | Shutdown | 0% (STOP) | Full review |

**Current tier:** ________ → **Action:** ________________________________________

### Recovery Protocol

**When drawdown < 10% again:**
- [ ] Week 1-2: Stay at reduced size (verify stability)
- [ ] Week 3-4: Scale to 75% size (if consistent profitability)
- [ ] Week 5+: Return to 100% size (if 3 consecutive profitable weeks)

**Don't rush back to full size after one winning week!**

---

## 🎯 Advanced Stop Loss Strategies

### Stop Type Selection

- [ ] **ATR-Based Stop** (gives room for volatility)
  - Entry: $________
  - ATR: $________
  - Stop: $________ ± (1.5 × $________) = $________

- [ ] **Structure-Based Stop** (invalidates setup)
  - Swept low/high: $________
  - Stop: $________ (below + buffer)

- [ ] **Time-Based Stop** (if no movement in X candles)
  - Expected move within: __ candles/hours
  - If stalled: Exit at $________ (even if breakeven)

- [ ] **Trailing Stop** (lock in profits)
  - Initial stop: $________
  - Move to breakeven at: $________
  - Trail at: ________ points behind price

**Stop type used:** ________________ **Stop price:** $________

---

## 📊 Risk of Ruin Analysis

### Current Risk of Ruin

**Formula (simplified):**
- RoR ≈ ((1 - Win Rate) / Win Rate) ^ (Account Risk / Position Risk)

**My stats:**
- [ ] Win rate: ____%
- [ ] Position risk: ____% per trade
- [ ] Risk of Ruin: ____% (should be < 1%)

**Example:**
```
Win Rate: 55%, Risk: 2%
RoR = (0.45 / 0.55)^(100/2) ≈ 0.01% (very safe)

Win Rate: 55%, Risk: 10%
RoR = (0.45 / 0.55)^(100/10) ≈ 40% (DANGER!)
```

**Reduce Risk of Ruin:**
- [ ] Lower per-trade risk (2% → 1%)
- [ ] Improve win rate (better setups)
- [ ] Increase R:R (better targets)
- [ ] Diversify (uncorrelated positions)

---

## 🎛️ Regime-Based Risk Adjustment

**Volume Oracle regime:**
- [ ] **Trending:** 2% risk (high edge, with trend)
- [ ] **Ranging:** 1% risk (lower R targets, reduced edge)
- [ ] **Volatile:** 0.5% risk OR sit out (unpredictable)

**Current regime:** ________ → **Risk adjustment:** ____%

---

## 🔄 Pre-Trade Risk Checklist

**STOP. Before every trade, verify:**
- [ ] Position size calculated (risk %, ATR-based) ✓
- [ ] Stop loss defined (structure/ATR) at $________
- [ ] R:R ≥ 2:1 verified (target $________ vs. stop $________)
- [ ] Portfolio heat after entry < 8% (current: ____%)
- [ ] Drawdown < 15%? (current: ____%)
- [ ] Setup grade: A/B (if C, skip) ✓
- [ ] Emotional state: CALM (not FOMO/revenge) ✓

**If ANY box unchecked → AVOID ENTRY**

---

## 🔍 Institutional Risk Rules

### Daily Loss Limit
- [ ] Max daily loss: 3% = $________
- [ ] Current daily P&L: $________
- [ ] If hit -3%: Close all positions, done for day ✓

### Weekly Loss Limit
- [ ] Max weekly loss: 5% = $________
- [ ] Current weekly P&L: $________
- [ ] If hit -5%: No new trades until Monday ✓

### Monthly Drawdown Limit
- [ ] Max monthly DD: 10% = $________
- [ ] Current monthly DD: ____%
- [ ] If hit 10%: Reduce to 50% size for rest of month ✓

---

## 📊 Post-Trade Review

**Risk management execution:**
- Position size correct (calculated correctly)? Yes / No
- Stop loss placed immediately after entry? Yes / No
- R:R achieved as planned? Yes / No
- Portfolio heat stayed below 8%? Yes / No
- Drawdown protocol followed? Yes / No

**What went right:**
- ________________________________________________

**What could be improved:**
- ________________________________________________

**Lesson learned:**
- ________________________________________________

**Win/Loss:** ________ **R-multiple:** ________

---

## 📈 Weekly Risk Review

**Every Sunday, calculate:**
- [ ] Win rate this week: ____% (target: 55-65%)
- [ ] Avg R this week: ____R (target: 2.0+)
- [ ] Max daily loss hit? Yes / No (if Yes: Why?)
- [ ] Portfolio heat exceeded 8%? Yes / No (if Yes: Why?)
- [ ] Drawdown increased? From ____% to ____%
- [ ] Risk management rules broken? Yes / No (if Yes: Which?)

**Action plan for next week:**
- ________________________________________________

---

**Remember:**
- ✅ 3-tier risk: Per-trade (1-2%), Portfolio (6-8%), Drawdown (< 20%)
- ✅ Use 1/4 to 1/2 Kelly (NOT full Kelly)
- ✅ Dynamic sizing adjusts for equity, volatility, quality
- ✅ Drawdown > 15% → Reduce size 50%
- ✅ Drawdown > 20% → STOP trading
- ✅ Daily loss > 3% → Close all, done for day

**This is for educational purposes only. Not financial advice.**

---

© Signal Pilot Education Hub
