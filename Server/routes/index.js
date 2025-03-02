const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const adminsRoutes = require('./admins'); 
const knowledgeRoutes = require ('./baseKnowledge')
const authRoutes = require('./auth'); 
const chatRoutes = require('./chats')

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/chats', chatRoutes)
app.use('/api/knowledge', knowledgeRoutes)
app.use('/api/admins', adminsRoutes);
app.use('/api/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
