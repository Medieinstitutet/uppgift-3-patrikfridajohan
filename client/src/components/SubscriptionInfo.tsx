import React from "react";
import "../styles/account.css";
import { cancelSubscription } from "../services/authService";

interface SubscriptionData {
  name: string;
  price: number;
  enddate: Date;
}

interface ISubscriptionInfo {
  subscriptionData: SubscriptionData | null | undefined;
}

export const SubscriptionInfo: React.FC<ISubscriptionInfo> = (props) => {
  const cancelSub = async () => {
    try {
      await cancelSubscription();
    } catch {
      console.log("error canceling sub");
    }
  };
  const { subscriptionData } = props;

  if (!subscriptionData) {
    return <div>No subscription data available</div>;
  }

  const { name, price, enddate } = subscriptionData;

  return (
    <div className="sub-container">
      <div className="sub-info">
        <h2>Your subscription info</h2>
        <div className="info-row">
          <p>Current plan:</p>
          <h4>{name}</h4>
        </div>
        <div className="info-row">
          <p>Next billing date:</p>
          <h4>{enddate ? enddate.toLocaleDateString() : "Unknown"}</h4>
        </div>
      </div>
      <div className="billing">
        <h2>Billing Information:</h2>
        <p>Renewal: Every 7th day</p>
        <p>Cost: ${price}/month</p>
        <p>Payment method: Stripe</p>
        <button type="button" className="btn">
          Change plan
        </button>
        <button type="button" className="btn" onClick={cancelSub}>
          Cancel subscription
        </button>
      </div>
    </div>
  );
};
