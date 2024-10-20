import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from 'yup'
import { createTodoSchema } from "../model/schema/createTodoSchema"
import { useAddTodoMutation } from "@/entities/Todo"
import { toast } from "react-toastify"
import { FC } from "react"
import { ButtonLoader } from "@/shared/ui/ButtonLoader"
import { Button } from "antd"
import cls from './CreateTodoForm.module.scss'

interface CreateTodoFormProps {
    closeModal: () => void
}

export const CreateTodoForm: FC<CreateTodoFormProps> = ({ closeModal }) => {
    const {
        reset,
        register,
        handleSubmit,
        formState:
        { errors }
    } = useForm<Yup.InferType<typeof createTodoSchema>>({
        resolver: yupResolver(createTodoSchema)
    })

    const [createTodo, { isLoading }] = useAddTodoMutation()

    const onSubmit = async (data: Yup.InferType<typeof createTodoSchema>) => {
        try {
            await createTodo(data)
                .unwrap()
                .then(() => {
                    reset()
                })
            toast.success('Задача добавлена')
            closeModal()
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            toast.error('Ошибка при добавлении задачи')
        }
    }

    const inputDescriptionClasses = [
        cls.input,
        cls.inputDescription
    ].join(' ')

    return (
        <div className={cls.formWrapper}>
            <form className={cls.addTodoForm} onSubmit={handleSubmit(onSubmit)} noValidate>
                <input
                    autoComplete="off"
                    required
                    type="text"
                    placeholder="Задача"
                    className={cls.input}
                    {...register('text')}
                />
                <p className={cls.inputError}>{errors.text?.message}</p>
                <textarea
                    autoComplete="off"
                    required
                    placeholder="Описание"
                    className={inputDescriptionClasses}
                    {...register('description')}
                />
                <p className={cls.inputError}>{errors.description?.message}</p>
                <div className={cls.submitButton_wrapper}>
                    <Button className={cls.submitButton} htmlType="submit">
                        {isLoading ? <ButtonLoader /> : <div>Добавить</div>}
                    </Button>
                </div>

            </form>
        </div>
    )
}
