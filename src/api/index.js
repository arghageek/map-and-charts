import axios from 'axios';
const apiClient = axios.create({
  baseURL: 'https://disease.sh/v3',
});

export default apiClient;
