import React from 'react'
import {FiSend} from 'react-icons/fi';

const Login = () => {
    return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">  
        <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Login</h2>
        
        <form className="space-y-4">
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