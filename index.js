const express = require('express');
const { Pool } = require('pg');
const cors = require('cors'); // If you need CORS
const bodyParser = require('body-parser'); // If you need to parse request bodies

const app = express(); // Create an Express app instance
const port = 5000; // Or any port you prefer

app.use(cors()); // Enable CORS if needed
app.use(bodyParser.json()); // Enable parsing JSON if needed

const pool = require('./config').default.default.default; // Import the pool

// Define the route that uses getAdmins
app.get('/api/admins', getAdmins); // Or /api/users if you meant users

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});