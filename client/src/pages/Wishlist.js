import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AutenticaContext';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Wishlist = () => {
  const { user } = useContext(AuthContext);
  const [wishlist, setWishlist] = useState([]);
  const [wishlistMap, setWishlistMap] = useState({});
  const [addedToCart, setAddedToCart] = useState({});

  const fetchUserItems = () => {
    if (!user) return;

    axios.get(`http://localhost:5000/api/wishlist/${user.id}`)
      .then(res => {
        setWishlist(res.data);
        const map = res.data.reduce((acc, item) => {
          acc[item.id_produto] = true;
          return acc;
        }, {});
        setWishlistMap(map);
      })
      .catch(err => console.error("Erro ao buscar lista de desejos:", err));

    axios.get(`http://localhost:5000/api/carrinho/${user.id}`)
      .then(res => {
        const map = res.data.reduce((acc, item) => {
          acc[item.id_produto] = true;
          return acc;
        }, {});
        setAddedToCart(map);
      })
      .catch(err => console.error("Erro ao buscar carrinho:", err));
  };

  useEffect(() => {
    fetchUserItems();
  }, [user]);

  if (!user) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10 text-center">
        <h1 className="text-xl font-bold mb-4">Você precisa estar logado para ver sua lista de desejos</h1>
        <Link to="/login">
          <button className="mt-6 w-full bg-blue-800 text-white py-2 rounded">
            Ir para o Login
          </button>
        </Link>
      </div>
    );
  }

  const toggleWishlist = (id_produto) => {
    const alreadyAdded = wishlistMap[id_produto];

    if (alreadyAdded) {
      const confirmRemove = window.confirm("Tem certeza que deseja remover este item da lista de desejos?");
      if (!confirmRemove) return;

      axios.delete('http://localhost:5000/api/wishlist', {
        data: { id_usuario: user.id, id_produto }
      })
        .then(() => {
          setWishlistMap(prev => {
            const updated = { ...prev };
            delete updated[id_produto];
            return updated;
          });
          setWishlist(prev => prev.filter(item => item.id_produto !== id_produto));
        })
        .catch(err => console.error("Erro ao remover da lista de desejos:", err));
    } else {
      axios.post('http://localhost:5000/api/wishlist', {
        id_usuario: user.id,
        id_produto
      })
        .then(() => {
          setWishlistMap(prev => ({ ...prev, [id_produto]: true }));
          fetchUserItems();
        })
        .catch(err => console.error("Erro ao adicionar à lista de desejos:", err));
    }
  };

  const handleAddToCart = (produto) => {
    if (addedToCart[produto.id_produto]) return;

    axios.post('http://localhost:5000/api/carrinho', {
      id_usuario: user.id,
      id_produto: produto.id_produto
    })
      .then(() => {
        setAddedToCart(prev => ({ ...prev, [produto.id_produto]: true }));
      })
      .catch(err => console.error("Erro ao adicionar ao carrinho:", err));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Sua lista de desejos</h1>

      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Sua lista de desejos está vazia.</p>
      ) : (
        <div className="px-16 mt-4 grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
          <AnimatePresence>
            {wishlist.map(produto => (
              <motion.div
                key={produto.id_produto}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
                layout
                className="border p-4 rounded shadow relative bg-white"
              >
                {produto.img_url && (
                  <img
                    src={produto.img_url}
                    alt={produto.nome_produto}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                )}

                <button
                  onClick={() => toggleWishlist(produto.id_produto)}
                  title={wishlistMap[produto.id_produto] ? "Remover da lista de desejos" : "Adicionar à lista de desejos"}
                  className="absolute bottom-2 right-2 text-yellow-500 text-xl hover:scale-110 transition-transform"
                >
                  {wishlistMap[produto.id_produto] ? <FaStar /> : <FiStar />}
                </button>

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

                <h3 className="text-lg font-bold">{produto.nome_produto}</h3>
                <p className="text-sm mb-1">{produto.desc_produto}</p>
                <p className="text-green-600 font-semibold">R$ {produto.preco_produto}</p>
                <p className="text-sm text-gray-500">{produto.categoria_produto}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
