import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Button, Spin } from "antd";
import { CheckOutlined, CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Input } from "@/shared/ui/Input";
import { ReactModal as Modal } from "@/shared/ui/Modal";
import { AppDispatch } from "@/app/providers/StoreProvider";
import { todoActions } from "@/entities/Todo";
import cls from './EditableTodoModal.module.scss'


interface EditableTodoModalProps {
    isOpen: boolean;
    onClose: () => void;
    readOnly: boolean | undefined;
    text?: string;
    description?: string;
    completed?: boolean;
    onSaveTodo: () => void;
    onCancelEdit: () => void;
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
        isOpen,
        onClose,
        readOnly,
        onSaveTodo,
        onCancelEdit,
        handleDelete,
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
                        <Button
                            onClick={onClickEdit}
                            className={cls.modalButtonsEdit}
                            icon={<EditOutlined />}
                            iconPosition="start"
                        >
                            Редактировать
                        </Button>
                    ) : (
                        <>
                            <Spin spinning={isEditLoading}>
                                <Button
                                    onClick={onSaveTodo}
                                    className={cls.modalButtonsSave}
                                    disabled={isEditLoading}
                                    icon={<CheckOutlined />}
                                    iconPosition="start"
                                >
                                    Сохранить
                                </Button>
                            </Spin>
                            <Spin spinning={isEditLoading}>
                                <Button
                                    onClick={onCancelEdit}
                                    className={cls.modalButtonsCancel}
                                    disabled={isEditLoading}
                                    icon={<CloseOutlined />}
                                    iconPosition="start"
                                >
                                    Отмена
                                </Button>
                            </Spin>
                        </>
                    )}
                    <Spin spinning={isDeleteLoading}>
                        <Button
                            onClick={handleDelete}
                            className={cls.modalButtonsDelete}
                            disabled={isDeleteLoading}
                            icon={<DeleteOutlined />}
                            iconPosition="start"
                        >
                            Удалить
                        </Button>
                    </Spin>
                </div>
            </div>
        </Modal>
    );
};
