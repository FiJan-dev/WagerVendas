import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { AuthContext } from '../../context/AutenticaContext';

const Produto = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [produto, setProduto] = useState([]);
  const [wishlist, setWishlist] = useState({});
  const [addedToCart, setAddedToCart] = useState({});

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

const toggleWishlist = (id_produto) => {
    const alreadyAdded = wishlist[id_produto];

    if (!user) return alert("Você precisa estar logado para modificar a lista de desejos.");

    if (alreadyAdded) {
      axios.delete('http://localhost:5000/api/wishlist', {
        data: { id_usuario: user.id, id_produto }
      })
      .then(() => {
        setWishlist(prev => {
          const updated = { ...prev };
          delete updated[id_produto];
          return updated;
        });
      })
      .catch(err => console.error("Erro ao remover da lista de desejos:", err));
    } else {
      axios.post('http://localhost:5000/api/wishlist', {
        id_usuario: user.id,
        id_produto
      })
      .then(() => {
        setWishlist(prev => ({ ...prev, [id_produto]: true }));
      })
      .catch(err => console.error("Erro ao adicionar à lista de desejos:", err));
    }
  };

  const handleAddToCart = (produto) => {
    if (!user) return alert("Você precisa estar logado para adicionar ao carrinho.");

    if (!addedToCart[produto.id_produto]) {
      axios.post('http://localhost:5000/api/carrinho', {
        id_usuario: user.id,
        id_produto: produto.id_produto
      })
      .then(() => {
        setAddedToCart(prev => ({ ...prev, [produto.id_produto]: true }));
      })
      .catch(err => console.error("Erro ao adicionar ao carrinho:", err));
    }
  };

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/produto/${id}`);
        if (res.status === 200) {
          setProduto(res.data);
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      }
    };
    if (id) fetchProduto();
  }, [id]);

  useEffect(() => {
    if (user) fetchUserItems();
  }, [user]);

  if (!produto) {
    return <p>Produto não encontrado</p>;
  }

  return (
    <div className="container">
      <div className="panel">
        <div className="column">
          <div className="gallery">
            <img src={produto.midias?.[0]?.img_url} alt={produto.nome_produto} />
          </div>
        </div>
        <div className="column">
          <h1>{produto.nome_produto}</h1>
          <p>R$ {produto.preco_produto}</p>
          <div className="flex gap-4 my-4">
          {user ? (
                          <button
                            onClick={() => toggleWishlist(produto.id_produto)}
                            title={wishlist[produto.id_produto] ? "Remover da lista de desejos" : "Adicionar à lista de desejos"}
                            className=" text-yellow-500 text-xl hover:scale-110 transition-transform"
                          >
                            {wishlist[produto.id_produto] ? <FaStar /> : <FiStar />}
                          </button>
                        ) : (
                          <button
                            title="Você deve estar logado para adicionar itens à sua lista de desejos!"
                            disabled
                            className="opacity-40 cursor-not-allowed text-yellow-500 text-xl"
                          >
                            <FiStar />
                          </button>
                        )}


          
          {user ? (
                          <button
                            onClick={() => handleAddToCart(produto)}
                            title={addedToCart[produto.id_produto] ? "Produto já está no carrinho" : "Adicionar ao carrinho"}
                            disabled={addedToCart[produto.id_produto]}
                            className={` text-blue-500 text-xl transition-opacity ${
                              addedToCart[produto.id_produto] ? "opacity-40 cursor-not-allowed" : "hover:scale-110"
                            }`}
                          >
                            <FiShoppingCart />
                          </button>
                        ) : (
                          <button
                            title="Você deve estar logado para adicionar itens ao seu carrinho!"
                            disabled
                            className=" text-blue-500 text-xl opacity-40 cursor-not-allowed"
                          >
                            <FiShoppingCart />
                          </button>
                        )}
                        </div>
          <button>Comprar Agora</button> 
          <Info descricao={produto.desc_produto} />
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
