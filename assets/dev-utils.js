// Development utilities
// Wraps console methods to only log in development mode

(function() {
  'use strict';

  // Check if we're in development mode
  // In production, set ?debug=true in URL to enable logs
  const isDev = window.location.hostname === 'localhost' ||
                window.location.hostname === '127.0.0.1' ||
                window.location.search.includes('debug=true');

  // Store original console methods
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;
  const originalInfo = console.info;

  // Override console methods to only work in dev mode
  if (!isDev) {
    console.log = function() {};
    console.info = function() {};
    console.warn = function() {};
    // Keep console.error always enabled for critical issues
  }

  // Expose isDev flag globally if needed
  window.IS_DEV = isDev;

  // Helper function for conditional logging (can be used explicitly)
  window.devLog = function(...args) {
    if (isDev) {
      originalLog.apply(console, args);
    }
  };

  // Utility: Extract lesson ID from current URL
  // Returns the lesson path (e.g., 'beginner/01-the-liquidity-lie') or null
  window.getLessonId = function() {
    const match = window.location.pathname.match(/curriculum\/(.+)\.html/);
    return match ? match[1] : null;
  };
})();
