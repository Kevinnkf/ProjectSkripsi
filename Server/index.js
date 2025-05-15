const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes'); // Import the centralized router
const db = require('./models');

require('dotenv').config();

const app = express();
const port = 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // frontend's URL
  credentials: true // Allow cookies to be sent and received
};

// Use the CORS middleware with the configured options
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(router); // Use the router from routes/index.js

db.sequelize.sync().then(() => {
  console.log("Database synced");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
