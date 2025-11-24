/**
 * Degree Service
 * Business logic layer for degree operations
 * This service can be extended with caching, transformations, etc.
 */

import { getAllDegrees, getDegreeById } from "@/lib/api/degrees";
import { Degree } from "@/lib/types/degree";

/**
 * Service class for degree operations
 */
export class DegreeService {
  /**
   * Get all degrees
   * Can be extended with caching logic
   */
  static async getAll(): Promise<Degree[]> {
    return getAllDegrees();
  }

  /**
   * Get degree by ID
   * Can be extended with caching logic
   */
  static async getById(id: number): Promise<Degree> {
    return getDegreeById(id);
  }

  /**
   * Find degree by name (case-insensitive)
   */
  static async findByName(name: string): Promise<Degree | null> {
    const degrees = await this.getAll();
    return (
      degrees.find(
        (degree) => degree.name.toLowerCase() === name.toLowerCase()
      ) || null
    );
  }

  /**
   * Get degrees as options for select/dropdown
   */
  static async getAsOptions(): Promise<
    Array<{ value: number; label: string }>
  > {
    const degrees = await this.getAll();
    return degrees.map((degree) => ({
      value: degree.id,
      label: degree.name,
    }));
  }
}
