// My Library - Download & Bookmark Tracking
(function() {
  'use strict';

  /**
   * Track when a user downloads a resource
   * @param {Object} resource - Resource details
   */
  function trackDownload(resource) {
    const downloads = JSON.parse(localStorage.getItem('sp_downloads') || '[]');

    // Check if already downloaded
    const exists = downloads.find(d => d.url === resource.url);
    if (exists) {
      logger.log('[Library] Resource already tracked:', resource.title);
      return;
    }

    downloads.push({
      id: resource.id || generateId(),
      title: resource.title,
      url: resource.url,
      lessonUrl: resource.lessonUrl || window.location.href,
      lessonTitle: resource.lessonTitle || document.title,
      date: new Date().toISOString(),
      type: resource.type || 'pdf'
    });

    localStorage.setItem('sp_downloads', JSON.stringify(downloads));
    logger.log('[Library] Download tracked:', resource.title);

    // Trigger cloud sync
    if (window.supabaseAuth?.onProgressChange) {
      window.supabaseAuth.onProgressChange();
    }

    showToast('📥 Resource added to My Library!');
  }

  /**
   * Add a bookmark
   * @param {Object} bookmark - Bookmark details
   */
  function addBookmark(bookmark) {
    const bookmarks = JSON.parse(localStorage.getItem('sp_bookmarks') || '[]');

    // Check if already bookmarked
    const exists = bookmarks.find(b => b.url === bookmark.url);
    if (exists) {
      logger.log('[Library] Already bookmarked:', bookmark.title);
      showToast('🔖 Already bookmarked!');
      return;
    }

    bookmarks.push({
      id: bookmark.id || generateId(),
      title: bookmark.title,
      url: bookmark.url || window.location.href,
      tier: bookmark.tier || 'Lesson',
      readTime: bookmark.readTime || '15 min read',
      date: new Date().toISOString()
    });

    localStorage.setItem('sp_bookmarks', JSON.stringify(bookmarks));
    logger.log('[Library] Bookmark added:', bookmark.title);

    // Trigger cloud sync
    if (window.supabaseAuth?.onProgressChange) {
      window.supabaseAuth.onProgressChange();
    }

    showToast('🔖 Bookmarked! View in My Library');
    updateBookmarkButton();
  }

  /**
   * Remove a bookmark
   * @param {string} url - URL to remove
   */
  function removeBookmark(url) {
    const bookmarks = JSON.parse(localStorage.getItem('sp_bookmarks') || '[]');
    const filtered = bookmarks.filter(b => b.url !== (url || window.location.href));
    localStorage.setItem('sp_bookmarks', JSON.stringify(filtered));
    logger.log('[Library] Bookmark removed');

    // Trigger cloud sync
    if (window.supabaseAuth?.onProgressChange) {
      window.supabaseAuth.onProgressChange();
    }

    showToast('Bookmark removed');
    updateBookmarkButton();
  }

  /**
   * Check if current page is bookmarked
   */
  function isBookmarked() {
    const bookmarks = JSON.parse(localStorage.getItem('sp_bookmarks') || '[]');
    return bookmarks.some(b => b.url === window.location.href);
  }

  /**
   * Update bookmark button state
   */
  function updateBookmarkButton() {
    const btn = document.getElementById('bookmark-btn');
    if (!btn) return;

    if (isBookmarked()) {
      btn.innerHTML = '⭐ Bookmarked';
      btn.classList.add('btn-secondary');
      btn.classList.remove('btn-ghost');
      btn.onclick = () => removeBookmark();
    } else {
      btn.innerHTML = '🔖 Bookmark';
      btn.classList.add('btn-ghost');
      btn.classList.remove('btn-secondary');
      btn.onclick = () => addBookmark({
        title: document.title,
        tier: document.querySelector('[name="sp-level"]')?.content || 'Lesson'
      });
    }
  }

  /**
   * Generate unique ID
   */
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  /**
   * Show toast notification
   */
  function showToast(message) {
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

    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease reverse';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Auto-track PDF downloads
   */
  function setupDownloadTracking() {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[download]');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || !href.includes('.pdf')) return;

      // Extract resource info
      const title = link.textContent.replace('Download', '').trim();
      const lessonTitle = document.querySelector('h1')?.textContent || document.title;

      trackDownload({
        title: title || 'Resource',
        url: href,
        lessonTitle: lessonTitle,
        lessonUrl: window.location.href
      });
    });
  }

  /**
   * Add bookmark button to lessons
   */
  function addBookmarkButton() {
    // Only on lesson pages
    if (!window.location.pathname.includes('/curriculum/')) return;

    const nav = document.querySelector('.nav-article');
    if (!nav) return;

    const btn = document.createElement('button');
    btn.id = 'bookmark-btn';
    btn.className = 'btn btn-ghost';
    btn.style.marginLeft = 'auto';

    // Insert before "Next Lesson" button
    const nextBtn = nav.querySelector('.btn-primary');
    if (nextBtn) {
      nav.insertBefore(btn, nextBtn);
    } else {
      nav.appendChild(btn);
    }

    updateBookmarkButton();
  }

  /**
   * Add print button for full lesson PDF
   */
  function addPrintButton() {
    // Only on lesson pages
    if (!window.location.pathname.includes('/curriculum/')) return;

    const nav = document.querySelector('.nav-article');
    if (!nav) return;

    const btn = document.createElement('button');
    btn.className = 'btn btn-ghost';
    btn.innerHTML = '📄 Save as PDF';
    btn.onclick = () => window.print();
    btn.title = 'Print or save this lesson as PDF';

    // Insert as second button
    const backBtn = nav.querySelector('.btn-ghost');
    if (backBtn && backBtn.nextSibling) {
      nav.insertBefore(btn, backBtn.nextSibling);
    } else {
      nav.appendChild(btn);
    }
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    setupDownloadTracking();
    addBookmarkButton();
    addPrintButton();
    logger.log('[Library] Initialized');
  }

  // Export public API
  window.library = window.library || {};
  Object.assign(window.library, {
    trackDownload,
    addBookmark,
    removeBookmark,
    isBookmarked
  });

})();
