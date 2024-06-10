import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllarticletitles } from "../services/authService";

interface Article {
  id: number;
  title: string;
  added: string;
}

export const Articles: React.FC = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const articleTitles = await getAllarticletitles();
        setArticles(articleTitles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);


  const handleClick = (id: number): void => {
    navigate(`/user/article/${id}`);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
      <section className="newsletter-list">
        <h2 style={{ marginBottom: "40px" }}>Available Articles</h2>
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
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};
