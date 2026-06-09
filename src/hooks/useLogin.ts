import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios';
import { useAuth } from './useAuth';
import type { LoginFormValues } from '../features/auth/schemas/login.schema';
 
const extractErrorMessage = (error: unknown): string => {
  if (isAxiosError(error)) {
    const msg = error.response?.data?.message;
    return typeof msg === 'string' ? msg : 'Error al iniciar sesión';
  }
  if (error instanceof Error) return error.message;
  return 'Error al iniciar sesión';
};
 
 
interface UseLoginReturn {
  handleLogin: (values: LoginFormValues) => Promise<void>;
  error: string | null;
  isLoading: boolean;
  clearError: () => void;
}
 
export const useLogin = (redirectTo = '/dashboard'): UseLoginReturn => {
  const { login }   = useAuth();
  const navigate    = useNavigate();
  const [error, setError]       = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
 
  const handleLogin = useCallback(async (values: LoginFormValues) => {
    setError(null);
    setIsLoading(true);
    try {
      await login(values);
      navigate(redirectTo, { replace: true });
    } catch (err: unknown) {
      setError(extractErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, [login, navigate, redirectTo]);
 
  const clearError = useCallback(() => setError(null), []);
 
  return { handleLogin, error, isLoading, clearError };
};