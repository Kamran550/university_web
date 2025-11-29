export interface Program {
  id: number;
  name: string;
  price_per_year: number;
  degree: {
    id: number;
    name: string;
  };
  faculty: {
    id: number;
    name: string;
  };
}

