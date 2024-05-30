
const dotenv = require('dotenv');
const mysql = require('mysql2/promise'); 

dotenv.config();

const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const SQLlink = mysql.createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPass,
    database: dbName
});

SQLlink.connect()
    .then(() => {
        console.log('Connected to MySQL database');
    })
    .catch((err) => {
        console.error('Connection failed: ', err);
    });

SQLlink.on('error', (err) => {
    console.error('MySQL error occurred:', err.message);
});

module.exports = SQLlink;


// Alternativt men får felmeddelande när jag försöker installera mysql2/promise

// const dotenv = require('dotenv');
// const mysql = require('mysql2');

// dotenv.config();

// const dbHost = process.env.DB_HOST;
// const dbName = process.env.DB_NAME;
// const dbUser = process.env.DB_USER;
// const dbPass = process.env.DB_PASS;

// const SQLlink = mysql.createConnection({
//     host: dbHost,
//     user: dbUser,
//     password: dbPass,
//     database: dbName
// });

// SQLlink.connect((err) => {
//     if (err) {
//         console.error('Connection failed: ', err);
//         return;
//     }
//     console.log('Connected to MySQL database');
// });

// SQLlink.on('error', (err) => {
//     console.error('MySQL error occurred:', err.message);
// });

// module.exports = SQLlink;
