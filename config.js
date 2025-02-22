require('dotenv').config(); 

const { Pool } = require('pg'); // Use CommonJS destructuring

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

pool.connect()
  .then(() => {
    console.log('Successfully connected to PostgreSQL');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err);
    process.exit(1);
  });

export default pool; // Use module.exports