// AI Chatbot for Signal Pilot Education
(function() {
  'use strict';

  // ========== PHASE 1: CONTEXT & PROGRESS ==========

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

  // Knowledge base for the chatbot
  const knowledgeBase = {
    greeting: [
      "Hi! I'm the Signal Pilot Learning Assistant. I can help you navigate the curriculum, answer questions about lessons, and guide your learning journey. What would you like to know?",
      "Hello! Welcome to Signal Pilot Education. I'm here to help you master institutional trading. Ask me anything about the lessons!",
      "Hey there! Ready to learn how markets really work? I can guide you through our 42-lesson curriculum. What interests you?"
    ],

    curriculum: {
      beginner: "The Beginner tier has 12 lessons covering fundamental concepts like liquidity engineering, order flow, indicator truth, and risk management. It's designed to unlearn retail myths and build a professional foundation.<br><br>📖 <a href='/beginner.html'>View Beginner Curriculum →</a><br>🚀 <a href='/curriculum/beginner/01-the-liquidity-lie.html'>Start with Lesson #1 →</a>",
      intermediate: "The Intermediate tier contains 15 lessons on market microstructure, advanced order flow, Signal Pilot indicators (Janus Atlas, Plutus Flow, Minimal Flow), and professional frameworks. Complete the Beginner tier first!<br><br>📖 <a href='/intermediate.html'>View Intermediate Curriculum →</a><br>🚀 <a href='/curriculum/intermediate/13-bid-ask-spread-dynamics.html'>Start with Lesson #13 →</a>",
      advanced: "The Advanced tier has 15 lessons covering institutional order flow, machine learning, trading automation, and professional infrastructure. This is for traders ready to think probabilistically. Prerequisites: Complete Beginner and Intermediate tiers.<br><br>📖 <a href='/advanced.html'>View Advanced Curriculum →</a><br>🚀 <a href='/curriculum/advanced/28-institutional-order-flow.html'>Start with Lesson #28 →</a>"
    },

    indicators: {
      janus: "Janus Atlas is our order flow divergence indicator. It detects when price and flow don't agree.<br><br>📚 <a href='https://docs.signalpilot.io/' target='_blank' rel='noopener'>View Documentation →</a><br>📖 <a href='/curriculum/intermediate/20-janus-atlas-advanced.html'>Read Lesson #20: Janus Atlas Advanced →</a>",
      plutus: "Plutus Flow tracks cumulative delta and absorption patterns. It's essential for understanding institutional accumulation.<br><br>📚 <a href='https://docs.signalpilot.io/' target='_blank' rel='noopener'>View Documentation →</a><br>📖 <a href='/curriculum/intermediate/21-plutus-flow-mastery.html'>Read Lesson #21: Plutus Flow Mastery →</a>",
      minimal: "Minimal Flow is our regime detection system for identifying market conditions. Perfect for context-aware trading.<br><br>📚 <a href='https://docs.signalpilot.io/' target='_blank' rel='noopener'>View Documentation →</a><br>📖 <a href='/curriculum/intermediate/22-regime-trading.html'>Read Lesson #22: Regime Trading →</a>",
      pentarch: "Pentarch is our cycle-phase detection system with 5 event signals (TD, IGN, CAP, WRN, BDN) plus 3 momentum indicators. It helps you understand where you are in the market cycle.<br><br>📚 <a href='https://docs.signalpilot.io/' target='_blank' rel='noopener'>View Documentation →</a><br>📖 <a href='/curriculum/advanced/39-pentarch-cycle-phases.html'>Read Lesson #39: Pentarch Cycle Phases →</a>"
    },

    concepts: {
      orderflow: "Order flow is the study of real buying and selling pressure. Unlike price action, it shows you ACTUAL transactions.<br><br>📖 <a href='/curriculum/beginner/03-price-action-is-dead.html'>Read Lesson #3: Price Action is Dead →</a><br>📖 <a href='/curriculum/beginner/02-volume-doesnt-lie.html'>Read Lesson #2: Volume Doesn't Lie →</a>",
      liquidity: "Liquidity engineering is how institutions manipulate price to trigger stops and hunt orders.<br><br>📖 <a href='/curriculum/beginner/01-the-liquidity-lie.html'>Read Lesson #1: The Liquidity Lie →</a>",
      repainting: "60-90% of indicators repaint (change historical values). Signal Pilot indicators NEVER repaint.<br><br>📖 <a href='/curriculum/beginner/04-the-repainting-problem.html'>Read Lesson #4: The Repainting Problem →</a>",
      regime: "Market regimes are different market conditions (trending, ranging, volatile, calm). Trade the regime, not just the signal!<br><br>📖 <a href='/curriculum/intermediate/22-regime-trading.html'>Read Lesson #22: Regime Trading →</a>",
      darkpool: "Dark pools are private exchanges where institutions trade without moving the market.<br><br>📖 <a href='/curriculum/intermediate/17-dark-pool-analysis.html'>Read Lesson #17: Dark Pool Analysis →</a>",
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
        msg += `➡️ <strong>Up next:</strong> <a href='/curriculum/${next.tier}/${String(next.number).padStart(2, '0')}-lesson.html'>Lesson #${next.number}</a>`;
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
      return `➡️ <strong>Next up: Lesson #${next.number}</strong><br><br>This is in the ${tierName} tier. Ready to continue?<br><br>📖 <a href='/curriculum/${next.tier}/${String(next.number).padStart(2, '0')}-lesson.html'>Start Lesson #${next.number} →</a>`;
    }},

    // Current lesson help (context-aware)
    { regex: /(this.?lesson|current.?lesson|help.?with.?this)/i, response: () => {
      const currentLesson = getCurrentLesson();
      if (!currentLesson) {
        return `You're not currently on a lesson page. Need help finding a specific lesson? Try asking "What's my next lesson?" or browse the curriculum pages.`;
      }

      return `📖 <strong>You're on Lesson #${currentLesson.number}: ${currentLesson.title}</strong><br><br>Need help with this lesson? I can:<br>• Explain key concepts<br>• Point you to related lessons<br>• Give quiz hints<br>• Suggest study tips<br><br>What would you like to know?`;
    }},

    // Indicator questions (check BEFORE general docs to catch "pentarch docs" etc.)
    { regex: /janus/i, response: () => knowledgeBase.indicators.janus },
    { regex: /plutus/i, response: () => knowledgeBase.indicators.plutus },
    { regex: /minimal/i, response: () => knowledgeBase.indicators.minimal },
    { regex: /pentarch/i, response: () => knowledgeBase.indicators.pentarch },

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

  // Dynamic suggestions based on context
  function getDynamicSuggestions() {
    const currentLesson = getCurrentLesson();
    const progress = getUserProgress();

    if (currentLesson) {
      // On a lesson page - show lesson-specific suggestions
      return [
        "Help with this lesson",
        "What's my progress?",
        "What's next?",
        "My learning streak",
        "Show me the docs",
        "Free resources"
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
    } else {
      // Returning user - show progress-focused suggestions
      return [
        "What's my progress?",
        "What's next?",
        "My learning streak",
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
    return "I'm not sure about that specific question. Try asking about:\n• The curriculum (Beginner, Intermediate, Advanced)\n• Indicators (Janus, Plutus, Minimal, Pentarch)\n• Concepts (order flow, liquidity, dark pools)\n• How to get started\n\nOr pick a suggestion below!";
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
