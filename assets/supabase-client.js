// Supabase Client for Signal Pilot Education
(function() {
  'use strict';

  // Supabase Configuration - loaded from config.js
  const SUPABASE_URL = window.SUPABASE_CONFIG?.url || '';
  const SUPABASE_ANON_KEY = window.SUPABASE_CONFIG?.anonKey || '';

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
    if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
      console.log('[Supabase] Not configured. Set credentials in supabase-client.js');
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
      notifyAuthStateChange(session.user);
    }

    // Listen for auth changes
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('[Supabase] Auth event:', event);

      if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
        notifyAuthStateChange(session?.user || null);

        // Sync progress after sign in
        if (event === 'SIGNED_IN') {
          syncProgressToCloud();
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
      return;
    }

    try {
      // Get local progress
      const progress = JSON.parse(localStorage.getItem('sp_progress') || '{}');
      const streak = JSON.parse(localStorage.getItem('sp_learning_streak') || '{"current": 0, "best": 0}');
      const notes = JSON.parse(localStorage.getItem('sp_lesson_notes') || '{}');

      // Upsert to database
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: currentUser.id,
          progress: progress,
          streak: streak,
          notes: notes,
          last_synced: new Date().toISOString()
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      console.log('[Supabase] Progress synced to cloud');

      // Update last sync time
      localStorage.setItem('sp_last_cloud_sync', Date.now());

      return { success: true };
    } catch (error) {
      console.error('[Supabase] Sync error:', error);
      return { success: false, error: error.message };
    }
  }

  // Load progress from cloud
  async function loadProgressFromCloud() {
    if (!supabase || !currentUser) {
      console.log('[Supabase] Cannot load: not authenticated');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', currentUser.id)
        .single();

      if (error) {
        // No data found is ok (new user)
        if (error.code === 'PGRST116') {
          console.log('[Supabase] No cloud progress found (new user)');
          return { success: true, data: null };
        }
        throw error;
      }

      if (data) {
        // Merge with local data (cloud takes precedence)
        localStorage.setItem('sp_progress', JSON.stringify(data.progress || {}));
        localStorage.setItem('sp_learning_streak', JSON.stringify(data.streak || {}));
        localStorage.setItem('sp_lesson_notes', JSON.stringify(data.notes || {}));
        localStorage.setItem('sp_last_cloud_sync', Date.now());

        console.log('[Supabase] Progress loaded from cloud');
      }

      return { success: true, data };
    } catch (error) {
      console.error('[Supabase] Load error:', error);
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

  // Export public API
  window.supabaseAuth = {
    signUp,
    signIn,
    signOut,
    resetPassword,
    getCurrentUser,
    onAuthStateChange,
    syncProgressToCloud,
    loadProgressFromCloud
  };

  console.log('[Supabase] Module loaded');
})();
