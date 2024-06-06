import { useEffect, useState } from "react";
import "../styles/listnewsletters.css";
import axios from "axios";

export const ListNewsletters = () => {
  const [allNewsletters, setAllNewsletters] = useState<INewsletter[]>([]);
  useEffect(() =>{
    const fetchAllNewsletters = async () => {
      try {
        const response = await axios.get("http://localhost:5173/api/admin/articles");
        console.log(response.data);
        setAllNewsletters(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllNewsletters();
   
  },[]);
 
  return (
    <div className="newsletter-list-container">
            <h2>Newsarticles List</h2>
            <div className="newsletter-list">
                {allNewsletters.map(newsletter => (
                    <div key={newsletter.id} className={`newsletter-item`}>
                        <h3>{newsletter.title}</h3>
                        <p>{newsletter.shortinfo}</p>
                        <span className="level-badge">{newsletter.longinfo}</span>
                    </div>
                ))}
            </div>
        </div>
  );
};
