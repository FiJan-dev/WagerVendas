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

const InfoUsuario = () => {
  const {user, setUser, logout} = useContext(AuthContext);
  const [mostra, setMostra] = useState(false);
  const [editando, setEditando] = useState({
  nome_usuario: false,
  email_usuario: false,
  cpf_usuario: false,
  senha_usuario: false,
  endereco_usuario: false
  });
  const [novaInfo, setNovaInfo] = useState({
  nome_usuario: '',
  email_usuario: '',
  cpf_usuario: '',
  senha_usuario: '',
  endereco_usuario: ''
  });
  const [values, setValues] = useState({
    id: '',
    campo: '',
    valorNovo: ''
  });
  

  useEffect(() => {
    if (user) {
      setNovaInfo({ 
        nome_usuario: user.nome || '',
        email_usuario: user.email || '',
        senha_usuario: user.senha || '',
        cpf_usuario: user.cpf| '',
        endereco_usuario: user.endereco || '',
      });
      setEditando({
        nome_usuario: false,
        email_usuario: false,
        senha_usuario: false,
        cpf_usuario: false,
        endereco_usuario: false,
      });
    }
  }, [user]);

  const iniciarEdicao = (campo) => {
    setEditando(prev => ({ ...prev, [campo]: true }));
  };

  const cancelarEdicao = (campo) => {
    setNovaInfo(prev => ({ ...prev, [campo]: user[campoMap[campo]] || '' }));
    setEditando(prev => ({ ...prev, [campo]: false }));
  };

  if (!user) {
    return null;
  }

  const campoMap = {
          nome_usuario: 'nome',
          email_usuario: 'email',
          endereco_usuario: 'endereco',
          cpf_usuario: 'cpf',
          senha_usuario: 'senha'
        };

  const handleSubmit = async (e, campo) => {
    e.preventDefault();

    const valorNovo = novaInfo[campo];

    const payload = {
    id: user.id,
    campo,
    valorNovo
    };

    try{
      const res = await axios.post('http://localhost:5000/api/editar', payload);
      if(res.status === 200){
        setEditando(prev => ({ ...prev, [campo]: false }));
        const campoCorreto = campoMap[campo];
        setUser((prev) => ({ ...prev, [campoCorreto]: valorNovo }));
      }
    } catch (err){
      if(err.response){
        alert('Erro ao editar');
      } 
    }
};

  return (
  <>
    <div className='max-w-lg mx-auto p-2'>
      <p className='text-left font-bold text-xl'>Dados da Sua Conta</p>
    </div>
    <form onSubmit={handleSubmit}>
    {/*Nome*/}
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-2 border-2 border-gray-100 space-y-6">
          <div className="flex flex-col items-start space-y-2">
            <div className="flex justify-between items-center w-full">
              <p className="text-lg font-semibold">Nome:</p>
              {!editando.nome_usuario ? (
                <button type="button" onClick={() => iniciarEdicao('nome_usuario')} className="text-blue-600">
                  <FiEdit2 />
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button type="submit" onClick={(e) => handleSubmit(e, 'nome_usuario')} className="text-green-600">
                    <FiCheck />
                  </button>
                  <button type="button" onClick={() => cancelarEdicao('nome_usuario')} className="text-red-600">
                    <FiX />
                  </button>
                </div>
              )}
            </div>

            {editando.nome_usuario ? (
              <input
                type="text"
                value={novaInfo.nome_usuario}
                onChange={(e) => setNovaInfo(prev => ({ ...prev, nome_usuario: e.target.value }))}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            ) : (
              <p className="text-mb">{user.nome}</p>
            )}
            <div className="w-full h-px bg-gray-300 my-4" />
          </div>
        </div>

        {/* Email */}
        <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-2 border-2 border-gray-100 space-y-6">
          <div className="flex flex-col items-start space-y-2">
            <div className="flex justify-between items-center w-full">
              <p className="text-lg font-semibold">Email:</p>
              {!editando.email_usuario ? (
                <button type="button" onClick={() => iniciarEdicao('email_usuario')} className="text-blue-600">
                  <FiEdit2 />
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button type="submit" onClick={(e) => handleSubmit(e, 'email_usuario')} className="text-green-600">
                    <FiCheck />
                  </button>
                  <button type="button" onClick={() => cancelarEdicao('email_usuario')} className="text-red-600">
                    <FiX />
                  </button>
                </div>
              )}
            </div>

            {editando.email_usuario ? (
              <input
                type="text"
                value={novaInfo.email_usuario}
                onChange={(e) => setNovaInfo(prev => ({ ...prev, email_usuario: e.target.value }))}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            ) : (
              <p className="text-mb">{user.email}</p>
            )}
            <div className="w-full h-px bg-gray-300 my-4" />
          </div>
        </div>

    {/*cpf*/}
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-2 border-2 border-gray-100 space-y-6">
          <div className="flex flex-col items-start space-y-2">
            <div className="flex justify-between items-center w-full">
              <p className="text-lg font-semibold">CPF:</p>
              {!editando.cpf_usuario ? (
                <button type="button" onClick={() => iniciarEdicao('cpf_usuario')} className="text-blue-600">
                  <FiEdit2 />
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button type="submit" onClick={(e) => handleSubmit(e, 'cpf_usuario')} className="text-green-600">
                    <FiCheck />
                  </button>
                  <button type="button" onClick={() => cancelarEdicao('cpf_usuario')} className="text-red-600">
                    <FiX />
                  </button>
                </div>
              )}
            </div>

            {editando.cpf_usuario ? (
              <input
                type="text"
                value={novaInfo.cpf_usuario}
                onChange={(e) => setNovaInfo(prev => ({ ...prev, cpf_usuario: e.target.value }))}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            ) : (
              <p className="text-mb">{user.cpf}</p>
            )}
            <div className="w-full h-px bg-gray-300 my-4" />
          </div>
        </div>

    {/*Endereço*/}
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-2 border-2 border-gray-100 space-y-6">
          <div className="flex flex-col items-start space-y-2">
            <div className="flex justify-between items-center w-full">
              <p className="text-lg font-semibold">Endereço:</p>
              {!editando.endereco_usuario ? (
                <button type="button" onClick={() => iniciarEdicao('endereco_usuario')} className="text-blue-600">
                  <FiEdit2 />
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button type="submit" onClick={(e) => handleSubmit(e, 'endereco_usuario')} className="text-green-600">
                    <FiCheck />
                  </button>
                  <button type="button" onClick={() => cancelarEdicao('endereco_usuario')} className="text-red-600">
                    <FiX />
                  </button>
                </div>
              )}
            </div>

            {editando.endereco_usuario ? (
              <input
                type="text"
                value={novaInfo.endereco_usuario}
                onChange={(e) => setNovaInfo(prev => ({ ...prev, endereco_usuario: e.target.value }))}
                className="border border-gray-300 rounded px-3 py-1 w-full"
              />
            ) : (
              <p className="text-mb">{user.endereco}</p>
            )}
            <div className="w-full h-px bg-gray-300 my-4" />
          </div>
        </div>

    {/*Senha*/}
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-2 border-2 border-gray-100 space-y-6">
      <div className="flex flex-col items-start space-y-2">
        <div className="flex justify-between items-center w-full">
          <p className="text-lg font-semibold">Senha:</p>
          {!editando.senha_usuario ? (
            <button type="button" onClick={() => iniciarEdicao('senha_usuario')} className="text-blue-600">
              <FiEdit2 />
            </button>
          ) : (
            <div className="flex space-x-2">
              <button type="submit" onClick={(e) => handleSubmit(e, 'senha_usuario')} className="text-green-600">
                <FiCheck />
              </button>
              <button type="button" onClick={() => cancelarEdicao('senha_usuario')} className="text-red-600">
                <FiX />
              </button>
            </div>
          )}
        </div>

        {editando.senha_usuario ? (
          <input
            type="text"
            value={novaInfo.senha_usuario}
            onChange={(e) => setNovaInfo(prev => ({ ...prev, senha_usuario: e.target.value }))}
            className="border border-gray-300 rounded px-3 py-1 w-full"
          />
        ) : (
          <div className="flex justify-between items-center w-full">
            <p className='text-mb'>
              {mostra ? user.senha : '••••••••'}
            </p>
            <button
              type="button"
              onClick={() => setMostra(!mostra)}
              className='text-gray-500 hover:text-gray-700 focus:outline-none'
              aria-label={mostra ? 'Esconder senha' : 'Mostrar senha'}
            >
              {mostra ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>
        )}
        <div className="w-full h-px bg-gray-300 my-4" />
      </div>
    </div>
  </form>
  </>
  );
};

export default InfoUsuario;