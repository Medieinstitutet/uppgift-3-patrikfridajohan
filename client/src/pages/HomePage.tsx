import "../styles/homePage.css";
import pic from "../assets/3d-casual-life-man-reading-newspaper-with-cup-of-coffee.png";

export const HomePage = () => {
  return (
    <div className="body">
      <div className="hero">
        <div className="hero-text">
          <h2>Unlock the World of Knowledge with SCOPE</h2>
          <p>
            Handpicked articles, delivered daily to ignite your curiosity and
            expand your mind.
          </p>
          <div className="cta">
            <button type="button" className="btn cta-btn">
              Start exploring
            </button>
          </div>
        </div>
        <div className="hero-pic">
          <img src={pic} alt="" />
        </div>
      </div>
      <div className="introduction">
        <h4 id="intro-header">
          Dive into a curated selection of insightful articles handpicked just
          for you. Whether you're a casual reader or a lifelong learner, SCOPE
          brings you the best of the web's content, tailored to your interests.
        </h4>
      </div>
      <div className="steps">
        <h3>Here's how it works:</h3>
        <div className="step-unit" id="step1">
          <h1 className="step-num">1</h1>
          <div className="step-text">
            <p>
              Sign Up and Customize Your Preferences: Create your SCOPE account
              and let us know your interests. Whether it's technology, health,
              finance, or lifestyle, we tailor our recommendations to your
              passions.
            </p>
          </div>
        </div>
        <div className="step-unit" id="step2">
          <div className="step-text">
            <p>
              Receive Daily Curated Articles: Every day, we deliver a selection
              of articles straight to your dashboard, chosen specifically for
              you by our team and advanced algorithms.
            </p>
          </div>
          <h1 className="step-num">2</h1>
        </div>
        <div className="step-unit" id="step3">
          <h1 className="step-num">3</h1>
          <div className="step-text">
            <p>
              Engage and Learn: Dive into your personalized feed, explore new
              topics, and broaden your horizons with content that matters to
              you.
            </p>
          </div>
        </div>
        <button type="button" className="btn cta-btn">
          Subscribe now
        </button>
      </div>
    </div>
  );
};

{
  /* <ul>
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
        </ul> */
}
