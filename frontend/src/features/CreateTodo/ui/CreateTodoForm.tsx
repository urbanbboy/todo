import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from 'yup'
import { createTodoSchema } from "../model/schema/createTodoSchema"
import { useAddTodoMutation } from "@/entities/Todo"
import './CreateTodoForm.css'
import { toast } from "react-toastify"
import { FC } from "react"
import { ButtonLoader } from "@/shared/ui/ButtonLoader"

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

    return (
        <div className="formWrapper">
            <form className="addTodoForm" onSubmit={handleSubmit(onSubmit)} noValidate>
                <input
                    autoComplete="off"
                    required
                    type="text"
                    placeholder="Задача"
                    className="input"
                    {...register('text')}
                />
                <p className="inputError">{errors.text?.message}</p>
                <textarea
                    autoComplete="off"
                    required
                    placeholder="Описание"
                    className="input input-description"
                    {...register('description')}
                />
                <p className="inputError">{errors.description?.message}</p>
                <div className="submitButton_wrapper">
                    <button className="submitButton" type="submit">
                        {isLoading ? <ButtonLoader /> : <div>Добавить</div>}
                    </button>
                </div>

            </form>
        </div>
    )
}
