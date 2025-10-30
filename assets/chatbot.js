// AI Chatbot for Signal Pilot Education
(function() {
  'use strict';

  // Knowledge base for the chatbot
  const knowledgeBase = {
    greeting: [
      "Hi! I'm the Signal Pilot Learning Assistant. I can help you navigate the curriculum, answer questions about lessons, and guide your learning journey. What would you like to know?",
      "Hello! Welcome to Signal Pilot Education. I'm here to help you master institutional trading. Ask me anything about the lessons!",
      "Hey there! Ready to learn how markets really work? I can guide you through our 42-lesson curriculum. What interests you?"
    ],

    curriculum: {
      beginner: "The Beginner tier has 12 lessons covering fundamental concepts like liquidity engineering, order flow, indicator truth, and risk management. It's designed to unlearn retail myths and build a professional foundation. Want to know about a specific lesson?",
      intermediate: "The Intermediate tier contains 15 lessons on market microstructure, advanced order flow, Signal Pilot indicators (Janus Atlas, Plutus Flow, Minimal Flow), and professional frameworks. Complete the Beginner tier first!",
      advanced: "The Advanced tier has 15 lessons covering institutional order flow, machine learning, trading automation, and professional infrastructure. This is for traders ready to think probabilistically. Prerequisites: Complete Beginner and Intermediate tiers."
    },

    indicators: {
      janus: "Janus Atlas is our order flow divergence indicator. It detects when price and flow don't agree. Lesson #20 covers it in detail: 'Janus Atlas Advanced'.",
      plutus: "Plutus Flow tracks cumulative delta and absorption patterns. Learn it in Lesson #21: 'Plutus Flow Mastery'. It's essential for understanding institutional accumulation.",
      minimal: "Minimal Flow is our regime detection system. Lesson #22 explains how to use it for identifying market conditions. Perfect for context-aware trading.",
      pentarch: "Pentarch is our cycle-phase detection system with 5 event signals (TD, IGN, CAP, WRN, BDN) plus 3 momentum indicators. It helps you understand where you are in the market cycle."
    },

    concepts: {
      orderflow: "Order flow is the study of real buying and selling pressure. Unlike price action, it shows you ACTUAL transactions. Start with Lesson #3: 'Price Action is Dead' and Lesson #2: 'Volume Doesn't Lie'.",
      liquidity: "Liquidity engineering is how institutions manipulate price to trigger stops and hunt orders. Lesson #1: 'The Liquidity Lie' explains this in detail.",
      repainting: "60-90% of indicators repaint (change historical values). Lesson #4: 'The Repainting Problem' teaches you how to detect them. Signal Pilot indicators NEVER repaint.",
      regime: "Market regimes are different market conditions (trending, ranging, volatile, calm). Lesson #22: 'Minimal Flow Regimes' covers this. Trade the regime, not just the signal!",
      darkpool: "Dark pools are private exchanges where institutions trade without moving the market. Lesson #17 covers dark pool analysis and how to detect institutional activity.",
      footprint: "Footprint charts show volume at each price level, revealing where buyers and sellers actually transacted. Lesson #16 teaches you how to read them like a pro."
    },

    help: {
      start: "Start with the Beginner tier! Begin with Lesson #1: 'The Liquidity Lie'. Complete lessons in order for best results. Track your progress in the dashboard.",
      study: "Study tip: Complete one lesson per day. Take the quiz at the end. Make notes on key concepts. Review previous lessons before moving to the next tier.",
      stuck: "Feeling stuck? Re-read the lesson, try the quiz again, and check the 'Key Takeaways' section. Remember: institutional thinking takes time to develop.",
      time: "Each lesson takes 15-25 minutes to read. Plan 30-40 minutes including the quiz. The full curriculum is about 30-40 hours total."
    }
  };

  // Pattern matching for responses
  const patterns = [
    // Greetings
    { regex: /^(hi|hello|hey|greetings)/i, response: 'greeting' },

    // Curriculum questions
    { regex: /(beginner|start|first|new)/i, response: () => knowledgeBase.curriculum.beginner },
    { regex: /intermediate/i, response: () => knowledgeBase.curriculum.intermediate },
    { regex: /advanced/i, response: () => knowledgeBase.curriculum.advanced },

    // Indicator questions
    { regex: /janus/i, response: () => knowledgeBase.indicators.janus },
    { regex: /plutus/i, response: () => knowledgeBase.indicators.plutus },
    { regex: /minimal/i, response: () => knowledgeBase.indicators.minimal },
    { regex: /pentarch/i, response: () => knowledgeBase.indicators.pentarch },

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

    // Progress questions
    { regex: /(progress|track|achievement|badge)/i, response: () => "Your progress is tracked automatically! Check the dashboard on the homepage to see completed lessons, your current tier, and achievements earned." },

    // Quiz questions
    { regex: /(quiz|test|assessment)/i, response: () => "Each lesson has a quiz at the end to test your understanding. You need to pass to mark the lesson as complete. Pro tip: Take notes while reading!" }
  ];

  // Suggestions for quick questions
  const suggestions = [
    "Where should I start?",
    "What is order flow?",
    "Explain Janus Atlas",
    "How long does the course take?",
    "What's a dark pool?",
    "Tell me about repainting"
  ];

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

  // Create suggestion chips
  function createSuggestions() {
    const container = document.getElementById('chatbot-suggestions');
    container.innerHTML = '';

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

  // Initialize chatbot
  function init() {
    const { button, container } = createChatbot();
    const closeBtn = container.querySelector('.chatbot-close');
    const input = document.getElementById('chatbot-input');
    const sendBtn = document.getElementById('chatbot-send');

    // Toggle chatbot
    button.addEventListener('click', () => {
      const isActive = container.classList.toggle('active');
      button.setAttribute('aria-expanded', isActive);

      if (isActive) {
        // First time opening - show welcome
        const messages = document.getElementById('chatbot-messages');
        if (messages.children.length === 0) {
          addMessage(knowledgeBase.greeting[0]);
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
