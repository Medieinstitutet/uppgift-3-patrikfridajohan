import { useState } from "react";
import { AccountDash } from "../components/AccountDash";
import "../styles/account.css";
import { SubscriptionInfo } from "../components/SubscriptionInfo";
import { AccountSettings } from "../components/AccountSettings";

export const Account = () => {
  const [selection, setSelection] = useState("dashboard");

  const dummyData = {
    name: "Dummy",
    email: "dummy@data.com",
    plan: {
      name: "plus",
      cost: "4",
    },
    renewal: "2024-06-31",
    billing: "Stripe",
  };

  let selectedComponent;
  switch (selection) {
    case "dashboard":
      selectedComponent = <AccountDash dummyData={dummyData} setSelection={setSelection}/>;
      break;
    case "subscription":
      selectedComponent = <SubscriptionInfo dummyData={dummyData} />;
      break;
    case "settings":
        selectedComponent = <AccountSettings dummyData={dummyData}/>;
      break;
    case "support":
      break;
    default:
      selectedComponent = <AccountDash dummyData={dummyData} setSelection={setSelection}/>;
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
              Dasboard
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
