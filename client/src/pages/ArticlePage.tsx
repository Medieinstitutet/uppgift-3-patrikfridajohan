import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleData, isLoggedIn, getActiveSubscriptionData } from "../services/authService";
import "../styles/article.css";

interface Params {
  [key: string]: string | undefined;
}

interface ArticleData {
  id: number;
  title: string;
  shortinfo: string;
  longinfo: string;
  added: string;
}

export const Article: React.FC = () => {
  const { id } = useParams<Params>();
  const navigate = useNavigate();
  const [articleData, setArticleData] = useState<ArticleData | null>(null);
  const [allowed, setAllowed] = useState<boolean>(false);
  const [subscriptionPaid, setSubscriptionPaid] = useState<boolean>(false);
  const [stripeInvoiceUrl, setStripeInvoiceUrl] = useState<string>('');
  const { loggedIn } = isLoggedIn();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!loggedIn || !id) return;

        // Fetch article data and allowed status
        const { articleData, allowed } = await getArticleData(id);
        setArticleData(articleData);
        setAllowed(allowed);

        // Fetch subscription payment status
        const activeSubscriptionData = await getActiveSubscriptionData();
        setSubscriptionPaid(activeSubscriptionData.payed === 1);
        setStripeInvoiceUrl(activeSubscriptionData.stripeInvoiceUrl);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, loggedIn]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!loggedIn) {
    return (
      <div className="article-container">
        <div className="not-allowed-message">
          <h2>Authentication Required</h2>
          <p>You need to login to view this article.</p>
          <a className="btn" href="/login">
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="article-container">
      {allowed ? (
        <div>
          {!subscriptionPaid && articleData && (
            // Display only article title if subscription is unpaid
            <>
              <h2>{articleData.title}</h2>
              <div className="not-allowed-message">
                <p>Payment unsuccessful. Your subscription is not paid. Please pay invoice to continue.</p>
                <a className="btn" href={stripeInvoiceUrl} target="_blank" rel="noopener noreferrer">
                  Pay Invoice
                </a>
              </div>
              <br></br>
              <button className="btn btn-light" onClick={handleBack}>Back</button>
            </>
          )}
          {subscriptionPaid && articleData && (
            // Display article content if subscription is paid
            <div>
              <h2>{articleData.title} ({formatDate(articleData.added)})</h2>
              <p>{articleData.shortinfo}</p>
              <p>{articleData.longinfo}</p>
              <br></br>
              <button className="btn btn-light" onClick={handleBack}>Back</button>

            </div>
          )}
        </div>
      ) : (
        // Display message if user is not allowed to view article
        <>
          <h2>{articleData?.title} ({articleData?.added ? formatDate(articleData.added) : ''})</h2>
          <div className="not-allowed-message">
            <h2>Restricted</h2>
            <p>
              You are not allowed to view this article on your subscription level. If you want to view it, you need to
              upgrade your plan.{" "}
              <a className="btn" href="/user/subscriptions">
                Upgrade plan
              </a>
            </p>
          </div>
          <br></br>
          <button className="btn btn-light" onClick={handleBack}>Back</button>
        </>
      )}
    </div>
  );
};
