//middleware for token checking
import { JWT_SECRET } from '../app.js';
import jwt from 'jsonwebtoken';


export const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
        return res.status(401).json({ error: 'Токен не предоставлен' });
    }
    const token = authHeader.replace(/Bearer\s?/, '');
    console.log('Token:', token);

    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            console.log('Decoded token:', decoded);
            req.userId = decoded.id;
            next();
            
        } catch (error) {
            console.error('JWT verification error:', error);
            res.status(401).json({ error: 'Некорректный токен или токен истёк' });
        }
    } else {
        return res.json({
            message: 'Нет доступа.'
        })
    }
};
