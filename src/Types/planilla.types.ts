
export interface Planilla {
  id: number;
  fechaEfectiva: string;
  fechaInicio: string;
  fechaFin: string;
  estado: 'Pendiente' | 'Procesada' | 'Pagada' | 'Cancelada';
  totalNomina?: number;
  createdAt: string;
  updatedAt?: string;
}
 
export interface PlanillaEmpleado {
  empleadoId: number;
  planillaId: number;
  sueldoBase: number;
  sueldoNeto: number;
  totalBonos: number;
  totalDeducciones: number;
  totalAnticipos: number;
}