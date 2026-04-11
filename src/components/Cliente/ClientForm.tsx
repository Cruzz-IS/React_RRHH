import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import type { Cliente } from "../../Types/client.interface";

const clienteSchema = z.object({
  Name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  Email: z.string().email("Debe ser un Email válido"),
  PasswordHash: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  Username: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
});

type ClienteFormData = z.infer<typeof clienteSchema>;

interface ClienteFormProps {
  onSave: (data: ClienteFormData) => void;
  clienteEdit: Cliente | null;
  onCancel: () => void;
  isLoading?: boolean;
}

const ClienteForm = ({ onSave, clienteEdit, onCancel }: ClienteFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ClienteFormData>({
    resolver: zodResolver(clienteSchema),
    defaultValues: clienteEdit
      ? {
          Name: clienteEdit.Name,
          Email: clienteEdit.Email,
          PasswordHash: clienteEdit.PasswordHash,
          Username: clienteEdit.Username,
        }
      : undefined,
  });

  const onSubmit = (data: ClienteFormData) => {
    onSave(data);
    if (!clienteEdit) reset();
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-8 rounded-2xl shadow-lg mb-10"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        {clienteEdit ? "Editar Cliente" : "Nuevo Cliente"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Nombre
          </label>
          <input
            {...register("Name")}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            placeholder="Juan"
          />
          {errors.Name && (
            <p className="text-red-500 text-sm mt-1">{errors.Name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Email
          </label>
          <input
            type="email"
            {...register("Email")}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            placeholder="juan@example.com"
          />
          {errors.Email && (
            <p className="text-red-500 text-sm mt-1">{errors.Email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            PasswordHash
          </label>
          <input
            type="PasswordHash"
            {...register("PasswordHash")}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            placeholder="*****"
          />
          {errors.PasswordHash && (
            <p className="text-red-500 text-sm mt-1">{errors.PasswordHash.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Username
          </label>
          <input
            {...register("Username")}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            placeholder="Pérez"
          />
          {errors.Username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.Username.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex gap-4 mt-10">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold px-10 py-3.5 rounded-xl transition flex-1 md:flex-none"
        >
          {isSubmitting
            ? "Guardando..."
            : clienteEdit
              ? "Actualizar Cliente"
              : "Crear Cliente"}
        </button>

        {clienteEdit && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-10 py-3.5 rounded-xl transition"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ClienteForm;
