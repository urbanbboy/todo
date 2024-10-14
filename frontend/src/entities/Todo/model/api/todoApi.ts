import { baseApi } from "@/shared/api/baseApi";
import { addTodoResponse, deleteTodoResponse, EditTodoData, ITodo, newTodo } from "../types/TodoType";


export const todoApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getTodos: build.query<ITodo[], void>({
            query: () => ({
                url: '/todos'
            }),
            providesTags: ['todo']
        }),
        getCompletedTodos: build.query<ITodo[], void>({
            query: () => ({
                url: '/todos/completed'
            }),
            providesTags: ['todo']
        }),
        getInCompletedTodos: build.query<ITodo[], void>({
            query: () => ({
                url: '/incompleted'
            }),
            providesTags: ['todo']
        }),
        addTodo: build.mutation<addTodoResponse, newTodo>({
            query: (data) => ({
                url: '/todos',
                method: "POST",
                body: data
            }),
            invalidatesTags: ["todo"]
        }),
        deleteTodo: build.mutation<deleteTodoResponse, string>({
            query: (todoId) => ({
                url: `/todos/${todoId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["todo"]
        }),
        editTodo: build.mutation<void, EditTodoData>({
            query: (todo) => ({
                url: `/todos/${todo.todoId}`,
                method: "PUT",
                body: todo.data
            }),
            invalidatesTags: ["todo"]
        }),

    })
})

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useEditTodoMutation,
} = todoApi