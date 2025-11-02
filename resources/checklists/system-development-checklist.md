# ⚙️ Trading System Development Checklist

**Lesson 34: System Development**

This checklist guides you through building, testing, and deploying a robust trading system from concept to live execution.

---

## 📋 Phase 1: System Design

### Define Strategy Concept
- [ ] **State hypothesis clearly** - "Liquidity sweeps followed by reversal offer 2.5R edge"
- [ ] **Identify edge source** - What inefficiency are you exploiting? (stop hunts, mean reversion, momentum)
- [ ] **Define market applicability** - Which assets? SPY, QQQ, ES futures? Stocks? Crypto?
- [ ] **Specify timeframe** - Intraday (1/5/15 min) or swing (Daily/Weekly)?

### Define Entry Rules (Objective & Mechanical)
- [ ] **List all entry conditions** - Must be 100% objective (no "looks good")
- [ ] **Example:** Price sweeps below swing low + reclaims above + volume > 1.5x avg
- [ ] **Require multi-timeframe confluence** - HTF trend aligned? (Yes/No filter)
- [ ] **Add regime filter** - Only trade in trending regime (ADX > 25)
- [ ] **Include time filters** - Only trade 10 AM - 3 PM? Avoid first 30 min?

### Define Exit Rules
- [ ] **Profit target** - Fixed R (2R, 3R) or trailing stop?
- [ ] **Stop loss** - Fixed distance (1 ATR below entry) or structure-based (below swing low)?
- [ ] **Time-based exit** - Close at EOD? Hold overnight?
- [ ] **Partial profit-taking** - Take 50% at 1.5R, let 50% run to 3R?

### Position Sizing & Risk Management
- [ ] **Max risk per trade** - 1%, 1.5%, or 2%?
- [ ] **Position size formula** - (Account × Risk%) / Stop distance = shares
- [ ] **Max portfolio heat** - Total risk across all positions ≤ 8%
- [ ] **Max positions** - 3 simultaneous positions max?
- [ ] **Correlation check** - Avoid 2+ correlated positions (diversify)

---

## 🎯 Phase 2: Backtesting

### Data Preparation
- [ ] **Source historical data** - Yahoo Finance, Alpha Vantage, broker API
- [ ] **Data quality check** - Remove gaps, split-adjusted, dividend-adjusted
- [ ] **Minimum data length** - 3+ years (cover multiple regimes)
- [ ] **Timeframe consistency** - If trading 15-min, backtest on 15-min data

### Backtest Execution
- [ ] **Code entry/exit logic** - Python (pandas/backtrader), Excel, or platform (TradingView)
- [ ] **Include slippage** - Assume 0.05% slippage per trade (realistic costs)
- [ ] **Include commissions** - $0.005/share or broker's actual rate
- [ ] **No lookahead bias** - Only use data available at entry time
- [ ] **Walk-forward testing** - Test on out-of-sample data (last 20% of dataset)

### Performance Metrics Analysis
- [ ] **Win rate** - Aim for 55%+ (strategy-dependent)
- [ ] **Average R-multiple** - Avg win / avg loss ratio (target 2.0+)
- [ ] **Expectancy** - (Win rate × Avg win) - (Loss rate × Avg loss) > 0.5R
- [ ] **Max drawdown** - Should be < 25% (preferably < 15%)
- [ ] **Sharpe ratio** - > 1.5 (risk-adjusted return quality)
- [ ] **Number of trades** - 100+ trades minimum (statistical significance)

### Sensitivity Analysis
- [ ] **Vary stop distance** - Test 0.5 ATR, 1 ATR, 1.5 ATR (which optimal?)
- [ ] **Vary profit target** - Test 1.5R, 2R, 2.5R, 3R (diminishing returns?)
- [ ] **Test different regimes** - Trending vs. ranging performance split
- [ ] **Check parameter robustness** - Small changes shouldn't destroy results

---

## 📊 Phase 3: Paper Trading (Forward Testing)

### Paper Trade Setup
- [ ] **Use broker paper account** - TD Ameritrade, Alpaca, TradingView paper
- [ ] **Trade actual market hours** - Same conditions as live
- [ ] **Follow system rules 100%** - No discretion, no skipping signals
- [ ] **Log every trade** - Entry, exit, reason, P&L, emotions

### Paper Trading Duration
- [ ] **Minimum 3 months** - Or 30+ trades (whichever comes first)
- [ ] **Track performance metrics** - Win rate, avg R, drawdown
- [ ] **Compare to backtest** - Within 5-10% of backtest results? (realistic)
- [ ] **Identify execution challenges** - Slippage higher than expected?

### Go/No-Go Decision
- [ ] **Win rate within 10% of backtest?** - If backtest 65%, paper should be 58-72%
- [ ] **Drawdown within tolerance?** - Max DD < 15-20%?
- [ ] **Can you follow rules?** - Emotional discipline intact?
- [ ] **Is edge still present?** - Positive expectancy maintained?

---

## 📊 Phase 4: Live Trading (Deployment)

### Live Pilot Phase (Start Small)
- [ ] **Risk 0.5-1% per trade** - Half of target risk (scale in slowly)
- [ ] **Trade for 1-3 months** - Prove consistency before scaling
- [ ] **Track live vs. paper performance** - Slippage, execution quality
- [ ] **Monitor emotional impact** - Real money = different psychology

### Full Deployment
- [ ] **Increase to full risk (2%)** - After 20+ successful live trades
- [ ] **Monitor monthly performance** - Compare to backtest/paper
- [ ] **Set kill-switch thresholds** - Stop trading if DD > 20% or 5 consecutive losses
- [ ] **Review quarterly** - Is edge persisting? Market regime changed?

### Ongoing System Maintenance
- [ ] **Weekly trade review** - Journal every trade (winners + losers)
- [ ] **Monthly performance attribution** - Which setups worked? Which didn't?
- [ ] **Quarterly system audit** - Backtest on last 3 months (edge still present?)
- [ ] **Regime adjustment** - If regime shifted, pause or adjust filters

---

## 💡 Pro Tips

### System Development Mastery
- **Keep it simple** - Complex ≠ better (3-5 entry conditions max)
- **Optimize for robustness, not returns** - Slight parameter changes shouldn't break system
- **Test across regimes** - Great in trending ≠ great in all conditions (know when to trade)
- **Paper trade LONGER than you want** - 3-6 months minimum (build confidence)

### Common Mistakes to Avoid
- ❌ Curve-fitting (over-optimizing on historical data)
- ❌ Insufficient trades in backtest (< 100 trades = not statistically significant)
- ❌ Ignoring slippage/commissions (destroys edge in real trading)
- ❌ Skipping paper trading (going live too fast = account killer)
- ❌ No kill-switch rules (letting losing system bleed account)

### Red Flags in Backtests
- **Win rate > 80%** - Likely curve-fit or lookahead bias
- **Sharpe > 3.0** - Too good to be true (check for errors)
- **Max DD < 5%** - Unrealistic (expect 15-25% in live trading)
- **Returns > 200%/year** - Probably won't hold in live markets
- **Few trades (< 50)** - Not statistically significant

### Kill-Switch Rules (Non-Negotiable)
- **Stop trading if:**
  - Daily drawdown > -3%
  - 5 consecutive losses
  - Max drawdown > 20%
  - 3 weeks of negative performance
  - System rules violated 3+ times (emotional control lost)

---

## 📚 Related Resources
- **Lesson 35:** Machine Learning Trading (advanced system development with ML)
- **Lesson 37:** Trading Automation APIs (automate your system)
- **Lesson 39:** Performance Attribution (analyze which parts of system work)
- **Recommended Tools:** Python (backtrader, zipline), TradingView (Pine Script), Amibroker

---

**Version:** 1.0
**Last Updated:** 2025-11-02
**Difficulty:** Advanced

---

*Remember: A trading system without testing is gambling. Test rigorously. Trade small. Scale slowly. Survive first, optimize later.*
