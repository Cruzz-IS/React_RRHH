import api from '../../api/axios';
import type { AuthResponse, LoginCredentials, User } from '../../Types/auth.interface';

export const authService = {

  login: async (credentials: LoginCredentials): Promise<User> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);
    
    if (data.success) {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data.user;
    }
    
    throw new Error(data.message || 'Error en el inicio de sesión');
  },

  logout: async (): Promise<void> => {
    const refreshToken = localStorage.getItem('refreshToken');
    try {
      if (refreshToken) {
        await api.post('/auth/logout', { refreshToken });
      }
    } catch (error) {
      console.error("Error al notificar logout al servidor", error);
    } finally {
      localStorage.clear();
      window.location.href = '/login';
    }
  },

  getUsers: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users');
    return data;
  }
};