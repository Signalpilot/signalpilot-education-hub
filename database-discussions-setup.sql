-- Signal Pilot Education Hub - Discussion Threads Database Setup
-- Run this SQL in your Supabase SQL Editor to set up discussion threads

-- ========================================
-- 1. CREATE COMMENTS TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS comments (
  id BIGSERIAL PRIMARY KEY,
  lesson_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id BIGINT REFERENCES comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_deleted BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- 2. CREATE COMMENT_VOTES TABLE
-- ========================================

CREATE TABLE IF NOT EXISTS comment_votes (
  id BIGSERIAL PRIMARY KEY,
  comment_id BIGINT NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vote_type TEXT NOT NULL CHECK (vote_type IN ('up', 'down')),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Ensure one vote per user per comment
  CONSTRAINT comment_votes_unique UNIQUE (comment_id, user_id)
);

-- ========================================
-- 3. CREATE INDEXES FOR PERFORMANCE
-- ========================================

CREATE INDEX IF NOT EXISTS idx_comments_lesson_id ON comments(lesson_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON comments(user_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at);
CREATE INDEX IF NOT EXISTS idx_comment_votes_comment_id ON comment_votes(comment_id);
CREATE INDEX IF NOT EXISTS idx_comment_votes_user_id ON comment_votes(user_id);

-- ========================================
-- 4. ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE comment_votes ENABLE ROW LEVEL SECURITY;

-- ========================================
-- 5. CREATE RLS POLICIES FOR COMMENTS
-- ========================================

-- Policy: Anyone can view non-deleted comments
DROP POLICY IF EXISTS "Anyone can view comments" ON comments;
CREATE POLICY "Anyone can view comments"
  ON comments
  FOR SELECT
  USING (is_deleted = FALSE);

-- Policy: Authenticated users can insert comments
DROP POLICY IF EXISTS "Authenticated users can insert comments" ON comments;
CREATE POLICY "Authenticated users can insert comments"
  ON comments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own comments
DROP POLICY IF EXISTS "Users can update their own comments" ON comments;
CREATE POLICY "Users can update their own comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can soft-delete their own comments
DROP POLICY IF EXISTS "Users can delete their own comments" ON comments;
CREATE POLICY "Users can delete their own comments"
  ON comments
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- ========================================
-- 6. CREATE RLS POLICIES FOR COMMENT_VOTES
-- ========================================

-- Policy: Anyone can view votes
DROP POLICY IF EXISTS "Anyone can view votes" ON comment_votes;
CREATE POLICY "Anyone can view votes"
  ON comment_votes
  FOR SELECT
  USING (TRUE);

-- Policy: Authenticated users can insert votes
DROP POLICY IF EXISTS "Authenticated users can insert votes" ON comment_votes;
CREATE POLICY "Authenticated users can insert votes"
  ON comment_votes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own votes
DROP POLICY IF EXISTS "Users can delete their own votes" ON comment_votes;
CREATE POLICY "Users can delete their own votes"
  ON comment_votes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ========================================
-- 7. CREATE UPDATED_AT TRIGGER
-- ========================================

-- Trigger to update updated_at timestamp
DROP TRIGGER IF EXISTS update_comments_updated_at ON comments;
CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ========================================
-- 8. GRANT PERMISSIONS
-- ========================================

-- Grant authenticated users access to tables
GRANT SELECT, INSERT, UPDATE, DELETE ON comments TO authenticated;
GRANT SELECT, INSERT, DELETE ON comment_votes TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE comments_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE comment_votes_id_seq TO authenticated;

-- Grant anonymous users SELECT access (to view comments when not logged in)
GRANT SELECT ON comments TO anon;
GRANT SELECT ON comment_votes TO anon;

-- ========================================
-- SETUP COMPLETE!
-- ========================================

-- Verify setup by running:
-- SELECT * FROM comments WHERE lesson_id = 'test';

-- ========================================
-- EXAMPLE QUERIES
-- ========================================

-- View all comments for a lesson:
-- SELECT c.*, u.email as user_email
-- FROM comments c
-- JOIN auth.users u ON c.user_id = u.id
-- WHERE c.lesson_id = 'beginner-10-stop-losses'
-- ORDER BY c.created_at DESC;

-- Count votes for a comment:
-- SELECT comment_id, COUNT(*) as vote_count
-- FROM comment_votes
-- WHERE vote_type = 'up'
-- GROUP BY comment_id;
