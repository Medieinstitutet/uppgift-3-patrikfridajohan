import { API_URL } from './apiservice';
import axios from 'axios';

// Get userid from cookie
// import { getUseridfromcookie } from './authService'; to use it on a page
export const getUseridfromcookie = (): string | null => {
    console.log('getUseridfromcookie function called'); 
    console.log('Document cookie:', document.cookie); 
    const userIdCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('userId='));
    if (userIdCookie) {
        const userId = userIdCookie.split('=')[1];
        console.log('User ID from cookie:', userId);
        return userId;
    } else {
        console.log('User ID not found in cookie');
        return null;
    }
};

console.log('Document cookie:', document.cookie); // ingen info om kakan kommer än tyvärr. har bråkat med det ett tag men inte kommit igång.


// Get accessid from cookie
// import { getAccessidfromcookie } from './authService'; to use it on a page
export const getAccessidfromcookie = (): string | null => {
    const accessIdCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('accessId='));
    if (accessIdCookie) {
        return accessIdCookie.split('=')[1];
    } else {
        return null;
    }
};

// Check if user is logged in (to view page) and if user is admin or not.
// import { isLoggedIn, isAdmin } from '../services/authService'; to use it on a page
// See example in Subscriptions.tsx
export const isLoggedIn = (): { loggedIn: boolean; isAdmin: boolean } => {
    const sessionCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('sessionID='));
    const accessIdCookie = getAccessidfromcookie();

    const loggedIn = !!sessionCookie;
    const isAdmin = accessIdCookie === '2';

    return { loggedIn, isAdmin };
};

// Get all data of the current logged in user
// import { getAllUserData } from '../services/authService'; to use it on a page
export const getAllUserData = async (userId: string): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/user/${userId}`);
        console.log('User data:', response.data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

// Get fullname from logged in user
// import { getUserFullname } from '../services/authService'; to use it on a page
export const getUserFullName = async (userId: string): Promise<string> => {
    try {
        const userData = await getAllUserData(userId);
        const fullName = `${userData.firstname} ${userData.lastname}`;
        console.log(fullName);
        return fullName;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

// Get firstname from logged in user
// import { getUserFirstName } from '../services/authService'; to use it on a page
export const getUserFirstName = async (userId: string): Promise<string> => {
    try {
        const userData = await getAllUserData(userId);
        const firstName = `${userData.firstname}`;
        console.log(firstName);
        return firstName;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};


// Get subscription data by subscription ID
// import { getSubscriptionData } from '../services/authService'; to use it on a page
export const getSubscriptionData = async (subscriptionId: string): Promise<any> => {
    try {
        const response = await axios.get(`${API_URL}/subscription/${subscriptionId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching subscription data:", error);
        throw error;
    }
};

// Get all subscriptions
// import { getAllsubscriptions } from '../services/authService'; to use it on a page
export const getAllsubscriptions = async () => {
    try {
        const response = await axios.get(`${API_URL}/subscriptions`);
        return response.data;
    } catch (error) {
        console.error("Error fetching all plans data:", error);
        throw error;
    }
};

// Get active subscription data of the current logged in user
// import { getActiveSubscription } from '../services/authService'; to use it on a page
export const getActiveSubscription = async (userId: string): Promise<string | null> => {
    try {
        const userData = await getAllUserData(userId);
        console.log("ActiveSubscription: ", userData.activesubscriptionid);
        return userData.activesubscriptionid || null; // Return only the activesubscriptionid
    } catch (error) {
        console.error("Error fetching active subscription:", error);
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