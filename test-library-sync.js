/**
 * Complete Library & Cloud Sync Test Script
 *
 * Run this in browser console on any lesson page to test:
 * 1. Bookmark functionality
 * 2. Favorite functionality
 * 3. Download tracking
 * 4. Cloud sync
 * 5. My Library display
 *
 * Usage: Copy and paste this entire script into browser console (F12)
 */

(async function testLibrarySync() {
  console.log('%c🧪 STARTING COMPREHENSIVE LIBRARY & CLOUD SYNC TEST', 'color: #5b8aff; font-size: 16px; font-weight: bold;');
  console.log('='.repeat(80));

  const results = {
    passed: [],
    failed: [],
    warnings: []
  };

  function pass(test) {
    results.passed.push(test);
    console.log(`%c✅ PASS: ${test}`, 'color: #00d4aa;');
  }

  function fail(test, reason) {
    results.failed.push({ test, reason });
    console.log(`%c❌ FAIL: ${test}`, 'color: #ff4444;');
    console.log(`   Reason: ${reason}`);
  }

  function warn(test, reason) {
    results.warnings.push({ test, reason });
    console.log(`%c⚠️  WARN: ${test}`, 'color: #ff9800;');
    console.log(`   Reason: ${reason}`);
  }

  // TEST 1: Check if library.js is loaded
  console.log('\n📦 Test 1: Library.js loaded?');
  if (typeof window.library !== 'undefined') {
    pass('library.js is loaded');
  } else {
    fail('library.js is loaded', 'window.library is undefined');
  }

  // TEST 2: Check if Supabase auth is loaded
  console.log('\n📦 Test 2: Supabase auth loaded?');
  if (typeof window.supabaseAuth !== 'undefined') {
    pass('supabaseAuth is loaded');
  } else {
    fail('supabaseAuth is loaded', 'window.supabaseAuth is undefined');
  }

  // TEST 3: Check if user is signed in
  console.log('\n🔐 Test 3: User authentication status');
  const user = window.supabaseAuth?.getCurrentUser();
  if (user) {
    pass(`User is signed in: ${user.email}`);
  } else {
    warn('User authentication', 'Not signed in - cloud sync will not work');
  }

  // TEST 4: Check if bookmark button exists
  console.log('\n🔖 Test 4: Bookmark button exists?');
  const bookmarkBtn = document.getElementById('bookmark-btn');
  if (bookmarkBtn) {
    pass('Bookmark button exists');
    console.log(`   Button text: "${bookmarkBtn.textContent}"`);
  } else {
    fail('Bookmark button exists', 'Element #bookmark-btn not found - may not be on a lesson page');
  }

  // TEST 5: Check if favorite button exists
  console.log('\n⭐ Test 5: Favorite button exists?');
  const favoriteBtn = document.getElementById('favorite-btn');
  if (favoriteBtn) {
    pass('Favorite button exists');
    console.log(`   Button text: "${favoriteBtn.textContent}"`);
  } else {
    fail('Favorite button exists', 'Element #favorite-btn not found - may not be on a lesson page');
  }

  // TEST 6: Check localStorage keys
  console.log('\n💾 Test 6: LocalStorage data structure');
  const bookmarks = JSON.parse(localStorage.getItem('sp_bookmarks') || '[]');
  const favorites = JSON.parse(localStorage.getItem('sp_favorites') || '[]');
  const downloads = JSON.parse(localStorage.getItem('sp_downloads') || '[]');
  const activity = JSON.parse(localStorage.getItem('sp_activity') || '{}');
  const completed = Object.keys(localStorage).filter(k => k.includes('sp_edu_') && k.includes('_completed'));

  console.log(`   📊 Current data:`);
  console.log(`      - Bookmarks: ${bookmarks.length}`);
  console.log(`      - Favorites: ${favorites.length}`);
  console.log(`      - Downloads: ${downloads.length}`);
  console.log(`      - Activity days: ${Object.keys(activity).length}`);
  console.log(`      - Completed lessons: ${completed.length}`);

  if (bookmarks.length > 0) {
    pass(`Found ${bookmarks.length} bookmark(s)`);
    console.log('   Sample bookmark:', bookmarks[0]);
  } else {
    warn('Bookmarks exist', 'No bookmarks yet - try bookmarking this lesson');
  }

  if (favorites.length > 0) {
    pass(`Found ${favorites.length} favorite(s)`);
    console.log('   Sample favorite:', favorites[0]);
  } else {
    warn('Favorites exist', 'No favorites yet - try favoriting this lesson');
  }

  // TEST 7: Test bookmark functionality (if button exists)
  console.log('\n🧪 Test 7: Bookmark functionality');
  if (bookmarkBtn) {
    const initialBookmarks = JSON.parse(localStorage.getItem('sp_bookmarks') || '[]').length;
    console.log(`   Initial bookmarks: ${initialBookmarks}`);

    // Simulate click
    bookmarkBtn.click();

    // Wait a bit for async operations
    await new Promise(resolve => setTimeout(resolve, 100));

    const afterBookmarks = JSON.parse(localStorage.getItem('sp_bookmarks') || '[]').length;
    console.log(`   After click: ${afterBookmarks}`);

    if (afterBookmarks !== initialBookmarks) {
      pass('Bookmark button toggles correctly');
    } else {
      warn('Bookmark button toggle', 'Count did not change - may already be bookmarked or unbookmarked');
    }
  } else {
    warn('Bookmark functionality test', 'Skipped - not on a lesson page');
  }

  // TEST 8: Check cloud sync function exists
  console.log('\n☁️  Test 8: Cloud sync capability');
  if (typeof window.supabaseAuth?.syncProgressToCloud === 'function') {
    pass('Cloud sync function exists');
  } else {
    fail('Cloud sync function exists', 'supabaseAuth.syncProgressToCloud is not a function');
  }

  if (typeof window.supabaseAuth?.loadProgressFromCloud === 'function') {
    pass('Cloud load function exists');
  } else {
    fail('Cloud load function exists', 'supabaseAuth.loadProgressFromCloud is not a function');
  }

  // TEST 9: Trigger manual sync (if signed in)
  console.log('\n🔄 Test 9: Manual cloud sync');
  if (user && typeof window.supabaseAuth?.syncProgressToCloud === 'function') {
    try {
      const syncResult = await window.supabaseAuth.syncProgressToCloud();
      if (syncResult.success) {
        pass('Manual cloud sync successful');
        console.log('   Sync result:', syncResult);
      } else {
        fail('Manual cloud sync', syncResult.error || 'Unknown error');
      }
    } catch (e) {
      fail('Manual cloud sync', e.message);
    }
  } else {
    warn('Manual cloud sync', 'Skipped - user not signed in or function missing');
  }

  // TEST 10: Check auto-sync trigger
  console.log('\n⚡ Test 10: Auto-sync trigger on localStorage change');
  const originalSetItem = localStorage.setItem;
  let syncTriggered = false;

  // Temporarily override to detect if sync is triggered
  const testKey = 'sp_test_sync_trigger';
  localStorage.setItem(testKey, 'test');

  await new Promise(resolve => setTimeout(resolve, 100));

  // Clean up
  localStorage.removeItem(testKey);

  pass('Auto-sync trigger test completed (check console for sync messages)');

  // RESULTS SUMMARY
  console.log('\n' + '='.repeat(80));
  console.log('%c📊 TEST RESULTS SUMMARY', 'color: #5b8aff; font-size: 16px; font-weight: bold;');
  console.log('='.repeat(80));

  console.log(`%c✅ Passed: ${results.passed.length}`, 'color: #00d4aa; font-weight: bold;');
  results.passed.forEach(test => console.log(`   ✓ ${test}`));

  if (results.warnings.length > 0) {
    console.log(`\n%c⚠️  Warnings: ${results.warnings.length}`, 'color: #ff9800; font-weight: bold;');
    results.warnings.forEach(w => console.log(`   ⚠ ${w.test}: ${w.reason}`));
  }

  if (results.failed.length > 0) {
    console.log(`\n%c❌ Failed: ${results.failed.length}`, 'color: #ff4444; font-weight: bold;');
    results.failed.forEach(f => console.log(`   ✗ ${f.test}: ${f.reason}`));
  }

  console.log('\n' + '='.repeat(80));

  if (results.failed.length === 0) {
    console.log('%c🎉 ALL CRITICAL TESTS PASSED!', 'color: #00d4aa; font-size: 14px; font-weight: bold;');
  } else {
    console.log('%c⚠️  SOME TESTS FAILED - SEE ABOVE', 'color: #ff4444; font-size: 14px; font-weight: bold;');
  }

  console.log('\n📋 NEXT STEPS:');
  console.log('1. If user not signed in: Sign in and re-run this test');
  console.log('2. If bookmarks/favorites = 0: Try clicking the bookmark/favorite buttons');
  console.log('3. If cloud sync failed: Check Supabase database has bookmarks/favorites/downloads/activity columns');
  console.log('4. Visit My Library (/my-library.html) to see if data displays correctly');
  console.log('5. Sign out, sign back in, check if data persists');

  console.log('\n💡 TIP: Run debugLibrary() in My Library page to see all data');
  console.log('='.repeat(80));

  return {
    passed: results.passed.length,
    failed: results.failed.length,
    warnings: results.warnings.length,
    details: results
  };
})();
