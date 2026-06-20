const express = require('express');
const router = express.Router();
const Colecao = require('../models/Colecao');
const auth = require('../middleware/auth');

// GET /api/colecao - ver a coleção do utilizador autenticado
router.get('/', auth, async (req, res) => {
  try {
    const itens = await Colecao.find({ utilizador: req.utilizador.id })
      .populate('jogo'); // substitui o ID do jogo pelos dados reais do jogo
    res.json(itens);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar coleção' });
  }
});

// POST /api/colecao - adicionar jogo à coleção
router.post('/', auth, async (req, res) => {
  try {
    const { jogoId, estado } = req.body;

    // verificar se já está na coleção
    const existente = await Colecao.findOne({
      utilizador: req.utilizador.id,
      jogo: jogoId
    });

    if (existente) {
      return res.status(400).json({ erro: 'Jogo já está na tua coleção' });
    }

    const novoItem = new Colecao({
      utilizador: req.utilizador.id,
      jogo: jogoId,
      estado: estado || 'tenho'
    });

    await novoItem.save();
    res.status(201).json(novoItem);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao adicionar à coleção' });
  }
});

// PUT /api/colecao/:id - atualizar estado
router.put('/:id', auth, async (req, res) => {
  try {
    const item = await Colecao.findOneAndUpdate(
      { _id: req.params.id, utilizador: req.utilizador.id },
      { estado: req.body.estado },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ erro: 'Item não encontrado' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar' });
  }
});

// DELETE /api/colecao/:id - remover da coleção
router.delete('/:id', auth, async (req, res) => {
  try {
    const item = await Colecao.findOneAndDelete({
      _id: req.params.id,
      utilizador: req.utilizador.id
    });
    if (!item) {
      return res.status(404).json({ erro: 'Item não encontrado' });
    }
    res.json({ mensagem: 'Removido da coleção' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao remover' });
  }
});

module.exports = router;