export interface TableRow {
  id: number;
  name?: string;
  email?: string;
  age?: string;
  city?: string;
  position?: string;
  phone?: string;
  company?: string;
  level?: string;
  joined?: string;
  status?: string;
  department?: string;
  username?: string;
  country?: string;
  extra?: string;
  linkedin?: string;
}

export type TableHeaders = string[];

export interface ApiTableResponse {
  data: TableRow[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
}
