import React, { useEffect, useState } from 'react';
import { 
  FiMenu, 
  FiX, 
  FiHome, 
  FiSettings, 
  FiShoppingBag, 
  FiShoppingCart, 
  FiBell, 
  FiHelpCircle,
  FiStar
} from '../../node_modules/react-icons/fi';
import { Link } from 'react-router-dom';
import './SideBar.css';
import axios from 'axios';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeItem, setActiveItem] = useState('Página Inicial');
  const [userName, setUserName] = useState('');

  useEffect(()=>{
    const token = localStorage.getItem('token');
    console.log('Token inicial:', token)
    
    axios.get('http://localhost:5000/api/perfil', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log(res.data);
      setUserName(res.data.nome);
    })
    .catch(err => {
      console.error('Erro ao buscar perfil:', err)
    });
  },[]);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedToken = localStorage.getItem('token');
      
      console.log('UPToken inicial:', updatedToken);
      if (updatedToken) {
        axios.get('http://localhost:5000/api/perfil', {
          headers: {
            Authorization: `Bearer ${updatedToken}`
          }
        })
        .then(res => {
          console.log('Perfil atualizado pelo storage event:', res.data);
          setUserName(res.data.nome);
        })
        .catch(err => {
          console.error('Erro ao buscar perfil após mudança de token:', err)
        });
      }
    };
  
    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const getInitials = (nome) => {
    return nome
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const avatarText = userName ? getInitials(userName) : '??';

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
    { name: 'Seus Pedidos', icon: <FiStar />, path: '/pedidos' },
    { name: 'Seu Carrinho', icon: <FiShoppingCart />, path: '/carrinho' },
  ];

  const secondaryItems = [
    { name: 'Notificações', icon: <FiBell />, path: '/notificacoes', badge: 3 },
    { name: 'Configurações', icon: <FiSettings />, path: '/configuracoes' },
    { name: 'Suporte', icon: <FiHelpCircle />, path: '/suporte' },
  ];

  return (
    <>
      {!isOpen && (
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
            <div className="avatar">
              {/* Exibe o nome ou as iniciais */}
              {userName ? (
                <span>{userName}</span> // Exibe o nome completo
              ) : (
                avatarText // Exibe as iniciais se o nome não estiver carregado ainda
              )}
              <Link to="/perfil"></Link>
            </div>
            {isOpen && (
              <div className="flex gap-2">
                <Link className='menu-text' to="/cadastro">Cadastrar</Link>
                <label>/</label>
                <Link className='menu-text' to="/login">Logar</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;