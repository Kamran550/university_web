/**
 * API Client
 * Centralized HTTP client for making API requests
 */

import { API_CONFIG, getApiUrl } from "@/lib/config/api.config";
import { ApiResponse } from "@/lib/types/api";

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export class ApiClientError extends Error {
  status?: number;
  code?: string;

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
  }
}

interface RequestOptions extends RequestInit {
  timeout?: number;
}

/**
 * Make an API request with error handling and timeout
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeout = API_CONFIG.timeout, ...fetchOptions } = options;

  const url = getApiUrl(endpoint);

  // Log request in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[API Request] ${options.method || "GET"} ${url}`);
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      let errorMessage = `API request failed: ${response.statusText}`;
      let errorCode: string | undefined;

      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
        errorCode = errorData.code;
      } catch {
        // If response is not JSON, use status text
      }

      throw new ApiClientError(errorMessage, response.status, errorCode);
    }

    // Handle empty responses
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      return {} as T;
    }

    const jsonResponse = await response.json();

    // Check if response is wrapped in ApiResponse format
    if (
      jsonResponse &&
      typeof jsonResponse === "object" &&
      "data" in jsonResponse
    ) {
      return (jsonResponse as ApiResponse<T>).data;
    }

    return jsonResponse;
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof ApiClientError) {
      throw error;
    }

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        const errorMessage = `Request timeout after ${timeout}ms. Please check if the API server is running at ${API_CONFIG.baseURL}`;
        if (process.env.NODE_ENV === "development") {
          console.error("[API Error]", errorMessage);
          console.error("[API Config]", {
            baseURL: API_CONFIG.baseURL,
            endpoint,
            fullUrl: url,
          });
        }
        throw new ApiClientError(errorMessage, 408, "TIMEOUT");
      }

      // Network errors (CORS, connection refused, etc.)
      const networkError = error.message.includes("Failed to fetch")
        ? `Unable to connect to API at ${API_CONFIG.baseURL}. Please check if the server is running and CORS is configured correctly.`
        : error.message;

      if (process.env.NODE_ENV === "development") {
        console.error("[API Network Error]", networkError);
        console.error("[API Config]", {
          baseURL: API_CONFIG.baseURL,
          endpoint,
          fullUrl: url,
        });
      }

      throw new ApiClientError(networkError, undefined, "NETWORK_ERROR");
    }

    throw new ApiClientError("An unknown error occurred", undefined, "UNKNOWN");
  }
}

/**
 * GET request helper
 */
export async function apiGet<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "GET",
  });
}

/**
 * POST request helper
 */
export async function apiPost<T>(endpoint: string, data?: unknown): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * PUT request helper
 */
export async function apiPut<T>(endpoint: string, data?: unknown): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  });
}

/**
 * DELETE request helper
 */
export async function apiDelete<T>(endpoint: string): Promise<T> {
  return apiRequest<T>(endpoint, {
    method: "DELETE",
  });
}
