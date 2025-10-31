// AI Chatbot for Signal Pilot Education
(function() {
  'use strict';

  // ========== PHASE 1: CONTEXT & PROGRESS ==========

  // Accurate lesson file mapping
  const lessonFiles = {
    1: '/curriculum/beginner/01-the-liquidity-lie.html',
    2: '/curriculum/beginner/02-volume-doesnt-lie.html',
    3: '/curriculum/beginner/03-price-action-is-dead.html',
    4: '/curriculum/beginner/04-repaint-problem.html',
    5: '/curriculum/beginner/05-rsi-extremes.html',
    6: '/curriculum/beginner/06-moving-averages.html',
    7: '/curriculum/beginner/07-revenge-trading.html',
    8: '/curriculum/beginner/08-confirmation-bias.html',
    9: '/curriculum/beginner/09-position-sizing.html',
    10: '/curriculum/beginner/10-stop-losses.html',
    11: '/curriculum/beginner/11-timeframe-illusion.html',
    12: '/curriculum/beginner/12-paper-trading.html',
    13: '/curriculum/intermediate/13-bid-ask-spread-dynamics.html',
    14: '/curriculum/intermediate/14-order-book-analysis.html',
    15: '/curriculum/intermediate/15-market-making-hft.html',
    16: '/curriculum/intermediate/16-footprint-charts.html',
    17: '/curriculum/intermediate/17-dark-pools.html',
    18: '/curriculum/intermediate/18-smart-money-divergence.html',
    19: '/curriculum/intermediate/19-multi-timeframe-mastery.html',
    20: '/curriculum/intermediate/20-janus-atlas-advanced.html',
    21: '/curriculum/intermediate/21-plutus-flow-mastery.html',
    22: '/curriculum/intermediate/22-minimal-flow-regimes.html',
    23: '/curriculum/intermediate/23-portfolio-construction.html',
    24: '/curriculum/intermediate/24-backtesting-reality.html',
    25: '/curriculum/intermediate/25-advanced-risk-management.html',
    26: '/curriculum/intermediate/26-trade-journal-mastery.html',
    27: '/curriculum/intermediate/27-professional-operations.html',
    28: '/curriculum/advanced/28-institutional-order-flow.html',
    29: '/curriculum/advanced/29-market-regime-recognition.html',
    30: '/curriculum/advanced/30-auction-theory-advanced.html',
    31: '/curriculum/advanced/31-cross-asset-correlations.html',
    32: '/curriculum/advanced/32-volatility-trading.html',
    33: '/curriculum/advanced/33-algorithmic-execution.html',
    34: '/curriculum/advanced/34-system-development.html',
    35: '/curriculum/advanced/35-machine-learning-trading.html',
    36: '/curriculum/advanced/36-high-frequency-concepts.html',
    37: '/curriculum/advanced/37-trading-automation-apis.html',
    38: '/curriculum/advanced/38-portfolio-theory-advanced.html',
    39: '/curriculum/advanced/39-performance-attribution.html',
    40: '/curriculum/advanced/40-tax-optimization.html',
    41: '/curriculum/advanced/41-professional-infrastructure.html',
    42: '/curriculum/advanced/42-trading-career-path.html'
  };

  // Detect current lesson from URL
  function getCurrentLesson() {
    const path = window.location.pathname;
    const match = path.match(/\/curriculum\/(beginner|intermediate|advanced)\/(\d+)-(.+)\.html/);
    if (match) {
      return {
        tier: match[1],
        number: parseInt(match[2]),
        slug: match[3],
        title: match[3].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      };
    }
    return null;
  }

  // Get user progress from localStorage
  function getUserProgress() {
    try {
      const progress = JSON.parse(localStorage.getItem('sp_progress') || '{}');
      const completed = Object.keys(progress).filter(key => progress[key].completed).length;
      const total = 42;
      const percentage = Math.round((completed / total) * 100);

      // Calculate tier breakdown
      const beginnerCompleted = Object.keys(progress).filter(k => {
        const num = parseInt(k.replace('lesson-', ''));
        return num >= 1 && num <= 12 && progress[k].completed;
      }).length;

      const intermediateCompleted = Object.keys(progress).filter(k => {
        const num = parseInt(k.replace('lesson-', ''));
        return num >= 13 && num <= 27 && progress[k].completed;
      }).length;

      const advancedCompleted = Object.keys(progress).filter(k => {
        const num = parseInt(k.replace('lesson-', ''));
        return num >= 28 && num <= 42 && progress[k].completed;
      }).length;

      return {
        completed,
        total,
        percentage,
        beginner: { completed: beginnerCompleted, total: 12 },
        intermediate: { completed: intermediateCompleted, total: 15 },
        advanced: { completed: advancedCompleted, total: 15 },
        data: progress
      };
    } catch (e) {
      return { completed: 0, total: 42, percentage: 0 };
    }
  }

  // Learning streak tracker
  function updateStreak() {
    try {
      const today = new Date().toDateString();
      const streakData = JSON.parse(localStorage.getItem('sp_learning_streak') || '{"current": 0, "best": 0, "lastDate": null}');

      if (streakData.lastDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (streakData.lastDate === yesterday) {
          // Continuing streak
          streakData.current++;
        } else if (streakData.lastDate === null || streakData.lastDate < yesterday) {
          // New streak or broken streak
          streakData.current = 1;
        }

        streakData.lastDate = today;
        streakData.best = Math.max(streakData.best, streakData.current);
        localStorage.setItem('sp_learning_streak', JSON.stringify(streakData));
      }

      return streakData;
    } catch (e) {
      return { current: 0, best: 0, lastDate: null };
    }
  }

  // Get next recommended lesson
  function getNextLesson(progress) {
    for (let i = 1; i <= 42; i++) {
      const key = `lesson-${i}`;
      if (!progress.data[key] || !progress.data[key].completed) {
        let tier = 'beginner';
        let tierNum = i;
        if (i >= 28) { tier = 'advanced'; tierNum = i; }
        else if (i >= 13) { tier = 'intermediate'; tierNum = i; }

        return { number: i, tier, tierNum };
      }
    }
    return null; // All completed!
  }

  // ========== PHASE 2: QUICK ACTIONS ==========

  // Navigate to next lesson (using accurate file mapping)
  function navigateToNextLesson() {
    const progress = getUserProgress();
    const next = getNextLesson(progress);

    if (!next) {
      return "You've completed all 42 lessons! 🎓";
    }

    const lessonUrl = lessonFiles[next.number];
    if (lessonUrl) {
      window.location.href = lessonUrl;
      return `Taking you to Lesson #${next.number}... 🚀`;
    } else {
      return `Lesson #${next.number} URL not found. Please navigate manually.`;
    }
  }

  // Scroll to quiz section
  function scrollToQuiz() {
    const quizSection = document.querySelector('.quiz-section, #quiz, [class*="quiz"]');
    if (quizSection) {
      quizSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return "Scrolling to the quiz section... 📝";
    }
    return "I don't see a quiz section on this page. Make sure you're on a lesson page!";
  }

  // Scroll to key takeaways
  function scrollToTakeaways() {
    // Try class selector first (most common - note: singular "key-takeaway")
    let takeaways = document.querySelector('.key-takeaway, #key-takeaways');

    // If not found, search for headings containing "Key Takeaway"
    if (!takeaways) {
      const headings = document.querySelectorAll('h2, h3, h4');
      for (const heading of headings) {
        if (heading.textContent.match(/key\s+takeaway/i)) {
          takeaways = heading;
          break;
        }
      }
    }

    if (takeaways) {
      takeaways.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return "Scrolling to Key Takeaways... 📌";
    }
    return "I don't see a Key Takeaways section on this page. Try scrolling down manually to find it!";
  }

  // Toggle notes panel
  function openNotes() {
    const notesToggle = document.querySelector('[data-notes-toggle], .notes-toggle, #notesToggle');
    if (notesToggle) {
      notesToggle.click();
      return "Opening notes panel... 📝";
    }
    return "Notes feature not available on this page. Try opening a lesson!";
  }

  // Bookmark management
  function saveBookmark(message, response) {
    try {
      const bookmarks = JSON.parse(localStorage.getItem('sp_chatbot_bookmarks') || '[]');
      bookmarks.push({
        timestamp: Date.now(),
        question: message,
        answer: response,
        date: new Date().toLocaleDateString()
      });
      // Keep last 20 bookmarks
      if (bookmarks.length > 20) bookmarks.shift();
      localStorage.setItem('sp_chatbot_bookmarks', JSON.stringify(bookmarks));
      return true;
    } catch (e) {
      return false;
    }
  }

  function getBookmarks() {
    try {
      return JSON.parse(localStorage.getItem('sp_chatbot_bookmarks') || '[]');
    } catch (e) {
      return [];
    }
  }

  // ========== PHASE 3: STUDY TIMER ==========

  let studyTimer = null;
  let studyStartTime = null;

  function startStudyTimer(minutes = 25) {
    if (studyTimer) {
      return `Timer already running! ${getRemainingTime()} remaining.`;
    }

    studyStartTime = Date.now();
    const duration = minutes * 60 * 1000;

    studyTimer = setTimeout(() => {
      studyTimer = null;
      studyStartTime = null;
      // Could show a notification here
      console.log('Study session complete!');
    }, duration);

    return `⏱️ <strong>${minutes}-minute study session started!</strong><br><br>Focus on your lesson. I'll let you know when time's up.<br><br>💡 <em>Tip: Use the Pomodoro technique - 25min work, 5min break!</em>`;
  }

  function getRemainingTime() {
    if (!studyTimer || !studyStartTime) return null;

    const elapsed = Date.now() - studyStartTime;
    const remaining = Math.max(0, Math.ceil((25 * 60 * 1000 - elapsed) / 60000));
    return `${remaining} minute${remaining !== 1 ? 's' : ''}`;
  }

  function stopStudyTimer() {
    if (!studyTimer) {
      return `No timer running. Start one with "start study timer"!`;
    }

    const elapsed = Math.floor((Date.now() - studyStartTime) / 60000);
    clearTimeout(studyTimer);
    studyTimer = null;
    studyStartTime = null;

    return `⏱️ Timer stopped! You studied for ${elapsed} minute${elapsed !== 1 ? 's' : ''}. Great work! 🎉`;
  }

  // ========== PHASE 3: SMART SEARCH ==========

  function searchLessons(query) {
    const results = [];

    // Search in knowledge base
    const lowerQuery = query.toLowerCase();

    // Check indicator keywords (ALL 7 INDICATORS - CORRECT v10 URLs!)
    if (lowerQuery.includes('janus')) results.push({ type: 'indicator', name: 'Janus Atlas', lesson: 20, docs: 'https://docs.signalpilot.io/janus-atlas-v10/' });
    if (lowerQuery.includes('plutus')) results.push({ type: 'indicator', name: 'Plutus Flow', lesson: 21, docs: 'https://docs.signalpilot.io/plutus-flow-v10/' });
    if (lowerQuery.includes('minimal')) results.push({ type: 'indicator', name: 'Volume Oracle', lesson: 22, docs: 'https://docs.signalpilot.io/minimal-flow-v10/' });
    if (lowerQuery.includes('pentarch')) results.push({ type: 'indicator', name: 'Pentarch', external: 'https://docs.signalpilot.io/pentarch-v10/', note: 'Reversal Events System' });
    if (lowerQuery.includes('omnideck')) results.push({ type: 'indicator', name: 'Omnideck', external: 'https://docs.signalpilot.io/omnideck-v10/', note: 'Everything Indicator Dashboard' });
    if (lowerQuery.includes('augury') || lowerQuery.includes('grid')) results.push({ type: 'indicator', name: 'Augury Grid', external: 'https://docs.signalpilot.io/augury-grid-v10/', note: 'Multi-Symbol Screener' });
    if (lowerQuery.includes('harmonic') || lowerQuery.includes('oscillator')) results.push({ type: 'indicator', name: 'Harmonic Oscillator', external: 'https://docs.signalpilot.io/harmonic-oscillator-v10/', note: 'Composite Momentum' });

    // Check concept keywords
    if (lowerQuery.includes('order') && lowerQuery.includes('flow')) results.push({ type: 'concept', name: 'Order Flow', lessons: [2, 3] });
    if (lowerQuery.includes('liquidity')) results.push({ type: 'concept', name: 'Liquidity Engineering', lesson: 1 });
    if (lowerQuery.includes('repaint')) results.push({ type: 'concept', name: 'Repainting', lesson: 4 });
    if (lowerQuery.includes('dark') && lowerQuery.includes('pool')) results.push({ type: 'concept', name: 'Dark Pools', lesson: 17 });
    if (lowerQuery.includes('footprint')) results.push({ type: 'concept', name: 'Footprint Charts', lesson: 16 });
    if (lowerQuery.includes('regime')) results.push({ type: 'concept', name: 'Market Regimes', lesson: 22 });

    if (results.length === 0) {
      return `No results found for "${query}". Try searching for:<br><br><strong>Indicators:</strong> Janus, Plutus, Minimal, Pentarch, Omnideck, Augury, Harmonic<br><strong>Concepts:</strong> order flow, liquidity, dark pools, regime<br><br>🔍 <a href='/search.html'>Use full search →</a>`;
    }

    let msg = `🔍 <strong>Search Results for "${query}"</strong><br><br>`;
    results.forEach(r => {
      if (r.external) {
        msg += `📚 <a href='${r.external}' target='_blank'>${r.name} Documentation</a> - ${r.note}<br>`;
      } else if (r.lessons) {
        r.lessons.forEach(num => {
          msg += `📖 <a href='${lessonFiles[num]}'>${r.name} - Lesson #${num}</a><br>`;
        });
      } else if (r.docs && r.lesson) {
        // Indicator with both docs and lesson
        msg += `📚 <a href='${r.docs}' target='_blank'>${r.name} Documentation</a><br>`;
        msg += `📖 <a href='${lessonFiles[r.lesson]}'>${r.name} - Lesson #${r.lesson}</a><br>`;
      } else if (r.lesson) {
        msg += `📖 <a href='${lessonFiles[r.lesson]}'>${r.name} - Lesson #${r.lesson}</a><br>`;
      }
    });
    msg += `<br>🔍 <a href='/search.html'>Advanced search →</a>`;

    return msg;
  }

  // Knowledge base for the chatbot
  const knowledgeBase = {
    greeting: [
      "Hi! I'm the Signal Pilot Learning Assistant. I can help you navigate the curriculum, answer questions about lessons, and guide your learning journey. What would you like to know?",
      "Hello! Welcome to Signal Pilot Education. I'm here to help you master institutional trading. Ask me anything about the lessons!",
      "Hey there! Ready to learn how markets really work? I can guide you through our 42-lesson curriculum. What interests you?"
    ],

    curriculum: {
      beginner: "The Beginner tier has 12 lessons covering fundamental concepts like liquidity engineering, order flow, indicator truth, and risk management. It's designed to unlearn retail myths and build a professional foundation.<br><br>📖 <a href='/beginner.html'>View Beginner Curriculum →</a><br>🚀 <a href='/curriculum/beginner/01-the-liquidity-lie.html'>Start with Lesson #1 →</a>",
      intermediate: "The Intermediate tier contains 15 lessons on market microstructure, advanced order flow, Signal Pilot indicators (Janus Atlas, Plutus Flow, Volume Oracle), and professional frameworks. Complete the Beginner tier first!<br><br>📖 <a href='/intermediate.html'>View Intermediate Curriculum →</a><br>🚀 <a href='/curriculum/intermediate/13-bid-ask-spread-dynamics.html'>Start with Lesson #13 →</a>",
      advanced: "The Advanced tier has 15 lessons covering institutional order flow, machine learning, trading automation, and professional infrastructure. This is for traders ready to think probabilistically. Prerequisites: Complete Beginner and Intermediate tiers.<br><br>📖 <a href='/advanced.html'>View Advanced Curriculum →</a><br>🚀 <a href='/curriculum/advanced/28-institutional-order-flow.html'>Start with Lesson #28 →</a>"
    },

    indicators: {
      janus: "Janus Atlas is our levels system that detects liquidity sweeps and key price levels. It shows when price and flow don't agree.<br><br>📚 <a href='https://docs.signalpilot.io/janus-atlas-v10/' target='_blank' rel='noopener'>View Janus Atlas Documentation →</a><br>📖 <a href='/curriculum/intermediate/20-janus-atlas-advanced.html'>Read Lesson #20: Janus Atlas Advanced →</a>",
      plutus: "Plutus Flow is our advanced OBV indicator that tracks cumulative delta and absorption patterns. Essential for understanding institutional accumulation.<br><br>📚 <a href='https://docs.signalpilot.io/plutus-flow-v10/' target='_blank' rel='noopener'>View Plutus Flow Documentation →</a><br>📖 <a href='/curriculum/intermediate/21-plutus-flow-mastery.html'>Read Lesson #21: Plutus Flow Mastery →</a>",
      minimal: "Volume Oracle is our volume strategy and regime detection system. It identifies market conditions and structure.<br><br>📚 <a href='https://docs.signalpilot.io/minimal-flow-v10/' target='_blank' rel='noopener'>View Volume Oracle Documentation →</a><br>📖 <a href='/curriculum/intermediate/22-minimal-flow-regimes.html'>Read Lesson #22: Volume Oracle Regimes →</a>",
      pentarch: "Pentarch is our reversal events system with 5 event signals (TD, IGN, CAP, WRN, BDN) plus 3 supporting components. It shows where you are in the market cycle.<br><br>📚 <a href='https://docs.signalpilot.io/pentarch-v10/' target='_blank' rel='noopener'>View Pentarch Documentation →</a><br>💡 <em>Note: Pentarch is covered in the official documentation. Check lessons on regime detection and market cycles!</em>",
      omnideck: "Omnideck is our 'Everything Indicator' - a comprehensive dashboard that displays all Signal Pilot indicators across multiple timeframes in one view.<br><br>📚 <a href='https://docs.signalpilot.io/omnideck-v10/' target='_blank' rel='noopener'>View Omnideck Documentation →</a><br>💡 <em>Perfect for multi-timeframe analysis and getting the complete market picture!</em>",
      augury: "Augury Grid is our multi-symbol screener that monitors multiple assets simultaneously. It helps you spot opportunities across your watchlist.<br><br>📚 <a href='https://docs.signalpilot.io/augury-grid-v10/' target='_blank' rel='noopener'>View Augury Grid Documentation →</a><br>💡 <em>Ideal for scanning multiple markets and finding the best setups!</em>",
      harmonic: "Harmonic Oscillator is our composite momentum indicator that combines multiple momentum signals for timing entries and exits.<br><br>📚 <a href='https://docs.signalpilot.io/harmonic-oscillator-v10/' target='_blank' rel='noopener'>View Harmonic Oscillator Documentation →</a><br>💡 <em>Use for precise timing and momentum confirmation!</em>"
    },

    concepts: {
      orderflow: "Order flow is the study of real buying and selling pressure. Unlike price action, it shows you ACTUAL transactions.<br><br>📖 <a href='/curriculum/beginner/03-price-action-is-dead.html'>Read Lesson #3: Price Action is Dead →</a><br>📖 <a href='/curriculum/beginner/02-volume-doesnt-lie.html'>Read Lesson #2: Volume Doesn't Lie →</a>",
      liquidity: "Liquidity engineering is how institutions manipulate price to trigger stops and hunt orders.<br><br>📖 <a href='/curriculum/beginner/01-the-liquidity-lie.html'>Read Lesson #1: The Liquidity Lie →</a>",
      repainting: "60-90% of indicators repaint (change historical values). Signal Pilot indicators NEVER repaint.<br><br>📖 <a href='/curriculum/beginner/04-repaint-problem.html'>Read Lesson #4: The Repaint Problem →</a>",
      regime: "Market regimes are different market conditions (trending, ranging, volatile, calm). Trade the regime, not just the signal!<br><br>📖 <a href='/curriculum/intermediate/22-minimal-flow-regimes.html'>Read Lesson #22: Volume Oracle Regimes →</a>",
      darkpool: "Dark pools are private exchanges where institutions trade without moving the market.<br><br>📖 <a href='/curriculum/intermediate/17-dark-pools.html'>Read Lesson #17: Dark Pools →</a>",
      footprint: "Footprint charts show volume at each price level, revealing where buyers and sellers actually transacted.<br><br>📖 <a href='/curriculum/intermediate/16-footprint-charts.html'>Read Lesson #16: Footprint Charts →</a>"
    },

    help: {
      start: "Start with the Beginner tier! Begin with Lesson #1: 'The Liquidity Lie'. Complete lessons in order for best results.<br><br>🚀 <a href='/beginner.html'>View Beginner Curriculum →</a><br>📖 <a href='/curriculum/beginner/01-the-liquidity-lie.html'>Start Learning Now →</a>",
      study: "Study tip: Complete one lesson per day. Take the quiz at the end. Make notes on key concepts. Review previous lessons before moving to the next tier.<br><br>📥 <a href='/resources.html'>Download Study Resources →</a>",
      stuck: "Feeling stuck? Re-read the lesson, try the quiz again, and check the 'Key Takeaways' section. Remember: institutional thinking takes time to develop.<br><br>💬 Need help? Join our community for support!",
      time: "Each lesson takes 15-25 minutes to read. Plan 30-40 minutes including the quiz. The full curriculum is about 30-40 hours total.<br><br>📖 <a href='/'>See All 42 Lessons →</a>"
    },

    links: {
      docs: "📚 <strong>Signal Pilot Documentation</strong><br><br>Browse the full documentation for all indicators and features.<br><br>📚 <a href='https://docs.signalpilot.io/' target='_blank' rel='noopener'>View Documentation →</a>",
      pricing: "💰 <strong>Signal Pilot Pricing</strong><br><br>View our plans and get started with Signal Pilot indicators.<br><br>💳 <a href='https://signalpilot.io/#pricing' target='_blank' rel='noopener'>View Pricing Plans →</a>",
      resources: "📥 <strong>Free Resources</strong><br><br>Downloadable checklists, templates, and frameworks to accelerate your learning.<br><br>📥 <a href='/resources.html'>Browse All Resources →</a>",
      search: "🔍 <strong>Search Lessons</strong><br><br>Find lessons by topic, concept, or keyword across all 42 lessons.<br><br>🔍 <a href='/search.html'>Search Now →</a>"
    }
  };

  // Pattern matching for responses
  const patterns = [
    // Greetings
    { regex: /^(hi|hello|hey|greetings)/i, response: 'greeting' },

    // ===== PHASE 1: CONTEXT-AWARE RESPONSES =====

    // Progress queries (enhanced with actual data)
    { regex: /(my.?progress|how.?am.?i.?doing|show.?progress|progress.?report)/i, response: () => {
      const progress = getUserProgress();
      const streak = updateStreak();

      let msg = `📊 <strong>Your Learning Progress</strong><br><br>`;
      msg += `🎯 Overall: ${progress.completed}/${progress.total} lessons (${progress.percentage}%)<br>`;
      msg += `📚 Beginner: ${progress.beginner.completed}/${progress.beginner.total}<br>`;
      msg += `📚 Intermediate: ${progress.intermediate.completed}/${progress.intermediate.total}<br>`;
      msg += `📚 Advanced: ${progress.advanced.completed}/${progress.advanced.total}<br><br>`;

      if (streak.current > 0) {
        msg += `🔥 Current streak: ${streak.current} day${streak.current > 1 ? 's' : ''}!<br>`;
        msg += `🏆 Best streak: ${streak.best} day${streak.best > 1 ? 's' : ''}<br><br>`;
      }

      const next = getNextLesson(progress);
      if (next) {
        const lessonUrl = lessonFiles[next.number];
        msg += `➡️ <strong>Up next:</strong> <a href='${lessonUrl}'>Lesson #${next.number}</a>`;
      } else {
        msg += `🎓 <strong>Congratulations!</strong> You've completed all 42 lessons!`;
      }

      return msg;
    }},

    // Streak queries
    { regex: /(streak|consecutive|daily|habit)/i, response: () => {
      const streak = updateStreak();
      let msg = `🔥 <strong>Learning Streak</strong><br><br>`;

      if (streak.current === 0) {
        msg += `You haven't started a learning streak yet. Complete a lesson today to start your streak!<br><br>`;
        msg += `💡 <strong>Tip:</strong> Learning consistently (even 20 minutes daily) is more effective than cramming!`;
      } else if (streak.current === 1) {
        msg += `Current streak: 1 day 🌱<br>`;
        msg += `Come back tomorrow to keep it growing!<br><br>`;
        msg += `Your best streak: ${streak.best} day${streak.best > 1 ? 's' : ''}`;
      } else if (streak.current >= 7) {
        msg += `🎉 Amazing! ${streak.current}-day streak!<br>`;
        msg += `You're building a solid learning habit!<br><br>`;
        msg += `🏆 Best streak: ${streak.best} day${streak.best > 1 ? 's' : ''}`;
      } else {
        msg += `Current streak: ${streak.current} days 🔥<br>`;
        msg += `Keep going! Consistency is key.<br><br>`;
        msg += `🏆 Best streak: ${streak.best} day${streak.best > 1 ? 's' : ''}`;
      }

      return msg;
    }},

    // Next lesson query
    { regex: /(next.?lesson|what.?next|where.?should.?i.?go|recommend)/i, response: () => {
      const progress = getUserProgress();
      const next = getNextLesson(progress);

      if (!next) {
        return `🎓 You've completed all 42 lessons! Time to apply your knowledge to live trading. Consider reviewing lessons or exploring our advanced resources.`;
      }

      const tierName = next.tier.charAt(0).toUpperCase() + next.tier.slice(1);
      const lessonUrl = lessonFiles[next.number];
      return `➡️ <strong>Next up: Lesson #${next.number}</strong><br><br>This is in the ${tierName} tier. Ready to continue?<br><br>📖 <a href='${lessonUrl}'>Start Lesson #${next.number} →</a>`;
    }},

    // Current lesson help (context-aware)
    { regex: /(this.?lesson|current.?lesson|help.?with.?this)/i, response: () => {
      const currentLesson = getCurrentLesson();
      if (!currentLesson) {
        return `You're not currently on a lesson page. Need help finding a specific lesson? Try asking "What's my next lesson?" or browse the curriculum pages.`;
      }

      return `📖 <strong>You're on Lesson #${currentLesson.number}: ${currentLesson.title}</strong><br><br>Need help with this lesson? I can:<br>• Explain key concepts<br>• Point you to related lessons<br>• Give quiz hints<br>• Suggest study tips<br><br>What would you like to know?`;
    }},

    // ===== PHASE 2: QUICK ACTIONS =====

    // Navigate actions
    { regex: /(take.?me.?to.?next|go.?to.?next|next.?lesson.?please|start.?next)/i, response: () => navigateToNextLesson() },

    // Scroll actions
    { regex: /(start.?quiz|take.?quiz|quiz.?time|show.?quiz)/i, response: () => scrollToQuiz() },
    { regex: /(key.?takeaways|show.?takeaways|takeaways|summary)/i, response: () => scrollToTakeaways() },

    // Panel actions
    { regex: /(open.?notes|show.?notes|notes.?panel)/i, response: () => openNotes() },

    // ===== PHASE 3: STUDY TIMER =====

    // Timer actions
    { regex: /(start.?(study.?)?timer|start.?pomodoro|set.?timer)/i, response: (match) => {
      // Check for custom duration
      const customMatch = match.input.match(/(\d+).?min/i);
      const minutes = customMatch ? parseInt(customMatch[1]) : 25;
      return startStudyTimer(Math.min(minutes, 60)); // Max 60 min
    }},

    { regex: /(stop.?timer|end.?timer|cancel.?timer|timer.?off)/i, response: () => stopStudyTimer() },

    { regex: /(check.?timer|timer.?status|time.?remaining|how.?much.?time)/i, response: () => {
      const remaining = getRemainingTime();
      if (!remaining) {
        return `⏱️ No timer running. Start one with "start study timer"!<br><br>💡 Pomodoro technique: 25min focus, 5min break, repeat 4x, then 15-30min break!`;
      }
      return `⏱️ <strong>${remaining} remaining</strong> in your study session. Stay focused! 💪`;
    }},

    // ===== PHASE 3: SMART SEARCH =====

    // Search query pattern
    { regex: /search.?(for)?[\s:]+([\w\s]+)/i, response: (match) => {
      const query = match[2] || match[1];
      return searchLessons(query);
    }},

    // Bookmark actions
    { regex: /(show.?bookmarks|my.?bookmarks|saved.?responses)/i, response: () => {
      const bookmarks = getBookmarks();
      if (bookmarks.length === 0) {
        return `📚 You don't have any bookmarks yet!<br><br>When you get a helpful response, type "bookmark this" to save it for later.`;
      }

      let msg = `📚 <strong>Your Bookmarks</strong> (${bookmarks.length})<br><br>`;
      bookmarks.slice(-5).reverse().forEach((bm, i) => {
        msg += `<strong>${bm.date}</strong>: ${bm.question}<br>`;
      });
      msg += `<br>💡 Type "bookmark this" after any helpful response to save it!`;
      return msg;
    }},

    { regex: /(bookmark.?this|save.?this|remember.?this)/i, response: () => {
      return `To bookmark a response, I'll need to save the last helpful answer. Try asking a question first, then say "bookmark this"!<br><br>📌 <em>(Bookmark feature will save your last conversation)</em>`;
    }},

    // Quiz help system
    { regex: /(quiz.?hint|give.?hint|help.?quiz|stuck.?quiz)/i, response: () => {
      const currentLesson = getCurrentLesson();
      if (!currentLesson) {
        return `I can help with quiz questions, but you need to be on a lesson page first!<br><br>💡 <strong>Tip:</strong> Read the lesson carefully before taking the quiz. The answers are all in the content!`;
      }

      return `💡 <strong>Quiz Help</strong><br><br>Here's how to approach quizzes:<br><br>1️⃣ <strong>Read carefully:</strong> Questions test concepts from the lesson<br>2️⃣ <strong>Eliminate wrong answers:</strong> Often 2 answers are obviously wrong<br>3️⃣ <strong>Re-read the section:</strong> If stuck, go back to the relevant part<br>4️⃣ <strong>Think practically:</strong> How would this apply to real trading?<br><br>Stuck on a specific concept? Ask me to explain it!`;
    }},

    // Motivational responses
    { regex: /(struggling|frustrated|giving.?up|too.?hard|can't.?do)/i, response: () => {
      const progress = getUserProgress();
      const streak = updateStreak();

      let msg = `💪 <strong>You've got this!</strong><br><br>`;

      if (progress.completed > 0) {
        msg += `You've already completed ${progress.completed} lesson${progress.completed > 1 ? 's' : ''}! That's real progress. 📈<br><br>`;
      }

      if (streak.current > 1) {
        msg += `You're on a ${streak.current}-day streak! That kind of consistency will pay off. 🔥<br><br>`;
      }

      msg += `Remember:<br>`;
      msg += `• Institutional thinking takes time to develop<br>`;
      msg += `• Confusion means you're learning something new<br>`;
      msg += `• Every expert was once a beginner<br><br>`;
      msg += `Take a break if needed, then come back fresh. You're building skills that 95% of traders don't have! 🚀`;

      return msg;
    }},

    { regex: /(encourage|motivation|keep.?going)/i, response: () => {
      const progress = getUserProgress();

      const encouragements = [
        `💎 You're learning what institutions don't want retail traders to know!`,
        `🎯 Every lesson completed is a step closer to trading like a professional.`,
        `🔥 Consistency beats intensity. Keep showing up!`,
        `📊 The concepts you're learning now will compound over time.`,
        `🚀 You're on a journey that most traders never take. That's powerful!`
      ];

      let msg = encouragements[Math.floor(Math.random() * encouragements.length)];

      if (progress.percentage >= 50) {
        msg += `<br><br>You're over halfway there (${progress.percentage}%)! The finish line is in sight! 🏁`;
      } else if (progress.completed > 0) {
        msg += `<br><br>You've completed ${progress.completed} lessons. Each one makes you sharper! 📈`;
      }

      return msg;
    }},

    // Indicator questions (ALL 7 INDICATORS - check BEFORE general docs)
    { regex: /janus/i, response: () => knowledgeBase.indicators.janus },
    { regex: /plutus/i, response: () => knowledgeBase.indicators.plutus },
    { regex: /minimal/i, response: () => knowledgeBase.indicators.minimal },
    { regex: /pentarch/i, response: () => knowledgeBase.indicators.pentarch },
    { regex: /omnideck/i, response: () => knowledgeBase.indicators.omnideck },
    { regex: /(augury|grid)/i, response: () => knowledgeBase.indicators.augury },
    { regex: /(harmonic|oscillator)/i, response: () => knowledgeBase.indicators.harmonic },

    // General links and documentation
    { regex: /(docs|documentation|manual|guide|link|url|website)/i, response: () => knowledgeBase.links.docs },
    { regex: /(pricing|price|cost|subscription|plan|buy|purchase)/i, response: () => knowledgeBase.links.pricing },
    { regex: /(resource|download|template|checklist|framework)/i, response: () => knowledgeBase.links.resources },
    { regex: /(search|find|lookup)/i, response: () => knowledgeBase.links.search },

    // Curriculum questions
    { regex: /(beginner|start|first|new)/i, response: () => knowledgeBase.curriculum.beginner },
    { regex: /intermediate/i, response: () => knowledgeBase.curriculum.intermediate },
    { regex: /advanced/i, response: () => knowledgeBase.curriculum.advanced },

    // Concept questions
    { regex: /(order.?flow|buying.?pressure|selling.?pressure)/i, response: () => knowledgeBase.concepts.orderflow },
    { regex: /(liquidity|stop.?hunt|sweep)/i, response: () => knowledgeBase.concepts.liquidity },
    { regex: /(repaint|repainting)/i, response: () => knowledgeBase.concepts.repainting },
    { regex: /(regime|condition|trend|range)/i, response: () => knowledgeBase.concepts.regime },
    { regex: /dark.?pool/i, response: () => knowledgeBase.concepts.darkpool },
    { regex: /footprint/i, response: () => knowledgeBase.concepts.footprint },

    // Help questions
    { regex: /(where.?(start|begin)|how.?start)/i, response: () => knowledgeBase.help.start },
    { regex: /(how.?study|study.?tip|best.?way)/i, response: () => knowledgeBase.help.study },
    { regex: /(stuck|difficult|hard|confused)/i, response: () => knowledgeBase.help.stuck },
    { regex: /(how.?long|time|duration)/i, response: () => knowledgeBase.help.time },

    // Lesson navigation
    { regex: /lesson.?(\d+)/i, response: (match) => {
      const num = parseInt(match[1]);
      if (num >= 1 && num <= 12) return `Lesson #${num} is in the Beginner tier. Check the curriculum page to access it!`;
      if (num >= 13 && num <= 27) return `Lesson #${num} is in the Intermediate tier. Make sure you've completed the Beginner tier first!`;
      if (num >= 28 && num <= 42) return `Lesson #${num} is in the Advanced tier. Complete Beginner and Intermediate tiers before attempting!`;
      return "We have 42 lessons total. Which tier are you interested in: Beginner, Intermediate, or Advanced?";
    }},

    // Quiz questions
    { regex: /(quiz|test|assessment)/i, response: () => "Each lesson has a quiz at the end to test your understanding. You need to pass to mark the lesson as complete. Pro tip: Take notes while reading!" }
  ];

  // Dynamic suggestions based on context (PHASE 2: Enhanced with actions)
  function getDynamicSuggestions() {
    const currentLesson = getCurrentLesson();
    const progress = getUserProgress();

    if (currentLesson) {
      // On a lesson page - show lesson-specific ACTION suggestions
      return [
        "Start quiz",
        "Show takeaways",
        "Open notes",
        "Quiz hint",
        "Take me to next",
        "What's my progress?"
      ];
    } else if (progress.completed === 0) {
      // New user - show getting started suggestions
      return [
        "Where should I start?",
        "What is Pentarch?",
        "What's order flow?",
        "Show me the docs",
        "How much does it cost?",
        "Free resources"
      ];
    } else if (progress.completed > 0 && progress.percentage < 100) {
      // Returning user - show progress-focused suggestions with actions
      return [
        "Take me to next",
        "What's my progress?",
        "My learning streak",
        "Show bookmarks",
        "Keep going",
        "Free resources"
      ];
    } else {
      // Completed all lessons!
      return [
        "What's my progress?",
        "My learning streak",
        "Show bookmarks",
        "What is Pentarch?",
        "Show me the docs",
        "Free resources"
      ];
    }
  }

  // Create chatbot UI
  function createChatbot() {
    // Chatbot button
    const button = document.createElement('button');
    button.className = 'chatbot-button';
    button.setAttribute('aria-label', 'Open AI assistant');
    button.innerHTML = '🤖';

    // Chatbot container
    const container = document.createElement('div');
    container.className = 'chatbot-container';
    container.innerHTML = `
      <div class="chatbot-header">
        <h3>🤖 Learning Assistant</h3>
        <button class="chatbot-close" aria-label="Close">&times;</button>
      </div>
      <div class="chatbot-messages" id="chatbot-messages"></div>
      <div class="chatbot-suggestions" id="chatbot-suggestions"></div>
      <div class="chatbot-input-area">
        <input type="text" class="chatbot-input" id="chatbot-input" placeholder="Ask me anything about the lessons..." />
        <button class="chatbot-send" id="chatbot-send">Send</button>
      </div>
    `;

    document.body.appendChild(button);
    document.body.appendChild(container);

    return { button, container };
  }

  // Add message to chat
  function addMessage(text, isUser = false) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;

    messageDiv.innerHTML = `
      <div class="chatbot-avatar">${isUser ? '👤' : '🤖'}</div>
      <div class="chatbot-bubble">${text}</div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Show typing indicator
  function showTyping() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot typing-indicator';
    typingDiv.innerHTML = `
      <div class="chatbot-avatar">🤖</div>
      <div class="chatbot-typing">
        <span></span><span></span><span></span>
      </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return typingDiv;
  }

  // Remove typing indicator
  function hideTyping() {
    const typing = document.querySelector('.typing-indicator');
    if (typing) typing.remove();
  }

  // Get bot response
  function getBotResponse(userMessage) {
    // Check patterns
    for (const pattern of patterns) {
      const match = userMessage.match(pattern.regex);
      if (match) {
        if (typeof pattern.response === 'function') {
          return pattern.response(match);
        } else if (pattern.response === 'greeting') {
          return knowledgeBase.greeting[Math.floor(Math.random() * knowledgeBase.greeting.length)];
        }
        return pattern.response;
      }
    }

    // Default response
    return "I'm not sure about that specific question. Try asking about:<br><br>• The curriculum (Beginner, Intermediate, Advanced)<br>• Indicators (Janus, Plutus, Minimal, Pentarch, Omnideck, Augury, Harmonic)<br>• Concepts (order flow, liquidity, dark pools, regime)<br>• How to get started<br><br>Or pick a suggestion below!";
  }

  // Create suggestion chips (context-aware)
  function createSuggestions() {
    const container = document.getElementById('chatbot-suggestions');
    container.innerHTML = '';

    const suggestions = getDynamicSuggestions();
    suggestions.forEach(text => {
      const chip = document.createElement('button');
      chip.className = 'chatbot-suggestion';
      chip.textContent = text;
      chip.addEventListener('click', () => {
        handleUserMessage(text);
      });
      container.appendChild(chip);
    });
  }

  // Handle user message
  function handleUserMessage(message) {
    if (!message.trim()) return;

    // Clear input
    const input = document.getElementById('chatbot-input');
    if (input) input.value = '';

    // Hide suggestions
    const suggestionsContainer = document.getElementById('chatbot-suggestions');
    suggestionsContainer.style.display = 'none';

    // Add user message
    addMessage(message, true);

    // Show typing
    const typing = showTyping();

    // Simulate AI thinking delay
    setTimeout(() => {
      hideTyping();
      const response = getBotResponse(message);
      addMessage(response);

      // Save conversation to localStorage
      saveConversation(message, response);
    }, 800 + Math.random() * 400);
  }

  // Save conversation history
  function saveConversation(userMsg, botMsg) {
    const history = JSON.parse(localStorage.getItem('sp_chatbot_history') || '[]');
    history.push({
      timestamp: Date.now(),
      user: userMsg,
      bot: botMsg
    });
    // Keep last 20 messages
    if (history.length > 20) history.shift();
    localStorage.setItem('sp_chatbot_history', JSON.stringify(history));
  }

  // Load conversation history
  function loadConversation() {
    const history = JSON.parse(localStorage.getItem('sp_chatbot_history') || '[]');
    history.forEach(msg => {
      addMessage(msg.user, true);
      addMessage(msg.bot, false);
    });
  }

  // Get context-aware greeting
  function getContextGreeting() {
    const currentLesson = getCurrentLesson();
    const progress = getUserProgress();
    const streak = updateStreak();

    let greeting = knowledgeBase.greeting[Math.floor(Math.random() * knowledgeBase.greeting.length)];

    // Add context
    if (currentLesson) {
      greeting += `<br><br>📖 I see you're on <strong>Lesson #${currentLesson.number}: ${currentLesson.title}</strong>. Need help with this lesson?`;
    } else if (progress.completed > 0) {
      greeting += `<br><br>📊 You've completed ${progress.completed}/${progress.total} lessons (${progress.percentage}%)!`;

      if (streak.current > 0) {
        greeting += ` 🔥 ${streak.current}-day streak!`;
      }

      const next = getNextLesson(progress);
      if (next) {
        greeting += `<br>➡️ Ready for Lesson #${next.number}?`;
      }
    }

    return greeting;
  }

  // Initialize chatbot
  function init() {
    const { button, container } = createChatbot();
    const closeBtn = container.querySelector('.chatbot-close');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');

    // ===== PHASE 1: KEYBOARD SHORTCUTS =====

    // Global keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K to open chatbot
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (!container.classList.contains('active')) {
          button.click();
        } else {
          input.focus();
        }
      }

      // Escape to close chatbot
      if (e.key === 'Escape' && container.classList.contains('active')) {
        container.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle chatbot
    button.addEventListener('click', () => {
      const isActive = container.classList.toggle('active');
      button.setAttribute('aria-expanded', isActive);

      if (isActive) {
        // First time opening - show context-aware welcome
        const messages = document.getElementById('chatbot-messages');
        if (messages.children.length === 0) {
          addMessage(getContextGreeting());
          createSuggestions();
        }
        input.focus();
      }
    });

    // Close chatbot
    closeBtn.addEventListener('click', () => {
      container.classList.remove('active');
      button.setAttribute('aria-expanded', 'false');
    });

    // Send message
    sendBtn.addEventListener('click', () => {
      handleUserMessage(input.value);
    });

    // Enter key to send
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleUserMessage(input.value);
      }
    });

    // Update streak on page load (track daily activity)
    updateStreak();

    // Load previous conversation
    // loadConversation(); // Commented out - start fresh each session
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
