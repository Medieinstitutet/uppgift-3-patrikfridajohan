import { API_URL } from "./apiservice";
import axios, { AxiosError } from "axios";

interface UserData {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  added: string;
  updated: string;
  activesubscriptionid: number;
  accessid: number;
  active: number;
}

// Get userid from cookie
// import { getUseridfromcookie } from './authService'; to use it on a page
export const getUseridfromcookie = (): string | null => {
  console.log("getUseridfromcookie function called");
  console.log("Document cookie:", document.cookie);
  const userIdCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("userID="));
  if (userIdCookie) {
    const userId = userIdCookie.split("=")[1];
    console.log("User ID from cookie:", userId);
    return userId;
  } else {
    console.log("User ID not found in cookie");
    return null;
  }
};

// Get accessid from cookie
// import { getAccessidfromcookie } from './authService'; to use it on a page
export const getAccessidfromcookie = (): string | null => {
  const accessIdCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("accessID="));
  if (accessIdCookie) {
    return accessIdCookie.split("=")[1];
  } else {
    return null;
  }
};

// Check if user is logged in (to view page) and if user is admin or not.
// import { isLoggedIn, isAdmin } from '../services/authService'; to use it on a page
// See example in Subscriptions.tsx
export const isLoggedIn = (): { loggedIn: boolean; isAdmin: boolean } => {
  const sessionCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("sessionID="));
  const accessIdCookie = getAccessidfromcookie();

  const loggedIn = !!sessionCookie;
  const isAdmin = accessIdCookie === "2";

  return { loggedIn, isAdmin };
};

// Get all data of a user
// import { getAllUserData } from '../services/authService'; to use it on a page
export const getAllUserData = async (userId: string): Promise<UserData> => {
  try {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    console.log("User data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Get fullname from user
// import { getUserFullname } from '../services/authService'; to use it on a page
export const getUserFullName = async (): Promise<string> => {
  try {
    const userId = getUseridfromcookie() || "";
    const userData = await getAllUserData(userId);
    const fullName = `${userData.firstname} ${userData.lastname}`;
    console.log(fullName);
    return fullName;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Get firstname from user
// import { getUserFirstName } from '../services/authService'; to use it on a page
export const getUserFirstName = async (): Promise<string> => {
  try {
    const userId = getUseridfromcookie() || "";
    const userData = await getAllUserData(userId);
    const firstName = `${userData.firstname}`;
    console.log(firstName);
    return firstName;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

// Check if a user email exists
export const checkUserEmail = async (
  emailToCheck: string
): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/checkemail/${emailToCheck}`);
    return response.data.exists;
  } catch (error) {
    console.error("Error checking user email:", error);
    throw error;
  }
};

// Get subscription data by subscription ID
// import { getSubscriptionData } from '../services/authService'; to use it on a page
export const getSubscriptionData = async (
  subscriptionId: string
): Promise<any> => {
  try {
    if (subscriptionId === "0") {
      // Return standard values when subscriptionId is 0
      return {
        name: "No active plan",
        info: "No active plan",
        price: 0,
        active: 1,
      };
    } else {
      const response = await axios.get(
        `${API_URL}/subscription/${subscriptionId}`
      );
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching subscription data:", error);
    throw error;
  }
};

// Get all subscriptions
// import { getAllsubscriptions } from '../services/authService'; to use it on a page
export const getAllsubscriptions = async (): Promise<any> => {
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
export const getActiveSubscription = async (
  userId: string | undefined
): Promise<string | null> => {
  try {
    let userToFetch: string;
    // If userId is provided, use it; otherwise, get userId from cookie
    if (userId) {
      userToFetch = userId;
    } else {
      userToFetch = getUseridfromcookie() || "";
    }

    const userData = await getAllUserData(userToFetch);
    console.log("ActiveSubscription: ", userData.activesubscriptionid);
    return userData.activesubscriptionid.toString();
  } catch (error) {
    console.error("Error fetching active subscription:", error);
    return null;
  }
};

// Cancel my subscription
export const cancelSubscription = async (
  subscriptionId: string
): Promise<void> => {
  try {
    const userId = getUseridfromcookie();
    await axios.post(`${API_URL}/cancel-subscription`, {
      userId,
      subscriptionId,
    });
    console.log("Subscription canceled successfully");
  } catch (error) {
    console.error("Error canceling subscription:", error);
    throw error;
  }
};

// Get all Articletitles
// import { getAllarticletitles } from '../services/authService'; to use it on a page
export const getAllarticletitles = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/articletitles`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all plans data:", error);
    throw error;
  }
};

// Get all Newsarticles for me
// import { getAllarticlesforme } from '../services/authService'; to use it on a page
export const getAllarticlesforme = async (): Promise<any> => {
  try {
    const userId = getUseridfromcookie();
    if (!userId) {
      throw new Error("User ID not found in cookie");
    }
    console.log("forme: ", userId);
    // Get active subscription ID for the user
    const activeSubscriptionId = await getActiveSubscription(userId);

    // Fetch articles based on the active subscription level
    const response = await axios.get(
      `${API_URL}/articlesforme/${activeSubscriptionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching subscription data:", error);
    throw error;
  }
};

// Get all Newsarticles for admin
// import { getAllarticlesforadmin } from '../services/authService'; to use it on a page
export const getAllarticlesforadmin = async (): Promise<any> => {
  try {
    // Fetch articles for admin
    const response = await axios.get(`${API_URL}/articlesforadmin`);
    return response.data;
  } catch (error) {
    console.error("Error fetching articles for admin:", error);
    throw error;
  }
};

// Get latest Newsarticles for me
// import { getLatestarticlesforme } from '../services/authService'; to use it on a page
export const getLatestarticlesforme = async (): Promise<any> => {
  try {
    const userId = getUseridfromcookie();
    if (!userId) {
      throw new Error("User ID not found in cookie");
    }
    console.log("forme: ", userId);
    // Get active subscription ID for the user
    const activeSubscriptionId = await getActiveSubscription(userId);

    // Fetch articles based on the active subscription level
    const response = await axios.get(
      `${API_URL}/latestarticlesforme/${activeSubscriptionId}`
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching subscription data:", error);
    throw error;
  }
};

// Get all data of the newsarticle
// import { getArticleData } from '../services/authService'; to use it on a page
export const getArticleData = async (
  articleId: string
): Promise<{ articleData: any; allowed: boolean }> => {
  try {
    const userId = getUseridfromcookie() ?? "";
    const response = await axios.get(`${API_URL}/article/${articleId}`);
    const articleData = response.data;

    // Check if the user's active subscription matches the article's subscription ID
    const activeSubscriptionId = parseInt(
      (await getActiveSubscription(userId)) || "0"
    );
    const allowed = activeSubscriptionId >= articleData.subscriptionid;

    console.log("Article data:", articleData);
    return { articleData, allowed };
  } catch (error) {
    console.error("Error fetching article data:", error);
    throw error;
  }
};

// Create newsarticle
export const createNewsArticle = async (articleData: {
  title: string;
  subscriptionid: number;
  shortInfo: string;
  longInfo: string;
}): Promise<void> => {
  try {
    const response = await axios.post(
      `${API_URL}/admin/create-news-article`,
      articleData
    );
    console.log("Response from create news article:", response.data);
  } catch (error) {
    console.error("Error creating news article:", error);
    throw error;
  }
};

interface UserRegistrationData {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

// Create user
export const registerUser = async (
  userData: UserRegistrationData
): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    console.error("Error registering user:", axiosError);
    throw axiosError.response?.data ?? error;
  }
};

export const loginUser = async (userData: any) => {
  try {
    const response = await axios.post(
      "http://localhost:5173/api/auth/login",
      userData
    );
    if (response) {
      window.location.href = response.data;
    } else {
      console.log("Error logging in");
    }

    console.log("Login successfull");
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const handleCheckout = async (priceId: string) => {
  console.log("priceId:", priceId);
  const response = await axios.post(
    "http://localhost:5173/api/stripe/create-checkout-session",
    { priceId }
  );
  if (response.status === 200) {
    const { url } = response.data;
    window.location.href = url;
  } else {
    console.error("failed to initiate checkout", response.data);
  }
};

// Get all plans
export const getPlans = async () => {
  const response = await axios.get(`${API_URL}/stripe/plans`);
  return response;
};

// export const registerUser = async (userData) => {
//     try {
//         const response = await axios.post(`${API_URL}/auth/register`, userData);
//         return response.data;
//     } catch (error) {
//         throw error.response.data;
//     }
// };
