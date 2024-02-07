import axios, { AxiosResponse } from 'axios';

interface ApiResponse {
  id: number;
}

// Function to perform GET request
const fetchData = async (apiUrl: string): Promise<ApiResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// Function to perform POST request
const createData = async (apiUrl: string, newData: object): Promise<ApiResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(apiUrl, newData);
    return response.data;
  } catch (error) {
    console.error('Error creating data:', error);
    return null;
  }
};

// Function to perform PUT request
const updateData = async (apiUrl: string, updatedData: object): Promise<ApiResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.put(apiUrl, updatedData);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    return null;
  }
};

// Function to perform DELETE request
const deleteData = async (apiUrl: string): Promise<void> => {
  try {
    await axios.delete(apiUrl);
  } catch (error) {
    console.error('Error deleting data:', error);
  }
};

export { fetchData, createData, updateData, deleteData };
