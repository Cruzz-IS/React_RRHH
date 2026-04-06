import { useState, useEffect } from 'react';
import axios from 'axios';
import type { Cliente } from './Types/client.interface';
import ClienteList from './components/Cliente/ClientList';
import ClienteForm from './components/Cliente/ClientForm';

const API_URL = import.meta.env.VITE_API_URL as string;

if (!API_URL) {
  console.error('❌ VITE_API_URL no está definida en el archivo .env');
}

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteEdit, setClienteEdit] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Cliente[]>(API_URL);
      setClientes(res.data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      alert('Error al cargar los clientes. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSave = async (data: Omit<Cliente, 'id' | 'fechaRegistro'>) => {
    try {
      if (clienteEdit) {
        await axios.put(`${API_URL}/${clienteEdit.id}`, { 
          ...data, 
          id: clienteEdit.id 
        });
      } else {
        await axios.post(API_URL, data);
      }
      setClienteEdit(null);
      fetchClientes();
    } catch (error) {
      console.error('Error al guardar cliente:', error);
      alert('Error al guardar el cliente, intentalo nuevamente');
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setClienteEdit(cliente);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este cliente?')) return;

    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchClientes();
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      alert('Error al eliminar el cliente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Gestión de Clientes
          </h1>
          <p className="text-lg text-gray-600">
            BAC Honduras - Proyecto Full Stack (.NET + React + SQL Server)
          </p>
          <p className="text-sm text-gray-500 mt-1">
            API URL: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{API_URL}</span>
          </p>
        </div>
        
        <ClienteForm 
          onSave={handleSave} 
          clienteEdit={clienteEdit} 
          onCancel={() => setClienteEdit(null)} 
        />

        <ClienteList 
          clientes={clientes} 
          onEdit={handleEdit} 
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;