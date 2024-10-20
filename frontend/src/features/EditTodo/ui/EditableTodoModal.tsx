import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Input } from "@/shared/ui/Input";
import { ReactModal as Modal } from "@/shared/ui/Modal";
import { AppDispatch } from "@/app/providers/StoreProvider";
import { todoActions } from "@/entities/Todo";
import { CheckBox } from "@/shared/ui/ChecBox";
import cls from './EditableTodoModal.module.scss'
import { Button, Spin } from "antd";

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
    isEditLoading: boolean;
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
        isDeleteLoading,
        isEditLoading
    } = props;

    const dispatch = useDispatch<AppDispatch>();
    const onClickEdit = useCallback(() => {
        dispatch(todoActions.setReadOnly(false));
    }, [dispatch])

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={cls.modalWrapper}>
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
                <div className={cls.modalButtons}>
                    {readOnly ? (
                        <Button onClick={onClickEdit} className={cls.modalButtonsEdit}>
                            Редактировать
                        </Button>
                    ) : (
                        <Spin spinning={isEditLoading}>
                            <Button onClick={onSaveTodo} className={cls.modalButtonsEdit} disabled={isEditLoading}>
                                Сохранить
                            </Button>
                        </Spin>
                    )}
                    <CheckBox
                        checked={completed}
                        onChange={onChangeCompleted}
                    />
                    <Spin spinning={isDeleteLoading}>
                        <Button onClick={handleDelete} className={cls.modalButtonsDelete} disabled={isDeleteLoading}>
                            Удалить
                        </Button>
                    </Spin>

                </div>
            </div>
        </Modal>
    );
};
