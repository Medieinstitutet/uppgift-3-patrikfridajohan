import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// export const loginUser = async (userData) => {
//     try {
//         const response = await axios.post(`${API_URL}/auth/login`, userData);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };

// export const registerUser = async (userData) => {
//     try {
//         const response = await axios.post(`${API_URL}/auth/register`, userData);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };