import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import type { Empleado } from "@/Types/client.interface";
import type { PaginatedResponse } from "@/Types/api.types";
import EmpleadosApi from "@/api/endpoints/empleados.api";

const extractMessage = (err: unknown, fallback: string): string => {
  if (isAxiosError(err)) {
    const msg = err.response?.data?.message;
    return typeof msg === "string" ? msg : fallback;
  }
  if (err instanceof Error) return err.message;
  return fallback;
};

interface UseEmpleadosOptions {
  initialPage?: number;
  pageSize?: number;
  autoFetch?: boolean;
}

interface Pagination {
  totalCount: number;
  totalPages: number;
  pageNumber: number;
  pageSize: number;
}

interface UseEmpleadosReturn {
  empleados: Empleado[];
  pagination: Pagination;
  isLoading: boolean;
  error: string | null;
  page: number;
  search: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  refetch: () => Promise<void>;
  deleteEmpleado: (id: number) => Promise<boolean>;
  clearError: () => void;
}

export const useEmpleados = ({
  initialPage = 1,
  pageSize = 10,
  autoFetch = true,
}: UseEmpleadosOptions = {}): UseEmpleadosReturn => {
  const [data, setData] = useState<PaginatedResponse<Empleado> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState("");

  const fetchEmpleados = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const { data: res } = await EmpleadosApi.getAll({
        pageNumber: page,
        pageSize,
        search: search.trim() || undefined,
      });
      setData(res as PaginatedResponse<Empleado>);
    } catch (err: unknown) {
      setError(extractMessage(err, "Error al cargar empleados"));
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, search]);

  useEffect(() => {
    if (autoFetch) void fetchEmpleados();
  }, [autoFetch, fetchEmpleados]);

  const deleteEmpleado = useCallback(
    async (id: number): Promise<boolean> => {
      try {
        await EmpleadosApi.delete(id);
        await fetchEmpleados();
        return true;
      } catch (err: unknown) {
        setError(extractMessage(err, "Error al eliminar empleado"));
        return false;
      }
    },
    [fetchEmpleados],
  );

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
    clearError: () => setError(null),
  };
};
