import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AutenticaContext";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"; 
import { FaStar } from "react-icons/fa";                 
import { FiStar, FiShoppingCart } from "react-icons/fi"; 
import axios from "axios"; 


const Anuncios = () => {
  const { user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const [addedToCart, setAddedToCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/produtos');
      setProdutos(res.data);
      setLoading(false);
    } catch (err) {
      setError('Erro ao buscar produtos.');
      setLoading(false);
    }
  };

  const fetchUserItems = () => {
    if (user) {
      axios.get(`http://localhost:5000/api/wishlist/${user.id}`)
        .then(res => {
          const wishlistItems = res.data.reduce((acc, item) => {
            acc[item.id_produto] = true;
            return acc;
          }, {});
          setWishlist(wishlistItems);
        })
        .catch(err => console.error("Erro ao buscar lista de desejos:", err));

      axios.get(`http://localhost:5000/api/carrinho/${user.id}`)
        .then(res => {
          const cartItems = res.data.reduce((acc, item) => {
            acc[item.id_produto] = true;
            return acc;
          }, {});
          setAddedToCart(cartItems);
        })
        .catch(err => console.error("Erro ao buscar carrinho:", err));
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  useEffect(() => {
    if (user) fetchUserItems();
  }, [user]);

  const toggleWishlist = (id_produto) => {
  if (!user) return alert("Você precisa estar logado para usar a lista de desejos.");

  if (wishlist[id_produto]) {
    axios.delete('http://localhost:5000/api/wishlist', {
      data: { id_usuario: user.id, id_produto }
    }).then(() => {
      setWishlist(prev => {
        const updated = { ...prev };
        delete updated[id_produto];
        return updated;
      });
    });
  } else {
    axios.post('http://localhost:5000/api/wishlist', {
      id_usuario: user.id,
      id_produto
    }).then(() => {
      setWishlist(prev => ({ ...prev, [id_produto]: true }));
    });
  }
};

const handleAddToCart = (produto) => {
  if (!user) return alert("Você precisa estar logado para adicionar ao carrinho.");

  if (!addedToCart[produto.id_produto]) {
    axios.post('http://localhost:5000/api/carrinho', {
      id_usuario: user.id,
      id_produto: produto.id_produto
    }).then(() => {
      setAddedToCart(prev => ({ ...prev, [produto.id_produto]: true }));
    });
  }
};

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <>
      <Link
        to="/criaproduto"
        className="block mx-auto mt-10 px-6 py-3 bg-blue-200 text-blue-800 font-semibold text-center rounded-lg shadow-md hover:bg-blue-300 transition duration-300 w-max"
      >
        Criar um Anúncio
      </Link>
      <p></p>
      <div className="p-4">
      <h1 className=" py-4 text-2xl font-bold mb-4 text-center">Seus Anúncios</h1>
        <div className="px-16 mt-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {produtos
          .filter(produto => produto.id_vendedor === user.id)
          .map(produto => (
            <motion.div
              key={produto.id_produto}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
              layout
              className="border p-4 rounded shadow relative bg-white"
            >
              <Link to={`/produto/${produto.id_produto}`} className="block">
                {produto.img_url && (
                  <img
                    src={produto.img_url}
                    alt={produto.nome_produto}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                )}

                {/* Botão wishlist */}
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
                    className="opacity-40 cursor-not-allowed absolute bottom-2 right-2 text-yellow-500 text-xl"
                  >
                    <FiStar />
                  </button>
                )}

                {/* Botão carrinho */}
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
                <p className="text-sm mb-1">{produto.desc_produto}</p>
                <p className="text-green-600 font-semibold">R$ {produto.preco_produto}</p>
                <p className="text-sm text-gray-500">{produto.categoria_produto}</p>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Anuncios;
