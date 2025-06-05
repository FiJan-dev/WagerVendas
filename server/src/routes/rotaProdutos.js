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
        p.id_vendedor,
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

  router.get('/produto/:id', (req, res) => {
  const sqlProduto = `SELECT * FROM produtos WHERE id_produto = ?`;
  const sqlMidias = `SELECT * FROM midias WHERE id_produto = ?`;

  db.query(sqlProduto, [req.params.id], (err, produto) => {
    if (err) {
      console.error('Erro ao buscar produto:', err);
      return res.status(500).json({ error: 'Erro ao buscar produto' });
    }

    if (produto.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    db.query(sqlMidias, [req.params.id], (err2, midias) => {
      if (err2) {
        console.error('Erro ao buscar mídias do produto:', err2);
        return res.status(500).json({ error: 'Erro ao buscar mídias do produto' });
      }

      const response = {
        ...produto[0],
        midias,
      };

      res.json(response);
    });
  });
});
return router;
};