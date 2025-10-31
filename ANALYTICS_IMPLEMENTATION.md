# Analytics Implementation Guide

## Goal
Track lesson completion rates, quiz performance, and time spent WITHOUT using Google Analytics (privacy-friendly approach)

---

## Option 1: Plausible Analytics Custom Events (RECOMMENDED)

You already use Plausible! Just add custom events.

### Implementation:

```javascript
// In each lesson page, track events
window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }

// Track lesson started
plausible('Lesson Started', { props: { lesson: 'Lesson 1', tier: 'Beginner' } });

// Track lesson completed
plausible('Lesson Completed', { props: { lesson: 'Lesson 1', timeSpent: '15m' } });

// Track quiz started
plausible('Quiz Started', { props: { lesson: 'Lesson 1' } });

// Track quiz completed
plausible('Quiz Completed', { props: {
  lesson: 'Lesson 1',
  score: '80%',
  attempts: 1
}});

// Track quiz question answered
plausible('Quiz Answer', { props: {
  lesson: 'Lesson 1',
  question: 'Q1',
  correct: true
}});
```

### Dashboard:
View in Plausible dashboard under "Goal Conversions"

### Pros:
- ✅ Already using Plausible
- ✅ Privacy-friendly (GDPR compliant)
- ✅ No extra dependencies
- ✅ Free on your Plausible plan

### Cons:
- ❌ Limited granular querying
- ❌ Can't do complex analysis

---

## Option 2: PostHog (Self-Hosted Analytics)

Privacy-friendly, open-source, powerful analytics.

### Setup:
```bash
npm install posthog-js
```

```javascript
import posthog from 'posthog-js'

posthog.init('YOUR_API_KEY', { api_host: 'https://app.posthog.com' })

// Track events
posthog.capture('lesson_completed', {
  lesson_id: 1,
  lesson_name: 'The Liquidity Lie',
  tier: 'beginner',
  time_spent_seconds: 900
})

posthog.capture('quiz_answer', {
  lesson_id: 1,
  question_id: 'q1',
  correct: true,
  attempt: 1
})
```

### Dashboard:
PostHog has built-in dashboards, funnels, cohorts, retention analysis

### Pros:
- ✅ Self-hosted option (complete privacy)
- ✅ Powerful analytics and insights
- ✅ User session recordings
- ✅ Free tier: 1M events/month

### Cons:
- ❌ Requires setup
- ❌ Another dependency

---

## Option 3: Simple localStorage + Periodic Sync

Build your own lightweight system.

### Implementation:

```javascript
// analytics.js
const Analytics = {
  // Track event
  track(eventName, properties) {
    const event = {
      name: eventName,
      properties: properties,
      timestamp: Date.now(),
      userId: this.getUserId()
    };

    // Store locally
    const events = JSON.parse(localStorage.getItem('sp_analytics_queue') || '[]');
    events.push(event);
    localStorage.setItem('sp_analytics_queue', JSON.stringify(events));

    // Sync if queue is large
    if (events.length >= 10) {
      this.sync();
    }
  },

  // Sync to backend
  async sync() {
    const events = JSON.parse(localStorage.getItem('sp_analytics_queue') || '[]');
    if (events.length === 0) return;

    try {
      await fetch('https://your-backend.com/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ events })
      });

      // Clear queue on success
      localStorage.setItem('sp_analytics_queue', '[]');
    } catch (e) {
      console.error('Analytics sync failed', e);
    }
  },

  // Get or create user ID
  getUserId() {
    let userId = localStorage.getItem('sp_user_id');
    if (!userId) {
      userId = 'user_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('sp_user_id', userId);
    }
    return userId;
  },

  // Track time spent
  startTimer(lessonId) {
    localStorage.setItem('sp_timer_start', Date.now());
    localStorage.setItem('sp_timer_lesson', lessonId);
  },

  endTimer() {
    const start = localStorage.getItem('sp_timer_start');
    const lessonId = localStorage.getItem('sp_timer_lesson');

    if (start && lessonId) {
      const timeSpent = Math.floor((Date.now() - start) / 1000);
      this.track('lesson_time_spent', {
        lesson_id: lessonId,
        seconds: timeSpent
      });
    }

    localStorage.removeItem('sp_timer_start');
    localStorage.removeItem('sp_timer_lesson');
  }
};

// Auto-sync on page unload
window.addEventListener('beforeunload', () => Analytics.sync());

// Usage in lessons:
Analytics.track('lesson_started', { lesson_id: 1, lesson_name: 'The Liquidity Lie' });
Analytics.startTimer(1);

Analytics.track('quiz_completed', {
  lesson_id: 1,
  score: 80,
  attempts: 2
});

Analytics.endTimer();
```

### Backend (Simple Node.js):
```javascript
// server.js
const express = require('express');
const fs = require('fs');
const app = express();

app.post('/api/analytics', express.json(), (req, res) => {
  const { events } = req.body;

  // Append to file (or insert into database)
  fs.appendFile('analytics.log', JSON.stringify(events) + '\n', (err) => {
    if (err) return res.status(500).send('Error');
    res.send('OK');
  });
});

app.listen(3000);
```

### Pros:
- ✅ Complete control
- ✅ No third-party dependencies
- ✅ Can store exactly what you need
- ✅ Privacy-friendly

### Cons:
- ❌ Have to build dashboard yourself
- ❌ Requires backend server
- ❌ More maintenance

---

## Option 4: Supabase Analytics (Easiest Full Solution)

Use Supabase (PostgreSQL) to store analytics + built-in dashboard.

### Setup:
```bash
npm install @supabase/supabase-js
```

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient('YOUR_SUPABASE_URL', 'YOUR_ANON_KEY')

// Track event
await supabase.from('analytics_events').insert({
  event_name: 'lesson_completed',
  user_id: userId,
  lesson_id: 1,
  properties: { tier: 'beginner', time_spent: 900 },
  created_at: new Date()
})

// Query analytics
const { data } = await supabase
  .from('analytics_events')
  .select('*')
  .eq('event_name', 'lesson_completed')
  .gte('created_at', '2024-01-01')
```

### Pros:
- ✅ Free tier: 500MB database, 50K monthly active users
- ✅ Real-time updates
- ✅ Built-in dashboard (SQL queries)
- ✅ Can build custom dashboards
- ✅ Scales easily

### Cons:
- ❌ Requires Supabase account
- ❌ SQL knowledge needed for complex queries

---

## MY RECOMMENDATION

**Use Plausible Custom Events (Option 1)** for now because:
1. ✅ You already use it
2. ✅ Zero setup time
3. ✅ Privacy-friendly
4. ✅ Enough for basic insights

**Upgrade to PostHog or Supabase later** if you need:
- User session recordings
- Funnels and cohort analysis
- Retention tracking
- A/B testing

---

## Events to Track

```javascript
// Lesson Events
plausible('Lesson Started', { props: { lesson: 'L1', tier: 'beginner' } });
plausible('Lesson Completed', { props: { lesson: 'L1', timeSpent: '15m' } });

// Quiz Events
plausible('Quiz Started', { props: { lesson: 'L1' } });
plausible('Quiz Completed', { props: { lesson: 'L1', score: '80', attempts: '1' } });
plausible('Quiz Failed', { props: { lesson: 'L1', score: '40' } });

// Question-Level Tracking
plausible('Question Answered', { props: { lesson: 'L1', question: 'Q1', correct: 'true' } });
plausible('Question Answered', { props: { lesson: 'L1', question: 'Q2', correct: 'false' } });

// Feature Usage
plausible('Chatbot Opened');
plausible('Chatbot Query', { props: { query: 'show takeaways' } });
plausible('Notes Opened', { props: { lesson: 'L1' } });
plausible('Calculator Used', { props: { calculator: 'position-size' } });

// Engagement
plausible('Streak Milestone', { props: { days: '7' } });
plausible('Achievement Unlocked', { props: { achievement: 'beginner_complete' } });
```

---

## Want me to implement Option 1 (Plausible) right now?

It'll take about 30 minutes and you'll immediately start tracking:
- Lesson completion rates
- Quiz performance by question
- Time spent per lesson (estimated)
- Feature usage

Just say the word! 🚀
