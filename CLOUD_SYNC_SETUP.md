# Cloud Sync Setup Guide 🔄☁️

This guide explains how to set up and verify cloud synchronization for user progress in Signal Pilot Education Hub.

---

## 📋 Prerequisites

1. ✅ Supabase account created
2. ✅ Supabase project created
3. ✅ `assets/config.js` configured with your Supabase URL and anon key

---

## 🗄️ Database Setup

### Step 1: Run the SQL Setup Script

1. Go to your Supabase Dashboard: https://app.supabase.com
2. Select your project
3. Click on **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `database-setup.sql` and paste it into the editor
6. Click **Run** (or press Ctrl+Enter)

This will create:
- ✅ `user_progress` table
- ✅ Indexes for performance
- ✅ Row Level Security (RLS) policies
- ✅ Auto-update triggers
- ✅ Proper permissions

### Step 2: Verify Database Setup

Run this query in the SQL Editor to verify setup:

```sql
SELECT * FROM user_progress WHERE user_id = auth.uid();
```

If you get an empty result (no errors), the setup is successful! ✅

---

## 🔄 How Cloud Sync Works

### On Sign In:

1. **User signs in** → Auth event triggered
2. **Load cloud progress** → Check if user has existing cloud data
3. **If cloud data exists:**
   - Load progress, streak, and notes from cloud
   - Overwrite local storage with cloud data
   - Reload page to show updated progress
4. **If no cloud data:**
   - Upload current local progress to cloud (first-time user)

### During Usage:

1. **Auto-sync every 5 minutes** → Upload current progress to cloud
2. **On page unload** → Upload current progress before leaving
3. **Manual sync** → User can click "Sync Progress Now" in user menu

### On Sign Out:

- Local progress remains in browser storage
- Cloud data is preserved in database
- Next sign-in will load cloud data and merge

---

## ✅ Verifying Cloud Sync is Working

### Test 1: Sign Up & First Sync

1. Create a new account (Sign Up)
2. Complete a lesson
3. Open browser console (F12)
4. Look for: `[Supabase] Progress synced to cloud`
5. In Supabase Dashboard → Table Editor → `user_progress`
6. You should see your user ID with progress data ✅

### Test 2: Cross-Device Sync

1. **Device A:** Sign in and complete 3 lessons
2. Wait 5 seconds (auto-sync happens)
3. **Device B:** Sign in with same account
4. Console should show: `[Supabase] ✅ Cloud progress loaded`
5. Page reloads and shows 3 completed lessons ✅

### Test 3: Manual Sync

1. Sign in
2. Click your username in header
3. Click "☁️ Sync Progress Now"
4. Console should show: `[Supabase] Progress synced to cloud`
5. Check database - `last_synced` timestamp should update ✅

---

## 🐛 Troubleshooting

### Issue: "Cannot sync: not authenticated"

**Cause:** User not signed in
**Solution:** Make sure user is signed in before testing sync

### Issue: "relation 'user_progress' does not exist"

**Cause:** Database table not created
**Solution:** Run `database-setup.sql` in Supabase SQL Editor

### Issue: "new row violates row-level security policy"

**Cause:** RLS policy blocking insert
**Solution:** Verify RLS policies are created correctly (step 4 in database-setup.sql)

### Issue: Cloud progress not loading on sign in

**Cause:** Multiple possible causes
**Solution:**
1. Check browser console for error messages
2. Verify `loadProgressFromCloud()` is being called
3. Check Supabase logs in Dashboard → Logs
4. Verify RLS policies allow SELECT for authenticated users

### Issue: Progress not syncing across devices

**Cause:** Page reload may be needed
**Solution:** After sign in, page should automatically reload. If not, manually refresh.

---

## 🔍 Checking Sync Status

### Browser Console Logs

When cloud sync is working, you should see:

```
[Supabase] Module loaded
[Supabase] Client initialized
[Supabase] Auth event: SIGNED_IN
[Supabase] ✅ Cloud progress loaded. Reloading page to show updated progress...
```

OR (for new users):

```
[Supabase] Auth event: SIGNED_IN
[Supabase] ℹ️ No cloud progress found. Syncing local progress to cloud...
[Supabase] Progress synced to cloud
```

### Database Inspection

In Supabase Dashboard → Table Editor → `user_progress`:

```
| user_id | progress | streak | notes | last_synced |
|---------|----------|--------|-------|-------------|
| abc-123 | {...}    | {...}  | {...} | 2025-11-01  |
```

- **progress:** JSON object with completed lessons
- **streak:** Current and best learning streaks
- **notes:** User's lesson notes
- **last_synced:** Last cloud sync timestamp

---

## 📊 What Gets Synced

### Progress Object

```json
{
  "sp_progress": {
    "lesson_1_completed": true,
    "lesson_2_completed": true,
    "tier_1_completed": true,
    ...
  }
}
```

### Streak Object

```json
{
  "current": 7,
  "best": 14,
  "last_activity": "2025-11-01"
}
```

### Notes Object

```json
{
  "lesson_1": "My notes for lesson 1...",
  "lesson_2": "My notes for lesson 2...",
  ...
}
```

---

## 🔒 Security Notes

### Row Level Security (RLS)

- ✅ Users can **only** access their own progress
- ✅ Users **cannot** view other users' data
- ✅ Users **cannot** modify other users' data
- ✅ All queries automatically filtered by `auth.uid()`

### Anon Key Safety

- ✅ Supabase anon keys are **safe** to commit to source control
- ✅ They're designed for client-side use
- ✅ Security enforced by RLS policies at database level
- ✅ Anon key only allows what RLS policies permit

---

## 🚀 Next Steps

1. ✅ Run `database-setup.sql` in Supabase SQL Editor
2. ✅ Test sign up and verify first sync
3. ✅ Test cross-device sync
4. ✅ Monitor Supabase logs for any errors
5. ✅ Enable email confirmations (optional, in Supabase Auth settings)

---

## 📞 Support

If you encounter issues:

1. Check browser console for error messages
2. Check Supabase Dashboard → Logs
3. Verify `assets/config.js` has correct credentials
4. Verify database table exists: `SELECT * FROM user_progress;`
5. Verify RLS policies exist: Supabase Dashboard → Authentication → Policies

---

## ✅ Cloud Sync Features

- ☁️ **Automatic sync** every 5 minutes
- 🔄 **Cross-device sync** - access progress from any device
- 📝 **Notes sync** - all lesson notes backed up
- 🏆 **Progress tracking** - completed lessons, streaks, achievements
- 🔒 **Secure** - RLS policies protect user data
- ⚡ **Fast** - efficient JSON storage and retrieval
- 📊 **Real-time** - updates reflected immediately

---

**Cloud sync is now set up and ready to use!** 🎉
