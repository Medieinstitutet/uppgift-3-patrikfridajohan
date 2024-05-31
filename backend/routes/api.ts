// routes/api.ts
import express, { Request, Response, NextFunction } from 'express';
import { authenticateToken } from './authMiddleware';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import SQLlink from '../mysql';

const router = express.Router();

// Made example to get started - Johan

// POST /api/auth/login - User login
router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    try {
        // Check if user with provided username exists
        const [rows, fields] = await SQLlink.query('SELECT * FROM users WHERE username = ?', [username]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Check if password is correct
        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        // Generate JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return token to the client
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// POST /api/auth/register - User registration
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;

    try {
        // Check if username or email already exists
        const [usernameRows] = await SQLlink.query('SELECT * FROM users WHERE username = ?', [username]);
        const [emailRows] = await SQLlink.query('SELECT * FROM users WHERE email = ?', [email]);
        if (usernameRows.length > 0) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        if (emailRows.length > 0) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        await SQLlink.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword]);

        // Generate JWT token
        const token = jwt.sign({ username, email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return token to the client
        res.status(201).json({ token });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// GET /api/example - Protected endpoint
router.get('/example', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const [rows, fields] = await SQLlink.query('SELECT * FROM example_table');
        res.json({ data: rows });
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST (Add to DB) /api/data - Protected endpoint
router.post('/data', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req;
    try {
        // Process request body and save data to database
        // Example: await SQLlink.query('INSERT INTO example_table (column1, column2) VALUES (?, ?)', [body.column1, body.column2]);
        res.json({ message: 'Data saved successfully' });
    } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT (Update DB) /api/data/:id - Protected endpoint
router.put('/data/:id', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { body } = req;
    try {
        // Update data with specified id in the database
        // Example: await SQLlink.query('UPDATE example_table SET column1 = ?, column2 = ? WHERE id = ?', [body.column1, body.column2, id]);
        res.json({ message: `Data with id ${id} updated successfully` });
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE (Remove from DB) /api/data/:id - Protected endpoint
router.delete('/data/:id', authenticateToken, async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        // Delete data with specified id from the database
        // Example: await SQLlink.query('DELETE FROM example_table WHERE id = ?', [id]);
        res.json({ message: `Data with id ${id} deleted successfully` });
    } catch (error) {
        console.error('Error deleting data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
