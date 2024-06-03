import { API_URL } from './apiservice';

// Get fullname from logged in user
// import { getUserFullname } from './authService'; to use it
export const getUserFullname = async (userId: string): Promise<string> => {
    const response = await fetch(`${API_URL}/user/${userId}`);
    const data = await response.json();
    return data.fullname;
};

// Get userid from cookie
// import { getUseridfromcookie } from './authService'; to use it
export const getUseridfromcookie = (): string | null => {
    const userIdCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('userId='));
    if (userIdCookie) {
        return userIdCookie.split('=')[1];
    } else {
        return null;
    }
};

// Get accessid from cookie
// import { getAccessidfromcookie } from './authService'; to use it
export const getAccessidfromcookie = (): string | null => {
    const accessIdCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('accessId='));
    if (accessIdCookie) {
        return accessIdCookie.split('=')[1];
    } else {
        return null;
    }
};

// Check if user is logged in (to view page) and if user is admin or not.
// import { isLoggedIn, isAdmin } from './authService'; to use it
// See example in Subscriptions.tsx
export const isLoggedIn = (): { loggedIn: boolean; isAdmin: boolean } => {
    const sessionCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('sessionID='));
    const accessIdCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('accessID='));

    const loggedIn = !!sessionCookie;
    const isAdmin = accessIdCookie === '2';

    return { loggedIn, isAdmin };
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