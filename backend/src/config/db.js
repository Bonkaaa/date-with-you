const { Pool } = require('pg');
require('dotenv').config();

let dbUrl = (process.env.DATABASE_URL || '').trim();
if ((dbUrl.startsWith('"') && dbUrl.endsWith('"')) || (dbUrl.startsWith("'") && dbUrl.endsWith("'"))) {
  dbUrl = dbUrl.slice(1, -1).trim();
}

const isCloudDb =
  Boolean(dbUrl) &&
  !dbUrl.includes('localhost') &&
  !dbUrl.includes('127.0.0.1') &&
  !dbUrl.includes('@postgres:');

const pool = new Pool({
  connectionString:
    dbUrl ||
    `postgresql://${process.env.POSTGRES_USER || 'postgres'}:${process.env.POSTGRES_PASSWORD || 'postgres123'}@${process.env.POSTGRES_HOST || 'localhost'}:${process.env.POSTGRES_PORT || 5432}/${process.env.POSTGRES_DB || 'date_db'}`,
  ssl: isCloudDb ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

let initPromise = null;

async function initDb() {
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
}

async function ensureDbInit() {
  if (!initPromise) {
    initPromise = initDb().catch((err) => {
      initPromise = null;
      throw err;
    });
  }
  return initPromise;
}

module.exports = {
  pool,
  initDb,
  ensureDbInit,
};

