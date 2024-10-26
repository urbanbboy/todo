import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Loader } from "@/shared/ui/Loader";
import { ITodo } from "../../model/types/TodoType";
import { useCallback, useEffect, useState } from "react";
import cls from './TodoList.module.scss';
import { DropItem } from '../DropItem/DropItem';
import { useEditTodoMutation } from '../../model/api/todoApi';

interface TodoListProps {
    todos: ITodo[];
    isLoading: boolean;
}

export const TodoList = (props: TodoListProps) => {
    const { todos, isLoading } = props;
    const [todoList, setTodoList] = useState(todos)
    const [editTodo] = useEditTodoMutation();

    useEffect(() => {
        setTodoList(todos)
    }, [todos])

    const unfinishedTodos = todoList.filter((todo) => !todo.completed);
    const completedTodos = todoList.filter((todo) => todo.completed);

    const handleOnDragEnd = useCallback(async (result: DropResult) => {
        const { destination, draggableId } = result;
        if (!destination) return;

        const draggedTodo = todoList.find(todo => todo._id === draggableId);
        if (!draggedTodo) return;

        const isMovedToCompleted = destination.droppableId === 'completed' && !draggedTodo.completed;
        const isMovedToUnfinished = destination.droppableId === 'unfinished' && draggedTodo.completed;

        setTodoList((prev) =>
            prev.map((todo) =>
                todo._id === draggableId
                    ? { ...todo, completed: isMovedToCompleted ? true : isMovedToUnfinished ? false : todo.completed }
                    : todo
            )
        );

        try {
            if (isMovedToCompleted || isMovedToUnfinished) {
                await editTodo({
                    todoId: draggedTodo._id,
                    data: { ...draggedTodo, completed: isMovedToCompleted }
                }).unwrap();
            }
        } catch {
            setTodoList(todos);
        }
    }, [todoList, editTodo, todos]);

    if (!isLoading && !todos.length) {
        return (
            <div className={cls.todoContainer}>
                Задачи не найдены
            </div>
        );
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className={cls.dropWrapper}>
                <DropItem
                    title={'Незавершенные задачи'}
                    droppableId='unfinished'
                    todos={unfinishedTodos}
                />
                <DropItem
                    title={'Завершенные задачи'}
                    droppableId='completed'
                    todos={completedTodos}
                />
            </div>
        </DragDropContext>
    );
};