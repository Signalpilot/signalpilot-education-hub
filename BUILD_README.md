# Build System Documentation

This document describes the build and optimization system for the Signalpilot Education Hub.

## Overview

The build system provides automated minification, optimization, and quality checks for CSS, JavaScript, and HTML files.

## Prerequisites

```bash
npm install
```

## Available Commands

### Build Everything
```bash
npm run build
```
Runs all build steps: CSS minification, JS minification, and link checking.

### Minify CSS
```bash
npm run minify:css
```
Minifies all CSS files in `assets/` directory. Creates `.min.css` versions alongside originals.

**Output:**
- `assets/edu.min.css`
- `assets/signalpilot-theme.min.css`
- `assets/auth-ui.min.css`
- etc.

### Minify JavaScript
```bash
npm run minify:js
```
Minifies all JavaScript files in `assets/` directory and `sw.js`. Creates `.min.js` versions alongside originals.

**Output:**
- `assets/edu.min.js`
- `assets/signalpilot-theme.min.js`
- `sw.min.js`
- etc.

**Note:** Console statements are preserved for compatibility with the logger utility.

### Check Links
```bash
npm run check-links
```
Scans all HTML files for:
- Broken internal links
- Missing anchor references
- Missing scripts/stylesheets
- Missing images (warnings only)

### Extract Critical CSS
```bash
node scripts/extract-critical-css.js
```
Extracts above-the-fold critical CSS for faster page loads.

**Output:**
- `assets/critical/critical.css`

## Using Minified Files

After running the build, update your HTML files to use minified versions:

### Development
```html
<link rel="stylesheet" href="assets/edu.css">
<script src="assets/edu.js"></script>
```

### Production
```html
<link rel="stylesheet" href="assets/edu.min.css">
<script src="assets/edu.min.js"></script>
```

## Critical CSS Implementation

For optimal performance, inline critical CSS in your `<head>`:

```html
<head>
  <style>
    /* Inline critical CSS content */
    <?php include('assets/critical/critical.css'); ?>
  </style>

  <!-- Load full CSS asynchronously -->
  <link rel="preload" href="assets/edu.min.css" as="style" onload="this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="assets/edu.min.css"></noscript>
</head>
```

## File Structure

```
signalpilot-education-hub/
├── build.js                    # Main build orchestrator
├── package.json                # Dependencies and scripts
├── scripts/
│   ├── minify-css.js          # CSS minification
│   ├── minify-js.js           # JS minification
│   ├── check-links.js         # Link validation
│   └── extract-critical-css.js # Critical CSS extraction
└── assets/
    ├── *.css                  # Source CSS files
    ├── *.min.css              # Minified CSS (generated)
    ├── *.js                   # Source JS files
    ├── *.min.js               # Minified JS (generated)
    └── critical/
        └── critical.css       # Critical CSS (generated)
```

## Build Artifacts

The following files are auto-generated and excluded from git (see `.gitignore`):
- `*.min.css`
- `*.min.js`
- `assets/critical/`

## Performance Tips

1. **Always minify before deployment:**
   ```bash
   npm run build
   ```

2. **Use critical CSS for above-the-fold content**
   - Reduces initial render time
   - Improves Lighthouse scores

3. **Enable compression on your server:**
   - Gzip or Brotli compression
   - Further reduces file sizes

4. **Monitor build output:**
   - Check compression ratios
   - Identify optimization opportunities

## Troubleshooting

### Build Fails
- Ensure Node.js v14+ is installed
- Run `npm install` to install dependencies
- Check error messages for specific issues

### Links Check Fails
- Review reported broken links
- Update or remove broken references
- Some warnings (like missing images) are non-fatal

### Minification Issues
- Check source files for syntax errors
- Review Terser/CleanCSS error messages
- Some files may need manual fixes

## Future Enhancements

- [ ] Automated image optimization
- [ ] HTML minification
- [ ] Source map generation
- [ ] Cache busting with file hashing
- [ ] Integration with GitHub Actions
