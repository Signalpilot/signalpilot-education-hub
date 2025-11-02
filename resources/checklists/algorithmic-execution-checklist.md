# 🤖 Algorithmic Execution Trading Checklist

**Lesson 33: Algorithmic Execution**

This checklist helps you execute large orders efficiently using algorithms (TWAP, VWAP, iceberg, smart routing) to minimize slippage and market impact.

---

## 📋 Pre-Execution Planning

### Order Size Assessment
- [ ] **Calculate order size vs. average volume** - Order > 10% of daily volume = need algo
- [ ] **Estimate market impact** - Large order = price moves against you (slippage cost)
- [ ] **Determine urgency** - High urgency = accept slippage, Low urgency = use TWAP
- [ ] **Check liquidity** - Tight spreads + deep book = easier execution

### Algorithm Selection
- [ ] **TWAP (Time-Weighted Average Price)** - Execute evenly over time (low urgency)
- [ ] **VWAP (Volume-Weighted Average Price)** - Execute with market volume pattern (benchmark)
- [ ] **Iceberg orders** - Hide true size, show small chunks (avoid signaling)
- [ ] **Smart order routing** - Route to multiple exchanges for best price
- [ ] **POV (Percent of Volume)** - Execute as % of market volume (stay hidden)

### Execution Parameters
- [ ] **Set time window** - TWAP: 30 min, 1 hour, 2 hours? (longer = less impact)
- [ ] **Set participation rate** - POV: 5-10% of volume (stay under radar)
- [ ] **Set limit price** - Max acceptable price (prevent runaway execution)
- [ ] **Choose execution venues** - Dark pools (hidden) vs. lit exchanges (visible)

### Risk Controls
- [ ] **Set max slippage tolerance** - 0.05% for liquid, 0.2% for illiquid
- [ ] **Enable kill switch** - Auto-cancel if price moves > threshold
- [ ] **Check pre-market liquidity** - Low liquidity = delay execution or reduce size
- [ ] **Avoid news events** - FOMC, earnings = elevated volatility (pause algo)

---

## 🎯 During Execution Monitoring

### Real-Time Performance Tracking
- [ ] **Monitor fill price vs. benchmark** - Are you getting filled above/below VWAP?
- [ ] **Check slippage in real-time** - Current avg fill vs. entry price decision
- [ ] **Watch market impact** - Is your order moving the market? (reduce aggression)
- [ ] **Track participation rate** - Are you above target %? (slow down)

### Market Condition Monitoring
- [ ] **Watch for volume spikes** - Volume surge = opportunity to hide larger chunks
- [ ] **Check spread widening** - Spreads widening = reduce aggression (poor liquidity)
- [ ] **Monitor price momentum** - Price running away = increase aggression or pause
- [ ] **Look for large prints** - Other institutions trading = liquidity available

### Algorithm Adjustment
- [ ] **Pause if volatility spikes** - VIX spike or price gap = stop algo temporarily
- [ ] **Increase aggression if price favorable** - Price improving = speed up execution
- [ ] **Decrease aggression if impact high** - Order moving market = slow down
- [ ] **Switch venues if poor fills** - Route to dark pools or alternative exchanges

### Iceberg Order Specifics
- [ ] **Set display size** - Show 5-10% of true size (don't reveal full order)
- [ ] **Vary display amounts** - Randomize chunk sizes (avoid detection)
- [ ] **Monitor for predatory algo** - If detected, pause and switch strategy
- [ ] **Check for size discovery** - Are others probing your full size?

---

## 📊 Post-Execution Analysis

### Execution Quality Metrics
- [ ] **Calculate VWAP vs. execution price** - Beat VWAP = good, missed = poor execution
- [ ] **Measure total slippage** - (Avg fill - Decision price) / Decision price × 100
- [ ] **Calculate market impact cost** - Did order move market? How much?
- [ ] **Check fill rate** - % of order filled at target price vs. worse prices

### Algorithm Performance
- [ ] **Which algo performed best?** - TWAP vs. VWAP vs. POV vs. Iceberg
- [ ] **Time of day impact** - Morning execution vs. afternoon? Which better?
- [ ] **Venue analysis** - Which exchange/dark pool gave best fills?
- [ ] **Urgency vs. slippage trade-off** - Fast execution = higher cost? Worth it?

### Lessons Learned
- [ ] **What caused highest slippage?** - Poor liquidity? Wrong algo? Too aggressive?
- [ ] **When should I have paused?** - News event? Volatility spike?
- [ ] **How accurate was pre-execution estimate?** - Predicted slippage vs. actual
- [ ] **Next improvement** - Better time windows, venue selection, participation rate tuning

---

## 💡 Pro Tips

### Algorithmic Execution Mastery
- **Never execute large orders manually** - Market impact will kill you (always use algo)
- **Time is your friend** - Slower execution = less market impact
- **Trade with the market, not against** - Execute during high volume windows
- **Hide your intentions** - Use dark pools and iceberg orders for large sizes

### Common Mistakes to Avoid
- ❌ Market orders for large size (instant slippage disaster)
- ❌ Trading at market open/close (highest volatility = worst execution)
- ❌ Using same algo every time (adapt to liquidity, urgency, size)
- ❌ Ignoring market impact (your order IS the market if you're 10%+ of volume)

### Algorithm Selection Guide
- **TWAP:** Low urgency, predictable execution, smooth price impact
- **VWAP:** Benchmark for performance, follows volume pattern
- **POV:** Stay hidden, execute as % of volume (5-10% sweet spot)
- **Iceberg:** Large orders, avoid showing full size, randomize chunks
- **Smart routing:** Best for getting best price across multiple venues

### Execution Best Practices
- **Execute during high volume windows:** 10 AM - 12 PM, 2 PM - 3:30 PM (US markets)
- **Avoid first/last 30 min:** Opening/closing auctions = high volatility
- **Use dark pools for size > 5% ADV:** Hide from predatory algos
- **Monitor order book depth:** Thin book = slow down, deep book = speed up
- **Set conservative limit prices:** Prevent catastrophic fill at extreme price

### Slippage Minimization Tactics
1. **Break into smaller chunks** - 5-10 child orders instead of 1 giant order
2. **Randomize timing** - Don't execute on exact intervals (avoid detection)
3. **Use multiple algos** - Mix VWAP + Iceberg for parts of the order
4. **Execute during high volume** - Hide in the crowd
5. **Monitor and adapt** - Real-time adjustment based on market conditions

---

## 📚 Related Resources
- **Lesson 36:** High Frequency Concepts (how HFT algos detect and front-run you)
- **Lesson 37:** Trading Automation APIs (build your own execution algorithms)
- **Recommended Platforms:** Interactive Brokers (algo suite), Bloomberg Terminal, FlexTrade

---

**Version:** 1.0
**Last Updated:** 2025-11-02
**Difficulty:** Advanced

---

*Remember: Execution is half the battle. You can have the best strategy, but poor execution costs 1-2% in slippage—enough to erase your edge. Master the algo.*
