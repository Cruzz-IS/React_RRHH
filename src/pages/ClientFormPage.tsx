import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import type { Cliente } from '../Types/client.interface';
import ClienteForm from '../components/Cliente/ClientForm';


const API_URL = import.meta.env.VITE_API_URL as string;

const ClienteFormPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [clienteEdit, setClienteEdit] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchCliente = async () => {
        try {
          const res = await axios.get<Cliente>(`${API_URL}/${id}`);
          setClienteEdit(res.data);
        } catch {
          alert('Error al cargar el cliente');
          navigate('/clientes');
        }
      };
      fetchCliente();
    }
  }, [id, navigate]);

  const handleSave = async (data: Omit<Cliente, 'id'>) => {
    setLoading(true);
    try {
      if (id) {
        await axios.put(`${API_URL}/${id}`, { ...data, id: parseInt(id) });
      } else {
        await axios.post(API_URL, data);
      }
      alert(id ? 'Cliente actualizado correctamente' : 'Cliente creado correctamente');
      navigate('/clientes');
    } catch {
      alert('Error al guardar el cliente');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/clientes')}
        className="mb-6 text-blue-600 hover:text-blue-700 flex items-center gap-2"
      >
        ← Volver a la lista
      </button>

      <ClienteForm 
        onSave={handleSave} 
        clienteEdit={clienteEdit} 
        onCancel={() => navigate('/clientes')}
        isLoading={loading}
      />
    </div>
  );
};

export default ClienteFormPage;