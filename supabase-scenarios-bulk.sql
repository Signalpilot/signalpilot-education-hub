-- Bulk Scenario Challenges (50+ scenarios)
-- Comprehensive coverage across all skill categories and difficulties

-- ============================================
-- BEGINNER TECHNICAL ANALYSIS (10 scenarios)
-- ============================================

INSERT INTO scenarios (
  title, description, context, difficulty, skill_category,
  options, correct_answer_id, explanation, time_limit_seconds, points
) VALUES
(
  'Head and Shoulders Pattern',
  'Classic reversal pattern forming. What should you do?',
  'Stock XYZ has been in an uptrend for 3 months. You notice a head and shoulders pattern forming: left shoulder at $50, head at $55, right shoulder forming at $50. The neckline is at $45.',
  'beginner',
  'technical_analysis',
  '[
    {"id": "A", "text": "Buy - pattern confirms uptrend"},
    {"id": "B", "text": "Short on neckline break below $45"},
    {"id": "C", "text": "Wait - pattern not confirmed yet"},
    {"id": "D", "text": "Ignore - patterns don''t work"}
  ]'::jsonb,
  'B',
  'Correct! Head and shoulders is a bearish reversal pattern. You should wait for the neckline break below $45 to confirm the pattern, then short. The price target is typically the distance from the head to the neckline ($55-$45=$10), projected downward from the break ($45-$10=$35). This is one of the most reliable reversal patterns.',
  60,
  100
),

(
  'Bullish Engulfing Candle',
  'Bullish engulfing candle appears. Is this a buy signal?',
  'After a 2-week downtrend, you see a bullish engulfing candle: yesterday was a red candle ($48-$46), today opened at $45.50 and closed at $49, completely engulfing yesterday''s body. Volume is 2x average.',
  'beginner',
  'technical_analysis',
  '[
    {"id": "A", "text": "Buy immediately - strong reversal"},
    {"id": "B", "text": "Wait for confirmation tomorrow"},
    {"id": "C", "text": "Ignore - single candles mean nothing"},
    {"id": "D", "text": "Short - downtrend continues"}
  ]'::jsonb,
  'B',
  'Correct! While a bullish engulfing candle is a strong reversal signal, especially with high volume, it''s best to wait for confirmation the next day. Look for the next candle to close above the engulfing candle''s close ($49). Single candles can be powerful, but confirmation reduces false signals. If tomorrow confirms, you have a high-probability reversal setup.',
  45,
  100
),

(
  'Support Level Test',
  'Price is testing major support for the third time. Buy?',
  'AAPL has dropped from $180 to $160 over 2 weeks. It bounced at $160 twice before and is now testing it again. The broader market (SPY) is also weak.',
  'beginner',
  'technical_analysis',
  '[
    {"id": "A", "text": "Buy at support - third time holds"},
    {"id": "B", "text": "Avoid - weak market + multiple tests"},
    {"id": "C", "text": "Short - support will break"},
    {"id": "D", "text": "Buy if it bounces with volume"}
  ]'::jsonb,
  'B',
  'Correct! Multiple tests of support often weaken it, especially in a weak broader market. Each test uses up buying pressure. In a weak market environment, support is more likely to break than hold. It''s better to wait for either: (1) a clear bounce with strong volume, or (2) a break below support to short. The third touch is often when support breaks.',
  60,
  100
),

(
  'Rising Wedge Pattern',
  'Price making higher highs and higher lows in a wedge. What next?',
  'Stock has rallied from $100 to $130 over 3 weeks, forming a rising wedge (converging trendlines). Volume has been decreasing throughout the rally.',
  'beginner',
  'technical_analysis',
  '[
    {"id": "A", "text": "Buy - uptrend is intact"},
    {"id": "B", "text": "Prepare to short - bearish pattern"},
    {"id": "C", "text": "Hold - wait for breakout direction"},
    {"id": "D", "text": "Exit longs - weakness showing"}
  ]'::jsonb,
  'D',
  'Correct! A rising wedge is typically bearish, especially with declining volume. The narrowing price action and weakening volume suggest the uptrend is losing momentum. While you could wait for the break, the safest play is to exit longs and wait. Rising wedges break down about 70% of the time. Don''t try to short prematurely - wait for the break.',
  60,
  100
),

(
  'Gap Up Opening',
  'Stock gaps up 5% on earnings. How do you trade it?',
  'You''re watching NFLX which closed at $400 yesterday. Earnings were great, stock opens at $420 (+5%). Volume is very high in the first 5 minutes.',
  'beginner',
  'technical_analysis',
  '[
    {"id": "A", "text": "Buy the open - momentum is strong"},
    {"id": "B", "text": "Wait 30-60 min for pattern to form"},
    {"id": "C", "text": "Short - gaps get filled"},
    {"id": "D", "text": "Skip it - too risky"}
  ]'::jsonb,
  'B',
  'Correct! Gap openings are volatile and often see violent moves in both directions in the first 30-60 minutes. Professional traders wait for a pattern to emerge: Does it consolidate and break higher? Does it immediately fail? Waiting 30-60 minutes lets you see whether buyers or sellers are in control. The first 5 minutes often trap novice traders.',
  45,
  100
),

(
  'Falling Knife',
  'Stock down 30% in 2 days on bad news. Buy the dip?',
  'TSLA dropped from $250 to $175 (-30%) over 2 days after terrible earnings. Everyone is panicking. You think it''s oversold.',
  'beginner',
  'technical_analysis',
  '[
    {"id": "A", "text": "Buy now - amazing discount"},
    {"id": "B", "text": "Wait for stabilization first"},
    {"id": "C", "text": "Average in slowly"},
    {"id": "D", "text": "Buy options instead"}
  ]'::jsonb,
  'B',
  'Correct! "Never catch a falling knife." When a stock is in freefall, wait for stabilization - a few days of sideways or up action confirming a bottom. Massive drops often continue further than expected. The phrase "buy the dip" killed many traders. Wait for the knife to stick in the ground, then pick it up. Patience prevents huge losses.',
  45,
  100
),

(
  '50-Day MA Bounce',
  'Stock pullback to 50-day moving average. Buy signal?',
  'Stock in strong uptrend pulls back to its 50-day MA for the first time in 2 months. It''s held this MA perfectly in the past. Volume on the pullback is low.',
  'beginner',
  'technical_analysis',
  '[
    {"id": "A", "text": "Buy at MA - proven support"},
    {"id": "B", "text": "Wait for bounce confirmation"},
    {"id": "C", "text": "Set buy order slightly below MA"},
    {"id": "D", "text": "Short - MA will fail"}
  ]'::jsonb,
  'C',
  'Correct! While buying at MA support is a common strategy, it''s even better to place your buy order slightly below the MA (e.g., 1-2% below). This gives you a better entry if there''s a quick dip through the MA (shakeout), which often happens. If it bounces before hitting your order, you avoided a potential trap. This is called "buying value below value."',
  60,
  100
),

(
  'Triangle Breakout',
  'Symmetrical triangle forming. Trade now or wait?',
  'Stock has been consolidating in a symmetrical triangle for 3 weeks. Price is near the apex (end of triangle) at $75. Volume has been declining throughout.',
  'beginner',
  'technical_analysis',
  '[
    {"id": "A", "text": "Buy now - breakout is imminent"},
    {"id": "B", "text": "Wait for breakout with volume"},
    {"id": "C", "text": "Short - it will break down"},
    {"id": "D", "text": "Skip - no edge either direction"}
  ]'::jsonb,
  'B',
  'Correct! Triangles can break either direction. The key is waiting for a clear breakout with volume confirmation. A breakout on heavy volume is reliable; a breakout on low volume often fails (false breakout). Set alerts above and below the triangle, then wait. Trading before the breakout is gambling. Let the market show its hand.',
  60,
  100
),

(
  'RSI Overbought',
  'RSI hits 85 on a strong stock. What do you do?',
  'Stock in uptrend has RSI at 85 (overbought). Momentum is very strong. Stock just broke to new all-time highs.',
  'beginner',
  'technical_analysis',
  '[
    {"id": "A", "text": "Short - extremely overbought"},
    {"id": "B", "text": "Hold longs - trend is strong"},
    {"id": "C", "text": "Sell half position"},
    {"id": "D", "text": "Add to longs - momentum"}
  ]'::jsonb,
  'B',
  'Correct! "Overbought can stay overbought." In strong trends, RSI can remain elevated for weeks. New all-time highs often lead to extended runs. Counter-trend trading (shorting strong stocks) is dangerous. Instead, hold your longs but tighten stops. The trend is your friend until it ends. Don''t fight strong momentum just because an indicator says "overbought."',
  45,
  100
),

(
  'Pre-Market Gap Analysis',
  'Stock gaps down 3% pre-market on sector weakness. Play?',
  'You own AAPL which is gapping down 3% pre-market due to general tech sector weakness (no AAPL-specific news). Your cost basis is 5% below current price.',
  'beginner',
  'technical_analysis',
  '[
    {"id": "A", "text": "Sell at market open - avoid losses"},
    {"id": "B", "text": "Hold - no company-specific news"},
    {"id": "C", "text": "Add to position - it''s cheaper"},
    {"id": "D", "text": "Set stop loss at your cost basis"}
  ]'::jsonb,
  'B',
  'Correct! Gaps down on sector weakness (not company-specific news) often get bought back during the day. Since there''s no fundamental change to AAPL, panic selling is unwarranted. Professional traders often buy these sector-driven dips. Selling into a gap down usually means selling the low. Stay calm and let the market digest the sector news. You''re still up 2% from your entry.',
  60,
  100
);

-- ============================================
-- BEGINNER ORDER FLOW (5 scenarios)
-- ============================================

INSERT INTO scenarios (
  title, description, context, difficulty, skill_category,
  options, correct_answer_id, explanation, time_limit_seconds, points
) VALUES
(
  'Volume Spike on Breakout',
  'Breakout occurs with massive volume. What does this mean?',
  'Stock breaks above resistance at $100 with volume 5x the 20-day average. Price immediately runs to $103.',
  'beginner',
  'order_flow',
  '[
    {"id": "A", "text": "Bullish - institutions buying"},
    {"id": "B", "text": "Bearish - retail trapped"},
    {"id": "C", "text": "Neutral - just noise"},
    {"id": "D", "text": "Sell signal - exhaustion"}
  ]'::jsonb,
  'A',
  'Correct! High volume on a breakout indicates strong institutional participation - big buyers stepping in. This validates the breakout and suggests continuation. Low volume breakouts often fail (retail-driven). Volume confirms price action. This is a legitimate breakout, not a head-fake. The 5x volume spike shows serious buying interest.',
  45,
  100
),

(
  'Decreasing Volume Uptrend',
  'Stock rising but volume is declining each day. Concern?',
  'Stock has rallied from $50 to $60 over 5 days, but daily volume has decreased each day from 5M shares to 1M shares.',
  'beginner',
  'order_flow',
  '[
    {"id": "A", "text": "Bullish - less selling pressure"},
    {"id": "B", "text": "Bearish - lack of conviction"},
    {"id": "C", "text": "Neutral - price is what matters"},
    {"id": "D", "text": "Very bullish - stealth move"}
  ]'::jsonb,
  'B',
  'Correct! Declining volume on an uptrend shows weakening buying interest. Healthy rallies have increasing or stable volume - more buyers joining. Decreasing volume suggests fewer participants, making the move unsustainable. This is a red flag. The rally may reverse soon. "Volume precedes price" - when volume dies, price action often follows.',
  60,
  100
),

(
  'After-Hours Trading',
  'Big news breaks after market close. What should you know?',
  'Company announces earnings after 4pm market close. Stock is trading in after-hours at +8%. Regular hours closed at $50, after-hours now at $54.',
  'beginner',
  'order_flow',
  '[
    {"id": "A", "text": "Buy after-hours - lock in entry"},
    {"id": "B", "text": "Wait for regular hours tomorrow"},
    {"id": "C", "text": "Doesn''t matter - same price"},
    {"id": "D", "text": "Short after-hours"}
  ]'::jsonb,
  'B',
  'Correct! After-hours has low volume and wide spreads - you''ll likely get a terrible fill. Wait for regular hours (9:30am) when liquidity is much better. After-hours prices often gap further or reverse at the open. Professional traders rarely trade after-hours except in special situations. Patience gives you better execution and clearer price action.',
  45,
  100
),

(
  'Bid-Ask Spread',
  'Stock bid is $50, ask is $50.20. What does this tell you?',
  'You''re watching a mid-cap stock with bid at $50.00 and ask at $50.20. Spread is $0.20. Average daily volume is 500K shares.',
  'beginner',
  'order_flow',
  '[
    {"id": "A", "text": "Tight spread - very liquid"},
    {"id": "B", "text": "Wide spread - low liquidity"},
    {"id": "C", "text": "Normal spread - no issue"},
    {"id": "D", "text": "Spread doesn''t matter"}
  ]'::jsonb,
  'B',
  'Correct! A $0.20 spread (0.4%) is wide for a $50 stock. Liquid stocks like AAPL have $0.01 spreads. Wide spreads mean you lose money on entry (must pay ask) and exit (must hit bid). This increases your cost to trade. For day trading or short-term plays, wide spreads significantly hurt profitability. Stick to liquid stocks with tight spreads.',
  60,
  100
),

(
  'Market Order vs Limit Order',
  'Stock is moving fast. Which order type to use?',
  'Stock just broke out and is running. Current price $52.50, moving up quickly. You want to buy 100 shares. Market is volatile.',
  'beginner',
  'order_flow',
  '[
    {"id": "A", "text": "Market order - guarantee fill"},
    {"id": "B", "text": "Limit order at $52.50"},
    {"id": "C", "text": "Limit order at $53.00"},
    {"id": "D", "text": "Stop limit order"}
  ]'::jsonb,
  'C',
  'Correct! In fast-moving stocks, market orders can fill at terrible prices (slippage). A limit order at $53 gives you a ceiling - you won''t pay more than $53, but allows some flexibility to get filled if it runs slightly higher. A limit at current price ($52.50) might not fill if the stock keeps running. Having a limit slightly above current protects against extreme slippage.',
  60,
  100
);

-- ============================================
-- BEGINNER RISK MANAGEMENT (10 scenarios)
-- ============================================

INSERT INTO scenarios (
  title, description, context, difficulty, skill_category,
  options, correct_answer_id, explanation, time_limit_seconds, points
) VALUES
(
  'Win Rate Reality Check',
  'Your last 10 trades: 7 wins, 3 losses. Are you profitable?',
  'Last 10 trades: 7 wins averaging +$50 each ($350 total), 3 losses averaging -$200 each (-$600 total). Net: -$250.',
  'beginner',
  'risk_management',
  '[
    {"id": "A", "text": "Yes - 70% win rate is great"},
    {"id": "B", "text": "No - losses too large"},
    {"id": "C", "text": "Break-even - average"},
    {"id": "D", "text": "Need more trades to know"}
  ]'::jsonb,
  'B',
  'Correct! Win rate doesn''t matter - profit/loss does. You have a 70% win rate but are DOWN $250 because your average loss ($200) is 4x your average win ($50). This is backwards. Your winners must be larger than your losers to be profitable. Many traders focus on win rate and ignore the math. "Cut losses short, let winners run" is the key.',
  60,
  100
),

(
  'Risk Per Trade Calculation',
  'What percentage of your account should you risk per trade?',
  'You have a $25,000 account. How much should you risk on a single trade with your stop loss?',
  'beginner',
  'risk_management',
  '[
    {"id": "A", "text": "10% ($2,500) - go big"},
    {"id": "B", "text": "5% ($1,250) - moderate"},
    {"id": "C", "text": "1-2% ($250-$500) - conservative"},
    {"id": "D", "text": "All depends on setup"}
  ]'::jsonb,
  'C',
  'Correct! Professional traders risk 1-2% per trade maximum. This allows for a long losing streak without devastating your account. Risking 10% means 5 losses = -50% of account. Risking 1% means 10 losses = -10% of account. Capital preservation is #1. You can always make money back, but you need capital to trade. Size down, not up.',
  60,
  100
),

(
  'Consecutive Losses',
  'You''ve lost 5 trades in a row. What do you do?',
  'Last 5 trades all hit stops for -1% each. You''re down 5% this week. You see a new setup that looks great.',
  'beginner',
  'risk_management',
  '[
    {"id": "A", "text": "Take it - law of averages"},
    {"id": "B", "text": "Stop trading - review what''s wrong"},
    {"id": "C", "text": "Increase size - make it back"},
    {"id": "D", "text": "Switch strategies completely"}
  ]'::jsonb,
  'B',
  'Correct! After 5 consecutive losses, something is wrong - market conditions changed, you''re forcing trades, or strategy isn''t working. STOP trading and review: Are you following your rules? Is the market environment different? Taking another trade emotionally often makes it worse. Step away, analyze objectively, paper trade until you regain confidence.',
  60,
  100
),

(
  'Stop Loss Placement Strategy',
  'Where should you NEVER place your stop loss?',
  'You bought at $50. Recent low is $48. Round number at $49. Where should your stop NOT be?',
  'beginner',
  'risk_management',
  '[
    {"id": "A", "text": "At $49 (round number)"},
    {"id": "B", "text": "Just below $48 (recent low)"},
    {"id": "C", "text": "At your break-even point"},
    {"id": "D", "text": "All of the above are bad"}
  ]'::jsonb,
  'A',
  'Correct! Round numbers ($49, $50, etc) are where everyone places stops - market makers hunt these levels. Your stop gets hit, then price reverses. Instead, place stops just below support ($47.85) or at less obvious levels. Round numbers are magnets for stop runs. Professionals know where amateurs place stops and target those levels.',
  60,
  100
),

(
  'Scaling Out of Winners',
  'Your trade is up 100%. What''s the smart play?',
  'You bought 100 shares at $50, now at $100 (+100%). No stop in place yet.',
  'beginner',
  'risk_management',
  '[
    {"id": "A", "text": "Hold all - let it run"},
    {"id": "B", "text": "Sell all - take profits"},
    {"id": "C", "text": "Sell half, move stop to entry"},
    {"id": "D", "text": "Add more shares"}
  ]'::jsonb,
  'C',
  'Correct! Selling half locks in profits while keeping upside exposure. Moving stop to entry ($50) on remaining shares makes the trade "risk-free" - worst case you break even on remaining shares. This is called scaling out. It balances taking profits with letting winners run. You can''t go broke taking profits, but you also don''t want to exit too early.',
  60,
  100
),

(
  'Maximum Position Size',
  'How much of your account in a single position?',
  'You have $50,000. You LOVE stock ABC and want to go all-in. Should you?',
  'beginner',
  'risk_management',
  '[
    {"id": "A", "text": "Yes - conviction trade"},
    {"id": "B", "text": "No - maximum 25% per position"},
    {"id": "C", "text": "No - maximum 10-20% per position"},
    {"id": "D", "text": "No - maximum 5% per position"}
  ]'::jsonb,
  'C',
  'Correct! Even great setups can fail. Limiting position size to 10-20% maximum prevents any single trade from destroying your account. Diversification across 5-10 positions reduces risk. "Don''t put all eggs in one basket." The market doesn''t care about your conviction. Professional traders size positions based on risk, not emotions.',
  60,
  100
),

(
  'Trailing Stop Strategy',
  'Trade is up 50%. How to protect profits?',
  'Bought at $100, now at $150 (+50%). Want to protect gains but give it room to run.',
  'beginner',
  'risk_management',
  '[
    {"id": "A", "text": "Fixed stop at $140"},
    {"id": "B", "text": "Trailing stop - follows price up"},
    {"id": "C", "text": "No stop - let it run"},
    {"id": "D", "text": "Sell immediately"}
  ]'::jsonb,
  'B',
  'Correct! A trailing stop (e.g., 10% trailing) automatically moves up as price rises, locking in gains while allowing upside. If price is $150 with 10% trailing stop, your stop is $135. If price hits $160, stop moves to $144. This protects profits while giving room. Fixed stops leave money on the table; no stops risk giving back all gains.',
  60,
  100
),

(
  'Risking House Money',
  'You''re up $5K this month. Can you be more aggressive?',
  'Account started at $25K, now at $30K (+$5K). You feel confident and want to take bigger risks with profits.',
  'beginner',
  'risk_management',
  '[
    {"id": "A", "text": "Yes - it''s house money"},
    {"id": "B", "text": "No - it''s YOUR money"},
    {"id": "C", "text": "Maybe - increase risk slightly"},
    {"id": "D", "text": "Yes - you''re on a hot streak"}
  ]'::jsonb,
  'B',
  'Correct! There''s no such thing as "house money" - it''s all YOUR money now. Treating profits differently leads to reckless trading and giving back gains. The market doesn''t care if you''re up. Maintain the same risk discipline that got you to +$5K. Many traders make money then lose it all being aggressive with "profits." Stay disciplined.',
  60,
  100
),

(
  'Risk-Reward Ratio',
  'Setup offers 2:1 reward-to-risk. Take it?',
  'Entry $50, stop $48 (risk $2), target $54 (reward $4). Win rate on this setup historically is 40%.',
  'beginner',
  'risk_management',
  '[
    {"id": "A", "text": "Yes - 2:1 is good enough"},
    {"id": "B", "text": "No - need higher win rate"},
    {"id": "C", "text": "Yes - math works out profitable"},
    {"id": "D", "text": "No - only take 3:1 or better"}
  ]'::jsonb,
  'C',
  'Correct! Math: 40% win rate × $4 reward = $1.60 average gain. 60% loss rate × $2 risk = $1.20 average loss. Net: +$0.40 per trade. This is profitable long-term. You can be profitable with a 40% win rate if your winners are large enough. The math matters more than feelings. A 2:1 ratio with 40% win rate = long-term profits.',
  75,
  100
),

(
  'Overleveraging Risk',
  'You can trade with 4:1 margin. Should you use it?',
  'Your broker offers 4:1 margin. With $25K, you could control $100K in stocks. Tempting?',
  'beginner',
  'risk_management',
  '[
    {"id": "A", "text": "Yes - maximize gains"},
    {"id": "B", "text": "No - risk of margin call"},
    {"id": "C", "text": "Sometimes - only on sure things"},
    {"id": "D", "text": "Yes - professional traders do it"}
  ]'::jsonb,
  'B',
  'Correct! Margin multiplies both gains AND losses. A 5% drop with 4:1 leverage = -20% account value. One bad day can wipe you out. Margin calls force you to sell at the worst times. Most pros use minimal margin if any. Leverage feels great in bull markets but destroys accounts in corrections. Capital preservation > maximizing gains.',
  60,
  100
);

-- ============================================
-- BEGINNER PSYCHOLOGY (5 scenarios)
-- ============================================

INSERT INTO scenarios (
  title, description, context, difficulty, skill_category,
  options, correct_answer_id, explanation, time_limit_seconds, points
) VALUES
(
  'Analysis Paralysis',
  'Perfect setup but you can''t pull the trigger. Why?',
  'Stock meets all your criteria. You''ve been watching for days. Entry is perfect at $50, but you freeze and don''t click buy. Price runs to $55 without you.',
  'beginner',
  'psychology',
  '[
    {"id": "A", "text": "Need more confirmation"},
    {"id": "B", "text": "Fear of being wrong"},
    {"id": "C", "text": "Waiting for better price"},
    {"id": "D", "text": "Setup wasn''t that good"}
  ]'::jsonb,
  'B',
  'Correct! This is fear of being wrong/losing money. You''ve over-analyzed instead of trusting your process. Trading requires accepting losses as part of the game. Perfectionism kills profits - you''ll never have 100% certainty. Trust your strategy and execute. Missing opportunities from fear is just as costly as taking losses. Build confidence through paper trading first.',
  60,
  100
),

(
  'Confirmation Bias',
  'You bought a stock. What do you focus on?',
  'You bought XYZ at $100. Analyst downgrades it to $80 target. Social media is bullish. What do you pay attention to?',
  'beginner',
  'psychology',
  '[
    {"id": "A", "text": "Only bullish news - I''m right"},
    {"id": "B", "text": "All information objectively"},
    {"id": "C", "text": "Only bearish news - risk management"},
    {"id": "D", "text": "Nothing - stick to plan"}
  ]'::jsonb,
  'B',
  'Correct! Confirmation bias makes you seek information supporting your position while ignoring contradictory data. This leads to holding losers too long. Professional traders actively seek disconfirming evidence. Ask "what would prove me wrong?" Stay objective. Your position doesn''t care about your ego. The market will teach you - painfully if necessary.',
  60,
  100
),

(
  'Comparison Trap',
  'Friend made $10K this week. You made $500. Feel?',
  'Your friend brags about making $10K on a risky options trade. You made $500 following your plan. You feel inadequate.',
  'beginner',
  'psychology',
  '[
    {"id": "A", "text": "Bad - you underperformed"},
    {"id": "B", "text": "Good - you followed your plan"},
    {"id": "C", "text": "Mixed - could do better"},
    {"id": "D", "text": "Want to copy friend''s strategy"}
  ]'::jsonb,
  'B',
  'Correct! Compare yourself to your past self, not others. Your friend''s $10K might become -$20K next week with risky strategies. You followed your plan and made consistent progress. Comparison is the thief of joy. Social media shows highlights, not losses. Stay in your lane, follow your process, and compound consistent gains.',
  60,
  100
),

(
  'Loss Aversion Bias',
  'Down 2% on a trade. Market looks weak. What to do?',
  'Trade is down 2% from entry. Should hit your 5% stop, but you move the stop to 7% "just in case it bounces."',
  'beginner',
  'psychology',
  '[
    {"id": "A", "text": "Good - giving it room"},
    {"id": "B", "text": "Bad - violating your rules"},
    {"id": "C", "text": "Fine - it''s your money"},
    {"id": "D", "text": "Smart - stops are optional"}
  ]'::jsonb,
  'B',
  'Correct! Moving stops is the #1 way traders blow up accounts. You placed a 5% stop for a reason - it''s your risk tolerance. Moving it means you''re hoping/praying, not trading. Loss aversion makes us hate realizing losses, so we hold hoping for a bounce. This turns -5% into -20% losses. Honor your stops ALWAYS.',
  60,
  100
),

(
  'Recency Bias',
  'Last 3 trades were winners. Next trade?',
  'You''ve won 3 in a row, feeling great. Next setup is marginal - only 2/5 criteria met. Take it?',
  'beginner',
  'psychology',
  '[
    {"id": "A", "text": "Yes - I''m on a roll"},
    {"id": "B", "text": "No - doesn''t meet criteria"},
    {"id": "C", "text": "Yes - luck is on my side"},
    {"id": "D", "text": "Take with smaller size"}
  ]'::jsonb,
  'B',
  'Correct! Recency bias makes recent wins feel like skill and convince you you''re "hot." The market doesn''t care about your streak. Each trade is independent. Taking marginal setups because you feel confident is how winning streaks turn into losing streaks. Stick to your criteria ALWAYS. Discipline beats feelings.',
  60,
  100
);

-- Continue with Intermediate scenarios...

-- ============================================
-- INTERMEDIATE SCENARIOS (15 total)
-- ============================================

-- INTERMEDIATE TECHNICAL ANALYSIS (5)
INSERT INTO scenarios (title, description, context, difficulty, skill_category, options, correct_answer_id, explanation, time_limit_seconds, points) VALUES
('Fibonacci Retracement Entry', 'Stock pulled back to 61.8% Fib level. Buy here?', 'Stock rallied from $100 to $150, now pulled back to $130 (61.8% retracement). Volume on pullback is low.', 'intermediate', 'technical_analysis', '[{"id": "A", "text": "Buy at Fib level"}, {"id": "B", "text": "Wait for reversal candle"}, {"id": "C", "text": "Wait for 50% retracement"}, {"id": "D", "text": "Short - more downside"}]'::jsonb, 'B', 'Correct! While 61.8% Fib is a common reversal zone, wait for price action confirmation (bullish engulfing, hammer, etc.) before entering. Low pullback volume is bullish (no aggressive selling), but you need to see buyers step in. Fibs are not magic - they need confirmation.', 75, 100),

('MACD Divergence Trade', 'Price makes new high, MACD doesn''t. What does this mean?', 'Stock hit new high at $85, but MACD peaked lower than previous high. This is bearish divergence. Stock is in strong uptrend.', 'intermediate', 'technical_analysis', '[{"id": "A", "text": "Ignore - price is what matters"}, {"id": "B", "text": "Exit longs or lighten up"}, {"id": "C", "text": "Short immediately"}, {"id": "D", "text": "Add to longs - new high"}]'::jsonb, 'B', 'Correct! Bearish divergence suggests weakening momentum. Don''t short a strong uptrend, but reduce exposure and tighten stops. Divergences can last weeks before reversing. Let price action confirm before shorting. This is a warning sign, not an immediate short signal.', 75, 100),

('Volume Profile Analysis', 'Price approaching high volume node. What to expect?', 'Stock falling from $120, approaching $100 where huge volume traded previously (high volume node/POC).', 'intermediate', 'technical_analysis', '[{"id": "A", "text": "Expect bounce at $100"}, {"id": "B", "text": "Expect breakdown below $100"}, {"id": "C", "text": "Volume nodes don''t matter"}, {"id": "D", "text": "50/50 - could go either way"}]'::jsonb, 'A', 'Correct! High volume nodes act as magnets and support/resistance. Price tends to revisit fair value areas. At $100, many traders have positions - expect defense of this level. If it breaks, watch for waterfall. Volume profile is powerful - institutions use it.', 75, 100),

('Bollinger Band Squeeze', 'Bands are tightest in 6 months. What''s next?', 'Stock has been range-bound $48-$52 for weeks. Bollinger Bands are narrowest in 6 months - squeeze forming.', 'intermediate', 'technical_analysis', '[{"id": "A", "text": "Big move coming - direction unknown"}, {"id": "B", "text": "Buy - squeezes are bullish"}, {"id": "C", "text": "Short - squeezes are bearish"}, {"id": "D", "text": "Nothing - bands don''t matter"}]'::jsonb, 'A', 'Correct! Bollinger Band squeeze signals consolidation before expansion - a big move is coming, but direction is unknown. Wait for the breakout direction, then trade it. Squeezes can break either way. Set alerts above/below range and be ready to act. The tighter the squeeze, the bigger the move.', 75, 100),

('Multiple Timeframe Analysis', 'Daily bullish, weekly bearish. Which trumps?', 'Daily chart shows strong uptrend, but weekly chart shows bearish divergence and resistance overhead. Trade direction?', 'intermediate', 'technical_analysis', '[{"id": "A", "text": "Long - daily trend matters"}, {"id": "B", "text": "Short - weekly trend matters"}, {"id": "C", "text": "Trade with weekly, time on daily"}, {"id": "D", "text": "Avoid - conflicting signals"}]'::jsonb, 'C', 'Correct! Higher timeframes trump lower ones. Weekly bearish means daily uptrend is likely a counter-trend rally. Best approach: trade in direction of weekly (bearish), use daily to time your entry. This gives you the big trend plus precision entry. Never fight higher timeframe trends.', 90, 150);

-- INTERMEDIATE ORDER FLOW (5)
INSERT INTO scenarios (title, description, context, difficulty, skill_category, options, correct_answer_id, explanation, time_limit_seconds, points) VALUES
('Iceberg Order Detection', 'Large bid keeps appearing at $50 despite fills. What is it?', 'You''re watching Level 2. Big 10K share bid at $50 keeps getting hit, but immediately replenishes. Already 50K shares bought into it.', 'intermediate', 'order_flow', '[{"id": "A", "text": "Institutional accumulation - bullish"}, {"id": "B", "text": "Market maker - neutral"}, {"id": "C", "text": "Fake bid - will pull"}, {"id": "D", "text": "Stop loss cluster"}]'::jsonb, 'A', 'Correct! This is an iceberg order - large hidden order showing small pieces. Institution is accumulating without moving price. Very bullish - someone wants lots of stock at this price. When it finally clears, price often gaps up. This is smart money at work.', 75, 150),

('Tape Reading: Big Prints', 'Seeing unusual 100K+ share prints hitting bid. Meaning?', 'Stock at $75. Multiple 100K+ share blocks hitting the bid (selling), dropping price to $73. Time & Sales shows aggressive selling.', 'intermediate', 'order_flow', '[{"id": "A", "text": "Bullish - buyers getting filled"}, {"id": "B", "text": "Bearish - institutions dumping"}, {"id": "C", "text": "Neutral - just large trades"}, {"id": "D", "text": "Bullish - capitulation"}]'::jsonb, 'B', 'Correct! Large blocks hitting the bid = aggressive institutional selling. Someone is exiting a big position, willing to take worse prices to get out fast. This often precedes further drops. Tape reading reveals what institutions are doing. Retail can''t move markets - large prints matter.', 75, 150),

('VWAP Trading Strategy', 'Price above VWAP all day, now crossing below. Trade?', 'Stock has been above VWAP since open (+3%). Now crossing below VWAP for first time at 2pm.', 'intermediate', 'order_flow', '[{"id": "A", "text": "Short - momentum shift"}, {"id": "B", "text": "Buy dip - return to VWAP"}, {"id": "C", "text": "Wait - see if it reclaims"}, {"id": "D", "text": "VWAP doesn''t matter"}]'::jsonb, 'C', 'Correct! VWAP cross can be temporary. Wait to see if buyers defend it (bullish) or it fails (bearish). Institutions use VWAP for benchmarking - losing it is significant, but one touch isn''t a signal. If it rejects lower = bullish. If it fails to reclaim = bearish. Context matters.', 75, 150),

('Market on Close Imbalance', 'MOC shows 500K share buy imbalance at 3:50pm. Play it?', 'At 3:50pm, MOC (Market-On-Close) data shows 500K share buy imbalance. Stock at $48, closing auction in 10 min.', 'intermediate', 'order_flow', '[{"id": "A", "text": "Buy now - price will spike at close"}, {"id": "B", "text": "Too risky - imbalances can flip"}, {"id": "C", "text": "Short - imbalances are faded"}, {"id": "D", "text": "Buy small size for close spike"}]'::jsonb, 'D', 'Correct! MOC imbalances often cause closing spikes, but they can change in the last minutes. Small size capitalizes on likely spike while limiting risk if it flips. This is a short-term scalp play. Don''t oversize - imbalances aren''t guarantees, just probabilities.', 75, 150),

('Relative Volume Analysis', 'Stock volume is 300% of average by 10am. Significant?', 'Stock normally trades 1M shares/day. By 10am it''s already traded 1M shares (300% of normal by this time). Price is flat.', 'intermediate', 'order_flow', '[{"id": "A", "text": "Very bullish - accumulation"}, {"id": "B", "text": "Very bearish - distribution"}, {"id": "C", "text": "Wait - volume without direction is neutral"}, {"id": "D", "text": "Ignore - volume doesn''t matter"}]'::jsonb, 'C', 'Correct! High volume is only meaningful with price direction. Volume + flat price = churn (changing hands but no consensus). Wait for price to show direction, then volume confirms it. Could break either way. Volume is the fuel, price is the car - you need both moving together.', 75, 150);

-- INTERMEDIATE RISK MANAGEMENT (3)
INSERT INTO scenarios (title, description, context, difficulty, skill_category, options, correct_answer_id, explanation, time_limit_seconds, points) VALUES
('Portfolio Heat Management', 'You have 5 positions, all at -2%. Total exposure?', 'Account: $50K. Five open positions, each risking 2% ($1K each). All are slightly red. What''s your total exposure?', 'intermediate', 'risk_management', '[{"id": "A", "text": "2% - per trade risk"}, {"id": "B", "text": "10% - sum of all positions"}, {"id": "C", "text": "Depends on correlation"}, {"id": "D", "text": "5% - average"}]'::jsonb, 'C', 'Correct! If all 5 positions are uncorrelated, total risk is ~10%. But if they''re all tech stocks (correlated), they could all stop out together = 10% loss in one event. This is portfolio heat. Diversify across sectors/assets. Correlation risk is real - 2008 showed "diversified" portfolios weren''t.', 90, 150),

('Black Swan Protection', 'How to protect against rare catastrophic events?', 'Your portfolio is up 30% this year. Worried about market crash. How to protect without selling?', 'intermediate', 'risk_management', '[{"id": "A", "text": "Buy put options on index"}, {"id": "B", "text": "Set stops on all positions"}, {"id": "C", "text": "Sell everything to cash"}, {"id": "D", "text": "Don''t worry - crashes are rare"}]'::jsonb, 'A', 'Correct! Index puts provide downside protection (insurance) while keeping upside. Costs premium but limits max loss. Stops may not work in flash crashes (gap through). Cash means missing gains. Tail risk hedging (puts) is how professionals protect portfolios. Insurance costs, but catastrophic loss costs more.', 90, 150),

('Scaling Position Size', 'Small account vs large account - same risk percentage?', 'You have $10K account. Friend has $100K. Should you both risk same percentage per trade?', 'intermediate', 'risk_management', '[{"id": "A", "text": "Yes - always 1-2%"}, {"id": "B", "text": "No - small accounts can risk more"}, {"id": "C", "text": "No - large accounts can risk more"}, {"id": "D", "text": "Depends on strategy"}]'::jsonb, 'B', 'Correct! Small accounts can take slightly more risk (2-3%) because you need growth and can replace capital easier. Large accounts should be more conservative (0.5-1%) as losses are harder to replace and you have more to lose. But never exceed 3-5% risk per trade regardless. This is called risk scaling.', 90, 150);

-- INTERMEDIATE PSYCHOLOGY (2)
INSERT INTO scenarios (title, description, context, difficulty, skill_category, options, correct_answer_id, explanation, time_limit_seconds, points) VALUES
('Overconfidence After Big Win', 'Just made $5K on one trade (20% gain). Next move?', 'You nailed a perfect trade for +20% in one day ($5K profit). Feeling invincible. Another setup appears.', 'intermediate', 'psychology', '[{"id": "A", "text": "Take it - you''re hot"}, {"id": "B", "text": "Skip it - take a break"}, {"id": "C", "text": "Take it smaller size"}, {"id": "D", "text": "Double size - ride momentum"}]'::jsonb, 'B', 'Correct! Big wins create dangerous overconfidence. Your brain floods with dopamine, making you feel infallible. This leads to reckless next trades. Take a break, let emotions settle, then resume normal process. The market humbles overconfident traders. Stay humble always.', 75, 150),

('Anchoring to Entry Price', 'Bought at $100, now $80. News turns bullish. Sell at breakeven?', 'You bought at $100, watched it drop to $80. Holding hoping to "breakeven at $100." Now news turns bullish.', 'intermediate', 'psychology', '[{"id": "A", "text": "Yes - get out at $100"}, {"id": "B", "text": "No - reassess objectively"}, {"id": "C", "text": "Yes - breakeven is goal"}, {"id": "D", "text": "No - it will go higher"}]'::jsonb, 'B', 'Correct! Your entry price is irrelevant to the market. "Anchoring" to entry causes you to ignore current opportunities. If fundamentals improved, it might run past $100. Reassess objectively: if you had cash, would you buy HERE? If yes, hold. If no, sell. Forget your entry - it''s a sunk cost. Trade current reality.', 75, 150);

-- ============================================
-- ADVANCED SCENARIOS (5 total)
-- ============================================

-- ADVANCED TECHNICAL ANALYSIS (2)
INSERT INTO scenarios (title, description, context, difficulty, skill_category, options, correct_answer_id, explanation, time_limit_seconds, points) VALUES
('Wyckoff Accumulation Phase', 'Stock showing classic Wyckoff accumulation. Trade?', 'After downtrend, stock showing: Spring (false breakdown), Test, Sign of Strength on volume. Now at resistance.', 'advanced', 'technical_analysis', '[{"id": "A", "text": "Buy breakout of resistance"}, {"id": "B", "text": "Wait for retest after breakout"}, {"id": "C", "text": "Buy now before breakout"}, {"id": "D", "text": "Short - it will fail"}]'::jsonb, 'A', 'Correct! Wyckoff accumulation suggests institutional buying complete. Breakout confirms markup phase starting. Volume on breakout validates it. The Spring (shakeout) removed weak hands. Sign of Strength showed buyers in control. This is high-probability long entry. Target previous high.', 90, 200),

('Market Structure Break', 'Higher high, higher low pattern breaks. Significance?', 'Stock in uptrend making HH/HL for months. Suddenly makes lower high, then breaks below previous higher low.', 'advanced', 'technical_analysis', '[{"id": "A", "text": "Minor - trend intact"}, {"id": "B", "text": "Major - trend change signal"}, {"id": "C", "text": "Wait for confirmation"}, {"id": "D", "text": "Bullish - buying opportunity"}]'::jsonb, 'B', 'Correct! Breaking market structure (HH/HL pattern) is the first sign of trend change. Lower high = weakening bulls. Breaking previous higher low = bears taking control. This is how uptrends end. Don''t wait for "confirmation" - you just got it. Exit longs, consider shorts. Structure break > everything.', 90, 200);

-- ADVANCED ORDER FLOW (1)
INSERT INTO scenarios (title, description, context, difficulty, skill_category, options, correct_answer_id, explanation, time_limit_seconds, points) VALUES
('Spoofing Detection', 'Large orders appear/disappear quickly without fills. What is it?', 'Level 2 shows 50K bid at $50. Price approaches, bid disappears. New 50K bid appears at $49.50. Repeats 5 times.', 'advanced', 'order_flow', '[{"id": "A", "text": "Normal - just order adjustments"}, {"id": "B", "text": "Spoofing - illegal manipulation"}, {"id": "C", "text": "Market maker activity"}, {"id": "D", "text": "Algorithmic trading"}]'::jsonb, 'B', 'Correct! This is spoofing - placing fake orders to manipulate price, then canceling before fills. It''s illegal but still happens. Creates false impression of support/resistance. Don''t trade based on Level 2 alone - wait for actual fills. Real orders get filled; spoof orders disappear. SEC prosecutes this.', 90, 200);

-- ADVANCED RISK MANAGEMENT (1)
INSERT INTO scenarios (title, description, context, difficulty, skill_category, options, correct_answer_id, explanation, time_limit_seconds, points) VALUES
('Value at Risk (VaR) Calculation', 'Your portfolio could lose how much in 1 day (95% confidence)?', 'Portfolio: $100K, daily volatility 1.5%. What''s 1-day VaR at 95% confidence (1.65 std devs)?', 'advanced', 'risk_management', '[{"id": "A", "text": "$1,500 (1.5%)"}, {"id": "B", "text": "$2,475 (1.65 × 1.5%)"}, {"id": "C", "text": "$3,000 (2 × 1.5%)"}, {"id": "D", "text": "$5,000"}]'::jsonb, 'B', 'Correct! VaR = Portfolio × Volatility × Z-score. $100K × 1.5% × 1.65 = $2,475. This means 95% of days, you won''t lose more than $2,475. But 5% of days you could lose MORE (tail risk). VaR is imperfect but useful for risk budgeting. Professionals size positions to keep VaR acceptable.', 120, 200);

-- ADVANCED PSYCHOLOGY (1)
INSERT INTO scenarios (title, description, context, difficulty, skill_category, options, correct_answer_id, explanation, time_limit_seconds, points) VALUES
('Sunk Cost Fallacy Trading', 'Stock down 40%. "Too much invested to quit." Right?', 'You''ve held losing position 6 months, down 40%. "I''ve come this far, might as well hold for recovery."', 'advanced', 'psychology', '[{"id": "A", "text": "Right - don''t give up"}, {"id": "B", "text": "Wrong - sunk cost fallacy"}, {"id": "C", "text": "Right - it will recover"}, {"id": "D", "text": "Depends on fundamentals"}]'::jsonb, 'B', 'Correct! Sunk cost fallacy: past losses shouldn''t influence future decisions. Time invested is gone (sunk cost). Question: knowing what you know NOW, would you buy this stock HERE? If no, sell. Holding because "I''m down too much to quit" is emotional, not rational. Cut losses, redeploy capital better. -40% can become -60%.', 90, 200);

