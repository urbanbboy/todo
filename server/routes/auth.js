import { Router } from 'express'
import { register, login } from '../controllers/authController.js'

export const router = new Router()

router.post('/register', register)
router.post('/login', login)