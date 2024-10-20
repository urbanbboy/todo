import { Loader } from "@/shared/ui/Loader";
import { ITodo } from "../../model/types/TodoType";
import { TodoListItem } from "../TodoListItem/TodoListItem";
import cls from './TodoList.module.scss';
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';

interface TodoListProps {
    todos: ITodo[];
    isLoading: boolean;
}

export const TodoList = (props: TodoListProps) => {
    const { todos, isLoading } = props;
    const [todoList, setTodoList] = useState(todos);

    useEffect(() => {
        setTodoList(todos);
    }, [todos]);

    const handleOnDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const updatedTodos = Array.from(todoList);
        const [reorderedItem] = updatedTodos.splice(result.source.index, 1);
        updatedTodos.splice(result.destination.index, 0, reorderedItem);

        setTodoList(updatedTodos);
    };

    if (!isLoading && !todoList.length) {
        return (
            <div className={cls.todoContainer}>
                Задачи не найдены
            </div>
        );
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
                {(provided) => (
                    <ul
                        className={isLoading ? '' : cls.todoContainer}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {todoList.map((item, index) => (
                            <Draggable key={item._id} draggableId={item._id} index={index}>
                                {(provided) => (
                                    <li
                                        key={item._id}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <TodoListItem
                                            key={item._id}
                                            todo={item}
                                        />
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                        {isLoading && <Loader />}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};