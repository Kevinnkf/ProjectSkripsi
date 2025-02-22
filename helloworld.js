const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // If you need CORS
const bodyParser = require('body-parser'); // If you need to parse request bodies

const app = express(); // Create an Express app instance
const port = 5000; // Or any port you prefer

app.use(cors()); // Enable CORS if needed
app.use(bodyParser.json()); // Enable parsing JSON if needed

const pool = require('./config'); // Import the pool

// Callback approach (less common now, but still works)
pool.query('SELECT * FROM admins', (err, res) => {
  if (err) {
    console.error('Error fetching users (callback):', err);
  } else {
    console.log('Users (callback):', res.rows);
  }
});

// Async/await approach (recommended)
const getAdmins = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM admins'); // Or 'users' if you meant users
    console.log('Admins (async/await):', result.rows);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching admins (async/await):', error);
    res.status(500).json({ error: 'Failed to fetch admins: ' + error.message }); // Send a more informative error message
  }
};

// Define the route that uses getAdmins
app.get('/api/admins', getAdmins); // Or /api/users if you meant users

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});