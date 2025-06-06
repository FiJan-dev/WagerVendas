const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  router.post('/carrinho', (req, res) => {
    const { id_usuario, id_produto } = req.body;

    const insertQuery = `
      INSERT INTO pedidos (id_usuario, id_produto)
      VALUES (?, ?)
    `;

    db.query(insertQuery, [id_usuario, id_produto], (err) => {
      if (err) {
        console.error("Erro ao adicionar produto ao carrinho:", err);
        return res.status(500).json({ msg: 'Erro ao adicionar produto ao carrinho' });
      }

      res.status(200).json({ msg: 'Produto adicionado ao carrinho com sucesso' });
    });
  });

  router.get('/carrinho/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = `
      SELECT 
      p.id_produto,
      p.nome_produto,
      p.preco_produto,
      COALESCE(m.img_url, 'https://i.imgur.com/GOuG18o.jpeg') AS img_url
    FROM pedidos pe
    JOIN produtos p ON pe.id_produto = p.id_produto
    LEFT JOIN midias m ON p.id_produto = m.id_produto
    WHERE pe.id_usuario = ? AND pe.status_pedido = 'carrinho'
    `;
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Erro ao buscar carrinho:', err);
        return res.status(500).json({ msg: 'Erro ao buscar carrinho' });
      }
      res.json(results);  // Retorna os itens do carrinho
    });
  });

  router.delete('/carrinho/:userId/item/:produtoId', (req, res) => {
  const { userId, produtoId } = req.params;

  const sql = 'DELETE FROM pedidos WHERE id_usuario = ? AND id_produto = ? AND status_pedido = "carrinho" LIMIT 1';

  db.query(sql, [userId, produtoId], (err, result) => {
    if (err) {
      console.error('Erro ao remover item do carrinho:', err);
      return res.status(500).json({ msg: 'Erro ao remover item do carrinho' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ msg: 'Item não encontrado no carrinho' });
    }
    res.json({ msg: 'Item removido com sucesso' });
  });
});

  return router;
};
