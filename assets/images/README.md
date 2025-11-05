# Images Directory

This directory contains images for debugging, documentation, and lesson enhancements.

## Organization

```
assets/images/
├── lessons/           # Lesson-specific images
├── screenshots/       # Screenshots for debugging/documentation
├── charts/           # Chart examples and illustrations
└── diagrams/         # Educational diagrams and flowcharts
```

## Usage

### Adding Images

1. **Lesson images**: Place in `lessons/lesson-XX-name/`
2. **Screenshots**: Place in `screenshots/` with descriptive names
3. **Charts**: Place in `charts/` for trading chart examples
4. **Diagrams**: Place in `diagrams/` for educational illustrations

### Referencing Images in HTML

```html
<!-- From a lesson HTML file -->
<img src="/assets/images/lessons/lesson-01/liquidity-sweep-example.png" alt="Liquidity sweep pattern">

<!-- From documentation -->
<img src="/assets/images/screenshots/checkpoint-issue.png" alt="Checkpoint placement issue">
```

## File Naming Convention

- Use lowercase with hyphens: `liquidity-sweep-pattern.png`
- Be descriptive: `btc-50k-sweep-feb-2024.png`
- Include dates for time-sensitive content: `checkpoint-fix-2024-11-05.png`

## Supported Formats

- **PNG**: For screenshots, diagrams, UI elements
- **JPG/JPEG**: For photos, chart screenshots
- **SVG**: For scalable diagrams and icons
- **WebP**: For optimized web delivery (preferred)

## Optimization

Before committing images:
- Compress PNGs with tools like TinyPNG
- Keep file sizes under 500KB where possible
- Use WebP format for better compression
- Optimize SVGs with SVGO

## Notes

- All images should be relevant to education content or debugging
- Do not commit temporary test images
- Remove unused images during cleanup cycles
