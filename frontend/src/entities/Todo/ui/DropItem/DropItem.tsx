import { Draggable, Droppable } from "@hello-pangea/dnd"
import { Typography } from "antd";
import { ITodo } from "../../model/types/TodoType";
import { TodoListItem } from "../TodoListItem/TodoListItem";

const { Title } = Typography
interface DropItemProps {
    droppableId: string;
    title: string;
    todos: ITodo[]
}

const droppableStyles = {
    padding: '10px',
    background: 'var(--primary-color)',
    borderRadius: '10px',
    boxShadow: 'var(--box-shadow)'
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
                    style={droppableStyles}
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