import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

  const randomInfo = [
    {
      id: 1,
      title: "Standard Content",
      level: "Standard",
      body: "This is standard content.",
    },
    {
      id: 2,
      title: "Plus Content",
      level: "Plus",
      body: "This is plus content.",
    },
    {
      id: 3,
      title: "Exclusive Content",
      level: "Exclusive",
      body: "This is exclusive content.",
    },
  ];
  const userRole = {
    subscriptionLevel: "Plus",
  };
  export const Newsletter = () => {

    const { id } = useParams();
    const navigate = useNavigate()
    const newsletter = randomInfo.find((item) => item.id.toString() === id);


    useEffect(() => { 
        if (!newsletter){
        navigate('/user/dashboard')
        
    }
    
    if (!newsletter || (newsletter.level !== "Standard" && newsletter.level !==userRole.subscriptionLevel)){
         navigate('/user/dashboard')
         
    }

    },[newsletter,navigate])
   
    return (
        <div className="newsletter-container">
          <h1>{newsletter?.title}</h1>
          <p>{newsletter?.body}</p>
        </div>
      );
    };
    
