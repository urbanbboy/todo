import { Draggable, Droppable } from "@hello-pangea/dnd"
import { Typography } from "antd";
import { ITodo } from "../../model/types/TodoType";
import { TodoListItem } from "../TodoListItem/TodoListItem";
import cls from './DropItem.module.scss'

const { Title } = Typography
interface DropItemProps {
    droppableId: string;
    title: string;
    todos: ITodo[]
}


export const DropItem = (props: DropItemProps) => {
    const {
        droppableId,
        title,
        todos
    } = props

    return (
        <Droppable droppableId={droppableId}>
            {(provided) => (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={cls.droppable}
                >
                    <Title level={4} type="warning" style={{textAlign: 'center'}}>{title}</Title>
                    {todos.map((todo, index) => (
                        <Draggable key={todo._id} draggableId={todo._id} index={index}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                >
                                    <TodoListItem todo={todo} />
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    )
}