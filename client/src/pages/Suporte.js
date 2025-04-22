import { FiSend, FiClock } from 'react-icons/fi';

const Suporte = () => {
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Formulário de Suporte</h2>
      
      {/* Horário de Atendimento */}
      <div className="flex items-center bg-blue-50 p-3 rounded-md mb-4">
        <FiClock className="text-blue-500 mr-2" />
        <span className="text-sm text-gray-700">
          Horário de atendimento: Segunda a Sexta, das 9h às 18h
        </span>
      </div>
      
      <form className="space-y-4">
        {/* Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Seu nome
          </label>
          <input
            type="text"
            id="name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite seu nome"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email para contato
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="seu@email.com"
            required
          />
        </div>

        {/* Assunto */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
            Assunto
          </label>
          <select
            id="subject"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecione um assunto</option>
            <option value="problema">Problema técnico</option>
            <option value="duvida">Dúvida sobre produto</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        {/* Mensagem */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Mensagem
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descreva seu problema ou dúvida..."
            required
          ></textarea>
        </div>

        {/* Envio */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center transition-colors"
        >
          <FiSend className="mr-2" />
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
};

export default Suporte;