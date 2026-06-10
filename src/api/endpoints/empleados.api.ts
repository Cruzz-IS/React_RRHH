import apiClient from '../axios';
import type {
  Empleado,
  CreateEmpleadoDto,
  UpdateEmpleadoDto,
  PaginatedResponse,
} from '../../Types/auth.interface';
 
interface ListParams {
  pageNumber?: number;
  pageSize?:   number;
  search?:     string;
  sortBy?:     string;
  sortDir?:    'asc' | 'desc';
  isActive?:   boolean;
  department?: string;
  role?:       string;
}
 
interface Cargo {
  id:         number;
  nombre:     string;
  sueldoBase: number;
  createdAt:  string;
  updatedAt?: string;
}
 
interface Bono {
  id:          number;
  fecha:       string;
  monto:       number;
  descripcion: string;
  tipoBono:    string;
}
 
interface Deduccion {
  id:              number;
  fechaInicio:     string;
  fechaFin?:       string;
  valor:           number;
  tipo:            'P' | 'F';
  tipoDeduccionId: number;
  descripcion?:    string;
}
 
interface Planilla {
  id:             number;
  fechaEfectiva:  string;
  fechaInicio:    string;
  fechaFin:       string;
  estado:         'Pendiente' | 'Procesada' | 'Pagada' | 'Cancelada';
  totalNomina?:   number;
  createdAt:      string;
  updatedAt?:     string;
}
 
interface PlanillaDetalle {
  empleadoId:       number;
  nombreCompleto:   string;
  sueldoBase:       number;
  totalBonos:       number;
  totalDeducciones: number;
  totalAnticipos:   number;
  sueldoNeto:       number;
}
 
interface PlanillaResumen {
  totalEmpleados:   number;
  totalNomina:      number;
  totalBonos:       number;
  totalDeducciones: number;
  totalAnticipos:   number;
}
 
interface Anticipo {
  id:          number;
  fecha:       string;
  descripcion: string;
  monto:       number;
  empleadoId:  number;
  estado:      'P' | 'A' | 'C';
  planillaId?: number;
}
 
interface Estadisticas {
  total:     number;
  activos:   number;
  inactivos: number;
  porRol:    Record<string, number>;
  porDepto:  Record<string, number>;
}
 
//  EMPLEADOS
export const EmpleadosApi = {
  getAll: (params?: ListParams) =>
    apiClient.get<PaginatedResponse<Empleado>>('/empleados', { params }),
 
  getById: (id: number) =>
    apiClient.get<Empleado>(`/empleados/${id}`),
 
  create: (data: CreateEmpleadoDto) =>
    apiClient.post<Empleado>('/empleados', data),
 
  update: (id: number, data: UpdateEmpleadoDto) =>
    apiClient.put<Empleado>(`/empleados/${id}`, data),
 
  delete: (id: number) =>
    apiClient.delete<void>(`/empleados/${id}`),
 
  activar:    (id: number) => apiClient.post<void>(`/empleados/${id}/activar`),
  desactivar: (id: number) => apiClient.post<void>(`/empleados/${id}/desactivar`),
 
  cambiarRol: (id: number, role: string) =>
    apiClient.put<void>(`/empleados/${id}/cambiar-rol`, { role }),
 
  getCargoActual: (id: number) =>
    apiClient.get<Cargo>(`/empleados/${id}/cargo-actual`),
 
  getHistorialCargos: (id: number) =>
    apiClient.get<Cargo[]>(`/empleados/${id}/historial-cargos`),
 
  asignarCargo: (id: number, data: { cargoId: number; fechaNombramiento: string }) =>
    apiClient.post<void>(`/empleados/${id}/asignar-cargo`, data),
 
  getPlanillas: (id: number) =>
    apiClient.get<Planilla[]>(`/empleados/${id}/planillas`),
 
  getDepartamentos: () =>
    apiClient.get<string[]>('/empleados/departamentos'),
 
  getEstadisticas: () =>
    apiClient.get<Estadisticas>('/empleados/estadisticas'),
};
 
//  CARGOS
 
export const CargosApi = {
  getAll: (params?: { pageNumber?: number; pageSize?: number; search?: string }) =>
    apiClient.get<PaginatedResponse<Cargo>>('/cargos', { params }),
 
  getById: (id: number) =>
    apiClient.get<Cargo>(`/cargos/${id}`),
 
  create: (data: { nombre: string; sueldoBase: number }) =>
    apiClient.post<Cargo>('/cargos', data),
 
  update: (id: number, data: { nombre?: string; sueldoBase?: number }) =>
    apiClient.put<Cargo>(`/cargos/${id}`, data),
 
  delete: (id: number) =>
    apiClient.delete<void>(`/cargos/${id}`),
};
 
//  BONOS
 
export const BonosApi = {
  getAll: (params?: { pageNumber?: number; pageSize?: number }) =>
    apiClient.get<PaginatedResponse<Bono>>('/bonos', { params }),
 
  getById: (id: number) =>
    apiClient.get<Bono>(`/bonos/${id}`),
 
  create: (data: Omit<Bono, 'id'>) =>
    apiClient.post<Bono>('/bonos', data),
 
  update: (id: number, data: Partial<Omit<Bono, 'id'>>) =>
    apiClient.put<Bono>(`/bonos/${id}`, data),
 
  delete: (id: number) =>
    apiClient.delete<void>(`/bonos/${id}`),
 
  asignarAEmpleado: (data: { bonoId: number; empleadoId: number; planillaId: number }) =>
    apiClient.post<void>('/bonos/asignar', data),
};
 
//  DEDUCCIONES
export const DeduccionesApi = {
  getAll: (params?: { pageNumber?: number; pageSize?: number }) =>
    apiClient.get<PaginatedResponse<Deduccion>>('/deducciones', { params }),
 
  getById: (id: number) =>
    apiClient.get<Deduccion>(`/deducciones/${id}`),
 
  create: (data: Omit<Deduccion, 'id'>) =>
    apiClient.post<Deduccion>('/deducciones', data),
 
  update: (id: number, data: Partial<Omit<Deduccion, 'id'>>) =>
    apiClient.put<Deduccion>(`/deducciones/${id}`, data),
 
  delete: (id: number) =>
    apiClient.delete<void>(`/deducciones/${id}`),
 
  asignarAEmpleado: (data: { deduccionId: number; empleadoId: number; planillaId: number }) =>
    apiClient.post<void>('/deducciones/asignar', data),
 
  getTipos: () =>
    apiClient.get<{ id: number; descripcion: string; codigo: string }[]>('/deducciones/tipos'),
};
 
//  PLANILLAS
 
export const PlanillasApi = {
  getAll: (params?: { pageNumber?: number; pageSize?: number; estado?: string; anio?: number; mes?: number }) =>
    apiClient.get<PaginatedResponse<Planilla>>('/planillas', { params }),
 
  getById: (id: number) =>
    apiClient.get<Planilla>(`/planillas/${id}`),
 
  create: (data: { fechaEfectiva: string; fechaInicio: string; fechaFin: string }) =>
    apiClient.post<Planilla>('/planillas', data),
 
  procesar:     (id: number) => apiClient.post<void>(`/planillas/${id}/procesar`),
  marcarPagada: (id: number) => apiClient.post<void>(`/planillas/${id}/pagar`),
  cancelar:     (id: number) => apiClient.post<void>(`/planillas/${id}/cancelar`),
 
  getDetalle: (id: number) =>
    apiClient.get<PlanillaDetalle[]>(`/planillas/${id}/detalle`),
 
  getResumen: (id: number) =>
    apiClient.get<PlanillaResumen>(`/planillas/${id}/resumen`),
};
 

export const AnticiposApi = {
  getAll: (params?: { pageNumber?: number; pageSize?: number; empleadoId?: number; estado?: string }) =>
    apiClient.get<PaginatedResponse<Anticipo>>('/anticipos', { params }),
 
  getById: (id: number) =>
    apiClient.get<Anticipo>(`/anticipos/${id}`),
 
  create: (data: Omit<Anticipo, 'id' | 'estado'>) =>
    apiClient.post<Anticipo>('/anticipos', data),
 
  aplicar:  (id: number, planillaId: number) =>
    apiClient.post<void>(`/anticipos/${id}/aplicar`, { planillaId }),
 
  cancelar: (id: number) =>
    apiClient.post<void>(`/anticipos/${id}/cancelar`),
};
 
 
export default EmpleadosApi;