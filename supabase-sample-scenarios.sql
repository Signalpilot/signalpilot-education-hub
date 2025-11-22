-- Additional Scenario Challenges
-- Run this after the main Phase 2 schema to add more challenges

-- ============================================
-- BEGINNER SCENARIOS (Technical Analysis)
-- ============================================

INSERT INTO scenarios (
  title, description, context, difficulty, skill_category,
  options, correct_answer_id, explanation, time_limit_seconds, points
) VALUES
(
  'Double Bottom Pattern',
  'Price forms a W-shape. What does this signal?',
  'You''re watching MSFT which has fallen from $380 to $340 over 3 weeks. The price touched $340 twice, forming a W-shape, and is now breaking above $352 (the middle peak). Volume is increasing.',
  'beginner',
  'technical_analysis',
  '[
    {"id": "A", "text": "Bullish reversal - buy the breakout"},
    {"id": "B", "text": "Bearish continuation - avoid"},
    {"id": "C", "text": "Wait for higher high before buying"},
    {"id": "D", "text": "Sell - double tops are bearish"}
  ]'::jsonb,
  'A',
  'Correct! A double bottom is a bullish reversal pattern. The W-shape shows two failed attempts to push lower, indicating buyers are stepping in. The breakout above the middle peak ($352) confirms the pattern. Volume increasing on the breakout adds confirmation. This is a classic textbook entry point.',
  45,
  100
),

(
  'Moving Average Crossover',
  'The 50-day MA just crossed above the 200-day MA. What is this?',
  'SPY''s 50-day moving average has just crossed above its 200-day moving average for the first time in 6 months. The stock has been in a downtrend but appears to be recovering. Current price: $445.',
  'beginner',
  'technical_analysis',
  '[
    {"id": "A", "text": "Death Cross - bearish signal"},
    {"id": "B", "text": "Golden Cross - bullish signal"},
    {"id": "C", "text": "Neutral - moving averages don''t matter"},
    {"id": "D", "text": "Sell signal - trend is ending"}
  ]'::jsonb,
  'B',
  'Correct! When the 50-day MA crosses above the 200-day MA, it''s called a "Golden Cross" - a bullish signal that suggests the trend is turning positive. Conversely, when the 50-day crosses below the 200-day, it''s a "Death Cross" (bearish). This is one of the most widely watched technical indicators by traders and institutions.',
  30,
  100
);

-- ============================================
-- BEGINNER SCENARIOS (Risk Management)
-- ============================================

INSERT INTO scenarios (
  title, description, context, difficulty, skill_category,
  options, correct_answer_id, explanation, time_limit_seconds, points
) VALUES
(
  'Position Size Calculator',
  'You have $10,000 account. Max risk 2% per trade. How many shares?',
  'Account size: $10,000. You want to buy AMD at $150 with a stop loss at $145. Your risk management rule is max 2% risk per trade.',
  'beginner',
  'risk_management',
  '[
    {"id": "A", "text": "133 shares"},
    {"id": "B", "text": "40 shares"},
    {"id": "C", "text": "66 shares"},
    {"id": "D", "text": "100 shares"}
  ]'::jsonb,
  'B',
  'Correct! Here''s the math: Max risk = $10,000 × 2% = $200. Risk per share = $150 - $145 = $5. Shares = $200 ÷ $5 = 40 shares. This ensures if your stop is hit, you only lose $200 (2% of account). This is fundamental position sizing that protects your capital.',
  60,
  100
),

(
  'Stop Loss Placement',
  'You bought NVDA at $500. Where should you place your stop?',
  'You just bought NVDA at $500. Recent support is at $485. ATR (Average True Range) is $15. Your risk tolerance is 5% max.',
  'beginner',
  'risk_management',
  '[
    {"id": "A", "text": "$475 - max 5% loss"},
    {"id": "B", "text": "$485 - just below support"},
    {"id": "C", "text": "$483 - below support with buffer"},
    {"id": "D", "text": "$490 - tight stop"}
  ]'::jsonb,
  'C',
  'Correct! Placing a stop just below support ($485) gives it a small buffer ($483) to avoid getting stopped out by normal volatility. A stop exactly at support ($485) often gets hit by quick dips. A stop too tight ($490) will likely get hit by noise. A stop at max loss ($475) is too far and gives up too much.',
  60,
  100
);

-- ============================================
-- BEGINNER SCENARIOS (Psychology)
-- ============================================

INSERT INTO scenarios (
  title, description, context, difficulty, skill_category,
  options, correct_answer_id, explanation, time_limit_seconds, points
) VALUES
(
  'FOMO Trade',
  'Stock up 30% in 2 days. Everyone is buying. What do you do?',
  'You missed COIN''s move from $80 to $104 (+30%) over 2 days. Social media is buzzing, everyone is posting gains. The chart looks parabolic. You feel like you''re missing out.',
  'beginner',
  'psychology',
  '[
    {"id": "A", "text": "Buy now before it goes higher"},
    {"id": "B", "text": "Wait for a pullback"},
    {"id": "C", "text": "Buy half position now, half later"},
    {"id": "D", "text": "Skip it - too late"}
  ]'::jsonb,
  'B',
  'Correct! FOMO (Fear Of Missing Out) is one of the biggest psychological traps. Parabolic moves often pull back 20-30% before continuing. Chasing after a 30% move typically means buying near the top. Discipline beats emotion - wait for a pullback to a logical support level. "The best trades are the ones you don''t take."',
  45,
  100
),

(
  'Revenge Trading',
  'You just lost $500 on a trade. What''s your next move?',
  'You took a loss of $500 on TSLA - your stop was hit. You''re frustrated and want to "make it back." You see another setup forming in the same stock.',
  'beginner',
  'psychology',
  '[
    {"id": "A", "text": "Take the next trade - make it back"},
    {"id": "B", "text": "Take a break - clear your head first"},
    {"id": "C", "text": "Double position size - recover faster"},
    {"id": "D", "text": "Switch to options for bigger gains"}
  ]'::jsonb,
  'B',
  'Correct! "Revenge trading" - trying to immediately make back losses - is extremely dangerous. You''re emotional, not thinking clearly, and likely to make more mistakes. The best traders step away after losses, clear their head, review what went wrong, and only return when calm and objective. Capital preservation > ego.',
  45,
  100
);

-- ============================================
-- INTERMEDIATE SCENARIOS (Order Flow)
-- ============================================

INSERT INTO scenarios (
  title, description, context, difficulty, skill_category,
  options, correct_answer_id, explanation, time_limit_seconds, points
) VALUES
(
  'Volume Spike Analysis',
  'Stock drops 5% on 10x volume. What does this indicate?',
  'AMZN suddenly drops from $175 to $166 (-5%) in 30 minutes. Volume is 10x the average. No news. The previous trend was upward.',
  'intermediate',
  'order_flow',
  '[
    {"id": "A", "text": "Capitulation - possible reversal"},
    {"id": "B", "text": "Start of downtrend - avoid"},
    {"id": "C", "text": "Buy the dip - just noise"},
    {"id": "D", "text": "Wait for confirmation"}
  ]'::jsonb,
  'D',
  'Correct! While high volume drop can indicate capitulation (selling exhaustion), you need confirmation. It could also be a large institution exiting or start of a real breakdown. Wait for the next 1-2 candles to see if buyers step in (reversal) or sellers continue (breakdown). Don''t catch a falling knife - let it stabilize first.',
  60,
  100
),

(
  'Dark Pool Activity',
  'Large block trades above ask. What does this suggest?',
  'You notice unusual activity in NVDA: multiple 50,000+ share blocks are being bought ABOVE the current ask price in dark pools. This has happened 5 times in the last hour.',
  'intermediate',
  'order_flow',
  '[
    {"id": "A", "text": "Bearish - institutions exiting"},
    {"id": "B", "text": "Bullish - accumulation occurring"},
    {"id": "C", "text": "Neutral - just normal trading"},
    {"id": "D", "text": "Manipulation - stay away"}
  ]'::jsonb,
  'B',
  'Correct! Large blocks bought ABOVE the ask price suggest institutions are willing to pay a premium to accumulate shares without moving the market publicly. This is typically bullish - smart money is positioning for a move up. If they were selling, they''d be hitting bids BELOW the market price.',
  60,
  100
);

-- ============================================
-- ADVANCED SCENARIOS (Technical Analysis)
-- ============================================

INSERT INTO scenarios (
  title, description, context, difficulty, skill_category,
  options, correct_answer_id, explanation, time_limit_seconds, points
) VALUES
(
  'Bearish Divergence',
  'Price makes higher high, RSI makes lower high. What now?',
  'SPY just hit a new all-time high at $475, but RSI (14) peaked at 68, while the previous high at $470 had RSI at 74. Volume is declining. This is the second divergence in 2 weeks.',
  'advanced',
  'technical_analysis',
  '[
    {"id": "A", "text": "Ignore - price is what matters"},
    {"id": "B", "text": "Prepare for reversal - reduce longs"},
    {"id": "C", "text": "Buy more - trend is strong"},
    {"id": "D", "text": "Short immediately"}
  ]'::jsonb,
  'B',
  'Correct! Bearish divergence (price higher highs, indicator lower highs) suggests weakening momentum. Combined with declining volume and being the second divergence, this is a strong warning. Don''t short immediately (never fight the trend), but reduce long exposure, tighten stops, and prepare for potential reversal. Divergences can persist, but they''re reliable warnings.',
  75,
  100
),

(
  'Elliott Wave Count',
  'Potential Wave 5 completion. What are the warning signs?',
  'You''ve been tracking a 5-wave impulse in TSLA. Wave 1: $150→$200, Wave 2: $200→$175, Wave 3: $175→$250, Wave 4: $250→$220, Wave 5 appears to be completing around $280. RSI is extreme, volume declining.',
  'advanced',
  'technical_analysis',
  '[
    {"id": "A", "text": "Buy - Wave 5 extends higher usually"},
    {"id": "B", "text": "Exit longs - Wave 5 typically final"},
    {"id": "C", "text": "Wait for Wave 6 to start"},
    {"id": "D", "text": "Short aggressively"}
  ]'::jsonb,
  'B',
  'Correct! In Elliott Wave theory, Wave 5 is typically the final impulse wave before a correction (ABC). Warning signs: RSI extreme + declining volume = weakening momentum. Exit longs and wait for ABC correction to complete before re-entering. Note: There is no "Wave 6" in impulse moves - after 5 waves comes correction. Shorting is risky without clear reversal confirmation.',
  90,
  100
);

-- ============================================
-- ADVANCED SCENARIOS (Risk Management)
-- ============================================

INSERT INTO scenarios (
  title, description, context, difficulty, skill_category,
  options, correct_answer_id, explanation, time_limit_seconds, points
) VALUES
(
  'Correlation Risk',
  'You hold 5 tech stocks. Sector-wide selloff begins. What now?',
  'Your portfolio: AAPL, MSFT, NVDA, GOOGL, AMZN (each 20% of portfolio). Tech sector is down 3% in 1 hour on rising rates fear. All your positions are red. You''re down 3% on the day.',
  'advanced',
  'risk_management',
  '[
    {"id": "A", "text": "Hold all - they''re quality companies"},
    {"id": "B", "text": "Sell all - preserve capital"},
    {"id": "C", "text": "Hedge with QQQ puts"},
    {"id": "D", "text": "Average down - buying opportunity"}
  ]'::jsonb,
  'C',
  'Correct! Your portfolio has high correlation risk - all positions move together. Instead of selling quality longs (tax/commission costs), hedge with QQQ or SPY puts. This protects downside while keeping long exposure if market recovers. Selling all is reactive; holding all ignores sector risk. Averaging down increases concentration risk. Proper hedging = professional risk management.',
  75,
  100
),

(
  'Kelly Criterion Application',
  'Win rate: 60%, Avg win: $300, Avg loss: $200. Position size?',
  'Your backtested strategy shows: 60% win rate, average winner $300, average loser $200. Account size: $50,000. How much should you risk per trade using Kelly Criterion?',
  'advanced',
  'risk_management',
  '[
    {"id": "A", "text": "1% ($500)"},
    {"id": "B", "text": "2% ($1,000)"},
    {"id": "C", "text": "5% ($2,500)"},
    {"id": "D", "text": "10% ($5,000)"}
  ]'::jsonb,
  'B',
  'Correct! Kelly Criterion: f = (bp - q) / b, where b = win/loss ratio (300/200 = 1.5), p = win rate (0.6), q = loss rate (0.4). f = (1.5×0.6 - 0.4) / 1.5 = (0.9 - 0.4) / 1.5 = 0.33 / 1.5 = 0.22 or 22%. However, full Kelly is aggressive - use Half Kelly (11%) or even Quarter Kelly (5.5%). At 2% you''re being conservative, which is wise. Most pros use 0.5-2% despite Kelly suggesting higher.',
  90,
  100
);

-- ============================================
-- ADVANCED SCENARIOS (Psychology)
-- ============================================

INSERT INTO scenarios (
  title, description, context, difficulty, skill_category,
  options, correct_answer_id, explanation, time_limit_seconds, points
) VALUES
(
  'Overconfidence After Streak',
  'You''ve won 8 trades in a row. Feeling invincible. What''s the danger?',
  'You just closed your 8th consecutive winning trade. Your account is up 15% this month. You''re feeling confident, maybe even invincible. You''re considering increasing position sizes and taking more trades.',
  'advanced',
  'psychology',
  '[
    {"id": "A", "text": "Increase size - ride the hot streak"},
    {"id": "B", "text": "Take a break - reset expectations"},
    {"id": "C", "text": "Keep same strategy - don''t change"},
    {"id": "D", "text": "Take riskier setups - momentum is there"}
  ]'::jsonb,
  'B',
  'Correct! Winning streaks create overconfidence bias - the most dangerous psychological state. You start believing you''re "in the zone" and take bigger risks, looser setups, or increase size. This is when the biggest losses happen. The market doesn''t care about your streak. Take a break, review trades objectively, and return to baseline discipline. Mean reversion applies to win rates too.',
  75,
  100
),

(
  'Drawdown Management',
  'Account down 20% from peak. What''s the required gain to recover?',
  'Your account peaked at $100,000 but is now at $80,000 (20% drawdown). You need to calculate the return required to get back to breakeven and decide on your next steps.',
  'advanced',
  'psychology',
  '[
    {"id": "A", "text": "20% - same as the loss"},
    {"id": "B", "text": "25% - math is asymmetric"},
    {"id": "C", "text": "15% - close but less"},
    {"id": "D", "text": "30% - need to overcompensate"}
  ]'::jsonb,
  'B',
  'Correct! This is the asymmetry of losses: To recover from a 20% loss requires a 25% gain ($80k × 1.25 = $100k). A 50% loss requires 100% gain. This is why capital preservation is critical - losses are harder to recover than they are to incur. Reduce position size during drawdowns, focus on process over results, and don''t try to "make it back" quickly.',
  60,
  100
);

-- ============================================
-- Summary
-- ============================================

SELECT 'Sample scenarios added successfully!' AS status;
SELECT difficulty, skill_category, COUNT(*) as count
FROM scenarios
GROUP BY difficulty, skill_category
ORDER BY difficulty, skill_category;
