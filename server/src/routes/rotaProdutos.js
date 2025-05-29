const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.get('/produtos', (req, res) => {
    const query = `
      SELECT 
        p.id_produto, 
        p.nome_produto, 
        p.desc_produto, 
        REPLACE(FORMAT(p.preco_produto, 2), '.', ',') AS preco_produto, 
        p.categoria_produto,
        COALESCE(m.img_url, 'https://i.imgur.com/GOuG18o.jpeg') AS img_url
      FROM produtos p
      LEFT JOIN midias m ON p.id_produto = m.id_produto AND m.ordem = 1
    `;

    db.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao buscar produtos:', err);
        return res.status(500).json({ error: 'Erro ao buscar produtos' });
      }

      res.json(results);
    });
  });

  return router;
};