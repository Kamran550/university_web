export interface Program {
  id: number;
  name: string;
  price_per_year: number;
  is_thesis?: string;

  degree: {
    id: number;
    name: string;
  };
  faculty: {
    id: number;
    name: string;
  };
}

