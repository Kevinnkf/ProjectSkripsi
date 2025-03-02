const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes'); // Import the centralized router

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(router); // Use the router from routes/index.js

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


