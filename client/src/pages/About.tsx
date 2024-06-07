import "../styles/about.css";

export const About = () => {
  return (
    <div className="body">
      <div className="first-section">
        <div className="first-section-header">
          <h2 id="first-section-header">About us</h2>
          <p className="about-text">
            SCOPE is your gateway to expertly curated content, delivering
            high-quality articles on a diverse range of topics every day. Our
            mission is to provide you with insightful, engaging, and
            thought-provoking reads, handpicked by our team of experienced
            editors.
          </p>
        </div>
        <div className="about-text-section">
          <div className="about-unit">
            <h4 className="about-small-header">Our vision</h4>
            <p className="about-text">
              At SCOPE, we believe in the power of knowledge and the importance
              of staying informed. We strive to create a platform where readers
              can explore new ideas, discover fresh perspectives, and stay
              updated with the latest trends and developments. Our vision is to
              become the go-to source for readers seeking depth, quality, and
              variety in their daily reading.
            </p>
          </div>
          <div className="about-unit">
            <h4 className="about-small-header">Our mission</h4>
            <p className="about-text">
              Our mission is to provide our subscribers with a daily dose of
              well-researched, compelling content. We aim to foster a community
              of informed individuals who value continuous learning and
              intellectual growth. By offering a mix of news, analysis, opinion
              pieces, and feature articles, we cater to a broad spectrum of
              interests and ensure there's something for everyone.
            </p>
          </div>
          <div className="about-unit">
            <h4 className="about-small-header">Our team</h4>
            <p className="about-text">
              Our dedicated team of writers, editors, and curators are
              passionate about delivering content that matters. With backgrounds
              in journalism, academia, and various professional fields, they
              bring a wealth of knowledge and expertise to ensure every article
              you read on SCOPE is of the highest quality. Our team works
              tirelessly to sift through the vast sea of information available
              today, selecting only the most relevant and insightful pieces for
              our readers.
            </p>
          </div>
          <div className="about-unit">
            <h4 className="about-small-header">Editorial standards</h4>
            <p className="about-text">
              Quality and integrity are at the core of everything we do at
              SCOPE. Our editorial standards are designed to ensure accuracy,
              fairness, and balance in all our content. We are committed to
              providing well-researched and fact-checked articles that our
              readers can trust. Our editors meticulously review every piece
              before publication to maintain the highest standards of
              journalism.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
