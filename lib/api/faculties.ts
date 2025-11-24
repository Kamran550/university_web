/**
 * Faculties API Service
 * Handles all API calls related to faculties
 */

import { apiGet } from "@/lib/api/client";
import { API_CONFIG } from "@/lib/config/api.config";
import { Faculty } from "@/lib/types/faculty";

/**
 * Get all faculties
 * @returns Promise<Faculty[]> Array of all faculties
 * @throws {ApiClientError} If the request fails
 */
export async function getAllFaculties(): Promise<Faculty[]> {
  try {
    const response = await apiGet<Faculty[]>(API_CONFIG.endpoints.faculties);
    return response;
  } catch (error) {
    // Re-throw with more context
    throw new Error(
      `Failed to fetch faculties: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Get a single faculty by ID
 * @param id - The faculty ID
 * @returns Promise<Faculty> The faculty object
 * @throws {ApiClientError} If the request fails
 */
export async function getFacultyById(id: number): Promise<Faculty> {
  try {
    const response = await apiGet<Faculty>(
      `${API_CONFIG.endpoints.faculties}/${id}`
    );
    return response;
  } catch (error) {
    throw new Error(
      `Failed to fetch faculty with id ${id}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
