/**
 * Trial CTA System - SignalPilot Education Hub
 *
 * Displays strategic calls-to-action to prompt free learners to start a trial.
 * CTAs are shown at various points throughout lesson pages.
 */

(function() {
  'use strict';

  // ========================================
  // Configuration
  // ========================================
  const CONFIG = {
    // Trial offer details
    trialDays: 14,
    trialUrl: '/pricing.html?trial=true',
    pricingUrl: '/pricing.html',

    // CTA trigger points
    inlineTriggerPercent: 50,      // Show inline CTA after 50% of content
    floatingTriggerPercent: 70,   // Show floating banner after 70% scroll
    completionTriggerPercent: 90, // Show completion CTA after 90% scroll

    // Display settings
    showInlineCTA: true,
    showFloatingCTA: true,
    showSidebarCTA: true,
    showCompletionCTA: true,

    // Dismissal settings (in hours)
    inlineDismissHours: 24,
    floatingDismissHours: 4,

    // A/B test variants (can be extended)
    ctaVariant: 'default',

    // Analytics event names
    analytics: {
      ctaView: 'trial_cta_view',
      ctaClick: 'trial_cta_click',
      ctaDismiss: 'trial_cta_dismiss'
    }
  };

  // ========================================
  // CTA Content Variants
  // ========================================
  const CTA_CONTENT = {
    inline: {
      default: {
        badge: '🚀 Pro Tip',
        title: 'Unlock Your Full Trading Potential',
        text: 'Get unlimited access to all 82 lessons, advanced indicators, and real-time market analysis with a free 14-day trial.',
        features: [
          'All 82 lessons unlocked',
          'Advanced SP indicators',
          'Real-time signals',
          'Priority support'
        ]
      },
      urgency: {
        badge: '⏰ Limited Time',
        title: 'Don\'t Miss Out on Pro Features',
        text: 'Serious traders upgrade to Pro. Start your free trial today and get full access to institutional-grade tools.',
        features: [
          'Complete curriculum',
          'Exclusive strategies',
          'Community access',
          'Weekly webinars'
        ]
      },
      value: {
        badge: '💡 Did You Know?',
        title: 'Pro Members See 3x Better Results',
        text: 'Our data shows Pro members complete the curriculum faster and report significantly better trading outcomes.',
        features: [
          'Structured learning path',
          'Progress tracking',
          'Certification',
          'Lifetime updates'
        ]
      }
    },

    completion: {
      default: {
        icon: '🎉',
        title: 'Great Progress! Ready for More?',
        text: 'You\'re learning fast! Unlock all 82 lessons and accelerate your trading education with a free Pro trial.',
        stats: {
          lessons: '82',
          hours: '40+',
          indicators: '12'
        }
      }
    },

    sidebar: {
      default: {
        icon: '⚡',
        title: 'Go Pro',
        text: 'Unlock the complete curriculum and advanced features.',
        features: [
          'All 82 lessons',
          'SP indicators',
          'Cloud sync',
          'Certificate'
        ]
      }
    },

    floating: {
      default: {
        icon: '🎯',
        title: 'Ready to level up?',
        subtitle: 'Start your free 14-day Pro trial'
      }
    }
  };

  // ========================================
  // State Management
  // ========================================
  const state = {
    userType: 'free', // 'free', 'trial', 'subscribed'
    isLoggedIn: false,
    lessonsCompleted: 0,
    currentLesson: null,
    ctasShown: new Set(),
    scrollPercent: 0
  };

  // ========================================
  // Utility Functions
  // ========================================

  function getUserState() {
    // Check if user is logged in via Supabase
    if (window.supabaseAuth && typeof window.supabaseAuth.getCurrentUser === 'function') {
      const user = window.supabaseAuth.getCurrentUser();
      state.isLoggedIn = !!user;

      // Check subscription status from user metadata (if available)
      if (user && user.user_metadata) {
        state.userType = user.user_metadata.subscription_type || 'free';
      }
    }

    // Count completed lessons from localStorage
    let completed = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes('_completed') && localStorage.getItem(key) === 'true') {
        completed++;
      }
    }
    state.lessonsCompleted = completed;

    // Get current lesson info from meta tags
    const levelMeta = document.querySelector('meta[name="sp-level"]');
    const orderMeta = document.querySelector('meta[name="sp-order"]');
    if (levelMeta && orderMeta) {
      state.currentLesson = {
        level: levelMeta.content,
        order: parseInt(orderMeta.content, 10)
      };
    }

    return state;
  }

  function shouldShowCTA() {
    // Don't show CTAs to subscribed users
    if (state.userType === 'subscribed') {
      document.body.classList.add('user-subscribed');
      return false;
    }
    return true;
  }

  function isDismissed(ctaType) {
    const dismissKey = `sp_cta_dismissed_${ctaType}`;
    const dismissed = localStorage.getItem(dismissKey);
    if (!dismissed) return false;

    const dismissedTime = parseInt(dismissed, 10);
    const hours = ctaType === 'floating' ? CONFIG.floatingDismissHours : CONFIG.inlineDismissHours;
    const expiryTime = dismissedTime + (hours * 60 * 60 * 1000);

    return Date.now() < expiryTime;
  }

  function dismissCTA(ctaType) {
    const dismissKey = `sp_cta_dismissed_${ctaType}`;
    localStorage.setItem(dismissKey, Date.now().toString());
    trackEvent(CONFIG.analytics.ctaDismiss, { cta_type: ctaType });
  }

  function trackEvent(eventName, data = {}) {
    // Integration with existing analytics
    if (window.spAnalytics && typeof window.spAnalytics.track === 'function') {
      window.spAnalytics.track(eventName, data);
    }

    // Also log to console in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('[Trial CTA]', eventName, data);
    }
  }

  function getScrollPercent() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    return Math.min(100, Math.round((scrollTop / docHeight) * 100));
  }

  function getContentVariant(ctaType) {
    const variants = CTA_CONTENT[ctaType];
    const variantKey = CONFIG.ctaVariant;
    return variants[variantKey] || variants.default;
  }

  // ========================================
  // CTA Renderers
  // ========================================

  function renderInlineCTA() {
    const content = getContentVariant('inline');

    return `
      <div class="trial-cta trial-cta-inline" data-cta-type="inline">
        <span class="trial-cta-inline__badge">${content.badge}</span>
        <h3 class="trial-cta-inline__title">${content.title}</h3>
        <p class="trial-cta-inline__text">${content.text}</p>
        <div class="trial-cta-inline__features">
          ${content.features.map(f => `
            <span class="trial-cta-inline__feature">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"/>
              </svg>
              ${f}
            </span>
          `).join('')}
        </div>
        <div class="trial-cta-inline__actions">
          <a href="${CONFIG.trialUrl}" class="trial-cta-btn trial-cta-btn--primary" data-cta-action="start-trial">
            Start Free Trial
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"/>
            </svg>
          </a>
          <a href="${CONFIG.pricingUrl}" class="trial-cta-btn trial-cta-btn--secondary" data-cta-action="view-pricing">
            View Pricing
          </a>
        </div>
        <div class="trial-cta-trust">
          <span>✓ No credit card required</span>
          <span>✓ Cancel anytime</span>
          <span>✓ ${CONFIG.trialDays}-day free trial</span>
        </div>
      </div>
    `;
  }

  function renderCompletionCTA() {
    const content = getContentVariant('completion');
    const nextLesson = state.currentLesson ? state.currentLesson.order + 1 : 1;

    return `
      <div class="trial-cta trial-cta-completion" data-cta-type="completion">
        <div class="trial-cta-completion__icon">${content.icon}</div>
        <h3 class="trial-cta-completion__title">${content.title}</h3>
        <p class="trial-cta-completion__text">${content.text}</p>
        <div class="trial-cta-completion__stats">
          <div class="trial-cta-completion__stat">
            <span class="trial-cta-completion__stat-value">${content.stats.lessons}</span>
            <span class="trial-cta-completion__stat-label">Lessons</span>
          </div>
          <div class="trial-cta-completion__stat">
            <span class="trial-cta-completion__stat-value">${content.stats.hours}</span>
            <span class="trial-cta-completion__stat-label">Hours Content</span>
          </div>
          <div class="trial-cta-completion__stat">
            <span class="trial-cta-completion__stat-value">${content.stats.indicators}</span>
            <span class="trial-cta-completion__stat-label">SP Indicators</span>
          </div>
        </div>
        <div class="trial-cta-completion__actions">
          <a href="${CONFIG.trialUrl}" class="trial-cta-btn trial-cta-btn--white trial-cta-btn--lg" data-cta-action="start-trial">
            Start Free ${CONFIG.trialDays}-Day Trial
          </a>
          <a href="${CONFIG.pricingUrl}" class="trial-cta-btn trial-cta-btn--ghost" data-cta-action="view-pricing">
            Compare Plans
          </a>
        </div>
      </div>
    `;
  }

  function renderSidebarCTA() {
    const content = getContentVariant('sidebar');

    return `
      <div class="trial-cta trial-cta-sidebar" data-cta-type="sidebar">
        <div class="trial-cta-sidebar__icon">${content.icon}</div>
        <h4 class="trial-cta-sidebar__title">${content.title}</h4>
        <p class="trial-cta-sidebar__text">${content.text}</p>
        <ul class="trial-cta-sidebar__list">
          ${content.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
        <a href="${CONFIG.trialUrl}" class="trial-cta-btn trial-cta-btn--primary trial-cta-btn--sm" style="width: 100%;" data-cta-action="start-trial">
          Try Free for ${CONFIG.trialDays} Days
        </a>
      </div>
    `;
  }

  function renderFloatingCTA() {
    const content = getContentVariant('floating');

    const html = `
      <div class="trial-cta trial-cta-floating" data-cta-type="floating" id="trial-cta-floating">
        <div class="trial-cta-floating__content">
          <span class="trial-cta-floating__icon">${content.icon}</span>
          <div class="trial-cta-floating__text">
            <p class="trial-cta-floating__title">${content.title}</p>
            <p class="trial-cta-floating__subtitle">${content.subtitle}</p>
          </div>
        </div>
        <div class="trial-cta-floating__actions">
          <a href="${CONFIG.trialUrl}" class="trial-cta-btn trial-cta-btn--primary trial-cta-btn--sm" data-cta-action="start-trial">
            Start Free Trial
          </a>
          <button class="trial-cta-floating__close" data-cta-action="dismiss" aria-label="Dismiss">×</button>
        </div>
      </div>
    `;

    // Append to body
    const container = document.createElement('div');
    container.innerHTML = html;
    document.body.appendChild(container.firstElementChild);

    return document.getElementById('trial-cta-floating');
  }

  // ========================================
  // CTA Injection Functions
  // ========================================

  function injectInlineCTA() {
    if (!CONFIG.showInlineCTA || isDismissed('inline')) return;

    // Find the prose content area
    const prose = document.querySelector('.prose');
    if (!prose) return;

    // Find all section breaks (usually <hr> or headings)
    const sections = prose.querySelectorAll('h2, h3, hr');
    if (sections.length < 2) return;

    // Insert CTA after ~50% of sections
    const insertIndex = Math.floor(sections.length * (CONFIG.inlineTriggerPercent / 100));
    const insertPoint = sections[Math.min(insertIndex, sections.length - 1)];

    // Check if there's already a CTA placeholder
    const placeholder = prose.querySelector('[data-cta-placeholder="inline"]');
    if (placeholder) {
      placeholder.outerHTML = renderInlineCTA();
    } else if (insertPoint) {
      insertPoint.insertAdjacentHTML('afterend', renderInlineCTA());
    }

    trackEvent(CONFIG.analytics.ctaView, { cta_type: 'inline' });
    state.ctasShown.add('inline');
  }

  function injectSidebarCTA() {
    if (!CONFIG.showSidebarCTA) return;

    // Find the sidebar
    const sidebar = document.querySelector('.toc-sidebar, aside.toc');
    if (!sidebar) return;

    // Check if there's already a CTA placeholder
    const placeholder = sidebar.querySelector('[data-cta-placeholder="sidebar"]');
    if (placeholder) {
      placeholder.outerHTML = renderSidebarCTA();
    } else {
      // Insert after lesson actions
      const lessonActions = sidebar.querySelector('.lesson-actions');
      if (lessonActions) {
        lessonActions.insertAdjacentHTML('afterend', renderSidebarCTA());
      } else {
        sidebar.insertAdjacentHTML('beforeend', renderSidebarCTA());
      }
    }

    trackEvent(CONFIG.analytics.ctaView, { cta_type: 'sidebar' });
    state.ctasShown.add('sidebar');
  }

  function injectCompletionCTA() {
    if (!CONFIG.showCompletionCTA) return;

    // Find the navigation section at the end
    const navArticle = document.querySelector('.nav-article, nav.article-nav');
    const discussionSection = document.querySelector('.discussion-section');
    const relatedLessons = document.querySelector('[class*="related"]');

    // Check if there's already a CTA placeholder
    const placeholder = document.querySelector('[data-cta-placeholder="completion"]');

    if (placeholder) {
      placeholder.outerHTML = renderCompletionCTA();
    } else {
      // Insert before navigation or discussion section
      const insertBefore = navArticle || discussionSection || relatedLessons;
      if (insertBefore) {
        insertBefore.insertAdjacentHTML('beforebegin', renderCompletionCTA());
      }
    }

    trackEvent(CONFIG.analytics.ctaView, { cta_type: 'completion' });
    state.ctasShown.add('completion');
  }

  function initFloatingCTA() {
    if (!CONFIG.showFloatingCTA || isDismissed('floating')) return;

    const floatingCTA = renderFloatingCTA();
    let hasShown = false;

    // Show on scroll
    function checkScroll() {
      const scrollPercent = getScrollPercent();

      if (scrollPercent >= CONFIG.floatingTriggerPercent && !hasShown) {
        floatingCTA.classList.add('visible');
        hasShown = true;
        trackEvent(CONFIG.analytics.ctaView, { cta_type: 'floating' });
        state.ctasShown.add('floating');
      }
    }

    // Throttled scroll handler
    let ticking = false;
    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          checkScroll();
          ticking = false;
        });
        ticking = true;
      }
    });

    // Handle dismiss
    floatingCTA.querySelector('[data-cta-action="dismiss"]').addEventListener('click', function() {
      floatingCTA.classList.remove('visible');
      dismissCTA('floating');
    });
  }

  // ========================================
  // Click Tracking
  // ========================================

  function initClickTracking() {
    document.addEventListener('click', function(e) {
      const ctaAction = e.target.closest('[data-cta-action]');
      if (!ctaAction) return;

      const action = ctaAction.dataset.ctaAction;
      const ctaContainer = ctaAction.closest('[data-cta-type]');
      const ctaType = ctaContainer ? ctaContainer.dataset.ctaType : 'unknown';

      trackEvent(CONFIG.analytics.ctaClick, {
        cta_type: ctaType,
        action: action,
        lesson: state.currentLesson ? `${state.currentLesson.level}-${state.currentLesson.order}` : 'unknown'
      });
    });
  }

  // ========================================
  // A/B Testing Support
  // ========================================

  function initABTest() {
    // Check for existing variant assignment
    let variant = localStorage.getItem('sp_cta_variant');

    if (!variant) {
      // Randomly assign variant (can be extended for more variants)
      const variants = ['default', 'urgency', 'value'];
      variant = variants[Math.floor(Math.random() * variants.length)];
      localStorage.setItem('sp_cta_variant', variant);
    }

    CONFIG.ctaVariant = variant;
  }

  // ========================================
  // Initialization
  // ========================================

  function init() {
    // Don't run on non-lesson pages
    if (!document.querySelector('.article, article')) return;

    // Get user state
    getUserState();

    // Check if we should show CTAs
    if (!shouldShowCTA()) return;

    // Initialize A/B testing
    initABTest();

    // Inject CTAs
    injectInlineCTA();
    injectSidebarCTA();
    initFloatingCTA();

    // Show completion CTA when user scrolls to end
    let completionShown = false;
    window.addEventListener('scroll', function() {
      if (completionShown) return;

      const scrollPercent = getScrollPercent();
      if (scrollPercent >= CONFIG.completionTriggerPercent) {
        injectCompletionCTA();
        completionShown = true;
      }
    });

    // Initialize click tracking
    initClickTracking();

    // Log initialization
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      console.log('[Trial CTA] Initialized', {
        userType: state.userType,
        isLoggedIn: state.isLoggedIn,
        lessonsCompleted: state.lessonsCompleted,
        variant: CONFIG.ctaVariant
      });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose API for external use
  window.TrialCTA = {
    init: init,
    config: CONFIG,
    state: state,
    trackEvent: trackEvent,
    dismissCTA: dismissCTA,

    // Manual CTA injection methods
    showInline: injectInlineCTA,
    showSidebar: injectSidebarCTA,
    showCompletion: injectCompletionCTA,
    showFloating: initFloatingCTA
  };

})();
