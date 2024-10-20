import { LoginSchema, useAuth, useLoginMutation } from "@/entities/User"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from 'yup'
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Typography } from "antd"
import { RouteNames } from "@/app/providers/RouterProvider"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { UserLoginError } from "@/entities/User/model/types/UserType"
import { toast } from "react-toastify"
import cls from './LoginForm.module.scss'
import { Loader } from "@/shared/ui/Loader"

const { Paragraph, Link } = Typography


const LoginForm = () => {
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
    const location = useLocation()
    const userAuth = useAuth()

    const onSubmit = async (data: Yup.InferType<typeof LoginSchema>) => {
        await login(data)
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
                const data = error.data as UserLoginError;
                toast.error(data.message)
            });
    }

    return (
        <div className={cls.loginFormWrapper}>
            <form className={cls.loginForm} onSubmit={handleSubmit(onSubmit)} noValidate>
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
                    {isLoading ? <Loader /> : <div>Войти</div>}
                </Button>
                <div className={cls.registerLink}>
                    <div className={cls.registerTitle}>Нет аккаунта?</div>
                    <Link href={RouteNames.REGISTER_PAGE}>Зарегистрироваться</Link>
                </div>
            </form>

        </div>
    )
}

export default LoginForm