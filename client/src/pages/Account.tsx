import React, { useState, useEffect } from "react";
import "../styles/account.css";
import {
  getUseridfromcookie,
  getAllUserData,
  getActiveSubscriptionData,
  getSubscriptionData,
  cancelSubscription,
} from "../services/authService";

export const Account: React.FC = () => {
  // const [selection, setSelection] = useState<"dashboard" | "subscription" | "settings" | "support">("dashboard");
  // const [subscriptionData, setSubscriptionData] = useState<{ name: string; price: number; active: boolean; enddate: Date; } | null>(null);

  const [firstname, setFirstname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [tier, setTier] = useState<string>("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const userId = getUseridfromcookie() ?? "";

        const userData = await getAllUserData(userId);
        console.log("userData", userData);
        setFirstname(userData.firstname);
        setEmail(userData.email);

        const subData = await getActiveSubscriptionData(userId);
        console.log("subData", subData);
        setEndDate(subData.enddate.split("T")[0]);

        if (subData.subscriptionid === 3) {
          setTier("Exclusive");
        } else if (subData.subscriptionid === 2) {
          setTier("Plus");
        } else {
          setTier("Standard");
        }

        const subDataExp = await getSubscriptionData(subData.subscriptionid);
        console.log("subDataExp", subDataExp);
        setPrice(subDataExp.price);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };

    fetchSubscriptionData();
  }, []);

  const cancelSub = async () => {
    try {
      await cancelSubscription();
      window. location. reload();
    } catch {
      console.log("error canceling sub");
    }
  };

  return (
    <section className="account-dashboard-section">
      <h2>My Profile</h2>
      <div className="account-info-section">
        <div className="account-info-container">
          <header>
            <h3>{firstname}</h3>
            <p>{email}</p>
          </header>
          <div className="subscription-details">
            <p><strong>Current Plan:</strong> {tier}</p>
            <p><strong>Price:</strong> ${price}/week</p>
            <p><strong>Subscription Ends:</strong> {endDate}</p>
          </div>
        </div>
        <div className="action-sec">
          <button type="button" className="btn" onClick={cancelSub}>
            Cancel Subscription
          </button>
        </div>
      </div>
    </section>
  );
};
