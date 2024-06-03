import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import pool from './mysql';

// import apiRouter from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Define your API routes
// app.use('/api', apiRouter);

async function testMySQLConnection() {
    try {
        const [rows, fields]: [any[], any] = await pool.query('SELECT * FROM data_users LIMIT 1');

        console.log('MySQL connection works!');
        console.log('Retrieved data:', rows);
    } catch (error) {
        console.error('Error testing MySQL connection:', error);
    }
}

testMySQLConnection();



app.use((err: Error, req: Request, res: Response, next: NextFunction) => { // Error handling middleware
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => { // Start the server
    console.log(`Server is running on http://localhost:${PORT}`);
});
