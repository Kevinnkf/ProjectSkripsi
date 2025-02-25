const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const adminsRoutes = require('./routes/admins'); // ✅ Ensure this points to a file
const authRoutes = require('./routes/auth'); // ✅ Ensure this points to a file

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ Correct usage of routes
app.use('/api/admins', adminsRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
