// edu-enhanced.js — Enhanced Education Hub Features
// Progress tracking, quizzes, tabs, accordions, search, achievements

(function(){
  'use strict';

  // ============================================
  // PROGRESS TRACKING SYSTEM
  // ============================================
  const ProgressTracker = {
    init() {
      this.addScrollProgress();
      this.trackArticleProgress();
      this.loadUserProgress();
    },

    // Fixed scroll progress bar at top
    addScrollProgress() {
      if (!document.querySelector('.prose')) return;

      const bar = document.createElement('div');
      bar.className = 'progress-bar';
      bar.innerHTML = '<div class="progress-bar-fill"></div>';
      document.body.prepend(bar);

      const fill = bar.querySelector('.progress-bar-fill');

      window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrolled = window.scrollY;
        const percent = (scrolled / (docHeight - winHeight)) * 100;
        fill.style.width = Math.min(percent, 100) + '%';
      }, { passive: true });
    },

    // Track which articles user has read
    trackArticleProgress() {
      const meta = document.querySelector('meta[name="sp-order"]');
      if (!meta) return;

      const articleId = meta.getAttribute('content');
      const level = document.querySelector('meta[name="sp-level"]')?.getAttribute('content') || 'beginner';

      // Mark as started when user scrolls 25%
      let started = false;
      window.addEventListener('scroll', () => {
        if (started) return;
        const percent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (percent > 25) {
          started = true;
          this.markArticleStarted(level, articleId);
        }
      }, { passive: true });

      // Mark as completed when user reaches 90%
      window.addEventListener('scroll', () => {
        const percent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (percent > 90) {
          this.markArticleCompleted(level, articleId);
        }
      }, { passive: true });
    },

    markArticleStarted(level, articleId) {
      const key = `sp_edu_${level}_${articleId}_started`;
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, new Date().toISOString());
      }
    },

    markArticleCompleted(level, articleId) {
      const key = `sp_edu_${level}_${articleId}_completed`;
      if (!localStorage.getItem(key)) {
        localStorage.setItem(key, new Date().toISOString());

        // Update activity tracking for My Library
        const today = new Date().toISOString().split('T')[0];
        const activity = JSON.parse(localStorage.getItem('sp_activity') || '{}');

        if (!activity[today]) {
          activity[today] = { visits: 1, lessonsCompleted: 1 };
        } else {
          activity[today].lessonsCompleted = (activity[today].lessonsCompleted || 0) + 1;
        }

        localStorage.setItem('sp_activity', JSON.stringify(activity));
        logger.log('[Education] Lesson completed, activity updated:', today);

        this.showCompletionBadge(articleId);
        this.checkAchievements();
      }
    },

    showCompletionBadge(articleId) {
      const badge = document.createElement('div');
      badge.style.cssText = 'position:fixed;top:100px;right:20px;background:rgba(0,212,170,.95);color:#000;padding:1.5rem 2rem;border-radius:16px;font-weight:700;z-index:1000;animation:slideIn .3s ease;box-shadow:0 8px 32px rgba(0,212,170,.4)';
      badge.innerHTML = `<div style="font-size:2rem;margin-bottom:.5rem">✓</div><div>Article #${articleId} Complete!</div>`;
      document.body.appendChild(badge);

      setTimeout(() => {
        badge.style.animation = 'slideOut .3s ease';
        setTimeout(() => badge.remove(), 300);
      }, 3000);
    },

    checkAchievements() {
      const completed = this.getCompletedArticles();
      const achievements = [
        { count: 1, name: 'First Steps', icon: '🎯' },
        { count: 5, name: 'Dedicated Learner', icon: '📚' },
        { count: 20, name: 'Beginner Master', icon: '🏅' },
        { count: 47, name: 'Intermediate Pro', icon: '⭐' },
        { count: 74, name: 'Advanced Scholar', icon: '🏆' },
        { count: 82, name: 'Complete Mastery', icon: '🔥' }
      ];

      achievements.forEach(ach => {
        if (completed.length === ach.count) {
          const achKey = `sp_edu_ach_${ach.count}`;
          if (!localStorage.getItem(achKey)) {
            localStorage.setItem(achKey, new Date().toISOString());
            this.showAchievement(ach);
          }
        }
      });
    },

    showAchievement(achievement) {
      const modal = document.createElement('div');
      modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.8);z-index:2000;display:flex;align-items:center;justify-content:center;animation:fadeIn .3s ease';
      modal.innerHTML = `
        <div style="background:linear-gradient(135deg,rgba(91,138,255,.2),rgba(118,221,255,.15));border:3px solid #ffd700;border-radius:24px;padding:3rem;text-align:center;max-width:400px;animation:scaleIn .3s ease">
          <div style="font-size:5rem;margin-bottom:1rem">${achievement.icon}</div>
          <h2 style="margin:0 0 1rem 0;font-size:2rem;color:#ffd700">Achievement Unlocked!</h2>
          <p style="font-size:1.3rem;font-weight:700;margin:0">${achievement.name}</p>
          <p style="margin:1rem 0 0 0;opacity:.8">${achievement.count} articles completed</p>
          <button onclick="this.closest('div').parentElement.remove()" style="margin-top:2rem;padding:.75rem 2rem;background:#5b8aff;border:none;border-radius:999px;color:#fff;font-weight:700;cursor:pointer">Continue</button>
        </div>
      `;
      document.body.appendChild(modal);
    },

    getCompletedArticles() {
      const completed = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes('sp_edu_') && key.includes('_completed')) {
          completed.push(key);
        }
      }
      return completed;
    },

    loadUserProgress() {
      // Show continue reading card on homepage
      if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        this.showContinueReading();
      }
    },

    showContinueReading() {
      const lastArticle = localStorage.getItem('sp_edu_last_article');
      if (!lastArticle) return;

      const data = JSON.parse(lastArticle);
      const hero = document.querySelector('.hero');
      if (!hero) return;

      const card = document.createElement('div');
      card.className = 'wrap';
      card.innerHTML = `
        <div class="continue-reading">
          <h3>Continue Learning</h3>
          <p>Pick up where you left off</p>
          <div><strong>${data.title}</strong></div>
          <div style="font-size:.9rem;color:var(--muted);margin-top:.5rem">${data.level} • Article #${data.order}</div>
          <div class="progress-bar-small">
            <span style="width:${data.progress}%"></span>
          </div>
          <a class="btn btn-primary" href="${data.url}" style="margin-top:1rem">Continue Reading →</a>
        </div>
      `;
      hero.after(card);
    }
  };

  // ============================================
  // INTERACTIVE TABS
  // ============================================
  const Tabs = {
    init() {
      document.querySelectorAll('.tabs').forEach(tabsContainer => {
        const nav = tabsContainer.querySelector('.tabs-nav');
        if (!nav) return;

        nav.querySelectorAll('button').forEach((btn, index) => {
          btn.addEventListener('click', () => {
            // Remove active from all
            nav.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            tabsContainer.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

            // Add active to clicked
            btn.classList.add('active');
            tabsContainer.querySelectorAll('.tab-panel')[index]?.classList.add('active');
          });
        });

        // Activate first tab by default
        nav.querySelector('button')?.classList.add('active');
        tabsContainer.querySelector('.tab-panel')?.classList.add('active');
      });
    }
  };

  // ============================================
  // ACCORDION
  // ============================================
  const Accordion = {
    init() {
      document.querySelectorAll('.accordion-item').forEach(item => {
        const header = item.querySelector('.accordion-header');
        if (!header) return;

        header.addEventListener('click', () => {
          const isOpen = item.classList.contains('open');

          // Close all others in same accordion
          item.closest('.accordion')?.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('open');
          });

          // Toggle current
          if (!isOpen) {
            item.classList.add('open');
          }
        });
      });
    }
  };

  // ============================================
  // QUIZ SYSTEM
  // ============================================
  const Quiz = {
    init() {
      document.querySelectorAll('.quiz').forEach(quiz => {
        const options = quiz.querySelectorAll('.quiz-option');
        const submit = quiz.querySelector('.quiz-submit');
        const feedback = quiz.querySelector('.quiz-feedback');

        let selectedOption = null;

        options.forEach(opt => {
          opt.addEventListener('click', () => {
            options.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            selectedOption = opt;
          });
        });

        if (submit) {
          submit.addEventListener('click', () => {
            if (!selectedOption) {
              alert('Please select an answer');
              return;
            }

            const isCorrect = selectedOption.dataset.correct === 'true';

            options.forEach(opt => {
              opt.style.pointerEvents = 'none';
              if (opt.dataset.correct === 'true') {
                opt.classList.add('correct');
              } else if (opt === selectedOption && !isCorrect) {
                opt.classList.add('incorrect');
              }
            });

            if (feedback) {
              feedback.classList.add('show');
              feedback.classList.add(isCorrect ? 'correct' : 'incorrect');
            }

            submit.disabled = true;
            submit.textContent = isCorrect ? '✓ Correct!' : '✗ Incorrect';
          });
        }
      });
    }
  };

  // ============================================
  // SEARCH FUNCTIONALITY
  // ============================================
  const Search = {
    articles: [],

    async init() {
      const input = document.querySelector('.search-input');
      if (!input) return;

      // Load articles index
      try {
        const res = await fetch('/curriculum/index.json');
        this.articles = await res.json();
      } catch (e) {
        logger.warn('Could not load articles index');
      }

      input.addEventListener('input', (e) => {
        this.performSearch(e.target.value);
      });
    },

    performSearch(query) {
      const results = document.querySelector('.search-results');
      if (!results || query.length < 2) {
        if (results) results.innerHTML = '';
        return;
      }

      const filtered = this.articles.filter(a => {
        return a.title.toLowerCase().includes(query.toLowerCase()) ||
               a.description.toLowerCase().includes(query.toLowerCase()) ||
               a.category.toLowerCase().includes(query.toLowerCase());
      });

      if (filtered.length === 0) {
        results.innerHTML = '<p style="text-align:center;color:var(--muted);padding:2rem">No results found</p>';
        return;
      }

      results.innerHTML = filtered.slice(0, 5).map(a => `
        <a href="${a.href}" class="search-result-item">
          <h4>${this.highlight(a.title, query)}</h4>
          <p>${this.highlight(a.description, query)}</p>
          <span class="search-badge">${a.category}</span>
        </a>
      `).join('');
    },

    highlight(text, query) {
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, '<mark style="background:rgba(118,221,255,.3);color:inherit;padding:0 .2em">$1</mark>');
    }
  };

  // ============================================
  // MOBILE TABLE ACCORDIONS (LESSONS 1-2 ONLY - TESTING)
  // ============================================
  const TableAccordions = {
    init() {
      console.log('[TableAccordions] Init called');
      console.log('[TableAccordions] Window width:', window.innerWidth);
      console.log('[TableAccordions] Has class:', document.body.classList.contains('table-accordions-mobile'));

      // Only on mobile AND only on pages with table-accordions-mobile class
      if (window.innerWidth > 480) {
        console.log('[TableAccordions] Skipping - not mobile viewport');
        return;
      }
      if (!document.body.classList.contains('table-accordions-mobile')) {
        console.log('[TableAccordions] Skipping - missing class');
        return;
      }

      const rows = document.querySelectorAll('table tr');
      console.log('[TableAccordions] Found', rows.length, 'table rows');

      let addedCount = 0;
      rows.forEach(row => {
        // Skip header rows
        if (row.closest('thead')) return;

        row.addEventListener('click', () => {
          console.log('[TableAccordions] Row clicked, toggling expanded');
          row.classList.toggle('expanded');
        });
        addedCount++;
      });

      console.log('[TableAccordions] Added click handlers to', addedCount, 'rows');
    }
  };

  // ============================================
  // INITIALIZE ALL FEATURES
  // ============================================
  function initAll() {
    ProgressTracker.init();
    Tabs.init();
    Accordion.init();
    Quiz.init();
    Search.init();
    TableAccordions.init();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }

  // Add CSS animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(100px); opacity: 0; } }
    @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
  `;
  document.head.appendChild(style);

})();
