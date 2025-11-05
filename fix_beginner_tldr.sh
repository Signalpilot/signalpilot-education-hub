#!/bin/bash
# Fix beginner lesson TL;DRs one by one

cd /home/user/signalpilot-education-hub/curriculum/beginner

# Count how many have the broken TL;DR
echo "Checking TL;DR status in beginner lessons..."
for f in *.html; do
  if grep -q "After that trade, Marcus opened a spreadsheet" "$f" 2>/dev/null; then
    echo "  ❌ Broken: $f"
  elif grep -q "📋 Quick Summary" "$f" 2>/dev/null; then
    echo "  ✅ Fixed: $f"
  else
    echo "  ? Unknown: $f"
  fi
done
