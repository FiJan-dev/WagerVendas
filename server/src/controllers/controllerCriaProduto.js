exports.criarProduto = (req, res) => {
  const db = req.app.get("db");
  const { nome, descricao, categoria, preco, id_vendedor, imagens } = req.body;

  const sqlProduto = `INSERT INTO produtos (nome_produto, desc_produto, categoria_produto, preco_produto, id_vendedor) VALUES (?, ?, ?, ?, ?)`;

  console.log(req.body);

  db.query(
    sqlProduto,
    [nome, descricao, categoria, preco, id_vendedor],
    (err, result) => {
      if (err) {
        console.error("Erro ao criar produto:", err);
        return res.status(500).json({ msg: "Erro ao criar produto" });
      }

      const idProduto = result.insertId;

      if (!imagens || imagens.length === 0) {
        return res.status(201).json({ message: "Produto criado com sucesso!", id_produto: idProduto });
      }

      const sqlMidias = `INSERT INTO midias (ordem, img_url, id_produto) VALUES ?`;

      const imagensArray = Array.isArray(imagens) ? imagens : [imagens];

      const valuesMidias = imagensArray.map((img, index) => [
        index + 1,
        img,
        idProduto,
      ]);

      db.query(sqlMidias, [valuesMidias], (err2) => {
        if (err2) {
          console.error("Erro ao salvar mídias:", err2);
          return res.status(500).json({ msg: "Erro ao salvar mídias" });
        }

        res
          .status(201)
          .json({ message: "Produto e mídias criados com sucesso!", id_produto: idProduto });
      });
    }
  );
};

exports.getProduto = (req, res) => {
  const db = req.app.get("db");
  const { id } = req.params;

  const sqlProduto = `SELECT * FROM produtos WHERE id_produto = ?`;
  const sqlMidias = `SELECT * FROM midias WHERE id_produto = ?`;

  db.query(sqlProduto, [id], (err, result) => {
    if (err) {
      console.error("Erro ao buscar produto:", err);
      return res.status(500).json({ msg: "Erro ao buscar produto" });
    }

    if (result.length === 0) {
      return res.status(404).json({ msg: "Produto não encontrado" });
    }

    const produto = result[0];

    db.query(sqlMidias, [id], (err2, result2) => {
      if (err2) {
        console.error("Erro ao buscar mídias:", err2);
        return res.status(500).json({ msg: "Erro ao buscar mídias" });
      }

      produto.imagens = result2.map((midia) => midia.img_url);

      res.status(200).json(produto);
    });
  });
};
