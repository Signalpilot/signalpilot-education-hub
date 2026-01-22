# Augury Grid v1.0 Guide

**Multi-Symbol Scanner with Quality Scoring**

---

## What is Augury Grid?

Augury Grid is Signal Pilot's **multi-symbol screening table** that monitors **7 symbols across 3 timeframes** simultaneously—totaling 21 scans. It displays ranked signals with quality scores, entry/exit levels, and real-time P&L tracking.

---

## Display Overview

Augury Grid shows a professional table with **9 columns**:

| Column | Shows |
|--------|-------|
| **#** | Rank by quality score |
| **Sym** | Symbol/ticker |
| **TF** | Timeframe |
| **Bias** | Direction + star rating |
| **Age** | Time since signal |
| **Entry** | Entry price |
| **SL** | Stop loss level |
| **TP** | Take profit level |
| **P&L** | Current profit/loss |

---

## Signal Quality Scoring

Signals receive a 0-100 quality score displayed as stars:

| Stars | Score Range | Meaning |
|-------|-------------|---------|
| ⭐ | 70-84 | Basic quality signal |
| ⭐⭐ | 85-94 | Good quality signal |
| ⭐⭐⭐ | 95-100 | Excellent quality signal |

### Multi-Timeframe Confluence Indicators
- **🔗** = 2 timeframes agree on direction
- **🔗🔗** = All 3 timeframes aligned (highest conviction)

---

## Lifecycle Indicators

| Indicator | Meaning |
|-----------|---------|
| ⏳ + blockers | Signal pending, shows what's missing (MACD, Trend, EMA200, ADX, RSI, Volume, Momentum) |
| 💀 SL Hit | Position stopped out |
| 💀 Stale | Signal expired (>30 days old) |

---

## Adjustable Settings

### Display Configuration
| Setting | Options |
|---------|---------|
| Mobile Mode | On/Off (simplified layout) |
| Text Size | Tiny, Small, Normal, Large |
| Position | 4 corner locations |
| Column Visibility | Toggle each of 9 columns |

### Signal Detection Tuning
| Setting | Range | Default | Description |
|---------|-------|---------|-------------|
| ADX Minimum | 10-40 | 20 | Trend strength threshold |
| RSI Range Low | 20-80 | 40 | Oversold boundary |
| RSI Range High | 20-80 | 60 | Overbought boundary |
| Volume Spike | 1.0-3.0× | 1.3 | Volume multiplier for detection |
| Extension ATR | 1.0-5.0 | 2.5 | Price extension threshold |

### Position Management
| Setting | Description |
|---------|-------------|
| SL ×ATR | Stop loss distance (ATR multiplier) |
| TP1 ×ATR | First take profit distance |
| TP2 ×ATR | Runner take profit distance |

### Filtering & Timeframe Options
| Setting | Default | Description |
|---------|---------|-------------|
| Min Score | 70 | Minimum quality to display |
| Show Top N | 7 | Maximum rows shown |
| TF 1 | 15m | First timeframe to scan |
| TF 2 | 4H | Second timeframe to scan |
| TF 3 | Daily | Third timeframe to scan |
| Symbol Preset | Various | 8 built-in watchlists + custom |

---

## Built-In Symbol Presets

Augury Grid includes 8 pre-configured watchlists:

1. **Crypto Major** - BTC, ETH, and major altcoins
2. **Forex Major** - EUR/USD, GBP/USD, USD/JPY, etc.
3. **US Indices** - SPY, QQQ, DIA, IWM
4. **Commodities** - Gold, Silver, Oil, etc.
5. **Tech Stocks** - AAPL, MSFT, GOOGL, etc.
6. **Custom 1-3** - User-defined symbol lists

---

## How to Use Augury Grid

### Morning Scan Workflow
1. Open Augury Grid on preferred chart
2. Review ranked signals by quality
3. Look for ⭐⭐⭐ and 🔗🔗 indicators
4. Click through to symbols with best setups
5. Confirm with detailed analysis

### Signal Interpretation
| What You See | What It Means |
|--------------|---------------|
| BULL ⭐⭐⭐ 🔗🔗 | High-quality long, all TFs aligned |
| BEAR ⭐⭐ 🔗 | Good short, 2 TFs agree |
| ⏳ [ADX, VOL] | Signal pending, needs more trend strength and volume |
| 💀 SL Hit | Previous signal stopped out |

### Filtering Best Setups
Use the Min Score filter to show only high-quality signals:
- **Score 85+** = Show only good/excellent signals
- **Score 70+** = Show all qualifying signals
- **Score 95+** = Show only exceptional signals

---

## Timeframe Selection

### For Day Trading
- TF1: 5m or 15m
- TF2: 1H
- TF3: 4H

### For Swing Trading
- TF1: 1H
- TF2: 4H
- TF3: Daily

### For Position Trading
- TF1: 4H
- TF2: Daily
- TF3: Weekly

---

## Integration with Other Indicators

### Augury Grid as Scanner
Use Augury Grid to find opportunities, then switch to that symbol's chart with full indicator stack (Pentarch, Volume Oracle, Janus Atlas) for detailed analysis.

### Workflow Example
1. Augury shows BTCUSD ⭐⭐⭐ 🔗🔗 BULL
2. Switch to BTCUSD chart
3. Confirm with Pentarch (looking for TD or IGN)
4. Check Volume Oracle (should show Accumulation)
5. Find entry level with Janus Atlas
6. Execute trade

---

## Blocker Indicators

When a signal shows ⏳ with blockers, these indicate what conditions aren't met:

| Blocker | Meaning |
|---------|---------|
| MACD | MACD not confirming direction |
| Trend | EMA trend not aligned |
| EMA200 | Price on wrong side of 200 EMA |
| ADX | Trend strength too weak |
| RSI | RSI in unfavorable zone |
| Volume | Volume confirmation missing |
| Momentum | Momentum not confirming |

Signals fire when enough conditions clear. Blockers help you understand why a setup isn't ready yet.

---

## Best Practices

1. **Use as a scanner, not a signal system** - Always confirm with full analysis
2. **Prioritize 🔗🔗 setups** - Multi-TF alignment = highest probability
3. **Check blockers** - Understand why signals are pending
4. **Customize for your style** - Adjust TFs and presets to match your trading
5. **Don't chase stale signals** - Fresh signals (low Age) are better

---

*For multi-symbol trading strategies, see the Education Hub curriculum on watchlist management and opportunity scanning.*
