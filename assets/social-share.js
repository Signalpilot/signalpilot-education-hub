// Social Sharing - Enhanced with completion milestones
(function() {
  'use strict';

  /**
   * Share on Twitter
   * @param {string} text - Text to share
   * @param {string} url - URL to share
   */
  function shareOnTwitter(text, url) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');

    // Track analytics
    if (window.trackEvent) {
      window.trackEvent('social_share', { platform: 'twitter', type: text.includes('completed') ? 'completion' : 'lesson' });
    }
  }

  /**
   * Share on LinkedIn
   * @param {string} url - URL to share
   */
  function shareOnLinkedIn(url) {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(linkedInUrl, '_blank', 'width=550,height=420');

    // Track analytics
    if (window.trackEvent) {
      window.trackEvent('social_share', { platform: 'linkedin' });
    }
  }

  /**
   * Copy link to clipboard
   * @param {string} url - URL to copy
   */
  function copyToClipboard(url) {
    navigator.clipboard.writeText(url).then(() => {
      showShareToast('✅ Link copied to clipboard!');

      // Track analytics
      if (window.trackEvent) {
        window.trackEvent('social_share', { platform: 'clipboard' });
      }
    }).catch(() => {
      showShareToast('❌ Could not copy link');
    });
  }

  /**
   * Show toast notification
   */
  function showShareToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, rgba(91, 138, 255, 0.95), rgba(118, 221, 255, 0.95));
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      font-weight: 600;
      animation: slideIn 0.3s ease;
    `;
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Check for completion milestones and offer sharing
   */
  function checkCompletionMilestones() {
    // Count total completed lessons
    const allCompleted = Object.keys(localStorage).filter(k =>
      k.startsWith('sp_edu_') && k.endsWith('_completed') && !k.includes('_ach_')
    ).length;

    // Count tier-specific completions
    const beginnerCompleted = Object.keys(localStorage).filter(k =>
      k.startsWith('sp_edu_beginner_') && k.endsWith('_completed')
    ).length;

    const intermediateCompleted = Object.keys(localStorage).filter(k =>
      k.startsWith('sp_edu_intermediate_') && k.endsWith('_completed')
    ).length;

    const advancedCompleted = Object.keys(localStorage).filter(k =>
      k.startsWith('sp_edu_advanced_') && k.endsWith('_completed')
    ).length;

    // Tier thresholds
    const BEGINNER_TOTAL = 20;
    const INTERMEDIATE_TOTAL = 27;
    const ADVANCED_TOTAL = 35;
    const TOTAL_LESSONS = 82;

    // Define milestones with tier-specific tracking
    const milestones = [
      { count: 1, key: 'first', name: 'your first lesson', type: 'total' },
      { count: 5, key: '5_lessons', name: '5 lessons', type: 'total' },
      { count: BEGINNER_TOTAL, key: 'beginner_tier', name: 'Beginner Tier Complete (all 20 beginner lessons)', type: 'tier', tier: 'beginner', tierCount: beginnerCompleted, tierTotal: BEGINNER_TOTAL },
      { count: INTERMEDIATE_TOTAL, key: 'intermediate_tier', name: 'Intermediate Tier Complete (all 27 intermediate lessons)', type: 'tier', tier: 'intermediate', tierCount: intermediateCompleted, tierTotal: INTERMEDIATE_TOTAL },
      { count: ADVANCED_TOTAL, key: 'advanced_tier', name: 'Advanced Tier Complete (all 35 advanced lessons)', type: 'tier', tier: 'advanced', tierCount: advancedCompleted, tierTotal: ADVANCED_TOTAL },
      { count: TOTAL_LESSONS, key: 'complete_mastery', name: 'all 82 lessons - Complete Mastery', type: 'total' }
    ];

    // Check each milestone
    milestones.forEach(milestone => {
      const sharedKey = `sp_shared_milestone_${milestone.key}`;

      // Skip if already shared
      if (localStorage.getItem(sharedKey)) return;

      let shouldTrigger = false;

      if (milestone.type === 'total') {
        // Total lesson count milestones
        shouldTrigger = (allCompleted === milestone.count);
      } else if (milestone.type === 'tier') {
        // Tier-specific milestones - only trigger when tier is 100% complete
        shouldTrigger = (milestone.tierCount === milestone.tierTotal);
      }

      if (shouldTrigger) {
        setTimeout(() => {
          showSharePrompt(milestone.key, milestone.name);
        }, 2000); // Show after 2 seconds
      }
    });
  }

  /**
   * Show share prompt for milestones
   */
  function showSharePrompt(milestoneKey, milestoneName) {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 99999;
      animation: fadeIn 0.3s ease;
    `;

    const card = document.createElement('div');
    card.style.cssText = `
      background: linear-gradient(135deg, #0a0e1a, #1a2332);
      border: 2px solid rgba(91, 138, 255, 0.3);
      border-radius: 16px;
      padding: 1.5rem;
      max-width: 500px;
      width: calc(100vw - 2rem);
      margin: 0 1rem;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
      box-sizing: border-box;
    `;

    // Add responsive padding for larger screens
    if (window.innerWidth > 480) {
      card.style.padding = '2rem';
    }

    // Stack buttons vertically on very small screens
    const isMobile = window.innerWidth < 380;
    const buttonContainer = isMobile
      ? 'display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem;'
      : 'display: flex; gap: 0.75rem; justify-content: center; margin-bottom: 1.5rem; flex-wrap: wrap;';

    const buttonStyle = isMobile
      ? 'width: 100%; font-size: 0.95rem; padding: 0.75rem 1rem;'
      : 'flex: 1; min-width: 130px; max-width: 200px; font-size: clamp(0.85rem, 3vw, 1rem); padding: 0.75rem 1rem;';

    card.innerHTML = `
      <div style="font-size: clamp(3rem, 8vw, 4rem); margin-bottom: 1rem;">🎉</div>
      <h2 style="margin: 0 0 1rem 0; color: #5b8aff; font-size: clamp(1.5rem, 5vw, 2rem);">Milestone Achieved!</h2>
      <p style="font-size: clamp(1rem, 3.5vw, 1.2rem); margin-bottom: 1.5rem;">You've completed ${milestoneName}!</p>
      <p style="color: var(--muted); margin-bottom: 2rem; font-size: clamp(0.9rem, 3vw, 1rem);">Share your progress and inspire others</p>

      <div style="${buttonContainer}">
        <button id="share-twitter" class="btn btn-primary" style="${buttonStyle}">
          Share on Twitter
        </button>
        <button id="share-linkedin" class="btn btn-primary" style="${buttonStyle}">
          Share on LinkedIn
        </button>
      </div>

      <button id="share-later" class="btn btn-ghost btn-sm">Maybe later</button>
    `;

    modal.appendChild(card);
    document.body.appendChild(modal);

    const shareText = `Just completed ${milestoneName} at Signal Pilot Education! 🚀 #Trading #Education`;
    const shareUrl = 'https://education.signalpilot.io';

    document.getElementById('share-twitter').onclick = () => {
      shareOnTwitter(shareText, shareUrl);
      localStorage.setItem(`sp_shared_milestone_${milestoneKey}`, 'true');
      modal.remove();
    };

    document.getElementById('share-linkedin').onclick = () => {
      shareOnLinkedIn(shareUrl);
      localStorage.setItem(`sp_shared_milestone_${milestoneKey}`, 'true');
      modal.remove();
    };

    document.getElementById('share-later').onclick = () => {
      localStorage.setItem(`sp_shared_milestone_${milestoneKey}`, 'true');
      modal.remove();
    };

    // Close on background click
    modal.onclick = (e) => {
      if (e.target === modal) {
        localStorage.setItem(`sp_shared_milestone_${milestoneKey}`, 'true');
        modal.remove();
      }
    };
  }

  /**
   * Add share buttons to lesson pages
   */
  function addShareButtons() {
    // Only add to lesson pages
    if (!window.location.pathname.includes('/curriculum/')) return;

    // Don't add if already exists
    if (document.querySelector('.social-share')) return;

    const nav = document.querySelector('.nav-article');
    if (!nav) return;

    // Create share section
    const shareSection = document.createElement('div');
    shareSection.className = 'social-share';
    shareSection.innerHTML = `
      <h4 style="margin: 0 0 1rem 0; font-size: 1rem;">Share this lesson:</h4>
      <div class="social-share-buttons">
        <a href="#" class="social-btn twitter" data-share="twitter" aria-label="Share on X (Twitter)">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          <span>X</span>
        </a>
        <a href="#" class="social-btn reddit" data-share="reddit" aria-label="Share on Reddit">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/></svg>
          <span>Reddit</span>
        </a>
        <a href="#" class="social-btn linkedin" data-share="linkedin" aria-label="Share on LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          <span>LinkedIn</span>
        </a>
        <a href="#" class="social-btn hacker-news" data-share="hackernews" aria-label="Share on Hacker News">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M0 24V0h24v24H0zM6.951 5.896l4.112 7.708v5.064h1.583v-4.972l4.148-7.799h-1.749l-2.457 4.875c-.372.745-.688 1.434-.688 1.434s-.297-.708-.651-1.434L8.831 5.896h-1.88z"/></svg>
          <span>HN</span>
        </a>
        <a href="#" class="social-btn copy-link" data-share="copy" aria-label="Copy link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          <span>Copy Link</span>
        </a>
      </div>
    `;

    // Insert before nav-article
    nav.parentNode.insertBefore(shareSection, nav);

    // Add click handlers
    shareSection.querySelectorAll('[data-share]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const type = btn.dataset.share;
        const url = window.location.href;
        const title = document.title.split('—')[0].trim();

        switch(type) {
          case 'twitter':
            shareOnTwitter(`Just learned about "${title}" on Signal Pilot Education 📚`, url);
            break;
          case 'reddit':
            window.open(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank');
            break;
          case 'linkedin':
            shareOnLinkedIn(url);
            break;
          case 'hackernews':
            window.open(`https://news.ycombinator.com/submitlink?u=${encodeURIComponent(url)}&t=${encodeURIComponent(title)}`, '_blank');
            break;
          case 'copy':
            copyToClipboard(url);
            break;
        }
      });
    });
  }

  // Initialize
  function init() {
    addShareButtons();
    checkCompletionMilestones();
    logger.log('[Social Share] Initialized');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export public API
  window.socialShare = {
    shareOnTwitter,
    shareOnLinkedIn,
    copyToClipboard,
    checkMilestones: checkCompletionMilestones
  };

})();
