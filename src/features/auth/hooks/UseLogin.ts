import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { LoginFormValues } from '../schemas/login.schema';
import { useAuth } from '@/hooks/useAuth';
 
export const useLogin = (redirectTo = '/dashboard') => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
 
  const handleLogin = async (values: LoginFormValues) => {
    setError(null);
    setIsLoading(true);
    try {
      await login(values);
      navigate(redirectTo, { replace: true });
    } catch (err: unknown) {
        const msg = (() => {
          if (typeof err === 'object' && err !== null) {
            const e = err as {
              response?: { data?: { message?: string } };
              message?: string;
            };
            return e.response?.data?.message ?? e.message ?? 'Error al iniciar sesión';
          }
          if (typeof err === 'string') return err;
          return 'Error al iniciar sesión';
        })();
        setError(msg);
    } finally {
      setIsLoading(false);
    }
  };
 
  return { handleLogin, error, isLoading, clearError: () => setError(null) };
};