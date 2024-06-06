import { useEffect, useState } from 'react';
import { getUseridfromcookie, getAllsubscriptions, getActiveSubscription, isLoggedIn } from '../services/authService';
import "../styles/subscriptions.css";

export const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [activeSubscriptionId, setActiveSubscriptionId] = useState(null);
  const { loggedIn } = isLoggedIn();

  useEffect(() => {
    const userId = getUseridfromcookie();
    console.log("UserID from cookie2:",userId);

     if (!loggedIn) {
       window.location.href = '/login'; 
       return;
    }

    console.log('User ID:', userId);
    if (!userId) {
        window.location.href = '/login'; 
        return;
      }

    // Get all subscriptions
    const fetchPlans = async () => {
      try {
        const plansData = await getAllsubscriptions();
        setPlans(plansData);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchPlans();

    // Get active subscriptionID
    const fetchActiveSubscriptionId = async () => {
        if (userId) {
            try {
                const subscription = await getActiveSubscription(userId);
                setActiveSubscriptionId(subscription);
            } catch (error) {
                console.error('Error fetching active subscription:', error);
            }
        }
    };

    fetchActiveSubscriptionId();
  }, []);

  const handleSubscribe = (planId) => {
    console.log('Subscription button clicked for plan ID:', planId);
    // Write code to do magic when selecting plan here
  };

  // Render subscription plans
  return (
    <div className="body">
      <div className="introduction">
        <h1 id="intro-header">
          Subscription plans
        </h1>
      </div>
      <div className="keys">
        <div className="features">
          {plans.map(plan => (
            <div className="feature" key={plan.id}>
              <h4>{plan.name}</h4>
              <p className="pricing">${plan.price}</p>
              <p>{plan.info}</p>
              {activeSubscriptionId === plan.id ? (
                <button type="button" className="btn btn-outline-success subscribed" disabled>Already Subscribed</button>
              ) : (
                <button
                  className="btn"
                  onClick={() => handleSubscribe(plan.id)}
                >
                  SUBSCRIBE
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
