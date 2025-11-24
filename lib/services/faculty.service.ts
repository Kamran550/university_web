/**
 * Faculty Service
 * Business logic layer for faculty operations
 * This service can be extended with caching, transformations, etc.
 */

import { getAllFaculties, getFacultyById } from "@/lib/api/faculties";
import { Faculty } from "@/lib/types/faculty";

/**
 * Service class for faculty operations
 */
export class FacultyService {
  /**
   * Get all faculties
   * Can be extended with caching logic
   */
  static async getAll(): Promise<Faculty[]> {
    return getAllFaculties();
  }

  /**
   * Get faculty by ID
   * Can be extended with caching logic
   */
  static async getById(id: number): Promise<Faculty> {
    return getFacultyById(id);
  }

  /**
   * Find faculty by name (case-insensitive)
   */
  static async findByName(name: string): Promise<Faculty | null> {
    const faculties = await this.getAll();
    return (
      faculties.find(
        (faculty) => faculty.name.toLowerCase() === name.toLowerCase()
      ) || null
    );
  }

  /**
   * Get faculties as options for select/dropdown
   */
  static async getAsOptions(): Promise<
    Array<{ value: number; label: string }>
  > {
    const faculties = await this.getAll();
    return faculties.map((faculty) => ({
      value: faculty.id,
      label: faculty.name,
    }));
  }
}
