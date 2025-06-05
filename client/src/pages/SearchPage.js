
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar.jsx';
import { useLocation } from 'react-router-dom';
import { FiStar } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { AuthContext } from '../context/AutenticaContext';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';




const SearchPage = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState({});
  const [addedToCart, setAddedToCart] = useState({});
  const {user} = useContext(AuthContext);
  const location = useLocation();

  const query = new URLSearchParams(location.search).get('q');

  const fetchUserItems = () => {
    if (user) {
      // Buscar itens na lista de desejos
      axios.get(`http://localhost:5000/api/wishlist/${user.id}`)
        .then((res) => {
          const wishlistItems = res.data.reduce((acc, item) => {
            acc[item.id_produto] = true;
            return acc;
          }, {});
          setWishlist(wishlistItems);  // Atualiza o estado da lista de desejos
        })
        .catch((err) => console.error("Erro ao buscar lista de desejos:", err));

      // Buscar itens no carrinho (tabela de pedidos)
      axios.get(`http://localhost:5000/api/carrinho/${user.id}`)
        .then((res) => {
          const cartItems = res.data.reduce((acc, item) => {
            acc[item.id_produto] = true;
            return acc;
          }, {});
          setAddedToCart(cartItems);  // Atualiza o estado do carrinho (pedidos)
        })
        .catch((err) => console.error("Erro ao buscar carrinho:", err));
  }
  };

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`)
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

  useEffect(() => {
    if (user) {
      fetchUserItems();
    }
  }, [user]);

  const toggleWishlist = (id_produto) => {
    const alreadyAdded = wishlist[id_produto];

      if (alreadyAdded && user) {
    // Se o produto já está na wishlist, remova-o
    axios
      .delete('http://localhost:5000/api/wishlist', {
        data: { id_usuario: user.id, id_produto }
      })
      .then(() => {
        setWishlist((prev) => {
          const updatedWishlist = { ...prev };
          delete updatedWishlist[id_produto]; // Remove da lista de desejos
          return updatedWishlist;
        });
      })
      .catch((err) => {
        console.error("Erro ao remover da lista de desejos:", err);
      });
      } else if (!alreadyAdded && user) {
        axios.post('http://localhost:5000/api/wishlist', {
          id_usuario: user.id,
          id_produto
        })
        .then(() => {
          setWishlist((prev) => ({
            ...prev,
            [id_produto]: true,
          }));
        })
        .catch((err) => {
          console.error("Erro ao adicionar à lista de desejos:", err);
        });
      }
    };

  const handleAddToCart = (produto) => {
    if (!addedToCart[produto.id_produto] && user) {
      axios.post('http://localhost:5000/api/carrinho', {
        id_usuario: user.id,
        id_produto: produto.id_produto
      })
      .then(() => {
        setAddedToCart((prev) => ({
          ...prev,
          [produto.id_produto]: true
        }));
      })
      .catch((err) => {
        console.error("Erro ao adicionar ao carrinho:", err);
      });
    }
  };


  return (
  <div className="p-4">
    {loading ? (
      <p>Buscando produtos...</p>
    ) : (
      <div className="px-16 mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
        <AnimatePresence>
          {produtos.length > 0 ? (
            produtos.map((produto) => (
              <motion.div
                key={produto.id_produto}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                layout
                className="border p-4 rounded shadow relative"
              >
                {produto.img_url && (
                  <img
                    src={produto.img_url}
                    alt={produto.nome_produto}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                )}

                {user ? (
                  <button
                    onClick={() => toggleWishlist(produto.id_produto)}
                    title={wishlist[produto.id_produto] ? "Remover da lista de desejos" : "Adicionar à lista de desejos"}
                    className="absolute bottom-2 right-2 text-yellow-500 text-xl hover:scale-110 transition-transform"
                  >
                    {wishlist[produto.id_produto] ? <FaStar /> : <FiStar />}
                  </button>
                ) : (
                  <button
                    title="Você deve estar logado para adicionar itens à sua lista de desejos!"
                    disabled
                    className="opacity-40 cursor-not-allowed absolute bottom-2 right-2 text-yellow-500 text-xl hover:scale-110"
                  >
                    <FiStar />
                  </button>
                )}

                {user ? (
                  <button
                    onClick={() => handleAddToCart(produto)}
                    title={addedToCart[produto.id_produto] ? "Produto já está no carrinho" : "Adicionar ao carrinho"}
                    disabled={addedToCart[produto.id_produto]}
                    className={`absolute bottom-2 left-2 text-blue-500 text-xl transition-opacity ${
                      addedToCart[produto.id_produto] ? "opacity-40 cursor-not-allowed" : "hover:scale-110"
                    }`}
                  >
                    <FiShoppingCart />
                  </button>
                ) : (
                  <button
                    title="Você deve estar logado para adicionar itens ao seu carrinho!"
                    disabled
                    className="absolute bottom-2 left-2 text-blue-500 text-xl opacity-40 cursor-not-allowed"
                  >
                    <FiShoppingCart />
                  </button>
                )}

                <h3 className="text-lg font-bold">{produto.nome_produto}</h3>
                <p>{produto.desc_produto}</p>
                <p className="text-green-600 font-semibold">R$ {produto.preco_produto}</p>
                <p className="text-sm text-gray-500">{produto.categoria_produto}</p>
              </motion.div>
            ))
          ) : (
            <p>Nenhum produto encontrado para "{query}".</p>
          )}
        </AnimatePresence>
      </div>
    )}
  </div>
  );
};

export default SearchPage;