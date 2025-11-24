/**
 * Generic API Response wrapper
 */
export interface ApiResponse<T> {
  timestamp: string;
  status: boolean;
  message: string;
  data: T;
}
