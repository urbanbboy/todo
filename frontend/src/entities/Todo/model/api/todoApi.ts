import { 
    addTodoResponse, 
    deleteTodoResponse, 
    EditTodoData, 
    ITodo, 
    newTodo 
} from "../types/TodoType";
import { baseApiWithReAuth } from "@/shared/api/baseApiWithReAuth";


export const todoApi = baseApiWithReAuth.injectEndpoints({
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
            async onQueryStarted({ todoId, data }, { dispatch, queryFulfilled }) {
                const patchResult = dispatch(
                    todoApi.util.updateQueryData('getTodos', undefined, (draft) => {
                        const todo = draft.find((item) => item._id === todoId)
                        if(todo) todo.completed = data.completed
                    })
                )
                try {
                    await queryFulfilled
                } catch {
                    patchResult.undo()
                }
            },
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