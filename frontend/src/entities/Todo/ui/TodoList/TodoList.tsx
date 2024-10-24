import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Loader } from "@/shared/ui/Loader";
import { ITodo } from "../../model/types/TodoType";
import { useCallback } from "react";
import cls from './TodoList.module.scss';
import { DropItem } from '../DropItem/DropItem';
import { useEditTodoMutation } from '../../model/api/todoApi';

interface TodoListProps {
    todos: ITodo[];
    isLoading: boolean;
}

export const TodoList = (props: TodoListProps) => {
    const { todos, isLoading } = props;
    const [editTodo] = useEditTodoMutation();

    const unfinishedTodos = todos.filter((todo) => !todo.completed);
    const completedTodos = todos.filter((todo) => todo.completed);

    // useEffect(() => {
    //     setTodoList(todos);
    // }, [todos]);

    const handleOnDragEnd = useCallback(async (result: DropResult) => {
        const { destination, draggableId } = result;
        if (!destination) return;

        const draggedTodo = todos.find(todo => todo._id === draggableId)

        if (!draggedTodo) return;

        const isMovedToCompleted = destination.droppableId === 'completed' && !draggedTodo.completed
        const isMovedToUnfinished = destination.droppableId === 'unfinished' && draggedTodo.completed;

        if (isMovedToCompleted) {
            editTodo({ todoId: draggedTodo._id, data: { ...draggedTodo, completed: true } })
        } else if (isMovedToUnfinished) {
            editTodo({ todoId: draggedTodo._id, data: { ...draggedTodo, completed: false } })
        }
    }, [todos, editTodo])

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