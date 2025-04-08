const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes'); // Import the centralized router
const db = require('./models');

require('dotenv').config();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(router); // Use the router from routes/index.js

db.sequelize.sync().then(()=> {
  console.log("Database synced");
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});


