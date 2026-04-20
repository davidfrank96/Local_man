CREATE TABLE IF NOT EXISTS waitlist_entries (
  id BIGSERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  city TEXT,
  joining_as TEXT,
  interest TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
