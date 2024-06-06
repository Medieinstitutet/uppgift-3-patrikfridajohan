import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllarticletitles } from "../services/authService";

export const Articles = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);

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

  const handleClick = (id: number) => {
    navigate(`/user/articles/${id}`);
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
                
                <h4>{article.title}</h4>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
};
