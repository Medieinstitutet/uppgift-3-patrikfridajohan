import "../styles/listnewsletters.css";

export const ListNewsletters = () => {
  const exampleData = {
    newsletters: [
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
    ],
  };
  return (
    <div className="newsletter-list-container">
            <h2>Newsletter List</h2>
            <div className="newsletter-list">
                {exampleData.newsletters.map(newsletter => (
                    <div key={newsletter.id} className={`newsletter-item ${newsletter.level.toLowerCase()}`}>
                        <h3>{newsletter.title}</h3>
                        <p>{newsletter.description}</p>
                        <span className="level-badge">{newsletter.level}</span>
                    </div>
                ))}
            </div>
        </div>
  );
};
