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

    console.log('[Supabase] Client initialized');
    return supabase;
  }

  // Auth State Management
  let currentUser = null;
  let authStateListeners = [];

  // Subscribe to auth state changes
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

    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      console.log('[Supabase] 🔄 Found existing session, loading cloud progress...');
      notifyAuthStateChange(session.user);

      // Check if we just reloaded from a cloud load (prevent infinite reload loop)
      const justReloaded = sessionStorage.getItem('sp_just_loaded_from_cloud');
      if (justReloaded) {
        console.log('[Supabase] ℹ️ Already loaded from cloud (preventing reload loop)');
        sessionStorage.removeItem('sp_just_loaded_from_cloud');
        return; // Don't load again
      }

      // CRITICAL FIX: Load cloud progress for existing sessions!
      // This was missing - only loaded on SIGNED_IN event, not existing sessions
      const loadResult = await loadProgressFromCloud();

      if (loadResult?.data) {
        console.log('[Supabase] ✅ Cloud progress loaded from existing session. Reloading...');
        // Set flag to prevent reload loop
        sessionStorage.setItem('sp_just_loaded_from_cloud', 'true');
        // Reload page to reflect loaded progress
        setTimeout(() => window.location.reload(), 500);
      } else {
        console.log('[Supabase] ℹ️ No cloud progress found. Syncing local progress to cloud...');
        // No cloud data, sync local progress up
        await syncProgressToCloud();
      }
    }

    // Listen for auth changes (NEW sign-ins, sign-outs, etc.)
    supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[Supabase] Auth event:', event);

      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        notifyAuthStateChange(session?.user || null);

        // Load and sync progress after NEW sign in
        if (event === 'SIGNED_IN') {
          // First, try to load cloud progress (if it exists)
          const loadResult = await loadProgressFromCloud();

          if (loadResult?.data) {
            console.log('[Supabase] ✅ Cloud progress loaded. Reloading page to show updated progress...');
            // Set flag to prevent reload loop
            sessionStorage.setItem('sp_just_loaded_from_cloud', 'true');
            // Reload page to reflect loaded progress
            setTimeout(() => window.location.reload(), 500);
          } else {
            console.log('[Supabase] ℹ️ No cloud progress found. Syncing local progress to cloud...');
            // No cloud data, sync local progress up
            await syncProgressToCloud();
          }
        }
      } else if (event === 'SIGNED_OUT') {
        notifyAuthStateChange(null);
      }
    });
  }

  // Sign Up
  async function signUp(email, password, userName) {
    if (!supabase) {
      console.log('[Supabase] Not initialized, initializing now...');
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
  async function signIn(email, password) {
    if (!supabase) {
      console.log('[Supabase] Not initialized, initializing now...');
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
  async function signOut() {
    if (!supabase) return;

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      return { success: true };
    } catch (error) {
      console.error('[Supabase] Sign out error:', error);
      return { success: false, error: error.message };
    }
  }

  // Get Current User
  function getCurrentUser() {
    return currentUser;
  }

  // Password Reset
  async function resetPassword(email) {
    if (!supabase) {
      console.log('[Supabase] Not initialized, initializing now...');
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
  async function syncProgressToCloud() {
    if (!supabase || !currentUser) {
      console.log('[Supabase] Cannot sync: not authenticated');
      return { success: false, error: 'Not authenticated' };
    }

    try {
      // Get local progress
      const progress = JSON.parse(localStorage.getItem('sp_progress') || '{}');
      const streak = JSON.parse(localStorage.getItem('sp_learning_streak') || '{"current": 0, "best": 0}');
      const notes = JSON.parse(localStorage.getItem('sp_lesson_notes') || '{}');

      console.log('[Supabase] 📤 Syncing progress to cloud...', {
        progressKeys: Object.keys(progress).length,
        streakCurrent: streak.current,
        notesCount: Object.keys(notes).length
      });

      // Upsert to database
      const { data, error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: currentUser.id,
          progress: progress,
          streak: streak,
          notes: notes,
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

      console.log('[Supabase] ✅ Progress synced to cloud successfully!', data);
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
  async function loadProgressFromCloud() {
    if (!supabase || !currentUser) {
      console.log('[Supabase] Cannot load: not authenticated');
      return { success: false, error: 'Not authenticated' };
    }

    try {
      console.log('[Supabase] 📥 Loading progress from cloud...');

      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();

      if (error) {
        // No data found is ok (new user)
        if (error.code === 'PGRST116') {
          console.log('[Supabase] ℹ️ No cloud progress found (new user)');
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
        console.log('[Supabase] 📥 Found cloud progress:', {
          progressKeys: Object.keys(data.progress || {}).length,
          streakCurrent: data.streak?.current,
          notesCount: Object.keys(data.notes || {}).length,
          lastSynced: data.last_synced
        });

        // Merge with local data (cloud takes precedence)
        localStorage.setItem('sp_progress', JSON.stringify(data.progress || {}));
        localStorage.setItem('sp_learning_streak', JSON.stringify(data.streak || {}));
        localStorage.setItem('sp_lesson_notes', JSON.stringify(data.notes || {}));
        localStorage.setItem('sp_last_cloud_sync', Date.now());

        console.log('[Supabase] ✅ Progress loaded from cloud successfully!');
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
      console.log('[Supabase] No header-ctls found, skipping auth UI');
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

    console.log('[Supabase] Auth UI elements created');
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
        authBtn.onclick = showUserMenu;
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
    // Create dropdown menu
    const menu = document.createElement('div');
    menu.className = 'user-menu-dropdown';
    menu.innerHTML = `
      <div class="user-menu-content">
        <div class="user-menu-header">
          <strong>${currentUser.user_metadata?.user_name || 'User'}</strong>
          <p>${currentUser.email}</p>
        </div>
        <hr>
        <button onclick="window.supabaseAuth.syncProgressToCloud()">
          ☁️ Sync Progress Now
        </button>
        <button onclick="window.location.href='/account.html'">
          ⚙️ Account Settings
        </button>
        <button onclick="window.supabaseAuth.signOut()">
          🚪 Sign Out
        </button>
      </div>
    `;

    document.body.appendChild(menu);

    // Close on click outside
    setTimeout(() => {
      document.addEventListener('click', function closeMenu(e) {
        if (!menu.contains(e.target)) {
          menu.remove();
          document.removeEventListener('click', closeMenu);
        }
      });
    }, 100);
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
        console.log('[Supabase] Fully initialized');
      } else {
        console.log('[Supabase] Running without cloud sync');
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
        console.log('[Supabase] Progress changed, syncing to cloud...');
        syncProgressToCloud();
      }, 2000);
    }
  }

  // Listen for localStorage changes (for progress updates)
  window.addEventListener('storage', (e) => {
    if (e.key && (e.key.includes('sp_progress') || e.key.includes('sp_lesson_notes') || e.key.includes('sp_learning_streak'))) {
      onProgressChange();
    }
  });

  // Override localStorage.setItem to detect progress changes
  const originalSetItem = localStorage.setItem;
  localStorage.setItem = function(key, value) {
    originalSetItem.apply(this, arguments);

    // If progress-related key changed, trigger sync
    if (key && (key.includes('sp_progress') || key.includes('sp_lesson_notes') || key.includes('sp_learning_streak'))) {
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
    onProgressChange // Export for manual trigger
  };

  console.log('[Supabase] Module loaded');
})();
