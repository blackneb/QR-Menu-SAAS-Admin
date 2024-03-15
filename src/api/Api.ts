import axios, { AxiosResponse } from 'axios';
import { notification } from 'antd';

// Updated ApiResponse interface with a generic type parameter
export interface ApiResponse<T> {
  data: T;
}

// Function to show an Ant Design notification for errors
const showErrorNotification = (message: string) => {
  notification.error({
    message: 'Error',
    description: message,
  });
};

// Function to retrieve the token from Redux
// Function to perform GET request with Bearer token
const fetchData = async <T>(apiUrl: string, token: string): Promise<ApiResponse<T> | null> => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response: AxiosResponse<ApiResponse<T>> = await axios.get(apiUrl, { headers });
    return response.data;
  } catch (error:any) {
    console.error('Error fetching data:', error);
    return null;
  }
};

// Function to perform POST request with Bearer token
const createData = async <T>(apiUrl: string, newData: object, token: string): Promise<ApiResponse<T> | null> => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response: AxiosResponse<ApiResponse<T>> = await axios.post(apiUrl, newData, { headers });
    return response.data;
  } catch (error:any) {
    console.error('Error creating data:', error);
    showErrorNotification(`Failed to create data. ${error.response?.data.message || 'Please try again.'}`);
    return null;
  }
};

// Function to perform PUT request with Bearer token
const updateData = async <T>(apiUrl: string, updatedData: object, token: string): Promise<ApiResponse<T> | null> => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    const response: AxiosResponse<ApiResponse<T>> = await axios.put(apiUrl, updatedData, { headers });
    return response.data;
  } catch (error:any) {
    console.error('Error updating data:', error);
    showErrorNotification(`Failed to update data. ${error.response?.data.message || 'Please try again.'}`);
    return null;
  }
};

// Function to perform DELETE request with Bearer token
const deleteData = async (apiUrl: string, token: string): Promise<void> => {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    await axios.delete(apiUrl, { headers });
  } catch (error:any) {
    console.error('Error deleting data:', error);
    showErrorNotification(`Failed to delete data. ${error.response?.data.message || 'Please try again.'}`);
  }
};

export { fetchData, createData, updateData, deleteData };
