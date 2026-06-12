import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";
import type { LoginFormValues } from "../schemas/login.schema";

const extractMessage = (err: unknown): string => {
  if (isAxiosError(err)) {
    const msg = err.response?.data?.Message ?? err.response?.data?.message;
    return typeof msg === "string" ? msg : "Error al iniciar sesión";
  }
  if (err instanceof Error) return err.message;
  return "Error al iniciar sesión";
};

interface UseLoginReturn {
  handleLogin: (values: LoginFormValues) => Promise<void>;
  error: string | null;
  isLoading: boolean;
  clearError: () => void;
}

export const useLogin = (redirectTo = "/dashboard"): UseLoginReturn => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  const handleLogin = useCallback(
    async (values: LoginFormValues) => {
      setError(null);
      setLoading(true);
      try {
        await login(values);
        navigate(redirectTo, { replace: true });
      } catch (err: unknown) {
        setError(extractMessage(err));
      } finally {
        setLoading(false);
      }
    },
    [login, navigate, redirectTo],
  );

  return { handleLogin, error, isLoading, clearError: () => setError(null) };
};
