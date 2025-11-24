/**
 * Degrees API Service
 * Handles all API calls related to degrees
 */

import { apiGet } from "@/lib/api/client";
import { API_CONFIG } from "@/lib/config/api.config";
import { Degree } from "@/lib/types/degree";

/**
 * Get all degrees
 * @returns Promise<Degree[]> Array of all degrees
 * @throws {ApiClientError} If the request fails
 */
export async function getAllDegrees(): Promise<Degree[]> {
  try {
    console.log("getAllDegrees");
    console.log(API_CONFIG.endpoints.degrees);
    const response = await apiGet<Degree[]>(API_CONFIG.endpoints.degrees);
    return response;
  } catch (error) {
    // Re-throw with more context
    throw new Error(
      `Failed to fetch degrees: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Get a single degree by ID
 * @param id - The degree ID
 * @returns Promise<Degree> The degree object
 * @throws {ApiClientError} If the request fails
 */
export async function getDegreeById(id: number): Promise<Degree> {
  try {
    const response = await apiGet<Degree>(
      `${API_CONFIG.endpoints.degrees}/${id}`
    );
    return response;
  } catch (error) {
    throw new Error(
      `Failed to fetch degree with id ${id}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
