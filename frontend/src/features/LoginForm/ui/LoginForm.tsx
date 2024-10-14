import { LoginSchema, useAuth, useLoginMutation } from "@/entities/User"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from 'yup'
import './LoginForm.css'
import { useNavigate } from "react-router-dom"
import { RouteNames } from "@/app/providers/RouterProvider"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { UserLoginError } from "@/entities/User/model/types/UserType"
import { toast } from "react-toastify"

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState:
        { errors }
    } = useForm<Yup.InferType<typeof LoginSchema>>({
        resolver: yupResolver(LoginSchema)
    })

    const [login, { isLoading }] = useLoginMutation()
    const navigate = useNavigate()
    const userAuth = useAuth()

    const onSubmit = async (data: Yup.InferType<typeof LoginSchema>) => {
        await login(data)
            .unwrap()
            .then((data) => {
                userAuth.login(data)
                userAuth.setUserData(data.user)
                navigate(RouteNames.TODO_PAGE)
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as UserLoginError;
                toast.error(data.message)
            });
    }

    return (
        <div className="loginFormWrapper">
            <form className="loginForm" onSubmit={handleSubmit(onSubmit)} noValidate>

                <input
                    required
                    type="text"
                    placeholder="Имя пользователя"
                    className="input"
                    {...register('username')}
                />
                <p className="inputError">{errors.username?.message}</p>
                <input
                    required
                    type="password"
                    placeholder="Пароль"
                    className="input"
                    {...register('password')}
                />
                <p className="inputError">{errors.password?.message}</p>
                <button className="submitButton" type="submit">
                    {isLoading ? <div>загрузка</div> : <div>Войти</div>}
                </button>
            </form>
        </div>
    )
}
