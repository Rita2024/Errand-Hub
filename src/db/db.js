// db.js

const { Pool } = require('pg');
require('dotenv').config();

// Database connection configuration
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT, // Default PostgreSQL port
});

module.exports = pool;
