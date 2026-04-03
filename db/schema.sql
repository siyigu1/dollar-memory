-- ============================================
-- Supabase schema for Dollar memorial site
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Gifts table — one row per gift type, shared counter
CREATE TABLE gifts (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0
);

-- Seed with initial gift types
INSERT INTO gifts (key, count) VALUES
  ('flower', 0),
  ('food', 0),
  ('cookie', 0),
  ('ball', 0);

-- 2. Letters table
CREATE TABLE letters (
  id BIGSERIAL PRIMARY KEY,
  author TEXT NOT NULL DEFAULT 'Anonymous',
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Row Level Security policies

-- Gifts: anyone can read, anyone can update count (via RPC)
ALTER TABLE gifts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read gifts"
  ON gifts FOR SELECT
  USING (true);

-- Letters: anyone can read, anyone can insert, nobody can update/delete
ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read letters"
  ON letters FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert letters"
  ON letters FOR INSERT
  WITH CHECK (true);

-- 4. Atomic increment function for gifts (prevents race conditions)
CREATE OR REPLACE FUNCTION increment_gift(gift_key TEXT)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE gifts SET count = count + 1 WHERE key = gift_key
  RETURNING count INTO new_count;
  RETURN new_count;
END;
$$;
