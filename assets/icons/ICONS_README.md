# PWA Icons Guide

## Required Icons for PWA

The PWA manifest requires the following icon sizes:

- ✅ 72x72 px
- ✅ 96x96 px
- ✅ 128x128 px
- ✅ 144x144 px
- ✅ 152x152 px
- ✅ 192x192 px (minimum for Android)
- ✅ 384x384 px
- ✅ 512x512 px (recommended for splash screens)

## Icon Design Recommendations

### Brand Colors:
- Background: `#05070d` (dark)
- Primary: `#5b8aff` (blue)
- Accent: `#76ddff` (cyan)

### Content:
- Use "SP" monogram or Signal Pilot logo
- Ensure contrast for visibility
- Make it recognizable at small sizes
- Use maskable icon format (safe area)

## Quick Generation Options:

### Option 1: Design Tool (Figma/Photoshop)
1. Create 512x512 px artboard
2. Add your logo/icon
3. Export at all required sizes

### Option 2: Online Generator
- [PWA Builder Image Generator](https://www.pwabuilder.com/imageGenerator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- Upload 512x512 source → downloads all sizes

### Option 3: ImageMagick (Command Line)
```bash
# Convert single source to all sizes
convert source.png -resize 72x72 icon-72x72.png
convert source.png -resize 96x96 icon-96x96.png
convert source.png -resize 128x128 icon-128x128.png
convert source.png -resize 144x144 icon-144x144.png
convert source.png -resize 152x152 icon-152x152.png
convert source.png -resize 192x192 icon-192x192.png
convert source.png -resize 384x384 icon-384x384.png
convert source.png -resize 512x512 icon-512x512.png
```

## Temporary Solution

For now, the PWA will work without icons (browsers will use favicon/default). Add icons when ready to maximize install conversion rate.

## File Naming

Files should be named exactly as specified in manifest.json:
- `icon-72x72.png`
- `icon-96x96.png`
- etc.

Place all files in `/assets/icons/` directory.

## Testing

After adding icons, test on:
- Chrome DevTools → Application → Manifest
- Mobile device → Add to Home Screen
- Check icon appears correctly
