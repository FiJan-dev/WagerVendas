import React, { useContext, useState } from 'react';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiSettings, 
  FiShoppingBag, 
  FiShoppingCart, 
  FiBell, 
  FiHelpCircle,
  FiStar,
  FiPackage
} from '../../node_modules/react-icons/fi';
import { Link } from 'react-router-dom';
import './SideBar.css';
import axios from 'axios';
import { AuthContext } from '../context/AutenticaContext'; 


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Página Inicial');
  const { user, logout } = useContext(AuthContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (name) => {
    setActiveItem(name);
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  const menuItems = [
    { name: 'Página Inicial', icon: <FiHome />, path: '/' },
    { name: 'Seus Anúncios', icon: <FiShoppingBag />, path: '/anuncios' },
    { name: 'Seus Pedidos', icon: <FiPackage />, path: '/pedidos' },
    { name: 'Lista de Desejos', icon: <FiStar />, path: '/wishlist' },
    { name: 'Seu Carrinho', icon: <FiShoppingCart />, path: '/carrinho' },
  ];

  const secondaryItems = [
    { name: 'Notificações', icon: <FiBell />, path: '/notificacoes', badge: 3 },
    { name: 'Configurações', icon: <FiSettings />, path: '/infoUsuario' },
    { name: 'Suporte', icon: <FiHelpCircle />, path: '/suporte' },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={toggleSidebar}
        />
      )}

      <div className={`sidebar-container ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <h3 className={`sidebar-title ${isOpen ? 'visible' : ''}`}>WagerVendas</h3>
          </div>
          <button className="toggle-button" onClick={toggleSidebar}>
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <div className="sidebar-content">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li 
                key={item.name}
                className={`menu-item ${activeItem === item.name ? 'active' : ''}`}
                onClick={() => handleItemClick(item.name)}
              >
                <Link to={item.path}>
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-text">{item.name}</span>
                  {item.badge && <span className="badge-mobile">{item.badge}</span>}
                </Link>
              </li>
            ))}

            <li className="menu-divider"></li>

            {secondaryItems.map((item) => (
              <li 
                key={item.name}
                className={`menu-item ${activeItem === item.name ? 'active' : ''}`}
                onClick={() => handleItemClick(item.name)}
              >
                <Link to={item.path}>
                  <span className="menu-icon">
                    {item.icon}
                    {item.badge && <span className="menu-badge">{item.badge}</span>}
                  </span>
                  <span className="menu-text">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="user-profile">
            <Link className = "avatar" to="/perfil">
              {/* Exibe  as iniciais */}
              <span>{user ? (user.nome.split(' ').map((n) => n[0]).join('').toUpperCase()) : 'unk'}</span>
            </Link>  
            {isOpen && (
             user ? (
              <div className="user-info">
                <p className="menu-text">{user.email}</p>
                <button className="logout-button" onClick={logout}>Sair</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Link className='menu-text' to="/cadastro">Cadastrar</Link>
                <label>/</label>
                <Link className='menu-text' to="/login">Logar</Link>
              </div>
            )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;