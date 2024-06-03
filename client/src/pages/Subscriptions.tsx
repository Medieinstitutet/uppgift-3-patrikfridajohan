import { isLoggedIn, isAdmin } from './authService';
import "../styles/subscriptions.css";

export const Subscriptions = () => {
  // Check if the user is logged in and their role
  const { loggedIn } = isLoggedIn();
  const admin = isAdmin();

  // If the user is not logged in, show a message
  if (!loggedIn) {
    return <div>You need to login in to show this page.</div>;
  }

  // If the user is an admin, show a message
  if (admin) {
    return <div>Sorry, this page is not accessible for admin users.</div>;
  }

  // Test - ska sen hämta från DB.
  const plan1 = {
    name: "Plan 1",
    price: "$0",
    info: "Our light plan to get to know SCOPE.",
    buttonText: "ALREADY SUBSCRIBING",
    buttonDisabled: true,
    buttonClass: "btn-success"
  };

  const plan2 = {
    name: "Plan 2",
    price: "$20",
    info: "Our standard plan to get more.",
    buttonText: "SUBSCRIBE",
    buttonDisabled: false,
    buttonClass: "btn-primary"
  };

  const plan3 = {
    name: "Plan 3",
    price: "$45",
    info: "Our VIP Plan, to get it all.",
    buttonText: "SUBSCRIBE",
    buttonDisabled: false,
    buttonClass: "btn-primary"
  };

  return (
    <div className="body">
      <div className="introduction">
        <h1 id="intro-header">
          Subscription plans
        </h1>
      </div>
      <div className="keys">
        <div className="features">
          <div className="feature">
            <h4>{plan1.name}</h4>
            <p className="pricing">{plan1.price}</p>
            <p>
              {plan1.info}
            </p>
            <a href="#" className={plan1.buttonClass} disabled={plan1.buttonDisabled}>{plan1.buttonText}</a>
          </div>
          <div className="feature">
            <h4>{plan2.name}</h4>
            <p className="pricing">{plan2.price}</p>
            <p>
              {plan2.info}
            </p>
            <a href="#" className={plan2.buttonDisabled ? plan2.buttonClass : "btn-primary"} disabled={plan2.buttonDisabled}>{plan2.buttonText}</a>
          </div>
          <div className="feature">
            <h4>{plan3.name}</h4>
            <p className="pricing">{plan3.price}</p>
            <p>
              {plan3.info}
            </p>
            <a href="#" className={plan3.buttonDisabled ? plan3.buttonClass : "btn-primary"} disabled={plan3.buttonDisabled}>{plan3.buttonText}</a>
          </div>
        </div>
      </div>
    </div>
  );
};
