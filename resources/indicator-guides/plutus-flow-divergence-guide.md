# Plutus Flow v1.0 Guide

**Enhanced OBV with Divergence Detection & Flow Ribbons**

---

## What is Plutus Flow?

Plutus Flow is Signal Pilot's **enhanced On-Balance Volume (OBV)** indicator with four analytical layers: the OBV line, flow ribbons, statistical bands, and automatic divergence detection. It helps identify accumulation and distribution before price confirms.

---

## The Four Layers

### Layer 1: OBV Line
The primary cumulative volume line displayed in the indicator panel.
- **Rising OBV** = Accumulation (buying pressure)
- **Falling OBV** = Distribution (selling pressure)

### Layer 2: Flow Ribbon & Basis
Colored background bands comparing OBV to a dynamic baseline:
- **Green ribbon** = OBV above basis (bullish flow)
- **Red ribbon** = OBV below basis (bearish flow)

### Layer 3: Statistical Bands
Upper and lower bands at ±2 standard deviations:
- **White dots** = Price entering extreme zone
- **Yellow dots** = Price exiting extreme zone

### Layer 4: Divergence Detection
Automatic identification of price-OBV divergences with labels:
- **Bull Div** = Bullish divergence detected
- **Bear Div** = Bearish divergence detected
- **Bull Hid** = Hidden bullish divergence
- **Bear Hid** = Hidden bearish divergence

---

## Divergence Types Explained

### Regular Bullish Divergence
- Price makes **lower low**
- OBV makes **higher low**
- Meaning: Selling pressure weakening, potential reversal up

### Regular Bearish Divergence
- Price makes **higher high**
- OBV makes **lower high**
- Meaning: Buying pressure weakening, potential reversal down

### Hidden Bullish Divergence
- Price makes **higher low**
- OBV makes **lower low**
- Meaning: Trend continuation in uptrend

### Hidden Bearish Divergence
- Price makes **lower high**
- OBV makes **higher high**
- Meaning: Trend continuation in downtrend

---

## Adjustable Settings

### Calculation Settings
| Setting | Description |
|---------|-------------|
| HTF Timeframe | Higher timeframe for OBV calculation |

### Quality Settings (FlipGuard System)
| Setting | Description |
|---------|-------------|
| FlipGuard Bars | Minimum bars between opposite signals |
| Strict Cross Gate | Alignment requirement for crosses |
| Robust Extremes | Alternative statistical method |
| FlipGuard 2.0 | Z-gate, min |z| gate, boost multiplier, per-bar decay |
| Sequence Filter | Additional filtering layer |

### Assists Settings
| Setting | Description |
|---------|-------------|
| HTF Alignment Timeframe | For multi-timeframe confirmation |

### Divergence Settings
| Setting | Description |
|---------|-------------|
| Min Price Swing | xATR threshold for divergence detection |

### Visual Settings
| Setting | Options |
|---------|---------|
| Show Divergence Labels | On/Off |
| Show Extreme Zone Exits | On/Off |
| Color Customization | Various color options |

---

## Visual Components

Displayed in a **separate panel below the price chart**:

| Element | Description |
|---------|-------------|
| OBV cumulative line | Main indicator line |
| Trend ribbons | Green/red background shading |
| Cross signal dots | Green (bullish cross), Red (bearish cross) |
| Extreme zone markers | White (breach), Yellow (exit) |
| Divergence labels | Bull Div, Bear Div, Bull Hid, Bear Hid |
| Statistical band lines | ±2σ boundaries |

---

## How to Read Plutus Flow

### Flow Direction
1. **Green ribbon expanding** = Strong accumulation
2. **Red ribbon expanding** = Strong distribution
3. **Ribbon flipping color** = Flow direction changing

### Cross Signals
- **Green dot** = OBV crossing above basis (bullish)
- **Red dot** = OBV crossing below basis (bearish)

### Extreme Zones
- **White dot** = Entering overbought/oversold territory
- **Yellow dot** = Exiting extreme zone (potential reversal area)

### Divergence Signals
- Wait for divergence label to appear
- Confirm with other indicators (Pentarch, Volume Oracle)
- Use for reversal or continuation setups

---

## Trading Applications

### Accumulation Detection
Look for:
- Rising OBV while price consolidates
- Green ribbon expanding
- Bullish cross dots forming
- Volume increasing on up moves

### Distribution Detection
Look for:
- Falling OBV while price holds high
- Red ribbon expanding
- Bearish cross dots forming
- Volume increasing on down moves

### Divergence Trading
1. Identify divergence label (Bull Div, Bear Div, etc.)
2. Wait for price confirmation (structure break)
3. Enter with stop beyond the swing point
4. Target based on measured move or levels

---

## Integration with Other Indicators

### Plutus Flow + Pentarch
- Plutus shows accumulation/distribution
- Pentarch provides timing signals
- WRN + Bear Div = Strong reversal warning
- TD + Bull Div = Potential accumulation complete

### Plutus Flow + Volume Oracle
- Both analyze volume but differently
- Volume Oracle = Regime classification
- Plutus Flow = Flow direction and divergences
- Use together for complete volume picture

### Plutus Flow + Janus Atlas
- Plutus identifies when flow changes
- Janus provides key levels for entries
- Trade flow changes at significant levels

---

## Best Practices

1. **Don't trade divergence alone** - Always confirm with price action
2. **Hidden divergences = trend continuation** - Trade in trend direction
3. **Regular divergences = potential reversals** - Wait for structure break
4. **Watch the ribbon color** - Flow direction matters more than single dots
5. **Use extreme zones carefully** - They indicate stretched conditions, not guaranteed reversals

---

*For volume analysis strategies, see the Education Hub curriculum on OBV and institutional flow concepts.*
