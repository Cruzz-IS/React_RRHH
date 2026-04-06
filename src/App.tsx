import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ClientesListPage from './pages/ClientListPage';
import Navbar from './components/Layout/Navbar';
import ClienteFormPage from './pages/ClientFormPage';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<ClientesListPage />} />
            <Route path="/clientes" element={<ClientesListPage />} />
            <Route path="/clientes/nuevo" element={<ClienteFormPage />} />
            <Route path="/clientes/editar/:id" element={<ClienteFormPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;