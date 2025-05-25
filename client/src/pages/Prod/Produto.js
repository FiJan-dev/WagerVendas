import { useState, useEffect } from "react";
import "./style.css";
import axios from "axios";

const Produto = () => {
  const [produto, setProduto] = useState([]);

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const res = await axios.get(`/CriaProduto/${produto.id_produto}`);
        if (res.status === 200) {
          setProduto(res.data);
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };
    fetchProduto();
  }, [produto]);

  if (!produto) {
    return <p>Produto não encontrado</p>;
  }

  return (
    <div className="container">
      <div className="panel">
        <div className="column">
          <div className="gallery">
            <img src={produto.imagem} alt={produto.nome} />
          </div>
        </div>
        <div className="column">
          <h1>{produto.nome}</h1>
          <p>R$ {produto.preco}</p>
          <button>Adicionar ao carrinho</button>
          <button>Adicionar aos favoritos</button>
          <button>Comprar Agora</button>
          <Info descricao={produto.descricao} />
        </div>
      </div>
    </div>
  );
};

const Info = ({ descricao }) => {
  return (
    <div className="info">
      <h2>Informações do Produto</h2>
      <p>{descricao}</p>
    </div>
  );
};

export default Produto;
