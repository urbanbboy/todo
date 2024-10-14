import { Router } from 'express'
import { 
    getUserTodos, 
    createTodo, 
    updateTodo, 
    deleteTodo, 
    getTodoById,
    getCompletedTodos
} from '../controllers/todoController.js'
import { authMiddleware } from '../utils/authMiddleware.js'

export const router = new Router()

router.get('/', authMiddleware, getUserTodos)
router.get('/completed', authMiddleware, getCompletedTodos)
router.post('/', authMiddleware, createTodo)
router.get('/:id', authMiddleware, getTodoById)
router.put('/:id', authMiddleware, updateTodo)
router.delete('/:id', authMiddleware, deleteTodo)


// export default router