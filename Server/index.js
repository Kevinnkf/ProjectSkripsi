const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const adminsRoutes = require('./routes/admins');
const authRoutes = require('./routes/auth');

console.log('adminsRoutes:', adminsRoutes);
console.log('authRoutes:', authRoutes);

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Use Routes
app.use('/api/admins', adminsRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
