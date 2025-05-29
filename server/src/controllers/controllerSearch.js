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
        COALESCE(m.img_url, 'https://i.imgur.com/GOuG18o.jpeg') AS img_url
      FROM produtos p
      LEFT JOIN midias m ON p.id_produto = m.id_produto AND m.ordem = 1
      WHERE p.nome_produto LIKE ?
    `;
  
    const likeBusca = `%${termoBusca}%`;
  
    db.query(sql, [likeBusca], (err, resultados) => {
      if (err) {
        console.error("Erro ao buscar produtos: " + err);
        return res.status(500).json({ msg: "Erro ao buscar produtos" });
      }
  
      res.status(200).json(resultados);
    });
  };
  