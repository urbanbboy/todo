export interface getTodosResponse {
    todos: ITodo[];
}

export interface ITodo {
    _id: string;
    text: string;
    description: string;
    completed: boolean;
    userId: string;
}

export interface newTodo {
    text: string;
    description: string;
}

export interface addTodoResponse {
    message: string;
}

export interface deleteTodoResponse {
    message: string;
}

export interface ErrorResponse {
    message: string;
}

export interface EditData {
    text?: string;
    description?: string;
    completed?: boolean;
}

export interface EditTodoData {
    todoId: string;
    data: EditData;
}

export interface TodoSchema {
    readOnly?: boolean;
    form?: EditData;
}