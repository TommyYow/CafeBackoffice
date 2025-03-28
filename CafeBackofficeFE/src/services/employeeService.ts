import { ActionResponse } from '../models/common';
import { EmployeeData, EmployeeFormData, EmployeeQueryParams } from '../models/employee';
import api from './api';

export const getEmployees = async (params?: EmployeeQueryParams): Promise<EmployeeData[]> => {
  try {
    const response = await api.get('/employees', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching employees:', error);
    throw error;
  }
};

export const getEmployeeById = async (id: string): Promise<EmployeeFormData> => {
  try {
    const response = await api.get(`/employees/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching employee with ID ${id}:`, error);
    throw error;
  }
};

export const createEmployee = async (employee: EmployeeFormData): Promise<ActionResponse> => {
  try {
    const response = await api.post('/employees', employee);
    return response.data;
  } catch (error) {
    console.error('Error creating employee:', error);
    throw error;
  }
};

export const updateEmployee = async (id: string, employee: Partial<EmployeeFormData>): Promise<ActionResponse> => {
  try {
    const response = await api.put(`/employees/${id}`, employee);
    return response.data;
  } catch (error) {
    console.error(`Error updating employee with ID ${id}:`, error);
    throw error;
  }
};

export const deleteEmployee = async (id: string): Promise<ActionResponse> => {
  try {
    const response = await api.delete(`/employees/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting employee with ID ${id}:`, error);
    throw error;
  }
};

export const getCafesForEmployeeSelect = async (): Promise<{ id: string, name: string }[]> => {
  try {
    const response = await api.get('/cafes/select');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cafes for select:', error);
    throw error;
  }
}; 