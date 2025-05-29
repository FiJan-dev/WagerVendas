import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AutenticaContext';
import { 
   FiEye, 
   FiEyeOff,
   FiEdit2, 
   FiCheck, 
   FiX
} from '../../node_modules/react-icons/fi';
import axios from 'axios';

const MetodosPG = () => {
  const { user, lougout } = useContext(AuthContext);

  const [metodos, setMetodos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [valoresEdicao, setValoresEdicao] = useState({});
  const [novoMetodo, setNovoMetodo] = useState({ tipo: '', valor: '' });
  const [novoCadastro, setNovoCadastro] = useState(false);

  useEffect(() => {
  const fetchMetodos = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/pagamento/${user.id}`);
      setMetodos(res.data);
    } catch (err) {
      console.error('Erro ao buscar métodos', err);
    }
  };

  if (user?.id) {
    fetchMetodos();
  }
}, [user]);


  const handleEditar = async (id, tipo) => {
    const valor = valoresEdicao[id];
    try {
      await axios.post(`http://localhost:5000/api/pagamento/editar`, {
        id,
        tipo,
        valor
      });
      setMetodos((prev) =>
        prev.map((m) => (m.id === id ? { ...m, valor } : m))
      );
      setEditandoId(null);
    } catch (err) {
      alert('Erro ao editar método');
    }
  };

  const handleCadastrar = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/pagamento`, {
        id_usuario: user.id,
        tipo: novoMetodo.tipo,
        valor: novoMetodo.valor
      });

      const novoMetodoFormatado = {
      id: res.data.id_metodo,  // pega id_metodo do backend e atribui para id
      tipo: res.data.tipo,
      valor: res.data.valor
    };

      setMetodos((prev) => [...prev, novoMetodoFormatado]);
      setNovoMetodo({ tipo: '', valor: '' });
      setNovoCadastro(false);
    } catch (err) {
      alert('Erro ao cadastrar método');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Meus Métodos de Pagamento</h2>

      {/* Lista de métodos */}
      {metodos.map((metodo) => (
        <div key={metodo.id} className="bg-white rounded-lg shadow-md p-4 mb-4 border">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{metodo.tipo}:</p>

            {editandoId === metodo.id ? (
              <div className="flex items-center w-full ml-4">
                <input
                  type="text"
                  value={valoresEdicao[metodo.id] || ''}
                  onChange={(e) =>
                    setValoresEdicao((prev) => ({
                      ...prev,
                      [metodo.id]: e.target.value
                    }))
                  }
                  className="border px-2 py-1 rounded w-full"
                />
                <button
                  onClick={() => handleEditar(metodo.id, metodo.tipo)}
                  className="text-green-600 ml-2"
                >
                  <FiCheck />
                </button>
                <button
                  onClick={() => setEditandoId(null)}
                  className="text-red-600 ml-2"
                >
                  <FiX />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span>{metodo.valor}</span>
                <button
                  onClick={() => {
                    setEditandoId(metodo.id);
                    setValoresEdicao((prev) => ({
                      ...prev,
                      [metodo.id]: metodo.valor
                    }));
                  }}
                  className="text-blue-600"
                >
                  <FiEdit2 />
                </button>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Cadastro de novo método */}
      {novoCadastro ? (
        <div className="bg-white rounded-lg shadow-md p-4 border">
          <h3 className="font-semibold mb-2">Cadastrar Novo Método</h3>
          <select
            value={novoMetodo.tipo}
            onChange={(e) =>
              setNovoMetodo((prev) => ({ ...prev, tipo: e.target.value }))
            }
            className="border px-2 py-1 rounded w-full mb-2"
          >
            <option value="">Selecione o tipo</option>
            <option value="PIX">PIX</option>
            <option value="Cartão">Cartão de Crédito/Débito</option>
          </select>
          <input
            type="text"
            placeholder="Chave Pix ou número do cartão"
            value={novoMetodo.valor}
            onChange={(e) =>
              setNovoMetodo((prev) => ({ ...prev, valor: e.target.value }))
            }
            className="border px-2 py-1 rounded w-full mb-2"
          />
          <div className="flex justify-end space-x-2">
            <button onClick={handleCadastrar} className="text-green-600">
              <FiCheck />
            </button>
            <button onClick={() => setNovoCadastro(false)} className="text-red-600">
              <FiX />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setNovoCadastro(true)}
          className="mt-4 text-blue-600 flex items-center"
        >
          <FiEdit2 className="mr-1" /> Adicionar Novo Método
        </button>
      )}
    </div>
  );
};

export default MetodosPG;