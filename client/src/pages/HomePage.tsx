import "../styles/homePage.css";
import pic from "../assets/3d-casual-life-man-reading-newspaper-with-cup-of-coffee.png";

export const HomePage = () => {
  return (
    <div className="body">
      <div className="hero">
        <div className="hero-text">
          <h2>Welcome to SCOPE: Explore Curated Articles Every Day</h2>
          <p>
            Unlock a world of knowledge with SCOPE. Dive into a curated
            selection of insightful articles handpicked just for you. Whether
            you're a casual reader or a lifelong learner, SCOPE brings you the
            best of the web's content, tailored to your interests.
          </p>
        </div>
        <div className="hero-pic">
          <img src={pic} alt="" />
        </div>
      </div>
      <div className="introduction">
        <ul>
          <li>
            Daily Curated Articles: Discover fresh perspectives and expert
            insights every day.
          </li>
          <li>
            Personalized Recommendations: Receive articles tailored to your
            interests and preferences.
          </li>
          <li>
            Accessible Anywhere: Enjoy SCOPE on your desktop, tablet, or mobile
            device.
          </li>
          <li>Join our vibrant community of readers and thinkers!</li>
        </ul>
      </div>
    </div>
  );
};
