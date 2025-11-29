/**
 * API Module Exports
 * Central export point for all API services
 */

// API Client
export {
  apiRequest,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  ApiClientError,
  type ApiError,
} from "./client";

// API Services
export * from "./degrees";
export * from "./faculties";
export * from "./programs";

// Configuration
export { API_CONFIG, getApiUrl } from "../config/api.config";
