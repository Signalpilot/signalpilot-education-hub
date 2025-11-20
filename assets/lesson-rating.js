// Lesson Rating System
(function() {
  'use strict';

  /**
   * Get lesson info from URL
   * @returns {Object} Lesson tier, number, and ID
   */
  function getLessonInfo() {
    const path = window.location.pathname;
    const match = path.match(/curriculum\/(beginner|intermediate|advanced)\/(\d+)-(.+)\.html/);

    if (!match) return null;

    return {
      tier: match[1],
      number: parseInt(match[2]),
      slug: match[3],
      id: `${match[1]}_${match[2]}`
    };
  }

  /**
   * Get rating from localStorage
   * @param {string} lessonId - Lesson identifier
   * @returns {string|null} 'up' or 'down' or null
   */
  function getRating(lessonId) {
    return localStorage.getItem(`sp_rating_${lessonId}`);
  }

  /**
   * Save rating to localStorage
   * @param {string} lessonId - Lesson identifier
   * @param {string} rating - 'up' or 'down'
   */
  function saveRating(lessonId, rating) {
    const previousRating = getRating(lessonId);
    localStorage.setItem(`sp_rating_${lessonId}`, rating);
    localStorage.setItem(`sp_rating_${lessonId}_timestamp`, new Date().toISOString());

    // Track analytics
    if (window.trackEvent) {
      window.trackEvent('lesson_rated', {
        lesson_id: lessonId,
        rating: rating,
        previous_rating: previousRating,
        changed: previousRating !== rating
      });
    }

    // Log for debugging
    if (window.logger) {
      window.logger.log(`[Rating] Lesson ${lessonId} rated: ${rating}`);
    }
  }

  /**
   * Create rating UI component
   * @param {Object} lessonInfo - Lesson information
   * @returns {HTMLElement} Rating container
   */
  function createRatingUI(lessonInfo) {
    const container = document.createElement('div');
    container.className = 'lesson-rating';
    container.style.cssText = `
      margin: 3rem auto 2rem;
      padding: 1.5rem;
      max-width: 600px;
      text-align: center;
      background: linear-gradient(135deg, rgba(91, 138, 255, 0.05), rgba(118, 221, 255, 0.05));
      border: 1px solid rgba(91, 138, 255, 0.2);
      border-radius: 12px;
    `;

    const currentRating = getRating(lessonInfo.id);

    container.innerHTML = `
      <div class="rating-prompt" style="margin-bottom: 1rem; color: var(--muted); font-size: 0.95rem;">
        ${currentRating ? 'You rated this lesson:' : 'Was this lesson helpful?'}
      </div>
      <div class="rating-buttons" style="display: flex; gap: 1rem; justify-content: center; align-items: center;">
        <button class="rating-btn rating-up ${currentRating === 'up' ? 'active' : ''}"
                data-rating="up"
                aria-label="Helpful"
                style="
                  background: ${currentRating === 'up' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
                  border: 2px solid ${currentRating === 'up' ? 'rgba(34, 197, 94, 0.6)' : 'rgba(255, 255, 255, 0.1)'};
                  color: ${currentRating === 'up' ? '#22c55e' : 'var(--text)'};
                  padding: 0.75rem 1.5rem;
                  border-radius: 8px;
                  cursor: pointer;
                  font-size: 1.5rem;
                  transition: all 0.2s ease;
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                ">
          <span style="font-size: 1.5rem;">👍</span>
          <span style="font-size: 0.9rem; font-weight: 600;">Helpful</span>
        </button>
        <button class="rating-btn rating-down ${currentRating === 'down' ? 'active' : ''}"
                data-rating="down"
                aria-label="Not helpful"
                style="
                  background: ${currentRating === 'down' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
                  border: 2px solid ${currentRating === 'down' ? 'rgba(239, 68, 68, 0.6)' : 'rgba(255, 255, 255, 0.1)'};
                  color: ${currentRating === 'down' ? '#ef4444' : 'var(--text)'};
                  padding: 0.75rem 1.5rem;
                  border-radius: 8px;
                  cursor: pointer;
                  font-size: 1.5rem;
                  transition: all 0.2s ease;
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                ">
          <span style="font-size: 1.5rem;">👎</span>
          <span style="font-size: 0.9rem; font-weight: 600;">Not helpful</span>
        </button>
      </div>
      <div class="rating-feedback" style="margin-top: 1rem; font-size: 0.85rem; color: var(--muted); min-height: 20px;">
        ${currentRating ? 'Thanks for your feedback!' : ''}
      </div>
    `;

    // Add hover effects via CSS
    const style = document.createElement('style');
    style.textContent = `
      .rating-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      }
      .rating-btn.active {
        transform: scale(1.05);
      }
      .rating-btn:active {
        transform: scale(0.98);
      }
    `;
    document.head.appendChild(style);

    // Add click handlers
    const upBtn = container.querySelector('.rating-up');
    const downBtn = container.querySelector('.rating-down');
    const feedback = container.querySelector('.rating-feedback');
    const prompt = container.querySelector('.rating-prompt');

    function handleRating(rating) {
      const isCurrentRating = currentRating === rating;
      const newRating = isCurrentRating ? null : rating;

      if (newRating) {
        saveRating(lessonInfo.id, newRating);

        // Update UI
        upBtn.classList.toggle('active', newRating === 'up');
        downBtn.classList.toggle('active', newRating === 'down');

        // Update styles
        if (newRating === 'up') {
          upBtn.style.background = 'rgba(34, 197, 94, 0.2)';
          upBtn.style.borderColor = 'rgba(34, 197, 94, 0.6)';
          upBtn.style.color = '#22c55e';
          downBtn.style.background = 'rgba(255, 255, 255, 0.05)';
          downBtn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          downBtn.style.color = 'var(--text)';
        } else {
          downBtn.style.background = 'rgba(239, 68, 68, 0.2)';
          downBtn.style.borderColor = 'rgba(239, 68, 68, 0.6)';
          downBtn.style.color = '#ef4444';
          upBtn.style.background = 'rgba(255, 255, 255, 0.05)';
          upBtn.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          upBtn.style.color = 'var(--text)';
        }

        prompt.textContent = 'You rated this lesson:';
        feedback.textContent = 'Thanks for your feedback!';
        feedback.style.color = '#22c55e';

        // Animate feedback
        feedback.style.animation = 'fadeIn 0.3s ease';
      }
    }

    upBtn.addEventListener('click', () => handleRating('up'));
    downBtn.addEventListener('click', () => handleRating('down'));

    return container;
  }

  /**
   * Initialize rating system
   */
  function init() {
    // Only run on lesson pages
    const lessonInfo = getLessonInfo();
    if (!lessonInfo) return;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }

    // Find insertion point (before nav-article)
    const navArticle = document.querySelector('.nav-article');
    if (!navArticle) {
      if (window.logger) {
        window.logger.warn('[Rating] Could not find .nav-article element');
      }
      return;
    }

    // Create and insert rating UI
    const ratingUI = createRatingUI(lessonInfo);
    navArticle.parentNode.insertBefore(ratingUI, navArticle);

    if (window.logger) {
      window.logger.log(`[Rating] Initialized for lesson ${lessonInfo.id}`);
    }
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export public API
  window.lessonRating = {
    getRating,
    getLessonInfo,
    // Get all ratings
    getAllRatings: function() {
      const ratings = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('sp_rating_') && !key.endsWith('_timestamp')) {
          const lessonId = key.replace('sp_rating_', '');
          ratings[lessonId] = localStorage.getItem(key);
        }
      }
      return ratings;
    },
    // Get rating stats
    getStats: function() {
      const allRatings = this.getAllRatings();
      const stats = {
        total: 0,
        helpful: 0,
        notHelpful: 0,
        byTier: {
          beginner: { total: 0, helpful: 0, notHelpful: 0 },
          intermediate: { total: 0, helpful: 0, notHelpful: 0 },
          advanced: { total: 0, helpful: 0, notHelpful: 0 }
        }
      };

      Object.entries(allRatings).forEach(([lessonId, rating]) => {
        stats.total++;
        if (rating === 'up') stats.helpful++;
        if (rating === 'down') stats.notHelpful++;

        const tier = lessonId.split('_')[0];
        if (stats.byTier[tier]) {
          stats.byTier[tier].total++;
          if (rating === 'up') stats.byTier[tier].helpful++;
          if (rating === 'down') stats.byTier[tier].notHelpful++;
        }
      });

      return stats;
    }
  };

})();
