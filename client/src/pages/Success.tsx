import axios from "axios";

export const Success = () => {
 
  const handleCheckout = async () => {
    const response = await axios.post(
      "http://localhost:5173/api/stripe/create-checkout-session"
    );
    if (response.status === 200) {
      const { url } = response.data;
      window.location.href = url;
    } else {
      console.error("failed to initiate checkout", response.data);
    }
  };
 const handleSub = async() =>{
     
        const response = await axios.post(
          "http://localhost:5173/api/stripe/create-subscription"
        );
       
      };
  

  return (
    <>
      {" "}
      <div>hello succcess</div>
      <button onClick={handleCheckout}>Skapa session</button>
      <button onClick={handleSub}>Subscribea</button>
    </>
  );
};
