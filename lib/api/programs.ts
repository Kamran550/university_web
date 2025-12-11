/**
 * Programs API Service
 * Handles all API calls related to programs
 */

import { apiGet } from "@/lib/api/client";
import { API_CONFIG } from "@/lib/config/api.config";
import { Program } from "@/lib/types/program";

/**
 * Get programs by degree_id and faculty_id
 * @param degreeId - The degree ID
 * @param facultyId - The faculty ID
 * @param lang - The teaching language (EN or TR)
 * @returns Promise<Program[]> Array of programs
 * @throws {ApiClientError} If the request fails
 */
export async function getProgramsByDegreeAndFaculty(
  degreeId: number,
  facultyId: number,
  lang: "EN" | "TR" = "EN"
): Promise<Program[]> {
  try {
    const params = new URLSearchParams({
      degree_id: degreeId.toString(),
      faculty_id: facultyId.toString(),
      lang: lang,
    });
    const endpoint = `${API_CONFIG.endpoints.programs}?${params.toString()}`;
    const response = await apiGet<Program[]>(endpoint);
    return response;
  } catch (error) {
    // Re-throw with more context
    throw new Error(
      `Failed to fetch programs: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Get a single program by ID
 * @param id - The program ID
 * @returns Promise<Program> The program object
 * @throws {ApiClientError} If the request fails
 */
export async function getProgramById(id: number): Promise<Program> {
  try {
    const response = await apiGet<Program>(
      `${API_CONFIG.endpoints.programs}/${id}`
    );
    return response;
  } catch (error) {
    throw new Error(
      `Failed to fetch program with id ${id}: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
