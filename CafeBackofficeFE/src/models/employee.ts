import { IdName } from "./common";

export interface EmployeeData {
  id: string;
  name: string;
  emailAddress: string;
  phoneNumber: string;
  daysWorked?: number;
  cafe?: IdName;
}

export interface EmployeeFormData extends Omit<EmployeeData, 'id' | 'daysWorked' | 'cafe'> {
  gender: number;
  cafeId?: string;
  cafeStartDate?: Date
  cafe?: IdName;
}

export interface EmployeeQueryParams {
  cafeId?: string;
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

