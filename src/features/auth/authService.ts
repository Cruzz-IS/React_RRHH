import api from '../../api/axios';
import type {
  AuthResponse,
  EmpleadoInfo,
  LoginCredentials,
  UserInfo,
} from '../../Types/auth.interface';

const mapEmpleadoToUserInfo = (empleado: EmpleadoInfo): UserInfo => ({
  id: empleado.Id,
  email: empleado.Email,
  name: empleado.Name,
  role: empleado.Role,
  emailConfirmed: empleado.EmailConfirmed,
});

export const authService = {

  login: async (credentials: LoginCredentials): Promise<UserInfo> => {
    const { data } = await api.post<AuthResponse>('/auth/login', credentials);

    if (!data.Success || !data.AccessToken || !data.RefreshToken || !data.Empleado) {
      throw new Error(data.Message || 'Error en el inicio de sesión');
    }

    const userInfo = mapEmpleadoToUserInfo(data.Empleado);

    localStorage.setItem('accessToken', data.AccessToken);
    localStorage.setItem('refreshToken', data.RefreshToken);
    localStorage.setItem('user', JSON.stringify(userInfo));

    return userInfo;
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

  getUsers: async (): Promise<UserInfo[]> => {
    const { data } = await api.get<UserInfo[]>('/users');
    return data;
  }
};