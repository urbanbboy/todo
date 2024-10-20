import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../app.js';
import { validationResult } from 'express-validator';
import { generateAccessToken, generateRefreshToken } from '../utils/tokenGenerators.js'


export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Ошибка при регистрации' })
        }
        const { username, password } = req.body

        //Поиск username в БД, если он есть, то выдаем message
        const isUsed = await User.findOne({ username })

        if (isUsed) {
            return res.status(400).json({
                message: 'Данный username уже занят.'
            })
        }

        //Если username свободен, то генерируем некий хеш для пароля
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)

        //записываем нового пользователя в БД 
        const newUser = new User({
            username,
            password: hash,
        })

        const accessToken = generateAccessToken(newUser._id)
        const refreshToken = generateRefreshToken(newUser._id)

        await newUser.save()

        const userData = newUser.toObject()
        delete userData.password

        res.status(201).json({
            // user: userData,
            accessToken,
            refreshToken,
            message: 'Регистрация прошла успешно.'
        })

    } catch (error) {
        res.status(500).json({ message: 'Ошибка при создании пользователя.' })
    }
}

//login user
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(401).json({ message: 'Такого пользователя не существует.' })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Неверный пароль.' })
        }

        const accessToken = generateAccessToken(user._id)
        const refreshToken = generateRefreshToken(user._id)

        await user.save()

        const userData = user.toObject()
        delete userData.password

        res.status(200).json({
            accessToken,
            refreshToken,
            // user: userData,
            message: 'Вы вошли в систему.'
        })
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при авторизации.' })
    }
}

export const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(403).json({ message: 'Токен обновления отсутствует' });
    }

    try {
        // Проверка валидности токена
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        // Создаем новый AccessToken
        const newAccessToken = generateAccessToken(decoded._id);
        const newRefreshToken = generateRefreshToken(decoded._id);

        res.status(200).json({
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        });
    } catch (err) {
        return res.status(403).json({ message: 'Токен обновления невалиден!' });
    }
};

export const getAboutUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password")

        if (!user) {
            res.status(404).json({ message: "Пользователь не найден" })
        }

        res.status(200).json({
            result: user,
        });
    } catch (error) {
        return res.status(500).json({ message: 'Ошибка при получении данных о пользователе.' })
    }
}

export const logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Отсутствует токен обновления!' });
    }

    res.status(200).json({ message: 'Вы вышли из системы.' });
};