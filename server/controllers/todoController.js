import User from '../models/User.js'
import Todo from '../models/Todo.js'

export const getUserTodos = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.todos.map(todo => {
                return Todo.findById(todo._id)
            }),
        )

        res.status(200).json(list)
    } catch (error) {
        res.status(400).json({ message: "Ошибка при загрузке задач!" })
    }
}

export const createTodo = async (req, res) => {
    try {
        const { text, description } = req.body;
        const user = await User.findById(req.userId)

        const newTodo = new Todo({
            text,
            description,
            completed: false,
            username: user.username
        })

        await newTodo.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: { todos: newTodo },
        })
        res.status(201).json(newTodo)
    } catch (error) {
        res.status(400).json({ message: 'Ошибка при добавлении задачи!' })
    }
}

export const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id
        const { text, description, completed } = req.body
        const todo = await Todo.findById(todoId)

        todo.text = text
        todo.description = description
        todo.completed = completed

        await todo.save()

        res.status(200).json(todo)
    } catch (error) {
        res.status(400).json({ message: 'Ошибка при обновлении задачи' })
    }
}

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id)
        if (!todo) return res.status(400).json({ message: 'Такого поста не существует' })

        await User.findByIdAndUpdate(req.userId, {
            $pull: { todos: req.params.id }
        })

        res.status(200).json({ message: 'Задача была удалена' })
    } catch (error) {
        res.status(500).json({ message: "Ошибка при удалении задачи" })
    }
}

export const getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        res.status(200).json(todo)
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при загрузке задачи' })
    }
}

export const getCompletedTodos = async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.status(404).json({ message: "Пользователь не найден!" });
        }

        if (!user.todos || user.todos.length === 0) {
            return res.status(200).json([]);
        }

        console.log("user.todos:", user.todos);

        const completedTodos = await Todo.find({
            _id: { $in: user.todos.map(todo => todo._id) },
            completed: true
        });

        res.status(200).json(completedTodos);
    } catch (error) {
        console.error("Ошибка при загрузке завершённых задач:", error);
        res.status(400).json({ message: "Ошибка при загрузке завершённых задач!" });
    }
};
