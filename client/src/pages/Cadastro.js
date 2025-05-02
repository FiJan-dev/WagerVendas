import React from 'react'
import {FiSend} from 'react-icons/fi';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cadastro = () => {
    const [values, setValues] = useState({
        nome: '',
        email: '',
        senha: '',
        cpf: '',
        endereco: ''
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:5000/api/cadastro', values)
        .then((res)=>{
          console.log(res)  
          if(res.status === 201)
            navigate('/')
        })
        .catch((err)=>{
          if(err.response){
            alert('Cadastro Não Realizado')
          } else{
            alert('Erro inesperado por favor tente novamente seu merda')
          }
        });
    }

    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">  
        <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Formulário de Cadastro</h2>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nome */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nome
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite seu nome"
              required
              onChange={(e)=>setValues({...values, nome: e.target.value})}
            />
          </div>
  
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
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
  
          {/* CPF */}
          <div>
            <label htmlFor="cpf" className="block text-sm font-medium text-gray-700 mb-1">
              CPF
            </label>
            <input
              type='text'
              id="cpf"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder='000.000.000-00'
              required
              onChange={(e)=>setValues({...values, cpf: e.target.value})}
            />
          </div>

          {/* Endereco */}
          <div>
            <label htmlFor="endereco" className="block text-sm font-medium text-gray-700 mb-1">
                Endereço
            </label>
            <input
              type='text'
              id="endereco"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder='Rua, Bairro, Número...'
              autoComplete='street-address'
              required
              onChange={(e)=>setValues({...values, endereco: e.target.value})}
            />
          </div>
  
          {/* Envio */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
          >
            <FiSend className="mr-2" />
            Cadastrar
          </button>
        </form>
      </div>
    </div>
    )
  }
  
  export default Cadastro