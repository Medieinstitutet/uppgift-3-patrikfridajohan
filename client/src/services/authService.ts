import { API_URL } from './apiservice';

export const getUserFullname = async (userId: string): Promise<string> => {
    const response = await fetch(`${API_URL}/user/${userId}`);
    const data = await response.json();
    return data.fullname;
};

export const getUseridfromcookie = (): string | null => {
    const userIdCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('userId='));
    if (userIdCookie) {
        return userIdCookie.split('=')[1];
    } else {
        return null;
    }
};

export const getAccessidfromcookie = (): string | null => {
    const accessIdCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('accessId='));
    if (accessIdCookie) {
        return accessIdCookie.split('=')[1];
    } else {
        return null;
    }
};


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