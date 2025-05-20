import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AutenticaContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion'; // 🎯 import framer-motion

const Carrinho = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:5000/api/carrinho/${user.id}`)
        .then(res => setItems(res.data))
        .catch(err => console.error("Erro ao buscar carrinho:", err));
    }
  }, [user]);

  const handleRemove = (id_produto) => {
    if (!window.confirm("Tem certeza que deseja remover este item do carrinho?")) return;

    axios.delete(`http://localhost:5000/api/carrinho/${user.id}/item/${id_produto}`)
      .then(() => {
        setItems(prevItems => prevItems.filter(item => item.id_produto !== id_produto));
      })
      .catch(err => {
        console.error("Erro ao remover item do carrinho:", err);
        alert("Não foi possível remover o item.");
      });
  };

  if (!user) {
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
        <h1 className="text-xl font-bold mb-4">Necessário Logar para ver o Carrinho</h1>
        <Link to='/login'>
          <button className="mt-6 w-full bg-blue-800 text-white py-2 rounded">
            Ir para o Login
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="px-16 py-6 bg-white rounded-lg shadow-md mt-10 max-w-screen-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Carrinho de {user.nome}</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Seu carrinho está vazio.</p>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {items.map(item => (
              <motion.div
                key={item.id_produto}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9, transition: { duration: 0.3 } }}
                layout
                className="border-b pb-3 flex justify-between items-center"
              >
                <div>
                  <p>{item.nome_produto}</p>
                  <p className="text-gray-600">R$ {(Number(item.preco_produto)).toFixed(2)}</p>
                </div>

                <button
                  onClick={() => handleRemove(item.id_produto)}
                  className="text-red-600 hover:text-red-800"
                  title="Remover item"
                >
                  <FaTrash size={20} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <button className="mt-6 w-full bg-green-600 text-white py-2 rounded">
        Comprar
      </button>
    </div>
  );
};

export default Carrinho;
