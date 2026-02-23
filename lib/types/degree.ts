import { Faculty } from "./faculty";

export interface Degree {
  id: number;
  name: string;
  faculties: Faculty[];
}


export enum DegreeType {
  Bachelor = "bachelor",
  Master = "master",
  MasterWithoutThesis = "master_without_thesis",
  PhD = "phd",
}