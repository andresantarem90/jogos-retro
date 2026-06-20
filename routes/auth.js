const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Utilizador = require('../models/Utilizador');

// POST /api/auth/registo
router.post('/registo', async (req, res) => {
  try {
    const { nome, email, password } = req.body;

    // verificar se o email já existe
    const existente = await Utilizador.findOne({ email });
    if (existente) {
      return res.status(400).json({ erro: 'Email já registado' });
    }

    // encriptar a password
    const passwordEncriptada = await bcrypt.hash(password, 10);

    // criar o utilizador
    const novoUtilizador = new Utilizador({
      nome,
      email,
      password: passwordEncriptada
    });

    await novoUtilizador.save();
    res.status(201).json({ mensagem: 'Utilizador criado com sucesso' });

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao registar', detalhes: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // verificar se o utilizador existe
    const utilizador = await Utilizador.findOne({ email });
    if (!utilizador) {
      return res.status(400).json({ erro: 'Email ou password incorretos' });
    }

    // comparar a password com a encriptada
    const passwordCorreta = await bcrypt.compare(password, utilizador.password);
    if (!passwordCorreta) {
      return res.status(400).json({ erro: 'Email ou password incorretos' });
    }

    // criar o token JWT
    const token = jwt.sign(
      { id: utilizador._id, nome: utilizador.nome },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, nome: utilizador.nome });

  } catch (err) {
    res.status(500).json({ erro: 'Erro ao fazer login', detalhes: err.message });
  }
});

module.exports = router;