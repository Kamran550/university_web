import { Faculty } from "./faculty";

export interface Degree {
  id: number;
  name: string;
  faculties: Faculty[];
}
