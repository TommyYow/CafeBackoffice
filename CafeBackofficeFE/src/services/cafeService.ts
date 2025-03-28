import { CafeData, CafeFormData, CafeQueryParams } from '../models/cafe';
import { ActionResponse } from '../models/common';
import api from './api';

export const getCafes = async (params?: CafeQueryParams): Promise<CafeData[]> => {
  try {
    const response = await api.get('/cafes', { params });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cafes:', error);
    throw error;
  }
};

export const getCafeById = async (id: string): Promise<CafeFormData> => {
  try {
    const response = await api.get(`/cafes/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching cafe with ID ${id}:`, error);
    throw error;
  }
};

export const createCafe = async (cafe: Omit<CafeData, 'id' | 'employees'>): Promise<ActionResponse> => {
  try {
    const response = await api.post('/cafes', cafe);
    return response.data;
  } catch (error) {
    console.error('Error creating cafe:', error);
    throw error;
  }
};

export const updateCafe = async (id: string, cafe: Partial<CafeData>): Promise<ActionResponse> => {
  try {
    const response = await api.put(`/cafes/${id}`, cafe);
    return response.data;
  } catch (error) {
    console.error(`Error updating cafe with ID ${id}:`, error);
    throw error;
  }
};

export const deleteCafe = async (id: string): Promise<ActionResponse> => {
  try {
    const response = await api.delete(`/cafes/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting cafe with ID ${id}:`, error);
    throw error;
  }
}; 