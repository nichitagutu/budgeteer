CREATE TABLE IF NOT EXISTS "user" (
  id SERIAL PRIMARY KEY,
  telegram_id INTEGER UNIQUE,
  username VARCHAR(255),
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  language_code VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "transaction" (
  id SERIAL PRIMARY KEY,
  value FLOAT NOT NULL,
  description VARCHAR(255),
  category VARCHAR(255),
  emoji VARCHAR(10),
  telegram_id INTEGER REFERENCES "user"(telegram_id),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
