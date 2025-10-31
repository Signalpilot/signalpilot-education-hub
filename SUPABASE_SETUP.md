# Supabase Setup Guide

This guide will help you set up Supabase authentication and cloud sync for the Signal Pilot Education Hub.

## Overview

The Supabase integration provides:
- User authentication (sign up, sign in, password reset)
- Cloud progress sync (lesson completion, notes, streaks)
- Cross-device synchronization
- Optional account system (users can still use the app without signing in)

## Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or sign in
3. Click "New Project"
4. Fill in:
   - **Name**: Signal Pilot Education
   - **Database Password**: Generate a strong password (save it securely)
   - **Region**: Choose closest to your users
5. Click "Create new project"
6. Wait 2-3 minutes for project setup to complete

## Step 2: Get Your Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (looks like: `https://abcdefghij.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 3: Update Your Code

Open `/assets/supabase-client.js` and replace the placeholder values:

```javascript
// Replace these with your actual Supabase credentials
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
```

With your actual values:

```javascript
const SUPABASE_URL = 'https://abcdefghij.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

## Step 4: Create Database Table

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Paste this SQL:

```sql
-- Create user_progress table
CREATE TABLE user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  progress JSONB DEFAULT '{}'::jsonb,
  streak JSONB DEFAULT '{}'::jsonb,
  notes JSONB DEFAULT '{}'::jsonb,
  last_synced TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create index for faster lookups
CREATE INDEX idx_user_progress_user_id ON user_progress(user_id);

-- Enable Row Level Security
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Users can only read their own data
CREATE POLICY "Users can read own progress"
  ON user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can insert their own data
CREATE POLICY "Users can insert own progress"
  ON user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own data
CREATE POLICY "Users can update own progress"
  ON user_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own data
CREATE POLICY "Users can delete own progress"
  ON user_progress
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

4. Click "Run" or press `Cmd+Enter` / `Ctrl+Enter`
5. You should see "Success. No rows returned"

## Step 5: Configure Email Settings (Optional)

By default, Supabase sends confirmation emails. You can customize this:

1. Go to **Authentication** → **Email Templates**
2. Customize the templates if desired
3. For production, configure a custom SMTP provider in **Settings** → **Auth** → **SMTP Settings**

For development/testing, the default Supabase email service works fine.

## Step 6: Test the Integration

1. Open your site in a browser
2. You should see a "Sign In" button in the header
3. Click it and try creating an account
4. Check your email for the confirmation link
5. Click the confirmation link
6. Sign in to your account
7. Complete a lesson and verify progress syncs (check for cloud icon in header)

## Step 7: Verify Data in Supabase

1. Go to **Table Editor** in Supabase
2. Select the `user_progress` table
3. You should see your user's progress data

## Architecture Overview

### Authentication Flow

1. User clicks "Sign In" → `showAuthModal()` in `auth-ui.js`
2. User submits form → `supabaseAuth.signUp()` or `supabaseAuth.signIn()`
3. Supabase sends confirmation email
4. User clicks link → Supabase confirms account
5. User signs in → `onAuthStateChange()` fires
6. Progress loads from cloud → `loadProgressFromCloud()`

### Sync Flow

1. User completes lesson → saves to `localStorage`
2. Every 5 minutes → `syncProgressToCloud()` runs automatically
3. On page unload → final sync runs
4. On sign in → `loadProgressFromCloud()` merges cloud data with local data
5. Conflict resolution → most recent data wins

### Data Structure

```javascript
{
  user_id: "uuid",
  progress: {
    "01-the-liquidity-lie": {
      completed: true,
      completedAt: "2025-10-31T12:00:00Z",
      timeSpent: 900,
      scrollProgress: 100
    },
    // ... more lessons
  },
  streak: {
    current: 5,
    best: 12,
    lastDate: "2025-10-31"
  },
  notes: {
    "01-the-liquidity-lie": "My notes here...",
    // ... more notes
  },
  last_synced: "2025-10-31T12:05:00Z"
}
```

## Security Notes

- **anon key is public**: It's safe to expose in client-side code
- **Row Level Security (RLS)**: Ensures users can only access their own data
- **Password requirements**: Supabase enforces minimum 6 characters
- **Email verification**: Optional but recommended for production
- **Rate limiting**: Supabase has built-in rate limiting on auth endpoints

## Troubleshooting

### Users can't sign up

- Check browser console for errors
- Verify Supabase credentials are correct
- Check Supabase dashboard for auth errors
- Ensure email confirmation is working

### Progress not syncing

- Check browser console for errors
- Verify user is signed in (`currentUser` in console)
- Check Supabase **Table Editor** for data
- Verify RLS policies are correct

### Email confirmation not received

- Check spam folder
- Verify email settings in Supabase **Authentication** → **Settings**
- For production, use custom SMTP provider

### RLS errors

If you see "permission denied" errors:
1. Go to **Table Editor** → `user_progress` → **Policies**
2. Verify all 4 policies exist (SELECT, INSERT, UPDATE, DELETE)
3. Re-run the SQL from Step 4 if needed

## Optional: Disable Email Confirmation

For development/testing, you can disable email confirmation:

1. Go to **Authentication** → **Settings**
2. Scroll to "Email Confirmation"
3. Toggle off "Enable email confirmations"
4. Save

**Note**: Re-enable for production to prevent spam accounts.

## Adding to Other Sites (Main & Docs)

To add this auth system to your main site or docs site:

1. Copy these files:
   - `/assets/supabase-client.js`
   - `/assets/auth-ui.js`
   - `/assets/auth-ui.css`
2. Add to HTML `<head>`:
   ```html
   <link rel="stylesheet" href="/assets/auth-ui.css">
   ```
3. Add before `</body>`:
   ```html
   <script src="/assets/supabase-client.js"></script>
   <script src="/assets/auth-ui.js"></script>
   ```
4. Use the same Supabase credentials
5. Adjust sync logic based on what data you want to sync

## Next Steps

After setup is complete:

1. Test the complete user flow (sign up → verify → sign in → sync)
2. Test on multiple devices to verify cross-device sync
3. Monitor Supabase dashboard for usage and errors
4. Consider adding user profile page
5. Consider adding social auth (Google, GitHub, etc.)

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
