export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}
 
export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
}
 
export interface PaginationParams {
  pageNumber: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}
 
export interface FilterParams {
  search?: string;
  // [key: string]: any;
}