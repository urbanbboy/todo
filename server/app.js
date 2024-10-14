import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import { check } from 'express-validator'

import {router as authRoute} from './routes/auth.js'
import {router as todoRoute} from './routes/todo.js'

export const JWT_SECRET = 'jljksdafu929320rif024f'
const app = express()

//middleware
app.use(express.json())
app.use(cors())


//routes
app.use('/api/auth', [
    check('username', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть не меньше 4 символов').isLength({ min: 4 })
], authRoute)
app.use('/api/todos', todoRoute)




const port = 8000

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://talant:5apEwHzqSzuMD3ok@cluster0.iosu7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        app.listen(port, () => {
            console.log(`server started on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()