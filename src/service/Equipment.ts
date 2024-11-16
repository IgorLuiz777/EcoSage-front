import axios from 'axios';
import { Equipment } from '../types/Equipment';

const apiBaseUrl = 'http://localhost:8080/equipment';

export const getAllEquipment = async () => {
  try {
    const response = await axios.get(apiBaseUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching all equipment:', error);
    throw error;
  }
};

export const getEquipmentById = async (id: number) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching equipment with ID ${id}:`, error);
    throw error;
  }
};

export const createEquipment = async (equipment: Equipment) => {
  try {
    const response = await axios.post(apiBaseUrl, equipment);
    return response.data;
  } catch (error) {
    console.error('Error creating new equipment:', error);
    throw error;
  }
};

export const updateEquipment = async (id: number, equipment: Equipment) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/${id}`, equipment);
    return response.data;
  } catch (error) {
    console.error(`Error updating equipment with ID ${id}:`, error);
    throw error;
  }
};

export const deleteEquipment = async (id: number) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting equipment with ID ${id}:`, error);
    throw error;
  }
};
