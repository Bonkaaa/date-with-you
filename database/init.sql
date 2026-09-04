-- Initialize database schema for date-with-you
CREATE TABLE IF NOT EXISTS date_responses (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    date_idea VARCHAR(255) NOT NULL,
    coffee_type VARCHAR(100),
    selected_date DATE NOT NULL,
    selected_time VARCHAR(50) NOT NULL,
    food_preference VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Ensure column exists if table was created previously
ALTER TABLE date_responses ADD COLUMN IF NOT EXISTS coffee_type VARCHAR(100);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_date_responses_email ON date_responses(email);
CREATE INDEX IF NOT EXISTS idx_date_responses_created_at ON date_responses(created_at DESC);
