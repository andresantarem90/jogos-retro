require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const jogosRoutes = require('./routes/jogos');
const authRoutes = require('./routes/auth');
const colecaoRoutes = require('./routes/colecao');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Ligado à base de dados'))
  .catch(err => console.error('Erro ao ligar à base de dados:', err));

app.use('/api/jogos', jogosRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/colecao', colecaoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});