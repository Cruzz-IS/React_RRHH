
export interface Cargo {
  id: number;
  nombre: string;
  sueldoBase: number;
  createdAt: string;
  updatedAt?: string;
}
 
export interface CreateCargoDto {
  nombre: string;
  sueldoBase: number;
}