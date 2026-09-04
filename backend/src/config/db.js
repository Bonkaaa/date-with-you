const { Pool } = require('pg');
require('dotenv').config();

const dbUrl = process.env.DATABASE_URL || '';
const isCloudDb =
  dbUrl.includes('neon.tech') ||
  dbUrl.includes('supabase.co') ||
  dbUrl.includes('render.com') ||
  dbUrl.includes('vercel-storage.com') ||
  dbUrl.includes('sslmode=require') ||
  (dbUrl && !dbUrl.includes('localhost') && !dbUrl.includes('@postgres:'));

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    `postgresql://${process.env.POSTGRES_USER || 'postgres'}:${process.env.POSTGRES_PASSWORD || 'postgres123'}@${process.env.POSTGRES_HOST || 'localhost'}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DB || 'date_db'}`,
  ssl: isCloudDb ? { rejectUnauthorized: false } : false,
});

async function initDb() {
  const maxRetries = 10;
  const delay = 2000;

  for (let i = 1; i <= maxRetries; i++) {
    try {
      await pool.query(`
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
        ALTER TABLE date_responses ADD COLUMN IF NOT EXISTS coffee_type VARCHAR(100);
        CREATE INDEX IF NOT EXISTS idx_date_responses_email ON date_responses(email);
        CREATE INDEX IF NOT EXISTS idx_date_responses_created_at ON date_responses(created_at DESC);
      `);
      console.log('✅ Connected to PostgreSQL and verified date_responses table & coffee_type column.');
      return;
    } catch (err) {
      console.warn(
        `⚠️ PostgreSQL connection attempt ${i}/${maxRetries} failed: ${err.message}. Retrying in ${delay}ms...`
      );
      if (i === maxRetries) {
        console.error('❌ Could not connect to PostgreSQL after multiple attempts.');
      } else {
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
}

module.exports = {
  pool,
  initDb,
};
