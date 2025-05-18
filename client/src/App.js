import './App.css';
import SideBar from './components/SideBar';
import SearchBar from './components/SearchBar';
import { AuthProvider } from './context/AutenticaContext';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import Home from './pages/Home';
import Anuncios from './pages/Anuncios';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Pedidos from './pages/Pedidos';
import Carrinho from './pages/Carrinho';
import Notificacoes from './pages/Notificacoes';
import Suporte from './pages/Suporte';
import Configuracoes from './pages/Configuracoes';
import Perfil from './pages/Perfil';
import MetodosPG from './pages/MetodosPG';
import InfoUsuario from './pages/InfoUsuario';

function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
        <SideBar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/anuncios" element={<Anuncios />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/wishlist" element={<wishlist />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/produtos" element={<SearchPage />} />
          <Route path="/metodosPG" element={<MetodosPG />} />
          <Route path="/infoUsuario" element={<InfoUsuario />} />
        </Routes>
      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
