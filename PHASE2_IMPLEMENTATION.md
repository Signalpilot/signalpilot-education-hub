# Phase 2: Visualization & Practice Features

## 🎉 Implementation Complete!

This document describes the Phase 2 features that have been implemented:

1. **Skills Radar Chart** - Visual representation of progress across 4 skill categories
2. **Interactive Learning Path Map** - Interactive map showing all 82 lessons with progress tracking
3. **Scenario Challenge System** - Timed trading scenarios with scoring and feedback

---

## 📁 Files Created

### JavaScript Files
- `assets/progress-viz.js` - Skills radar chart, time tracking, percentile calculations
- `assets/learning-path-map.js` - Interactive learning path visualization
- `assets/challenges.js` - Scenario challenge system with timer and scoring

### CSS Files
- `assets/progress-viz.css` - Styles for radar chart and progress visualization
- `assets/challenges.css` - Styles for scenario challenges

### HTML Pages
- `challenges.html` - Challenges hub page with quick start and stats
- `learning-path.html` - Enhanced learning path visualization page (new enhanced version available)

### Database Schema
- `supabase-schema-phase2.sql` - New tables and functions for scenarios and tracking

---

## 🗄️ Database Setup

### Required Tables

1. **scenarios** - Stores scenario challenges
   - Contains: title, description, chart_image_url, context, options, correct_answer, explanation
   - Difficulty levels: beginner, intermediate, advanced
   - Skill categories: technical_analysis, order_flow, risk_management, psychology

2. **user_scenario_results** - Tracks user performance on scenarios
   - Contains: user_id, scenario_id, selected_answer, is_correct, time_taken, score

3. **Views & Functions**:
   - `scenario_leaderboard` - View for top performers
   - `get_user_skills(user_uuid)` - Get user's skill progress
   - `get_user_time_stats(user_uuid)` - Get time invested stats
   - `get_user_percentile(user_uuid)` - Calculate user percentile

### Setup Instructions

1. Run the SQL schema in Supabase SQL Editor:
   ```bash
   # First run the main schema if not already done
   # Then run Phase 2 schema
   ```

2. Copy contents of `supabase-schema-phase2.sql` and execute in Supabase SQL Editor

3. Sample scenarios are included in the schema for testing

---

## 🎯 Features Overview

### 1. Skills Radar Chart

**Location:** Can be added to My Library or Learning Path page

**How it works:**
- Automatically categorizes 82 lessons into 4 skill areas:
  - Technical Analysis (20 lessons)
  - Order Flow (18 lessons)
  - Risk Management (15 lessons)
  - Trading Psychology (18 lessons)

- Calculates progress percentage for each skill
- Visualizes using Chart.js radar chart
- Shows detailed breakdown with progress bars

**Integration:**
```html
<!-- Add to page head -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<link rel="stylesheet" href="/assets/progress-viz.css">
<script src="/assets/progress-viz.js" defer></script>

<!-- Add to page body -->
<div class="skills-radar-container">
  <canvas id="skillsRadarChart"></canvas>
</div>
<div id="skillsBreakdown"></div>
```

**API:**
```javascript
// Calculate skills manually
const skills = ProgressViz.calculateSkillProgress();

// Create radar chart
ProgressViz.createRadarChart('skillsRadarChart');

// Display breakdown list
ProgressViz.displaySkillsBreakdown('skillsBreakdown');
```

---

### 2. Interactive Learning Path Map

**Location:** Learning Path page or My Library

**Features:**
- Shows all 82 lessons across 4 tiers
- Visual indicators:
  - ✓ Completed lessons (blue gradient)
  - Current lesson (purple gradient, pulsing)
  - Locked lessons (grayed out with lock icon)

- Click any unlocked lesson to navigate to it
- Shows unlock requirements for locked tiers
- Current position indicator

**Integration:**
```html
<!-- Add to page head -->
<link rel="stylesheet" href="/assets/progress-viz.css">
<script src="/assets/learning-path-map.js" defer></script>

<!-- Add to page body -->
<div id="learningPathMap"></div>
<div id="progressOverview"></div>
```

**API:**
```javascript
// Render full learning path
LearningPathMap.render('learningPathMap');

// Render compact progress overview
LearningPathMap.renderOverview('progressOverview');

// Get tier progress
const progress = LearningPathMap.getTierProgress('beginner');
// Returns: { completed: 15, total: 20, percentage: 75 }

// Check if tier is unlocked
const unlocked = LearningPathMap.isTierUnlocked('intermediate');

// Find current lesson
const currentLesson = LearningPathMap.findCurrentLesson();
```

---

### 3. Time Tracking

**Features:**
- Automatically tracks time spent on each lesson
- Updates every 30 seconds
- Pauses when tab is hidden
- Syncs to cloud (Supabase) every 5 minutes
- Shows total time invested
- Calculates percentile ranking

**Integration:**
```html
<!-- Add to page head -->
<script src="/assets/progress-viz.js" defer></script>

<!-- Add to page body -->
<div id="timeStats"></div>
```

**How it works:**
- Auto-starts when user visits a lesson page
- Tracks `lesson(\d+).html` pattern
- Stores in localStorage: `sp_time_tracking`
- Format:
  ```json
  {
    "total_seconds": 45600,
    "by_lesson": { "1": 1200, "2": 900 },
    "by_date": { "2025-01-15": 3600 }
  }
  ```

**API:**
```javascript
// Create tracker instance
const tracker = new ProgressViz.TimeTracker();

// Start tracking for lesson
tracker.start(lessonId);

// Stop tracking
tracker.stop();

// Get total time
const seconds = tracker.getTotalTime();
const formatted = tracker.getFormattedTotalTime(); // "12h 45m"
```

---

### 4. Scenario Challenges

**Location:** `/challenges.html`

**Features:**
- Timed trading scenarios (default 60 seconds)
- Multiple choice questions with 4 options
- Scoring system:
  - Base points for correct answer (100 pts)
  - Time bonus (2 pts per second remaining)
  - Total score saved to database

- Instant feedback with detailed explanations
- Filters by difficulty and skill category
- User stats and leaderboard
- XP integration with gamification system

**Challenge Flow:**
1. User selects difficulty/category or random
2. Challenge loads with timer
3. User selects answer
4. Timer stops, correct answer highlighted
5. Detailed explanation shown
6. Score calculated and saved
7. XP awarded if correct

**Integration:**
```html
<!-- Add to page head -->
<link rel="stylesheet" href="/assets/challenges.css">
<script src="/assets/challenges.js" defer></script>
<script src="/assets/config.js" defer></script>
<script src="/assets/supabase-client.js" defer></script>

<!-- Add to page body -->
<div id="challengeContainer"></div>
```

**API:**
```javascript
// Load random challenge
await ScenarioChallenges.loadNextChallenge({
  containerId: 'challengeContainer',
  difficulty: 'intermediate', // optional
  skillCategory: 'technical_analysis' // optional
});

// Load specific scenario by ID
const scenario = await ScenarioChallenges.loadScenario(scenarioId);

// Render challenge
ScenarioChallenges.renderChallenge(scenario, 'challengeContainer');

// Get user stats
const stats = await ScenarioChallenges.getUserStats();
// Returns: { total, correct, totalScore, avgScore, accuracy }

// Get leaderboard
const leaderboard = await ScenarioChallenges.getLeaderboard(10);
```

---

## 🎨 Adding Features to My Library

To add these features to the My Library page:

```html
<!-- Add to <head> -->
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<link rel="stylesheet" href="/assets/progress-viz.css">
<script src="/assets/progress-viz.js" defer></script>
<script src="/assets/learning-path-map.js" defer></script>

<!-- Add new tabs to the page -->
<div class="library-tabs">
  <button onclick="showTab('overview')">Overview</button>
  <button onclick="showTab('progress')">Progress</button>
  <button onclick="showTab('skills')">Skills</button>
  <button onclick="showTab('path')">Learning Path</button>
</div>

<!-- Tab content areas -->
<div id="overview-tab" class="tab-content">
  <!-- Existing overview content -->
  <div id="timeStats"></div>
</div>

<div id="skills-tab" class="tab-content" style="display: none;">
  <div class="skills-radar-container">
    <canvas id="skillsRadarChart"></canvas>
  </div>
  <div id="skillsBreakdown"></div>
</div>

<div id="path-tab" class="tab-content" style="display: none;">
  <div id="progressOverview"></div>
  <div id="learningPathMap"></div>
</div>
```

---

## 📊 Creating Scenario Challenges

### Manual Entry (via Supabase Dashboard)

1. Go to Supabase Dashboard → Table Editor → `scenarios`
2. Click "Insert row"
3. Fill in:
   - **title**: Short challenge title
   - **description**: One-line description
   - **context**: Detailed scenario context
   - **difficulty**: beginner | intermediate | advanced
   - **skill_category**: technical_analysis | order_flow | risk_management | psychology
   - **options**: JSON array of options:
     ```json
     [
       {"id": "A", "text": "Buy now - momentum is strong"},
       {"id": "B", "text": "Wait for pullback"},
       {"id": "C", "text": "Short - reversal coming"},
       {"id": "D", "text": "Stay out"}
     ]
     ```
   - **correct_answer_id**: "A", "B", "C", or "D"
   - **explanation**: Detailed explanation of correct answer
   - **time_limit_seconds**: 30, 45, 60, or 90
   - **points**: 100 (standard)
   - **chart_image_url**: (optional) URL to chart image

### Via SQL

```sql
INSERT INTO scenarios (
  title, description, context, difficulty, skill_category,
  options, correct_answer_id, explanation, time_limit_seconds, points
) VALUES (
  'Support or Breakdown?',
  'Price is testing key support. What do you do?',
  'TSLA has been in a downtrend for 3 weeks. Price is now testing major support at $200 for the third time. Volume is decreasing on each test.',
  'intermediate',
  'technical_analysis',
  '[
    {"id": "A", "text": "Buy at support - third time holds"},
    {"id": "B", "text": "Wait for break below $200 then short"},
    {"id": "C", "text": "Buy if it bounces with volume"},
    {"id": "D", "text": "Stay out - let it prove itself"}
  ]'::jsonb,
  'C',
  'The correct answer is C. Multiple tests of support often lead to a breakdown. However, waiting for a bounce WITH volume confirmation shows strength and is a safer entry than blindly buying at support. In this scenario, price broke below $200 briefly, then bounced back with high volume, eventually rallying to $215.',
  60,
  100
);
```

---

## 🎮 Gamification Integration

The challenge system integrates with the existing gamification system:

### XP Awards
- Completing a challenge: Score-based XP (100-200+ XP)
- First challenge: +50 XP bonus
- 10 challenges: "Challenge Seeker" badge
- Perfect score (max time bonus): +50 XP extra

### Events Dispatched
```javascript
// When scenario is completed
window.dispatchEvent(new CustomEvent('sp:scenarioCompleted', {
  detail: {
    scenario_id, selected_answer_id, is_correct, time_taken, score
  }
}));
```

### Listening for Events
```javascript
window.addEventListener('sp:scenarioCompleted', (e) => {
  const { is_correct, score } = e.detail;
  if (is_correct) {
    // Award XP, unlock badges, etc.
  }
});
```

---

## 🧪 Testing

### Test Skills Radar Chart
1. Complete lessons from different categories
2. Visit My Library or Learning Path page
3. Verify radar chart shows correct percentages
4. Check skills breakdown matches completed lessons

### Test Learning Path Map
1. Complete some lessons in Beginner tier
2. Visit Learning Path page
3. Verify:
   - Completed lessons show checkmark
   - Current lesson is highlighted
   - Locked lessons are grayed out
   - Can click lessons to navigate

### Test Time Tracking
1. Visit any lesson page
2. Stay on page for 1+ minute
3. Check localStorage: `sp_time_tracking`
4. Verify time is incrementing
5. Leave page and return
6. Verify time persists

### Test Scenario Challenges
1. Visit `/challenges.html`
2. Click "Random Challenge"
3. Verify:
   - Timer counts down
   - Can select answer
   - Timer stops on answer
   - Correct answer is highlighted
   - Explanation is shown
   - Score is calculated
4. If logged in, verify result is saved to database

---

## 🔧 Configuration

### Skill Category Mapping

Edit `assets/progress-viz.js` to modify which lessons belong to which skills:

```javascript
const SKILL_CATEGORIES = {
  technical_analysis: {
    name: 'Technical Analysis',
    color: 'rgba(91, 138, 255, 0.6)',
    lessons: [1, 2, 3, 7, 8, 9, ...] // Lesson numbers
  },
  // ... other categories
};
```

### Challenge Scoring

Edit `assets/challenges.js` to modify scoring:

```javascript
// Base score for correct answer
const baseScore = currentChallenge.points || 100;

// Time bonus (default: 2 points per second remaining)
const timeBonus = Math.max(0, timeRemaining * 2);
```

---

## 📱 Mobile Support

All features are fully responsive:
- Radar chart resizes for mobile
- Learning path map stacks vertically
- Challenge UI optimized for touch
- Stats grids collapse to single column

---

## 🚀 Deployment Checklist

- [ ] Upload all new JS/CSS files to `/assets/`
- [ ] Upload `challenges.html` to root
- [ ] Run Phase 2 SQL schema in Supabase
- [ ] Add sample scenarios to database
- [ ] Test on desktop and mobile
- [ ] Update navigation to include Challenges link
- [ ] Update My Library to include new tabs (optional)
- [ ] Configure Chart.js CDN (already in learning-path.html template)
- [ ] Test authentication flow for challenges
- [ ] Verify cloud sync for time tracking
- [ ] Test percentile calculation with multiple users

---

## 📝 Future Enhancements

Potential additions for Phase 3:

1. **Challenge Creation Tool**: Allow admins to create scenarios via UI
2. **Challenge Replay**: Let users retry scenarios to improve scores
3. **Daily Challenge**: One featured challenge per day with bonus XP
4. **Challenge Tournaments**: Weekly competitions with leaderboards
5. **Custom Learning Paths**: Let users create custom sequences
6. **Skill Recommendations**: Suggest lessons based on weak skills
7. **Chart Integration**: Interactive TradingView charts in scenarios
8. **Social Sharing**: Share challenge results on social media
9. **Challenge Comments**: Discuss scenarios with other learners
10. **AI-Generated Scenarios**: Generate new scenarios using AI

---

## 🆘 Troubleshooting

### Radar Chart Not Showing
- Verify Chart.js is loaded: `typeof Chart !== 'undefined'`
- Check canvas element exists: `document.getElementById('skillsRadarChart')`
- Check console for errors

### Time Tracking Not Working
- Verify lesson page URL matches pattern: `lesson(\d+).html`
- Check localStorage: `localStorage.getItem('sp_time_tracking')`
- Verify visibility change events are firing

### Challenges Not Loading
- Check Supabase connection
- Verify `scenarios` table exists and has data
- Check browser console for errors
- Verify RLS policies allow read access

### Percentile Showing 0%
- Requires multiple users with time tracking data
- Check Supabase function: `get_user_percentile()`
- Verify user is logged in

---

## 📚 Resources

- **Chart.js Docs**: https://www.chartjs.org/docs/latest/
- **Supabase Docs**: https://supabase.com/docs
- **Web Animations API**: https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API

---

## ✅ Summary

Phase 2 adds powerful visualization and practice features:

✓ **Skills Radar Chart** - Visual progress across 4 trading skill areas
✓ **Learning Path Map** - Interactive 82-lesson journey visualization
✓ **Time Tracking** - Automatic tracking with percentile ranking
✓ **Scenario Challenges** - Timed trading scenarios with scoring
✓ **Database Schema** - New tables for scenarios and results
✓ **Gamification Integration** - XP and badge support
✓ **Mobile Responsive** - All features work on mobile

**Ready to deploy!** 🚀
