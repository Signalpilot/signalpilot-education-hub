# Performance Optimization Guide

**Troubleshooting & Optimizing Signal Pilot Indicators**

---

## Introduction

This guide helps you optimize Signal Pilot indicator performance in TradingView, troubleshoot common issues, and ensure the best trading experience.

---

## Part 1: TradingView Performance Basics

### System Requirements

**Minimum:**
- Modern web browser (Chrome, Firefox, Edge)
- 4GB RAM
- Stable internet connection

**Recommended:**
- Chrome or Firefox (latest version)
- 8GB+ RAM
- Wired internet or strong WiFi

### Browser Optimization

**Chrome optimization:**
1. Clear cache regularly (Settings → Privacy → Clear browsing data)
2. Disable unnecessary extensions
3. Enable hardware acceleration (Settings → System)
4. Limit tabs to 10-15 maximum

**Firefox optimization:**
1. Clear cache (Options → Privacy & Security)
2. Disable unused add-ons
3. Enable hardware acceleration
4. Use containers for tab management

---

## Part 2: TradingView Settings

### Chart Performance Settings

**Access:** Chart settings → Performance

| Setting | Recommended | Impact |
|---------|-------------|--------|
| Max bars | 5000-10000 | Fewer = faster |
| Precision | Auto | Auto adjusts |
| Animations | Off | Improves speed |
| Extended hours | Off (unless needed) | Reduces data load |

### Indicator Limits

TradingView limits:
- **Free:** 3 indicators per chart
- **Pro:** 5 indicators per chart
- **Pro+:** 10 indicators per chart
- **Premium:** 25 indicators per chart

**Tip:** Use fewer, more powerful indicators rather than many overlapping ones.

---

## Part 3: Signal Pilot Indicator Optimization

### Reducing Indicator Load

**Option 1: Consolidate**
```
Instead of:
- Pentarch
- Janus Atlas
- Plutus Flow
- Volume Oracle
- Harmonic Oscillator

Use for different chart layouts:
- Main chart: Pentarch + Janus Atlas
- Second chart: Plutus Flow only
```

**Option 2: Distribute indicators across charts**
```
Signal Pilot indicators have internally optimized parameters.
To reduce load:
- Use fewer indicators per chart
- Spread indicators across multiple chart layouts
- Only display indicators you're actively using
```

### Optimal Settings by System

**Low-end system:**
```
- Use 2-3 indicators max
- Reduce lookback periods to minimums
- Disable visual elements not being used
- Use single chart layout
```

**Mid-range system:**
```
- Use 4-5 indicators
- Standard lookback periods
- Keep essential visual elements
- 2-chart layout acceptable
```

**High-end system:**
```
- Full indicator stack
- Longer lookback periods
- All visual elements enabled
- Multi-chart layouts
```

---

## Part 4: Common Issues & Solutions

### Issue 1: Indicators Not Loading

**Symptoms:**
- Indicator doesn't appear on chart
- "Error loading study" message
- Blank indicator panel

**Solutions:**
1. Refresh the page (F5)
2. Clear browser cache
3. Remove and re-add the indicator
4. Check indicator access (invite-only permissions)
5. Try different browser

### Issue 2: Slow Chart Loading

**Symptoms:**
- Chart takes 10+ seconds to load
- Indicators lag behind price
- Scrolling is choppy

**Solutions:**
1. Reduce number of indicators
2. Decrease max bars setting
3. Close unnecessary tabs
4. Check internet speed
5. Try incognito mode (rules out extensions)

### Issue 3: Signals Not Appearing

**Symptoms:**
- Expected signals not showing
- Historical signals visible but not recent
- Some symbols show signals, others don't

**Solutions:**
1. Check timeframe (higher TF = fewer signals)
2. Verify alert toggles are enabled
3. Ensure asset has enough history/volume
4. Try a more volatile asset (BTC, SPY)
5. Reload indicator

### Issue 4: Display Issues

**Symptoms:**
- Colors not showing correctly
- Labels overlapping
- Chart elements misaligned

**Solutions:**
1. Adjust chart zoom level
2. Check color scheme settings
3. Toggle dark/light mode
4. Adjust indicator visual settings
5. Try different browser

---

## Part 5: Lookback Period Optimization

### Understanding Lookback

Longer lookback = More history analyzed = Slower but potentially more accurate
Shorter lookback = Less history = Faster but potentially noisier

### Recommended Lookbacks by Timeframe

| Timeframe | Short (Fast) | Standard | Long (Smooth) |
|-----------|--------------|----------|---------------|
| 1m-5m | 10 | 14 | 20 |
| 15m-1H | 14 | 20 | 30 |
| 4H-Daily | 20 | 30 | 50 |
| Weekly+ | 14 | 20 | 30 |

### Indicator-Specific Notes

**Pentarch:**
```
Detection parameters are internally optimized
User settings: Alert toggles, color palette, label size
Performance tip: Use on 1H+ timeframes for fewer signals
```

**Janus Atlas:**
```
60+ level types available across 9 categories
Disable level groups you don't use (VWAP, Fib, etc.)
```

**Plutus Flow:**
```
Enhanced OBV with flow ribbons and divergence detection
Toggle visual settings as needed
FlipGuard settings for signal quality
```

---

## Part 6: Multi-Chart Optimization

### Layout Performance Tips

**2-chart layout:**
- Limit each chart to 2-3 indicators
- Consider different indicators per chart
- Sync only what's necessary (symbol vs. interval)

**4+ chart layout:**
- Limit to 1-2 indicators per chart
- Use Augury Grid instead of multiple individual charts
- Consider Premium subscription for more indicators

### Efficient Multi-TF Setup

**Instead of:**
```
4 charts, each with 5 indicators = 20 indicator instances
```

**Do:**
```
2 charts:
- Main chart: 3 indicators
- HTF chart: 2 indicators
= 5 indicator instances (much faster)
```

---

## Part 7: Data & Symbol Considerations

### Asset-Specific Performance

**High-volume assets (faster):**
- BTC, ETH
- SPY, QQQ, AAPL
- EURUSD, GBPUSD

**Low-volume assets (slower/less reliable):**
- Small cap stocks
- Exotic forex pairs
- Low-volume altcoins

**Reason:** More data points, better indicator calculations, more liquidity for accurate signals.

### Exchange Selection

**Best practice:**
- Use primary exchange data
- Avoid aggregated feeds if possible
- For crypto: Use your actual trading exchange

---

## Part 8: Alert Optimization

### Alert Performance

Too many alerts can slow down TradingView.

**Guidelines:**
- Limit alerts to 20-50 (depending on plan)
- Group similar alerts
- Use webhook for high-frequency needs
- Delete expired or unused alerts

### Alert Types

| Alert Type | Performance Impact |
|------------|-------------------|
| Crossing value | Light |
| Indicator condition | Moderate |
| Multi-condition | Heavy |
| Webhook | Light (on TradingView) |

---

## Part 9: Troubleshooting Checklist

### Quick Diagnostics

- [ ] Is internet connection stable?
- [ ] Is browser up to date?
- [ ] Are other heavy tabs closed?
- [ ] Has cache been cleared recently?
- [ ] Are extensions disabled for testing?
- [ ] Is hardware acceleration enabled?

### Indicator Diagnostics

- [ ] Is indicator access valid (invite-only)?
- [ ] Are settings within reasonable ranges?
- [ ] Is timeframe appropriate for the indicator?
- [ ] Is asset liquid enough for reliable signals?
- [ ] Are there too many indicators on the chart?

### Last Resort Steps

1. Remove all indicators
2. Clear all browser data
3. Log out and log back into TradingView
4. Re-add indicators one by one
5. If issue persists, contact TradingView support

---

## Part 10: Contact & Support

### Signal Pilot Support

**For indicator-specific issues:**
- Discord: #support channel
- Email: [Support email]
- Documentation: signalpilot.io/docs

**When contacting support, include:**
- Browser and version
- TradingView subscription level
- Screenshot of the issue
- Steps to reproduce
- Asset and timeframe used

### TradingView Support

**For platform issues:**
- Help Center: TradingView Help
- Community forums
- Direct support (Pro+ and above)

---

## Part 11: Best Practices Summary

### Daily Habits

- [ ] Close unused tabs before trading
- [ ] Use bookmark for TradingView (avoid multiple instances)
- [ ] Clear cache weekly

### Setup Habits

- [ ] Limit indicators per chart (3-5)
- [ ] Save optimal layouts
- [ ] Test settings changes before live trading

### Troubleshooting Habits

- [ ] Try refresh first (F5)
- [ ] Try incognito mode for testing
- [ ] Document issues for support

---

## Part 12: Performance Optimization Checklist

### Browser Level

- [ ] Browser updated to latest version
- [ ] Cache cleared (last 7 days minimum)
- [ ] Hardware acceleration enabled
- [ ] Unnecessary extensions disabled
- [ ] Tabs limited to 15 or fewer

### TradingView Level

- [ ] Max bars set to 5000-10000
- [ ] Animations disabled
- [ ] Extended hours off (unless needed)
- [ ] Unused alerts deleted
- [ ] Layouts saved and organized

### Indicator Level

- [ ] Only necessary indicators enabled
- [ ] Lookback periods optimized
- [ ] Unused visual features disabled
- [ ] Multi-chart indicators distributed

---

*For additional support, visit Discord or email support.*

© Signal Pilot Education Hub
