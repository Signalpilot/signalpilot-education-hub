// Supabase Client for Signal Pilot Education
(function() {
  'use strict';

  // Supabase Configuration - loaded from config.js
  const SUPABASE_URL = window.SUPABASE_CONFIG?.url || '';
  const SUPABASE_ANON_KEY = window.SUPABASE_CONFIG?.anonKey || '';

  // Check if config.js failed to load
  if (!window.SUPABASE_CONFIG) {
    console.error('[Supabase] ❌ config.js failed to load. Authentication will not work.');
    console.error('[Supabase] Make sure /assets/config.js exists and is accessible.');
  }

  // Initialize Supabase client
  let supabase = null;

  /**
   * Initialize Supabase client and load library from CDN
   * @returns {Promise<Object|null>} Supabase client instance or null if failed
   */
  async function initSupabase() {
    // Load Supabase library from CDN if not already loaded
    if (typeof window.supabase === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      document.head.appendChild(script);

      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    }

    // Check if credentials are configured
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY ||
        SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_URL === 'YOUR_SUPABASE_URL_HERE' ||
        SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY_HERE') {
      console.error('[Supabase] ❌ Supabase credentials not configured properly.');
      console.error('[Supabase] Please check that /assets/config.js has valid url and anonKey.');
      return null;
    }

    // Create Supabase client
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    logger.log('[Supabase] Client initialized');
    return supabase;
  }

  // Auth State Management
  let currentUser = null;
  let authStateListeners = [];
  let isReloadingForCloudSync = false; // Prevent multiple simultaneous reloads

  // Subscribe to auth state changes
  /**
   * Subscribe to authentication state changes
   * @param {Function} callback - Function called when auth state changes (user) => void
   * @returns {Function} Unsubscribe function
   */
  function onAuthStateChange(callback) {
    authStateListeners.push(callback);

    // Return unsubscribe function
    return () => {
      authStateListeners = authStateListeners.filter(cb => cb !== callback);
    };
  }

  // Notify all listeners of auth state change
  function notifyAuthStateChange(user) {
    currentUser = user;
    authStateListeners.forEach(callback => callback(user));

    // Update UI
    updateAuthUI(user);
  }

  // Initialize auth listener
  async function initAuthListener() {
    if (!supabase) return;

    // Check if we just reloaded from a cloud load (prevent ANY reload logic)
    const justReloaded = sessionStorage.getItem('sp_just_loaded_from_cloud');
    if (justReloaded) {
      logger.log('[Supabase] ℹ️ Already loaded from cloud - skipping all reload logic');
      sessionStorage.removeItem('sp_just_loaded_from_cloud');

      // Still need to set up UI and auto-sync for the session
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        notifyAuthStateChange(session.user);
      }

      // Set up auth listener for future changes (sign out, etc.) but don't reload
      supabase.auth.onAuthStateChange(async (event, session) => {
        logger.log('[Supabase] Auth event:', event);

        if (event === 'SIGNED_OUT') {
          notifyAuthStateChange(null);
        } else if (event === 'USER_UPDATED') {
          notifyAuthStateChange(session?.user || null);
        }
        // Ignore SIGNED_IN events after reload
      });

      return; // Exit early - no reload logic
    }

    // Regular flow for first load - check for existing session
    const { data: { session } } = await supabase.auth.getSession();
    const hadExistingSession = !!session?.user;

    if (hadExistingSession) {
      logger.log('[Supabase] 🔄 Found existing session on page load');
    }

    // Set up auth listener - this will handle BOTH new sign-ins AND existing sessions
    supabase.auth.onAuthStateChange(async (event, session) => {
      logger.log('[Supabase] Auth event:', event);

      if (event === 'SIGNED_IN') {
        notifyAuthStateChange(session?.user || null);

        // Handle cloud sync ONLY if we haven't already processed a reload
        if (!isReloadingForCloudSync) {
          logger.log('[Supabase] 📝 SIGNED_IN event - loading cloud progress...');

          // Set flag immediately to prevent any duplicate reload attempts
          isReloadingForCloudSync = true;

          const loadResult = await loadProgressFromCloud();

          if (loadResult?.data) {
            logger.log('[Supabase] ✅ Cloud progress loaded. Reloading page...');
            sessionStorage.setItem('sp_just_loaded_from_cloud', 'true');
            setTimeout(() => window.location.reload(), 500);
          } else {
            // No cloud data, reset flag and sync local to cloud
            logger.log('[Supabase] ℹ️ No cloud progress found. Syncing local progress to cloud...');
            isReloadingForCloudSync = false;
            await syncProgressToCloud();
          }
        } else {
          logger.log('[Supabase] ℹ️ Skipping SIGNED_IN - reload already in progress');
        }
      } else if (event === 'USER_UPDATED') {
        notifyAuthStateChange(session?.user || null);
      } else if (event === 'SIGNED_OUT') {
        notifyAuthStateChange(null);
      }
    });

    // If there was an existing session, the SIGNED_IN event will fire automatically
    // No need for separate handling - the event handler above will process it
    if (hadExistingSession) {
      logger.log('[Supabase] ℹ️ Existing session will be handled by SIGNED_IN event');
    }
  }

  // Sign Up
  /**
   * Sign up a new user with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @param {string} userName - Display name for the user
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} Sign up result
   */
  async function signUp(email, password, userName) {
    if (!supabase) {
      logger.log('[Supabase] Not initialized, initializing now...');
      await initSupabase();

      if (!supabase) {
        return { success: false, error: 'Failed to initialize authentication. Please refresh the page and try again.' };
      }
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            user_name: userName
          }
        }
      });

      if (error) throw error;

      // Track signup
      if (typeof trackAchievement === 'function') {
        trackAchievement('account_created');
      }

      if (typeof plausible === 'function') {
        plausible('User Signed Up');
      }

      return { success: true, data };
    } catch (error) {
      console.error('[Supabase] Sign up error:', error);
      return { success: false, error: error.message };
    }
  }

  // Sign In
  /**
   * Sign in an existing user with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} Sign in result
   */
  async function signIn(email, password) {
    if (!supabase) {
      logger.log('[Supabase] Not initialized, initializing now...');
      await initSupabase();

      if (!supabase) {
        return { success: false, error: 'Failed to initialize authentication. Please refresh the page and try again.' };
      }
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (typeof plausible === 'function') {
        plausible('User Signed In');
      }

      return { success: true, data };
    } catch (error) {
      console.error('[Supabase] Sign in error:', error);
      return { success: false, error: error.message };
    }
  }

  // Sign Out
  /**
   * Sign out the current user
   * @returns {Promise<{success: boolean, error?: string}>} Sign out result
   */
  async function signOut() {
    if (!supabase) return;

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      // Clear UI and reload to show signed-out state
      logger.log('[Supabase] Signed out successfully, reloading...');
      setTimeout(() => {
        window.location.reload();
      }, 500);

      return { success: true };
    } catch (error) {
      console.error('[Supabase] Sign out error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get Current User
  /**
   * Get the currently authenticated user
   * @returns {Object|null} Current user object or null if not authenticated
   */
  function getCurrentUser() {
    return currentUser;
  }

  // Password Reset
  /**
   * Send password reset email to user
   * @param {string} email - User's email address
   * @returns {Promise<{success: boolean, error?: string}>} Reset result
   */
  async function resetPassword(email) {
    if (!supabase) {
      logger.log('[Supabase] Not initialized, initializing now...');
      await initSupabase();

      if (!supabase) {
        return { success: false, error: 'Failed to initialize authentication. Please refresh the page and try again.' };
      }
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password.html`
      });

      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('[Supabase] Password reset error:', error);
      return { success: false, error: error.message };
    }
  }

  // ========== PROGRESS SYNC ==========

  // Sync progress to cloud
  /**
   * Sync local progress data to cloud (Supabase)
   * Syncs completed lessons, streak data, and notes
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} Sync result
   */
  async function syncProgressToCloud() {
    if (!supabase || !currentUser) {
      logger.log('[Supabase] Cannot sync: not authenticated');
      return { success: false, error: 'Not authenticated' };
    }

    try {
      // Collect ALL progress from localStorage
      const progress = {};

      // Get all sp_edu_* keys (lesson completion, achievements, etc.)
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('sp_edu_') || key.startsWith('sp_learning') || key.startsWith('sp_lesson'))) {
          progress[key] = localStorage.getItem(key);
        }
      }

      const streak = JSON.parse(localStorage.getItem('sp_learning_streak') || '{"current": 0, "best": 0}');
      const notes = JSON.parse(localStorage.getItem('sp_lesson_notes') || '{}');
      const bookmarks = JSON.parse(localStorage.getItem('sp_bookmarks') || '[]');
      const favorites = JSON.parse(localStorage.getItem('sp_favorites') || '[]');
      const downloads = JSON.parse(localStorage.getItem('sp_downloads') || '[]');
      const activity = JSON.parse(localStorage.getItem('sp_activity') || '{}');

      logger.log('[Supabase] 📤 Syncing progress to cloud...', {
        progressKeys: Object.keys(progress).length,
        completedLessons: Object.keys(progress).filter(k => k.includes('_completed')).length,
        streakCurrent: streak.current,
        notesCount: Object.keys(notes).length,
        bookmarksCount: bookmarks.length,
        favoritesCount: favorites.length,
        downloadsCount: downloads.length,
        activityDays: Object.keys(activity).length
      });

      // Upsert to database
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: currentUser.id,
          progress: progress,
          streak: streak,
          notes: notes,
          bookmarks: bookmarks,
          favorites: favorites,
          downloads: downloads,
          activity: activity,
          last_synced: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        })
        .select();

      if (error) {
        console.error('[Supabase] ❌ Sync FAILED:', error);

        // Check if table doesn't exist
        if (error.code === '42P01' || error.message.includes('relation') || error.message.includes('does not exist')) {
          console.error('[Supabase] ❌ DATABASE TABLE NOT FOUND!');
          console.error('[Supabase] ⚠️ Please run database-setup.sql in your Supabase SQL Editor');
          console.error('[Supabase] 📄 See CLOUD_SYNC_SETUP.md for instructions');
          showSyncError('Database not set up. Please run database-setup.sql in Supabase.');
        } else {
          showSyncError(`Sync failed: ${error.message}`);
        }

        throw error;
      }

      logger.log('[Supabase] ✅ Progress synced to cloud successfully!', data);
      showSyncSuccess();

      // Update last sync time
      localStorage.setItem('sp_last_cloud_sync', Date.now());

      return { success: true, data };
    } catch (error) {
      console.error('[Supabase] Sync error:', error);
      return { success: false, error: error.message };
    }
  }

  // Load progress from cloud
  /**
   * Load progress data from cloud to local storage
   * Restores completed lessons, streak data, and notes
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} Load result
   */
  async function loadProgressFromCloud() {
    if (!supabase || !currentUser) {
      logger.log('[Supabase] Cannot load: not authenticated');
      return { success: false, error: 'Not authenticated' };
    }

    try {
      logger.log('[Supabase] 📥 Loading progress from cloud...');

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();

      if (error) {
        // No data found is ok (new user)
        if (error.code === 'PGRST116') {
          logger.log('[Supabase] ℹ️ No cloud progress found (new user)');
          return { success: true, data: null };
        }

        // Check if table doesn't exist
        if (error.code === '42P01' || error.message.includes('relation') || error.message.includes('does not exist')) {
          console.error('[Supabase] ❌ DATABASE TABLE NOT FOUND!');
          console.error('[Supabase] ⚠️ Please run database-setup.sql in your Supabase SQL Editor');
          console.error('[Supabase] 📄 See CLOUD_SYNC_SETUP.md for instructions');
          showSyncError('Database not set up. Please run database-setup.sql in Supabase.');
        }

        throw error;
      }

      if (data) {
        const completedLessons = Object.keys(data.progress || {}).filter(k => k.includes('_completed')).length;

        logger.log('[Supabase] 📥 Found cloud progress:', {
          progressKeys: Object.keys(data.progress || {}).length,
          completedLessons: completedLessons,
          streakCurrent: data.streak?.current,
          notesCount: Object.keys(data.notes || {}).length,
          bookmarksCount: (data.bookmarks || []).length,
          favoritesCount: (data.favorites || []).length,
          downloadsCount: (data.downloads || []).length,
          activityDays: Object.keys(data.activity || {}).length,
          lastSynced: data.last_synced
        });

        // Restore ALL individual progress keys to localStorage
        const progress = data.progress || {};
        for (const key in progress) {
          localStorage.setItem(key, progress[key]);
        }

        // Restore streak and notes
        localStorage.setItem('sp_learning_streak', JSON.stringify(data.streak || {}));
        localStorage.setItem('sp_lesson_notes', JSON.stringify(data.notes || {}));

        // Restore bookmarks, favorites, and downloads
        localStorage.setItem('sp_bookmarks', JSON.stringify(data.bookmarks || []));
        localStorage.setItem('sp_favorites', JSON.stringify(data.favorites || []));
        localStorage.setItem('sp_downloads', JSON.stringify(data.downloads || []));

        // Restore activity if it exists in cloud
        if (data.activity && Object.keys(data.activity).length > 0) {
          localStorage.setItem('sp_activity', JSON.stringify(data.activity));
          logger.log('[Supabase] 📊 Restored activity calendar from cloud');
        }

        localStorage.setItem('sp_last_cloud_sync', Date.now());

        // CRITICAL: Clear migration flag so My Library re-syncs if needed
        // This ensures all cloud-synced lessons get added to the activity calendar
        localStorage.removeItem('sp_activity_migrated');
        logger.log('[Supabase] 🔄 Cleared migration flag - My Library will re-sync with cloud data on next visit');

        logger.log('[Supabase] ✅ Progress loaded from cloud successfully!');
        logger.log(`[Supabase] ✅ Restored ${completedLessons} completed lessons`);
      }

      return { success: true, data };
    } catch (error) {
      console.error('[Supabase] ❌ Load error:', error);
      return { success: false, error: error.message };
    }
  }

  // Auto-sync progress periodically
  function startAutoSync() {
    if (!supabase || !currentUser) return;

    // Sync every 5 minutes
    setInterval(() => {
      if (currentUser) {
        syncProgressToCloud();
      }
    }, 5 * 60 * 1000);

    // Sync on page unload
    window.addEventListener('beforeunload', () => {
      if (currentUser) {
        syncProgressToCloud();
      }
    });
  }

  // ========== UI UPDATES ==========

  // Create and inject auth UI elements into header
  function createAuthUIElements() {
    const headerCtls = document.querySelector('.header-ctls');
    if (!headerCtls) {
      logger.log('[Supabase] No header-ctls found, skipping auth UI');
      return;
    }

    // Check if already created
    if (document.getElementById('auth-button')) {
      return; // Already exists
    }

    // Create cloud sync indicator
    const syncIndicator = document.createElement('div');
    syncIndicator.id = 'cloud-sync-indicator';
    syncIndicator.className = 'cloud-sync-indicator';
    syncIndicator.style.display = 'none';
    syncIndicator.innerHTML = '<span class="sync-icon">☁️</span>';
    syncIndicator.title = 'Progress synced to cloud';

    // Create auth button
    const authBtn = document.createElement('button');
    authBtn.id = 'auth-button';
    authBtn.className = 'btn btn-primary btn-sm';
    authBtn.textContent = 'Sign In';
    authBtn.onclick = showAuthModal;

    // Insert before menu toggle (so it appears before it on mobile)
    const menuToggle = headerCtls.querySelector('.menu-toggle');
    if (menuToggle) {
      headerCtls.insertBefore(syncIndicator, menuToggle);
      headerCtls.insertBefore(authBtn, menuToggle);
    } else {
      // No menu toggle, just append
      headerCtls.appendChild(syncIndicator);
      headerCtls.appendChild(authBtn);
    }

    logger.log('[Supabase] Auth UI elements created');
  }

  function updateAuthUI(user) {
    // Update auth button
    const authBtn = document.getElementById('auth-button');
    if (authBtn) {
      if (user) {
        const userName = user.user_metadata?.user_name || user.email.split('@')[0];
        authBtn.innerHTML = `
          <span style="margin-right: 0.5rem;">👤</span>
          <span>${userName}</span>
        `;
        // Use arrow function to ensure proper scope
        authBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          logger.log('[Supabase] Auth button clicked, showing user menu...');
          showUserMenu();
        };
      } else {
        authBtn.textContent = 'Sign In';
        authBtn.onclick = showAuthModal;
      }
    }

    // Show/hide cloud sync indicator
    const syncIndicator = document.getElementById('cloud-sync-indicator');
    if (syncIndicator) {
      syncIndicator.style.display = user ? 'block' : 'none';
    }
  }

  // Show sync success indicator
  function showSyncSuccess() {
    const syncIndicator = document.getElementById('cloud-sync-indicator');
    if (syncIndicator) {
      syncIndicator.innerHTML = '<span class="sync-icon">✅</span>';
      syncIndicator.title = 'Progress synced successfully';

      // Reset back to cloud icon after 3 seconds
      setTimeout(() => {
        syncIndicator.innerHTML = '<span class="sync-icon">☁️</span>';
        syncIndicator.title = 'Progress synced to cloud';
      }, 3000);
    }
  }

  // Show sync error notification
  function showSyncError(message) {
    // Create error notification
    const notification = document.createElement('div');
    notification.className = 'sync-error-notification';
    notification.innerHTML = `
      <div style="background: rgba(220, 38, 38, 0.95); color: white; padding: 1rem 1.5rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.3); max-width: 500px; margin: 1rem;">
        <div style="display: flex; align-items: start; gap: 0.75rem;">
          <span style="font-size: 1.5rem;">⚠️</span>
          <div style="flex: 1;">
            <strong style="display: block; margin-bottom: 0.5rem;">Cloud Sync Failed</strong>
            <p style="margin: 0; font-size: 0.9rem; opacity: 0.95;">${message}</p>
            <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; opacity: 0.9;">
              Check browser console (F12) for details.
            </p>
          </div>
          <button onclick="this.closest('.sync-error-notification').remove()" style="background: none; border: none; color: white; cursor: pointer; font-size: 1.2rem; padding: 0; opacity: 0.8;">✕</button>
        </div>
      </div>
    `;
    notification.style.position = 'fixed';
    notification.style.top = '80px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.style.animation = 'slideInRight 0.3s ease-out';

    document.body.appendChild(notification);

    // Auto-remove after 10 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 10000);

    // Update sync indicator to show error
    const syncIndicator = document.getElementById('cloud-sync-indicator');
    if (syncIndicator) {
      syncIndicator.innerHTML = '<span class="sync-icon" style="filter: grayscale(100%);">☁️</span>';
      syncIndicator.title = 'Cloud sync failed - click for details';
      syncIndicator.style.cursor = 'pointer';
      syncIndicator.onclick = () => {
        alert(`Cloud Sync Error:\n\n${message}\n\nPlease check the browser console (F12) for more details.`);
      };
    }
  }

  function showUserMenu() {
    try {
      console.log('[Supabase] 1. showUserMenu called');
      logger.log('[Supabase] 1. showUserMenu called');

      // Check if user is signed in
      if (!currentUser) {
        console.warn('[Supabase] No current user, cannot show menu');
        logger.warn('[Supabase] No current user, cannot show menu');
        return;
      }
      console.log('[Supabase] 2. Current user exists:', currentUser.email);
      logger.log('[Supabase] 2. Current user exists:', currentUser.email);

      // Remove any existing menu
      const existingMenu = document.querySelector('.user-menu-dropdown');
      console.log('[Supabase] 3. Checked for existing menu:', !!existingMenu);
      logger.log('[Supabase] 3. Checked for existing menu:', !!existingMenu);

      if (existingMenu) {
        console.log('[Supabase] Removing existing menu');
        logger.log('[Supabase] Removing existing menu');
        existingMenu.remove();
        return; // Toggle off if already open
      }

      console.log('[Supabase] 4. Creating user menu for:', currentUser.email);
      logger.log('[Supabase] 4. Creating user menu for:', currentUser.email);

    // Create dropdown menu with inline styles for guaranteed visibility
    const menu = document.createElement('div');
    menu.className = 'user-menu-dropdown';
    menu.style.cssText = `
      position: fixed !important;
      top: 70px !important;
      right: 20px !important;
      background: linear-gradient(135deg, rgba(10, 14, 26, 0.98), rgba(15, 20, 35, 0.98)) !important;
      backdrop-filter: blur(12px) !important;
      border: 1px solid rgba(91, 138, 255, 0.2) !important;
      border-radius: 12px;
      padding: 0.75rem;
      min-width: 220px;
      box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(91, 138, 255, 0.1) !important;
      z-index: 999999 !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      animation: slideDown 0.2s ease;
    `;

    menu.innerHTML = `
      <style>
        @keyframes slideDown {
          from { transform: translateY(-10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .user-menu-header-info {
          padding: 0.75rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          margin-bottom: 0.5rem;
        }
        .user-menu-header-info strong {
          display: block;
          color: var(--text, #ecf1ff);
          font-size: 1rem;
          margin-bottom: 0.25rem;
        }
        .user-menu-header-info p {
          color: var(--muted, #b7c2d9);
          font-size: 0.85rem;
          margin: 0;
        }
        .user-menu-btn {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          width: 100%;
          padding: 0.75rem;
          border: none;
          background: transparent;
          color: var(--text, #ecf1ff);
          text-align: left;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s ease;
          font-size: 0.95rem;
          font-family: inherit;
        }
        .user-menu-btn:hover {
          background: rgba(255, 255, 255, 0.08);
        }
        .user-menu-btn.danger:hover {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }
      </style>
      <div class="user-menu-header-info">
        <strong>${currentUser.user_metadata?.user_name || 'User'}</strong>
        <p>${currentUser.email}</p>
        <p style="font-size: 0.75rem; opacity: 0.7; margin-top: 0.5rem;">☁️ Auto-syncing to cloud</p>
      </div>
      <button class="user-menu-btn" onclick="window.location.href='/my-library.html'; event.stopPropagation();">
        📚 <span>My Library</span>
      </button>
      <button class="user-menu-btn danger" onclick="if(confirm('Sign out and reload page?')) { window.supabaseAuth.signOut(); } event.stopPropagation();">
        🚪 <span>Sign Out</span>
      </button>
    `;

    console.log('[Supabase] 5. Menu HTML created, appending to body...');
    logger.log('[Supabase] 5. Menu HTML created, appending to body...');
    document.body.appendChild(menu);
    console.log('[Supabase] 6. Menu appended! Should be visible now.');
    logger.log('[Supabase] 6. Menu appended! Should be visible now.');

    // Verify it was added
    const verify = document.querySelector('.user-menu-dropdown');
    console.log('[Supabase] 7. Verification - menu in DOM:', !!verify);
    logger.log('[Supabase] 7. Verification - menu in DOM:', !!verify);

    // Close on click outside
    setTimeout(() => {
      const closeHandler = (e) => {
        if (!menu.contains(e.target) && !e.target.closest('#auth-button')) {
          menu.remove();
          document.removeEventListener('click', closeHandler);
        }
      };
      document.addEventListener('click', closeHandler);
    }, 100);

    } catch (error) {
      console.error('[Supabase] ERROR in showUserMenu:', error);
      logger.log('[Supabase] Full error:', error.stack);
    }
  }

  function showAuthModal(mode = 'signin') {
    // This will be implemented in auth-ui.js
    if (typeof window.showAuthModal === 'function') {
      window.showAuthModal(mode);
    }
  }

  // ========== INITIALIZATION ==========

  async function init() {
    try {
      // Create auth UI elements first
      createAuthUIElements();

      await initSupabase();

      if (supabase) {
        await initAuthListener();
        startAutoSync();
        logger.log('[Supabase] Fully initialized');
      } else {
        logger.log('[Supabase] Running without cloud sync');
      }
    } catch (error) {
      console.error('[Supabase] Initialization error:', error);
    }
  }

  // Start initialization when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Helper: Trigger sync when progress changes
  // Call this function after completing lessons, updating notes, etc.
  function onProgressChange() {
    if (currentUser && supabase) {
      // Debounced sync - wait 2 seconds before syncing
      clearTimeout(window._progressSyncTimer);
      window._progressSyncTimer = setTimeout(() => {
        logger.log('[Supabase] Progress changed, syncing to cloud...');
        syncProgressToCloud();
      }, 2000);
    }
  }

  // Listen for localStorage changes (for progress updates)
  window.addEventListener('storage', (e) => {
    if (e.key && (e.key.startsWith('sp_edu_') || e.key.startsWith('sp_lesson') || e.key.startsWith('sp_learning') ||
                  e.key === 'sp_bookmarks' || e.key === 'sp_favorites' || e.key === 'sp_downloads' || e.key === 'sp_activity')) {
      onProgressChange();
    }
  });

  // Override localStorage.setItem to detect progress changes
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);

    // If progress-related key changed, trigger sync
    if (key && (key.startsWith('sp_edu_') || key.startsWith('sp_lesson') || key.startsWith('sp_learning') ||
                key === 'sp_bookmarks' || key === 'sp_favorites' || key === 'sp_downloads' || key === 'sp_activity')) {
      onProgressChange();
    }
  };

  // Export public API
  window.supabaseAuth = {
    signUp,
    signIn,
    signOut,
    resetPassword,
    getCurrentUser,
    onAuthStateChange,
    syncProgressToCloud,
    loadProgressFromCloud,
    onProgressChange, // Export for manual trigger
    showUserMenu // Export for debugging/testing
  };

  logger.log('[Supabase] Module loaded');
})();
