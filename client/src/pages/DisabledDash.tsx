import axios from "axios";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";

export const DisabledDash = () => {
  const [newsletters, setNewsletters] = useState<INewsletter[]>([]);

  useEffect(() => {

    const fetchNewsletters = async () => {
      try {
        const response = await axios.get("http://localhost:5173/api/articles");
        console.log(response.data);
        setNewsletters(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchNewsletters();
  }, []);

  const handleRedirect = () => {
    window.location.href = 'user/subscriptions'
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome to SCOPE</h1>
      </div>
      <div className="dashboard-content">
        <section className="section-dashboard">
          <h2>Notifications</h2>
          <ul>
            <li className="blur">You have 3 new messages</li>
            <li className="blur">Your subscription expires in 10 days</li>
          </ul>
        </section>
        <section className="section-dashboard">
          <h2>Recently Viewed</h2>
          <ul>
            <li className="blur">Article 1</li>
            <li className="blur">Newsletter 2</li>
            <li className="blur">Video 3</li>
          </ul>
        </section>
        <section className="newsletter-list">
          <h2>Available Newsletters</h2>
          {newsletters.length === 0 ? (
            <p>No Newsletters available for your subscription.</p>
          ) : (
            newsletters?.map((newsletter) => (
              <div className="newsletter-item" key={newsletter.id} onClick={handleRedirect}>
                <h2>{newsletter.title}</h2>
                <p className="blur">{newsletter.shortinfo}</p>
              </div>
            ))
          )}
        </section>
        <section className="plan-section">
          <h2>Get access to more content by subscribing!</h2>
          <button type="submit" className="btn" id="login-btn" onClick={handleRedirect}>See Plans</button>
        </section>
      </div>
    </div>
  );
};
