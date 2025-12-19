/**
 * Blog Links System - SignalPilot Education Hub
 *
 * Adds relevant blog post links at the end of lessons for deeper reading.
 * Maps lesson topics to curated blog posts from blog.signalpilot.io
 */

(function() {
  'use strict';

  // ========================================
  // Blog Post Mappings
  // ========================================
  // Maps keywords and categories to relevant blog posts

  const BLOG_POSTS = {
    // Liquidity & Market Structure
    'liquidity': [
      {
        title: 'Understanding Liquidity Sweeps in Real-Time',
        url: 'https://blog.signalpilot.io/understanding-liquidity-sweeps',
        description: 'How institutional traders hunt stop losses and how to trade with them'
      },
      {
        title: 'Smart Money Concepts Explained',
        url: 'https://blog.signalpilot.io/smart-money-concepts',
        description: 'The foundational concepts behind institutional order flow'
      }
    ],
    'market-structure': [
      {
        title: 'Market Structure Shifts: What They Really Mean',
        url: 'https://blog.signalpilot.io/market-structure-shifts',
        description: 'Identifying trend changes before they happen'
      },
      {
        title: 'Reading Price Action Like a Pro',
        url: 'https://blog.signalpilot.io/reading-price-action',
        description: 'Beyond candlesticks: what price movement actually tells you'
      }
    ],

    // Volume & Order Flow
    'volume': [
      {
        title: 'Volume Analysis: Separating Signal from Noise',
        url: 'https://blog.signalpilot.io/volume-analysis-guide',
        description: 'How to interpret volume in different market contexts'
      },
      {
        title: 'Delta Divergence Trading Strategy',
        url: 'https://blog.signalpilot.io/delta-divergence-strategy',
        description: 'Using buying vs selling pressure to predict reversals'
      }
    ],
    'order-flow': [
      {
        title: 'Order Flow Trading for Beginners',
        url: 'https://blog.signalpilot.io/order-flow-beginners',
        description: 'Introduction to reading the tape and understanding flow'
      },
      {
        title: 'Footprint Charts Demystified',
        url: 'https://blog.signalpilot.io/footprint-charts-guide',
        description: 'How to read and trade with footprint charts'
      }
    ],

    // Technical Indicators
    'indicators': [
      {
        title: 'The Repaint Problem: Why Most Indicators Lie',
        url: 'https://blog.signalpilot.io/repaint-problem',
        description: 'How to identify and avoid repainting indicators'
      },
      {
        title: 'Building a Non-Repainting Trading System',
        url: 'https://blog.signalpilot.io/non-repainting-system',
        description: 'Creating reliable trading signals you can trust'
      }
    ],
    'rsi': [
      {
        title: 'RSI: What You Think You Know Is Wrong',
        url: 'https://blog.signalpilot.io/rsi-myths',
        description: 'Why RSI extremes alone are not reversal signals'
      }
    ],

    // Risk Management & Psychology
    'risk-management': [
      {
        title: 'Position Sizing: The Most Important Skill',
        url: 'https://blog.signalpilot.io/position-sizing-guide',
        description: 'How to size positions for long-term survival'
      },
      {
        title: 'Stop Loss Placement That Actually Works',
        url: 'https://blog.signalpilot.io/stop-loss-strategies',
        description: 'Placing stops where they protect, not where they get hunted'
      }
    ],
    'psychology': [
      {
        title: 'Overcoming Revenge Trading',
        url: 'https://blog.signalpilot.io/revenge-trading',
        description: 'Breaking the emotional cycle that destroys accounts'
      },
      {
        title: 'Trading Psychology: Building Mental Resilience',
        url: 'https://blog.signalpilot.io/trading-psychology',
        description: 'Developing the mindset for consistent profitability'
      }
    ],

    // Advanced Topics
    'institutional-trading': [
      {
        title: 'How Institutions Actually Trade',
        url: 'https://blog.signalpilot.io/institutional-trading',
        description: 'Inside the strategies of professional money managers'
      },
      {
        title: 'Dark Pools and Hidden Liquidity',
        url: 'https://blog.signalpilot.io/dark-pools-explained',
        description: 'Understanding off-exchange trading venues'
      }
    ],
    'algorithmic': [
      {
        title: 'Algorithmic Trading Fundamentals',
        url: 'https://blog.signalpilot.io/algo-trading-fundamentals',
        description: 'Building systematic trading strategies'
      },
      {
        title: 'Backtesting Without Curve Fitting',
        url: 'https://blog.signalpilot.io/backtesting-guide',
        description: 'How to validate strategies without overfitting'
      }
    ],
    'options': [
      {
        title: 'Options Order Flow Analysis',
        url: 'https://blog.signalpilot.io/options-order-flow',
        description: 'Reading institutional options activity'
      }
    ],
    'volatility': [
      {
        title: 'Trading Volatility Regimes',
        url: 'https://blog.signalpilot.io/volatility-trading',
        description: 'Adapting your strategy to market conditions'
      }
    ],

    // Timeframes & Sessions
    'timeframe': [
      {
        title: 'Multi-Timeframe Analysis Made Simple',
        url: 'https://blog.signalpilot.io/multi-timeframe-analysis',
        description: 'Aligning trades across different time horizons'
      }
    ],
    'sessions': [
      {
        title: 'Trading the London and NY Sessions',
        url: 'https://blog.signalpilot.io/trading-sessions-guide',
        description: 'Optimizing entries around session opens'
      }
    ],

    // SignalPilot Specific
    'janus-atlas': [
      {
        title: 'Mastering Janus Atlas: Complete Guide',
        url: 'https://blog.signalpilot.io/janus-atlas-guide',
        description: 'Advanced techniques for liquidity zone detection'
      }
    ],
    'plutus-flow': [
      {
        title: 'Plutus Flow: Understanding the Signals',
        url: 'https://blog.signalpilot.io/plutus-flow-guide',
        description: 'Reading accumulation and distribution in real-time'
      }
    ],
    'pentarch': [
      {
        title: 'Cycle Analysis with Pentarch',
        url: 'https://blog.signalpilot.io/pentarch-cycles',
        description: 'Timing entries with market cycle positions'
      }
    ],
    'volume-oracle': [
      {
        title: 'Volume Oracle: Detecting Anomalies',
        url: 'https://blog.signalpilot.io/volume-oracle-guide',
        description: 'Spotting significant volume events automatically'
      }
    ]
  };

  // Default posts when no specific match
  const DEFAULT_POSTS = [
    {
      title: 'Getting Started with SignalPilot',
      url: 'https://blog.signalpilot.io/getting-started',
      description: 'Your first steps to professional-grade trading'
    },
    {
      title: 'Trading Education Roadmap',
      url: 'https://blog.signalpilot.io/education-roadmap',
      description: 'A structured path from beginner to advanced trader'
    }
  ];

  // ========================================
  // Core Functions
  // ========================================

  /**
   * Extract keywords from the current lesson page
   */
  function getLessonKeywords() {
    const keywords = [];

    // Check for data attributes on the article
    const article = document.querySelector('article, .article');
    if (article && article.dataset.tags) {
      keywords.push(...article.dataset.tags.split(',').map(t => t.trim().toLowerCase()));
    }

    // Check meta tags
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywords.push(...keywordsMeta.content.split(',').map(t => t.trim().toLowerCase()));
    }

    // Analyze page content for common keywords
    const prose = document.querySelector('.prose');
    if (prose) {
      const text = prose.textContent.toLowerCase();
      const keywordChecks = [
        'liquidity', 'volume', 'order flow', 'market structure', 'rsi',
        'risk management', 'psychology', 'institutional', 'algorithmic',
        'options', 'volatility', 'timeframe', 'sessions', 'janus atlas',
        'plutus flow', 'pentarch', 'volume oracle', 'indicators'
      ];

      keywordChecks.forEach(keyword => {
        if (text.includes(keyword)) {
          keywords.push(keyword.replace(/\s+/g, '-'));
        }
      });
    }

    // Check URL for hints
    const path = window.location.pathname.toLowerCase();
    if (path.includes('liquidity')) keywords.push('liquidity');
    if (path.includes('volume')) keywords.push('volume');
    if (path.includes('flow')) keywords.push('order-flow');
    if (path.includes('structure')) keywords.push('market-structure');
    if (path.includes('risk')) keywords.push('risk-management');
    if (path.includes('psychology')) keywords.push('psychology');

    return [...new Set(keywords)]; // Remove duplicates
  }

  /**
   * Get relevant blog posts based on lesson keywords
   */
  function getRelevantPosts(keywords) {
    const posts = [];
    const addedUrls = new Set();

    // Find matching posts for each keyword
    keywords.forEach(keyword => {
      const normalizedKeyword = keyword.toLowerCase().replace(/\s+/g, '-');
      const matchingPosts = BLOG_POSTS[normalizedKeyword] || [];

      matchingPosts.forEach(post => {
        if (!addedUrls.has(post.url)) {
          posts.push(post);
          addedUrls.add(post.url);
        }
      });
    });

    // If no matches, use defaults
    if (posts.length === 0) {
      DEFAULT_POSTS.forEach(post => {
        if (!addedUrls.has(post.url)) {
          posts.push(post);
          addedUrls.add(post.url);
        }
      });
    }

    // Limit to 3 posts for clean display
    return posts.slice(0, 3);
  }

  /**
   * Render the blog links section HTML
   */
  function renderBlogLinks(posts) {
    if (posts.length === 0) return '';

    const postCards = posts.map(post => `
      <a href="${post.url}" class="blog-link-card" target="_blank" rel="noopener">
        <h4 class="blog-link-card__title">${post.title}</h4>
        <p class="blog-link-card__desc">${post.description}</p>
        <span class="blog-link-card__cta">Read on Blog &rarr;</span>
      </a>
    `).join('');

    return `
      <div class="blog-links-section">
        <div class="section-break"><span>Deeper Reading</span></div>
        <p class="blog-links-intro">Continue your learning with these related articles from the Signal Pilot blog:</p>
        <div class="blog-links-grid">
          ${postCards}
        </div>
      </div>
    `;
  }

  /**
   * Inject blog links into the page
   */
  function injectBlogLinks() {
    // Don't run on non-lesson pages
    const article = document.querySelector('article, .article');
    if (!article) return;

    // Don't inject if already present
    if (document.querySelector('.blog-links-section')) return;

    // Get relevant posts
    const keywords = getLessonKeywords();
    const posts = getRelevantPosts(keywords);

    if (posts.length === 0) return;

    // Find insertion point - before Related Lessons section or before discussion
    const relatedSection = Array.from(document.querySelectorAll('.section-break')).find(el =>
      el.textContent.toLowerCase().includes('related')
    );
    const discussionSection = document.querySelector('.discussion-section');
    const navArticle = document.querySelector('.nav-article');
    const prose = document.querySelector('.prose');

    const html = renderBlogLinks(posts);

    // Insert before related lessons, discussion, or nav
    if (relatedSection) {
      relatedSection.insertAdjacentHTML('beforebegin', html);
    } else if (discussionSection) {
      discussionSection.insertAdjacentHTML('beforebegin', html);
    } else if (navArticle) {
      navArticle.insertAdjacentHTML('beforebegin', html);
    } else if (prose) {
      prose.insertAdjacentHTML('beforeend', html);
    }

    // Log for debugging in dev
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('[Blog Links] Injected', { keywords, posts: posts.length });
    }
  }

  // ========================================
  // Initialization
  // ========================================

  function init() {
    // Small delay to ensure page content is loaded
    setTimeout(injectBlogLinks, 100);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for external use
  window.BlogLinks = {
    init: init,
    getRelevantPosts: getRelevantPosts,
    BLOG_POSTS: BLOG_POSTS
  };

})();
