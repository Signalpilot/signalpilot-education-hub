-- Signal Pilot Education Hub - Library Data Migration
-- Run this SQL in your Supabase SQL Editor to add bookmarks, favorites, downloads, and activity tracking

-- ========================================
-- ADD NEW COLUMNS TO user_progress TABLE
-- ========================================

-- Add bookmarks column (for saved lessons)
ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS bookmarks JSONB DEFAULT '[]'::jsonb;

-- Add favorites column (for starred lessons)
ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS favorites JSONB DEFAULT '[]'::jsonb;

-- Add downloads column (for downloaded resources)
ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS downloads JSONB DEFAULT '[]'::jsonb;

-- Add activity column (for heatmap calendar data)
ALTER TABLE user_progress
ADD COLUMN IF NOT EXISTS activity JSONB DEFAULT '{}'::jsonb;

-- ========================================
-- CREATE INDEXES FOR PERFORMANCE
-- ========================================

CREATE INDEX IF NOT EXISTS idx_user_progress_bookmarks ON user_progress USING GIN (bookmarks);
CREATE INDEX IF NOT EXISTS idx_user_progress_favorites ON user_progress USING GIN (favorites);
CREATE INDEX IF NOT EXISTS idx_user_progress_activity ON user_progress USING GIN (activity);

-- ========================================
-- MIGRATION COMPLETE!
-- ========================================

-- Verify new columns were added:
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'user_progress'
AND column_name IN ('bookmarks', 'favorites', 'downloads', 'activity');

-- Expected output:
-- bookmarks  | jsonb | '[]'::jsonb
-- favorites  | jsonb | '[]'::jsonb
-- downloads  | jsonb | '[]'::jsonb
-- activity   | jsonb | '{}'::jsonb
