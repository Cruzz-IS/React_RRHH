import { useCallback, useEffect, useState } from 'react';
import EmpleadosApi from '../../../api/endpoints/empleados.api';
import type { Empleado, PaginatedResponse } from '../../../Types';
 
interface UseEmpleadosOptions {
  initialPage?: number;
  pageSize?: number;
  autoFetch?: boolean;
}
 
export const useEmpleados = ({
  initialPage = 1,
  pageSize = 10,
  autoFetch = true,
}: UseEmpleadosOptions = {}) => {
  const [data, setData] = useState<PaginatedResponse<Empleado> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState('');
 
  const fetchEmpleados = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: response } = await EmpleadosApi.getAll({
        pageNumber: page,
        pageSize,
        search: search || undefined,
      });
      setData(response);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Error al cargar empleados');
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, search]);
 
  useEffect(() => {
    if (autoFetch) fetchEmpleados();
  }, [autoFetch, fetchEmpleados]);
 
  const deleteEmpleado = async (id: number) => {
    try {
      await EmpleadosApi.delete(id);
      await fetchEmpleados(); // refrescar lista
      return true;
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Error al eliminar empleado');
      return false;
    }
  };
 
  return {
    empleados: data?.items ?? [],
    pagination: {
      totalCount: data?.totalCount ?? 0,
      totalPages: data?.totalPages ?? 0,
      pageNumber: data?.pageNumber ?? page,
      pageSize: data?.pageSize ?? pageSize,
    },
    isLoading,
    error,
    page,
    search,
    setPage,
    setSearch,
    refetch: fetchEmpleados,
    deleteEmpleado,
  };
};