import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AutenticaContext";

const CriaProduto = () => {
  const [imagensPreview, setImagensPreview] = useState([]);
  const [imagemBase64, setimagemBase64] = useState("");
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    preco: "",
    id_vendedor: "",
  });

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleImagemChange = async (e) => {
    const files = Array.from(e.target.files);
    const base64s = await Promise.all(files.map(convertToBase64));
    setimagemBase64(base64s);
    setImagensPreview(base64s);

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagensPreview(previews);
  };

  useEffect(() => {
    if (user) {
      setValues((prevValues) => ({
        ...prevValues,
        id_vendedor: user.id,
      }));
    }
  }, [user]);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      nome: values.nome,
      descricao: values.descricao,
      categoria: values.categoria,
      preco: values.preco,
      id_vendedor: values.id_vendedor,
      imagens: imagemBase64,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/CriaProduto",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 201) {
        alert("Produto criado com sucesso!");
      }
    } catch (err) {
      console.error("Erro ao criar produto:", err);
      alert("Erro ao criar produto.");
    }

    e.target.reset();
    setImagensPreview([]);
    setimagemBase64([]);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Criar Produto</h2>
      <form onSubmit={handleSubmit}>
        {/* Nome */}
        <div className="mb-4">
          <label
            htmlFor="nome"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Nome do Produto
          </label>
          <input
            type="text"
            id="nome"
            placeholder="Nome do Produto"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
            onChange={(e) => setValues({ ...values, nome: e.target.value })}
          />
        </div>

        {/* Descrição */}
        <div className="mb-4">
          <label
            htmlFor="descricao"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Descrição
          </label>
          <textarea
            id="descricao"
            placeholder="Descrição do Produto"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
            onChange={(e) =>
              setValues({ ...values, descricao: e.target.value })
            }
          ></textarea>
        </div>

        {/* Categoria */}
        <div className="mb-4">
          <label
            htmlFor="categoria"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Categoria
          </label>
          <input
            type="text"
            id="categoria"
            placeholder="Categoria do Produto"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
            onChange={(e) =>
              setValues({ ...values, categoria: e.target.value })
            }
          />
        </div>

        {/* Preço */}
        <div className="mb-4">
          <label
            htmlFor="preco"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Preço
          </label>
          <input
            type="number"
            id="preco"
            placeholder="Preço do Produto"
            className="shadow appearance-none border rounded w-full py-2 px-3"
            required
            onChange={(e) => setValues({ ...values, preco: e.target.value })}
          />
        </div>

        {/* Imagens */}
        <div className="mb-4">
          <label
            htmlFor="imagem"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Imagens do Produto
          </label>
          <input
            type="file"
            id="imagem"
            accept="image/*"
            multiple
            onChange={handleImagemChange}
            className="block w-full text-sm text-gray-700"
            required
          />
        </div>

        {/* Previews das imagens */}
        {imagensPreview.length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-4">
            {imagensPreview.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index}`}
                className="w-full h-32 object-cover rounded"
              />
            ))}
          </div>
        )}

        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 transition duration-300 ease-in-out"
        >
          Criar Produto
        </button>
      </form>
    </div>
  );
};

export default CriaProduto;
