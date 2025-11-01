-- Signal Pilot Education Hub - Supabase Database Setup
-- Run this SQL in your Supabase SQL Editor to set up the required tables

-- ========================================
-- 1. CREATE USER_PROGRESS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS user_progress (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  progress JSONB DEFAULT '{}'::jsonb,
  streak JSONB DEFAULT '{"current": 0, "best": 0}'::jsonb,
  notes JSONB DEFAULT '{}'::jsonb,
  last_synced TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one row per user
  CONSTRAINT user_progress_user_id_key UNIQUE (user_id)
);

-- ========================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- ========================================

CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_last_synced ON user_progress(last_synced);

-- ========================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================

ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 4. CREATE RLS POLICIES
-- ========================================

-- Policy: Users can view only their own progress
DROP POLICY IF EXISTS "Users can view their own progress" ON user_progress;
CREATE POLICY "Users can view their own progress"
  ON user_progress
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own progress
DROP POLICY IF EXISTS "Users can insert their own progress" ON user_progress;
CREATE POLICY "Users can insert their own progress"
  ON user_progress
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update only their own progress
DROP POLICY IF EXISTS "Users can update their own progress" ON user_progress;
CREATE POLICY "Users can update their own progress"
  ON user_progress
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete only their own progress
DROP POLICY IF EXISTS "Users can delete their own progress" ON user_progress;
CREATE POLICY "Users can delete their own progress"
  ON user_progress
  FOR DELETE
  USING (auth.uid() = user_id);

-- ========================================
-- 5. CREATE UPDATED_AT TRIGGER
-- ========================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function before update
DROP TRIGGER IF EXISTS update_user_progress_updated_at ON user_progress;
CREATE TRIGGER update_user_progress_updated_at
  BEFORE UPDATE ON user_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- 6. GRANT PERMISSIONS
-- ========================================

-- Grant authenticated users access to the table
GRANT SELECT, INSERT, UPDATE, DELETE ON user_progress TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE user_progress_id_seq TO authenticated;

-- ========================================
-- SETUP COMPLETE!
-- ========================================

-- Verify setup by running:
-- SELECT * FROM user_progress WHERE user_id = auth.uid();

-- ========================================
-- EXAMPLE QUERIES
-- ========================================

-- Check your own progress:
-- SELECT * FROM user_progress WHERE user_id = auth.uid();

-- View progress structure:
-- SELECT
--   user_id,
--   progress,
--   streak,
--   jsonb_array_length(notes::jsonb) as notes_count,
--   last_synced,
--   created_at
-- FROM user_progress
-- WHERE user_id = auth.uid();

-- Delete your progress (careful!):
-- DELETE FROM user_progress WHERE user_id = auth.uid();
