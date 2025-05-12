
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar.jsx';
import { useLocation } from 'react-router-dom';


const SearchPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api2/search?q=${encodeURIComponent(query)}`)
        .then((res) => {
          setProdutos(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Erro ao buscar produtos:", err);
          setLoading(false);
        });
    }
  }, [query]);  // Atualiza sempre que a query mudar

  return (
    <div className="p-4">
      {loading ? (
        <p>Buscando produtos...</p>
      ) : (
        <div className="mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <div key={produto.id_produto} className="border p-4 rounded shadow">
                {produto.img_url && (
                <img
                  src={produto.img_url}
                  alt={produto.nome_produto}
                  className="w-full h-48 object-cover rounded mb-2"
                />
                )}
                <h3 className="text-lg font-bold">{produto.nome_produto}</h3>
                <p>{produto.desc_produto}</p>
                <p className="text-green-600 font-semibold">R$ {produto.preco_produto}</p>
                <p className="text-sm text-gray-500">{produto.categoria_produto}</p>
              </div>
            ))
          ) : (
            <p>Nenhum produto encontrado para "{query}".</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;