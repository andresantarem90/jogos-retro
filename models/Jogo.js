const mongoose = require('mongoose');

const jogoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  plataforma: { type: String, required: true },
  ano: { type: Number, required: true },
  genero: { type: String, required: true },
  descricao: { type: String },
  imagem: { type: String }
});

module.exports = mongoose.model('Jogo', jogoSchema);