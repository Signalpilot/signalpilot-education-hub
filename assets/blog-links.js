/**
 * Blog Links System - SignalPilot Education Hub
 *
 * Adds relevant blog post links at the end of lessons for deeper reading.
 * Maps lesson topics to curated blog posts from blog.signalpilot.io
 */

(function() {
  'use strict';

  const BLOG_BASE = 'https://blog.signalpilot.io';

  // ========================================
  // Blog Post Mappings
  // ========================================
  // Maps keywords and categories to actual blog posts

  const BLOG_POSTS = {
    // Indicators & Technical Analysis
    'indicators': [
      {
        title: 'Why Your Indicators Keep Failing (And What Actually Works)',
        url: `${BLOG_BASE}/articles/why-your-indicators-keep-failing/`,
        description: 'The truth about why most indicators underperform and how to fix it'
      },
      {
        title: 'The Confirmation Trap: Why More Indicators Mean Worse Results',
        url: `${BLOG_BASE}/articles/the-confirmation-trap/`,
        description: 'How adding indicators actually hurts your trading'
      }
    ],
    'repainting': [
      {
        title: 'The Repainting Problem: How Most TradingView Indicators Cheat',
        url: `${BLOG_BASE}/articles/the-repainting-problem/`,
        description: 'Exposing the dirty secret of indicator development'
      }
    ],
    'rsi': [
      {
        title: 'Why Your Indicators Keep Failing (And What Actually Works)',
        url: `${BLOG_BASE}/articles/why-your-indicators-keep-failing/`,
        description: 'The truth about why most indicators underperform'
      }
    ],

    // Backtesting & Strategy
    'backtesting': [
      {
        title: 'Why Backtesting Results Are Worthless (And What to Do Instead)',
        url: `${BLOG_BASE}/articles/why-backtesting-results-are-worthless/`,
        description: 'The hidden flaws in traditional backtesting'
      }
    ],

    // Psychology & Risk Management
    'psychology': [
      {
        title: 'The Psychology of Getting Stopped Out (And Why It Keeps Happening)',
        url: `${BLOG_BASE}/articles/psychology-of-getting-stopped-out/`,
        description: 'Understanding the mental game behind stop losses'
      },
      {
        title: 'Why You Keep Breaking Your Own Trading Rules',
        url: `${BLOG_BASE}/articles/why-you-break-trading-rules/`,
        description: 'The psychology behind self-sabotage in trading'
      }
    ],
    'risk-management': [
      {
        title: 'Stop Loss Placement: Why Yours Is Probably Wrong',
        url: `${BLOG_BASE}/articles/stop-loss-placement/`,
        description: 'How to place stops that actually protect you'
      },
      {
        title: 'The Real Reason Most Traders Blow Their First Account',
        url: `${BLOG_BASE}/articles/why-traders-blow-first-account/`,
        description: 'Avoiding the mistakes that destroy new traders'
      }
    ],
    'stop-loss': [
      {
        title: 'Stop Loss Placement: Why Yours Is Probably Wrong',
        url: `${BLOG_BASE}/articles/stop-loss-placement/`,
        description: 'How to place stops that actually protect you'
      },
      {
        title: 'The Psychology of Getting Stopped Out (And Why It Keeps Happening)',
        url: `${BLOG_BASE}/articles/psychology-of-getting-stopped-out/`,
        description: 'Understanding the mental game behind stop losses'
      }
    ],

    // Market Structure & Smart Money
    'liquidity': [
      {
        title: 'How Smart Money Actually Moves (And How to See It)',
        url: `${BLOG_BASE}/articles/how-smart-money-moves/`,
        description: 'Understanding institutional order flow'
      },
      {
        title: 'Accumulation vs Distribution: Reading What the Chart Won\'t Tell You',
        url: `${BLOG_BASE}/articles/accumulation-vs-distribution/`,
        description: 'Identifying smart money positioning'
      }
    ],
    'market-structure': [
      {
        title: 'How Smart Money Actually Moves (And How to See It)',
        url: `${BLOG_BASE}/articles/how-smart-money-moves/`,
        description: 'Understanding institutional order flow'
      },
      {
        title: 'The Only Pattern That Actually Repeats in Markets',
        url: `${BLOG_BASE}/articles/the-only-pattern-that-repeats/`,
        description: 'The fundamental pattern behind all market moves'
      }
    ],
    'institutional': [
      {
        title: 'How Smart Money Actually Moves (And How to See It)',
        url: `${BLOG_BASE}/articles/how-smart-money-moves/`,
        description: 'Understanding institutional order flow'
      }
    ],
    'smart-money': [
      {
        title: 'How Smart Money Actually Moves (And How to See It)',
        url: `${BLOG_BASE}/articles/how-smart-money-moves/`,
        description: 'Understanding institutional order flow'
      },
      {
        title: 'Accumulation vs Distribution: Reading What the Chart Won\'t Tell You',
        url: `${BLOG_BASE}/articles/accumulation-vs-distribution/`,
        description: 'Identifying smart money positioning'
      }
    ],

    // Volume & Order Flow
    'volume': [
      {
        title: 'Accumulation vs Distribution: Reading What the Chart Won\'t Tell You',
        url: `${BLOG_BASE}/articles/accumulation-vs-distribution/`,
        description: 'Understanding what volume really tells you'
      },
      {
        title: 'How Smart Money Actually Moves (And How to See It)',
        url: `${BLOG_BASE}/articles/how-smart-money-moves/`,
        description: 'Reading order flow like institutions do'
      }
    ],
    'order-flow': [
      {
        title: 'How Smart Money Actually Moves (And How to See It)',
        url: `${BLOG_BASE}/articles/how-smart-money-moves/`,
        description: 'Understanding institutional order flow'
      },
      {
        title: 'Accumulation vs Distribution: Reading What the Chart Won\'t Tell You',
        url: `${BLOG_BASE}/articles/accumulation-vs-distribution/`,
        description: 'Identifying smart money positioning'
      }
    ],

    // Cycles & Timing
    'cycles': [
      {
        title: 'Why Markets Move in Cycles (And How to Profit From It)',
        url: `${BLOG_BASE}/articles/why-markets-move-in-cycles/`,
        description: 'Understanding market cyclicality'
      }
    ],

    // Trade Management
    'trading-rules': [
      {
        title: 'Why You Keep Breaking Your Own Trading Rules',
        url: `${BLOG_BASE}/articles/why-you-break-trading-rules/`,
        description: 'The psychology behind self-sabotage in trading'
      },
      {
        title: 'The 3 Questions to Ask Before Every Trade',
        url: `${BLOG_BASE}/articles/3-questions-before-every-trade/`,
        description: 'A simple framework for better trade decisions'
      }
    ],
    'trade-management': [
      {
        title: 'The 3 Questions to Ask Before Every Trade',
        url: `${BLOG_BASE}/articles/3-questions-before-every-trade/`,
        description: 'A simple framework for better trade decisions'
      }
    ],

    // Timeframes
    'timeframe': [
      {
        title: 'Timeframe Selection: Why It Matters More Than Your Indicator',
        url: `${BLOG_BASE}/articles/timeframe-selection/`,
        description: 'Choosing the right timeframe for your strategy'
      }
    ],

    // TradingView Specific
    'tradingview': [
      {
        title: 'What TradingView Doesn\'t Tell You About Free Scripts',
        url: `${BLOG_BASE}/articles/tradingview-free-scripts/`,
        description: 'The hidden risks of free indicators'
      },
      {
        title: 'The Repainting Problem: How Most TradingView Indicators Cheat',
        url: `${BLOG_BASE}/articles/the-repainting-problem/`,
        description: 'Exposing the dirty secret of indicator development'
      }
    ],

    // Beginner Content
    'beginner': [
      {
        title: 'The Real Reason Most Traders Blow Their First Account',
        url: `${BLOG_BASE}/articles/why-traders-blow-first-account/`,
        description: 'Avoiding the mistakes that destroy new traders'
      },
      {
        title: 'What Profitable Traders Know That You Don\'t',
        url: `${BLOG_BASE}/articles/what-profitable-traders-know/`,
        description: 'The mindset shift that separates winners from losers'
      }
    ],

    // Confirmation Bias
    'confirmation-bias': [
      {
        title: 'The Confirmation Trap: Why More Indicators Mean Worse Results',
        url: `${BLOG_BASE}/articles/the-confirmation-trap/`,
        description: 'How adding indicators actually hurts your trading'
      }
    ]
  };

  // Default posts when no specific match
  const DEFAULT_POSTS = [
    {
      title: 'What Profitable Traders Know That You Don\'t',
      url: `${BLOG_BASE}/articles/what-profitable-traders-know/`,
      description: 'The mindset shift that separates winners from losers'
    },
    {
      title: 'The Only Pattern That Actually Repeats in Markets',
      url: `${BLOG_BASE}/articles/the-only-pattern-that-repeats/`,
      description: 'The fundamental pattern behind all market moves'
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
        'risk management', 'psychology', 'institutional', 'smart money',
        'stop loss', 'timeframe', 'tradingview', 'indicators', 'repainting',
        'backtesting', 'trading rules', 'confirmation bias', 'cycles'
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
    if (path.includes('psychology') || path.includes('bias')) keywords.push('psychology');
    if (path.includes('stop')) keywords.push('stop-loss');
    if (path.includes('repaint')) keywords.push('repainting');

    // Check lesson level
    const levelMeta = document.querySelector('meta[name="sp-level"]');
    if (levelMeta && levelMeta.content.toLowerCase() === 'beginner') {
      keywords.push('beginner');
    }

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
