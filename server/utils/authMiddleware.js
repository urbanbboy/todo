//middleware for token checking
// import { JWT_SECRET } from '../app.js';
import jwt from 'jsonwebtoken';


export const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Authorization Header:', authHeader);

    if (!authHeader) {
        return res.status(401).json({ error: 'Токен не предоставлен' });
    }
    const token = authHeader.replace(/Bearer\s?/, '');

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            next();
            
        } catch (error) {
            res.status(401).json({ error: 'Некорректный токен или токен истёк' });
        }
    } else {
        return res.json({
            message: 'Нет доступа.'
        })
    }
};
