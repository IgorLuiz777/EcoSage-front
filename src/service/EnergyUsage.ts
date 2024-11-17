import axios from 'axios';
import { EnergyUsage } from '../types/EnergyUsage';

const apiBaseUrl = 'http://localhost:8080/energyUsage';

export const getAllEnergyUsage = async () => {
  try {
    const response = await axios.get(apiBaseUrl);
    return response.data.map((item: any) => ({
        ...item,
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate),
      }));
  } catch (error) {
    console.error('Error fetching all energy usage data:', error);
    throw error;
  }
};

export const getEnergyUsageById = async (id: number) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching energy usage with ID ${id}:`, error);
    throw error;
  }
};

export const createEnergyUsage = async (energyUsage: EnergyUsage) => {
  try {
    const response = await axios.post(apiBaseUrl, energyUsage);
    return response.data;
  } catch (error) {
    console.error('Error creating new energy usage record:', error);
    throw error;
  }
};

export const updateEnergyUsage = async (id: number, energyUsage: EnergyUsage) => {
  try {
    const response = await axios.put(`${apiBaseUrl}/${id}`, energyUsage);
    return response.data;
  } catch (error) {
    console.error(`Error updating energy usage with ID ${id}:`, error);
    throw error;
  }
};

export const deleteEnergyUsage = async (id: number) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting energy usage with ID ${id}:`, error);
    throw error;
  }
};
