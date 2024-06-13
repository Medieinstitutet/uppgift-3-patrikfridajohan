import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllarticlesforme, getActiveSubscriptionData, isLoggedIn } from "../services/authService";

interface Article {
  id: number;
  title: string;
  shortinfo: string;
  added: string;
}

export const Articlesforme: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const { loggedIn } = isLoggedIn();
  const [subscriptionPaid, setSubscriptionPaid] = useState<boolean>(false);
  const [stripeInvoiceUrl, setStripeInvoiceUrl] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!loggedIn) {
          navigate("/login");
          return;
        }

        // Check subscription status
        const activeSubscriptionData = await getActiveSubscriptionData();
        setSubscriptionPaid(activeSubscriptionData.payed === 1);
        setStripeInvoiceUrl(activeSubscriptionData.stripeInvoiceUrl);

        // Fetch articles only if subscription is paid
        if (activeSubscriptionData.payed === 1) {
          const articles = await getAllarticlesforme();
          setArticles(articles);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [navigate, loggedIn]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleClick = (id: number): void => {
    navigate(`/user/article/${id}`);
  };

  if (!loggedIn) {
    return null; 
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <section className="newsletter-list">
          <h2 style={{ marginBottom: "40px" }}>Available Articles for me</h2>

          {!subscriptionPaid && (
            <div className="not-allowed-message">
              <h2>Payment unsuccessful</h2>
              <p>Your subscription is not paid. Please pay invoice to continue.</p>
              <a className="btn" href={stripeInvoiceUrl} target="_blank" rel="noopener noreferrer">
                Pay Invoice
              </a>
            </div>
          )}

          {subscriptionPaid && (
            <div>
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
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Articlesforme;
