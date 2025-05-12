exports.pesquisar = (req, res) => {
    const db = req.app.get('db');
    const termoBusca = req.query.q || ''; // Exemplo: /produtos?q=camisa
  
    const sql = `
      SELECT 
        p.id_produto, 
        p.nome_produto, 
        p.desc_produto, 
        REPLACE(FORMAT(p.preco_produto, 2), '.', ',') AS preco_produto, 
        p.categoria_produto,
        m.img_url
        FROM produtos p
      LEFT JOIN midias m ON p.id_produto = m.id_produto AND m.ordem = 0
      WHERE p.nome_produto LIKE ?
    `;
  
    const likeBusca = `%${termoBusca}%`;
  
    db.query(sql, [likeBusca, likeBusca], (err, resultados) => {
      if (err) {
        console.error("Erro ao buscar produtos: " + err);
        return res.status(500).json({ msg: "Erro ao buscar produtos" });
      }
  
      res.status(200).json(resultados);
    });
  };
  