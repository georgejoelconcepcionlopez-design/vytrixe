-- Transcriptions Table for Usage Tracking & History
CREATE TABLE transcriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  filename TEXT NOT NULL,
  duration_seconds INT NOT NULL,
  content TEXT, -- The transcription text
  format TEXT DEFAULT 'txt',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS
ALTER TABLE transcriptions ENABLE ROW LEVEL SECURITY;

-- Users can view their own transcriptions
CREATE POLICY "Users can view own transcriptions" ON transcriptions 
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert (service role usually handles this, but for now allow user)
CREATE POLICY "Users can insert own transcriptions" ON transcriptions 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Usage tracking view or function could go here, but we'll do it in app logic for now
