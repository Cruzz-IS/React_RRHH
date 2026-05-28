import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import type { LoginFormValues } from '../schemas/login.schema';
 
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
    } catch (err: any) {
      const msg =
        err?.response?.data?.message ??
        err?.message ??
        'Error al iniciar sesión';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };
 
  return { handleLogin, error, isLoading, clearError: () => setError(null) };
};