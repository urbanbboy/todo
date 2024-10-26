import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { Button, Typography } from "antd"
import * as Yup from 'yup'
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { yupResolver } from "@hookform/resolvers/yup"
import { RouteNames } from "@/app/providers/RouterProvider"
import { RegisterSchema, useAuth } from "@/entities/User"
import { useRegisterMutation } from "@/entities/User/model/api/userApi"
import { UserRegisterError } from "@/entities/User/model/types/UserType"

import cls from './RegisterForm.module.scss'
import { Loader } from "@/shared/ui/Loader"

const { Paragraph, Link } = Typography

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        formState:
        { errors }
    } = useForm<Yup.InferType<typeof RegisterSchema>>({
        resolver: yupResolver(RegisterSchema)
    })

    const [registerUser, { isLoading }] = useRegisterMutation()
    const navigate = useNavigate()
    const location = useLocation()
    const userAuth = useAuth()

    const onSubmit = async (data: Yup.InferType<typeof RegisterSchema>) => {
        await registerUser(data)
            .unwrap()
            .then((data) => {
                userAuth.login(data)
                userAuth.getMe()
                    ?.unwrap()
                    .then(() => {
                        if (location.state?.from) {
                            return navigate(location.state?.from, {
                                replace: true,
                            });
                        }
                        navigate(RouteNames.TODO_PAGE);
                    });
            })
            .catch((error: FetchBaseQueryError) => {
                const data = error.data as UserRegisterError;
                toast.error(data.message)
            });
    }

    return (
        <div className={cls.registerFormWrapper}>
            <form className={cls.registerForm} onSubmit={handleSubmit(onSubmit)} noValidate>
                <input
                    required
                    type="text"
                    placeholder="Имя пользователя"
                    className={cls.input}
                    {...register('username')}
                />
                <Paragraph className={cls.inputError}>{errors.username?.message}</Paragraph>
                <input
                    required
                    type="password"
                    placeholder="Пароль"
                    className={cls.input}
                    {...register('password')}
                />
                <Paragraph className={cls.inputError}>{errors.password?.message}</Paragraph>
                <Button className={cls.submitButton} htmlType="submit">
                    {isLoading ? <Loader /> : <div>Зарегистрироваться</div>}
                </Button>
                <div className={cls.loginLink}>
                    <div className={cls.loginTitle}>Есть аккаунт?</div>
                    <Link href={RouteNames.LOGIN_PAGE}>Войти</Link>
                </div>
            </form>

        </div>
    )
}

export default RegisterForm