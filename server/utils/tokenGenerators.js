import jwt from 'jsonwebtoken';
import Token from '../models/Token.js';


export const generateAccessToken = (userId) => {
    return jwt.sign({_id: userId}, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId) => {
    return jwt.sign({_id: userId}, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });  
};

export const saveToken = async (userId, refreshToken) => {
    const tokenData = await Token.findOne({ user: userId })

    if(tokenData) {
        tokenData.refreshToken = refreshToken;
        return tokenData.save();
    }

    const token = await Token.create({ user: userId, refreshToken })
    return token
}