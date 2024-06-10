import { useEffect, useState } from "react";
import "../styles/listnewsletters.css";
import { getAllarticlesforadmin } from "../services/authService";
import { useLocation, Link } from 'react-router-dom';

interface INewsletter {
  id: string;
  title: string;
  shortinfo: string;
  added: string;
  longinfo: string;
}

export const ListNewsarticles = () => {
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const [allNewsletters, setAllNewsletters] = useState<INewsletter[]>([]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() =>{
    const fetchAllNewsletters = async () => {
      try {
        const newsletters = await getAllarticlesforadmin();
        setAllNewsletters(newsletters);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllNewsletters();
  },[]);
 
  return (
    <div className="newsletter-list-container">
      <h2>Newsarticles List</h2>
      <div>
            {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
      <div className="newsletter-list">
        {allNewsletters.map(newsletter => (
          <Link key={newsletter.id} to={`#`} className={`newsletter-item`}>
            <div>
              <h3>{newsletter.title}</h3>
              <p>{newsletter.shortinfo}</p>
              <p>{formatDate(newsletter.added)}</p>
              <span className="level-badge">{newsletter.longinfo}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
