# Indicator Repaint Audit Checklist

**From Lesson 4: Your Indicators Are Lying to You (The Repaint Problem)**

Use this checklist to audit ANY indicator for repainting before risking real money on it.

---

## 📋 Pre-Trade: Audit the Indicator

- [ ] **Visual Test (Easiest - Do this first)**
  - Open live chart with your indicator
  - Screenshot or note where signals appear (specific price + time)
  - Wait for the bar to close
  - Refresh browser and check if signals moved or disappeared
  - Repeat 3-5 times to confirm

- [ ] **Replay Test (Most Accurate)**
  - Use TradingView's Bar Replay feature
  - Go back 100+ bars
  - Play forward bar-by-bar
  - Mark where signals appear AS THEY APPEAR
  - Finish replay and compare to historical signals
  - If live ≠ historical = REPAINTING

- [ ] **Alert Test (Real-World)**
  - Set alert on your indicator's signal
  - Track 20+ alerts over 1-2 weeks
  - Record: Alert time + price
  - Compare alert entries to historical signal locations
  - If alert prices ≠ signal prices in history = REPAINTING

- [ ] **Code Audit (For Coders)**
  - Check for `request.security()` without `lookahead=barmerge.lookahead_off`
  - Check for `security()` without `[1]` offset for HTF data
  - Verify `barstate.isconfirmed` check for signals
  - Ensure no `var` variables changing past values

---

## ✅ Pass Criteria (ALL Must Be Met)

- [ ] Visual test: Signals stayed in same location after bar close (3/3 tests)
- [ ] Replay test: Live signals matched historical signals exactly
- [ ] Alert test: Alert prices matched signal prices in history (20/20 alerts)
- [ ] No red flags in code (if auditing Pine Script)
- [ ] Indicator documentation states "non-repainting" or "deterministic"

---

## 🎯 Decision Matrix

**If indicator PASSES all tests:**
- [ ] Safe to backtest and forward test
- [ ] Document: Indicator name, date tested, pass confirmation
- [ ] Proceed to strategy development

**If indicator FAILS any test:**
- [ ] DO NOT USE for trading
- [ ] DO NOT backtest (results will be fantasy)
- [ ] Find alternative non-repainting indicator
- [ ] Document: Indicator name, which test failed, date

---

## 🚫 Red Flags (Skip Indicator Immediately)

- [ ] Developer won't share code (closed source + won't prove non-repaint)
- [ ] "Perfect" backtest results (3.0R+ expectancy, 4.0+ profit factor = suspicious)
- [ ] No mention of repainting in documentation
- [ ] Signals appear mid-bar but change by bar close
- [ ] "Holy grail" marketing language

---

## 📊 Post-Audit Documentation

**Indicator name:**
- ________________________________________________

**Tests performed:**
- Visual: PASS / FAIL
- Replay: PASS / FAIL
- Alert: PASS / FAIL
- Code: PASS / FAIL (or N/A)

**Verdict:**
- [ ] SAFE TO USE (all tests passed)
- [ ] DO NOT USE (failed one or more tests)

**Date tested:** ________

**Notes:**
- ________________________________________________

---

**Remember:**
- ✅ 60-90% of indicators repaint (test everything)
- ✅ Perfect backtests = red flag (if too good to be true, it is)
- ✅ Use at least 2 detection methods (visual + alert is easiest)
- ✅ Signal Pilot indicators are deterministic (no future data, no tricks)
- ✅ 2 hours testing saves months of losses

**This is for educational purposes only. Not financial advice.**

---

© Signal Pilot Education Hub
