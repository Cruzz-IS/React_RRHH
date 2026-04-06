// import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
            B
          </div>
          <div>
            <h1 className="font-semibold text-xl text-gray-900">
               Prueba
            </h1>
            <p className="text-xs text-gray-500 -mt-1">Gestión de Clientes</p>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          Proyecto react con asp.net
        </div>
      </div>
    </nav>
  );
}
