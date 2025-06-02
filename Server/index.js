
import express from 'express';
import cookieParser from 'cookie-parser';
import cors    from 'cors';
import bodyParser from 'body-parser';
import router  from './routes/index.js';
import db      from './models/index.js'; 
import dotenv  from 'dotenv';

dotenv.config();

const app  = express();
app.use(express.json()); // For JSON body parsing
app.use(cookieParser()); // For cookie parsing
const port = process.env.PORT || 5000;

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('Backend is running');
});

app.use(cors({
  origin:      process.env.FRONTEND_URL  || 'https://halo-pnj.vercel.app',
  // origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type']
}));

// parse JSON bodies
app.use(bodyParser.json());

// mount all routes
app.use(router);

// sync your Sequelize models
db.sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(e => console.error('DB sync error:', e));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
