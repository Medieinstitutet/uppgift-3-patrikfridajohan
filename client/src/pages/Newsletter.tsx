import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

  const randomInfo = [
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
  ];
  const userRole = {
    subscriptionLevel: "Plus",
  };
  export const Newsletter = () => {

    const { id } = useParams();
    const navigate = useNavigate()
    const newsletter = randomInfo.find((item) => item.id.toString() === id);
    console.log(newsletter);


    useEffect(() => {
        if (!newsletter || (newsletter.level !== "Plus" && newsletter.level !== userRole.subscriptionLevel)) {
          navigate('/user/dashboard');
        }
      }, [newsletter, navigate]);
    
      if (!newsletter) {
        return null; 
      }
      
   
    return (
        <div className="newsletter-container">
          <h1>{newsletter?.title}</h1>
          <p>{newsletter?.description}</p>
        </div>
      );
    };
    
