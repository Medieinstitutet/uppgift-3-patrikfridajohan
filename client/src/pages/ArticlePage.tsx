import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getArticleData } from "../services/authService";
import { isLoggedIn } from "../services/authService";
import "../styles/article.css";

export const Article = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState<any>();
  const [allowed, setAllowed] = useState<boolean>(false);
  const { loggedIn } = isLoggedIn();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { articleData, allowed } = await getArticleData(id);
        setArticleData(articleData);
        setAllowed(allowed);
      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticle();
  }, [id]);

  return (
    <div className="article-container">
      {loggedIn ? (
        allowed ? (
          articleData ? (
            <div>
              <h2>{articleData.title}</h2>
              <p>{articleData.shortinfo}</p>
              <p>{articleData.longinfo}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )
        ) : (
          // Display message if user is not allowed to view article
          <div className="not-allowed-message">
            <h2>Restricted</h2>
            <p>
              You are not allowed to view this article on your subscription level. If you want to view it, you need to
              upgrade your plan.{" "}
              <a className="btn" href="/user/subscriptions">
                upgrade plan
              </a>
            </p>
          </div>
        )
      ) : (
        // Display message if user is not logged in
        <div className="not-allowed-message">
          <h2>Authentication Required</h2>
          <p>You need to login to view this article.
          {" "}
              <a className="btn" href="/login">
                Login
              </a>
          </p>
        </div>
      )}
    </div>
  );
};
