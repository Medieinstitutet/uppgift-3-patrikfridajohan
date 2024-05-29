import axios from "axios";
import "../styles/dashboard.css"
import { useEffect, useState } from "react";

const exampleData = {
    user: {
        subscriptionlevel: "Exclusive"
    },
    newsletters:[
        { id: 1, title: "Skövdes nyheter", level: "Standard" },
        { id: 2, title: "Vänersborg nyheter", level: "Standard" },
        { id: 3, title: "Askims nyheter", level: "Standard" },
        { id: 4, title: "Hallands län", level: "Plus" },
        { id: 5, title: "Skåne", level: "Plus" },
        { id: 6, title: "Gotland", level: "Plus" },
        { id: 7, title: "Bianca ingrosso", level: "Exclusive" },
        { id: 8, title: "Benjamin ingrosso", level: "Exclusive" },
        { id: 9, title: "Axwell ingrosso", level: "Exclusive" }
    ]
}


export const Dashboard = () => {
  const {subscriptionlevel} = exampleData.user;
  const availableNewsletters = exampleData.newsletters.filter(
    (item) => item.level === subscriptionlevel);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const response = await axios.get("api");
        setNewsletters(response.data);
        
      } catch (err) {
        console.log(err);
        
      }
    };
  }, []);

  const handleClick = () => {
    console.log("hello world");
  }

  
  return(
    
    <div className="dashboard-container">
    <div className="dashboard-header">
      <h1>Newsletter Dashboard</h1>
    </div>
    <div className="dashboard-content">
      {availableNewsletters.length === 0 ? (
        <p>No Newsletters available for your subscription.</p>
      ) : (
        <div className="newsletter-list">
          {availableNewsletters.map((newsletter) => (
            <div className="newsletter-item" key={newsletter.id}>
              <h2>{newsletter.title}</h2>
              
            </div>
          ))}
        </div>
      )}
    </div>
  </div>

  )
};
