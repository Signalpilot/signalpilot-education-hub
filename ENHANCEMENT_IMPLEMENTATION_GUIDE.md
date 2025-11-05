# Enhancement Implementation Guide
**How to Implement Remaining Structural Improvements**

Date: November 5, 2025
Status: Ready to implement

---

## Overview

This guide provides **step-by-step technical instructions** for implementing the 4 remaining LOW-priority enhancements identified in the lesson structure analysis.

**Current Status:**
- ✅ Generic learning objectives → Customized (COMPLETE)
- ✅ Progress trackers → Added to all lessons (COMPLETE)
- 🔄 Closing section order → INCONSISTENT (needs standardization)
- 🔄 Checkpoint markers → MISSING (needs addition)
- 🔄 A/B testing → NOT IMPLEMENTED (needs setup)
- 🔄 Metrics tracking → BASIC ONLY (needs enhancement)

---

## Enhancement 1: Standardize Closing Section Order

### Current State Analysis
```
INCONSISTENT PATTERNS FOUND:
- Lesson 1: Takeaways → Test → Practice → Download → Related
- Lesson 2: Takeaways → Practice → Related → Test → Download
- Lesson 9: Takeaways → Test → Practice → Download → Related → Download (duplicate!)
```

### Target Standard Order
```
1. Key Takeaways (summary recap)
2. Practice Exercise (immediate application)
3. Test Your Knowledge (quiz validation)
4. Related Lessons (discovery/next steps)
5. Downloadable Resources (external materials)
```

**Rationale:**
- Takeaways = consolidate learning
- Practice = apply immediately while fresh
- Test = validate understanding
- Related = encourage continued learning
- Download = optional external resource (last)

---

### Implementation Method: Python Script

**Approach:** Extract all closing sections, reorder them, reassemble.

**Script: `/scripts/standardize_closing_order.py`**

```python
#!/usr/bin/env python3
"""
Standardize closing section order across all lessons
Target order: Takeaways → Practice → Quiz → Related → Download
"""

import re
from pathlib import Path

TARGET_ORDER = [
    'key-takeaway',      # Key Takeaways
    'Practice Exercise', # Practice Exercise
    'Test Your',         # Test Your Knowledge/Understanding
    'Related Lessons',   # Related Lessons
    'Downloadable'       # Downloadable Resources
]

def extract_closing_sections(content):
    """Extract all closing sections as (type, html_block) tuples"""
    sections = []

    # Pattern to match section breaks and their content
    pattern = r'(<div class="(?:key-takeaway|section-break)">.*?</div>)(?=\s*(?:<div class="(?:key-takeaway|section-break)">|<div class="nav-article">|<\/div>\s*<\/div>\s*<!-- Bottom Navigation))'

    matches = re.finditer(pattern, content, re.DOTALL)

    for match in matches:
        block = match.group(1)

        # Determine section type
        if 'key-takeaway' in block:
            section_type = 'key-takeaway'
        elif 'Practice Exercise' in block:
            section_type = 'Practice Exercise'
        elif 'Test Your' in block:
            section_type = 'Test Your'
        elif 'Related Lessons' in block:
            section_type = 'Related Lessons'
        elif 'Downloadable' in block:
            section_type = 'Downloadable'
        else:
            continue

        sections.append((section_type, block, match.start(), match.end()))

    return sections

def reorder_sections(sections):
    """Reorder sections according to TARGET_ORDER"""
    ordered = []

    for target_type in TARGET_ORDER:
        for section in sections:
            if section[0] == target_type:
                ordered.append(section)
                break

    return ordered

def apply_standardization(file_path):
    """Standardize closing section order in a single lesson"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract sections
    sections = extract_closing_sections(content)

    if len(sections) < 3:
        return False, "Not enough closing sections found"

    # Check if already in order
    current_order = [s[0] for s in sections]
    target_types = [t for t in TARGET_ORDER if t in current_order]

    if current_order == target_types:
        return False, "Already in correct order"

    # Reorder
    reordered = reorder_sections(sections)

    # Remove old sections from content
    for section in reversed(sections):
        content = content[:section[2]] + content[section[3]:]

    # Find insertion point (before Bottom Navigation)
    nav_pattern = r'<!-- Bottom Navigation -->|<div class="nav-article">'
    nav_match = re.search(nav_pattern, content)

    if not nav_match:
        return False, "Could not find insertion point"

    # Insert reordered sections
    new_sections = '\n\n'.join([s[1] for s in reordered])
    content = content[:nav_match.start()] + '\n' + new_sections + '\n\n' + content[nav_match.start():]

    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return True, f"Reordered {len(sections)} sections"

def main():
    curriculum_dir = Path('curriculum')
    lesson_files = sorted(curriculum_dir.glob('*/*.html'))

    print(f"Standardizing closing section order in {len(lesson_files)} lessons...\n")

    success_count = 0
    for lesson_file in lesson_files:
        success, message = apply_standardization(lesson_file)
        if success:
            print(f"✓ {lesson_file.name}: {message}")
            success_count += 1
        else:
            print(f"- {lesson_file.name}: {message}")

    print(f"\n{'='*60}")
    print(f"Standardized {success_count} lessons")

if __name__ == '__main__':
    main()
```

**Complexity:** MEDIUM (requires careful HTML parsing)
**Effort:** 2-3 hours (script dev + testing)
**Risk:** LOW (non-destructive, can be reverted)

---

## Enhancement 2: Add Checkpoint Markers

### Current State
```
CHECKPOINT MARKERS: Inconsistent or missing
- Some lessons have 0 checkpoints
- Some have 1-3 checkpoints
- Placement is arbitrary (not based on reading position)
```

### Target Implementation
```
Add 3 checkpoints at:
- 33% through content (after Part 2-3)
- 66% through content (after Part 4-5)
- 90% through content (before Key Takeaways)
```

**Checkpoint HTML:**
```html
<div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
  <h4>🔴 CHECKPOINT (5 minutes)</h4>
  <p>You've completed the first third of this lesson.</p>
  <p style="margin-top:0.5rem;font-size:0.9rem">Take a 30-second breath before continuing...</p>
</div>
```

---

### Implementation Method: Character-Count Based Insertion

**Script: `/scripts/add_checkpoint_markers.py`**

```python
#!/usr/bin/env python3
"""
Add checkpoint markers at 33%, 66%, 90% reading progress
"""

import re
from pathlib import Path

CHECKPOINT_TEMPLATES = {
    33: '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🔴 CHECKPOINT (5 minutes)</h4>
        <p>You've completed the first third of this lesson.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Take a 30-second breath before continuing...</p>
      </div>
''',
    66: '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🟡 CHECKPOINT (10 minutes)</h4>
        <p>You're now at the halfway point. You've learned the key strategies.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Great progress! Take a quick stretch break...</p>
      </div>
''',
    90: '''
      <div class="callout-info" style="background:rgba(0,212,170,0.1);border-left:4px solid #00d4aa;margin:2rem 0">
        <h4>🟢 CHECKPOINT (15 minutes)</h4>
        <p>Almost done! You've mastered the complete framework.</p>
        <p style="margin-top:0.5rem;font-size:0.9rem">Final stretch - you're doing great...</p>
      </div>
'''
}

def find_content_bounds(content):
    """Find start and end of main content (exclude header/footer)"""

    # Start: After progress tracker or first H2
    start_pattern = r'</div>\s*\n\s*<h2'
    start_match = re.search(start_pattern, content)
    start_pos = start_match.start() if start_match else 0

    # End: Before "Key Takeaways"
    end_pattern = r'<div class="key-takeaway">'
    end_match = re.search(end_pattern, content)
    end_pos = end_match.start() if end_match else len(content)

    return start_pos, end_pos

def find_h2_positions(content, start_pos, end_pos):
    """Find all H2 positions in content area"""
    h2_pattern = r'<h2[^>]*>'
    matches = re.finditer(h2_pattern, content[start_pos:end_pos])

    positions = [start_pos + m.start() for m in matches]
    return positions

def insert_checkpoints(file_path):
    """Insert checkpoint markers at 33%, 66%, 90% positions"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Skip if already has checkpoints
    if content.count('CHECKPOINT') >= 3:
        return False, "Already has 3+ checkpoints"

    # Find content bounds
    start_pos, end_pos = find_content_bounds(content)
    content_length = end_pos - start_pos

    if content_length < 5000:  # Too short for checkpoints
        return False, "Content too short for checkpoints"

    # Find H2 positions to insert near
    h2_positions = find_h2_positions(content, start_pos, end_pos)

    if len(h2_positions) < 4:  # Need at least 4 H2s for good placement
        return False, "Not enough H2 headings for placement"

    # Calculate target positions (33%, 66%, 90% of content)
    target_positions = {
        33: start_pos + int(content_length * 0.33),
        66: start_pos + int(content_length * 0.66),
        90: start_pos + int(content_length * 0.90)
    }

    # Find nearest H2 before each target
    insertions = []
    for percent, target_pos in target_positions.items():
        # Find H2 closest to but before target position
        nearest_h2 = None
        for h2_pos in h2_positions:
            if h2_pos < target_pos:
                nearest_h2 = h2_pos
            else:
                break

        if nearest_h2:
            insertions.append((nearest_h2, percent))

    # Insert checkpoints (in reverse to preserve positions)
    for pos, percent in reversed(insertions):
        checkpoint_html = CHECKPOINT_TEMPLATES[percent]
        content = content[:pos] + checkpoint_html + '\n\n' + content[pos:]

    # Write back
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

    return True, f"Added {len(insertions)} checkpoint markers"

def main():
    curriculum_dir = Path('curriculum')
    lesson_files = sorted(curriculum_dir.glob('*/*.html'))

    print(f"Adding checkpoint markers to {len(lesson_files)} lessons...\n")

    success_count = 0
    for lesson_file in lesson_files:
        try:
            success, message = insert_checkpoints(lesson_file)
            if success:
                print(f"✓ {lesson_file.name}: {message}")
                success_count += 1
            else:
                print(f"- {lesson_file.name}: {message}")
        except Exception as e:
            print(f"✗ {lesson_file.name}: ERROR - {e}")

    print(f"\n{'='*60}")
    print(f"Added checkpoints to {success_count} lessons")

if __name__ == '__main__':
    main()
```

**Complexity:** MEDIUM (requires calculating content positions)
**Effort:** 2-3 hours (script dev + testing)
**Risk:** LOW (purely additive, doesn't remove anything)

---

## Enhancement 3: A/B Test TL;DR Placement

### Current Implementation
```
TL;DR placement: After title/meta, before first H2 (standardized)
```

### A/B Test Hypothesis
```
Variant A (Current): TL;DR at top
Variant B (Test): TL;DR after first section (Part 1)

Question: Which placement increases:
- TL;DR open rate?
- Lesson completion rate?
- Time on page?
```

---

### Implementation Method: Client-Side A/B Testing

**Option 1: Simple JavaScript Cookie-Based (NO external tools)**

**Add to `/assets/ab-test-tldr.js`:**

```javascript
/**
 * A/B Test: TL;DR Placement
 * Variant A: TL;DR at top (current)
 * Variant B: TL;DR after Part 1
 */

(function() {
  'use strict';

  // Check if user already has a variant assigned
  let variant = localStorage.getItem('ab_tldr_variant');

  if (!variant) {
    // Assign 50/50 split
    variant = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem('ab_tldr_variant', variant);
  }

  // Log variant to analytics
  if (window.plausible) {
    plausible('AB Test', { props: { variant: variant, test: 'tldr_placement' } });
  }

  if (variant === 'B') {
    // Move TL;DR after first H2
    const tldr = document.querySelector('details');
    const firstH2 = document.querySelector('.prose h2');

    if (tldr && firstH2) {
      // Find the section break after first H2 (or just after H2)
      let insertPoint = firstH2.nextElementSibling;

      // If next element is a section break, insert after it
      if (insertPoint && insertPoint.classList.contains('section-break')) {
        insertPoint = insertPoint.nextElementSibling;
      }

      // Move TL;DR
      if (insertPoint) {
        insertPoint.parentNode.insertBefore(tldr, insertPoint);
      }
    }
  }

  // Track TL;DR interactions
  const tldrElement = document.querySelector('details');
  if (tldrElement) {
    tldrElement.addEventListener('toggle', function() {
      if (this.open) {
        if (window.plausible) {
          plausible('TL;DR Opened', { props: { variant: variant } });
        }
      }
    });
  }
})();
```

**Add to lesson HTML `<head>`:**
```html
<script src="/assets/ab-test-tldr.js" defer></script>
```

**Track results in Plausible:**
- Event: "AB Test" with variant property
- Event: "TL;DR Opened" with variant property
- Compare conversion rates between variants

---

**Option 2: Google Optimize (More robust, requires setup)**

1. **Install Google Optimize** (if not already)
2. **Create experiment:**
   - Variant A: Original (no changes)
   - Variant B: Move TL;DR via JavaScript (same as above)
3. **Set objectives:**
   - Primary: Lesson completion rate
   - Secondary: Time on page, TL;DR open rate
4. **Run for 2-4 weeks** (minimum 1,000 sessions per variant)
5. **Analyze results** in Google Optimize dashboard

---

**Option 3: Posthog (Open-source alternative)**

Similar to Google Optimize but self-hosted:
1. Install Posthog snippet
2. Create feature flag: `tldr_placement_test`
3. Implement variant logic (same JavaScript as Option 1)
4. Track events and analyze in Posthog dashboard

---

**Complexity:** LOW (for Option 1), MEDIUM (for Options 2-3)
**Effort:** 1-2 hours (Option 1), 4-6 hours (Options 2-3 with setup)
**Risk:** LOW (client-side only, no server changes)

**Recommended:** Start with **Option 1** (simple JavaScript) for quick validation.

---

## Enhancement 4: Track Metrics

### Current Analytics (Plausible)
```html
<script defer data-domain="signalpilot.io" src="https://plausible.io/js/script.js"></script>
```

**Currently tracking:**
- Page views
- Basic navigation
- (Limited custom events)

---

### Target Metrics to Track

#### **1. Scroll Depth** (% of page viewed)
```javascript
// Add to /assets/scroll-depth-tracking.js

let maxScroll = 0;
const milestones = [25, 50, 75, 90, 100];
const tracked = new Set();

window.addEventListener('scroll', () => {
  const scrollPercent = Math.round(
    (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
  );

  maxScroll = Math.max(maxScroll, scrollPercent);

  // Track milestones
  milestones.forEach(milestone => {
    if (maxScroll >= milestone && !tracked.has(milestone)) {
      tracked.add(milestone);

      if (window.plausible) {
        plausible('Scroll Depth', {
          props: {
            percent: milestone,
            lesson: document.querySelector('h1').textContent
          }
        });
      }
    }
  });
}, { passive: true });

// Track on page exit
window.addEventListener('beforeunload', () => {
  if (window.plausible && maxScroll > 0) {
    plausible('Max Scroll', {
      props: {
        percent: maxScroll,
        lesson: document.querySelector('h1').textContent
      }
    });
  }
});
```

---

#### **2. Section Time Spent**
```javascript
// Track time spent in each major section

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionName = entry.target.querySelector('h2')?.textContent || 'Unknown';
      const startTime = Date.now();

      entry.target.dataset.startTime = startTime;
    } else {
      if (entry.target.dataset.startTime) {
        const timeSpent = Math.round((Date.now() - entry.target.dataset.startTime) / 1000);

        if (timeSpent > 5 && window.plausible) { // Minimum 5 seconds
          plausible('Section Time', {
            props: {
              section: entry.target.querySelector('h2')?.textContent,
              seconds: timeSpent
            }
          });
        }

        delete entry.target.dataset.startTime;
      }
    }
  });
}, { threshold: 0.5 });

// Observe all H2 sections
document.querySelectorAll('.prose h2').forEach(h2 => {
  sectionObserver.observe(h2.parentElement);
});
```

---

#### **3. Interactive Element Engagement**
```javascript
// Track clicks on key interactive elements

// Tabs
document.querySelectorAll('.tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    if (window.plausible) {
      plausible('Tab Clicked', {
        props: {
          tab: btn.textContent.trim(),
          lesson: document.querySelector('h1').textContent
        }
      });
    }
  });
});

// Accordions
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    if (window.plausible) {
      plausible('Accordion Opened', {
        props: {
          section: header.textContent.trim()
        }
      });
    }
  });
});

// Callout boxes
const calloutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.tracked) {
      entry.target.dataset.tracked = 'true';

      const type = entry.target.className.split(' ').find(c => c.startsWith('callout-'));

      if (window.plausible && type) {
        plausible('Callout Viewed', {
          props: {
            type: type,
            heading: entry.target.querySelector('h4')?.textContent
          }
        });
      }
    }
  });
}, { threshold: 0.8 });

document.querySelectorAll('[class*="callout-"]').forEach(callout => {
  calloutObserver.observe(callout);
});
```

---

#### **4. Quiz Performance**
```javascript
// Track quiz attempts and scores

document.querySelectorAll('.quiz-submit').forEach(btn => {
  btn.addEventListener('click', function() {
    const quiz = this.closest('.quiz');
    const selectedOption = quiz.querySelector('.quiz-option.selected');
    const isCorrect = selectedOption?.dataset.correct === 'true';

    if (window.plausible) {
      plausible('Quiz Answered', {
        props: {
          lesson: document.querySelector('h1').textContent,
          correct: isCorrect ? 'yes' : 'no'
        }
      });
    }
  });
});
```

---

#### **5. Download Tracking**
```javascript
// Track resource downloads

document.querySelectorAll('a[download]').forEach(link => {
  link.addEventListener('click', function() {
    if (window.plausible) {
      plausible('Resource Downloaded', {
        props: {
          resource: this.textContent.trim(),
          lesson: document.querySelector('h1').textContent
        }
      });
    }
  });
});
```

---

### Consolidated Tracking Script

**Create: `/assets/enhanced-analytics.js`**

```javascript
/**
 * Enhanced Analytics for SignalPilot Education Hub
 * Tracks: Scroll depth, section time, interactions, quiz performance, downloads
 */

(function() {
  'use strict';

  // Only run if Plausible is available
  if (!window.plausible) {
    console.warn('Plausible not loaded, analytics disabled');
    return;
  }

  const lessonTitle = document.querySelector('h1')?.textContent || 'Unknown Lesson';

  // 1. SCROLL DEPTH TRACKING
  let maxScroll = 0;
  const scrollMilestones = [25, 50, 75, 90, 100];
  const trackedMilestones = new Set();

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.round((window.scrollY / docHeight) * 100);

    maxScroll = Math.max(maxScroll, scrollPercent);

    scrollMilestones.forEach(milestone => {
      if (maxScroll >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        plausible('Scroll Depth', { props: { percent: milestone, lesson: lessonTitle } });
      }
    });
  }, { passive: true });

  // 2. SECTION TIME TRACKING
  const sectionTimes = new Map();

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const sectionId = entry.target.id || entry.target.querySelector('h2')?.textContent;

      if (entry.isIntersecting) {
        sectionTimes.set(sectionId, Date.now());
      } else {
        const startTime = sectionTimes.get(sectionId);
        if (startTime) {
          const timeSpent = Math.round((Date.now() - startTime) / 1000);
          if (timeSpent >= 5) {
            plausible('Section Time', {
              props: { section: sectionId, seconds: timeSpent, lesson: lessonTitle }
            });
          }
          sectionTimes.delete(sectionId);
        }
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.prose h2').forEach(h2 => {
    const section = h2.closest('section') || h2.parentElement;
    if (section) sectionObserver.observe(section);
  });

  // 3. INTERACTIVE ELEMENTS

  // TL;DR toggle
  document.querySelectorAll('details').forEach(details => {
    details.addEventListener('toggle', function() {
      if (this.open) {
        plausible('TL;DR Opened', { props: { lesson: lessonTitle } });
      }
    });
  });

  // Tabs
  document.querySelectorAll('.tabs button').forEach(btn => {
    btn.addEventListener('click', function() {
      plausible('Tab Clicked', {
        props: { tab: this.textContent.trim(), lesson: lessonTitle }
      });
    });
  });

  // Accordions
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', function() {
      plausible('Accordion Opened', {
        props: { section: this.textContent.trim(), lesson: lessonTitle }
      });
    });
  });

  // 4. QUIZ PERFORMANCE
  document.querySelectorAll('.quiz-submit').forEach(btn => {
    btn.addEventListener('click', function() {
      const quiz = this.closest('.quiz');
      const selected = quiz.querySelector('.quiz-option.selected') ||
                       quiz.querySelector('.quiz-option:hover');
      const isCorrect = selected?.dataset.correct === 'true';

      plausible('Quiz Answered', {
        props: { lesson: lessonTitle, correct: isCorrect ? 'yes' : 'no' }
      });
    });
  });

  // 5. DOWNLOAD TRACKING
  document.querySelectorAll('a[download], a[href*=".pdf"]').forEach(link => {
    link.addEventListener('click', function() {
      plausible('Resource Downloaded', {
        props: { resource: this.textContent.trim(), lesson: lessonTitle }
      });
    });
  });

  // 6. LESSON COMPLETION (on exit)
  window.addEventListener('beforeunload', () => {
    plausible('Lesson Exit', {
      props: {
        lesson: lessonTitle,
        maxScroll: maxScroll,
        timeOnPage: Math.round(performance.now() / 1000)
      }
    });
  });

  console.log('✓ Enhanced analytics initialized');
})();
```

**Add to lesson template `<head>`:**
```html
<script src="/assets/enhanced-analytics.js" defer></script>
```

---

### Viewing Metrics in Plausible

1. **Custom Events Dashboard:**
   - Go to Plausible → Custom Events
   - Filter by event name (Scroll Depth, Section Time, etc.)

2. **Create Custom Goals:**
   - Goal: "Scroll Depth" when props.percent = 90
   - Goal: "Quiz Answered" when props.correct = yes
   - Goal: "Resource Downloaded"

3. **Analyze Patterns:**
   - Which sections have highest/lowest time spent?
   - At what % do most users drop off?
   - Which interactive elements get most engagement?
   - Quiz performance by lesson

---

**Complexity:** LOW (for basic tracking), MEDIUM (for advanced dashboards)
**Effort:** 2-3 hours (script creation), 1-2 hours (dashboard setup)
**Risk:** NONE (purely tracking, no UX changes)

---

## Implementation Priority & Timeline

### Phase 1: Quick Wins (1-2 days)
1. ✅ **Checkpoint markers** (2-3 hours)
   - High user value
   - Low complexity
   - Purely additive

2. ✅ **Enhanced analytics** (2-3 hours)
   - Data collection starts immediately
   - Informs future decisions
   - No user-facing changes

### Phase 2: Data-Driven Improvements (1 week)
3. ✅ **A/B test TL;DR placement** (1-2 hours setup, 2-4 weeks data collection)
   - Run while collecting analytics
   - Low risk, high learning potential

4. ✅ **Standardize closing sections** (2-3 hours)
   - More complex regex/parsing
   - Do after analyzing section time data
   - Can inform optimal order

---

## Testing & Rollout

### Testing Approach for Each Enhancement

#### Checkpoint Markers
```bash
# Test on 3 sample lessons first
python3 scripts/add_checkpoint_markers.py --test-only \
  curriculum/beginner/01-the-liquidity-lie.html \
  curriculum/intermediate/21-bid-ask-spread-dynamics.html \
  curriculum/advanced/48-institutional-order-flow.html

# Verify visually in browser
# If good, run on all lessons
python3 scripts/add_checkpoint_markers.py --all
```

#### Analytics
```bash
# Deploy to one lesson first
# Open in browser with DevTools console
# Verify events fire correctly in Plausible
# If good, add to all lesson templates
```

#### A/B Test
```bash
# Deploy to 20% of traffic first
# Monitor for JS errors in console
# Check variant distribution (should be ~50/50)
# If stable, scale to 100%
```

#### Closing Section Order
```bash
# Test on 5 diverse lessons
# Verify visually (inspect with browser)
# Check order matches TARGET_ORDER
# If good, run on all lessons
```

---

## Success Metrics

### How to Measure Success

| Enhancement | Metric | Target | How to Measure |
|-------------|--------|--------|----------------|
| **Checkpoints** | Completion rate | +5-10% | Plausible: (Scroll Depth 100%) / (Page Views) |
| **Checkpoints** | Time on page | +2-3 min | Plausible: Avg session duration |
| **Analytics** | Data coverage | 100% of lessons | Plausible: Event counts |
| **A/B Test** | TL;DR open rate | ? | Plausible: (TL;DR Opened) / (Page Views) per variant |
| **A/B Test** | Completion rate | Variant B > A? | Plausible: Compare scroll depth 90% between variants |
| **Section Order** | Practice engagement | +15% | Plausible: "Practice Exercise" section time before/after |

---

## Code Repository Structure

Recommended file organization:

```
signalpilot-education-hub/
├── scripts/
│   ├── standardize_closing_order.py
│   ├── add_checkpoint_markers.py
│   └── test_enhancements.py
├── assets/
│   ├── enhanced-analytics.js (NEW)
│   ├── ab-test-tldr.js (NEW)
│   └── scroll-depth-tracking.js (NEW)
├── docs/
│   └── ENHANCEMENT_IMPLEMENTATION_GUIDE.md (THIS FILE)
└── curriculum/
    └── (lesson files)
```

---

## Next Steps

### To Implement All 4 Enhancements:

**Step 1:** Review this guide with team
**Step 2:** Prioritize based on business goals
**Step 3:** Set up tracking in Plausible (if not done)
**Step 4:** Implement Phase 1 (checkpoints + analytics)
**Step 5:** Collect data for 2 weeks
**Step 6:** Implement Phase 2 (A/B test + section order)
**Step 7:** Analyze results, iterate

**Estimated Total Effort:** 8-12 hours (spread over 2-3 days)
**Estimated Total Risk:** LOW (all changes are reversible)

---

## Questions?

**For implementation help:**
- Review Python scripts in detail
- Test on sample lessons before full rollout
- Monitor Plausible dashboard for anomalies
- Use git for version control (easy rollback)

**For analytics questions:**
- Plausible docs: https://plausible.io/docs
- Custom events: https://plausible.io/docs/custom-event-goals
- Dashboard setup: Check Plausible admin panel

---

**Document Version:** 1.0
**Last Updated:** November 5, 2025
**Status:** Ready for implementation
