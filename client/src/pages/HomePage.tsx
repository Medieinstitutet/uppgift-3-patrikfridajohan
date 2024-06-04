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
      <div className="keys">
        <h3>Key features</h3>
        <div className="hp-features">
          <div className="hp-feature">
            <h4>Daily Curated Articles</h4>
            <p>
              Our expert team handpicks the best articles each day to keep you
              informed and inspired.
            </p>
          </div>
          <div className="hp-feature">
            <h4>Personalized Recommendations</h4>
            <p>
              Enjoy a tailored reading experience with articles that match your
              interests and preferences.
            </p>
          </div>
          <div className="hp-feature">
            <h4>Accessible Anywhere</h4>
            <p>
              Whether you're at home or on the go, access SCOPE on your desktop,
              tablet, or mobile device.
            </p>
          </div>
          <div className="hp-feature">
            <h4>Community Engagement</h4>
            <p>
              Join a vibrant community of curious minds. Share articles, discuss
              topics, and connect with like-minded readers.
            </p>
          </div>
        </div>
      </div>
      <div className="testimonials">
        <div className="quote">
          <h6>
            "SCOPE has transformed my reading habits. I love waking up to a
            fresh selection of articles every day."
          </h6>
          <p>- Frida A. President of the United states</p>
        </div>
        <div className="quote">
          <h6>
            "The personalized recommendations are spot on. It's like having a
            personal curator just for me!"
          </h6>
          <p>- Patrik B. CEO of Google</p>
        </div>
        <div className="quote">
          <h6>
            "The quality of content on SCOPE is unparalleled. I've discovered so
            many new topics and ideas."
          </h6>
          <p>- Johan N. Coach of Manchester United</p>
        </div>
      </div>
      <div className="why">
        <h3>Why SCOPE?</h3>
        <p>
          In a world overflowing with information, SCOPE cuts through the
          clutter to bring you only the best content. Our dedicated team of
          curators and sophisticated algorithms work together to ensure you
          receive articles that are relevant, insightful, and of the highest
          quality.
        </p>
      </div>
    </div>
  );
};
