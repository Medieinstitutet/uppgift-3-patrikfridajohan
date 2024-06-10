import React, { useState, useEffect } from "react";
import { AccountDash } from "../components/AccountDash";
import "../styles/account.css";
import { SubscriptionInfo } from "../components/SubscriptionInfo";
import { AccountSettings } from "../components/AccountSettings";
import { getUseridfromcookie, getActiveSubscription, getSubscriptionData } from "../services/authService";

interface DummyData {
  name: string;
  email: string;
  plan: {
    name: string;
    cost: string;
  };
  renewal: string;
  billing: string;
}

export const Account: React.FC = () => {
  const [selection, setSelection] = useState<"dashboard" | "subscription" | "settings" | "support">("dashboard");
  const [subscriptionData, setSubscriptionData] = useState<{ name: string; price: number; active: boolean; enddate: Date; } | null>(null);
  const [dummyData] = useState<DummyData>({
    name: "Dummy",
    email: "dummy@data.com",
    plan: {
      name: "plus",
      cost: "4",
    },
    renewal: "2024-06-31",
    billing: "Stripe",
  });

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const userId = getUseridfromcookie() ?? '';
        const activeSubscriptionId = await getActiveSubscription(userId);
        const data = await getSubscriptionData(activeSubscriptionId || '');
        setSubscriptionData(data);
      } catch (error) {
        console.error("Error fetching subscription data:", error);
      }
    };

    fetchSubscriptionData();
  }, []);

  let selectedComponent;
  switch (selection) {
    case "dashboard":
      selectedComponent = <AccountDash dummyData={dummyData} setSelection={(selection: "dashboard" | "subscription" | "settings" | "support") => setSelection(selection)} />;
      break;
    case "subscription":
      selectedComponent = <SubscriptionInfo subscriptionData={subscriptionData} />;
      break;
    case "settings":
      selectedComponent = <AccountSettings dummyData={dummyData} />;
      break;
    case "support":
      break;
    default:
      selectedComponent = <AccountDash dummyData={dummyData} setSelection={(selection: "dashboard" | "subscription" | "settings" | "support") => setSelection(selection)} />;
      break;
  }

  return (
    <div className="account-dashboard-section">
      <h2>My profile</h2>
      <div className="account-info-section">
        <div className="issue-list">
          <h3 className="name">{dummyData.name}</h3>
          <ul className="list-group issue-items list-group-flush">
            <li
              className={`list-group-item issue ${selection === "dashboard" ? "active" : ""}`}
              onClick={() => setSelection("dashboard")}
            >
              Dashboard
            </li>
            <li
              className={`list-group-item issue ${selection === "subscription" ? "active" : ""}`}
              onClick={() => setSelection("subscription")}
            >
              Subscription
            </li>
            <li
              className={`list-group-item issue ${selection === "settings" ? "active" : ""}`}
              onClick={() => setSelection("settings")}
            >
              Settings
            </li>
            <li
              className={`list-group-item issue ${selection === "support" ? "active" : ""}`}
              onClick={() => setSelection("support")}
            >
              Support
            </li>
          </ul>
        </div>
        <div className="content">{selectedComponent}</div>
      </div>
    </div>
  );
};
