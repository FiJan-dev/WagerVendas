import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AutenticaContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FiUsers,
  FiCreditCard,
  FiChevronRight,
  FiPackage,
} from "../../node_modules/react-icons/fi";

const Anuncios = () => {
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
    <Link
      to="/criaproduto"
      className="block mx-auto mt-10 px-6 py-3 bg-blue-200 text-blue-800 font-semibold text-center rounded-lg shadow-md hover:bg-blue-300 transition duration-300 w-max"
    >
      Criar um Anúncio
    </Link>
  );
};

export default Anuncios;
