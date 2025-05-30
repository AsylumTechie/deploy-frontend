import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createProduct = async (productData) => {
  const token = localStorage.getItem('token');
  await axios.post(`${API_URL}/createProduct`, productData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getProducts = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(`${API_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/products/${id}`, productData, {
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  });
  return response.data;
};
