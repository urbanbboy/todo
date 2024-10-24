import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { check } from 'express-validator'
import dotenv from 'dotenv';
import {router as authRoute} from './routes/auth.js'
import {router as todoRoute} from './routes/todo.js'

const app = express()
dotenv.config();

//middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


//routes
app.use('/api/auth', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть не меньше 4 символов').isLength({ min: 4 })
], authRoute)
app.use('/api/todos', todoRoute)




const PORT = process.env.PORT || 5000
const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL)
        app.listen(process.env.PORT, () => {
            console.log(`server started on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()