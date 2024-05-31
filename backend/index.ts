import express from 'express';
import dotenv from 'dotenv';
import apiRouter from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON bodies

// Define your API routes
app.use('/api', apiRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => { // Error handling middleware
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => { // Start the server
    console.log(`Server is running on http://localhost:${PORT}`);
});
