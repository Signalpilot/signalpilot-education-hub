# Augury Grid Symbol Setup Guide

**Multi-Asset Screening & Watchlist Configuration**

---

## What Is Augury Grid?

Augury Grid is Signal Pilot's multi-symbol screening indicator. It displays real-time signal status across multiple assets in a compact grid format, allowing you to:
- Monitor multiple assets simultaneously
- Identify which symbols have active signals
- Prioritize attention based on signal strength
- Build focused watchlists

---

## Core Functionality

| Feature | What It Does |
|---------|--------------|
| **Symbol Grid** | Shows multiple symbols in rows |
| **Signal Status** | Displays current Pentarch signal for each |
| **Strength Score** | Rates signal quality 0-100 |
| **Timeframe Sync** | All symbols on same timeframe |
| **Alert Integration** | Notifies when signals fire |

---

## Initial Setup

### Step 1: Add Augury Grid to Chart

1. Open TradingView indicator panel
2. Search "Augury Grid" or "Signal Pilot"
3. Add to any chart (chart symbol doesn't matter)
4. Grid appears as overlay or panel

### Step 2: Configure Symbol List

```
Settings → Symbol Configuration

Enter symbols separated by commas:
BTCUSD, ETHUSD, SPY, QQQ, AAPL, MSFT, TSLA, NVDA
```

**Maximum symbols:** 20 per grid

---

## Symbol Input Formats

### Crypto

| Exchange | Format | Example |
|----------|--------|---------|
| Binance | BINANCE:BTCUSDT | BINANCE:BTCUSDT |
| Coinbase | COINBASE:BTCUSD | COINBASE:BTCUSD |
| Bybit | BYBIT:BTCUSDT.P | BYBIT:BTCUSDT.P |
| Generic | BTCUSD | BTCUSD |

### Stocks

| Exchange | Format | Example |
|----------|--------|---------|
| NASDAQ | NASDAQ:AAPL | NASDAQ:AAPL |
| NYSE | NYSE:IBM | NYSE:IBM |
| Generic | AAPL | AAPL (auto-routes) |

### Forex

| Format | Example |
|--------|---------|
| FX:EURUSD | FX:EURUSD |
| OANDA:EURUSD | OANDA:EURUSD |
| EURUSD | EURUSD |

### Futures

| Format | Example |
|--------|---------|
| CME:ES1! | CME:ES1! (E-mini S&P) |
| CME:NQ1! | CME:NQ1! (E-mini Nasdaq) |
| NYMEX:CL1! | NYMEX:CL1! (Crude Oil) |

---

## Preset Watchlists

### Crypto Major

```
BTCUSD, ETHUSD, BNBUSD, SOLUSD, XRPUSD,
ADAUSD, DOGEUSD, AVAXUSD, DOTUSD, LINKUSD
```

### US Large Cap Tech

```
AAPL, MSFT, GOOGL, AMZN, META, NVDA,
TSLA, AMD, NFLX, CRM
```

### US Indices & ETFs

```
SPY, QQQ, IWM, DIA, VIX,
TLT, GLD, USO, XLF, XLE
```

### Forex Majors

```
EURUSD, GBPUSD, USDJPY, USDCHF,
AUDUSD, USDCAD, NZDUSD, EURGBP
```

### Futures

```
ES1!, NQ1!, YM1!, RTY1!,
CL1!, GC1!, SI1!, ZB1!
```

---

## Grid Display Settings

### Layout Options

| Setting | Options | Recommendation |
|---------|---------|----------------|
| Columns | 1-5 | 3-4 for desktop |
| Row Height | Compact/Normal/Large | Normal |
| Show Symbol | On/Off | On |
| Show Price | On/Off | Optional |
| Show Change % | On/Off | On |
| Show Signal Label | On/Off | On |
| Show Score | On/Off | On |

### Grid Position

| Position | Best For |
|----------|----------|
| Top Right | Minimal chart obstruction |
| Bottom Right | Below price action |
| Left Side | Quick reference |
| Separate Panel | Full focus on grid |

---

## Signal Display

### Signal Status Indicators

| Display | Meaning |
|---------|---------|
| 🟣 **TD** | Touchdown active |
| 🔵 **IGN** | Ignition active |
| 🟡 **WRN** | Warning active |
| 🟠 **CAP** | Climax active |
| 🔴 **BDN** | Breakdown active |
| ⚪ **—** | No active signal |

### Score Display

```
Symbol: BTCUSD
Signal: TD
Score: 85/100

Score breakdown:
- Signal recency: How recent (fresher = higher)
- Regime alignment: Signal matches regime
- Volume confirmation: Volume supports signal
- Multi-TF alignment: HTF agrees
```

---

## Filtering & Sorting

### Filter Options

| Filter | What It Does |
|--------|--------------|
| Active Signals Only | Hide symbols with no signal |
| Signal Type | Show only TD, IGN, etc. |
| Minimum Score | Hide below threshold |
| Regime Filter | Bull only, Bear only |

### Sort Options

| Sort By | Description |
|---------|-------------|
| Signal Score | Highest quality first |
| Signal Recency | Most recent first |
| Symbol Name | Alphabetical |
| Price Change % | Biggest movers first |

---

## Timeframe Configuration

### Single Timeframe Mode

All symbols display signals from ONE timeframe.

| Your Trading TF | Set Grid To |
|-----------------|-------------|
| Scalping | 5m or 15m |
| Day Trading | 1H |
| Swing Trading | 4H or Daily |
| Position Trading | Daily or Weekly |

### Multi-Timeframe Mode (Advanced)

Show signal status across multiple timeframes per symbol.

```
Symbol | 15m | 1H | 4H | Daily
-------|-----|----|----|------
BTCUSD | TD  | —  | IGN| —
ETHUSD | —   | TD | TD | WRN
SPY    | IGN | IGN| —  | —
```

**Confluence:** Multiple TFs with same direction = stronger

---

## Alert Configuration

### Grid Alert Types

| Alert | Trigger | Priority |
|-------|---------|----------|
| Any Signal | Any symbol fires any signal | Low |
| Specific Signal | Selected signal type fires | Medium |
| High Score Signal | Signal with score >80 | High |
| Multi-TF Confluence | Same signal on 2+ TFs | High |

### Alert Actions

| Action | Description |
|--------|-------------|
| Pop-up | TradingView notification |
| Sound | Audio alert |
| Email | Send to email |
| Webhook | External integration |

---

## Workflow: Building Focused Watchlists

### Step 1: Start Broad

```
Add 15-20 symbols in your universe
Run for 1-2 sessions
Note which generate quality signals
```

### Step 2: Track Performance

```
When signal fires → note outcome
Track: Win rate, average move, best TF
Build data on each symbol
```

### Step 3: Refine List

```
Remove: Low win rate, choppy symbols
Keep: Clean signals, good moves
Add: Similar symbols to winners
```

### Step 4: Create Specialized Lists

```
Morning Watchlist: Active in first 2 hours
Crypto Overnight: 24/7 opportunities
Earnings Season: High-IV names
Trend Following: Strong directional bias
```

---

## Symbol Categories Best Practices

### High Volatility (Crypto, Growth Stocks)

```
Settings:
- Higher score threshold (70+)
- Fresher signal priority
- Tighter watchlist (8-10 symbols)
```

### Low Volatility (Indices, Forex)

```
Settings:
- Lower score threshold (60+)
- Longer signal validity
- Can monitor more symbols (15-20)
```

### Correlated Assets

```
Tip: Don't overload correlated assets
Example: Don't have all FAANG + QQQ + SPY

Better: Pick representative assets
- 1 tech leader (AAPL or MSFT)
- 1 index (SPY or QQQ)
- Diversify sectors
```

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| Symbol not loading | Wrong format | Check exchange prefix |
| No signals showing | Symbols inactive | Check market hours |
| Grid too cluttered | Too many symbols | Reduce to 10-12 |
| Signals not updating | Data delay | Refresh indicator |
| Scores always low | Strict settings | Relax thresholds |

---

## Performance Optimization

### For Speed

- Limit to 10-12 symbols
- Use single timeframe mode
- Disable price/change display
- Reduce update frequency

### For Completeness

- Up to 20 symbols
- Enable multi-TF mode
- Show all display options
- Real-time updates

---

## Sample Configurations

### Configuration 1: Crypto Scalper

```
Symbols: BTCUSDT, ETHUSDT, BNBUSDT, SOLUSDT, XRPUSDT
Timeframe: 5m
Filters: Active signals only, Score >70
Alerts: All signals with sound
```

### Configuration 2: Stock Swing Trader

```
Symbols: SPY, QQQ, AAPL, MSFT, NVDA, AMD, TSLA, META, GOOGL, AMZN
Timeframe: 4H
Filters: TD and IGN only, Score >65
Alerts: High score signals only
```

### Configuration 3: Forex Day Trader

```
Symbols: EURUSD, GBPUSD, USDJPY, AUDUSD, USDCAD, NZDUSD
Timeframe: 1H
Filters: All signals, Score >60
Alerts: Multi-TF confluence
```

---

## Quick Reference

### Minimum Viable Setup

1. Add 5-10 symbols you trade regularly
2. Set to your primary trading timeframe
3. Enable "Active Signals Only"
4. Set score threshold to 65
5. Turn on alerts for new signals

### Advanced Setup

1. Create 3-4 specialized watchlists
2. Use multi-TF mode for confluence
3. Set different alerts per signal type
4. Review and optimize weekly

---

*Educational purposes only. Not financial advice.*

© Signal Pilot Education Hub
