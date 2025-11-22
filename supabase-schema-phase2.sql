-- Signal Pilot Education Hub - Phase 2 Database Schema
-- Visualization & Practice Features
-- Run this SQL in your Supabase SQL Editor (after main schema)

-- ============================================
-- Scenario Challenges Table
-- ============================================

CREATE TABLE IF NOT EXISTS scenarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  chart_image_url TEXT,
  chart_data JSONB, -- For interactive charts
  context TEXT NOT NULL,
  difficulty VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced
  skill_category VARCHAR(50) NOT NULL, -- technical_analysis, order_flow, risk_management, psychology
  options JSONB NOT NULL, -- Array of {id, text, isCorrect, explanation}
  correct_answer_id VARCHAR(10) NOT NULL,
  explanation TEXT NOT NULL,
  time_limit_seconds INTEGER DEFAULT 60,
  points INTEGER DEFAULT 100,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

CREATE INDEX IF NOT EXISTS idx_scenarios_difficulty ON scenarios(difficulty);
CREATE INDEX IF NOT EXISTS idx_scenarios_skill_category ON scenarios(skill_category);
CREATE INDEX IF NOT EXISTS idx_scenarios_is_active ON scenarios(is_active);

-- ============================================
-- User Scenario Results Table
-- ============================================

CREATE TABLE IF NOT EXISTS user_scenario_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  scenario_id UUID REFERENCES scenarios(id) ON DELETE CASCADE NOT NULL,
  selected_answer_id VARCHAR(10) NOT NULL,
  is_correct BOOLEAN NOT NULL,
  time_taken_seconds INTEGER NOT NULL,
  score INTEGER DEFAULT 0, -- Based on time + correctness
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, scenario_id, completed_at) -- Allow multiple attempts
);

CREATE INDEX IF NOT EXISTS idx_user_scenario_results_user_id ON user_scenario_results(user_id);
CREATE INDEX IF NOT EXISTS idx_user_scenario_results_scenario_id ON user_scenario_results(scenario_id);
CREATE INDEX IF NOT EXISTS idx_user_scenario_results_completed_at ON user_scenario_results(completed_at);

-- ============================================
-- User Skills Tracking (extends user_progress)
-- ============================================

-- Add skills tracking to existing user_progress table
-- Skills are stored in JSONB format:
-- {
--   "technical_analysis": { "progress": 85, "lessons_completed": 15, "total_lessons": 20 },
--   "order_flow": { "progress": 60, "lessons_completed": 10, "total_lessons": 18 },
--   "risk_management": { "progress": 45, "lessons_completed": 8, "total_lessons": 15 },
--   "psychology": { "progress": 70, "lessons_completed": 12, "total_lessons": 18 }
-- }

-- Note: No schema change needed, use existing progress JSONB field
-- Add 'skills' key to user_progress.progress JSONB

-- ============================================
-- Time Tracking (extends user_progress)
-- ============================================

-- Time tracking stored in user_progress.progress JSONB:
-- {
--   "time_tracking": {
--     "total_seconds": 45600,
--     "by_lesson": {
--       "1": 1200,
--       "2": 900,
--       ...
--     },
--     "by_date": {
--       "2025-01-15": 3600,
--       "2025-01-16": 2400,
--       ...
--     }
--   }
-- }

-- ============================================
-- Scenario Challenge Leaderboard View
-- ============================================

CREATE OR REPLACE VIEW scenario_leaderboard AS
SELECT
  u.id AS user_id,
  u.email,
  u.raw_user_meta_data->>'userName' AS user_name,
  COUNT(DISTINCT usr.scenario_id) AS scenarios_completed,
  SUM(usr.score) AS total_score,
  AVG(usr.score) AS avg_score,
  SUM(CASE WHEN usr.is_correct THEN 1 ELSE 0 END) AS correct_count,
  COUNT(*) AS total_attempts,
  ROUND(
    (SUM(CASE WHEN usr.is_correct THEN 1 ELSE 0 END)::DECIMAL / COUNT(*)) * 100,
    2
  ) AS accuracy_percentage
FROM auth.users u
INNER JOIN user_scenario_results usr ON u.id = usr.user_id
GROUP BY u.id, u.email, u.raw_user_meta_data->>'userName'
ORDER BY total_score DESC, accuracy_percentage DESC;

-- ============================================
-- Function: Get User Skill Progress
-- ============================================

CREATE OR REPLACE FUNCTION get_user_skills(user_uuid UUID)
RETURNS JSONB AS $$
DECLARE
  skills_data JSONB;
BEGIN
  SELECT progress->'skills'
  INTO skills_data
  FROM user_progress
  WHERE user_id = user_uuid;

  RETURN COALESCE(skills_data, '{}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Function: Get User Time Stats
-- ============================================

CREATE OR REPLACE FUNCTION get_user_time_stats(user_uuid UUID)
RETURNS JSONB AS $$
DECLARE
  time_data JSONB;
BEGIN
  SELECT progress->'time_tracking'
  INTO time_data
  FROM user_progress
  WHERE user_id = user_uuid;

  RETURN COALESCE(time_data, '{"total_seconds": 0}'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Function: Calculate User Percentile
-- ============================================

CREATE OR REPLACE FUNCTION get_user_percentile(user_uuid UUID)
RETURNS NUMERIC AS $$
DECLARE
  user_time INTEGER;
  total_users INTEGER;
  users_below INTEGER;
  percentile NUMERIC;
BEGIN
  -- Get user's total time
  SELECT COALESCE((progress->'time_tracking'->>'total_seconds')::INTEGER, 0)
  INTO user_time
  FROM user_progress
  WHERE user_id = user_uuid;

  -- Count total users with time data
  SELECT COUNT(*)
  INTO total_users
  FROM user_progress
  WHERE (progress->'time_tracking'->>'total_seconds')::INTEGER > 0;

  -- Return 0 if no users or user has no time
  IF total_users = 0 OR user_time = 0 THEN
    RETURN 0;
  END IF;

  -- Count users with less time than current user
  SELECT COUNT(*)
  INTO users_below
  FROM user_progress
  WHERE (progress->'time_tracking'->>'total_seconds')::INTEGER < user_time
    AND (progress->'time_tracking'->>'total_seconds')::INTEGER > 0;

  -- Calculate percentile
  percentile := ROUND((users_below::NUMERIC / total_users::NUMERIC) * 100, 0);

  RETURN percentile;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- Enable Row Level Security for new tables
-- ============================================

ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_scenario_results ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS Policies for scenarios (public read)
-- ============================================

DROP POLICY IF EXISTS "Anyone can read active scenarios" ON scenarios;

CREATE POLICY "Anyone can read active scenarios"
  ON scenarios
  FOR SELECT
  USING (is_active = TRUE);

-- ============================================
-- RLS Policies for user_scenario_results
-- ============================================

DROP POLICY IF EXISTS "Users can read own scenario results" ON user_scenario_results;
DROP POLICY IF EXISTS "Users can insert own scenario results" ON user_scenario_results;

CREATE POLICY "Users can read own scenario results"
  ON user_scenario_results
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scenario results"
  ON user_scenario_results
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================
-- Trigger for scenarios updated_at
-- ============================================

DROP TRIGGER IF EXISTS update_scenarios_updated_at ON scenarios;

CREATE TRIGGER update_scenarios_updated_at
  BEFORE UPDATE ON scenarios
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Sample Scenario Data (for testing)
-- ============================================

INSERT INTO scenarios (
  title,
  description,
  context,
  difficulty,
  skill_category,
  options,
  correct_answer_id,
  explanation,
  time_limit_seconds,
  points
) VALUES (
  'Breakout or Fakeout?',
  'AAPL breaks resistance with high volume. What''s your move?',
  'AAPL just broke above resistance at $142 with high volume. RSI is at 72 (elevated). The stock has been consolidating for 2 weeks.',
  'intermediate',
  'technical_analysis',
  '[
    {"id": "A", "text": "Buy now - momentum is strong"},
    {"id": "B", "text": "Wait for pullback to $140 support"},
    {"id": "C", "text": "Short - RSI overbought, reversal coming"},
    {"id": "D", "text": "Stay out - need more confirmation"}
  ]'::jsonb,
  'B',
  'The correct answer is B. While the breakout looks strong, the elevated RSI (72) suggests the stock is overbought. In this actual scenario, AAPL pulled back to $140.20 the next day, providing a better entry point, then rallied to $148.50 over the next 3 days (+5.9% from the pullback entry vs +4.2% from breakout entry). Patience pays in trading - chasing breakouts often leads to buying the top.',
  60,
  100
),
(
  'Risk Management Crisis',
  'Your position is down 15%. What do you do?',
  'You bought 100 shares of TSLA at $250. It''s now at $212.50 (-15%). Your original stop loss was at $237.50 (-5%), but you moved it lower hoping for recovery. The broader market is showing weakness.',
  'beginner',
  'risk_management',
  '[
    {"id": "A", "text": "Hold and hope - it will come back"},
    {"id": "B", "text": "Exit immediately at current price"},
    {"id": "C", "text": "Average down - buy more at lower price"},
    {"id": "D", "text": "Set a hard stop at -20% and stick to it"}
  ]'::jsonb,
  'B',
  'The correct answer is B. You already violated your risk management plan by moving your stop loss. The position is now down 15% instead of the planned 5%, representing a 3x larger loss than intended. In a weakening market, hoping for recovery or averaging down can lead to even larger losses. The disciplined approach is to exit immediately, accept the loss, and preserve capital for better opportunities. Your original stop at -5% was there for a reason.',
  45,
  100
);

-- ============================================
-- Verify setup
-- ============================================

SELECT 'Phase 2 schema setup complete!' AS status;
SELECT COUNT(*) AS scenario_count FROM scenarios;
