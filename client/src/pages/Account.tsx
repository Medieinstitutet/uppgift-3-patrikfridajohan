import React, { useState, useEffect } from "react";
import "../styles/account.css";
import {
  getUseridfromcookie,
  getAllUserData,
  getActiveSubscriptionData,
  getSubscriptionData,
  cancelSubscription,
} from "../services/authService";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Account: React.FC = () => {
  const [firstname, setFirstname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [tier, setTier] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [showBtn, setShowBtn] = useState<boolean>(true);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const userId = getUseridfromcookie() ?? "";

        const userData = await getAllUserData(userId);
        setFirstname(userData.firstname);
        setEmail(userData.email);

        const subData = await getActiveSubscriptionData();
        setEndDate(subData.enddate.split("T")[0]);

        if (subData.subscriptionid === 3) {
          setTier("Exclusive");
        } else if (subData.subscriptionid === 2) {
          setTier("Plus");
        } else {
          setTier("Standard");
        }

        const subDataExp = await getSubscriptionData(subData.subscriptionid);
        setPrice(subDataExp.price);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };

    fetchSubscriptionData();
  }, []);

  const cancelSub = async () => {
    try {
      const response = await cancelSubscription();
      if(response) {
        setShowBtn(false)
      }
      toast.info(
        "Subscription cancelled successfully! You will have access to your current plan until the next payment is due.",
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      );
    } catch {
      console.log("error canceling sub");
    }
  };

  return (
    <section className="account-dashboard-section">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <h2>My Profile</h2>
      <div className="account-info-section">
        <div className="account-info-container">
          <header>
            <h3>{firstname}</h3>
            <p>{email}</p>
          </header>
          <div className="subscription-details">
            <p>
              <strong>Current Plan:</strong> {tier}
            </p>
            <p>
              <strong>Price:</strong> ${price}/week
            </p>
            <p>
              <strong>Subscription Ends:</strong> {endDate}
            </p>
          </div>
        </div>
        {showBtn && (
          <div className="action-sec">
            <button
              type="button"
              className="btn"
              id="cancel-btn"
              onClick={cancelSub}
            >
              Cancel Subscription
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
