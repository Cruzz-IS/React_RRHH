import type { Cliente } from "../../Types/client.interface";

interface ClienteListProps {
  clientes: Cliente[];
  onDelete: (id: number) => void;
  loading: boolean;
}

const ClienteList = ({ clientes, onDelete, loading }: ClienteListProps) => {
  if (loading) return <p className="text-center py-12 text-gray-500">Cargando clientes...</p>;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="px-8 py-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">
          Lista de Clientes <span className="text-blue-600">({clientes.length})</span>
        </h2>
      </div>

      {clientes.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          Aún no hay clientes registrados.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-8 py-4 text-center text-sm font-semibold text-gray-600">ID</th>
                <th className="px-8 py-4 text-center text-sm font-semibold text-gray-600">Nombre Completo</th>
                <th className="px-8 py-4 text-center text-sm font-semibold text-gray-600">Email</th>
                <th className="px-8 py-4 text-center text-sm font-semibold text-gray-600">Username</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clientes.map((cliente) => (
                <tr key={cliente.Id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-8 py-5 font-medium text-xs text-gray-700">{cliente.Id}</td>
                  <td className="px-8 py-5 text-gray-800 text-xs font-medium">
                    {cliente.Name} {cliente.Username}
                  </td>
                  <td className="px-8 py-5 text-gray-600 text-xs">{cliente.Email}</td>
                  <td className="px-8 py-5 text-gray-600 text-xs">{cliente.Name}</td>
                  <td className="px-8 py-5">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => onDelete(cliente.Id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-6 py-2 rounded-lg font-medium transition text-xs"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClienteList;