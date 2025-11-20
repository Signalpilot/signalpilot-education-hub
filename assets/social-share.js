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

    const nav = document.querySelector('.nav-article');
    if (!nav) return;

    // Create share button group
    const shareGroup = document.createElement('div');
    shareGroup.style.cssText = 'display: flex; gap: 0.5rem; align-items: center; margin-left: auto;';

    // Twitter button
    const twitterBtn = document.createElement('button');
    twitterBtn.className = 'btn btn-ghost btn-sm';
    twitterBtn.innerHTML = '🐦 Share';
    twitterBtn.title = 'Share on Twitter';
    twitterBtn.onclick = () => {
      const text = `Just learned about "${document.title.split('—')[0].trim()}" on Signal Pilot Education 📚`;
      shareOnTwitter(text, window.location.href);
    };

    // LinkedIn button
    const linkedinBtn = document.createElement('button');
    linkedinBtn.className = 'btn btn-ghost btn-sm';
    linkedinBtn.innerHTML = '💼';
    linkedinBtn.title = 'Share on LinkedIn';
    linkedinBtn.onclick = () => shareOnLinkedIn(window.location.href);

    // Copy link button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'btn btn-ghost btn-sm';
    copyBtn.innerHTML = '🔗';
    copyBtn.title = 'Copy link';
    copyBtn.onclick = () => copyToClipboard(window.location.href);

    shareGroup.appendChild(twitterBtn);
    shareGroup.appendChild(linkedinBtn);
    shareGroup.appendChild(copyBtn);

    // Insert before the "Next Lesson" button
    const nextBtn = nav.querySelector('.btn-primary');
    if (nextBtn) {
      nav.insertBefore(shareGroup, nextBtn);
    } else {
      nav.appendChild(shareGroup);
    }
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
