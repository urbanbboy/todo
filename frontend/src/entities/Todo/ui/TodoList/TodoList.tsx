import { Loader } from "@/shared/ui/Loader";
import { ITodo } from "../../model/types/TodoType"
import { TodoListItem } from "../TodoListItem/TodoListItem";
import './TodoList.css'
import { memo } from "react";

interface TodoListProps {
    todos: ITodo[];
    isLoading: boolean;
}

export const TodoList = memo((props: TodoListProps) => {
    const { todos, isLoading } = props

    if (!isLoading && !todos.length) {
        return (
            <div className="todoContainer">
                Задачи не найдены
            </div>
        )
    }

    return (
        <ul className={isLoading ? '' : 'todoContainer'}>
            {todos.map(item =>
                <TodoListItem
                    key={item._id}
                    todo={item}
                />
            )}
            {isLoading && <Loader />}
        </ul>
    )
})