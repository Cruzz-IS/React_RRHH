import { useAuth } from './useAuth';
 
interface UseRoleReturn {
  isAdmin: boolean;
  isManager: boolean;
  isEmployee: boolean;
  isAdminOrManager: boolean;
  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
}
 
export const useRole = (): UseRoleReturn => {
  const { user } = useAuth();
  const role = user?.role ?? '';
 
  return {
    isAdmin:          role === 'Admin',
    isManager:        role === 'Manager',
    isEmployee:       role === 'Employee',
    isAdminOrManager: ['Admin', 'Manager'].includes(role),
    hasRole:          (r) => role === r,
    hasAnyRole:       (roles) => roles.includes(role),
  };
};
 