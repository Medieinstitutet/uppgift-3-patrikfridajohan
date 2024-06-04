import axios from "axios";
import "../styles/dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/*const exampleData = {
  user: {
    subscriptionlevel: "Plus",
  },
  newsletters: [
    {
      id: 1,
      title: "Skövdes nyheter",
      description: "Lorem ipsum yadda yadda",
      level: "Standard",
    },
    {
      id: 2,
      title: "Vänersborg nyheter",
      description: "Lorem ipsum yadda yadda",
      level: "Standard",
    },
    {
      id: 3,
      title: "Askims nyheter",
      description: "Lorem ipsum yadda yadda",
      level: "Standard",
    },
    {
      id: 4,
      title: "Hallands län",
      description: "Lorem ipsum yadda yadda",
      level: "Plus",
    },
    {
      id: 5,
      title: "Skåne",
      description: "Lorem ipsum yadda yadda",
      level: "Plus",
    },
    {
      id: 6,
      title: "Gotland",
      description: "Lorem ipsum yadda yadda",
      level: "Plus",
    },
    {
      id: 7,
      title: "Bianca ingrosso",
      description: "Lorem ipsum yadda yadda",
      level: "Exclusive",
    },
    {
      id: 8,
      title: "Benjamin ingrosso",
      description: "Lorem ipsum yadda yadda",
      level: "Exclusive",
    },
    {
      id: 9,
      title: "Axwell ingrosso",
      description: "Lorem ipsum yadda yadda",
      level: "Exclusive",
    },
  ],
};
 */

export const Dashboard = () => {
  const navigate = useNavigate();
  const [newsletters, setNewsletters] = useState<INewsletter[]>([]);
  const [subscriptionlevel, setSubscriptionlevel] = useState<number>();
  /* const { subscriptionlevel } = exampleData.user;
  const availableNewsletters = exampleData.newsletters.filter(
    (item) => item.level === subscriptionlevel
  ); */

  useEffect(() => {
    /*   const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:5173/api/user");
        setSubscriptionlevel(response.data.subscriptionid);
      } catch (err) {
        console.log("Error fetching user data:", err);
      }
    };
 */

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
    /* fetchUserData(); */
  }, []);

  const handleClick = (id: number) => {
    navigate(`/user/newsletter/${id}`);
  };

  /* const filteredNewsletters = newsletters.filter(
    (newsletter) => newsletter.level === subscriptionlevel
  ); */

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome, Friend!</h1>
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
          <h2>Available Newsletters</h2>
          {newsletters.length === 0 ? (
            <p>No Newsletters available for your subscription.</p>
          ) : (
            newsletters?.map((newsletter) => (
              <div
                className="newsletter-item"
                key={newsletter.id}
                onClick={() => handleClick(newsletter.id)}
              >
                <h2>{newsletter.title}</h2>
                <p>{newsletter.shortinfo}</p>
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
