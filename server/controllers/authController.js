import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../app.js';
import { validationResult } from 'express-validator';


export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
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

        const token = jwt.sign(
            {
                id: newUser._id,
            },
            JWT_SECRET,
            { expiresIn: '30d' },
        )

        const userData = newUser.toObject()
        delete userData.password

        res.status(201).json({
            user: userData,
            token,
            message: 'Регистрация прошла успешно.'
        })

        await newUser.save()
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
            return res.status(401).json({
                message: 'Такого пользователя не существует.',
            })
        }

        //проверяем пароль путем сравнения введенного пароля password с паролем user
        const isPasswordCorrect = await bcrypt.compare(password, user.password)

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Неверный пароль.',
            })
        }

        //Создание токена для опредения входа в систему или нет
        const token = jwt.sign(
            {
                id: user._id,
            },
            JWT_SECRET,
            { expiresIn: '30d' },
        )

        const userData = user.toObject()
        delete userData.password

        res.status(200).json({
            token,
            user: userData,
            message: 'Вы вошли в систему.',
        })
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при авторизации.' })
    }
}