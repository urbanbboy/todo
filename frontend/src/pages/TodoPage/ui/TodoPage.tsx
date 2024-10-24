import { useCallback, useState } from "react";
import { Button } from 'antd';
import { CreateTodoForm } from "@/features/CreateTodo";
import { TodoList, useGetTodosQuery } from "@/entities/Todo"
import { ReactModal as Modal } from "@/shared/ui/Modal";
import cls from './TodoPage.module.scss'

const TodoPage = () => {
    const { data: todos = [], isLoading, error } = useGetTodosQuery()
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const closeModal = useCallback(() => {
        setAddModalOpen(false)
    }, [])

    if (error) {
        return <div className={cls.fetchError}>Ошибка при загрузке задач</div>
    }

    return (
        <>
            <div className={cls.todoPage}>
                <TodoList isLoading={isLoading} todos={todos} />
                <Button className={cls.addTodo} onClick={() => setAddModalOpen(true)}>+</Button>
            </div>
            <Modal
                width={'700px'}
                isOpen={isAddModalOpen}
                onClose={closeModal}
            >
                <CreateTodoForm
                    closeModal={closeModal}
                />
            </Modal>
        </>

    )
}

export default TodoPage