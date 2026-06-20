const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ erro: 'Acesso negado, token em falta' });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.utilizador = verificado; // guarda os dados do utilizador no pedido
    next(); // continua para a rota
  } catch (err) {
    res.status(401).json({ erro: 'Token inválido' });
  }
};