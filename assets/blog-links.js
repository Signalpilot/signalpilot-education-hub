/**
 * Blog Links System - SignalPilot Education Hub
 *
 * Fetches blog posts from blog.signalpilot.io and displays relevant articles
 * at the end of lessons based on topic matching.
 */

(function() {
  'use strict';

  const BLOG_API_URL = 'https://blog.signalpilot.io/api/articles.json';
  const CACHE_KEY = 'sp_blog_articles';
  const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

  // Fallback articles if fetch fails
  const FALLBACK_ARTICLES = [
    {
      title: "How Smart Money Actually Moves (And How to See It)",
      url: "https://blog.signalpilot.io/articles/how-smart-money-moves/",
      description: "Understanding institutional order flow",
      tags: ["liquidity", "smart-money", "market-structure", "order-flow"]
    },
    {
      title: "The Repainting Problem: How Most TradingView Indicators Cheat",
      url: "https://blog.signalpilot.io/articles/the-repainting-problem/",
      description: "Exposing the dirty secret of indicator development",
      tags: ["indicators", "repainting", "tradingview", "backtesting"]
    },
    {
      title: "Why Your Indicators Keep Failing (And What Actually Works)",
      url: "https://blog.signalpilot.io/articles/why-your-indicators-keep-failing/",
      description: "The truth about why most indicators underperform",
      tags: ["indicators", "rsi", "beginner"]
    },
    {
      title: "The Psychology of Getting Stopped Out",
      url: "https://blog.signalpilot.io/articles/psychology-of-getting-stopped-out/",
      description: "Understanding the mental game behind stop losses",
      tags: ["psychology", "stop-loss", "risk-management"]
    },
    {
      title: "What Profitable Traders Know That You Don't",
      url: "https://blog.signalpilot.io/articles/what-profitable-traders-know/",
      description: "The mindset shift that separates winners from losers",
      tags: ["psychology", "beginner"]
    }
  ];

  let articlesCache = null;

  // ========================================
  // Fetch & Cache Functions
  // ========================================

  /**
   * Get cached articles from localStorage
   */
  function getCachedArticles() {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (!cached) return null;

      const { articles, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > CACHE_DURATION) {
        localStorage.removeItem(CACHE_KEY);
        return null;
      }
      return articles;
    } catch (e) {
      return null;
    }
  }

  /**
   * Save articles to localStorage cache
   */
  function cacheArticles(articles) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        articles,
        timestamp: Date.now()
      }));
    } catch (e) {
      // localStorage full or unavailable
    }
  }

  /**
   * Fetch articles from blog API
   */
  async function fetchArticles() {
    // Check cache first
    const cached = getCachedArticles();
    if (cached) {
      articlesCache = cached;
      return cached;
    }

    try {
      const response = await fetch(BLOG_API_URL, {
        mode: 'cors',
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) throw new Error('Fetch failed');

      const data = await response.json();
      const articles = data.articles || [];

      // Cache for future use
      cacheArticles(articles);
      articlesCache = articles;
      return articles;

    } catch (error) {
      // CORS or network error - use fallback
      console.log('[Blog Links] Using fallback articles (API unavailable)');
      articlesCache = FALLBACK_ARTICLES;
      return FALLBACK_ARTICLES;
    }
  }

  // ========================================
  // Keyword Extraction
  // ========================================

  /**
   * Extract keywords from the current lesson page
   */
  function getLessonKeywords() {
    const keywords = new Set();

    // Check meta tags
    const keywordsMeta = document.querySelector('meta[name="keywords"]');
    if (keywordsMeta) {
      keywordsMeta.content.split(',').forEach(t => keywords.add(t.trim().toLowerCase()));
    }

    // Analyze page content
    const prose = document.querySelector('.prose');
    if (prose) {
      const text = prose.textContent.toLowerCase();
      const keywordChecks = [
        'liquidity', 'volume', 'order flow', 'market structure', 'rsi',
        'risk management', 'psychology', 'institutional', 'smart money',
        'stop loss', 'timeframe', 'tradingview', 'indicators', 'repainting',
        'backtesting', 'trading rules', 'confirmation bias', 'cycles',
        'divergence', 'momentum', 'support', 'resistance'
      ];

      keywordChecks.forEach(keyword => {
        if (text.includes(keyword)) {
          keywords.add(keyword.replace(/\s+/g, '-'));
        }
      });
    }

    // Check URL for hints
    const path = window.location.pathname.toLowerCase();
    if (path.includes('liquidity')) keywords.add('liquidity');
    if (path.includes('volume')) keywords.add('volume');
    if (path.includes('flow')) keywords.add('order-flow');
    if (path.includes('structure')) keywords.add('market-structure');
    if (path.includes('risk')) keywords.add('risk-management');
    if (path.includes('psychology') || path.includes('bias')) keywords.add('psychology');
    if (path.includes('stop')) keywords.add('stop-loss');
    if (path.includes('repaint')) keywords.add('repainting');
    if (path.includes('indicator')) keywords.add('indicators');

    // Check lesson level
    const levelMeta = document.querySelector('meta[name="sp-level"]');
    if (levelMeta) {
      keywords.add(levelMeta.content.toLowerCase());
    }

    return [...keywords];
  }

  // ========================================
  // Article Matching
  // ========================================

  /**
   * Score an article based on keyword matches
   */
  function scoreArticle(article, keywords) {
    if (!article.tags || !Array.isArray(article.tags)) return 0;

    let score = 0;
    const articleTags = article.tags.map(t => t.toLowerCase());

    keywords.forEach(keyword => {
      if (articleTags.includes(keyword)) {
        score += 2; // Direct match
      } else if (articleTags.some(tag => tag.includes(keyword) || keyword.includes(tag))) {
        score += 1; // Partial match
      }
    });

    return score;
  }

  /**
   * Get relevant blog posts based on lesson keywords
   */
  function getRelevantPosts(articles, keywords) {
    // Score and sort articles
    const scored = articles
      .map(article => ({ ...article, score: scoreArticle(article, keywords) }))
      .filter(article => article.score > 0)
      .sort((a, b) => b.score - a.score);

    // Take top 3, or fallback to first 3 if no matches
    if (scored.length > 0) {
      return scored.slice(0, 3);
    }

    // No keyword matches - return general beginner-friendly articles
    return articles
      .filter(a => a.tags && a.tags.includes('beginner'))
      .slice(0, 2);
  }

  // ========================================
  // Rendering
  // ========================================

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
  function injectBlogLinks(articles) {
    // Don't run on non-lesson pages
    const article = document.querySelector('article, .article');
    if (!article) return;

    // Don't inject if already present
    if (document.querySelector('.blog-links-section')) return;

    // Get relevant posts
    const keywords = getLessonKeywords();
    const posts = getRelevantPosts(articles, keywords);

    if (posts.length === 0) return;

    // Find insertion point
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
  }

  // ========================================
  // Initialization
  // ========================================

  async function init() {
    // Small delay to ensure page content is loaded
    await new Promise(resolve => setTimeout(resolve, 100));

    const articles = await fetchArticles();
    injectBlogLinks(articles);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for external use
  window.BlogLinks = {
    init,
    fetchArticles,
    getArticles: () => articlesCache
  };

})();
