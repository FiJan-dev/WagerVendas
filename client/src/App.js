import './App.css';
import SideBar from './components/SideBar';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Anuncios from './pages/Anuncios';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login';
import Pedidos from './pages/Pedidos';
import Carrinho from './pages/Carrinho';
import Notificacoes from './pages/Notificacoes';
import Suporte from './pages/Suporte';
import Configuracoes from './pages/Configuracoes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/anuncios" element={<Anuncios />} />
          <Route path="/pedidos" element={<Pedidos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/configuracoes" element={<Configuracoes />} />
          <Route path="/suporte" element={<Suporte />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
