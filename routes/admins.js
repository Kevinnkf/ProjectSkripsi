const pool = require('./config'); // Import the pool

// Example query
pool.query('SELECT * FROM users', (err, res) => {
  if (err) {
    console.error(err);
    // Handle error
  } else {
    console.log(res.rows);
    // Process results
  }
});

// Or using async/await:
const getUsers = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM admins');
      res.json(result.rows);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };