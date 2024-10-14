import axios from 'axios';

const API_URL = 'http://localhost:5000/auth';

export const signup = async (data: {
  email: string;
  name: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/signup`, data);
  return response.data;
};

export const login = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};
