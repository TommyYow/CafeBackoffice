export interface CafeData {
  id: string;
  name: string;
  description: string;
  location: string;
  employees: number;
}

export interface CafeFormData extends Omit<CafeData, 'id' | 'employees'> { }

export interface CafeQueryParams {
  location?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

