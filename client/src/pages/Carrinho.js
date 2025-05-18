import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AutenticaContext';
import { Link, useNavigate } from 'react-router-dom';

const Carrinho = () => {
  const {user, logout} = useContext(AuthContext);
  const navigate = useNavigate();

  const items = [
    { id: 1, name: "Apple Watch", price: 1300.00 },
    { id: 2, name: "Apple Watch", price: 2000.00 }
  ];


  useEffect(()=>{
  if(!user){
    navigate('/login')
  }
  }, [user, navigate]);

  if (!user) {
    return null;
  }
  
  return (
    <div className="p-6 w-screen bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-xl font-bold mb-4">Carrinho de {user.nome}</h1>
      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="border-b pb-3">
            <p>{item.name}</p>
            <p className="text-gray-600">R$ {item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      <button className="mt-6 w-full bg-green-600 text-white py-2 rounded">
        Comprar
      </button>
    </div>
  );
};

export default Carrinho;