#!/bin/bash

# Generate simple placeholder icons with brand colors
# Requires ImageMagick

cd "$(dirname "$0")"

# Create a simple SVG icon
cat > temp-icon.svg << 'SVG'
<svg width="512" height="512" xmlns="http://www.w3.org/2000/svg">
  <!-- Background -->
  <rect width="512" height="512" fill="#05070d" rx="80"/>
  
  <!-- Gradient circle -->
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#5b8aff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#76ddff;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Main circle -->
  <circle cx="256" cy="256" r="180" fill="url(#grad)" opacity="0.9"/>
  
  <!-- SP Text -->
  <text x="256" y="290" font-family="Arial, sans-serif" font-size="140" font-weight="bold" fill="white" text-anchor="middle">SP</text>
</svg>
SVG

echo "✅ SVG icon created"

# Convert to PNG using ImageMagick (if available)
if command -v convert &> /dev/null; then
  for size in 72 96 128 144 152 192 384 512; do
    convert temp-icon.svg -resize ${size}x${size} "icon-${size}x${size}.png"
    echo "✅ Generated icon-${size}x${size}.png"
  done
  rm temp-icon.svg
  echo "✅ All placeholder icons generated!"
else
  echo "⚠️  ImageMagick not installed. Keeping SVG only."
  echo "   Install ImageMagick to generate PNG icons:"
  echo "   apt-get install imagemagick"
fi
