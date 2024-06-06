import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserFirstName, getLatestarticlesforme } from "../services/authService";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [firstName, setFirstName] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const firstName = await getUserFirstName();
        setFirstName(firstName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const fetchArticles = async () => {
      try {
        const articles = await getLatestarticlesforme();
        setArticles(articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchUserData();
    fetchArticles();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleClick = (id: number) => {
    navigate(`/user/article/${id}`);
  };



  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, {firstName}!</h1>
        <p>Subscription Level: </p>
      </div>
      <div className="dashboard-content">
        <section className="section-dashboard">
          <h2>Notifications</h2>
          <ul>
            <li>You have 3 new messages</li>
            <li>Your subscription expires in 10 days</li>
          </ul>
        </section>
        <section className="section-dashboard">
          <h2>Recently Viewed</h2>
          <ul>
            <li>Article 1</li>
            <li>Newsletter 2</li>
            <li>Video 3</li>
          </ul>
        </section>
        <section className="newsletter-list">
          <h2>Latest Newsarticles</h2>
          {articles.length === 0 ? (
            <p>No articles available.</p>
          ) : (
            articles.map((article) => (
              <div
                className="newsletter-item"
                key={article.id}
                onClick={() => handleClick(article.id)}
              >
                
                <h4>{article.title} ({formatDate(article.added)})</h4>
                <p>{article.shortinfo}</p>
              </div>
            ))
          )}
        </section>
        <section className="section-dashboard">
          <h2>Account Management</h2>
          <button>Profile Settings</button>
          <button>Billing Information</button>
          <button>Upgrade Subscription</button>
        </section>
        <section className="section-dashboard">
          <h2>Need Help?</h2>
          <button>Help Center</button>
          <button>Contact Support</button>
        </section>
      </div>
    </div>
  );
};
