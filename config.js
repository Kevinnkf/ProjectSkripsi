const { Pool } = require('pg'); // Use Pool for connection pooling

const pool = new Pool({
  user: 'postgres', // Your PostgreSQL username
  host: 'localhost', // Your PostgreSQL host
  database: 'postgres', // Your PostgreSQL database name
  password: 'donadoni', // Your PostgreSQL password
  port: 5432, // Default PostgreSQL port (important!)
});

module.exports = pool; // Export the pool, not a single connection