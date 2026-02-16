-- Game Scores Table
CREATE TABLE game_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  game_type TEXT NOT NULL, -- 'word-search', 'quiz', 'memory'
  score INT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb, -- level, difficulty, time_taken
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

-- Users can insert their own scores
CREATE POLICY "Users can insert own scores" ON game_scores 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can view their own scores
CREATE POLICY "Users can view own scores" ON game_scores 
  FOR SELECT USING (auth.uid() = user_id);

-- Public/Leaderboard access (optional, maybe top scores?)
CREATE POLICY "Public can view top scores" ON game_scores 
  FOR SELECT USING (true);
