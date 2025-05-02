exports.pesquisar = (req, res) => {
    const db = req.app.get('db');
    const termoBusca = req.query.q || ''; // Exemplo: /produtos?q=camisa
  
    const sql = `
      SELECT 
        id_produto, 
        nome_produto, 
        desc_produto AS descricao, 
        preco_produto AS preco, 
        categoria_produto AS categoria 
      FROM produtos
      WHERE nome_produto LIKE ? OR desc_produto LIKE ?
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
  