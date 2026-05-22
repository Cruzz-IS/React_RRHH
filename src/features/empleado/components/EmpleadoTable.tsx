import type { Empleado } from '@/Types/client.interface';
import axios from 'axios';
import  { useEffect, useState } from 'react'

export default function EmpleadoTable() {

  const API_URL = import.meta.env.VITE_API_URL as string;

  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEmpleados = async () => {
    try {
      const res = await axios.get<Empleado[]>(API_URL);
      setEmpleados(res.data);
    } catch (error) {
      console.error(error);
      alert('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  return (
    <div>EmpleadoTable</div>
  )
}
