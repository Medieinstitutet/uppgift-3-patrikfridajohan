import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

const apiService = axios.create({
    baseURL: API_URL,
});

export default apiService;