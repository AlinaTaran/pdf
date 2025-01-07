import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // e.g. "http://95.217.134.12:4010"
  timeout: 10000,
});

// Interceptors example (optional, good for handling errors, auth, logging, etc.)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // handle errors or refresh token logic
    return Promise.reject(error);
  }
);

export const createPdf = async (text: string): Promise<Blob> => {
  const apiKey = process.env.REACT_APP_API_KEY;
  // Make sure to define REACT_APP_API_KEY in .env
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
