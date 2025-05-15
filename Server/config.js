import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',   // Correct your host here
  database: 'mydatabase',  // Correct your database name here
  password: 'donadoni',
  port: 5432,
});

pool.connect()
  .then(() => {
    console.log('Successfully connected to PostgreSQL');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err);
    process.exit(1);
  });

export default pool;
