const pool = require('./config'); // Import the pool

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