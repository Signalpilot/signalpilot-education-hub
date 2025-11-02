# 📊 Advanced Portfolio Theory Checklist

**Lesson 38: Portfolio Theory Advanced**

This checklist helps you build truly diversified portfolios using correlation analysis, Modern Portfolio Theory, efficient frontier, and risk parity principles.

---

## 📋 Pre-Construction: Correlation Analysis

### Calculate Correlation Matrix
- [ ] **List all portfolio holdings** - Stocks, ETFs, crypto, bonds, commodities
- [ ] **Calculate pairwise correlations** - Use 60-day or 252-day lookback (Yahoo Finance, Python)
- [ ] **Identify high-correlation clusters** - Correlation > 0.70 = too correlated (concentrated risk)
- [ ] **Check correlation to SPY/QQQ** - If everything > 0.80 to SPY, you're just leveraged SPY

### Correlation Targets for True Diversification
- [ ] **Aim for correlation < 0.50** - Between major portfolio allocations
- [ ] **Seek negative correlations** - Bonds (TLT) + Stocks (SPY) = -0.40 (hedge)
- [ ] **Identify uncorrelated assets** - Gold (GLD), Commodities (DBC), International (EFA)
- [ ] **Avoid false diversification** - 10 tech stocks ≠ diversified (all correlated 0.85+)

### Asset Class Diversification
- [ ] **US Equities** - SPY, QQQ (core growth)
- [ ] **Bonds** - TLT (long-term treasuries), AGG (total bond market)
- [ ] **Gold** - GLD (inflation hedge, negative correlation to dollar)
- [ ] **Commodities** - DBC (oil, metals, agriculture)
- [ ] **International** - EFA (developed markets), EEM (emerging markets)
- [ ] **Real Estate** - VNQ (REITs)
- [ ] **Cash** - High-yield savings (liquidity buffer)

---

## 🎯 Portfolio Construction: Modern Portfolio Theory

### Efficient Frontier Calculation
- [ ] **Calculate expected returns** - Historical average or forward-looking estimates
- [ ] **Calculate volatility (std dev)** - 252-day rolling standard deviation
- [ ] **Calculate correlation matrix** - Pairwise correlations for all assets
- [ ] **Run optimization** - Use Python (PyPortfolioOpt) or Excel Solver
- [ ] **Plot efficient frontier** - Risk (x-axis) vs. Return (y-axis)

### Identify Optimal Portfolio
- [ ] **Max Sharpe ratio portfolio** - Highest return per unit of risk (best risk-adjusted)
- [ ] **Min volatility portfolio** - Lowest risk (conservative)
- [ ] **Target return portfolio** - Achieve specific return (e.g., 10%) with min risk
- [ ] **Your risk tolerance** - Select point on frontier matching your tolerance

### Example Efficient Portfolio Allocation
```
Max Sharpe Portfolio (Example):
- 40% SPY (US stocks)
- 30% TLT (bonds)
- 15% GLD (gold)
- 10% EFA (international)
- 5% DBC (commodities)

Expected return: 9.5%
Expected volatility: 11%
Sharpe ratio: 0.86
Correlation: Assets have < 0.50 correlation
```

---

## 📊 Risk Parity Approach

### Calculate Risk Contribution
- [ ] **Traditional 60/40 problem** - 90% of risk from stocks, only 10% from bonds (unbalanced)
- [ ] **Calculate risk contribution** - Asset weight × Volatility = risk contribution
- [ ] **Target equal risk** - Adjust weights so each asset contributes equally to portfolio risk

### Risk Parity Example
```
Traditional 60/40:
- 60% SPY (vol: 18%) = 10.8 risk units (90% of risk)
- 40% TLT (vol: 12%) = 4.8 risk units (10% of risk)
Result: Portfolio dominated by stock risk

Risk Parity 25/75:
- 25% SPY (vol: 18%) = 4.5 risk units (50% of risk)
- 75% TLT (vol: 12%) = 9.0 risk units (50% of risk)
Result: Balanced risk, cushion in drawdowns
```

### Risk Parity Implementation
- [ ] **Weight by inverse volatility** - Lower vol assets get higher weight
- [ ] **Calculate: Weight = 1/Volatility** - Then normalize to 100%
- [ ] **Trade-off: Lower expected return** - More bonds = less growth (accept for stability)
- [ ] **Consider leverage (advanced)** - Some funds use leverage to boost returns while maintaining balanced risk

---

## 📊 Position Sizing: Kelly Criterion

### Calculate Kelly % for Each Strategy
- [ ] **Formula:** Kelly % = (Win rate × Avg win - Loss rate × Avg loss) / Avg win
- [ ] **Example:** 65% WR, 2.5R avg win, 1R avg loss → Kelly = 51%
- [ ] **Use fractional Kelly** - 1/4 Kelly to 1/2 Kelly (safer than full Kelly)
- [ ] **Apply to each strategy** - Janus sweeps: 13%, Mean reversion: 10%, Breakouts: 8%

### Kelly-Based Portfolio
```
Strategy A (Janus): 65% WR, 2.5R avg → Kelly 51% → Use 13% (1/4 Kelly)
Strategy B (Mean Rev): 58% WR, 2.0R avg → Kelly 38% → Use 10% (1/4 Kelly)
Strategy C (Breakout): 52% WR, 3.0R avg → Kelly 35% → Use 8% (1/4 Kelly)

Total allocation: 31% (rest in cash as buffer)
```

### Multi-Strategy Portfolio Benefits
- [ ] **Uncorrelated strategies** - One works while another rests (smooth equity)
- [ ] **Regime diversification** - Trend strategy + Mean reversion = cover more regimes
- [ ] **Lower drawdowns** - Diversification reduces single-strategy risk
- [ ] **Cash buffer** - Remaining 30-40% in cash for flexibility

---

## 📊 Portfolio Rebalancing

### Rebalancing Frequency
- [ ] **Quarterly rebalancing** - Every 3 months (balance between drift and costs)
- [ ] **Threshold-based** - Rebalance when allocation drifts > 5% from target
- [ ] **Annual rebalancing** - Once per year (lower costs, acceptable for long-term)

### Rebalancing Process
- [ ] **Check current allocations** - SPY: 48% (target 40%), TLT: 25% (target 30%)
- [ ] **Calculate adjustments needed** - Sell 8% SPY, Buy 5% TLT
- [ ] **Execute trades** - Use limit orders, minimize slippage
- [ ] **Tax considerations** - Sell losing positions first (tax-loss harvesting)

### When NOT to Rebalance
- [ ] **In strong trending regime** - Let winners run (SPY at 55% in bull market = OK)
- [ ] **High transaction costs** - Rebalancing costs > benefit (check)
- [ ] **Tax hit too large** - Short-term capital gains > benefit of rebalancing

---

## 📊 Performance Monitoring

### Portfolio Metrics to Track
- [ ] **Sharpe ratio** - Target > 1.5 (risk-adjusted return quality)
- [ ] **Max drawdown** - Should be < 20% (preferably < 15%)
- [ ] **Correlation stability** - Are correlations still < 0.50? (regime shift check)
- [ ] **Contribution analysis** - Which asset contributed most? (see Lesson 39)

### Monthly Portfolio Review
- [ ] **Review allocations vs. targets** - Drift > 5%? Consider rebalance
- [ ] **Check Sharpe ratio (rolling 90-day)** - Still > 1.5?
- [ ] **Assess correlation matrix** - Correlations changed? (2020 crash: all assets fell together)
- [ ] **Evaluate regime fit** - Is current allocation optimal for current regime?

---

## 💡 Pro Tips

### Portfolio Theory Mastery
- **Correlation > asset count** - 4 uncorrelated assets > 10 correlated stocks
- **Negative correlation = gold** - Bonds + Stocks with -0.40 correlation = true hedge
- **Rebalance forces discipline** - Sell high (winners), buy low (losers) automatically
- **Kelly sizing prevents ruin** - Use fractional Kelly (1/4 to 1/2) for safety

### Common Mistakes to Avoid
- ❌ Claiming diversification without checking correlation (10 tech stocks = not diversified)
- ❌ Equal dollar allocation ignoring risk (60/40 = 90% risk from stocks)
- ❌ Never rebalancing (winners become 80% of portfolio = concentrated risk)
- ❌ Using full Kelly (wild swings, high risk of ruin)
- ❌ Ignoring regime shifts (correlations can flip in crises)

### Allocation Rules of Thumb
- **Conservative (low risk):** 30% stocks, 50% bonds, 20% gold/commodities
- **Balanced (moderate risk):** 50% stocks, 30% bonds, 20% alternatives
- **Growth (higher risk):** 70% stocks, 20% bonds, 10% alternatives
- **Aggressive (high risk):** 85% stocks, 10% alternatives, 5% cash

### Diversification Sweet Spot
- **Asset count:** 4-8 major allocations (more = complexity, diminishing returns)
- **Correlation target:** < 0.50 between major assets (< 0.30 = even better)
- **Rebalance threshold:** 5% drift or quarterly (whichever comes first)

---

## 📚 Related Resources
- **Lesson 31:** Cross-Asset Correlations (use correlations for portfolio construction)
- **Lesson 39:** Performance Attribution (analyze which allocations work)
- **Recommended Tools:** Python (PyPortfolioOpt), Portfolio Visualizer, Yahoo Finance (correlation data)

---

**Version:** 1.0
**Last Updated:** 2025-11-02
**Difficulty:** Advanced

---

*Remember: True diversification is about uncorrelated assets, not asset count. 4 uncorrelated assets > 20 correlated stocks. Build portfolios that survive all regimes.*
