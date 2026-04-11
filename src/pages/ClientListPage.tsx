import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import type { Cliente } from '../Types/client.interface';
import ClienteList from '../components/Cliente/ClientList';

const API_URL = import.meta.env.VITE_API_URL as string;

const ClientesListPage = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClientes = async () => {
    try {
      const res = await axios.get<Cliente[]>(API_URL);
      setClientes(res.data);
    } catch (error) {
      console.error(error);
      alert('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este cliente?')) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchClientes();
    } catch {
      console.error('Error al eliminar');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Clientes</h1>
        <Link
          to="/clientes/nuevo"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2"
        >
          + Nuevo Cliente
        </Link>
      </div>

      <ClienteList 
        clientes={clientes} 
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
};

export default ClientesListPage;