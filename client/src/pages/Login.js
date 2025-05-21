import React from 'react'
import {FiSend} from 'react-icons/fi';
import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AutenticaContext';

const Login = () => { 
  const { login } = useContext(AuthContext);
  const [values, setValues] = useState({
    email: '',
    senha: ''
});

const navigate = useNavigate();
const [msgSuccess, setMsgSuccess] = useState('');

const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:5000/api/login', values);
      if(res.status === 201){
        console.log('login bem sucedido');
        setMsgSuccess('Login Realizado com Sucesso');
        login(res.data.token, res.data.user);
        setTimeout(()=>{
          navigate('/');
        },2000);
      }
    } catch (err){
      if(err.response){
        alert('Email ou Senha Incorretos');
      } else {
        alert('Erro inesperado de Login');
      }
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">  
        <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Login</h2>

        {msgSuccess && (
          <div className="  mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {msgSuccess}
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="seu@email.com"
              required
              onChange={(e)=>setValues({...values, email: e.target.value})}
            />
          </div>

          {/* Senha */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite uma Senha"
              required
              onChange={(e)=>setValues({...values, senha: e.target.value})}
            />
          </div>
  
          {/* Envio */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
          >
            <FiSend className="mr-2" />
            Enviar
          </button>
        </form>
      </div>
    </div>
    )
  }
  
  export default Login