const mongoose = require('mongoose');

const colecaoSchema = new mongoose.Schema({
  utilizador: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilizador', required: true },
  jogo: { type: mongoose.Schema.Types.ObjectId, ref: 'Jogo', required: true },
  estado: {
    type: String,
    enum: ['tenho', 'quero ter', 'joguei', 'completei', 'vendido'],
    default: 'tenho'
  }
});

module.exports = mongoose.model('Colecao', colecaoSchema);