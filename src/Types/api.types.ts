
 export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}
 
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}
 
export interface ApiError {
  success: false;
  message: string;
  errorCode?: string;
  timestamp?: string;
  details?: string;
  stackTrace?: string;
}