#!/bin/bash

echo "=== BEGINNER LESSONS ==="
for file in /home/user/signalpilot-education-hub/curriculum/beginner/*.html; do
  title=$(grep '<h1 class="headline xl">' "$file" | sed 's/<[^>]*>//g' | head -1 | xargs)
  num=$(basename "$file" | cut -d'-' -f1)
  quiz=$(grep -c 'quiz-question' "$file" || echo "0")
  examples=$(grep -c 'callout-\|story-summary' "$file" || echo "0")
  echo "$num | $quiz quizzes | $examples examples | $title"
done

echo ""
echo "=== INTERMEDIATE LESSONS ==="
for file in /home/user/signalpilot-education-hub/curriculum/intermediate/*.html; do
  title=$(grep '<h1 class="headline xl">' "$file" | sed 's/<[^>]*>//g' | head -1 | xargs)
  num=$(basename "$file" | cut -d'-' -f1)
  quiz=$(grep -c 'quiz-question' "$file" || echo "0")
  examples=$(grep -c 'callout-\|story-summary' "$file" || echo "0")
  echo "$num | $quiz quizzes | $examples examples | $title"
done

echo ""
echo "=== ADVANCED LESSONS ==="
for file in /home/user/signalpilot-education-hub/curriculum/advanced/*.html; do
  title=$(grep '<h1 class="headline xl">' "$file" | sed 's/<[^>]*>//g' | head -1 | xargs)
  num=$(basename "$file" | cut -d'-' -f1)
  quiz=$(grep -c 'quiz-question' "$file" || echo "0")
  examples=$(grep -c 'callout-\|story-summary' "$file" || echo "0")
  echo "$num | $quiz quizzes | $examples examples | $title"
done
