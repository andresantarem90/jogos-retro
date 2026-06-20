const express = require('express');
const router = express.Router();
const Jogo = require('../models/Jogo');

router.get('/', async (req, res) => {
  try {
    const { nome, plataforma, genero, ano } = req.query;
    const filtro = {};

    if (nome) {
      filtro.nome = { $regex: nome, $options: 'i' };
    }
    if (plataforma) {
      filtro.plataforma = plataforma;
    }
    if (genero) {
      filtro.genero = genero;
    }
    if (ano) {
      filtro.ano = ano;
    }

    const jogos = await Jogo.find(filtro);
    res.json(jogos);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar jogos' });
  }
});

// GET /api/jogos/:id - detalhe de um jogo
router.get('/:id', async (req, res) => {
  try {
    const jogo = await Jogo.findById(req.params.id);
    if (!jogo) {
      return res.status(404).json({ erro: 'Jogo não encontrado' });
    }
    res.json(jogo);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar jogo' });
  }
});

// POST /api/jogos - criar novo jogo
router.post('/', async (req, res) => {
  try {
    const novoJogo = new Jogo(req.body);
    await novoJogo.save();
    res.status(201).json(novoJogo);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao criar jogo', detalhes: err.message });
  }
});

// PUT /api/jogos/:id - atualizar jogo
router.put('/:id', async (req, res) => {
  try {
    const jogoAtualizado = await Jogo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!jogoAtualizado) {
      return res.status(404).json({ erro: 'Jogo não encontrado' });
    }
    res.json(jogoAtualizado);
  } catch (err) {
    res.status(400).json({ erro: 'Erro ao atualizar jogo' });
  }
});

// DELETE /api/jogos/:id - apagar jogo
router.delete('/:id', async (req, res) => {
  try {
    const jogoApagado = await Jogo.findByIdAndDelete(req.params.id);
    if (!jogoApagado) {
      return res.status(404).json({ erro: 'Jogo não encontrado' });
    }
    res.json({ mensagem: 'Jogo apagado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao apagar jogo' });
  }
});

module.exports = router;