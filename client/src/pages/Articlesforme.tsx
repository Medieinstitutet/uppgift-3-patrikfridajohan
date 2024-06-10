import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllarticlesforme, isLoggedIn } from "../services/authService";

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

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      const fetchArticles = async () => {
        try {
          const articles = await getAllarticlesforme();
          setArticles(articles);
        } catch (error) {
          console.error("Error fetching articles:", error);
        }
      };
  
      fetchArticles();
    }
  }, [navigate, loggedIn]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleClick = (id: number): void => {
    navigate(`/user/article/${id}`);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
      <section className="newsletter-list">
        <h2 style={{ marginBottom: "40px" }}>Available Articles for me</h2>
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
      </div>
    </div>
  );
};
