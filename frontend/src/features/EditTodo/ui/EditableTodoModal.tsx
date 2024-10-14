import { Input } from "@/shared/ui/Input";
import { ReactModal as Modal } from "@/shared/ui/Modal";
import { AppDispatch } from "@/app/providers/StoreProvider";
import { todoActions } from "@/entities/Todo";
import { useDispatch } from "react-redux";
import { CheckBox } from "@/shared/ui/ChecBox";
import { useCallback } from "react";

interface EditableTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
    readOnly: boolean | undefined;
    text?: string;
    description?: string;
    completed?: boolean;
    onSaveTodo: () => void;
    handleDelete: () => void;
    onChangeCompleted: (completed: boolean) => void;
    onChangeText: (text: string) => void;
    onChangeDescription: (description: string) => void;
    isDeleteLoading: boolean;
}

export const EditableTodoModal = (props: EditableTodoModalProps) => {
    const {
        text,
        description,
        completed,
        isOpen,
        onClose,
        readOnly,
        onSaveTodo,
        handleDelete,
        onChangeCompleted,
        onChangeText,
        onChangeDescription,
        isDeleteLoading
    } = props;

    const dispatch = useDispatch<AppDispatch>();
    const onClickEdit = useCallback(() => {
        dispatch(todoActions.setReadOnly(false));
    }, [dispatch])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="modalWrapper">
                <Input
                    value={text}
                    readOnly={readOnly}
                    onChange={onChangeText}
                    placeholder="Задача"
                />
                <Input
                    value={description}
                    readOnly={readOnly}
                    onChange={onChangeDescription}
                    placeholder="Описание"
                />
                <div className="modal_buttons">
                    {readOnly ? (
                        <button onClick={onClickEdit} className="modal_buttons-edit">
                            Редактировать
                        </button>
                    ) : (
                        <button onClick={onSaveTodo} className="modal_buttons-edit">
                            Сохранить
                        </button>
                    )}
                    <CheckBox
                        checked={completed}
                        onChange={onChangeCompleted}
                    />
                    <button onClick={handleDelete} className="modal_buttons-delete" disabled={isDeleteLoading}>
                        {/* {isLoading ? <ButtonLoader /> : <div>Удалить</div>} */}
                        Удалить
                    </button>
                </div>
            </div>
        </Modal>
    );
};
