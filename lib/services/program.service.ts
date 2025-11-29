/**
 * Program Service
 * Business logic layer for program operations
 * This service can be extended with caching, transformations, etc.
 */

import {
  getProgramsByDegreeAndFaculty,
  getProgramById,
} from "@/lib/api/programs";
import { Program } from "@/lib/types/program";

/**
 * Service class for program operations
 */
export class ProgramService {
  /**
   * Get programs by degree and faculty
   * Can be extended with caching logic
   */
  static async getByDegreeAndFaculty(
    degreeId: number,
    facultyId: number
  ): Promise<Program[]> {
    return getProgramsByDegreeAndFaculty(degreeId, facultyId);
  }

  /**
   * Get program by ID
   * Can be extended with caching logic
   */
  static async getById(id: number): Promise<Program> {
    return getProgramById(id);
  }

  /**
   * Get programs as options for select/dropdown
   */
  static async getAsOptions(
    degreeId: number,
    facultyId: number
  ): Promise<Array<{ value: number; label: string }>> {
    const programs = await this.getByDegreeAndFaculty(degreeId, facultyId);
    return programs.map((program) => ({
      value: program.id,
      label: program.name,
    }));
  }
}

