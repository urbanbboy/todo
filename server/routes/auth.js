import { Router } from 'express'
import { register, login, refreshToken, logout, getAboutUser } from '../controllers/authController.js'
import { authMiddleware } from '../utils/authMiddleware.js'

export const router = new Router()

router.post('/register', register)
router.post('/login', login)
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.get('/aboutme', authMiddleware, getAboutUser);