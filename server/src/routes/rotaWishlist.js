const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.post('/wishlist', (req, res) => {
    const { id_usuario, id_produto } = req.body;

    const sql = "INSERT INTO lista_de_desejos (id_usuario, id_produto) VALUES (?, ?)";

    db.query(sql, [id_usuario, id_produto], (err, result) => {
      if (err) return res.status(500).json({ msg: 'Erro ao adicionar à lista' });
      res.status(200).json({ msg: 'Produto adicionado à lista de desejos' });
    });
  });

  router.get('/wishlist/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = `
    SELECT p.id_produto, p.nome_produto, REPLACE(FORMAT(p.preco_produto, 2), '.', ',') AS preco_produto, COALESCE(m.img_url, 'https://i.imgur.com/GOuG18o.jpeg') AS img_url
    FROM lista_de_desejos l
    JOIN produtos p ON l.id_produto = p.id_produto
    LEFT JOIN (
      SELECT id_produto, img_url
      FROM midias
      WHERE ordem = 1
    ) m ON p.id_produto = m.id_produto
    WHERE l.id_usuario = ?
  `;
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Erro ao buscar wishlist:', err);
        return res.status(500).json({ msg: 'Erro ao buscar lista de desejos' });
      }
      console.log(results)
      res.json(results);  // Retorna os itens da wishlist
    });
  });

  router.delete('/wishlist', (req, res) => {
    const { id_usuario, id_produto } = req.body;

    const sql = "DELETE FROM lista_de_desejos WHERE id_usuario = ? AND id_produto = ?";

    db.query(sql, [id_usuario, id_produto], (err, result) => {
      if (err) {
        console.error('Erro ao remover da lista de desejos:', err);
        return res.status(500).json({ msg: 'Erro ao remover da lista de desejos' });
      }
      res.status(200).json({ msg: 'Produto removido da lista de desejos' });
    });
  });

  return router;
};
