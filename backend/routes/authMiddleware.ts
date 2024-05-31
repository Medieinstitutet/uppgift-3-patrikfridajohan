import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    // Extract the JWT token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // Verify the JWT token
    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    // Attach user information to the request object
    req.user = decoded;
    next();
    });
};
