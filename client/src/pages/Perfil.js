import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AutenticaContext';
import { Link } from 'react-router-dom';

const Perfil = () => {
  const {user, logout} = useContext(AuthContext);

  if(!user){
    return (
      <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold mb-4">Você precisa estar Logado para ver o Perfil</h2>
        <Link to='/login'>
        <button className="mt-6 w-full bg-blue-800 text-white py-2 rounded">
          Ir para o Login
        </button>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Seu Perfil</h2>
      {user ? (
        <div className="space-y-2">
          <p><strong>Nome:</strong> {user.nome}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Carregando dados do perfil...</p>
      )}
    </div>
  );
};

export default Perfil;