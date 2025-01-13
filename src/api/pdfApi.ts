import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export const createPdf = async (text: string): Promise<Blob> => {
  const apiKey = process.env.REACT_APP_API_KEY;
  if (!apiKey) {
    throw new Error('API key not found in .env');
  }

  const response = await apiClient.post<Blob>(
    `/create-pdf?apiKey=${apiKey}`,
    { text },
    { responseType: 'blob' }
  );
  return response.data;
};
