import { useCallback, useState } from "react";
import { Button, Tabs } from 'antd';
import TabPane from "antd/es/tabs/TabPane";
// import type { TabsProps } from 'antd';
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

    if (error) {
        return <div className={'fetchError'}>Ошибка при загрузке задач</div>
    }

    // const onChange = (key: string) => {
    //     console.log(key);
    // };

    const completedTodos = todos.filter(todo => todo.completed);
    const uncompletedTodos = todos.filter(todo => !todo.completed);

    // const tabItems: TabsProps['items'] = [
    //     {
    //         key: '1',
    //         label: 'Все задачи',
    //         children: <TodoList isLoading={isLoading} todos={todos} />,
    //     },
    //     {
    //         key: '2',
    //         label: 'Завершенные',
    //         children: <TodoList isLoading={isLoading} todos={completedTodos} />,
    //     },
    //     {
    //         key: '3',
    //         label: 'Незавершенные',
    //         children: <TodoList isLoading={isLoading} todos={uncompletedTodos} />,
    //     },
    // ]

    return (
        <>
            <div className={'todoPage'}>
                <Tabs
                    centered
                    className={'tabs'}
                    defaultActiveKey='1'
                    // onChange={onChange}
                >
                    <TabPane tab="Все задачи" key={1}>
                        <TodoList isLoading={isLoading} todos={todos} />
                    </TabPane>
                    <TabPane tab="Завершенные" key={2}>
                        <TodoList isLoading={isLoading} todos={completedTodos} />
                    </TabPane>
                    <TabPane tab="Незавершенные" key={3}>
                        <TodoList isLoading={isLoading} todos={uncompletedTodos} />
                    </TabPane>

                </Tabs>
                <Button className={'addTodo'} onClick={() => setAddModalOpen(true)}>+</Button>
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