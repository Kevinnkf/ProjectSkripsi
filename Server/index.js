import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import router from './routes/index.js'; 
import db from './models/index.js'; 

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your frontend's URL
  credentials: true, // Allow cookies to be sent and received
};

// Use the CORS middleware with the configured options
app.use(cors(corsOptions));
app.use(cookieParser()); // Required to read cookies
app.use(bodyParser.json());
app.use(router); // Use the router from routes/index.js

db.sequelize.sync().then(() => {
  console.log('Database synced');
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
