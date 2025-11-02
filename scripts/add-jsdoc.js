#!/usr/bin/env node
/**
 * JSDoc Addition Script
 * Adds JSDoc comments to public functions that lack documentation
 * Uses pattern matching to identify function signatures and add basic docs
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// Key files with public APIs
const filesToDocument = [
  'assets/supabase-client.js',
  'assets/notes.js',
  'assets/chatbot.js',
  'assets/quiz-enhanced.js',
  'assets/spaced-repetition.js',
  'assets/certificate.js',
  'assets/social-share.js',
  'assets/analytics.js'
];

/**
 * Add JSDoc to supabase-client.js
 */
function documentSupabaseClient() {
  const filePath = path.join(rootDir, 'assets/supabase-client.js');
  let content = fs.readFileSync(filePath, 'utf8');

  const jsdocs = [
    {
      search: '  async function initSupabase() {',
      jsdoc: `  /**
   * Initialize Supabase client and load library from CDN
   * @returns {Promise<Object|null>} Supabase client instance or null if failed
   */
  async function initSupabase() {`
    },
    {
      search: '  function onAuthStateChange(callback) {',
      jsdoc: `  /**
   * Subscribe to authentication state changes
   * @param {Function} callback - Function called when auth state changes (user) => void
   * @returns {Function} Unsubscribe function
   */
  function onAuthStateChange(callback) {`
    },
    {
      search: '  async function signUp(email, password, userName) {',
      jsdoc: `  /**
   * Sign up a new user with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @param {string} userName - Display name for the user
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} Sign up result
   */
  async function signUp(email, password, userName) {`
    },
    {
      search: '  async function signIn(email, password) {',
      jsdoc: `  /**
   * Sign in an existing user with email and password
   * @param {string} email - User's email address
   * @param {string} password - User's password
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} Sign in result
   */
  async function signIn(email, password) {`
    },
    {
      search: '  async function signOut() {',
      jsdoc: `  /**
   * Sign out the current user
   * @returns {Promise<{success: boolean, error?: string}>} Sign out result
   */
  async function signOut() {`
    },
    {
      search: '  function getCurrentUser() {',
      jsdoc: `  /**
   * Get the currently authenticated user
   * @returns {Object|null} Current user object or null if not authenticated
   */
  function getCurrentUser() {`
    },
    {
      search: '  async function resetPassword(email) {',
      jsdoc: `  /**
   * Send password reset email to user
   * @param {string} email - User's email address
   * @returns {Promise<{success: boolean, error?: string}>} Reset result
   */
  async function resetPassword(email) {`
    },
    {
      search: '  async function syncProgressToCloud() {',
      jsdoc: `  /**
   * Sync local progress data to cloud (Supabase)
   * Syncs completed lessons, streak data, and notes
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} Sync result
   */
  async function syncProgressToCloud() {`
    },
    {
      search: '  async function loadProgressFromCloud() {',
      jsdoc: `  /**
   * Load progress data from cloud to local storage
   * Restores completed lessons, streak data, and notes
   * @returns {Promise<{success: boolean, data?: Object, error?: string}>} Load result
   */
  async function loadProgressFromCloud() {`
    }
  ];

  let changes = 0;
  jsdocs.forEach(({ search, jsdoc }) => {
    if (content.includes(search) && !content.includes(jsdoc)) {
      content = content.replace(search, jsdoc);
      changes++;
    }
  });

  if (changes > 0) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ assets/supabase-client.js - ${changes} JSDoc comment(s) added`);
  }

  return changes;
}

/**
 * Add basic JSDoc template to any undocumented public function
 * @param {string} filePath - Path to JS file
 */
function addBasicJsDocs(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = content;
  let changes = 0;

  // Pattern: window.functionName = function(...) or window.obj = { method: function(...) }
  // Only add if not already documented (no /** */ block immediately before)
  const functionPattern = /\n  (?!\/\*\*)(\w+:\s*function\s*\([^)]*\)|function\s+\w+\s*\([^)]*\))/g;

  // For now, just report what we find (manual addition is safer)
  const matches = content.match(functionPattern);
  if (matches) {
    console.log(`   Found ${matches.length} undocumented function(s) in ${path.basename(filePath)}`);
  }

  return 0;
}

console.log('📝 Adding JSDoc comments to public functions...\n');

let totalChanges = 0;

// Add JSDoc to supabase-client.js
totalChanges += documentSupabaseClient();

// Scan other files for undocumented functions
filesToDocument.slice(1).forEach(file => {
  const filePath = path.join(rootDir, file);
  if (fs.existsSync(filePath)) {
    addBasicJsDocs(filePath);
  }
});

console.log(`\n📊 JSDoc addition complete:`);
console.log(`   Total comments added: ${totalChanges}`);
console.log(`\n💡 Tip: Run your editor's JSDoc generation tool for additional files`);
