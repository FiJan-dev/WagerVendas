import React, { useState } from 'react';

function Carrinho() {
  const [produtos, setProdutos] = useState([
    { id: 1, nome: 'Produto 1', preco: 100.0, imagem: 'https://via.placeholder.com/150' },
    { id: 2, nome: 'Produto 2', preco: 200.0, imagem: 'https://via.placeholder.com/150' },
    { id: 3, nome: 'Produto 3', preco: 300.0, imagem: 'https://via.placeholder.com/150' },
  ]);

  const removerProduto = (id) => {
    setProdutos(produtos.filter((produto) => produto.id !== id));
  };

  return (
    <div>
      <h1>Carrinho</h1>
      {produtos.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {produtos.map((produto) => (
            <li
              key={produto.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px',
                border: '1px solid #ccc',
                padding: '10px',
                borderRadius: '5px',
              }}
            >
              <img
                src={produto.imagem}
                alt={produto.nome}
                style={{ width: '100px', height: '100px', marginRight: '20px' }}
              />
              <div style={{ flex: 1 }}>
                <h2>{produto.nome}</h2>
                <p>Preço: R$ {produto.preco.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removerProduto(produto.id)}
                style={{
                  backgroundColor: '#ff4d4d',
                  color: 'white',
                  border: 'none',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Carrinho;