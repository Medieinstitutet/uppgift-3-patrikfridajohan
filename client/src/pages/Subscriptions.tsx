import React, { useEffect, useState } from 'react';
import { getUseridfromcookie, getAllsubscriptions, getActiveSubscription, isLoggedIn, handleCheckout, getAllUserData } from '../services/authService';
import "../styles/subscriptions.css";

interface Plan {
  id: string;
  name: string;
  price: number;
  info: string;
}

export const Subscriptions: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [activeSubscriptionId, setActiveSubscriptionId] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const { loggedIn } = isLoggedIn();
    setLoggedIn(loggedIn);

    const userId = getUseridfromcookie();
    console.log("UserID from cookie in plan:", userId);

    if (!loggedIn) {
      window.location.href = '/login';
      return;
    }
    if (!userId) {
      window.location.href = '/login';
      return;
    }

    // Get all subscriptions
    const fetchPlans = async () => {
      try {
        const plansData = await getAllsubscriptions();
        console.log("Plans Data:", plansData);
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
          console.log("User active subscription:", subscription);
          setActiveSubscriptionId(subscription);
        } catch (error) {
          console.error('Error fetching active subscription:', error);
        }
      }
    };

    fetchActiveSubscriptionId();
  }, [loggedIn]);

  const handleSubscribe = async(planId: string) => {
    console.log('Subscription button clicked for plan ID:', planId);
    // Write code to do magic when selecting plan here
    
    try {
      const userId = getUseridfromcookie() ?? '';
      const response = await getAllUserData(userId)
      const userEmail = response.email
      await handleCheckout(planId, userEmail);
    } catch (error) {
      console.error("Subscription failed", error);
      // You can add further error handling here if needed
    }
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
            {activeSubscriptionId === plan.id.toString() ? (
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