import { useState } from "react";
import { AccountDash } from "../components/AccountDash";
import "../styles/account.css";
import { SubscriptionInfo } from "../components/SubscriptionInfo";

export const Account = () => {
  const [selection, setSelection] = useState("dashboard");

  const dummyData = {
    email: "dummy@data.com",
    plan: {
        name: "plus",
        cost: "4"
    },
    renewal: "2024-06-31",
    billing: "Stripe"
  };

  let selectedComponent;
  switch (selection) {
    case "dashboard":
      selectedComponent = <AccountDash />;
      break;
    case "subscription":
      selectedComponent = <SubscriptionInfo dummyData={dummyData}/>;
      break;
    case "settings":
      break;
    case "support":
      break;
    default:
      selectedComponent = <AccountDash />;
      break;
  }

  return (
    <div className="dashboard-section">
      <h2>My profile</h2>
      <div className="issue-list">
        <h3 className="name">NAME</h3>
        <ul className="list-group issue-items list-group-flush">
          <li
            className="list-group-item issue"
            onClick={() => setSelection("dashboard")}
          >
            Dasboard
          </li>
          <li
            className="list-group-item issue"
            onClick={() => setSelection("subscription")}
          >
            Subscription
          </li>
          <li
            className="list-group-item issue"
            onClick={() => setSelection("settings")}
          >
            Settings
          </li>
          <li
            className="list-group-item issue"
            onClick={() => setSelection("support")}
          >
            Support
          </li>
        </ul>
      </div>
      <div className="content">{selectedComponent}</div>
    </div>
  );
};
