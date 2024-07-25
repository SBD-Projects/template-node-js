import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const secret = 'jnM22mk0yEuZJh2iqwHfgQxz13KePbHEocP0ZooI2zU=';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(401).send('Access denied. No token provided.');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, secret);
        req.user = decoded as string | JwtPayload;
        next();
    } catch (err) {
        res.status(400).send('Invalid token.');
    }
};
