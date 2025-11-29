/**
 * API Configuration
 * Centralized configuration for API endpoints and settings
 */

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api",
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000", 10), // 10 seconds default
  endpoints: {
    degrees: "/degrees",
    faculties: "/faculties",
    programs: "/programs/filter",
  },
} as const;

// Log API config in development (without sensitive data)
if (process.env.NODE_ENV === "development") {
  console.log("API Config:", {
    baseURL: API_CONFIG.baseURL,
    timeout: API_CONFIG.timeout,
    endpoints: API_CONFIG.endpoints,
  });
}

/**
 * Get full API URL for an endpoint
 */
export function getApiUrl(endpoint: string): string {
  const baseURL = API_CONFIG.baseURL.replace(/\/$/, ""); // Remove trailing slash
  const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  return `${baseURL}${path}`;
}
