import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { EditableTodoModal } from "@/features/EditTodo";
import { CheckBox } from "@/shared/ui/ChecBox";
import { getIsReadOnly } from "../../model/selectors/getIsReadOnly";
import { EditData, ErrorResponse, ITodo } from "../../model/types/TodoType";
import { useDeleteTodoMutation, useEditTodoMutation } from "../../model/api/todoApi";
import './TodoListItem.css';
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { AppDispatch } from "@/app/providers/StoreProvider";
import { todoActions } from "../../model/slice/todoSlice";

interface TodoListItemProps {
    todo: ITodo;
}

export const TodoListItem = (props: TodoListItemProps) => {
    const { todo } = props;
    const [modalVisible, setModalVisible] = useState(false);
    const [editedTodo, setEditedTodo] = useState<EditData>({
        text: todo.text,
        description: todo.description,
        completed: todo.completed
    });

    const [editTodo, { isLoading: isEditLoading }] = useEditTodoMutation();
    const [deleteTodo, { isLoading: isDeleteLoading }] = useDeleteTodoMutation();

    const readOnly = useSelector(getIsReadOnly);
    const dispatch = useDispatch<AppDispatch>();

    const onClickOpenModal = useCallback(() => {
        setModalVisible(true);
    }, []);

    const onClose = useCallback(() => {
        setModalVisible(false);
    }, []);

    const onSaveTodo = useCallback(async () => {
        await editTodo({
            todoId: todo._id,
            data: editedTodo,
        })
            .unwrap()
            .then(() => {
                dispatch(todoActions.setReadOnly(true))
                setModalVisible(false)
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as ErrorResponse
                toast.error(data.message)
            })
    }, [editTodo, todo._id, editedTodo, dispatch]);

    const handleDelete = useCallback(async () => {
        await deleteTodo(todo._id)
            .unwrap()
            .then((data) => {
                toast(data.message)
            })
    }, [])

    const onChangeCompleted = useCallback(async (completed: boolean) => {
        setEditedTodo((prev) => ({ ...prev, completed })); 

        await editTodo({
            todoId: todo._id,
            data: {
                text: editedTodo.text,
                description: editedTodo.description,
                completed,
            },
        })
            .unwrap()
    }, [todo._id, editedTodo, editTodo]);

    const todoClasses = [
        'todoItem',
        todo.completed ? 'todoItem_completed' : '',
        isEditLoading ? 'todoItem_loading' : '',
    ].join(' ')


    return (
        <>
            <li className={todoClasses}>
                <h3 onClick={onClickOpenModal} className="todoItem_title">
                    {todo.text}
                </h3>
                <CheckBox
                    id={todo._id}
                    checked={todo.completed}
                    onChange={onChangeCompleted}
                />
            </li>
            <EditableTodoModal
                isOpen={modalVisible}
                onClose={onClose}
                readOnly={readOnly}
                text={editedTodo.text}
                description={editedTodo.description}
                completed={editedTodo.completed}
                onSaveTodo={onSaveTodo}
                handleDelete={handleDelete}
                onChangeCompleted={onChangeCompleted}
                onChangeText={(newText) => setEditedTodo({ ...editedTodo, text: newText })}
                onChangeDescription={(newDescription) => setEditedTodo({ ...editedTodo, description: newDescription })}
                isDeleteLoading={isDeleteLoading}
            />

        </>
    );
};
