import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AutenticaContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiCreditCard,
  FiChevronRight,
  FiPackage,
} from "../../node_modules/react-icons/fi";
import { CiCircleList } from "react-icons/ci";

const Perfil = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-10 border-2 border-gray-100">
        {user ? (
          <div className="flex items-center space-x-6">
            <div className="bg-blue-600 text-white w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold">
              {/* Exibe  as iniciais */}
              {user.nome
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div className="flex flex-col">
              <p className="text-lg font-semibold leading-tight text-left">
                {user.nome}
              </p>
              <p className="text-base text-left">{user.email}</p>
            </div>
          </div>
        ) : (
          <p>Carregando dados do perfil...</p>
        )}
      </div>

      <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md mt-10 border-2 border-gray-100 space-y-6">
        {/*Suas informações*/}
        <Link className="flex items-center space-x-6" to="/infoUsuario">
          <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold">
            <FiUsers className="" />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <p className="text-lg leading-tight">Dados da Conta</p>
            <FiChevronRight className="text-xl" />
          </div>
        </Link>

        {/* Meus pedidos */}
        <Link className="flex items-center space-x-6" to="/pedidos">
          <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold">
            <FiPackage className="" />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <p className="text-lg leading-tight text-left">Pedidos</p>
            <FiChevronRight className="text-xl" />
          </div>
        </Link>

        {/* Metodo de pagamento*/}
        <Link className="flex items-center space-x-6" to="/metodosPG">
          <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold">
            <FiCreditCard className="" />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <p className="text-lg leading-tight">Metodos de Pagamento</p>
            <FiChevronRight className="text-xl" />
          </div>
        </Link>
        {/* Seus Anuncios */}
        <Link className="flex items-center space-x-6" to="/anuncios">
          <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-2xl font-bold">
            <CiCircleList className="" />
          </div>
          <div className="flex-1 flex items-center justify-between">
            <p className="text-lg leading-tight text-left">Seus Anúncios</p>
            <FiChevronRight className="text-xl" />
          </div>
        </Link>
      </div>
    </>
  );
};

export default Perfil;
