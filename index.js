var path = require('path');

// Import required modules
const express = require('express');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Define a route handler for the root path
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// ERROR 404
app.use((req, res, next) => {
    res.status(404).render('404');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});