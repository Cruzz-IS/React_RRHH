import type { Empleado } from "@/Types/client.interface";
import axios from "axios";
import { useEffect, useState } from "react";

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
      alert("Error al cargar los clientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  return (
    <div>
      <h2>Empleados</h2>
      <div>
        <button onClick={fetchEmpleados}>Refrescar</button>
      </div>
      <div>
        <input type="text" placeholder="Buscar" >Buscar</input>
      </div>
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.Id}>
                <td>{empleado.Id}</td>
                <td>{empleado.Name}</td>
                <td>{empleado.Email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
