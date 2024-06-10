import { useEffect, useState } from 'react';
import { getAllsubscriptions } from '../services/authService';
import { Link } from 'react-router-dom';
import "../styles/subscriptions.css";

interface Plan {
  id: string;
  name: string;
  price: number;
  info: string;
}

export const Plans: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Get all subscriptions
    const fetchPlans = async () => {
      try {
        const plansData = await getAllsubscriptions();
        setPlans(plansData);
      } catch (error) {
        console.error('Error fetching plans:', error);
        setError('Failed to fetch plans. Please try again later.');
      }
    };
    fetchPlans();
  }, []);

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
          {error ? (
            <div className="error-message">
              <p>{error}</p>
            </div>
          ) : (
            plans.map(plan => (
              <div className="feature" key={plan.id}>
                <h4>{plan.name}</h4>
                <p className="pricing">${plan.price}</p>
                <p>{plan.info}</p>
                <Link to="/login" className="btn">
                  Login to start
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};