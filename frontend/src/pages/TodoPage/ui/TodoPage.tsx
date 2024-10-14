import { useCallback, useState } from "react";
import { CreateTodoForm } from "@/features/CreateTodo";
import { TodoList, useGetTodosQuery } from "@/entities/Todo"
import { ReactModal as Modal } from "@/shared/ui/Modal";
import './TodoPage.css'

const TodoPage = () => {
    const { data: todos = [], isLoading, error } = useGetTodosQuery()
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const closeModal = useCallback(() => {
        setAddModalOpen(false)
    }, [])

    if(error) {
        return <div className="fetchError">Ошибка при загрузке задач</div>
    }

    return (
        <>
            <div className="todoPage">
                <TodoList
                    isLoading={isLoading}
                    todos={todos}
                />
                <button className="addTodo" onClick={() => setAddModalOpen(true)}>+</button>
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