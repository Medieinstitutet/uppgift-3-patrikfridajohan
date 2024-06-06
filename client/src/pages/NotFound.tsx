import '../styles/notfound.css';

export const NotFound = () => {
    return (
        <div className="not-found-container">
            <img src="/404.webp" alt="404 Not Found" />
            <h1>Oops! Looks like you're lost...</h1>
            <p>But don't worry, even the best get lost sometimes!</p>
            <p>Why don't you try <a href="/">going back home</a>?</p>
        </div>
    );
};
